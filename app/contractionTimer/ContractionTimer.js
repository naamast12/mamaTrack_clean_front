import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import contractionTimerStyles from '../../styles/contractionTimerStyles';
import api from '../../src/api/axiosConfig';
import ProtectedRoute from "../../components/ProtectedRoute";
import { HomeButton } from "../utils/HomeButton";

const HOSPITAL_MESSAGE = "הצירים שלך סדירים וחזקים – הגיע הזמן ללכת לבית החולים!";

const ContractionTimer = () => {
  const [isTiming, setIsTiming] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [duration, setDuration] = useState(0);
  const [contractions, setContractions] = useState([]);
  const [showHospitalMessage, setShowHospitalMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const timerRef = useRef(null);

  const formatInterval = (seconds) => {
    if (!seconds || seconds < 0) return '-';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    const parts = [];
    if (mins > 0) parts.push(`${mins} ${mins === 1 ? 'דקה' : 'דקות'}`);
    if (secs > 0) parts.push(`${secs} ${secs === 1 ? 'שנייה' : 'שניות'}`);

    return parts.join(' ו');
  };

  const fetchContractions = async () => {
    setIsLoading(true);
    try {
      const res = await api.get('/api/contractions');
      if (res.data?.success) {
        const formatted = res.data.contractions.map((c, idx, arr) => {
          const start = new Date(c.startTime).getTime();
          const prevStart = idx > 0 ? new Date(arr[idx - 1].startTime).getTime() : null;
          const interval = prevStart !== null ? Math.round((start - prevStart) / 1000) : null;

          return {
            startTime: start,
            duration: c.durationSeconds,
            interval: interval,
          };
        });

        setContractions(formatted);
      }
    } catch (err) {
      console.error('שגיאה בשליפת צירים מהשרת:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContractions();
  }, []);

  const handleButtonPress = async () => {
    if (!isTiming) {
      const now = Date.now();
      setStartTime(now);
      setDuration(0);
      setIsTiming(true);
    } else {
      setIsTiming(false);
      const endTime = Date.now();

      if (!startTime) {
        alert("⚠️ התחלה לא אותחלה – נסי שוב.");
        return;
      }

      const contractionDuration = Math.round((endTime - startTime) / 1000);

      if (contractionDuration <= 0 || contractionDuration > 3600) {
        alert(`⚠️ משך חריג: ${contractionDuration} שניות – נא נסי שוב.`);
        return;
      }

      const payload = {
        startTime: new Date(startTime).toISOString(),
        endTime: new Date(endTime).toISOString(),
        durationSeconds: contractionDuration,
      };

      try {
        const res = await api.post('/api/contractions', payload);
        if (res.data && res.data.success) {
          setContractions(prev => {
            const last = prev[prev.length - 1];
            const interval = last ? Math.round((startTime - last.startTime) / 1000) : null;

            return [
              ...prev,
              {
                startTime,
                duration: contractionDuration,
                interval
              }
            ];
          });
          setShowHospitalMessage(res.data.shouldGoToHospital);
        }
      } catch (err) {
        console.error("שגיאה בשמירת ציר:", err);
      }

      setStartTime(null);
      setDuration(0);
    }
  };

  const handleResetContractions = async () => {
    try {
      const res = await api.delete('/api/contractions');
      console.log("🔁 delete response:", res.data);

      if (res.data?.success) {
        setContractions([]);
        setShowHospitalMessage(false);
        alert("הצירים נמחקו בהצלחה ✅");
      } else {
        alert("⚠️ לא הצלחנו למחוק את הצירים");
      }
    } catch (err) {
      console.error('❌ שגיאה במחיקת הצירים:', err);
      alert("שגיאה בעת מחיקת הצירים מהשרת.");
    }
  };

  useEffect(() => {
    if (isTiming) {
      timerRef.current = setInterval(() => {
        setDuration(Math.round((Date.now() - startTime) / 1000));
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTiming, startTime]);

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString();
  };

  return (
      <ProtectedRoute requireAuth={true}>
        <HomeButton />
        <ScrollView contentContainerStyle={contractionTimerStyles.container}>
          <Text style={contractionTimerStyles.title}>⏱️ טיימר צירים</Text>

          <View style={contractionTimerStyles.timerContainer}>
            <Text style={contractionTimerStyles.timerText}>
              {isTiming ? `משך: ${duration} שניות` : 'לחצי התחל כדי להתחיל לתזמן'}
            </Text>

            <TouchableOpacity
                style={isTiming ? contractionTimerStyles.buttonRed : contractionTimerStyles.buttonBlue}
                onPress={handleButtonPress}
            >
              <Text style={contractionTimerStyles.buttonText}>
                {isTiming ? 'עצור ציר' : 'התחל ציר'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={contractionTimerStyles.buttonGray}
                onPress={handleResetContractions}
            >
              <Text style={contractionTimerStyles.buttonText}>נקה הכל</Text>
            </TouchableOpacity>
          </View>

          {showHospitalMessage && (
              <View style={contractionTimerStyles.hospitalMessageBox}>
                <Text style={contractionTimerStyles.hospitalMessageText}>{HOSPITAL_MESSAGE}</Text>
              </View>
          )}

          <Text style={contractionTimerStyles.listTitle}>📋 רשימת צירים</Text>
          <View style={contractionTimerStyles.listHeader}>
            <Text style={contractionTimerStyles.headerCell}>#</Text>
            <Text style={contractionTimerStyles.headerCell}>שעת התחלה</Text>
            <Text style={contractionTimerStyles.headerCell}>משך (שניות)</Text>
            <Text style={contractionTimerStyles.headerCell}>מרווח (שניות)</Text>
          </View>

          {isLoading ? (
              <Text style={contractionTimerStyles.noData}>טוען נתונים...</Text>
          ) : contractions.length === 0 ? (
              <Text style={contractionTimerStyles.noData}>עדיין לא נרשמו צירים.</Text>
          ) : (
              contractions.map((c, idx) => (
                  <View key={idx} style={contractionTimerStyles.listRow}>
                    <Text style={contractionTimerStyles.cell}>{idx + 1}</Text>
                    <Text style={contractionTimerStyles.cell}>{formatTime(c.startTime)}</Text>
                    <Text style={contractionTimerStyles.cell}>{c.duration}</Text>
                    <Text style={contractionTimerStyles.cell}>
                      {c.interval !== null ? formatInterval(c.interval) : '-'}
                    </Text>
                  </View>
              ))
          )}
        </ScrollView>
      </ProtectedRoute>
  );
};

export default ContractionTimer;