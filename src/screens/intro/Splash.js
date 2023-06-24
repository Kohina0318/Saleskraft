import React from 'react';
import {Dimensions, Image, StatusBar, View, StyleSheet,AppState} from 'react-native';
import Video from 'react-native-video';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getUserCurrentLatLng,
  getUserScopes,
  SERVER_URL,
} from '../../repository/commonRepository';
import {store} from '../../../App';
import Geocoder from 'react-native-geocoding';
import {getCheckInOutStatus} from '../../repository/outlet/VerifyOutletRepository';
import Color from '../../components/Theme/ThemeDarkLightColor';
import {useSelector} from 'react-redux';
const {width} = Dimensions.get('window');

export default function Splash(props) {
  const apikey = useSelector(state => state.googleAPI);
  const network = useSelector(state => state.network);
  React.useEffect(()=>
   {
      setTimeout(async () => {
        const user = await AsyncStorage.getItem('@user');
        let isFirstTime = await AsyncStorage.getItem('@isFirstTime');
        let googlekey = await AsyncStorage.getItem('@google_key');
        console.log('GOOGLE KEY+++', googlekey);
        let scopes = await getUserScopes();
        var checkInStatus = '';
        var statusCode = '';
        var Purpose = '';

        if (user != null || user != '' || user != undefined) {
          try {
            if (scopes.includes('can_verify_outlet') && network) {
              const res = await getCheckInOutStatus();
              if (res.statusCode != 400) {
                checkInStatus = res.data.data.CheckInStatus;
                statusCode = res.statusCode;
                Purpose = res.data.attechment.some(
                  item => item.Purpose === 'Grooming',
                );
              }
            }
          } catch (e) {
            console.log('Error Line 51++>', e);
          }
        }

        store.dispatch({type: 'SET_USER_ROLES', payload: scopes});
        store.dispatch({type: 'SET_GOOGLEAPI', payload: googlekey});

        if (user != null || user != undefined) {
          await getUserCurrentLatLng();

          if (scopes.includes('can_verify_outlet')) {
            if (statusCode == 200) {
              if (Purpose === false && checkInStatus == 'Checked in') {
                props.navigation.reset({
                  index: '0',
                  routes: [{name: 'Groom'}],
                });
              } else {
                props.navigation.reset({
                  index: '0',
                  routes: [{name: 'NewDashboard'}],
                });
              }
            } else {
              props.navigation.reset({
                index: '0',
                routes: [{name: 'NewDashboard'}],
              });
            }
          } else {
            props.navigation.reset({
              index: '0',
              routes: [{name: 'NewDashboard'}],
            });
          }
        } else if (isFirstTime === null || isFirstTime === undefined) {
          Geocoder.init(`${apikey}`, {language: 'en'});
          props.navigation.reset({
            index: 0,
            routes: [{name: 'ViewPager'}],
          });
        } else {
          if(await SERVER_URL() != null || await SERVER_URL() != undefined){

         
          let t={
            url:`${await SERVER_URL()}`
          }
          console.log("URL+++",t)
          props.navigation.reset({
            index: 0,
            routes: [{name: 'BLoginByMobileNumber',params:t}],
          });
        }else{
          props.navigation.reset({
            index: 0,
            routes: [{name: 'QRScannerNew'}],
          
          }); 
        }
      }
      }, 1000)
   
      return ()=>{
        
      } },[])


  


  return (
    <View
      style={{
        ...styles.MainContainer,
        backgroundColor: Color.Color.THEMECOLOR,
      }}>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      <Video
        source={require('../../assets/images/app,intro,splashscreen,login/dotsbackground-pattern.mp4')}
        style={styles.backgroundVideo}
        muted={true}
        resizeMode={'cover'}
        repeat={true}
        rate={2.0}
        ignoreSilentSwitch={'obey'}
      />
      <Image
        style={{
          width: width * 0.7,
          resizeMode: 'contain',
          alignSelf: 'center',
          flex: 1,
          zIndex: 9999,
        }}
        source={require('../../assets/images/app,intro,splashscreen,login/saleskraftlogo.png')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  Fbottom: {
    width: width,
    bottom: 0,
    position: 'absolute',
    flex: 1,
  },
  LogoStyle: {
    width: 280,
    height: 280,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  LogoBottom: {
    width: 180,
    height: 180,
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
