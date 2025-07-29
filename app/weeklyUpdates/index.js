// app/weeklyUpdates/index.js
import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import ProtectedRoute from '@/components/ProtectedRoute';
import { HomeButton } from '../utils/HomeButton';
import getWeeklyStyles from '../../styles/weeklyUpdatesStyles';
import api from '../../src/api/axiosConfig';
import { Colors } from '../../constants/Colors';

/** ---- API פנימי לקובץ ---- */
const useWeeklyApi = () => {
    const getWeeklyUpdate = useCallback(async (week) => {
        const { data } = await api.get(`/api/weekly/${week}`);
        return data; // אובייקט של השבוע
    }, []);
    return { getWeeklyUpdate };
};

/** נורמליזציה של שדות */
const normalizeWeekly = (u) => ({
    fetalDevelopment: u?.fetalDevelopment ?? u?.fetus ?? '',
    maternalChanges:  u?.maternalChanges  ?? u?.mother ?? '',
    symptoms:         Array.isArray(u?.symptoms)  ? u.symptoms  : [],
    nutrition:        Array.isArray(u?.nutrition) ? u.nutrition : [],
    exercise:         Array.isArray(u?.exercise)  ? u.exercise  : (Array.isArray(u?.activity) ? u.activity : []),
    tips:             Array.isArray(u?.tips)      ? u.tips      : [],
    redFlags:         Array.isArray(u?.redFlags)  ? u.redFlags  : [],
    babySize:         u?.babySize ?? null,
});

/** אייקונים לפי כותרת */
const ICONS = {
    'מידע על התפתחות העובר': 'baby-face-outline',
    'שינויים בגוף האישה':     'human-female',
    'תסמינים צפויים':         'alert-circle-outline',
    'תזונה מומלצת':           'food-apple',
    'פעילות גופנית':           'run',
    'טיפים':                   'lightbulb-on-outline',
    'מתי לפנות לרופא':         'stethoscope',
    'גודל התינוק':             'ruler',
};

