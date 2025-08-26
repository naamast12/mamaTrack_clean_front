import React, { useState } from 'react';
import { ScrollView, View, Text, Image, TextInput } from 'react-native';
import FaqTabs from './FaqTabs';
import FaqList from './faqList';
import faqScreenStyles from '../../styles/faqScreen';
import ProtectedRoute from "../../components/ProtectedRoute";
import {HomeButton} from "../utils/HomeButton";
import { Colors } from '../../constants/Colors';

export default function FaqScreen() {
  //  const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const handleCategorySelect = (category) => {
        setSelectedCategory(prev =>
            prev === category ? null : category
        );
    };
    const [selectedCategory, setSelectedCategory] = useState("הכל"); // במקום null

    const handleSearch = (text) => {
        setSearchQuery(text);
        // אם יש חיפוש, נבטל את הקטגוריה הנבחרת
        if (text.trim()) {
            setSelectedCategory(null);
        }
    };

    return (
        <ProtectedRoute requireAuth={true}>

            <HomeButton />

            <ScrollView contentContainerStyle={faqScreenStyles.container}>
                {/* תיבת כותרת ורודה */}
                <View style={faqScreenStyles.pinkBox}>
                    <Text style={faqScreenStyles.title}>שאלות ותשובות נפוצות</Text>
                    <FaqTabs selected={selectedCategory} onSelect={handleCategorySelect} />

                    {/* שדה חיפוש במקום המשפט */}
                    <View style={faqScreenStyles.searchContainer}>
                        <TextInput
                            style={faqScreenStyles.searchInput}
                            placeholder="חפשי שאלה... 🔍"
                            placeholderTextColor={Colors.mutedText}
                            value={searchQuery}
                            onChangeText={handleSearch}
                            textAlign="right"
                        />
                    </View>
                </View>

                {/* הצגת שאלות כשקטגוריה נבחרת או יש חיפוש */}
                {(selectedCategory || searchQuery.trim()) && (
                    <View style={faqScreenStyles.fullWidthBox}>
                        <FaqList
                            selectedCategory={selectedCategory}
                            searchQuery={searchQuery}
                        />
                    </View>
                )}

                {/* תמונה תחתונה */}
                {/*<Image*/}
                {/*    source={require('../../assets/images/pregnant-illustration.png')}*/}
                {/*    style={faqScreenStyles.image}*/}
                {/*/>*/}
            </ScrollView>

        </ProtectedRoute>
    );
}