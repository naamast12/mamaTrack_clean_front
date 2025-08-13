// styles/<your-file>.js
import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

export default StyleSheet.create({
    card: {
        backgroundColor: Colors.white,
        padding: 20,
        borderRadius: 12,
        writingDirection: 'rtl',
        margin: 10,
        shadowColor: Colors.pinkDeep,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
    },

    itemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        paddingHorizontal: 20,
        paddingVertical: 16,
        marginBottom: 8,
        borderRadius: 12,
        shadowColor: Colors.pinkDeep,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
    },
    itemRowChecked: {
        backgroundColor: Colors.pinkLight,
        borderLeftWidth: 4,
        borderLeftColor: Colors.pinkDeep,
    },

    itemText: {
        flex: 1,
        fontSize: 16,
        color: Colors.text,
        lineHeight: 22,
    },
    itemTextChecked: {
        color: Colors.pinkDeep,
        textDecorationLine: 'line-through',
        textDecorationColor: Colors.pinkDeep,
    },

    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: Colors.pinkDeep,
        marginRight: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.white,
        shadowColor: Colors.pinkDeep,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 1,
    },
    checkboxChecked: {
        backgroundColor: Colors.pinkDeep,
        borderColor: Colors.pinkDeep,
    },
    checkboxIcon: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
    checked: {
        width: 12,
        height: 12,
        backgroundColor: Colors.pinkDeep,
    },

    categoryTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: Colors.pinkDeep,
        marginBottom: 15,
    },

    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 40,
    },
    emptyStateIcon: { fontSize: 48, marginBottom: 10 },
    emptyStateText: {
        fontSize: 16,
        color: Colors.mutedText,
        textAlign: 'center',
    },
});
