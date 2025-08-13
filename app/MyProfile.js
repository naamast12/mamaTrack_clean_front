// app/MyProfile.js
import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, ScrollView, Platform, Image as RNImage, ActivityIndicator } from 'react-native';
import { FontAwesome, Feather } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-datepicker'; // לשימוש בווב
import 'react-datepicker/dist/react-datepicker.css';

import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

import ProtectedRoute from '@/components/ProtectedRoute';
import { HomeButton } from './utils/HomeButton';

import getOverviewStyles from '../styles/overviewStyles';
import { dashboardStyles } from '../styles/dashboardStyles';
import { Colors } from '../constants/Colors';
import { myProfileStyles } from '../styles/myProfileStyles';

import api from '../src/api/axiosConfig';

export default function MyProfile() {
    const router = useRouter();
    const styles = getOverviewStyles();

    const [isLoading, setIsLoading] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const [lastPeriodDate, setLastPeriodDate] = useState(null);
    const [dueDate, setDueDate] = useState(null);
    const [pregnancyWeek, setPregnancyWeek] = useState(null);

    const [isEditingPeriod, setIsEditingPeriod] = useState(false);
    const [editedPeriodDate, setEditedPeriodDate] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);

    useEffect(() => {
        fetchUserFromServer();
    }, []);

    async function fetchUserFromServer() {
        try {
            const res = await api.get('/api/user');
            if (res.data && res.data.success) {
                setName(`${res.data.firstName} ${res.data.lastName}`);
                setEmail(res.data.mail);
                setLastPeriodDate(res.data.lastPeriodDate);
                setDueDate(res.data.estimatedDueDate);
                setPregnancyWeek(res.data.pregnancyWeek);
            }
        } catch (err) {
            console.log('שגיאה בקבלת נתוני משתמש:', err);
        } finally {
            setIsLoading(false);
        }
    }

    async function saveChanges() {
        if (!editedPeriodDate) return;
        try {
            const iso = editedPeriodDate.toISOString().split('T')[0];
            const res = await api.put('/api/user/preferences', { lastPeriodDate: iso });
            if (res.data && res.data.success) {
                setLastPeriodDate(iso);
                setIsEditingPeriod(false);
                await fetchUserFromServer();
                alert('השינויים נשמרו בהצלחה!');
            }
        } catch (err) {
            console.log('שגיאה בעדכון תאריך וסת:', err);
            alert('אירעה שגיאה בשמירת השינויים, נסי שוב מאוחר יותר.');
        }
    }

    function fmt(date) {
        if (!date) return '';
        if (typeof date === 'string') return date;
        return date.toISOString().split('T')[0];
    }

    return (
        <ProtectedRoute requireAuth={true}>
            <View style={styles.container}>
                <View style={dashboardStyles.header}>
                    <HomeButton />
                </View>

                <ScrollView contentContainerStyle={styles.pageContent}>
                    <View style={styles.inner}>

                        <LinearGradient
                            colors={[Colors.primary, Colors.accent]}
                            start={{ x: 1, y: 0 }}
                            end={{ x: 0, y: 0 }}
                            style={dashboardStyles.gradientTitleWrapper}
                        >
                            <Text style={[dashboardStyles.gradientTitle, { textAlign: 'center', writingDirection: 'rtl' }]}>
                                פרופיל אישי
                            </Text>
                        </LinearGradient>

                        {isLoading ? (
                            <View style={styles.centerBox}>
                                <ActivityIndicator />
                                <Text style={styles.centerNote}>טוען נתוני משתמש…</Text>
                            </View>
                        ) : (
                            <>
                                {/* כרטיס עליון: תמונה + פרטים בסיסיים */}
                                <View style={[styles.section, styles.sectionLg, { marginBottom: 12 }]}>
                                    <View style={myProfileStyles.topCardRow}>
                                        <View style={myProfileStyles.avatarWrapper}>
                                            <RNImage
                                                source={require('../assets/images/pregnant-women.webp')}
                                                style={{ width: '100%', height: '100%' }}
                                                accessible
                                                accessibilityLabel="תמונת פרופיל"
                                            />
                                        </View>

                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.sectionTitle}>פרטים אישיים:</Text>

                                            <View style={myProfileStyles.infoRow}>
                                                <FontAwesome name="user" size={18} color={Colors.brand} style={myProfileStyles.infoIcon} />
                                                <Text style={styles.sectionText}>שם: {name || '—'}</Text>
                                            </View>

                                            <View style={myProfileStyles.infoRow}>
                                                <FontAwesome name="envelope" size={18} color={Colors.brand} style={myProfileStyles.infoIcon} />
                                                <Text style={styles.sectionText}>אימייל: {email || '—'}</Text>
                                            </View>

                                            <Pressable onPress={() => { alert("מצטערים, כרגע אנחנו תומכים רק בעברית....") }}>
                                                <View style={myProfileStyles.infoRow}>
                                                    <FontAwesome name="language" size={18} color={Colors.brand} style={myProfileStyles.infoIcon} />
                                                    <Text style={styles.sectionText}>שפת ממשק: עברית</Text>
                                                </View>
                                            </Pressable>

                                        </View>
                                    </View>
                                </View>

                                {/* כרטיס תאריכים/שבוע */}
                                <View style={[styles.section, styles.sectionLg, { marginBottom: 12 }]}>
                                    <Text style={styles.sectionTitle}>מידע על ההריון:</Text>

                                    {/* תאריך וסת אחרון + עריכה */}
                                    <View style={myProfileStyles.inlineRow}>
                                        <View style={myProfileStyles.inlineRow}>
                                            <FontAwesome name="calendar" size={18} color={Colors.brand} style={myProfileStyles.infoIcon} />
                                            <Text style={styles.sectionText}>תאריך וסת אחרון: {fmt(editedPeriodDate || lastPeriodDate) || '—'}  </Text>
                                        </View>

                                        {isEditingPeriod ? (
                                            Platform.OS === 'web' ? (
                                                <View style={{ zIndex: 9999 }}>
                                                    <DatePicker
                                                        selected={editedPeriodDate}
                                                        onChange={(date) => setEditedPeriodDate(date)}
                                                        dateFormat="yyyy-MM-dd"
                                                        maxDate={new Date()}
                                                        portalId="root-portal"
                                                        popperPlacement="bottom"
                                                        popperClassName="datepicker-popper"
                                                        onBlur={() => setIsEditingPeriod(false)} // סוגר אם יוצאים
                                                        customInput={
                                                            <input
                                                                autoFocus
                                                                style={{
                                                                    width: 110,
                                                                    textAlign: 'center',
                                                                    fontSize: 16,
                                                                    padding: 8,
                                                                    border: 'none',
                                                                    borderRadius: 10,
                                                                    backgroundColor: '#f2f2f2',
                                                                    cursor: 'pointer',
                                                                }}
                                                            />
                                                        }
                                                    />
                                                </View>
                                            ) : (
                                                <>
                                                    <Pressable onPress={() => setShowDatePicker(true)}>
                                                        <Text style={myProfileStyles.nativeDateBox}>
                                                            {editedPeriodDate
                                                                ? new Date(editedPeriodDate).toLocaleDateString('he-IL', { year: 'numeric', month: '2-digit', day: '2-digit' })
                                                                : 'בחרי תאריך'}
                                                        </Text>
                                                    </Pressable>

                                                    {showDatePicker && (
                                                        <DateTimePicker
                                                            value={editedPeriodDate || new Date()}
                                                            mode="date"
                                                            display="default"
                                                            maximumDate={new Date()}
                                                            onChange={(event, selectedDate) => {
                                                                setShowDatePicker(false);
                                                                setIsEditingPeriod(false);
                                                                if (selectedDate) setEditedPeriodDate(selectedDate);
                                                            }}
                                                        />
                                                    )}
                                                </>
                                            )
                                        ) : (
                                            <Pressable
                                                onPress={() => {
                                                    setEditedPeriodDate(lastPeriodDate ? new Date(lastPeriodDate) : new Date());
                                                    setIsEditingPeriod(true);
                                                }}
                                                accessibilityLabel="ערכי תאריך וסת אחרון"
                                            >
                                                <Feather name="edit" size={18} color={Colors.brand} />
                                            </Pressable>
                                        )}
                                    </View>

                                    {/* תאריך לידה משוער */}
                                    <View style={myProfileStyles.inlineRow}>
                                        <FontAwesome name="child" size={18} color={Colors.brand} style={myProfileStyles.infoIcon} />
                                        <Text style={styles.sectionText}>תאריך לידה משוער: {dueDate || '—'}</Text>
                                    </View>

                                    {/* שבוע נוכחי + התקדמות כמו ב-overview */}
                                    <View style={[myProfileStyles.inlineRow, { marginTop: 8 }]}>
                                        <FontAwesome name="heartbeat" size={18} color={Colors.brand} style={myProfileStyles.infoIcon} />
                                        <Text style={styles.sectionText}>שבוע נוכחי: {pregnancyWeek ?? '—'}</Text>
                                    </View>

                                    {Number.isFinite(+pregnancyWeek) ? (
                                        <>
                                            <View style={[styles.progressMini, { marginTop: 8 }]}>
                                                <View style={[styles.progressMiniFill, { width: `${Math.max(0, Math.min(100, Math.round((+pregnancyWeek / 40) * 100)))}%` }]} />
                                            </View>
                                            <Text style={styles.progressMiniText}>
                                                {Math.max(0, Math.min(100, Math.round((+pregnancyWeek / 40) * 100)))}% מהדרך
                                            </Text>
                                        </>
                                    ) : null}
                                </View>

                                {/* כפתור שמירה – באותו שפה עיצובית כמו כפתורי הניווט */}
                                <View style={styles.navGrid}>
                                    <Pressable
                                        onPress={saveChanges}
                                        style={[styles.navBtn, styles.navBtnGhost, myProfileStyles.saveBtn]}  // ← Ghost = רקע לבן + מסגרת
                                    >
                                        <Text style={[styles.navBtnText, myProfileStyles.saveBtnText]}>
                                            שמור תאריך וסת חדש
                                        </Text>
                                    </Pressable>
                                </View>

                            </>
                        )}
                    </View>
                </ScrollView>
            </View>
        </ProtectedRoute>
    );
}