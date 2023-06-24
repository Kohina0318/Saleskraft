import {getAppToken, RemoveAsyncData} from '../commonRepository';
import {ToastAndroid} from 'react-native';
import { navigateToClearStack,onServerError} from '../../navigation/NavigationDrw/NavigationService';
import { SERVER_URL } from '../commonRepository';


const getSuggestiveOrder = async (primaryOutletId, secondaryOutletId) => {
  try {
    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        apptoken: `${await getAppToken()}`,
      },
    };
    const response = await fetch(
      `${await SERVER_URL()}api/getSuggestiveOrder?primary_outlet_id=${primaryOutletId}&secondary_outlet_id=${secondaryOutletId}`,
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
        onServerError('InternalServerError');
      } else {
        return result;
      }
    }
  } catch (e) {
    console.log('Error from getSuggestiveOrder ', e);
  }
};

const getDefaultParentOutlets = async outletId => {
  try {
    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        apptoken: `${await getAppToken()}`,
      },
    };
    const response = await fetch(
      `${await SERVER_URL()}api/getDefaultParentOutlets?outlet_id=${outletId}`,
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
        onServerError('InternalServerError');
      } else {
        return result;
      }
    }
  } catch (e) {
    console.log('Error from getDefaultParentOutlets ', e);
  }
};

const getFilterSuggestiveOrder = async (
  primaryOutletId,
  secondaryOutletId,
  sortBy,
  categoryId,
) => {
  if (sortBy == undefined) {
    sortBy = '';
  }
  if (categoryId == undefined) {
    categoryId = '';
  }
  try {
    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        apptoken: `${await getAppToken()}`,
      },
    };
    const response = await fetch(
      `${await SERVER_URL()}api/getFilterSuggestiveOrder?primary_outlet_id=${primaryOutletId}&secondary_outlet_id=${secondaryOutletId}&short_by=${sortBy}&category_id=${categoryId}`,
      config,
    );
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
    console.log('Error from getFilterSuggestiveOrder ', e);
  }
};

export {getSuggestiveOrder, getDefaultParentOutlets, getFilterSuggestiveOrder};
