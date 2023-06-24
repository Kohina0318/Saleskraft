import React from 'react';
import {
  TouchableOpacity,
  View,
  FlatList,
  Text,
  Dimensions,
  Image,
} from 'react-native';

import EIcon5 from 'react-native-vector-icons/EvilIcons';
import FIcon5 from 'react-native-vector-icons/FontAwesome5';
import FIcon from 'react-native-vector-icons/FontAwesome';
import IIcon from 'react-native-vector-icons/Ionicons';
import MCcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Checkbox } from 'react-native-paper';
import { Colors } from '../../assets/config/Colors';
import { FontFamily } from '../../assets/fonts/FontFamily';
import { FontSize } from '../../assets/fonts/Fonts';
import NumericInput from 'react-native-numeric-input';
import PieChart from 'react-native-pie-chart';
import styles from '../../assets/css/stylesBeat';
import StyleCss from '../../assets/css/stylesDashboardBA';
import { useNavigation } from '@react-navigation/native';
import DummyImage from '../../components/shared/DummyImage';
import { useDispatch, useSelector } from 'react-redux';
import { store } from '../../../App';
import { useToast } from 'react-native-toast-notifications';
import { imgUrlServer } from '../../helper/constant';
import moment from 'moment';
import { SERVER_URL } from '../../repository/commonRepository';
const { width } = Dimensions.get('window');
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';

// const FrequentlyData = [
//   {
//     id: '1',
//     ITEM: 'Nail File small',
//     pic: require('../../assets/images/product/hairbrush.png'),
//     price: '25.45',
//     price1: '82.45',
//   },
//   {
//     id: '2',
//     ITEM: 'Nail File small',
//     pic: require('../../assets/images/product/hairbrush.png'),
//     price: '25.45',
//     price1: '82.45',
//   },
//   {
//     id: '3',
//     ITEM: 'Nail File small',
//     pic: require('../../assets/images/product/hairbrush.png'),
//     price: '25.45',
//     price1: '82.45',
//   },
// ];
// const recentdata = [
//   {
//     id: 1,
//     orderno: 'ORD123',
//     orderdate: '16/02/2022',
//     subtotal: '1600',
//     status: 'Ordered',
//     statuscolor: '#F88E3E',
//     btn: 'view',
//   },
//   {
//     id: 2,
//     orderno: 'ORD124',
//     orderdate: '11/02/2022',
//     subtotal: '2180',
//     status: 'Pending',
//     statuscolor: '#00C46F',
//     btn: 'view',
//   },
// ];
// const VisitH = [
//   {
//     id: 1,
//     name: 'Partho Parekh',
//     date: '12-05-2022',
//     image: require('../../assets/images/profile_user.png'),
//     ClockIn: '11:30 am',
//     ClockOut: '12:30 pm',
//     Amount: '500',
//   },
//   {
//     id: 2,
//     name: 'Chintan Parekh',
//     date: '12-05-2022',
//     image: require('../../assets/images/profile_user.png'),
//     ClockIn: '02:00 pm',
//     ClockOut: '03:40 pm',
//     Amount: '0',
//   },

// ]
const stockdata = [
  {
    id: 1,
    shop: 'Gheli Medicines',
    shoptype: 'cosmetic store',
    name: 'Jaykishan Dabe',
    class: 'B+',
    openingdate: '02 feb 2022',
    address: '1 shangita apartment, Padli,Ahemdabad,Gujraat',
    mobile: '9131372790',
    shopid: 'VEGA#RE01',
    dob: '27 May 1997',
    anniversary: '08 Feb 2019',
    tag: (
      <View style={styles.TagView}>
        <Text style={styles.TagText}>Cosmatic store</Text>
      </View>
    ),
    screen: 'Store1',
  },
  {
    id: 2,
    shop: 'Gheli Medicines',
    shoptype: 'cosmetic store',
    name: 'Jaykishan Dabe',
    class: 'B+',
    openingdate: '02 feb 2022',
    address: '1 shangita apartment, Padli,Ahemdabad,Gujraat',
    mobile: '9131372790',
    shopid: 'VEGA#RE01',
    dob: '27 May 1997',
    anniversary: '08 Feb 2019',
    tag: (
      <View style={styles.TagView1}>
        <Text style={styles.TagText}>Chemist</Text>
      </View>
    ),
    screen: 'Store1',
  },
];
// Action List Start

