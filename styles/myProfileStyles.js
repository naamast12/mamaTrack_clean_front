// styles/myProfileStyles.js
import { StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

export const myProfileStyles = StyleSheet.create({
    topCardRow: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        gap: 16,
    },
    // הוסיפי את הסטיילים האלה לקובץ myProfileStyles.js

// פריטי עריכה
    inputRow: {
        flexDirection: 'row-reverse',
        alignItems: 'flex-start',
        marginBottom: 16,
        gap: 8,
        flexWrap: 'wrap',
    },

    textInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        fontSize: 16,
        textAlign: 'right',
        backgroundColor: '#fff',
        minWidth: 100,
    },

// אופציות בחירה (מין עובר, קופת חולים)
    pickerWrapper: {
        flexDirection: 'row-reverse',
        flexWrap: 'wrap',
        gap: 8,
        flex: 1,
    },

    optionButton: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Colors.blue,
        backgroundColor: Colors.white,
    },

    optionButtonSelected: {
        backgroundColor: Colors.pinkAccent, // או הצבע המועדף שלך
        borderColor: Colors.pinkAccent,
    },

    optionText: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
    },

    optionTextSelected: {
        color: 'white',
        fontWeight: 'bold',
    },

// כפתור שמירת פרטים נוספים
    saveDetailsBtn: {
        backgroundColor: Colors.blueBgSoft, // או הצבע המועדף שלך
        marginTop: 16,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },

    avatarWrapper: {
        width: 120,
        height: 120,
        borderRadius: 60,
        overflow: 'hidden',
        backgroundColor: Colors.softGray, // במקום '#f2f2f2'
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 8,
    },

    infoRow: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        marginBottom: 6,
    },

    infoIcon: {
        marginLeft: 6,
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
        border: '1px solid ' + Colors.brandBorder,
        borderRadius: 10,
        backgroundColor: Colors.white, // במקום '#fff'
        cursor: 'pointer',
    },

    // מובייל: תיבה לקריאה בלבד לפתיחת ה‑picker
    nativeDateBox: {
        backgroundColor: Colors.white,   // במקום '#fff'
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 10,
        textAlign: 'center',
        width: 130,
        fontSize: 16,
        color: Colors.darkText,          // במקום '#000'
        borderWidth: 1,
        borderColor: Colors.brandBorder,
    },

    // כפתור שמירה פרוס לרוחב כמו הכרטיסים
    saveBtn: {
        flexBasis: '100%',
        width: '100%',
        alignSelf: 'center',
        marginTop: 8,
    },

    saveBtnText: {
        color: Colors.primary,
        fontWeight: '700',
        textAlign: 'center',
    },
});