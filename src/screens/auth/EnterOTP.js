import React, { useState } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  ImageBackground,
  StatusBar,
  Appearance
} from 'react-native';
import { Colors } from '../../assets/config/Colors';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import CountDown from 'react-native-countdown-component';
import FullsizeButton from '../../components/shared/FullsizeButton';
import { LoginSendOTP } from '../../repository/auth/AuthRepository';
import {
  getDatafromAsync,
  StoreDatatoAsync,
} from '../../repository/AsyncStorageServices';
import styles from '../../assets/css/stylesAuth';
import { useToast } from 'react-native-toast-notifications';
import { store } from '../../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import Color from '../../components/Theme/ThemeDarkLightColor';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import {
  getUserCurrentLatLng,
  setUserProfile,
} from '../../repository/commonRepository';
import { insertMappingData, insertOutcomeData, insertStockData, insertStockDataIfNotInserted, outletBeatDump, TruncateAllTables, TruncateCheckInCheckoutORSalesOrderTable } from '../SharedScreens/InsertData';
import { gettripLocationApi } from '../../repository/trip/tripRepository';
import LoadingFullScreen from '../SharedScreens/LoadingFullScreen';
import { useSelector } from 'react-redux';

export default function EnterOTP(props) {

  const mode = useSelector(state => state.mode);
  const network = useSelector(state => state.network);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  const toast = useToast();
  const [show, setShow] = useState(true);
  const [loader, setLoader] = useState(false);
  const [otpinput, setOtpinput] = useState('');
  const [phone, setPhone] = useState('');
  const [resendT, setResendT] = useState(
    <Text style={{ ...styles.resendtext, marginTop: 18, color: themecolor.TXTWHITE }}>
      Resend OTP in{' '}
    </Text>,
  );

  const mobileNumber = props.route.params.mobileNumber;



  const handleOtp = async () => {
    let baseurl = await AsyncStorage.getItem('@baseurl')
    try {
      if (otpinput.length === 0) {
        toast.show('Please enter OTP.', {
          type: 'warning',
          placement: 'bottom',
          duration: 3000,
          offset: 30,
          animationType: 'slide-in',
        });
      } else if (otpinput.length < 4) {
        toast.show('Please enter valid OTP.', {
          type: 'danger',
          placement: 'bottom',
          duration: 3000,
          offset: 30,
          animationType: 'slide-in',
        });
      } else {
        setLoader(true)
        const fcmtoken = await getDatafromAsync('fcmtoken');
        const deviceName = await getDatafromAsync('deviceName');
        const response = await LoginSendOTP(
          `${baseurl}api/verifyOtp?otp=${otpinput}&phone=${mobileNumber}&FcmToken=${fcmtoken}&DeviceName=${deviceName}`,
        );
        if (response == null || response.statusCode == 400) {
          toast.show('Please enter valid OTP.', {
            type: 'danger',
            placement: 'bottom',
            duration: 3000,
            offset: 30,
            animationType: 'slide-in',
          });
        } else if (
          response.statusCode === 200 &&
          response.message === 'Login OK !!'
        ) {
          setPhone(response.data.data.Phone);
          await StoreDatatoAsync('@user', response.data);
          await AsyncStorage.setItem(
            '@google_key',
            response.data.GoogleMapApiKey,
          );

          /***Call getUserProfile Api Start */

          try {
            // alert(response.data.data.EmployeeId)
            const d = await gettripLocationApi(`api/getProfile?EmployeeId=${response.data.data.EmployeeId}`);
            if (d.statusCode == 200) {
              console.log("getProfile=======<><><>", d);
              await AsyncStorage.setItem(
                '@userprofile',
                JSON.stringify(d)
              );
            }
          } catch (e) {
            console.log("Error in Catch in EnterOTP Line 144 ===>", e)
          }
          /***Call getUserProfile Api End */

          store.dispatch({
            type: 'SET_GOOGLEAPI',
            payload: response.data.GoogleMapApiKey,
          });
          store.dispatch({
            type: 'SET_USER_ROLES',
            payload: response.data.scope,
          });
          await setUserProfile();
          await getUserCurrentLatLng();
          await TruncateCheckInCheckoutORSalesOrderTable();

          // Insert All the Data into tables for first Time start
          async function temp() {
            try {
              await TruncateAllTables();
              await outletBeatDump();
              await insertMappingData();
              await insertStockData();
              await insertOutcomeData();
              setTimeout(async () => {
                await insertStockDataIfNotInserted();
              }, 2000)
            } catch (e) {
              toast.show('Something went wrong!, please try again later.', {
                type: 'danger',
                placement: 'bottom',
                duration: 3000,
                offset: 30,
                animationType: 'slide-in',
              });
            }
          }
          temp().then((res) => {
            setLoader(false)
            props.navigation.reset({
              index: 0,
              routes: [{ name: 'NewDashboard' }],
            });
          }).catch((e) => {
            setLoader(false)
            toast.show("Something went wrong!,please try again later", {
              type: 'danger',
              placement: 'bottom',
              duration: 3000,
              offset: 30,
              animationType: 'slide-in',
            });
          })
          // Insert All the Data into tables for first Time end
        } else {
          setLoader(false)
          toast.show(response.message, {
            type: 'danger',
            placement: 'bottom',
            duration: 3000,
            offset: 30,
            animationType: 'slide-in',
          });
        }
      }
    } catch (e) {
      toast.show(e, {
        type: 'danger',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
    }
  };

  async function handleresendapi() {
    let baseurl = await AsyncStorage.getItem('@baseurl')
    try {
      const result = await LoginSendOTP(
        `${baseurl}api/reSentOTP?isd_code=%2B91&phone=${mobileNumber}`,
      );

      if (result.statusCode == 200) {
        toast.show(result.message, {
          type: 'success',
          placement: 'bottom',
          duration: 4000,
          offset: 30,
          animationType: 'slide-in',
        });
        setShow(true);
        setResendT(
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text
              style={{ ...styles.resendtext, top: 12, color: Color.TXTWHITE }}>
              Resend otp in
            </Text>
          </View>,
        );
      } else if (result.statusCode == 400) {
        toast.show(result.message, {
          type: 'danger',
          placement: 'bottom',
          duration: 4000,
          offset: 30,
          animationType: 'slide-in',
        });
      }
    } catch (e) {
      toast.show('Something went wrong, please try again later.', {
        type: 'danger',
        placement: 'bottom',
        duration: 4000,
        offset: 30,
        animationType: 'slide-in',
      });
    }
  }

  function handlefinishcount() {
    setShow(false);
    setResendT(
      <TouchableOpacity onPress={() => handleresendapi()}>
        <Text style={{ ...styles.resendtext, color: themecolor.TXTWHITE }}>
          Resend otp
        </Text>
      </TouchableOpacity>,
    );
  }
  const isDarkMode = (Appearance.getColorScheme() === 'dark')
  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={isDarkMode ? "light-content" : "light-content"}
      />

      {loader ?
        (
          <>
            <LoadingFullScreen style={{ flex: 1 }} />
          </>
        ) : (
          <>
            <ImageBackground
              resizeMode="cover"

              source={
                isDarkMode == 0
                  ? require('../../assets/images/app,intro,splashscreen,login/background.png')
                  : require('../../assets/images/app,intro,splashscreen,login/background-white.png')
              }
              style={{ ...styles.IMGBackStyle, backgroundColor: themecolor.LOGINTHEMECOLOR }}
            >
              <View style={styles.container}>
                <Vegalogo />
                <View style={styles.VerifyText}>
                  {/* <Text style={styles.signintext}>Verify OTP</Text> */}
                  <Text style={{ ...styles.signintextmini, color: themecolor.TXTWHITE }}>
                    We have sent you a OTP to your registered mobile number to verify
                  </Text>
                </View>

                <View style={styles.OTPInputView}>
                  <View style={styles.OTPInputView1}>
                    <View style={styles.WIDTH84}>
                      <OTPInputView
                        code={otpinput}
                        style={styles.OTPVIEWSTYLE}
                        onCodeChanged={code => setOtpinput(code)}
                        pinCount={4}
                        autoFocusOnLoad
                        selectionColor={themecolor.TXTWHITE}
                        codeInputFieldStyle={{ ...styles.underlineStyleBase, backgroundColor: themecolor.OTPBOXCOLOR, color: themecolor.TXTWHITE,}}
                        codeInputHighlightStyle={{...styles.underlineStyleHighLighted}}
                        onCodeFilled={code => {
                          console.log(`Code is ${code}, you are good to go!`);
                        }}
                      
                      />
                    </View>
                  </View>
                  <View style={styles.PV10}>
                    <FullsizeButton
                      backgroundColor={themecolor.HEADERTHEMECOLOR}
                      onPress={handleOtp}
                    />
                    <View
                      style={{
                        alignItems: 'center',
                        height: 35,
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          ...styles.resendtext,
                          top: show ? 0 : 10,
                          color: themecolor.TXTWHITE,
                        }}>
                        {resendT}
                      </Text>
                    </View>
                    <View style={{ justifyContent: 'center', alignSelf: 'center' }}>
                      <TouchableOpacity>
                        <Text
                          style={{
                            ...styles.resendtext,
                            color: themecolor.HEADERTHEMECOLOR,
                          }}>
                          {show && (
                            <>
                              <View style={{ marginVertical: 10 }} />
                              <CountdownCircleTimer
                                isPlaying
                                strokeWidth={4}
                                trailStrokeWidth={4}
                                size={60}
                                duration={15}
                                colors={['#3862f8', '#f2ba3d', '#f53a58', '#0dbf4e']}
                                colorsTime={[15, 7, 5, 0]}>
                                {({ remainingTime }) => (
                                  <Text>
                                    <CountDown
                                      size={14}
                                      digitTxtStyle={{ color: themecolor.TXTWHITE }}
                                      until={15}
                                      onFinish={() => handlefinishcount()}
                                      digitStyle={{ ...styles.CountDownStyle }}
                                      timeToShow={['S']}
                                      timeLabels={{ m: null, s: null }}
                                      showSeparator
                                    />
                                  </Text>
                                )}
                              </CountdownCircleTimer>
                            </>
                          )}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </ImageBackground>
          </>
        )
      }
    </>
  )
}