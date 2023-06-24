import React from 'react';
import {
  TouchableOpacity,
  View,
  FlatList,
  Text,
  Dimensions,
} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import styles from '../../assets/css/styleStockIn';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';
const { width, height } = Dimensions.get('screen');

function StockINListD({ props, item, setStockInModal,outletId,themecolor }) {
  
  const navigation = useNavigation();

  return (
    <>
      <View style={styles.CUSTOMERdvIEW}>
        <TouchableOpacity activeOpacity={0.5}
          onPress={() =>{ setStockInModal(false); navigation.push('StockInGRN',{ShippingOrderId:item.Soid,outletId:outletId, setStockInModal:setStockInModal})}}
          style={{...styles.CUSTOMERVIEWTO,borderWidth:0.8,backgroundColor:themecolor.RB2,borderColor:themecolor.BOXBORDERCOLORR,}}>

          <View style={styles.NumberInputView}>
            <View
              style={{
                ...styles.Width75,
                justifyContent: 'center',
                alignSelf: 'center',
              }}>
              <View
                style={{ ...styles.FLEXDIREC1, justifyContent: 'space-between' }}>
                <Text style={styles.RateText}>Invoice ID</Text>
                <Text style={{ ...styles.RateTextboldblackCircle ,color:themecolor.TXTWHITE}}>{item.SoNumber != null ? item.SoNumber : ''}</Text>
              </View>
              <View
                style={{ ...styles.FLEXDIREC1, justifyContent: 'space-between' }}>
                <Text style={styles.RateText}>Items</Text>
                <View style={{ ...styles.FLEXDIRECTIONROW }}>
                  <Text style={{ ...styles.RateTextboldblackCircle ,color:themecolor.TXTWHITE}}>{item.InvoiceAmount != null ? item.InvoiceAmount : ''}</Text>
                </View>
              </View>
              <View
                style={{ ...styles.FLEXDIREC1, justifyContent: 'space-between' }}>
                <Text style={styles.RateText}>Invoice date</Text>
                <Text style={{ ...styles.RateTextboldblackCircle,color:themecolor.TXTWHITE }}>
                  {item.ShippingOrderDate != null ? item.ShippingOrderDate : ''}
                </Text>
              </View>

            </View>
          </View>

        </TouchableOpacity>
      </View>
      <View style={styles.MV1} />
    </>
  );
}

function StockINList(props) {

  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  return (
    <>
      <FlatList
        data={props.orderForGRNData}
        renderItem={({ item }) => <StockINListD item={item} props={props} setStockInModal={props.setStockInModal} outletId={props.outletId} themecolor={themecolor}/>}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
      />
    </>
  );
}

export { StockINList };
