import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  navigateToClearStack,
  navigateToHome,
  onServerError,
} from '../navigation/NavigationDrw/NavigationService';
import { logoutApi } from './auth/AuthRepository';
import moment from 'moment';
import Geolocation from '@react-native-community/geolocation';
import { googleKey, store } from '../../App';
import { attendanceStatusGetData } from './attendence/attendence';
import { Alert, BackHandler } from 'react-native';
import { PermissionsAndroid } from 'react-native';
import InAppReview from 'react-native-in-app-review';
import { Linking } from 'react-native';
import { StoreDatatoAsync } from './AsyncStorageServices';
import { TruncateAllTables } from '../screens/SharedScreens/InsertData';
import { gettripLocationApi } from './trip/tripRepository';
import VersionCheck from 'react-native-version-check';
import { useToast } from 'react-native-toast-notifications';
// import DeviceInfo from 'react-native-device-info';
// import IntentLauncher from 'react-native-intent-launcher'
// const {SERVER_URL} = config;
const apikey = googleKey();
const SERVER_URL = async () => {
  let baseurl = await AsyncStorage.getItem('@baseurl');
  console.log('baseurl', baseurl);
  return baseurl;
};

// const pakej = DeviceInfo.getBundleId();
// const openAppSettings = () => {
//   if (Platform.OS === 'ios') {
//     Linking.openURL('app-settings:')
//   } else {
//     IntentLauncher.startActivity({
//       action: 'android.settings.APPLICATION_DETAILS_SETTINGS',
//       data: 'package:' + pakej
//     })
//   }
// }


const RemoveAsyncData = async () => {
  await AsyncStorage.removeItem('@user');
  await AsyncStorage.removeItem('@UserProfile');
  await AsyncStorage.removeItem('@empOutletId');
  await AsyncStorage.removeItem('@beatId');
  await AsyncStorage.removeItem('@beatDate');
  await AsyncStorage.removeItem('@google_key');
  await AsyncStorage.removeItem('agendatype');
  // await AsyncStorage.removeItem('@baseurl');
  await TruncateAllTables();
  store.dispatch({ type: 'REMOVE_LAT_LNG' });
  store.dispatch({ type: 'REMOVE_GOOGLEAPI' });
};

const getAppToken = async () => {
  try {
    var getData = await AsyncStorage.getItem('@user');
    var Final_Token = JSON.parse(getData).AppToken;
    console.log('FINAL TOKEN', Final_Token);
    return Final_Token;
  } catch (e) {
    console.log('error in getAppToken');
  }
};

//get Current Time for HH:MM:SS
function getcurrentTime() {
  const date = moment().format('LT');
  const hh = date.split(' ')[0].split(':')[0];
  const mm = date.split(' ')[0].split(':')[1];

  let hh1 = '';
  if (hh.length == 1) {
    hh1 = `0${hh}`;
  } else {
    hh1 = hh;
  }
  let final_date = `${hh1}:${mm}`;

  console.log('return value of date in date function', date);
  return final_date;
}

function getcurrentAmPm() {
  const date = moment().format('LT');
  const date2 = date.split(' ')[1];
  return date2;
}

const getTerritory_id = async () => {
  try {
    var getData = await AsyncStorage.getItem('@user');
    var TerritoryId = JSON.parse(getData).employee[0].TerritoryId;
    console.log('Territory Id  ___///////////////', TerritoryId);
    return TerritoryId;
  } catch (e) {
    console.log('erro in getTerritory_id Common repository', e);
  }
};

const getUserDetails = async () => {
  try {
    var getData = await AsyncStorage.getItem('@user');

    return getData;
  } catch (e) {
    console.log('erro in getTerritory_id Common repository', e);
  }
};

const getEmployeeId = async () => {
  try {
    var getData = await AsyncStorage.getItem('@user');
    var EmployeeId = JSON.parse(getData).data.EmployeeId;
    console.log('EmployeeId  ___///////////////', EmployeeId);
    return EmployeeId;
  } catch (e) {
    console.log('erro in EmployeeId Common repository', e);
  }
};

const getOutletId = async () => {
  try {
    var getData = await AsyncStorage.getItem('@user');
    var OutletId = JSON.parse(getData).data.OutletId;
    console.log('Outlet ___///////////////', OutletId);
    return OutletId;
  } catch (e) {
    console.log('error in OutletId Common repository', e);
  }
};

