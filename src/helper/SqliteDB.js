import {openDatabase} from 'react-native-sqlite-storage';
import { getOutletDump } from '../repository/outlet/OutletRepositoy';
var db = openDatabase({name: 'Beatdump.db'});
var AllData = {};

//get Data from getOutletDump

const getData = async()=>{
try{    
let res = await getOutletDump();
if(res.statusCode == 200){
    AllData = res.data; 
}
}catch(e){
  console.log("Error in sqliteDB.js in getOutletDump Line 15=====>",e);  
}
}


//Data Insertion into Tables
const InsertProductAndCategories = async() => {
    try {
        db.transaction(async function (tx) {
          console.log('tx-------->', tx);
          AllData.Products.map(async item => {
            console.log("Line 26====".item)
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
                      alert(
                        'Insertion Data into Products ' +
                          JSON.stringify(results),
                      );
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
        console.log('Error in Catch in insertData.js---->', e);
        // alert('error in InsertData Table ' + e);
      }
}

const InsertOutletsAndMapping = async() =>{
  /**************Outlets Table Insertion Start ****************/
  try {
    db.transaction(async function (tx) {
      console.log('tx-------->', tx);
      Object.keys(AllData.Outlets).map(async item => {
        console.log('itm 167=====', AllData.Outlets[item]);
         tx.executeSql(
          'INSERT INTO Outlets (Id,OutletName, OutletCode,OutletEmail,OutletSalutation,OutletClassification,OutletOpeningDate,OutletContactName,OutletLandlineno,OutletContactBday,OutletContactAnniversary,OutletIsdCode,OutletContactNo,OutletAltContactNo,OutletStatus,OutletAddress,OutletStreetName,OutletCity,OutletState,OutletCountry,OutletCounty,OutletPincode,OutletGps,TerritoryId,OutlettypeId,CompanyId,CreatedAt,UpdatedAt,OutletOtp,OutletVerified,OutletCreatedBy,OutletApprovedBy,BeatStatus,InsertedFor) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
          [
            AllData.Outlets[item].Id,
            AllData.Outlets[item].OutletName,
            AllData.Outlets[item].OutletCode,
            AllData.Outlets[item].OutletEmail,
            AllData.Outlets[item].OutletSalutation,
            AllData.Outlets[item].OutletClassification,
            AllData.Outlets[item].OutletOpeningDate,
            AllData.Outlets[item].OutletContactName,
            AllData.Outlets[item].OutletLandlineno,
            AllData.Outlets[item].OutletContactBday,
            AllData.Outlets[item].OutletContactAnniversary,
            AllData.Outlets[item].OutletIsdCode,
            AllData.Outlets[item].OutletContactNo,
            AllData.Outlets[item].OutletAltContactNo,
            AllData.Outlets[item].OutletStatus,
            AllData.Outlets[item].OutletAddress,
            AllData.Outlets[item].OutletStreetName,
            AllData.Outlets[item].OutletCity,
            AllData.Outlets[item].OutletState,
            AllData.Outlets[item].OutletCountry,
            AllData.Outlets[item].OutletCounty,
            AllData.Outlets[item].OutletPincode,
            AllData.Outlets[item].OutletGps,
            AllData.Outlets[item].TerritoryId,
            AllData.Outlets[item].OutlettypeId,
            AllData.Outlets[item].CompanyId,
            AllData.Outlets[item].CreatedAt,
            AllData.Outlets[item].UpdatedAt,
            AllData.Outlets[item].OutletOtp,
            AllData.Outlets[item].OutletVerified,
            AllData.Outlets[item].OutletCreatedBy,
            AllData.Outlets[item].OutletApprovedBy,
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
        try {
           db.transaction(async function (tx) {
            console.log('tx-------->', tx);
            AllData.Outlets[item].Mapping.map(async item1 => {
              console.log('itm------->235=====', item1);
              await tx.executeSql(
                'INSERT INTO Mapping (MappingId,PrimaryOutletId, SecondaryOutletId, PricebookId,Isdefault,CategoryType) VALUES (?,?,?,?,?,?)',
                [
                  item1.MappingId,
                  item1.PrimaryOutletId,
                  item1.SecondaryOutletId,
                  item1.PricebookId,
                  item1.Isdefault,
                  item1.CategoryType
                ],
                (tx, results) => {
                  console.log('tx----- In InsertData Mapping Line 177', tx);
                  alert(
                    'Insertion Data into Mapping ' +
                      JSON.stringify(results),
                  );
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
                    //       onPress: () => navigation.navigate('NewDashboard'),
                    //     },
                    //   ],
                    //   {cancelable: false},
                    // );
                  } else alert('Insertion Data into Mapping Failed');
                },
              );
            }); //End of Inner Map
          }); //End of inner Transaction
        } catch (e) {
          alert('In catch during Insert Data Into Products');
        }

        //************** Mapping Table Insertion End *********************
      }); //End of map of Outlets
    }); //End of Outlets transaction
  } catch (e) {
    console.log('Error in Catch ----> Line 210', e);
    alert('error in InsertData Table 211' + e);
  }

  /**************** Outlets Table Insertion End ****************/
}


const InsertPrimaryOutletsAndStock = async() =>{
        /***********Start of Primary Outlets ************/
        try {
            db.transaction(async function (tx) {
              console.log('tx-------->', tx);
              Object.keys(AllData.PrimaryOutlets).map(async item => {
                console.log(
                  '347637959759696975695=====',
                  AllData.PrimaryOutlets[item][0].Id,
                );
                AllData.PrimaryOutlets[item].map(async item1 => {
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
    
                  console.log("item1.OutletStocks====>",item1.OutletStocks,Array.isArray(item1.OutletStocks))
    
                  // Start of Stock Data Insertion
    
                  db.transaction(async function (tx) {
                    await tx.executeSql(
                      'INSERT INTO Stock (OutletStockId,OutletId, ProductId,FreeQty,ReservedQty,BsdQty,CompanyId,LastSync) VALUES ?',
                      [item1.OutletStocks.map(item2=>[
                        item2.OutletStockId,
                        item2.OutletId,
                        item2.ProductId,
                        item2.FreeQty,
                        item2.ReservedQty,
                        item2.BsdQty,
                        item2.CompanyId,
                        item2.LastSync,
                      ])],
    
                      (tx, results) => {
                        console.log('tx----- In InsertData Line 331', tx);
                        alert(
                          'Insertion Data into Stock' + JSON.stringify(results),
                        );
                        console.log(
                          'Results In Insertion Data into Stock',
                          results.rowsAffected,
                        );
                        if (results.rowsAffected > 0) {
                          Alert.alert(
                            'Success',
                            'Data inserted Successfully',
                            [
                              {
                                text: 'Ok',
                                onPress: () => navigation.navigate('NewDashboard'),
                              },
                            ],
                            {cancelable: false},
                          );
                        } else alert('Registration Failed');
                      },
                    );
                  })//End of db.transaction 
                //   End of Stock Data Insertion
                }); //End of Inner Map
              }); //End of  Map
            }); //End of Transaction
          } catch (e) {
            alert('In catch during Insert Data Into PrimaryOutlets');
          }
}


const InsertPricebookData = async () =>{
          /************** Start of PriceBooks ***********/
          try {
            db.transaction(async function (tx) {
             console.log('tx-------->', tx);
             Object.keys(AllData.PriceBooks).map(async (item,index) => {
               console.log('PriceBooks=====', AllData.PriceBooks[item].Id);
               console.log('PriceBooks +++++++=====res.data.PriceBooks[item][index].Id', AllData.PriceBooks[item][index].Id);
               AllData.PriceBooks[item].map(async itm => {
               await tx.executeSql(
                 'INSERT INTO PriceBooks (Id,PricebookId, ProductId,MaxRetailPrice,SellingPrice,AdditionalRemark,Isenabled,CompanyId,CreatedAt,UpdatedAt) VALUES (?,?,?,?,?,?,?,?,?,?)',
                 [
                   itm.Id,
                   itm.PricebookId,
                   itm.ProductId,
                   itm.MaxRetailPrice,
                   itm.SellingPrice,
                   itm.AdditionalRemark,
                   itm.Isenabled,
                   itm.CompanyId,
                   itm.CreatedAt,
                   itm.UpdatedAt,
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
               })//End of Inner Map
             }); //End of  Map
           }); //End of Transaction
         } catch (e) {
           alert('In catch during Insert Data Into PriceBooks');
         }
}

const InsertOutletTypeData = async() =>{
    /********** Start of OutetTypes ***************/

    try {
        db.transaction(async function (tx) {
        console.log('tx-------->', tx);
        AllData.OutletTypes.map(async item => {
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
}

const InsertUnitsData = async() =>{
       /*************** Start of Units *************/

       try {
        db.transaction(async function (tx) {
         console.log('tx-------->', tx);
       AllData.Units.map(async item => {
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
}





export {getData,InsertProductAndCategories,InsertOutletsAndMapping,InsertPrimaryOutletsAndStock,InsertPricebookData,InsertOutletTypeData,InsertUnitsData}