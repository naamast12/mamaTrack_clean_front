import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import contractionTimerStyles from '../../styles/contractionTimerStyles';
import storage from '../utils/storage';

const HOSPITAL_MESSAGE = "Your contractions are regular and strong – it's time to go to the hospital!";
const SERVER_URL = '<MY_SERVER_URL>';

const ContractionTimerScreen = () => {
  const [isTiming, setIsTiming] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [duration, setDuration] = useState(0);
  const [contractions, setContractions] = useState([]);
  const timerRef = useRef(null);
  const [showHospitalMessage, setShowHospitalMessage] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userError, setUserError] = useState(null);

  // Fetch userId and contractions on mount
  useEffect(() => {
    const init = async () => {
      try {
        const storedUserId = await storage.get('userId');
        const token = await storage.get('userToken');

        console.log('storedUserId:', storedUserId);
        console.log('token:', token);

        if (!storedUserId || !token) {
          setUserError('User ID or token missing. Please log in again.');
          return;
        }

        const res = await fetch(`${SERVER_URL}/api/contractions/${storedUserId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const text = await res.text(); // כדי להבין אם זו שגיאה עם HTML
          console.warn('Server returned error:', res.status, text);
          throw new Error(`Server error ${res.status}`);
        }

        const data = await res.json();

        const text = await res.text();
        try {
          const parsed = JSON.parse(text);

          if (!Array.isArray(parsed.contractions)) {
            throw new Error('Invalid contractions format');
          }

          const sorted = parsed.contractions.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
          const contractionsWithIntervals = sorted.map((c, idx, arr) => {
            const startTime = new Date(c.startTime).getTime();
            const duration = c.durationSeconds;
            let interval = null;
            if (idx > 0) {
              const prevStart = new Date(arr[idx - 1].startTime).getTime();
              interval = Math.round((startTime - prevStart) / 1000);
            }
            return { startTime, duration, interval };
          });

          setContractions(contractionsWithIntervals);
        } catch (jsonErr) {
          console.error('Response is not valid JSON:', text);
          throw new Error('Invalid response from server');
        }
      } catch (err) {
        setUserError('Error fetching contractions: ' + err.message);
      }
    };

    init();
  }, []);



  const handleButtonPress = async () => {
    if (!isTiming) {
      setStartTime(Date.now());
      setDuration(0);
      setIsTiming(true);
    } else {
      setIsTiming(false);
      if (startTime) {
        const endTime = Date.now();
        const contractionDuration = Math.round((endTime - startTime) / 1000);
        // POST to server with dynamic userId
        if (userId) {
          try {
            await fetch(`${SERVER_URL}/api/contractions`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                userId: userId,
                startTime: new Date(startTime).toISOString(),
                endTime: new Date(endTime).toISOString(),
                durationSeconds: contractionDuration,
              }),
            });

          } catch (err) {
            setUserError('Error posting contraction: ' + err.message);
          }
        }
        // Update local state
        const lastContraction = contractions[contractions.length - 1];
        const interval = lastContraction ? Math.round((startTime - lastContraction.startTime) / 1000) : null;
        setContractions([
          ...contractions,
          {
            startTime,
            duration: contractionDuration,
            interval,
          },
        ]);
      }
      setStartTime(null);
      setDuration(0);
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

  useEffect(() => {
    // Check for hospital message condition whenever contractions change
    if (contractions.length >= 4) {
      const lastFour = contractions.slice(-4);
      // All durations > 45s
      const allLong = lastFour.every(c => c.duration > 45);
      // All intervals between 180 and 300 seconds (3 to 5 min), skip first interval (can be null)
      const allIntervalsOk = lastFour.slice(1).every(c => c.interval !== null && c.interval >= 180 && c.interval <= 300);
      // Time span between first and last contraction is ≤30 minutes
      const timeSpan = lastFour[lastFour.length - 1].startTime - lastFour[0].startTime;
      const timeSpanOk = timeSpan <= 30 * 60 * 1000;
      if (allLong && allIntervalsOk && timeSpanOk) {
        setShowHospitalMessage(true);
      } else {
        setShowHospitalMessage(false);
      }
    } else {
      setShowHospitalMessage(false);
    }
  }, [contractions]);

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString();
  };

  return (
    <ScrollView contentContainerStyle={contractionTimerStyles.container}>
      <Text style={contractionTimerStyles.title}>Contraction Timer</Text>
      {userError && (
        <View style={{ backgroundColor: '#fff3cd', padding: 10, borderRadius: 8, marginBottom: 10 }}>
          <Text style={{ color: '#856404', fontWeight: 'bold', textAlign: 'center' }}>{userError}</Text>
        </View>
      )}
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
      {contractions.length === 0 && (
        <Text style={contractionTimerStyles.noData}>No contractions recorded yet.</Text>
      )}
      {contractions.map((c, idx) => (
        <View key={idx} style={contractionTimerStyles.listRow}>
          <Text style={contractionTimerStyles.cell}>{idx + 1}</Text>
          <Text style={contractionTimerStyles.cell}>{formatTime(c.startTime)}</Text>
          <Text style={contractionTimerStyles.cell}>{c.duration}</Text>
          <Text style={contractionTimerStyles.cell}>{c.interval !== null ? c.interval : '-'}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default ContractionTimerScreen;