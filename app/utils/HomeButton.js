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
        // <Pressable onPress={() => router.push('/Dashboard')} style={homeButtonStyles.buttonWrapper}>
        //     <LinearGradient
        //         colors={['#ede9fe', '#c4b5fd']} // מעבר של סגול בהיר
        //         start={{ x: 1, y: 0 }}
        //         end={{ x: 0, y: 0 }}
        //         style={homeButtonStyles.gradient}
        //     >
        //         <Text style={homeButtonStyles.buttonText}>🏠</Text>
        //     </LinearGradient>
        // </Pressable>
        <View style={dashboardStyles.header}>
            <TouchableOpacity onPress={() => router.push('/Dashboard')} style={dashboardStyles.logoutIconButton}>
                <FontAwesome name="home" size={50} color={Colors.danger} />
            </TouchableOpacity>
        </View>
    );

}

