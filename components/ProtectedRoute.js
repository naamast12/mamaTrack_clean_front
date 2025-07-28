
// /components/ProtectedRoute.js
import React, { useEffect, useRef, useContext, useState } from 'react';
import { Redirect } from 'expo-router';
import { View, Animated, Text } from 'react-native';
import { AuthContext } from './ui/AuthProvider';
import { dashboardStyles } from '../styles/dashboardStyles';
import {Logo} from "../app/utils/Logo";
import {HomeButton} from "../app/utils/HomeButton";

export default function ProtectedRoute({ children, requireAuth }) {
    const { user, isInit } = useContext(AuthContext);
    const floatAnim = useRef(new Animated.Value(0)).current;
    const [redirected, setRedirected] = useState(false); // ✅ מנגנון מניעת לולאה

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(floatAnim, { toValue: -10, duration: 2000, useNativeDriver: true }),
                Animated.timing(floatAnim, { toValue: 0, duration: 2000, useNativeDriver: true }),
            ])
        ).start();
    }, []);

    // ✅ אם עדיין בטעינה, לא מציגים כלום
    if (!isInit) return null;

    // ✅ מנגנון מניעת לולאה: רק פעם אחת נבצע הפניה
    if (requireAuth && !user && !redirected) {
        setRedirected(true);
        return <Redirect href="/authentication/Login" />;
    }

    if (!requireAuth && user && !redirected) {
        setRedirected(true);
        return <Redirect href="/Dashboard" />;
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#f2f2f2' }}>
            <View style={{ position: 'absolute', top: 20, left: 20, zIndex: 10 }}>
                <Logo />
            </View>

            {children}
            {/* הסימנים המרחפים */}
            <Animated.View
                style={[dashboardStyles.floatingSymbol, { transform: [{ translateY: floatAnim }] }]}
                pointerEvents="none"
            >
                <Text style={dashboardStyles.floatingText}>👶</Text>
            </Animated.View>

            <Animated.View
                style={[dashboardStyles.floatingSymbol, dashboardStyles.bottomLeft, { transform: [{ translateY: floatAnim }] }]}
                pointerEvents="none"
            >
                <Text style={dashboardStyles.floatingText}>🤰</Text>
            </Animated.View>

        </View>
    );
}