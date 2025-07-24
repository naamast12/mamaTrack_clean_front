import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import contractionTimerStyles from '../../styles/contractionTimerStyles';

import api from '../../src/api/axiosConfig';
import ProtectedRoute from "../../components/ProtectedRoute";
import {HomeButton} from "../utils/HomeButton";
const HOSPITAL_MESSAGE = "Your contractions are regular and strong – it's time to go to the hospital!";

const ContractionTimer = () => {
  const [isTiming, setIsTiming] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [duration, setDuration] = useState(0);
  const [contractions, setContractions] = useState([]);
  const [showHospitalMessage, setShowHospitalMessage] = useState(false);
  const timerRef = useRef(null);
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    async function fetchUserId() {
      try {
        const res = await api.get('/api/user');
        if (res.data && res.data.success) {
          setUserId(res.data.userId); // 💡 מניח שזה השם של השדה אצלך
        }
      } catch (err) {
        console.error('Error fetching user ID:', err);
      }
    }

    fetchUserId();
  }, []);


  // פונקציה להצגת אינטרוול בצורה ידידותית (לדוגמה: "3m 45s")
  const formatInterval = (seconds) => {
    if (!seconds || seconds < 0) return '-';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const fetchContractions = async () => {
    setIsLoading(true); // ⬅️ מתחילים טעינה
    try {
      const res = await api.get(`/api/contractions/${userId}`);

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
    }finally {
      setIsLoading(false); // ⬅️ סיימנו טעינה
    }
  };
  useEffect(() => {
    if (!userId) return;
    fetchContractions();
  }, [userId]);

  const handleButtonPress = async () => {
    if (!userId) return;

    if (!isTiming) {
      const now = Date.now();
      setStartTime(now);
      setDuration(0);
      setIsTiming(true);
    } else {
      setIsTiming(false);
      const endTime = Date.now();

      // בדיקה אם startTime באמת הוגדר
      if (!startTime) {
        alert("⚠️ התחלה לא אותחלה – נסי שוב.");
        return;
      }

      const contractionDuration = Math.round((endTime - startTime) / 1000);

      // בדיקה אם יצא משך חריג
      if (contractionDuration <= 0 || contractionDuration > 3600) {
        alert(`⚠️ משך חריג: ${contractionDuration} שניות – נא נסי שוב.`);
        return;
      }

      const payload = {
        userId,
        startTime: new Date(startTime).toISOString(),
        endTime: new Date(endTime).toISOString(),
        durationSeconds: contractionDuration,
      };

      try {
        const res = await api.post('/api/contractions', payload);
        if (res.data && res.data.success) {
          setContractions(prev => [...prev, {
            startTime,
            duration: contractionDuration,
            interval: null
          }]);
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
      if (userId) {
        await api.delete(`/api/contractions/${userId}`);
        await fetchContractions(); // 🟢 ריענון הנתונים מהשרת

      }
      setContractions([]);
      setShowHospitalMessage(false);
    } catch (err) {
      console.error('Error clearing contractions:', err);
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
          <Text style={contractionTimerStyles.title}>Contraction Timer</Text>

          <View style={contractionTimerStyles.timerContainer}>
            <Text style={contractionTimerStyles.timerText}>
              {isTiming ? `Duration: ${duration} sec` : 'Press start to begin timing'}
            </Text>

            <TouchableOpacity
                style={isTiming ? contractionTimerStyles.buttonRed : contractionTimerStyles.buttonBlue}
                onPress={handleButtonPress}
            >
              <Text style={contractionTimerStyles.buttonText}>
                {isTiming ? 'Stop Contraction' : 'Start Contraction'}
              </Text>
            </TouchableOpacity>

            {/* כפתור איפוס חדש */}
            <TouchableOpacity
                style={contractionTimerStyles.buttonGray}
                onPress={handleResetContractions}
            >
              <Text style={contractionTimerStyles.buttonText}>Clear</Text>
            </TouchableOpacity>
          </View>

          {showHospitalMessage && (
              <View style={contractionTimerStyles.hospitalMessageBox}>
                <Text style={contractionTimerStyles.hospitalMessageText}>{HOSPITAL_MESSAGE}</Text>
              </View>
          )}

          <Text style={contractionTimerStyles.listTitle}>Contractions</Text>
          <View style={contractionTimerStyles.listHeader}>
            <Text style={contractionTimerStyles.headerCell}>#</Text>
            <Text style={contractionTimerStyles.headerCell}>Start Time</Text>
            <Text style={contractionTimerStyles.headerCell}>Duration (s)</Text>
            <Text style={contractionTimerStyles.headerCell}>Interval (s)</Text>
          </View>

          {isLoading ? (
              <Text style={contractionTimerStyles.noData}>טוען נתונים...</Text>
          ) : contractions.length === 0 ? (
              <Text style={contractionTimerStyles.noData}>No contractions recorded yet.</Text>
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
          {contractions.map((c, idx) => (
              <View key={idx} style={contractionTimerStyles.listRow}>
                <Text style={contractionTimerStyles.cell}>{idx + 1}</Text>
                <Text style={contractionTimerStyles.cell}>{formatTime(c.startTime)}</Text>
                <Text style={contractionTimerStyles.cell}>{c.duration}</Text>
                <Text style={contractionTimerStyles.cell}>
                  {c.interval !== null ? formatInterval(c.interval) : '-'}
                </Text>
              </View>
          ))}
        </ScrollView>
      </ProtectedRoute>

  );
};

export default ContractionTimer;
