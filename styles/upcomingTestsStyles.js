// styles/upcomingTestsStyles.js
import { StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

export const screenStyles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F9FAFB', paddingHorizontal: 16, paddingTop: 12 },
    screenTitle: { fontSize: 20, fontWeight: '800', color: Colors.primary, textAlign: 'center', marginBottom: 12 },

    modes: {
        flexDirection: 'row-reverse',
        alignSelf: 'center',
        backgroundColor: '#E5E7EB',
        borderRadius: 12,
        marginBottom: 12,
    },
    modeBtn: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: 12 },
    modeActive: { backgroundColor: '#fff' },
    modeTxt: { fontWeight: '600', color: '#374151' },
    modeTxtActive: { color: Colors.primary },

    weekRow: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        marginBottom: 8,
    },
    weekLabel: { fontSize: 16, fontWeight: '700', color: '#111827', width: 120, textAlign: 'center' },
    stepBtn: { width: 40, height: 36, borderRadius: 10, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', elevation: 1 },
    stepTxt: { fontSize: 20, fontWeight: '700' },

    // ⬇️ תוקן: 'כן' -> 'center', וגם יישור למרכז באופן יציב
    triRow: {
        flexDirection: 'row-reverse',
        justifyContent: 'center',
        alignSelf: 'center',
        width: '100%',
        gap: 8,
        marginBottom: 8,
    },
    triBtn: { backgroundColor: '#fff', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 12, elevation: 1 },
    triActive: { backgroundColor: Colors.accent },
    triTxt: { fontWeight: '700' },
    triTxtActive: { color: '#fff' },

    search: { backgroundColor: '#fff', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10, marginBottom: 12, elevation: 1 },
    centerBox: { alignItems: 'center', justifyContent: 'center', paddingVertical: 24 },
});

export const testCardStyles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
    },

    // ⬇️ בלי space-between כדי שהכותרת והתגיות יהיו צמודות ולא יתפזרו לקצוות
    headerRow: { flexDirection: 'row-reverse', alignItems: 'center' },

    // ⬇️ בלי flex:1 כדי שלא "יבלע" את השורה; מאפשר קיצור והדבקה לצד התגיות
    title: {
        fontSize: 16,
        fontWeight: '700',
        color: Colors.primary,
        textAlign: 'right',
        flexShrink: 1,
        marginLeft: 12, // רווח קטן בין הכותרת לתגיות
    },

    // ⬇️ התגיות יוצגו משמאל לכותרת (בשורה הפוכה), צמודות
    badgesRow: { flexDirection: 'row-reverse', marginLeft: 8, gap: 8 },

    badge: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        backgroundColor: '#F3F4F6',
        borderRadius: 12,
        paddingHorizontal: 8,
        paddingVertical: 4,
        gap: 4,
    },
    badgeTxt: { fontSize: 12 },

    meta: { textAlign: 'right', color: '#6B7280', marginTop: 4 },
    block: { marginTop: 12 },
    blockTitle: { textAlign: 'right', fontWeight: '600', marginBottom: 4, color: '#111827' },
    blockText: { textAlign: 'right', lineHeight: 20, color: '#374151' },
});
