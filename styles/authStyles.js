import { StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

const authStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        marginTop: 40,

    },
    header: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 20,

    },
    gradientTitleWrapper: {
        borderRadius: 20,
        padding: 10,
        alignSelf: 'center',
        width: 500,
        height: 55,
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: Colors.primary,
        borderRadius: 25,
        paddingHorizontal: 20,
        marginBottom: 12,
        width: '100%',
        fontSize: 18,
        backgroundColor: Colors.grayish,
        textAlign: 'right',
        alignSelf: 'center',
    },
    cardContainer: {
        backgroundColor: Colors.white,
        borderRadius: 16,
        padding: 24,
        shadowColor: Colors.black,
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 4,
        width: '100%',
        maxWidth: 400,
        alignSelf: 'center',
    },
    emojiText: {
        fontSize: 24,
    },
    passwordWrapper: {
        position: 'relative',
        width: '100%',
        alignSelf: 'center',
        marginBottom: 12,
    },
    passwordInput: {
        height: 50,
        borderWidth: 1,
        borderColor: Colors.primary,
        borderRadius: 25,
        paddingHorizontal: 20,
        paddingLeft: 50,
        width: '100%',
        fontSize: 18,
        backgroundColor: Colors.grayish,
        textAlign: 'right',
    },
    emojiButton: {
        position: 'absolute',
        left: 15,
        top: 10,
    },
    label: {
        fontSize: 18,
        marginBottom: 5,
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    appTitle: {
        fontSize: 60,
        fontWeight: 'bold',
        color: Colors.dodgerBlue,
        fontFamily: 'Lato',
        marginTop: 120,
    },
    appSubtitle: {
        fontSize: 40,
        fontWeight: 'normal',
        color: Colors.dodgerBlue,
        textAlign: 'center',
        marginBottom: 450,
        fontFamily: 'Cochin',
    },
    imageStyle: {
        width: 500,
        height: 500,
        resizeMode: 'contain',
        borderRadius: 100,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 10,
    },
});
export { authStyles };