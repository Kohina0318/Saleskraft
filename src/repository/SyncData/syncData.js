import {getAppToken} from '../commonRepository';
import {BackHandler, Alert} from 'react-native';
import { SERVER_URL } from '../commonRepository';
import { navigateToHome,onServerError } from '../../navigation/NavigationDrw/NavigationService';
// import {db} from '../../helper/SQLite DB/Sqlite';

const checkIn = async (
  formattedaddress,
  latitude,
  longitude,
  outletId,
  beat_id,
  checkin_time
) => {
  var url = `api/checkin?outlet_id=${outletId}&checkin_location=${latitude},${longitude}&checkin_address=${formattedaddress}&beat_id=${beat_id}&checkin_time=${checkin_time}`;

  if (beat_id == '' || beat_id == null || beat_id == undefined) {
    url = `api/checkin?outlet_id=${outletId}&checkin_location=${latitude},${longitude}&checkin_address=${formattedaddress}&checkin_time=${checkin_time}`;
  }
  console.log(
    `formattedaddress-->${formattedaddress},latitude-->${latitude},longi-->${longitude},outletId-->${outletId}===beatId${url}`,
  );
  try {
    const response = await fetch(`${await SERVER_URL()}${url}`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        apptoken: `${await getAppToken()}`,
      },
      // body: JSON.stringify(body),
    });
    console.log('response in checkIn in SyncData.js Line 20--->', response);
    const result = await response.json();
    console.log('result in checkIn in SyncData.js Line 23...', result);
    if (result.error) {
      if(result.error.code == 525){
        navigateToHome('BLoginByMobileNumber');
      }else{
        console.log(result.error.message)
      }
      Alert.alert(
        'Warning',
        `${result.error.message}`,
        [
          {
            text: 'Ok',

            onPress: () => BackHandler.exitApp(),
          },
        ],

        {cancelable: false},
      );
    } else {
      if (result.statusCode == 200) {
        /***
         * If checkin Successfull then fill chekin_checkout_id in Sales Order table against OutletId
         */
  
        //   await db.transaction(async tx=> {
        //          tx.executeSql(
        //           "UPDATE SalesOrder SET chekin_checkout_id=? where OutletId=?",
        //           [
        //             result.data.CheckinId,
        //            outletId
        //           ],
        //           (tx, results) => {
        //             console.log("+++++++++++",tx.db.openError)
        //             console.log(
        //               'tx in SalesOrder query of chekin_checkout_id  in SyncDataScreen Line 102--->',
        //               tx,
        //             );
        //             // alert(JSON.stringify(results));
        //             console.log(
        //               'results in chekin_checkout_id  query of chekin_checkout_id  in SyncDataScreen Line 103--->',
        //               results,
        //             );
        //           },
        //           (tx, error) => {
        //             console.log("Error-----------------------------5111",error);
        //             console.log("tx-----------------------------52222",tx);
        //           }
        //         );
  
        //       }
        //       )
  
        /***
         *
         * End checkin Successfull then fill chekin_checkout_id in Sales Order table against OutletId
         */
  
        return result;
      } else if (result.statusCode == 500) {
        onServerError('InternalServerError')
      } else {
        return result;
      }

    }
  } catch (err) {
    console.log('Error in Catch in checkIn in SyncData.js Line 32', err);
  }
};

const checkOut = async (
  formattedaddress,
  latitude,
  longitude,
  outletId,
  checkout_outcome_id,
  checkout_remark,
  checkout_media,
  checkin_out_time
) => {
  var checkOutTime = ''
  checkOutTime = checkin_out_time;
  console.log(
    `Checkout Api=========>formattedaddress-->${formattedaddress},latitude-->${latitude},longi-->${longitude},checkout_outcome_id---${checkout_outcome_id},outletId-->${outletId},checkout_remark--${checkout_remark}&checkin_out_time=${checkOutTime}`,
  );
  try {
    const response = await fetch(
      `${await SERVER_URL()}api/checkout?outlet_id=${outletId}&checkout_location=${latitude},${longitude}&checkout_address=${formattedaddress}&checkout_outcome_id=${checkout_outcome_id}&checkout_remark=${checkout_remark}&checkout_media=${checkout_media}&checkin_out_time=${checkOutTime}`,
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          apptoken: `${await getAppToken()}`,
        },
        // body: JSON.stringify(body),
      },
    );
    console.log('response in checkOut in SyncData.js Line 49--->', response);
    const result = await response.json();
    console.log('result in checkOut in SyncData.js Line 51...', result);
    if (result.error) {
      if(result.error.code ==525){
        navigateToHome('BLoginByMobileNumber');
      }else{
        console.log(result.error.message)
      }
    } else {
      if (result.statusCode == 200) {
        return result;
      } else if (result.statusCode == 500) {
        onServerError('InternalServerError')
      } else {
        return result;
      }

    }
  } catch (err) {
    console.log('Error in Catch in checkOut in SyncData.js Line 61', err);
  }
};

const addOrder = async body => {
  try {
    const response = await fetch(`${await SERVER_URL()}api/addOrder`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        apptoken: `${await getAppToken()}`,
      },
      body: JSON.stringify(body),
    });
    console.log('response in addOrder in SyncData.js Line 78--->', response);
    const result = await response.json();
    console.log('result in addOrder in SyncData.js Line 80...', result);
    if (result.error) {
      if(result.error.code == 525){
        navigateToHome('BLoginByMobileNumber');
      }else{
        console.log(result.error.message)
      }
      
    } else {
      if (result.statusCode == 200) {
        return result;
      } else if (result.statusCode == 500) {
        onServerError('InternalServerError')
      } else {
        return result;
      }

    }
  } catch (err) {
    console.log('Error in Catch  in addOrder in SyncData.js 89', err);
  }
};

export {checkIn, checkOut, addOrder};
