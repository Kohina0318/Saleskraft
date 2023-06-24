import { getAppToken, RemoveAsyncData } from '../commonRepository';
import { ToastAndroid } from 'react-native';
import { navigateToClearStack,onServerError  } from '../../navigation/NavigationDrw/NavigationService';
import { SERVER_URL } from '../commonRepository';

const getAllMaterial = async () => {
  try {
    const config = {
      method: 'GET',
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        apptoken: `${await getAppToken()}`
      }
    }
    const response = await fetch(`${await SERVER_URL()}api/getAllMaterial`, config)
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
        console.log(result.error.message)
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

  } catch (e) {
    console.log("Error in getAllMaterial....line 23 ", e)
  }
}

export { getAllMaterial };

