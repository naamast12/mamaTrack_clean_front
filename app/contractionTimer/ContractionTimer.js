import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import contractionTimerStyles from '../../styles/contractionTimerStyles';

const HOSPITAL_MESSAGE = "Your contractions are regular and strong – it's time to go to the hospital!";

const ContractionTimer = () => {
  const [isTiming, setIsTiming] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [duration, setDuration] = useState(0);
  const [contractions, setContractions] = useState([]);
  const [showHospitalMessage, setShowHospitalMessage] = useState(false);
  const timerRef = useRef(null);

  const handleButtonPress = () => {
    if (!isTiming) {
      setStartTime(Date.now());
      setDuration(0);
      setIsTiming(true);
    } else {
      setIsTiming(false);
      const endTime = Date.now();
      const contractionDuration = Math.round((endTime - startTime) / 1000);

      const lastContraction = contractions[contractions.length - 1];
      const interval = lastContraction
          ? Math.round((startTime - lastContraction.startTime) / 1000)
          : null;

      setContractions([
        ...contractions,
        {
          startTime,
          duration: contractionDuration,
          interval,
        },
      ]);

      setStartTime(null);
      setDuration(0);
    }
  };

  const handleResetContractions = () => {
    setContractions([]);
    setShowHospitalMessage(false);
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
    if (contractions.length >= 4) {
      const lastFour = contractions.slice(-4);
      const allLong = lastFour.every(c => c.duration > 45);
      const allIntervalsOk = lastFour.slice(1).every(c => c.interval !== null && c.interval >= 180 && c.interval <= 300);
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

export default ContractionTimer;
