import React from 'react';
import { TouchableOpacity, View, FlatList, Text, Dimensions } from 'react-native';
import EIcon5 from 'react-native-vector-icons/EvilIcons';
import FIcon5 from 'react-native-vector-icons/FontAwesome5';
import FIcon from 'react-native-vector-icons/FontAwesome';
import MCcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../../assets/config/Colors';
import styles from '../../assets/css/stylesBeat';
import { useNavigation } from '@react-navigation/native';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';
const { width } = Dimensions.get('window');

function Item({ item, props, navigateFrom,themecolor }) {
  console.log('item--->', item);
  console.log('item After getting value--->', item);
  const navigation = useNavigation();

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          navigateFrom == 'RequestMerchandise'
            ? navigation.push('OutletView', {
              item: item,
              beatName: props.beatName,
              beatId: props.beatId,
              navigateFrom: 'Outlets',
            })
            : navigation.push('OutletView', {
              item: item,
              beatName: props.beatName,
              beatId: props.beatId,
              navigateFrom: 'Outlets',
            });
        }}
        style={{
          ...styles.FLMAINView,
          width: width * 0.94,
          alignSelf: 'center',
          backgroundColor:themecolor.BOXTHEMECOLOR,
          borderColor:themecolor.BOXBORDERCOLOR1
        }}>
        <View>
          <View style={{}}>
            <View style={styles.FL1}>
              <Text style={{...styles.FLHeadText,color:themecolor.TXTWHITE}}>
                {item.OutletName} - {item.OutletCode}
              </Text>
              <View
                style={{
                  alignItems: 'flex-end',
                  justifyContent: 'flex-end',
                  position: 'absolute',
                  alignSelf: 'flex-end',
                  width: width * 0.9,
                }}>
                <View style={styles.TagView}>
                  <Text style={styles.TagText}>{item.OutlettypeName}</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.FLVIEW}>
            <View style={styles.FLVIEW2}>
              <EIcon5 name="user" size={20} color={Colors.bluetheme} />
              <Text style={{...styles.SmallHeading,color:themecolor.TXTWHITE}}>{item.OutletContactName}</Text>
            </View>
            <View style={styles.MPVIew}>
              <FIcon name="mobile-phone" size={20} color={Colors.bluetheme} />
              <Text style={{...styles.MobileText,color:themecolor.TXTWHITE}}>{item.OutletContactNo}</Text>

            </View>
          </View>
          <View style={styles.NEWVIEW82}>
            <FIcon5 name="map-marker-alt" size={14} color={Colors.bluetheme} />
            <Text style={{...styles.MobileText,color:themecolor.TXTWHITE}}>{item.OutletAddress}</Text>
          </View>

          <View style={styles.StarVIew}>
            <View style={styles.FLVIEW3}>
              <FIcon name="star" size={14} color={Colors.bluetheme} />
              <Text style={{...styles.MobileText,color:themecolor.TXTWHITE}}>
                Classification: {item.OutletClassification}
              </Text>
            </View>
            <View style={styles.CalendarView}>
              <FIcon5 name="calendar-alt" size={12} color={Colors.bluetheme} />
              <Text style={{...styles.MobileText,color:themecolor.TXTWHITE}}>
                Opening Date: {item.OutletOpeningDate}
              </Text>
            </View>
          </View>

          <View style={styles.DateView}>
            <View style={styles.FLVIEW3}>
              <FIcon5 name="calendar-alt" size={12} color={Colors.bluetheme} />
              <Text style={{...styles.MobileText,color:themecolor.TXTWHITE}}>
                DOB: {item.OutletContactBday}
              </Text>
            </View>
            <View style={styles.RingView}>
              <MCcon name="ring" size={18} color={Colors.bluetheme} />
              <Text style={{...styles.RingText,color:themecolor.TXTWHITE}}>
                Anniversary: {item.OutletContactAnniversary}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <View style={{marginVertical:2}} />
    </>
  );
}

export default function NewOutletList(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  // console.log('props.beatOutlet', props.beatOutlet);
  return (
    <FlatList
      data={props.beatOutlet}
      renderItem={({ item }) => <Item item={item} props={props} themecolor={themecolor} />}
      showsVerticalScrollIndicator={false}
      keyExtractor={item => item.id}
      scrollEnabled={true}
      navigateFrom={props.RequestMerchandise}
    />
  );
}
