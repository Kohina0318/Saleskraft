import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  Image,
  Dimensions,
  TextInput,
  Platform,
  PermissionsAndroid,
  TouchableOpacity,
} from 'react-native';
import StyleCss from '../../assets/css/styleOutlet';
import styles from '../../assets/css/stylesDashboard';
import { Colors } from '../../assets/config/Colors';
import { Picker } from '@react-native-picker/picker';
import FIcon from 'react-native-vector-icons/FontAwesome';
import FIcon5 from 'react-native-vector-icons/FontAwesome5';
import EIcon from 'react-native-vector-icons/Entypo';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useToast } from 'react-native-toast-notifications';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImgToBase64 from 'react-native-image-base64';
const { width } = Dimensions.get('window');
import { openDatabase } from 'react-native-sqlite-storage';
import { getUserCurrentLocationCommon } from '../../repository/commonRepository';
import { uploadMediaApi } from '../../repository/CaseGrievance/CaseGrievance';
import { FontFamily } from '../../assets/fonts/FontFamily';
import { FontSize } from '../../assets/fonts/Fonts';

var db = openDatabase({ name: 'Beatdump.db' });

export default CheckoutModal = props => {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  // console.log('Navigate From in Checkout Modal--->', props.navigateFrom);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const toast = useToast();
  const network = useSelector(state => state.network);
  const [modalVisible2, setModalVisible2] = useState(true);
  const [remark, setRemark] = useState('');
  const [outComes, setOutcomes] = useState([]);
  const [outComeId, setOutComeId] = useState('');

  const [filePath, setFilePath] = useState({
    uri: 'https://picsum.photos/200/300?random=1',
  });
  const [refresh, setRefresh] = useState(false);
  const [temparr, setTemparr] = useState(0);

  const checkoutImage = useSelector(state => state.CheckoutImage);
  var imagesTicketValues = Object.values(checkoutImage);
  console.log('images Ticket Values', imagesTicketValues);

  const currentLatLng = useSelector(state => state.currentLatLng);
  // console.log("CheckoutImage IN CheckoutModal Line 41........",checkoutImage)
  React.useEffect(() => {
    getOutComeData();
  }, []);

  React.useEffect(() => {
    db.transaction(async tx => {
      tx.executeSql(
        `SELECT * from CheckinCheckout`,
        [],
        async (tx, results) => {
          if (results.rows.length > 0) {
            console.log('CheckinCheckout Line 64 ===> ', results);
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i) {
              temp.push(results.rows.item(i));
            }

            console.log(
              'CheckinCheckout in Checkout Modal Line 70 ++++++++>>>> ',
              temp,
            );
          } else {
            console.log('Error in CheckinCheckout  In  Line 71 ===> ', tx);
          }
        },
      );
    });
  }, []);

  const getOutComeData = async () => {
    db.transaction(async tx => {
      tx.executeSql(`SELECT * from Outcome`, [], async (tx, results) => {
        if (results.rows.length > 0) {
          console.log('results Line 64 ===> ', results);
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
          }
          setOutcomes(temp);
          console.log('Outcome in Checkout Modal Line 69 =======> ', temp);
        } else {
          console.log('Error in Outcome  In  Line 71 ===> ', tx);
        }
      });
    });
  };

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

  const captureImage = async (type, mode) => {
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
      mode(options, response => {
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
        setFilePath(response);
        response.assets.map(i => {
          ImgToBase64.getBase64String(`${i.uri}`).then(base64String => {
            // console.log('Base 64 String ....', base64String);
            let body = {
              imgurl: base64String,
              id: i.fileName,
            };
            dispatch({
              type: 'ADD_CHECKOUT_IMAGE',
              payload: [i.fileName, body],
            });
            setRefresh(!refresh);
            setTemparr(temparr + response.assets.length);
          });
        });
      });
    }
  };

  const deleteImage = id => {
    dispatch({
      type: 'REMOVE_CHECKOUT_IMAGE',
      payload: id,
    });
    setRefresh(!refresh);
    setTemparr(temparr - 1);
  };

  const handleClickOnCancel = () => {
    setModalVisible2(!modalVisible2);
    props.setIsCheckoutModalVisible(false);
    dispatch({
      type: 'REMOVE_ALL_CHECKOUT_IMAGES',
    });
    setTemparr(0);
  };

  var imgdata = useSelector(state => state.CheckoutImage);
  var imgValues = Object.values(imgdata);

  const handleClickOnSubmit = async () => {
    var mediaId = null;
    try {
      var imgarr = [];
      if (imgValues.length > 0) {
        mediaId = []
        imgValues.map(item => {
          imgarr.push(item.imgurl);
        });
      }
      console.log("imgArr======>", imgarr)

      if (imgarr.length > 0) {

        let bodyImage = {
          folder_id: '1',
          media: imgarr,
        };
        console.log("mediaId==========", mediaId);
        const result = await uploadMediaApi('api/uploadMediaBase64', bodyImage);
        console.log("result==============>", result);
        try {
          if (result.statusCode == 200) {
            if (result.data.length > 0) {
              mediaId = result.data.join(',');
            } else {
              mediaId = null;
            }
          } else {
            mediaId = null
          }
        } catch (e) {
          mediaId = null
        }
      }
      console.log(
        'Media Id in CheckOutModal.. line 281.......>:',
        result,
      );
      // mediaId.push(result.data[0])
      // mediaId = result.data[0];
    } catch (e) {
      // alert(JSON.stringify(e))
    }
    console.log("mediaId 262 ============>", mediaId)

    if (outComeId == '') {
      toast.show('Please choose meeting note.', {
        type: 'warning',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
    } else if (remark == '') {
      toast.show('Please fill meeting remark.', {
        type: 'warning',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
    } else {
      try {
        let getCurrentAddress = await getUserCurrentLocationCommon(
          currentLatLng.latitude,
          currentLatLng.longitude,
        );

        console.log('currentLatLng.latitude', currentLatLng.latitude);
        console.log('currentLatLng.longitude', currentLatLng.longitude);
        console.log('remark', remark);
        console.log('getCurrentAddress', getCurrentAddress);
        console.log('outComeId', outComeId);
        console.log('props.outletId', props.outletId);
        console.log('Media Id >>>>>>.......>:', mediaId);

        db.transaction(async tx => {
          await tx.executeSql(
            'UPDATE CheckinCheckout SET EndTime=?,Checkout_Lat=?,Checkout_Lng=?,isBeatEnd=?,Remark=? , chekout_address=? ,checkout_outcome_id=?, checkout_media=? where OutletId=? AND EndTime IS NULL',
            [
              new Date(),
              currentLatLng.latitude,
              currentLatLng.longitude,
              true,
              remark,
              getCurrentAddress,
              outComeId,
              mediaId,
              props.outletId,
            ],
            (tx, results) => {
              // alert('Line 67 Update in checkincheckout'+JSON.stringify(results))
              console.log(
                'Line 67 Update in checkincheckout 263 --->',
                results,
              );
              console.log('Line 259 Update in checkincheckout 259 --->', tx);
              var temp = [];
              for (let i = 0; i < results.rows.length; ++i) {
                temp.push(results.rows.item(i));
              }

              console.log(
                'Data return After UPDATION of CheckinCheckout Line 263 --->',
                temp,
              );
              // props.setIsCheckoutModalVisible(false);
            },
          );
        });
      } catch (e) {
        console.log('In catch Line 272', e);
      }

      await updateOutletStatus();
    }
  };

  // alert(props.navigateFrom);

  const updateOutletStatus = async () => {
    // alert("Hi")
    try {
      await db.transaction(async tx => {
        await tx.executeSql(
          'UPDATE Beat SET visitStatus=? where OutletId=?',
          ['Completed', props.outletId],
          (tx, results) => {
            console.log('tx Line 105-->' + tx);
            console.log('result Line 106-->' + results);
            // alert('Line 103 Update in Outlets'+JSON.stringify(results))
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i) {
              temp.push(results.rows.item(i));
            }
            // if(temp[0].isBeatStart == '1'){
            //   setCheckinStatus(false)
            // }
            // alert("Hello line 301===")
            // setCheckinCheckoutData(temp);
            props.setRefresh(!props.refresh);
            // alert("Hello line 304===")
            dispatch({
              type: 'REMOVE_ALL_CHECKOUT_IMAGES',
            });
            if (props.navigateFrom == 'AirportRoute') {
              // props.beatName
              navigation.reset({
                index: 0,
                routes: [
                  {
                    name: 'AirportRoute',
                    params: {
                      beatName: props.beatName,
                      beatId: props.beatId,
                      navigateFrom: 'checkout',
                    },
                  },
                ],
              });
            } else if (props.navigateFrom == 'Outlets') {
              navigation.reset({
                index: 0,
                routes: [
                  {
                    name: 'NewDashboard',
                    params: { beatName: '' },
                  },
                ],
              });
            } else {
              navigation.reset({
                index: 0,
                routes: [
                  {
                    name: 'RetailerCustomer',
                    params: { beatName: props.beatName },
                  },
                ],
              });
            }
            // alert("Hello line 317===")
            console.log(
              'Data returned after UPDATION of Outlets SQLITE Line  83----->',
              temp,
            );
          },
        );
      });
    } catch (e) {
      console.log('ELSE=========Line 320', e);
    }
  };
  // alert(temparr)
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible2}
    // onRequestClose={() => {
    //     setModalVisible2(!modalVisible2);
    // }}
    >
      <View style={StyleCss.centeredView}>
        <View style={{ ...StyleCss.modalView, backgroundColor: themecolor.RB2 }}>
          <View style={StyleCss.ModalViewWidth}>
            <View style={StyleCss.ModelVideoCenter}>
              <View style={StyleCss.view3}>
                <View>
                  <Text style={{ ...StyleCss.title, color: themecolor.TXTWHITE }}>Enter meeting notes</Text>
                </View>
                <View style={{ ...StyleCss.textContainer, backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR1 }}>
                  <Picker
                    mode="dropdown"
                    style={StyleCss.widths}
                    itemStyle={StyleCss.heights1}
                    selectedValue={outComeId}
                    dropdownIconColor={themecolor.TXTWHITE}
                    onValueChange={item => {
                      setOutComeId(item);
                    }}>
                    <Picker.Item
                      label="Select"
                      style={{ ...StyleCss.picker1, color: themecolor.TXTWHITE ,  backgroundColor: themecolor.BOXTHEMECOLOR}}
                      value=""
                    />
                    {outComes.map(itm => {
                      return (
                        <Picker.Item
                          label={itm.OutcomeName}
                          style={{ ...StyleCss.picker1, color: themecolor.TXTWHITE , backgroundColor: themecolor.BOXTHEMECOLOR }}
                          value={itm.Id}
                        />
                      );
                    })}
                  </Picker>
                </View>
              </View>
              <View style={StyleCss.MV5} />
              <View style={StyleCss.view3}>
                {/* <View>
                <Text style={StyleCss.title}>
                 Remark
                </Text>
              </View> */}
                <View style={{ ...StyleCss.textContainerRemark, backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR1 }}>
                  <TextInput
                    placeholder="Remark"
                    keyboardType="name-phone-pad"
                    multiline={true}
                    style={{ ...StyleCss.textStyleText, color: themecolor.TXTWHITE }}
                    onChangeText={txt => setRemark(txt)}
                    placeholderTextColor={themecolor.TXTWHITE}
                  />
                </View>
              </View>
            </View>

            {/* </View> */}

            <View style={StyleCss.FLexLeft}>
              {network ? (
                <>
                  <View style={StyleCss.MV5} />
                  <View style={styles.camView}>
                    {/* {checkoutImage === '' ? ( */}
                    <View style={{ marginTop: 10 }}>
                      <Text
                        style={{
                          color: themecolor.TXTWHITE,
                          fontFamily: FontFamily.PopinsRegular,
                          fontSize: FontSize.labelText2,
                        }}>
                        Attach media
                      </Text>
                    </View>
                    <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                      {/* <View style={StyleCss.CameraView}>
                          <FIcon
                          size={30}
                          style={StyleCss.ImageView}
                          name="camera"
                          />
                        </View> */}
                      {imagesTicketValues.map(i => {
                        return (
                          <View
                            style={{
                              ...styles.ProImageView,
                              marginLeft: 5,
                              position: 'relative',
                            }}>
                            <Image
                              source={{
                                uri: `data:image/jpeg;base64,${i.imgurl}`,
                              }}
                              style={{ width: 50, height: 50, borderRadius: 10 }}
                              resizeMode={'contain'}
                            />

                            <TouchableOpacity
                              style={{ position: 'absolute', right: -5, top: -5 }}
                              onPress={() => deleteImage(i.id)}>
                              <EIcon
                                name="circle-with-cross"
                                size={20}
                                color={'tomato'}
                              />
                            </TouchableOpacity>
                          </View>
                        );
                      })}

                      <View
                        style={{
                          height: 40,
                          marginLeft: 5,
                          display: temparr == 3 ? 'none' : 'flex',
                        }}>
                        <TouchableOpacity
                          onPress={() => {
                            captureImage('photo', launchCamera);
                          }}>
                          <Text
                            style={{
                              color: Colors.bluetheme,
                              fontFamily: FontFamily.PopinsRegular,
                              fontSize: FontSize.labelText,
                            }}>
                            <FIcon
                              size={10}
                              style={{...StyleCss.ImageView,  color: Colors.bluetheme}}
                              name="camera"
                            />{' '}
                            Camera
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            captureImage('photo', launchImageLibrary);
                          }}>
                          <Text
                            style={{
                              color: Colors.bluetheme,
                              fontFamily: FontFamily.PopinsRegular,
                              fontSize: FontSize.labelText,
                            }}>
                            <FIcon5
                              size={10}
                              style={{...StyleCss.ImageView,  color: Colors.bluetheme}}
                              name="images"
                            />{' '}
                            Gallery
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </>
              ) : (
                <></>
              )}
            </View>
            <View style={StyleCss.MV5} />
            <View style={StyleCss.MV5} />
            <View style={StyleCss.FLexLeft}>
              <FullsizeButton
                width={width * 0.28}
                BRadius={30}
                height={30}
                backgroundColor={themecolor.HEADERTHEMECOLOR}
                onPress={() => handleClickOnSubmit()}
                title="Submit"
              />
              <FullsizeButton
                width={width * 0.28}
                BRadius={30}
                height={30}
                backgroundColor={'transparent'}
                titlecolor={Colors.grey}
                onPress={() => handleClickOnCancel()}
                title="Cancel"
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};
