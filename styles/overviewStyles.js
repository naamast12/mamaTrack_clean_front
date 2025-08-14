// styles/overviewStyles.js
import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const shadow = {
    shadowColor: Colors.brand,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
};

export default function getOverviewStyles() {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: Colors.brandBg,
        },
        pageContent: { paddingBottom: 24 },

        inner: {
            width: '100%',
            maxWidth: 700,
            alignSelf: 'center',
            paddingHorizontal: 24,
            paddingTop: 16,
        },
        headerColumn: {
            flexDirection: 'column',
            marginBottom: 12,
        },

        navGrid: {
            flexDirection: 'row-reverse',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            marginTop: 8,
        },

        navItem: {
            flexBasis: '32%', // שלוש בעמודה
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 12,
        },

// נשתמש ב-headerRight הקיים אבל נשנה:
        headerRight: {
            width: '100%',
        },


        /* כותרת מסך */
        screenTitle: {
            fontSize: 28,
            fontWeight: '800',
            color: Colors.brand,
            textAlign: 'center',
            marginBottom: 8,
            textShadowColor: Colors.brandShadow,
            textShadowOffset: { width: 1, height: 1 },
            textShadowRadius: 3,
        },
        // בתוך getOverviewStyles() במערך הסגנונות:
        fabProfile: {
            position: 'absolute',
            bottom: 0,
            left: 400,              // RTL: כפתור בפינה הימנית-תחתונה
            width: 56,
            height: 40,
            borderRadius: 28,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: Colors.brand, // רקע צבעוני כדי שהאייקון הלבן יבלוט
            ...shadow,
            zIndex: 1000,
        },
// למעלה בקובץ כבר יש headerRow/headerRight/headerNavCol — לא נשתמש ב-headerRow/headerNavCol במבנה החדש



        /* אזור עליון (Hero + ניווט) */
        headerRow: {
            flexDirection: 'row-reverse',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            flexWrap: 'nowrap',
            marginBottom: 8,
        },
        headerNavCol: { width: 280, flexShrink: 0 },


        heroMiniWeek: { fontSize: 26, fontWeight: '800', color: Colors.darkText, textAlign: 'right', marginBottom: 4 },
        heroMiniLine: { flexDirection: 'row-reverse', alignItems: 'center', marginBottom: 18 },
        heroMiniEmoji: { fontSize: 70, lineHeight: 44, marginLeft: 8, includeFontPadding: false },
        heroMiniSize: { fontSize: 15, color: Colors.darkText },

        /* התקדמות */
        progressMini:     { height: 6, borderRadius: 999, backgroundColor: Colors.brandBorder },
        progressMiniFill: { height: 6, borderRadius: 999, backgroundColor: Colors.brand },
        progressMiniText: { fontSize: 14, color: Colors.muted, textAlign: 'right', marginTop: 4 },

        /* כפתורי ניווט */
        navBtn: {
            paddingVertical: 16,
            paddingHorizontal: 20,
            borderRadius: 16,
            ...shadow,
        },
        navBtnPrimary:  { backgroundColor: Colors.brandLight },
        navBtnGhost:    { backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.brandBorder },
        navBtnText:     { fontSize: 18, fontWeight: '700', color: Colors.darkText },
        navBtnGhostText:{ opacity: 0.85 },
        navBtnFull: { width: '90%', alignItems: 'center', justifyContent: 'center' },
        navBtnGap:  { marginBottom: 6 },

        /* פעולות */
        actionRow: {
            flexDirection: 'row-reverse',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            marginTop: 12,
            marginBottom: 12,
        },
        actionBtn: {
            flexBasis: '32%',
            paddingVertical: 16,
            borderRadius: 16,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 8,
            backgroundColor: Colors.surface,
            borderWidth: 1,
            borderColor: Colors.brandBorder,
            ...shadow,
        },
        actionText: { fontSize: 16, fontWeight: '700', color: Colors.darkText },
// בתוך getOverviewStyles() אחרי שאר הסגנונות
        chatBtnWide: {
            width: '100%',
            paddingVertical: 16,
            borderRadius: 16,
            backgroundColor: Colors.brandLight,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 8,
            ...shadow,
        },
        chatBtnText: {
            fontSize: 18,
            fontWeight: '700',
            color: Colors.darkText,
            textAlign: 'center',
        },

        /* כרטיסי תוכן */
        section: {
            backgroundColor: Colors.surface,
            borderRadius: 16,
            padding: 16,
            borderWidth: 1,
            borderColor: Colors.brandBorder,
            ...shadow,
        },
        sectionLg: { minHeight: 84,  marginBottom: 12 },
        sectionMd: { minHeight: 96 },
        sectionSm: { minHeight: 84 },

        sectionTitle: { fontSize: 16, fontWeight: '800', color: Colors.brand, textAlign: 'right', marginBottom: 8 },
        sectionText:  { fontSize: 16, lineHeight: 24, color: Colors.darkText, textAlign: 'right' },

        /* גריד חצאים */
        halfRow: {
            flexDirection: 'row-reverse',
            justifyContent: 'space-between',
            marginBottom: 12,
        },
        halfItem: { width: '48%' },

        /* צ׳יפים/תגיות */
        pillsRow: { flexDirection: 'row-reverse', flexWrap: 'wrap', marginHorizontal: -6 },
        pill: { backgroundColor: Colors.brandLight, paddingVertical: 6, paddingHorizontal: 10, borderRadius: 999, marginHorizontal: 6, marginBottom: 8, borderWidth: 1, borderColor: Colors.brandBorder },
        pillSecondary: { backgroundColor: Colors.light },
        pillText: {
            fontSize: width * 0.01, // 3.5% מרוחב המסך
            color: Colors.brand,
        },
        /* מרכזיות */
        centerBox: { alignItems: 'center', justifyContent: 'center', paddingVertical: 24 },
        centerNote:{ fontSize: 14, color: Colors.muted, marginTop: 8 },


        profileBtnMiniText: {
            color: '#FFF',
            fontWeight: '600',
            fontSize: 14,
            marginRight: 6,
        },
        // heroMini – הוסף/י:
        heroMini: {
            backgroundColor: Colors.surface,
            borderRadius: 16,
            paddingVertical: 12,
            paddingHorizontal: 14,
            ...shadow,
            position: 'relative',
            overflow: 'visible',   // ← חשוב
            zIndex: 1,
        },

// profileBtnMini – עדכני:
        profileBtnMini: {
            position: 'absolute',
            top: 8,
            left: 8,
            flexDirection: 'row-reverse',
            alignItems: 'center',
            backgroundColor: Colors.brand,
            paddingHorizontal: 10,
            height: 32,
            borderRadius: 16,
            ...shadow,
            zIndex: 100,     // ← מביא לקדמה ב-iOS/Web
            elevation: 10,   // ← מביא לקדמה באנדרואיד
        }
    });
}