import React, { useState } from 'react';
import { View, Text } from 'react-native';
import CategoryTabs from './categoryTabs';
import ItemList from './itemList';
import styles from '../../styles/hospitalBagStyles';

export default function Index() {
    const [selectedCategory, setSelectedCategory] = useState("היגיינה וטיפוח");

    return (
        <View style={styles.container}>
            <Text style={styles.title}>MamaTrack</Text>
            <Text style={styles.subtitle}>רשימת הציוד האולטימטיבית שלך לחדר הלידה</Text>

            <CategoryTabs
                selected={selectedCategory}
                onSelect={setSelectedCategory}
            />

            <ItemList category={selectedCategory} />
        </View>
    );
}
