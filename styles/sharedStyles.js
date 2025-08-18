// sharedStyles.js
import { StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

const sharedStyles = StyleSheet.create({
    // טקסטים כלליים
    text: {
        fontSize: 18,
        color: Colors.deepText,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    linkText: {
        color: Colors.skyBlue, // תכלת שמיים בהיר לקישורים
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
    successText: {
        color: Colors.success,
        fontSize: 14,
        marginTop: 5,
    },
    errorText: {
        color: Colors.danger,
        fontSize: 12,
        marginBottom: 10,
        alignSelf: 'center',
    },

    // כפתורים
    primaryButton: {
        backgroundColor: Colors.pink400, // ורוד בהיר לכפתור ראשי
        paddingVertical: 14,
        borderRadius: 100,
        alignItems: 'center',
        marginTop: 20,
        width: '100%',
        elevation: 3,
        shadowColor: Colors.pinkShadowSoft,
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
    },
    primaryButtonText: {
        color: Colors.white,
        fontWeight: 'bold',
        fontSize: 16,
    },
    saveButton: {
        backgroundColor: Colors.skyBlue, // תכלת שמיים בהיר לכפתור שמירה
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        elevation: 2,
        shadowColor: Colors.skyBlue,
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    saveButtonText: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: '500',
    },

    // שדות טקסט / טפסים
    loginInput: {
        height: 50,
        borderWidth: 2,
        borderColor: Colors.mistyRose, // ורוד ערפל עדין למסגרת
        borderRadius: 25,
        paddingHorizontal: 20,
        marginBottom: 12,
        width: '100%',
        fontSize: 18,
        backgroundColor: Colors.white,
        textAlign: 'right',
        alignSelf: 'center',
        elevation: 1,
        shadowColor: Colors.pinkShadowSoft,
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
    },

    // כותרת גדולה
    bigBoldText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.pink700, // ורוד כהה לכותרת
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