function ActionHorizontalItem({ item, props }) {
  // console.log('item--->', item);
  // item = Object.entries(item);
  // console.log('item After getting value--->', item);
  const navigation = useNavigation();

  const [type, setType] = React.useState('');
  const [refresh, setRefresh] = React.useState(false);

  React.useEffect(() => {
    props.beatOutletType.map(item1 => {
      if (item1.OutlettypeId == item.OutlettypeId) {
        setType(item1.OutlettypeName);
        setRefresh(!refresh);
      }
    });
  }, []);

  return (
    <>
      <TouchableOpacity
        onPress={() => navigation.navigate('Store1')}
        style={styles.FLMAINView}>
        <View>
          <View>
            <View style={styles.FL1}>
              <Text style={styles.FLHeadText}>
                {/* {item.OutletName} - {item.OutletCode} */}
                {item.shop}
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
                  <Text style={styles.TagText}>{item.shoptype}</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.FLVIEW}>
            <View style={styles.FLVIEW2}>
              <EIcon5 name="user" size={25} color={Colors.bluetheme} />
              <Text style={styles.SmallHeading}>{item.name}</Text>
            </View>
            <View style={styles.MPVIew}>
              <FIcon name="mobile-phone" size={22} color={Colors.bluetheme} />
              <Text style={styles.MobileText}>{item.mobile}</Text>
            </View>
          </View>
          <View style={styles.NEWVIEW82}>
            <FIcon5 name="map-marker-alt" size={18} color={Colors.bluetheme} />
            <Text style={styles.MobileText}>{item.address}</Text>
          </View>

          <View style={styles.StarVIew}>
            <View style={styles.FLVIEW3}>
              <FIcon name="star" size={17} color={Colors.bluetheme} />
              <Text style={styles.MobileText}>
                Classification: {item.class}
              </Text>
            </View>
            <View style={styles.CalendarView}>
              <FIcon5 name="calendar-alt" size={15} color={Colors.bluetheme} />
              <Text style={styles.MobileText}>
                Opening Date: {item.openingdate}
              </Text>
            </View>
          </View>

          <View style={styles.DateView}>
            <View style={styles.FLVIEW3}>
              <FIcon5 name="calendar-alt" size={15} color={Colors.bluetheme} />
              <Text style={styles.MobileText}>DOB: {item.dob}</Text>
            </View>
            <View style={styles.RingView}>
              <MCcon name="ring" size={22} color={Colors.bluetheme} />
              <Text style={styles.RingText}>
                Anniversary: {item.anniversary}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.MV} />
    </>
  );
}
function VisitHList({ item, themecolor }) {
  const [productImage, setProductImage] = React.useState('');
  const [checkoutImage, setCheckoutImage] = React.useState('');
  const navigation = useNavigation();

  var date = '';
  var checkInTime = '';
  var checkOutTime = '';

  //Handling for Date
  try {
    date = item.CreatedAt.split(' ')[0];
  } catch (e) {
    date = '';
  }

  //Handling for CheckInTime
  try {
    var hh = `${item.CheckinTime.split(':')[0]}`;
    var minute = `${item.CheckinTime.split(':')[1]}`;

    if (hh < 12) {
      checkInTime = `${hh}:${minute} Am`;
    } else {
      checkInTime = `${parseInt(hh) - 12}:${minute} Pm`;
    }
    console.log('KKKKKKKKKK=====>', checkInTime);
  } catch (e) {
    checkInTime = '';
  }

  //Handling for CheckOutTime
  try {
    var hh = `${item.CheckoutTime.split(':')[0]}`;
    var minute = `${item.CheckoutTime.split(':')[1]}`;
    if (hh < 12) {
      checkOutTime = `${hh}:${minute} Am`;
    } else {
      checkOutTime = `${parseInt(hh) - 12}:${minute} Pm`;
    }
    console.log('KKKKKKKKKK=====>', checkOutTime);
  } catch (e) {
    checkOutTime = '';
  }

  //Handling for SE profile picture
  React.useEffect(() => {
    try {
      if (
        item.EmployeeRelatedByEmpId.ProfilePicture == null ||
        item.EmployeeRelatedByEmpId.ProfilePicture == ''
      ) {
        setProductImage('');
      } else {
        setProductImage(item.EmployeeRelatedByEmpId.ProfilePicture);
      }
    } catch (e) {
      setProductImage('');
    }
  }, []);

  //Handling for Image During Checkout
  React.useEffect(() => {
    try {
      if (item.CheckoutMedia == null || item.CheckoutMedia == '') {
        setCheckoutImage('');
      } else {
        setCheckoutImage(item.CheckoutMedia);
      }
    } catch (e) {
      setCheckoutImage('');
    }
  }, []);

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() =>
          navigation.push('VisitHistoryMoreDetails', {
            item: item,
          })
        }>
        <View
          style={{
            backgroundColor: '#FFFFFF',
            borderWidth: 0.5,
            borderColor: themecolor.BOXBORDERCOLOR1,
            // alignItems: 'center',
            padding: 10,
            borderRadius: 12,
            backgroundColor: themecolor.BOXTHEMECOLOR,
          }}>
          <View style={StyleCss.returnviewV}>
            <View style={{ ...StyleCss.innerview1, }}>
              <View style={StyleCss.PW}>
                <View style={StyleCss.Width2}>
                  {productImage == '' ? (
                    <DummyImage width={52} height={52} />
                  ) : (
                    <Image
                      source={{ uri: `${imgUrlServer}/${productImage}` }}
                      style={styles.imageStyleVH}
                      resizeMode={'contain'}
                    />
                  )}
                </View>
              </View>
            </View>
            <View style={StyleCss.margin}>
              <Text style={{ ...StyleCss.text1, color: themecolor.TXTWHITE }}>
                {item.EmployeeRelatedByEmpId.FirstName != null
                  ? item.EmployeeRelatedByEmpId.FirstName
                  : ''}{' '}
                {item.EmployeeRelatedByEmpId.LastName != null
                  ? item.EmployeeRelatedByEmpId.LastName
                  : ''}
              </Text>
              <Text style={{ ...StyleCss.textDate, color: themecolor.TXTWHITE }}>{date}</Text>
            </View>
          </View>
          <View style={styles.MV3} />
          <View style={styles.borderLine} />
          {/* <View style={styles.MV3} /> */}
          <View style={{ ...styles.BottoMText, padding: 3 }}>
            <View style={{ ...styles.ALCENTER, }}>
              <Text style={{ ...styles.ClockinTextMain, color: themecolor.TXTWHITE, }}>Clock in</Text>
              <Text style={{ ...styles.ClockinText, color: themecolor.TXTWHITE }}>
                {checkInTime != null ? checkInTime : ''}
              </Text>
            </View>
            {checkOutTime != "" ?
              <View style={{ ...styles.ALCENTER, }}>
                <Text style={{ ...styles.ClockinTextMain, color: themecolor.TXTWHITE }}>Clock out</Text>
                <Text style={{ ...styles.ClockinText, color: themecolor.TXTWHITE }}>
                  {checkOutTime != null ? checkOutTime : ''}
                </Text>
              </View>
              : <></>}

            {/* { item.SalesAmount != null || item.SalesAmount != '' ? 
          (
          <View style={styles.ALCENTER}>
            <Text style={styles.ClockinTextMain}>Order amount</Text>
            <Text
              style={{ ...styles.ClockinText, alignSelf: 'flex-end' }}>
              {
              item.SalesAmount != null ? item.SalesAmount : ''
              }
            </Text>
          </View>
            ):(<></>)} */}
          </View>
          <View style={styles.borderLine} />
        </View>
        <View style={styles.MV3} />
      </TouchableOpacity>
    </>
  );
}
// function  VisitHistoryList(props) {

