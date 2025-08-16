// app/chats/[roomId].jsx
import React, { useMemo } from "react";
import {
    View,
    Text,
    ActivityIndicator,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    Alert,
    TouchableOpacity
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import ProtectedRoute from "../../components/ProtectedRoute";
import { HomeButton } from "../utils/HomeButton";
import styles from "../../styles/chatStyles";
import chatStyles from "@/styles/chatStyles";
import { useMessages } from "./useMessages";
import Composer from "./Composer";
import { PostCard } from "./PostCard";


export default function ChatRoomScreen() {
    const router = useRouter();
    const { roomId, name } = useLocalSearchParams();
    const id = Number(roomId);

    const { loading, err, messages, topLevel, send, sending, listRef } = useMessages({
        roomId: id,
        initialLimit: 30,
        pollMs: null,
    });

    // מפה: כמה תגובות לכל פוסט
    const repliesMap = useMemo(() => {
        const map = new Map();
        for (const m of messages) if (m.parentId) map.set(m.parentId, (map.get(m.parentId) || 0) + 1);
        return map;
    }, [messages]);

    const jumpToTop = (animated = true) => {
        requestAnimationFrame(() => {
            listRef.current?.scrollToIndex({ index: 0, animated });
        });
    };

    const renderItem = ({ item }) => (
        <PostCard
            item={item}
            rightBadge={
                <View style={styles.replyBadge}>
                    <Text style={styles.replyBadgeText}>{repliesMap.get(item.id) || 0} תגובות</Text>
                </View>
            }
            rightActionLabel="פתחי שרשור"
            onRightAction={() =>
                router.push({
                    pathname: "/chats/thread",
                    params: { roomId: String(id), parentId: String(item.id), title: item.body.slice(0, 30) },
                })
            }
        />
    );

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
                        <View style={chatStyles.cardHeaderRow}>
                                <TouchableOpacity style={chatStyles.backCircleSmall} onPress={() => router.back()}>
                                    <Text style={chatStyles.backCircleIcon}>←</Text>
                                </TouchableOpacity>
                            <Text style={styles.title}>{name}</Text>
                            <Text style={[chatStyles.guidanceText, { marginTop: 4 }]}>
                                כאן המקום לשתף, לשאול ולהתייעץ 🌷
                            </Text>
                        </View>

                        {/* קומפוזר חדש */}
                        <Composer
                            placeholder="כתבי כאן את הפוסט…"
                            disabled={sending}
                            onSend={async (t) => {
                                const ok = await send(t);
                                if (ok) {
                                    jumpToTop(true);
                                    alert( "הפוסט פורסם בהצלחה 😊");
                                }
                                return ok;
                            }}
                        />

                        {/* כותרת לפיד + מונה */}
                        <View style={chatStyles.feedHeaderRow}>
                            <Text style={chatStyles.listTitle}>פוסטים אחרונים</Text>
                            <View style={chatStyles.feedHeaderCount}>
                                <Text style={chatStyles.feedHeaderCountText}>{topLevel.length}</Text>
                            </View>
                        </View>
                        <View style={chatStyles.sectionHeader}>
                            <View style={chatStyles.decorativeLine} />
                        </View>

                        {/* פיד */}
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
                        ) : topLevel.length === 0 ? (
                            <View style={styles.card}>
                                <View style={styles.center}>
                                    <Text style={{ fontSize: 18, fontWeight: "800" }}>אין עדיין פוסטים</Text>
                                    <Text style={styles.emptyStateText}>כתבי את הפוסט הראשון שלך למעלה :)</Text>
                                </View>
                            </View>
                        ) : (
                            <View style={styles.feedArea}>
                                <FlatList
                                    ref={listRef}
                                    data={topLevel}
                                    keyExtractor={(m) => String(m.id)}
                                    renderItem={renderItem}
                                    style={{ flex: 1 }}
                                    contentContainerStyle={styles.listWithInput}
                                    showsVerticalScrollIndicator
                                    keyboardShouldPersistTaps="handled"
                                    onContentSizeChange={() => jumpToTop(false)}
                                    onScrollToIndexFailed={() => {
                                        requestAnimationFrame(() => {
                                            listRef.current?.scrollToIndex({ index: 0, animated: true });
                                        });
                                    }}
                                />
                            </View>
                        )}
                    </View>
                </KeyboardAvoidingView>
            </>
        </ProtectedRoute>
    );
}