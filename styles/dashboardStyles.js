import {StyleSheet} from "react-native";
import {Colors} from "../constants/Colors";
import {widthPercentageToDP as wp} from "react-native-responsive-screen";

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
        width: 500,
        height: 55,
    },
    gradientTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: Colors.white,
    },
    floatingSymbol: {
        position: 'absolute',
        bottom: 40,       // ⬇️ במקום top
        right: 20,
        opacity: 0.45,
    },
    bottomLeft: {
        top: undefined,
        bottom: 40,
        left: 20,
        right: undefined,
    },
    floatingText: {
        fontSize: 100,
    },
});
export { dashboardStyles}
