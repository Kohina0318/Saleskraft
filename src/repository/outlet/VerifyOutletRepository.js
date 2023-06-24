import { getAppToken, RemoveAsyncData } from '../commonRepository';
import { ToastAndroid } from 'react-native';
import { navigateToClearStack, onServerError } from '../../navigation/NavigationDrw/NavigationService';
import { SERVER_URL } from '../commonRepository';

const getEmpOutlets = async () => {
  try {
    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        apptoken: `${await getAppToken()}`,
      },
    };
    const response = await fetch(`${await SERVER_URL()}api/getEmpOutlets`, config);
    const result = await response.json();
    if (result.error) {
      if (result.error.code == 525) {
        await RemoveAsyncData()
        ToastAndroid.showWithGravityAndOffset(
          `${'Token Expired'}`,
          ToastAndroid.TOP,
          ToastAndroid.LONG,
          10,
          10,
        );
        navigateToClearStack('BLoginByMobileNumber', { url: await SERVER_URL() })
      }
      else {
        console.log(result.error.message)
      }
    } else {
      if (result.statusCode == 200) {
        return result;
      } else if (result.statusCode == 500) {
        onServerError('InternalServerError')
      } else {
        // alert("Data Not Found")
      }
    }
  } catch (e) {
    console.log('Error from getEmpOutlets  ', e);
  }
};

