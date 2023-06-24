import { Dimensions, StyleSheet, StatusBar } from 'react-native'
const { width, height } = Dimensions.get('window')
import { FontFamily } from '../../fonts/FontFamily';
import { FontSize } from '../../fonts/Fonts';
import { Colors } from '../../config/Colors'

export default StyleSheet.create({
    backstyle: {
        flex: 1,
        zIndex: 9999,
        height,
        width: width,
        backgroundColor: 'white',
    },
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    inptbtnlabel: {
        width: width * 0.85,
        alignSelf: 'center',
        marginTop: StatusBar.currentHeight + 30,
    },
    signintextmini: {
        fontSize: FontSize.labelText2,
        // color: Colors.signtext,
        fontFamily: FontFamily.PopinsMedium,
        // top: 4,
    },
    inptbtn: {
        // width: width,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,

    },
    inputscontainer: {
        width: width * 0.9,
        flexDirection: 'row',
        borderRadius: 12,
        justifyContent: 'center',

    },
    secondMainContainer: {
        width: width * 0.9,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
        alignSelf: 'center',
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
    resendtext:
    {
        fontSize: FontSize.labelText,
        fontFamily: FontFamily.PopinsRegular,
        color: Colors.black,
        textAlign: 'center',
        
    },
    InputMainView:
    {
        width: width * 0.9,
        flexDirection: 'row',
        backgroundColor: Colors.Textinputbg,
        borderRadius: 12,
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'center',top:20
      },
InputIcon:{justifyContent: 'center', alignSelf: 'center', left: 15},
InputView1:{left: 15, width: width * 0.9,},
InputText: {
    fontSize: FontSize.labelText3,
    height: 50,
    fontFamily: FontFamily.PopinsRegular,
    top: 2,
    width:width*0.82,
    
  },
  Top50:{top:50}
})

