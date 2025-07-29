// styles/weeklyUpdatesStyles.js
import { StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

export default function getWeeklyStyles() {
    const bg    = '#F9FAFB';
    const card  = '#FFFFFF';
    const text  = '#374151';
    const head  = '#111827';
    const shade = 2;

    return StyleSheet.create({
        container: { flex: 1 },

        // לגלילה על כל הדף
        pageContent: { paddingBottom: 32 },

        inner: {
            width: '100%',
            maxWidth: 900,
            alignSelf: 'center',
            paddingHorizontal: 16,
            paddingTop: 12,
        },

        screenTitle: {
            fontSize: 24,
            fontWeight: '800',
            color: Colors.primary,
            textAlign: 'center',
            marginBottom: 12,
            letterSpacing: 0.3,
        },

        weekRow: {
            flexDirection: 'row-reverse',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 16,
            marginBottom: 10,
        },
        weekLabel: { fontSize: 20, fontWeight: '800', color: head, minWidth: 120, textAlign: 'center' },
        stepBtn: {
            width: 44, height: 40, borderRadius: 12, backgroundColor: card,
            alignItems: 'center', justifyContent: 'center',
            shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 6,
            shadowOffset: { width: 0, height: 3 }, elevation: shade,
        },
        stepTxt: { fontSize: 22, fontWeight: '800', color: head },

        // כרטיס "גודל התינוק"
        heroCard: {
            backgroundColor: card, borderRadius: 16, padding: 16, marginBottom: 12,
            alignItems: 'center',
            shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 6,
            shadowOffset: { width: 0, height: 3 }, elevation: shade,
        },
        heroTitle: { fontSize: 18, fontWeight: '800', color: Colors.accent, marginBottom: 6, textAlign: 'center' },
        heroText:  { textAlign: 'center', fontSize: 16, lineHeight: 24, color: text },

        // סקשנים – בסיס נייטרלי; את הצבעוניות נוסיף בקומפוננטה
        section: {
            backgroundColor: card, borderRadius: 16, padding: 16, marginBottom: 12,
            shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6,
            shadowOffset: { width: 0, height: 3 }, elevation: shade,
        },
        sectionHeader: { flexDirection: 'row-reverse', alignItems: 'center', marginBottom: 8 },
        sectionIcon:   { marginLeft: 8 }, // הצבע מגיע בפרופס של האייקון
        sectionTitle:  { fontSize: 18, fontWeight: '800', color: head, textAlign: 'right' },
        sectionLine:   { fontSize: 16, lineHeight: 26, color: text, textAlign: 'right' },

        centerBox: { alignItems: 'center', justifyContent: 'center', paddingVertical: 24 },
    });
}
