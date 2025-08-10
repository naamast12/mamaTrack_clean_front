// app/hospitalBag/index.js  (התאימי לנתיב אצלך)
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import CategoryTabs from './categoryTabs';
import ItemList from './itemList';
import styles from '../../styles/hospitalBagStyles';
import ProtectedRoute from "../../components/ProtectedRoute";
import { HomeButton } from "../utils/HomeButton";
import checklistItems from './checklistItems';
import storage from '../utils/storage';
import api from '../../src/api/axiosConfig';

export default function Index() {
    const [selectedCategory, setSelectedCategory] = useState("היגיינה וטיפוח");
    const [checkedItems, setCheckedItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [userError, setUserError] = useState(null);

    // Progress
    const totalItems = checklistItems.length;
    const progressPercentage = totalItems > 0 ? (checkedItems.length / totalItems) * 100 : 0;

    // Initial load: server via JWT → local cache → default
    useEffect(() => {
        const init = async () => {
            setIsLoading(true);
            setUserError(null);

            try {
                const res = await api.get('/api/hospital-checklist');
                const payload = res.data?.checklist ?? res.data;

                if (payload?.itemsStatus) {
                    const serverItems = JSON.parse(payload.itemsStatus);
                    const checkedIds = serverItems.filter(i => i.checked).map(i => i.id);
                    setCheckedItems(checkedIds);
                    await storage.set('hospitalBagChecked', JSON.stringify(checkedIds)); // cache
                } else {
                    const local = await storage.get('hospitalBagChecked');
                    setCheckedItems(local ? JSON.parse(local) : []);
                }
            } catch (error) {
                console.error('Error fetching hospital checklist:', error?.response?.data || error.message);
                try {
                    const local = await storage.get('hospitalBagChecked');
                    setCheckedItems(local ? JSON.parse(local) : []);
                    setUserError('לא הצלחנו למשוך מהרשת — מציגים נתונים מקומיים.');
                } catch {
                    setCheckedItems([]);
                }
            } finally {
                setIsLoading(false);
            }
        };

        init();
    }, []);

    // Save to server (JWT) + keep local cache in toggle
    const saveChecklistToServer = async (updatedCheckedItems) => {
        try {
            const itemsWithStatus = checklistItems.map(item => ({
                ...item,
                checked: updatedCheckedItems.includes(item.id),
            }));

            const res = await api.post('/api/hospital-checklist', {
                itemsStatus: JSON.stringify(itemsWithStatus),
            });

            if (res.data?.success === false) {
                console.log('Server returned success=false, keeping local only.');
            }
        } catch (error) {
            console.error('Error saving hospital checklist:', error?.response?.data || error.message);
            console.log('Server error - working with local data only');
        }
    };

    // Toggle
    const toggleItem = async (itemId) => {
        const newCheckedItems = checkedItems.includes(itemId)
            ? checkedItems.filter(id => id !== itemId)
            : [...checkedItems, itemId];

        setCheckedItems(newCheckedItems);

        try {
            await storage.set('hospitalBagChecked', JSON.stringify(newCheckedItems));
        } catch (e) {
            console.error('Error saving to local storage:', e);
        }

        await saveChecklistToServer(newCheckedItems);
    };

    // Reset (mobile Alert / web confirm)
    const resetAllItems = async () => {
        const doReset = async () => {
            setCheckedItems([]);
            try { await storage.set('hospitalBagChecked', JSON.stringify([])); } catch {}

            try {
                const res = await api.post('/api/hospital-checklist/reset');
                if (res.data?.success) {
                    console.log('Reset completed on server');
                } else {
                    console.log('Server reset returned success=false (continuing with local)');
                }
            } catch (error) {
                console.error('Reset server error:', error?.response?.data || error.message);
                console.log('Reset completed locally only');
            }
        };

        if (typeof window !== 'undefined' && window.confirm) {
            if (window.confirm('לאפס את כל הרשימה?')) await doReset();
        } else {
            Alert.alert('איפוס רשימה', 'לאפס את כל הרשימה?', [
                { text: 'בטל', style: 'cancel' },
                { text: 'אפס', onPress: doReset },
            ]);
        }
    };

    if (isLoading) {
        return (
            <ProtectedRoute requireAuth={true}>
                <HomeButton />
                <View style={styles.container}>
                    <Text style={styles.title}>טוען...</Text>
                </View>
            </ProtectedRoute>
        );
    }

    if (userError) {
        return (
            <ProtectedRoute requireAuth={true}>
                <HomeButton />
                <View style={styles.container}>
                    <Text style={styles.title}>שגיאה</Text>
                    <Text style={styles.subtitle}>{userError}</Text>
                </View>
            </ProtectedRoute>
        );
    }

    return (
        <ProtectedRoute requireAuth={true}>
            <HomeButton />

            <ScrollView
                style={styles.container}
                showsVerticalScrollIndicator={true}
                contentContainerStyle={{ paddingBottom: 30 }}
            >
                <Text style={styles.title}>🏥 תיק חדר לידה</Text>
                <Text style={styles.subtitle}>הרשימה האולטימטיבית לציוד לחדר הלידה שלך</Text>

                {/* Progress */}
                <View style={styles.progressContainer}>
                    <Text style={styles.progressTitle}>📊 התקדמות הכנת התיק</Text>
                    <View style={styles.progressBar}>
                        <View style={[styles.progressFill, { width: `${progressPercentage}%` }]} />
                    </View>
                    <Text style={styles.progressText}>
                        {checkedItems.length} מתוך {totalItems} פריטים מוכנים ({Math.round(progressPercentage)}%)
                    </Text>
                </View>

                {/* Category Tabs */}
                <CategoryTabs
                    selected={selectedCategory}
                    onSelect={setSelectedCategory}
                    checkedItems={checkedItems}
                />

                {/* Items List */}
                <View style={styles.itemsContainer}>
                    <ItemList
                        category={selectedCategory}
                        checkedItems={checkedItems}
                        onToggleItem={toggleItem}
                    />
                </View>

                {/* Reset Button */}
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.resetButton} onPress={resetAllItems}>
                        <Text style={styles.resetButtonText}>🔄 אפס הכל</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </ProtectedRoute>
    );
}