import {getAppToken, RemoveAsyncData} from '../commonRepository';
import {ToastAndroid} from 'react-native';
import { navigateToClearStack,onServerError } from '../../navigation/NavigationDrw/NavigationService';
import { SERVER_URL } from '../commonRepository';

const postCreateCompetition = async body => {
  try {
    const response = await fetch(`${await SERVER_URL()}api/createCompetition`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        apptoken: `${await getAppToken()}`,
      },
      body: JSON.stringify(body),
    });
    // console.log("response in postCreateCompetition in Line 20--->",response)
    const result = await response.json();
    console.log('result in post Create Competition  Line 22...', result);
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
      } else if (result) {
        return result;
      }
    }
  } catch (err) {
    console.log('Error in Catch in Create Competition...', result);
  }
};

const getCompetitionByOutletId = async outletId => {
  try {
    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        apptoken: `${await getAppToken()}`,
      },
    };
    const response = await fetch(
      `${await SERVER_URL()}api/getCompetitionByOutletId?outlet_id=${outletId}`,
      config,
    );
    console.log('response in getCompetitionByOutletId Line 44==>', response);
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
        // alert("Data Not Found")
      }
    }
  } catch (e) {
    console.log('Error from getCompetitionByOutletId... ', e);
  }
};

const getCompetitors = async () => {
  try {
    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        apptoken: `${await getAppToken()}`,
      },
    };
    const response = await fetch(`${await SERVER_URL()}api/getCompetitors`, config);
    const result = await response.json();
    console.log('result getCompetitors Line 294---------->', result);
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
        // alert("Data Not Found")
      }
    }
  } catch (e) {
    console.log('Error from getCompetitors  ', e);
  }
};

const getUnits = async () => {
  try {
    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        apptoken: `${await getAppToken()}`,
      },
    };
    const response = await fetch(`${await SERVER_URL()}api/getUnits`, config);
    const result = await response.json();
    console.log('result getUnits Line 294---------->', result);
    if(result.error){
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
    }else{
      if (result.statusCode == 200) {
        return result;
      } else if (result.statusCode == 500) {
        onServerError('InternalServerError')
      } else {
        return result
      }

    }
  } catch (e) {
    console.log('Error from getUnits  ', e);
  }
};

export {
  postCreateCompetition,
  getCompetitionByOutletId,
  getUnits,
  getCompetitors,
};
