import { db } from "../../helper/SQLite DB/Sqlite";
import { getOutletDump } from "../outlet/OutletRepositoy";
import { checkIn,checkOut,addOrder } from "./syncData";

class SharedMethod {
    constructor() {
        
        this.checkDataAvailable = true;
        this.orderDataAvailable = true;
      }

       syncAllDataCheckInCheckOutData = async () => {
        if (this.checkDataAvailable) {
          await db.transaction(async tx => {
            await tx.executeSql( 
              `SELECT * FROM CheckinCheckout where Checkout_Lat IS NOT NULL AND Checkout_Lng != '' AND SyncFlag = 0 limit 1`,
               [],
              async (tx, results) => {
                try{
                var resultExist = false;
                try{
         
                  console.log("==== 51))))",results.rows.length)
                  if(results.rows.length > 0){
                    resultExist = true;
                  }
                }catch(e){
                  resultExist = false;
                }
                console.log("tx==== Line 48",tx)
                console.log("resultExist Line 50===",resultExist)
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
    
                  this.checkInCheckoutWithDelete(results.rows.item(0)).then(res=>{
                    console.log("Line 82=-=-=-=-",res)
                    this.syncAllDataCheckInCheckOutData();
                  }); // this will call api , send data, delete from database.
                  console.log('Line 63 =====>');
                  
                }
                // If
                else {
                  console.log("HIii 73")
                  this.checkDataAvailable = false;
                  this.syncAllDataCheckInCheckOutData();
                }
                }catch(e){
                  console.log("Error in Catch Line 76==>",e)
                  this.checkDataAvailable = false;
                  this.syncAllDataCheckInCheckOutData();
             
                }
              },
               //End of async(tx,results) Function Line 60 ka
            );
          }); //End of db.tansaction
        } //end of if
      };
    
       checkInCheckoutWithDelete = async item => {
        console.log("Come Inside checkInCheckoutWithDelete Line 82",item)
        try {
         await checkIn(
          item.chekin_address,
          item.Checkin_Lat,
          item.Checkin_Lng,
          item.OutletId,
          item.BeatId,
          item.StartTime      
          ).then( async res => {
            if (res.statusCode == 200) {
           
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
                else{
                  
                  
    
                  db.transaction(async tx => {
                    await tx.executeSql("UPDATE CheckinCheckout SET SyncFlag=?,ErrorMSG=? where Id=?", [
                      1,
                      res.message,
                      item.Id
                    ], async(tx, results) => {
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
            else if(res.statusCode == 400 && res.message == 'Already Check in'){
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
                if(res.statusCode == 200){
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
                else{
                  console.log("Line 187 else of checkOut inside res.message == 'Already Check in",res)
                   /***
                    * If Checkout Api Status != 200 then 
                    * 
                    */
                   
    
                     db.transaction(async tx => {
                      await tx.executeSql("UPDATE CheckinCheckout SET SyncFlag=?,ErrorMSG=? where Id=?", [
                        1,
                        res.message,
                        item.Id
                      ], async(tx, results) => {
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
                console.log("Error in CheckOut Api Catch Line 197",error);
              
               
               /****
                *  Then Change SyncFlag status 0 to 1 and Insert
                * Error msg in ErrorMSG field of CheckInCheckout table
                */
    
               db.transaction(async tx => {
                  await tx.executeSql("UPDATE CheckinCheckout SET SyncFlag=?,ErrorMSG=? where Id=?", [
                    1,
                    error,
                    item.Id
                  ], async(tx, results) => {
                    console.log("UPDATE checkinCheckout during internal Server Error in Checkout Api Line 216==>")   
                  });
                })
                  
               })
             
    
            }//End of res.statusCode == 400 && res.message == 'Already Check in'
            else{
             console.log("Else Condition CheckIn Line 172==",res)
            
    
          db.transaction(async tx => {
                await tx.executeSql("UPDATE CheckinCheckout SET SyncFlag=?,ErrorMSG=? where Id=?", [
                  1,
                  res.message,
                  item.Id
                ], async(tx, results) => {
                  console.log("UPDATE checkinCheckout during internal Server Error in Checkout Api Line 276==>")   
                });
              })
    
    
    
    
            
            }
          })//END of checkIn then
          /**
           * if Any Internal Server Error occured In CheckIn API
           */
          .catch(error=>{
           console.log("Error in CheckIn Api Catch Line 168",error);
           /***
            * if Any Internal Server Error occured In CheckIn API Change SyncFlag status 0 to 1 and Insert
            * Error msg in ErrorMSG field of CheckInCheckout table
            */
            console.log("Error in CheckInCheckout Catch Line 134==>",error)
           
      
             db.transaction(async tx => {
              await tx.executeSql("UPDATE CheckinCheckout SET SyncFlag=?,ErrorMSG=? where Id=?", [
                1,
                error,
                item.Id
              ], async(tx, results) => {
                console.log("UPDATE checkinCheckout during internal Server Error in Checkout Api Line 216==>")   
              });
            })
            
    
          })//End of CheckIn Catch
        } catch (e) {
          //if any Error occurs During CheckIn or CheckOut
          console.log("Error in CheckInCheckout Catch Line 134==>",e)
         
    
          await db.transaction(async tx => {
            await tx.executeSql("UPDATE CheckinCheckout SET SyncFlag=?,ErrorMSG=? where Id=?", [
              1,
              e,
              item.Id
            ], async(tx, results) => {
              console.log("UPDATE checkinCheckout during internal Server Error in Checkout Api Line 216==>")   
            });
          })
        }
      };


      /*****  SyncAllOrderData  ******/
       syncAllOrderData = async() => {
        try{
        if (this.orderDataAvailable) {          
          await db.transaction(async tx => {
            console.log("Inside syncAllOrderData Line 321=",tx.db)
            await tx.executeSql(
              `SELECT * FROM SalesOrder where SyncFlag = 0 limit 1`,
              [],
               async(tx, results) => {
                console.log("Sales Order Line 187 sh====>",results)
                console.log("Sales Order Line 188====>",tx)
                if (results.rows.length > 0) {
                  console.log("Sales Order Line 189====>",results.rows.item(0))
                  /**
                   * if result true
                   */
                
                  await tx.executeSql(
                      `SELECT * from SalesOrderLineItem where SalesOrderId=${
                        results.rows.item(0).OrderId
                      }`,
                      [],
                      async (tx1, results1) => {                 
                        if (results1.rows.length > 0) {
                          var temp = [];
                          for (let i = 0; i < results1.rows.length; ++i) {
                           temp.push({
                            "product_id":`${results1.rows.item(i).ProductId}`,
                            "qty": results1.rows.item(i).Quantity
                           })
                          }
                          console.log('temp SalesOrderLineItem Line 186 ======> ', temp);
                        
                          let body = {
                              "outlet_from_id": results.rows.item(0).ShipFrom,
                              "outlet_to_id": results.rows.item(0).ShipTo,
                              "beat_id":results.rows.item(0).chekin_checkout_id,
                              "product_line_item":temp
                          }
    
                          console.log("FInal Body Order===>",body)
                           this.orderDataWithDelete(body,results.rows.item(0).OrderId).then(res=>{
                            this.syncAllOrderData()
                           })                  
                        } else {
                          console.log('Error In LineItem 188 ===> ', tx1);
                        }
                      },
                      
                    );
                 
                }
                // If
                else {
                  this.orderDataAvailable = false;
                  this.syncAllOrderData();
                 
                }
              }, //End of async(tx,results) Function Line 60 ka
            );
          }); //End of db.tansaction
        } //end of if
      else{
        // setCloseButtonTrue(true);
      }
      }catch(e){
        console.log("Error In SyncAllOrder Line 372====>",e)
      }
      };
    

        /*****  orderDataWithDelete  ******/
      orderDataWithDelete = async (body,orderId) => {
         try{
          await addOrder(body).then(res => {
            if(res.statusCode == 200){
            
    
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
    
    
            }else{
              /**
               * 
               * If StatusCode != 200
               */
              console.log("Order Creation Failed Due to ==>",res)
             
        
              db.transaction(async tx => {
                await tx.executeSql("UPDATE SalesOrder SET SyncFlag=?,ErrorMSG=? where OrderId=?", [
                  1,
                  res.message,
                  orderId
                ], async(tx, results) => {
                  console.log("UPDATE SalesOrder duringOrder Creation Failed Due to ==> Error in addOrder Api Line 216==>")   
                });
              })
            }
          })
          
         }catch(e){
          console.log("Error in Catch OrderDataWithDelete in SyncDataScreen Line 416==>",e)
          
    
          await db.transaction(async tx => {
            await tx.executeSql("UPDATE SalesOrder SET SyncFlag=?,ErrorMSG=? where OrderId=?", [
              1,
              e,
              orderId
            ], async(tx, results) => {
              console.log("UPDATE SalesOrder during internal Server Error in addOrder Api Line 216==>")   
            });
          })
         }
    
    
      };


      insertStockDataIfNotInserted = async () => { 
     
        try {
          db.transaction(txn => {
           txn.executeSql(
                `Select * from Stock`,
             [],
             async (tx1, results) => {
                // alert(results.rows.length)
               console.log("Length============76",results.rows.length)
               if(results.rows.length === 0){
              
              /****New Start */
              try{
                let res = await getOutletDump();
                if(res.statusCode == 200){
    
                 db.transaction(async function (tx) {
                    console.log("_+++++++)))))))) res.stocks==",res.data.Stocks);
                      res.data.Stocks.forEach(async item=>{
            
                      console.log("key==========>",item);
                      console.log("key==========>",item.OutletStockId);
                            await tx.executeSql(
                              'INSERT INTO Stock (OutletStockId,OutletId, ProductId,FreeQty,ReservedQty,BsdQty,CompanyId,LastSync) VALUES (?,?,?,?,?,?,?,?)',
                              [
                                item.OutletStockId,
                                item.OutletId,
                                item.ProductId,
                                item.FreeQty,
                                item.ReservedQty,
                                item.BsdQty,
                                item.CompanyId,
                                item.LastSync,
                              ],
            
                              (tx, results) => {
                                console.log('tx----- In InsertData Line 331', tx);
                               
                                console.log(
                                  'Results In Insertion Data into Stock 30===',
                                  results.rowsAffected,
                                );
                                if (results.rowsAffected > 0) {
                                  //  alert("Stock Data Inserted")
                                  // Alert.alert(
                                  //   'Success',
                                  //   'Data inserted Successfully',
                                  //   [
                                  //     {
                                  //       text: 'Ok',
                                  //       onPress: () => props.navigation.navigate('NewDashboard'),
                                  //     },
                                  //   ],
                                  //   {cancelable: false},
                                  // );
                                } else {
            
                                }
                              },
                            );
                          })
            })//End of Db.transaction
                }//End of IF
              }catch(e){
                console.log("Error in catch Line 64 in insertStockData")
              }
              /****New End */ 
              
             }
             }
             );
         });
       } catch (e) {
         alert(e);
       }
    
    
       
        }

      changeFailedOrdersStatus = async () =>{

        /**
         * 
         * Start of Updation
         */
        db.transaction(async tx => {
          await tx.executeSql("UPDATE SalesOrder SET SyncFlag=?,ErrorMSG=?", [
            0,
            null
          ], async(tx, results) => {
            console.log("UPDATE SalesOrder during changeFailedOrdersStatus Line 568 in SharedMethods==>")   
          });
        }) 
        /**
         * 
         *End of Updation
         */
      }  


}

export{SharedMethod}