//   return (
//     <FlatList
//       data={VisitH}
//       renderItem={({item}) => (
//         <VisitHList item={item} props={props} />
//       )}
//       showsVerticalScrollIndicator={false}
//       keyExtractor={item => item.id}
//       scrollEnabled={true}
//     />
//   );
// }
// Action List Start

function ActionHorizontalItem1({ item, props }) {
  //   const navigation = useNavigation();
  return (
    <>
      <View style={styles.FLMAINView}>
        <View>
          <View>
            <View style={styles.FL1}>
              <Text style={styles.FLHeadText}>
                {item.OutletName} - {item.OutletCode}
              </Text>
              {/* <View style={{alignItems:'flex-end',justifyContent:'flex-end',position:'absolute',alignSelf:'flex-end',width:width*0.9}}>{item.tag}</View> */}
            </View>
          </View>
          <View style={styles.FLVIEW}>
            <View style={styles.FLVIEW2}>
              <EIcon5 name="user" size={25} color={Colors.bluetheme} />
              <Text style={styles.SmallHeading}>{item.OutletContactName}</Text>
            </View>
            <View style={styles.MPVIew}>
              <FIcon name="mobile-phone" size={22} color={Colors.bluetheme} />
              <Text style={styles.MobileText}>{item.OutletContactNo}</Text>
            </View>
          </View>
          <View style={styles.NEWVIEW82}>
            <FIcon5 name="map-marker-alt" size={18} color={Colors.bluetheme} />
            <Text style={styles.MobileText}>{item.OutletAddress}</Text>
          </View>

          <View style={styles.StarVIew}>
            <View style={styles.FLVIEW3}>
              <FIcon name="star" size={17} color={Colors.bluetheme} />
              <Text style={styles.MobileText}>
                Classification: {item.OutletClassification}
              </Text>
            </View>
            <View style={styles.CalendarView}>
              <FIcon5 name="calendar-alt" size={15} color={Colors.bluetheme} />
              <Text style={styles.MobileText}>
                Opening Date: {item.OutletOpeningDate}
              </Text>
            </View>
          </View>

          <View style={styles.DateView}>
            <View style={styles.FLVIEW3}>
              <FIcon5 name="calendar-alt" size={15} color={Colors.bluetheme} />
              <Text style={styles.MobileText}>
                DOB: {item.OutletContactBday}
              </Text>
            </View>
            <View style={styles.RingView}>
              <MCcon name="ring" size={22} color={Colors.bluetheme} />
              <Text style={styles.RingText}>
                Anniversary: {item.OutletContactAnniversary}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.MV} />
    </>
  );
}

