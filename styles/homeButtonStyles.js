import { StyleSheet} from 'react-native';
import { Colors } from '../constants/Colors';


const homeButtonStyles = StyleSheet.create({
    buttonWrapper: {
        position: 'absolute',
        top: 30,
        left: 20,
        zIndex: 10,
    },
    gradient: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 50, // פינות מאוד עגולות
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 180, // שומר על גודל מינימלי יפה
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5,
    },
    buttonText: {
        color: Colors.danger,
        fontSize: 16,
        fontWeight: 'bold',
    },
});



export { homeButtonStyles}

