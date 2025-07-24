import {StyleSheet} from "react-native";
import {Colors} from "../constants/Colors";
import {widthPercentageToDP as wp} from "react-native-responsive-screen";

const logoStyle = StyleSheet.create({
    logo: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        width: wp('100%'),
        alignSelf: 'center',
    },
    mathColor: {
        color: Colors.primary,
    },
    JourneyColor: {
        color: Colors.accent,
    },
});
export { logoStyle}
