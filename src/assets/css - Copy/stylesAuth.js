import {StyleSheet, Dimensions,StatusBar} from 'react-native';
import { FontFamily } from '../../assets/fonts/FontFamily';
import { FontSize } from '../../assets/fonts/Fonts';
import { Colors } from '../../assets/config/Colors';
const {width, height} = Dimensions.get('screen');

export default StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center'
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
    signintextmini: {
      fontSize: FontSize.labelText2,
      color: Colors.signtext,
      fontFamily: FontFamily.PopinsMedium,
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
    ResendTextNew:{
        top: 7, color: Colors.bluetheme,
        fontSize: FontSize.labelText,
        fontFamily: FontFamily.PopinsRegular,
        color: Colors.black,
        textAlign: 'center'
    },
    IMGBackStyle:{
        flex: 1,
        zIndex: 9999,
        height,
        width: width,
        backgroundColor: Colors.white,
      },
      VerifyText:{
        width: width * 0.85,
        alignSelf: 'center',
        marginTop: StatusBar.currentHeight + 60,
      },
      OTPInputView:{
        width: width*0.9,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
        alignSelf:'center',
      },
      OTPInputView1:{
        width: width * 0.9,
        flexDirection: 'row',
        borderRadius: 12,
        justifyContent:'center'
      },
      WIDTH84:{ width: width * 0.9, },
      OTPVIEWSTYLE:{ width: '100%', height: 45 },
      PV10:{ paddingVertical: 10 },
      MV15:{ paddingVertical: 15 },
      CountDownStyle:{ backgroundColor: '#FFF', borderWidth: 0, borderColor: '#000', top: 10, },
      InputMainView:
      {
          width: width * 0.9,
          flexDirection: 'row',
          backgroundColor: Colors.Textinputbg,
          borderRadius: 12,
          alignItems:'center',
          justifyContent:'center',
          alignSelf:'center',
        },
  InputIcon:{justifyContent: 'center', alignSelf: 'center', left: 15},
  InputView1:{paddingHorizontal: 15, width: width * 0.9,},
  });