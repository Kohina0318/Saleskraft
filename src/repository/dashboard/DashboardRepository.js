import { ToastAndroid } from 'react-native';
import { SERVER_URL } from '../commonRepository';
import { getAppToken, RemoveAsyncData} from '../commonRepository'
import { navigateToClearStack,onServerError} from '../../navigation/NavigationDrw/NavigationService';

const getAllBeats = async (empId) => {
  console.log("data in Dashboard repository empid", empId);

  // continue here with joint working

  try {
    const config = {
      method: 'GET',
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        apptoken: `${await getAppToken()}`
      }
    }
    const response = await fetch(`${await SERVER_URL()}api/GetDefaultBeat?employee_id=${empId}`, config)
    const result = await response.json()
    console.log("result in getAllBeats In Dashboard Repository...", result);
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
  } catch (e) {
    console.log("Error in Catch getAllBeats in DashboardRepository--->", e)
    //   return null;
  }
}

const RoasterPlanOutlets = async (date) => {
  console.log("In getRoasterPlanOutlets in DashboardRepo", date)
  try {
    const config = {
      method: 'GET',
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        apptoken: `${await getAppToken()}`
      }
    }
    const response = await fetch(`${await SERVER_URL()}api/getRosterPlanOutlet?date=${date}`, config)
    const result = await response.json()
    console.log("result in getRoasterPlanOutlets In Dashboard Repository...", result);
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
  } catch (e) {
    console.log("Error in Catch getRoasterPlanOutlets in DashboardRepository--->", e)
    //   return null;
  }
}

const TargetWiseOrder = async (EmployeeId,f, t) => {
  // var EmployeeId = await getEmployeeId();
  // alert(EmployeeId)
  // alert("incomp22 "+props.EmployeeId)

  try {
    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        apptoken: `${await getAppToken()}`,
      },
    };
    const response = await fetch(
      `${await SERVER_URL()}api/getTargetWiseSales?from_date=${f}&to_date=${t}&employee_id=${EmployeeId}`,
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
        alert(result.error.message)
      }
    } else {
      if (result.statusCode === 200) {
        return result;
      } else if (result.statusCode == 500) {
        onServerError('InternalServerError')
      } else {
        return result;
      }
    }
  } catch (e) {
    console.log('getTargetWise...api ', e);
  }
};


export { getAllBeats, RoasterPlanOutlets,TargetWiseOrder };