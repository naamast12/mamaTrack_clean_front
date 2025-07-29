import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 12,
        writingDirection: 'rtl',
        margin: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    itemRow: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        marginBottom: 10,
    },
    itemText: {
        fontSize: 16,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 2,
        borderColor: '#999',
        borderRadius: 4,
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checked: {
        width: 12,
        height: 12,
        backgroundColor: '#00695c',
    },
    categoryTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'right',
    },
});
