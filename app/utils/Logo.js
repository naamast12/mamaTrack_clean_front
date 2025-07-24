import { Pressable, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import {dashboardStyles} from "../../styles/dashboardStyles";
import React from "react";
import {logoStyle} from "../../styles/logoStyle";

export function Logo() {

    const router = useRouter();

    return (
        <Text style={logoStyle.logo}>
            <Text style={logoStyle.mathColor}>Mama</Text>
            <Text style={logoStyle.JourneyColor}>Track</Text>
        </Text>
    );
}

