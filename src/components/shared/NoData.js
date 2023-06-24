import { Text, View, Dimensions } from 'react-native';
import React from 'react';
import { Colors } from '../../assets/config/Colors';
import { FontFamily } from '../../assets/fonts/FontFamily';
import { FontSize } from '../../assets/fonts/Fonts';
const { height } = Dimensions.get('window');

const NoData = (props) => {
  return (
    <View
      style={{
        height: props.height,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          paddingHorizontal: 15,
          paddingVertical: 8,
          backgroundColor: Colors.green1,
          borderRadius: 15,
          height: 40,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <Text
          style={{
            fontFamily: FontFamily.Popinssemibold,
            fontSize: FontSize.h4,
            color: 'white',
          }}>
          {props.message}
        </Text>
      </View>
    </View>
  );
};

export default NoData;

NoData.defaultProps = {
  height: height - 200,
}