// app/chats/thread.jsx
import React from "react";
import { View, Text, ActivityIndicator, FlatList, KeyboardAvoidingView, Platform, Alert, TouchableOpacity } from "react-native";import { useLocalSearchParams, useRouter } from "expo-router";
import ProtectedRoute from "../../components/ProtectedRoute";
import { HomeButton } from "../utils/HomeButton";
import styles from "../../styles/chatStyles";
import chatStyles from "@/styles/chatStyles"; // אם אין alias "@/": החליפי ל "../../styles/chatStyles"
import { useMessages } from "./useMessages";
import Composer from "./Composer";
import { PostCard } from "./PostCard";

export default function ThreadScreen() {
    const router = useRouter();
    const { roomId, parentId, title } = useLocalSearchParams();
    const rid = Number(roomId);
    const pid = Number(parentId);

    const { loading, err, replies, parentMsg, send, sending, listRef , messages} = useMessages({
        roomId: rid,
        parentId: pid,
        initialLimit: 200,
        pollMs: 3000,
    });
    // מפה: כמה תגובות יש לכל הודעה (כולל תגובות-משנה)
    const repliesMap = React.useMemo(() => {
        const map = new Map();
        for (const m of messages || []) {
                 if (m.parentId) map.set(m.parentId, (map.get(m.parentId) || 0) + 1);
        }
        return map;
        }, [messages]);

    const renderReply = ({ item }) => (
          <PostCard item={item} rightBadge={
              <View style={styles.replyBadge}>
                  <Text style={styles.replyBadgeText}>{repliesMap.get(item.id) || 0} תגובות</Text>
              </View>
          } rightActionLabel="פתחי שרשור מתגובה"
                    onRightAction={() => router.push(
                        {pathname: "/chats/thread", params: { roomId: String(rid), parentId: String(item.id), title: item.body.slice(0, 30) },})}/>);

    return (
        <ProtectedRoute requireAuth={true}>
            <>
                <HomeButton />

                <KeyboardAvoidingView
                    style={styles.page}
                    behavior={Platform.OS === "ios" ? "padding" : undefined}
                    keyboardVerticalOffset={80}
                >
                    <View style={[styles.content, { flex: 1 }]}>
                        {/* כותרת עמוד */}
                        <View style={styles.card}>
                            <TouchableOpacity style={chatStyles.backCircleSmall} onPress={() => router.back()}>
                                <Text style={chatStyles.backCircleIcon}>←</Text>
                            </TouchableOpacity>
                            <Text style={[styles.title, (parentMsg?.body?.length ?? 0) > 80 && { fontSize: 20 }]}>
                                {parentMsg?.body ?? title ?? "פוסט"}
                            </Text>
                            <Text style={styles.subtitle}>
                                {replies.length} תגובות • {parentMsg ? new Date(parentMsg.createdAt).toLocaleString() : ""}
                            </Text>
                        </View>

                        {/* קומפוזר: תגובה */}
                        <Composer
                            placeholder="כתבי כאן את התגובה…"
                            disabled={sending}
                            onSend={async (t) => {
                                const ok = await send(t);
                                if (ok) alert( "התגובה פורסמה בהצלחה 😊");
                                return ok;
                            }}
                        />

                        {/* רשימת תגובות */}
                        <View style={chatStyles.feedHeaderRow}>
                            <Text style={chatStyles.listTitle}>תגובות</Text>
                            <View style={chatStyles.feedHeaderCount}>
                                <Text style={chatStyles.feedHeaderCountText}>{replies.length}</Text>
                            </View>
                        </View>
                        <View style={chatStyles.sectionHeader}>
                            <View style={chatStyles.decorativeLine} />
                        </View>

                        {err ? (
                            <View style={styles.card}>
                                <Text style={styles.err}>{err}</Text>
                            </View>
                        ) : loading ? (
                            <View style={styles.card}>
                                <View style={styles.center}>
                                    <ActivityIndicator />
                                    <Text style={styles.emptyStateText}>טוען…</Text>
                                </View>
                            </View>
                        ) : (
                            <FlatList
                                ref={listRef}
                                data={replies}
                                keyExtractor={(m) => String(m.id)}
                                contentContainerStyle={styles.listWithInput}
                                renderItem={renderReply}
                                onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
                                onLayout={() => listRef.current?.scrollToEnd({ animated: false })}
                            />
                        )}
                    </View>
                </KeyboardAvoidingView>
            </>
        </ProtectedRoute>
    );
}