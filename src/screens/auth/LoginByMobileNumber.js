import React, { useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  TextInput,
  StatusBar,
  Appearance,
} from 'react-native';
import Vegalogo from '../../components/shared/Vegalogo';
import FullsizeButton from '../../components/shared/FullsizeButton';
import styles from '../../assets/css/stylesAuth';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import { LoginSendOTP } from '../../repository/auth/AuthRepository';
import { useToast } from 'react-native-toast-notifications';
import Color from '../../components/Theme/ThemeDarkLightColor';
import {
  createMappingTable,
  createOutletsTable,
  createOutletsTypesTable,
  creatCheckinCheckoutTable,
  createPriceBookTable,
  createPrimaryOutletsTable,
  createProductCategoryTable,
  createUnitsTable,
  creatProductsTable,
  createStockTable,
} from '../../helper/SQLite DB/Sqlite';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import LoadingFullScreen from '../SharedScreens/LoadingFullScreen';
import { Colors } from 'react-native-paper';

export default function LoginByMobileNumber(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  const toast = useToast();
  const network = useSelector(state => state.network);
  const [input, setInput] = useState('');
  const [loader, setLoader] = useState(false);


  React.useEffect(() => {
    async function temp() {
      await createProductCategoryTable();
      await creatProductsTable();
      await createOutletsTable(),
        await createMappingTable(),
        await createPrimaryOutletsTable(),
        await createPriceBookTable(),
        await createOutletsTypesTable(),
        await createUnitsTable();
      await createStockTable();
      await creatCheckinCheckoutTable();
    }
    temp();
  }, []);

  const sumbitMobile = async () => {
    try {
      if (input.length === 0) {
        toast.show('Please enter your mobile number.', {
          type: 'warning',
          placement: 'bottom',
          duration: 4000,
          offset: 30,
          animationType: 'slide-in',
        });
      } else if (input.length < 10) {
        toast.show('Please enter valid mobile number.', {
          type: 'warning',
          placement: 'bottom',
          duration: 4000,
          offset: 30,
          animationType: 'slide-in',
        });
      } else {
        if (network) {
          setLoader(true);
          const response = await LoginSendOTP(
            `${props.route.params.url}api/loginwithmobile?isd_code=%2B91&phone=${input}`,
          );
          console.log('response loginSendOTP---->', response);
          if (response == null) {
            setLoader(false);
            toast.show('Something went wrong! ,please try again later.', {
              type: 'danger',
              placement: 'bottom',
              duration: 4000,
              offset: 30,
              animationType: 'slide-in',
            });
          } else if (response.statusCode === 404) {
            setLoader(false);
            toast.show(`invalid url`, {
              type: 'danger',
              placement: 'bottom',
              duration: 4000,
              offset: 30,
              animationType: 'slide-in',
            });
          } else if (response.statusCode === 400) {
            setLoader(false);
            toast.show(`${response.message}`, {
              type: 'danger',
              placement: 'bottom',
              duration: 4000,
              offset: 30,
              animationType: 'slide-in',
            });
          } else if (response.statusCode === 200) {
            setLoader(false);
            toast.show('OTP send successfully.', {
              type: 'success',
              placement: 'bottom',
              duration: 4000,
              offset: 30,
              animationType: 'slide-in',
            });

            await AsyncStorage.setItem('@baseurl', props.route.params.url);
            props.navigation.push('BEnterOTP', { mobileNumber: input });
          }
        } else {
          toast.show('No connection', {
            type: 'danger',
            placement: 'bottom',
            duration: 4000,
            offset: 30,
            animationType: 'slide-in',
          });
        }
      }
    } catch (e) {
      setLoader(false);
      toast.show('Something went wrong! ,please try again later.', {
        type: 'danger',
        placement: 'bottom',
        duration: 4000,
        offset: 30,
        animationType: 'slide-in',
      });
      console.log('Error In SendOTP....LoginByMoileNumber Line 63....', e);
    }
  };

  const isDarkMode = Appearance.getColorScheme() === 'dark';

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={isDarkMode ? 'light-content' : 'light-content'}
      />
      {loader ? (
        <>
          <LoadingFullScreen style={{ flex: 1 }} />
        </>
      ) : (<>
        <ImageBackground
          resizeMode="cover"
          source={
            isDarkMode == 0
              ? require('../../assets/images/app,intro,splashscreen,login/background.png')
              : require('../../assets/images/app,intro,splashscreen,login/background-white.png')
           }
          style={{
            ...styles.IMGBackStyle,
            backgroundColor: themecolor.LOGINTHEMECOLOR,
          }}>
          <View style={{ ...styles.container,  }}>
            <Vegalogo />
            <View style={styles.VerifyText}>
              <Text
                style={{ ...styles.signintextmini, color: themecolor.TXTWHITE }}>
                Please enter your registered mobile number to get sign in to your
                account
              </Text>
            </View>
            <View style={{ ...styles.OTPInputView, }}>
              <View style={{ ...styles.InputMainView,backgroundColor:themecolor.OTPBOXCOLOR, borderColor:themecolor.OTPBOXCOLOR,borderWidth:0.8 }}>
                <View style={styles.InputIcon}>P
                  <SimpleIcon
                    name="screen-smartphone"
                    size={15}
                    color="#4261f7"
                  />
                </View>
                <View style={styles.InputView1}>
                  <TextInput
                    value={input}
                    placeholderTextColor={themecolor.TXTGREYS}
                    placeholder="Enter Mobile number"
                    keyboardType="numeric"
                    maxLength={10}
                    onChangeText={txt => {
                      let temp = '';
                      temp = txt.replace(/[^0-9]/g, '');
                      if (temp.length === 0) {
                        setInput('');
                      } else {
                        setInput(temp);
                      }
                    }}
                    style={{...styles.InputText,color: themecolor.TXTWHITE}}
                    // placeholderStyle={{ fontFamily: 'AnotherFont', color: '#000' }}
                  />
                </View>
              </View>
              <View style={styles.MV15}>
                <FullsizeButton
                  backgroundColor={themecolor.HEADERTHEMECOLOR}
                  onPress={() => sumbitMobile()}
                  title="Send OTP"
                />
              </View>
            </View>
          </View>
        </ImageBackground>
      </>)}
    </>
  );
}
