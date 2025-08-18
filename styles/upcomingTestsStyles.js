// styles/upcomingTestsStyles.js
import { StyleSheet, Platform } from 'react-native';
import { Colors } from '../constants/Colors';

const FONT_SCALE = 1.2;
const m = n => Math.round(n * FONT_SCALE);

export const screenStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 12,
        backgroundColor: Colors.softBluePink, // רקע תכלת-ורוד רך
        ...(Platform.OS === 'web' ? { minHeight: '100vh' } : {}), // ← גובה מסך מלא ב-web
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
        color: Colors.pink700, // ורוד כהה לטקסט
        textAlign: 'center',
    },

// חץ פתיחה
    arrowBtn: { 
        padding: 8,
        color: Colors.skyBlue, // תכלת שמיים בהיר לחצים
    },

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
        borderWidth: 2,
        borderColor: Colors.mistyRose,
    },
    option: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: Colors.mistyRose, // ורוד ערפל עדין להפרדה
    },
    selectedOption: {
        backgroundColor: Colors.lightCyan, // ציאן בהיר לפריט נבחר
    },
    optionTxt: {
        fontSize: m(16),
        textAlign: 'center',
        color: Colors.deepText,
    },
    selectedOptionTxt: {
        fontWeight: 'bold',
        color: Colors.blue700, // כחול כהה לטקסט נבחר
    },

    pageHeader: {
        backgroundColor: Colors.white,
        borderRadius: 16,
        paddingVertical: 16,
        paddingHorizontal: 16,
        marginBottom: 12,
        elevation: 4,
        shadowColor: Colors.pinkShadowSoft,
        shadowOpacity: 0.15,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        width: '80%',          // ← היה '60%'
        alignSelf: 'center',   // ← במקום center
        borderWidth: 1,
        borderColor: Colors.mistyRose,
    },

    screenTitle: {
        fontSize: m(20),
        fontWeight: '800',
        color: Colors.skyBlue, // תכלת שמיים בהיר לכותרת
        textAlign: 'center',
        marginBottom: 14,
    },

    modes: {
        flexDirection: 'row-reverse',
        alignSelf: 'center',
        backgroundColor: Colors.lavenderBlush, // ורוד לבנדר בהיר לרקע המצבים
        borderRadius: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: Colors.palePink,
    },
    modeBtn: { 
        paddingVertical: 10, 
        paddingHorizontal: 16, 
        borderRadius: 12 
    },
    modeActive: { 
        backgroundColor: Colors.skyBlue, // תכלת שמיים בהיר למצב פעיל
        elevation: 2,
        shadowColor: Colors.skyBlue,
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    modeTxt: { 
        fontWeight: '600', 
        color: Colors.pink600, // ורוד כהה לטקסט
        fontSize: m(14) 
    },
    modeTxtActive: { 
        color: Colors.white, // לבן לטקסט על רקע תכלת
        fontWeight: 'bold',
    },

    stepTxt: { 
        fontSize: m(20), 
        fontWeight: '700',
        color: Colors.pink700, // ורוד כהה לטקסט
    },

    triRow: { 
        flexDirection: 'row-reverse', 
        justifyContent: 'center', 
        gap: 10, 
        marginBottom: 10 
    },
    triBtn: { 
        backgroundColor: Colors.lightCyan, // ציאן בהיר לכפתורים
        paddingVertical: 10, 
        paddingHorizontal: 14, 
        borderRadius: 12, 
        elevation: 2,
        shadowColor: Colors.skyBlue,
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        borderWidth: 1,
        borderColor: Colors.powderBlue,
    },
    triActive: { 
        backgroundColor: Colors.pink400, // ורוד בהיר למצב פעיל
        elevation: 3,
        shadowColor: Colors.pinkShadowSoft,
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 6,
    },
    triTxt: { 
        fontWeight: '700', 
        fontSize: m(14),
        color: Colors.blue700, // כחול כהה לטקסט
    },
    triTxtActive: { 
        color: Colors.white, // לבן לטקסט על רקע ורוד
        fontWeight: 'bold',
    },

    search: {
        backgroundColor: Colors.white,
        borderRadius: 12,
        paddingHorizontal: 14,
        paddingVertical: 12,
        marginBottom: 14,
        elevation: 2,
        fontSize: m(14),
        width: '100%',        // ← חדש
        alignSelf: 'stretch', // ← חדש
        borderWidth: 2,
        borderColor: Colors.mistyRose, // ורוד ערפל עדין למסגרת
        shadowColor: Colors.pinkShadowSoft,
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },

    centerBox: { 
        alignItems: 'center', 
        justifyContent: 'center', 
        paddingVertical: 26 
    },
});

export const testCardStyles = StyleSheet.create({
    card: {
        backgroundColor: Colors.white,
        borderRadius: 16,
        padding: 18,
        marginBottom: 14,
        elevation: 4,
        shadowColor: Colors.pinkShadowSoft,
        shadowOpacity: 0.15,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        width: '80%',         // ← היה 75%
        alignSelf: 'center',  // ← במקום center
        borderWidth: 1,
        borderColor: Colors.mistyRose,
    },

    headerRow: { 
        flexDirection: 'row-reverse', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
    },

    title: {
        fontSize: m(18),
        fontWeight: '800',
        color: Colors.pink600, // ורוד כהה לכותרת
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
        borderWidth: 2,
        borderColor: Colors.skyBlue, // תכלת שמיים בהיר למסגרת
        elevation: 2,
        shadowColor: Colors.skyBlue,
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },
    stepBtnPressed: {
        transform: [{ scale: 0.98 }],
        backgroundColor: Colors.lightCyan, // ציאן בהיר למצב לחוץ
    },

// הפיל של "שבוע X"
    weekPill: {
        paddingVertical: 8,
        paddingHorizontal: 18,
        backgroundColor: Colors.lavenderBlush, // ורוד לבנדר בהיר לרקע
        borderRadius: 999,
        borderWidth: 2,
        borderColor: Colors.palePink,
        elevation: 2,
        shadowColor: Colors.pinkShadowSoft,
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    weekLabel: {
        fontSize: 16,       // או m(16) אם את משתמשת בפונקציית סקל
        fontWeight: '800',
        color: Colors.pink700, // ורוד כהה לטקסט
        textAlign: 'center',
    },

    badgesRow: { flexDirection: 'row', gap: 8 },
    badge: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        backgroundColor: Colors.babyBlue, // תכלת תינוק בהיר לתגים
        borderRadius: 12,
        paddingHorizontal: 8,
        paddingVertical: 4,
        gap: 4,
        borderWidth: 1,
        borderColor: Colors.powderBlue,
    },
    badgeTxt: { 
        fontSize: m(12),
        color: Colors.blue700, // כחול כהה לטקסט
        fontWeight: '500',
    },

    meta: { 
        textAlign: 'right', 
        color: Colors.mutedText, 
        marginTop: 6, 
        fontSize: m(13) 
    },

    block: { marginTop: 12 },
    blockTitle: { 
        textAlign: 'right', 
        fontWeight: '700', 
        marginBottom: 6, 
        color: Colors.pink700, // ורוד כהה לכותרת
        fontSize: m(16) 
    },
    blockText: { 
        textAlign: 'right', 
        color: Colors.deepText, 
        fontSize: m(15), 
        lineHeight: m(22) 
    },
});
