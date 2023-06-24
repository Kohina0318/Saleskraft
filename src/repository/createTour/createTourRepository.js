import {getAppToken, RemoveAsyncData} from '../commonRepository';
import {ToastAndroid} from 'react-native';
import { navigateToClearStack,onServerError  } from '../../navigation/NavigationDrw/NavigationService';
import { SERVER_URL } from '../commonRepository';

const getCreateTour = async url => {
  try {
    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        apptoken: `${await getAppToken()}`,
      },
    };
    const response = await fetch(`${await SERVER_URL()}${url}`, config);
    console.log('response Lie 15---->', response);
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
      if (result.statusCode == 200) {
        return result;
      } else if (result.statusCode == 500) {
        onServerError('InternalServerError')
      } else {
        return result;
      }
    }
  } catch (e) {
    console.log(
      'Error from getCreateTour In Catch Line 23 In CreateTourRepository.js is',
      e,
    );
  }
};

const postCreateTourApi = async (url, body) => {
  console.log(
    'body under tour repo>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',
    body,
    url
  );
  try {
    const config = {
      method: 'POST',
      headers: {
        'accept': "application/json",
        'Content-Type': 'application/json',
        apptoken: `${await getAppToken()}`,
      },
      body: JSON.stringify(body),
    };
    let urll = `${await SERVER_URL()}${url}`
    console.log("url123==",urll)
    // alert(urll)
    const response = await fetch(urll, config);
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
      } else {
        return result;
      }
    }
  } catch (e) {
    console.log(
      'Error from postCreateTourApi In Catch Line 47 In CreateTourRepository is',
      e,
    );
  }
};

export {getCreateTour, postCreateTourApi};
