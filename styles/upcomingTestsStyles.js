// styles/upcomingTestsStyles.js
import { StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

// אם תרצי עוד יותר גדול/קטן – שני פה את הסקל
const FONT_SCALE = 1.2;
const m = n => Math.round(n * FONT_SCALE);

export const screenStyles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F9FAFB', paddingHorizontal: 16, paddingTop: 12 },
    screenTitle: { fontSize: m(20), fontWeight: '800', color: Colors.primary, textAlign: 'center', marginBottom: 14 },

    modes: { flexDirection: 'row-reverse', alignSelf: 'center', backgroundColor: '#E5E7EB', borderRadius: 12, marginBottom: 12 },
    modeBtn: { paddingVertical: 10, paddingHorizontal: 16, borderRadius: 12 },
    modeActive: { backgroundColor: '#fff' },
    modeTxt: { fontWeight: '600', color: '#374151', fontSize: m(14) },
    modeTxtActive: { color: Colors.primary },

    weekRow: { flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'center', gap: 18, marginBottom: 10 },
    weekLabel: { fontSize: m(16), fontWeight: '700', color: '#111827', width: 140, textAlign: 'center' },
    stepBtn: { width: 44, height: 40, borderRadius: 12, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', elevation: 1 },
    stepTxt: { fontSize: m(20), fontWeight: '700' },

    triRow: { flexDirection: 'row-reverse', justifyContent: 'center', gap: 10, marginBottom: 10 },
    triBtn: { backgroundColor: '#fff', paddingVertical: 10, paddingHorizontal: 14, borderRadius: 12, elevation: 1 },
    triActive: { backgroundColor: Colors.accent },
    triTxt: { fontWeight: '700', fontSize: m(14) },
    triTxtActive: { color: '#fff' },

    search: { backgroundColor: '#fff', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, marginBottom: 14, elevation: 1, fontSize: m(14) },
    centerBox: { alignItems: 'center', justifyContent: 'center', paddingVertical: 26 },
});

export const testCardStyles = StyleSheet.create({
    card: { backgroundColor: '#fff', borderRadius: 16, padding: 18, marginBottom: 14, elevation: 2, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 6, shadowOffset: { width: 0, height: 3 } },
    headerRow: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center' },

    title: { fontSize: m(18), fontWeight: '800', color: Colors.primary, textAlign: 'right', flex: 1, marginStart: 12 },
    badgesRow: { flexDirection: 'row', gap: 8 },
    badge: { flexDirection: 'row-reverse', alignItems: 'center', backgroundColor: '#F3F4F6', borderRadius: 12, paddingHorizontal: 8, paddingVertical: 4, gap: 4 },
    badgeTxt: { fontSize: m(12) },

    meta: { textAlign: 'right', color: '#6B7280', marginTop: 6, fontSize: m(13) },

    block: { marginTop: 12 },
    blockTitle: { textAlign: 'right', fontWeight: '700', marginBottom: 6, color: '#111827', fontSize: m(16) },
    blockText: { textAlign: 'right', color: '#374151', fontSize: m(15), lineHeight: m(22) },
});
