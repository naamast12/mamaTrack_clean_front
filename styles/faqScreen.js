import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '@/constants/Colors';

const { width } = Dimensions.get('window');

const faqScreenStyles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: Colors.appBg,  // היה '#f2f4f7'
        paddingVertical: 24,
        paddingHorizontal: 16,
        writingDirection: 'rtl',
    },

    pinkBox: {
        backgroundColor: Colors.pinkBg, // היה '#fff0f5'
        borderRadius: 20,
        padding: 24,
        width: '100%',
        maxWidth: 800,
        alignSelf: 'center',
        alignItems: 'center',
        marginBottom: 40,
        elevation: 4,
        shadowColor: Colors.black,      // היה '#000'
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 12,
    },

    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: Colors.greenDeep,        // היה '#054b44'
        textAlign: 'center',
        marginBottom: 10,
    },

    chooseMessage: {
        marginTop: 20,
        padding: 20,
        backgroundColor: Colors.surfaceAlt, // היה '#f8f9fa'
        color: Colors.deepText,             // היה '#444'
        fontSize: 20,
        textAlign: 'center',
        borderRadius: 12,
        shadowColor: Colors.black,
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 2,
        width: '90%',
        maxWidth: 500,
    },

    fullWidthBox: { width: '100%' },

    image: {
        width: width * 0.9,
        height: undefined,
        aspectRatio: 1,
        opacity: 0.3,
        alignSelf: 'center',
        marginBottom: 40,
    },
});

export default faqScreenStyles;
