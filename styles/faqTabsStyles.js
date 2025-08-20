// styles/faqTabsStyles.js
import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

const faqTabsStyles = StyleSheet.create({
    tabsContainer: {
        flexDirection: 'row-reverse',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 20,
        paddingHorizontal: 8,
    },
    tabButton: {
        backgroundColor: Colors.pinkLight, // ורוד עדין לטאבים לא פעילים
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 12,
        margin: 6,
        borderWidth: 2,
        borderColor: Colors.pinkLight,
        elevation: 2,
        shadowColor: Colors.pinkShadowSoft,
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        minWidth: 120, // רוחב מינימלי לטאבים
    },

    tabButtonActive: {
        backgroundColor: Colors.blue, // תכלת שמיים בהיר לטאב פעיל
        borderColor: Colors.blue,
        elevation: 4,
        shadowColor: Colors.blueDeep,
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
    },

    tabContent: {
        flexDirection: 'row-reverse', // אייקון מימין לטקסט
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8, // מרווח בין האייקון לטקסט
    },

    tabIcon: {
        fontSize: 20, // גודל האייקון
        marginLeft: 4, // מרווח קטן מהטקסט
    },

    tabButtonText: {
        color: Colors.pink600, // ורוד כהה לטקסט טאב לא פעיל
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '500',
    },
    tabButtonTextActive: {
        color: Colors.blue700, // כחול כהה לטקסט טאב פעיל
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default faqTabsStyles;