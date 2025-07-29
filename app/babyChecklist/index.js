import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import babyChecklistStyles from '../../styles/babyChecklistStyles';
import babyChecklistData from './babyChecklistData';
import { HomeButton } from "../utils/HomeButton";
import ProtectedRoute from "../../components/ProtectedRoute";
import storage from '../utils/storage';
import api from '../../src/api/axiosConfig';

const BabyChecklist = () => {
  const [items, setItems] = useState(babyChecklistData);
  
  // Debug: log whenever items state changes
  useEffect(() => {
    console.log('🔄 Items state changed:', items);
  }, [items]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [userError, setUserError] = useState(null);

  // Calculate progress
  const totalItems = items.length;
  const checkedItems = items.filter(item => item.checked).length;
  const progressPercentage = totalItems > 0 ? (checkedItems / totalItems) * 100 : 0;

  // Get unique categories
  const categories = ['all', ...new Set(items.map(item => item.category))];

  // Filter items by selected category
  const filteredItems = selectedCategory === 'all'
      ? items
      : items.filter(item => item.category === selectedCategory);
      
  // Debug logging for items
  console.log('Current items state:', items);
  console.log('Selected category:', selectedCategory);
  console.log('Filtered items:', filteredItems);

  // Load userId and checklist data on mount
  useEffect(() => {

    const init = async () => {
      const token = await storage.get('userToken');
      console.log('📦 Loaded token:', token);

      if (!token) {
        setUserError('User is not authenticated. Please log in.');
        return;
      }

      try {
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
          const response = await api.get('/api/baby-checklist');
          if (response.data?.success && response.data?.checklist) {
            const serverItems = JSON.parse(response.data.checklist.itemsStatus);
            setItems(serverItems);
          }
        } catch (error) {
          console.error('Error fetching checklist:', error);
          console.log('Trying local storage...');
          
          // Try to load from local storage
          try {
            const localData = await storage.get('babyChecklistData');
            if (localData) {
              const localItems = JSON.parse(localData);
              setItems(localItems);
              console.log('Loaded from local storage');
            } else {
              setItems(babyChecklistData);
              console.log('Using default data');
            }
          } catch (localError) {
            console.error('Error loading from local storage:', localError);
            setItems(babyChecklistData);
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
  const saveChecklistToServer = async (updatedItems) => {
    console.log('saveChecklistToServer called with userId:', userId);
    
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
      console.log('Saving checklist for user:', currentUserId);
      console.log('Items to save:', updatedItems);
      console.log('📤 Sending itemsStatus:', JSON.stringify(updatedItems));
      
      const response = await api.post('/api/baby-checklist', {
        itemsStatus: JSON.stringify(updatedItems)
      });
      
      if (response.data?.success) {
        console.log('Checklist saved successfully');
      }
    } catch (error) {
      console.error('Error saving checklist:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      console.error('Error message:', error.response?.data?.message);
      
      // For now, just log the error but don't show it to user
      console.log('Server error - working with local data only');
      // setUserError('Error saving checklist: ' + error.message);
    }
  };

  // Toggle item checked status with automatic saving
  const toggleItem = async (id) => {
    const updatedItems = items.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
    );

    setItems(updatedItems);

    // Save to local storage
    try {
      await storage.set('babyChecklistData', JSON.stringify(updatedItems));
      console.log('Checklist saved to local storage');
    } catch (error) {
      console.error('Error saving to local storage:', error);
    }

    // Save to server automatically
    await saveChecklistToServer(updatedItems);
  };

  // Reset all items
  const resetChecklist = async () => {
    console.log('🔴 resetChecklist function called!');
    
    // Use window.confirm for web
    if (typeof window !== 'undefined' && window.confirm('האם אתה בטוח שברצונך לאפס את כל הרשימה?')) {
      console.log('Reset confirmed by user');
      console.log('Current items before reset:', items);
      
      const resetItems = items.map(item => ({ ...item, checked: false }));
      console.log('Reset items:', resetItems);
      
      setItems(resetItems);
      console.log('Items state updated');

      // Save to local storage
      try {
        await storage.set('babyChecklistData', JSON.stringify(resetItems));
        console.log('Reset saved to local storage');
      } catch (error) {
        console.error('Error saving reset to local storage:', error);
      }

      // Save reset to server using reset endpoint
      try {
        console.log('Calling reset endpoint...');
        const response = await api.post('/api/baby-checklist/reset');
        if (response.data?.success) {
          console.log('Reset completed successfully on server');
        }
      } catch (error) {
        console.error('Error calling reset endpoint:', error);
        console.log('Reset completed locally only');
      }
      console.log('Reset completed');
    } else {
      console.log('Reset cancelled by user');
    }
  };

  // Get category tab style based on category
  const getCategoryTabStyle = (category) => {
    if (selectedCategory === category) {
      return babyChecklistStyles.categoryTabActive;
    }

    switch (category) {
      case 'all':
        return babyChecklistStyles.categoryTabAll;
      case 'clothing':
        return babyChecklistStyles.categoryTabClothing;
      case 'feeding':
        return babyChecklistStyles.categoryTabFeeding;
      case 'sleep':
        return babyChecklistStyles.categoryTabSleep;
      case 'hygiene':
        return babyChecklistStyles.categoryTabHygiene;
      case 'safety':
        return babyChecklistStyles.categoryTabSafety;
      case 'transport':
        return babyChecklistStyles.categoryTabTransport;
      case 'toys':
        return babyChecklistStyles.categoryTabToys;
      case 'medical':
        return babyChecklistStyles.categoryTabMedical;
      case 'other':
        return babyChecklistStyles.categoryTabOther;
      default:
        return {};
    }
  };

  // Get category text style based on category
  const getCategoryTextStyle = (category) => {
    if (selectedCategory === category) {
      return babyChecklistStyles.categoryTabTextActive;
    }

    switch (category) {
      case 'all':
        return babyChecklistStyles.categoryTabTextAll;
      case 'clothing':
        return babyChecklistStyles.categoryTabTextClothing;
      case 'feeding':
        return babyChecklistStyles.categoryTabTextFeeding;
      case 'sleep':
        return babyChecklistStyles.categoryTabTextSleep;
      case 'hygiene':
        return babyChecklistStyles.categoryTabTextHygiene;
      case 'safety':
        return babyChecklistStyles.categoryTabTextSafety;
      case 'transport':
        return babyChecklistStyles.categoryTabTextTransport;
      case 'toys':
        return babyChecklistStyles.categoryTabTextToys;
      case 'medical':
        return babyChecklistStyles.categoryTabTextMedical;
      case 'other':
        return babyChecklistStyles.categoryTabTextOther;
      default:
        return babyChecklistStyles.categoryTabText;
    }
  };

  if (isLoading) {
    return (
        <ProtectedRoute requireAuth={true}>
          <>
            <HomeButton />
            <View style={[babyChecklistStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
              <Text style={{ fontSize: 18, color: '#9c27b0' }}>טוען...</Text>
            </View>
          </>
        </ProtectedRoute>
    );
  }

  return (
      <ProtectedRoute requireAuth={true}>
        <>
          <HomeButton />
          <ScrollView
              style={babyChecklistStyles.container}
              showsVerticalScrollIndicator={true}
              contentContainerStyle={{ paddingBottom: 20 }}
          >
            {/* Error Message */}
            {userError && (
                <View style={{ backgroundColor: '#fff3cd', padding: 10, borderRadius: 8, marginBottom: 10 }}>
                  <Text style={{ color: '#856404', fontWeight: 'bold', textAlign: 'center' }}>{userError}</Text>
                </View>
            )}

            {/* Header */}
            <View style={babyChecklistStyles.header}>
              <Text style={babyChecklistStyles.title}>🛍️ רשימת קניות לתינוק</Text>
              <View style={babyChecklistStyles.decorativeLine} />
              <Text style={babyChecklistStyles.subtitle}>
                📋 כל מה שצריך להכין לבואו של התינוק החדש
              </Text>

              {/* Progress Section */}
              <View style={babyChecklistStyles.progressContainer}>
                <View style={babyChecklistStyles.progressBar}>
                  <View
                      style={[
                        babyChecklistStyles.progressFill,
                        { width: `${progressPercentage}%` }
                      ]}
                  />
                </View>
                <Text style={babyChecklistStyles.progressText}>
                  📊 התקדמות: {checkedItems} מתוך {totalItems} פריטים ({Math.round(progressPercentage)}%)
                </Text>
              </View>
            </View>

            {/* Category Tabs */}
            <View style={babyChecklistStyles.categoryTabsContainer}>
              <View style={babyChecklistStyles.categoryTabs}>
                {categories.map(category => {
                  const categoryItems = category === 'all'
                      ? items
                      : items.filter(item => item.category === category);
                  const categoryChecked = categoryItems.filter(item => item.checked).length;

                  return (
                      <TouchableOpacity
                          key={category}
                          style={[
                            babyChecklistStyles.categoryTab,
                            getCategoryTabStyle(category)
                          ]}
                          onPress={() => setSelectedCategory(category)}
                      >
                        <Text style={[
                          babyChecklistStyles.categoryTabText,
                          getCategoryTextStyle(category)
                        ]}>
                          {category === 'all' ? '📦 הכל' :
                              category === 'clothing' ? '👕 בגדים' :
                                  category === 'feeding' ? '🍼 האכלה' :
                                      category === 'sleep' ? '😴 שינה' :
                                          category === 'hygiene' ? '🧴 היגיינה' :
                                              category === 'safety' ? '🛡️ בטיחות' :
                                                  category === 'transport' ? '🚗 תחבורה' :
                                                      category === 'toys' ? '🧸 צעצועים' :
                                                          category === 'medical' ? '💊 רפואי' :
                                                              category === 'other' ? '📝 אחר' : category}
                        </Text>
                        {categoryChecked > 0 && (
                            <View style={babyChecklistStyles.itemCountBadge}>
                              <Text style={babyChecklistStyles.itemCountText}>
                                {categoryChecked}
                              </Text>
                            </View>
                        )}
                      </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Items List */}
            <View style={babyChecklistStyles.itemsContainer}>
              {filteredItems.length > 0 ? (
                  filteredItems.map((item, index) => (
                      <TouchableOpacity
                          key={item.id}
                          style={[
                            babyChecklistStyles.itemRow,
                            index === filteredItems.length - 1 && babyChecklistStyles.itemRowLast,
                            item.checked && babyChecklistStyles.itemRowChecked
                          ]}
                          onPress={() => toggleItem(item.id)}
                          activeOpacity={0.7}
                      >
                        <View style={[
                          babyChecklistStyles.checkbox,
                          item.checked && babyChecklistStyles.checkboxChecked
                        ]}>
                          {item.checked && (
                              <Text style={babyChecklistStyles.checkboxIcon}>✓</Text>
                          )}
                        </View>
                        <Text style={[
                          babyChecklistStyles.itemText,
                          item.checked && babyChecklistStyles.itemTextChecked
                        ]}>
                          {item.name}
                        </Text>
                      </TouchableOpacity>
                  ))
              ) : (
                  <View style={babyChecklistStyles.emptyState}>
                    <Text style={babyChecklistStyles.emptyStateIcon}>📭</Text>
                    <Text style={babyChecklistStyles.emptyStateText}>
                      אין פריטים בקטגוריה זו 🎯
                    </Text>
                  </View>
              )}
            </View>

            {/* Action Buttons */}
            <View style={babyChecklistStyles.buttonsContainer}>
              <TouchableOpacity
                  style={babyChecklistStyles.resetButton}
                  onPress={resetChecklist}
              >
                <Text style={babyChecklistStyles.resetButtonText}>
                  🔄 אפס הכל
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </>
      </ProtectedRoute>
  );
};

export default BabyChecklist;
