import {
  View,
  Text,
  Dimensions,
  TextInput,
  Image,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import Header_2 from '../../components/shared/Header_2';
import styles from '../../assets/css/styleGrievance';
import { Picker } from '@react-native-picker/picker';
import FIcon from 'react-native-vector-icons/FontAwesome';
import { FontSize } from '../../assets/fonts/Fonts';
import FullsizeButton from '../../components/shared/FullsizeButton';
import { getDatafromAsync } from '../../repository/AsyncStorageServices';
import { getallTicketsApi } from '../../repository/CaseGrievance/CaseGrievance';
import { useDispatch, useSelector } from 'react-redux';
import EIcon from 'react-native-vector-icons/Entypo';
import { uploadMediaApi } from '../../repository/CaseGrievance/CaseGrievance';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useToast } from 'react-native-toast-notifications';
import RBSheet from 'react-native-raw-bottom-sheet';
import Entypo from 'react-native-vector-icons/Entypo';
import { FontFamily } from '../../assets/fonts/FontFamily';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImgToBase64 from 'react-native-image-base64';
import VerifyModel from '../../components/shared/VerifyModel';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { Colors } from '../../assets/config/Colors';
// import RNFS from 'react-native-fs';
// import ImageResizer from '@bam.tech/react-native-image-resizer';
// import ImageResizer from '@bam.tech/react-native-image-resizer';

const { width } = Dimensions.get('window');

