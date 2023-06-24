import React from 'react';
import {
  TouchableOpacity,
  View,
  FlatList,
  Text,
} from 'react-native';
import EIcon5 from 'react-native-vector-icons/EvilIcons';
import FIcon5 from 'react-native-vector-icons/FontAwesome5';
import FIcon from 'react-native-vector-icons/FontAwesome';
import MCcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../../assets/config/Colors';
import styles from '../../assets/css/stylesBeat';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';

// DistributerHorizontalItem List Start
function DistributerHorizontalItem({ item,themecolor }) {
  //   const navigation = useNavigation();
  return (
    <>
      <TouchableOpacity
        // onPress={()=>navigation.navigate('Store1')}
        style={{...styles.FLMAINView,backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR1}}>
        <View >
          <View>

            <View
              style={styles.FL1}>
              <Text
                style={{...styles.FLHeadText,color:themecolor.TXTWHITE}}>
                {item.OutletName != null ? item.OutletName : ''} - {item.OutletCode != null ? item.OutletCode : ''}
              </Text>

            </View>
          </View>
          <View
            style={styles.FLVIEW}>
            <View
              style={styles.FLVIEW2}>
              <EIcon5 name="user" size={24} color={Colors.bluetheme} />
              <Text
                style={{...styles.SmallHeading,color:themecolor.TXTWHITE}}>
                {item.OutletContactName != null ? item.OutletContactName : ''}
              </Text>
            </View>
            <View style={styles.MPVIew}>
              <FIcon name="mobile-phone" size={20} color={Colors.bluetheme} />
              <Text
                style={{...styles.MobileText,color:themecolor.TXTWHITE}}>
                {item.OutletContactNo != null ? item.OutletContactNo : ''}
              </Text>
            </View>
          </View>
          <View
            style={styles.NEWVIEW82}>
            <FIcon5
              name="map-marker-alt"
              size={14}
              color={Colors.bluetheme}
            />
            <Text
              style={{...styles.MobileText,color:themecolor.TXTWHITE}}>
              {item.OutletAddress != null ? item.OutletAddress : ''}
            </Text>
          </View>
          <View
            style={styles.DateView}>
            <View
              style={styles.FLVIEW3}>
              <FIcon5
                name="calendar-alt"
                size={14}
                color={Colors.bluetheme}
              />
              <Text
                style={{...styles.MobileText,color:themecolor.TXTWHITE}}>
                DOB: {item.OutletContactBday}
              </Text>
            </View>
            <View
              style={styles.RingView}>
              <MCcon name="ring" size={20} color={Colors.bluetheme} />
              <Text
                style={{...styles.RingText,color:themecolor.TXTWHITE}}>
                Anniversary: {item.OutletContactAnniversary}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.MV} />
    </>
  );
}


export function DistributerListBeat(props) {

  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()

  return (
    <FlatList
      // data={props.outletData}
      // data={DistributerBeatData}
      data={props.data}
      renderItem={({ item }) => <DistributerHorizontalItem item={item} themecolor={themecolor} />}
      showsVerticalScrollIndicator={false}
      scrollEnabled={false}
    />
  );
}

// Action List End
export {
  DistributerHorizontalItem,
};