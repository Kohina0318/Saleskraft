import config from '../../../config';
import { getAppToken, RemoveAsyncData } from '../commonRepository';
import { BackHandler, Alert, ToastAndroid } from 'react-native';
import { navigateToClearStack, navigateToHome,onServerError } from '../../navigation/NavigationDrw/NavigationService';
import { SERVER_URL } from '../commonRepository';

const getEventTypes = async () => {
  try {
    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        apptoken: `${await getAppToken()}`,
      },
    };
    const response = await fetch(`${await SERVER_URL()}api/getEventTypes`, config);
    const result = await response.json();
    console.log('GetEventTypes response  15---->', result);
    if (result.error) {
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
    console.log('Error from getEventTypes  ', e);
  }
};

const getAllevent = async startDate => {
  try {
    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        apptoken: `${await getAppToken()}`,
      },
    };
    const response = await fetch(
      `${await SERVER_URL()}api/getAllevent?start_date=${startDate}`,
      config,
    );
    const result = await response.json();
    if (result.error) {
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
    console.log('Error from getAllevent ', e);
  }
};

const postCreateEvent = async (eventTypeId, duration, remark) => {
  try {
    const response = await fetch(
      `${await SERVER_URL()}api/createEvent?event_type_id=${eventTypeId}&event_date=${duration}&event_remark=${remark}`,
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
    console.log('response postCreateEvent Repository Line 60--->', response);
    const result = await response.json();
    console.log('result in postCreateEvent Repository Line 62...', result);
    if (result.error) {
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
    console.log('Error in Catch in postCreateEvent Repository...', result);
  }
};

export { getEventTypes, postCreateEvent, getAllevent };
