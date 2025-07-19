import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';

import styles from '../../styles/itemList';
import checklistItems from './checklistItems';

export default function ItemList({ category }) {
    const filtered = checklistItems.filter(item => item.category === category);
    const [checked, setChecked] = useState([]);

    const toggle = (id) => {
        setChecked(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => toggle(item.id)} style={styles.itemRow}>
            <View style={styles.checkbox}>
                {checked.includes(item.id) && <View style={styles.checked} />}
            </View>
            <Text style={styles.itemText}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.card}>
            <Text style={styles.categoryTitle}>{category}</Text>
            <FlatList
                data={filtered}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
}
