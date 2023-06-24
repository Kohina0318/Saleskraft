import { getAppToken, RemoveAsyncData,} from '../commonRepository'
import { ToastAndroid } from 'react-native'
import { navigateToClearStack,onServerError} from '../../navigation/NavigationDrw/NavigationService';
import { SERVER_URL } from '../commonRepository';


const getStockView = async (outletId,categoryId) => {
    try {
        const config = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                apptoken: `${await getAppToken()}`
            }
        }
        const response = await fetch(`${await SERVER_URL()}api/StockView?outlet_id=${outletId}&cat_id=${categoryId}`, config)
        const result = await response.json()
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
        console.log("StockView... ", e)
    }
}

const getInventoryView = async (productId,outletId) => {
    try {
        const config = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                apptoken: `${await getAppToken()}`
            }
        }
        const response = await fetch(`${await SERVER_URL()}api/inventoryView?product_id=${productId}&outlet_id=${outletId}`, config)
        const result = await response.json()
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
        console.log("InventoryView... ", e)
    }
}

const getOrderForGRN = async (outletId) => {
    try {
        const config = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                apptoken: `${await getAppToken()}`
            }
        }
        const response = await fetch(`${await SERVER_URL()}api/getOrderForGRN?outlet_id=${outletId}`, config)
        const result = await response.json()
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
        console.log("StockView... ", e)
    }
}

const getShippingOrderDetails = async (shippingOrderId) => {
    try {
        const config = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                apptoken: `${await getAppToken()}`
            }
        }
        const response = await fetch(`${await SERVER_URL()}api/getShippingOrderDetails?soid=${shippingOrderId}`, config)
        const result = await response.json()
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
        console.log("getShippingOrderDetails... ", e)
    }
}

const postProcessShippingOrder = async (body) => {
    try {
        const response = await fetch(`${await SERVER_URL()}api/ProcessShippingOrder`,
            {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    apptoken: `${await getAppToken()}`
                },
                body: JSON.stringify(body),
            })

        const result = await response.json()
        console.log("result in post ProcessShippingOrder  Line 22...", result)

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
            else if (result) {
                return result
            }
        }
    }
    catch (err) {
        console.log("Error in Catch in Post ProcessShippingOrder...", result)
    }
}


export{getStockView, getInventoryView,getOrderForGRN,getShippingOrderDetails,postProcessShippingOrder};