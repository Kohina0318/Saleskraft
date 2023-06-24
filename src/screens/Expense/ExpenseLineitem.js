import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
  FlatList,
} from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import Header_2 from '../../components/shared/Header_2';
import { FontFamily } from '../../assets/fonts/FontFamily';
import { Colors } from '../../assets/config/Colors';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import FIcon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import { useDispatch, useSelector } from 'react-redux';
import ImgToBase64 from 'react-native-image-base64';
import Fontisto from 'react-native-vector-icons/Fontisto';
import IoIcon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useToast } from 'react-native-toast-notifications';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import LoaderAllInOne from '../../components/shared/Loader';
import {
  launchCamera,
  launchImageLibrary
} from 'react-native-image-picker';
import styles from '../../assets/css/styleTrip';
import ActionButton from 'react-native-action-button';
import { FontSize } from '../../assets/fonts/Fonts';
import {
  createTripApi,
  gettripLocationApi,
} from '../../repository/trip/tripRepository';
import RBSheet from 'react-native-raw-bottom-sheet';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TripReceiptModal from '../../components/Modals/TripReceiptModal';
import moment from 'moment';
import DummyImage from '../../components/shared/DummyImage';
import ExpenseLineItemDetModal from '../../components/Modals/ExpenseLineItemDetModal';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import ConfirmationModal from '../../components/Modals/ConfirmationModal';
import { SERVER_URL } from '../../repository/commonRepository';
// import NoData from '../../components/shared/NoData';

const { width, height } = Dimensions.get('window');

