// app/chats/thread.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
    View, Text, ActivityIndicator, FlatList,
    TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Alert
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import ProtectedRoute from "../../components/ProtectedRoute";
import { HomeButton } from "../utils/HomeButton";
import styles from "../../styles/chatStyles";
import chatStyles from "@/styles/chatStyles";
import { getMessages, sendMessage } from "./chatApi";

type Msg = { id: number; senderId: number; body: string; createdAt: string; parentId?: number | null };

export default function ThreadScreen() {
    const router = useRouter();
    const { roomId, parentId, title } = useLocalSearchParams<{ roomId: string; parentId: string; title?: string }>();
    const rid = Number(roomId);
    const pid = Number(parentId);

    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState<string>("");
    const [messages, setMessages] = useState<Msg[]>([]);
    const [text, setText] = useState("");
    const [sending, setSending] = useState(false);

    const [inputH, setInputH] = useState(0);
    const MIN_H = 36;   // שורה אחת
    const MAX_H = 160;  // תקרה

    const listRef = useRef<FlatList<Msg>>(null);
    const lastId = useMemo(() => (messages.length ? messages[messages.length - 1].id : 0), [messages]);

    // טעינה ראשונית
    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                setLoading(true);
                const data = await getMessages(rid, { limit: 200 });
                if (!cancelled) setMessages(data);
            } catch {
                if (!cancelled) setErr("שגיאה בטעינת תגובות");
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();
        return () => { cancelled = true; };
    }, [rid]);

    // הודעת האם + תגובות של אותה הודעה
    const parentMsg = useMemo(() => messages.find(m => m.id === pid) || null, [messages, pid]);
    const replies = useMemo(
        () =>
            messages
                .filter(m => m.parentId === pid)
                .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()),
        [messages, pid]
    );

    // פולינג לעדכונים
    useEffect(() => {
        const t = setInterval(async () => {
            try {
                if (!lastId) return;
                const fresh = await getMessages(rid, { afterId: lastId, limit: 200 });
                if (fresh?.length) {
                    setMessages(prev => [...prev, ...fresh]);
                    requestAnimationFrame(() => listRef.current?.scrollToEnd({ animated: true }));
                }
            } catch {}
        }, 3000);
        return () => clearInterval(t);
    }, [rid, lastId]);

    const onSend = async () => {
        const body = text.trim();
        if (!body || sending) return;

        setSending(true);
        setText("");
        setInputH(0);                  // ← חוזר לשורה אחת

        const tempId = Date.now() + Math.random();
        const optimistic: Msg = {
            id: tempId as any,
            senderId: -1,
            body,
            createdAt: new Date().toISOString(),
            parentId: pid,
        };

        setMessages(prev => [...prev, optimistic]);
        requestAnimationFrame(() => listRef.current?.scrollToEnd({ animated: true }));

        try {
            const saved = await sendMessage(rid, body, pid);
            setMessages(prev => prev.map(m => (m.id === tempId ? saved : m)));
            Alert.alert("נוספה תגובה", "התגובה פורסמה בהצלחה 😊");
        } catch {
            setErr("שגיאה בשליחת תגובה");
            setMessages(prev => prev.filter(m => m.id !== tempId));
            setText(body);
            Alert.alert("שגיאה", "לא הצלחנו לפרסם את התגובה. נסי שוב.");
        } finally {
            setSending(false);
        }
    };

    const openThread = (msgId: number, preview: string) => {
        router.push({
            pathname: "/chats/thread",
            params: {
                roomId: String(rid),
                parentId: String(msgId),
                title: preview.slice(0, 30),
            },
        });
    };

    // כרטיס תגובה בודדת – מותאם לעיצוב הראשי
    const renderReply = ({ item }: { item: Msg }) => (
        <View style={styles.postCard}>
            <View style={{ flexDirection: "row-reverse", alignItems: "center", marginBottom: 6 }}>
                <Text style={[styles.meta, { marginLeft: 8 }]}>{new Date(item.createdAt).toLocaleString()}</Text>
            </View>

            <Text style={styles.postText}>{item.body}</Text>

            <View style={[styles.postMetaRow, { marginTop: 10 }]}>
                <View style={styles.rightMeta}>
                    <TouchableOpacity
                        style={styles.secondaryButton}
                        onPress={() => openThread(item.id, item.body)}
                    >
                        <Text style={styles.secondaryButtonText}>פתחי שרשור מתגובה</Text>
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
                        <View style={styles.card}>
                            <TouchableOpacity style={chatStyles.backCircleSmall} onPress={() => router.back()}>
                                <Text style={chatStyles.backCircleIcon}>←</Text>
                            </TouchableOpacity>
                            <Text
                                style={[
                                    styles.title,
                                    (parentMsg?.body?.length ?? 0) > 80 && { fontSize: 20 }
                                ]}
                            >
                                {parentMsg?.body ?? title ?? "פוסט"}
                            </Text>
                            <Text style={styles.subtitle}>
                                {replies.length} תגובות • {parentMsg ? new Date(parentMsg.createdAt).toLocaleString() : ""}
                            </Text>
                        </View>


                        {/* קומפוזר: כתבי תגובה */}
                        <View style={[styles.card, { paddingBottom: 12 }]}>
                            <View
                                style={{
                                    flexDirection: "row-reverse",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    marginBottom: 6,
                                }}
                            >
                                <Text style={chatStyles.listTitle}>כתבי תגובה</Text>
                                <Text style={{ color: "#666", fontSize: 12 }}>
                                    {text.length}/{maxLen}
                                </Text>
                            </View>

                            <View style={[styles.inputBar, { marginTop: 6 }]}>
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
                                    placeholder="כתבי כאן את התגובה…"
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
                                    <Text style={styles.sendTxt}>{sending ? "שולחת…" : "שלחי"}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* כותרת "תגובות" + מונה */}
                        <View style={chatStyles.feedHeaderRow}>
                            <Text style={chatStyles.listTitle}>  תגובות</Text>
                            <View style={chatStyles.feedHeaderCount}>
                                <Text style={chatStyles.feedHeaderCountText}>{replies.length}</Text>
                            </View>
                        </View>
                        <View style={chatStyles.sectionHeader}>
                            <View style={chatStyles.decorativeLine} />
                        </View>

                        {/* תוכן השרשור */}
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
                            <>
                                <FlatList
                                    ref={listRef}
                                    data={replies}
                                    keyExtractor={(m) => String(m.id)}
                                    contentContainerStyle={styles.listWithInput}
                                    renderItem={renderReply}
                                    onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
                                    onLayout={() => listRef.current?.scrollToEnd({ animated: false })}
                                />

                            </>
                        )}
                    </View>
                </KeyboardAvoidingView>
            </>
        </ProtectedRoute>
    );
}