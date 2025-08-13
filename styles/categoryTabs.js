import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

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
        shadowColor: Colors.pinkDeep,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },

    /* רקעים לפי קטגוריה/מצב */
    categoryTabActive:   { backgroundColor: Colors.pinkDeep },
    categoryTabHygiene:  { backgroundColor: Colors.greenBg },
    categoryTabClothing: { backgroundColor: Colors.orangeBg },
    categoryTabMedical:  { backgroundColor: Colors.pinkLight },
    categoryTabBaby:     { backgroundColor: Colors.blueBg },

    /* טקסטים */
    categoryTabText: {
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
        color: Colors.purple,     // ברירת מחדל עדינה
    },
    categoryTabTextActive:  { color: Colors.white },
    categoryTabTextHygiene: { color: Colors.green },
    categoryTabTextClothing:{ color: Colors.orange },
    categoryTabTextMedical: { color: Colors.pink },
    categoryTabTextBaby:    { color: Colors.blue },

    /* באדג' ספירה */
    itemCountBadge: {
        backgroundColor: Colors.pinkDeep,
        borderRadius: 12,
        paddingHorizontal: 8,
        paddingVertical: 2,
        marginLeft: 8,
        minWidth: 20,
        alignItems: 'center',
    },
    itemCountText: {
        color: Colors.white,
        fontSize: 12,
        fontWeight: 'bold',
    },
});
