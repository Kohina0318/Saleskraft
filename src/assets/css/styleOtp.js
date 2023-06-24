import { StyleSheet, Dimensions,StatusBar } from 'react-native';
import { Colors } from '../../assets/config/Colors';
import { FontFamily } from '../fonts/FontFamily';
import { FontSize } from '../fonts/Fonts';
const { width, height } = Dimensions.get('screen');

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    borderStyleBase: {
        width: 30,
        height: 45
    },
    borderStyleHighLighted: {
        borderColor: "#03DAC6",
    },
    underlineStyleBase: {
        width: 75,
        height: 45,
        borderWidth: 0,
        borderRadius: 15,
        backgroundColor: Colors.Textinputbg,
        color: Colors.black,
    },

    underlineStyleHighLighted: {
        borderColor: "#03DAC6",
    },
    LinearGradientStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 45,
        width: width * 0.9,
        borderRadius: 12,
    },
    buttonText: {
        fontSize: FontSize.h4,
        textAlign: 'center',
        color: Colors.white,
        fontFamily: FontFamily.PopinsMedium,
    },
    arrowset: {
        borderRadius: 50,
        width: 28,
        height: 28,
        justifyContent: 'center',
        left: 30,
        marginTop: height * 0.08,
    },
    backgroundImage: {
        width: width,
        height: height,
        backgroundColor: Colors.white,
    },
    signintext: {
        fontSize: FontSize.labelTextbig,
        color: Colors.signtext,
        // fontWeight: 'bold',
        fontFamily: FontFamily.Popinsbold,
    },
    signintextmini: {
        fontSize: FontSize.labelText2,
        color: Colors.signtext,
        fontFamily: FontFamily.PopinsMedium,
    },
    logo: {
        width: '100%',
        height: 50,
    },
    arrow: {
        width: 25,
        height: 50,
    },
    InputText: {
        fontSize: FontSize.labelText3,
        height: 45,
        fontFamily: FontFamily.PopinsRegular,
        top: 2,
    },
    resendtext:
    {
        fontSize: FontSize.labelText,
        fontFamily: FontFamily.PopinsRegular,
        color: Colors.black,
        textAlign: 'center'
    },
    mview: {
        width: width * 0.9,
        flexDirection: 'row',
        borderRadius: 12,
        justifyContent: 'center'
    },
    mviewtop: {
        width: width * 0.9,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
        alignSelf: 'center',
    },
    imgbg: {
        flex: 1,
        zIndex: 9999,
        height,
        width: width,
        backgroundColor: Colors.white,
    },
    logoimg: {
        width: width * 0.75,
        height: 80,
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    notice: {
        width: width * 0.85,
        alignSelf: 'center',
        marginTop: StatusBar.currentHeight + 60,
    }

})