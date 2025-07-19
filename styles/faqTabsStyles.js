import { StyleSheet } from 'react-native';

const faqTabsStyles = StyleSheet.create({
    tabsContainer: {
        flexDirection: 'row-reverse',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 15,
    },
    tabButton: {
        backgroundColor: '#f0f0f0',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        margin: 4,
    },
    tabButtonActive: {
        backgroundColor: '#cce5ff',
    },
    tabButtonText: {
        color: '#333',
        fontSize: 16,
        textAlign: 'center',
    },
    tabButtonTextActive: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default faqTabsStyles;
