import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    tabsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-end', // "right" ב-CSS
        marginBottom: 20,
        // gap לא נתמך בכל הגרסאות, נשתמש במרווח פנימי אם צריך
    },
    tabButton: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 6,
        backgroundColor: '#f0f0f0',
        direction: 'rtl',
        marginLeft: 10, // תחליף ל-gap
    },
    tabButtonActive: {
        backgroundColor: '#00695c',
    },
    tabButtonText: {
        fontWeight: 'bold',
        color: '#000',
    },
    tabButtonTextActive: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