function FlatListActionList(props) {
  // var temp = Object.values(props.beatOutlet)

  return (
    <FlatList
      // data={temp}
      data={stockdata}
      renderItem={({ item }) => (
        <ActionHorizontalItem item={item} props={props} />
      )}
      showsVerticalScrollIndicator={false}
      keyExtractor={item => item.id}
      scrollEnabled={true}
    />
  );
}

function RecentOrder(props) {

  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()

  const navigation = useNavigation();

  return (
    <View style={{ ...styles.RecentOrderVIew, }}>
      <View>
        <Text style={{ ...styles.RecentText, color: themecolor.TXTWHITE }}>Recent Orders</Text>
      </View>
      <TouchableOpacity
        style={{ ...styles.VIEWALLBUTTON, backgroundColor: themecolor.HEADERTHEMECOLOR }}
        onPress={() =>
          navigation.push('OrderList', {
            outletId: props.outletId,
            outletType: true,
            index: props.index,
            customerDetails: props.customerDetails
          })
        }>
        <Text style={styles.VIEWALLTEXT}>View all</Text>
      </TouchableOpacity>
    </View>
  );
}

function RecentOrderDataView({ props, item, outletItem, customerDetails, themecolor }) {
  const navigation = useNavigation();
  const [isoffline, setIsOffline] = React.useState(false);

  React.useEffect(() => {
    try {
      if (item.isoffline) {
        setIsOffline(true)
      } else {
        setIsOffline(false);
      }
    } catch (e) {
      setIsOffline(false);
    }
  }, [])

  return (
    <>
      {isoffline ?
        (
          <>
            <View style={{ ...styles.MainVIewRound, borderColor: themecolor.BOXBORDERCOLOR1, borderWidth: 0.5 }}>
              <View style={{ ...styles.RecentOrder, backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR1 }}>
                <View style={{ ...styles.RecentOrder41 }}>
                  <View style={{ ...styles.Recent1 }}>
                    <Text style={{...styles.RecentOrderText, color: themecolor.TXTWHITE }}>Order no.</Text>
                    <Text style={{...styles.RecentOrderText, color: themecolor.TXTWHITE }}>
                      {item.OrderId != null ? item.OrderId : ''}
                    </Text>
                  </View>

                  <View style={styles.Recent1}>
                    <Text style={{ ...styles.RecentOrderText, color: themecolor.TXTWHITE }}>Order Date</Text>
                    <Text style={{ ...styles.RecentOrderText, color: themecolor.TXTWHITE }}>
                      {item.CreatedDate != null ? moment(item.CreatedDate).format('DD-MM-YYYY') : ''}
                    </Text>
                  </View>

                  <View style={styles.Recent1}>
                    <Text style={{ ...styles.RecentOrderText, color: themecolor.TXTWHITE }}>Total</Text>
                    <Text style={{...styles.RecentOrderText, color: themecolor.TXTWHITE }}>
                      {item.Total != null ? item.Total : ''}
                    </Text>
                  </View>
                </View>
                <View style={styles.RecentView}>
                  <View>
                    <View style={styles.FLEXDIRECTIONROW}>
                      <IIcon name="cloud-offline-sharp" color={Colors.grey} size={18} />
                    </View>

                  </View>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.push('Orderdetails', {
                        OrderId: item.OrderId,
                        item: outletItem,
                        customerDetails: customerDetails,
                        outletId: outletItem.Id
                      })
                    }
                    style={{ ...styles.ViewButton, backgroundColor: 'grey' }}>
                    <Text style={{ ...styles.ViewButtonText }}>View</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </>

        ) :
        (<>
          <View style={{ ...styles.MainVIewRound, borderColor: themecolor.BOXBORDERCOLOR1, borderWidth: 0.5 }}>
            <View style={{ ...styles.RecentOrder, backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR1 }}>
              <View style={{ ...styles.RecentOrder41 }}>
                <View style={styles.Recent1}>
                  <Text style={{ ...styles.RecentOrderText, color: themecolor.TXTWHITE }}>Order no.</Text>
                  <Text style={{ ...styles.RecentOrderText, color: themecolor.TXTWHITE }}>
                    {item.OrderNumber != null ? item.OrderNumber : ''}
                  </Text>
                </View>
                <View style={styles.Recent1}>
                  <Text style={{ ...styles.RecentOrderText, color: themecolor.TXTWHITE }}>Order date</Text>
                  <Text style={{ ...styles.RecentOrderText, color: themecolor.TXTWHITE }}>
                    {item.OrderDate != null ? item.OrderDate : ''}
                  </Text>
                </View>
                <View style={styles.Recent1}>
                  <Text style={{ ...styles.RecentOrderText, color: themecolor.TXTWHITE }}>Subtotal</Text>
                  <Text style={{ ...styles.RecentOrderText, color: themecolor.TXTWHITE }}>
                    {item.OrderSubtotal != null ? item.OrderSubtotal : ''}
                  </Text>
                </View>
              </View>
              <View style={styles.RecentView}>
                <View>
                  {
                    <>

                      {item.OrderStatus != null ?
                        (

                          <>
                            {item.OrderStatus == 'Created' ?
                              (
                                <View style={styles.FLEXDIRECTIONROW}>
                                  <View style={{
                                    ...styles.IconCircle,
                                    backgroundColor: '#00C46F',
                                    borderRadius: 50,
                                  }}>
                                    <MCcon name="check" color={Colors.white} size={11} />
                                  </View>
                                  <Text style={{
                                    ...styles.StatusColor,
                                    color: '#00C46F',
                                    top: 1,
                                    left: 2,
                                  }}>{item.OrderStatus}</Text>
                                </View>
                              ) : (
                                <View style={styles.FLEXDIRECTIONROW}>
                                  <View
                                    style={{
                                      ...styles.IconCircle,
                                      backgroundColor: '#F88E3E',
                                      borderRadius: 50,
                                    }}>
                                    <MCcon name="cart" color={Colors.white} size={9} />
                                  </View>
                                  <Text
                                    style={{
                                      ...styles.StatusColor,
                                      color: '#F88E3E',
                                      top: 1,
                                      left: 2,
                                    }}>
                                    {item.OrderStatus}
                                  </Text>
                                </View>
                              )}
                          </>
                        ) : (
                          <></>
                        )}

                    </>
                  }
                </View>
                <TouchableOpacity
                  onPress={() =>
                    navigation.push('Orderdetails', {
                      OrderId: item.OrderId,
                      item: outletItem,
                      customerDetails: customerDetails
                    })
                  }
                  style={{ ...styles.ViewButton, backgroundColor: themecolor.HEADERTHEMECOLOR }}>
                  <Text style={{ ...styles.ViewButtonText, }}>View</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </>)
      }
    </>)
}

