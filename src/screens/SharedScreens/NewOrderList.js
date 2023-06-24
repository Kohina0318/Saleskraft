import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
  StatusBar,
  View,
  TouchableOpacity,
  Image,
  Text,
  BackHandler,
  Dimensions
} from 'react-native';
import styles1 from '../../assets/css/styleProducts';
import styles from '../../assets/css/stylesDashboardBA';
import styles2 from '../../assets/css/styleProducts';
import { useToast } from 'react-native-toast-notifications';

import { Picker } from '@react-native-picker/picker';
import stylesV from '../../assets/css/styleTrip';
import Headerstyles from '../../assets/css/styleTrip';
import RBSheet from 'react-native-raw-bottom-sheet';
import { ORDERSDetailsList } from '../../components/order/OrderdetailsData';
import { FlatListSortByOrderList } from '../beat/RBSheetSort';
import Header_2 from '../../components/shared/Header_2';
import { getAllOutletOrders, getOutletOrderFilter } from '../../repository/outlet/OutletRepositoy';
import { useDispatch, useSelector } from 'react-redux';
import { store } from '../../../App';
import { db } from '../../helper/SQLite DB/Sqlite';
import { StackActions, useNavigation, useFocusEffect, useIsFocused } from '@react-navigation/native';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import FIcon from 'react-native-vector-icons/FontAwesome';
import NoData from '../../components/shared/NoData';
import { SharedMethod } from '../../repository/SyncData/SharedMethods';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { DatePickerRange } from '../../components/shared/DatePickerComponent';
import { FontFamily } from '../../assets/fonts/FontFamily';
import FullsizeButton from '../../components/shared/FullsizeButton';
import { gettripLocationApi } from '../../repository/trip/tripRepository';
import { getOrderStatuses, getOutletTypes } from '../../repository/order/OrderRepository';
import { FlatList } from 'react-native';
import { getEmployeeId } from '../../repository/commonRepository';
import moment from 'moment';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import EIcon5 from 'react-native-vector-icons/EvilIcons';
import FIcon5 from 'react-native-vector-icons/FontAwesome5';
import MCCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

// import FIcon from 'react-native-vector-icons/FontAwesome';
import IIcon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../assets/config/Colors';
import { ScrollView } from 'react-native-gesture-handler';

// import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';

const { height, width } = Dimensions.get('screen');

