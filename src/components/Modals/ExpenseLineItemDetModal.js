import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Modal,
  Image,
  TouchableOpacity,
  Dimensions,
  PermissionsAndroid,
} from 'react-native';
import { Colors } from '../../assets/config/Colors';
import { FontSize } from '../../assets/fonts/Fonts';
import { FontFamily } from '../../assets/fonts/FontFamily';
import { TextInput } from 'react-native-gesture-handler';
import ImgToBase64 from 'react-native-image-base64';
import Entypo from 'react-native-vector-icons/MaterialIcons';
import { uploadMediaApi } from '../../repository/CaseGrievance/CaseGrievance';
import {
  createTripApi,
  gettripLocationApi,
} from '../../repository/trip/tripRepository';
import DummyImage from '../shared/DummyImage';
import { useToast } from 'react-native-toast-notifications';
import { SERVER_URL } from '../../repository/commonRepository';
import {
  launchCamera,
} from 'react-native-image-picker';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../Theme/ThemeDarkLightColor';

export default function ExpenseLineItemDetModal(props) {
  // const navigation = useNavigation()
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  
  const toast = useToast();
  const { width, height } = Dimensions.get('screen');
  const detId = props.detId;

  //   const [filePath, setFilePath] = useState({
  //     uri: 'https://picsum.photos/200/300?random=1',
  //   });

  const [detailData, setDetailData] = useState({});
  const [amount, setAmount] = useState(null);
  const [discription, setDiscription] = useState('');
  const [mediaId, setMediaId] = useState('');
  const [imageUrl, setImageurl] = useState('');
  const [refresh, setRefresh] = useState(false);
const [serverUrlNew, setServerUrlNew] = useState('');
// alert(serverUrlNew)
  //   const dispatch = useDispatch();
  //   const expenseTicket = useSelector(state => state.expenseImages);
  //   var expenseTicketValues = Object.values(expenseTicket);

  //   console.log('imgValues', props.Imageurl);

  const getdetailsById = async () => {
    const result = await gettripLocationApi(
      `api/getExpenseListDetailsById?list_detail_id=${detId}`,
    );
    if (result.statusCode == 200) {
      setDetailData(result.data);
      setAmount(result.data.Amount);
      setDiscription(result.data.Description);
      setMediaId(result.data.Image);
      // alert(result.data.Image)
    }
    console.log('data received by😁 detId', result);
  };

  useEffect(() => {
    getdetailsById();
    const temp=async()=>{
      let surl = await SERVER_URL()
      setServerUrlNew(surl)
    }
    temp()
  }, [props]);

  const onSubmit = async () => {
    // props.setLoader(true)
    if (mediaId != null || mediaId != '') {
      if (discription.length >= 1 && amount != null) {
        const result_2 = await createTripApi(
          `api/updateExpenseListDetails?expense_list_detail_id=${detailData.ExpDetId}&image=${mediaId}&description=${discription}&amount=${amount}`,
        );
        console.log('result_2', result_2);
        if (result_2.statusCode == 200) {
          toast.show(result_2.message, {
            type: 'success',
            placement: 'bottom',
            duration: 4000,
            offset: 30,
            animationType: 'slide-in',
          });
          props.setExpDetModal(false);
          props.setRefresh(!props.refresh)
          // navigation.goBack()
          // props.setLoader(false)
        }
      } else {
        toast.show('All fields are required', {
          type: 'warning',
          placement: 'bottom',
          duration: 4000,
          offset: 30,
          animationType: 'slide-in',
        });
      }
    } else {
      if (discription.length >= 1 && amount != null) {
        // api/updateExpenseListDetails?expense_list_detail_id=56&description=test&amount=789
        const result = await createTripApi(
          `api/updateExpenseListDetails?expense_list_detail_id=${detailData.ExpListId}&description=${discription}&amount=${amount}`,
        );
        console.log('result of no attachment api', result);
        if (result.statusCode == 200) {
          toast.show(result.message, {
            type: 'success',
            placement: 'bottom',
            duration: 4000,
            offset: 30,
            animationType: 'slide-in',
          });
          props.setExpDetModal(false);
          props.setRefresh(!props.refresh)
          // navigation.goBack()
          // props.setLoader(false)
        }
      } else {
        toast.show('All fields are required', {
          type: 'warning',
          placement: 'bottom',
          duration: 4000,
          offset: 30,
          animationType: 'slide-in',
        });
      }
    }

    // props.setExpDetModal(false);
  };

  // ============================Media Section======================================

  //   console.log('base 64 url===...', expenseTicketValues);

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

  const getMediaByIdbyurl = async url => {
    let body = {
      folder_id: '1',
      media: [url],
    };
    const result = await uploadMediaApi('api/uploadMediaBase64', body);
    console.log('result frpm upload', result);
    const d1 = result.data.toString();
    // alert(d1);
    setMediaId(d1);
  };
  const captureImage = async type => {
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
      launchCamera(options, response => {
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
        console.log('width -> ', response.assets[0].width);
        console.log('height -> ', response.assets[0].height);
        console.log('fileSize -> ', response.assets[0].fileSize);
        console.log('type -> ', response.assets[0].type);
        console.log('fileName -> ', response.assets[0].fileName);
        // setFilePath(response);

        ImgToBase64.getBase64String(`${response.assets[0].uri}`).then(
          base64String => {
            console.log('Base 64 String ....', base64String);
            let body = {
              imgurl: base64String,
              id: response.assets[0].fileName,
            };
            // dispatch({
            //   type: 'ADD_EXPENSE_IMAGES',
            //   payload: [response.assets[0].fileName, body],
            // });
            setRefresh(!refresh);
            // setVisible(true);
            setImageurl(base64String);
            getMediaByIdbyurl(base64String);
          },
        );
        // setisVisible(true);
        // setTripModal(true);
      });
    }
  };

  // ==========================Media End===============================================

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.modalVisible}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.2)',
          }}>
          <View
            style={{
              margin: 25,
              backgroundColor: themecolor.RB2,
              borderRadius: 20,
              padding: 35,
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
            }}>
            {/* {props.isVisible && ( */}
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: 200,
                borderWidth: 1,
                width: width * 0.8,
                borderRadius: 12,
                borderColor: themecolor.BOXBORDERCOLOR1,
              }}>
              {mediaId == null ? (
                <TouchableOpacity
                  style={{}}
                  onPress={() => captureImage('photo')}>
                  <DummyImage height={70} width={70} />
                </TouchableOpacity>
              ) : (
                <View style={{ position: 'relative',width:'100%' }}>
                  <Image
                    source={{
                      uri: `${serverUrlNew}media?id=${mediaId}`,
                    }}
                    resizeMode="cover"
                    style={{
                      width: '100%',
                      height: height * 0.25,
                      borderRadius: 10,
                    }}
                  />
                  <TouchableOpacity
                    style={{ position: 'absolute', top: -10, left: -8 }}
                    onPress={() => captureImage('photo')}>
                    <Text>
                      <Entypo name="add-a-photo" color="lightblue" size={30} />
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
            {/* )} */}
            <View style={{ marginVertical: 5 }} />
            <View style={{ width: width * 0.8 }}>
              <TextInput
                style={{
                  fontSize: FontSize.labelText2,
                  width: width * 0.8,
                  alignSelf: 'center',
                  fontFamily: FontFamily.Popinssemibold,
                  borderWidth: 1,
                  borderRadius: 12,
                  borderColor: themecolor.BOXBORDERCOLOR1,
                  backgroundColor:themecolor.BOXBORDERCOLOR,
                  color:themecolor.TXTWHITE,
                }}
                value={amount}
                onChangeText={txt => {
                  let temp = '';
                  temp = txt.replace(/[^0-9]/g, '');
                  if (temp.length === 0) {
                    setAmount('');
                  } else {
                    setAmount(temp);
                  }
                }}
                placeholder={'  Enter Amount'}
                placeholderTextColor={Colors.grey}></TextInput>
              <View style={{ marginVertical: 5 }} />
              <TextInput
                value={discription}
                style={{
                  fontSize: FontSize.labelText2,
                  width: width * 0.8,
                  alignSelf: 'center',
                  fontFamily: FontFamily.Popinssemibold,
                  borderWidth: 1,
                  borderRadius: 12,
                  height: 90,
                  // borderColor: Colors.borderColor,
                  textAlignVertical: 'top',
                  borderColor: themecolor.BOXBORDERCOLOR1,
                  backgroundColor:themecolor.BOXBORDERCOLOR,
                  color:themecolor.TXTWHITE,
                }}
                onChangeText={t => setDiscription(t)}
                placeholder={'  Enter Discription'}
                placeholderTextColor={Colors.grey}></TextInput>
            </View>
            <View style={{ marginVertical: 5 }} />
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'flex-start',
                width: width * 0.8,
                alignSelf: 'center',
              }}>
              <FullsizeButton
                width={80}
                BRadius={80}
                height={30}
                title={'Submit'}
                onPress={() => onSubmit()}
                backgroundColor={themecolor.HEADERTHEMECOLOR}
              />
              <FullsizeButton
                width={80}
                BRadius={80}
                height={30}
                title={'Cancel'}
                backgroundColor={'white'}
                titlecolor={'grey'}
                onPress={() => {
                  props.setExpDetModal(false);
                  //   props.setisVisible(false);
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
