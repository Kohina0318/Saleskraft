import React, { useEffect, useState } from 'react';
import { Modal, View, Dimensions } from 'react-native'
import StyleCss from '../../assets/css/styleOutlet';
const { width } = Dimensions.get('window');
import { Colors } from '../../assets/config/Colors';
import { useToast } from "react-native-toast-notifications";
import { useSelector } from 'react-redux';
import Geolocation from '@react-native-community/geolocation';
import { postAttachMediaOutletCheckin, postOutletVerifyCheckIn, postOutletVerifyCheckOut } from '../../repository/outlet/VerifyOutletRepository';
import { uploadMediaApi } from '../../repository/CaseGrievance/CaseGrievance';
import { Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';

export default VerifyOutletModal2 = (props) => {

  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()

  const navigation = useNavigation()
  const toast = useToast();
  // const [checked, setChecked] = React.useState('English');
  const outletVerifySelfie = useSelector(state => state.BAOutletVerifySelfie);
  //console.log("Redux....outlet Verify Selfie........22222🤐", outletVerifySelfie)
  const [checkinId, setCheckinId] = React.useState('')
  const [checkoutId, setCheckoutId] = React.useState('')
  const [mediaId, setMediaId] = React.useState('')

  const [formattedaddress, setFormattedAddress] = useState('')
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')

  const apikey = useSelector(state=>state.googleAPI);

  const getUserCurrentLocation = () => {

    Geolocation.getCurrentPosition(
      info => {
        const { coords } = info
        console.log("coords....", coords)

        setLatitude(coords.latitude)
        setLongitude(coords.longitude)
        getUserCurrentAddress(coords.latitude, coords.longitude)
      },
      error => console.log(error),
      {
        enableHighAccuracy: false,
        timeout: 2000,
        maximumAge: 3600000
      }
    )
  };

  async function getUserCurrentAddress(latitude, longitude) {
    const f_address = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apikey}`)
    const f = await f_address.json()
    console.log("f-____-Address....😎", f.results[0].formatted_address)
    setFormattedAddress(f.results[0].formatted_address)
  }

  const outletCheckIn = async () => {
    var OutletId = props.outletId;
    let checkInTime = new Date()
    console.log("checkInTime...>>",checkInTime)
    const res = await postOutletVerifyCheckIn(formattedaddress, latitude, longitude, OutletId,checkInTime)
    console.log("Outlet Verify Check In....>>>>>.....😏", res);
    if (res.statusCode == 200) {
      setCheckinId(res.data.CheckinId)
      toast.show(res.message, {
        type: "success",
        placement: "bottom",
        duration: 3000,
        offset: 30,
        animationType: "slide-in",
      });
      outletVerifyMediaUpload64(res.data.CheckinId, "Outlet_CheckIn");
    } else if (res.message == 'Already Check in') {
      outletCheckOut();
    }
    else {
      toast.show(res.message, {
        type: "warning",
        placement: "bottom",
        duration: 3000,
        offset: 30,
        animationType: "slide-in",
      });
    }
    props.setmodalVisible2(false);
  }

  const outletVerifyMediaUpload64 = async (chkin_id, purpose) => {
    let body = {
      folder_id: '1',
      media: [outletVerifySelfie]
    }
    const result = await uploadMediaApi('api/uploadMediaBase64', body);
    console.log("upload media Checkin in verify Outlet......>🤔", result)
    setMediaId(result.data[0])
    console.log("Media Id Outlet Verify.......>:", result.data[0])
    VerifyMedia(chkin_id, purpose, result.data[0]);
  }

  const VerifyMedia = async (checkinId, purpose, mediaId) => {
    const res = await postAttachMediaOutletCheckin(mediaId, checkinId, purpose, formattedaddress);
    console.log("VerifyMedia.......>>...:", res)
    //navigation.navigate('Groom')
    if (purpose == "Outlet_CheckIn") {
      navigation.reset({
        index: '0',
        routes: [{ name: "Groom" }]
      })
    } else {
      navigation.reset({
        index: '0',
        routes: [{ name: "NewDashboard" }]
      })
    }
  }

  const outletCheckOut = async () => {
    var OutletId = props.outletId;
    let checkOutTime = new Date();
    console.log("checkOutTime...>>",checkOutTime)
    const res = await postOutletVerifyCheckOut(formattedaddress, latitude, longitude, OutletId,checkOutTime)
    console.log("Outlet Verify Check Out....>>>>>.....😏", res);
    if (res.statusCode == 200) {
      setCheckoutId(res.data.CheckinId)
      console.log("Outlet Verify Check Out Id....>>>>>.....😏", res.data.CheckinId);
      toast.show(res.message, {
        type: "success",
        placement: "bottom",
        duration: 3000,
        offset: 30,
        animationType: "slide-in",
      });
      outletVerifyMediaUpload64(res.data.CheckinId, "Outlet_CheckOut");
    }
    else {
      toast.show(res.message, {
        type: "warning",
        placement: "bottom",
        duration: 3000,
        offset: 30,
        animationType: "slide-in",
      });
    }
    props.setmodalVisible2(false);
  }

  useEffect(() => {
    getUserCurrentLocation()
    // outletCheckOut()
  }, [])

  return (
    <>

      <Modal
        animationType="slide"
        transparent={true}
        visible={props.modalVisible2}>
        <View style={StyleCss.centeredView}>
          <View style={{...StyleCss.modalView,backgroundColor:themecolor.RB2}}>
            <View style={StyleCss.ModalViewWidth}>
              <View
                style={StyleCss.ModelVideoCenter}>
                <Avatar.Image
                  // source={require('../../assets/images/profile_user.png')}
                  source={{ uri: `data:image/jpeg;base64,${outletVerifySelfie}` }}
                  style={{ width: '100%' }}
                  resizeMode={'cover'}
                  size={200}
                />

              </View>
              <View style={StyleCss.MV2} />
            </View>
            <View style={StyleCss.FLexCenter}>
              <FullsizeButton width={width * 0.32} fontsize={11} BRadius={30} height={30} backgroundColor={themecolor.HEADERTHEMECOLOR} onPress={() => outletCheckIn()} title='Verify' />
              <FullsizeButton width={width * 0.25} fontsize={11} BRadius={30} height={30} backgroundColor={'transparent'} titlecolor={Colors.grey} 
              onPress={() => {props.setmodalVisible2(false);props.setmodalVisible1(true)}} title='Cancel' />
            </View>
          </View>
        </View>
      </Modal>

    </>
  )
}
