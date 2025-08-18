import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../../styles/faqTabsStyles';

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
                    <Text style={selected === cat ? styles.tabButtonTextActive : styles.tabButtonText}>
                        {cat}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}