function RecentOrderData(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  return (
    // <FlatList
    //   data={props.outletRecentOrders}
    //   renderItem={({ item }) => (
    //     <RecentOrderDataView
    //       item={item}
    //       props={props}
    //       outletItem={props.outletItem}
    //       themecolor={themecolor}
    //       customerDetails={props.customerDetails}
    //     />
    //   )}
    //   showsVerticalScrollIndicator={false}
    //   keyExtractor={item => item.id}
    //   scrollEnabled={false}
    //   numColumns={2}
    // />
    <View style={{ flexDirection: 'row' }} >
      {
        props.outletRecentOrders.map((item, indx) => {
          // alert(JSON.stringify(item))
          return (<RecentOrderDataView
            key={indx}
            item={item}
            props={props}
            outletItem={props.outletItem}
            themecolor={themecolor}
            customerDetails={props.customerDetails}
          />)
        })
      }
    </View>
  );
}

function SalesView(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  return (
    <View>
      <View>
        <Text style={{ ...styles.SalesText, color: themecolor.TXTWHITE }}>MTD Sales</Text>
      </View>
      <View style={{ ...styles.SaleView, backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR1 }}>
        <View style={styles.SalesView2}>
          <Text style={{ ...styles.RecentOrderText, color: themecolor.TXTWHITE }}>Total order value</Text>
          <Text style={{ ...styles.SalexTextBig, color: themecolor.ICON }}>
            <FIcon size={18} name="rupee" />{' '}
            {props.dailyMtdSales.TotalOrderValue}
          </Text>
        </View>
        <View style={{ flex: 2, alignItems: 'center' }}>
          <Text style={{ ...styles.RecentOrderText, color: themecolor.TXTWHITE }}>Total order qty</Text>
          <Text style={{ ...styles.SalexTextBig, color: themecolor.ICON }}>
            {props.dailyMtdSales.TotalOrderQty}
          </Text>
        </View>
        <View style={styles.ViewFLex1}>
          <Text style={{ ...styles.RecentOrderText, color: themecolor.TXTWHITE }}>TLS</Text>
          <Text style={{ ...styles.SalexTextBig, color: themecolor.ICON }}>{props.dailyMtdSales.TLS}</Text>
        </View>
      </View>
    </View>
  );
}

