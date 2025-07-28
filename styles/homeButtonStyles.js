import { StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const homeButtonStyles = StyleSheet.create({
    buttonWrapper: {
        position: 'absolute',
        top: hp(2),    // קרוב יותר לקצה
        right: wp(4),
        zIndex: 10,
    },
    gradient: {
        paddingVertical: hp(0.8),
        paddingHorizontal: wp(2),
        borderRadius: wp(6),
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 3,
    },
    buttonText: {
        color: Colors.danger,
        fontSize: wp(1), // עדיין קריא, אבל קטן משמעותית
        fontWeight: 'bold',
    },
});

export { homeButtonStyles };