// app/upcomingTests/index.js
import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator /*, TextInput */ } from 'react-native';
import ProtectedRoute from '@/components/ProtectedRoute';
import { screenStyles as styles } from '../../styles/upcomingTestsStyles';
import api from '../../src/api/axiosConfig';
import TestCard from './TestCard';
import { HomeButton } from '../utils/HomeButton';

async function fetchAllPrenatalTests() {
    const { data } = await api.get('/api/tests/all');
    return data;
}
async function fetchPrenatalTestsByWeek(week) {
    const { data } = await api.get('/api/tests/upcoming', { params: { week } });
    return data;
}
async function fetchPrenatalTestsByTrimester(trimester) {
    const { data } = await api.get('/api/tests/by-trimester', { params: { trimester } });
    return data;
}

export default function UpcomingTests() {
    const [mode, setMode] = useState('week'); // 'week' | 'tri'
    const [week, setWeek] = useState(12);
    const [tri, setTri] = useState(2);
    const [search, setSearch] = useState('');
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                setLoading(true);
                setError('');
                try {
                    const userRes = await api.get('/api/user');
                    const serverWeek = userRes?.data?.pregnancyWeek;
                    if (mounted && Number.isFinite(serverWeek)) setWeek(serverWeek);
                    const data = await fetchPrenatalTestsByWeek(serverWeek ?? week);
                    if (mounted) setList(data);
                } catch {
                    // אם /api/user סגור/לא תקין — נטען הכל
                    const all = await fetchAllPrenatalTests();
                    if (mounted) setList(all);
                }
            } catch (e) {
                setError('שגיאה בטעינת הנתונים. נסי שוב מאוחר יותר.');
            } finally {
                if (mounted) setLoading(false);
            }
        })();
        return () => { mounted = false; };
    }, []);

    const loadByWeek = useCallback(async (w) => {
        try {
            setLoading(true);
            setError('');
            const data = await fetchPrenatalTestsByWeek(w);
            setList(data);
        } catch {
            setError('לא הצלחתי לטעון לפי שבוע.');
        } finally {
            setLoading(false);
        }
    }, []);

    const loadByTri = useCallback(async (t) => {
        try {
            setLoading(true);
            setError('');
            const data = await fetchPrenatalTestsByTrimester(t);
            setList(data);
        } catch {
            setError('לא הצלחתי לטעון לפי טרימסטר.');
        } finally {
            setLoading(false);
        }
    }, []);

    const onIncWeek = () => {
        const next = Math.min(42, (week || 1) + 1);
        setWeek(next);
        loadByWeek(next);
    };
    const onDecWeek = () => {
        const next = Math.max(1, (week || 1) - 1);
        setWeek(next);
        loadByWeek(next);
    };

    const onPickTri = (t) => {
        setTri(t);
        setMode('tri');
        loadByTri(t);
    };

    const onRefresh = async () => {
        setRefreshing(true);
        try {
            if (mode === 'week') await loadByWeek(week);
            else await loadByTri(tri);
        } finally {
            setRefreshing(false);
        }
    };

    const filtered = useMemo(() => {
        const s = (search || '').trim();
        if (!s) return list;
        const q = s.toLowerCase();
        return (list || []).filter((it) =>
            [it.title, it.purpose, it.howItDone, it.notes]
                .filter(Boolean)
                .some((txt) => String(txt).toLowerCase().includes(q))
        );
    }, [list, search]);

    return (
        <ProtectedRoute requireAuth>
            <View style={styles.container}>
                <Text style={styles.screenTitle}>בדיקות צפויות</Text>
                <HomeButton />

                {/* טאבים */}
                <View style={styles.modes}>
                    <TouchableOpacity
                        accessibilityRole="tab"
                        accessibilityState={{ selected: mode === 'week' }}
                        onPress={() => setMode('week')}
                        style={[styles.modeBtn, mode === 'week' && styles.modeActive]}
                    >
                        <Text style={[styles.modeTxt, mode === 'week' && styles.modeTxtActive]}>לפי שבוע</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        accessibilityRole="tab"
                        accessibilityState={{ selected: mode === 'tri' }}
                        onPress={() => setMode('tri')}
                        style={[styles.modeBtn, mode === 'tri' && styles.modeActive]}
                    >
                        <Text style={[styles.modeTxt, mode === 'tri' && styles.modeTxtActive]}>לפי טרימסטר</Text>
                    </TouchableOpacity>
                </View>

                {/* שליטת פילטר */}
                {mode === 'week' ? (
                    <View style={styles.weekRow}>
                        <TouchableOpacity onPress={onIncWeek} style={styles.stepBtn} accessibilityLabel="הגדלת שבוע">
                            <Text style={styles.stepTxt}>+</Text>
                        </TouchableOpacity>
                        <Text style={styles.weekLabel}>שבוע {week}</Text>
                        <TouchableOpacity onPress={onDecWeek} style={styles.stepBtn} accessibilityLabel="הקטנת שבוע">
                            <Text style={styles.stepTxt}>−</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.triRow}>
                        {[1, 2, 3].map((t) => (
                            <TouchableOpacity
                                key={t}
                                onPress={() => onPickTri(t)}
                                style={[styles.triBtn, tri === t && styles.triActive]}
                                accessibilityRole="button"
                                accessibilityState={{ selected: tri === t }}
                            >
                                <Text style={[styles.triTxt, tri === t && styles.triTxtActive]}>
                                    {t === 1 ? 'ראשון' : t === 2 ? 'שני' : 'שלישי'}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}

                {/* חיפוש (אם תרצי, החזירי את ה־TextInput) */}
                {/* <TextInput ... /> */}

                {/* תוכן */}
                {loading ? (
                    <View style={styles.centerBox}>
                        <ActivityIndicator />
                        <Text style={{ marginTop: 8 }}>טוען...</Text>
                    </View>
                ) : error ? (
                    <View style={styles.centerBox}>
                        <Text style={{ color: '#DC2626' }}>{error}</Text>
                    </View>
                ) : (
                    <FlatList
                        data={filtered}
                        keyExtractor={(item, idx) => `${item.id ?? item.title}-${idx}`}
                        renderItem={({ item }) => <TestCard item={item} />}
                        contentContainerStyle={{ paddingBottom: 24 }}
                        onRefresh={onRefresh}
                        refreshing={refreshing}
                        ListEmptyComponent={
                            <View style={styles.centerBox}>
                                <Text>אין תוצאות לסינון הנוכחי.</Text>
                            </View>
                        }
                    />
                )}
            </View>
        </ProtectedRoute>
    );
}
