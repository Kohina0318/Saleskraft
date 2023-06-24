import React, { useEffect } from 'react';
import {
  TouchableOpacity,
  View,
  FlatList,
  Text,
  ActivityIndicator
} from 'react-native';
import { FontFamily } from '../../assets/fonts/FontFamily';
import { FontSize } from '../../assets/fonts/Fonts';
import { Colors } from '../../assets/config/Colors';
import styles from '../../assets/css/styleOutlet';
import { useNavigation } from '@react-navigation/native';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';

function RetailerListFlatList({ item, themecolor }) {

  var navigation = useNavigation()
  const generateColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0');
    return `#${randomColor}`;
  };

  var avatarName = '';
  if (item.OutletName != null) {
    console.log('sssss78777', item.OutletName)
    avatarName = `${(item.OutletName?.slice(0, 1)).toUpperCase()}`;
  }

  return (
    <TouchableOpacity
      key={item.id}
      style={{ ...styles.flatContainer, backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR1 }}
      onPress={() => navigation.push('OutletView', {
        item: item,
        navigateFrom: 'RetailerCustomer'
      })}>
      {/* New portion Start */}
      <View
        style={{
          backgroundColor: generateColor(),
          borderRadius: 30,
          width: 50,
          justifyContent: 'center',
          height: 50,
          flexDirection: 'row',
          alignSelf: 'center',
        }}>
        <Text
          style={{
            alignSelf: 'center',
            color: Colors.white,
            fontSize: FontSize.labelText5,
            fontFamily: FontFamily.Popinssemibold,
            top: 1,
          }}>
          {avatarName}
        </Text>
      </View>
      {/* New portion End */}
      <View style={{ marginLeft: 10 }}>
        <Text numberOfLines={2} ellipsizeMode='tail'
          style={{ ...styles.OUTLATENAMES, color: themecolor.TXTWHITE }}
        >
          {item.OutletName}
        </Text>
        {item.OutletContactName != null && item.OutletContactName != '' &&
          <Text
            numberOfLines={2} ellipsizeMode='tail'
            style={{ ...styles.OUTLATENAMESMINI, color: themecolor.TXTWHITE }}>
            {`${item.OutletContactName}`}
          </Text>
        }
        <Text
          style={{
            fontSize: 12,
            color: '#121327',
            color: themecolor.TXTWHITE
            // marginTop: -1,
          }}>
          {`${item.OutletContactNo}`}
        </Text>
      </View>
    </TouchableOpacity>

  );
}

function FlatListRetailerList(props) {

  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  console.log("props.renderData in RetailerDataList Line 95---->", props.renderData)
  const [refresh, setRefresh] = React.useState(false)

  useEffect(() => {
    setRefresh(!refresh)
  }, [props])

  return (
    <FlatList
      data={props.renderData}
      renderItem={({ item }) => <RetailerListFlatList themecolor={themecolor} item={item} props={props} />}
      showsVerticalScrollIndicator={false}
      scrollEnabled={true}

      onEndReached={
        () => {
          props.fetchAllOutlets();
        }
      }
      ListFooterComponent={() => {
        if (props.isLoading) {
          return <ActivityIndicator color={themecolor.TXTWHITE} style={{ margin: 20 }} />;
        } else {
          return null;
        }
      }}
    />
  );
}


// Retailer List End
export { FlatListRetailerList };