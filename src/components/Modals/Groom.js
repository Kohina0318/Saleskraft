import React, { useEffect, useState } from 'react';
import { StatusBar, View, Text, ImageBackground, PermissionsAndroid, Platform, } from 'react-native';
import styles from '../../assets/css/styleGroom';
import {
  launchCamera,
} from 'react-native-image-picker';
import ImgToBase64 from 'react-native-image-base64';
import { useDispatch, useSelector } from 'react-redux';
import { getCheckInOutStatus, postAttachMediaOutletCheckin } from '../../repository/outlet/VerifyOutletRepository';
import { uploadMediaApi } from '../../repository/CaseGrievance/CaseGrievance';
import Geolocation from '@react-native-community/geolocation';
import { useNavigation } from '@react-navigation/native';
import LoaderAllInOne from '../../components/shared/Loader';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';

export default function Groom(props) {

  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [filePath, setFilePath] = useState({ uri: 'https://picsum.photos/200/300?random=1' });
  const [refresh, setRefresh] = useState(false);

  // const outletVerifyGroom = useSelector(state => state.BAOutletVerifyGroom)
  // console.log("outletVerifyGroom======",outletVerifyGroom)
  const [mediaId, setMediaId] = React.useState('')
  const [media, setMedia] = React.useState('')
  const [formattedaddress, setFormattedAddress] = useState('')
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const apikey = useSelector(state => state.googleAPI);
  const [loader, setLoader] = React.useState(false);
  const [checkinId, setCheckinId] = useState('')

  const getUserCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      info => {
        const { coords } = info
        // console.log("coords....", coords)
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
    // console.log("f-____-Address....😎", f.results[0].formatted_address)
    setFormattedAddress(f.results[0].formatted_address)
  }

  useEffect(() => {
    getUserCurrentLocation()
    checkInOutStatus()
  }, [])

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  };

  const captureImage = async (type) => {
    var tempString = ''
    try {
      let options = {
        mediaType: type,
        maxWidth: 300,
        maxHeight: 550,
        quality: 1,
        videoQuality: 'low',
        durationLimit: 30, //Video max duration in seconds
        saveToPhotos: true,
      };
      let isCameraPermitted = await requestCameraPermission();
      let isStoragePermitted = await requestExternalWritePermission();
      if (isCameraPermitted && isStoragePermitted) {
        launchCamera(options, (response) => {
          console.log('Response = ', response);

          if (response.didCancel) {
            // alert('User cancelled camera picker');
            return;
          } else if (response.errorCode == 'camera_unavailable') {
            alert('Camera not available on device');
            return;
          } else if (response.errorCode == 'permission') {
            alert('Permission not satisfied');
            return;
          } else if (response.errorCode == 'others') {
            alert(response.errorMessage);
            return;
          }
          // console.log('base64 -> ', response.assets[0].base64);
          console.log('uri -> ', response.assets[0].uri);
          console.log('width -> ', response.assets[0].width);
          console.log('height -> ', response.assets[0].height);
          console.log('fileSize -> ', response.assets[0].fileSize);
          console.log('type -> ', response.assets[0].type);
          console.log('fileName -> ', response.assets[0].fileName);
          setFilePath(response);

          ImgToBase64.getBase64String(`${response.assets[0].uri}`).then(

            base64String => {
              console.log('Base 64 String ....', base64String);
              tempString = base64String;

              let body = {
                imgurl: base64String,
                id: response.assets[0].fileName,
              };
              dispatch({
                type: 'ADD_BA_OUTLET_VERIFY_GROOM',
                payload: base64String,
              });
              setRefresh(!refresh)

            }

          ).then(() => {
            outletVerifyMediaUpload64(tempString, "Grooming")
          })

          // props.handleOpen2(outletId)
        });
      }

    } catch (e) {
    }
  };

  const outletVerifyMediaUpload64 = async (base64Media, purpose) => {
    let body = {
      folder_id: '1',
      media: [base64Media]
    }
    const result = await uploadMediaApi('api/uploadMediaBase64', body);
    // console.log("upload media Groom in verify Outlet......>🤔", result)
    setMediaId(result.data[0])
    console.log("Media Id Outlet Verify Groom.......>:", result.data[0])
    VerifyMedia(purpose, result.data[0]);
  }

  const VerifyMedia = async (purpose, mediaId) => {
    setLoader(true);
    const res = await postAttachMediaOutletCheckin(mediaId, checkinId, purpose, formattedaddress);
    console.log("VerifyMedia Groom.......>>...:", res)
    if (res.statusCode == 200) {
      setLoader(false);
      navigation.reset({
        index: '0',
        routes: [{ name: "NewDashboard" }]
      })
    } else {
      console.log("Error in Else in VerifyMedia in Groom.js Line 206--->", res)
    }
  }

  const checkInOutStatus = async () => {
    const res = await getCheckInOutStatus();
    console.log("Get Check In Out Status......page Groom line 72", res);
    setCheckinId(res.data.data.CheckInRec.CheckinId);
  }


  return (
    <>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      {loader ? (
       <>
       <LoaderAllInOne />
       </>
        // <Spinner
        //   visible={true}
        //   textContent={'Loading...'}
        //   textStyle={{ color: '#FFF' }}
        // />
      ) : (
        <></>
      )}
      <ImageBackground source={require('../../assets/images/av.png')} style={{...styles.MainContainer}}>
      </ImageBackground>
      <View style={styles.Fbottom}>
        <Text style={styles.TextStyle}>Time to upload selfie</Text>
        <View style={styles.MV5} />
        <FullsizeButton onPress={() => { captureImage('photo') }} backgroundColor={themecolor.HEADERTHEMECOLOR} title='Capture Selfie' RightIcon="camera" SizeRight={17} />
        <View style={styles.MV5} />
        <View style={styles.NoteVIew}>
          <Text style={{...styles.TextStyleNote,}}>Note: You can not view dashboard and other details until you upload the picture</Text>
        </View>
      </View>
    </>
  );
}