// styles/weeklyStyles.js
import { StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';   // ודאי שהנתיב נכון

export default function getWeeklyStyles() {
    const shade = 2; // elevation

    return StyleSheet.create({
        container: { flex: 1 },

        /* ───────── Header ───────── */
        pageHeader: { paddingBottom: 8 },

        headerCard: {
            backgroundColor: Colors.white,
            borderRadius: 16,
            paddingVertical: 16,
            paddingHorizontal: 20,
            shadowColor: Colors.black,
            shadowOpacity: 0.05,
            shadowRadius: 6,
            shadowOffset: { width: 0, height: 3 },
            elevation: 2,
            marginBottom: 8,
        },

        /* -----  Dropdown  ----- */
        weekRow: {
            flexDirection: 'row-reverse',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 8,
            marginBottom: 10,
        },

        weekLabel: {
            fontSize: 20,
            fontWeight: '800',
            color: Colors.gray800,
            marginHorizontal: 4,
            textAlign: 'center',
        },

        arrowBtn: { padding: 8 },

        backdrop: {
            flex: 1,
            backgroundColor: Colors.backdrop, // rgba(0,0,0,0.3)
        },
        listContainer: {
            maxHeight: '60%',
            backgroundColor: Colors.white,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            paddingVertical: 12,
            paddingHorizontal: 16,
        },
        option: {
            paddingVertical: 12,
            borderBottomWidth: 1,
            borderBottomColor: Colors.borderLight,
        },
        selectedOption: {
            backgroundColor: Colors.violetSoftBg, // rgba(167,139,250,0.08)
        },
        optionTxt: {
            fontSize: 16,
            textAlign: 'center',
            color: Colors.text,
        },
        selectedOptionTxt: { fontWeight: 'bold' },

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
            backgroundColor: Colors.white,
            borderRadius: 16,
            padding: 16,
            marginBottom: 12,
            shadowColor: Colors.black,
            shadowOpacity: 0.05,
            shadowRadius: 6,
            shadowOffset: { width: 0, height: 3 },
            elevation: shade,
        },
        sectionHeader: { flexDirection: 'row-reverse', alignItems: 'center', marginBottom: 8 },
        sectionIcon:   { marginLeft: 8 },
        sectionTitle:  { fontSize: 18, fontWeight: '800', color: Colors.gray800, textAlign: 'right' },
        sectionLine:   { fontSize: 16, lineHeight: 26, color: Colors.gray700, textAlign: 'right' },

        centerBox: { alignItems: 'center', justifyContent: 'center', paddingVertical: 24 },
    });
}