export default function WeeklyUpdatesPage() {
    const styles = getWeeklyStyles(); // בלי מצב לילה
    const { getWeeklyUpdate } = useWeeklyApi();

    const [week, setWeek] = useState(12);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState('');

    // גווני מותג עדינים (רקע שקוף דק + צבע הדגשה)
    // גוונים שקופים עדינים מהמותג — קל לשלוט מהם בכל הכרטיסיות
    const ACCENT_TINT_DARK   = 'rgba(167,139,250,0.08)'; // accent כהה יותר
    const ACCENT_TINT_LIGHT  = 'rgba(167,139,250,0.04)'; // accent בהיר יותר
    const PRIMARY_TINT_DARK  = 'rgba(192,132,151,0.08)'; // primary כהה יותר
    const PRIMARY_TINT_LIGHT = 'rgba(192,132,151,0.04)'; // primary בהיר יותר
    const WARN_TINT          = 'rgba(220, 38, 38, 0.06)'; // אזהרה

// מיפוי לפי כותרת — מסודר כך שסמוכות יקבלו גוונים שונים
    const themeByTitle = {
        'מידע על התפתחות העובר': { bg: ACCENT_TINT_DARK,   accent: Colors.accent },  // סגלגל כהה עדין
        'שינויים בגוף האישה':     { bg: PRIMARY_TINT_LIGHT, accent: Colors.primary }, // ורדרד בהיר
        'תסמינים צפויים':         { bg: ACCENT_TINT_LIGHT,  accent: Colors.accent },  // סגלגל בהיר
        'תזונה מומלצת':           { bg: PRIMARY_TINT_DARK,  accent: Colors.primary }, // ורדרד כהה עדין
        'פעילות גופנית':           { bg: ACCENT_TINT_LIGHT,  accent: Colors.accent },  // סגלגל בהיר
        'טיפים':                   { bg: PRIMARY_TINT_LIGHT, accent: Colors.primary }, // ורדרד בהיר
        'מתי לפנות לרופא':         { bg: WARN_TINT,          accent: '#DC2626' },      // אדום עדין
        'גודל התינוק':             { bg: ACCENT_TINT_LIGHT,  accent: Colors.accent },  // סגלגל בהיר
    };


    // רכיב סקשן בתוך הקומפוננטה (יש גישה ל-styles ול-themeByTitle)
    const Section = ({ title, value }) => {
        const isList = Array.isArray(value);
        const lines  = isList ? value : (value ? [value] : []);
        if (!lines.length) return null;

        const palette = themeByTitle[title] ?? { bg: '#FFFFFF', accent: Colors.primary };
        const icon    = ICONS[title] || 'information-outline';

        return (
            <View
                style={[
                    styles.section,
                    { backgroundColor: palette.bg, borderTopWidth: 3, borderTopColor: palette.accent }
                ]}
            >
                <View style={styles.sectionHeader}>
                    <MaterialCommunityIcons
                        name={icon}
                        size={18}
                        color={palette.accent}
                        style={styles.sectionIcon}
                    />
                    <Text style={[styles.sectionTitle, { color: palette.accent }]}>{title}</Text>
                </View>

                {lines.map((t, i) => (
                    <Text key={i} style={styles.sectionLine}>
                        {isList ? `• ${t}` : t}
                    </Text>
                ))}
            </View>
        );
    };

    // טעינה ראשונית
    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                setLoading(true); setErr('');
                const user = await api.get('/api/user').catch(() => null);
                const serverWeek = user?.data?.pregnancyWeek;
                const w = Number.isFinite(serverWeek) ? serverWeek : week;
                if (mounted) setWeek(w);
                const d = await getWeeklyUpdate(w);
                if (mounted) setData(d);
            } catch {
                setErr('שגיאה בטעינת נתוני השבוע.');
            } finally {
                if (mounted) setLoading(false);
            }
        })();
        return () => { mounted = false; };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getWeeklyUpdate]);

    const changeWeek = async (next) => {
        setWeek(next);
        setLoading(true);
        try {
            const d = await getWeeklyUpdate(next);
            setData(d);
        } finally {
            setLoading(false);
        }
    };

    const onInc = () => changeWeek(Math.min(42, week + 1));
    const onDec = () => changeWeek(Math.max(1, week - 1));

    // מכינים את הסקשנים
    const normalized = normalizeWeekly(data || {});
    const sections = [
        { title: 'מידע על התפתחות העובר', value: normalized.fetalDevelopment },
        { title: 'שינויים בגוף האישה',     value: normalized.maternalChanges },
        { title: 'תסמינים צפויים',         value: normalized.symptoms },
        { title: 'תזונה מומלצת',           value: normalized.nutrition },
        { title: 'פעילות גופנית',           value: normalized.exercise },
        { title: 'טיפים',                   value: normalized.tips },
        { title: 'מתי לפנות לרופא',         value: normalized.redFlags },
        // {
        //     title: 'גודל התינוק',
        //     value: normalized.babySize
        //         ? [
        //             normalized.babySize.label,
        //             normalized.babySize.lengthCm ? `אורך משוער: ${normalized.babySize.lengthCm} ס״מ` : null,
        //             normalized.babySize.weightGr ? `משקל משוער: ${normalized.babySize.weightGr} גרם` : null,
        //         ].filter(Boolean)
        //         : null,
        // },
    ].filter(s => (Array.isArray(s.value) ? s.value.length : !!s.value));

    return (
        <ProtectedRoute requireAuth>
            <HomeButton />
            <View style={styles.container}>
                {/* גלילה על כל הדף */}
                <ScrollView contentContainerStyle={styles.pageContent}>
                    <View style={styles.inner}>
                        <Text style={styles.screenTitle}>עדכונים שבועיים</Text>

                        {/* בחירת שבוע */}
                        <View style={styles.weekRow}>
                            <TouchableOpacity onPress={onDec} style={styles.stepBtn}><Text style={styles.stepTxt}>−</Text></TouchableOpacity>
                            <Text style={styles.weekLabel}>שבוע {week}</Text>
                            <TouchableOpacity onPress={onInc} style={styles.stepBtn}><Text style={styles.stepTxt}>+</Text></TouchableOpacity>
                        </View>

                        {/* כרטיס גודל התינוק (אם יש) */}
                        {normalized.babySize && (
                            <View style={styles.heroCard}>
                                <Text style={styles.heroTitle}>גודל התינוק</Text>
                                <Text style={styles.heroText}>{normalized.babySize.label}</Text>
                            </View>
                        )}

                        {/* תוכן */}
                        {loading ? (
                            <View style={styles.centerBox}><ActivityIndicator /><Text style={{ marginTop: 8 }}>טוען…</Text></View>
                        ) : err ? (
                            <View style={styles.centerBox}><Text style={{ color: '#DC2626' }}>{err}</Text></View>
                        ) : !sections.length ? (
                            <View style={styles.centerBox}><Text>אין מידע לשבוע זה.</Text></View>
                        ) : (
                            sections.map((s, idx) => (
                                <Section key={idx} title={s.title} value={s.value} />
                            ))
                        )}
                    </View>
                </ScrollView>
            </View>
        </ProtectedRoute>
    );
}
