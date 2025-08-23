import React, { useState, useRef, useEffect, useMemo } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert, Platform, KeyboardAvoidingView } from 'react-native';
import contractionTimerStyles from '../../styles/contractionTimerStyles';
import api from '../../src/api/axiosConfig';
import ProtectedRoute from "../../components/ProtectedRoute";
import { HomeButton } from "../utils/HomeButton";

const HOSPITAL_MESSAGE = "הצירים שלך סדירים וחזקים – הגיע הזמן ללכת לבית החולים!";

export default function ContractionTimer() {
  const [isTiming, setIsTiming] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [duration, setDuration] = useState(0);
  const [contractions, setContractions] = useState([]);
  const [showHospitalMessage, setShowHospitalMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const timerRef = useRef(null);
  const listRef = useRef(null);

  // ---- helpers ----
  const formatInterval = (seconds) => {
    if (!seconds || seconds < 0) return '-';
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    const parts = [];
    if (hours > 0) parts.push(`${hours} ${hours === 1 ? 'שעה' : 'שעות'}`);
    if (mins > 0) parts.push(`${mins} ${mins === 1 ? 'דקה' : 'דקות'}`);
    if (secs > 0) parts.push(`${secs} ${secs === 1 ? 'שנייה' : 'שניות'}`);
    return parts.join(' ו');
  };
  const formatTime = (ts) => (ts ? new Date(ts).toLocaleTimeString() : '');

  // ---- fetch ----
  const fetchContractions = async () => {
    setIsLoading(true);
    try {
      const res = await api.get('/api/contractions');
      if (res.data?.success) {
        const formatted = res.data.contractions.map((c, idx, arr) => {
          const start = new Date(c.startTime).getTime();
          const prevStart = idx > 0 ? new Date(arr[idx - 1].startTime).getTime() : null;
          const interval = prevStart !== null ? Math.round((start - prevStart) / 1000) : null;
          return { startTime: start, duration: c.durationSeconds, interval };
        });
        setContractions(formatted);
      }
    } catch (e) {
      console.error('שגיאה בשליפת צירים מהשרת:', e);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => { fetchContractions(); }, []);

  // ---- order like chat (newest first) & compute displayInterval vs next ----
  const ordered = useMemo(() => {
    const arr = [...contractions].sort((a, b) => b.startTime - a.startTime);
    return arr.map((c, idx) => {
      const olderBelow = idx < arr.length - 1 ? arr[idx + 1].startTime : null;
      const displayInterval = olderBelow != null ? Math.round((c.startTime - olderBelow) / 1000) : null;
      return { ...c, displayInterval };
    });
  }, [contractions]);

  // ---- scroll to top (index 0) like chat ----
  const jumpToTop = (animated = true) => {
    requestAnimationFrame(() => {
      if (ordered.length > 0) {
        listRef.current?.scrollToIndex({ index: 0, animated });
      }
    });
  };

  // ---- start/stop timer ----
  const handleButtonPress = async () => {
    if (!isTiming) {
      const now = Date.now();
      setStartTime(now);
      setDuration(0);
      setIsTiming(true);
      return;
    }

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
      if (res.data?.success) {
        setContractions(prev => {
          const last = prev[prev.length - 1] || null;
          const interval = last ? Math.round((startTime - last.startTime) / 1000) : null;
          return [...prev, { startTime, duration: contractionDuration, interval }];
        });
        // כמו בצ'אט: אחרי שהרנדר/מדידה קורים, קופצים לראש
        requestAnimationFrame(() => jumpToTop(true));
        setShowHospitalMessage(res.data.shouldGoToHospital);
      }
    } catch (e) {
      console.error("שגיאה בשמירת ציר:", e);
    } finally {
      setStartTime(null);
      setDuration(0);
    }
  };

  // ---- delete all ----
  const handleResetContractions = async () => {
    try {
      const res = await api.delete('/api/contractions');
      if (res.data?.success) {
        setContractions([]);
        setShowHospitalMessage(false);
        alert("הצירים נמחקו בהצלחה ✅");
      } else {
        alert("⚠️ לא הצלחנו למחוק את הצירים");
      }
    } catch (e) {
      console.error('❌ שגיאה במחיקת הצירים:', e);
      alert("שגיאה בעת מחיקת הצירים מהשרת.");
    }
  };

  useEffect(() => {
    if (isTiming && startTime) {
      timerRef.current = setInterval(() => {
        setDuration(Math.round((Date.now() - startTime) / 1000));
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isTiming, startTime]);

  // ---- row ----
  const renderItem = ({ item, index }) => (
      <View style={contractionTimerStyles.itemRow}>
        <View style={contractionTimerStyles.itemLeft}>
          <Text style={contractionTimerStyles.itemIndexBadge}>{ordered.length - index}</Text>
        </View>
        <View style={contractionTimerStyles.itemMiddle}>
          <Text style={contractionTimerStyles.itemTitle}>התחלה: {formatTime(item.startTime)}</Text>
          <Text style={contractionTimerStyles.itemSubtitle}>
            מרווח מהציר הקודם: {item.displayInterval != null ? formatInterval(item.displayInterval) : ' -'}
          </Text>
        </View>
        <View style={contractionTimerStyles.itemRight}>
          <View style={contractionTimerStyles.badge}>
            <Text style={contractionTimerStyles.badgeText}>{item.duration} שניות</Text>
            <Text style={contractionTimerStyles.badgeSubText}>משך ציר</Text>
          </View>
        </View>
      </View>
  );

  // ---- UI כמו בצ'אט: KeyboardAvoidingView + אזור פיד עם FlatList ----
  return (
      <ProtectedRoute requireAuth={true}>
        <>
          <HomeButton />

          <KeyboardAvoidingView
              style={[contractionTimerStyles.page, { flex: 1 }]}
              behavior={Platform.OS === "ios" ? "padding" : undefined}
              keyboardVerticalOffset={80}
          >
            <View style={[contractionTimerStyles.content, { flex: 1 }]}>
              {/* כרטיס הטיימר – סטטי, לא נגלל */}
              <View style={contractionTimerStyles.card}>
                <Text style={contractionTimerStyles.title}>⏱️ טיימר צירים</Text>
                <Text style={contractionTimerStyles.subtitle}>עקבי אחרי משך הציר והמרווחים ביניהם, נתריע לך כשיגיע הזמן לצאת לבית חולים 💗</Text>
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
                      onPress={handleResetContractions}
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

              {/* אזור הפיד – רק הוא נגלל */}
              {isLoading ? (
                  <Text style={contractionTimerStyles.emptyStateText}>טוען נתונים…</Text>
              ) : ordered.length === 0 ? (
                  <View style={contractionTimerStyles.emptyState}>
                    <Text style={contractionTimerStyles.emptyStateIcon}>🤰</Text>
                    <Text style={contractionTimerStyles.emptyStateText}>עדיין לא נרשמו צירים.</Text>
                  </View>
              ) : (
                  <View style={[contractionTimerStyles.feedArea, { flex: 1 }]}>
                    <FlatList
                        ref={listRef}
                        data={ordered}
                        keyExtractor={(item) => String(item.startTime)}
                        renderItem={renderItem}
                        showsVerticalScrollIndicator
                        contentContainerStyle={contractionTimerStyles.listContent}
                        // כמו בצ'אט: ברגע שהתוכן משתנה (נוסף חדש) – קופצים לראש
                        onContentSizeChange={() => jumpToTop(false)}
                        onScrollToIndexFailed={() => {
                          requestAnimationFrame(() => {
                            if (ordered.length > 0) listRef.current?.scrollToIndex({ index: 0, animated: true });
                          });
                        }}
                    />
                  </View>
              )}
            </View>
          </KeyboardAvoidingView>
        </>
      </ProtectedRoute>
  );
}