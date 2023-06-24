import { getAppToken, RemoveAsyncData } from '../commonRepository'
import { SERVER_URL } from '../commonRepository';
import {ToastAndroid} from 'react-native';
import { navigateToClearStack,onServerError} from '../../navigation/NavigationDrw/NavigationService';

const LoginSendOTP = async (url) => {
  // console.log('url============7777777', await SERVER_URL())
  // console.log('`${ServerURL}/${url}`', `${await SERVER_URL()}${url}`)
  console.log('Complete URL================>', `${url}`)
  try {
    const response = await fetch(`${url}`,
      {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        // body: JSON.stringify(body)            
      })
    const result = await response.json()
    console.log("reslt in LOgin in AuthRepo Line 20.", result)
    if (result.error) {
      if(result.error.code == 525){
        // navigateToHome('QRScannerNew')
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
        alert(result.error.message)
      }
    } else {
      if (result.statusCode == 200) {
        return result
      }
      else if (result.statusCode == 500) {
        onServerError('InternalServerError')
      }
      else {
        return result
      }
    }
  } catch (err) {
    console.log("error in Catch LoginSendOTP Line 28===>", err);
    return null;
  }
}

const submitOtpApi = async (url) => {
  try {
    const response = await fetch(`${await SERVER_URL()}${url}`,
      {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        // body: JSON.stringify(body)            
      })
    const result = await response.json()

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
        alert(result.error.message)
      }
    } else {
      if (result.statusCode == 200) {
        return result
      }
      else if (result.statusCode == 500) {
       onServerError('InternalServerError')
      }
      else {
        return result;
      }
    }
  } catch (err) {
    console.log("CATCH ERROR FROM SUBMITOTPApi", err)
  }
}

const logoutApi = async (url) => {
  try {
    const config = {
      method: 'GET',
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        apptoken: `${await getAppToken()}`
      }
    }
    const response = await fetch(`${await SERVER_URL()}${url}`, config)
    const result = await response.json()
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
        alert(result.error.message)
      }

    } else {
      if (result.statusCode === 200 && result.message === "Logout Successfully.") {
        return result
      }
      else if (result.statusCode == 500) {
        onServerError('InternalServerError')
      }
      else {
        return result
      }
    }
    console.log("result in logout In Auth Repo...", result);
  } catch (e) {
    console.log("Error from logout is", e)
    return null;
  }
}

export { LoginSendOTP, submitOtpApi, logoutApi };