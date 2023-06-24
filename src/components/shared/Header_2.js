import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';
import React,{useState} from 'react';
import styles from '../../assets/css/styleTrip';
import FIcon from 'react-native-vector-icons/FontAwesome';
import Color from '../../components/Theme/ThemeDarkLightColor';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';
const { width } = Dimensions.get('window');

const Header_2 = props => {

  const [showIcon1, setShowIcon1] = useState(props.iconname != '');
  const [showIcon2, setShowIcon2] = useState(props.iconnameplus != '');

  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()

  return (
    <View style={{
      width: width,
      height: props.height,
      // backgroundColor: themecolor.HEADERTHEMECOLOR,
      borderBottomLeftRadius: props.bottomLeftRadius,
      borderBottomRightRadius: props.bottomRightRadius,
      backgroundColor:themecolor.HEADERTHEMECOLOR,
    }}>
      <View style={styles.ThirdViewHeader}>
        <View style={styles.touchview}>
          <TouchableOpacity activeOpacity={0.5} onPress={props.onPress}>
            <Image
              source={require('../../assets/images/back.png')}
              style={styles.BackIcon}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
          <View>
            <Text
              style={{
                ...styles.Text,
                top: 1,
                alignSelf: props.Calign,
                left: 7,
              }}>
              {props.title}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'flex-end',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
         {showIcon1 && <TouchableOpacity onPress={props.onPressIcon}>
            <FIcon
              name={`${props.iconname}`}
              size={props.Size}
              color="white"
              style={{ top: 0, right: 25 }}
            />
          </TouchableOpacity>}
          <View>
            { showIcon2 && <TouchableOpacity onPress={props.onPressIconPlus}>
              <FIcon name={props.iconnameplus} size={props.Size2} style={{ right: 10 }} color="white" />
            </TouchableOpacity>}
          </View>
        </View>
      </View>
    </View>
  );
};

Header_2.defaultProps = {
  iconname: '',
  Size: 20,
  Size2: 20,
  bottomLeftRadius: 15,
  bottomRightRadius: 15,
  height: 90,
  iconnameplus:''
};

export default Header_2;
