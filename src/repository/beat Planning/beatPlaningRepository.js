import { getAppToken } from '../commonRepository'
import { SERVER_URL } from '../commonRepository';
import { navigateToHome,onServerError } from '../../navigation/NavigationDrw/NavigationService';

const getBeatDump = async () => {
  // var territoryid=await getTerritory_id();
  // console.log("kohinajhgfdghfogjhiugfdhjkhb------ ",territoryid)
  try {
    const config = {
      method: 'GET',
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        apptoken: `${await getAppToken()}`
      }
    }
    const response = await fetch(`${await SERVER_URL()}api/getBeatDump?beatId=1`, config)
    console.log("Beat Dump response....", response)
    const result = await response.json()
    if(result.error){
      if(result.error.code == 525){
        navigateToHome('BLoginByMobileNumber')
      }else{
        console.log(result.error.message)
      }
    }else{
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
  } catch (e) {
    console.log("Error from getBeatDump is in beatPlaningRepository--->", e)
  }
}

const getOutletById = async (id) => {
  try {
    const config = {
      method: 'GET',
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        apptoken: `${await getAppToken()}`
      }
    }
    const response = await fetch(`${await SERVER_URL()}api/getOutletById?outlet_id=${id}`, config)
    console.log(" getOutletById Dump response....", response);
    const result = await response.json();
    if(result.error){
      if(result.error.code == 525){
        navigateToHome('BLoginByMobileNumber')
      }else{
        alert(result.error.message)
      }
     
    }else{
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
  } catch (e) {
    console.log("In catch Error getOutletById is", e)
  }
}

const getBeatOutlets = async (beatId) => {
  // const punchStatus = await gettripLocationApi('api/punchStatus')
  // const agendaType = punchStatus.Agenda.Agendname
  // alert(agendaType)
  // alert(beatId)
  try {
    const config = {
      method: 'GET',
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        apptoken: `${await getAppToken()}`
      }
    }
    const response = await fetch(`${await SERVER_URL()}api/getBeatOutlets?beatId=${beatId}`, config)
    console.log(" getBeatOutlets response in beatPlaningRepository....", response);
    const result = await response.json();
    if(result.error){
      if(result.error.code == 525){
        navigateToHome('BLoginByMobileNumber')
       }else{
         alert(result.error.message)
       }
    }else{
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
  } catch (e) {
    console.log("In catch Error getBeatOutlets in beatPlaningRepository is", e)
  }
}


export { getBeatDump, getOutletById, getBeatOutlets };