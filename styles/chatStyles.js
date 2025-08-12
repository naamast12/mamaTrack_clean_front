// styles/chatStyles.js
import { StyleSheet } from "react-native";

const PINK = "#d81b60";
const PINK_BG = "#fff5f8";
const PINK_LIGHT = "#fce4ec";
const TEXT_MUTED = "#666";

const shadow = {
    shadowColor: PINK,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
};

export default StyleSheet.create({
    // פריסת עמוד כמו בטיימר צירים
    page: {
        flex: 1,
        backgroundColor: PINK_BG,
        width: "100%",
    },
    scrollContent: {
        paddingVertical: 24,
        flexGrow: 1,
    },
    content: {
        width: "70%",      // כמו בדוגמה שלך
        alignSelf: "center",
        paddingHorizontal: 20,
    },

    // כרטיס כותרת/קונטיינרים
    card: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 18,
        marginBottom: 20,
        width: "100%",
        ...shadow,
    },

    title: {
        textAlign: "center",
        color: PINK,
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 6,
        textShadowColor: "rgba(216, 27, 96, 0.25)",
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    subtitle: {
        textAlign: "center",
        marginBottom: 6,
        fontSize: 15,
        color: TEXT_MUTED,
        lineHeight: 22,
    },

    // אזור רשימה, כותרת מקטע
    sectionHeader: { marginTop: 6, marginBottom: 8 },
    listTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: PINK,
        textAlign: "center",
        marginBottom: 6,
    },
    decorativeLine: {
        height: 3,
        backgroundColor: PINK,
        borderRadius: 2,
        opacity: 0.3,
        alignSelf: "center",
        width: "100%",
        marginBottom: 6,
    },

    // רשימת חדרים בסגנון שורות/באדג’ים
    itemsContainer: { flex: 1, marginTop: 6, width: "100%" },
    itemRow: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        paddingHorizontal: 16,
        paddingVertical: 14,
        marginBottom: 10,
        borderRadius: 14,
        shadowColor: PINK,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
    },
    itemLeft: { marginRight: 12 },
    itemIndexBadge: {
        backgroundColor: PINK,
        color: "#fff",
        minWidth: 26,
        textAlign: "center",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 10,
        fontWeight: "bold",
    },
    itemMiddle: { flex: 1 },
    itemTitle: { fontSize: 16, color: "#333", marginBottom: 2, fontWeight: "600", textAlign: "right" },
    itemSubtitle: { fontSize: 14, color: TEXT_MUTED, textAlign: "right" },

    itemRight: { marginLeft: 12, alignItems: "flex-end" },

    // כפתורי פעולה / באדג’ים, תואם לדוגמה
    primaryButton: {
        backgroundColor: PINK,
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderRadius: 25,
        ...shadow,
    },
    primaryButtonText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "bold",
        textAlign: "center",
    },

    badge: {
        backgroundColor: PINK_LIGHT,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 12,
        alignItems: "center",
    },
    badgeText: {
        color: PINK,
        fontSize: 15,
        fontWeight: "700",
    },
    badgeSubText: {
        fontSize: 10,
        color: "#b71c1c",
        marginTop: 2,
    },

    // עזרים קיימים
    center: { alignItems: "center", justifyContent: "center" },
    emptyStateText: { fontSize: 16, color: TEXT_MUTED, textAlign: "center", marginTop: 8 },
    err: { color: "#c62828", textAlign: "center", fontSize: 14 },

    // --- תוספות למסך חדר צ'אט ([roomId]) ---

    // כפתור חזרה קטן
    backBtn: { padding: 10, alignSelf: "flex-start" },
    backBtnText: { color: PINK, fontSize: 16 },

    // רשימה עם מרווח תחתון כדי שלא ייכנס מתחת לקלט
    listWithInput: {
        paddingTop: 0,
        paddingBottom: 90,
        gap: 10,
    },

    // כרטיס "פוסט" (הודעה ראשית)
    postCard: {
        backgroundColor: "#fff",
        borderRadius: 14,
        padding: 14,
        shadowColor: PINK,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
        marginTop:10
    },
    postText: { fontSize: 16, color: "#333", textAlign: "right" },

    // שורת מטא + כפתורים מימין
    postMetaRow: {
        marginTop: 8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    rightMeta: { flexDirection: "row", alignItems: "center", gap: 8 },

    // תגית "תגובות"
    replyBadge: {
        backgroundColor: PINK_LIGHT,
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 12,
    },
    replyBadgeText: { color: PINK, fontSize: 12, fontWeight: "700" },

    // טקסט מטא קטן (תאריך וכו')
    meta: { fontSize: 11, color: "#666", textAlign: "left" },

    // שורת הקלט בתחתית
    inputBar: {
        flexDirection: "row",
        alignItems: "center",
        padding: 8,
        borderTopWidth: 1,
        borderColor: "#eee",
        // backgroundColor: "#fff",
        marginBottom:10
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 10,
        backgroundColor: "#fff",
    },
    sendBtn: {
        marginLeft: 8,
        backgroundColor: "#f48fb1",
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
    },
    sendTxt: { color: "#fff", fontWeight: "700" },

    // כפתור משני (ל"פתחי שרשור")
    secondaryButton: {
        backgroundColor: "#fff",
        borderWidth: 2,
        borderColor: PINK,
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
    },
    secondaryButtonText: {
        color: PINK,
        fontWeight: "700",
        fontSize: 14,
    },
    // chatStyles.js
    feedArea: { flex: 1 },
    feedHeaderRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center", // 🔹 ממקם הכל במרכז השורה
        marginBottom: 6,
        paddingHorizontal: 4,
    },
    feedHeaderCount: {
        borderWidth: 1,
        borderColor: "#f2c9d6",
        borderRadius: 999,
        paddingHorizontal: 10,
        paddingVertical: 4,
        backgroundColor: "#fff",
    },
    feedHeaderCountText: {
        color: "#b71c1c",
        fontWeight: "700",
    },
    guidanceCard: {
        backgroundColor: "#fff",
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#f2c9d6",
        paddingVertical: 14,
        paddingHorizontal: 16,
        marginBottom: 12,
        // צל עדין:
        shadowColor: "#d81b60",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.06,
        shadowRadius: 10,
        elevation: 2,
    },

    guidanceHeader: {
        flexDirection: "row-reverse",
        alignItems: "center",
        marginBottom: 6,
    },

    guidanceEmoji: {
        fontSize: 18,
        marginLeft: 6, // רווח מהכותרת (RTL)
    },

    guidanceTitle: {
        fontSize: 16,
        fontWeight: "800",
        color: "#d81b60",
    },

    guidanceText: {
        color: "#555",
        lineHeight: 20,
        marginBottom: 8,
        textAlign: "right",
    },

    guidanceList: {
        gap: 4, // אם לא עובד לך, אפשר להחליף ב־marginBottom קטן על כל שורה
    },

    guidanceItem: {
        color: "#444",
        fontSize: 14,
        lineHeight: 20,
        textAlign: "right",
    },
    cardHeaderRow: {
        backgroundColor: "#fff",
        borderRadius: 16,
        paddingVertical: 18,
        paddingHorizontal: 18,
        marginBottom: 20,
        alignItems: "center", // מרכז אנכית
        justifyContent: "center", // מרכז אופקית את הכותרת
        position: "relative", // כדי שהחץ יהיה מוחלט ביחס לכרטיס
        ...shadow,
    },
    backCircleSmall: {
        position: "absolute",
        left: 10, // בקצה שמאל של הכרטיס
        top: "50%",
        transform: [{ translateY: -20 }], // מרכז אנכית
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#fff5f8",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#f2c9d6",
    },
    backCircleIcon: {
        color: "#d81b60",
        fontSize: 18,
        fontWeight: "bold",
    },


});