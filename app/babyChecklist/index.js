import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import babyChecklistStyles from '../../styles/babyChecklistStyles';
import babyChecklistData from './babyChecklistData';
import { HomeButton } from "../utils/HomeButton";

const BabyChecklist = () => {
  const [items, setItems] = useState(babyChecklistData);
  const [selectedCategory, setSelectedCategory] = useState('all');

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

  // Toggle item checked status
  const toggleItem = (id) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  // Reset all items
  const resetChecklist = () => {
    Alert.alert(
      'איפוס רשימה 🗑️',
      'האם אתה בטוח שברצונך לאפס את כל הרשימה?',
      [
        { text: 'ביטול', style: 'cancel' },
        {
          text: 'אפס',
          style: 'destructive',
          onPress: () => setItems(prevItems => prevItems.map(item => ({ ...item, checked: false })))
        }
      ]
    );
  };

  // Save checklist (placeholder for future server integration)
  const saveChecklist = () => {
    Alert.alert(
      'שמירה ✅',
      'הרשימה נשמרה בהצלחה!',
      [{ text: 'אישור', style: 'default' }]
    );
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

  return (
    <>
      <HomeButton />
      <ScrollView 
        style={babyChecklistStyles.container} 
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
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
          
          <TouchableOpacity
            style={babyChecklistStyles.saveButton}
            onPress={saveChecklist}
          >
            <Text style={babyChecklistStyles.saveButtonText}>
              💾 שמור רשימה
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

export default BabyChecklist;
