// app/chats/index.jsx
import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity, Alert, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import ProtectedRoute from "../../components/ProtectedRoute";
import { HomeButton } from "../utils/HomeButton";
import chatStyles from "../../styles/chatStyles";
import api from "../../src/api/axiosConfig";

export default function ChatsHome() {
    const router = useRouter();
    const [rooms, setRooms] = useState(null);
    const [userTrimester, setUserTrimester] = useState(null);
    const [err, setErr] = useState("");

    useEffect(() => {
        let cancelled = false;

        const weekToTrimester = (w) => {
            if (!w || w < 1) return null;
            if (w <= 12) return 1;
            if (w <= 27) return 2;
            return 3;
        };

        (async () => {
            try {
                // חדרים
                const roomsRes = await api.get("/api/chat/rooms", { timeout: 8000, validateStatus: () => true });
                if (cancelled) return;
                if (roomsRes.status >= 200 && roomsRes.status < 300) {
                    setRooms(roomsRes.data);
                } else {
                    setErr(`שגיאה בטעינת חדרים (status ${roomsRes.status})`);
                    setRooms(null);
                }

                // פרטי משתמש → טרימסטר
                const userRes = await api.get("/api/user", { validateStatus: () => true });
                if (cancelled) return;
                if (userRes.status >= 200 && userRes.status < 300) {
                    const trimester = weekToTrimester(userRes.data?.pregnancyWeek);
                    setUserTrimester(trimester);
                } else {
                    setUserTrimester(null);
                }
            } catch (e) {
                if (cancelled) return;
                setErr("שגיאת רשת");
                Alert.alert("שגיאת רשת", e?.message || "Network/Unknown error");
            }
        })();

        return () => { cancelled = true; };
    }, []);

    const canEnterRoom = (room) => {
        if (room.code === "general") return true;
        if (!userTrimester) return false;
        const codeToNum = room.code === "t1" ? 1 : room.code === "t2" ? 2 : 3;
        return codeToNum === userTrimester;
    };

    return (
        <ProtectedRoute requireAuth={true}>
            <>
                <HomeButton />
                <ScrollView
                    style={chatStyles.page}
                    contentContainerStyle={chatStyles.scrollContent}
                    showsVerticalScrollIndicator
                    bounces
                >
                    <View style={chatStyles.content}>
                        {/* כרטיס כותרת */}
                        <View style={chatStyles.card}>
                            <Text style={chatStyles.title}>💬 פורום</Text>
                            <Text style={chatStyles.subtitle}>שאלות, תמיכה ושיתוף לפי שלבי ההריון 💗</Text>
                            <Text style={chatStyles.subtitle}>הכל באנונימיות מלאה 🤫</Text>
                        </View>

                        {/* הודעת שגיאה / טעינה / רשימת חדרים */}
                        {err ? (
                            <View style={chatStyles.card}>
                                <Text style={chatStyles.err}>{err}</Text>
                            </View>
                        ) : !rooms ? (
                            <View style={chatStyles.card}>
                                <View style={chatStyles.center}>
                                    <ActivityIndicator />
                                    <Text style={chatStyles.emptyStateText}>טוען…</Text>
                                </View>
                            </View>
                        ) : (
                            <>
                                <View style={chatStyles.sectionHeader}>
                                    <Text style={chatStyles.listTitle}>📋 חדרים זמינים</Text>
                                    <View style={chatStyles.decorativeLine} />
                                </View>

                                <View style={chatStyles.itemsContainer}>
                                    {rooms.map((room, idx) => {
                                        const canEnter = canEnterRoom(room);
                                        return (
                                            <View key={room.id} style={chatStyles.itemRow}>
                                                <View style={chatStyles.itemLeft}>
                                                    <Text style={chatStyles.itemIndexBadge}>{idx + 1}</Text>
                                                </View>

                                                <View style={chatStyles.itemMiddle}>
                                                    <Text style={chatStyles.itemTitle}>{room.name}</Text>
                                                    <Text style={chatStyles.itemSubtitle}>
                                                        {room.code === "general" ? "פתוח לכולן" : "חדר לפי טרימסטר"}
                                                    </Text>
                                                </View>

                                                <View style={chatStyles.itemRight}>
                                                    {canEnter ? (
                                                        <TouchableOpacity
                                                            style={chatStyles.primaryButton}
                                                            onPress={() =>
                                                                router.push({
                                                                    pathname: "/chats/[roomId]",
                                                                    params: { roomId: String(room.id), name: room.name },
                                                                })
                                                            }
                                                        >
                                                            <Text style={chatStyles.primaryButtonText}>היכנסי</Text>
                                                        </TouchableOpacity>
                                                    ) : (
                                                        <View style={chatStyles.badge}>
                                                            <Text style={chatStyles.badgeText}>לא זמין</Text>
                                                            <Text style={chatStyles.badgeSubText}>לא תואם טרימסטר</Text>
                                                        </View>
                                                    )}
                                                </View>
                                            </View>
                                        );
                                    })}
                                </View>
                            </>
                        )}
                    </View>
                </ScrollView>
            </>
        </ProtectedRoute>
    );
}