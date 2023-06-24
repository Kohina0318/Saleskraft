import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
  Platform,
  BackHandler
} from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import { useNavigation } from '@react-navigation/native';
import FIcon from 'react-native-vector-icons/FontAwesome';
import Header_2 from '../../components/shared/Header_2';
import styles from '../../assets/css/styleCompetitionMapping';
import ImgToBase64 from 'react-native-image-base64';
import { useDispatch, useSelector } from 'react-redux';
import EIcon from 'react-native-vector-icons/Entypo';
import { postCreateCompetition } from '../../repository/CompetitionMapping/CompetitionMappingRepository';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { uploadMediaApi } from '../../repository/CaseGrievance/CaseGrievance';
import { getCheckInOutStatus } from '../../repository/outlet/VerifyOutletRepository';
import {launchCamera} from 'react-native-image-picker';

var Id = 0;

export default function CompetitionMapping(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const toast = useToast();
  const [showmodal, setshowModal] = useState(false);
  const [filePath, setFilePath] = useState({
    uri: 'https://picsum.photos/200/300?random=1',
  });
  const [refresh, setRefresh] = useState(false);

  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [mrp, setMrp] = useState('');
  const [features, setFeatures] = useState('');
  const [feedback, setFeedback] = useState('');
  const [remark, setRemark] = useState('');
  const [outletId, setOutletId] = useState('');



  const image = useSelector(state => state.BACompetitionMappingImage);
  const competitionProductsRedux = useSelector(
    state => state.BACompetitionProducts,
  );
  const competitionProductsValues = Object.values(competitionProductsRedux);

  function handleBackButtonClick() {
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
        setFilePath(response);

        ImgToBase64.getBase64String(`${response.assets[0].uri}`).then(
          base64String => {
            // console.log('Base 64 String ....', base64String);
            let body = {
              imgurl: base64String,
              id: response.assets[0].fileName,
            };
            dispatch({
              type: 'ADD_BA_COMETITION_MAPPING_IMAGE',
              payload: base64String,
            });
            setRefresh(!refresh);
          },
        );
      });
    }
  };

  const deleteTickets = () => {
    dispatch({
      type: 'REMOVE_BA_COMETITION_MAPPING_IMAGE',
    });
    setRefresh(!refresh);
  };

  const handlePlus = async () => {
    Id = Id + 1;
    let obj = {
      Id: Id,
      competition_sku: '',
      competition_mrp: '',
    };
    dispatch({ type: 'ADD_BA_COMPETITION_PRODUCTS', payload: [Id, obj] });
  };

  const handleMinus = async id => {
    dispatch({ type: 'REMOVE_BA_COMPETITION_PRODUCTS', payload: id });
  };

  const handleChagedCompetitionSku = (txt, item) => {
    var localCompetitionSku = txt;
    let obj = {
      Id: item.Id,
      competition_sku: localCompetitionSku,
      competition_mrp: '',
    };
    dispatch({ type: 'ADD_BA_COMPETITION_PRODUCTS', payload: [item.Id, obj] });
  };

  const handleChagedCompetitionMrp = (txt, item) => {
    var localCompetitionMrp = txt;
    let obj = {
      Id: item.Id,
      competition_sku: item.competition_sku,
      competition_mrp: localCompetitionMrp,
    };
    dispatch({ type: 'ADD_BA_COMPETITION_PRODUCTS', payload: [item.Id, obj] });
  };

  const createCompetition = async () => {
    var newArr = [];

    if (name == '') {
      toast.show('Customer Details is required', {
        type: 'warning',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
    } else if (sku == '' && mrp == '') {
      toast.show('Top selling SKUs and MRP are required', {
        type: 'warning',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
    } else if (features == '') {
      toast.show('Features is required', {
        type: 'warning',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
    } else if (feedback == '') {
      toast.show('Consumer Feedback is required', {
        type: 'warning',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
    } else if (remark == '') {
      toast.show('Remark is required', {
        type: 'warning',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
    } else if (image == '') {
      toast.show('Please choose image', {
        type: 'warning',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
    } else {
      competitionProductsValues.map(itm => {
        var obj = {
          competition_sku: itm.competition_sku,
          competition_mrp: itm.competition_mrp,
        };

        newArr.push(obj);
      });

      newArr.push({
        competition_sku: sku,
        competition_mrp: mrp,
      });

      let bodyImage = {
        folder_id: '1',
        media: [image],
      };
      const result = await uploadMediaApi('api/uploadMediaBase64', bodyImage);
      console.log('Media Id in Competition Mapping.......>:', result.data[0]);

      var body = {
        competition_name: name,
        competition_features: features,
        consumer_feedback: feedback,
        competition_remark: remark,
        qty: "0",
        media_id: result.data[0],
        outlet_id: outletId,
        competition_products: newArr,
      };
      console.log('body ------------------>', body);
      try {
        var res = await postCreateCompetition(body);
        console.log(
          'postCreateCompetition in Competion Mapping ------------------>',
          res,
        );
        if (res.statusCode === 200) {
          setshowModal(true);
        } else {
          console.log('Error....in createCompetition api >>>');
          toast.show(res.message, {
            type: 'warning',
            placement: 'bottom',
            duration: 3000,
            offset: 30,
            animationType: 'slide-in',
          });
        }
      } catch (e) {
        console.log('Error....in createCompetition api', e);
        toast.show('Something went wrong!, Try again later.', {
          type: 'danger',
          placement: 'bottom',
          duration: 3000,
          offset: 30,
          animationType: 'slide-in',
        });
      }
      dispatch({ type: 'REMOVE_ALL_BA_COMPETITION_PRODUCTS' });
      dispatch({ type: 'REMOVE_BA_COMETITION_MAPPING_IMAGE' });
    }
  };

  const checkInOutStatus = async () => {
    try {
      const res = await getCheckInOutStatus();
      console.log(
        'Get Check In Out Status......page Competition Mapping line 190',
        res,
      );
      if (res.statusCode == 200) {
        setOutletId(res.data.data.CheckInRec.OutletId);
      }
      else {
        console.log("Error... checkInOutStatus in Competition mapping page..")
        toast.show(res.message, {
          type: 'warning',
          placement: 'bottom',
          duration: 3000,
          offset: 30,
          animationType: 'slide-in',
        });
      }
    } catch (e) {
      console.log("Error... checkInOutStatus in Competition mapping page..", e)
      toast.show('Something went wrong!, Try again later.', {
        type: 'danger',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });

    }

  };

  useEffect(() => {
    checkInOutStatus();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: themecolor.THEMECOLOR }}>
      <Header_2
        title={'Competition Mapping'}
        onPress={() => navigation.goBack()}
      />
      <ScrollView>
        <View style={styles.mainView}>
          <View style={styles.innerView}>
            <View>
              <Text style={{ ...styles.heading, color: themecolor.TXTWHITE }}>Customer Details</Text>
            </View>
            <View style={{ ...styles.boxView, backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR1 }}>
              <TextInput
                placeholder={'Mention name of competitior'}
                placeholderTextColor={'lightgrey'}
                style={{ ...styles.textinput, color: themecolor.TXTWHITE }}
                onChangeText={txt => setName(txt)}
              />
            </View>
          </View>
          <View style={{ ...styles.innerView, }}>
            <View>
              <Text style={{ ...styles.heading, color: themecolor.TXTWHITE }}>Top selling SKUs</Text>
            </View>

            <View style={styles.view}>
              <View style={{ ...styles.textinput1, backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR1 }}>
                <TextInput
                  style={{ ...styles.textinput, color: themecolor.TXTWHITE }}
                  onChangeText={txt => setSku(txt)}
                />
              </View>

              <View style={{ ...styles.textinput2, backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR1 }}>
                <TextInput
                  placeholder={'MRP'}
                  placeholderTextColor={'lightgrey'}
                  style={{ ...styles.textinput, color: themecolor.TXTWHITE }}
                  onChangeText={txt => setMrp(txt)}
                />
              </View>

              <View style={styles.ButtonView}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => handlePlus()}
                  style={{ ...styles.bottombutton, backgroundColor: themecolor.HEADERTHEMECOLOR }}>
                  <Image
                    source={require('../../assets/images/addoutlet/add.png')}
                    style={styles.bottombuttonimg}
                  />
                </TouchableOpacity>
                {/* <CreateButton Br={10} height={13} /> */}
              </View>
            </View>

            {competitionProductsValues.map((item, index) => {
              return (
                <>
                <View  style={{margin:1}}/>
                  <View style={styles.view}>
                    <View style={{ ...styles.textinput1, backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR1 }}>
                      <TextInput
                        style={{ ...styles.textinput, color: themecolor.TXTWHITE }}
                        value={item.competition_sku}
                        onChangeText={txt =>
                          handleChagedCompetitionSku(txt, item)
                        }
                      />
                    </View>

                    <View style={{ ...styles.textinput2, backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR1 }}>
                      <TextInput
                        placeholder={'MRP'}
                        placeholderTextColor={'lightgrey'}
                        style={{ ...styles.textinput, color: themecolor.TXTWHITE }}
                        value={item.competition_mrp}
                        onChangeText={txt =>
                          handleChagedCompetitionMrp(txt, item)
                        }
                      />
                    </View>

                    <View style={styles.ButtonView}>
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => handleMinus(item.Id)}
                        style={{ ...styles.bottombutton, backgroundColor: themecolor.HEADERTHEMECOLOR }}>
                        <FIcon
                          name="minus"
                          size={15}
                          color={'#fff'}
                          style={styles.bottombuttonicon}
                        />
                      </TouchableOpacity>
                      {/* <CreateButton Br={10} height={13} /> */}
                    </View>
                  </View>
                </>
              );
            })}
          </View>
          <View style={styles.innerView}>
            <View>
              <Text style={{ ...styles.heading, color: themecolor.TXTWHITE }}>Features</Text>
            </View>
            <View style={{ ...styles.boxView, backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR1 }}>
              <TextInput
                style={{ ...styles.textinput, color: themecolor.TXTWHITE }}
                onChangeText={txt => setFeatures(txt)}
              />
            </View>
          </View>
          <View style={styles.innerView}>
            <View>
              <Text style={{ ...styles.heading, color: themecolor.TXTWHITE }}>Consumer Feedback</Text>
            </View>
            <View style={{ ...styles.container, backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR1 }}>
              <TextInput
                multiline={true}
                numberOfLines={3}
                placeholder={'What consumer says about'}
                placeholderTextColor={'lightgrey'}
                style={{ ...styles.boxText, color: themecolor.TXTWHITE }}
                onChangeText={txt => setFeedback(txt)}
              />
            </View>
          </View>
          <View style={styles.innerView}>
            <View>
              <Text style={{ ...styles.heading, color: themecolor.TXTWHITE }}>Remark</Text>
            </View>
            <View style={{ ...styles.container, backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR1 }}>
              <TextInput
                style={{ ...styles.boxText, color: themecolor.TXTWHITE }}
                onChangeText={txt => setRemark(txt)}
              />
            </View>
          </View>
          <View style={{ ...styles.camView, backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR1 }}>
            {image === '' ? (
              <TouchableOpacity onPress={() => captureImage('photo')}>
                <FIcon name="camera" size={25} color={themecolor.BORDER} />
              </TouchableOpacity>
            ) : (
              <View>
                <Image
                  source={{ uri: `data:image/jpeg;base64,${image}` }}
                  style={styles.viewImage}
                />
                <TouchableOpacity
                  style={styles.iconTouchableOpacity}
                  onPress={() => deleteTickets()}>
                  <EIcon name="circle-with-cross" size={20} color={'tomato'} />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
        <View style={styles.MT}>
          <FullsizeButton
            title={'Submit'}
            width={340}
            height={40}
            backgroundColor={themecolor.HEADERTHEMECOLOR}
            onPress={() => createCompetition()}
          />
        </View>
        {showmodal && (
          <VerifyModal
            setshowModal={setshowModal}
            navigateTo={'NewDashboard'}
            navigateFrom={'CometitionMapping'}
            title="Your request has been successfully submitted"
          />
        )}
      </ScrollView>
    </View>
  );
}