const RenderFun = ({ item, themecolor, navigation }) => {

  console.log("item01==", item)

  return (
    <>
      <View style={{ ...styles2.CUSTOMERdvIEW, }}>
        <View activeOpacity={0.5} style={{ ...styles2.CUSTOMERVIEWTO, borderColor: themecolor.BOXBORDERCOLOR1, backgroundColor: themecolor.BOXTHEMECOLOR }}>
          <View style={styles2.NumberInputView}>
            <View
              style={{
                ...styles2.Width85,
                justifyContent: 'center',
                alignSelf: 'center',
              }}>
              <View
                style={{ ...styles2.FLEXDIREC1, justifyContent: 'space-between' }}>
                <Text style={{ ...styles2.RateText, color: themecolor.TXTWHITE }}>Order no.</Text>
                <Text style={{ ...styles2.RateText, color: themecolor.TXTWHITE }}>
                  {
                    item.OrdOrderNumber != null ? item.OrdOrderNumber : ''
                  }
                </Text>
              </View>
              <View
                style={{ ...styles2.FLEXDIREC1, justifyContent: 'space-between' }}>
                <Text style={{ ...styles2.RateText, color: themecolor.TXTWHITE }}>Order date</Text>
                <Text style={{ ...styles2.RateText, color: themecolor.TXTWHITE }}>
                  {item.OrdOrderDate != null ? item.OrdOrderDate : ''}
                </Text>
              </View>
              <View
                style={{ ...styles2.FLEXDIREC1, justifyContent: 'space-between' }}>
                <Text style={{ ...styles2.RateText, color: themecolor.TXTWHITE }}>Total</Text>
                <Text style={{ ...styles2.RateText, color: themecolor.TXTWHITE }}>
                  <FAIcon name="rupee" size={11} /> {
                    item.OrdOrderTotal != null ? item.OrdOrderTotal : ''
                  }
                </Text>
              </View>
              <View
                style={{ ...styles2.FLEXDIREC1, justifyContent: 'space-between' }}>
                <Text style={{ ...styles2.RateText, color: themecolor.TXTWHITE }}>Order to</Text>
                <Text style={{ ...styles2.RateText, color: themecolor.TXTWHITE }}>

                  {
                    item.FrmOutletName != null ?
                      item.FrmOutletName
                      : ""
                  }
                </Text>
              </View>
              <View
                style={{ ...styles2.FLEXDIREC1, justifyContent: 'space-between' }}>
                <Text style={{ ...styles2.RateText, color: themecolor.TXTWHITE }}>Order From</Text>
                <Text style={{ ...styles2.RateText, color: themecolor.TXTWHITE }}>
                  {
                    item.ToOutletName != null ?
                      item.ToOutletName
                      : ""
                  }

                </Text>
              </View>

              {item.BeatBeatName == null ? <></> :
                <View
                  style={{ ...styles2.FLEXDIREC1, justifyContent: 'space-between' }}>
                  <Text style={{ ...styles2.RateText, color: themecolor.TXTWHITE }}>Beat</Text>
                  <Text style={{ ...styles2.RateText, color: themecolor.TXTWHITE }}>
                    {item.BeatBeatName}

                  </Text>
                </View>
              }
            </View>
          </View>
          <View style={{ ...styles2.border, borderColor: '#F4F4F4' }} />
          <View style={styles2.NumberInputView}>
            <View style={styles2.FLEXDIRECTIONROW}>
              {item.OrdOrderStatus === "Created" ? (
                <>
                  <View style={{ ...styles2.IconCircle, backgroundColor: "#00C46F", borderRadius: 50, margin: 2 }}><MCCIcon name="check" color={Colors.white} size={11} /></View>
                  <Text style={{ ...styles2.RateTextboldOrangeCircle, color: "#00C46F", }}>{item.OrdOrderStatus}</Text>
                </>
              ) : (
                <>
                  <View style={{ ...styles2.IconCircle, backgroundColor: "#F88E3E", borderRadius: 50, margin: 2 }}><MCCIcon name="cart" color={Colors.white} size={11} /></View>
                  <Text style={{ ...styles2.RateTextboldOrangeCircle, color: "#F88E3E" }}>{item.OrdOrderStatus}</Text>
                </>
              )}
            </View>

            <View style={styles2.ModelVideoCenter}>
              <TouchableOpacity onPress={() => navigation.navigate('Orderdetails', { OrderId: item.OrdOrderId })} style={{ ...styles.ViewButton, backgroundColor: themecolor.HEADERTHEMECOLOR, paddingHorizontal: 5, borderRadius: 10, flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ ...styles2.ViewButtonText }}>View more</Text>
                <Text style={{ marginLeft: 5, top: -1 }} ><FAIcon name='long-arrow-right' color={'white'} /></Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <View style={{ marginVertical: 3 }} />
    </>
  )
}

