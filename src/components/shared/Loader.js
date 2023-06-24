import {
  View,
  Image,
} from 'react-native';
import React from 'react';
import styles from '../../assets/css/stylesLoader';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';


const Loader = props => {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  return (
    <>
      <View style={{ ...styles.MainView,backgroundColor:themecolor.THEMECOLOR }}>
        {/* <Image
        style={styles.IMGLOGO}
        source={require('../../assets/images/app,intro,splashscreen,login/saleskraftlogo.png')}
        /> */}

        <Image
          style={styles.IMGGIFLOGO}
          source={require('../../assets/images/dot.gif')}
        />
      </View>
    </>
  );
};

export default Loader;
