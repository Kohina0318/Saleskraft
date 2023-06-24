import {
   View,
   Dimensions, Text, FlatList, TextInput, TouchableOpacity, Image
} from 'react-native';
import React from 'react';
import styles from '../../assets/css/styleCalls';
import FIcon5 from 'react-native-vector-icons/FontAwesome5';
import EIcon5 from 'react-native-vector-icons/EvilIcons';
import FIcon from 'react-native-vector-icons/FontAwesome';
import { Colors } from '../../assets/config/Colors';
import { FontFamily } from '../../assets/fonts/FontFamily';
import { FontSize } from '../../assets/fonts/Fonts';
import moment from 'moment';
const { width } = Dimensions.get('screen');
import { MyThemeClass } from '../Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';
import { gettripLocationApi } from '../../repository/trip/tripRepository';
import { getEmployeeId } from '../../repository/commonRepository';
import NoData from '../shared/NoData';
// import Header_2 from '../../components/shared/Header_2';

function MonthData({ OutletName, OutletAddress, OutletContactName, OutletContactNo }) {
console.log('234567890jkhasdfghjk', OutletName)
   const mode = useSelector(state => state.mode);
   const themecolor = new MyThemeClass(mode).getThemeColor()

   return (
      <>
         <View style={{
            width: width * 0.92,
            justifyContent: 'center',
            alignSelf: 'center'
         }}>
            <TouchableOpacity
               // onPress={() => navigation.navigate('Store1')}
               style={{
                  backgroundColor: '#FFF',
                  borderWidth: 0.5,
                  borderColor: themecolor.BOXBORDERCOLOR1,
                  // alignItems: 'center',
                  padding: 12,
                  borderRadius: 10,
                  marginTop: 4,
                  // elevation: 2,
                  backgroundColor: themecolor.BOXTHEMECOLOR
               }}>

               <View
                  style={{
                     flexDirection: 'row',
                     width: width * 0.88,
                  }}>
                  <View style={{ width: width * 0.68 }}>
                     <Text
                        style={{
                           fontFamily: FontFamily.Popinssemibold,
                           color: Colors.black,
                           fontSize: 13,
                           color: themecolor.TXTWHITE
                        }}>
                        {OutletName}
                     </Text>
                  </View>
                  {/* <View style={{ width: 70, height: 18, padding: 2, borderRadius: 30, backgroundColor: '#54c130', justifyContent: 'center', }}> */}
                  {/* <Text style={{ fontSize: 9, justifyContent: 'center', alignSelf: 'center', color: '#FFF', fontFamily: FontFamily.Popinssemibold }}>{item.shoptype}</Text> */}
                  {/* </View> */}
               </View>
               <View
                  style={{
                     flexDirection: 'row',
                     alignItems: 'center',
                     marginTop: 2
                  }}>
                  <View
                     style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: 170,
                        left: -5,
                     }}>
                     <EIcon5 name="user" size={22} color={Colors.bluetheme} />
                     <Text
                        style={{
                           fontFamily: FontFamily.PopinsRegular,
                           color: Colors.black,
                           fontSize: 10,
                           color: themecolor.TXTWHITE
                        }}>
                        {OutletContactName}
                     </Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                     <FIcon name="mobile-phone" size={20} color={Colors.bluetheme} />

                     <Text
                        style={{
                           fontFamily: FontFamily.PopinsRegular,
                           color: Colors.black,
                           fontSize: 10,
                           left: 5,
                           color: themecolor.TXTWHITE
                        }}>
                        {OutletContactNo}
                     </Text>

                  </View>
               </View>
               <View
                  style={{
                     flexDirection: 'row',
                     alignItems: 'center',
                     marginTop: 5,
                     maxWidth: width * 0.82,
                  }}>
                  <FIcon5
                     name="map-marker-alt"
                     size={15}
                     color={Colors.bluetheme}
                  />
                  <Text
                     style={{
                        fontFamily: FontFamily.PopinsRegular,
                        color: Colors.black,
                        fontSize: 10,
                        left: 5,
                        color: themecolor.TXTWHITE
                     }}>
                     {OutletAddress}
                  </Text>
               </View>
            </TouchableOpacity>
         </View>
      </>


   );
}

