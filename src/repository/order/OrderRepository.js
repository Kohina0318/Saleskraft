import {getAppToken,RemoveAsyncData} from '../commonRepository';
import {ToastAndroid} from 'react-native';
import { navigateToClearStack,onServerError } from '../../navigation/NavigationDrw/NavigationService';
import { SERVER_URL } from '../commonRepository';
import { gettripLocationApi } from '../trip/tripRepository';

const DeleteOrder = async(orderid) =>{
    console.log("orderid============> in DeleteOrder OrderRepository Line 9==>",orderid)
    try {
        const config = {
          method: 'GET',
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            apptoken: `${await getAppToken()}`
          }
        }
        const response = await fetch(`${await SERVER_URL()}api/orderDelete?order_id=${orderid}`, config)
        const result = await response.json()
        // alert(JSON.stringify(result))
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
            // alert(result.error.message)
          }
    
        } else {
          if (result.statusCode === 200) {
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

const getOrderStatuses=async()=>{
  try{
    const result = await gettripLocationApi('api/getOrderStatus')
    if(result.statusCode == 200){
      return result.data
    }else{
      console.log(result.message)
      return null
    }
  }catch(err){
    console.log("Catch error on order Repository line 57 //// "+err)
    return null 
  }
}

const getOutletTypes=async()=>{
  try{
    const result = await gettripLocationApi('api/getOutletTypes')
    // console.log("getOutletType data",result)
    if(result.statusCode == 200){
      return result.data
    }else{
      console.log(result.message)
      return null
    }
  }catch(err){
    console.log("Catch error on order Repository line 57 //// "+err)
    return null 
  }
}

export {DeleteOrder,getOrderStatuses,getOutletTypes};