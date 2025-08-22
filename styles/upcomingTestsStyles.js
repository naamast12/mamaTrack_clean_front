// styles/upcomingTestsStyles.js
import { StyleSheet, Platform } from 'react-native';
import { Colors } from '../constants/Colors';

const FONT_SCALE = 1.2;
const m = n => Math.round(n * FONT_SCALE);

export const screenStyles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     paddingHorizontal: 16,
    //     paddingTop: 12,
    //     ...(Platform.OS === 'web' ? { minHeight: '100vh' } : {}), // ← גובה מסך מלא ב-web
    // },
// styles/upcomingTestsStyles.js
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 16,  // מרווח שימנע חיתוך תחתון
        ...(Platform.OS === 'web' ? { minHeight: '100vh' } : {}),
    },

    inner: {
        flex: 1,          // ← חשוב
        minHeight: 0,     // ← חשוב ב-web כדי לא לחסום גלילה
        width: '100%',
        maxWidth: 900,
        alignSelf: 'center',
        paddingHorizontal: 16,
        paddingTop: 12,
    },

    centerBox: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },


// בתוך export const screenStyles = StyleSheet.create({...})
    weekRow: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        marginBottom: 10,
    },
    weekLabel: {
        fontSize: m(16),
        fontWeight: '700',
        color: Colors.gray800,
        textAlign: 'center',
    },

// חץ פתיחה
    arrowBtn: { padding: 8 },

// מודאל הרשימה
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
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
        borderBottomColor: Colors.gray200,
    },
    selectedOption: {
        backgroundColor: 'rgba(167,139,250,0.08)', // כמו בעדכונים
    },
    optionTxt: {
        fontSize: m(16),
        textAlign: 'center',
    },
    selectedOptionTxt: {
        fontWeight: 'bold',
    },

    pageHeader: {
        backgroundColor: Colors.white,
        borderRadius: 16,
        paddingVertical: 16,
        paddingHorizontal: 16,
        marginBottom: 12,
        elevation: 2,
        shadowColor: Colors.black,
        shadowOpacity: 0.05,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        width: '100%',          // ← היה '60%'
        alignSelf: 'center',   // ← במקום center
    },

    screenTitle: {
        fontSize: m(20),
        fontWeight: '800',
        color: Colors.blue500,
        textAlign: 'center',
        marginBottom: 14,
    },

    modes: {
        flexDirection: 'row-reverse',
        alignSelf: 'center',
        backgroundColor: Colors.gray200,
        borderRadius: 12,
        marginBottom: 12,
    },
    modeBtn: { paddingVertical: 10, paddingHorizontal: 16, borderRadius: 12 },
    modeActive: { backgroundColor: Colors.white },
    modeTxt: { fontWeight: '600', color: Colors.gray700, fontSize: m(14) },
    modeTxtActive: { color: Colors.primary },


    stepTxt: { fontSize: m(20), fontWeight: '700' },

    triRow: { flexDirection: 'row-reverse', justifyContent: 'center', gap: 10, marginBottom: 10 },
    triBtn: { backgroundColor: Colors.blueLight, paddingVertical: 10, paddingHorizontal: 14, borderRadius: 12, elevation: 1 },
    triActive: { backgroundColor: Colors.pinkAccent },
    triTxt: { fontWeight: '700', fontSize: m(14) },
    triTxtActive: { color: Colors.white },

    search: {
        backgroundColor: Colors.white,
        borderRadius: 12,
        paddingHorizontal: 14,
        paddingVertical: 12,
        marginBottom: 14,
        elevation: 1,
        fontSize: m(14),
        width: '100%',        // ← חדש
        alignSelf: 'stretch', // ← חדש
    },

    // centerBox: { alignItems: 'center', justifyContent: 'center', paddingVertical: 26 },
});

export const testCardStyles = StyleSheet.create({
    card: {
        backgroundColor: Colors.white,
        borderRadius: 16,
        padding: 18,
        marginBottom: 14,
        elevation: 2,
        shadowColor: Colors.black,
        shadowOpacity: 0.06,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },

        width: '100%',         // ← היה 75%
        alignSelf: 'center',  // ← במקום center


    },

    headerRow: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center' },

    title: {
        fontSize: m(18),
        fontWeight: '800',
        color: Colors.primary,
        textAlign: 'right',
        flex: 1,
        marginStart: 12,

    },
    weekRow: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        marginBottom: 10,
    },

// כפתורי חץ – כמו בעדכונים
    stepBtn: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: Colors.gray200,
        elevation: 1,
        shadowColor: Colors.black,
        shadowOpacity: 0.05,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },
    stepBtnPressed: {
        transform: [{ scale: 0.98 }],
        backgroundColor: Colors.gray100,
    },

// הפיל של "שבוע X"
    weekPill: {
        paddingVertical: 8,
        paddingHorizontal: 18,
        backgroundColor: Colors.white,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: Colors.gray200,
        elevation: 1,
    },
    weekLabel: {
        fontSize: 16,       // או m(16) אם את משתמשת בפונקציית סקל
        fontWeight: '800',
        color: Colors.gray800,
        textAlign: 'center',
    },


    badgesRow: { flexDirection: 'row', gap: 8 },
    badge: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        backgroundColor: Colors.gray100,
        borderRadius: 12,
        paddingHorizontal: 8,
        paddingVertical: 4,
        gap: 4,
    },
    badgeTxt: { fontSize: m(12) },

    meta: { textAlign: 'right', color: Colors.gray500, marginTop: 6, fontSize: m(13) },

    block: { marginTop: 12 },
    blockTitle: { textAlign: 'right', fontWeight: '700', marginBottom: 6, color: Colors.gray800, fontSize: m(16) },
    blockText: { textAlign: 'right', color: Colors.gray700, fontSize: m(15), lineHeight: m(22) },
});
