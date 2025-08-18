import React, { useState } from 'react';
import { ScrollView, View, Text, Image } from 'react-native';
import FaqTabs from './FaqTabs';
import FaqList from './faqList';
import faqScreenStyles from '../../styles/faqScreen';
import ProtectedRoute from "../../components/ProtectedRoute";
import {HomeButton} from "../utils/HomeButton";

export default function FaqScreen() {
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleCategorySelect = (category) => {
        setSelectedCategory(prev =>
            prev === category ? null : category
        );
    };

    return (
        <ProtectedRoute requireAuth={true}>

            <HomeButton />

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

        </ProtectedRoute>



    );
}
