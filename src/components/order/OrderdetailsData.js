import React, { useState } from 'react';
import {
  TouchableOpacity,
  View,
  FlatList,
  Text,
  Image,
  Dimensions
} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { Colors } from '../../assets/config/Colors';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import EIcon5 from 'react-native-vector-icons/EvilIcons';
import FIcon5 from 'react-native-vector-icons/FontAwesome5';
import FIcon from 'react-native-vector-icons/FontAwesome';
import IIcon from 'react-native-vector-icons/Ionicons';
import MCCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../../assets/css/styleProducts';
import stylesC from '../../assets/css/stylesBeat';
import { FontFamily } from '../../assets/fonts/FontFamily';
import StepIndicator from 'react-native-step-indicator';
import DummyImage from '../shared/DummyImage';
import { SERVER_URL } from '../../repository/commonRepository';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
// import MCIcon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('screen');
const labels = ["Ordered", "Confirmed", "Completed"];


// Products List Start
function ProductsListFlatList({ item, props, themecolor }) {
  // const navigation = useNavigation();
  const [imageTemp, setImageTemp] = React.useState(null);
  const [getBaseUrl, setBaseUrl] = React.useState('');
  // const network = useSelector(state => state.network)
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>', item)
  React.useEffect(() => {
    async function temp() {

      try {
        setImageTemp(`${await SERVER_URL()}media?id=${item.Products.ProductImages}`)
      } catch (e) {
        setImageTemp('')
      }
    }
    async function temp1() {
      setBaseUrl(await SERVER_URL());
    }
    temp1();
    temp();
  }, [])


  var isOffline = false;
  try {
    if (item.isOffline == undefined) {
      isOffline = false;
    } else {
      isOffline = true;
    }
  } catch (e) {
    isOffline = false;
  }

  console.log("isOffline", isOffline)

  return (
    <>

      {
        isOffline ?
          (
            <>
              <View style={styles.PLFL}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={styles.TO}
                // onPress={() => navigation.navigate(item.screen)}
                >
                  <View
                    style={styles.PW}>
                    <View style={styles.Width2}>
                      <DummyImage width={50} height={50} />

                    </View>
                    <View style={styles.Width7}>
                      <Text
                        style={styles.PNameText}>
                        {
                          item.ProductName != null ?

                            item.ProductName : ''
                        }
                      </Text>
                      <View style={{ justifyContent: 'space-between', flexDirection: 'row', width: width * 0.7, }}>
                        <Text
                          style={styles.PNameText}>
                          <FAIcon name='rupee' />
                          {item.PTR != null ? item.PTR : ''}&nbsp;x&nbsp;{item.Quantity != null ? item.Quantity : ''}
                        </Text>
                        <Text
                          style={{ ...styles.PNameText, right: 10 }}>
                          <FAIcon name='rupee' /> {
                            item.PTR != null ? item.PTR * item.Quantity : ''
                          }
                        </Text>
                      </View>
                    </View>

                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.MV3} />
            </>
          ) : (
            <>
              {/* <TouchableOpacity
                  activeOpacity={0.5}
                  style={{...styles.TO,alignSelf:'center',borderColor:themecolor.BOXBORDERCOLOR1}} */}
              {/* onPress={() => navigation.navigate(item.screen)} */}

              <TouchableOpacity
                activeOpacity={0.5}
                style={{
                  ...styles.PW, backgroundColor: themecolor.BOXTHEMECOLOR, width: width * 0.94,
                  borderRadius: 10,
                  overflow: 'hidden',
                  borderColor: Colors.borderColor,
                  borderWidth: 0.5, alignSelf: 'center', borderColor: themecolor.BOXBORDERCOLOR1, margin: 2, padding: 5
                }}>

                <View style={{ width: width * 0.2, padding: 2 }}>
                  {item.Products.ProductImages === null || item.Products.ProductImages === "" ? (
                    <DummyImage width={50} height={50} />
                  ) : (
                    <Image source={{ uri: imageTemp }} style={{ width: 50, height: 50,borderRadius:8 }} />
                  )}
                </View>
                <View style={{ width: width * 0.76, }}>
                  <Text
                    style={{ ...styles.PNameText, color: themecolor.TXTWHITE }}>
                    {
                      item.Products != null ?
                        (item.Products.ProductName != null ?
                          item.Products.ProductName : ''
                        ) : ''}
                  </Text>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: width * 0.7, }}>
                    <Text
                      style={{ ...styles.PNameText, color: themecolor.TXTWHITE }}>
                      <FAIcon name='rupee' />
                      {item.Rate != null ? item.Rate : ''}&nbsp;x&nbsp;{item.Qty != null ? item.Qty : ''}
                    </Text>
                    <Text
                      style={{ ...styles.PNameText, color: themecolor.TXTWHITE, }}>
                      <FAIcon name='rupee' /> {
                        item.TotalAmt != null ? item.TotalAmt : ''
                      }
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
              <View style={styles.MV3} />
            </>)
      }
    </>
  );
}