const getLastCheckInOutLocation = async empId => {
  try {
    const result = await gettripLocationApi(
      `api/getLastLocation?employee_id=${empId}`,
    );
    if (result.error) {
      if (error.error.code == 525) {
        navigateToHome('QRScannerNew');
      } else {
        console.log(result.error.message);
      }
    } else {
      if (result.statusCode == 200) {
        // alert(JSON.stringify(result))
        if (result.data.length == 0) {
          return 'Not available';
        } else {
          return result.data[0].CheckinAddress;
        }
      } else if (result.statusCode == 500) {
        onServerError('InternalServerError');
      } else {
        return 'Error';
      }
    }
  } catch (err) {
    console.log('Error Catch :', err);
  }
};

const getUserScopes = async () => {
  try {
    var getData = await AsyncStorage.getItem('@user');
    var scopes = JSON.parse(getData).scope;
    console.log('Scopes', scopes);
    return scopes;
  } catch (e) {
    console.log('error in getUserscopes in Common repository', e);
  }
};

const getMediaById = async mediaId => {
  try {
    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        apptoken: `${await getAppToken()}`,
      },
    };
    const response = await fetch(
      `${await SERVER_URL()}api/getMedia?media_ids=${mediaId}`,
      config,
    );
    const result = await response.json();
    console.log(
      'result in getMediaById In Common Repository Line 81...',
      result.statusCode,
    );
    if (result.error) {
      Alert.alert(
        'Warning',
        `${result.error.message}`,
        [
          {
            text: 'Ok',

            onPress: () => BackHandler.exitApp(),
          },
        ],

        { cancelable: false },
      );
    } else {
      if (result.statusCode == 200) {
        return result;
      } else if (result.statusCode == 500) {
        Alert.alert(
          'Warning',
          `${result.message}`,
          [
            {
              text: 'Ok',

              onPress: () => BackHandler.exitApp(),
            },
          ],

          { cancelable: false },
        );
      } else {
        return result;
      }
    }
  } catch (e) {
    console.log('Error in getMediaById In Common Repository is', e);
    return null;
  }
};

const handleLogout = async () => {

  const result1 = await attendanceStatusGetData('api/punchStatus');
  console.log('status api data ', result1);
  console.log('PUNCHIN STATUS  🙌🙌===>', result1.data.Resp.AttendenceStatus);
  if (result1.data.Resp.AttendenceStatus == 'Punched in') {
    Alert.alert('Warning', 'Please end your day first.');
   } else if (result1.statusCode == 500) {
    Alert.alert(
      'Warning',
      `${result1.message}`,
      [
        {
          text: 'Ok',

          onPress: () => BackHandler.exitApp(),
        },
      ],

      { cancelable: false },
    );
  } else {
    const result = await logoutApi('api/logout');
    console.log('LOGOUT_API_DATA_MESSAGE--------->', result);

    if (
      result.statusCode === 200 &&
      result.message === 'Logout Successfully.'
    ) {
      await AsyncStorage.removeItem('@user');
      await AsyncStorage.removeItem('@UserProfile');
      await AsyncStorage.removeItem('@empOutletId');
      await AsyncStorage.removeItem('@beatId');
      await AsyncStorage.removeItem('@beatDate');
      await AsyncStorage.removeItem('@google_key');
      await AsyncStorage.removeItem('agendatype');
      await AsyncStorage.removeItem('@userprofile');
      await AsyncStorage.removeItem('@DashboardMenus');
      await AsyncStorage.removeItem('@actionMenus');
      // await AsyncStorage.removeItem('@baseurl');
      await TruncateAllTables();

      store.dispatch({ type: 'REMOVE_DASH_BUTTON' });
      store.dispatch({ type: 'REMOVE_ACTION_BUTTON' });
      store.dispatch({ type: 'REMOVE_LAT_LNG' });
      store.dispatch({ type: 'REMOVE_GOOGLEAPI' });
      // navigateToClearStack('QRScannerNew');
      let t = {
        url: `${await SERVER_URL()}`,
      };
      navigateToClearStack('BLoginByMobileNumber', t);
    } else {
      alert('Something went wrong,Please try again later.');
    }
  }
};

const createOTPRequest = async (isdCode, contactNumber, otpRequestReason) => {
  try {
    const response = await fetch(
      `${await SERVER_URL()}api/createOtpRequest?isd_code=${isdCode}&contact_number=${contactNumber}&employee_id=${await getEmployeeId()}&otp_request_reason=${otpRequestReason}`,
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-type': 'application/json',
          apptoken: `${await getAppToken()}`,
        },
        // body: JSON.stringify(body)
      },
    );
    const result = await response.json();
    console.log(
      'Response in createOTPRequest in commonRepository Line 90---->',
      result,
    );
    if (result.error) {
      Alert.alert(
        'Warning',
        `${result.error.message}`,
        [
          {
            text: 'Ok',

            onPress: () => BackHandler.exitApp(),
          },
        ],

        { cancelable: false },
      );
    } else {
      if (
        result.statusCode === 200 &&
        result.message === 'OTP request created successfully.'
      ) {
        return result;
      } else if (result.statusCode == 500) {
        Alert.alert(
          'Warning',
          `${result.message}`,
          [
            {
              text: 'Ok',

              onPress: () => BackHandler.exitApp(),
            },
          ],

          { cancelable: false },
        );
      } else {
        return result;
      }
    }
  } catch (err) {
    console.log('CATCH ERROR FROM createOTPRequest', err);
  }
};

