//ProtectedRoute

import React, {useEffect, useRef, useState} from 'react';
import { Redirect } from 'expo-router';
import Cookies from 'js-cookie';
import axios from 'axios';
import {dashboardStyles} from "../styles/dashboardStyles";
import { View, Animated, Text } from 'react-native';


export default function ProtectedRoute({ children, requireAuth }) {
    const [isInit, setIsInit] = useState(false);
    const [user, setUser] = useState(null);
    const floatAnim = useRef(new Animated.Value(0)).current;


    useEffect(() => {
        // נבדוק /api/user רק אם ממש צריך (או אם requireAuth=true)
        // או שאפשר תמיד לבדוק.
        if (requireAuth) {
            axios.get('/api/user')
                .then(res => {
                    if (res.data && res.data.success) {
                        setUser(res.data);
                    } else {
                        Cookies.remove('userToken');
                        setUser(null);
                    }
                })
                .catch(() => {
                    Cookies.remove('userToken');
                    setUser(null);
                })
                .finally(() => {
                    setIsInit(true);
                });
        } else {
            // עמוד שלא דורש auth
            setIsInit(true);
        }
    }, [requireAuth]);

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(floatAnim, {
                    toValue: -10,
                    duration: 2000,
                    useNativeDriver: true,
                }),
                Animated.timing(floatAnim, {
                    toValue: 0,
                    duration: 2000,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    if (!isInit && requireAuth) {
        // בזמן הטעינה
        return null;
    }

    // אם הדף דורש התחברות אבל אין user => להפנות ל-login
    if (requireAuth && !user) {
        return <Redirect href="/authentication/Login" />;
    }

    // אם הדף לא דורש התחברות, אבל יש user => להפנות ל-dashboard
    if (!requireAuth && user) {
        return <Redirect href="/(tabs)/Dashboard" />;
    }



    // מציגים את הילדים כרגיל
    return (
        <View style={{ flex: 1 }}>
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

//end of ProtectedRoute