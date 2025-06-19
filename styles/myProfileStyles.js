import {StyleSheet} from "react-native";
import {Colors} from "../constants/Colors";

const myProfileStyles = StyleSheet.create({
    scrollContainer: {
        paddingVertical: 24,
    },
    profileContainer: {
        backgroundColor: Colors.white,
        borderRadius: 12,
        padding: 20,
        maxWidth: 600,
        marginRight: 20,
    },
    avatarWrapper: {
        backgroundColor: Colors.triteWhite,
        borderRadius: 100,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        width: 170,
        height: 170,
        alignSelf: 'center',
    },
    profileSectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 50,
        color: Colors.majorelleBlue,
        textAlign: 'center',
    },
    loadingText: {
        textAlign: 'center',
        marginTop: 20,
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 20,
    },
    profileLabels: {
        flexDirection: 'row-reverse',
        textAlign: 'right',
        margin: 10,
    },
    languageLabel: {
        fontSize: 16,
        padding: 5,
    },
    input: {
        fontSize: 18,
        paddingTop: 2,
    },
    saveButtonGradient: {
        paddingVertical: 14,
        paddingHorizontal: 25,
        borderRadius: 8,
        alignSelf: 'center',
        marginVertical: 16,
        width: 350,
    },
    buttonText: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },

});
export { myProfileStyles}
