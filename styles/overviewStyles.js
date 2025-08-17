// styles/overviewStyles.js
import { Colors } from '@/constants/Colors';
import { StyleSheet, Dimensions } from 'react-native';

const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
const { width } = Dimensions.get('window');
const shadow = {
    shadowColor: Colors.brand,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
};

// גדלים דינמיים לפי רוחב מסך (מוגבלים כדי לא להשתולל במסכים גדולים)
const pillFont   = clamp(width * 0.035, 12, 16);  // ~3.5% מרוחב, בין 12-16px
const pillHPad   = clamp(width * 0.02,  8, 14);   // padding אופקי
const pillVPad   = clamp(width * 0.012, 4, 8);    // padding אנכי
const pillGapX   = 6;
const pillGapY   = 8;

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
            color: Colors.pink,
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
            backgroundColor: Colors.blueDeep, // רקע צבעוני כדי שהאייקון הלבן יבלוט
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

        heroMiniLine: {
            flexDirection: 'row-reverse',   // מימין לשמאל
            alignItems: 'center',
            justifyContent: 'flex-start',
            marginTop: 6,
            marginBottom: 40,
        },
        heroMiniEmoji: {
            fontSize: 70,        // או 70 אם תרצי גדול יותר
            lineHeight: 44,
            includeFontPadding: false,
            marginLeft: 0,       // רווח בין האימוג׳י לטקסט (ב-RTL)
        },

        heroMiniWeek: { fontSize: 26, fontWeight: '800', color: Colors.darkText, textAlign: 'right', marginBottom: 0 },
        heroMiniSize: {textAlign: 'right', fontSize: 15, color: Colors.darkText },

        /* התקדמות */
        progressMini:     { height: 6, borderRadius: 999, backgroundColor: Colors.pinkOutline },
        progressMiniFill: { height: 6, borderRadius: 999, backgroundColor: Colors.brand2 },
        progressMiniText: { fontSize: 14, color: Colors.muted, textAlign: 'right', marginTop: 4 },

        /* כפתורי ניווט */
        navBtn: {
            paddingVertical: 16,
            paddingHorizontal: 20,
            borderRadius: 16,
            ...shadow,
        },
        navBtnPrimary:  { backgroundColor: Colors.pinkLight },
        navBtnGhost:    { backgroundColor: Colors.blueBgSoft, borderWidth: 1, borderColor: Colors.blueBorder },
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
            backgroundColor: Colors.pinkLight,
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
            backgroundColor: Colors.blue200,
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

        sectionTitle: { fontSize: 16, fontWeight: '800', color: Colors.blueDeep, textAlign: 'right', marginBottom: 8 },
        sectionText:  { fontSize: 16, lineHeight: 24, color: Colors.darkText, textAlign: 'right' },

        /* גריד חצאים */
        halfRow: {
            flexDirection: 'row-reverse',
            justifyContent: 'space-between',
            marginBottom: 12,
        },
        halfItem: { width: '48%' },

        /* צ׳יפים/תגיות */
        // pillsRow: { flexDirection: 'row-reverse', flexWrap: 'wrap', marginHorizontal: -6 },
        // pill: { backgroundColor: Colors.brandLight, paddingVertical: 6, paddingHorizontal: 10, borderRadius: 999, marginHorizontal: 6, marginBottom: 8, borderWidth: 1, borderColor: Colors.brandBorder },
        // pillSecondary: { backgroundColor: Colors.light },
        // pillText: {
        //     fontSize: width * 0.01, // 3.5% מרוחב המסך
        //     color: Colors.brand,
        // },
        // שורת צ'יפים: מימין לשמאל, יורדת שורות, בלי שלילי margins כדי לא "לצאת" מהכרטיס
        pillsRow: {
            flexDirection: 'row-reverse',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            // אפשר להשאיר מעט padding פנימי של ההורה במקום negative margins
        },

        pill: {
            backgroundColor: Colors.blueBgSoft,
            borderColor: Colors.borderColor,
            borderWidth: 1,
            borderRadius: 999,
            paddingHorizontal: pillHPad,
            paddingVertical: pillVPad,

            // רווחים בין הצ'יפים
            marginLeft:  pillGapX,  // ב-RTL זה ייראה כמרווח בין ה"עמודות"
            marginRight: pillGapX,
            marginBottom: pillGapY,

            // חשוב לרספונסיביות
            alignSelf: 'flex-start',
            flexShrink: 1,        // מאפשר לצ'יפ "להצטמצם" ולא לפרוץ רוחב
            maxWidth: '100%',     // עובד בווב; בנייטיב מתעלם, אבל flexShrink פותר
        },

        pillSecondary: { backgroundColor: Colors.pinkAccent, borderColor: Colors.borderColor },

        pillText: {
            fontSize: pillFont,
            color: Colors.darkText ,
            flexShrink: 1,        // שהטקסט לא יפרוץ את הקונטיינר שלו
        },

        btnContent: {
            flexDirection: 'row-reverse',   // אייקון בצד ימין, טקסט משמאלו (RTL)
            alignItems: 'center',
            justifyContent: 'center',
        },
        btnIcon: { marginLeft: 8 },        // רווח קטן בין האייקון לטקסט (ב-RTL)

        /* מרכזיות */
        centerBox: { alignItems: 'center', justifyContent: 'center', paddingVertical: 24 },
        centerNote:{ fontSize: 14, color: Colors.pink200, marginTop: 8 },


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
            backgroundColor: Colors.pinkAccent,
            paddingHorizontal: 10,
            height: 32,
            borderRadius: 16,
            ...shadow,
            zIndex: 100,     // ← מביא לקדמה ב-iOS/Web
            elevation: 10,   // ← מביא לקדמה באנדרואיד
        }
    });
}
