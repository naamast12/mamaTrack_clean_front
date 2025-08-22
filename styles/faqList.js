// styles/faqListStyles.js
import { StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

const faqListStyles = StyleSheet.create({

    card: {
        backgroundColor: Colors.pinkLight, // ורוד לבנדר בהיר במקום לבן
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
        borderColor: Colors.pinkBorder, // ורוד ערפל עדין
        width: '100%', // לא על כל המסך
        maxWidth: 850, // מקסימום רוחב מוגבל
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
        backgroundColor: Colors.blueLight, // תכלת שמיים בהיר
        color: Colors.black, // שחור לטקסט כדי שיהיה קריא
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'center', // טקסט במרכז התווית
        borderWidth: 1,
        borderColor: Colors.blueBorder,
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
        backgroundColor: Colors.blue300, // תכלת שמיים בהיר כמו בתמונה
        padding: 16,
        borderRadius: 12,
        width: '100%',
        borderWidth: 1,
        borderColor: Colors.blueDeep,
        elevation: 2,
        shadowColor: Colors.blue300,
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
        width: '100%',

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
        backgroundColor: Colors.pinkLight, // ורוד עדין
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colors.pinkLight,
    },

    linkContainer: {
        marginTop: 24,
        alignItems: 'center',
    },
    linkText: {
        backgroundColor: Colors.blueLight, // תכלת תינוק בהיר לרקע הקישור
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 12,
        color: Colors.pinkDeep, // כחול כהה לטקסט
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        fontSize: 15,
        borderWidth: 1,
        borderColor: Colors.blueLight,
        elevation: 2,
        shadowColor: Colors.blueLight,
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
});

export default faqListStyles;