import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import Video from 'react-native-video';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import StyleCss from '../../assets/css/styleOutlet';
import { verifyOTPRequest } from '../../repository/commonRepository';
import { useToast } from 'react-native-toast-notifications';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';

export default OTPModal = props => {
  const toast = useToast();
  const [modalVisible1, setModalVisible1] = useState(true);
  // const [temp, setTemp] = useState('');
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()

  const handleSubmit = async () => {
    if (props.otp.length === 0) {
      toast.show('Please enter OTP.', {
        type: 'warning',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
    } else if (props.otp.length < 4) {
      toast.show('Please enter valid OTP.', {
        type: 'warning',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
      props.setOTP('');
    } else {
      // setModalVisible1(!modalVisible1)
      // props.setModalVisible1(false)
      // props.setModalVisible2(true)
      let res = await verifyOTPRequest(
        props.OTPRequestId,
        props.mobileNumber,
        props.otp,
      );
      try {
        console.log('Result in OTP Model VerifyOTPREQUEST Line 36 --->', res);
        if (res.statusCode === 200) {
          setModalVisible1(!modalVisible1);
          props.setModalVisible1(false);
          props
            .onPressFunction()
            .then(res1 => {


            })
            .catch(e => {
              console.log('error in OTP Mode Line 47...', e);
            });
        } else if (res.statusCode == 400) {
          toast.show('Please enter valid OTP.', {
            type: 'danger',
            placement: 'bottom',
            duration: 3000,
            offset: 30,
            animationType: 'slide-in',
          });
          props.setOTP('');
        } else {
          toast.show(`${res.message}`, {
            type: 'danger',
            placement: 'bottom',
            duration: 3000,
            offset: 30,
            animationType: 'slide-in',
          });
          props.setOTP('');
        }
      } catch (e) {
        toast.show('Something went wrong,please try again later.', {
          type: 'danger',
          placement: 'bottom',
          duration: 3000,
          offset: 30,
          animationType: 'slide-in',
        });
        props.setOTP('');
      }

      // props.onPressFunction();
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible1}
      onRequestClose={() => {
        setModalVisible1(!modalVisible1);
      }}>
      <View style={StyleCss.centeredView}>
        <View style={{...StyleCss.modalView, backgroundColor: themecolor.RB2,}}>
          <View style={StyleCss.ModalViewWidth}>
            <View style={StyleCss.ModelVideoCenter}>
              <Video
                source={require('../../assets/images/app,intro,splashscreen,login/otpvideo.mp4')}
                style={StyleCss.backgroundVideo}
                muted={true}
                resizeMode={'contain'}
                repeat={true}
                rate={2.0}
                ignoreSilentSwitch={'obey'}
              />

              <Text style={{...StyleCss.ModelTextSub, color: themecolor.TXTGREYS, }}>{props.text}</Text>
              <OTPInputView
                style={StyleCss.OTPINPUTVIEW}
                codeInputFieldStyle={StyleCss.underlineStyleBase}
                pinCount={4}
                autoFocusOnLoad={false}
                keyboardType="phone-pad"
                code={props.otp}
                onCodeChanged={
                  code => props.setOTP(code)
                  // alert("hello")
                }

              />
            </View>
            <View style={StyleCss.MV2} />
            {/* </View> */}
            <View style={StyleCss.FLexCenter}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => handleSubmit()}>
                <View style={{...StyleCss.ModelSubmitButton, backgroundColor:themecolor.HEADERTHEMECOLOR}}>
                  <Text style={StyleCss.textStyle}>Submit</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  setModalVisible1(!modalVisible1);
                  props.setOTP('');
                  props.setModalVisible1(false);
                }}>
                <View style={StyleCss.ModelCencelButton}>
                  <Text style={StyleCss.textStyleGrey}>Cancel</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};
