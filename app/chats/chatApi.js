import api from "../../src/api/axiosConfig"; // משתמש ב-axios המוכן שלך

export type Room = { id: number; code: "general" | "t1" | "t2" | "t3"; name: string };
export type Message = { id: number; senderId: number; body: string; createdAt: string };

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

export async function sendMessage(roomId: number, body: string): Promise<Message> {
    const { data } = await api.post(`/api/chat/rooms/${roomId}/messages`, { body });
    return data;
}