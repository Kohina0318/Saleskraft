import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  Text,
  Image,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { FontFamily } from '../../assets/fonts/FontFamily';
import { Colors } from '../../assets/config/Colors';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import styles from '../../assets/css/styleProducts';
import NumericInput from 'react-native-numeric-input';
import { useSelector, useDispatch } from 'react-redux';
import { useToast } from "react-native-toast-notifications";
import DummyImage from '../shared/DummyImage';
import { db } from '../../helper/SQLite DB/Sqlite';
import { SERVER_URL } from '../../repository/commonRepository';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { filter } from 'lodash';
import { useFocusEffect, StackActions, useNavigation, useIsFocused, } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import { Value } from 'react-native-reanimated';
const { width, height } = Dimensions.get('screen');


// import { FontSize } from '../../assets/fonts/Fonts';
// import { GetCategories } from '../../../repository/catalogue/productRepository';
// import { getMediaById } from '../../../repository/commonRepository';

function Item({ item, refresh, setRefresh, refresh1, setRefresh1, fromCatalogue, outletId, setServerUrl, serverUrl, allProductData }) {

  const navigation = useNavigation();
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  // console.log("outletId Line 30 ====>", outletId)
  var network = useSelector(state => state.network);
  const primaryDistributor = useSelector(state => state.primaryDistributor);
  const toast = useToast();
  const dispatch = useDispatch();
  const [productDetailsMore, setProductDetailsMore] = React.useState({});
  const [sellingPrice, setSellingPrice] = React.useState('');
  const [maxRetailPrice, setMaxRetailPrice] = React.useState('');
  const [unit, setUnit] = React.useState('');
  const [description, setDecription] = React.useState('');
  const [qty, setQty] = React.useState(0);
  const [stock, setStock] = React.useState(0);
  // const [refresh1, setRefresh1] = React.useState(false);
  const [productImage, setProductImage] = React.useState('')

  const OutletCart = useSelector(state => state.OutletCart);
  const OutletCartRedux = Object.values(OutletCart);
  // var cartReduxQty = OutletCartRedux.filter((itemm) => {
  //   return item.Id == itemm.Id  
  // })
  // console.log("jhgfdsasdfghj,,,>>>",cartReduxQty)

  React.useEffect(() => {
    try {
      const keyExist = OutletCart.hasOwnProperty(item.Id);
      console.log("KeyExist-----------", keyExist)
      if (keyExist) {
        // alert(OutletCart[item.Id].quantity)
        setQty(OutletCart[item.Id].quantity)
      }
    } catch (e) {
      setQty(0);
      setRefresh1(!refresh1)
    }
  }, [])


  const getProductsFromDB = async () => {
    try {
      await db.transaction(async tx => {
        await tx.executeSql(
          `select * from Outlets
                 left join Mapping on Mapping.SecondaryOutletId='${outletId}' AND Mapping.PrimaryOutletId='${primaryDistributor.Id}' 
                 left join PriceBooks on PriceBooks.PricebookId=Mapping.PricebookId AND PriceBooks.ProductId='${item.Id}'
                 left join Products on Products.Id='${item.Id}'
                 left join Units on Units.UnitId='${item.UnitD}'
                 where Outlets.Id='${outletId}'`
          // left join Stock on Stock.ProductId='${item.Id}' AND Stock.OutletId=${primaryDistributor.Id}
          // `select * from Outlets
          //  left join Mapping on Mapping.SecondaryOutletId='${outletId}' 
          //  left join PriceBooks on PriceBooks.PricebookId=Mapping.PricebookId AND PriceBooks.ProductId='${item.Id}'
          //  left join Products on Products.Id='${item.Id}'
          //  left join Units on Units.UnitId='${item.UnitD}'
          //  where Outlets.Id='${outletId}'`
          , [], (tx, results) => {

            var temp = [];
            for (let i = 0; i < results.rows.length; ++i) {
              temp.push(results.rows.item(i));
              console.log("------------+++++++++++++59", results.rows.item(i))
            }
            try {
              setProductDetailsMore(temp[0])
              setSellingPrice(temp[0].SellingPrice);
              setMaxRetailPrice(temp[0].MaxRetailPrice);
              setUnit(temp[0].UnitCode)
              setDecription(temp[0].UnitDescription)
              setStock(temp[0].FreeQty);
            } catch (e) {

            }
            // console.log('Data returned From PriceBooks SQLITE Line 45 in Product Catalogue List -----+====>', temp);
          });
      });
    } catch (e) {
      alert(e);
    }
  }

  const getStockFromDB = async () => {
    try {
      await db.transaction(async tx => {
        await tx.executeSql(
          `Select * from Stock where ProductId='${item.Id}' AND OutletId=${primaryDistributor.Id}`
          , [], (tx, results) => {

            var temp = [];
            for (let i = 0; i < results.rows.length; ++i) {
              temp.push(results.rows.item(i));
            }
            console.log("Stock in ProductCatalogue==========>", temp)
            try {
              setStock(temp[0].FreeQty);
            } catch (e) {
              setStock(0);
            }
            // console.log('Data returned From PriceBooks SQLITE Line 45 in Product Catalogue List -----+====>', temp);
          });
      });
    } catch (e) {
      alert(e);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      getProductsFromDB()
      getStockFromDB()
    }, [])
  )

  const handleAddToCart = (value, item1) => {
    console.log("item1.Id==>", item1.Id, value)
    if (value > 0) {
      setQty(value);
      console.log("Value====", value)
      console.log("sellingPrice====", sellingPrice)
      item1['quantity'] = value;
      item1['sellingPrice'] = sellingPrice;
      item1['maxRetailPrice'] = maxRetailPrice;
      item1['TotalPtr'] = parseFloat(sellingPrice * value).toFixed(2)
      item1['subTotal'] = maxRetailPrice * value;
      item1['ptrMargin'] = (maxRetailPrice - sellingPrice) * value;
      dispatch({ type: 'ADD_OUTLET_CART', payload: [item1.Id, item1] })
      setRefresh(!refresh);
      console.log("ITEM LINE 128", item)
    } else {
      setQty(value);
      dispatch({ type: 'REMOVE_OUTLET_CART', payload: item1.Id })
      setRefresh(!refresh);
    }
    setRefresh1(!refresh1);
  }

 
  useEffect(() => {
    async function temp() {
      const url = await SERVER_URL()
      setServerUrl(url)
    }
    temp()
  }, [])

 
  return (
    <>
      {fromCatalogue ?
        <TouchableOpacity activeOpacity={0.5}
          onPress={() =>
            navigation.push('BeatOutletProductDetail', {
              productDetailsData: item,
              productDetailsMore: productDetailsMore,
              stock: stock,
              qty: qty,
              allProductData: allProductData,
              outletId: outletId,
              setRefresh: setRefresh,
              refresh: refresh
            })
          }
          style={{
            ...styles.CUSTOMERVIEWTO, backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR1, borderWidth: 0.5, alignSelf: 'center', width: width * 0.93,
            borderRadius: 10,
            overflow: 'hidden',
            borderColor: Colors.borderColor,
            borderWidth: 0.5,
            backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR1
          }}>

          <View style={{ ...styles.PW, backgroundColor: themecolor.BOXTHEMECOLOR, }}>
            <View style={{ ...styles.Width2, width: width * 0.2 }}>
              {!network || item.ProductImages == null || item.ProductImages == '' ? (
                <DummyImage width={52} height={52} />
              ) : (
                <Image
                  source={{ uri: `${serverUrl}media?id=${item.ProductImages}` }}
                  style={{ ...styles.ProductImage, backgroundColor: 'transparent' }}
                  resizeMode={'contain'}
                />
              )}
            </View>
            <View style={{ ...styles.Width7, width: width * 0.73, }}>
              <Text style={{ ...styles.HeadText, color: themecolor.TXTWHITE }}>{item.ProductName}</Text>
              {fromCatalogue && sellingPrice != null && maxRetailPrice != null && maxRetailPrice != '' && sellingPrice != "" ? (
                <>
                  <View style={styles.FLEXDIREC1}>
                    <Text style={{ ...styles.RateText, color: themecolor.TXTWHITE }}>
                      PTR : <FAIcon name="rupee" size={10} /> {sellingPrice}
                    </Text>
                    <Text style={{ ...styles.RateText, marginHorizontal: 10, color: themecolor.TXTWHITE }}>
                      MRP : <FAIcon name="rupee" size={10} /> {maxRetailPrice}
                    </Text>
                  </View>
                  {item.PackingQty != null ?
                    (<View style={styles.FLEXDIREC1}>
                      <Text style={{ ...styles.RateText, color: themecolor.TXTWHITE }}>
                        Packing Quantity : {item.PackingQty} {description}
                      </Text>
                    </View>
                    ) : (<></>)}
                </>

              ) : (<></>)}

            </View>
          </View>

          {fromCatalogue ?
            <>
              <View style={styles.border} />

              <View style={styles.NumberInputView}>

                {fromCatalogue ?
                  (
                    <View>
                      <Text style={{ ...styles.AStock, color: themecolor.AV }}>Available stock</Text>
                      <Text style={{ ...styles.RateText, color: themecolor.TXTWHITE }}>
                        {stock}&nbsp;{unit}
                      </Text>
                    </View>
                  ) : (<></>)}

                {fromCatalogue && sellingPrice != null && maxRetailPrice != null && maxRetailPrice != '' && sellingPrice != "" ? (
                  <View style={styles.FLEXDIREC1}>
                    <View style={{ right: 2, padding: 3 }}>
                      {qty == 0 ?
                        <TouchableOpacity onPress={() => handleAddToCart(1, item)} >
                          <View style={{ backgroundColor: themecolor.BOXTHEMECOLOR, width: 72, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', height: 26, borderRadius: 5, borderColor: '#CAD3C8', borderWidth: 0.5 }}>
                            <Text style={{
                              color: themecolor.ICON,
                              fontFamily: FontFamily.PopinsMedium,
                              fontSize: 11,
                              textAlign: "center",
                              top: 2,
                            }}>Add <Entypo name='plus' /></Text>
                          </View>
                        </TouchableOpacity>
                        :
                        <NumericInput
                          containerStyle={{ backgroundColor: themecolor.BOXTHEMECOLOR, borderWidth: 0.5 }}
                          totalWidth={72}
                          totalHeight={25}
                          iconSize={14}
                          value={qty}
                          rounded
                          // onLimitReached={(isMax,msg) =>alert(isMax,msg)}
                          // initValue={0}
                          minValue={0}
                          step={1}
                          valueType="integer"
                          // rounded
                          type="plus-minus"
                          style={{ fontFamily: FontFamily.PopinsMedium, fontSize: 11, }}
                          textColor={themecolor.ICON}
                          iconStyle={{ color: themecolor.ICON }}
                          rightButtonBackgroundColor={themecolor.BOXTHEMECOLOR}
                          leftButtonBackgroundColor={themecolor.BOXTHEMECOLOR}
                          onChange={value => {
                            handleAddToCart(value, item)
                          }
                          }
                        />
                      }
                    </View>
                  </View>
                ) : (<></>)}

              </View>
            </> : <></>}

        </TouchableOpacity>
        :
        <View style={{
          ...styles.CUSTOMERVIEWTO, backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR1, borderWidth: 0.5, alignSelf: 'center', width: width * 0.93,
          borderRadius: 10,
          overflow: 'hidden',
          borderColor: Colors.borderColor,
          borderWidth: 0.5,
          backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR1
        }}>
          <View style={{ ...styles.PW, backgroundColor: themecolor.BOXTHEMECOLOR, }}>
            <View style={{ ...styles.Width2, width: width * 0.2 }}>
              {!network || item.ProductImages == null || item.ProductImages == '' ? (
                <DummyImage width={52} height={52} />
              ) : (
                <Image
                  source={{ uri: `${serverUrl}media?id=${item.ProductImages}` }}
                  style={{ ...styles.ProductImage, backgroundColor: 'transparent' }}
                  resizeMode={'contain'}
                />
              )}
            </View>
            <View style={{ ...styles.Width7, width: width * 0.73, }}>
              <Text style={{ ...styles.HeadText, color: themecolor.TXTWHITE }}>{item.ProductName}</Text>
            </View>
          </View>
        </View>
      }
      <View style={{ marginVertical: 4 }} />
    </>
  );
}

export default function ProductCatalogueList(props) {
  const [serverUrl, setServerUrl] = useState('');

  return (
    <>
      <FlatList
        data={props.data}
        renderItem={({ item, index }) => (
          <Item
            item={item}
            refresh={props.refresh}
            setRefresh={props.setRefresh}
            refresh1={props.refresh1}
            setRefresh1={props.setRefresh1}
            fromCatalogue={props.fromCatalogue}
            outletId={props.outletId}
            serverUrl={serverUrl}
            setServerUrl={setServerUrl}
            allProductData={props.data}
          />
        )}
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
        onEndReached={() => {
          if (props.ProductFilterReduxValueTemp.length > 0) {
            props.handleClickOnDone();
          } else {
            props.getProductsFromDB();
          }
        }}

        ListFooterComponent={() => {
          if (props.isLoading) {
            return (
              <ActivityIndicator color={props.themecolor.TXTWHITE} style={{ margin: 20 }} />
            );
          } else {
            return null;
          }
        }}

      />

    </>
  );
}