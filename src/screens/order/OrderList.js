import React, { useRef, useEffect, useState } from 'react';
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
import Headerstyles from '../../assets/css/styleTrip';
import RBSheet from 'react-native-raw-bottom-sheet';
import { ORDERSDetailsList } from '../../components/order/OrderdetailsData';
import { FlatListSortByOrderList } from '../beat/RBSheetSort';
import Header_2 from '../../components/shared/Header_2';
import { getAllOutletOrders, getOutletOrderFilter } from '../../repository/outlet/OutletRepositoy';
import { useDispatch, useSelector } from 'react-redux';
import { store } from '../../../App';
import { db } from '../../helper/SQLite DB/Sqlite';
import { StackActions, useNavigation, useFocusEffect } from '@react-navigation/native';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import FIcon from 'react-native-vector-icons/FontAwesome';
import NoData from '../../components/shared/NoData';
import { SharedMethod } from '../../repository/SyncData/SharedMethods';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';

const { height } = Dimensions.get('screen');
const OrderList = (props) => {

  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  const [loader, setLoader] = useState(true);
  const dispatch = useDispatch()
  const [selectedIndex, setSelectedIndex] = useState(props.route.params.index);
  const navigation = useNavigation();
  const refRBSheet1 = useRef();
  const [allOutletOrders, setAllOutletOrders] = useState([]);
  // const [primaryOrders, setPrimaryOrders] = useState([]);
  const [salesOrders, setSalesOrders] = useState([]);
  // const [getOffset, setOffset] = React.useState(0);
  // const [isLoading, setIsLoading] = React.useState(false);
  // const [getOffset1, setOffset1] = React.useState(0);
  // const [isLoading1, setIsLoading1] = React.useState(false);
  const [isDoneVisible, setIsDoneVisible] = React.useState(false);
  const orderListFilterRedux = useSelector(state => state.orderListFilter);
  const network = useSelector(state => state.network);
  // const orderListFilterReduxValue = Object.values(orderListFilterRedux);
  const orderListFilterReduxTemp = useSelector(state => state.orderListFilterTemporary);
  const orderListFilterReduxValueTemp = Object.values(orderListFilterReduxTemp);
  const [isOffset, setIsOffset] = React.useState(10);
  const [isOffset1, setIsOffset1] = React.useState(10);
  console.log("OrderList Filter====", orderListFilterRedux);
  const roles = useSelector(state => state.userRoles);
  const primaryDistributor = useSelector(state => state.primaryDistributor);

  function handleBackButtonClick() {

    // store.dispatch({ type: 'REMOVE_ORDER_LIST_FILTER_TEMPORARY' })
    // store.dispatch({ type: 'REMOVE_ORDER_LIST_FILTER' })

    if (props.route.params.screen == 'fromSyncData') {
      const popAction = StackActions.pop(8);
      navigation.dispatch(popAction);
      return true;
    }
    else if (props.route.params.screen == 'fromSyncDataOrderDetails') {
      const popAction = StackActions.pop(10);
      navigation.dispatch(popAction);
      return true;
    }
    else if (props.route.params.screen == 'ConfirmOrderSuccess') {
      if(props.route.params.screenCancel != undefined && props.route.params.screenCancel == 'screenCancelDelete'){
        const popAction = StackActions.pop(8);
        navigation.dispatch(popAction);
        return true;
      }else{
        const popAction = StackActions.pop(6);
        navigation.dispatch(popAction);
        return true;
      }
    }
    else if (props.route.params.screen == 'SalesOrderDetails') {  
      navigation.reset({
        index: 0,
        routes: [{ name: 'Sale' }],
      });
      return true;
    }
    else if (props.route.params.screen == 'viewAllRecentOrder') {
      const popAction = StackActions.pop(3);
      navigation.dispatch(popAction);
      return true;
    }
    else {
      props.navigation.goBack()
      return true;
     }

  }

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
  )

  const handleSingleIndexSelect = index => {
    setSelectedIndex(index);

    if (index == 1) {
      setSelectedIndex(1)
      props.route.params.index = 1
      setLoader(true)
    } else {
      setSelectedIndex(0)
      props.route.params.index = 0
      setLoader(true)
      store.dispatch({ type: 'REMOVE_ORDER_LIST_FILTER_TEMPORARY' })
      store.dispatch({ type: 'REMOVE_ORDER_LIST_FILTER' })
    }
  };

  useEffect(() => {
    async function temp() {
      var sharemethodobj = new SharedMethod();
      await sharemethodobj.syncAllDataCheckInCheckOutData();
      setTimeout(async () => {
        await sharemethodobj.changeFailedOrdersStatus();
        await sharemethodobj.syncAllOrderData();
      }, 2000);
    }
    try {
      if (network) {
        temp()
      }
    } catch (e) {
      console.log("Error Line 288 OrderList", e)
    }

    return () => {
      setAllOutletOrders([])
      console.log('This will be logged on unmount Line 296');
      store.dispatch({ type: 'REMOVE_ORDER_LIST_FILTER_TEMPORARY' })
      store.dispatch({ type: 'REMOVE_ORDER_LIST_FILTER' })
    }
  }, [network, selectedIndex])

  const handleAllOutletOrders = async () => {
    try {
      if (props.route.params.index == 1 || selectedIndex == 1) {
        var res = await getAllOutletOrders(props.route.params.outletId, true);
        if (res.statusCode === 200) {
          // var k = primaryOrders.concat(temp); 
          // setInActiveData(k)
          setAllOutletOrders(prev => ([...prev, res.data.Purchase.reverse()].flat()))
        }
      } else if (props.route.params.index == 0) {
        var res = await getAllOutletOrders(props.route.params.outletId, false);
        console.log("getAllOutletOrders.....in order List....163", res)
        if (res.statusCode === 200) {
          // setAllOutletOrders(prev=>([...prev,res.data.Sales.reverse()].flat()))
          setSalesOrders(prev => ([...prev, res.data.Sales.reverse()].flat()))
        }
      }
      else {
        console.log("OutletId... , Outlet Type...>>", props.route.params.outletId, props.route.params.outletType)
        var res = await getAllOutletOrders(props.route.params.outletId, props.route.params.outletType);
        console.log("getAllOutletOrders.....in order List....172", res)
        if (res.statusCode === 200) {
          if (props.route.params.outletType == false) {
            // setAllOutletOrders(prev=>([...prev,res.data.Sales.reverse()].flat()))
            setSalesOrders(prev => ([...prev, res.data.Sales.reverse()].flat()))
          } else {
            setAllOutletOrders(prev => ([...prev, res.data.Purchase.reverse()].flat()))
          }
        }
      }

    } catch (e) {
      console.log("Error getAllOutletOrders.......!!!")
    }
    setLoader(false);
  }

  const checkOrderSyncPendingOrNot = async () => {
    /****** Start *******/
    try {
      await db.transaction(async tx => {
        await tx.executeSql(`select * from SalesOrder where OutletId=${props.route.params.outletId} and ShipTo=${primaryDistributor.Id}`, [], (tx, results) => {
          // await tx.executeSql(`select * from SalesOrder left join SalesOrderLineItem where SalesOrderLineItem.SalesOrderId=SalesOrder.OrderId and SalesOrder.OutletId=${props.route.params.outletId} and SalesOrder.ShipTo=${primaryDistributor.Id}`, [], (tx, results) => {
          try {
            console.log('result Line 141--->', results);
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i) {
              let obj = results.rows.item(i);
              obj["isoffline"] = true
              temp.push(obj);
            }
            if (results.rows.length > 0) {
              setAllOutletOrders(temp.reverse());
            } else {
              setAllOutletOrders([]);
            }
          } catch (e) {
            setAllOutletOrders([]);
          }
          console.log("OrderS From Local Databse===>", temp)
          // if (temp.length > 0) {
          //   Alert.alert(
          //     'Alert',
          //     'Please Sync your order.',
          //     [
          //       {
          //         text: 'Ok',
          //         onPress: () => {
          //           if (network) {
          //             props.navigation.push('SyncDataScreen', {
          //               navigateFrom: 'OrderList',
          //               outletType: props.route.params.outletType,
          //               index: props.route.params.index,
          //             })
          //           } else {
          //             Alert.alert("Warning", "No internet.");
          //             props.navigation.push('Dashboard');
          //           }
          //         },
          //       },
          //     ],
          //     { cancelable: false },
          //   );
          // }
          console.log('Data returned From Outlets SQLITE ine 66 ----->', temp);
        });
      });
    } catch (e) {
      console.log("Error in Catch Line 114===in OrderList", e)
    }



    /****** End *******/

    // try {
    //   await db.transaction(async tx => {
    //     await tx.executeSql(`select * from SalesOrder`, [], (tx, results) => {

    //       console.log('result Line 141--->', results);
    //       var temp = [];
    //       for (let i = 0; i < results.rows.length; ++i) {
    //         temp.push(results.rows.item(i));
    //       }
    //       if (temp.length > 0) {
    //         Alert.alert(
    //           'Alert',
    //           'Please Sync your order.',
    //           [
    //             {
    //               text: 'Ok',
    //               onPress: () => {
    //                 if (network) {
    //                   props.navigation.push('SyncDataScreen', {
    //                     navigateFrom: 'OrderList',
    //                     outletType: props.route.params.outletType,
    //                     index: props.route.params.index,
    //                   })
    //                 } else {
    //                   Alert.alert("Warning", "No internet.");
    //                   props.navigation.push('NewDashboard');
    //                 }
    //               },
    //             },
    //           ],
    //           { cancelable: false },
    //         );
    //       }
    //       console.log('Data returned From Outlets SQLITE ine 66 ----->', temp);
    //     });
    //   });
    // } catch (e) {
    //   console.log("Error in Catch Line 114===in OrderList", e)
    // }
  }

  React.useEffect(() => {
    async function temp() {
      try {
        if (props.route.params.screen == 'fromSyncData') {
        } else {
          checkOrderSyncPendingOrNot()
        }
      } catch (e) {
        checkOrderSyncPendingOrNot()
      }
    }
    temp()
    return () => {
      setAllOutletOrders([])
      store.dispatch({ type: 'REMOVE_ORDER_LIST_FILTER_TEMPORARY' })
      store.dispatch({ type: 'REMOVE_ORDER_LIST_FILTER' })
    }
  }, [network, selectedIndex])



  useEffect(() => {
    handleAllOutletOrders()
    return () => {
      console.log('This will be logged on unmount Line 307');
      store.dispatch({ type: 'REMOVE_ORDER_LIST_FILTER_TEMPORARY' })
      store.dispatch({ type: 'REMOVE_ORDER_LIST_FILTER' })
    }
  }, [selectedIndex, network])

  const handleClickOnDone = async () => {
    console.log("oooooooooooooooo", orderListFilterReduxValueTemp[0])
    store.dispatch({ type: 'ADD_ORDER_LIST_FILTER', payload: [orderListFilterReduxValueTemp[0], orderListFilterReduxValueTemp[0]] })

    var res = await getOutletOrderFilter(props.route.params.outletId, orderListFilterReduxValueTemp[0], true);
    console.log("getOutletOrderFilter.....in order List....", res)
    if (res.statusCode === 200) {
      setAllOutletOrders(res.data.Purchase.reverse())
      refRBSheet1.current.close();
    } else {
      setAllOutletOrders([]);
      refRBSheet1.current.close();
    }
    setIsDoneVisible(false);
  }

  return (
    <View style={{ ...styles.bg,backgroundColor:themecolor.THEMECOLOR }}>
      <StatusBar translucent backgroundColor="transparent" />


      {roles.includes('can_do_primary_order') ? (
        <View style={{...styles1.HeaderMainVIew, backgroundColor:themecolor.HEADERTHEMECOLOR}}>
          <View style={styles1.HeaderSecondView}>
            <View style={Headerstyles.touchview}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                  store.dispatch({ type: 'REMOVE_ORDER_LIST_FILTER_TEMPORARY' })
                  store.dispatch({ type: 'REMOVE_ORDER_LIST_FILTER' })
                  setIsDoneVisible(false)
                  handleBackButtonClick()
                }}
              >
                <Image
                  source={require('../../assets/images/back.png')}
                  style={Headerstyles.BackIcon}
                  resizeMode={'contain'}
                />
              </TouchableOpacity>
              <View>
                <Text style={{ ...Headerstyles.Text, top: 3, alignSelf: 'center', marginHorizontal: 10, }}>
                  Order List
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'flex-end',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}>
                {props.route.params.index == 1 && network ?
                  <TouchableOpacity onPress={() => refRBSheet1.current.open()}>
                    <FIcon
                      name="filter"
                      size={20}
                      color="white"
                      style={{ top: 0, right: 15 }}
                    />
                  </TouchableOpacity>
                  : <></>}
              </View>
            </View>
          </View>
          <SegmentedControlTab
            values={['Sales', 'Purchase']}
            selectedIndex={selectedIndex}
            tabStyle={{...styles1.tabStyle,backgroundColor:themecolor.HEADERTHEMECOLOR}}
            activeTabStyle={{...styles1.activeTabStyle,backgroundColor:themecolor.HEADERTHEMECOLOR}}
            tabsContainerStyle={{
              height: 35,
            }}
            // activeTabStyle={{ backgroundColor: Colors.bluetheme,}}
            tabTextStyle={{ ...styles1.TabNewStyle, justifyContent: 'center', alignContent: "center", color: '#1B1464' }}
            activeTabTextStyle={styles1.activeTabs}
            onTabPress={handleSingleIndexSelect}
          />
          <View style={styles1.MV} />
        </View>
      ) : (
        <Header_2 title={props.route.params.index == 1 ?"Order List":"Sales Order List"} iconname={props.route.params.index == 1 ? "filter" : ''} Size={20} onPressIcon={() => refRBSheet1.current.open()} onPress={() => {
          store.dispatch({ type: 'REMOVE_ORDER_LIST_FILTER_TEMPORARY' })
          store.dispatch({ type: 'REMOVE_ORDER_LIST_FILTER' })
          setIsDoneVisible(false)
          handleBackButtonClick()
        }} />
      )}

      <View style={styles.MV5} />
      {props.route.params.index > 0 ? (
        loader ? (
          <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            height: 650,
          }}>
            <Image
              style={{
                alignSelf: 'center',
                height: 160,
                width: 100,
              }}
              source={require('../../assets/images/dot.gif')}
            />
          </View>
        ) : (
          <>
            <View style={{ flex: 1,}}>
              {allOutletOrders.length > 0 ?
                <ORDERSDetailsList allOutletOrders={allOutletOrders.slice(0, isOffset)} outletId={props.route.params.outletId} outletType={props.route.params.outletType}
                  index={props.route.params.index} screen="viewAllRecentOrder" screen1={props.route.params.screen1}
                  screenSALES={props.route.params.screen} setIsOffset={setIsOffset} isOffset={isOffset} />
                :
                <NoData message="No Order Found!" />
              }
              <View style={{ marginVertical: 8 }} />
            </View>
          </>

        )
      ) : (
        loader ? (
          <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            height: 650,
          }}>
            <Image
              style={{
                alignSelf: 'center',
                height: 160,
                width: 100,
              }}
              source={require('../../assets/images/dot.gif')}
            />
          </View>
        ) : (
          <>
            {salesOrders.length > 0 ?
              <ORDERSDetailsList allOutletOrders={salesOrders.slice(0, isOffset1)} setIsOffset={setIsOffset1} isOffset={isOffset1} />
              :
              <NoData message="No Order Found!" />
            }
            <View style={{ marginVertical: 8 }} />
          </>
        )
      )}


      {/* RBSHEET  */}
      <RBSheet
        ref={refRBSheet1}
        animationType={'slide'}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          container: {
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            padding: 10,
            height: height * 0.35,
            backgroundColor:themecolor.RB2
          },
          draggableIcon: {
            display: 'none',
          },
        }}>
        <View style={styles.RBVIEW}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              dispatch({ type: 'REMOVE_ORDER_LIST_FILTER_TEMPORARY' })
              refRBSheet1.current.close()
            }
            }>
            <Image
              source={require('../../assets/images/close.png')}
              style={styles.CloseIcon}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
          <View>
            <Text style={{ ...styles.CardText,color:themecolor.TXTWHITE }}>Set Filters</Text>
          </View>
          <View>
            {isDoneVisible ?
              (
                <View>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => handleClickOnDone()}>
                    <Text style={{...styles.RBText1,color:themecolor.TXTWHITE}}>Done</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <>
                </>
              )
            }
          </View>
        </View>
        {/* <View style={{...styles.Borderline}} /> */}
        <View style={styles.SortView}>
          <View style={styles.MV3} />
          <View style={styles.Width9}>
            <Text style={{...styles.CardText1,color:themecolor.TXTWHITE}}>Order status filter</Text>
          </View>
          <FlatListSortByOrderList setIsDoneVisible={setIsDoneVisible} />
          <View style={styles.MV3} />
        </View>
      </RBSheet>

    </View >
  )
}

export default OrderList;
