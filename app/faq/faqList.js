import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import faqData from './faqData';
import styles from '../../styles/faqList'; // 👈 הנתיב לקובץ העיצוב

export default function FaqList({ selectedCategory, searchQuery }) {
    const [openIndex, setOpenIndex] = useState(null);
    
    // פונקציה לסינון השאלות לפי קטגוריה או חיפוש
    const getFilteredQuestions = () => {
        if (searchQuery && searchQuery.trim()) {
            // חיפוש בכל השאלות
            const allQuestions = [];
            faqData.forEach(category => {
                category.questions.forEach(question => {
                    if (question.question.includes(searchQuery) || 
                        question.answer.includes(searchQuery)) {
                        allQuestions.push({
                            ...question,
                            categoryName: category.category
                        });
                    }
                });
            });
            return allQuestions;
        } else if (selectedCategory) {
            // הצגת שאלות מקטגוריה נבחרת
            const category = faqData.find(cat => cat.category === selectedCategory);
            return category ? category.questions.map(q => ({ ...q, categoryName: category.category })) : [];
        }
        return [];
    };

    const filteredQuestions = getFilteredQuestions();

    if (filteredQuestions.length === 0) {
        const message = searchQuery ? 
            `לא נמצאו שאלות עבור "${searchQuery}"` : 
            'לא נמצאו שאלות לקטגוריה זו.';
        return <Text style={styles.message}>{message}</Text>;
    }

    return (
        <View style={styles.card}>
            {filteredQuestions.map((q, index) => (
                <View key={index} style={styles.item}>
                    {searchQuery && (
                        <Text style={styles.categoryLabel}>{q.categoryName}</Text>
                    )}
                    <View style={styles.questionContainer}>
                        <TouchableOpacity
                            style={styles.question}
                            onPress={() => setOpenIndex(openIndex === index ? null : index)}
                        >
                            <Text style={styles.questionText}>{q.question}</Text>
                        </TouchableOpacity>
                        {openIndex === index && (
                            <Text style={styles.answer}>{q.answer}</Text>
                        )}
                    </View>
                </View>
            ))}

            {/* הצגת קישור רק אם יש קטגוריה נבחרת */}
            {selectedCategory && !searchQuery && (
                (() => {
                    const category = faqData.find(cat => cat.category === selectedCategory);
                    return category && category.link ? (
                        <TouchableOpacity
                            style={styles.linkContainer}
                            onPress={() => Linking.openURL(category.link)}
                        >
                            <Text style={styles.linkText}>למידע נוסף על {category.category}</Text>
                        </TouchableOpacity>
                    ) : null;
                })()
            )}
        </View>
    );
}
