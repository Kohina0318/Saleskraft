import { StyleSheet, Dimensions } from 'react-native'
import { FontSize } from '../fonts/Fonts'
import { Colors } from '../config/Colors'
import { FontFamily } from '../fonts/FontFamily'
const { width, height } = Dimensions.get('window')

const MainNavigatorstyle = StyleSheet.create({
    drawerContent: {
        // flex: 1,
        // backgroundColor: Colors.white,
    },
    signintext: {
        fontSize: FontSize.h6,
        color: Colors.signtext,
        fontFamily: FontFamily.Popinssemibold,
    },
    signintextmini: {
        fontSize: FontSize.labelText,
        // color: Colors.signtext,
        fontFamily: FontFamily.PopinsMedium,
        color: Colors.bluetheme,
    },
    labelstylecss: {
        color: Colors.sidemenucolor,
        fontSize: FontSize.labelText2,
        fontFamily: FontFamily.PopinsMedium,
        left: 10,
    },
    labelicon: {
        width: 16,
        height: 16,
        resizeMode: 'contain',
        top: 2,
    },
    Borderline: {
        width: width * 0.65,
        justifyContent: 'flex-end',
        alignSelf: 'flex-end',
        borderWidth: 0.5,
        borderColor: Colors.borderColor,
    },
    viewstyle: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignContent: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    bottomicon: {
        width: 22,
        height: 22,
        backgroundColor: 'transparent',
        resizeMode: 'contain',
    },
    tabbarbottomborder: {
        backgroundColor: Colors.bluetheme,
        height: 4,
        width: 78,
        bottom: -14,
        position: 'absolute',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    tab1: {
        fontSize: 11,
        fontFamily: FontFamily.PopinsMedium,
        bottom: 8,
    },
    tab2: {
        backgroundColor: '#4343ef',
        borderRadius: 30,
        width: width * 0.9,
        alignSelf: 'center',
        // height: 'auto',
        overflow: 'hidden',
        bottom: 44,
        fontFamily: FontFamily.PopinsMedium,
    },
    userinfo1: {
        alignSelf: 'center',
        width: '100%',
        height: height *0.945
    },
    userimg: {
        width: width * 0.55,
        height: 90,
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    view1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center',
        height: 60,
        alignItems: 'center',

    },
    view1img:
    {
        width: 40,
        height: 40,
        borderRadius:60
    },
    view2: {
        alignSelf: 'center',
        alignContent: 'flex-end',
        // bottom: 0,
        // position: "absolute",
        width: '100%',
    },
    view2txt:{
        color: Colors.bluetheme,
        textAlign: 'center',
        fontSize: 13,
      }

})
export { MainNavigatorstyle }