import { StyleSheet, Dimensions, } from 'react-native'
const { width } = Dimensions.get('window');
import { Colors } from '../../assets/config/Colors';
import { FontFamily } from '../../assets/fonts/FontFamily';
import { FontSize } from '../../assets/fonts/Fonts';

const styles = StyleSheet.create({
    CardText: {
        fontSize: FontSize.small,
        fontFamily: FontFamily.PopinsMedium,
        color: Colors.black,
        alignSelf: 'center',
        // top: 15,
        width: 90,
        textAlign: 'center'
    },
    MainView: { flexDirection: 'row', justifyContent: 'space-around', },
    H:
        { height: 10 },
    W:
        { width: width * 0.8 },
    innerview:
    {
        // backgroundColor: 'tomato',
        // height: 90,
        marginTop: 5,
        marginLeft: 5,
        paddingVertical: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.borderColor,
        // backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center'


    },
    innerview1:
    {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderColor: Colors.borderColor,
    },
    ImageView: {
        borderRadius: 50,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    IMGStyle: {
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignSelf: 'center',
    },
})

export default styles;  