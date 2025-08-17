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
        marginTop: 20,
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
        padding: width * 0.02,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: Colors.secondary,
        borderWidth: 1,
        borderRadius: 24,
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    logoutLabel: {
        color: Colors.secondary,
        fontWeight: '600',
        marginRight: 3,
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
