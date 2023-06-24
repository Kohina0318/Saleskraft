import React, { useEffect, useState } from 'react';
import styles from '../../assets/css/styleProducts';
import { PaymentDetailsList, CustomerCard, StatusCard, DistributerCard, FlatListProductList } from '../../components/order/OrderdetailsData';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { getOrderById } from '../../repository/outlet/OutletRepositoy';
import LoaderAllInOne from '../../components/shared/Loader';
import { DeleteOrder } from '../../repository/order/OrderRepository';
import { useToast } from 'react-native-toast-notifications';
import { useNavigation } from '@react-navigation/native';
import { db } from '../../helper/SQLite DB/Sqlite';
import { useSelector } from 'react-redux';
import Header_2 from '../../components/shared/Header_2';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import FullsizeButton from '../../components/shared/FullsizeButton';
import {
  StatusBar,
  View,
  Text,
  ScrollView,
  Dimensions,
  BackHandler
} from 'react-native';
import ConfirmationModal from '../../components/Modals/ConfirmationModal';
import { gettripLocationApi } from '../../repository/trip/tripRepository';

const { width, height } = Dimensions.get('screen');

export default function Orderdetails(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  const toast = useToast();
  const network = useSelector(state => state.network);
  const primaryDistributor = useSelector(state => state.primaryDistributor);
  const customerDetailsOutletId = useSelector(state => state.customerDetailsOutletId);
  console.log("CUstomerDetails", customerDetailsOutletId)
  const [loader, setLoader] = useState(true);
  const navigation = useNavigation();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [index, setIndex] = useState(0);
  const [orderStatus, setOrderStatus] = useState({})
  const [customerDetails, setCustomerDetails] = useState([])
  const [distributer, setDistributer] = useState([])
  const [paymentDetails, setPaymentDetails] = useState([])
  const [productList, setProductList] = useState([])
  const [openModal, setOpenModal] = useState(false);

  function handleBackButtonClick() {
    props.navigation.goBack();
    return true;
  }

  React.useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);

  const handleSingleIndexSelect = index => {
    setSelectedIndex(index);
    if (index === 1) {
      setIndex(1);
    } else {
      setIndex(0);
    }
  };

  const handleOrderById = async () => {
    console.log("OrderId....>>", props.route.params.OrderId)
    try {
      if (network) {

        var res = await getOrderById(props.route.params.OrderId);

        console.log("OrderById...in OrderDetails Page line 331..>:", res.data.order.OrderStatus);
        if (res.statusCode == 200) {
          setOrderStatus(res.data.order.OrderStatus)
          setCustomerDetails([res.data.outletFrom])
          setDistributer([res.data.outletTo])
          setPaymentDetails([res.data.order])
          setProductList(res.data.order.Orderliness)
          setLoader(false);
        }
      } else {
        /**
         * for getting orderDetails from local DB
         */

        try {
          await db.transaction(async tx => {
            await tx.executeSql(`select * from SalesOrder where OutletId=${props.route.params.outletId} and ShipTo=${primaryDistributor.Id} and OrderId=${props.route.params.OrderId}`, [], (tx, results) => {
              console.log('result Line 76--->', results);
              var temp = [];
              for (let i = 0; i < results.rows.length; ++i) {
                let obj = {};
                obj = results.rows.item(i);
                obj['isoffline'] = true;
                temp.push(obj);
              }
              setOrderStatus({})
              setCustomerDetails([customerDetailsOutletId])
              setPaymentDetails(temp)
              console.log("OrderS From Local Databse Line 90 =====>", temp)

              /**
               * 
               * Get Data of Distributor
               */
              try {
                db.transaction(async tx => {
                  await tx.executeSql(`select * from PrimaryOutlets where Id=${temp[0].ShipTo}`, [], (tx, results) => {
                    console.log('result Line 76--->', results);
                    var temp1 = [];
                    for (let i = 0; i < results.rows.length; ++i) {

                      temp1.push(results.rows.item(i));
                    }
                    setDistributer(temp1)
                    console.log("PrimaryOutlets From Local Databse Line 111 =====>", temp1)

                    // console.log('Data returned From Outlets SQLITE ine 66 ----->', temp);

                  });
                });
              } catch (e) {
                console.log("Error in Catch Line 114===in OrderList", e)
              }

              /**
               * End
               */


              /**
               * 
               * Get Data of Line Items
               */
              try {
                db.transaction(async tx => {
                  // await tx.executeSql(`select * from PrimaryOutlets where Id=${temp[0].ShipTo}`, [], (tx, results) => {
                  await tx.executeSql(`select * from SalesOrder left join SalesOrderLineItem where SalesOrderLineItem.SalesOrderId=SalesOrder.OrderId and SalesOrder.OutletId=${props.route.params.outletId} and SalesOrder.ShipTo=${primaryDistributor.Id} and OrderId=${props.route.params.OrderId}`, [], (tx, results) => {

                    console.log('result Line 76--->', results);
                    var temp2 = [];
                    for (let i = 0; i < results.rows.length; ++i) {
                      let obj = {}
                      obj = results.rows.item(i);
                      obj['isOffline'] = true;
                      temp2.push(obj);
                    }

                    setProductList(temp2)
                    console.log("LineItems From Local Databse Line 137 =====>", temp2)

                    // console.log('Data returned From Outlets SQLITE ine 66 ----->', temp);

                  });
                });
              } catch (e) {
                console.log("Error in Catch Line 114===in OrderList", e)
              }

              /**
               * End of Get Data of Line Items
               */
            });
          });
        } catch (e) {
          console.log("Error in Catch Line 114===in OrderList", e)
        }
        //
        setLoader(false);
      }
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    handleOrderById();
  }, [])

  const handleClickOnDelete = async () => {
    try {
      console.log("OrderId.... in  DeleteOrder api>>", props.route.params.OrderId)
      let res = await DeleteOrder(props.route.params.OrderId)
      if (res.statusCode == 200) {
        toast.show('order deleted successfully!', {
          type: 'success',
          placement: 'bottom',
          duration: 3000,
          offset: 30,
          animationType: 'slide-in',
        });
        if (props.route.params.outletType == undefined) {
          props.navigation.push('OutletView', {
            item: props.route.params.item,
            screen: 'orderDetailItem'
          })
        }
        else if (props.route.params.screen1 != undefined) {
          props.navigation.push('OrderList', {
            outletId: props.route.params.outletId,
            outletType: props.route.params.outletType,
            index: props.route.params.index,
            screen: props.route.params.screen1
          })
        }
        else if (props.route.params.screen != undefined) {
          if (props.route.params.screenSALES != undefined) {
            props.navigation.push('OrderList', {
              outletId: props.route.params.outletId,
              outletType: props.route.params.outletType,
              index: props.route.params.index,
              screen: props.route.params.screenSALES,
              screenCancel: "screenCancelDelete"
            })
          } else {
            props.navigation.push('OrderList', {
              outletId: props.route.params.outletId,
              outletType: props.route.params.outletType,
              index: props.route.params.index,
              screen: props.route.params.screen,
            })
          }
        }
        else {
          props.navigation.goBack()
        }
      }


    } catch (e) {
      alert(e)
      // toast.show(e, {
      //   type: 'danger',
      //   placement: 'bottom',
      //   duration: 3000,
      //   offset: 30,
      //   animationType: 'slide-in',
      // });
    }
  }

  // const HandleButton = ({orderStatus}) => {
  //   // alert(orderStatus)
  //   if(orderStatus == 'Created'){
  //     return <FullsizeButton title="Cancel Order" onPress={() => handleClickOnDelete()}/>
  //   }
  //   else if(orderStatus == 'Accepted') {
  //     return <FullsizeButton title="Delete Order" onPress={() => handleClickOnDelete()}/>
  //   }
  //   else{
  //     return null
  //   }
  // }

  // function for changing order status into delivered======================

  const changeOrderStatus = async (orderId) => {
    try {
      const result = await gettripLocationApi(`api/orderMarkDelivered?order_id=${orderId}`);
      console.log(result)
      if (result.statusCode == 200) {
        toast.show(result.message, {
          type: 'success',
          placement: 'bottom',
          duration: 3000,
          offset: 30,
          animationType: 'slide-in',
        });
        props.navigation.goBack();
      } else {
        toast.show(result.message, {
          type: 'warning',
          placement: 'bottom',
          duration: 3500,
          offset: 30,
          animationType: 'slide-in',
        });
      }
    } catch (err) {
      console.log('Catch Error in Mark delieverd line 35', err)
    }
  }

  return (
    <>
      {loader ? (
        <LoaderAllInOne />
      ) : (
        <>
          <View style={{ ...styles.MainView, backgroundColor: themecolor.THEMECOLOR, flex: 1 }}>
            <StatusBar translucent backgroundColor="transparent" />
            <View style={{ ...styles.HeaderMainVIew, backgroundColor: themecolor.HEADERTHEMECOLOR }}>
              {/* <View style={styles.HeaderSecondView}>
                <View style={Headerstyles.touchview}>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => navigation.goBack()
                    }>
                    <Image
                      source={require('../../assets/images/back.png')}
                      style={Headerstyles.BackIcon}
                      resizeMode={'contain'}
                    />
                  </TouchableOpacity>
                  <View>
                    <Text style={{ ...Headerstyles.Text, top: 3, alignSelf: 'center', marginHorizontal: 10 }}>Order Details</Text>
                  </View>
                </View>
              </View> */}
              <Header_2 title={'Order Details'} onPress={() => navigation.goBack()} />
              <SegmentedControlTab
                values={['Summary', 'Items']}
                selectedIndex={selectedIndex}
                tabStyle={{ ...styles.tabStyle, backgroundColor: themecolor.HEADERTHEMECOLOR }}
                activeTabStyle={{ ...styles.activeTabStyle, backgroundColor: themecolor.HEADERTHEMECOLOR }}
                tabsContainerStyle={{
                  height: 32,
                }}
                // activeTabStyle={{ backgroundColor: Colors.bluetheme,}}
                tabTextStyle={{ ...styles.TabNewStyle, }}
                activeTabTextStyle={{ fontSize: 14 }}
                onTabPress={handleSingleIndexSelect}
              />
              <View style={styles.MV} />
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.FullHeight}>
              <View style={styles.MV} />
              {index === 0 ? (
                <View style={styles.FLVIEW}>

                  {Object.keys(orderStatus).length > 0 ?
                    (<>
                      <Text style={{ ...styles.FLHeadText12, color: themecolor.TXTWHITE, left: 2 }}>Status</Text>
                      <StatusCard orderStatus={[orderStatus]} />
                    </>) : (<></>)}

                  {customerDetails.length > 0 ?
                    (<>
                      <View style={styles.MV} />
                      <Text style={{ ...styles.FLHeadText12, color: themecolor.TXTWHITE, left: 2 }}>Customer details</Text>
                      <CustomerCard customerDetails={customerDetails} />
                    </>) : (<></>)
                  }

                  {distributer.length > 0 ?
                    (<>
                      <View style={styles.MV} />
                      <Text style={{ ...styles.FLHeadText12, color: themecolor.TXTWHITE, left: 2 }}>Distributor</Text>
                      <DistributerCard distributer={distributer} />
                    </>) : (<></>)}

                  {paymentDetails.length > 0 ?
                    (<>
                      <View style={styles.MV} />
                      <Text style={{ ...styles.FLHeadText12, color: themecolor.TXTWHITE, left: 2 }}>Payment details</Text>
                      <PaymentDetailsList props={props} paymentDetails={paymentDetails} />
                    </>) : (<></>)}

                  <View style={styles.MV} />
                </View>
              ) : (
                productList.length > 0 ?
                  (<>
                    <FlatListProductList productList={productList} />
                  </>) : (<></>)
              )}

              <View style={styles.MV50} />
            </ScrollView>
            {/* {orderStatus == 'Created'  ?
              <FullsizeButton title={'Cancel Order'} onPress={() => handleClickOnDelete()} backgroundColor={themecolor.HEADERTHEMECOLOR} />
              :
              <FullsizeButton title={'Delete Order'} onPress={() => handleClickOnDelete()} />
            } */}
            {/* < HandleButton orderStatus={orderStatus} /> */}
            {orderStatus == 'Created' ?
              <FullsizeButton backgroundColor={themecolor.HEADERTHEMECOLOR} title='Mark as delievered' onPress={() => {
                setOpenModal(!openModal)
              }}
              /> : <></>

            }
            <View style={{ marginVertical: 5 }} />

            {orderStatus == 'Created' || orderStatus == 'Accepted' ?
              (
                // <TouchableOpacity
                //   activeOpacity={0.7}
                //   onPress={() =>
                //     handleClickOnDelete()}
                // >
                //   <View
                //     style={{
                //       flexDirection: 'row',
                //       justifyContent: 'center',
                //       alignItems: 'center',
                //       borderRadius: 50,
                //       alignSelf: 'center',
                //       height: 40,
                //       width: width * 0.95,
                //       top: 10,
                //       backgroundColor: Colors.bluetheme,
                //       borderRadius: 10,
                //       bottom: 10
                //     }}>
                //     <Text style={{ ...styles.textStyle, color: Colors.white }}>
                //       Cancel order
                //     </Text>
                //   </View>
                // </TouchableOpacity>
                <FullsizeButton title={'Cancel/Delete order'} onPress={() => handleClickOnDelete()} backgroundColor={themecolor.HEADERTHEMECOLOR} />
              ) : <></>}
            <View style={{ marginVertical: 4 }} />
          </View>
          {openModal &&
            <ConfirmationModal
              btnlabel={'yes'}
              title='Are you sure you want to mark this order as delivered'
              modalVisible1={openModal}
              setmodalVisible1={setOpenModal}
              onConfirm={() => {
                changeOrderStatus( props.route.params.OrderId);
              }}
            />
          }
        </>
      )}
    </>
  );
}
