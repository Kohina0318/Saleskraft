import { getAppToken, getEmployeeId, getTerritory_id, RemoveAsyncData } from '../commonRepository';
import { ToastAndroid } from 'react-native';
import { SERVER_URL } from '../commonRepository';
import { navigateToClearStack, onServerError } from '../../navigation/NavigationDrw/NavigationService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDatafromAsync } from '../AsyncStorageServices';

const getOutLatesTypes = async () => {
  try {
    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        apptoken: `${await getAppToken()}`,
      },
    };
    const response = await fetch(`${await SERVER_URL()}api/getOutletTypes`, config);
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
        navigateToClearStack('BLoginByMobileNumber', { url: await SERVER_URL() })
      } else {
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
    console.log('Error from getOutLatesTypes ', e);
  }
};

const postCreateOutlet = async body => {
  var token = await AsyncStorage.getItem('@user');
  var Final_token = JSON.parse(token).AppToken;
  try {
    const response = await fetch(`${await SERVER_URL()}api/createOutlet`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        apptoken: `${await getAppToken()}`,
      },
      body: JSON.stringify(body),
    });
    console.log(
      'response in postCeateOutlet in outletRepository Line 42--->',
      response,
    );
    const result = await response.json();
    console.log(
      'result in Create Outlet in OutletRepository Line 42...',
      result,
    );
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
        navigateToClearStack('BLoginByMobileNumber', { url: await SERVER_URL() })
      } else {
        console.log(result.error.message)
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
    console.log(
      'Error in Catch in Create Outlet in OutletRepository...',
      result,
    );
  }
};

const getUserDistributor = async outletTypeId => {
  var territoryid = await getTerritory_id();
  // console.log("kohinajhgfdghfogjhiugfdhjkhb------ ",territoryid)
  try {
    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        apptoken: `${await getAppToken()}`,
      },
    };
    const response = await fetch(
      `${await SERVER_URL()}api/getParentOutlets?territory_id=${territoryid}&outlet_type_id=${outletTypeId}`,
      config,
    );
    console.log('response....', response);
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
        navigateToClearStack('BLoginByMobileNumber', { url: await SERVER_URL() })
      } else {
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
    console.log('Error from logout is', e);
  }
};

const getEmployeeBeats = async () => {
  var EmployeeId = await getEmployeeId();
  //console.log("kohinajhgfdghfogjhiugfdhjkhb------ ",EmployeeId)
  try {
    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        apptoken: `${await getAppToken()}`,
      },
    };
    const response = await fetch(
      `${await SERVER_URL()}api/getEmployeeBeats?employee_id=${EmployeeId}`,
      config,
    );
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
        navigateToClearStack('BLoginByMobileNumber', { url: await SERVER_URL() })
      } else {
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
    console.log('Error from logout is', e);
  }
};

const getAllOutlets = async () => {
  try {
    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        apptoken: `${await getAppToken()}`,
      },
    };
    const response = await fetch(`${await SERVER_URL()}api/getAllOutlet`, config);
    console.log('response in getAllOutlet Line 117....', response);
    const result = await response.json();
    console.log('result in getAllOutlet Line 119 --->....', result);
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
        navigateToClearStack('BLoginByMobileNumber', { url: await SERVER_URL() })
      } else {
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
    console.log('Error in getAllOutlets is--->', e);
  }
};


const getOutletDump = async () => {
  // alert("beat id is"+beatid)
 var url = ''
  const atype = await getDatafromAsync('JointEnable');
  // if(atype != null && atype != undefined){
  //   alert('inside getBeatDump')
  //   url = `getBeatDump?beatId=${beatid}`
  // }else{
  //   url = 'getOutletDump'
  // }
  try {
    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        apptoken: `${await getAppToken()}`,
      },
    };
    const response = await fetch(`${await SERVER_URL()}api/getOutletDump`, config);
    const result = await response.json();
    console.log('getOutletDump response....11', result);
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
        navigateToClearStack('BLoginByMobileNumber', { url: await SERVER_URL() })
      } else {
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
    console.log('Error from getOutletDump in OutletRepository--->', e);
  }
};

const getOutletHistory = async outletId => {
  try {
    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        apptoken: `${await getAppToken()}`,
      },
    };
    const response = await fetch(
      `${await SERVER_URL()}api/outletHistory?outlet_id=${outletId}`,
      config,
    );
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
        navigateToClearStack('BLoginByMobileNumber', { url: await SERVER_URL() })
      } else {
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
    console.log('Error from getOutletHistory is', e);
  }
};

const getDailyMtdSales = async outletId => {
  try {
    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        apptoken: `${await getAppToken()}`,
      },
    };
    const response = await fetch(
      `${await SERVER_URL()}api/getDailyMtdSales?outlet_id=${outletId}`,
      config,
    );
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
        navigateToClearStack('BLoginByMobileNumber', { url: await SERVER_URL() })
      } else {
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
    console.log('Error from getDailyMtdSales ', e);
  }
};

