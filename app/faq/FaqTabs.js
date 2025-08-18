import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../../styles/faqTabsStyles';

// אייקונים חמודים לכל קטגוריה
const categoryIcons = {
    "בדיקות": "🔬",
    "תזונה": "🥗",
    "פעילות גופנית": "🧘‍♀️",
    "הכנה ללידה": "👶",
    "תרופות ותוספים": "💊"
};

const categories = [
    "בדיקות",
    "תזונה",
    "פעילות גופנית",
    "הכנה ללידה",
    "תרופות ותוספים"
];

export default function FaqTabs({ selected, onSelect }) {
    return (
        <View style={styles.tabsContainer}>
            {categories.map(cat => (
                <TouchableOpacity
                    key={cat}
                    onPress={() => onSelect(cat)}
                    style={[
                        styles.tabButton,
                        selected === cat && styles.tabButtonActive
                    ]}
                >
                    <View style={styles.tabContent}>
                        <Text style={styles.tabIcon}>{categoryIcons[cat]}</Text>
                        <Text style={selected === cat ? styles.tabButtonTextActive : styles.tabButtonText}>
                            {cat}
                        </Text>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );
}
