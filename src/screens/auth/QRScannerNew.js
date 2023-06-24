import {
  StyleSheet,
  Text,
  TouchableOpacity,
  BackHandler,
  View,
  Dimensions,
  Image,
  PermissionsAndroid,
  Platform
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { Colors } from '../../assets/config/Colors';
import { QRreader } from "react-native-qr-decode-image-camera";
import { launchImageLibrary } from 'react-native-image-picker';
import { useToast } from 'react-native-toast-notifications';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';

const { width } = Dimensions.get('window');

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


export default function QRScannerNew(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
 
 
  const toast = useToast();
  const [flash, setFlash] = useState(false);
  const [isShow, setIsShow] = React.useState(false);
  const [modalVisible, setModalVisible] = useState(true);

  function handleBackButtonClick() {
    BackHandler.exitApp(); //When want to Exit the app
    // Do Whatever you want to do on back button click
    // Return true to stop default back navigaton
    // Return false to keep default back navigaton
    //   props.navigation.goBack();
    return true;
  }

  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
      return () => {
        BackHandler.removeEventListener(
          'hardwareBackPress',
          handleBackButtonClick,
        );
      };
    }, []),
  );



  const onSuccess = async (e) => {
    props.navigation.reset({
      index: 0,
      routes: [{ name: 'BLoginByMobileNumber', params: { url: e.data } }],
    });
  };


  const captureImage = async (type, mediaby) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
      selectionLimit: 3,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      mediaby(options, response => {
        console.log('Response = ', response);
        if (response.didCancel) {
          alert('User cancelled camera picker');
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
        console.log('totoal medias', response.assets);
        console.log('width -> ', response.assets[0].width);
        console.log('height -> ', response.assets[0].height);
        console.log('fileSize -> ', response.assets[0].fileSize);
        console.log('type -> ', response.assets[0].type);
        console.log('fileName -> ', response.assets[0].fileName);
        console.log('response.assets[0]-> ', response.assets);
        console.log("Response===", response);

        //New Start
        if (response.assets[0].uri) {
          var path = response.assets[0].uri;
          if (!path) {
            path = response.assets[0].uri;
          }
          QRreader(path)
            .then(data => {
              props.navigation.reset({
                index: 0,
                routes: [{ name: 'BLoginByMobileNumber', params: { url:data } }],
              });
            })
            .catch(err => {
              toast.show(`${err}`, {
                type: 'danger',
                placement: 'bottom',
                duration: 3000,
                offset: 30,
                animationType: 'slide-in',
              });
            });
        }
      });
    }
  };

  return (
    <>
      {isShow ?
        (
          <QRCodeScanner
            showMarker={true}
            onRead={onSuccess}
            flashMode={flash ? RNCamera.Constants.FlashMode.torch : null}
            topViewStyle={{backgroundColor: themecolor.THEMECOLOR1}}
            bottomViewStyle={{backgroundColor: themecolor.THEMECOLOR1}}
            topContent={
              <Text style={{...styles.centerText,color:themecolor.TXTGREYS }}>Scan any QR and Bar Code</Text>
            }
            bottomContent={
              <>
                <TouchableOpacity onPress={() => setFlash(!flash)}>
                  <Text style={{ top: 10, color:themecolor.TXTGREYS  }}>Flash: {flash ? 'On' : 'Off'}</Text>
                </TouchableOpacity>
              </>
            }
          />
        ) : (
          <>
            <View style={{ flex: 1, backgroundColor: themecolor.THEMECOLOR1, justifyContent: 'center' }}>
              <Image style={{ alignSelf: 'center' }} source={require('../../assets/images/scannergif.gif')} />

              <Text style={{...styles.modalText,color:themecolor.TXTWHITE}}>Please choose your server URL</Text>
              <View style={{ width: '90%', alignSelf: 'center' }}>
                <Text style={{ textAlign: 'center',color:themecolor.TXTWHITE }}>QR code just contains the address of a website. By scanning the code , the website can be access by the user without the hassle of manually entering the address (URL)</Text>
                <View style={{ marginVertical: 12 }} />
                <Text style={{ ...styles.modalText,color:themecolor.TXTWHITE }}>Scan it from</Text>
                <View style={{ marginVertical: 12 }} />
                <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                  <TouchableOpacity
                    style={{...styles.button, ...styles.buttonClose, backgroundColor:themecolor.HEADERTHEMECOLOR}}
                    onPress={() => {
                      setModalVisible(!modalVisible)
                      captureImage('photo', launchImageLibrary);
                    }}
                  >
                    <View
                      style={{
                        width: width * 0.3,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <MaterialIcons name="add-to-photos" size={20} color={'white'} />
                      <Text style={styles.textStyle}>Gallery</Text>
                    </View>
                  </TouchableOpacity>
                  <View style={{ paddingHorizontal: 10 }} />


                  <TouchableOpacity
                    style={{...styles.button, ...styles.buttonClose, backgroundColor:themecolor.HEADERTHEMECOLOR}}
                    onPress={() => {
                      setModalVisible(!modalVisible)
                      setIsShow(true);
                    }}
                  >
                    <View
                      style={{
                        width: width * 0.3,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Entypo name="camera" size={18} color={'white'} />
                      <Text style={styles.textStyle}>Camera</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View>

                </View>
              </View>

            </View>

          </>)}
    </>);
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },

  //New
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 1
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: Colors.bluetheme,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: 'bold'
  }

});

