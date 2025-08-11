// styles/chatStyles.js
import { StyleSheet } from "react-native";

const chatStyles = StyleSheet.create({
    // --- למסך index.tsx ---
    container: { flex: 1, padding: 16, gap: 12},
    title: { fontSize: 22, fontWeight: "700", textAlign: "right", marginBottom: 8 },
    tile: { backgroundColor: "#fff", padding: 16, borderRadius: 16, elevation: 3, marginBottom: 10 },
    tileTitle: { fontSize: 18, fontWeight: "700", textAlign: "right" },
    tileSub: { fontSize: 13, color: "#666", textAlign: "right", marginTop: 4 },
    center: { flex: 1, alignItems: "center", justifyContent: "center" },
    err: { color: "#c62828", textAlign: "center", marginBottom: 8 },

    // --- למסך [roomId].tsx (כשנוסיף) ---
    roomContainer: { flex: 1 },
    roomTitle: { fontSize: 18, fontWeight: "700", textAlign: "center", paddingVertical: 8 },
    loadMore: { alignSelf: "center", marginTop: 8, marginBottom: 4, paddingVertical: 6, paddingHorizontal: 12, borderRadius: 12, backgroundColor: "#eee" },
    msg: { backgroundColor: "#fff", padding: 10, borderRadius: 12 },
    msgTxt: { fontSize: 16, textAlign: "right" },
    meta: { fontSize: 11, color: "#666", marginTop: 4, textAlign: "left" },
    inputRow: { flexDirection: "row", padding: 10, gap: 8, backgroundColor: "#fff", borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: "#ddd" },
    input: { flex: 1, borderWidth: 1, borderColor: "#ddd", borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10, backgroundColor: "#fff" },
    send: { backgroundColor: "#9c27b0", borderRadius: 12, paddingHorizontal: 18, justifyContent: "center" },
    enterBtn: {
        paddingHorizontal: 14,
        paddingVertical: 10,
        backgroundColor: "#e91e63",
        borderRadius: 12,
        marginLeft: 10,
    },
    enterText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 14,
    },
    inputBar: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        borderTopWidth: 1,
        borderColor: '#eee',
        backgroundColor: '#fff',
    },
    sendBtn: {
        marginLeft: 8,
        backgroundColor: '#f48fb1',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
    },
    sendTxt: { color: '#fff', fontWeight: '700' },
    list: { padding: 12, gap: 8 },
    row: {
        width: '100%',
        paddingHorizontal: 12,
        marginVertical: 4,
        flexDirection: 'row',
    },
    rowMine: {
        justifyContent: 'flex-end',
    },
    rowOther: {
        justifyContent: 'flex-start',
    },

    bubble: {
        maxWidth: '78%',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 16,
    },

    bubbleMine: {
        backgroundColor: '#c2e7ff',   // תכלת נעים
        borderTopRightRadius: 4,
    },
    bubbleOther: {
        backgroundColor: '#f1f0f0',   // אפור בהיר
        borderTopLeftRadius: 4,
    },

    bubbleText: {
        fontSize: 16,
        color: '#222',
    },

    time: {
        fontSize: 11,
        color: '#666',
        marginTop: 4,
        textAlign: 'right',
    },
});

export default chatStyles;