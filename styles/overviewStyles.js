// styles/overviewStyles.js
import { StyleSheet } from 'react-native';
// אם יש לך alias:
import { Colors } from '@/constants/Colors';
// או מסלול יחסי:
// import { Colors } from '../../constants/Colors';
import { Dimensions } from 'react-native';

const shadow = {
    shadowColor: Colors.brand,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
};
const { width } = Dimensions.get('window');


export default function getOverviewStyles() {
    return StyleSheet.create({
        /* פריסת עמוד */
        container: {
            flex: 1,
            backgroundColor: Colors.brandBg, // רקע כמו במסך הצ'אט
        },
        pageContent: { paddingBottom: 24 },

        inner: {
            width: '100%',
            maxWidth: 700,
            alignSelf: 'center',
            paddingHorizontal: 24,
            paddingTop: 16,
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
            bottom: 4,
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

        headerColumn: {
            flexDirection: 'column',
            marginBottom: 8,
        },

// כרטיס הסקירה – שיהיה 100%
        headerRight: { width: '100%', flexShrink: 0 },

// גריד לכפתורי הניווט – שלישייה
        navGrid: {
            flexDirection: 'row-reverse',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            marginTop: 6,
            rowGap: 8, // אם אפקטיבי בגרסת RN שלך; אם לא, אפשר marginBottom ב-navItem
        },


        navItem: {
            flexBasis: '32%',       // שלושה בעמודה
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 18,
        },


        /* אזור עליון (Hero + ניווט) */
        headerRow: {
            flexDirection: 'row-reverse',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            flexWrap: 'nowrap',
            marginBottom: 8,
        },
      //  headerRight: { width: 360, flexShrink: 0 },
        headerNavCol: { width: 280, flexShrink: 0 },

        /* כרטיסי מידע קטנים */
        heroMini: {
            backgroundColor: Colors.surface,
            borderRadius: 16,
            paddingVertical: 12,
            paddingHorizontal: 14,
            ...shadow,
        },

        heroMiniWeek: { fontSize: 26, fontWeight: '800', color: Colors.darkText, textAlign: 'right', marginBottom: 4 },
        heroMiniLine: { flexDirection: 'row-reverse', alignItems: 'center', marginBottom: 8 },
        heroMiniEmoji: { fontSize: 40, lineHeight: 44, marginLeft: 8, includeFontPadding: false },
        heroMiniSize: { fontSize: 15, color: Colors.darkText,  marginLeft: 4,},

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
            marginTop: 0,
            marginBottom: 18,
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

        /* צ׳יפים/תגיות */
        pillsRow: { flexDirection: 'row-reverse', flexWrap: 'wrap', marginHorizontal: -6 },
        pill: { backgroundColor: Colors.brandLight, paddingVertical: 6, paddingHorizontal: 10, borderRadius: 999, marginHorizontal: 6, marginBottom: 8, borderWidth: 1, borderColor: Colors.brandBorder },
        pillSecondary: { backgroundColor: Colors.light },
        pillText: { fontSize:  width * 0.009, color: Colors.brand },

        /* מרכזיות */
        centerBox: { alignItems: 'center', justifyContent: 'center', paddingVertical: 24 },
        centerNote:{ fontSize: 14, color: Colors.muted, marginTop: 8 },
    });
}