const CreateCase = props => {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();
  const toast = useToast();
  const [outlet, setOutlet] = useState('');
  const [casetype, setCasetype] = useState([]);
  const [note, setNote] = useState('');
  const [showmodal, setShowmodal] = useState(false);
  const [filePath, setFilePath] = useState({
    uri: 'https://picsum.photos/200/300?random=1',
  });
  const [refresh, setRefresh] = useState(false);
  const [outletlist, setOutletlist] = useState([]);
  const [caselist, setCaselist] = useState([]);
  const [temparr, setTemparr] = useState(0);
  const [outletId, setOutletId] = useState('');
  const [downloadsFolder, setDownloadsFolder] = useState('');
  const dispatch = useDispatch();
  const imagesTicket = useSelector(state => state.ticketImages);
  console.log('imageTIckets4545', imagesTicket);
  var imagesTicketValues = Object.values(imagesTicket);
  const refRBSheet1 = useRef();

  console.log(
    'image uri base ====================>>>>>>>>>>>>>>>',
    imagesTicketValues,
  );

  // alert(temparr);
  // ===========CAMERA MEDIA FUNCTION START==========

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

  const captureImage = async (type, mediaby) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 400,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
      selectionLimit: 3,
      // cameraType:'front',
      // includeBase64:true
      presentationStyle:'popover'
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
        console.log('response.assets[0]-> ', response.assets[0].base64);
        // alert(response.assets[0].fileSize)
        // ===============================

        // ===============================
        setFilePath(response);
        response.assets.map(i => {
          ImgToBase64.getBase64String(`${i.uri}`).then(base64String => {
            console.log('Base 64 String ....', base64String);
            let body = {
              imgurl: base64String,
              id: i.fileName,
            };
            dispatch({
              type: 'ADD_TICKET_IMAGES',
              payload: [i.fileName, body],
            });
            setRefresh(!refresh);
            setTemparr(temparr + response.assets.length);
          });
        });
      });
    }
  };


  //  ========MEDIA CAMERA END===========

  useEffect(() => {
    if (props.route.params?.navigateFrom == 'OutletView') {
      setOutlet(props.route.params?.outletId);
    } else {
      console.log("navigateFrom ", props.route.params.navigateFrom)
    }
  }, [props.route.params?.outletId])

  useEffect(() => {
    // setDownloadsFolder(RNFS.DownloadDirectoryPath);
  }, [])

  const showoutletlist = () => {
    return outletlist?.map((item, index) => {
      return (
        <Picker.Item
          key={index}
          label={item.OutletName}
          // selectedValue={140}
          style={{
            fontSize: 13,
            // color: '#333',
            backgroundColor: themecolor.BOXTHEMECOLOR,
            color: themecolor.TXTWHITE,
            fontWeight: 'bold',
            // height: 10,
          }}
          value={item.Id}
        />
      );
    });
  };

  // ==================================================

  const showcaselist = () => {
    return caselist.map((item, index) => {
      return (
        <Picker.Item
          key={index}
          label={item.TicketType}
          style={{
            fontSize: 13,
            // color: '#333',
            backgroundColor: themecolor.BOXTHEMECOLOR,
            color: themecolor.TXTWHITE,
            fontWeight: 'bold',
            // height: 10,
          }}
          value={item.Id}
        />
      );
    });
  };

  // ==============API===API===API======================

  // const handleSubmit=async()=>{
  //   const result = await
  // }

  const getoutlets = async () => {
    try {
      const w_data = await getDatafromAsync('@user');
      const ter_id = w_data.employee[0].TerritoryId;
      console.log('TERITOTY>>', ter_id);
      const response = await getallTicketsApi(
        `api/getOutlets?territory_id=${ter_id}`,
      );
      setOutletlist(response.data);
      console.log('RESPONSE FROM outlets> ', response.data.length);
    } catch (err) {
      console.log("🚀 ~ file: CreateCase.js:236 ~ getoutlets ~ err", err)
    }
  };

  const getcases = async () => {
    const response = await getallTicketsApi('api/getTicketTypes');
    setCaselist(response.data);
    console.log('cases are > ', response.data);
  };

  useEffect(() => {
    getoutlets();
    getcases();
  }, []);

  const deleteTickets = id => {
    dispatch({
      type: 'REMOVE_TICKET_IMAGES',
      payload: id,
    });
    setRefresh(!refresh);
    setTemparr(temparr - 1);
  };

  const deleteAllTickets = () => {
    dispatch({
      type: 'REMOVE_ALL_TICKET_IMAGES',
    });
    props.navigation.goBack();
  };

  function handleBackButtonClick() {
    dispatch({
      type: 'REMOVE_ALL_TICKET_IMAGES',
    });
    props.navigation.goBack();
    return true;
  }

  React.useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);

  var imgdata = useSelector(state => state.ticketImages);
  var imgValues = Object.values(imgdata);
  console.log('imgvaluesRedux', imgValues);

  const onsubmit = async () => {
    try {
      var imgarr = [];
      imgValues.map(item => {
        imgarr.push(item.imgurl);
      });
      console.log('imgarr>>>', imgarr);
      let body = {
        folder_id: '1',
        media: imgarr,
      };
      // alert(imgarr.length)
      console.log('arr', imgarr);
      const result = await uploadMediaApi('api/uploadMediaBase64', body);
      // alert("result01"+result);
      console.log('result frpm upload media++>><', result.data);
      const d1 = result.statusCode == 404 ? '' : result.data.toString();
      // console.log("d1==>>1 ",typeof(d1))

      const body_1 = {
        ticket_type_id: casetype,
        outlet_id: outlet,
        note: note,
        upload_media_id: d1,
      };

      if (
        body_1.ticket_type_id != '' &&
        body_1.outlet_id != '' &&
        body_1.note != ''
      ) {
        const result_2 = await uploadMediaApi('api/createTicket', body_1);
        if (result_2.statusCode == 200) {
          console.log('result_2 create case', result_2);
          dispatch({
            type: 'REMOVE_ALL_TICKET_IMAGES',
          });
          setShowmodal(true);
        } else {
          toast.show(result_2.message, {
            type: 'warning',
            placement: 'bottom',
            duration: 4000,
            offset: 30,
            animationType: 'slide-in',
          });
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
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: themecolor.THEMECOLOR }}>
      {/* <View style={{ flex: 0.1 }}> */}
      <Header_2
        title={'Create Case/Grievance'}
        onPress={() => deleteAllTickets()}
      />
      {/* </View> */}
      <View>
        <View style={{ height: 10 }} />
        <View style={styles.typem}>
          <View>
            <Text style={{ ...styles.type, color: themecolor.TXTWHITE }}>
              Case type
            </Text>
          </View>
          <View
            style={{
              ...styles.textContainerr,
              backgroundColor: themecolor.BOXTHEMECOLOR,
              borderColor: themecolor.BOXBORDERCOLOR1,
            }}>
            <Picker
              mode="dropdown"
              style={{ width: '100%', color: themecolor.TXTWHITE, }}
              selectedValue={casetype}
              dropdownIconColor={themecolor.TXTWHITE}
              itemStyle={{ height: 20, width: '100%' }}
              onValueChange={item => {
                setCasetype(item);
              }}>
              {showcaselist()}
            </Picker>
          </View>
        </View>
        <View style={{ height: 10 }} />
        <View style={styles.typem}>
          <View>
            <Text style={{ ...styles.type, color: themecolor.TXTWHITE }}>
              Reporting on behalf of
            </Text>
          </View>
          <View
            style={{
              ...styles.textContainerr,
              backgroundColor: themecolor.BOXTHEMECOLOR,
              borderColor: themecolor.BOXBORDERCOLOR1,
            }}>
            <Picker
              mode="dropdown"
              style={{ width: '100%', color: themecolor.TXTWHITE }}
              selectedValue={outlet}
              dropdownIconColor={themecolor.TXTWHITE}
              itemStyle={{ height: 20, width: '100%' }}
              onValueChange={item => {
                setOutlet(item);
              }}>
              {showoutletlist()}
            </Picker>
          </View>
        </View>
        <View style={{ height: 10 }} />
        <View style={styles.typem}>
          <View>
            <Text style={{ ...styles.type, color: themecolor.TXTWHITE }}>
              Upload media
            </Text>
          </View>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {imagesTicketValues?.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    borderRadius: 10,
                    marginRight: 5,
                    marginTop: 5,
                    position: 'relative',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'red',
                  }}>
                  <Image
                    source={{ uri: `data:image/jpeg;base64,${item.imgurl}` }}
                    resizeMode='contain'
                    style={{ width: 50, height: 50, borderRadius: 10 }}
                  />
                  <TouchableOpacity
                    style={{ position: 'absolute', right: -5, top: -5 }}
                    onPress={() => deleteTickets(item.id)}>
                    <EIcon
                      name="circle-with-cross"
                      size={20}
                      color={'tomato'}
                    />
                  </TouchableOpacity>
                </View>
              );
            })}
            <TouchableOpacity
              style={{
                ...styles.media,
                display: temparr == 3 ? 'none' : 'flex',
                backgroundColor: themecolor.BOXTHEMECOLOR,
              }}
              onPress={() => {
                refRBSheet1.current.open();
              }}>
              <FIcon name="camera" size={22} color={'grey'} />
            </TouchableOpacity>
          </View>
          <Text style={{ marginTop: 3, fontSize: FontSize.small, color: themecolor.TXTWHITE }}>
            Only JPEG & PNG file types are allowed
          </Text>
        </View>
        <View style={{ height: 10 }} />
        <View style={styles.typem}>
          <View>
            <Text style={{ ...styles.type, color: themecolor.TXTWHITE }}>
              Note
            </Text>
          </View>
          <View
            style={{
              ...styles.ti,
              backgroundColor: themecolor.BOXTHEMECOLOR,
              borderColor: themecolor.BOXBORDERCOLOR1,
            }}>
            <TextInput
              value={note}
              multiline={true}
              numberOfLines={3}
              textAlign="left"
              onChangeText={text => setNote(text)}
              style={{
                width: '100%',
                borderRadius: 15,
                left: 5,
                textAlignVertical: 'top',
                color: themecolor.TXTWHITE,
                // minHeight:40,
                // height:'auto'
              }}
            />
          </View>
        </View>
        <View style={{ height: 10 }} />
        <FullsizeButton
          height={45}
          backgroundColor={themecolor.HEADERTHEMECOLOR}
          width={width * 0.92}
          onPress={() => onsubmit()}
        />
      </View>

      {showmodal && (
        <VerifyModel
          setShowmodal={setShowmodal}
          title={'Case Created Successfully'}
          navigateTo={'Caselist'}
          navigateFrom="CreateCase"
        />
      )}
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
            backgroundColor: themecolor.RB2,
          },
          draggableIcon: {
            display: 'none',
          },
        }}>
        {/* <View style={{marginVertical: 10}} /> */}
        <View style={{ marginTop: 10 }}>
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
              <MaterialIcons name="add-to-photos" size={20} color={Colors.bluetheme} />
            </View>
            <View style={{ width: width * 0.78, justifyContent: 'center' }}>
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
};

export default CreateCase;
