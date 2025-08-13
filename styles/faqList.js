// styles/faqListStyles.js
import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

const faqListStyles = StyleSheet.create({
    card: {
        backgroundColor: Colors.white,
        padding: 20,
        borderRadius: 12,
        elevation: 4,
        writingDirection: 'rtl',
        marginHorizontal: 16,
        marginTop: 16,
    },

    item: { marginBottom: 15 },

    question: {
        backgroundColor: Colors.greenBg, // היה #f1f8e9
        padding: 10,
        borderRadius: 8,
        width: '100%',
    },
    questionText: {
        fontWeight: 'bold',
        textAlign: 'right',
        fontSize: 16,
        color: Colors.deepText,
    },

    answer: {
        padding: 10,
        backgroundColor: Colors.grayBg, // היה #f9f9f9
        marginTop: 5,
        borderRadius: 6,
        textAlign: 'right',
        fontSize: 14,
        color: Colors.deepText,         // היה #444
    },

    message: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: Colors.mutedText,
    },

    linkContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    linkText: {
        backgroundColor: Colors.grayBg, // היה #f0f0f0
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        color: Colors.blue,             // היה #0077cc
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        fontSize: 15,
    },
});

export default faqListStyles;