const verifyOTPRequest = async (otpRequestId, contactNumber, otp) => {
  try {
    const response = await fetch(
      `${await SERVER_URL()}api/verifyOtpRequest?otp_request_id=${otpRequestId}&contact_number=${contactNumber}&otp=${otp}`,
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-type': 'application/json',
          apptoken: `${await getAppToken()}`,
        },
      },
    );
    console.log('response in verify OTP--->', response);
    const result = await response.json();
    console.log(
      'Response in verifyOTPRequest in commonRepository Line 118---->',
      result,
    );
    if (result.error) {
      Alert.alert(
        'Warning',
        `${result.error.message}`,
        [
          {
            text: 'Ok',

            onPress: () => BackHandler.exitApp(),
          },
        ],

        { cancelable: false },
      );
    } else {
      if (result.statusCode == 200) {
        return result;
      } else if (result.statusCode == 400) {
        return result;
      } else if (result.statusCode == 500) {
        Alert.alert(
          'Warning',
          `${result.message}`,
          [
            {
              text: 'Ok',

              onPress: () => BackHandler.exitApp(),
            },
          ],

          { cancelable: false },
        );
      } else {
        return result;
      }
    }
  } catch (err) {
    console.log(
      'CATCH ERROR FROM verifyOTPRequest commonRepository---> Line 128',
      err,
    );
  }
};

const getUserProfile = async () => {
  try {
    var getData = await AsyncStorage.getItem('@UserProfile');
    return getData;
  } catch (e) {
    console.log('error in getAppToken');
  }
};

const getReportingToPhn = async () => {
  try {
    var getData = await AsyncStorage.getItem('@UserProfile');
    console.log('getData----->', getData);
    var ReportingToPhone = JSON.parse(getData);
    ReportingToPhone = ReportingToPhone.data.Reporting[0].Phone;
    console.log('ReportingTo Phone  ___///////////////', ReportingToPhone);
    return ReportingToPhone;
  } catch (e) {
    console.log('erro in Reporting To Phnoe Common repository', e);
  }
};

const setUserProfile = async () => {
  var EmployeeId = await getEmployeeId();
  // alert(EmployeeId)
  try {
    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        apptoken: `${await getAppToken()}`,
      },
    };
    const response = await fetch(
      `${await SERVER_URL()}api/getProfile?EmployeeId=${EmployeeId}`,
      config,
    );
    console.log('response---->', response);
    // alert(JSON.stringify(result.data))
    const result = await response.json();
    console.log('result setUserProfile Line 176 commonRepo-->', result);
    if (result.statusCode == 200) {
      await AsyncStorage.setItem('@UserProfile', JSON.stringify(result));
    } else if (result.statusCode == 500) {
      Alert.alert(
        'Warning',
        `${result.message}`,
        [
          {
            text: 'Ok',

            onPress: () => BackHandler.exitApp(),
          },
        ],

        { cancelable: false },
      );
    } else {
      // alert('Data Not Found');
    }
  } catch (e) {
    console.log('Error from get Profile ', e);
  }
};

const getGlobalSearchedData = async value => {
  try {
    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        apptoken: `${await getAppToken()}`,
      },
    };
    const response = await fetch(
      `${await SERVER_URL()}api/search?search=${value}`,
      config,
    );
    console.log('response In getGlobalSearchedData---->', response);
    const result = await response.json();
    console.log(
      'result getGlobalSearchedData  in commonRepo Line 232 -->',
      result,
    );
    if (result.statusCode == 200) {
      return result;
    } else if (result.statusCode == 500) {
      Alert.alert(
        'Warning',
        `${result.message}`,
        [
          {
            text: 'Ok',

            onPress: () => BackHandler.exitApp(),
          },
        ],

        { cancelable: false },
      );
    } else {
      return result;
    }
  } catch (e) {
    console.log('Error from getGlobalSearchedData in CommonRepo Line 239 ', e);
  }
};

