// styles/weeklyUpdatesStyles.js
import { StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

export default function getWeeklyStyles() {
    const card  = '#FFFFFF';
    const text  = '#374151';
    const head  = '#111827';
    const shade = 2;

    return StyleSheet.create({
        container: { flex: 1 },

        // אזור ה‑Header הלא-גלול
        pageHeader: {
            // אפשר לשים רקע/צל קל אם תרצי
            paddingBottom: 8,
        },

        // אזור גלול – תופס את כל השטח שנותר
        cardsScroll: { flex: 1 },
        cardsContent: { paddingBottom: 32 },

        inner: {
            width: '100%',
            maxWidth: 900,
            alignSelf: 'center',
            paddingHorizontal: 16,
            paddingTop: 12,
        },

        headerRow: {
            flexDirection: 'row-reverse',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 8,
        },

        screenTitle: {
            fontSize: 24,
            fontWeight: '800',
            color: Colors.primary,
            textAlign: 'center',
            letterSpacing: 0.3,
            flex: 1,
        },

        weekRow: {
            flexDirection: 'row-reverse',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 10,
        },
        stepBtnMargin: { marginHorizontal: 8 }, // במקום gap
        weekLabel: {
            fontSize: 20,
            fontWeight: '800',
            color: head,
            minWidth: 120,
            textAlign: 'center',
        },
        stepBtn: {
            width: 44, height: 40, borderRadius: 12, backgroundColor: card,
            alignItems: 'center', justifyContent: 'center',
            shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 6,
            shadowOffset: { width: 0, height: 3 }, elevation: shade,
        },
        stepTxt: { fontSize: 22, fontWeight: '800', color: head },

        // סקשנים
        section: {
            backgroundColor: card, borderRadius: 16, padding: 16, marginBottom: 12,
            shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6,
            shadowOffset: { width: 0, height: 3 }, elevation: shade,
        },
        sectionHeader: { flexDirection: 'row-reverse', alignItems: 'center', marginBottom: 8 },
        sectionIcon:   { marginLeft: 8 },
        sectionTitle:  { fontSize: 18, fontWeight: '800', color: head, textAlign: 'right' },
        sectionLine:   { fontSize: 16, lineHeight: 26, color: text, textAlign: 'right' },

        centerBox: { alignItems: 'center', justifyContent: 'center', paddingVertical: 24 },
    });
}
