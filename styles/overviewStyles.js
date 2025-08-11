// styles/overviewStyles.js
import { StyleSheet } from 'react-native';

export default function getOverviewStyles() {
    // const bg    = '#F9FAFB';
    const card  = '#FFFFFF';
    const text  = '#374151';
    const head  = '#111827';
    const shade = 2;

    return StyleSheet.create({
        container: { flex: 1 },                  // בלי רקע — יירש מהכללי
        pageContent: { paddingBottom: 32 },
        inner: {
            width: '100%',
            maxWidth: 700,                       // מקום לשתי עמודות
            alignSelf: 'center',
            paddingHorizontal: 24,               // שוליים זהים
            paddingTop: 16,
        },

        screenTitle: {
            fontSize: 30, fontWeight: '800', color: '#C08497',
            textAlign: 'center', marginBottom: 4, letterSpacing: 0.3,
        },

        /** ===== שורת כותרת עליונה (Hero+כפתורים) ===== */
        headerRow: {
            flexDirection: 'row-reverse',        // RTL – ימין קודם
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            flexWrap: 'nowrap',
            marginBottom: 4,
        },
        chatBtnWide: {
            backgroundColor: '#E7F8F4',   // מנטה פסטלי עדין; אפשר לשנות לגוון אחר מהפלטה
            paddingVertical: 16,
            borderRadius: 16,
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',                 // רחב – כל רוחב ה-inner
            alignSelf: 'center',
            marginTop: 12,
            marginBottom: 24,
        },
        chatBtnText: {
            fontSize: 18,
            fontWeight: '700',
            color: '#111827',
        },

        // שתי העמודות
        headerRight: {
            width: 360,                          // Hero (כוונני לפי צורך)
            flexShrink: 0,
        },
        headerNavCol: {
            width: 280,                          // עמודת כפתורים
            flexShrink: 0,
        },

        heroMini: {
            backgroundColor: card,
            borderRadius: 16,
            paddingVertical: 12,
            paddingHorizontal: 14,
            shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 6,
            shadowOffset: { width: 0, height: 3 }, elevation: shade,
            alignSelf: 'stretch',
        },
        heroMiniWeek: { fontSize: 26, fontWeight: '800', color: head, textAlign: 'right', marginBottom: 4 },
        heroMiniLine: { flexDirection: 'row-reverse', alignItems: 'center', marginBottom: 8 },

        // ✅ תיקון אימוג׳י: lineHeight תואם + ביטול padding באנדרואיד
        heroMiniEmoji: {
            fontSize: 40,
            lineHeight: 44,                 // חשוב כדי שלא ייחתך
            marginLeft: 8,
            includeFontPadding: false,      // Android-only: מנקה רווחים מיותרים סביב הטקסט
        },

        heroMiniSize: { fontSize: 15, color: head },

        progressMini:     { height: 6, borderRadius: 999, backgroundColor: '#E5E7EB' },
        progressMiniFill: { height: 6, borderRadius: 999, backgroundColor: '#A78BFA' },
        progressMiniText: { fontSize: 14, color: '#6B7280', textAlign: 'right', marginTop: 4 },

        navBtnPrimary:  { backgroundColor: '#EDE7FF' },
        navBtnGhost:    { backgroundColor: '#EFF4F9' },
        navBtnText:     { fontSize: 18, fontWeight: '700', color: head },
        navBtnGhostText:{ opacity: 0.8 },
        navBtn: {
            paddingVertical: 16,
            paddingHorizontal: 20,
            borderRadius: 16,
        },
        navBtnFull: {
            width: '90%',
            alignItems: 'center',
            justifyContent: 'center',
        },
        navBtnGap: {               // ← מרווח אחיד בין הכפתורים
            marginBottom: 5,
        },
        navBtnAccent: { backgroundColor: '#FFEFE7' }, // כתום-בהיר לדוגמה
        /* כפתורי פעולה תחתית */
        actionRow: {
            flexDirection: 'row-reverse',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            marginTop: 12,
            marginBottom: 24,
        },

        actionBtn: {
            flexBasis: '32%',
            paddingVertical: 16,
            borderRadius: 16,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 8,
        },

        /* שלושת הגוונים החדשים */
        actionLilac: { backgroundColor: '#E4DCFF' }, // לילך-בהיר
        actionBlue:  { backgroundColor: '#F2F8FF' }, // תכלת-בהיר
        actionPeach: { backgroundColor: '#FFEFF7' }, // אפרסק-בהיר

        actionText: { fontSize: 16, fontWeight: '700', color: '#111827' },

        fabProfile: {
            position: 'absolute',
            top: 40,
            left: 400,    // RTL – פינה ימנית
            width: 48,
            height: 48,
            borderRadius: 24,
            backgroundColor: '#A78BFA',   // סגול מותג
            alignItems: 'center',
            justifyContent: 'center',

            // צל קל
            shadowColor: '#000',
            shadowOpacity: 0.12,
            shadowRadius: 6,
            shadowOffset: { width: 0, height: 3 },
            elevation: 6,
        },



        /** ===== קלפים מתחת ל‑Header ===== */
        section: {
            backgroundColor: card,
            borderRadius: 16,
            padding: 16,
            shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6,
            shadowOffset: { width: 0, height: 3 }, elevation: shade,
        },
        sectionTitle: { fontSize: 16, fontWeight: '800', color: head, textAlign: 'right', marginBottom: 8 },
        sectionText:  { fontSize: 16, lineHeight: 24, color: text, textAlign: 'right' },

        // הקלף הגדול קצת פחות גבוה כדי למנוע "שטיח" ריק
        sectionLg: { minHeight: 84,  marginBottom: 12 },
        sectionMd: { minHeight: 96 },
        sectionSm: { minHeight: 84 },

        halfRow: {
            flexDirection: 'row-reverse',
            justifyContent: 'space-between',
            marginBottom: 12,
        },
        halfItem: { width: '48%' },

        pillsRow: { flexDirection: 'row-reverse', flexWrap: 'wrap', marginHorizontal: -6 },
        pill: { backgroundColor: '#F3F4F6', paddingVertical: 6, paddingHorizontal: 10, borderRadius: 999, marginHorizontal: 6, marginBottom: 8 },
        pillSecondary: { backgroundColor: '#F8F0FF' },
        pillText: { fontSize: 14, color: head },

        centerBox: { alignItems: 'center', justifyContent: 'center', paddingVertical: 24 },
        centerNote:{ fontSize: 14, color: '#6B7280', marginTop: 8 },
    });
}