export default function NewOrderList(props) {
  const focused = useIsFocused();
  const toast = useToast();
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch()
  const [allOutletOrders, setAllOutletOrders] = useState([]);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [fromDate1, setFromDate1] = useState('');
  const [toDate1, setToDate1] = useState('');
  const [statuses, setStatuses] = useState({});
  const [statusesKeys, setStatuseskeys] = useState([])
  const [status, setStatus] = useState('');
  const [outType, setOutType] = useState('');
  const [outletTypes, setOutletTypes] = useState([]);
  const [orderRecord, setOrderRecord] = useState([]);
  const [empId, setEmpId] = useState('');

  console.log("isFocused ==", focused);

  const navigation = useNavigation();

  const getOrderStatus = async () => {
    try {
      const result = await getOrderStatuses();
      console.log("1234" + JSON.stringify(result))
      if (result) {
        const teampObj = Object.keys(result);
        setStatuseskeys(teampObj)
        setStatuses(result)
      } else {
        console.log('data not found')
      }
    } catch (err) {
      console.log(err)
    }
  }

  const getOutletTypesData = async () => {
    try {
      const result = await getOutletTypes();
      console.log("uscsajj" + JSON.stringify(result))
      if (result) {
        setOutletTypes(result)
      } else {
        console.log('data not found')
      }
    } catch (err) {
      console.log(err)
    }
  }

  const getOrderRecords = async (fromDate, toDate, empId, orderStat, outType) => {
    try {

      if (empId != '' && orderStat != '' && outType != '') {
        setLoader(true)
        let fromFormatted = moment(fromDate).format('YYYY-MM-DD');
        let toFormatted = moment(toDate).format('YYYY-MM-DD');
        // alert(fromMoment)
        const result = await gettripLocationApi(`api/getOrderList?from_date=${fromFormatted}&to_date=${toFormatted}&employee_id=${empId}&order_status=${orderStat}&outlet_type_id=${outType}`)
        if (result.statusCode == 200) {
          console.log("data of order", result);
          setOrderRecord(result.data);
          setLoader(false)
        }
      } else {
        setLoader(false)
        toast.show(
          `Please fill all the fields`,
          {
            type: 'danger',
            placement: 'bottom',
            duration: 3000,
            offset: 30,
            animationType: 'slide-in',
          },
        );

      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    // alert('hiutyuyutu')
    getOrderStatus();
    getOutletTypesData();
    const employeeid = async () => {
      const empid = await getEmployeeId();
      setEmpId(empid)
    }
    if (status != '' && outType != '') {
      getOrderRecords(fromDate, toDate, empId, status, outType)
    }
    employeeid()
  }, [focused])

  return (<>

    <View style={{ ...styles.bg, backgroundColor: themecolor.THEMECOLOR }}>
      <>
        <StatusBar translucent backgroundColor="transparent" />
        <Header_2 title={"Recent Orders"} Size={20} onPressIcon={() => refRBSheet1.current.open()} onPress={() => {
          //   store.dispatch({ type: 'REMOVE_ORDER_LIST_FILTER_TEMPORARY' })
          //   store.dispatch({ type: 'REMOVE_ORDER_LIST_FILTER' })
          //   setIsDoneVisible(false)
          //   handleBackButtonClick()
          props.navigation.goBack();
        }} />
        <View style={{ marginVertical: 2.5 }} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '94%', alignSelf: 'center' }} >
          <View style={{ width: '47%' }} >
            <View >
              <View>
                <Text style={{ ...stylesV.title, color: themecolor.TXTWHITE }}>From Date</Text>
              </View>

              {/* <Text style={{ fontFamily: FontFamily.PopinsRegular, color: 'black', fontSize: 12 }} >From Date</Text> */}
              <DatePickerRange maximumDate={new Date()} width={'100%'} setDuration={setFromDate} getDate={fromDate} setDateValue={setFromDate1} />

            </View>
          </View>
          <View style={{ width: '47%', overflow: 'hidden' }} >
            <View>
              <Text style={{ ...stylesV.title, color: themecolor.TXTWHITE }}>To Date</Text>
            </View>
            <DatePickerRange maximumDate={new Date()} width={'100%'} setDuration={setToDate} getDate={toDate} setDateValue={setToDate1} />
          </View>
        </View>
        <View style={{ marginVertical: 2.5 }} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '94%', alignSelf: 'center' }} >
          <View style={{ width: '47%', }} >
            <View >
              <View>
                <Text style={{ ...stylesV.title, color: themecolor.TXTWHITE }}>Order Status</Text>
              </View>
              <View
                style={{
                  ...stylesV.textContainer1,
                  backgroundColor: themecolor.BOXTHEMECOLOR,
                  borderColor: themecolor.BOXBORDERCOLOR1,
                  position: 'relative',
                  height: 45
                }}>

                <Picker
                  mode="dropdown"
                  style={{ width: '100%', }}
                  itemStyle={{ height: 20, width: '100%', backgroundColor: themecolor.BOXTHEMECOLOR, }}
                  dropdownIconColor={themecolor.TXTWHITE}
                  selectedValue={status}
                  onValueChange={item => {
                    setStatus(item);
                  }}>
                  <Picker.Item
                    label="Select"
                    style={{ fontWeight: 'bold', color: themecolor.TXTWHITE, fontSize: 12, backgroundColor: themecolor.BOXTHEMECOLOR, }}
                    value=""
                  />
                  {statusesKeys?.map((itm6, index) => {
                    return (
                      <Picker.Item
                        key={index}
                        label={statuses[itm6]}
                        style={{ fontWeight: 'bold', color: themecolor.TXTWHITE, fontSize: 12 }}
                        value={statuses[itm6]}
                      />
                    );
                  })
                  }
                </Picker>
              </View>

            </View>
          </View>
          <View style={{ width: '47%' }} >
            <View >
              <View>
                <Text style={{ ...stylesV.title, color: themecolor.TXTWHITE }}>Outlet Type</Text>
              </View>
              <View
                style={{
                  ...stylesV.textContainer1,
                  backgroundColor: themecolor.BOXTHEMECOLOR,
                  borderColor: themecolor.BOXBORDERCOLOR1,
                  position: 'relative',
                  height: 45
                }}>
                <Picker
                  mode="dropdown"
                  style={{ width: '100%', }}
                  itemStyle={{ height: 20, width: '100%', backgroundColor: themecolor.BOXTHEMECOLOR, }}
                  dropdownIconColor={themecolor.TXTWHITE}
                  selectedValue={outType}
                  onValueChange={item => {
                    setOutType(item);
                  }}>
                  <Picker.Item
                    label="Select"
                    style={{ fontWeight: 'bold', color: themecolor.TXTWHITE, fontSize: 12, backgroundColor: themecolor.BOXTHEMECOLOR, }}
                    value=""
                  />
                  {outletTypes?.map((itm3, index) => {
                    return (
                      <Picker.Item
                        key={index}
                        label={itm3.OutlettypeName}
                        style={{ fontWeight: 'bold', color: themecolor.TXTWHITE, fontSize: 12 }}
                        value={itm3.OutlettypeId}
                      />
                    );
                  })}
                </Picker>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.MV5} />
        <FullsizeButton
          height={45}
          backgroundColor={themecolor.HEADERTHEMECOLOR}
          width={width * 0.94}
          title={'Apply'}
          onPress={() => getOrderRecords(fromDate, toDate, empId, status, outType)}
        />
        <View style={styles.MV3} />
        <View style={{ borderBottomWidth: 1, borderColor: 'lightgrey', width: '96%', alignSelf: 'center' }} />
      </>
      {/* <View style={styles.MV5} /> */}
      {loader ? (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} ><Image
        style={{
          resizeMode: 'contain',
          alignSelf: 'center',
          height: 120,
          alignItems: "center",
        }}
        source={require('../../assets/images/dot.gif')}
      /></View>) : <>
        <FlatList
          data={orderRecord}
          keyExtractor={(_, indx) => indx}
          ListHeaderComponent={<View style={{ marginVertical: 5 }} />}
          ListFooterComponent={<View style={{ marginVertical: 10 }} />}
          renderItem={({ item }) => <RenderFun item={item} themecolor={themecolor} navigation={navigation} />}
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
        />
      </>}
    </View></>
  )
}