export default ExpenseLineitem = props => {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  const navigation = useNavigation();
  const toast = useToast();
  const expenseName = props.route.params.expenseName;
  const expenseStat = props.route.params.expenseStat;
  const expense_statuses = props.route.params.expense_statuses;

  const data = props.route.params.data;
  const exp_status = expense_statuses[expenseStat];
  const refRBSheet1 = useRef();
  // console.log('data😍', data);
  // console.log('data😍lineitems_status', expenseStat);
  const [amount, setAmount] = useState(`${data.requestedAmount}`);
  const [remarkmain, setRemarkmain] = useState(`${data.ExpenseNote}`);
  const [tripModal, setTripModal] = useState(false);
  const [expDetModal, setExpDetModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showConfirmation1, setShowConfirmation1] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [isVisible, setisVisible] = useState(false);
  const [Imageurl, setImageurl] = useState();
  const [lineItemData, setLineItemData] = useState([]);
  const [detId, setDetId] = useState('');
  const [loader, setLoader] = useState(true);
  const [serverUrl, setServerUrl] = useState('');

  const dispatch = useDispatch();
  const expenseTicket = useSelector(state => state.expenseImages);
  var expenseTicketValues = Object.values(expenseTicket);
  // console.log('ex456456456', expenseTicketValues);

  const getExpenseLineItemDetails = async () => {
    // alert(JSON.stringify(data.lineId));
    setLoader(true);
    let lineId = data.lineId;
    // console.log('expense id under expensemaster api', data.expId);
    const result = await gettripLocationApi(
      `api/getExpenseListDetails?exp_list_id=${lineId}`,
    );
    // console.log('result of master api1 ', result.data);
    if (result.statusCode == 200) {
      setLineItemData(result.data);
      // console.log('trips in master api', result.data);
      setLoader(false);
    } else {
      alert(result.message);
    }
    setLoader(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      getExpenseLineItemDetails();
    }, [refresh]),
  );

  if (lineItemData.length >= 1) {
    var mmnt = moment(lineItemData[0].CreatedAt, 'YYYY-MM-DD hh:mm:ss').format(
      'DD-MM-YYYY hh:mm a',
    );
    // console.log('moment formated', mmnt);
  }

  const submitExpense = async () => {
    // alert(amount);
    if (data.isRateApplied == null || data.isRateApplied == undefined) {
      // api/expensesSubmit/53?ExpLineId=5&ExpQty=1000&ILQty=1000&remarks=test
      if (amount == '' || amount == null || amount < 1) {
        toast.show(`Please enter some requested amount`, {
          type: 'warning',
          placement: 'bottom',
          duration: 4000,
          offset: 30,
          animationType: 'slide-in',
        });
      } else {
        const result = await createTripApi(
          `api/expensesSubmit/${data.expId}?ExpLineId=${data.ExpMasterId}&ExpQty=${amount}&ILQty=${amount}&remarks=${remarkmain}`,
        );
        if (result.statusCode == 200) {
          // alert(result.data[0].status.Message);
          toast.show(` ${result.message} ${result.data[0].status.Message}`, {
            type: 'success',
            placement: 'bottom',
            duration: 4000,
            offset: 30,
            animationType: 'slide-in',
          });
          // alert(result.message);
          navigation.goBack();
        } else if (result.statusCode == 100) {
          // alert(result.data[0].status.Message);
          // alert(result.message);
          toast.show(` ${result.message} ${result.data[0].status.Message}`, {
            type: 'warning',
            placement: 'bottom',
            duration: 4000,
            offset: 30,
            animationType: 'slide-in',
          });
        } else {
          toast.show(`${result.message}`, {
            type: 'warning',
            placement: 'bottom',
            duration: 4000,
            offset: 30,
            animationType: 'slide-in',
          });
        }
        // console.log('result if🤗', result);
      }
    } else {
      if (
        amount == '' ||
        amount == null ||
        amount < 1
        // ||
        // remarkmain == '' ||
        // remarkmain == null
      ) {
        toast.show(`Please enter some requested amount`, {
          type: 'warning',
          placement: 'bottom',
          duration: 4000,
          offset: 30,
          animationType: 'slide-in',
        });
      } else {
        const result = await createTripApi(
          `api/expensesSubmit/${data.expId}?ExpLineId=${data.ExpMasterId}&ExpQty=${amount}&ILQty=${amount}&ExpRateQty=${data.Rate}&ExpRateMode=${data.Mode}&remarks=${remarkmain}`,
        );
        // console.log('result else🤗', result);
        if (result.statusCode == 200) {
          toast.show(` ${result.message} ${result.data[0].status.Message}`, {
            type: 'success',
            placement: 'bottom',
            duration: 4000,
            offset: 30,
            animationType: 'slide-in',
          });
          navigation.goBack();
        } else if (result.statusCode == 100) {
          toast.show(` ${result.message} ${result.data[0].status.Message}`, {
            type: 'warning',
            placement: 'bottom',
            duration: 5000,
            offset: 30,
            animationType: 'slide-in',
          });
        } else {
          toast.show(` ${result.message}`, {
            type: 'warning',
            placement: 'bottom',
            duration: 4000,
            offset: 30,
            animationType: 'slide-in',
          });
        }
      }
    }
  };

  // ============================Media Section======================================

  // console.log('base 64 url===...', expenseTicketValues);

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
        // console.log('Response = ', response);

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
        // console.log('uri -> ', response.assets[0].uri);
        // console.log('width -> ', response.assets[0].width);
        // console.log('height -> ', response.assets[0].height);
        // console.log('fileSize -> ', response.assets[0].fileSize);
        // console.log('type -> ', response.assets[0].type);
        // console.log('fileName -> ', response.assets[0].fileName);
        // setFilePath(response);

        ImgToBase64.getBase64String(`${response.assets[0].uri}`).then(
          base64String => {
            // console.log('Base 64 String ....', base64String);
            let body = {
              imgurl: base64String,
              id: response.assets[0].fileName,
            };
            dispatch({
              type: 'ADD_EXPENSE_IMAGES',
              payload: [response.assets[0].fileName, body],
            });
            setRefresh(!refresh);
            // setVisible(true);
            setImageurl(base64String);
          },
        );
        setisVisible(true);
        setTripModal(true);
      });
    }
  };

  useEffect(() => {
    async function temp() {
      const url = await SERVER_URL()
      setServerUrl(url)
    }
    temp()
    // console.log('server_url is ' + `${url}media?id=${167}`)
  }, [])

  // ==========================Media End===============================================

  const updateLineItemDetails = detId => {
    if (exp_status == 'Created') {
      setExpDetModal(true);
      setDetId(detId);

    } else {
      toast.show(`Sorry you can not edit already ${exp_status} expense `, {
        type: 'warning',
        placement: 'bottom',
        duration: 4000,
        offset: 30,
        animationType: 'slide-in',
      });
    }
    // alert('update')
    // const result = await createTripApi(`api/updateExpenseListDetails?expense_list_detail_id=53&image=256&description=test&amount=789`)
  };
  const deleteLineItemDetails = detId => {
    if (exp_status == 'Created') {
      setDetId(detId);
      setShowConfirmation(true);
    } else {
      toast.show(`Sorry you can not delete already ${exp_status} expense `, {
        type: 'warning',
        placement: 'bottom',
        duration: 4000,
        offset: 30,
        animationType: 'slide-in',
      });
    }
  };

  const deleteLineItemDetails_2 = async () => {
    const result = await gettripLocationApi(
      `api/deleteExpenseListDetails?list_detail_id=${detId}`,
    );
    // alert(result.statusCode)
    // console.log('line item delete data', result);
    if (result.statusCode == 200) {
      // setRefresh(!refresh)
      toast.show(`${result.message}`, {
        type: 'success',
        placement: 'bottom',
        duration: 4000,
        offset: 30,
        animationType: 'slide-in',
      });
      // navigation.goBack()
    } else {
      toast.show(` ${result.message}`, {
        type: 'warning',
        placement: 'bottom',
        duration: 4000,
        offset: 30,
        animationType: 'slide-in',
      });
    }
    setRefresh(!refresh);
    // navigation.goBack();
  };

  const onDonefun = () => {
    if (exp_status == 'Created') {
      setShowConfirmation1(true);
    } else {
      // alert();
      toast.show(`Sorry , You can not update ${exp_status} expense`, {
        type: 'warning',
        placement: 'bottom',
        duration: 4000,
        offset: 30,
        animationType: 'slide-in',
      });
    }
  };

  return (
    <>
      {loader ? (
        <>
          <LoaderAllInOne />
        </>
      ) : (
        // <Spinner
        //   visible={true}
        //   textContent={'Loading...'}
        //   textStyle={{color: '#FFF'}}
        // />
        <></>
      )}
      <View style={{ flex: 1, backgroundColor: themecolor.THEMECOLOR }}>
        <Header_2
          title={expenseName}
          onPress={() => props.navigation.goBack()}
        />
        <View
          style={{ width: width * 0.93, alignSelf: 'center', height: '100%' }}>
          <View style={{ marginVertical: 10 }} />
          <View>
            <Text
              style={{
                fontFamily: FontFamily.PopinsRegular,
                color: themecolor.TXTWHITE,
              }}>
              Requested Amount
            </Text>
            <View
              style={{
                backgroundColor: themecolor.BOXTHEMECOLOR,
                borderRadius: 12,
                borderWidth: 0.5,
                borderColor: themecolor.BOXBORDERCOLOR1,
                overflow: 'hidden',
                position: 'relative',
                height: 42,
              }}>
              <TextInput
                value={amount}
                style={{ left: 18, color: themecolor.TXTWHITE, }}
                editable={exp_status === 'Created' ? true : false}
                onChangeText={txt => {
                  let temp = '';
                  temp = txt.replace(/[^0-9]/g, '');
                  if (temp.length === 0) {
                    setAmount('');
                  } else {
                    setAmount(temp);
                  }
                }}
                placeholderTextColor={'black'}
                keyboardType="number-pad"
              />
              <Text style={{ position: 'absolute', top: 14, left: 10, color: themecolor.TXTWHITE }}>
                <FIcon name="rupee" size={12} color={themecolor.TXTWHITE} />
              </Text>
            </View>

            <View style={{ marginVertical: 5 }} />


            {(data.expRemark == "" || data.expRemark == null) ?
              <>
              </>
              : <>
                <View style={{ marginVertical: 5 }} />
                <View style={{
                  justifyContent: 'center',
                  alignSelf: 'center',
                  width: width * 0.93,
                  // marginTop: 10,
                }} >
                  <Text
                    style={{
                      fontFamily: FontFamily.PopinsRegular,
                      color: themecolor.TXTWHITE,
                    }}>
                    Expense Note
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      // justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 12,
                      borderWidth: 1,
                      // borderColor: Colors.borderColor1,
                      color: Colors.grey,
                      overflow: 'hidden',
                      minHeight: 40,
                      paddingVertical: 5,
                      // backgroundColor: 'white',
                      backgroundColor: themecolor.BOXTHEMECOLOR,
                      borderColor: themecolor.BOXBORDERCOLOR1,
                    }}>

                    <Text style={{
                      width: width * 0.85,
                      marginLeft: 5,
                      textAlignVertical: 'top',
                      fontSize: FontSize.labelText2,
                      fontFamily: FontFamily.PopinsRegular,
                      color: themecolor.TXTWHITE,
                    }} >{data.expRemark}</Text>
                  </View>
                </View>
              </>

            }
            {(data.auditRemark == "" || data.auditRemark == null) ?
              <>
              </>
              : <>
                <View style={{ marginVertical: 5 }} />
                <View style={{
                  justifyContent: 'center',
                  alignSelf: 'center',
                  width: width * 0.93,
                  // marginTop: 10,
                }} >
                  <Text
                    style={{
                      fontFamily: FontFamily.PopinsRegular,
                      color: themecolor.TXTWHITE,
                    }}>
                    Audit Remark
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      // justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 12,
                      borderWidth: 1,
                      // borderColor: Colors.borderColor1,
                      color: Colors.grey,
                      overflow: 'hidden',
                      minHeight: 40,
                      paddingVertical: 5,
                      backgroundColor: themecolor.BOXTHEMECOLOR,
                      borderColor: themecolor.BOXBORDERCOLOR1,
                    }}>

                    <Text style={{
                      width: width * 0.85,
                      marginLeft: 5,
                      textAlignVertical: 'top',
                      fontSize: FontSize.labelText2,
                      fontFamily: FontFamily.PopinsRegular,
                      color: themecolor.TXTWHITE,
                    }} >{data.auditRemark}</Text>
                  </View>
                </View>
              </>

            }
            <View style={{ marginVertical: 5 }} />
            {exp_status == 'Created' ? (
              <TouchableOpacity
                style={{
                  width: width * 0.93,
                  alignSelf: 'center',
                  height: 80,
                  backgroundColor: themecolor.BOXTHEMECOLOR,
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: '#bdc3c7',
                  borderStyle: 'dashed',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => {
                  refRBSheet1.current.open();
                }}>
                <Text style={{ fontFamily: FontFamily.PopinsRegular, color: themecolor.TXTWHITE }}>
                  + Click here to add details
                </Text>
              </TouchableOpacity>
            ) : (
              <></>
            )}
            <View style={{ marginVertical: 5 }} />
            <View style={{ width: width * 0.93, alignSelf: 'center' }}>
              <Text
                style={{
                  alignSelf: 'center',
                  fontFamily: FontFamily.PopinsMedium,
                  color: Colors.bluetheme,
                  textAlign: 'center',
                  fontSize: FontSize.h4,
                }}>
                --Added {expenseName} Expenses--
              </Text>
            </View>

            {lineItemData.length < 1 ? (
              <>
                <Image
                  source={require('../../assets/images/gif/noexpensefounds.gif')}
                  style={styles.GIFIMG}
                  resizeMode={'contain'}
                />
                <View
                  style={{
                    justifyContent: 'center',
                    width,
                    alignItems: 'center',
                    top: -50,
                    alignSelf: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: FontSize.h4,
                      fontFamily: FontFamily.PopinsMedium,
                      color: themecolor.TXTWHITE
                    }}>
                    No Expense Found!
                  </Text>
                </View>
                {/* <View>
                  <NoData message="No Expense Found" />
                </View> */}
              </>
            ) : (
              <View
                style={{ height: height * 0.48 }}
              >
                <FlatList
                  data={lineItemData}
                  ListFooterComponent={<View style={{ height: 10 }}></View>}
                  renderItem={({ item }) => {
                    return (
                      <View
                        style={{
                          width: width * 0.93,
                          alignSelf: 'center',
                          backgroundColor: 'white',
                          flexDirection: 'row',
                          padding: 5,
                          borderWidth: 0.5,
                          borderColor: themecolor.BOXBORDERCOLOR1,
                          borderRadius: 12,
                          marginTop: 8,
                          alignItems: 'center',
                          backgroundColor: themecolor.BOXTHEMECOLOR
                        }}>
                        <View style={{ width: '20%' }}>
                          <View
                            style={{
                              width: 60,
                              height: 60,
                              borderRadius: 50,
                              borderWidth: 1,
                              borderColor: Colors.borderColor1,
                              overflow: 'hidden',
                              alignItems: 'center',
                              justifyContent: 'center',

                            }}>
                            {item.Image == null || item.Image == 'null' ? (
                              <DummyImage height={50} width={50} />
                            ) : (
                              <Image
                                source={{
                                  uri: `${serverUrl}media?id=${item.Image}`,
                                }}
                                style={{ height: 60, width: 60 }}
                                resizeMode="cover"
                              />
                            )}
                          </View>
                        </View>
                        <View style={{ width: '62%', padding: 5 }}>
                          <Text
                            style={{
                              fontFamily: FontFamily.PopinsMedium,
                              fontSize: FontSize.labelText,
                              color: themecolor.TXTWHITE
                            }}>
                            {expenseName} Expenses
                          </Text>
                          <Text
                            style={{
                              fontFamily: FontFamily.PopinsMedium,
                              fontSize: FontSize.smallText,
                              color: themecolor.TXTWHITE
                            }}>
                            {mmnt}
                          </Text>
                          <Text
                            style={{
                              fontFamily: FontFamily.PopinsMedium,
                              fontSize: FontSize.smallText,
                              color: themecolor.TXTWHITE
                            }}>
                            <FIcon name="rupee" size={10} /> {item.Amount}
                          </Text>
                        </View>
                        <View style={{ width: '20%' }}>
                          <TouchableOpacity
                            onPress={() =>
                              updateLineItemDetails(item.ExpDetId)
                            }>
                            <Text
                              style={{
                                color: Colors.bluetheme,
                                fontFamily: FontFamily.PopinsRegular,
                                fontSize: FontSize.labelText,
                              }}>
                              <FIcon name="edit" /> edit
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() =>
                              deleteLineItemDetails(item.ExpDetId)
                            }>
                            <Text
                              style={{
                                color: Colors.bluetheme,
                                fontFamily: FontFamily.PopinsRegular,
                                fontSize: FontSize.labelText,
                              }}>
                              <AntDesign name="delete" /> delete
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    );
                  }}
                  scrollEnabled={true}
                />
              </View>
            )}
          </View>
        </View>
        <View>
          <RBSheet
            ref={refRBSheet1}
            animationType={'slide'}
            closeOnDragDown={true}
            closeOnPressMask={true}
            height={120}
            customStyles={{
              container: {
                borderTopRightRadius: 30,
                borderTopLeftRadius: 30,
                padding: 10,
                backgroundColor: themecolor.RB2
              },
              draggableIcon: {
                display: 'none',
              },
            }}>
            <View style={{ marginVertical: 10 }} />
            <View>
              <TouchableOpacity
                onPress={() => {
                  refRBSheet1.current.close();
                  captureImage('photo', launchCamera);
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
                  <Entypo name="camera" size={18} color={Colors.bluetheme} />
                </View>
                <View style={{ width: width * 0.78, justifyContent: 'center' }}>
                  <Text
                    style={{
                      fontFamily: FontFamily.Popinssemibold,
                      color: themecolor.TXTWHITE,
                    }}>
                    Camera
                  </Text>
                </View>
              </TouchableOpacity>
              <View style={{ marginVertical: 2 }} />
              <TouchableOpacity
                onPress={() => {
                  refRBSheet1.current.close();
                  captureImage('photo', launchImageLibrary);
                }}
                style={{ justifyContent: 'space-between', alignContent: 'center', flexDirection: 'row', width: width * 0.9, }}>
                <View style={{ width: width * 0.1, justifyContent: 'center', alignItems: 'center' }}>
                  <MaterialIcons name="add-to-photos" size={20} color={Colors.bluetheme} />
                </View>
                <View style={{ width: width * 0.78, justifyContent: 'center' }}>
                  <Text
                    style={{
                      fontFamily: FontFamily.Popinssemibold,
                      color: themecolor.TXTWHITE,
                    }}>
                    Gallery
                  </Text>
                </View>
              </TouchableOpacity>
              <View style={{ marginVertical: 2 }} />

              <TouchableOpacity
                onPress={() => {
                  refRBSheet1.current.close();
                  setTripModal(true);
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
                  <MaterialIcons name="attachment" size={22} color={Colors.bluetheme} />
                </View>
                <View style={{ width: width * 0.78, justifyContent: 'center' }}>
                  <Text
                    style={{
                      fontFamily: FontFamily.Popinssemibold,
                      color: themecolor.TXTWHITE,
                    }}>
                    No Attachment
                  </Text>
                </View>
              </TouchableOpacity>
              <View style={{ marginVertical: 2 }} />
            </View>
          </RBSheet>
        </View>
        {exp_status === 'Created' &&
          <ActionButton
            backdrop={false}
            activeOpacity={0.85}
            shadowStyle={styles.elevation}
            backgroundTappable={false}
            buttonColor={Colors.bluetheme1}
            position="right"
            offsetX={25}
            offsetY={25}
            size={45}
            outRangeScale={1.1}
            inRangeScale={1.1}
            bgColor="rgba(0,0,0,.5)"
            degrees={180}
            renderIcon={() => <Fontisto name="nav-icon-grid" size={20} color={Colors.white} />}
          >
            <ActionButton.Item
              shadowStyle={styles.elevation}
              size={35}
              title="Save"
              buttonColor="#1abc9c"
              textStyle={{
                color: '#1abc9c',
                fontFamily: FontFamily.PopinsMedium,
                fontSize: FontSize.smallText,
              }}
              onPress={() => onDonefun()}>
              <IoIcon
                name="paper-plane-outline"
                style={styles.actionButtonIcon}
              />
            </ActionButton.Item>
            {/* <ActionButton.Item
          shadowStyle={styles.elevation}
          size={35}
          title="New Claimsheet"
          buttonColor="#1abc9c"
          textStyle={{
            color: '#1abc9c',
            fontFamily: FontFamily.PopinsMedium,
            fontSize: FontSize.smallText,
          }}
          onPress={() => {
            props.navigation.navigate('AddExpense');
          }}>
          <AntDesign name="plussquareo" style={styles.actionButtonIcon} />
        </ActionButton.Item> */}
          </ActionButton>}
        {tripModal && (
          <TripReceiptModal
            refRBSheet1={refRBSheet1}
            ExpMasterId={data.ExpListId}
            Imageurl={Imageurl}
            setImageurl={setImageurl}
            isVisible={isVisible}
            setisVisible={setisVisible}
            setTripModal={setTripModal}
            // setShowImage={setShowImage}
            setRefresh={setRefresh}
            refresh={refresh}
            setLoader={setLoader}
          />
        )}
        {expDetModal && (
          <ExpenseLineItemDetModal
            setExpDetModal={setExpDetModal}
            detId={detId}
            setRefresh={setRefresh}
            refresh={refresh}
            setLoader={setLoader}
          />
        )}
        {showConfirmation && (
          <ConfirmationModal
            btnlabel="Yes"
            // PressDone={() => alert('hi')}
            title={`Are you sure you wants to delete this Expense Item ?`}
            modalVisible1={showConfirmation}
            setmodalVisible1={setShowConfirmation}
            onConfirm={() => {
              setShowConfirmation(!showConfirmation);
              deleteLineItemDetails_2();
            }}
          />
        )}
        {showConfirmation1 && (
          <ConfirmationModal
            btnlabel="Yes"
            // PressDone={() => alert('hi')}
            title={`Are you sure you wants to Save this Expense ?`}
            modalVisible1={showConfirmation1}
            setmodalVisible1={setShowConfirmation1}
            onConfirm={() => {
              setShowConfirmation1(!showConfirmation1);
              submitExpense();
            }}
          />
        )}
      </View>
    </>
  );
};
