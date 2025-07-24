import React, { useState } from 'react';
import { View, Text } from 'react-native';
import CategoryTabs from './categoryTabs';
import ItemList from './itemList';
import styles from '../../styles/hospitalBagStyles';
import ProtectedRoute from "../../components/ProtectedRoute";
import {HomeButton} from "../utils/HomeButton";

export default function Index() {
    const [selectedCategory, setSelectedCategory] = useState("היגיינה וטיפוח");

    return (

        <ProtectedRoute requireAuth={true}>
            <HomeButton />

            <View style={styles.container}>
                <Text style={styles.title}>MamaTrack</Text>
                <Text style={styles.subtitle}>רשימת הציוד האולטימטיבית שלך לחדר הלידה</Text>

                <CategoryTabs
                    selected={selectedCategory}
                    onSelect={setSelectedCategory}
                />

                <ItemList category={selectedCategory} />
            </View>
        </ProtectedRoute>


    );
}
