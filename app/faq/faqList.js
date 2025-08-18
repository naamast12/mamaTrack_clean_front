import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import faqData from './faqData';
import styles from '../../styles/faqList'; // 👈 הנתיב לקובץ העיצוב

export default function FaqList({ selectedCategory }) {
    const [openIndex, setOpenIndex] = useState(null);
    const category = faqData.find(cat => cat.category === selectedCategory);

    if (!category) {
        return <Text style={styles.message}>לא נמצאו שאלות לקטגוריה זו.</Text>;
    }

    return (
        <View style={styles.card}>
            {category.questions.map((q, index) => (
                <View key={index} style={styles.item}>
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
            ))}

            {category.link && (
                <TouchableOpacity
                    style={styles.linkContainer}
                    onPress={() => Linking.openURL(category.link)}
                >
                    <Text style={styles.linkText}>למידע נוסף על {category.category}</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}
