import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../../styles/categoryTabs';
import checklistItems from './checklistItems';

const categories = [
    { id: "היגיינה וטיפוח", emoji: "🧴", color: "hygiene" },
    { id: "בגדים (לאם)", emoji: "👕", color: "clothing" },
    { id: "רפואי ומסמכים", emoji: "📋", color: "medical" },
    { id: "מוצרים לתינוק", emoji: "👶", color: "baby" }
];

export default function CategoryTabs({ selected, onSelect, checkedItems }) {
    const getCategoryTabStyle = (category) => {
        if (selected === category.id) {
            return styles.categoryTabActive;
        }

        switch (category.color) {
            case 'hygiene':
                return styles.categoryTabHygiene;
            case 'clothing':
                return styles.categoryTabClothing;
            case 'medical':
                return styles.categoryTabMedical;
            case 'baby':
                return styles.categoryTabBaby;
            default:
                return {};
        }
    };

    const getCategoryTextStyle = (category) => {
        if (selected === category.id) {
            return styles.categoryTabTextActive;
        }

        switch (category.color) {
            case 'hygiene':
                return styles.categoryTabTextHygiene;
            case 'clothing':
                return styles.categoryTabTextClothing;
            case 'medical':
                return styles.categoryTabTextMedical;
            case 'baby':
                return styles.categoryTabTextBaby;
            default:
                return styles.categoryTabText;
        }
    };

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
                            getCategoryTabStyle(category)
                        ]}
                        onPress={() => onSelect(category.id)}
                    >
                        <Text style={[
                            styles.categoryTabText,
                            getCategoryTextStyle(category)
                        ]}>
                            {category.emoji} {category.id}
                        </Text>
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
