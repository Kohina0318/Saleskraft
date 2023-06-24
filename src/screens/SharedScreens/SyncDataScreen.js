import { View, Text, StatusBar, FlatList, Image, BackHandler } from 'react-native';
import React, { useEffect } from 'react';
import FullsizeButton from '../../components/shared/FullsizeButton';
import { Colors } from '../../assets/config/Colors';
import styles from '../../assets/css/stylesDashboard';
import { openDatabase } from 'react-native-sqlite-storage';
import { addOrder, checkIn, checkOut } from '../../repository/SyncData/syncData';
import { useFocusEffect } from '@react-navigation/native';
import * as Progress from 'react-native-progress';
import { useToast } from 'react-native-toast-notifications';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
var db = openDatabase({ name: 'Beatdump.db' });

function Item({ item }) {
  return (
    <>
      <View style={{ flex: 1, alignSelf: 'center' }}>
        <Text>{item}</Text>
      </View>
    </>
  );
}

var checkDataAvailable = true;
var orderDataAvailable = true;

export default function SyncDataScreen(props) {

  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  const toast = useToast();
  const [gState, sState] = React.useState([
  ]);
  const network = useSelector(state => state.network);

  const [closeButtonTrue, setCloseButtonTrue] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);
  const [indeterminate, setIndeterminate] = React.useState(true);
  const [progress, setProgress] = React.useState(0);
  const customerDetails = useSelector(state => state.customerDetailsOutletId);


  function handleBackButtonClick() {
    return false;
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
  );
  console.log("props.route.params.navigateFrom==SYncDataScreen", props.route.params.navigateFrom)

  useEffect(() => {
    setRefresh(!refresh)
    checkDataAvailable = true;
    orderDataAvailable = true;
  }, [])

  const handleClose = () => {
    console.log("props.route.params.navigateFrom==SYncDataScreen", props.route.params.navigateFrom)
    if (props.route.params.navigateFrom == 'AirportRoute') {
      props.navigation.navigate('AirportRoute', {
        beatId: 'fromEndBeat',
        beatName: props.route.params.beatName
      })
    } else if (props.route.params.navigateFrom == 'OrderList') {
      props.navigation.push("OrderList", {
        outletId: customerDetails.Id,
        customerDetails: customerDetails,
        outletType:props.route.params.outletType,
        index: props.route.params.index,
        screen: 'fromSyncData',
        screen1: "fromSyncDataOrderDetails"
      });
    } else {
      props.navigation.goBack()
    }
  }

  useFocusEffect(React.useCallback(() => {
    async function temp() {
      try {
        animate()
        await syncAllDataCheckInCheckOutData()
        await getAllOrder()
        await syncAllOrderData()
      } catch (e) {
        toast.show('Something went wrong!, please try again later.', {
          type: 'danger',
          placement: 'bottom',
          duration: 3000,
          offset: 30,
          animationType: 'slide-in',
        });
      }
    }

    if (network) {
      temp()
    } else {
      toast.show('No internet', {
        type: 'danger',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
    }
  }, [props]))




  const animate = async () => {
    let progress = 0;
    setProgress(progress)
    setTimeout(() => {
      setIndeterminate(false)
      setInterval(() => {
        progress += Math.random() / 2;
        if (progress > 1) {
          progress = 1;
        }
        setProgress(progress)
      }, 100);
    }, 800);

  }


  const syncAllDataCheckInCheckOutData = async () => {
    if (checkDataAvailable) {
      await db.transaction(async tx => {
        await tx.executeSql(
          // `SELECT * FROM CheckinCheckout`,
          `SELECT * FROM CheckinCheckout where Checkout_Lat IS NOT NULL AND Checkout_Lng != '' AND SyncFlag = 0 limit 1`,
          [],
          async (tx, results) => {
            try {
              var resultExist = false;
              try {
                console.log("==== 51))))", results.rows.length)
                if (results.rows.length > 0) {
                  resultExist = true;
                }
              } catch (e) {
                resultExist = false;
              }
              console.log("tx==== Line 48", tx)
              console.log("resultExist Line 50===", resultExist)
              // console.log("results ==== Line 51===",results == undefined)
              // console.log("results.rows.item.length ==== Line 52===",results.rows.item(0).length)
              /**
               * 
               * results == undefined means No data Found in CheckInCheckout Table
               */
              if (resultExist) {
                /**
                 * if result true
                 */

                console.log(
                  '-------->CheckInCheckOut Line 46',
                  results.rows.item(0),
                );
                console.log(
                  '-------->CheckInCheckOut.Checkin_Lat',
                  results.rows.item(0).Checkin_Lat,
                );

                checkInCheckoutWithDelete(results.rows.item(0)).then(res => {
                  console.log("Line 82=-=-=-=-", res)
                  syncAllDataCheckInCheckOutData();
                }); // this will call api , send data, delete from database.
                console.log('Line 63 =====>');

              }
              // If
              else {
                console.log("HIii 73")
                checkDataAvailable = false;
                syncAllDataCheckInCheckOutData();
              }
            } catch (e) {
              console.log("Error in Catch Line 76==>", e)
              checkDataAvailable = false;
              syncAllDataCheckInCheckOutData();

            }
          },
          //End of async(tx,results) Function Line 60 ka
        );
      }); //End of db.tansaction
    } //end of if
  };

  const checkInCheckoutWithDelete = async item => {
    console.log("Come Inside checkInCheckoutWithDelete Line 82", item)
    try {
      await checkIn(
        item.chekin_address,
        item.Checkin_Lat,
        item.Checkin_Lng,
        item.OutletId,
        item.BeatId,
        item.StartTime
      ).then(async res => {
        if (res.statusCode == 200) {
          sState(prev => [
            ...prev,
            `OutletId ${item.OutletId} CheckIn Data Sync Successfully.`,
          ]);
          // console.log("res.data.CheckinId=================",res.data.CheckinId)

          /***
           * If checkin Successfull then fill chekin_checkout_id in Sales Order table against OutletId 
           */
          // await db.transaction(async tx=> {
          //        tx.executeSql(
          //         "UPDATE SalesOrder SET chekin_checkout_id=? where OutletId=?",
          //         [
          //           res.data.CheckinId,
          //           item.OutletId
          //         ],
          //         (tx, results) => {
          //           console.log("+++++++++++",tx.db.openError)
          //           console.log(
          //             'tx in SalesOrder query of chekin_checkout_id  in SyncDataScreen Line 102--->',
          //             tx,
          //           );
          //           // alert(JSON.stringify(results));
          //           console.log(
          //             'results in chekin_checkout_id  query of chekin_checkout_id  in SyncDataScreen Line 103--->',
          //             results,
          //           );
          //         },
          //         (errorr)=>{
          //           console.log("errorr Line 19666666666666666",errorr);
          //         }
          //       );


          //     }
          //     ).then(res => {
          //      console.log("Inside then 197=============",res)


          //     })

          /***
           * 
           * End checkin Successfull then fill chekin_checkout_id in Sales Order table against OutletId
           */
          await checkOut(
            item.chekout_address,
            item.Checkout_Lat,
            item.Checkout_Lng,
            item.OutletId,
            item.checkout_outcome_id,
            item.Remark,
            item.checkout_media,
            item.EndTime
          ).then(res => {
            if (res.statusCode == 200) {
              sState(prev => [
                ...prev,
                `OutletId ${item.OutletId} CheckOut Data Sync Successfully.`,
              ]);

              /***
               *
               * if checkOut Succesfully , need to delete perticular row of CheckInCheckout table
               */

              db.transaction(async tx => {
                await tx.executeSql(
                  `delete from CheckinCheckout where Id='${item.Id}'`,
                  [],
                  (tx, results) => {
                    console.log(
                      'tx in delete query of CheckinCheckout in SyncDataScreen Line 102--->',
                      tx,
                    );
                    console.log(
                      'results in delete query of CheckinCheckout in SyncDataScreen Line 103--->',
                      results,
                    );
                  },
                );
              });
            }//End of CheckOut If COndition
            /**
             * If statusCode != 200
             */
            else {

              sState(prev => [
                ...prev,
                `OutletId ${item.OutletId} CheckOut Data Sync Failed Due to ${res.message}.`,
              ]);

              db.transaction(async tx => {
                await tx.executeSql("UPDATE CheckinCheckout SET SyncFlag=?,ErrorMSG=? where Id=?", [
                  1,
                  res.message,
                  item.Id
                ], async (tx, results) => {
                  console.log("UPDATE checkinCheckout during internal Server Error in Checkout Api Line 170==>")
                });
              })
            }
          });//End of CheckOut then
        }
        //End of CheckIn If Condition
        /**
         * If statusCode == 400  &&  res.message == 'Already Check in'
         */
        else if (res.statusCode == 400 && res.message == 'Already Check in') {
          await checkOut(
            item.chekout_address,
            item.Checkout_Lat,
            item.Checkout_Lng,
            item.OutletId,
            item.checkout_outcome_id,
            item.Remark,
            item.checkout_media,
            item.EndTime
          ).then(res => {
            if (res.statusCode == 200) {
              /***
               *
               * if checkOut Succesfully Inside if res.message == 'Already Check in' , need to delete perticular row of CheckInCheckout table
               */
              db.transaction(async tx => {
                await tx.executeSql(
                  `delete from CheckinCheckout where Id='${item.Id}'`,
                  [],
                  (tx, results) => {
                    console.log(
                      'tx in delete query of CheckinCheckout in SyncDataScreen Line 102--->',
                      tx,
                    );
                    console.log(
                      'results in delete query of CheckinCheckout in SyncDataScreen Line 103--->',
                      results,
                    );
                  },
                );
              });//End of delete from CheckinCheckout inside res.message == 'Already Check in'
            }//End of if res.statusCode == 200 checkOut inside res.message == 'Already Check in'
            else {
              console.log("Line 187 else of checkOut inside res.message == 'Already Check in", res)
              /***
               * If Checkout Api Status != 200 then 
               * 
               */
              sState(prev => [
                ...prev,
                `OutletId ${item.OutletId} CheckOut Data Sync Failed Due to ${res.message}.`,
              ]);

              db.transaction(async tx => {
                await tx.executeSql("UPDATE CheckinCheckout SET SyncFlag=?,ErrorMSG=? where Id=?", [
                  1,
                  res.message,
                  item.Id
                ], async (tx, results) => {
                  console.log("UPDATE checkinCheckout during internal Server Error in Checkout Api Line 200==>")
                });
              })

            } //End of else checkOut inside res.message == 'Already Check in'

          })//End of CheckOut then Inside if res.message == 'Already Check in' 

            /**
             * If any internal server Error during CheckOut Inside if res.message == 'Already Check in'
             * if Any Internal Server Error occured during CheckOut Inside if res.message == 'Already    checkIn' API Change SyncFlag status 0 to 1 and Insert
             * Error msg in ErrorMSG field of CheckInCheckout table
             **/
            .catch(error => {
              console.log("Error in CheckOut Api Catch Line 197", error);
              sState(prev => [
                ...prev,
                `OutletId ${item.OutletId} CheckOut Data Sync Failed.`,
              ]);

              /****
               *  Then Change SyncFlag status 0 to 1 and Insert
               * Error msg in ErrorMSG field of CheckInCheckout table
               */

              db.transaction(async tx => {
                await tx.executeSql("UPDATE CheckinCheckout SET SyncFlag=?,ErrorMSG=? where Id=?", [
                  1,
                  error,
                  item.Id
                ], async (tx, results) => {
                  console.log("UPDATE checkinCheckout during internal Server Error in Checkout Api Line 216==>")
                });
              })

            })


        }//End of res.statusCode == 400 && res.message == 'Already Check in'
        else {
          console.log("Else Condition CheckIn Line 172==", res)
          sState(prev => [
            ...prev,
            `OutletId ${item.OutletId} CheckIn Data Sync Failed Due to ${res.message}.`,

            db.transaction(async tx => {
              await tx.executeSql("UPDATE CheckinCheckout SET SyncFlag=?,ErrorMSG=? where Id=?", [
                1,
                res.message,
                item.Id
              ], async (tx, results) => {
                console.log("UPDATE checkinCheckout during internal Server Error in Checkout Api Line 276==>")
              });
            })




          ]);
        }
      })//END of checkIn then
        /**
         * if Any Internal Server Error occured In CheckIn API
         */
        .catch(error => {
          console.log("Error in CheckIn Api Catch Line 168", error);
          /***
           * if Any Internal Server Error occured In CheckIn API Change SyncFlag status 0 to 1 and Insert
           * Error msg in ErrorMSG field of CheckInCheckout table
           */
          console.log("Error in CheckInCheckout Catch Line 134==>", error)
          sState(prev => [
            ...prev,
            `OutletId ${item.OutletId} CheckIn Data Sync Failed.`,
          ]);

          db.transaction(async tx => {
            await tx.executeSql("UPDATE CheckinCheckout SET SyncFlag=?,ErrorMSG=? where Id=?", [
              1,
              error,
              item.Id
            ], async (tx, results) => {
              console.log("UPDATE checkinCheckout during internal Server Error in Checkout Api Line 216==>")
            });
          })


        })//End of CheckIn Catch
    } catch (e) {
      //if any Error occurs During CheckIn or CheckOut
      console.log("Error in CheckInCheckout Catch Line 134==>", e)
      sState(prev => [
        ...prev,
        `OutletId ${item.OutletId} CheckIn Checkout Data Sync Failed.`,
      ]);

      await db.transaction(async tx => {
        await tx.executeSql("UPDATE CheckinCheckout SET SyncFlag=?,ErrorMSG=? where Id=?", [
          1,
          e,
          item.Id
        ], async (tx, results) => {
          console.log("UPDATE checkinCheckout during internal Server Error in Checkout Api Line 216==>")
        });
      })
    }
  };

  const syncAllOrderData = async () => {
    try {
      if (orderDataAvailable) {
        await db.transaction(async tx => {
          console.log("Inside syncAllOrderData Line 321=", tx.db)
          await tx.executeSql(
            `SELECT * FROM SalesOrder where SyncFlag = 0 limit 1`,
            [],
            async (tx, results) => {
              console.log("Sales Order Line 187====>", results)
              console.log("Sales Order Line 188====>", tx)
              if (results.rows.length > 0) {
                console.log("Sales Order Line 189====>", results.rows.item(0))
                /**
                 * if result true
                 */

                await tx.executeSql(
                  `SELECT * from SalesOrderLineItem where SalesOrderId=${results.rows.item(0).OrderId
                  }`,
                  [],
                  async (tx1, results1) => {
                    if (results1.rows.length > 0) {
                      var temp = [];
                      for (let i = 0; i < results1.rows.length; ++i) {
                        temp.push({
                          "product_id": `${results1.rows.item(i).ProductId}`,
                          "qty": results1.rows.item(i).Quantity
                        })
                      }
                      console.log('temp SalesOrderLineItem Line 186 ======> ', temp);

                      let body = {
                        "outlet_from_id": results.rows.item(0).ShipFrom,
                        "outlet_to_id": results.rows.item(0).ShipTo,
                        "beat_id": results.rows.item(0).chekin_checkout_id,
                        "product_line_item": temp
                      }
                      console.log("FInal Body Order===>", body)
                      orderDataWithDelete(body, results.rows.item(0).OrderId).then(res => {
                        syncAllOrderData()
                      })
                    } else {
                      console.log('Error In LineItem 188 ===> ', tx1);
                    }
                  },

                );

              }
              // If
              else {
                orderDataAvailable = false;
                syncAllOrderData();

              }
            }, //End of async(tx,results) Function Line 60 ka
          );
        }); //End of db.tansaction
      } //end of if
      else {
        setCloseButtonTrue(true);
      }
    } catch (e) {
      console.log("Error In SyncAllOrder Line 372====>", e)
    }
  };

  const orderDataWithDelete = async (body, orderId) => {
    try {
      await addOrder(body).then(res => {
        if (res.statusCode == 200) {
          sState(prev => [
            ...prev,
            `Order ${orderId} Sync Successfully.`,
          ]);

          db.transaction(async tx => {
            await tx.executeSql(
              `delete from SalesOrder where OrderId='${orderId}'`,
              [],
              (tx, results) => {
                console.log(
                  'tx in delete query of SalesOrder Line 442--->',
                  tx,
                );
                console.log(
                  'results in delete query query of SalesOrder Line 446--->',
                  results,
                );
              },
            );
          });


        } else {
          /**
           * 
           * If StatusCode != 200
           */
          console.log("Order Creation Failed Due to ==>", res)
          sState(prev => [
            ...prev,
            `Order ${orderId} Sync Failed due to ${res.message}`,
          ]);

          db.transaction(async tx => {
            await tx.executeSql("UPDATE SalesOrder SET SyncFlag=?,ErrorMSG=? where OrderId=?", [
              1,
              res.message,
              orderId
            ], async (tx, results) => {
              console.log("UPDATE SalesOrder duringOrder Creation Failed Due to ==> Error in addOrder Api Line 216==>")
            });
          })
        }
      })

    } catch (e) {
      console.log("Error in Catch OrderDataWithDelete in SyncDataScreen Line 416==>", e)

      sState(prev => [
        ...prev,
        `Order ${orderId} Sync Failed due to ${e}`,
      ]);

      await db.transaction(async tx => {
        await tx.executeSql("UPDATE SalesOrder SET SyncFlag=?,ErrorMSG=? where OrderId=?", [
          1,
          e,
          orderId
        ], async (tx, results) => {
          console.log("UPDATE SalesOrder during internal Server Error in addOrder Api Line 216==>")
        });
      })
    }


  };

  const getAllOrder = async () => {
    console.log("llllll 3222")
    await db.transaction(async tx => {
      await tx.executeSql(

        `SELECT * from SalesOrder`,

        [],
        async (tx, results) => {
          // console.log("llllll 3222",results)
          console.log("Length====>", results.rows.length)
          if (results.rows.length > 0) {
            console.log('results Line 183 ===>  SalesOrder', results);
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i) {
              temp.push(results.rows.item(i));
            }
            console.log('SalesOrder In SalesOrder ======> Line 639=====>', temp);
          } else {
            console.log('Error SalesOrde 31 In  Line 188 ===> ', tx);
          }
        },
      );
    });
  }


  return (
    <View style={{ flex: 1,  backgroundColor: themecolor.THEMECOLOR  }}>
      <StatusBar translucent backgroundColor="transparent" />

      {/* Header Start */}
      <View style={{ ...styles.header, height: 100, backgroundColor: themecolor.HEADERTHEMECOLOR, }}>
        <View style={styles.HeadView}></View>
      </View>
      {/* Header End */}
      <View style={{ alignSelf: 'center', flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
        <View style={{ marginVertical: 20 }} />
        <Progress.Circle
          indeterminate={indeterminate}
          showsText={true}
          color={Colors.green1}
          borderRadius={30}
          progress={progress}
          animated={true}
          size={120}
          thickness={5}
          //  width={300} 
          //  height={20} 
          indeterminateAnimationDuration={2000}
        />

      </View>
      <Image
        style={{
          width: 150,
          height: 150,
          resizeMode: 'contain',
          alignSelf: 'center',
        }}
        source={require('../../assets/images/sync.png')}
      />
      <FlatList
        data={gState}
        renderItem={({ item }) => <Item item={item} />}
      // keyExtractor={item => item.id}
      />

      {closeButtonTrue ? (
        <View
          style={{
            position: 'absolute',
            bottom: 5,
            justifyContent: 'center',
            alignSelf: 'center',
          }}>
          <FullsizeButton
            backgroundColor={themecolor.HEADERTHEMECOLOR}
            title="Close"
            onPress={() => handleClose()}
          />
        </View>
      ) : (
        <></>
      )}
    </View>
  );
}
