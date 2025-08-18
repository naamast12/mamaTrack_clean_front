import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../constants/Colors';

const { width } = Dimensions.get('window');

const faqScreenStyles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: Colors.pink100, // רקע ורוד קצת יותר כהה כמו שביקשת
        paddingVertical: 24,
        paddingHorizontal: 16,
        writingDirection: 'rtl',
    },

    pinkBox: {
        backgroundColor: Colors.blueLight, // רקע תכלת בהיר מאוד כמו שביקשת - רק החלון הקטן
        borderRadius: 24,
        padding: 28,
        width: '90%', // לא על כל המסך
        maxWidth: 600, // מקסימום רוחב מוגבל
        alignSelf: 'center',
        alignItems: 'center',
        marginBottom: 40,
        elevation: 8,
        shadowColor: Colors.pinkShadowSoft,
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 8 },
        shadowRadius: 20,
        borderWidth: 2,
        borderColor: Colors.palePink,
    },

    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: Colors.pink700, // ורוד כהה לכותרת כמו בתמונה
        textAlign: 'center',
        marginBottom: 10,
    },

    // שדה חיפוש חדש
    searchContainer: {
        width: '100%',
        marginTop: 20,
        alignItems: 'center',
    },

    searchInput: {
        backgroundColor: Colors.white,
        width: '90%',
        maxWidth: 400,
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 16,
        fontSize: 16,
        borderWidth: 2,
        borderColor: Colors.skyBlue, // תכלת שמיים בהיר למסגרת
        elevation: 3,
        shadowColor: Colors.skyBlue,
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 8,
        color: Colors.deepText,
        textAlign: 'right', // טקסט מימין
        writingDirection: 'rtl', // כיוון כתיבה מימין לשמאל
    },

    chooseMessage: {
        marginTop: 20,
        padding: 24,
        backgroundColor: Colors.lightCyan, // ציאן בהיר לרקע ההודעה
        color: Colors.blue700, // כחול כהה לטקסט
        fontSize: 20,
        textAlign: 'center',
        borderRadius: 16,
        shadowColor: Colors.skyBlue,
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 12,
        elevation: 4,
        width: '80%', // עוד יותר קטן
        maxWidth: 400, // מקסימום רוחב קטן יותר
        borderWidth: 2,
        borderColor: Colors.powderBlue,
    },

    fullWidthBox: {
        width: '90%', // לא על כל המסך
        maxWidth: 600, // מקסימום רוחב מוגבל
        alignSelf: 'center',
    },

    image: {
        width: width * 0.7, // קטן יותר
        height: undefined,
        aspectRatio: 1,
        opacity: 0.3,
        alignSelf: 'center',
        marginBottom: 40,
    },
});

export default faqScreenStyles;