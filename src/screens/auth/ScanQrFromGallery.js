import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  Dimensions,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { QRreader } from "react-native-qr-decode-image-camera";
import RBSheet from 'react-native-raw-bottom-sheet';
import Entypo from 'react-native-vector-icons/Entypo';
import {FontFamily} from '../../assets/fonts/FontFamily';
import {useToast} from 'react-native-toast-notifications';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useNavigation } from '@react-navigation/native';
import {launchImageLibrary,
  // launchCamera 
} from 'react-native-image-picker';
// import ImagePicker,{launchImageLibrary} from "react-native-image-picker";

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

const {width} = Dimensions.get('window');

export default function ScanQrFromGallery(props) {
  const navigation = useNavigation()
  const mode = useSelector(state => state.mode);
  const toast = useToast();
  const themecolor = new MyThemeClass(mode).getThemeColor()
  const[reader,setReader]=React.useState({
    message:null,
    date:null
  })

  const refRBSheet1 = useRef();

  const openPhoto = ()=> {
    console.log("ImagePicker");
    ImagePicker.launchImageLibrary({}, response => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        if (response.uri) {
          var path = response.path;
          if (!path) {
            path = response.uri;
          }
          QRreader(path)
            .then(data => {
              setReader({
                message:'message',
                data:data
              })
            
              setTimeout(() => {
                setReader({
                  message:null,
                  data:null
                })
              }, 10000);
            })
            .catch(err => {
              setReader({
                message:'message',
                data:null
              })
            });
        }
      }
    });
  }

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
        // console.log('base64 -> ', response.assets[0].base64);
        console.log('uri -> ', response.assets[0].uri);
        console.log('totoal medias', response.assets);
        console.log('width -> ', response.assets[0].width);
        console.log('height -> ', response.assets[0].height);
        console.log('fileSize -> ', response.assets[0].fileSize);
        console.log('type -> ', response.assets[0].type);
        console.log('fileName -> ', response.assets[0].fileName);
        console.log('response.assets[0]-> ', response.assets);
        // setFilePath(response);
       console.log("Response===",response);

       //New Start
       if (response.assets[0].uri) {
        var path = response.assets[0].uri;
        if (!path) {
          path = response.assets[0].uri;
        }
        QRreader(path)
          .then(data => {
            setReader({
              message:'message',
              data:data
            })
          })
          .catch(err => {
            setReader({
              message:'message',
              data:null
            })
          });
      }
       //New End
      });
    }
  };
 
    return (     
      <View
      style={{
        height:200,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
    
      <View>
          {!reader ? (
            <Text>
              {!reader.message ? "" : `${reader.message}`}
            </Text>
          ) : (
            <Text>
              {!reader.message
                ? ""
                : `${reader.message}:${reader.data}`}
            </Text>
          )}
         </View>

        <RBSheet
        ref={refRBSheet1}
        animationType={'slide'}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={100}
        customStyles={{
          container: {
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            padding: 10,
            backgroundColor:themecolor.RB2
          },
          draggableIcon: {
            display: 'none',
          },
        }}>
        <View style={{marginTop:10}} >
          <TouchableOpacity
            onPress={() => {
              refRBSheet1.current.close();
              // captureImage('photo', launchCamera);
             navigation.navigate('QRScannerNew')
            }}
            style={{
              justifyContent: 'space-between',
              alignContent: 'center',
              flexDirection: 'row',
              width: width * 0.9,
            }}>
            <View
              style={{
                width: width * 0.1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Entypo name="camera" size={18} color={'red'} />
            </View>
            <View style={{width: width * 0.78, justifyContent: 'center'}}>
              <Text
                style={{
                  fontFamily: FontFamily.PopinsMedium,
                  color: themecolor.TRIP2,
                }}>
                Camera
              </Text>
            </View>
          </TouchableOpacity>
          {/* <View style={{marginVertical: 2}} /> */}
          <TouchableOpacity
            onPress={() => {
              refRBSheet1.current.close();
              captureImage('photo', launchImageLibrary);
            }}
            style={{
              justifyContent: 'space-between',
              alignContent: 'center',
              flexDirection: 'row',
              width: width * 0.9,
            }}>
            <View
              style={{
                width: width * 0.1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <MaterialIcons name="add-to-photos" size={20} color={'red'} />
            </View>
            <View style={{width: width * 0.78, justifyContent: 'center'}}>
              <Text
                style={{
                  fontFamily: FontFamily.PopinsMedium,
                  color: themecolor.TRIP2,
                }}>
                Gallery
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </RBSheet>
    </View>
  

    );
  }



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  }
});