function LastMonthSalesView(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  return (
    <View>
      <View>
        <Text style={{ ...styles.SalesText, color: themecolor.TXTWHITE }}>Last 3 month order (L3M)</Text>
      </View>
      <View style={{ ...styles.SaleView, backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR1 }}>
        <View style={styles.SalesView2}>
          <Text style={{ ...styles.RecentOrderText, color: themecolor.TXTWHITE }}>Average order value</Text>
          <Text style={{ ...styles.SalexTextBig, color: themecolor.ICON }}>
            <FIcon size={18} name="rupee" />
            {props.lastThreeMonthOrder.TotalOrderValue}
          </Text>
        </View>
        <View style={{ flex: 2, alignItems: 'center' }}>
          <Text style={{ ...styles.RecentOrderText, color: themecolor.TXTWHITE }}>Average order qty</Text>
          <Text style={{ ...styles.SalexTextBig, color: themecolor.ICON }}>
            {props.lastThreeMonthOrder.TotalOrderQty}
          </Text>
        </View>
        <View style={styles.ViewFLex1}>
          <Text style={{ ...styles.RecentOrderText, color: themecolor.TXTWHITE }}>TLS</Text>
          <Text style={{ ...styles.SalexTextBig, color: themecolor.ICON }}>
            {props.lastThreeMonthOrder.TLS}
          </Text>
        </View>
      </View>
    </View>
  );
}
function ItemCheked({ item, props }) {
  const toast = useToast();
  const dispatch = useDispatch();
  const [imageTemp, setImageTemp] = React.useState(null);
  const [qty, setQty] = React.useState(0);
  console.log('item', item.Qty);

  React.useEffect(() => {
    try {
      if (item.Qty != null || item.Qty != '') {
        setQty(item.Qty);
      } else {
        setQty(0);
      }
    } catch (e) { }
  }, []);

  const FrequentlyOrderedRedux = useSelector(state => state.FrequentlyOrdered);
  const FrequentlyOrderedReduxValue = Object.values(FrequentlyOrderedRedux);

  const handleRadioBox = () => {
    if (qty > 0) {
      if (FrequentlyOrderedReduxValue.includes(item.Products.Id)) {
        store.dispatch({
          type: 'ADD_FREQUENTLY_ORDERED_CHECKBOX_MULTIPLE_ITEM',
          payload: item.Products.Id,
        });
        dispatch({ type: 'REMOVE_OUTLET_CART', payload: item.ProductId });
      } else {
        var obj = {};
        obj['quantity'] = qty;
        obj['sellingPrice'] = item.Rate;
        obj['maxRetailPrice'] = item.Mrp;
        obj['TotalPtr'] = item.Rate * qty;
        obj['subTotal'] = item.Mrp * qty;
        obj['ptrMargin'] = (item.Mrp - item.Rate) * qty;
        dispatch({ type: 'ADD_OUTLET_CART', payload: [item.ProductId, obj] });
        store.dispatch({
          type: 'ADD_FREQUENTLY_ORDERED_CHECKBOX_ITEM',
          payload: [item.Products.Id, item.Products.Id],
        });
      }
    } else {
      toast.show('Please Select Quantity', {
        type: 'warning',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
    }
  };

  const handleAddToCart = (value, item1) => {
    // alert(value);
    setQty(value);
    // if(item.Qty >= item1.Products.PackingQty*value){
    //   setQty(value);
    //   item1['quantity'] = value;
    //   // item1['sellingPrice'] = sellingPrice;
    //   // item1['maxRetailPrice'] = maxRetailPrice;
    //   // item1['TotalPtr'] = sellingPrice * value;
    //   // item1['subTotal'] = maxRetailPrice * value;
    //   // item1['ptrMargin'] = (maxRetailPrice - sellingPrice) * value;
    //   dispatch({type:'ADD_FREQUENTLY_ORDERED_NUMERIC_INPUT', payload: [item1.Products.Id,item1]})

    // }else{
    //   toast.show("No more stock available !", {
    //     type: "danger",
    //     placement: "bottom",
    //     duration: 3000,
    //     offset: 30,
    //     animationType: "slide-in",
    //   });
    // }
  };

  React.useEffect(() => {
    async function temp() {
      try {
        setImageTemp(
          `${await SERVER_URL()}media?id=${item.Products.ProductImages}`,
        );
      } catch (e) {
        setImageTemp('');
      }
    }
    temp();
  }, []);

  return (
    <>
      <TouchableOpacity
        // onPress={() => handleRadioBox()}
        activeOpacity={1}
        style={styles.RadioTView}>
        <View style={styles.WIDTH1}>
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignSelf: 'center',
              }}>
              <Checkbox
                style={{ top: 20 }}
                color={Colors.bluetheme}
                uncheckedColor={Colors.lightgrey}
                onPress={() => handleRadioBox()}
                status={
                  FrequentlyOrderedReduxValue.includes(item.Products.Id)
                    ? 'checked'
                    : 'unchecked'
                }
              />
            </View>
          </View>
        </View>
        <View style={styles.WIDTH6}>
          <View
            style={{
              justifyContent: 'flex-start',
              flex: 1,
              flexDirection: 'row',
            }}>
            {item.Products.ProductImages === null ||
              item.Products.ProductImages === '' ? (
              <DummyImage width={40} height={40} />
            ) : (
              <Image source={{ uri: imageTemp }} style={styles.imageStyle} />
            )}
            <View style={{ paddingHorizontal: 15 }}>
              <Text style={styles.title}>{item.Products.ProductName}</Text>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ ...styles.title1, fontSize: FontSize.small }}>
                  PTR: <FIcon name="rupee" size={10} color={'black'} />{' '}
                  <Text style={{ color: '#000' }}>{item.Rate}</Text>
                </Text>
                <Text
                  style={{ ...styles.title1, fontSize: FontSize.small, left: 5 }}>
                  MRP: <FIcon name="rupee" size={10} color={'black'} />{' '}
                  <Text style={{ color: '#000' }}>{item.Mrp}</Text>
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.WIDTH22}>
          <View>
            <NumericInput
              containerStyle={{ backgroundColor: 'white', borderWidth: 0.5 }}
              inputStyle={{
                borderLeftColor: 'white',
                borderRightColor: 'white',
                fontSize: FontSize.labelText2,
                fontFamily: FontFamily.PopinsMedium,
                top: 2,
              }}
              totalWidth={80}
              totalHeight={25}
              iconSize={14}
              value={parseInt(item.Qty)}
              step={1}
              minValue={1}
              valueType="real"
              rounded
              type="plus-minus"
              style={{ fontFamily: FontFamily.Popinssemibold }}
              textColor={Colors.bluetheme}
              iconStyle={{ color: Colors.grey }}
              rightButtonBackgroundColor="#FFF"
              leftButtonBackgroundColor="#FFF"
              onChange={value => setQty(value)}
            />
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.borderBottom} />
    </>
  );
}

