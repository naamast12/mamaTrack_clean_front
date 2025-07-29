import {Dimensions, StyleSheet} from "react-native";
import {Colors} from "../constants/Colors";
import {widthPercentageToDP as wp} from "react-native-responsive-screen";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const baseSize = Math.min(screenWidth, screenHeight);

const dashboardStyles = StyleSheet.create({
    scrollContainer: {
        alignItems: 'center',

    },
    dashboardContainer: {
        backgroundColor: Colors.white,
        borderRadius: 12,
        padding: 20,
        maxWidth: 600,
        marginRight: 20,
        width: '100%',          // ✅ תמיכה ברוחב מלא

    },
    header: {
        width: wp(90),
        flexDirection: 'row',
        justifyContent: 'flex-end', // ✅ שם את התוכן בימין
        alignItems: 'center',
        marginTop: 40,
    },
    logo: {
        fontSize: 25,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    mathColor: {
        color: Colors.primary,
    },
    JourneyColor: {
        color: Colors.accent,
    },
    logoutIconButton: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: Colors.primary,
        borderWidth: 1,
        borderRadius: 24,
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    logoutLabel: {
        color: Colors.primary,
        fontWeight: '600',
        marginRight: 6,
        fontSize: 14,
    },
    gradientTitleWrapper: {
        borderRadius: 20,
        padding: 10,
        alignSelf: 'center',
        width: '100%',
        height: 55,
        marginBottom:15
    },
    gradientTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: Colors.white,
    },
    floatingSymbol: {
        position: 'absolute',
        bottom: 10,       // ⬇️ במקום top
        right: 20,
        opacity: 0.45,
    },
    bottomLeft: {
        top: undefined,
        bottom: 10,
        left: 20,
        right: undefined,
    },
    floatingText: {
        fontSize: baseSize * 0.11,  // 7% מהצד הקצר של המסך – עקבי יותר
    },
});
export { dashboardStyles}
