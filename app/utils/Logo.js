import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import { useRouter } from "expo-router";
import {
    logoStyle,
    FONT,
    IMG_H,
    IMG_W,
    LINE_Y_RATIO,
    TEXT_START_X,
} from "../../styles/logoStyle";

export function Logo() {
    const router = useRouter();

    const textTop = IMG_H * LINE_Y_RATIO - FONT * 0.76;

    return (
        <Pressable onPress={() => router.push("/overview")} hitSlop={10}>
            <View style={logoStyle.logoContainer}>
                <Image
                    source={require("../../assets/images/logo.png")}
                    style={logoStyle.logoImage}
                />
                <Text
                    style={[
                        logoStyle.logo,
                        logoStyle.logoTextOnLine,
                        { left: TEXT_START_X, top: textTop, fontSize: FONT },
                    ]}
                >
                    <Text style={logoStyle.mathColor}>Mama</Text>
                    <Text style={logoStyle.JourneyColor}>Track</Text>
                </Text>
            </View>
        </Pressable>
    );
}