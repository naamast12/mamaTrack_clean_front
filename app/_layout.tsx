// app/_layout.tsx
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { AuthProvider, AuthContext } from '../components/ui/AuthProvider';

export default function RootLayout() {
    return (
        <AuthProvider>
            <AuthLoader>
                <ThemeProvider value={DefaultTheme}>
                    <Stack
                        screenOptions={{
                            headerShown: false,
                            freezeOnBlur: true,   // משאיר מסכים חיים כשעוברים לאחרים
                        }}
                    />
                </ThemeProvider>
            </AuthLoader>
        </AuthProvider>
    );
}

function AuthLoader({ children }: { children: React.ReactNode }) {
    const { isInit } = React.useContext(AuthContext);
    if (!isInit) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size="large" color={DefaultTheme.colors.text} />
                <Text>טוען...</Text>
            </View>
        );
    }
    return <>{children}</>;
}