const getUserCurrentLatLng = async () => {
  // alert('hi')
  var latitude;
  var longitude;
  var temp;

  Geolocation.getCurrentPosition(
    info => {
      const { coords } = info;
      console.log('coords', coords);
      // console.log("info",info)
      latitude = coords.latitude;
      longitude = coords.longitude;

      let body = {
        latitude: latitude,
        longitude: longitude,
      };
      // alert("splash alert "+JSON.stringify(body))
      store.dispatch({ type: 'ADD_LAT_LNG', payload: body });
    },
    error => console.log(error),
    {
      enableHighAccuracy: false,
      timeout: 2000,
      maximumAge: 3600000,
    },
  );
};
const getUserCurrentLatLngNew = async () => {
  // alert('hi')
  var latitude;
  var longitude;
  var temp;

  Geolocation.getCurrentPosition(
    info => {
      const { coords } = info;
      console.log('coords', coords);
      // console.log("info",info)
      latitude = coords.latitude;
      longitude = coords.longitude;

      let body = {
        latitude: latitude,
        longitude: longitude,
      };
      // store.dispatch({type: 'ADD_LAT_LNG', payload: body});
      StoreDatatoAsync('latlongNew', body);
    },
    error => console.log(error),
    {
      enableHighAccuracy: false,
      timeout: 2000,
      maximumAge: 3600000,
    },
  );
};

const getUserCurrentLocationCommon = async (lat, lng) => {
  try {
    const f_address = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${await googleKey()}`,
    );
    const f = await f_address.json();
    // console.log('fffffff7845296lmsdklvsm', f.results[0].formatted_address);
    // setFormattedAddress(f.results[0].formatted_address);
    return f.results[0].formatted_address;
  } catch (e) {
    console.log(
      'Erro in catch getUserCurrentLocationCommon in Common Repository===',
      e,
    );
  }
};

async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Example App',
        message: 'Example App access to your location ',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the location');
      // alert("You can use the location");
    } else {
      console.log('location permission denied');
      alert('Location permission denied you can not mark attendace');
    }
  } catch (err) {
    console.warn(err);
  }
}

const getEmployeeDetailsById = async id => {
  try {
    const result = await gettripLocationApi(`api/getEmployeeDetails/${id}`);
    if (result.statusCode == 200) {
      return result.data.employeeDetails;
    } else {
      return '';
    }
  } catch (err) {
    console.log("Error in Api getEmployeeDetailsById in common Repository===>", err)
  }
};

const getTeamlist = async () => {
  try {
    const result = await gettripLocationApi(`api/getMyTeam?filter=0`);
    if (result.statusCode == 200) {
      return result.data.team;
    } else {
      return [];
    }
  } catch (e) {
    console.log('Catch Error in common Repo getMyTeam', e);
  }
};

const checkForUpdate = async () => {
  const response = await VersionCheck.needUpdate();

  const laterfun = () => {
    setTimeout(() => {

      checkForUpdate();
    }, 1000 * 60 * 60 * 24);
  };

  if (response.isNeeded) {
    Alert.alert(
      'New update available!',
      `version ${response.latestVersion} is available to download. Downloading the latest update you will get latest features, improvements and bug fixes.`,
      [
        {
          text: 'Remind me later',
          onPress: () => laterfun(),
          style: 'cancel',
        },
        {
          text: 'Update',
          onPress: () => Linking.openURL(response.storeUrl),
          style: 'cancel',
        },
      ],
      {
        cancelable: false,
        onDismiss: () => { },
      },
    );
  } else {
    console.log('app is updated');
  }
};


const getCurrentVersion = async () => {
  const response = await VersionCheck.needUpdate();
  return response.currentVersion;
}

const rateYourApp = async () => {
  // const response = await VersionCheck.needUpdate();
  try {
    const isReview = InAppReview.isAvailable();
    if (isReview) {
      setTimeout(() => {
        InAppReview.RequestInAppReview();
      }, 1000 * 60 * 60 * 24 * 8);
    }
  } catch (e) {
    console.log('Catch Error in review app', e);
  }
};

export {
  getAppToken,
  getcurrentTime,
  getTerritory_id,
  getEmployeeId,
  getOutletId,
  getUserScopes,
  handleLogout,
  createOTPRequest,
  verifyOTPRequest,
  getUserDetails,
  getReportingToPhn,
  setUserProfile,
  getUserProfile,
  getMediaById,
  getGlobalSearchedData,
  getcurrentAmPm,
  getUserCurrentLatLng,
  getUserCurrentLatLngNew,
  getUserCurrentLocationCommon,
  requestLocationPermission,
  SERVER_URL,
  getLastCheckInOutLocation,
  checkForUpdate,
  RemoveAsyncData,
  getEmployeeDetailsById,
  getTeamlist,
  rateYourApp,
  getCurrentVersion
  // openAppSettings
};
