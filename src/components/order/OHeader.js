import { Text, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import React from 'react';
import styles from '../../assets/css/styleProducts';
import { useNavigation } from '@react-navigation/native';
const { width } = Dimensions.get('screen');
import { Colors } from '../../assets/config/Colors';
import { FontSize } from '../../assets/fonts/Fonts';
import { FontFamily } from '../../assets/fonts/FontFamily';
import  { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';

export default function Header(props) {

  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()

  const navigation = useNavigation()
  var navigate = ''
  try {
    navigate = props.navigateTo
  } catch (e) {
    navigate = ''
  }

  return (
    <View style={{
      width: width,
      height: 90,
      backgroundColor: themecolor.HEADERTHEMECOLOR,
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15,
    }}>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        padding: 15,
        flex: 1,
        width: width,
        alignSelf: 'center',
      }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 2,
        }}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigate == '' ? navigation.goBack() : props.backFunction()}>
            <Image
              source={require('../../assets/images/back.png')}
              style={styles.BackIcon}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
          <View style={{ padding: 4 }}>
            <Text style={{
              fontSize: FontSize.labelText5,
              fontFamily: FontFamily.PopinsMedium,
              color: Colors.white, top: 3, alignSelf: props.Calign
            }}>{props.title}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

