import {getAppToken, RemoveAsyncData} from '../commonRepository';
import {ToastAndroid} from 'react-native';
import { navigateToClearStack,onServerError } from '../../navigation/NavigationDrw/NavigationService';
import { SERVER_URL } from '../commonRepository';

const postBookRetailSale = async (body) => {
    try {
        const response = await fetch(`${await SERVER_URL()}api/BookRetailSale`,
            {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    apptoken: `${await getAppToken()}`
                },
                body: JSON.stringify(body),
            })
        // console.log("response in postBookRetailSale in Line 20--->",response)
        const result = await response.json()
        console.log("result in post BookRetailSale  Line 22...", result)
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
        console.log("Error in Catch in BookRetailSale...", result)
    }
}


export {postBookRetailSale};