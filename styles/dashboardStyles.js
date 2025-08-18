import {Dimensions, StyleSheet} from "react-native";
import {Colors} from "../constants/Colors";
import {widthPercentageToDP as wp} from "react-native-responsive-screen";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const baseSize = Math.min(screenWidth, screenHeight);
const { width } = Dimensions.get('window');


const dashboardStyles = StyleSheet.create({
    scrollContainer: {
        alignItems: 'center',
        backgroundColor: Colors.softBluePink, // רקע תכלת-ורוד רך
    },
    dashboardContainer: {
        backgroundColor: Colors.white,
        borderRadius: 16,
        padding: 24,
        maxWidth: 600,
        marginRight: 20,
        width: '100%',          // ✅ תמיכה ברוחב מלא
        elevation: 6,
        shadowColor: Colors.pinkShadowSoft,
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 8 },
        shadowRadius: 16,
        borderWidth: 1,
        borderColor: Colors.mistyRose,
    },
    header: {
        width: wp(90),
        flexDirection: 'row',
        justifyContent: 'flex-end', // ✅ שם את התוכן בימין
        alignItems: 'center',
        marginTop: 20,
    },

    logo: {
        fontSize: 25,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    mathColor: {
        color: Colors.pink400, // ורוד בהיר יותר
    },
    JourneyColor: {
        color: Colors.skyBlue, // תכלת שמיים בהיר
    },
    logoutIconButton: {
        padding: width * 0.02,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: Colors.skyBlue, // תכלת שמיים בהיר למסגרת
        borderWidth: 2,
        borderRadius: 24,
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: Colors.lightCyan, // ציאן בהיר לרקע
        elevation: 2,
        shadowColor: Colors.skyBlue,
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    logoutLabel: {
        color: Colors.blue700, // כחול כהה לטקסט
        fontWeight: '600',
        marginRight: 3,
        fontSize: 14,
    },
    gradientTitleWrapper: {
        borderRadius: 20,
        padding: 12,
        alignSelf: 'center',
        width: '100%',
        height: 55,
        marginBottom: 15,
        backgroundColor: Colors.lavenderBlush, // ורוד לבנדר בהיר לרקע הכותרת
        borderWidth: 2,
        borderColor: Colors.palePink,
        elevation: 3,
        shadowColor: Colors.pinkShadowSoft,
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 6,
    },
    gradientTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: Colors.pink700, // ורוד כהה לטקסט
    },
    floatingSymbol: {
        position: 'absolute',
        bottom: 10,       // ⬇️ במקום top
        right: 20,
        opacity: 0.45,
        color: Colors.skyBlue, // תכלת שמיים בהיר לסמלים
    },
    bottomLeft: {
        top: undefined,
        bottom: 10,
        left: 20,
        right: undefined,
    },
    floatingText: {
        fontSize: baseSize * 0.11,  // 7% מהצד הקצר של המסך – עקבי יותר
        color: Colors.skyBlue, // תכלת שמיים בהיר לטקסט
    },
});
export { dashboardStyles}
