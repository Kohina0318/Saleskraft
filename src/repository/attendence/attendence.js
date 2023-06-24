import { getAppToken } from '../commonRepository';
import { SERVER_URL } from '../commonRepository';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigateToClearStack, onServerError } from '../../navigation/NavigationDrw/NavigationService';

// var ServerURL = "http://saleskraft.archisys.biz";

const attendancePostData = async url => {
  // console.log('url============7777777', url);
  console.log('`${ServerURL}/${url}`', `${await SERVER_URL()}${url}`);
  var token = await AsyncStorage.getItem('@user');
  var Final_token = JSON.parse(token).AppToken;
  console.log('TOKENTOKENTOKEN========>>>', Final_token);
  try {
    const response = await fetch(`${await SERVER_URL()}${url}`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        apptoken: `${Final_token}`,
      },
    });
    const result = await response.json();
    console.log(
      'result after punchOut in attendence Repository Line 25--->',
      result,
    );
    if (result.error) {
      if (result.error.code == 525) {
        // navigateToHome('BLoginByMobileNumber')
        navigateToClearStack('BLoginByMobileNumber', { url: await SERVER_URL() })
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
    console.log(
      'Err in catch after punchOut in attendence Repository Line 34 --->',
      err,
    );
    return alert(err);
  }
};

const attendanceStatusGetData = async url => {
  // console.log('url============7777777', url)
  console.log('`${ServerURL}/${url} from status`', `${await SERVER_URL()}${url}`);
  var token = await AsyncStorage.getItem('@user');
  var Final_token = JSON.parse(token).AppToken;
  console.log('finalToken======> ', Final_token);
  try {
    const response = await fetch(`${await SERVER_URL()}${url}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        apptoken: `${await getAppToken()}`,
      },
    });
    const result = await response.json();
    if (result.error) {
      if (result.error.code == 525) {
        navigateToClearStack('BLoginByMobileNumber', { url: await SERVER_URL() })
      }
    } else {
      if (result.statusCode == 200) {
        return result;
      } else if (result.statusCode == 500) {
        onServerError('InternalServerError')
      } else {
        return null;
      }

    }
  } catch (err) {
    console.log('Error from Attendance Status Line 66======>', err);
  }
};

export { attendancePostData, attendanceStatusGetData };
