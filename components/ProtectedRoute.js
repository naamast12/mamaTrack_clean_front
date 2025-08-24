// /components/ProtectedRoute.js
import React, { useEffect, useRef, useContext, useState } from 'react';
import { View, Animated, Text, ActivityIndicator } from 'react-native';
import { useRouter, useSegments } from 'expo-router';
import { AuthContext } from './ui/AuthProvider';
import { dashboardStyles } from '../styles/dashboardStyles';
import { Logo } from '../app/utils/Logo';
import storage from '../app/utils/storage';
import {useSafeNavigate} from "../app/utils/useSafeNavigate";

export default function ProtectedRoute({ children, requireAuth = false }) {
    const { user, isInit } = useContext(AuthContext);
    const router = useRouter();
    const segments = useSegments();
    const floatAnim = useRef(new Animated.Value(0)).current;

    const [redirecting, setRedirecting] = useState(false);
    const [hasToken, setHasToken] = useState(null); // null=עוד בודק, true/false=תוצאה

    const go = useSafeNavigate();

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(floatAnim, { toValue: -10, duration: 2000, useNativeDriver: true }),
                Animated.timing(floatAnim, { toValue: 0, duration: 2000, useNativeDriver: true }),
            ])
        ).start();
    }, [floatAnim]);

    // בדיקת טוקן מקומית (גיבוי ל-AuthContext)
    useEffect(() => {
        let alive = true;
        (async () => {
            const token = await storage.get('userToken');
            if (!alive) return;
            setHasToken(!!token);
        })();
        return () => { alive = false; };
    }, []);

    // לוגיקת ניתוב מרוכזת
    useEffect(() => {
        if (redirecting) return;
        if (hasToken === null || !isInit) return;

        const inAuth = segments?.[0] === 'authentication';

        // עמוד מוגן: אין user ואין טוקן → ללוגין
        if (requireAuth && !user && !hasToken && !inAuth) {
            setRedirecting(true);
            router.replace('/authentication/Login');
            return;
        }

        // עמודי אימות: יש user → לדאשבורד/אוברוויו
        if (!requireAuth && user && inAuth) {
            setRedirecting(true);
            go('/overview'); // אם היעד שלך הוא /overview – החליפי כאן
            return;
        }
    }, [requireAuth, user, isInit, hasToken, segments, router, redirecting]);

    // בזמן טעינה/בדיקה/רידיירקט – לא מציגים את הילדים
    if (redirecting || hasToken === null || !isInit) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator />
            </View>
        );
    }

    const inAuth = segments?.[0] === 'authentication';

    return (
        <View style={{ flex: 1, backgroundColor: '#fef7f9' }}>
            <View style={{ position: 'absolute', top: 20, left: 20, zIndex: 10 }}>
                <Logo />
            </View>

            {children}

        </View>
    );
}