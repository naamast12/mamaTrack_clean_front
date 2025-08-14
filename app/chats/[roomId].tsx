// app/chats/[roomId].tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
    View,
    Text,
    ActivityIndicator,
    FlatList,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    Alert
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import ProtectedRoute from "../../components/ProtectedRoute";
import { HomeButton } from "../utils/HomeButton";
import styles from "../../styles/chatStyles";
import { getMessages, sendMessage } from "./chatApi";
import chatStyles from "@/styles/chatStyles";

type Msg = { id: number; senderId: number; body: string; createdAt: string; parentId?: number | null };

export default function ChatRoomScreen() {
    const router = useRouter();
    const { roomId, name } = useLocalSearchParams<{ roomId: string; name?: string }>();
    const id = Number(roomId);

    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState<string>("");
    const [messages, setMessages] = useState<Msg[]>([]);
    const [text, setText] = useState("");
    const [sending, setSending] = useState(false);

    const [inputH, setInputH] = useState(0);
    const MIN_H = 36;   // שורה אחת
    const MAX_H = 160;  // תקרה
    const listRef = useRef<FlatList<Msg>>(null);

    const topLevelMessages = useMemo(
        () =>
            messages
                .filter((m) => !m.parentId)
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
        [messages]
    );

    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                setLoading(true);
                const data = await getMessages(id, { limit: 30 });
                if (!cancelled) setMessages(data);
            } catch {
                if (!cancelled) setErr("שגיאה בטעינת הודעות");
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();
        return () => {
            cancelled = true;
        };
    }, [id]);

    // פונקציה שמקפיצה לראש הרשימה (הפריט החדש ביותר – index 0)
    const jumpToTop = (animated = true) => {
        requestAnimationFrame(() => {
            listRef.current?.scrollToIndex({ index: 0, animated });
        });
    };

    const onSend = async () => {
        const body = text.trim();
        if (!body || sending) return;

        const tempId = -(Date.now() + Math.random());
        try {
            setSending(true);
            setText("");
            setInputH(0);                  // ← חוזר לשורה אחת

            const optimistic: Msg = {
                id: tempId as any,
                senderId: -1,
                body,
                createdAt: new Date().toISOString(),
                parentId: null,
            };

            // מוסיפים ל־HEAD כי חדש למעלה
            setMessages((prev) => [optimistic, ...prev]);

            // נותנים ל־FlatList למדוד ואז קופצים לראש
            jumpToTop(true);

            const saved = await sendMessage(id, body);

            // מחליפים את ה־temp בהודעת השרת
            setMessages((prev) => prev.map((m) => (m.id === tempId ? saved : m)));

            // שוב מבטיחים שהמשתמש רואה את ההודעה בראש
            jumpToTop(true);
            alert('הפוסט פורסם בהצלחה😊');

        } catch {
            setErr("שגיאה בשליחת הודעה");
            setMessages((prev) => prev.filter((m) => m.id !== tempId));
            setText(body);
            alert("הייתה בעיה בפרסום הפוסט, נסי שוב")
        } finally {
            setSending(false);
        }
    };

    // מפה לספירת תגובות לכל פוסט
    const repliesMap = useMemo(() => {
        const map = new Map<number, number>();
        for (const m of messages) if (m.parentId) map.set(m.parentId, (map.get(m.parentId) || 0) + 1);
        return map;
    }, [messages]);

    const renderItem = ({ item }: { item: Msg }) => (
        <View style={styles.postCard}>
            {/* כותרת קטנה עם זמן */}
            <View style={{ flexDirection: "row-reverse", alignItems: "center", marginBottom: 6 }}>
                <Text style={[styles.meta, { marginLeft: 8 }]}>
                    {new Date(item.createdAt).toLocaleString()}
                </Text>
            </View>

            {/* תוכן הפוסט */}
            <Text style={styles.postText}>{item.body}</Text>

            {/* פוטר: תגובות + כפתור שרשור */}
            <View style={[styles.postMetaRow, { marginTop: 10 }]}>
                <View style={styles.rightMeta}>
                    <View style={styles.replyBadge}>
                        <Text style={styles.replyBadgeText}>{repliesMap.get(item.id) || 0} תגובות</Text>
                    </View>

                    <TouchableOpacity
                        style={styles.secondaryButton}
                        onPress={() =>
                            router.push({
                                pathname: "/chats/thread",
                                params: {
                                    roomId: String(id),
                                    parentId: String(item.id),
                                    title: item.body.slice(0, 30),
                                },
                            })
                        }
                    >
                        <Text style={styles.secondaryButtonText}>פתחי שרשור</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    const maxLen = 1000;
    const isDisabled = sending || text.trim().length === 0;


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


                        {/*/!* קופסת הנחייה – אקורדיון קומפקטי *!/*/}
                        {/*<View style={[chatStyles.guidanceCard, { paddingVertical: 10 }]}>*/}
                        {/*    <TouchableOpacity*/}
                        {/*        onPress={() => setShowTips(v => !v)}*/}
                        {/*        style={[chatStyles.guidanceHeader, { paddingVertical: 4 }]}*/}
                        {/*    >*/}
                        {/*        <Text style={chatStyles.guidanceEmoji}>💡</Text>*/}
                        {/*        <Text style={chatStyles.guidanceTitle}>*/}
                        {/*            איך כותבים פוסט טוב? {showTips ? "▲" : "▼"}*/}
                        {/*        </Text>*/}
                        {/*    </TouchableOpacity>*/}

                        {/*    {showTips && (*/}
                        {/*        <>*/}

                        {/*            <View style={[chatStyles.guidanceList, { marginTop: 6 }]}>*/}
                        {/*                <Text style={chatStyles.guidanceItem}>• צייני שבוע/תחושה</Text>*/}
                        {/*                <Text style={chatStyles.guidanceItem}>• שאלי שאלה אחת ברורה</Text>*/}
                        {/*                <Text style={chatStyles.guidanceItem}>• אפשר כותרת קצרה</Text>*/}
                        {/*            </View>*/}
                        {/*        </>*/}
                        {/*    )}*/}
                        {/*</View>*/}

                        {/* קומפוזר קומפקטי */}
                        <View style={[styles.card, { paddingVertical: 10 }]}>
                            <View style={{
                                flexDirection: "row-reverse",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: 4,
                            }}>
                                <Text style={chatStyles.listTitle}>העלאת פוסט חדש ✨</Text>
                                <Text style={{ color: "#666", fontSize: 12 }}>{text.length}/{maxLen}</Text>
                            </View>

                            <View style={[styles.inputBar, { marginTop: 4 }]}>
                                <TextInput
                                    style={[
                                        styles.input,
                                        {
                                            flex: 1,
                                            textAlignVertical: 'top',
                                            paddingVertical: 6,
                                            height: Math.min(MAX_H, Math.max(MIN_H, inputH || MIN_H)),
                                        },
                                    ]}
                                    placeholder="כתבי כאן את הפוסט…"
                                    value={text}
                                    onChangeText={setText}
                                    multiline
                                    numberOfLines={1}               // מתחיל שורה אחת
                                    onContentSizeChange={e => {
                                        const h = e.nativeEvent.contentSize?.height || 0;
                                        setInputH(h);
                                    }}
                                    maxLength={maxLen}
                                    blurOnSubmit={false}
                                />
                                <TouchableOpacity
                                    style={[styles.sendBtn, isDisabled && { opacity: 0.5 }]}
                                    onPress={onSend}
                                    disabled={isDisabled}
                                >
                                    <Text style={styles.sendTxt}>{sending ? "שולחת…" : "פרסמי פוסט"}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* כותרת לפיד + מונה פוסטים */}
                        <View style={chatStyles.feedHeaderRow}>
                            <Text style={chatStyles.listTitle}>  פוסטים אחרונים  </Text>
                            <View style={chatStyles.feedHeaderCount}>
                                <Text style={chatStyles.feedHeaderCountText}>{topLevelMessages.length}</Text>
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
                        ) : topLevelMessages.length === 0 ? (
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
                                    data={topLevelMessages}
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