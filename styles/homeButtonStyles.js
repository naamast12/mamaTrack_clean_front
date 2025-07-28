import { Dimensions, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const baseSize = Math.min(screenWidth, screenHeight); // להתאים לאורך הקצר

const homeButtonStyles = StyleSheet.create({
    buttonWrapper: {
        position: 'absolute',
        top: baseSize * 0.02,    // למשל 2% מגובה/רוחב הקטן
        right: baseSize * 0.02,
        zIndex: 10,
    },
    gradient: {
        paddingVertical: baseSize * 0.01,
        paddingHorizontal: baseSize * 0.03,
        borderRadius: baseSize * 0.04,
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 3,
    },
    buttonText: {
        color: Colors.danger,
        fontSize: baseSize * 0.02, // יותר עקבי
        fontWeight: 'bold',
    },
});

export { homeButtonStyles };