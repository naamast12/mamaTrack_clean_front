// styles/faqListStyles.js
import { StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

const faqListStyles = StyleSheet.create({
    card: {
        backgroundColor: Colors.lavenderBlush, // ורוד לבנדר בהיר במקום לבן
        padding: 20,
        borderRadius: 16,
        elevation: 6,
        shadowColor: Colors.pinkShadowSoft,
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 8 },
        shadowRadius: 16,
        writingDirection: 'rtl',
        marginHorizontal: 16,
        marginTop: 16,
        borderWidth: 1,
        borderColor: Colors.mistyRose, // ורוד ערפל עדין
        width: '90%', // לא על כל המסך
        maxWidth: 600, // מקסימום רוחב מוגבל
        alignSelf: 'center', // מרכז את הכרטיס
    },

    item: {
        marginBottom: 18,
        borderRadius: 12,
        overflow: 'hidden',
        flexDirection: 'row-reverse', // סדר מימין לשמאל
        alignItems: 'flex-start', // יישור לחלק העליון
        gap: 12, // מרווח בין התווית לשאלה
    },

    // תווית קטגוריה לחיפוש - עכשיו בצד שמאל
    categoryLabel: {
        backgroundColor: Colors.skyBlue, // תכלת שמיים בהיר
        color: Colors.black, // שחור לטקסט כדי שיהיה קריא
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'center', // טקסט במרכז התווית
        borderWidth: 1,
        borderColor: Colors.lightSkyBlue,
        writingDirection: 'rtl', // כיוון כתיבה מימין לשמאל
        minWidth: 60, // רוחב מינימלי לתווית
        alignSelf: 'flex-start', // יישור לחלק העליון
        marginTop: 4, // מרווח קטן מלמעלה
    },

    // מיכל לשאלה (ללא התווית)
    questionContainer: {
        flex: 1, // תופס את שאר הרוחב
    },

    question: {
        backgroundColor: Colors.skyBlue, // תכלת שמיים בהיר כמו בתמונה
        padding: 16,
        borderRadius: 12,
        width: '100%',
        borderWidth: 1,
        borderColor: Colors.lightSkyBlue,
        elevation: 2,
        shadowColor: Colors.skyBlue,
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    questionText: {
        fontWeight: 'bold',
        textAlign: 'right',
        fontSize: 16,
        color: Colors.black, // שחור לטקסט כדי שיהיה קריא על הרקע הכחול הבהיר
    },

    answer: {
        padding: 16,
        backgroundColor: Colors.blueLight, // תכלת בהיר בדיוק כמו החלון הקטן
        marginTop: 8,
        borderRadius: 12,
        textAlign: 'right',
        fontSize: 14,
        color: Colors.black, // שחור לטקסט כדי שיהיה קריא על הרקע התכלת
        borderWidth: 1,
        borderColor: Colors.blue,
        lineHeight: 20,
    },

    message: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: Colors.mutedText,
        backgroundColor: Colors.gentlePink, // ורוד עדין
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colors.mistyRose,
    },

    linkContainer: {
        marginTop: 24,
        alignItems: 'center',
    },
    linkText: {
        backgroundColor: Colors.babyBlue, // תכלת תינוק בהיר לרקע הקישור
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 12,
        color: Colors.blue700, // כחול כהה לטקסט
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        fontSize: 15,
        borderWidth: 1,
        borderColor: Colors.powderBlue,
        elevation: 2,
        shadowColor: Colors.skyBlue,
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
});

export default faqListStyles;