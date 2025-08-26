// app/MyProfile.js
import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, ScrollView, Platform, Image as RNImage, ActivityIndicator,  TextInput, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
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

    const [lastPeriodDate, setLastPeriodDate] = useState(null);   // תאריך שמוצג במסך
    const [dueDate, setDueDate] = useState(null);
    const [pregnancyWeek, setPregnancyWeek] = useState(null);

    // בחירה/פתיחה של פיקרים
    const [isEditingPeriod, setIsEditingPeriod] = useState(false); // לשימוש בווב (react-datepicker)
    const [showDatePicker, setShowDatePicker] = useState(false);   // למובייל

    // שמירה אוטומטית
    const [saving, setSaving] = useState(false);
    const [saveOk, setSaveOk] = useState(false);
    const [prevDate, setPrevDate] = useState(null);
    // פרטים נוספים
    const [numberOfBirths, setNumberOfBirths] = useState('');
    const [babyGender, setBabyGender] = useState('');
    const [preferredHospital, setPreferredHospital] = useState('');
    const [healthInsurance, setHealthInsurance] = useState('');

// שמירת פרטים נוספים
    const [savingDetails, setSavingDetails] = useState(false);
    const [saveDetailsOk, setSaveDetailsOk] = useState(false);
    const genderOptions = [
        { label: 'לא ידוע', value: '' },
        { label: 'זכר', value: 'male' },
        { label: 'נקבה', value: 'female' },
    ];

    const insuranceOptions = [
        { label: 'בחרי קופת חולים', value: '' },
        { label: 'כללית', value: 'clalit' },
        { label: 'מכבי', value: 'maccabi' },
        { label: 'מאוחדת', value: 'meuhedet' },
        { label: 'לאומית', value: 'leumit' },
    ];


    useEffect(() => {
        fetchUserFromServer();
    }, []);

    async function fetchUserFromServer() {
        try {
            const res = await api.get('/api/user');
            if (res.data && res.data.success) {
                setName(`${res.data.firstName} ${res.data.lastName}`);
                setEmail(res.data.mail);
                setLastPeriodDate(res.data.lastPeriodDate); // מחרוזת yyyy-MM-dd מהשרת
                setDueDate(res.data.estimatedDueDate);
                setPregnancyWeek(res.data.pregnancyWeek);
            }
        } catch (err) {
            console.log('שגיאה בקבלת נתוני משתמש:', err);
        } finally {
            setIsLoading(false);
        }
    }

    function fmt(date) {
        if (!date) return '';
        if (typeof date === 'string') return date;
        return date.toISOString().split('T')[0];
    }

    async function saveDateToServer(date) {
        const iso = date.toISOString().slice(0, 10);
        return api.put('/api/user/preferences', { lastPeriodDate: iso });
    }

    async function handleSelectDate(date) {
        if (!date) return;
        // אם אין שינוי — אל תשמרי
        if (lastPeriodDate && fmt(date) === fmt(lastPeriodDate)) {
            setIsEditingPeriod(false);
            setShowDatePicker(false);
            return;
        }

        // Optimistic update
        setPrevDate(lastPeriodDate);
        setLastPeriodDate(fmt(date));
        setSaving(true);
        setSaveOk(false);

        try {
            await saveDateToServer(date);
            setSaveOk(true);
            // רענון נתונים נגזרים (שבוע/דיו דייט) אם השרת מחשב — אופציונלי
            await fetchUserFromServer();
        } catch (e) {
            console.log('שגיאה בעדכון תאריך וסת:', e);
            // שחזור לערך הישן
            setLastPeriodDate(prevDate);
            alert('אירעה שגיאה בשמירת התאריך. נסי שוב.');
        } finally {
            setSaving(false);
            setIsEditingPeriod(false);
            setShowDatePicker(false);
            // ניקוי הודעת הצלחה אחרי כמה שניות
            setTimeout(() => setSaveOk(false), 2500);
        }
    }
    async function saveAdditionalDetailsToServer() {
        const details = {
            numberOfBirths: numberOfBirths ? parseInt(numberOfBirths) : null,
            babyGender: babyGender || null,
            preferredHospital: preferredHospital || null,
            healthInsurance: healthInsurance || null,
        };

        try {
            const response = await api.put('/api/user/details', details);
            return response;
        } catch (error) {
            console.error('❌ שגיאה בשמירת פרטים נוספים:', error?.response?.data || error.message);
            throw error;
        }
    }

    async function handleSaveAdditionalDetails() {
        setSavingDetails(true);
        setSaveDetailsOk(false);

        try {
            await saveAdditionalDetailsToServer();
            setSaveDetailsOk(true);
            await fetchUserFromServer(); // רענון מהשרת
            Alert.alert('הצלחה', 'הפרטים הנוספים נשמרו בהצלחה');
        } catch (e) {
            Alert.alert('שגיאה', 'אירעה שגיאה בשמירת הפרטים. נסי שוב.');
        } finally {
            setSavingDetails(false);
            setTimeout(() => setSaveDetailsOk(false), 2500);
        }
    }


    // פתיחת פיקר לפי פלטפורמה
    function openDatePicker() {
        if (Platform.OS === 'web') {
            setIsEditingPeriod(true); // מציג את react-datepicker
        } else {
            setShowDatePicker(true);  // RN DateTimePicker
        }
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
                            colors={[Colors.pink, Colors.blue]}
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

                                        {/* תאריך וסת אחרון (ללא עיפרון בשורה) */}
                                        <View style={myProfileStyles.inlineRow}>
                                            <View style={myProfileStyles.inlineRow}>
                                                <FontAwesome name="calendar" size={18} color={Colors.brand} style={myProfileStyles.infoIcon} />
                                                <Text style={styles.sectionText}>
                                                    תאריך וסת אחרון: {fmt(lastPeriodDate) || '—'}
                                                </Text>
                                            </View>


                                        </View>



                                        {/* תאריך לידה משוער */}
                                        <View style={myProfileStyles.inlineRow}>
                                            <FontAwesome name="child" size={18} color={Colors.brand} style={myProfileStyles.infoIcon} />
                                            <Text style={styles.sectionText}>תאריך לידה משוער: {dueDate || '—'}</Text>
                                        </View>

                                        {/* שבוע נוכחי + התקדמות */}
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

                                {/* כרטיס פרטים נוספים */}
                                <View style={[styles.section, styles.sectionLg, { marginBottom: 12 }]}>
                                    <Text style={styles.sectionTitle}>פרטים נוספים:</Text>

                                    {/* מספר לידות קודמות */}
                                    <View style={myProfileStyles.inputRow}>
                                        <FontAwesome name="baby" size={18} color={Colors.brand} style={myProfileStyles.infoIcon} />
                                        <Text style={styles.sectionText}>מספר לידות קודמות:</Text>
                                        <TextInput
                                            style={myProfileStyles.textInput}
                                            value={numberOfBirths}
                                            onChangeText={setNumberOfBirths}
                                            placeholder="0"
                                            keyboardType="numeric"
                                            maxLength={2}
                                        />
                                    </View>

                                    {/* מין העובר */}
                                    <View style={myProfileStyles.inputRow}>
                                        <FontAwesome name="venus-mars" size={18} color={Colors.brand} style={myProfileStyles.infoIcon} />
                                        <Text style={styles.sectionText}>מין העובר:</Text>
                                        <View style={myProfileStyles.pickerWrapper}>
                                            {genderOptions.map((option) => (
                                                <Pressable
                                                    key={option.value}
                                                    style={[
                                                        myProfileStyles.optionButton,
                                                        babyGender === option.value && myProfileStyles.optionButtonSelected,
                                                    ]}
                                                    onPress={() => setBabyGender(option.value)}
                                                >
                                                    <Text
                                                        style={[
                                                            myProfileStyles.optionText,
                                                            babyGender === option.value && myProfileStyles.optionTextSelected,
                                                        ]}
                                                    >
                                                        {option.label}
                                                    </Text>
                                                </Pressable>
                                            ))}
                                        </View>
                                    </View>

                                    {/* בית חולים מועדף */}
                                    <View style={myProfileStyles.inputRow}>
                                        <FontAwesome name="hospital-o" size={18} color={Colors.brand} style={myProfileStyles.infoIcon} />
                                        <Text style={styles.sectionText}>בית חולים מועדף:</Text>
                                        <TextInput
                                            style={[myProfileStyles.textInput, { flex: 1 }]}
                                            value={preferredHospital}
                                            onChangeText={setPreferredHospital}
                                            placeholder="הכניסי שם בית חולים"
                                            multiline={false}
                                        />
                                    </View>

                                    {/* קופת חולים */}
                                    <View style={myProfileStyles.inputRow}>
                                        <FontAwesome name="medkit" size={18} color={Colors.brand} style={myProfileStyles.infoIcon} />
                                        <Text style={styles.sectionText}>קופת חולים:</Text>
                                        <View style={myProfileStyles.pickerWrapper}>
                                            {insuranceOptions.map((option) => (
                                                <Pressable
                                                    key={option.value}
                                                    style={[
                                                        myProfileStyles.optionButton,
                                                        healthInsurance === option.value && myProfileStyles.optionButtonSelected,
                                                    ]}
                                                    onPress={() => setHealthInsurance(option.value)}
                                                >
                                                    <Text
                                                        style={[
                                                            myProfileStyles.optionText,
                                                            healthInsurance === option.value && myProfileStyles.optionTextSelected,
                                                        ]}
                                                    >
                                                        {option.label}
                                                    </Text>
                                                </Pressable>
                                            ))}
                                        </View>
                                    </View>

                                    {/* כפתור שמירה – ממולא (שיבלוט בתוך הכרטיס) */}
                                    {/* כפתור "שמרי פרטים נוספים" — הגרסה המקורית */}
                                    <Pressable
                                        onPress={handleSaveAdditionalDetails}
                                        style={[styles.navBtn, myProfileStyles.saveDetailsBtn]}
                                        disabled={savingDetails}
                                    >
                                        <View style={{ flexDirection: 'row-reverse', alignItems: 'center', gap: 6 }}>
                                            <FontAwesome name="save" size={18} color="white" />
                                            <Text style={[styles.navBtnText, { color: 'white' }]}>
                                                שמרי פרטים נוספים
                                            </Text>
                                            {savingDetails ? (
                                                <ActivityIndicator size="small" color="white" />
                                            ) : saveDetailsOk ? (
                                                <Text style={{ fontSize: 12, color: '#c8e6c9' }}>  נשמר ✓</Text>
                                            ) : null}
                                        </View>
                                    </Pressable>

                                </View>


                                {/* כפתור תחתון: "בחרי/ערכי תאריך" בלבד (פותח את הפיקר) */}
                                    <View style={styles.navGrid}>
                                        <Pressable
                                            onPress={openDatePicker}
                                            style={[styles.navBtn, styles.navBtnGhost, myProfileStyles.saveBtn]}
                                            accessibilityLabel="ערכי תאריך וסת אחרון"
                                        >


                                            <View style={{ flexDirection: 'row-reverse', alignItems: 'center', gap: 6 }}>
                                                <FontAwesome name="edit" size={18} color={Colors.brand} />
                                                <Text style={[styles.navBtnText, myProfileStyles.saveBtnText]}>
                                                    ערכי תאריך וסת אחרון
                                                </Text>

                                                {/* אינדיקציה לשמירה */}
                                                {saving ? (
                                                    <Text style={{ fontSize: 12, color: '#999' }}>  שומר…</Text>
                                                ) : saveOk ? (
                                                    <Text style={{ fontSize: 12, color: '#2e7d32' }}>  נשמר ✓</Text>
                                                ) : null}
                                                {/* בווב: פוקר תאריך (מוצג רק כשisEditingPeriod=true) */}
                                                {Platform.OS === 'web' && isEditingPeriod && (
                                                    <View style={{ zIndex: 9999, alignSelf: 'flex-end' }}>
                                                        <DatePicker
                                                            selected={lastPeriodDate ? new Date(fmt(lastPeriodDate)) : new Date()}
                                                            onChange={(date) => handleSelectDate(date)}
                                                            dateFormat="yyyy-MM-dd"
                                                            maxDate={new Date()}
                                                            portalId="root-portal"
                                                            popperPlacement="top" // ← ייפתח למעלה
                                                            onBlur={() => setIsEditingPeriod(false)}
                                                            customInput={
                                                                <input
                                                                    autoFocus
                                                                    style={myProfileStyles.webDateInput}
                                                                    readOnly
                                                                />
                                                            }
                                                        />
                                                    </View>
                                                )}

                                                {/* במובייל: RN DateTimePicker (modal) */}
                                                {showDatePicker && Platform.OS !== 'web' && (
                                                    <DateTimePicker
                                                        value={lastPeriodDate ? new Date(fmt(lastPeriodDate)) : new Date()}
                                                        mode="date"
                                                        display="default"
                                                        maximumDate={new Date()}
                                                        onChange={(event, selectedDate) => {
                                                            // באנדרואיד נורה גם 'dismissed'
                                                            if (Platform.OS === 'android') {
                                                                if (event?.type === 'set' && selectedDate) handleSelectDate(selectedDate);
                                                                setShowDatePicker(false);
                                                            } else {
                                                                // iOS: אפשר לבחור אוטומטית
                                                                if (selectedDate) handleSelectDate(selectedDate);
                                                                setShowDatePicker(false);
                                                            }
                                                        }}
                                                    />
                                                )}

                                            </View>

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