function CustomerClassifiedGraph(props) {
  let chartBarHeight = [200, 250, 425, 359, 400];
  let chartBarHeightIncentive = [3850, 100, 20000, 250];
  const widthAndHeight = 160;
  const series = [72, 28];
  const sliceColor = ['#1678C8', '#2699FB'];
  return (
    <View
      style={{
        backgroundColor: Colors.white,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.borderColor,
      }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View
          style={{
            flex: 1,
            padding: 10,
            position: 'relative',
            marginTop: 20,
          }}>
          <Text
            style={{
              position: 'absolute',
              zIndex: 9999,
              color: '#FFFEFB',
              left: 20,
              top: 60,
              fontSize: 12,
              fontFamily: FontFamily.PopinsMedium,
            }}>
            <FIcon name="rupee" size={10} /> 26,500
          </Text>
          <PieChart
            widthAndHeight={widthAndHeight}
            series={series}
            sliceColor={sliceColor}
          />
          <Text
            style={{
              position: 'absolute',
              zIndex: 9999,
              color: '#FFFEFB',
              bottom: 60,
              right: 41,
              fontSize: 12,
              fontFamily: FontFamily.PopinsMedium,
            }}>
            {' '}
            <FIcon name="rupee" size={10} /> 23,850
          </Text>
        </View>
        <View style={{ flex: 1, marginTop: 20 }}>
          <View>
            <Text
              style={{
                color: Colors.bluetheme,
                fontFamily: FontFamily.Popinsbold,
              }}>
              Target: 50,000
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={{
                height: 13,
                width: 13,
                backgroundColor: '#2699FB',
                fontFamily: FontFamily.PopinsRegular,
              }}
            />
            <Text
              style={{
                marginLeft: 5,
                fontFamily: FontFamily.PopinsRegular,
                fontSize: 10,
                color: Colors.black,
              }}>
              Achievment : <FIcon name="rupee" size={10} /> 23,850
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={{
                height: 13,
                width: 13,
                backgroundColor: '#1678C8',
                fontFamily: FontFamily.PopinsRegular,
              }}
            />
            <Text
              style={{
                marginLeft: 5,
                fontFamily: FontFamily.PopinsRegular,
                fontSize: 10,
                color: Colors.black,
              }}>
              Pending : <FIcon name="rupee" size={10} /> 26,150
            </Text>
          </View>
        </View>
      </View>
      <View>
        <Text style={{ marginLeft: 10, color: Colors.black, fontSize: 12 }}>
          Visit order History
        </Text>
      </View>
      <View>
        <View
          style={{
            ...styles.customChart,
            justifyContent: 'space-evenly',
          }}>
          <View
            style={{
              width: '27%',
              alignItems: 'center',
              alignSelf: 'flex-end',
            }}>
            <View>
              <Text>{chartBarHeightIncentive[0]}</Text>
            </View>
            <View
              style={{
                width: 25,
                height: chartBarHeightIncentive[0] / 300,
                backgroundColor: '#F45831',
                borderBottomWidth: 0.5,
              }}
            />
            <View style={{ marginTop: 10 }}>
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: 'bold',
                  fontFamily: FontFamily.PopinsMedium,
                  color: Colors.black,
                }}>
                12 feb
              </Text>
            </View>
          </View>
          <View
            style={{
              width: '27%',
              alignItems: 'center',
              alignSelf: 'flex-end',
            }}>
            <View>
              <Text>{chartBarHeightIncentive[1]}</Text>
            </View>
            <View
              style={{
                width: 25,
                height: chartBarHeightIncentive[1] / 300,
                backgroundColor: '#F45831',
                borderBottomWidth: 0.5,
              }}
            />
            <View style={{ marginTop: 10 }}>
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: 'bold',
                  fontFamily: FontFamily.PopinsMedium,
                  color: Colors.black,
                }}>
                19 feb
              </Text>
            </View>
          </View>
          <View
            style={{
              width: '27%',
              alignItems: 'center',
              alignSelf: 'flex-end',
            }}>
            <View>
              <Text>{chartBarHeightIncentive[2]}</Text>
            </View>
            <View
              style={{
                width: 25,
                height: chartBarHeightIncentive[2] / 300,
                backgroundColor: '#F45831',
                borderBottomWidth: 0.5,
              }}
            />
            <View style={{ marginTop: 10 }}>
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: 'bold',
                  fontFamily: FontFamily.PopinsMedium,
                  color: Colors.black,
                }}>
                23 feb
              </Text>
            </View>
          </View>
          <View
            style={{
              width: '27%',
              alignItems: 'center',
              alignSelf: 'flex-end',
            }}>
            <View>
              <Text>{chartBarHeightIncentive[3]}</Text>
            </View>
            <View
              style={{
                width: 25,
                height: chartBarHeightIncentive[3] / 300,
                backgroundColor: '#F45831',
                borderBottomWidth: 0.5,
              }}
            />
            <View style={{ marginTop: 10 }}>
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: 'bold',
                  fontFamily: FontFamily.PopinsMedium,
                  color: Colors.black,
                }}>
                28 feb
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
          }}>
          <Text
            style={{
              height: 14,
              width: 14,
              backgroundColor: '#F45831',
              fontFamily: FontFamily.PopinsRegular,
            }}
          />
          <Text
            style={{
              marginLeft: 5,
              fontFamily: FontFamily.PopinsRegular,
              fontSize: 10,
              color: Colors.black,
            }}>
            Order Value
          </Text>
        </View>
      </View>
    </View>
  );
}

