import React from 'react';
import {
  TouchableOpacity,
  View,
  FlatList,
  Text,
  Dimensions,
} from 'react-native';
import EIcon5 from 'react-native-vector-icons/EvilIcons';
import FIcon5 from 'react-native-vector-icons/FontAwesome5';
import FIcon from 'react-native-vector-icons/FontAwesome';
import { Colors } from '../../assets/config/Colors';
import styles from '../../assets/css/stylesBeat';
import { useNavigation } from '@react-navigation/native';
const { width } = Dimensions.get('window');
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';

// Action List Start
function Item({ item, props,themecolor }) {
  console.log("item--->", item)
  // console.log("item After getting value--->", item)
  const navigation = useNavigation();

  return (
    <>
      <TouchableOpacity onPress={() => navigation.push('OutletView', {
        item: item,
        beatName: props.beatName,
        beatId: props.beatId,
        navigateFrom: 'AirportRoute'
      })}
        style={{...styles.FLMAINView,backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR1 ,}}>
        <View >
          <View>

            <View
              style={{...styles.FL1, maxWidth:'100%'}}>
              <Text
                style={{...styles.FLHeadText,color:themecolor.TXTWHITE, width:'90%'}}>
                {item.OutletName == null ? 'not available' : item.OutletName} - {item.OutletCode == null  ? 'not available':item.OutletCode}
              </Text>
              <View style={{ alignItems: 'flex-end', justifyContent: 'center', position: 'absolute', alignSelf: 'center', width: width * 0.9, }}>
                <View style={{...styles.TagView,backgroundColor:item.OutlettypeName=='RETAILER' ||item.OutlettypeName =='DEALER' ? 'orange':item.OutlettypeName =='DISTRIBUTOR'? '#4cd137':item.OutlettypeName =='FARMER'|| item.OutlettypeName =='CUSTOMER' ? 'tomato':'#000'}}><Text style={{...styles.TagText,}}>{item.OutlettypeName}</Text></View>
              </View>
            </View>
          </View>
          <View
            style={styles.FLVIEW}>
            <View
              style={styles.FLVIEW2}>
              <EIcon5 name="user" size={20} color={Colors.bluetheme} />
              <Text
                style={{...styles.SmallHeading,color:themecolor.TXTWHITE}}>
                {item.OutletContactName == null ? 'not available':item.OutletContactName}
              </Text>
            </View>
            <View style={styles.MPVIew}>
              <FIcon name="mobile-phone" size={18} color={Colors.bluetheme} />
              <Text
                style={{...styles.MobileText,color:themecolor.TXTWHITE}}>
                {item.OutletContactNo == null ? 'not available':item.OutletContactNo}
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
              {item.OutletAddress == null ?'not available':item.OutletAddress}
            </Text>
          </View>

          <View
            style={styles.StarVIew}>
            <View
              style={styles.FLVIEW3}>
              <FIcon name="star" size={14} color={Colors.bluetheme} />
              <Text
                style={{...styles.MobileText,color:themecolor.TXTWHITE}}>
                Classification: {item.OutletClassification == null ? 'not available':item.OutletClassification}
              </Text>
            </View>
            <View
              style={styles.CalendarView}>
              <FIcon5
                name="calendar-alt"
                size={12}
                color={Colors.bluetheme}
              />
              <Text
                style={{...styles.MobileText,color:themecolor.TXTWHITE}}>
                Opening Date: {item.OutletOpeningDate == null ? 'not available':item.OutletOpeningDate}
              </Text>
            </View>
          </View>

        </View>
      </TouchableOpacity>
    </>
  );

}


export default function BeatOutletsList(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  // console.log("props.beatOutlet", props.beatOutlet)
  return (
    <FlatList
      data={props.beatOutlet}
      renderItem={({ item }) => (
        <Item item={item} props={props} themecolor={themecolor}/>
      )}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item,index) => index}
      scrollEnabled={true}
    />
  );
}