function FlatListProductList(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  return (
    // <FlatList
    //   data={props.productList}
    //   renderItem={({ item }) => <ProductsListFlatList item={item} props={props} themecolor={themecolor} />}
    //   showsVerticalScrollIndicator={false}
    //   scrollEnabled={true}
    // />
    <>
      {props.productList.map((item, index) => <ProductsListFlatList item={item} props={props} themecolor={themecolor} key={index} />)}
    </>
  );
}

// Distributer Card Start
function DistributerCard(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  return (
    // <FlatList
    //   data={props.distributer}
    //   renderItem={({ item }) => (
    //     <DistributerListFlatList item={item} props={props} themecolor={themecolor} />
    //   )}
    //   showsVerticalScrollIndicator={false}
    //   scrollEnabled={false}
    // />
    <>
      {props.distributer.map((item, index) => <DistributerListFlatList item={item} props={props} themecolor={themecolor} key={index} />)}</>
  );
}
function DistributerListFlatList({ item, props, themecolor }) {
  return (
    <>
      <View style={{ ...stylesC.FLMAINViewNew, backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR1, width: width * 0.94 }}>
        <View>
          <View>
            <View style={stylesC.FL1}>
              <Text style={{ ...stylesC.FLHeadText, color: themecolor.TXTWHITE }}>
                {item.OutletName != null ? item.OutletName : ''}
              </Text>
            </View>
          </View>
          <View style={stylesC.FLVIEW}>
            <View style={stylesC.FLVIEW2}>
              <EIcon5 name="user" size={20} color={Colors.bluetheme} />
              <Text style={{ ...stylesC.SmallHeading, color: themecolor.TXTWHITE }}>
                {item.OutletContactName != null ? item.OutletContactName : ''}

              </Text>
            </View>
            <View style={stylesC.MPVIew}>
              <FIcon name="mobile-phone" size={16} color={Colors.bluetheme} />
              <Text style={{ ...stylesC.MobileText, color: themecolor.TXTWHITE }}>
                {item.OutletContactNo != null ? item.OutletContactNo : ''}
              </Text>
            </View>
          </View>
          <View style={stylesC.NEWVIEW82}>
            <FIcon5 name="map-marker-alt" size={14} color={Colors.bluetheme} />
            <Text style={{ ...stylesC.MobileText, color: themecolor.TXTWHITE }}>
              {item.OutletAddress != null ? item.OutletAddress : ''}
            </Text>
          </View>
          {/* <View style={stylesC.NEWVIEW82}>
            <MCIcon name="bookmark" size={18} color={Colors.bluetheme} style={{ right: 2 }} />
            <Text style={{ ...stylesC.MobileTextRight }}>Chanel Category: 
            { item.OutletClassification != null ? item.OutletClassification :''}
            </Text>
          </View> */}

        </View>
      </View>
    </>
  );
}
function CustomerCard(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  return (
    // <FlatList
    //   data={props.customerDetails}
    //   renderItem={({ item }) => (
    //     <CustomerListFlatList item={item} props={props} themecolor={themecolor} />
    //   )}
    //   showsVerticalScrollIndicator={false}
    //   scrollEnabled={false}
    // />
    <>{props.customerDetails.map((item, index) => <CustomerListFlatList item={item} props={props} themecolor={themecolor} key={index} />)}</>
  );
}
function CustomerListFlatList({ item, props, themecolor }) {
  console.log("ITM))", item)
  return (
    <>
      <View style={{ ...stylesC.FLMAINViewNew, backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR1, width: width * 0.94 }}>
        <View>
          <View>
            <View style={stylesC.FL1}>
              <Text style={{ ...stylesC.FLHeadText, color: themecolor.TXTWHITE }}>{
                item.OutletName != null ? item.OutletName : ''
              }-{item.OutletCode != null ? item.OutletCode : ''}</Text>
            </View>
          </View>
          <View style={stylesC.FLVIEW}>
            <View style={stylesC.FLVIEW2}>
              <EIcon5 name="user" size={20} color={Colors.bluetheme} />
              <Text style={{ ...stylesC.SmallHeading, color: themecolor.TXTWHITE }}>{
                item.OutletContactName != null ? item.OutletContactName : ''
              }</Text>
            </View>
            <View style={stylesC.MPVIew}>
              <FIcon name="mobile-phone" size={18} color={Colors.bluetheme} />
              <Text style={{ ...stylesC.MobileText, color: themecolor.TXTWHITE }}>{
                item.OutletContactNo ? item.OutletContactNo : ''
              }</Text>
            </View>
          </View>
          <View style={stylesC.NEWVIEW82}>
            <FIcon5 name="map-marker-alt" size={14} color={Colors.bluetheme} />
            <Text style={{ ...stylesC.MobileText, color: themecolor.TXTWHITE }}>{
              item.OutletAddress != null ? item.OutletAddress : ''
            }</Text>
          </View>
        </View>
      </View>
    </>
  );
}
function StatusCard(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()


  return (
    // <FlatList
    //   data={props.orderStatus}
    //   renderItem={({ item }) => (
    //     <StatusListData item={item} props={props} themecolor={themecolor} />
    //   )}
    //   showsVerticalScrollIndicator={false}
    //   scrollEnabled={false}
    // />
    <>{props.orderStatus.map((item, index) => <StatusListData item={item} props={props} themecolor={themecolor} key={index} />)}</>
  );
}
function StatusListData({ item, props, themecolor }) {
  const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 5,
    stepStrokeCurrentColor: Colors.bluetheme,
    stepStrokeWidth: 2,
    stepStrokeFinishedColor: Colors.bluetheme,
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: Colors.bluetheme,
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: Colors.bluetheme,
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 0,
    currentStepIndicatorLabelFontSize: 0,
    stepIndicatorLabelCurrentColor: Colors.bluetheme,
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 12,
    currentStepLabelColor: themecolor.TXTWHITE,
    labelFontFamily: FontFamily.PopinsMedium,
  }

  const [currentPosition, setCurrentPosition] = useState(0)

  const handleCurrentPosition = () => {
    if (item == "Created") {
      setCurrentPosition(0)
    } else if (item == "Accepted") {
      setCurrentPosition(1)
    } else if (item == "Completed") {
      setCurrentPosition(2)
    } else {
    }
  }

  React.useEffect(() => {
    handleCurrentPosition()
  }, [])


  return (
    <>
      <View style={{ ...styles.CUSTOMERdvIEW, }}>
        <TouchableOpacity activeOpacity={0.5} style={{ ...styles.CUSTOMERVIEWTO, backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR1 }}>
          <View
            style={{
              width: width * 0.9,
              justifyContent: 'center',
              alignSelf: 'center',
              top: 10
            }}>
            <StepIndicator
              customStyles={customStyles}
              labels={labels}
              stepCount={3}
              currentPosition={currentPosition}
            />
          </View>
          <View style={styles.NumberInputView}>


          </View>
        </TouchableOpacity>
      </View>
      <View style={{ marginVertical: 1 }} />
    </>
  );
}
// Status Data End


