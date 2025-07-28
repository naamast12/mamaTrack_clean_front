import {StyleSheet} from "react-native";
import {Colors} from "../constants/Colors";
import {widthPercentageToDP as wp} from "react-native-responsive-screen";

const logoStyle = StyleSheet.create({
    logo: {
        fontSize: wp(3), // למשל במקום 25
        fontWeight: 'bold',
        textAlign: 'left',       // מיושרים לשמאל
        alignSelf: 'flex-start', // ממוקם בצד שמאל של הקונטיינר
    },
    mathColor: {
        color: Colors.primary,
    },
    JourneyColor: {
        color: Colors.accent,
    },
});
export { logoStyle}
