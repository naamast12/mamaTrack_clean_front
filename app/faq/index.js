import React, { useState } from 'react';
import { ScrollView, View, Text, Image } from 'react-native';
import FaqTabs from './FaqTabs';
import FaqList from './faqList';
import faqScreenStyles from '../../styles/faqScreen';

export default function FaqScreen() {
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleCategorySelect = (category) => {
        setSelectedCategory(prev =>
            prev === category ? null : category
        );
    };

    return (
        <ScrollView contentContainerStyle={faqScreenStyles.container}>
            {/* תיבת כותרת ורודה */}
            <View style={faqScreenStyles.pinkBox}>
                <Text style={faqScreenStyles.title}>שאלות ותשובות נפוצות</Text>
                <FaqTabs selected={selectedCategory} onSelect={handleCategorySelect} />
                {!selectedCategory && (
                    <Text style={faqScreenStyles.chooseMessage}>
                        ❓ בחרי קטגוריה כדי להציג את השאלות
                    </Text>
                )}
            </View>

            {/* הצגת שאלות כשקטגוריה נבחרת */}
            {selectedCategory && (
                <View style={faqScreenStyles.fullWidthBox}>
                    <FaqList selectedCategory={selectedCategory} />
                </View>
            )}

            {/* תמונה תחתונה */}
            <Image
                source={require('../../assets/images/pregnant-illustration.png')}
                style={faqScreenStyles.image}
            />
        </ScrollView>
    );
}
