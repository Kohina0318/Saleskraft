import React from 'react';
import {
  Dimensions,
  Image,
  StatusBar,
  View,
  StyleSheet,
  Text,
  Appearance
} from 'react-native';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';

const {width, height} = Dimensions.get('window');
const win = Dimensions.get('window');

export default function InternalServerError(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  const isDarkMode = Appearance.getColorScheme() === 'dark';

  const styles = StyleSheet.create({
    MainContainer: {
      flex: 1,
      backgroundColor: themecolor.THEMECOLOR1,
    },
  
    LogoStyle: {
      width: 220,
      height: 220,
      resizeMode: 'contain',
      alignSelf: 'center',
    },
  });
  
 
  return (
    <View style={[styles.MainContainer]}>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      <View style={{flex: 1, justifyContent: 'center'}}>
        <View style={{position: 'relative'}}>
          <Image
            style={{
              width: 500,
              height: 500,
              resizeMode: 'contain',
              alignSelf: 'center',
            }}
            source={require('../../assets/images/server_error.gif')}
          />
          <View
            style={{
              backgroundColor: themecolor.THEMECOLOR1, 
              position: 'absolute',
              bottom: 0,
              width: '100%',
              height: 220,
            }}>
            <Text></Text>
          </View>
          <View>
          <Image
            style={{
              width: 100,
              height: 100,
              resizeMode: 'contain',
              alignSelf: 'center',
              // flex: 1,
            }}
            source={
              isDarkMode == 0
              ? require('../../assets/images/app,intro,splashscreen,login/background.png')
              : require('../../assets/images/app,intro,splashscreen,login/background-white.png')
           
              // require('../../assets/images/app,intro,splashscreen,login/saleskraftlogo.png')
            }
            // ../../assets/images/app,intro,splashscreen,login/saleskraftlogo.png
          />
          </View>
        </View>
      </View>
    </View>
  );
}

