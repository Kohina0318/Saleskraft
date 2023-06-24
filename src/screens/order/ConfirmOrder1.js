import React, { useState } from 'react';
import {
  TouchableOpacity,
  StatusBar,
  View,
  Text,
  ScrollView,
} from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { Colors } from '../../assets/config/Colors';
import styles from '../../assets/css/styleProducts';
import {
  DistributorCard,
} from '../../components/order/OrderDataList';
import OHeader from '../../components/order/OHeader';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { getEmployeeId } from '../../repository/commonRepository';
import { db } from '../../helper/SQLite DB/Sqlite';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { store } from '../../../App';

export default function ConfirmOrder1(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  var orderData = useSelector(state => state.OutletCart);
  var navigateFromOnOutletView = useSelector(state => state.navigateFromOnOutletView);
  const primaryDistributor = useSelector(state=>state.primaryDistributor);
  console.log("primaryDistributor========>",primaryDistributor)
  var orderDataValues = Object.values(orderData);
  const [cartItems, setCartItems] = useState([]);
  const [shipFrom, setShipFrom] = useState('');
  const [shipToName, setShipToName] = useState('');
  const [shipFromName, setShipFromName] = useState('');

  // console.log("Ship From in COnfirm Order 1====>", shipFrom)

  useFocusEffect(
    React.useCallback(() => {
      setCartItems(orderDataValues);
      return () => {
        console.log('This will be logged on unmount');
      };
    }, []),
  );

 

  // console.log("CartItem--<", cartItems)

  handleSubmitOrder = async () => {
    var beatid = '';
    if (navigateFromOnOutletView == 'AirportRoute') {
      beatid = await AsyncStorage.getItem('@beatId');
    }
    let productArr = [];
    
    cartItems.map(item => {
      productArr.push({
        ProductId: item.Id,
        CategoryId: item.CategoryId,
        ProductName: item.ProductName,
        ProductSku: item.ProductSku,
        MRP: item.maxRetailPrice,
        PTR: item.sellingPrice,
        Quantity: item.quantity,
        CreatedDate: new Date(),
        SalesOrderId: '',
        OutletId: primaryDistributor.Id,
        totalPtr:item.TotalPtr,
        ptrMargin:item.ptrMargin,
        subTotal:item.subTotal
      });
    });
    store.dispatch({type:'ADD_ORDER_LINE_ITEMS',payload:productArr})

    var employeeid = await getEmployeeId();

    let body = {
      EmployeeId: `${await getEmployeeId()}`,
      ShipFrom: shipFrom,
      ShipTo: primaryDistributor.Id,
      CreatedDate: new Date(),
      SubTotal: props.route.params.subTotal,
      PTR_margin: props.route.params.ptrMargin,
      Total: props.route.params.Total,
      OutletId: primaryDistributor.Id,
      SOLI: productArr
    }



    await db.transaction(async function (tx) {
      await tx.executeSql(
        'INSERT INTO SalesOrder (EmployeeId, ShipFrom, ShipTo,CreatedDate,SubTotal,PTR_margin,Total,OutletId,chekin_checkout_id,ShipToName,ShipFromName) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
        [
          employeeid,
          shipFrom,
          productArr[0].OutletId,
          new Date(),
          props.route.params.subTotal,
          props.route.params.ptrMargin,
          props.route.params.Total,
          shipFrom,
          beatid,
          shipToName,
          shipFromName
        ],
        (tx, results) => {
          // alert("Sales Order=>",results);
          console.log('Results', results);


          /***** Sales Order Line Item Start ****/
          productArr.map(async (item) => {
            await db.transaction(async function (tx) {
              await tx.executeSql(
                'INSERT INTO SalesOrderLineItem (ProductId, CategoryId, ProductName,ProductSku,MRP,PTR,Quantity,CreatedDate,SalesOrderId) VALUES (?,?,?,?,?,?,?,?,?)',
                [
                  item.ProductId,
                  item.CategoryId,
                  item.ProductName,
                  item.ProductSku,
                  item.MRP,
                  item.PTR,
                  item.Quantity,
                  item.CreatedDate,
                  results.insertId
                ],
                (tx, results) => {
                  // alert("Sales Order=>",results);
                  console.log('Results', results);
                }
              );
            })
          })
          /***** Sales Order Line Item End ****/





        }
      );
    });




    // await  db.transaction(async function (tx) {
    //   await tx.executeSql(
    //       'SELECT * from SalesOrderLineItem',
    //       [  
    //       ],
    //       (tx, results) => {
    //         alert("Sales Order=>",results);

    //         var temp = [];
    //         for (let i = 0; i < results.rows.length; ++i) {
    //           temp.push(results.rows.item(i));
    //         }
    //         console.log('Results Line 152 --> Sales Order', temp);
    //       }
    //     );
    //   });





    console.log("Order Create Body -------->", body)

    props.navigation.push('ConfirmOrderSuccess');


  }

  return (
    <View style={{...styles.MainView,backgroundColor:themecolor.THEMECOLOR}}>
      <StatusBar translucent backgroundColor="transparent" />
      <OHeader title={'Confirm order'} Calign='center' navigateTo={''}/>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.FullHeight}>
        <View style={styles.MV} />
        <View style={styles.FLVIEW}>
          <View style={styles.CUSTOMERdvIEW}>
            <TouchableOpacity activeOpacity={0.5} style={{...styles.CUSTOMERVIEWTO,backgroundColor:themecolor.BOXTHEMECOLOR,borderColor:themecolor.BOXBORDERCOLOR1}}>
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
                    <Text style={{...styles.RateText,color:themecolor.TXTWHITE}}>Subtotal</Text>
                    <Text style={{...styles.RateText,color:themecolor.TXTWHITE}}>
                      <FAIcon name="rupee" size={11} /> {props.route.params.subTotal}
                    </Text>
                  </View>
                  <View
                    style={{
                      ...styles.FLEXDIREC1,
                      justifyContent: 'space-between',
                    }}>
                    <Text style={{...styles.RateText,color:themecolor.TXTWHITE}}>PTR margin</Text>
                    <Text style={{ ...styles.RateText, color: Colors.green1 }}>
                      <FAIcon name="rupee" size={11} /> {props.route.params.ptrMargin}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.border} />
              <View style={styles.NumberInputView}>
                <View>
                  <Text style={{...styles.RateTextbold,color:themecolor.TXTWHITE}}>Total</Text>
                </View>

                <View style={styles.FLEXDIREC1}>
                  <View>
                    <Text style={{...styles.RateTextbold,color:themecolor.TXTWHITE}}>

                      <FAIcon name="rupee" size={11} /> <Text>{props.route.params.Total}</Text>
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>


          <View style={styles.MV} />
          <Text style={{...styles.FLHeadText,color:themecolor.TXTWHITE,left:6}}>Fullfill by</Text>
          <DistributorCard setShipFrom={setShipFrom} setShipToName={setShipToName} setShipFromName={setShipFromName}/>


        </View>
        <View style={styles.MV50} />
      </ScrollView>
      <View >
        <FullsizeButton
          backgroundColor={themecolor.HEADERTHEMECOLOR}
          onPress={() => handleSubmitOrder()}
          title="Place order"
        />
      </View>
      <View style={{marginVertical:5}} />
    </View>
  );
}