// app/chats/index.tsx
import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import ProtectedRoute from "../../components/ProtectedRoute";
import { HomeButton } from "../utils/HomeButton";
import chatStyles from "../../styles/chatStyles";
import api from "../../src/api/axiosConfig";

type Room = { id: number; code: "general" | "t1" | "t2" | "t3"; name: string };

export default function ChatsHome() {
    const router = useRouter();
    const [rooms, setRooms] = useState<Room[] | null>(null);
    const [userTrimester, setUserTrimester] = useState<number | null>(null);
    const [err, setErr] = useState<string>("");

    useEffect(() => {
        let cancelled = false;

        const weekToTrimester = (w: number | null | undefined) => {
            if (!w || w < 1) return null;
            if (w <= 12) return 1;
            if (w <= 27) return 2;
            return 3;
        };

        (async () => {
            try {
                // 1) חדרים
                const roomsRes = await api.get("/api/chat/rooms", {
                    timeout: 8000,
                    validateStatus: () => true,
                });
                if (cancelled) return;

                if (roomsRes.status >= 200 && roomsRes.status < 300) {
                    setRooms(roomsRes.data);
                } else {
                    setErr(`שגיאה בטעינת חדרים (status ${roomsRes.status})`);
                    setRooms(null);
                }

                // 2) פרטי משתמש → חישוב טרימסטר
                const userRes = await api.get("/api/user", { validateStatus: () => true });
                if (cancelled) return;

                if (userRes.status >= 200 && userRes.status < 300) {
                    const u = userRes.data;
                    // מעדיף שדה week אם קיים, אחרת חישוב מקורב מ־estimatedDueDate/lastPeriodDate בצד שרת,
                    // אבל כאן נלך פשוט: אם יש pregnancyWeek – נשתמש בו
                    const trimester = weekToTrimester(u?.pregnancyWeek);
                    setUserTrimester(trimester);
                } else {
                    // אם לא הצלחנו להביא משתמש, נשאיר רק את הכללי לחיץ
                    setUserTrimester(null);
                }
            } catch (e: any) {
                if (cancelled) return;
                setErr("שגיאת רשת");
                Alert.alert("שגיאת רשת", e?.message || "Network/Unknown error");
            }
        })();

        return () => {
            cancelled = true;
        };
    }, []);

    const canEnterRoom = (room: Room) => {
        if (room.code === "general") return true;
        if (!userTrimester) return false;
        const codeToNum = room.code === "t1" ? 1 : room.code === "t2" ? 2 : 3;
        return codeToNum === userTrimester;
    };

    return (
        <ProtectedRoute requireAuth={true}>
            <>
                <HomeButton />
                <View style={chatStyles.container}>
                    <Text style={chatStyles.title}>פורום</Text>

                    {err ? (
                        <Text style={chatStyles.err}>{err}</Text>
                    ) : !rooms ? (
                        <View style={chatStyles.center}>
                            <ActivityIndicator />
                            <Text>טוען…</Text>
                        </View>
                    ) : (
                        rooms.map((room) => {
                            const canEnter = canEnterRoom(room);
                            return (
                                <View
                                    key={room.id}
                                    style={[chatStyles.tile, !canEnter && { backgroundColor: "#eee" }]}
                                >
                                    <View style={{ flex: 1 }}>
                                        <Text style={chatStyles.tileTitle}>{room.name}</Text>
                                        <Text style={chatStyles.tileSub}>
                                            {room.code === "general" ? "פתוח לכולן" : "הטרימסטר"}
                                        </Text>
                                    </View>

                                    {canEnter ? (
                                        <TouchableOpacity
                                            style={chatStyles.enterBtn}
                                            onPress={() =>
                                                router.push({
                                                    pathname: "/chats/[roomId]",
                                                    params: { roomId: String(room.id), name: room.name },
                                                })
                                            }
                                        >
                                            <Text style={chatStyles.enterText}>היכנסי</Text>
                                        </TouchableOpacity>
                                    ) : (
                                        <Text style={{ color: "red", marginTop: 4, textAlign: "left" }}>
                                            לא זמין — רק למשתמשות ב{room.name}
                                        </Text>
                                    )}
                                </View>
                            );
                        })
                    )}
                </View>
            </>
        </ProtectedRoute>
    );
}