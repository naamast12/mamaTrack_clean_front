// app/overview/index.js
import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView, Platform } from 'react-native';
import { useRouter } from 'expo-router';

import ProtectedRoute from '@/components/ProtectedRoute';
import { HomeButton } from '@/app/utils/HomeButton';
import api from '@/src/api/axiosConfig';
import getOverviewStyles from '../../styles/overviewStyles';

/** API קטן מקומי להבאת עדכון שבועי */
const useWeeklyApi = () => {
    const getWeeklyUpdate = useCallback(async (week) => {
        const { data } = await api.get(`/api/weekly/${week}`);
        return data;
    }, []);
    return { getWeeklyUpdate };
};

export default function OverviewScreen() {
    const router = useRouter();
    const styles = getOverviewStyles();
    const { getWeeklyUpdate } = useWeeklyApi();

    const [week, setWeek] = useState(12);
    const [weekly, setWeekly] = useState(null);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState('');

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                setLoading(true); setErr('');
                const user = await api.get('/api/user').catch(() => null);
                const sv = Number(user?.data?.pregnancyWeek);
                const w = Number.isFinite(sv) && sv >= 1 && sv <= 42 ? sv : 12;
                if (mounted) setWeek(w);
                const d = await getWeeklyUpdate(w);
                if (mounted) setWeekly(d);
            } catch {
                setErr('שגיאה בטעינת נתוני השבוע.');
            } finally {
                if (mounted) setLoading(false);
            }
        })();
        return () => { mounted = false; };
    }, [getWeeklyUpdate]);

    // נגזרות לתצוגה
    const progressPct = Math.max(0, Math.min(100, Math.round((week / 40) * 100)));

    const babySize   = weekly?.babySize ?? {};
    const sizeLabel  = babySize.label || '';
    const sizeEmoji  = babySize.emoji || ''; // ← נמשך ישירות מה‑JSON/API
    const lengthCm   = Number.isFinite(+babySize.lengthCm) ? +babySize.lengthCm : null;
    const weightGr   = Number.isFinite(+babySize.weightGr) ? +babySize.weightGr : null;

    // דיבוג: לראות מה הגיע מה‑API
    if (__DEV__) {
        // זה יופיע בקונסול של Metro
        console.log('Overview babySize from API =>', weekly?.babySize);
    }

    const whatsHappening  = weekly?.fetalDevelopment || '';
    const previewSymptoms = Array.isArray(weekly?.symptoms) ? weekly.symptoms.slice(0, 6) : [];
    const previewTips     = Array.isArray(weekly?.tips)     ? weekly.tips.slice(0, 6)     : [];

    return (
        <ProtectedRoute requireAuth={true}>
            <HomeButton />

            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.pageContent}>
                    <View style={styles.inner}>
                        <Text style={styles.screenTitle}>תצוגה כללית</Text>
                        <HomeButton />

                        {loading ? (
                            <View style={styles.centerBox}>
                                <ActivityIndicator />
                                <Text style={styles.centerNote}>טוען…</Text>
                            </View>
                        ) : err ? (
                            <View style={styles.centerBox}>
                                <Text style={[styles.centerNote, { color: '#DC2626' }]}>{err}</Text>
                            </View>
                        ) : (
                            <>
                                {/* ===== HEADER: ימין – כרטיס שבוע; משמאל – שני כפתורים אנכיים ===== */}
                                <View style={styles.headerRow}>
                                    {/* ימין: Hero קטן */}
                                    <View style={styles.headerRight}>
                                        <View style={styles.heroMini}>
                                            <Text style={styles.heroMiniWeek}>שבוע {week}</Text>

                                            {(sizeEmoji || sizeLabel) ? (
                                                <View style={styles.heroMiniLine}>
                                                    {sizeEmoji ? (
                                                        <Text
                                                            style={[
                                                                styles.heroMiniEmoji,
                                                                // איפוס פונט לאימוג׳י כדי לאפשר פונט אימוג׳י של המערכת
                                                                Platform.OS === 'android'
                                                                    ? { fontFamily: 'sans-serif', lineHeight: 44, includeFontPadding: false }
                                                                    : { fontFamily: undefined, lineHeight: 44 }
                                                            ]}
                                                        >
                                                            {sizeEmoji}
                                                        </Text>
                                                    ) : null}
                                                    {sizeLabel ? <Text style={styles.heroMiniSize}>{sizeLabel}</Text> : null}
                                                </View>
                                            ) : null}

                                            <View style={styles.progressMini} accessibilityLabel={`התפתחות ${progressPct}%`}>
                                                <View style={[styles.progressMiniFill, { width: `${progressPct}%` }]} />
                                            </View>
                                            <Text style={styles.progressMiniText}>{progressPct}% מהדרך</Text>

                                            {/* אם תרצי להציג גם את האורך/משקל מתחת לשורה:
                          השאירי את הקטע הבא, או מחקי אם לא צריך */}
                                            {(lengthCm || weightGr === 0 || weightGr) ? (
                                                <View style={{ marginTop: 6 }}>
                                                    {Number.isFinite(lengthCm) ? (
                                                        <Text style={[styles.sectionText, { textAlign: 'right', fontSize: 14 }]}>
                                                            אורך משוער: {lengthCm} ס״מ
                                                        </Text>
                                                    ) : null}
                                                    {Number.isFinite(weightGr) ? (
                                                        <Text style={[styles.sectionText, { textAlign: 'right', fontSize: 14 }]}>
                                                            משקל משוער: {weightGr} גרם
                                                        </Text>
                                                    ) : null}
                                                </View>
                                            ) : null}
                                        </View>
                                    </View>

                                    {/* שמאל: כפתורים אחד מתחת לשני */}
                                    <View style={styles.headerNavCol}>
                                        <TouchableOpacity
                                            onPress={() => router.push('/weeklyUpdates')}
                                            style={[styles.navBtn, styles.navBtnPrimary, styles.navBtnFull, { marginBottom: 8 }]}
                                        >
                                            <Text style={styles.navBtnText}>עדכונים שבועיים</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            onPress={() => router.push('/upcomingTests')}
                                            style={[styles.navBtn, styles.navBtnGhost, styles.navBtnFull]}
                                        >
                                            <Text style={[styles.navBtnText, styles.navBtnGhostText]}>בדיקות צפויות</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                {/* ===== CONTENT: מתחת ל‑Header – כרטיס גדול + שני חצאים ===== */}
                                {!!whatsHappening && (
                                    <View style={[styles.section, styles.sectionLg, styles.cardSpace]}>
                                        <Text style={styles.sectionTitle}>מה קורה השבוע</Text>
                                        <Text style={styles.sectionText}>{whatsHappening}</Text>
                                    </View>
                                )}

                                <View style={styles.halfRow}>
                                    {!!previewTips.length && (
                                        <View style={[styles.section, styles.sectionMd, styles.halfItem]}>
                                            <Text style={styles.sectionTitle}>מה כדאי לעשות</Text>
                                            <View style={styles.pillsRow}>
                                                {previewTips.map((t, i) => (
                                                    <View key={i} style={[styles.pill, styles.pillSecondary]}>
                                                        <Text style={styles.pillText}>{t}</Text>
                                                    </View>
                                                ))}
                                            </View>
                                        </View>
                                    )}

                                    {!!previewSymptoms.length && (
                                        <View style={[styles.section, styles.sectionSm, styles.halfItem]}>
                                            <Text style={styles.sectionTitle}>תסמינים נפוצים</Text>
                                            <View style={styles.pillsRow}>
                                                {previewSymptoms.map((s, i) => (
                                                    <View key={i} style={styles.pill}>
                                                        <Text style={styles.pillText}>{s}</Text>
                                                    </View>
                                                ))}
                                            </View>
                                        </View>
                                    )}
                                </View>
                            </>
                        )}
                    </View>
                </ScrollView>
            </View>
        </ProtectedRoute>
    );
}