import React, { useState } from 'react';
import {
  TouchableOpacity,
  Image,
  StatusBar,
  View,
  Text,
  ScrollView,
  Dimensions,
  FlatList
} from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { Colors } from '../../assets/config/Colors';
import styles from '../../assets/css/styleProducts';
import { FontSize } from '../../assets/fonts/Fonts';
import { FontFamily } from '../../assets/fonts/FontFamily';
import OHeader from '../../components/order/OHeader';
import DummyImage from '../../components/shared/DummyImage';
import { SERVER_URL } from '../../repository/commonRepository';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import NumericInput from 'react-native-numeric-input';
import { useSelector, useDispatch } from 'react-redux';

const { width } = Dimensions.get('screen');

function Item({ item, themecolor, setRefresh, refresh, refresh1, setRefresh1 }) {
  // alert(JSON.stringify(item))
  const dispatch = useDispatch();
  const [qty, setQty] = React.useState(item.quantity);
  const [sellingPrice, setSellingPrice] = React.useState(item.sellingPrice);
  const [maxRetailPrice, setMaxRetailPrice] = React.useState(item.maxRetailPrice);

  const [productImage, setProductImage] = React.useState('')
  const network = useSelector(state => state.network)

  React.useEffect(() => {
    // console.log("(item.ProductImages Line 94=====>", item);
    async function temp() {
      if (network) {
        try {
          if (item.ProductImages == "" || item.ProductImages == null) {
            setProductImage('');
          }
          else {
            setProductImage(`${await SERVER_URL()}media?id=${item.ProductImages}`);
          }
        } catch (e) {
          setProductImage('');
        }
      } else {
        setProductImage('');
      }
    }
    temp()
  }, [])

  const handleAddToCart = (value, item1) => {
    console.log("item1.Id==>", item1.Id, value)
    if (value > 0) {
      setQty(value);
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


  return (
    <>
      {/* <View style={styles.CUSTOMERdvIEW}> */}
      <View style={{ marginVertical: 3 }} />
      <View style={{ ...styles.CUSTOMERVIEWTO, backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR1 }}>
        <View style={styles.TWOView}>
          <View
            style={{ ...styles.PW, left: 5 }}>
            <View style={{ ...styles.Width2 }}>
              {productImage == '' ?
                (
                  <DummyImage width={52} height={52} />
                ) : (
                  <Image
                    source={{ uri: `${productImage}` }}
                    style={{ ...styles.ProductImage }}
                    resizeMode={'contain'} />
                )
              }
            </View>
          </View>
          <View style={{ ...styles.Width7, left: 3 }}>
            <Text style={{ ...styles.HeadText, color: themecolor.TXTWHITE }}>{item.ProductName}</Text>

            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', maxWidth: '100%', }}>
              <View style={{ display: "flex", flexDirection: 'column', justifyContent: 'flex-start', width: '70%', }}>
                <View style={styles.FLEXDIREC1}>
                  <Text style={{ ...styles.RateText, color: themecolor.TXTWHITE }}>
                    PTR : <FAIcon name="rupee" size={10} /> {sellingPrice}
                  </Text>
                </View>

                <View style={{ ...styles.FLEXDIREC1, }}>
                  <Text style={{ ...styles.RateText, color: themecolor.TXTWHITE }}>
                    Total :  <FAIcon name="rupee" size={10} /> {item.TotalPtr}
                  </Text>
                </View>
              </View>
              <View style={{ display: "flex", justifyContent: 'flex-end', right: 5, width: '28%', alignSelf: 'center', }}>
                <NumericInput
                  containerStyle={{ backgroundColor: themecolor.BOXTHEMECOLOR, borderWidth: 0.5 }}
                  totalWidth={68}
                  totalHeight={23}
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
                  style={{ fontFamily: FontFamily.PopinsMedium, }}
                  textColor={themecolor.ICON}
                  iconStyle={{ color: themecolor.ICON }}
                  rightButtonBackgroundColor={themecolor.BOXTHEMECOLOR}
                  leftButtonBackgroundColor={themecolor.BOXTHEMECOLOR}
                  onChange={value => {
                    handleAddToCart(value, item)
                  }
                  }
                />
              </View>
            </View>

            <View style={styles.FLEXDIREC1}>
              <View style={styles.FLEXDIREC1}>
                {/* <View style={styles.NumberInputView2}>
                <Text style={styles.BlueBox}>1x</Text>
              </View> */}
              </View>

            </View>
          </View>
        </View>
      </View>
      {/* </View> */}
      <View style={{ marginVertical: 1 }} />
    </>
  );
}

export default function ConfirmOrder(props) {

  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  const Cart = useSelector(state => state.OutletCart);
  var CartValue = Object.values(Cart);
  // console.log('cart Value in Confirm Order---->', CartValue);
  const [refresh, setRefresh] = React.useState(false);
  const [Total, setTotal] = useState('');
  const [Quantity, setQuantity] = useState('');
  const [ptrMargin, setPTRMargin] = useState('');
  const [subTotal, setSubTotal] = useState('');

  React.useEffect(() => {
    var total = 0;
    var quantity = 0;
    var ptrmargin = 0;
    var subtotal = 0;
    CartValue.map(item => {
      total = parseFloat(total) + parseFloat(item.TotalPtr);
      quantity += item.quantity;
      ptrmargin = (parseFloat(ptrmargin) + parseFloat(item.ptrMargin)).toFixed(2);
      subtotal += item.subTotal;
    });
    setTotal(total);
    setQuantity(quantity);
    setPTRMargin(ptrmargin);
    setSubTotal(subtotal);
  }, [refresh]);

  return (
    <View style={{ ...styles.MainView, backgroundColor: themecolor.THEMECOLOR }}>
      <StatusBar translucent backgroundColor="transparent" />
      <OHeader title={'Cart'} navigateTo={''} Calign="center" />

      {Object.keys(Cart).length > 0 ?
        <>
          <View
            // showsVerticalScrollIndicator={false}
            style={{ ...styles.FullHeight, }}
          >
            <View style={styles.MV} />
            <View style={{ ...styles.FLVIEW, height: '100%' }}>
              <View style={styles.CUSTOMERdvIEW}>
                <View style={{ ...styles.CUSTOMERVIEWTO, backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR1 }}>
                  <View style={styles.NumberInputView}>
                    <View
                      style={{
                        ...styles.Width85,
                        justifyContent: 'center',
                        alignSelf: 'center',
                      }}>
                      <View
                        style={{
                          ...styles.FLEXDIREC1,
                          justifyContent: 'space-between',
                        }}>
                        <Text style={{ ...styles.RateText, color: themecolor.TXTWHITE }}>Subtotal</Text>
                        <Text style={{ ...styles.RateText, color: themecolor.TXTWHITE }}>
                          <FAIcon name="rupee" size={11} /> {subTotal}
                        </Text>
                      </View>
                      <View
                        style={{
                          ...styles.FLEXDIREC1,
                          justifyContent: 'space-between',
                        }}>
                        <Text style={{ ...styles.RateText, color: themecolor.TXTWHITE }}>PTR margin</Text>
                        <Text style={{ ...styles.RateText, color: Colors.green1 }}>
                          <FAIcon name="rupee" size={11} /> {ptrMargin}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.border} />
                  <View style={styles.NumberInputView}>
                    <View>
                      <Text style={{ ...styles.RateTextbold, color: themecolor.TXTWHITE }}>Total</Text>
                    </View>

                    <View style={styles.FLEXDIREC1}>
                      <View>
                        <Text style={{ ...styles.RateTextbold, color: themecolor.TXTWHITE }}>
                          <FAIcon name="rupee" size={11} /> <Text>{Total}</Text>
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={{ marginVertical: 2 }} />

                <FlatList
                  data={CartValue}
                  renderItem={({ item, index }) => (
                    <Item
                      item={item}
                      themecolor={themecolor}
                      setRefresh={setRefresh}
                      refresh={refresh}
                      refresh1={props.route.params.refresh1}
                      setRefresh1={props.route.params.setRefresh1}
                    />
                  )}
                  showsVerticalScrollIndicator={false}
                  scrollEnabled={true}
                />
              </View>
              <View style={{ marginVertical: 13 }} />
            </View>
            <View style={styles.MV50} />
          </View>

          <View style={styles.BottomButton}>
            <TouchableOpacity style={{
              backgroundColor: themecolor.HEADERTHEMECOLOR,
              width: width * 0.92,
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              height: 80, width: width,
            }}
              onPress={() => props.navigation.navigate('ConfirmOrder1', {
                Total: Total,
                ptrMargin: ptrMargin,
                subTotal: subTotal
              })}>

              <View style={styles.NumberInputView}>
                <View>
                  <Text
                    style={{
                      ...styles.AStock,
                      color: Colors.white,
                      fontSize: FontSize.smallText,
                    }}>
                    {Quantity} Quantity
                  </Text>
                  <Text
                    style={{
                      ...styles.RateText,
                      color: Colors.white,
                      fontSize: FontSize.labelText3,
                      fontFamily: FontFamily.Popinssemibold,
                    }}>
                    Total <FAIcon name="rupee" /> {Total}
                  </Text>
                </View>

                <View style={styles.FLEXDIREC1}>
                  <View style={styles.JC}>
                    <Image
                      source={require('../../assets/images/right.png')}
                      style={styles.BackIcon}
                      resizeMode={'contain'}
                    />
                  </View>
                  <View></View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </> :
        <View style={{flex:1, justifyContent: "center", alignItems: 'center', alignSelf: 'center' }}>
         <View >
          <Image source={require('../../assets/images/empcart.jpg')}
            // style={{ width: 100, height: 100 }}
            />
          </View>
          <View style={{marginTop:5}}>
            <Text style={{
              color: themecolor.TXTWHITE,
              textAlign: 'center',
              alignSelf: 'center',
              fontFamily: FontFamily.Popinssemibold,
              fontSize: 20
            }}>Your Cart is Empty!</Text>
          </View>
          <View style={{ top: 5 }}>
            <Text style={{
              color: themecolor.TXTGREYS,
              textAlign: 'center',
              alignSelf: 'center',
              fontFamily: FontFamily.Popinssemibold,
              fontSize: 15
            }}>Looks like you haven't error </Text>
            <Text style={{
              color: themecolor.TXTGREYS,
              textAlign: 'center',
              alignSelf: 'center',
              fontFamily: FontFamily.Popinssemibold,
              fontSize: 15
            }}>anything your cart yet.</Text>
          </View>
        </View>
      }
    </View>
  );
}
