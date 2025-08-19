// app/overview/index.js
import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView, Platform } from 'react-native';
import {FontAwesome,Feather, MaterialCommunityIcons} from '@expo/vector-icons';import { useRouter } from 'expo-router';
import ProtectedRoute from '@/components/ProtectedRoute';
import api from '@/src/api/axiosConfig';
import storage from '../utils/storage';
import getOverviewStyles from '../../styles/overviewStyles';
import {dashboardStyles} from "../../styles/dashboardStyles";
import {Colors} from "../../constants/Colors";
import {LinearGradient} from "expo-linear-gradient";
import styles from '../../styles/overviewStyles';

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
      // /* ── כפתור פרופיל צף ── */
      //     const ProfileButton = () => (
      //       <TouchableOpacity
      // style={styles.fabProfile}
      //     onPress={() => router.push('/MyProfile')}
      //     accessibilityLabel="עמוד פרופיל"
      //       >
      //         <MaterialCommunityIcons name="account-circle-outline" size={26} color="#FFF" />
      //       </TouchableOpacity>
      // );
    const handleLogout = async () => {
        try {
            await storage.remove('userToken');
        } catch (e) {
            console.log('Logout error:', e);
        }
        router.replace('/authentication/Login');
    };


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
            <View style={styles.container}>
                <View style={dashboardStyles.header}>
                    {/*<ProfileButton />*/}

                    <TouchableOpacity onPress={handleLogout} style={dashboardStyles.logoutIconButton}>
                        <Feather name="log-out" size={18} color={Colors.primary} />
                        <Text style={dashboardStyles.logoutLabel}>התנתקות</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView contentContainerStyle={styles.pageContent}>
                    <View style={styles.inner}>
                        <LinearGradient
                            colors={[Colors.pink, Colors.blue]}
                            start={{ x: 1, y: 0 }}
                            end={{ x: 0, y: 0 }}
                            style={dashboardStyles.gradientTitleWrapper}
                        >
                            <Text
                                style={[
                                    dashboardStyles.gradientTitle,
                                    {
                                        textAlign: 'center',        // ממרכז את הטקסט
                                        writingDirection: 'rtl',    // מוודא שהכיוון מימין לשמאל
                                    }
                                ]}
                            >
                                {'ברוכה הבאה!'}
                            </Text>
                        </LinearGradient>
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
                                <View style={styles.headerColumn}>
                                    {/* מלבן סקירה כללית */}
                                    <View style={styles.headerRight}>
                                        <View style={styles.heroMini}>
                                            {/* כפתור פרופיל בתוך הכרטיס */}
                                            <TouchableOpacity
                                                style={styles.profileBtnMini}
                                                onPress={() => router.push('/MyProfile')}
                                                accessibilityLabel="עמוד פרופיל"
                                            >
                                                <MaterialCommunityIcons
                                                    name="account-circle-outline"
                                                    size={18}
                                                    color="#FFF"
                                                />
                                                <Text style={styles.profileBtnMiniText}>עמוד פרופיל</Text>
                                            </TouchableOpacity>

                                            <Text style={styles.heroMiniWeek}>את בשבוע {week}</Text>

                                            {(sizeEmoji || sizeLabel) ? (
                                                <View style={styles.heroMiniLine}>
                                                    {sizeEmoji ? (
                                                        <Text style={styles.heroMiniEmoji}>{sizeEmoji}</Text>
                                                    ) : null}
                                                    {sizeLabel ? (
                                                        <Text style={styles.heroMiniSize}>
                                                            השבוע העובר בגודל של {sizeLabel}
                                                        </Text>
                                                    ) : null}
                                                </View>
                                            ) : null}


                                            <View style={styles.progressMini} accessibilityLabel={`התפתחות ${progressPct}%`}>
                                                <View style={[styles.progressMiniFill, { width: `${progressPct}%` }]} />
                                            </View>
                                            <Text style={styles.progressMiniText}>{progressPct}% מהדרך</Text>


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
                                </View>
                                {/* שלישיית הכפתורים */}
                                <View style={styles.navGrid}>
                                    <TouchableOpacity
                                        onPress={() => router.push('/weeklyUpdates')}
                                        style={[styles.navBtn, styles.navBtnPrimary, styles.navItem]}
                                    >
                                        <View style={styles.btnContent}>
                                            <FontAwesome name="calendar" size={20} color={Colors.ink} style={styles.btnIcon} />
                                            <Text style={styles.navBtnText}>עדכונים שבועיים</Text>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={() => router.push('/upcomingTests')}
                                        style={[styles.navBtn, styles.navBtnGhost, styles.navItem]}
                                    >
                                        <View style={styles.btnContent}>
                                            <Feather name="clipboard" size={20} color={Colors.ink} style={styles.btnIcon} />
                                            <Text style={[styles.navBtnText, styles.navBtnGhostText]}>בדיקות צפויות</Text>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={() => router.push('/faq')}
                                        style={[styles.navBtn, styles.navItem]}
                                    >
                                        <View style={styles.btnContent}>
                                            <Feather name="help-circle" size={20} color={Colors.ink} style={styles.btnIcon} />
                                            <Text style={[styles.navBtnText, styles.navBtnGhostText]}>שאלות נפוצות</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
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
                                                        <Text style={styles.pillText}>• {t}</Text>
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
                                                        <Text style={styles.pillText}>• {s}</Text>
                                                    </View>
                                                ))}
                                            </View>
                                        </View>
                                    )}
                                </View>
                            </>
                        )}
                        <View style={styles.actionRow}>
                            {/* 1. רשימת קניות לתינוק – לילך-בינוני */}
                            <TouchableOpacity
                                onPress={() => router.push('/babyChecklist')}
                                style={[styles.actionBtn, styles.actionLilac]}
                            >
                                <View style={styles.btnContent}>
                                    <Feather name="shopping-cart" size={20} color={Colors.ink} style={styles.btnIcon} />
                                    <Text style={styles.actionText}>רשימת קניות לתינוק</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => router.push('/contractionTimer')}
                                style={[styles.actionBtn, styles.actionBlue]}
                            >
                                <View style={styles.btnContent}>
                                    <Feather name="clock" size={20} color={Colors.ink} style={styles.btnIcon} />
                                    <Text style={styles.actionText}>טיימר צירים</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => router.push('/hospitalBag')}
                                style={[styles.actionBtn, styles.actionPeach]}
                            >
                                <View style={styles.btnContent}>
                                    <MaterialCommunityIcons name="bag-suitcase" size={20} color={Colors.ink} style={styles.btnIcon} />
                                    <Text style={styles.actionText}>רשימת ציוד לחדר לידה</Text>
                                </View>
                            </TouchableOpacity>


                            <TouchableOpacity
                                onPress={() => router.push('/chats')}
                                style={styles.chatBtnWide}
                            >
                                <View style={styles.btnContent}>
                                    <Feather name="message-circle" size={20} color={Colors.ink} style={styles.btnIcon} />
                                    <Text style={styles.chatBtnText}>הצטרפי לקהילה שלנו</Text>
                                </View>
                            </TouchableOpacity>


                        </View>


                    </View>
                </ScrollView>
            </View>
        </ProtectedRoute>
    );
}