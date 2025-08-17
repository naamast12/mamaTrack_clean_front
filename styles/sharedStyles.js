// sharedStyles.js
import { StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

const sharedStyles = StyleSheet.create({
    // טקסטים כלליים
    text: {
        fontSize: 18,
        color: 'black',
        marginBottom: 10,
        fontWeight: 'bold',

    },
    linkText: {
        color: Colors.blue,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
    successText: {
        color: 'green',
        fontSize: 14,
        marginTop: 5,
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginBottom: 10,
        alignSelf: 'center',
    },

    // כפתורים
    primaryButton: {
        backgroundColor: Colors.pink,
        paddingVertical: 14,
        borderRadius: 100,
        alignItems: 'center',
        marginTop: 20,
        width: '100%',
    },
    primaryButtonText: {
        color: Colors.white,
        fontWeight: 'bold',
        fontSize: 16,
    },
    saveButton: {
        backgroundColor: Colors.white,
        padding: 12,
        borderRadius: 5,
        alignItems: 'center',
    },
    saveButtonText: {
        color: 'white',
        fontSize: 16,
    },

    // שדות טקסט / טפסים
    loginInput: {
        height: 50,
        borderWidth: 1,
        borderColor: Colors.primary,
        borderRadius: 25,
        paddingHorizontal: 20,
        marginBottom: 12,
        width: '100%',
        fontSize: 18,
        backgroundColor: Colors.white,
        textAlign: 'right',
        alignSelf: 'center',
    },

    // כותרת גדולה
    bigBoldText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },

});

export default sharedStyles;