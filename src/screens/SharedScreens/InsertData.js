import { db } from '../../helper/SQLite DB/Sqlite';
import { getOutletDump, getOutletOutcomes } from '../../repository/outlet/OutletRepositoy';

const insertStockData = async () => {
  // alert("Beat id in insertStockData "+beatid)
  try {
    let res = await getOutletDump();
    if (res.statusCode == 200) {
      db.transaction(function (txn) {
        console.log("_+++++++)))))))) res.stocks==", res.data.Stocks);
        res.data.Stocks.forEach(item => {
          console.log("key==========>", item);
          console.log("key==========>", item.OutletStockId);
          try {
            txn.executeSql(
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
                // alert(
                //   'Insertion Data into Stock' + JSON.stringify(results),
                // );

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
          } catch (e) {
            alert("Catch Line 58 in insertStockData==>" + e);
          }
        })
      })//End of Db.transaction
    }//End of IF
  } catch (e) {
    console.log("Error in catch Line 64 in insertStockData")
  }
}

const insertStockDataIfNotInserted = async () => {
  // alert("Hii")
  try {
    db.transaction(async txn => {
      txn.executeSql(
        `Select * from Stock`,
        [],
        async (tx1, results) => {
          console.log("Length============76", results.rows.length)
          if (results.rows.length === 0) {

            /****New Start */
            try {
              let res = await getOutletDump();
              if (res.statusCode == 200) {

                db.transaction(async function (tx) {
                  console.log("_+++++++)))))))) res.stocks==", res.data.Stocks);
                  res.data.Stocks.forEach(async item => {

                    console.log("key==========>", item);
                    console.log("key==========>", item.OutletStockId);
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
            } catch (e) {
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

const insertMappingData = async () => {
  //**********/ Mapping Table Insertion Start *********************
  //  try {
  //         let res = await getOutletDump();
  //         if(res.statusCode == 200){
  //        await db.transaction(async function (tx) {
  //          console.log('tx-------->', tx);
  //          Object.keys(res.data.Outlets).map(async item=>{ 
  //         res.data.Outlets[item].Mapping.map( async item1 => {
  //            console.log('itm------->235=====', item1);
  //            await tx.executeSql(
  //              'INSERT INTO Mapping(MappingId,PrimaryOutletId, SecondaryOutletId, PricebookId,Isdefault,CategoryType) VALUES (?,?,?,?,?,?)',
  //              [
  //                item1.MappingId,
  //                item1.PrimaryOutletId,
  //                item1.SecondaryOutletId,
  //                item1.PricebookId,
  //                item1.Isdefault,
  //                item1.CategoryType,
  //              ],
  //              (tx, results) => {
  //                console.log('tx----- In InsertData Mapping Line 177', tx);
  //                alert(
  //                  'Insertion Data into Mapping ' +
  //                    JSON.stringify(results),
  //                );
  //                console.log(
  //                  'Results In Insertion Data into Mapping',
  //                  results.rowsAffected,
  //                );
  //                if (results.rowsAffected > 0) {
  //                  // Alert.alert(
  //                  //   'Success',
  //                  //   'Data inserted Successfully',
  //                  //   [
  //                  //     {
  //                  //       text: 'Ok',
  //                  //       onPress: () => navigation.navigate('NewDashboard'),
  //                  //     },
  //                  //   ],
  //                  //   {cancelable: false},
  //                  // );
  //                } else alert('Insertion Data into Mapping Failed');
  //              },
  //            );
  //          }); //End of Inner Map
  //         })
  //        }); //End of inner Transaction
  //       }
  //        else{
  //          console.log("StatusCode of getOutletDump===>",res)
  //       }
  //       } catch (e) {
  //        alert('In catch during Insert Data Into Products');
  //      }


  try {
    let res = await getOutletDump();
    if (res.statusCode == 200) {
      db.transaction(async function (tx) {
        Object.keys(res.data.Outlets).forEach(async item => {
          console.log("res.data.Outlets", item)
          res.data.Outlets[item].Mapping.map(async item2 => {
            console.log("Line 132==================++++++}}}}}---->", item2)
            // {"CategoryType": "Regular", "Isdefault": 0, "MappingId": 119, "PricebookId": null, "PrimaryOutletId": 81, "SecondaryOutletId": 129}   

            // Mapping(MappingId INTEGER(15),PrimaryOutletId INT(15),SecondaryOutletId INT(15),PricebookId VARCHAR(120),Isdefault INT(15),CategoryType VARCHAR(80))`,
            await tx.executeSql(
              'INSERT INTO Mapping (MappingId,PrimaryOutletId,SecondaryOutletId,PricebookId,Isdefault,   CategoryType) VALUES (?,?,?,?,?,?)',
              [
                item2.MappingId,
                item2.PrimaryOutletId,
                item2.SecondaryOutletId,
                item2.PricebookId,
                item2.Isdefault,
                item2.CategoryType,
              ],

              (tx, results) => {
                console.log('tx----- In InsertData Line 331', tx);
                // alert(
                //   'Insertion Data into Mapping' + JSON.stringify(results),
                // );
                console.log(
                  'Results In Insertion Data into Mapping',
                  results.rowsAffected,
                );
                if (results.rowsAffected > 0) {
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

        })
      })//End of Db.transaction
    }//End of IF
  } catch (e) {
    console.log("Error in catch Line 64 in insertStockData")
  }


  //************** Mapping Table Insertion End *********************
}

const outletBeatDump = async () => {
  let res = await getOutletDump();
  if (res.statusCode == 200) {
    // Table Product category Start
    try {
      db.transaction(async function (tx) {
        console.log('tx-------->', tx);
        res.data.Products.map(async item => {
          await tx.executeSql(
            'INSERT INTO Product_category (Id,CategoryName,CategoryType, CategoryDescription, CategoryMedia,CategoryDisplayOrder,CategoryParentId,AdditionalData,CompanyId,CreatedAt,UpdatedAt) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
            [
              item.Id,
              item.CategoryName,
              item.CategoryType,
              item.CategoryDescription,
              item.CategoryMedia,
              item.CategoryDisplayOrder,
              item.CategoryParentId,
              item.AdditionalData,
              item.CompanyId,
              item.CreatedAt,
              item.UpdatedAt,
            ],

            (tx, results) => {
              console.log('tx----- In InsertData Line 51', tx);
              // alert(
              //   'Insertion Data into Product_category' +
              //     JSON.stringify(results),
              // );
              console.log(
                'Results In Insertion Data into Product_category',
                results.rowsAffected,
              );
              if (results.rowsAffected > 0) {
                // Alert.alert(
                //   'Success',
                //   'Data inserted Successfully',
                //   [
                //     {
                //       text: 'Ok',
                //       onPress: () => navigation.navigate('NewDashboard'),
                //     },
                //   ],
                //   {cancelable: false},
                // );
              } else {

              }
            },
          );

          //***********/ Table Product category End ******************

          //**********/ Products Table Creation Start *********************
          try {
            db.transaction(async function (tx) {
              console.log('tx-------->', tx);
              item.Productss.map(async item1 => {
                console.log('itm products Line 477 ------->777', item1);
                await tx.executeSql(
                  'INSERT INTO Products (Id,ProductName, ProductSummary, ProductDescription,ProductSku,AdditionalData,UnitD,PackingDesc,PackingQty,CategoryId,CompanyId,CreatedAt,UpdatedAt,ProductImages) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
                  [
                    item1.Id,
                    item1.ProductName,
                    item1.ProductSummary,
                    item1.ProductDescription,
                    item1.ProductSku,
                    item1.AdditionalData,
                    item1.UnitD,
                    item1.PackingDesc,
                    item1.PackingQty,
                    item1.CategoryId,
                    item1.CompanyId,
                    item1.CreatedAt,
                    item1.UpdatedAt,
                    item1.ProductImages,
                  ],
                  (tx, results) => {
                    // console.log('tx----- In InsertData Products Line 51', tx);
                    //   alert(
                    //     'Insertion Data into Products ' +
                    //       JSON.stringify(results),
                    //   );
                    console.log(
                      'Results In Insertion Data into Products',
                      results.rowsAffected,
                    );
                    if (results.rowsAffected > 0) {
                      // Alert.alert(
                      //   'Success',
                      //   'Data inserted Successfully',
                      //   [
                      //     {
                      //       text: 'Ok',
                      //       onPress: () => navigation.navigate('NewDashboard'),
                      //     },
                      //   ],
                      //   {cancelable: false},
                      // );
                    } else alert('Insertion Data into Products Failed');
                  },
                );
              }); //End of Inner Map
            }); //End of inner Transaction
          } catch (e) {
            alert('In catch during Insert Data Into Products');
          }

          //**********/ Products Table Insertion End *********************
        }); //End of map of Product Category
      }); //End of Product Category transaction
    } catch (e) {
      console.log('Error in Catch ---->', e);
      alert('error in InsertData Table ' + e);
    }

    /**************Outlets Table Insertion Start ****************/
    try {
      db.transaction(async function (tx) {
        console.log('tx-------->', tx);
        Object.keys(res.data.Outlets).map(async item => {
          console.log('itm 167=====', res.data.Outlets[item]);
          var outletClassificationName = '';
          try {
            if (res.data.Outlets[item].Classification.length > 0) {
              outletClassificationName = res.data.Outlets[item].Classification[0].Classification
            } else {
              outletClassificationName = ''
            }
          } catch (e) {
            outletClassificationName = ''
          }
          tx.executeSql(
            'INSERT INTO Outlets (Id,OutletName, OutletCode,OutletEmail,OutletSalutation,OutletClassification,OutletOpeningDate,OutletContactName,OutletLandlineno,OutletContactBday,OutletContactAnniversary,OutletIsdCode,OutletContactNo,OutletAltContactNo,OutletStatus,OutletAddress,OutletStreetName,OutletCity,OutletState,OutletCountry,OutletCounty,OutletPincode,OutletGps,TerritoryId,OutlettypeId,CompanyId,CreatedAt,UpdatedAt,OutletOtp,OutletVerified,OutletCreatedBy,OutletApprovedBy,BeatStatus,InsertedFor) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
            [
              res.data.Outlets[item].Id,
              res.data.Outlets[item].OutletName,
              res.data.Outlets[item].OutletCode,
              res.data.Outlets[item].OutletEmail,
              res.data.Outlets[item].OutletSalutation,
              outletClassificationName,
              res.data.Outlets[item].OutletOpeningDate,
              res.data.Outlets[item].OutletContactName,
              res.data.Outlets[item].OutletLandlineno,
              res.data.Outlets[item].OutletContactBday,
              res.data.Outlets[item].OutletContactAnniversary,
              res.data.Outlets[item].OutletIsdCode,
              res.data.Outlets[item].OutletContactNo,
              res.data.Outlets[item].OutletAltContactNo,
              res.data.Outlets[item].OutletStatus,
              res.data.Outlets[item].OutletAddress,
              res.data.Outlets[item].OutletStreetName,
              res.data.Outlets[item].OutletCity,
              res.data.Outlets[item].OutletState,
              res.data.Outlets[item].OutletCountry,
              res.data.Outlets[item].OutletCounty,
              res.data.Outlets[item].OutletPincode,
              res.data.Outlets[item].OutletGps,
              res.data.Outlets[item].TerritoryId,
              res.data.Outlets[item].OutlettypeId,
              res.data.Outlets[item].CompanyId,
              res.data.Outlets[item].CreatedAt,
              res.data.Outlets[item].UpdatedAt,
              res.data.Outlets[item].OutletOtp,
              res.data.Outlets[item].OutletVerified,
              res.data.Outlets[item].OutletCreatedBy,
              res.data.Outlets[item].OutletApprovedBy,
              'Pending',
              'Outlet',
            ],

            (tx, results) => {
              console.log('tx----- In InsertData Line 146', tx);
              // alert('Insertion Data into Outlets' + JSON.stringify(results));
              console.log(
                'Results In Insertion Data into Outlets',
                results.rowsAffected,
              );
              if (results.rowsAffected > 0) {
                // Alert.alert(
                //   'Success',
                //   'Data inserted Successfully',
                //   [
                //     {
                //       text: 'Ok',
                //       onPress: () => navigation.navigate('NewDashboard'),
                //     },
                //   ],
                //   {cancelable: false},
                // );
              } else alert('Registration Failed');
            },
          );

          //***********/ Table Outlets End ******************

          //**********/ Mapping Table Insertion Start *********************
          // try {
          //    db.transaction(async function (tx) {
          //     console.log('tx-------->', tx);
          //     res.data.Outlets[item].Mapping.map(async item1 => {
          //       console.log('itm------->235=====', item1);
          //       await tx.executeSql(
          //         'INSERT INTO Mapping (MappingId,PrimaryOutletId, SecondaryOutletId, PricebookId,Isdefault,CategoryType) VALUES (?,?,?,?,?,?)',
          //         [
          //           item1.MappingId,
          //           item1.PrimaryOutletId,
          //           item1.SecondaryOutletId,
          //           item1.PricebookId,
          //           item1.Isdefault,
          //           item1.CategoryType
          //         ],
          //         (tx, results) => {
          //           console.log('tx----- In InsertData Mapping Line 177', tx);
          //           alert(
          //             'Insertion Data into Mapping ' +
          //               JSON.stringify(results),
          //           );
          //           console.log(
          //             'Results In Insertion Data into Mapping',
          //             results.rowsAffected,
          //           );
          //           if (results.rowsAffected > 0) {
          //             // Alert.alert(
          //             //   'Success',
          //             //   'Data inserted Successfully',
          //             //   [
          //             //     {
          //             //       text: 'Ok',
          //             //       onPress: () => navigation.navigate('NewDashboard'),
          //             //     },
          //             //   ],
          //             //   {cancelable: false},
          //             // );
          //           } else alert('Insertion Data into Mapping Failed');
          //         },
          //       );
          //     }); //End of Inner Map
          //   }); //End of inner Transaction
          // } catch (e) {
          //   alert('In catch during Insert Data Into Products');
          // }

          //************** Mapping Table Insertion End *********************
        }); //End of map of Outlets
      }); //End of Outlets transaction
    } catch (e) {
      console.log('Error in Catch ----> Line 210', e);
      alert('error in InsertData Table 211' + e);
    }

    /**************** Outlets Table Insertion End ****************/

    /***********Start of Primary Outlets ************/
    try {
      db.transaction(async function (tx) {
        console.log('tx-------->', tx);
        Object.keys(res.data.PrimaryOutlets).map(async item => {
          console.log(
            '347637959759696975695=====',
            res.data.PrimaryOutlets[item][0].Id,
          );
          res.data.PrimaryOutlets[item].map(async item1 => {
            await tx.executeSql(
              'INSERT INTO PrimaryOutlets (Id,OutletName, OutletCode,OutletEmail,OutletSalutation,OutletClassification,OutletOpeningDate,OutletContactName,OutletLandlineno,OutletContactBday,OutletContactAnniversary,OutletIsdCode,OutletContactNo,OutletAltContactNo,OutletStatus,OutletAddress,OutletStreetName,OutletCity,OutletState,OutletCountry,OutletCounty,OutletPincode,OutletGps,TerritoryId,OutlettypeId,CompanyId,CreatedAt,UpdatedAt,OutletOtp,OutletVerified,OutletCreatedBy,OutletApprovedBy) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
              [
                item1.Id,
                item1.OutletName,
                item1.OutletCode,
                item1.OutletEmail,
                item1.OutletSalutation,
                item1.OutletClassification,
                item1.OutletOpeningDate,
                item1.OutletContactName,
                item1.OutletLandlineno,
                item1.OutletContactBday,
                item1.OutletContactAnniversary,
                item1.OutletIsdCode,
                item1.OutletContactNo,
                item1.OutletAltContactNo,
                item1.OutletStatus,
                item1.OutletAddress,
                item1.OutletStreetName,
                item1.OutletCity,
                item1.OutletState,
                item1.OutletCountry,
                item1.OutletCounty,
                item1.OutletPincode,
                item1.OutletGps,
                item1.TerritoryId,
                item1.OutlettypeId,
                item1.CompanyId,
                item1.CreatedAt,
                item1.UpdatedAt,
                item1.OutletOtp,
                item1.OutletVerified,
                item1.OutletCreatedBy,
                item1.OutletApprovedBy,
              ],

              (tx, results) => {
                console.log('tx----- In InsertData Line 331', tx);
                // alert(
                //   'Insertion Data into PrimaryOutlets' +
                //     JSON.stringify(results),
                // );
                console.log(
                  'Results In Insertion Data into PrimaryOutlets',
                  results.rowsAffected,
                );
                if (results.rowsAffected > 0) {
                  // Alert.alert(
                  //   'Success',
                  //   'Data inserted Successfully',
                  //   [
                  //     {
                  //       text: 'Ok',
                  //       onPress: () => navigation.navigate('NewDashboard'),
                  //     },
                  //   ],
                  //   {cancelable: false},
                  // );
                } else alert('Registration Failed');
              },
            );

            // console.log("item1.OutletStocks====>",item1.OutletStocks,Array.isArray(item1.OutletStocks))

            // Start of Stock Data Insertion


            // End of Stock Data Insertion
          }); //End of Inner Map
        }); //End of  Map
      }); //End of Transaction
    } catch (e) {
      alert('In catch during Insert Data Into PrimaryOutlets');
    }
    /***********End of Primary Outlets ************/

    /************** Start of PriceBooks ***********/
    try {
      db.transaction(async function (tx) {
        console.log('tx-------->', tx);
        // Object.keys(res.data.PriceBooks).map(async (item,index) => {
        Object.keys(res.data.PriceBooks).forEach(async key => {
          // console.log('PriceBooks=====', res.data.PriceBooks[item].Id);
          // console.log('PriceBooks +++++++=====res.data.PriceBooks[item][index].Id', res.data.PriceBooks[item][index].Id);
          Object.values(res.data.PriceBooks[key]).forEach(async item => {
            // res.data.PriceBooks[item].map(async itm => {
            var name = Object.keys(res.data.PriceBooks[key])[0]
            item.forEach(async itmm => {
              await tx.executeSql(
                'INSERT INTO PriceBooks (Id,PricebookId, ProductId,MaxRetailPrice,SellingPrice,AdditionalRemark,Isenabled,CompanyId,CreatedAt,UpdatedAt,PriceBookName) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
                [
                  itmm.Id,
                  itmm.PricebookId,
                  itmm.ProductId,
                  itmm.MaxRetailPrice,
                  itmm.SellingPrice,
                  itmm.AdditionalRemark,
                  itmm.Isenabled,
                  itmm.CompanyId,
                  itmm.CreatedAt,
                  itmm.UpdatedAt,
                  name
                ],

                (tx, results) => {
                  console.log('tx----- In PriceBooks Line 331', tx);
                  // alert(
                  //   'Insertion Data into PriceBooks' + JSON.stringify(results),
                  // );
                  console.log(
                    'Results In Insertion Data into PriceBooks',
                    results.rowsAffected,
                  );
                  if (results.rowsAffected > 0) {
                    // Alert.alert(
                    //   'Success',
                    //   'Data inserted Successfully',
                    //   [
                    //     {
                    //       text: 'Ok',
                    //       onPress: () => navigation.navigate('NewDashboard'),
                    //     },
                    //   ],
                    //   {cancelable: false},
                    // );
                  } else alert('Registration Failed');
                },
              );
            })
          })//End of Inner Map
        }); //End of  Map
      }); //End of Transaction
    } catch (e) {
      alert('In catch during Insert Data Into PriceBooks');
    }

    /************** End of PriceBooks ***********/

    /********** Start of OutetTypes ***************/

    try {
      db.transaction(async function (tx) {
        console.log('tx-------->', tx);
        res.data.OutletTypes.map(async item => {
          console.log('OutletsTypes=====', item);
          tx.executeSql(
            'INSERT INTO OutletsTypes (OutlettypeId,CompanyId, OutlettypeName,Isoutletprimary,Isoutletendcustomer,Isenabled,Outletparent,ImageMediaId) VALUES(?,?,?,?,?,?,?,?)',
            [
              item.OutlettypeId,
              item.CompanyId,
              item.OutlettypeName,
              item.Isoutletprimary,
              item.Isoutletendcustomer,
              item.Isenabled,
              item.Outletparent,
              item.ImageMediaId,
            ],

            (tx, results) => {
              console.log('tx----- In OutletsTypes Line 331', tx);
              // alert(
              //   'Insertion Data into OutletsTypes' + JSON.stringify(results),
              // );
              console.log(
                'Results In Insertion Data into OutletsTypes',
                results.rowsAffected,
              );
              if (results.rowsAffected > 0) {
                // Alert.alert(
                //   'Success',
                //   'Data inserted Successfully',
                //   [
                //     {
                //       text: 'Ok',
                //       onPress: () => navigation.navigate('NewDashboard'),
                //     },
                //   ],
                //   {cancelable: false},
                // );
              } else alert('Registration Failed');
            },
          );
        }); //End of  Map
      }); //End of Transaction
    } catch (e) {
      alert('In catch during Insert Data Into OutletsTypes');
    }
    /************ End of OutetTypes **************/

    /*************** Start of Units *************/

    try {
      db.transaction(async function (tx) {
        console.log('tx-------->', tx);
        res.data.Units.map(async item => {
          console.log('Units=====', item);
          tx.executeSql(
            'INSERT INTO Units (UnitId,UnitCode,UnitDescription) VALUES(?,?,?)',
            [item.UnitId, item.UnitCode, item.UnitDescription],

            (tx, results) => {
              console.log('tx----- In Units Line 331', tx);
              // alert('Insertion Data into Units' + JSON.stringify(results));
              console.log(
                'Results In Insertion Data into Units',
                results.rowsAffected,
              );
              if (results.rowsAffected > 0) {
                // Alert.alert(
                //   'Success',
                //   'Data inserted Successfully',
                //   [
                //     {
                //       text: 'Ok',
                //       onPress: () => navigation.navigate('NewDashboard'),
                //     },
                //   ],
                //   {cancelable: false},
                // );
              } else alert('Registration Failed');
            },
          );
        }); //End of  Map
      }); //End of Transaction
    } catch (e) {
      alert('In catch during Insert Data Into Units');
    }
    /*************** End of Units ***************/

    /******Start of Stock ************/
    //   try{
    //   db.transaction(function (txn) {
    //     console.log("_+++++++)))))))) res.stocks==",res.data.Stocks);
    //       res.data.Stocks.map( item=>{
    //       console.log("key==========>",item);
    //       console.log("key==========>",item.OutletStockId);
    //              txn.executeSql(
    //               'INSERT INTO Stock (OutletStockId,OutletId, ProductId,FreeQty,ReservedQty,BsdQty,CompanyId,LastSync) VALUES (?,?,?,?,?,?,?,?)',
    //               [
    //                 item.OutletStockId,
    //                 item.OutletId,
    //                 item.ProductId,
    //                 item.FreeQty,
    //                 item.ReservedQty,
    //                 item.BsdQty,
    //                 item.CompanyId,
    //                 item.LastSync,
    //               ],

    //               (tx, results) => {
    //                 console.log('tx----- In InsertData Line 331', tx);
    //                 alert(
    //                   'Insertion Data into Stock' + JSON.stringify(results),
    //                 );

    //                 console.log(
    //                   'Results In Insertion Data into Stock 30===',
    //                   results.rowsAffected,
    //                 );
    //                 if (results.rowsAffected > 0) {
    //                   //  alert("Stock Data Inserted")
    //                   // Alert.alert(
    //                   //   'Success',
    //                   //   'Data inserted Successfully',
    //                   //   [
    //                   //     {
    //                   //       text: 'Ok',
    //                   //       onPress: () => props.navigation.navigate('NewDashboard'),
    //                   //     },
    //                   //   ],
    //                   //   {cancelable: false},
    //                   // );
    //                 } else {

    //                 }
    //               },
    //             );
    //           })
    // })
    //   }catch(e){
    //     console.log("Errro Line 791 in InsertData Line 742===",e)
    //   }

    /******End of Stock ************/










  } //End Of res.statusCode
  else {
    console.log('In else In Airportroute Line 59====>');
  }

  // try {
  //    db.transaction(async tx => {
  //      tx.executeSql(
  //       'SELECT * FROM Product_category',
  //       [],
  //       (tx, results) => {
  //         console.log('errr', tx);
  //         console.log('result Line 141--->', results);
  //         var temp = [];
  //         for (let i = 0; i < results.rows.length; ++i) {
  //           temp.push(results.rows.item(i));
  //         }
  //         console.log('Data returned From SQLITE ----->', temp);
  //       },
  //     );
  //   });
  // } catch (e) {
  //   alert(e);
  // }

  // try {
  //   db.transaction(async tx => {
  //      tx.executeSql('SELECT * FROM Products', [], (tx, results) => {
  //       console.log('errr', tx);
  //       console.log('result Line 141--->', results);
  //       var temp = [];
  //       for (let i = 0; i < results.rows.length; ++i) {
  //         temp.push(results.rows.item(i));
  //       }
  //       console.log('Data returned From Products SQLITE ----->', temp);
  //     });
  //   });
  // } catch (e) {
  //   alert(e);
  // }
};

const insertOutcomeData = async () => {
  try {
    let res = await getOutletOutcomes();
    if (res.statusCode == 200) {
      db.transaction(async function (tx) {
        res.data.map(async item => {
          await tx.executeSql(
            'INSERT INTO Outcome(Id,OutcomeName, OutcomeFactor, CompanyId) VALUES (?,?,?,?)',
            [
              item.Id,
              item.OutcomeName,
              item.OutcomeFactor,
              item.CompanyId,
            ],

            (tx, results) => {
              console.log('tx----- In InsertData Line 51', tx);
              // alert(
              //   'Insertion Data into Product_category' +
              //     JSON.stringify(results),
              // );
              console.log(
                'Results In Insertion Data into Product_category',
                results.rowsAffected,
              );
            },
          );

        })


      })
    } else {
      console.log("Result in insertOutComeData in InsertData Line 643", res)
    }

  } catch (e) {

  }
}


var tableArr = ["Product_category", "Products", "Outlets", "Mapping", "PrimaryOutlets", "OutletsTypes", "PriceBooks", "Units", "Stock", "Outcome"];
async function TruncateAllTables() {
  try {
    tableArr.forEach(item => {
      var qry = `DELETE FROM ${item}`
      db.transaction(async function (tx) {
        tx.executeSql(qry, [],
          (tx, results) => {
          },
        );
      });
    })
  } catch (e) {
    console.log("Error in catch During Truncate All Tables", e);
  }
}


var tableArrNew = ['CheckinCheckout', 'SalesOrder', 'SalesOrderLineItem']
async function TruncateCheckInCheckoutORSalesOrderTable() {
  try {
    tableArrNew.forEach(item => {
      var qry = `DELETE FROM ${item}`
      db.transaction(async function (tx) {
        tx.executeSql(qry, [],
          (tx, results) => {
          },
        );
      });
    })
  } catch (e) {
    console.log("Error in catch During tableArrNew in InsertData Tables", e);
  }
}


const getProductCategories = async () => {
  await db.transaction(async tx => {
    await tx.executeSql(
      `SELECT * from Product_category`,
      [],
      async (tx, results) => {

        if (results.rows.length > 0) {
          console.log('results Line 183 ===> ', results);
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
          }
          console.log('getProductCategories in InsertData Line 665 =======> ', temp);
        } else {
          console.log('Error in InsertData  In  Line 667 ===> ', tx);
        }
      },
    );
  });
}

var isPending = false;
const checkDataPendingForSync = async () => {
  await db.transaction(async tx => {
    await tx.executeSql(
      `SELECT * from CheckinCheckout where SyncFlag = 0`,
      [],
      async (tx, results) => {
        if (results.rows.length > 0) {
          console.log("CheckinCheckout", results)
          console.log("CheckinCheckout", results)
          isPending = true

        }

      }

    );

  });
  return isPending;
}

export { insertStockData, outletBeatDump, TruncateAllTables, getProductCategories, insertOutcomeData, checkDataPendingForSync, insertMappingData, TruncateCheckInCheckoutORSalesOrderTable, insertStockDataIfNotInserted }