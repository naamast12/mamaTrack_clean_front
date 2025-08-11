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
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import ProtectedRoute from "../../components/ProtectedRoute";
import { HomeButton } from "../utils/HomeButton";
import styles from "../../styles/chatStyles";
import { getMessages, sendMessage } from "./chatApi";
import { useRouter } from "expo-router"; // הוספה


type Msg = { id: number; senderId: number; body: string; createdAt: string };

export default function ChatRoomScreen() {
    const router = useRouter(); // הוספה
    const { roomId, name } = useLocalSearchParams<{ roomId: string; name?: string }>();
    const id = Number(roomId);

    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState<string>("");
    const [messages, setMessages] = useState<Msg[]>([]);
    const [text, setText] = useState("");
    const [sending, setSending] = useState(false);

    const listRef = useRef<FlatList<Msg>>(null);
    const lastId = useMemo(() => (messages.length ? messages[messages.length - 1].id : 0), [messages]);

    // initial load
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

    // polling for new messages
    useEffect(() => {
        const t = setInterval(async () => {
            try {
                if (!lastId) return;
                const fresh = await getMessages(id, { afterId: lastId, limit: 30 });
                if (fresh?.length) {
                    setMessages(prev => [...prev, ...fresh]);
                    // גלילה לסוף
                    setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 50);
                }
            } catch {
                /* שקט */
            }
        }, 3000);
        return () => clearInterval(t);
    }, [id, lastId]);

    const onSend = async () => {
        const body = text.trim();
        if (!body || sending) return;
        try {
            setSending(true);
            setText("");

            // אופטימיות: מציגים מיד, ואז מאשרים מהשרת
            const optimistic: Msg = {
                id: lastId + 0.1, // מזהה זמני כדי ש־FlatList ירנדר
                senderId: -1,
                body,
                createdAt: new Date().toISOString(),
            };
            setMessages(prev => [...prev, optimistic]);
            setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 50);

            const saved = await sendMessage(id, body);
            // מחליפים את ההודעה האופטימית בהודעה שחזרה מהשרת
            setMessages(prev =>
                prev.map(m => (m === optimistic ? saved : m))
            );
        } catch {
            setErr("שגיאה בשליחת הודעה");
            // אם כשל — מסירים את האופטימית ומחזירים את הטקסט לשדה
            setMessages(prev => prev.filter(m => m.id !== lastId + 0.1));
            setText(body);
        } finally {
            setSending(false);
        }
    };

    const renderItem = ({ item }: { item: Msg }) => (
        <View style={styles.msg}>
            <Text style={styles.msgTxt}>{item.body}</Text>
            <Text style={styles.meta}>{new Date(item.createdAt).toLocaleString()}</Text>
        </View>
    );

    return (
        <ProtectedRoute requireAuth={true}>
            <>
                <HomeButton />


                {/* כפתור חזרה */}
                <TouchableOpacity
                    style={{ padding: 10, alignSelf: "flex-start" }}
                    onPress={() => router.back()}
                >
                    <Text style={{ color: "#d81b60", fontSize: 16 }}>← חזרה</Text>
                </TouchableOpacity>
                <KeyboardAvoidingView
                    style={styles.roomContainer}
                    behavior={Platform.OS === "ios" ? "padding" : undefined}
                    keyboardVerticalOffset={80}
                >
                    <Text style={styles.roomTitle}>{name || "צ׳אט"}</Text>

                    {err ? (
                        <Text style={styles.err}>{err}</Text>
                    ) : loading ? (
                        <View style={styles.center}>
                            <ActivityIndicator />
                            <Text>טוען…</Text>
                        </View>
                    ) : (
                        <>
                            <FlatList
                                ref={listRef}
                                data={messages}
                                keyExtractor={(m) => String(m.id)}
                                contentContainerStyle={styles.list}
                                renderItem={renderItem}
                                onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
                                onLayout={() => listRef.current?.scrollToEnd({ animated: false })}
                            />

                            {/* input + send */}
                            <View style={styles.inputBar}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="כתבי הודעה…"
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