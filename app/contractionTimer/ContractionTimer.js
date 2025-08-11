import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity ,FlatList,Alert} from 'react-native';
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
  const listRef = useRef(null);


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

// גלילה לראש הרשימה אחרי שהסטייט התעדכן
          setTimeout(() => {
            listRef.current?.scrollTo({ y: 0, animated: true });
          }, 0);

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

  const confirmResetContractions = () => {
    if (typeof window !== 'undefined' && window.confirm) {
      // מצב Web
      if (window.confirm('למחוק את כל הצירים? הפעולה בלתי הפיכה.')) {
        handleResetContractions();
      }
    } else {
      // מצב Mobile
      Alert.alert(
          'מחיקת כל הצירים',
          'למחוק את כל הצירים? הפעולה בלתי הפיכה.',
          [
            { text: 'בטל', style: 'cancel' },
            { text: 'מחק', style: 'destructive', onPress: handleResetContractions },
          ]
      );
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


  const ordered = [...contractions]
      .sort((a, b) => b.startTime - a.startTime) // חדש -> ישן
      .map((c, idx, arr) => {
        // הפריט הישן יותר נמצא "מתחת" (idx + 1)
        const olderBelow = idx < arr.length - 1 ? arr[idx + 1].startTime : null;
        const displayInterval =
            olderBelow != null ? Math.round((c.startTime - olderBelow) / 1000) : null;

        return { ...c, displayInterval };
      });
  return (
      <ProtectedRoute requireAuth={true}>
        <HomeButton />
        <ScrollView 
          style={contractionTimerStyles.page}
          contentContainerStyle={contractionTimerStyles.scrollContent}
          showsVerticalScrollIndicator={true}
          bounces={true}
          nestedScrollEnabled={true}
        >
          <View style={contractionTimerStyles.content}>
            <View style={contractionTimerStyles.card}>
              <Text style={contractionTimerStyles.title}>⏱️ טיימר צירים</Text>
              <Text style={contractionTimerStyles.subtitle}>עקבי אחרי משך הציר והמרווחים ביניהם</Text>
              <Text style={contractionTimerStyles.timerText}>
                {isTiming ? `משך: ${duration} שניות` : 'לחצי "התחל ציר" כדי להתחיל לתזמן'}
              </Text>

              <View style={contractionTimerStyles.buttonsRow}>
                <TouchableOpacity
                    style={[contractionTimerStyles.primaryButton, isTiming && contractionTimerStyles.dangerButton]}
                    onPress={handleButtonPress}
                >
                  <Text style={contractionTimerStyles.primaryButtonText}>
                    {isTiming ? 'עצור ציר' : 'התחל ציר'}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={contractionTimerStyles.ghostButton}
                    onPress={confirmResetContractions}
                >
                  <Text style={contractionTimerStyles.ghostButtonText}>נקה הכל</Text>
                </TouchableOpacity>
              </View>
            </View>

            {showHospitalMessage && (
                <View style={contractionTimerStyles.hospitalMessageBox}>
                  <Text style={contractionTimerStyles.hospitalMessageText}>{HOSPITAL_MESSAGE}</Text>
                </View>
            )}

            <View style={contractionTimerStyles.sectionHeader}>
              <Text style={contractionTimerStyles.listTitle}>📋 רשימת צירים</Text>
              <View style={contractionTimerStyles.decorativeLine} />
            </View>

            {isLoading ? (
                <Text style={contractionTimerStyles.emptyStateText}>טוען נתונים…</Text>
            ) : ordered.length === 0 ? (
                <View style={contractionTimerStyles.emptyState}>
                  <Text style={contractionTimerStyles.emptyStateIcon}>🤰</Text>
                  <Text style={contractionTimerStyles.emptyStateText}>עדיין לא נרשמו צירים.</Text>
                </View>
            ) : (
                <ScrollView
                    style={contractionTimerStyles.list}
                    contentContainerStyle={contractionTimerStyles.listContent}
                    showsVerticalScrollIndicator={true}
                    bounces={true}
                >
                  <View style={contractionTimerStyles.itemsContainer}>
                    {ordered.map((c, idx) => (
                        <View key={idx} style={contractionTimerStyles.itemRow}>
                          <View style={contractionTimerStyles.itemLeft}>
                            <Text style={contractionTimerStyles.itemIndexBadge}>
                              {ordered.length - idx}
                            </Text>
                          </View>

                          <View style={contractionTimerStyles.itemMiddle}>
                            <Text style={contractionTimerStyles.itemTitle}>התחלה: {formatTime(c.startTime)}</Text>
                            <Text style={contractionTimerStyles.itemSubtitle}> מרווח מהציר הקודם:
                              {c.displayInterval !== null ? formatInterval(c.displayInterval) : ' -'}
                              </Text>
                          </View>

                          <View style={contractionTimerStyles.itemRight}>
                            <View style={contractionTimerStyles.badge}>
                              <Text style={contractionTimerStyles.badgeText}>
                                {c.duration} שניות
                              </Text>
                              <Text style={contractionTimerStyles.badgeSubText}>משך ציר</Text>
                            </View>
                          </View>
                        </View>
                    ))}
                  </View>
                </ScrollView>
            )}
          </View>
        </ScrollView>
      </ProtectedRoute>
  );
};

export default ContractionTimer;