import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../../styles/hospitalBagStyles';
import checklistItems from './checklistItems';

const categories = [
    { id: "היגיינה וטיפוח", emoji: "🧴" },
    { id: "בגדים (לאם)", emoji: "👕" },
    { id: "רפואי ומסמכים", emoji: "📋" },
    { id: "מוצרים לתינוק", emoji: "👶" }
];

export default function CategoryTabs({ selected, onSelect, checkedItems }) {

    return (
        <View style={styles.tabsContainer}>
            {categories.map(category => {
                const categoryItems = checklistItems.filter(item => item.category === category.id);
                const categoryChecked = categoryItems.filter(item => checkedItems.includes(item.id)).length;

                return (
                    <TouchableOpacity
                        key={category.id}
                        style={[
                            styles.categoryTab,
                            selected === category.id && styles.categoryTabActive
                        ]}
                        onPress={() => onSelect(category.id)}
                    >
                        <View style={styles.categoryTabContent}>
                            <Text style={styles.categoryTabIcon}>{category.emoji}</Text>
                            <Text style={[
                                styles.categoryTabText,
                                selected === category.id && styles.categoryTabTextActive
                            ]}>
                                {category.id}
                            </Text>
                        </View>
                        {categoryChecked > 0 && (
                            <View style={styles.itemCountBadge}>
                                <Text style={styles.itemCountText}>
                                    {categoryChecked}
                                </Text>
                            </View>
                        )}
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}