function FrequentlyOrderItems(props) {
  return (
    <FlatList
      data={props.frequentlyOrder}
      renderItem={({ item }) => <ItemCheked item={item} props={props} />}
      keyExtractor={item => item.id}
    />
  );
}

export function FlatListActionList1(props) {
  return (
    <FlatList
      data={props.outletData}
      renderItem={({ item }) => <ActionHorizontalItem1 item={item} />}
      showsVerticalScrollIndicator={false}
      scrollEnabled={true}
    />
  );
}

// Action List End

/*Visit History Start*/


// function VisitHList({ item }) {
//   return (
//     <>
//     <View style={{ backgroundColor: '#FFFFFF',
//     borderWidth: 1,
//     borderColor: Colors.borderColor,
//     // alignItems: 'center',
//     padding: 10,
//     borderRadius: 12,}}>
//       <View style={StyleCss.returnviewV}>
//           <View style={{...StyleCss.innerview1}}>
//              <Image source={item.image} style={styles.imageStyleVH}/>
//           </View>
//           <View style={StyleCss.margin}>
//               <Text style={StyleCss.text1}>{item.name}</Text>
//               <Text style={StyleCss.textDate}>{item.date}</Text>
//           </View>

//       </View>
//       <View style={styles.MV3} />
//       <View style={styles.borderLine} />
//       <View style={styles.MV3} />
//       <View style={styles.BottoMText}>
//               <View style={styles.ALCENTER}>
//                 <Text style={styles.ClockinTextMain}>Clock in</Text>
//                 <Text
//                 style={styles.ClockinText}>
//                  {item.ClockIn}
//                 </Text>
//               </View>
//               <View style={styles.ALCENTER}>
//                 <Text style={styles.ClockinTextMain}>Clock out</Text>
//                 <Text
//                  style={styles.ClockinText}>
//                   {item.ClockOut}
//                 </Text>
//               </View>
//               <View style={styles.ALCENTER}>
//                 <Text style={styles.ClockinTextMain}>Order amount</Text>
//                 <Text
//                  style={{...styles.ClockinText,alignSelf:'flex-end'}}>
//                   {item.Amount}
//                 </Text>
//               </View>
//             </View>

//       </View>
//       <View style={styles.MV3} />
//       </>
//   )
// }

function VisitHistoryList(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  return (
    <FlatList
      // data={VisitH}
      data={props.data}
      renderItem={({ item }) => <VisitHList item={item} props={props} themecolor={themecolor} />}
      showsVerticalScrollIndicator={false}
      keyExtractor={item => item.id}
      scrollEnabled={true}
      ListFooterComponent={<View style={{ height: 80 }}></View>}
    />
  );
}

/*Visit History End */


export {
  FlatListActionList,
  RecentOrder,
  RecentOrderData,
  SalesView,
  LastMonthSalesView,
  FrequentlyOrderItems,
  CustomerClassifiedGraph,
  VisitHistoryList,
};
