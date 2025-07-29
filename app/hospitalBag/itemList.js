import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../../styles/itemList';
import checklistItems from './checklistItems';

export default function ItemList({ category, checkedItems, onToggleItem }) {
    const filteredItems = checklistItems.filter(item => item.category === category);

    if (filteredItems.length === 0) {
        return (
            <View style={styles.emptyState}>
                <Text style={styles.emptyStateIcon}>📭</Text>
                <Text style={styles.emptyStateText}>
                    אין פריטים בקטגוריה זו 🎯
                </Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            {filteredItems.map((item, index) => (
                <TouchableOpacity
                    key={item.id}
                    style={[
                        styles.itemRow,
                        index === filteredItems.length - 1 && { marginBottom: 0 },
                        checkedItems.includes(item.id) && styles.itemRowChecked
                    ]}
                    onPress={() => onToggleItem(item.id)}
                    activeOpacity={0.7}
                >
                    <View style={[
                        styles.checkbox,
                        checkedItems.includes(item.id) && styles.checkboxChecked
                    ]}>
                        {checkedItems.includes(item.id) && (
                            <Text style={styles.checkboxIcon}>✓</Text>
                        )}
                    </View>
                    <Text style={[
                        styles.itemText,
                        checkedItems.includes(item.id) && styles.itemTextChecked
                    ]}>
                        {item.name}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}
