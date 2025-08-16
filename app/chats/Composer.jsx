// components/chat/Composer.jsx
import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import styles from "../../styles/chatStyles";

/**
 * @param {{
 *   placeholder: string,
 *   maxLen?: number,
 *   onSend: (text: string) => Promise<boolean>|boolean,
 *   disabled?: boolean,
 *   counterRightText?: string
 * }} props
 */
export default function Composer({ placeholder, maxLen = 1000, onSend, disabled, counterRightText }) {
    const [text, setText] = useState("");
    const [inputH, setInputH] = useState(0);
    const MIN_H = 36, MAX_H = 160;

    const handleSend = async () => {
        const ok = await onSend(text);
        if (ok) {
            setText("");
            setInputH(0);
        }
    };

    const isDisabled = disabled || text.trim().length === 0;

    return (
        <View style={[styles.card, { paddingVertical: 10 }]}>
            <View style={[styles.inputBar, { marginTop: 4 }]}>
                <TextInput
                    style={[
                        styles.input,
                        {
                            flex: 1,
                            textAlignVertical: "top",
                            paddingVertical: 6,
                            height: Math.min(MAX_H, Math.max(MIN_H, inputH || MIN_H)),
                        },
                    ]}
                    placeholder={placeholder}
                    value={text}
                    onChangeText={setText}
                    multiline
                    numberOfLines={1}
                    onContentSizeChange={(e) => setInputH(e.nativeEvent.contentSize?.height || 0)}
                    maxLength={maxLen}
                    blurOnSubmit={false}
                />
                <TouchableOpacity
                    style={[styles.sendBtn, isDisabled && { opacity: 0.5 }]}
                    onPress={handleSend}
                    disabled={isDisabled}
                >
                    <Text style={styles.sendTxt}>שליחה</Text>
                </TouchableOpacity>
            </View>

            {typeof counterRightText === "string" && (
                <View style={{ flexDirection: "row-reverse" }}>
                    <Text style={{ color: "#666", fontSize: 12 }}>{counterRightText}</Text>
                </View>
            )}
        </View>
    );
}