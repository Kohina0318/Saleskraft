import {getAppToken, getEmployeeId, RemoveAsyncData} from '../commonRepository';
import {ToastAndroid} from 'react-native';
import { navigateToClearStack,onServerError} from '../../navigation/NavigationDrw/NavigationService';
import { SERVER_URL } from '../commonRepository';


const getDailyCalls = async d => {
  let emp_id =await getEmployeeId();
  console.log("SERVERURL+++++++++++++>>>>",SERVER_URL)
  try {
    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        apptoken: `${await getAppToken()}`,
      },
    };
    const response = await fetch(
      `${await SERVER_URL()}api/getDailyCalls?date=${d}&employee_id=${emp_id}`,
      config,
    );
    console.log("Response From getDailyCalls===",response)
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
      if (result.statusCode === 200) {
        return result;
      } else if (result.statusCode == 500) {
        onServerError('InternalServerError')
      } else {
        return result;
      }
    }
  } catch (e) {
    console.log('getDailyCalls ', e);
  }
};

const getMonthTillDateCalls = async (f, t) => {
  let emp_id = await getEmployeeId();
  try {
    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        apptoken: `${await getAppToken()}`,
      },
    };
    const response = await fetch(
      `${await SERVER_URL()}api/getMonthTillDateCalls?from_date=${f}&to_date=${t}&employee_id=${emp_id}`,
      config,
    );
    console.log("RESPONSE FROM MONTH TILL DATE CALLS",response)
    const result = await response.json();
    console.log('RESULT FROM MONTH TILL DATE CALLS', result);
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
      if (result.statusCode === 200) {
        return result;
      } else if (result.statusCode == 500) {
        onServerError('InternalServerError')
      } else {
        return result;
      }
    }
  } catch (e) {
    console.log('getMonthTillDateCalls ', e);
  }
};

const getTargetWiseSales = async (f, t) => {
  let emp_id = await getEmployeeId();
  try {
    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        apptoken: `${await getAppToken()}`,
      },
    };
    const response = await fetch(
      `${await SERVER_URL()}api/getTargetWiseSales?from_date=${f}&to_date=${t}&employee_id=${emp_id}`,
      config,
    );
    const result = await response.json();
    console.log('......................', result);
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
        return result;
      } else if (result.statusCode == 500) {
        onServerError('InternalServerError')
      } else {
        return result;
      }
    }
  } catch (e) {
    console.log('getTargetWiseSales...api ', e);
  }
};

const getBeatWiseSales = async (sd, ed) => {
  // alert(sd+' se '+ed)
  try {
    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        apptoken: `${await getAppToken()}`,
      },
    };
    const response = await fetch(
      `${await SERVER_URL()}api/getBeatWiseSales?from_date=${sd}&to_date=${ed}`,
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
      if (result.statusCode === 200) {
        return result;
      } else if (result.statusCode == 500) {
        onServerError('InternalServerError')
      } else {
        return result;
      }
    }
  } catch (e) {
    console.log('getBeatWiseSales...api ', e);
  }
};

const getAttendance = async (st, ed, EmployeeId) => {
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
      `${await SERVER_URL()}api/getAttendance?start_date=${st}&end_date=${ed}&employee_id=${EmployeeId}`,
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
      if (result.statusCode === 200) {
        return result
      } else if (result.statusCode == 500) {
        onServerError('InternalServerError')
      } else {
        return result;
      }
    }
  } catch (e) {
    console.log('getAttendance...api ', e);
  }
};

const getOutletVerification = async (st, ed, EmployeeId) => {
  // var EmployeeId = await getEmployeeId();
  try {
    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        apptoken: `${await getAppToken()}`,
      },
    };
    const response = await fetch(
      `${await SERVER_URL()}api/getOutletVerification?employee_id=${EmployeeId}&from_date=${st}&to_date=${ed}`,
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
      if (result.statusCode === 200) {
        return result;
      } else if (result.statusCode == 500) {
        onServerError('InternalServerError')
      } else {
        return result;
      }
    }
  } catch (e) {
    console.log('getOutletVerification...api ', e);
  }
};

const getIncentive = async (sd, ed) => {
  try {
    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        apptoken: `${await getAppToken()}`,
      },
    };
    const response = await fetch(
      `${await SERVER_URL()}api/getIncentive?from_date=${sd}&to_date=${ed}`,
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
      if (result.statusCode === 200) {
        // alert(JSON.stringify(result))
        return result;
      } else if (result.statusCode == 500) {
        onServerError('InternalServerError')
      } else {
        return result;
      }
    }
  } catch (e) {
    console.log('getIncentive...api ', e);
  }
};

const getExpenseReport = async (sd, ed,employeeId) => {
  // var employeeId = await getEmployeeId();
  try {
    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        apptoken: `${await getAppToken()}`,
      },
    };
    const response = await fetch(
      `${await SERVER_URL()}api/employeeExpenseReport?from_date=${sd}&to_date=${ed}&employee_id=${employeeId}`,
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
      if (result.statusCode === 200) {
        return result;
      } else if (result.statusCode == 500) {
        onServerError('InternalServerError')
      } else {
        return result;
      }
    }
  } catch (e) {
    console.log('getExpenseReport...api ', e);
  }
};

const getPaymentMode = async (sd, ed, userId) => {
  try {
    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        apptoken: `${await getAppToken()}`,
      },
    };
    const response = await fetch(
      `${await SERVER_URL()}api/paymentMode?from_date=${sd}&to_date=${ed}&user_id=${userId}`,
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
      if (result.statusCode === 200) {
        return result;
      } else if (result.statusCode == 500) {
        onServerError('InternalServerError')
      } else {
        return result;
      }
    }
  } catch (e) {
    console.log('getPaymentMode...api ', e);
  }
};

const getCashInHand = async (outletId,userId) => {
  try {
    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        apptoken: `${await getAppToken()}`,
      },
    };
    const response = await fetch(
      `${await SERVER_URL()}api/getCashInHand?outlet_id=${outletId}&user_id=${userId}`,
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
      if (result.statusCode === 200) {
        return result;
      } else if (result.statusCode == 500) {
        onServerError('InternalServerError')
      } else {
        return result;
      }
    }
  } catch (e) {
    console.log('getCashInHand...api ', e);
  }
};

export {
  getDailyCalls,
  getMonthTillDateCalls,
  getTargetWiseSales,
  getBeatWiseSales,
  getAttendance,
  getIncentive,
  getOutletVerification,
  getExpenseReport,
  getPaymentMode,
  getCashInHand,
};
