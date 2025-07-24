import React, { useEffect, useState, useRef } from 'react';
import {View, Text, TouchableOpacity, ScrollView, Image, Dimensions, StyleSheet, Animated,} from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import ProtectedRoute from '@/components/ProtectedRoute';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import Cookies from 'js-cookie';
import {dashboardStyles} from '../styles/dashboardStyles'
import { Colors } from '../constants/Colors';
import sharedStyles from '../styles/sharedStyles';
import {myProfileStyles} from "../styles/myProfileStyles";
import {HomeButton} from "./utils/HomeButton";
import {Logo} from "./utils/Logo";



export default function Index() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    const pulseAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.2,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true,
                })
            ])
        ).start();

    }, []);

    useEffect(() => {
        const token = Cookies.get('userToken');
        if (!token) {
            setTimeout(() => {
                router.replace('/authentication/Login');
            }, 0);
            return;
        }

        setLoading(false); // או פשוט לא צריך את זה אם אין לך מצב טעינה
    }, []);

    if (loading) {
        return <Text>טעינה...</Text>; // או קומפוננטת טעינה אם יש לך כזו
    }

    const handleLogout = async () => {
        try {
            await axios.post('/api/logout');
        } catch (e) {
            console.log('Logout error:', e);
        }
        Cookies.remove('userToken');
        router.replace('/authentication/Login');
    };

    const goTo = (route) => () => {
        router.push(route);
    };

    return (
        <ProtectedRoute requireAuth={true}>
            <View style={{ flex: 1, backgroundColor: '#f2f2f2' }}>

            <ScrollView contentContainerStyle={dashboardStyles.scrollContainer}>

                <View style={dashboardStyles.header}>
                    {/* לוגו  */}
                    <Logo />


                    {/* כפתור התנתקות מצד ימין */}
                    <TouchableOpacity onPress={handleLogout} style={dashboardStyles.logoutIconButton}>
                        <Feather name="log-out" size={18} color={Colors.primary} />
                        <Text style={dashboardStyles.logoutLabel}>התנתקות</Text>
                    </TouchableOpacity>
                </View>


                <View style={{ flexDirection: "row-reverse", justifyContent: 'center', width: '100%' }}>
                    <View style={dashboardStyles.dashboardContainer}>
                <LinearGradient
                    colors={[Colors.primary, Colors.accent]}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 0, y: 0 }}
                    style={dashboardStyles.gradientTitleWrapper}
                >
                    <Text style={dashboardStyles.gradientTitle}>ברוכים הבאים ל MamaTrack!</Text>
                </LinearGradient>


                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    {[
                        { label: 'הפרופיל שלי', route: 'MyProfile', icon: <FontAwesome name="user" size={20} color="white" /> },
                        { label: 'תצוגה כללית', route: 'overview', icon: <Feather name="bar-chart-2" size={20} color="white" /> },
                        { label: 'עדכונים שבועיים', route: 'weeklyUpdates', icon: <FontAwesome name="calendar" size={20} color="white" /> },
                        { label: 'בדיקות צפויות', route: 'upcomingTests', icon: <Feather name="clipboard" size={20} color="white" /> },
                        { label: 'שאלות נפוצות', route: 'faq', icon: <Feather name="help-circle" size={20} color="white" /> },
                        { label: 'רשימות קניות', route: 'shoppingList', icon: <Feather name="shopping-cart" size={20} color="white" /> },
                        { label: 'ציוד לחדר לידה', route: 'hospitalBag', icon: <MaterialCommunityIcons name="bag-suitcase" size={20} color="white" /> },
                        { label: 'טיימר צירים', route: 'contractionTimer', icon: <Feather name="clock" size={20} color="white" /> },
                    ].map(({ label, route, icon }) => (
                        <TouchableOpacity
                            key={route}
                            style={[sharedStyles.primaryButton, { width: 250, marginBottom: 12, flexDirection: 'row-reverse', justifyContent: 'center', alignItems: 'center' }]}
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

            </View>

        </ProtectedRoute>
    );
}


