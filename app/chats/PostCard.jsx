// components/chat/PostCard.jsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../../styles/chatStyles";

/**
 * @param {{
 *   item: import("@/types/chat").Msg,
 *   rightActionLabel?: string,
 *   onRightAction?: () => void,
 *   rightBadge?: React.ReactNode
 * }} props
 */
export function PostCard({ item, rightActionLabel, onRightAction, rightBadge }) {
    return (
        <View style={styles.postCard}>
            <View style={{ flexDirection: "row-reverse", alignItems: "center", marginBottom: 6 }}>
                <Text style={[styles.meta, { marginLeft: 8 }]}>
                    {new Date(item.createdAt).toLocaleString()}
                </Text>
            </View>

            <Text style={styles.postText}>{item.body}</Text>

            {(rightActionLabel || rightBadge) && (
                <View style={[styles.postMetaRow, { marginTop: 10 }]}>
                    <View style={styles.rightMeta}>
                        {rightBadge}
                        {rightActionLabel && onRightAction && (
                            <TouchableOpacity style={styles.secondaryButton} onPress={onRightAction}>
                                <Text style={styles.secondaryButtonText}>{rightActionLabel}</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            )}
        </View>
    );
}