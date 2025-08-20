// styles/chatStyles.js
import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "@/constants/Colors";

const { width } = Dimensions.get("window"); // אופציונלי אם תרצי גם פונטים רספונסיביים
const shadow = {
    shadowColor: Colors.pinkDeep,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
};

export default StyleSheet.create({
    /* פריסת עמוד */
    page: {
        flex: 1,
        width: "100%",
    },
    // כמו pageContent ב-overview
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 24,      // כמו ב-overview
        // אם את צריכה גם מרווח עליון השאירי: paddingVertical: 24
    },

    // כמו inner ב-overview
    content: {
        width: "100%",
        maxWidth: 900,          // ⬅️ ההגבלה במסכים רחבים
        alignSelf: "center",
        paddingHorizontal: 24,  // ⬅️ ריווח צדדי זהה
        // paddingTop: 16        // אם תרצי אותו ספייס עליון כמו ב-overview
    },

    /* כרטיס / קונטיינר */
    card: {
        backgroundColor: Colors.white,
        borderRadius: 16,
        padding: 18,
        marginBottom: 20,
        width: "100%",
        borderWidth: 2,
        borderColor: Colors.white,
        shadowColor: Colors.white,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 5,
    },

    title: {
        textAlign: "center",
        color: Colors.pink700,
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 6,
        textShadowColor: Colors.blue,
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    subtitle: {
        textAlign: "center",
        marginBottom: 6,
        fontSize: 15,
        color: Colors.blue700,
        lineHeight: 22,
    },

    /* אלמנטים דקורטיביים לכותרת */
    titleContainer: {
        alignItems: "center",
        marginBottom: 8,
    },
    titleDecoration: {
        width: 60,
        height: 3,
        backgroundColor: Colors.blue,
        borderRadius: 2,
        marginTop: 8,
        opacity: 0.7,
    },
    subtitleDecoration: {
        width: 40,
        height: 2,
        backgroundColor: Colors.pink,
        borderRadius: 1,
        marginTop: 8,
        opacity: 0.6,
        alignSelf: "center",
    },

    /* אזור רשימה */
    sectionHeader: { marginTop: 6, marginBottom: 8 },
    listTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: Colors.pink700,
        textAlign: "center",
        marginBottom: 6,
    },
    decorativeLine: {
        height: 3,
        backgroundColor: Colors.blue,
        borderRadius: 2,
        opacity: 0.6,
        alignSelf: "center",
        width: "100%",
        marginBottom: 6,
    },

    itemsContainer: { flex: 1, marginTop: 6, width: "100%" },
    itemRow: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.blueLight,
        paddingHorizontal: 16,
        paddingVertical: 14,
        marginBottom: 10,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: Colors.blueLight,
        shadowColor: Colors.blue,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    itemLeft: { marginRight: 12 },
    itemIndexBadge: {
        backgroundColor: Colors.pink,
        color: Colors.white,
        minWidth: 26,
        textAlign: "center",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 10,
        fontWeight: "bold",
        shadowColor: Colors.blue,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 3,
    },
    itemMiddle: { flex: 1 },
    itemTitle: { fontSize: 16, color: Colors.blue700, marginBottom: 2, fontWeight: "600", textAlign: "right" },
    itemSubtitle: { fontSize: 14, color: Colors.pink700, textAlign: "right" },
    itemRight: { marginLeft: 12, alignItems: "flex-end" },

    /* כפתורים / באדג'ים */
    primaryButton: {
        backgroundColor: Colors.pink,
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderRadius: 25,
        shadowColor: Colors.blue,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 6,
        elevation: 4,
    },
    primaryButtonText: {
        color: Colors.white,
        fontSize: 14,
        fontWeight: "bold",
        textAlign: "center",
    },
    badge: {
        backgroundColor: Colors.blue50,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 12,
        alignItems: "center",
        borderWidth: 1,
        borderColor: Colors.blue,
    },
    badgeText: { color: Colors.blue700, fontSize: 15, fontWeight: "700" },
    badgeSubText: { fontSize: 10, color: Colors.pink700, marginTop: 2 },

    /* עזרים */
    center: { alignItems: "center", justifyContent: "center" },
    emptyStateText: { fontSize: 16, color: Colors.mutedText, textAlign: "center", marginTop: 8 },
    err: { color: Colors.redDarker, textAlign: "center", fontSize: 14 },

    /* --- חדר צ'אט ([roomId]) --- */
    backBtn: { padding: 10, alignSelf: "flex-start" },
    backBtnText: { color: Colors.white, fontSize: 16 },

    listWithInput: { paddingTop: 0, paddingBottom: 90, gap: 10 },

    postCard: {
        backgroundColor: Colors.white,
        borderRadius: 14,
        padding: 14,
        shadowColor: Colors.blue,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        marginTop: 10,
        borderWidth: 1,
        borderColor: Colors.white,
    },
    postText: { fontSize: 16, color: Colors.text, textAlign: "right" },

    postMetaRow: {
        marginTop: 8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    rightMeta: { flexDirection: "row-reverse", alignItems: "center", gap: 8 },

    replyBadge: { backgroundColor: Colors.pinkLight, paddingVertical: 4, paddingHorizontal: 10, borderRadius: 12 },
    replyBadgeText: { color: Colors.pinkDeep, fontSize: 12, fontWeight: "700" },

    meta: { fontSize: 11, color: Colors.mutedText, textAlign: "left" },

    inputBar: {
        flexDirection: "row",
        alignItems: "center",
        padding: 8,
        borderTopWidth: 1,
        borderColor: Colors.white,
        marginBottom: 10,
        backgroundColor: Colors.white,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: Colors.blueLight,
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 10,
        backgroundColor: Colors.blueLight,
    },
    sendBtn: {
        marginLeft: 8,
        backgroundColor: Colors.pinkAccent,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
    },
    sendTxt: { color: Colors.white, fontWeight: "700" },

    secondaryButton: {
        backgroundColor: Colors.white,
        borderWidth: 2,
        borderColor: Colors.pinkDeep,
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
    },
    secondaryButtonText: { color: Colors.pinkDeep, fontWeight: "700", fontSize: 14 },

    /* אזור פיד וכותרת */
    feedArea: { 
        flex: 1,
        backgroundColor: Colors.blueLight,
        borderRadius: 15,
        padding: 8,
        marginHorizontal: 4,
    },
    feedHeaderRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 6,
        paddingHorizontal: 4,
    },
    feedHeaderCount: {
        borderWidth: 1,
        borderColor: Colors.pink,
        borderRadius: 999,
        paddingHorizontal: 10,
        paddingVertical: 4,
        backgroundColor: Colors.blueLight,
    },
    feedHeaderCountText: { color: Colors.pink700, fontWeight: "700" },

    guidanceCard: {
        backgroundColor: Colors.white,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: Colors.pinkOutline,
        paddingVertical: 14,
        paddingHorizontal: 16,
        marginBottom: 12,
        shadowColor: Colors.pinkDeep,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.06,
        shadowRadius: 10,
        elevation: 2,
    },
    guidanceHeader: { flexDirection: "row-reverse", alignItems: "center", marginBottom: 6 },
    guidanceEmoji: { fontSize: 18, marginLeft: 6 },
    guidanceTitle: { fontSize: 16, fontWeight: "800", color: Colors.pinkDeep },
    guidanceText: { color: Colors.deepText, lineHeight: 20, marginBottom: 8, textAlign: "right" },

    guidanceList: { gap: 4 },
    guidanceItem: { color: Colors.deepText, fontSize: 14, lineHeight: 20, textAlign: "right" },

    cardHeaderRow: {
        backgroundColor: Colors.white,
        borderRadius: 16,
        paddingVertical: 18,
        paddingHorizontal: 18,
        marginBottom: 20,
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        borderWidth: 2,
        borderColor: Colors.white,
        shadowColor: Colors.blue,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 5,
    },
    backCircleSmall: {
        position: "absolute",
        left: 10,
        top: "50%",
        transform: [{ translateY: -20 }],
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.pinkBg,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: Colors.pinkOutline,
    },
    backCircleIcon: { color: Colors.pinkDeep, fontSize: 18, fontWeight: "bold" },
});