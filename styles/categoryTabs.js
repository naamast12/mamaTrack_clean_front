import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    tabsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 20,
        gap: 8,
    },
    categoryTab: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        marginHorizontal: 4,
        marginBottom: 8,
        shadowColor: '#d81b60',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    categoryTabActive: {
        backgroundColor: '#d81b60',
    },
    categoryTabHygiene: {
        backgroundColor: '#e8f5e8',
    },
    categoryTabClothing: {
        backgroundColor: '#fff3e0',
    },
    categoryTabMedical: {
        backgroundColor: '#fce4ec',
    },
    categoryTabBaby: {
        backgroundColor: '#e3f2fd',
    },
    categoryTabText: {
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
    },
    categoryTabTextActive: {
        color: '#fff',
    },
    categoryTabTextHygiene: {
        color: '#2e7d32',
    },
    categoryTabTextClothing: {
        color: '#f57c00',
    },
    categoryTabTextMedical: {
        color: '#c2185b',
    },
    categoryTabTextBaby: {
        color: '#1976d2',
    },
    itemCountBadge: {
        backgroundColor: '#d81b60',
        borderRadius: 12,
        paddingHorizontal: 8,
        paddingVertical: 2,
        marginLeft: 8,
        minWidth: 20,
        alignItems: 'center',
    },
    itemCountText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
});
