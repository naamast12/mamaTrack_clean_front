// app/upcomingTests/TestCard.js
import React from 'react';
import { View, Text } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { testCardStyles as styles } from '../../styles/upcomingTestsStyles';
// (Colors לא חובה כאן כי הצבע מגיע מהסטיילים המיובאים)

const triLabel = (t, weekFrom, weekTo) => {
    // אם הטווח מכסה את כל ההריון – לא מציגים טרימסטר
    if ((weekFrom ?? 0) <= 1 && (weekTo ?? 0) >= 40) return '';
    if (t === 1) return 'טרימסטר ראשון';
    if (t === 2) return 'טרימסטר שני';
    if (t === 3) return 'טרימסטר שלישי';
    return '';
};

export default function TestCard({ item }) {
    const {
        title,
        weekFrom,
        weekTo,
        trimester,
        purpose,
        howItDone,
        recommended,
        mandatory,
        notes,
    } = item;

    const weeksText =
        weekFrom && weekTo && weekFrom !== weekTo
            ? `שבועות ${weekFrom}-${weekTo}`
            : weekFrom
                ? `שבוע ${weekFrom}`
                : '';

    const triText = triLabel(trimester, weekFrom, weekTo);

    return (
        <View
            style={styles.card}
            accessibilityRole="summary"
            accessible
            accessibilityLabel={`בדיקה: ${title}. ${[weeksText, triText].filter(Boolean).join('. ')}`}
        >
            <View style={styles.headerRow}>
                <Text style={styles.title}>{title}</Text>
                <View style={styles.badgesRow}>
                    {mandatory ? (
                        <View style={styles.badge}>
                            <MaterialCommunityIcons name="alert-decagram" size={16} />
                            <Text style={styles.badgeTxt}>חובה</Text>
                        </View>
                    ) : null}
                    {recommended ? (
                        <View style={styles.badge}>
                            <Feather name="thumbs-up" size={16} />
                            <Text style={styles.badgeTxt}>מומלץ</Text>
                        </View>
                    ) : null}
                </View>
            </View>

            <Text style={styles.meta}>
                {[weeksText, triText].filter(Boolean).join(' · ')}
            </Text>

            {purpose ? (
                <View style={styles.block}>
                    <Text style={styles.blockTitle}>למה עושים?</Text>
                    <Text style={styles.blockText}>{purpose}</Text>
                </View>
            ) : null}

            {howItDone ? (
                <View style={styles.block}>
                    <Text style={styles.blockTitle}>איך מבוצעת?</Text>
                    <Text style={styles.blockText}>{howItDone}</Text>
                </View>
            ) : null}

            {notes ? (
                <View style={styles.block}>
                    <Text style={styles.blockTitle}>הערות</Text>
                    <Text style={styles.blockText}>{notes}</Text>
                </View>
            ) : null}
        </View>
    );
}
