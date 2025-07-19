import { StyleSheet } from 'react-native';

const faqListStyles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 12,
        elevation: 4,
        direction: 'rtl',
        marginHorizontal: 16,
        marginTop: 16,
    },
    item: {
        marginBottom: 15,
    },
    question: {
        backgroundColor: '#f1f8e9',
        padding: 10,
        borderRadius: 8,
        width: '100%',
    },
    questionText: {
        fontWeight: 'bold',
        textAlign: 'right',
        fontSize: 16,
    },
    answer: {
        padding: 10,
        backgroundColor: '#f9f9f9',
        marginTop: 5,
        borderRadius: 6,
        textAlign: 'right',
        fontSize: 14,
        color: '#444',
    },
    message: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
    },
    linkContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    linkText: {
        backgroundColor: '#f0f0f0',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        color: '#0077cc',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        fontSize: 15,
    },
});

export default faqListStyles;
