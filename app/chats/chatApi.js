// app/chats/chatApi.ts
import api from "../../src/api/axiosConfig";

export type Room = { id: number; code: "general" | "t1" | "t2" | "t3"; name: string };
export type Message = {
    id: number;
    senderId: number;
    body: string;
    createdAt: string;
    parentId?: number | null; // ← חדש
};



export async function listRooms(): Promise<Room[]> {
    const { data } = await api.get("/api/chat/rooms");
    return data;
}

export async function getMessages(
    roomId: number,
    opts: { limit?: number; beforeId?: number; afterId?: number } = {}
): Promise<Message[]> {
    const { limit = 30, beforeId, afterId } = opts;
    const params: any = {};
    if (limit) params.limit = limit;
    if (beforeId) params.beforeId = beforeId;
    if (afterId) params.afterId = afterId;

    const { data } = await api.get(`/api/chat/rooms/${roomId}/messages`, { params });
    return data;
}

// ← שימי לב: parentId אופציונלי
export async function sendMessage(
    roomId: number,
    body: string,
    parentId?: number | null
): Promise<Message> {
    const payload: any = { body };
    if (parentId) payload.parentId = parentId; // ישלח רק אם קיים
    const { data } = await api.post(`/api/chat/rooms/${roomId}/messages`, payload);
    return data;
}