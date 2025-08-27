import React, { useState, useRef, useEffect, useMemo } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert, Platform, KeyboardAvoidingView } from 'react-native';
import contractionTimerStyles from '../../styles/contractionTimerStyles';
import api from '../../src/api/axiosConfig';
import ProtectedRoute from "../../components/ProtectedRoute";
import { HomeButton } from "../utils/HomeButton";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);


const HOSPITAL_MESSAGE = "הצירים שלך סדירים וחזקים – הגיע הזמן ללכת לבית החולים!";
const PATTERN_STARTING_MESSAGE = "הצירים מתחילים להיות סדירים – המשיכי לעקוב, אם זה נמשך כך ייתכן שתצטרכי לצאת בהמשך.";

// פרמטרים לוגיים
const SESSION_BREAK_SEC = 45 * 60;   // 45 דקות — חיתוך סשן
const MIN_STRONG_SEC   = 45;         // משך מינימלי לציר חזק
const MIN_INTERVAL_SEC = 3 * 60;     // תחתון: 3 דקות
const MAX_INTERVAL_SEC = 5 * 60;     // עליון: 5 דקות
const COUNT_PATTERN    = 4;          // כמה צירים ברצף כדי "מתחילים להיות סדירים"
const COUNT_HOSPITAL   = 8;          // כמה צירים ברצף כדי "זמן לבית חולים"

export default function ContractionTimer() {
  const [isTiming, setIsTiming] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [duration, setDuration] = useState(0);
  const [contractions, setContractions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const timerRef = useRef(null);
  const listRef = useRef(null);

  // כדי לא לשלוח התראות כפולות באותו סשן
  const notifiedRef = useRef({ patternStarting: false, shouldGoToHospital: false });

  // ---- helpers ----
  const formatInterval = (seconds) => {
    if (seconds == null || seconds < 0) return '-'; // 0 יציג "0 שניות"
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const parts = [];
    if (mins > 0) parts.push(`${mins} ${mins === 1 ? 'דקה' : 'דקות'}`);
    if (secs > 0 || mins === 0) parts.push(`${secs} ${secs === 1 ? 'שנייה' : 'שניות'}`);
    return parts.join(' ו');
  };
  const formatTime = (ts) => {
    if (!ts) return '';
    // ודאות שמדובר במילישניות (אם הגיע ב-10 ספרות -> שניות)
    const ms = typeof ts === 'number'
        ? (ts < 1e12 ? ts * 1000 : ts)
        : new Date(ts).getTime();

    // הזמן כבר מקומי, פשוט מציגים אותו
    return dayjs(ms).format('HH:mm:ss');
  };




  const showAlert = (title, message) => {
    if (Platform.OS === 'web') {
      alert(`${title}\n\n${message}`);
    } else {
      Alert.alert(title, message, [{ text: "הבנתי", style: "default" }], { cancelable: false });
    }
  };

  // מכין מערך כרונולוגי ישן→חדש עם מרווחים וגוזר סשנים ארוכים
  const buildOldToNewWithIntervals = (listOldToNew) => {
    const sorted = [...listOldToNew].sort((a, b) => a.startTime - b.startTime);
    return sorted.map((c, idx, arr) => {
      const prevStart = idx > 0 ? arr[idx - 1].startTime : null;
      let interval = prevStart !== null ? Math.round((c.startTime - prevStart) / 1000) : null;
      if (interval != null && interval > SESSION_BREAK_SEC) interval = null; // חיתוך סשן
      return { ...c, interval };
    });
  };

  // מחשב כמה צירים אחרונים עומדים ברצף בתנאים (משך וּמרווחים) — oldToNew ממוין ישן→חדש
  const countRecentStrongSeries = (oldToNew) => {
    let count = 0;
    for (let i = oldToNew.length - 1; i >= 0; i--) {
      const cur = oldToNew[i];

      // משך מינימלי לציר הנוכחי
      if ((cur?.duration ?? 0) < MIN_STRONG_SEC) break;

      if (count === 0) {
        // הראשון בשרשרת — לא בודקים מרווח אחורה
        count = 1;
      } else {
        // המרווח בין ה"חדש יותר" (i+1) לנוכחי נמצא על newer.interval
        const newer = oldToNew[i + 1];
        const interval = newer?.interval;

        if (interval != null && interval >= MIN_INTERVAL_SEC && interval <= MAX_INTERVAL_SEC) {
          count += 1;
        } else {
          break;
        }
      }
    }
    return count;
  };

  // בודק התראות לפי סדר עדיפויות (קודם 8 ואז 4) ומונע כפילויות — לוגיקה מקומית בלבד
  const maybeNotifyFromSeries = (oldToNew) => {
    const seriesCount = countRecentStrongSeries(oldToNew);

    if (!notifiedRef.current.shouldGoToHospital && seriesCount >= COUNT_HOSPITAL) {
      notifiedRef.current.shouldGoToHospital = true;
      showAlert("🏥 הגיע הזמן לבית החולים!", HOSPITAL_MESSAGE);
      return; // אם כבר 8, אין צורך גם ב-4
    }

    if (!notifiedRef.current.patternStarting && seriesCount >= COUNT_PATTERN) {
      notifiedRef.current.patternStarting = true;
      showAlert("⏳ הצירים מתחילים להיות סדירים", PATTERN_STARTING_MESSAGE);
    }
  };

  // ---- fetch ----
  const fetchContractions = async () => {
    setIsLoading(true);
    try {
      const res = await api.get('/api/contractions');
      if (res.data?.success) {
        const serverList = res.data.contractions.map(c => ({
          startTime: new Date(c.startTime).getTime(),
          duration: c.durationSeconds,
        }));
        const withIntervals = buildOldToNewWithIntervals(serverList);

        // אפשר להתריע גם בעת טעינה אם כבר עומדים בקריטריונים
        maybeNotifyFromSeries(withIntervals);

        setContractions(withIntervals);
      }
    } catch (e) {
      console.error('שגיאה בשליפת צירים מהשרת:', e);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => { fetchContractions(); }, []);

  // ---- order like chat (newest first) ----
  const ordered = useMemo(() => {
    const arr = [...contractions].sort((a, b) => b.startTime - a.startTime);
    return arr.map((c) => ({ ...c, displayInterval: c.interval }));
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
      await api.post('/api/contractions', payload);

      // רשימה חדשה ישן→חדש + מרווחים
      const nextOldToNew = buildOldToNewWithIntervals([
        ...contractions,
        { startTime, duration: contractionDuration }
      ]);

      // התחלה של סשן חדש? אפס דגלים
      if (nextOldToNew.length > 1) {
        const newest = nextOldToNew[nextOldToNew.length - 1];
        if (newest?.interval == null) {
          notifiedRef.current = { patternStarting: false, shouldGoToHospital: false };
        }
      }

      // קובעים התראות לפי הלוגיקה המקומית בלבד (4/8)
      maybeNotifyFromSeries(nextOldToNew);

      // עדכון סטייט וקפיצה לראש
      setContractions(nextOldToNew);
      requestAnimationFrame(() => jumpToTop(true));

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
        // מאפס דגלי התראות לסשן חדש
        notifiedRef.current = { patternStarting: false, shouldGoToHospital: false };
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
                <Text style={contractionTimerStyles.subtitle}>איך אנחנו מתזמנים? כאשר הצירים מופיעים כל 5 דקות ונמשכים דקה כל אחד הגיע הזמן לצאת לבית חולים🥳</Text>

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
