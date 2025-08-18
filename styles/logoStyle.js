import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "../constants/Colors";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const baseSize = Math.min(screenWidth, screenHeight); // הצד הקצר

export const FONT = baseSize * 0.05;
export const IMG_H = FONT * 1.2;
export const IMG_W = IMG_H * 2.4;
export const LINE_Y_RATIO = 0.68;
export const TEXT_START_X = IMG_W * 0.38;

const logoStyle = StyleSheet.create({
    logo: {
        fontSize: baseSize * 0.05, // גודל רספונסיבי – למשל 5% מהצד הקצר
        fontWeight: 'bold',
        textAlign: 'left',
        alignSelf: 'flex-start',
        includeFontPadding: false,
        lineHeight: FONT,
    },
    mathColor: {
        color: Colors.pink400, // ורוד בהיר יותר למילה "math"
    },
    JourneyColor: {
        color: Colors.skyBlue, // תכלת שמיים בהיר למילה "Journey"
    },
    logoContainer: {
        position: "relative",
        height: IMG_H,
        width: IMG_W + 800,
    },
    logoImage: {
        position: "absolute",
        left: 0,
        bottom: 0,
        width: IMG_W,
        height: IMG_H,
        resizeMode: "contain",
    },
    logoTextOnLine: {
        position: "absolute",
    },
});

export { logoStyle };