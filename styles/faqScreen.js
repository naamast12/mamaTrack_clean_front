import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const faqScreenStyles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#f2f4f7', // רקע כללי של המסך
        paddingVertical: 24,
        paddingHorizontal: 16,
        direction: 'rtl',
    },
    pinkBox: {
        backgroundColor: '#fff0f5',
        borderRadius: 20,
        padding: 24,
        width: '100%',
        maxWidth: 800,
        alignSelf: 'center',
        alignItems: 'center',
        marginBottom: 40,
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 12,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#054b44',
        textAlign: 'center',
        marginBottom: 10,
    },
    chooseMessage: {
        marginTop: 20,
        padding: 20,
        backgroundColor: '#f8f9fa',
        color: '#444',
        fontSize: 20,
        textAlign: 'center',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 2,
        width: '90%',
        maxWidth: 500,
    },
    fullWidthBox: {
        width: '100%',
    },
    image: {
        width: width * 0.9, // קצת יותר רחב
        height: undefined,
        aspectRatio: 1,
        opacity: 0.3,
        alignSelf: 'center',
        marginBottom: 40,
    },
});

export default faqScreenStyles;