// Customer_List END
function ORDERSListD({ props, item, outletId, outletType, index, screen, screen1, screenSALES, Innndex }) {

  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  const navigation = useNavigation();
  console.log("itm=== In OrderList>>>>>>>>", item)
  console.log("outletId", outletId)
  console.log("outletType", outletType)
  const [customerDetails, setCustomerDetils] = React.useState('')
  const [isOffline, setIsOffline] = React.useState(false);
  console.log("Innndex===>", Innndex)

  React.useEffect(() => {
    try {
      {
        item.OutletsRelatedByOutletFrom == undefined ?
          setCustomerDetils(item.OutletsRelatedByOutletTo)
          :
          setCustomerDetils(item.OutletsRelatedByOutletFrom)
      }
    } catch (e) {
      console.log("customerDetails......Error", e)
    }
  })
  console.log("customerDetails.....", customerDetails)

  React.useEffect(() => {
    try {
      if (item.isoffline == undefined) {
        setIsOffline(false);
      } else {
        setIsOffline(true);
      }
    } catch (e) {
      setIsOffline(false);
    }
  }, [item])

  console.log("isOffline", isOffline)
  //  console.log("item.OrderNumber",item.OrderNumber)

  return (
    <>
      {isOffline ?
        (
          <>
            <View style={styles.CUSTOMERdvIEW}>
              <TouchableOpacity activeOpacity={0.5} style={{ ...styles.CUSTOMERVIEWTO, borderColor: themecolor.BOXBORDERCOLOR1, backgroundColor: themecolor.BOXTHEMECOLOR}}>
                <View style={styles.NumberInputView}>
                  <View
                    style={{
                      ...styles.Width85,
                      justifyContent: 'center',
                      alignSelf: 'center',
                    }}>
                    <View
                      style={{ ...styles.FLEXDIREC1, justifyContent: 'space-between' }}>

                    </View>
                    <View
                      style={{ ...styles.FLEXDIREC1, justifyContent: 'space-between' }}>
                      <Text style={{...styles.RateText, color: themecolor.TXTWHITE}}>Order no.</Text>
                      <Text style={{ ...styles.RateText , color: themecolor.TXTWHITE}}>
                        {item.OrderId != null ? item.OrderId : ''}
                      </Text>
                    </View>
                    <View
                      style={{ ...styles.FLEXDIREC1, justifyContent: 'space-between' }}>
                      <Text style={{...styles.RateText,  color: themecolor.TXTWHITE}}>Order Date</Text>
                      <Text style={{ ...styles.RateText, color: themecolor.TXTWHITE }}>
                        {item.CreatedDate != null ? moment(item.CreatedDate).format('DD-MM-YYYY  h:mm A') : ''}
                      </Text>
                    </View>

                    <View
                      style={{ ...styles.FLEXDIREC1, justifyContent: 'space-between' }}>
                      <Text style={{...styles.RateText, color: themecolor.TXTWHITE}}>Total</Text>
                      <Text style={{ ...styles.RateText, color: themecolor.TXTWHITE }}>
                        <FAIcon name="rupee" size={11} /> {
                          item.Total != null ? item.Total : ''
                        }
                      </Text>
                    </View>
                    <View
                      style={{ ...styles.FLEXDIREC1, justifyContent: 'space-between' }}>
                      <Text style={{...styles.RateText, color: themecolor.TXTWHITE}}>Customer</Text>
                      <Text style={{...styles.RateText, color: themecolor.TXTWHITE}}>
                        {
                          item.ShipFromName != null ?
                            item.ShipFromName
                            : ""
                        }

                      </Text>
                    </View>
                  </View>
                </View>
                <View style={{ ...styles.border, borderColor: '#F4F4F4' }} />
                <View style={{ ...styles.NumberInputView, overflow: 'hidden' }}>
                  <View style={styles.FLEXDIRECTIONROW}>
                    <IIcon name="cloud-offline-sharp" color={Colors.grey} size={18} />
                  </View>

                  <View style={styles.ModelVideoCenter}>
                    <TouchableOpacity onPress={() => navigation.navigate('Orderdetails', {
                      OrderId: item.OrderId,
                      outletId: outletId,
                      outletType: outletType,
                      index: index, screen: screen,
                      screen1: screen1,
                      screenSALES: screenSALES,

                    })} style={{ ...styles.ViewButton, backgroundColor: 'grey' }}>
                      <Text style={styles.ViewButtonText}>View order</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.MV1} />
          </>
        ) : (
          <>
            <View style={{ ...styles.CUSTOMERdvIEW, }}>
              <TouchableOpacity activeOpacity={0.5} style={{ ...styles.CUSTOMERVIEWTO, borderColor: themecolor.BOXBORDERCOLOR1, backgroundColor: themecolor.BOXTHEMECOLOR }}>
                <View style={styles.NumberInputView}>
                  <View
                    style={{
                      ...styles.Width85,
                      justifyContent: 'center',
                      alignSelf: 'center',
                    }}>
                    <View
                      style={{ ...styles.FLEXDIREC1, justifyContent: 'space-between' }}>
                      <Text style={{ ...styles.RateText, color: themecolor.TXTWHITE }}>Order no.</Text>
                      <Text style={{ ...styles.RateText, color: themecolor.TXTWHITE }}>
                        {
                          item.OrderNumber != null ? item.OrderNumber : ''
                        }
                      </Text>
                    </View>
                    <View
                      style={{ ...styles.FLEXDIREC1, justifyContent: 'space-between' }}>
                      <Text style={{ ...styles.RateText, color: themecolor.TXTWHITE }}>Order date</Text>
                      <Text style={{ ...styles.RateText, color: themecolor.TXTWHITE }}>
                        {item.OrderDate != null ? item.OrderDate : ''}
                      </Text>
                    </View>
                    <View
                      style={{ ...styles.FLEXDIREC1, justifyContent: 'space-between' }}>
                      <Text style={{ ...styles.RateText, color: themecolor.TXTWHITE }}>Total</Text>
                      <Text style={{ ...styles.RateText, color: themecolor.TXTWHITE }}>
                        <FAIcon name="rupee" size={11} /> {
                          item.OrderTotal != null ? item.OrderTotal : ''
                        }
                      </Text>
                    </View>
                    <View
                      style={{ ...styles.FLEXDIREC1, justifyContent: 'space-between' }}>
                      <Text style={{ ...styles.RateText, color: themecolor.TXTWHITE }}>Customer</Text>
                      <Text style={{ ...styles.RateText, color: themecolor.TXTWHITE }}>
                        {
                          item.OutletsRelatedByOutletFrom != null ?
                            item.OutletsRelatedByOutletFrom.OutletName
                            : ""
                        }
                        {
                          item.OutletsRelatedByOutletTo != null ?
                            item.OutletsRelatedByOutletTo.OutletName
                            : ""
                        }
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={{ ...styles.border, borderColor: '#F4F4F4' }} />
                <View style={styles.NumberInputView}>
                  <View style={styles.FLEXDIRECTIONROW}>
                    {item.OrderStatus === "Created" ? (
                      <>
                        <View style={{ ...styles.IconCircle, backgroundColor: "#00C46F", borderRadius: 50, margin: 2 }}><MCCIcon name="check" color={Colors.white} size={11} /></View>
                        <Text style={{ ...styles.RateTextboldOrangeCircle, color: "#00C46F", }}>{item.OrderStatus}</Text>
                      </>
                    ) : (
                      <>
                        <View style={{ ...styles.IconCircle, backgroundColor: "#F88E3E", borderRadius: 50, margin: 2 }}><MCCIcon name="cart" color={Colors.white} size={11} /></View>
                        <Text style={{ ...styles.RateTextboldOrangeCircle, color: "#F88E3E" }}>{item.OrderStatus}</Text>
                      </>
                    )}
                  </View>

                  <View style={styles.ModelVideoCenter}>
                    <TouchableOpacity onPress={() => navigation.navigate('Orderdetails', { OrderId: item.OrderId, outletId: outletId, outletType: outletType, index: index, screen: screen, screen1: screen1, screenSALES: screenSALES })} style={{ ...styles.ViewButton, backgroundColor: themecolor.HEADERTHEMECOLOR }}>
                      <Text style={styles.ViewButtonText}>View order</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ ...styles.MV1, marginVertical: 3 }} />
          </>
        )}
    </>
  );
}
function ORDERSDetailsList(props) {


  return (

    <>
      <FlatList
        data={props.allOutletOrders}
        renderItem={({ item, index }) => (
          <ORDERSListD item={item} props={props} outletId={props.outletId} outletType={props.outletType} index={props.index} screen={props.screen} screen1={props.screen1} Innndex={index}
            screenSALES={props.screenSALES} />
        )}
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
        keyExtractor={(item, index) => index}
        onEndReached={() => {
          //  alert(props.isOffset)
          props.setIsOffset(props.isOffset + 10)
        }}
      />
      {/* </View> */}
    </>);
}
{/*ORDERLISTEND*/ }

