import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Colors } from '../../assets/config/Colors';
import Color, { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';

const CreateButton = (props) => {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={props.onPress}
      style={{...styles.bottombutton,backgroundColor: themecolor.HEADERTHEMECOLOR}}>
      <Image
        source={require('../../assets/images/addoutlet/add.png')}
        style={styles.bottombuttonimg}
      />
    </TouchableOpacity>
  );
};

export default CreateButton;

const styles = StyleSheet.create({
  bottombuttonimg: {
    justifyContent: 'center',
    alignSelf: 'center',
    height: 20,
    width: 20,
    overflow: 'hidden',
  },
  bottombutton: {
    width: 50,
    height: 50,
    backgroundColor: Colors.bluetheme,
    borderRadius: 100,
    justifyContent: 'center',
    alignSelf: 'flex-end',
    right: 10,
    position: 'absolute',
    bottom: 10,
  },
});
