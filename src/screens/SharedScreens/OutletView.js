import {
  Text,
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  BackHandler
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from '../../assets/config/Colors';
import styles from '../../assets/css/stylesBeat';
import styles1 from '../../assets/css/styleTrip';

const { width } = Dimensions.get('window');
import {
  RecentOrder,
  RecentOrderData,
  SalesView,
  LastMonthSalesView,
} from '../../components/shared/BeatComponent';
import Icon from 'react-native-vector-icons/FontAwesome';
import DistributorSelectModal from '../../components/shared/DistributorSelectModal';
import { openDatabase } from 'react-native-sqlite-storage';
import OutletDetailList from '../../components/Beat_outlet/OutletDetailList';
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from 'react-native-toast-notifications';
import ChekoutModal from '../../components/Beat_outlet/ChekoutModal';
import { useFocusEffect, StackActions, useNavigation, useIsFocused, } from '@react-navigation/native';
import { getUserCurrentLocationCommon } from '../../repository/commonRepository';
import FdIcons from 'react-native-vector-icons/Fontisto';


import {
  getDailyMtdSales,
  getFrequentlyOrder,
  getLastThreeMonthOrder,
  getOutletRecentOrders,
} from '../../repository/outlet/OutletRepositoy';
import CarouselList from '../../components/shared/CarousalDataList';
import CompetitionModal from './CompetitionModal';
import { TableShow } from '../../components/Beat_outlet/OutletCompetitorTable';
import {
  getCompetitionByOutletId,
  postCreateCompetition,
} from '../../repository/CompetitionMapping/CompetitionMappingRepository';
import { store } from '../../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ActionButton from 'react-native-action-button';
import { FontFamily } from '../../assets/fonts/FontFamily';
import { FontSize } from '../../assets/fonts/Fonts';
var db = openDatabase({ name: 'Beatdump.db' });

export default function OutletView(props) {
  // alert(JSON.stringify(props.route.params))

  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  // check if screen is focused
  const isFocused = useIsFocused();
  const FrequentlyOrderedRedux = useSelector(state => state.FrequentlyOrdered);
  const network = useSelector(state => state.network);
  // const roles = useSelector(state => state.userRoles);
  const FrequentlyOrderedReduxValue = Object.values(FrequentlyOrderedRedux);

  const navigation = useNavigation();
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [tempProp, setTempProp] = useState('');
  const [primaryOutlets, setPrimaryOutlets] = useState([]);
  const [defaultOutlet, setDefaultOutlets] = useState('');
  const [defaultOutletGrade, setDefaultOutletsGrade] = useState('');
  const [checkinCheckoutData, setCheckinCheckoutData] = useState([]);
  const [checkinStatus, setCheckinStatus] = useState(true);
  const [isCheckoutModalVisible, setIsCheckoutModalVisible] = useState(false);
  const [outletId, setOutletId] = useState(props.route.params.item.Id);
  const [refresh, setRefresh] = useState(false);
  const [outletType, setOutletType] = useState('');
  const [canCheckin, setCanCheckin] = useState(true);
  const [dailyMtdSales, setDailyMtdSales] = useState({});
  const [lastThreeMonthOrder, setLastThreeMonthOrder] = useState({});
  const [outletRecentOrders, setOutletRecentOrders] = useState([]);
  const [frequentlyOrder, setFrequentlyOrder] = useState([]);
  const [competitionByOutletId, setCompetitionByOutletId] = useState([]);
  const [competitors, setCompetitors] = useState([]);
  const [competitorId, setCompetitorId] = useState('');
  const [competitorProductName, setCompetitorProductName] = useState('');
  const [competitorUnit, setCompetitorUnit] = useState([]);
  const [competitorUnitId, setCompetitorUnitId] = useState('');
  const [competitorQty, setCompetitorQty] = useState('');
  const [competitorRemark, setCompetitorRemark] = useState('');
  const [checkinOutletName, setCheckinOutletName] = useState('');
  const [competitorRefresh, setCompetitorRefresh] = useState(false);
  const [outletCategory, setOutletCategory] = useState('');
  const [defaultOutletId, setDefaultOutletId] = useState('');

  const dispatch = useDispatch();
  const toast = useToast();
  const currentLatLng = useSelector(state => state.currentLatLng);
  const roles = useSelector(state => state.userRoles);
  const [carouselStatus, setCarouselStatus] = useState(true);
  const [showCompetitionModal, setshowCompetitionModal] = useState(false);

  function handleBackButtonClick() {
    if (props.route.params.screen == 'orderDetailItem') {
      const popAction = StackActions.pop(3);
      navigation.dispatch(popAction);
      return true;
    }
    else {
      navigation.goBack()
      return true;
    }
  }

  React.useEffect(() => {
    console.log('props.route.params.item', props.route.params.item);
    async function temp() {
      let userprofile = JSON.parse(await AsyncStorage.getItem('@UserProfile'));
      console.log("User profile on NewDashboard Line 402=======>", userprofile);
    }
    temp();
    checkOrderSyncPendingOrNot();
    handleOutletRecentOrders()
  }, [isFocused])


  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
      return () => {
        BackHandler.removeEventListener(
          'hardwareBackPress',
          handleBackButtonClick,
        );
      };
    }, []),
  );

  React.useEffect(() => {
    getCheckinChekoutByOutletId();
  }, [refresh]);

  React.useEffect(() => {
    store.dispatch({
      type: 'ADD_CUSTOMER_DETAILS_OUTLETID',
      payload: props.route.params.item,
    });
    store.dispatch({
      type: 'ADD_NAVIGATE_FROM_ON_OUTLETVIEW',
      payload: props.route.params.navigateFrom,
    });
  }, []);

  React.useEffect(() => {
    getOutletType();
    getPrimaryOutlets();
    getCheckinChekoutByOutletId();
    checkIsAnywhereCheckoutPending();
  }, []);

  const getOutletType = async () => {
    try {
      await db.transaction(async tx => {
        await tx.executeSql(
          `SELECT Out.*,Outyp.* FROM Outlets as Out join OutletsTypes as Outyp on Out.OutlettypeId=Outyp.OutlettypeId where Out.Id='${props.route.params.item.Id}'`,
          [],
          (tx, results) => {
            console.log('errr', tx);
            console.log('result Line 141--->', results);
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i) {
              temp.push(results.rows.item(i));
            }
            try {
              setOutletType(temp[0].OutlettypeName);
              let objj = temp[0]
              objj["outlettype"] = temp[0].OutlettypeName
              objj["shipFromName"] = props.route.params.item.OutletName
              objj["shipToName"] = temp[0].OutletName

              dispatch({ type: 'ADD_PRIMARY_DISTRIBUTOR', payload: objj });

            } catch (e) {
              setOutletType('');
              objj["shipFromName"] = ''
              objj["shipToName"] = ''

            }
            try {
              setOutletCategory(temp[0].OutletClassification);
            } catch (e) {
              setOutletCategory('');
            }
            console.log(
              'Data returned From Outlets SQLITE ine 66 ----->',
              temp,
            );
          },
        );
      });
    } catch (e) {
      console.log('Err in OutletvIew Line 174', e);
    }
  };

  // const getPrimaryOutletsNew = async() =>{
  //   // console.log("props.route.params.item.Id",props.route.params.item.Id)
  //   try {
  //     await db.transaction(async tx => {
  //       await tx.executeSql("select * from PrimaryOutlets", [], (tx, results) => {

  //        console.log('results.rows.item(i) Line 137 =====----->',results.rows.item(0));
  //        var temp = [];
  //         for (let i = 0; i < results.rows.length; ++i) {
  //           temp.push(results.rows.item(i));
  //           console.log('results.rows.item(i) Line 140 ----->', results.rows.item(i));
  //         }
  //         try{
  //         setDefaultOutlets(temp[0].OutletName)
  //         if(temp[0].OutletClassification != null){
  //         setDefaultOutletsGrade(` - ${temp[0].OutletClassification}`)
  //         }
  //         }catch(e){
  //          console.log("catch Line 147",e)
  //         }
  //         setPrimaryOutlets(temp);

  //         console.log('Data returned From PrimaryOutlets SQLITE Line 42 ----->', temp);
  //       });
  //     });
  //   } catch (e) {
  //     alert(e);
  //   }
  // }

  // const getClassification = async () => {
  //   // console.log('props.route.params.item.Id', props.route.params.item.Id);
  //   try {
  //     await db.transaction(async tx => {
  //       // await tx.executeSql(`SELECT * from PrimaryOutlets`, [], (tx, results) => {
  //       await tx.executeSql(
  //         // `SELECT * FROM Mapping left join PrimaryOutlets as Pout on M.PrimaryOutletId=Pout.Id where M.SecondaryOutletId=${props.route.params.item.Id}`,
  //         `select * from Outlets
  //         left join Mapping on Mapping.SecondaryOutletId='${defaultOutletId  }' AND Mapping.PrimaryOutletId='${props.route.params.item.Id}' 
  //         left join PriceBooks on PriceBooks.PricebookId=Mapping.PricebookId
  //         where Outlets.Id='${props.route.params.item.Id}'`,
  //         [],
  //         (tx, results) => {
  //           console.log(
  //             'results.rows.item(i) Line 138 =====----->',
  //             results.rows.item(0),
  //           );
  //           console.log(
  //             'results.rows.item(i) Line 138 =====----->',
  //             results.rows.length,
  //           );
  //           var temp = [];
  //           for (let i = 0; i < results.rows.length; ++i) {
  //             temp.push(results.rows.item(i));
  //             console.log(
  //               'results.rows.item(i) Line 273++++++++ ----->',
  //               results.rows.item(i),
  //             );
  //           }
  //           console.log(
  //             'Data returned From PriceBooks SQLITE Line 27777----->',
  //             temp,
  //           );
  //           try {
  //             setDefaultOutlets(temp[0].OutletName);

  //             if (temp[0].OutletClassification != null) {
  //               setDefaultOutletsGrade(` - ${temp[0].OutletClassification}`);
  //             }
  //           } catch (e) {
  //             console.log('catch Line 147', e);
  //           }
  //           setPrimaryOutlets(temp);
  //           let objj = temp[0]
  //           objj["outlettype"] = outletType

  //           dispatch({type: 'ADD_PRIMARY_DISTRIBUTOR', payload: objj});
  //           console.log(
  //             'Data returned From PrimaryOutlets SQLITE Line 239 ----->',
  //             temp,
  //           );
  //         },
  //       );
  //     });
  //   } catch (e) {
  //     console.log('Line 236 Err in cathc', e);
  //   }
  // };

  const getPrimaryOutlets = async () => {
    console.log('props.route.params.item.Id', props.route.params.item.Id);
    console.log('props.route.params.item', props.route.params.item);
    try {
      await db.transaction(async tx => {
        // await tx.executeSql(`SELECT * from PrimaryOutlets`, [], (tx, results) => {
        await tx.executeSql(
          `SELECT M.*,Pout.* FROM Mapping as M join PrimaryOutlets as Pout on M.PrimaryOutletId=Pout.Id where M.SecondaryOutletId=${props.route.params.item.Id}`,
          [],
          (tx, results) => {
            console.log(
              'results.rows.item(i) Line 138 =====----->',
              results.rows.item(0),
            );
            console.log(
              'results.rows.item(i) Line 138 =====----->',
              results.rows.length,
            );
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i) {
              temp.push(results.rows.item(i));
              console.log(
                'results.rows.item(i) Line 42 ----->',
                results.rows.item(i),
              );
            }
            console.log(
              'Data returned From PrimaryOutlets SQLITE Line 226 ----->',
              temp,
            );
            try {
              setDefaultOutlets(temp[0].OutletName);
              setDefaultOutletId(temp[0].PrimaryOutletId);

              if (temp[0].OutletClassification != null) {
                setDefaultOutletsGrade(` - ${temp[0].OutletClassification}`);
              }
            } catch (e) {
              console.log('catch Line 147', e);

            }


            setPrimaryOutlets(temp);
            let objj = temp[0]
            objj["outlettype"] = outletType
            objj["shipFromName"] = props.route.params.item.OutletName
            objj["shipToName"] = temp[0].OutletName

            dispatch({ type: 'ADD_PRIMARY_DISTRIBUTOR', payload: objj });
            console.log(
              'Data returned From PrimaryOutlets SQLITE Line 239 ----->',
              temp,
            );
          },
        );
      });
    } catch (e) {
      console.log('Line 236 Err in cathc', e);
    }
  };

  const getCheckinChekoutByOutletId = async () => {
    try {
      await db.transaction(async tx => {
        await tx.executeSql(
          `SELECT * from CheckinCheckout where OutletId='${props.route.params.item.Id}' AND EndTime IS NULL`,
          [],
          (tx, results) => {
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i) {
              temp.push(results.rows.item(i));
            }

            // if(temp[0].isBeatEnd == '1'){
            //   setIsCheckinCheckoutButton(true);
            // }
            if (temp[0].isBeatStart == '1') {
              setCheckinStatus(false);
            }
            setCheckinCheckoutData(temp);

            console.log(
              'Data returned From CheckinCheckout SQLITE Line 79 ----->',
              temp,
            );
          },
        );
      });
    } catch (e) {
      console.log('Err Line 261===', e);
    }
  };

  const checkIsAnywhereCheckoutPending = async () => {
    try {
      await db.transaction(async tx => {
        await tx.executeSql(
          `SELECT * from CheckinCheckout where isBeatEnd='0' AND EndTime IS NULL`,
          [],
          (tx, results) => {
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i) {
              temp.push(results.rows.item(i));
              console.log(
                'CHeckiN========== 237+++++',
                results.rows.item(i).OutletName,
              );
              setCheckinOutletName(results.rows.item(i).OutletName);
            }
            console.log(
              'Data returned From CheckinCheckout SQLITE Line 147 ----->',
              temp,
            );
            if (temp.length > 0) {
              setCanCheckin(false);
            }
          },
        );
      });
    } catch (e) {
      console.log('Errrr Line 283===', e);
    }
  };

  const handleClickOnRequestMerchandise = async () => {
    if (primaryOutlets.length > 1) {
      if (FrequentlyOrderedReduxValue.length > 0) {
        dispatch({ type: 'ADD_PRIMARY_DISTRIBUTOR', payload: primaryOutlets[0] });
        props.navigation.push('BeatOutletProductCategories', {
          navigateFrom: 'outletView',
          outletId: props.route.params.item.Id,
          orderType: 'Merchandise',
        });
      } else {
        setModalVisible3(!modalVisible3);
      }
    } else {
      dispatch({ type: 'ADD_PRIMARY_DISTRIBUTOR', payload: primaryOutlets[0] });
      props.navigation.push('BeatOutletProductCategories', {
        navigateFrom: 'outletView',
        outletId: props.route.params.item.Id,
        orderType: 'Merchandise',
      });
    }
  };

  const handleClickOnPlaceOrder = async () => {
    if (primaryOutlets.length > 1) {
      if (FrequentlyOrderedReduxValue.length > 0) {
        dispatch({ type: 'ADD_PRIMARY_DISTRIBUTOR', payload: primaryOutlets[0] });
        dispatch({ type: 'ADD_ORDER_LINE_ITEMS', payload: [] })
        props.navigation.push('BeatOutletProductCategories', {
          navigateFrom: 'outletView',
          outletId: props.route.params.item.Id,
          orderType: 'Regular',
        });
      } else {
        setModalVisible2(!modalVisible2);
      }
    } else if (primaryOutlets.length == 0) {
      toast.show(`Outlet not mapped with any distributors.`, {
        type: 'danger',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
    } else {
      dispatch({ type: 'ADD_PRIMARY_DISTRIBUTOR', payload: primaryOutlets[0] });
      props.navigation.push('BeatOutletProductCategories', {
        navigateFrom: 'outletView',
        outletId: props.route.params.item.Id,
        orderType: 'Regular',
      });
    }
    // console.log("props.route.params.item.Id===>",props.route.params.item.Id)
  };

  const handleCheckIn = async () => {
    try {
      let beatid = '';
      if (props.route.params.navigateFrom == 'AirportRoute') {
        beatid = await AsyncStorage.getItem('@beatId');
      }

      console.log('BeatId Line 286 In OutletView====', beatid);
      if (canCheckin) {
        try {
          console.log(
            'currentLatLnglongitude',
            currentLatLng.latitude,
            currentLatLng.longitude,
          );
          let getCurrentAddress = await getUserCurrentLocationCommon(
            currentLatLng.latitude,
            currentLatLng.longitude,
          );

          console.log('lrrrrrrrrrrrrr', getCurrentAddress);

          await db.transaction(async function (tx) {
            console.log('tx-------->', tx);

            await tx.executeSql(
              //   'INSERT INTO CheckinCheckout (OutletId , Lat , Lng , StartTime , EndTime , isBeatStart ,isBeatEnd) VALUES (?,?,?,?,?,?,?,?,?,?)',
              'INSERT INTO CheckinCheckout (OutletId ,OutletName, StartTime , isBeatStart ,isBeatEnd,Checkin_Lat,Checkin_Lng,chekin_address,BeatId) VALUES (?,?,?,?,?,?,?,?,?)',
              [
                props.route.params.item.Id,
                props.route.params.item.OutletName,
                new Date(),
                true,
                false,
                currentLatLng.latitude,
                currentLatLng.longitude,
                getCurrentAddress,
                beatid,
              ],
              (tx, results) => {
                console.log('tx----- In InsertData Line 51', tx);
                setRefresh(!refresh);
                // alert(
                //   'Insertion Data into CheckinCheckout' +
                //     JSON.stringify(results),
                // );
                console.log(
                  'Results In Insertion Data into CheckinCheckout',
                  results.rowsAffected,
                );
                if (results.rowsAffected > 0) {
                  // Alert.alert(
                  //   'Success',
                  //   'Data inserted  CheckinCheckout Successfully',
                  //   [
                  //     {
                  //       text: 'Ok',
                  //       onPress: () => navigation.navigate('NewDashboard'),
                  //     },
                  //   ],
                  //   { cancelable: false },
                  // );
                } else alert('Checkin Failed , please try again later.');
              },
            );
          });
        } catch (e) { } //End of Catch
      } //End of If
      else {
        toast.show(
          `you can't checkin , please checkout from recently visited outlet ${checkinOutletName}.`,
          {
            type: 'danger',
            placement: 'bottom',
            duration: 3000,
            offset: 30,
            animationType: 'slide-in',
          },
        );
      } //End of Else
    } catch (e) {
      console.log('Error in CheckIn in Catch Line 370 in OutletView---', e);
    }
  };

  const handleCheckOut = () => {
    setIsCheckoutModalVisible(!isCheckoutModalVisible);
  };

  const handleDailyMtdSales = async () => {
    var res = await getDailyMtdSales(outletId);
    console.log('GetDailyMTDSales........in page OutletView line 320', res);
    if (res.statusCode === 200) {
      setDailyMtdSales(res.data);
    }
  };

  const handleLastThreeMonthOrder = async () => {
    var res = await getLastThreeMonthOrder(outletId);
    console.log('GEtLastThreeMonthOrder.....in page OutletvIEW line 328', res);
    if (res.statusCode === 200) {
      setLastThreeMonthOrder(res.data);
    }
  };


  const checkOrderSyncPendingOrNot = async () => {
    /****** Start *******/
    try {
      await db.transaction(async tx => {
        await tx.executeSql(`select * from SalesOrder where OutletId=${props.route.params.item.Id} order by OrderId DESC limit 2`, [], (tx, results) => {
          console.log('result Line 618====--->', results);
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {

            let obj = results.rows.item(i);
            obj["isoffline"] = true
            temp.push(obj);
          }
          if (results.rows.length > 0) {
            setOutletRecentOrders(temp);
          } else {
            setOutletRecentOrders([]);
          }
          console.log("OrderS From Local Databse Line 630===>", temp)

          console.log('Data returned From Outlets SQLITE ine 66 ----->', temp);
        });
      });
    } catch (e) {
      console.log("Error in Catch Line 114===in OrderList", e)
    }
    /****** End *******/

  }

  const handleOutletRecentOrders = async () => {
    try {
      var res = await getOutletRecentOrders(outletId);
      console.log(
        'GetOutletRecentOrders........in page OutletView line 325',
        res,
      );
      if (res.statusCode === 200) {
        // setOutletRecentOrders(res.data);
        setOutletRecentOrders(prev => ([...prev, res.data]).flat());
      }
    }
    catch (e) {

    }
  };

  const handleFrequentlyOrder = async () => {
    var res = await getFrequentlyOrder();
    console.log('Get FrequentlyOrder........in page OutletView line 362', res);
    if (res.statusCode === 200) {
      setFrequentlyOrder(res.data);
    }
  };

  const handleCreateCompetition = async () => {
    if (competitorId == '') {
      toast.show('Please Select Competitors', {
        type: 'warning',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
    } else if (competitorProductName == '') {
      toast.show('Product Name are required', {
        type: 'warning',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
    } else if (competitorUnitId == '') {
      toast.show('Please Select Unit', {
        type: 'warning',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
    } else if (competitorQty == '') {
      toast.show('Qty is required', {
        type: 'warning',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
    } else if (competitorRemark == '') {
      toast.show('Remark is required', {
        type: 'warning',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
    } else {
      var body = {
        competition_name: '',
        competition_features: '',
        consumer_feedback: '',
        competition_remark: competitorRemark,
        qty: competitorQty,
        media_id: '',
        outlet_id: outletId,
        competitor_id: competitorId,
        unit_id: competitorUnitId,
        competition_products: [
          {
            competition_sku: competitorProductName,
            competition_mrp: '0',
          },
        ],
      };
      console.log('body ------------------>', body);
      try {
        var res = await postCreateCompetition(body);
        console.log(
          'postCreateCompetition in Competion Mapping ------------------>',
          res,
        );

        if (res.statusCode === 200) {
          setshowCompetitionModal(false);
          toast.show('Competition recorded successfully', {
            type: 'success',
            placement: 'bottom',
            duration: 3000,
            offset: 30,
            animationType: 'slide-in',
          });
          setCompetitorId('');
          setCompetitorUnitId('');
          setCompetitorRefresh(!competitorRefresh);
        } else {
          toast.show(res.message, {
            type: 'danger',
            placement: 'bottom',
            duration: 3000,
            offset: 30,
            animationType: 'slide-in',
          });
          console.log('Error....in createCompetition api >>>', res.message);
        }
      } catch (e) {
        console.log('errorrr..................in Create Competitior ', e);
      }
    }
  };

  const handleCompetitionByOutletId = async () => {
    try {
      var res = await getCompetitionByOutletId(outletId);
      console.log('CompetitionByOutletId...page OutletView line 472', res);
      if (res.statusCode === 200) {
        var temp = [];
        res.data.map(item => {
          if (
            !Array.isArray(item.Competitor) &&
            !Array.isArray(item.Unitmaster)
          ) {
            temp.push(item);
          }
        });
        console.log('temp Array=====>', temp);
        setCompetitionByOutletId(temp);

        // setCompetitionByOutletId(res.data)
      }
    } catch (e) { }
  };

  useEffect(() => {
    async function temp() {
      await checkOrderSyncPendingOrNot()
    }
    temp()
  }, [network]);

  useEffect(() => {
    async function temp() {
      if (network) {
        await handleDailyMtdSales();
        await handleLastThreeMonthOrder();
        await handleOutletRecentOrders();
      } else {
        setDailyMtdSales({})
        setLastThreeMonthOrder({})
      }
    }
    temp()
  }, [network]);

  useFocusEffect(
    React.useCallback(() => {
      handleFrequentlyOrder();
    }, [props])
  )

  useEffect(() => {
    handleCompetitionByOutletId();
  }, [competitorRefresh]);

  return (
    <View style={{ ...styles.StoreFlex, backgroundColor: themecolor.THEMECOLOR }}>
      <StatusBar translucent backgroundColor="transparent" />

      <View style={{ ...styles.FlexMainView, backgroundColor: themecolor.THEMECOLOR }}>
        <ImageBackground
          resizeMode="cover"
          style={styles.BGBG}
          source={require('../../assets/images/addoutlet/shop3.jpg')}>
          <View style={styles.BGBottonText}>
            <View style={styles.FLexJ}>
              <View style={styles.FlexJ2}>
                <TouchableOpacity
                  style={{}}
                  activeOpacity={0.5}
                  onPress={() => handleBackButtonClick()}>
                  <Image
                    source={require('../../assets/images/back.png')}
                    style={styles.BackIcon1}
                    resizeMode={'contain'}
                  />
                </TouchableOpacity>
                <Text style={styles.HeadingText}>
                  {props.route.params.item.OutletName}
                </Text>
              </View>
              <TouchableOpacity
                style={{ left: -6, }}
                onPress={() =>
                  props.navigation.navigate('VisitHistory', {
                    outletId: outletId,
                  })
                }>
                <Icon name="history" size={20} color="white" style={{}} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ ...styles.TypeText, backgroundColor: themecolor.HEADERTHEMECOLOR }}>
            <View style={{ ...styles.TYPETEXT2, width: width * 0.3 }}>
              <Text
                style={{
                  ...styles.T1,
                  alignSelf: 'flex-start',
                  paddingHorizontal: 10,
                }}>
                Type
              </Text>
              <Text
                style={{
                  ...styles.T2,
                  alignSelf: 'flex-start',
                  paddingHorizontal: 10,
                }}>
                {outletType}
              </Text>
            </View>
            <View style={{ width: width * 0.3, }} />
            {/* <View style={{...styles.TYPETEXT2, width: width * 0.3}}>
              <Text style={{...styles.T1, alignSelf: 'center'}}>Category</Text>
              <Text style={{...styles.T2, alignSelf: 'center'}}>
                {outletCategory}
              </Text>
            </View> */}

            <View style={{ ...styles.TYPETEXT2, width: width * 0.3 }}>
              <Text style={styles.T1}>Distributor</Text>
              <TouchableOpacity
                onPress={() =>
                  props.navigation.push('DistributerStore', {
                    primaryOutletData: primaryOutlets[0],
                  })
                }>
                <Text ellipsizeMode="tail" numberOfLines={1} style={styles.T2}>
                  {defaultOutlet}
                  {defaultOutletGrade}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>


      <View style={styles.MT10} />
      <View style={{ ...styles.NewView, backgroundColor: themecolor.THEMECOLOR }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            {/*------- Outlet Details List ------*/}
            <OutletDetailList data={[props.route.params.item]} />

            {/*------- Carousel Remainder ------*/}
            <View>
              <CarouselList
                setCarouselStatus={setCarouselStatus}
                outletId={outletId}
              />
            </View>

            {/*------- Recent Orders ------*/}
            {outletRecentOrders.length > 0 ? (
              <View style={styles.MT10}>
                <RecentOrder
                  outletId={outletId}
                  index={1}
                  customerDetails={props.route.params.item}
                />
                <RecentOrderData
                  props={props}
                  outletRecentOrders={outletRecentOrders?.slice(0, 2)}
                  outletItem={props.route.params.item}
                  customerDetails={props.route.params.item}
                />
              </View>
            ) : (
              <></>
            )}

            {/* ------ Daily MTD sales ------ */}
            {Object.keys(dailyMtdSales).length > 0 ? (
              <View style={{ marginVertical: 5 }}>
                <SalesView props={props} dailyMtdSales={dailyMtdSales} />
              </View>
            ) : (
              <></>
            )}

            {/* ------- Last 3 Months ----- */}
            {Object.keys(lastThreeMonthOrder).length > 0 ? (
              <View style={{ marginVertical: 5 }}>
                <LastMonthSalesView
                  props={props}
                  lastThreeMonthOrder={lastThreeMonthOrder}
                />
              </View>
            ) : (
              <></>
            )}

            {/*------- Competitor Analysis -------- */}


            {network ?
              (
                roles.includes('can_do_primary_order') ? 
                <></>:
                <View style={{ marginVertical: 12 }}>
                  <View>
                    <View style={styles.FLexJ}>
                      <View>
                        <Text style={{ ...styles.SalesText, color: themecolor.TXTWHITE }}>Competitor Analysis</Text>
                      </View>

                      <TouchableOpacity
                        onPress={() => setshowCompetitionModal(true)}>
                        <View style={{ ...styles.AddButton, backgroundColor: themecolor.HEADERTHEMECOLOR }}>
                          <Text style={styles.AddButtonIcon}>
                            <FdIcons name="plus-a" size={10} />
                            Add
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={{ ...styles.CompetitorView, borderColor: themecolor.BOXBORDERCOLOR1, }}>
                      {/* <View> */}
                      <TableShow
                        H1={'Competitor'}
                        H2={'Product'}
                        H3={'Qty.'}
                        H4={'Remark'}
                        competitionByOutletId={competitionByOutletId}
                      />
                      {/* </View> */}
                      <View style={styles.BlankView}></View>
                    </View>
                  </View>
                </View>
              ) : (<></>)
            }
            {/* ------ Customer Classification ------- */}
            {/* <View style={styles.MT10}>
              <View>
                <View>
                  <Text
                    style={styles.SalesText}>
                    Customer Classification
                  </Text>
                </View>
                <CustomerClassifiedGraph />
              </View>
            </View> */}

            {/* ------- Frequently Ordered Items Start -------- */}
            {/* <View style={styles.MT10} >
              <View>
                <View>
                  <Text
                    style={styles.SalesText}>
                    Frequently ordered items
                  </Text>
                </View>

                <View
                  style={styles.FrequetlyView}>
                  <FrequentlyOrderItems frequentlyOrder={frequentlyOrder} />
                </View>
              </View>
            </View> */}

            <View style={styles.MT10} />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignSelf: 'center',
                width: width * 0.93,
              }}>
              {/* {modalVisible1 && <OTPModal setModalVisible1={setModalVisible1} setModalVisible2={setModalVisible2(true)} />} */}
              {modalVisible2 && (
                <DistributorSelectModal
                  outletId={props.route.params.item.Id}
                  data={primaryOutlets}
                  setModalVisible2={setModalVisible2}
                  setTempProp="Regular"
                  tempProp={tempProp}
                  outletType={outletType}
                  shipToName={defaultOutlet}
                  shipFromName={props.route.params.item.OutletName}
                />
              )}

              {roles.includes('can_do_primary_order') ? (
                <>
                  <FullsizeButton
                    width={width * 0.93}
                    backgroundColor={themecolor.PLACEORDERTHEMECOLOR}
                    onPress={() => handleClickOnPlaceOrder()}
                    title="Place order"
                  />
                </>
              ) : (
                <>
                  {checkinStatus ? (
                    <>
                      {primaryOutlets.length == 0 ? (
                        <FullsizeButton
                          width={width * 0.93}
                          backgroundColor={themecolor.HEADERTHEMECOLOR}
                          onPress={() => handleCheckIn()}
                          title="Check In"
                        />
                      ) : (
                        <>
                          <FullsizeButton
                            width={width * 0.45}
                            backgroundColor={themecolor.PLACEORDERTHEMECOLOR}
                            onPress={() => handleClickOnPlaceOrder()}
                            title="Place order"
                          />
                          <FullsizeButton
                            width={width * 0.45}
                            backgroundColor={themecolor.HEADERTHEMECOLOR}
                            onPress={() => handleCheckIn()}
                            title="Check In"
                          />
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      {
                        primaryOutlets.length == 0 ? (
                          <FullsizeButton
                            width={width * 0.93}
                            backgroundColor={themecolor.CHECKOUTTHEMECOLOR}
                            onPress={() => handleCheckOut()}
                            title="Check Out"
                          />
                        ) : (
                          <>
                            <FullsizeButton
                              width={width * 0.45}
                              backgroundColor={themecolor.PLACEORDERTHEMECOLOR}
                              onPress={() => handleClickOnPlaceOrder()}
                              title="Place order"
                            />
                            <FullsizeButton
                              width={width * 0.45}
                              backgroundColor={themecolor.CHECKOUTTHEMECOLOR}
                              onPress={() => handleCheckOut()}
                              title="Check Out"
                            />
                          </>
                        )}
                    </>
                  )}
                </>
              )
              }

              {isCheckoutModalVisible && (
                <ChekoutModal
                  isCheckoutModalVisible={isCheckoutModalVisible}
                  setIsCheckoutModalVisible={setIsCheckoutModalVisible}
                  outletId={outletId}
                  setRefresh={setRefresh}
                  refresh={refresh}
                  navigateFrom={props.route.params.navigateFrom}
                  beatName={props.route.params.beatName}
                  beatId={props.route.params.beatId}
                />
              )}

              {showCompetitionModal && (
                <CompetitionModal
                  setshowCompetitionModal={setshowCompetitionModal}
                  setCompetitors={setCompetitors}
                  competitors={competitors}
                  competitorId={competitorId}
                  setCompetitorId={setCompetitorId}
                  setCompetitorProductName={setCompetitorProductName}
                  competitorUnit={competitorUnit}
                  setCompetitorUnit={setCompetitorUnit}
                  competitorUnitId={competitorUnitId}
                  setCompetitorUnitId={setCompetitorUnitId}
                  setCompetitorQty={setCompetitorQty}
                  setCompetitorRemark={setCompetitorRemark}
                  handleCreateCompetition={handleCreateCompetition}
                />
              )}
            </View>
            <View style={{ margin: 15 }} />
          </View>
        </ScrollView>
      </View>
      {/* {network&&
      <ActionButton
        backdrop={false}
        activeOpacity={0.85}
        shadowStyle={styles1.elevation}
        backgroundTappable={false}
        buttonColor={'#54C130'}
        position="right"
        offsetX={25}
        offsetY={25}
        size={45}
        outRangeScale={1.1}
        inRangeScale={1.1}
        bgColor="rgba(0,0,0,.5)"
        degrees={180}
        renderIcon={() => <FdIcons name="nav-icon-grid" size={20} color={Colors.white} />}
      >
        <ActionButton.Item
          shadowStyle={styles1.elevation}
          size={35}
          title={'Create Case'}
          buttonColor="#1abc9c"
          textStyle={{
            color: '#1abc9c',
            fontFamily: FontFamily.PopinsMedium,
            fontSize: FontSize.smallText,
          }}
          onPress={() => {
            navigation.push('CreateCase', { navigateFrom: 'OutletView', outletId })
          }}>
          <Icon name="ticket" style={{ ...styles1.actionButtonIcon }} />
        </ActionButton.Item>
        </ActionButton>
      } */}
    </View>
  );
}
