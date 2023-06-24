import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Dimensions,
} from 'react-native';
import { FontFamily } from '../../assets/fonts/FontFamily';
import { Colors } from '../../assets/config/Colors';
import Color from '../../components/Theme/ThemeDarkLightColor';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';
const { width } = Dimensions.get('window');


export default function PendingHeader(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  // const [btnnum, setBtnnum] = useState(1);
  // const isDarkMode = Appearance.getColorScheme() === 'dark';
  // const navigation = useNavigation();

  // const handleBackButtonClick = () => {
  //   navigation.goBack();
  // };

  return (
    <View
      style={{
        backgroundColor: themecolor.HEADERTHEMECOLOR,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        height: 50,
        top: -10,
        justifyContent: 'center'
      }}>
      {/* <View
        style={{
          // flex: 0.65,
          height: '50%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 2,
          paddingTop: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <TouchableOpacity
            style={{paddingHorizontal: 10}}
            activeOpacity={1}
            onPress={() => handleBackButtonClick()}>
            <Image
              source={require('../../assets/images/back.png')}
              style={{width: 25, height: 20}}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
          <View>
            <Text
              style={{
                color: 'white',
                marginLeft: 10,
                fontSize: 18,
                fontWeight: '500',
              }}>
              {props.title}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'flex-end',
              justifyContent: 'flex-end',
              flex: 0.95,
            }}>
            <TouchableOpacity activeOpacity={1}>
              <FIcon
                name={'search'}
                size={18}
                color="white"
                style={{right: 15}}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <FIcon name={'filter'} size={18} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View> */}
      <View
        style={{
          // flex: 0.35,
          height: '50%',
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          // backgroundColor:'red'
        }}>
        <TouchableOpacity
          onPress={() => props.setBtnnum(1)}
          style={{
            backgroundColor:
              props.btnnum == 1 ? 'white' : Color.HEADERTHEMECOLOR,
            borderRadius: 15,
            padding: 5,
            width: width / 3.5,
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: props.btnnum == 1 ? Colors.bluetheme : '#FFFFFF',
              fontFamily: FontFamily.PopinsMedium,
              fontSize: 13.5,
            }}>
            Pending
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.setBtnnum(2)}
          style={{
            backgroundColor:
              props.btnnum == 2 ? 'white' : Color.HEADERTHEMECOLOR,
            borderRadius: 15,
            padding: 5,
            width: width / 3.5,
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: FontFamily.PopinsMedium,
              fontSize: 13.5,
              color: props.btnnum == 2 ? Colors.bluetheme : '#FFFFFF',
            }}>
            Approved
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => props.setBtnnum(3)}
          style={{
            backgroundColor:
              props.btnnum == 3 ? 'white' : Color.HEADERTHEMECOLOR,
            borderRadius: 15,
            padding: 5,
            width: width / 3.5,
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: FontFamily.PopinsMedium,
              fontSize: 13.5,
              color: props.btnnum == 3 ? Colors.bluetheme : '#FFFFFF',
            }}>
            Rejected
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
