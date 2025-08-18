// styles/faqTabsStyles.js
import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

const faqTabsStyles = StyleSheet.create({
    tabsContainer: {
        flexDirection: 'row-reverse',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 15,
    },
    tabButton: {
        backgroundColor: Colors.grayBg2,   // היה #f0f0f0
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        margin: 4,
    },

    tabButtonActive: { backgroundColor: Colors.blueBgSoft },

    tabButtonText: {
        color: Colors.text,                // היה #333
        fontSize: 16,
        textAlign: 'center',
    },
    tabButtonTextActive: {
        color: Colors.black,               // היה #000
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default faqTabsStyles;
