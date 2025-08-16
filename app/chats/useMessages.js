// hooks/useMessages.js
import { useEffect, useMemo, useRef, useState } from "react";
import { FlatList } from "react-native";
import { getMessages, sendMessage } from "./chatApi";

/**
 * @param {{ roomId: number, parentId?: number|null, initialLimit?: number, pollMs?: number|null }} opts
 */
export function useMessages({ roomId, parentId = null, initialLimit = 30, pollMs = null }) {
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");
    /** @type {[import("@/types/chat").Msg[], Function]} */
    const [messages, setMessages] = useState([]);
    const [sending, setSending] = useState(false);

    /** @type {React.MutableRefObject<FlatList<import("@/types/chat").Msg>|null>} */
    const listRef = useRef(null);

    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                setLoading(true);
                const data = await getMessages(roomId, { limit: initialLimit });
                if (!cancelled) setMessages(data);
            } catch {
                if (!cancelled) setErr("שגיאה בטעינת הודעות");
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();
        return () => { cancelled = true; };
    }, [roomId, initialLimit]);

    const lastId = useMemo(
        () => (messages.length ? messages[messages.length - 1].id : 0),
        [messages]
    );

    useEffect(() => {
        if (!pollMs) return;
        const t = setInterval(async () => {
            try {
                if (!lastId) return;
                const fresh = await getMessages(roomId, { afterId: lastId, limit: initialLimit });
                if (fresh?.length) {
                    setMessages(prev => [...prev, ...fresh]);
                    requestAnimationFrame(() => listRef.current?.scrollToEnd({ animated: true }));
                }
            } catch {}
        }, pollMs);
        return () => clearInterval(t);
    }, [roomId, initialLimit, pollMs, lastId]);

    const topLevel = useMemo(
        () =>
            messages
                .filter(m => !m.parentId)
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
        [messages]
    );

    const replies = useMemo(
        () =>
            messages
                .filter(m => m.parentId === parentId)
                .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()),
        [messages, parentId]
    );

    const parentMsg = useMemo(
        () => (parentId ? (messages.find(m => m.id === parentId) ?? null) : null),
        [messages, parentId]
    );

    const send = async (body) => {
        const text = body.trim();
        if (!text || sending) return false;

        setSending(true);
        const tempId = Date.now() + Math.random();
        /** @type {import("@/types/chat").Msg} */
        const optimistic = {
            id: /** @type {any} */ (tempId),
            senderId: -1,
            body: text,
            createdAt: new Date().toISOString(),
            parentId: parentId ?? null,
        };

        setMessages(prev => (parentId ? [...prev, optimistic] : [optimistic, ...prev]));

        try {
            const saved = await sendMessage(roomId, text, parentId ?? undefined);
            setMessages(prev => prev.map(m => (m.id === tempId ? saved : m)));
            return true;
        } catch {
            setErr("שגיאה בשליחה");
            setMessages(prev => prev.filter(m => m.id !== tempId));
            return false;
        } finally {
            setSending(false);
        }
    };

    return {
        loading,
        err,
        messages,
        setMessages,
        sending,
        send,
        listRef,
        topLevel,
        replies,
        parentMsg,
    };
}