import {getAppToken, RemoveAsyncData} from '../commonRepository';
import {ToastAndroid} from 'react-native';
import { navigateToClearStack ,onServerError} from '../../navigation/NavigationDrw/NavigationService';
import { SERVER_URL } from '../commonRepository';

const gettripLocationApi = async url => {
  console.log('url get api => ', url);
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
    if(result.error){
      if(result.error.code == 525){
        await RemoveAsyncData()
        ToastAndroid.showWithGravityAndOffset(
          `${'Token Expired'}`,
          ToastAndroid.TOP,
          ToastAndroid.LONG,
          10,
          10,
        );
        navigateToClearStack('BLoginByMobileNumber',{url:await SERVER_URL()})  
    }else{
        console.log(result.error.message)
    }
    }else{
      if (result.statusCode == 200) {
        return result;
      } else if (result.statusCode == 500) {
        onServerError('InternalServerError');
      } else {
        return result;
      }
    }
  } catch (e) {
    console.log('Catch Error from getApi', e);
  }
};

const createTripApi = async url => {
  console.log('url post api ', url);
  try {
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        apptoken: `${await getAppToken()}`,
      },
    };
    const response = await fetch(`${await SERVER_URL()}${url}`, config);
    const result = await response.json();
    // alert(JSON.stringify('result is '+result))
    if(result.error){
      if(result.error.code == 525){
        await RemoveAsyncData()
        ToastAndroid.showWithGravityAndOffset(
          `${'Token Expired'}`,
          ToastAndroid.TOP,
          ToastAndroid.LONG,
          10,
          10,
        );
        navigateToClearStack('BLoginByMobileNumber',{url:await SERVER_URL()})  
    }else{
        console.log(result.error.message)
    }
    }else{
      if (result.statusCode == 200) {
        return result;
      } else if (result.statusCode == 500) {
        onServerError('InternalServerError')
      } else {
        return result;
      }
    }
  } catch (e) {
    console.log('Error from catch is', e);
  }
};

export {gettripLocationApi, createTripApi};
