import {getAppToken, RemoveAsyncData} from '../commonRepository';
import {ToastAndroid} from 'react-native';
import { navigateToClearStack , onServerError } from '../../navigation/NavigationDrw/NavigationService';
import { SERVER_URL } from '../commonRepository';

const getallTicketsApi = async url => {
  try {
    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        apptoken: `${await getAppToken()}`,
      },
    };
    const response = await fetch(`${await SERVER_URL()}${url}`, config);
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
        navigateToClearStack('BLoginByMobileNumber',{url:await SERVER_URL()})  
      } else {
        console.log(result.error.message);
      }
    } else {
    }
    if (result.statusCode == 200) {
      return result;
    } else if (result.statusCode == 500) {
      onServerError('InternalServerError')
    } else {
      return null;
    }
  } catch (e) {
    console.log('Error from logout is', e);
  }
};

const uploadMediaApi = async (url, body) => {
  console.log('body------->', body);

  try {
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        apptoken: `${await getAppToken()}`,
      },
      body: JSON.stringify(body),
    };
    const response = await fetch(`${await SERVER_URL()}${url}`, config);
    //  console.log("")
    const result = await response.json();
    // alert(JSON.stringify(result))
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
        navigateToClearStack('BLoginByMobileNumber',{url:await SERVER_URL()})  
      } else {
        console.log(result.error.message);
      }
    } else {
      if (result.statusCode == 200) {
        return result;
      } else if (result.statusCode == 500) {
        onServerError('InternalServerError')
      }else if(result.statusCode == 404){
        return result
      } else {
        // alert('else')
        return null;
      }
    }

    //   }
  } catch (e) {
    console.log('Error from logout is', e);
  }
};

export {getallTicketsApi, uploadMediaApi};
