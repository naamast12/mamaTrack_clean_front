// app/chats/thread.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
    View, Text, ActivityIndicator, FlatList,
    TextInput, TouchableOpacity, KeyboardAvoidingView, Platform
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import ProtectedRoute from "../../components/ProtectedRoute";
import { HomeButton } from "../utils/HomeButton";
import styles from "../../styles/chatStyles";
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

    const listRef = useRef<FlatList<Msg>>(null);
    const lastId = useMemo(() => (messages.length ? messages[messages.length - 1].id : 0), [messages]);

    // טוען את כל הודעות החדר (פשוט ומהיר לשלב ראשון)
    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                setLoading(true);
                const data = await getMessages(rid, { limit: 100 }); // אפשר להגדיל/להקטין
                if (!cancelled) setMessages(data);
            } catch {
                if (!cancelled) setErr("שגיאה בטעינת הודעות");
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();
        return () => { cancelled = true; };
    }, [rid]);

    // פילוח: הודעת-אם + תגובות
    const parentMsg = useMemo(
        () => messages.find(m => m.id === pid) || null,
        [messages, pid]
    );
    const replies = useMemo(
        () =>
            messages
                .filter(m => m.parentId === pid)
                .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()),
        [messages, pid]
    );

    // פולינג לתגובות חדשות
    useEffect(() => {
        const t = setInterval(async () => {
            try {
                if (!lastId) return;
                const fresh = await getMessages(rid, { afterId: lastId, limit: 100 });
                if (fresh?.length) {
                    setMessages(prev => [...prev, ...fresh]);
                    setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 50);
                }
            } catch {}
        }, 3000);
        return () => clearInterval(t);
    }, [rid, lastId]);

    const onSend = async () => {
        const body = text.trim();
        if (!body || sending) return;
        try {
            setSending(true);
            setText("");

            // אופטימית: מוסיפים מיד
            const optimistic: Msg = {
                id: (lastId || 0) + 0.1,
                senderId: -1,
                body,
                createdAt: new Date().toISOString(),
                parentId: pid,
            };
            setMessages(prev => [...prev, optimistic]);
            setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 50);

            // שליחה עם parentId!
            const saved = await sendMessage(rid, body, pid);
            setMessages(prev => prev.map(m => (m === optimistic ? saved : m)));
        } catch {
            setErr("שגיאה בשליחת תגובה");
            setMessages(prev => prev.filter(m => m.id !== (lastId || 0) + 0.1));
            setText(body);
        } finally {
            setSending(false);
        }
    };

    const renderReply = ({ item }: { item: Msg }) => (
        <View style={styles.msg}>
            <Text style={styles.msgTxt}>{item.body}</Text>
            <Text style={styles.meta}>{new Date(item.createdAt).toLocaleString()}</Text>
        </View>
    );

    return (
        <ProtectedRoute requireAuth={true}>
            <>
                <HomeButton />
                <TouchableOpacity style={{ padding: 10, alignSelf: "flex-start" }} onPress={() => router.back()}>
                    <Text style={{ color: "#d81b60", fontSize: 16 }}>← חזרה</Text>
                </TouchableOpacity>

                <KeyboardAvoidingView
                    style={styles.roomContainer}
                    behavior={Platform.OS === "ios" ? "padding" : undefined}
                    keyboardVerticalOffset={80}
                >
                    <Text style={styles.roomTitle}>שרשור</Text>

                    {err ? (
                        <Text style={styles.err}>{err}</Text>
                    ) : loading ? (
                        <View style={styles.center}>
                            <ActivityIndicator />
                            <Text>טוען…</Text>
                        </View>
                    ) : (
                        <>
                            {/* הודעת האם בחלק עליון */}
                            <View style={[styles.msg, { backgroundColor: "#fff7fb", borderWidth: 1, borderColor: "#f8c1d8" }]}>
                                <Text style={[styles.msgTxt, { fontWeight: "700" }]}>
                                    {parentMsg?.body ?? title ?? "פוסט"}
                                </Text>
                                {parentMsg && (
                                    <Text style={styles.meta}>{new Date(parentMsg.createdAt).toLocaleString()}</Text>
                                )}
                                <Text style={styles.meta}>{replies.length} תגובות</Text>
                            </View>

                            {/* תגובות */}
                            <FlatList
                                ref={listRef}
                                data={replies}
                                keyExtractor={(m) => String(m.id)}
                                contentContainerStyle={styles.list}
                                renderItem={renderReply}
                                onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
                                onLayout={() => listRef.current?.scrollToEnd({ animated: false })}
                            />

                            {/* קלט תגובה */}
                            <View style={styles.inputBar}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="כתבי תגובה…"
                                    value={text}
                                    onChangeText={setText}
                                    multiline
                                />
                                <TouchableOpacity style={styles.sendBtn} onPress={onSend} disabled={sending}>
                                    <Text style={styles.sendTxt}>{sending ? "שולחת…" : "שלחי"}</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    )}
                </KeyboardAvoidingView>
            </>
        </ProtectedRoute>
    );
}