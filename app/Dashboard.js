
import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Animated,
} from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import ProtectedRoute from '@/components/ProtectedRoute';
import { dashboardStyles } from '../styles/dashboardStyles';
import { Colors } from '../constants/Colors';
import sharedStyles from '../styles/sharedStyles';
import storage from './utils/storage';
import api from '../src/api/axiosConfig';

export default function Dashboard() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        let isMounted = true;

        (async () => {
            try {
                const token = await storage.get('userToken');
                if (!token) {
                    if (isMounted) router.replace('/authentication/Login');
                    return;
                }
                await api.get('/api/user');
            } catch (err) {
                console.error("שגיאה באימות המשתמש:", err);
                if (isMounted) router.replace('/authentication/Login');
            } finally {
                if (isMounted) setLoading(false);
            }
        })();

        return () => {
            isMounted = false;
        };
    }, []);


    const handleLogout = async () => {
        try {
            await storage.remove('userToken');
        } catch (e) {
            console.log('Logout error:', e);
        }
        router.replace('/authentication/Login');
    };

    const goTo = (route) => () => {
        router.push(route);
    };

    return (
        <ProtectedRoute requireAuth={true}>
                <ScrollView contentContainerStyle={dashboardStyles.scrollContainer}>
                    <View style={dashboardStyles.header}>
                        <TouchableOpacity onPress={handleLogout} style={dashboardStyles.logoutIconButton}>
                            <Feather name="log-out" size={18} color={Colors.primary} />
                            <Text style={dashboardStyles.logoutLabel}>התנתקות</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row-reverse', justifyContent: 'center', width: '100%' }}>
                        <View style={dashboardStyles.dashboardContainer}>
                            <LinearGradient
                                colors={[Colors.primary, Colors.accent]}
                                start={{ x: 1, y: 0 }}
                                end={{ x: 0, y: 0 }}
                                style={dashboardStyles.gradientTitleWrapper}
                            >
                                <Text style={dashboardStyles.gradientTitle}>ברוכים הבאים ל־MamaTrack!</Text>
                            </LinearGradient>

                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                {[
                                    { label: 'הפרופיל שלי', route: 'MyProfile', icon: <FontAwesome name="user" size={20} color="white" /> },
                                    { label: 'תצוגה כללית', route: 'overview', icon: <Feather name="bar-chart-2" size={20} color="white" /> },
                                    { label: 'עדכונים שבועיים', route: 'weeklyUpdates', icon: <FontAwesome name="calendar" size={20} color="white" /> },
                                    { label: 'בדיקות צפויות', route: 'upcomingTests', icon: <Feather name="clipboard" size={20} color="white" /> },
                                    { label: 'שאלות נפוצות', route: 'faq', icon: <Feather name="help-circle" size={20} color="white" /> },
                                    { label: 'רשימת קניות לתינוק', route: 'babyChecklist', icon: <Feather name="shopping-cart" size={20} color="white" /> },
                                    { label: 'ציוד לחדר לידה', route: 'hospitalBag', icon: <MaterialCommunityIcons name="bag-suitcase" size={20} color="white" /> },
                                    { label: 'טיימר צירים', route: 'contractionTimer', icon: <Feather name="clock" size={20} color="white" /> },
                                ].map(({ label, route, icon }) => (
                                    <TouchableOpacity
                                        key={route}
                                        style={[sharedStyles.primaryButton, {
                                            width: 250,
                                            marginBottom: 12,
                                            flexDirection: 'row-reverse',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }]}
                                        onPress={goTo(route)}
                                    >
                                        {icon}
                                        <Text style={[sharedStyles.primaryButtonText, { marginHorizontal: 10 }]}>{label}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    </View>
                </ScrollView>
        </ProtectedRoute>
    );
}