export default function MonthCalls(props) {

   const mode = useSelector(state => state.mode);
   const themecolor = new MyThemeClass(mode).getThemeColor()
   const [data, setData] = React.useState([]);
   const [searchData, setSearchData] = React.useState([])

   React.useEffect(() => {
      async function temp() {
         if (props.route.params.heading == "Schedule Calls") {
            let empId = await getEmployeeId()
            const f = moment().startOf('month').format('YYYY-MM-DD');
            const t = moment().endOf('month').format('YYYY-MM-DD');
            try {
               var res = await gettripLocationApi(
                  `api/getMonthTillDateScheduleCallsData?from_date=${f}&to_date=${t}&employee_id=${empId}`,
               );
               console.log('@@@@@MONTHS@@@@@@22', res.data);
               if (res.statusCode === 200) {
                  setData(res.data);
                  setSearchData(res.data)
               }
            } catch (e) {
               console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>', e);
            }
         } else if (props.route.params.heading == 'Total Calls') {
            let empId = await getEmployeeId()
            const f1 = moment().startOf('month').format('YYYY-MM-DD');
            const t1 = moment().endOf('month').format('YYYY-MM-DD');
            try {
               var res = await gettripLocationApi(
                  `api/getMonthTillDateTotalCallsData?from_date=${f1}&to_date=${t1}&employee_id=${empId}`,
               );
               console.log('dataofTotalcallsMonth11111111111111111111111', res.data);
               if (res.statusCode === 200) {
                  setData(res.data);
                  setSearchData(res.data)
               }
            } catch (e) {
               console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>', e);
            }
         } else if (props.route.params.heading == 'Productive Calls') {
            let empId = await getEmployeeId()
            const f2 = moment().startOf('month').format('YYYY-MM-DD');
            const t2 = moment().endOf('month').format('YYYY-MM-DD');
            try {
               var res = await gettripLocationApi(
                  `api/getMonthTillDateProductiveCallsData?from_date=${f2}&to_date=${t2}&employee_id=${empId}`,
               );
               console.log('dataofMonthsssPPPPPP', res.data);
               if (res.statusCode === 200) {
                  setData(res.data);
               }
            } catch (e) {
               console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>', e);
            }
         } else if (props.route.params.heading == 'Non-Visit Outlets') {
            let empId = await getEmployeeId()
            const f3 = moment().startOf('month').format('YYYY-MM-DD');
            const t3 = moment().endOf('month').format('YYYY-MM-DD');
            try {
               var res = await gettripLocationApi(
                  `api/getMonthTillDateNonVisitOutletsData?from_date=${f3}&to_date=${t3}&employee_id=${empId}`,
               );
               console.log('dataofNonMONTHSSSSSSSSSSSSSSSSSS', res.data);
               if (res.statusCode === 200) {
                  setData(res.data);
                  setSearchData(res.data)
               }
            } catch (e) {
               console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>', e);
            }
         } else if (props.route.params.heading == "Zero Billing Outlets") {
            let empId = await getEmployeeId()
            const f4 = moment().startOf('month').format('YYYY-MM-DD');
            const t4 = moment().endOf('month').format('YYYY-MM-DD');
            try {
               var res = await gettripLocationApi(
                  `api/getMonthTillDateZeroBillingOutletsData?from_date=${f4}&to_date=${t4}&employee_id=${empId}`,
               );
               console.log('dataOOOOOOOOOOOOOOOOf', res.data);
               if (res.statusCode === 200) {
                  setData(res.data);
                  setSearchData(res.data)
               }
            } catch (e) {
               console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>', e);
            }
         } else if (props.route.params.heading == "New Onboarding") {
            let empId = await getEmployeeId()
            const f5 = moment().startOf('month').format('YYYY-MM-DD');
            const t5 = moment().endOf('month').format('YYYY-MM-DD');
            try {
               var res = await gettripLocationApi(
                  `api/getMonthTillDateNewOnBoardingData?from_date=${f5}&to_date=${t5}&employee_id=${empId}`,
               );
               console.log('dataofOnMMMMMMMMMMMMMMMMM', res.data);
               if (res.statusCode === 200) {
                  setData(res.data);
                  setSearchData(res.data)
               }
            } catch (e) {
               console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>', e);
            }
         } else if (props.route.params.heading == "Telephonic Orders") {
            let empId = await getEmployeeId()
            const f6 = moment().startOf('month').format('YYYY-MM-DD');
            const t6 = moment().endOf('month').format('YYYY-MM-DD');
            try {
               var res = await gettripLocationApi(
                  `api/getMonthTillDateTelephonicOrderData?from_date=${f6}&to_date=${t6}&employee_id=${empId}`,
               );
               console.log('dataofMTTTTTTTTTTTTT', res.data);
               if (res.statusCode === 200) {
                  setData(res.data);
                  setSearchData(res.data)
               }
            } catch (e) {
               console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>', e);
            }
         }
      } temp()
   }, [props])

   const filtering = async (search) => {
      var temp = searchData.filter(item => {
         return (
            (props.route.params.heading == 'New Onboarding') ? item.OutletName : item.Outlets.OutletName.toLowerCase().includes(search.toLowerCase())
         )
      })
      setData(temp);
   }
   const getOutletName = (item) => {
      if (props.route.params.heading == "Schedule Calls") {
         return item.Outlets.OutletName
      }else if (props.route.params.heading == "Total Calls") {
         return item.Outlets.OutletName
      }else if (props.route.params.heading == "Productive Calls") {
         return item.Outlets.OutletName
      }else if(props.route.params.heading == "Non-Visit Outlets") {
         return item[0].OutletName
      } else if (props.route.params.heading == "Zero Billing Outlets") {
         return item.Outlets.OutletName
      }else if (props.route.params.heading == "New Onboarding") {
         return item.OutletName
      }else if (props.route.params.heading == "Telephonic Orders") {
         return item.Outlets.OutletName
      }
   }
   const getOutletContactName = (item) => {
      if (props.route.params.heading == "Schedule Calls") {
         return item.Outlets.OutletContactName
      }else if (props.route.params.heading == "Total Calls") {
         return item.Outlets.OutletContactName
      }else if (props.route.params.heading == "Productive Calls") {
         return item.Outlets.OutletContactName
      }else if(props.route.params.heading == "Non-Visit Outlets") {
         return item[0].OutletContactName
      } else if (props.route.params.heading == "Zero Billing Outlets") {
         return item.Outlets.OutletContactName
      }else if (props.route.params.heading == "New Onboarding") {
         return item.OutletContactName
      }else if (props.route.params.heading == "Telephonic Orders") {
         return item.Outlets.OutletContactName
      }
   }
   const getOutletAdd = (item) => {
      if (props.route.params.heading == "Schedule Calls") {
         return item.Outlets.OutletAddress
      }else if (props.route.params.heading == "Total Calls") {
         return item.Outlets.OutletAddress
      }else if (props.route.params.heading == "Productive Calls") {
         return item.Outlets.OutletAddress
      }else if(props.route.params.heading == "Non-Visit Outlets") {
         return item[0].OutletAddress
      } else if (props.route.params.heading == "Zero Billing Outlets") {
         return item.Outlets.OutletAddress
      }else if (props.route.params.heading == "New Onboarding") {
         return item.OutletAddress
      }else if (props.route.params.heading == "Telephonic Orders") {
         return item.Outlets.OutletAddress
      }
   }
   const getOutletNo = (item) => {
      if (props.route.params.heading == "Schedule Calls") {
         return item.Outlets.OutletContactNo
      }else if (props.route.params.heading == "Total Calls") {
         return item.Outlets.OutletContactNo
      }else if (props.route.params.heading == "Productive Calls") {
         return item.Outlets.OutletContactNo
      }else if(props.route.params.heading == "Non-Visit Outlets") {
         return item[0].OutletContactNo
      } else if (props.route.params.heading == "Zero Billing Outlets") {
         return item.Outlets.OutletContactNo
      }else if (props.route.params.heading == "New Onboarding") {
         return item.OutletContactNo
      }else if (props.route.params.heading == "Telephonic Orders") {
         return item.Outlets.OutletContactNo
      }
   }

   return (
      <View style={{ ...styles.MainView, backgroundColor: themecolor.THEMECOLOR }}>
         {/* <StatusBar translucent backgroundColor="transparent" /> */}

         {/* <Header_2 title={props.route.params.heading} Size={18} onPress={() => props.navigation.goBack()} /> */}
         <View style={{
            width: width,
            height: 90,
            backgroundColor: themecolor.HEADERTHEMECOLOR,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
         }}>
            <View style={{
               flexDirection: 'row',
               justifyContent: 'space-between',
               alignItems: 'flex-end',
               padding: 15,
               flex: 1,
               width: width,
               alignSelf: 'center',
            }}>
               <View style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
               }}>
                  <TouchableOpacity activeOpacity={0.5} onPress={() => props.navigation.goBack()}>
                     <Image
                        source={require('../../assets/images/back.png')}
                        style={{
                           width: 20,
                           height: 20,
                        }}
                        resizeMode={'contain'}
                     />
                  </TouchableOpacity>
                  <View>
                     <Text
                        style={{
                           fontSize: FontSize.labelText4,
                           fontFamily: FontFamily.PopinsMedium,
                           color: Colors.white,
                           top: 1,
                           alignSelf: props.Calign,
                           marginHorizontal: 10,
                        }}>
                        {props.route.params.heading}
                        {/* - ({props.route.params.count}) */}
                     </Text>
                  </View>
               </View>

            </View>
         </View>
         <View>
            <View style={{ marginVertical: 5 }} />
            <View
               style={{
                  backgroundColor: 'white',
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderRadius: 10,
                  backgroundColor: themecolor.BOXTHEMECOLOR,
                  borderColor: themecolor.BOXBORDERCOLOR1,
                  borderWidth: 0.5,
                  width: width * 0.94,
                  alignSelf: 'center'
               }}>
               <Text style={{ paddingHorizontal: 10, top: -2, left: 2 }}>
                  <FIcon name="search" size={12} color={themecolor.AV2} />
               </Text>
               <TextInput
                  onChangeText={text => filtering(text)}
                  placeholder="Search"
                  style={{
                     width: width * 0.8,
                     fontFamily: FontFamily.PopinsRegular,
                     color: themecolor.AV2
                  }}
                  placeholderTextColor={themecolor.AV2}
               />
            </View>
            <View style={{ marginVertical: 4 }} />

         </View>
         {data.length > 0 ?
            <FlatList
               data={data}
               renderItem={({ item }) => <MonthData
               OutletName={getOutletName(item)}
               OutletContactName={getOutletContactName(item)}
               OutletAddress={getOutletAdd(item)}
               OutletContactNo={getOutletNo(item)}
               />}
               showsVerticalScrollIndicator={false}
               keyExtractor={item =>
                  (props.route.params.heading == 'New Onboarding' || "Non-Visit Outlets") ? item.Id:
                     item.Outlets.Id}
               scrollEnabled={true}
               ListFooterComponent={<View style={{ height: 20 }}></View>}
            />

            : <NoData message='No data available' />}
      </View>

   )
}