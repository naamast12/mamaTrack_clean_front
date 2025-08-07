import { Colors } from '../constants/Colors';   // ודאי שהנתיב נכון
import { StyleSheet } from 'react-native';

export default function getWeeklyStyles() {
    const card  = '#FFFFFF';
    const text  = '#374151';
    const head  = '#111827';
    const shade = 2;

    return StyleSheet.create({
        container: { flex: 1 },

        /* ───────── Header ───────── */
        pageHeader: { paddingBottom: 8 },

        headerCard: {
            backgroundColor: '#FFFFFF',
            borderRadius: 16,
            paddingVertical: 16,
            paddingHorizontal: 20,
            shadowColor: '#000',
            shadowOpacity: 0.05,
            shadowRadius: 6,
            shadowOffset: { width: 0, height: 3 },
            elevation: 2,
            marginBottom: 8,
        },

        /* -----  Dropdown  ----- */
        weekRow: {
            flexDirection: 'row-reverse',   // RTL: כפתור חץ בצד שמאל
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 8,
            marginBottom: 10,
        },

        weekLabel: {
            fontSize: 20,
            fontWeight: '800',
            color: head,
            marginHorizontal: 4,            // רווח קטן לפני החץ
            textAlign: 'center',
        },

        arrowBtn: {
            padding: 8,                     // שטח לחיצה נוח
        },

        backdrop: {
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.3)',
        },
        listContainer: {
            maxHeight: '60%',
            backgroundColor: '#fff',
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            paddingVertical: 12,
            paddingHorizontal: 16,
        },
        option: {
            paddingVertical: 12,
            borderBottomWidth: 1,
            borderBottomColor: '#eee',
        },
        selectedOption: {
            backgroundColor: 'rgba(167,139,250,0.08)',
        },
        optionTxt: {
            fontSize: 16,
            textAlign: 'center',
        },
        selectedOptionTxt: {
            fontWeight: 'bold',
        },

        /* ───────── Scroll cards ───────── */
        cardsScroll:  { flex: 1 },
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

        /* ───────── Sections ───────── */
        section: {
            backgroundColor: card,
            borderRadius: 16,
            padding: 16,
            marginBottom: 12,
            shadowColor: '#000',
            shadowOpacity: 0.05,
            shadowRadius: 6,
            shadowOffset: { width: 0, height: 3 },
            elevation: shade,
        },
        sectionHeader: { flexDirection: 'row-reverse', alignItems: 'center', marginBottom: 8 },
        sectionIcon:   { marginLeft: 8 },
        sectionTitle:  { fontSize: 18, fontWeight: '800', color: head, textAlign: 'right' },
        sectionLine:   { fontSize: 16, lineHeight: 26, color: text, textAlign: 'right' },

        centerBox: { alignItems: 'center', justifyContent: 'center', paddingVertical: 24 },
    });
}
