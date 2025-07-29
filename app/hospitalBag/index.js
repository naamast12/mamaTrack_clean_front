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
    const [userId, setUserId] = useState(null);
    const [userError, setUserError] = useState(null);

    // Calculate progress
    const totalItems = checklistItems.length;
    const progressPercentage = totalItems > 0 ? (checkedItems.length / totalItems) * 100 : 0;

    // Debug function to check storage
    const debugStorage = async () => {
        try {
            const token = await storage.get('userToken');
            const userId = await storage.get('userId');
            console.log('🔍 Debug - Token:', token);
            console.log('🔍 Debug - UserId:', userId);
            
            if (!token) {
                console.log('🔍 Debug - No token found, clearing storage...');
                await storage.remove('userToken');
                await storage.remove('userId');
                console.log('🔍 Debug - Storage cleared');
            }
        } catch (error) {
            console.error('🔍 Debug - Error checking storage:', error);
        }
    };

    // Load userId and checklist data on mount
    useEffect(() => {
        const init = async () => {
            try {
                // Debug storage first
                await debugStorage();
                
                // Check token first
                const token = await storage.get('userToken');
                console.log('🔐 Token from storage:', token);
                console.log('🔐 Token type:', typeof token);
                console.log('🔐 Token length:', token ? token.length : 0);
                console.log('🔐 Token starts with:', token ? token.substring(0, 20) + '...' : 'null');
                console.log('🔐 Token is null?', token === null);
                console.log('🔐 Token is undefined?', token === undefined);
                console.log('🔐 Token is empty string?', token === '');
                
                const storedUserId = await storage.get('userId');
                console.log('Stored userId:', storedUserId);
                
                if (!storedUserId) {
                    console.log('No userId found in storage');
                    setUserError('User ID not found. Please log in again.');
                    setIsLoading(false);
                    return;
                }
                setUserId(storedUserId);

                // Fetch checklist for this user
                try {
                    console.log('🌐 Making API call to /api/hospital-checklist');
                    console.log('🌐 With userId:', storedUserId);
                    console.log('🌐 With token:', token ? 'Present' : 'Missing');
                    
                    const response = await api.get('/api/hospital-checklist');
                    console.log('✅ API response:', response.data);
                    
                    if (response.data?.success && response.data?.checklist) {
                        const serverItems = JSON.parse(response.data.checklist.itemsStatus);
                        const checkedIds = serverItems.filter(item => item.checked).map(item => item.id);
                        setCheckedItems(checkedIds);
                        console.log('📦 Loaded items from server:', checkedIds);
                    }
                } catch (error) {
                    console.error('❌ Error fetching checklist:', error);
                    console.error('❌ Error response:', error.response?.data);
                    console.error('❌ Error status:', error.response?.status);
                    console.error('❌ Error headers:', error.response?.headers);
                    console.log('Trying local storage...');
                    
                    // Try to load from local storage
                    try {
                        const localData = await storage.get('hospitalBagChecked');
                        if (localData) {
                            setCheckedItems(JSON.parse(localData));
                            console.log('Loaded from local storage');
                        } else {
                            console.log('Using default data');
                        }
                    } catch (localError) {
                        console.error('Error loading from local storage:', localError);
                        console.log('Using default data after local storage error');
                    }
                }
            } catch (error) {
                console.error('Error in init:', error);
                setUserError('Error retrieving user ID: ' + error.message);
            } finally {
                setIsLoading(false);
            }
        };
        init();
    }, []);

    // Save checklist to server
    const saveChecklistToServer = async (updatedCheckedItems) => {
        console.log('💾 saveChecklistToServer called with userId:', userId);
        console.log('💾 updatedCheckedItems:', updatedCheckedItems);
        
        // Check token before making request
        const token = await storage.get('userToken');
        console.log('🔐 Token before save:', token);
        console.log('🔐 Token type:', typeof token);
        console.log('🔐 Token length:', token ? token.length : 0);
        console.log('🔐 Token starts with:', token ? token.substring(0, 20) + '...' : 'null');
        
        // Validate token
        if (!token || token === 'null' || token === 'undefined') {
            console.error('❌ No valid token found');
            setUserError('Authentication token missing. Please log in again.');
            return;
        }
        
        let currentUserId = userId;
        
        if (!currentUserId) {
            console.log('No userId available, checking storage...');
            const storedUserId = await storage.get('userId');
            console.log('Stored userId from storage:', storedUserId);
            
            if (storedUserId) {
                currentUserId = storedUserId;
                setUserId(storedUserId);
            } else {
                setUserError('User ID not available to save checklist.');
                return;
            }
        }

        try {
            console.log('🌐 Saving checklist for user:', currentUserId);
            console.log('🌐 With token:', token ? 'Present' : 'Missing');
            
            // Create items array with checked status
            const itemsWithStatus = checklistItems.map(item => ({
                ...item,
                checked: updatedCheckedItems.includes(item.id)
            }));
            
            console.log('📦 Items to save:', itemsWithStatus);
            console.log('🌐 Making POST request to /api/hospital-checklist');
            
            const response = await api.post('/api/hospital-checklist', {
                itemsStatus: JSON.stringify(itemsWithStatus)
            });
            
            console.log('✅ Save response:', response.data);
            
            if (response.data?.success) {
                console.log('✅ Checklist saved successfully to server');
            }
        } catch (error) {
            console.error('❌ Error saving checklist:', error);
            console.error('❌ Error response:', error.response?.data);
            console.error('❌ Error status:', error.response?.status);
            console.error('❌ Error message:', error.response?.data?.message);
            console.error('❌ Full error details:', JSON.stringify(error.response?.data, null, 2));
            console.error('❌ Error headers:', error.response?.headers);
            
            // Check if it's a constraint violation (record already exists)
            if (error.response?.status === 500 && 
                error.response?.data?.message?.includes('constraint')) {
                console.log('🔄 Record already exists - server needs to be updated to handle this');
                console.log('📱 Working with local storage only for now');
            } else if (error.response?.status === 403) {
                console.error('❌ 403 Forbidden - Authentication issue');
                setUserError('Authentication failed. Please log in again.');
            } else {
                console.log('Server error - working with local data only');
            }
        }
    };

    // Toggle item checked status
    const toggleItem = async (itemId) => {
        console.log('🔄 Toggle item called with itemId:', itemId);
        console.log('🔄 Current checkedItems:', checkedItems);
        
        const newCheckedItems = checkedItems.includes(itemId)
            ? checkedItems.filter(id => id !== itemId)
            : [...checkedItems, itemId];
        
        console.log('🔄 New checkedItems:', newCheckedItems);
        
        setCheckedItems(newCheckedItems);
        
        // Save to local storage
        try {
            await storage.set('hospitalBagChecked', JSON.stringify(newCheckedItems));
            console.log('✅ Saved to local storage:', newCheckedItems);
        } catch (error) {
            console.error('❌ Error saving to local storage:', error);
        }
        
        // Save to server
        await saveChecklistToServer(newCheckedItems);
    };

    // Reset all items
    const resetAllItems = async () => {
        const confirmed = window.confirm('האם אתה בטוח שברצונך לאפס את כל הרשימה?');
        
        if (confirmed) {
            console.log('🔄 Resetting all items...');
            
            // Clear local state
            setCheckedItems([]);
            
            // Save to local storage
            try {
                await storage.set('hospitalBagChecked', JSON.stringify([]));
                console.log('✅ Cleared local storage');
            } catch (error) {
                console.error('❌ Error clearing local storage:', error);
            }
            
            // Try to reset on server
            try {
                console.log('🌐 Making reset request to server...');
                const response = await api.post('/api/hospital-checklist/reset');
                console.log('✅ Reset response:', response.data);
                
                if (response.data?.success) {
                    console.log('✅ Reset completed successfully on server');
                }
            } catch (error) {
                console.error('❌ Error calling reset endpoint:', error);
                console.error('❌ Reset error response:', error.response?.data);
                console.log('Reset completed locally only');
            }
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

                {/* Progress Section */}
                <View style={styles.progressContainer}>
                    <Text style={styles.progressTitle}>📊 התקדמות הכנת התיק</Text>
                    <View style={styles.progressBar}>
                        <View 
                            style={[
                                styles.progressFill, 
                                { width: `${progressPercentage}%` }
                            ]} 
                        />
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
                    <TouchableOpacity
                        style={styles.resetButton}
                        onPress={resetAllItems}
                    >
                        <Text style={styles.resetButtonText}>
                            🔄 אפס הכל
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </ProtectedRoute>
    );
}