// Customer_List END
function PaymentListD({ item, themecolor }) {

  var isOffline = false;
  try {
    if (item.isoffline == undefined) {
      isOffline = false;
    } else {
      isOffline = true;
    }
  } catch (e) {
    isOffline = false;
  }

  return (
    <>
      {isOffline ?
        (
          <>
            <View style={{ ...styles.CUSTOMERdvIEW, }}>
              <TouchableOpacity activeOpacity={0.5} style={{ ...styles.CUSTOMERVIEWTO, }}>
                <View style={styles.NumberInputView}>
                  <View
                    style={{
                      ...styles.Width85,
                      justifyContent: 'center',
                      alignSelf: 'center',
                    }}>
                    <View
                      style={{ ...styles.FLEXDIREC1, justifyContent: 'space-between' }}>
                      <Text style={styles.RateText}>Order no.</Text>
                      <Text style={{ ...styles.RateText }}>
                        {item.OrderId != null ? item.OrderId : ''}
                      </Text>
                    </View>
                    {/* <View
                style={{ ...styles.FLEXDIREC1, justifyContent: 'space-between' }}>
                <Text style={styles.RateText}>Total items</Text>
                <Text style={{ ...styles.RateText }}>
                  {
                    item.OrderQty != null ? item.OrderQty : ""
                  }
                </Text>
              </View> */}
                    <View
                      style={{ ...styles.FLEXDIREC1, justifyContent: 'space-between' }}>
                      <Text style={styles.RateText}>Subtotal</Text>
                      <Text style={{ ...styles.RateText }}>
                        <FAIcon name="rupee" size={11} /> {
                          item.SubTotal != null ? item.SubTotal : ''
                        }
                      </Text>
                    </View>
                    <View
                      style={{ ...styles.FLEXDIREC1, justifyContent: 'space-between' }}>
                      <Text style={styles.RateText}>PTR margin</Text>
                      <Text style={{ ...styles.RateText, color: Colors.green1 }}>
                        <FAIcon name="rupee" size={11} />
                        {
                          item.PTR_margin != null ? item.PTR_margin : ''
                        }
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.border} />
                <View style={styles.NumberInputView}>
                  <View>
                    <Text style={styles.RateTextbold}>Total</Text>
                  </View>

                  <View style={styles.FLEXDIREC1}>
                    <View>
                      <Text style={styles.RateTextbold}>
                        <FAIcon name="rupee" size={11} /> {
                          item.Total != null ? item.Total : ''
                        }
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ marginVertical: 1 }} />
          </>) :
        (
          <>
            <View style={{ ...styles.CUSTOMERdvIEW, }}>
              <TouchableOpacity activeOpacity={0.5} style={{ ...styles.CUSTOMERVIEWTO, backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR1 }}>
                <View style={styles.NumberInputView}>
                  <View
                    style={{
                      ...styles.Width85,
                      justifyContent: 'center',
                      alignSelf: 'center',
                    }}>
                    <View
                      style={{ ...styles.FLEXDIREC1, justifyContent: 'space-between' }}>
                      <Text style={{ ...styles.RateText, color: themecolor.TXTWHITE }}>Order no.</Text>
                      <Text style={{ ...styles.RateText, color: themecolor.TXTWHITE }}>
                        {
                          item.OrderNumber != null ? item.OrderNumber : ''
                        }
                      </Text>
                    </View>
                    <View
                      style={{ ...styles.FLEXDIREC1, justifyContent: 'space-between' }}>
                      <Text style={{ ...styles.RateText, color: themecolor.TXTWHITE }}>Total items</Text>
                      <Text style={{ ...styles.RateText, color: themecolor.TXTWHITE }}>
                        {
                          item.OrderQty != null ? item.OrderQty : ""
                        }
                      </Text>
                    </View>
                    <View
                      style={{ ...styles.FLEXDIREC1, justifyContent: 'space-between' }}>
                      <Text style={{ ...styles.RateText, color: themecolor.TXTWHITE }}>Subtotal</Text>
                      <Text style={{ ...styles.RateText, color: themecolor.TXTWHITE }}>
                        <FAIcon name="rupee" size={11} /> {
                          item.OrderSubtotal != null ? item.OrderSubtotal : ''
                        }
                      </Text>
                    </View>
                    <View
                      style={{ ...styles.FLEXDIREC1, justifyContent: 'space-between' }}>
                      <Text style={{ ...styles.RateText, color: themecolor.TXTWHITE }}>PTR margin</Text>
                      <Text style={{ ...styles.RateText, color: Colors.green1 }}>
                        <FAIcon name="rupee" size={11} />
                        {
                          item.OrderDiscount != null ? item.OrderDiscount : ''
                        }
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
                        <FAIcon name="rupee" size={11} /> {
                          item.OrderTotal != null ? item.OrderTotal : ''
                        }
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ marginVertical: 1 }} />
          </>
        )
      }
    </>
  );
}

export function PaymentDetailsList(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  return (
    // <FlatList
    //   data={props.paymentDetails}
    //   renderItem={({ item }) => <PaymentListD item={item} themecolor={themecolor} />}
    //   showsVerticalScrollIndicator={false}
    //   scrollEnabled={false}
    // />
    <>{props.paymentDetails.map((item, index) => <PaymentListD item={item} themecolor={themecolor} key={index} />)}</>
  );
}
// Products List End
export { PaymentListD, CustomerCard, StatusCard, DistributerCard, FlatListProductList, ORDERSDetailsList };
