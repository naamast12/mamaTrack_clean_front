// app/babyChecklist/BabyChecklist.js (או הנתיב הנוכחי שלך)
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
// Using emoji icons for categories to match FAQ style
import babyChecklistStyles from '../../styles/babyChecklistStyles';
import babyChecklistData from './babyChecklistData';
import { HomeButton } from "../utils/HomeButton";
import ProtectedRoute from "../../components/ProtectedRoute";
import storage from '../utils/storage';
import api from '../../src/api/axiosConfig';
import { Colors } from '../../constants/Colors';

const BabyChecklist = () => {
  const [items, setItems] = useState(babyChecklistData);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [userError, setUserError] = useState(null);

  // חישוב התקדמות
  const totalItems = items.length;
  const checkedItems = items.filter(item => item.checked).length;
  const progressPercentage = totalItems > 0 ? (checkedItems / totalItems) * 100 : 0;

  // קטגוריות ייחודיות
  const categories = ['all', ...new Set(items.map(item => item.category))];

  // סינון לפי קטגוריה
  const filteredItems = selectedCategory === 'all'
      ? items
      : items.filter(item => item.category === selectedCategory);

  // ⬇️ טעינת הרשימה מהשרת (JWT) עם נפילה ללוקאל/ברירת מחדל
  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      setUserError(null);

      const token = await storage.get('userToken');
      if (!token || token === 'null' || token === 'undefined') {
        setUserError('המשתמש/ת לא מחובר/ת. יש להיכנס מחדש.');
        // למרות שאין טוקן, עדיין נטען מ־לוקאל כדי לא להשאיר מסך ריק
        try {
          const localData = await storage.get('babyChecklistData');
          setItems(localData ? JSON.parse(localData) : babyChecklistData);
        } catch {
          setItems(babyChecklistData);
        }
        setIsLoading(false);
        return;
      }

      try {
        const res = await api.get('/api/baby-checklist');
        // תומך גם ב-res.data.checklist וגם בהחזרה ישירה
        const payload = res.data?.checklist ?? res.data;
        if (payload?.itemsStatus) {
          const serverItems = JSON.parse(payload.itemsStatus);
          setItems(serverItems);
          // נשמור גם בלוקאל כ־cache
          await storage.set('babyChecklistData', JSON.stringify(serverItems));
        } else {
          // אין בשרת? ננסה מהלוקאל
          const localData = await storage.get('babyChecklistData');
          setItems(localData ? JSON.parse(localData) : babyChecklistData);
        }
      } catch (error) {
        console.error('Error fetching checklist:', error);
        // fallback ללוקאל/דיפולט
        try {
          const localData = await storage.get('babyChecklistData');
          setItems(localData ? JSON.parse(localData) : babyChecklistData);
        } catch {
          setItems(babyChecklistData);
        }
        // אפשר להציג הודעה עדינה
        setUserError('לא הצלחנו למשוך מהרשת — מציגים נתונים מקומיים.');
      } finally {
        setIsLoading(false);
      }
    };

    init();
  }, []);

  // ⬇️ שמירה לשרת (לפי JWT) + שמירה ללוקאל
  const saveChecklistToServer = async (updatedItems) => {
    try {
      const body = { itemsStatus: JSON.stringify(updatedItems) };
      const res = await api.post('/api/baby-checklist', body);
      if (res.data?.success === false) {
        console.log('Server returned success=false, keeping local only.');
      }
    } catch (error) {
      console.error('Error saving checklist:', error?.response?.data || error.message);
      console.log('Server error - working with local data only');
    }
  };

  // ⬇️ Toggle + שמירה מקומית + ניסיון לשמירה לשרת
  const toggleItem = async (id) => {
    const updatedItems = items.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
    );

    setItems(updatedItems);

    try {
      await storage.set('babyChecklistData', JSON.stringify(updatedItems));
    } catch (error) {
      console.error('Error saving to local storage:', error);
    }

    await saveChecklistToServer(updatedItems);
  };

  // ⬇️ איפוס הכל
  const resetChecklist = async () => {
    const ok = typeof window !== 'undefined'
        ? window.confirm('האם את בטוחה שברצונך לאפס את כל הרשימה?')
        : true; // בנייד אין confirm דפדפן — אפשר לממש מודל משלך

    if (!ok) return;

    const resetItems = items.map(item => ({ ...item, checked: false }));
    setItems(resetItems);

    try {
      await storage.set('babyChecklistData', JSON.stringify(resetItems));
    } catch (error) {
      console.error('Error saving reset to local storage:', error);
    }

    try {
      const res = await api.post('/api/baby-checklist/reset');
      if (res.data?.success) {
        console.log('Reset completed on server');
      } else {
        console.log('Server reset returned success=false (continuing with local)');
      }
    } catch (error) {
      console.error('Error calling reset endpoint:', error?.response?.data || error.message);
      console.log('Reset completed locally only');
    }
  };

  // עזר ל־UI
  const getCategoryTabStyle = (category) => {
    if (selectedCategory === category) return babyChecklistStyles.categoryTabActive;
    switch (category) {
      case 'all': return babyChecklistStyles.categoryTabAll;
      case 'clothing': return babyChecklistStyles.categoryTabClothing;
      case 'feeding': return babyChecklistStyles.categoryTabFeeding;
      case 'sleep': return babyChecklistStyles.categoryTabSleep;
      case 'hygiene': return babyChecklistStyles.categoryTabHygiene;
      case 'safety': return babyChecklistStyles.categoryTabSafety;
      case 'transport': return babyChecklistStyles.categoryTabTransport;
      case 'toys': return babyChecklistStyles.categoryTabToys;
      case 'medical': return babyChecklistStyles.categoryTabMedical;
      case 'other': return babyChecklistStyles.categoryTabOther;
      default: return {};
    }
  };

  const getCategoryTextStyle = (category) => {
    if (selectedCategory === category) return babyChecklistStyles.categoryTabTextActive;
    switch (category) {
      case 'all': return babyChecklistStyles.categoryTabTextAll;
      case 'clothing': return babyChecklistStyles.categoryTabTextClothing;
      case 'feeding': return babyChecklistStyles.categoryTabTextFeeding;
      case 'sleep': return babyChecklistStyles.categoryTabTextSleep;
      case 'hygiene': return babyChecklistStyles.categoryTabTextHygiene;
      case 'safety': return babyChecklistStyles.categoryTabTextSafety;
      case 'transport': return babyChecklistStyles.categoryTabTextTransport;
      case 'toys': return babyChecklistStyles.categoryTabTextToys;
      case 'medical': return babyChecklistStyles.categoryTabTextMedical;
      case 'other': return babyChecklistStyles.categoryTabTextOther;
      default: return babyChecklistStyles.categoryTabText;
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
            <View style={babyChecklistStyles.centeredBox}>
            {/* הודעת שגיאה עדינה */}
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

              {/* Progress */}
              <View style={babyChecklistStyles.progressContainer}>
                <View style={babyChecklistStyles.progressBar}>
                  <View style={[babyChecklistStyles.progressFill, { width: `${progressPercentage}%` }]} />
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
                          style={[babyChecklistStyles.categoryTab, getCategoryTabStyle(category)]}
                          onPress={() => setSelectedCategory(category)}
                      >
                                                <View style={babyChecklistStyles.categoryTabContent}>
                          <Text style={babyChecklistStyles.categoryTabIcon}>
                            {category === 'all' ? '📦' :
                              category === 'בגדים' ? '👕' :
                              category === 'האכלה' ? '🍼' :
                              category === 'שינה ולינה' ? '😴' :
                              category === 'החתלה והיגיינה' ? '🧴' :
                              category === 'יציאות וטיולים' ? '🚗' :
                              category === 'מוצצים ואביזרים' ? '🧷' :
                              category === 'צעצועים וגירויים' ? '🧸' :
                              category === 'לבית' ? '🏠' : '📋'}
                          </Text>
                          <Text style={[babyChecklistStyles.categoryTabText, getCategoryTextStyle(category)]}>
                            {category === 'all' ? 'הכל' : category}
                          </Text>
                        </View>
                        {categoryChecked > 0 && (
                            <View style={babyChecklistStyles.itemCountBadge}>
                              <Text style={babyChecklistStyles.itemCountText}>{categoryChecked}</Text>
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
                          {item.checked && <Text style={babyChecklistStyles.checkboxIcon}>✓</Text>}
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
                    <Text style={babyChecklistStyles.emptyStateText}>אין פריטים בקטגוריה זו 🎯</Text>
                  </View>
              )}
            </View>

            {/* Actions */}
            <View style={babyChecklistStyles.buttonsContainer}>
              <TouchableOpacity style={babyChecklistStyles.resetButton} onPress={resetChecklist}>
                <Text style={babyChecklistStyles.resetButtonText}>🔄 אפס הכל</Text>
              </TouchableOpacity>
            </View>
            </View>
          </ScrollView>
        </>
      </ProtectedRoute>
  );
};

export default BabyChecklist;