const getLastThreeMonthOrder = async outletId => {
  try {
    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        apptoken: `${await getAppToken()}`,
      },
    };
    const response = await fetch(
      `${await SERVER_URL()}api/getLastThreeMonthOrder?outlet_id=${outletId}`,
      config,
    );
    const result = await response.json();
    if (result.statusCode == 200) {
      return result;
    } else if (result.statusCode == 500) {
      onServerError('InternalServerError')
    } else {
      return result;
    }
  } catch (e) {
    console.log('Error from getLastThreeMonthOrder ', e);
  }
};

const getOutletRecentOrders = async outletId => {
  try {
    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        apptoken: `${await getAppToken()}`,
      },
    };
    const response = await fetch(
      `${await SERVER_URL()}api/getOutletRecentOrders?outlet_id=${outletId}`,
      config,
    );
    const result = await response.json();
    if (result.statusCode == 200) {
      return result;
    } else if (result.statusCode == 500) {
      onServerError('InternalServerError')
    } else {
      return result;
    }
  } catch (e) {
    console.log('Error from getOutletRecentOrders ', e);
  }
};

const getAllOutletOrders = async (outletId, outletType) => {
  try {
    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        apptoken: `${await getAppToken()}`,
      },
    };
    const response = await fetch(
      `${await SERVER_URL()}api/getAllOutletOrders?outlet_id=${outletId}&outlet_type=${outletType}`,
      config,
    );
    console.log('response in getAllOutletOrders Line 226==', response);
    const result = await response.json();
    if (result.statusCode == 200) {
      return result;
    } else if (result.statusCode == 500) {
      onServerError('InternalServerError')
    } else {
      return result;
    }
  } catch (e) {
    console.log('Error from getAllOutletOrders ', e);
  }
};

const getOrderById = async OrderId => {

  try {
    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        apptoken: `${await getAppToken()}`,
      },
    };
    const response = await fetch(
      `${await SERVER_URL()}api/getOrderByIdNew?order_id=${OrderId}`,
      config,
    );
    console.log('response in getAllOutletOrders Line 226==', response);
    const result = await response.json();
    if (result.statusCode == 200) {
      return result;
    } else if (result.statusCode == 500) {
      onServerError('InternalServerError')
    } else {
      return result;
    }
  } catch (e) {
    console.log('Error from getOrderById ', e);
  }
};

const getFrequentlyOrder = async () => {
  try {
    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        apptoken: `${await getAppToken()}`,
      },
    };
    const response = await fetch(
      `${await SERVER_URL()}api/getFrequentlyOrder`,
      config,
    );
    const result = await response.json();
    console.log('result getFrequentlyOrder Line 294---------->', result);
    if (result.statusCode == 200) {
      return result;
    } else if (result.statusCode == 500) {
      onServerError('InternalServerError')
    } else {
      return result;
    }
  } catch (e) {
    console.log('Error from getFrequentlyOrder  ', e);
  }
};

const getOutletOrderFilter = async (OrderId, status, outletType) => {
  try {
    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        apptoken: `${await getAppToken()}`,
      },
    };
    const response = await fetch(
      `${await SERVER_URL()}api/getOutletOrderFilter?outlet_id=${OrderId}&order_status=${status}&outlet_type=${outletType}`,
      config,
    );
    console.log('response in Get OutletOrderFilter Line 315==>>', response);
    const result = await response.json();
    if (result.statusCode == 200) {
      return result;
    } else if (result.statusCode == 500) {
      onServerError('InternalServerError')
    } else {
      return result;
    }
  } catch (e) {
    console.log('Error from getOutletOrderFilter ', e);
  }
};

const getOutletOutcomes = async () => {
  try {
    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        apptoken: `${await getAppToken()}`,
      },
    };
    const response = await fetch(`${await SERVER_URL()}api/getOutletOutcomes`, config);
    console.log(
      'response in Get getOutletOutcomes in outletRepo Line 315==>>',
      response,
    );
    const result = await response.json();
    if (result) {
      return result;
    } else if (result.statusCode == 500) {
      onServerError('InternalServerError')
    } else {
      return result;
    }
  } catch (e) {
    console.log('Error from getOutletOutcomes ', e);
  }
};

export {
  getOutLatesTypes,
  getUserDistributor,
  getEmployeeBeats,
  postCreateOutlet,
  getAllOutlets,
  getOutletDump,
  getOutletHistory,
  getDailyMtdSales,
  getOutletRecentOrders,
  getAllOutletOrders,
  getLastThreeMonthOrder,
  getOrderById,
  getFrequentlyOrder,
  getOutletOrderFilter,
  getOutletOutcomes,
};
