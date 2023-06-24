import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, FlatList, Dimensions, Image, PermissionsAndroid, Platform, } from 'react-native'
import Video from 'react-native-video';
import { RadioButton } from 'react-native-paper';
import StyleCss from '../../assets/css/styleOutlet';
const { width } = Dimensions.get('window');
import { Colors } from '../../assets/config/Colors';
import { getCheckInOutStatus, getEmpOutlets } from '../../repository/outlet/VerifyOutletRepository';
import {
  launchCamera,
} from 'react-native-image-picker';
import ImgToBase64 from 'react-native-image-base64';
import { useToast } from "react-native-toast-notifications";
import { useDispatch } from 'react-redux';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';

var statusOutletId = "";

export default VerifyOutletModal = (props) => {

  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()

  const toast = useToast();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [checked, setChecked] = React.useState('');
  const [checkedOutletId, setCheckedOutletId] = React.useState('');
  const [checkedOutletName, setCheckedOutletName] = React.useState('');
  const [empOutletdata, setEmpOutletData] = useState([]);
  const [outletId, setOutletId] = useState('');


  const [filePath, setFilePath] = useState({ uri: 'https://picsum.photos/200/300?random=1' });
  const [checkInStatus, setCheckInStatus] = useState('')

  const handleClickOnDone = () => {
    props.setmodalVisible1(false)
  }

  function ItemCheked({ item,checked, setChecked, setOutletId, themecolor }) {

    // const [g, s] = React.useState({});

    const handleRadioBox = async () => {
      console.log('Event>>>>', item.Outlets.Id, item.Outlets.OutletName);
      // s(prev => ({ ...prev, [item.Outlets.Id]: item.Outlets.OutletName }));
      setChecked(item.Outlets.Id);
      setOutletId(item.Outlets.Id);
    };

    return (
      <TouchableOpacity
        onPress={() => handleRadioBox()}
        activeOpacity={1}
        style={{ backgroundColor: checked == item.Outlets.Id ? themecolor.RB2 : themecolor.RB2}}>
        <View
          style={StyleCss.RadioVIew}>
          <RadioButton
            // value={item.Outlets.Id}
            color={themecolor.TXTWHITE}
            uncheckedColor={themecolor.TXTWHITE}
            status={checked == item.Outlets.Id ? 'checked' : 'unchecked'}
            onPress={() => handleRadioBox()}
          />

          <Text
            style={{...StyleCss.RadioText,color:themecolor.TXTWHITE}}>
            {item.Outlets.OutletName}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

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
    try {
      if (checked != '') {
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
                let body = {
                  imgurl: base64String,
                  id: response.assets[0].fileName,
                };
                dispatch({
                  type: 'ADD_BA_OUTLET_VERIFY_SELFIE',
                  payload: base64String,
                });
                setRefresh(!refresh);
              }
            )
            props.handleOpen2(outletId)
          });
        }
      }
      else {
        toast.show("Please Select the Outlet", {
          type: "warning",
          placement: "bottom",
          duration: 3000,
          offset: 30,
          animationType: "slide-in",
        });

      }
    } catch (e) {

    }
  };

  const captureImageNew = async (type) => {
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
              let body = {
                imgurl: base64String,
                id: response.assets[0].fileName,
              };
              dispatch({
                type: 'ADD_BA_OUTLET_VERIFY_SELFIE',
                payload: base64String,
              });
              setRefresh(!refresh);
            }
          )
          props.handleOpen2(checkedOutletId)
        });
      }
    } catch (e) {
    }
  };

  useEffect(() => {
    checkInOutStatus()
  }, [])

  useEffect(() => {
    async function getFun() {
      var res = await getEmpOutlets();
      console.log("Emp Outlet Verify.........🤨^_^", res.data)
      setEmpOutletData(res.data);
      setLoader(false)
      var OutletId = '';
      var OutletName = '';
      res.data.forEach(item => {
        console.log("item 296===>", item.Outlets.Id)
        console.log("item....299......>>>>>", statusOutletId)
        if (statusOutletId == item.Outlets.Id) {
          OutletId = item.Outlets.Id;
          OutletName = item.Outlets.OutletName;
        }
      })
      setCheckedOutletId(OutletId)
      setCheckedOutletName(OutletName);
    }
    getFun()

  }, [props])

  const checkInOutStatus = async () => {
    try {
      const res = await getCheckInOutStatus();
      console.log("Get Check In Out Status......page VerifyOutletModal line 72", res);
      setCheckInStatus(res.data.data.CheckInStatus);
      statusOutletId = res.data.data.CheckInRec.OutletId;
    } catch (e) {
      setCheckInStatus('ok');
    }
  }


  return (

    <Modal
      animationType="slide"
      transparent={true}
      visible={props.modalVisible1}>
      {checkInStatus == "Checked in" ?
        (
          <View style={StyleCss.centeredView}>
            <View style={{ ...StyleCss.modalView1,backgroundColor:themecolor.RB2 }}>
              {loader ? (
                <Image
                  style={{
                    resizeMode: 'contain',
                    alignSelf: 'center',
                    height: 120,
                    alignItems: "center",
                  }}
                  source={require('../../assets/images/dot.gif')}
                />
              ) : (
                <>
                  <View style={StyleCss.ModalViewWidth}>

                    <Text style={{...StyleCss.submittext1,color:themecolor.TXTWHITE}}>
                      Selected outlet
                    </Text>
                    <View
                      style={StyleCss.RadioVIew}>
                      <RadioButton
                        color={themecolor.TXTWHITE}
                        uncheckedColor={themecolor.TXTWHITE}
                        status={'checked'}
                      />
                      <Text
                        style={{...StyleCss.RadioText,color:themecolor.TXTWHITE}}>
                        {checkedOutletName}
                      </Text>
                    </View>
                    <View style={StyleCss.MV2} />
                  </View>
                  <View style={StyleCss.FLexCenter}>
                    <FullsizeButton width={width * 0.32} fontsize={11} BRadius={30} height={30} backgroundColor={themecolor.HEADERTHEMECOLOR}
                      onPress={() => {
                        captureImageNew('photo')
                      }
                      }
                      title='Capture outlet' />

                    <FullsizeButton width={width * 0.25} fontsize={11} BRadius={30} height={30} backgroundColor={'transparent'} titlecolor={Colors.grey} onPress={() => handleClickOnDone()} title='Cancel' />
                  </View>
                </>
              )}

            </View>

          </View>
        ) : (
          checkInStatus != '' ?
            (
              <View style={{ ...StyleCss.centeredView, }}>
                <View style={{ ...StyleCss.modalView2, backgroundColor: themecolor.RB2 }}>
                  {loader ? (
                    <Image
                      style={{
                        resizeMode: 'contain',
                        height: 150,
                        top: 110
                      }}
                      source={require('../../assets/images/dot.gif')}
                    />
                  ) : (
                    <>
                      <View style={{ ...StyleCss.ModalViewWidth, flex: 1, backgroundColor: themecolor.RB2 }}>
                        <Video
                          source={require('../../assets/images/gif/verifyoutlet.mp4')}
                          style={StyleCss.backgroundImageGif}
                          muted={true}
                          resizeMode={'contain'}
                          repeat={true}
                          rate={2.0}
                          ignoreSilentSwitch={'obey'}
                        />
                        <Text style={{...StyleCss.submittext1,color:themecolor.TXTWHITE}}>
                          Select outlet
                        </Text>
                        <View style={{
                          flex: 1,
                          backgroundColor: themecolor.RB2
                        }}>
                          <FlatList
                            data={empOutletdata}
                            renderItem={({ item }) => (
                              <ItemCheked
                                item={item}
                                props={props}
                                checked={checked}
                                setChecked={setChecked}
                                setOutletId={setOutletId}
                                themecolor={themecolor}
                              />
                            )}
                            keyExtractor={item => item.id}
                            scrollEnabled
                            showsVerticalScrollIndicator={true}
                          />
                        </View>
                        <View style={StyleCss.MV2} />
                      </View>
                      <View style={StyleCss.FLexCenter}>
                        <FullsizeButton width={width * 0.32} fontsize={11} BRadius={30} height={30} backgroundColor={themecolor.HEADERTHEMECOLOR}
                          // onPress={() =>{props.handleOpen2()}}  
                          onPress={() => {
                            captureImage('photo')
                          }
                          }
                          title='Capture outlet' />
                        <FullsizeButton width={width * 0.25} fontsize={11} BRadius={30} height={30} backgroundColor={'transparent'} titlecolor={Colors.grey} onPress={() => handleClickOnDone()} title='Cancel' />
                      </View>
                    </>
                  )}
                </View>
              </View>
            ) : (<></>)
        )
      }


    </Modal>

  )
}

