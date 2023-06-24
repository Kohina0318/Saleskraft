import { View, Image } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../Theme/ThemeDarkLightColor';

export default function NoReportImage(props) { 
  return (
    <View>
      <Image
        source={require('../../assets/images/noreportfound.png')}
        style={{ alignSelf: 'center', width: props.width, height: props.height }}
        resizeMode={'contain'}
      />
    </View>
  );
}
