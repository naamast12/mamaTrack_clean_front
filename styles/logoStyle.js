import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "../constants/Colors";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const baseSize = Math.min(screenWidth, screenHeight); // הצד הקצר

const logoStyle = StyleSheet.create({
    logo: {
        fontSize: baseSize * 0.05, // גודל רספונסיבי – למשל 5% מהצד הקצר
        fontWeight: 'bold',
        textAlign: 'left',
        alignSelf: 'flex-start',
    },
    mathColor: {
        color: Colors.primary,
    },
    JourneyColor: {
        color: Colors.accent,
    },
});

export { logoStyle };