const postOutletVerifyCheckIn = async (
  formattedaddress,
  latitude,
  longitude,
  outletId,
  checkInTime
) => {
  console.log(
    `formattedaddress-->${formattedaddress},latitude-->${latitude},longi-->${longitude},outletId-->${outletId},Time-->${checkInTime}`,
  );
  try {
    const response = await fetch(
      `${await SERVER_URL()}api/checkin?outlet_id=${outletId}&checkin_location=${latitude},${longitude}&checkin_address=${formattedaddress}&checkin_time=${checkInTime}`,
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
    console.log(
      'response in postOutletVerifyCheckIn in Verify outlet Repository Line 40--->',
      response,
    );
    const result = await response.json();
    console.log(
      'result in postOutletVerifyCheckIn in Verify outlet Repository Line 42...',
      result,
    );
    if (result.error) {
      if (result.error.code == 525) {
        await RemoveAsyncData()
        ToastAndroid.showWithGravityAndOffset(
          `${'Token Expired'}`,
          ToastAndroid.TOP,
          ToastAndroid.LONG,
          10,
          10,
        );
        navigateToClearStack('BLoginByMobileNumber', { url: await SERVER_URL() })
      }
      else {
        alert(result.error.message)
      }
    } else {
      if (result.statusCode == 200) {
        return result;
      } else if (result.statusCode == 500) {
        onServerError('InternalServerError')
      } else if (result) {
        return result;
      }
    }
  } catch (err) {
    console.log(
      'Error in Catch in postOutletVerifyCheckIn in Verify outlet Repository...',
      result,
    );
  }
};

const postOutletVerifyCheckOut = async (
  formattedaddress,
  latitude,
  longitude,
  outletId,
  checkOutTime
) => {
  console.log(`formattedaddress-->${formattedaddress},latitude-->${latitude},longi-->${longitude},outletId-->${outletId},checkOutTime-->${checkOutTime}`)
  try {
    const response = await fetch(
      `${await SERVER_URL()}api/checkout?outlet_id=${outletId}&checkout_location=${latitude},${longitude}&checkout_address=${formattedaddress}&checkin_out_time=${checkOutTime}`,
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
    console.log(
      'response in postOutletVerifyCheckOut in Verify outlet Repository Line 69--->',
      response,
    );
    const result = await response.json();
    console.log(
      'result in postOutletVerifyCheckOut in Verify outlet Repository Line 71...',
      result,
    );
    if (result.error) {
      if (result.error.code == 525) {
        await RemoveAsyncData()
        ToastAndroid.showWithGravityAndOffset(
          `${'Token Expired'}`,
          ToastAndroid.TOP,
          ToastAndroid.LONG,
          10,
          10,
        );
        navigateToClearStack('BLoginByMobileNumber', { url: await SERVER_URL() })
      }
      else {
        alert(result.error.message)
      }
    } else {
      if (result.statusCode == 200) {
        return result;
      } else if (result.statusCode == 500) {
        onServerError('InternalServerError')
      } else if (result) {
        return result;
      }

    }

  } catch (err) {
    console.log(
      'Error in Catch in postOutletVerifyCheckOut in Verify outlet Repository...',
      result,
    );
  }
};

const postAttachMediaOutletCheckin = async (
  mediaId,
  checkinId,
  purpose,
  formattedaddress,
) => {
  console.log(
    `media_id----=${mediaId},entity_pk----=${checkinId},purpose---=${purpose},gps_location----=${formattedaddress}`,
  );

  try {
    const response = await fetch(
      `${await SERVER_URL()}api/attachMediaOutletCheckin?media_id=${mediaId}&entity_pk=${checkinId}&purpose=${purpose}&gps_location=${formattedaddress}`,
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
    console.log(
      'response in postAttachMediaOutletCheckin in Verify outlet Repository Line 98--->',
      response,
    );
    const result = await response.json();
    console.log(
      'result in postAttachMediaOutletCheckin in Verify outlet Repository Line 100...',
      result,
    );
    if (result.error) {
      if (result.error.code == 525) {
        await RemoveAsyncData()
        ToastAndroid.showWithGravityAndOffset(
          `${'Token Expired'}`,
          ToastAndroid.TOP,
          ToastAndroid.LONG,
          10,
          10,
        );
        navigateToClearStack('BLoginByMobileNumber', { url: await SERVER_URL() })
      }
      else {
        alert(result.error.message)
      }
    } else {
      if (result.statusCode == 200) {
        return result;
      } else if (result.statusCode == 500) {
        onServerError('InternalServerError')
      } else if (result) {
        return result;
      }

    }

  } catch (err) {
    console.log(
      'Error in Catch in postAttachMediaOutletCheckin in Verify outlet Repository...',
      result,
    );
  }
};

const getVerifyMediaOutletCheckin = async (entityPrimaryKey, purpose) => {
  try {
    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        apptoken: `${await getAppToken()}`,
      },
    };
    const response = await fetch(
      `${await SERVER_URL()}api/verifyMediaOutletCheckin?entity_pk=${entityPrimaryKey}&purpose=${purpose}`,
      config,
    );
    const result = await response.json();
    if (result.error) {
      if (result.error.code == 525) {
        await RemoveAsyncData()
        ToastAndroid.showWithGravityAndOffset(
          `${'Token Expired'}`,
          ToastAndroid.TOP,
          ToastAndroid.LONG,
          10,
          10,
        );
        navigateToClearStack('BLoginByMobileNumber', { url: await SERVER_URL() })
      }
      else {
        alert(result.error.message)
      }
    } else {
      if (result.statusCode == 200) {
        return result;
      } else if (result.statusCode == 500) {
        onServerError('InternalServerError')
      } else {
        // alert('Data Not Found');
      }
    }
  } catch (e) {
    console.log('Error from verify Media OutletCheckin ', e);
  }
};

const getCheckInOutStatus = async () => {
  try {
    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        apptoken: `${await getAppToken()}`,
      },
    };
    const response = await fetch(`${await SERVER_URL()}api/checkInOutStatus`, config);
    const result = await response.json();
    console.log('result Line 148---------->', result);
    
    if (result.error) {
      if (result.error.code == 525) {
        await RemoveAsyncData()
        ToastAndroid.showWithGravityAndOffset(
          `${'Token Expired'}`,
          ToastAndroid.TOP,
          ToastAndroid.LONG,
          10,
          10,
        );
        navigateToClearStack('BLoginByMobileNumber', { url: await SERVER_URL() })
      }
      else {
        alert(result.error.message)
      }
    } else {
      if (result.statusCode == 200) {
        return result;
      } else if (result.statusCode == 500) {
        onServerError('InternalServerError')
      } else {
        // alert('Data Not Found');
        console.log("Error: Not checkin yet");
        return null
      }
    }
  } catch (e) {
    console.log('Error from getCheckInOutStatus  ', e);
  }
};

export {
  getEmpOutlets,
  postOutletVerifyCheckIn,
  postOutletVerifyCheckOut,
  postAttachMediaOutletCheckin,
  getVerifyMediaOutletCheckin,
  getCheckInOutStatus,
};
