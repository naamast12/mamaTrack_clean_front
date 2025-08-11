import {Pressable, Text, StyleSheet, TouchableOpacity, View} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { homeButtonStyles } from '../../styles/homeButtonStyles';
import sharedStyles from '../../styles/sharedStyles';
import {dashboardStyles} from "../../styles/dashboardStyles";
import {Feather, FontAwesome} from "@expo/vector-icons";
import {Colors} from "../../constants/Colors";
import React from "react";

export function HomeButton() {

    const router = useRouter();

    return (
        <View style={dashboardStyles.header}>
            <TouchableOpacity onPress={() => router.push('/overview')} style={dashboardStyles.logoutIconButton}>
                <FontAwesome name="home" size={50} color={Colors.primary} />
            </TouchableOpacity>
        </View>
    );

}

