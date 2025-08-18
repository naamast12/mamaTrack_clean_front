// styles/myProfileStyles.js
import { StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

export const myProfileStyles = StyleSheet.create({
    topCardRow: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        gap: 16,
    },

    avatarWrapper: {
        width: 120,
        height: 120,
        borderRadius: 60,
        overflow: 'hidden',
        backgroundColor: Colors.lavenderBlush, // ורוד לבנדר בהיר לרקע האווטאר
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 8,
        borderWidth: 3,
        borderColor: Colors.palePink,
        elevation: 3,
        shadowColor: Colors.pinkShadowSoft,
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 6,
    },

    infoRow: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        marginBottom: 6,
    },

    infoIcon: {
        marginLeft: 6,
        color: Colors.skyBlue, // תכלת שמיים בהיר לאייקונים
    },

    inlineRow: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        marginTop: 6,
    },

    rowBetween: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 6,
    },

    // ווב: קלט תאריך מדומה שמדבר באותה שפה עיצובית
    webDateInput: {
        width: 120,
        textAlign: 'center',
        fontSize: 16,
        padding: 8,
        border: '2px solid ' + Colors.mistyRose, // ורוד ערפל עדין למסגרת
        borderRadius: 10,
        backgroundColor: Colors.white,
        cursor: 'pointer',
    },

    // מובייל: תיבה לקריאה בלבד לפתיחת ה‑picker
    nativeDateBox: {
        backgroundColor: Colors.white,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 10,
        textAlign: 'center',
        width: 130,
        fontSize: 16,
        color: Colors.deepText,
        borderWidth: 2,
        borderColor: Colors.mistyRose, // ורוד ערפל עדין למסגרת
    },

    // כפתור שמירה פרוס לרוחב כמו הכרטיסים
    saveBtn: {
        flexBasis: '100%',
        width: '100%',
        alignSelf: 'center',
        marginTop: 8,
        backgroundColor: Colors.skyBlue, // תכלת שמיים בהיר לכפתור שמירה
        paddingVertical: 12,
        borderRadius: 12,
        elevation: 3,
        shadowColor: Colors.skyBlue,
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 6,
        borderWidth: 2,
        borderColor: Colors.lightSkyBlue,
    },

    saveBtnText: {
        color: Colors.white, // לבן לטקסט על רקע תכלת
        fontWeight: '700',
        textAlign: 'center',
        fontSize: 16,
    },
});