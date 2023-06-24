
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
    ScrollView,
    Modal,
  } from 'react-native';
  import React, { useEffect, useState, useRef } from 'react';
  import Header_2 from '../../components/shared/Header_2';
  import styles from '../../assets/css/styleGrievance';
  import styless from '../../assets/css/styleTrip';
  import stylesInput from '../../assets/css/stylesAuth';
  import { Picker } from '@react-native-picker/picker';
  import DateTimePicker from '@react-native-community/datetimepicker';
  import {Colors} from '../../assets/config/Colors';
  import FIcon from 'react-native-vector-icons/FontAwesome';
  import { useNavigation } from "@react-navigation/native";
  import { FontSize } from '../../assets/fonts/Fonts';
  import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
  import Fontisto from 'react-native-vector-icons/Fontisto';
  import FullsizeButton from '../../components/shared/FullsizeButton';
  import { getDatafromAsync } from '../../repository/AsyncStorageServices';
  import NumericInput from 'react-native-numeric-input';
  import StyleCss from '../../assets/css/styleOutlet';
  import { getallTicketsApi } from '../../repository/CaseGrievance/CaseGrievance';
  import { useDispatch, useSelector } from 'react-redux';
  import EIcon from 'react-native-vector-icons/Entypo';
  import { uploadMediaApi } from '../../repository/CaseGrievance/CaseGrievance';
  import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
  import Ionicons from 'react-native-vector-icons/Ionicons';
  import { RadioButton } from 'react-native-paper';
  import { useToast } from 'react-native-toast-notifications';
  import RBSheet from 'react-native-raw-bottom-sheet';
  import Entypo from 'react-native-vector-icons/Entypo';
  import { FontFamily } from '../../assets/fonts/FontFamily';
  import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
  import ImgToBase64 from 'react-native-image-base64';
  import VerifyModel from '../../components/shared/VerifyModel';
  import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
  import SetReminder from '../meetingReminders/SetReminder';
  import CheckSubmit from './CheckSubmit';
  import {CheckFlatListSurveyList} from './CheckListFLatList';
  import { FlatListCallType,FlatListSortBy } from '../Survey/Sorting/SortAndFilter';
import { borderWidth } from 'styled-system';
  
   
  
  const { width } = Dimensions.get('window');
  
  const Checklist = props => {
    const [modalVisible, setModalVisible] = useState(false);
      const [checked, setChecked] = React.useState('first');
      const [RadioButton, setRadioButton] = useState("Yes");
      const navigation = useNavigation();
  
    const modes = useSelector(state => state.mode);
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
  
    const showoutletlist = () => {
      return outletlist.map(item => {
        return (
          <Picker.Item
            label={item.OutletName}
            style={{
              fontSize: 13,
              color: '#333',
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
      return caselist.map(item => {
        return (
          <Picker.Item
            label={item.TicketType}
            style={{
              fontSize: 13,
              color: '#333',
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
      const w_data = await getDatafromAsync('@user');
      const ter_id = w_data.employee[0].TerritoryId;
      console.log('TERITOTY>>', ter_id);
      const response = await getallTicketsApi(
        `api/getOutlets?territory_id=${ter_id}`,
      );
      setOutletlist(response.data);
      console.log('RESPONSE FROM outlets> ', response.data.length);
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
        alert(imgarr.length)
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
    const [selectedValue,setSelectedValue]=useState(false)
    const [selectedusedname,setSelectedUsedName]=useState(false)
    const [selectedused,setSelectedUsed]=useState(false)
    const [selectedId,setSelectedId]=useState(false)
    const [select,setSelect]=useState(false)
     const [selected,setSelected]=useState(false) 
    const [selectedName,setSelectedName]=useState(false) 
    const [text, onChangeText] = React.useState("Useless Text");
    const [number, onChangeNumber] = React.useState(null);
    const [selectedLanguage, setSelectedLanguage] = useState();
    const [selectedLanguage1, setSelectedLanguage1] = useState();
    const [selectedLanguage2, setSelectedLanguage2] = useState();
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [mode, setMode] = useState('date');
  
    const [date1, setDate1] = useState(new Date());
    const [show1, setShow1] = useState(false);
    const [mode1, setMode1] = useState('date');
  
    const [time1, setTime1] = useState(new Date());
    const [showt1, setShowt1] = useState(false);
    const [modet1, setModet1] = useState('time');
  
    const [time2, setTime2] = useState(new Date());
    const [showt2, setShowt2] = useState(false);
    const [modet2, setModet2] = useState('time');
    const showDatepicker = () => {
      setShow(true);
      showMode('date');
    };
  
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      setDate(currentDate);
    };
  
    const showMode = currentMode => {
      setMode(currentMode);
    };
  
    // ===========================================================
  
    const showDatepicker1 = () => {
      setShow1(true);
      showMode1('date');
    };
  
    const onChange1 = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow1(Platform.OS === 'ios');
      setDate1(currentDate);
    };
  
    const showMode1 = currentMode => {
      setMode1(currentMode);
    };
    return (
      <View style={{ flex: 1, backgroundColor: themecolor.THEMECOLOR,width:'100%', }}>
        <Header_2
          title={'Question - 1'}
          onPress={() => deleteAllTickets()}
        />
        <ScrollView>
        <View style={{justifyContent:'center',alignSelf:'center',width:'94%'}}>
        <View style={{marginVertical:5}} />
   {/* <View style={{backgroundColor:'white',flex:1,borderWidth:0.8,borderRadius:10,borderColor:Colors.borderColor1,marginVertical:10,paddingVertical:10}}> */}
   <View style={{...stylesInput.InputMainView,borderWidth:0.8,borderRadius:8,borderColor:themecolor.BOXBORDERCOLOR1,backgroundColor: themecolor.BOXTHEMECOLOR,width:'100%'}}>
              <View style={{...stylesInput.InputIcon}}>
                <SimpleIcon
                style={{right:8}}
                  name="map"
                  size={15}
                  color="#4261f7"
                />
              </View>
              <View style={{...stylesInput.InputView1}}>
                <TextInput
                  // value={input}
                  placeholderTextColor={themecolor.TXTWHITE}
                  placeholder="Area of land for trail"
                  keyboardType="default"
                  maxLength={10}
                  // onChangeText={txt => {
                  //   let temp = '';
                  //   temp = txt.replace(/[^0-9]/g, '');
                  //   if (temp.length === 0) {
                  //     setInput('');
                  //   } else {
                  //     setInput(temp);
                  //   }
                  // }}
                  style={stylesInput.InputText}
                  placeholderStyle={{ fontFamily: 'AnotherFont', color: '#000' }}
                />
              </View>
            </View>
            <View style={{marginVertical:5}} />
          <View style={{...styless.typem, width: '100%'}}>
          <View>
              <Text style={{...styless.title, color: themecolor.TXTWHITE}}>
              Month of Trial
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
              }}>
              <View style={{width: '48%'}}>
                <Text style={{...styless.title, color: themecolor.TXTWHITE,fontSize:FontSize.verysmallText}}>
                  Start Month
                </Text>
                <View style={{}}>
                  <TouchableOpacity onPress={showDatepicker}>
                    <View
                      style={{
                        ...styless.dpview,
                        backgroundColor: themecolor.BOXTHEMECOLOR,
                        borderColor: themecolor.BOXBORDERCOLOR1,
                        borderRadius: 5,
                      }}>
                      <TextInput
                        editable={false}
                        value={date.toUTCString().substring(0, 16)}
                        style={{
                          top: 3,
                          fontSize: 12,
                          width: '92%',
                          fontFamily: FontFamily.Popinssemibold,
                          color: '#333',
                        }}
                        labelStyle={{fontSize: 12}}
                      />
                      <Fontisto
                  name="date"
                  size={15}
                  color="#4261f7"
                />
                    </View>
                  </TouchableOpacity>

                  {show && (
                    <DateTimePicker
                      minimumDate={new Date()}
                      testID="dateTimePicker"
                      value={date}
                      mode={mode}
                      is24Hour={false}
                      display="default"
                      onChange={onChange}
                    />
                  )}
                </View>
              </View>
              <View style={{width: '48%'}}>
              <Text style={{...styless.title, color: themecolor.TXTWHITE,fontSize:FontSize.verysmallText}}>
                  End Month
                </Text>
                <View style={{}}>
                  <TouchableOpacity onPress={showDatepicker1}>
                    <View
                      style={{
                        ...styless.dpview,
                        backgroundColor: themecolor.BOXTHEMECOLOR,
                        borderColor: themecolor.BOXBORDERCOLOR1,
                        borderRadius: 5,
                      }}>
                      <TextInput
                        editable={false}
                        value={date1.toUTCString().substring(0, 16)}
                        // placeholder="Select date & time for task"
                        // label="Select date & time for task"
                        style={{
                          top: 3,
                          fontSize: 12,
                          width: '92%',
                          fontFamily: FontFamily.Popinssemibold,
                          color: themecolor.TXTWHITE,
                        }}
                        // underlineColor={'transparent'}
                        labelStyle={{fontSize: 12}}
                      />
                       <Fontisto
                  name="date"
                  size={15}
                  color="#4261f7"
                />
                    </View>
                  </TouchableOpacity>

                  {show1 && (
                    <DateTimePicker
                      minimumDate={new Date(date)}
                      testID="dateTimePicker"
                      value={date1}
                      mode={mode1}
                      is24Hour={false}
                      display="default"
                      onChange={onChange1}
                    />
                  )}
                </View>
              </View>
            </View>
          
          </View>

            <View style={{marginVertical:5}} />
            <View style={{...styless.typem, width: '100%'}}>
            <View>
              <Text style={{...styless.title, color: themecolor.TXTWHITE}}>
              Expected Sales
              </Text>
            </View>
            <View
              style={{
                ...styless.textContainer1,
                backgroundColor: themecolor.BOXTHEMECOLOR,
                borderColor: themecolor.BOXBORDERCOLOR1,
                position: 'relative',
                width: '100%',
                borderWidth:0.8
              }}>
              <Picker
                mode="dropdown"
                style={{width: '100%'}}
                selectedValue={selectedLanguage}
  onValueChange={(itemValue, itemIndex) =>
    setSelectedLanguage(itemValue)
  }
                itemStyle={{height: 20, width: '100%'}}
               >
                <Picker.Item
                  label="Select"
                  style={{
                    fontSize: 13,
                    fontWeight: 'bold',
                  }}
                  value={''}
                />

<Picker.Item
          label="Sales" value="Sales"
            style={{
              fontSize: 13,
              color: '#333',
              fontFamily:FontFamily.PopinsRegular
            }}
          />
          <Picker.Item
          label="Sales2" value="Sales2"
            style={{
              fontSize: 13,
              color: '#333',
              fontFamily:FontFamily.PopinsRegular
            }}
          />
              </Picker>
            </View>
          </View>

          <View style={{marginVertical:5}} />
            <View style={{...styless.typem, width: '100%'}}>
            <View>
              <Text style={{...styless.title, color: themecolor.TXTWHITE}}>
              Seed Type
              </Text>
            </View>
            <View
              style={{
                ...styless.textContainer1,
                backgroundColor: themecolor.BOXTHEMECOLOR,
                borderColor: themecolor.BOXBORDERCOLOR1,
                position: 'relative',
                width: '100%',
                borderWidth:0.8
              }}>
              <Picker
                mode="dropdown"
                style={{width: '100%'}}
                selectedValue={selectedLanguage1}
  onValueChange={(itemValue, itemIndex) =>
    setSelectedLanguage1(itemValue)
  }
                itemStyle={{height: 20, width: '100%'}}
               >
                <Picker.Item
                  label="Select"
                  style={{
                    fontSize: 13,
                    fontWeight: 'bold',
                  }}
                  value={''}
                />

<Picker.Item
          label="Hybrid Maize" value="HM"
            style={{
              fontSize: 13,
              color: '#333',
              fontFamily:FontFamily.PopinsRegular
            }}
          />
          <Picker.Item
          label="Composite Maize" value="CM"
            style={{
              fontSize: 13,
              color: '#333',
              fontFamily:FontFamily.PopinsRegular
            }}
          />
              </Picker>
            </View>
          </View>

          <View style={{marginVertical:5}} />
            <View style={{...styless.typem, width: '100%'}}>
            <View>
              <Text style={{...styless.title, color: themecolor.TXTWHITE}}>
              Soil Type
              </Text>
            </View>
            <View
              style={{
                ...styless.textContainer1,
                backgroundColor: themecolor.BOXTHEMECOLOR,
                borderColor: themecolor.BOXBORDERCOLOR1,
                position: 'relative',
                width: '100%',
                borderWidth:0.8
              }}>
              <Picker
                mode="dropdown"
                style={{width: '100%'}}
                selectedValue={selectedLanguage2}
  onValueChange={(itemValue, itemIndex) =>
    setSelectedLanguage2(itemValue)
  }
                itemStyle={{height: 20, width: '100%'}}
               >
                <Picker.Item
                  label="Select"
                  style={{
                    fontSize: 13,
                    fontWeight: 'bold',
                  }}
                  value={''}
                />

<Picker.Item
          label="Sandy Soil" value="SandySoil"
            style={{
              fontSize: 13,
              color: '#333',
              fontFamily:FontFamily.PopinsRegular
            }}
          />
          <Picker.Item
          label="Silt Soil" value="SS"
            style={{
              fontSize: 13,
              color: '#333',
              fontFamily:FontFamily.PopinsRegular
            }}
          />
           <Picker.Item
          label="Clay Soil" value="CS"
            style={{
              fontSize: 13,
              color: '#333',
              fontFamily:FontFamily.PopinsRegular
            }}
          />
           <Picker.Item
          label="Loamy Soil" value="LS"
            style={{
              fontSize: 13,
              color: '#333',
              fontFamily:FontFamily.PopinsRegular
            }}
          />
              </Picker>
            </View>
          </View>

          <View style={{marginVertical:5}} />
          <View style={{...styless.typem, width: '100%'}}>
            <View>
              <Text style={{...styless.title, color: themecolor.TXTWHITE}}>
              Comments
              </Text>
            </View>
            <View
              style={{
                ...styless.ti,
                backgroundColor: themecolor.BOXTHEMECOLOR,
                borderColor: themecolor.BOXBORDERCOLOR1,
                borderRadius: 5,
                borderWidth:0.8
              }}>
              <TextInput
                // value={remark}
                multiline={true}
                numberOfLines={3}
                textAlignVertical={'top'}
                // onChangeText={text => setRemark(text)}
                style={{
                  width: '100%',
                  borderRadius: 5,
                  left: 5,
                  color: themecolor.TXTWHITE,
                }}
              />
            </View>
          </View>

         
           {/* </View>  */}



        {/* <CheckFlatListSurveyList /> */}
        
          {/* <View style={{ height: 10 }} /> */}
          {/* <FlatListSortBy /> */}

       


          {/* <View style={styles.typem}>
  
          
          <View style={styles.typem}>
  
          <View >
          <Text style={{color:'#000',left:0,marginTop:0,bottom:20}}>
          <SetReminder/>
          </Text>
        </View>
        </View>
          </View>  */}
          {/* <View style={{backgroundColor:'white',flex:1,borderWidth:0.8,borderRadius:10,borderColor:Colors.borderColor1,marginVertical:10,paddingVertical:10}}>
          <View>
              <Text style={{ ...styles.type, color:"#000", left:10,fontSize:12 }}>
              3.Approx customer visibility in store during your visit?
              </Text>
            </View>
           <NumericInput
                  containerStyle={{ backgroundColor: themecolor.BOXTHEMECOLOR, borderWidth: 0.5,left:20 }}
                  totalWidth={75}
                  totalHeight={24}
                  iconSize={14}
                  // value={qty}
                  rounded
                  // onLimitReached={(isMax,msg) =>alert(isMax,msg)}
                  // initValue={0}
                  minValue={0}
                  step={1}
                  valueType="integer"
                  type="plus-minus"
                  style={{ fontFamily: FontFamily.PopinsMedium }}
                  textColor={themecolor.ICON}
                    iconStyle={{ color: themecolor.ICON }}
                    rightButtonBackgroundColor={themecolor.BOXTHEMECOLOR}
                    leftButtonBackgroundColor={themecolor.BOXTHEMECOLOR}
              
                />
</View> */}

  {/* <View style={{backgroundColor:'white',flex:1,borderWidth:0.8,borderRadius:10,borderColor:Colors.borderColor1,marginVertical:10,paddingVertical:10}}>

          <View>
              <Text style={{ ...styles.type, color:"#000", left:10,fontSize:12 }}>
              4.Upload first counter showcase photograph
              </Text>
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap',left:10 }}>
              {imagesTicketValues.map(item => {
                return (
                  <View
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
                  backgroundColor:Colors.GREY2,
                  borderColor:Colors.borderColor1,
                  borderWidth:0.8
                }}
                onPress={() => {
                  refRBSheet1.current.open();
                }}>
                <FIcon name="camera" size={18} color={'grey'} />
              
              </TouchableOpacity>
            </View>
          
          </View> */}
  
          <View style={{ height: 5 }} />

{/* <View style={{backgroundColor:'white',flex:1,borderWidth:0.8,borderRadius:10,borderColor:Colors.borderColor1,marginVertical:10,paddingVertical:10}}>

          <View style={styles.typem}>
         
            <View>
              <Text style={{ ...styles.type, color: themecolor.TXTWHITE,bottom:32,color:"#FFF" }}>
               4. numeric input Box
              </Text>
            </View>
            <View
              style={{
                ...styles.ti,
                backgroundColor: themecolor.WHITE,
                borderColor: themecolor.BOXBORDERCOLOR1,bottom:30
              }}>
             
  
  <TextInput
          style={{color:"#000"}}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="useless placeholder"
          keyboardType="numeric"
        />
              
            </View>
          </View>
</View>          */}
          <View style={{ height: 10 }} />
        </View>
       
            </ScrollView>
            {/* <View style={{bottom:30}}>
            <CheckSubmit/>
            </View>    */}
          <View style={{flexDirection:'row',width:'100%',justifyContent:'space-around',alignSelf:'center',bottom:20}}>
          <FullsizeButton
            height={45}
            backgroundColor={'#54c130'}
            width={width * 0.45}
            onPress={() => setModalVisible(true)}
          /> 
          <FullsizeButton
          title={'Cancel'}
            height={45}
            backgroundColor={Colors.bluetheme1}
            width={width * 0.45}
            onPress={() => navigation.navigate('Checklist')}
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
                <Entypo name="camera" size={18} color={'red'} />
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
                <MaterialIcons name="add-to-photos" size={20} color={'red'} />
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
     



      <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
        // onRequestClose={() => {
        //     setModalVisible2(!modalVisible2);
        // }}
        >
            <View style={{ ...StyleCss.centeredView,alignSelf:'center',justifyContent:'center',}}>
            <View style={{ ...StyleCss.modalView,height:'auto',width: '90%',alignSelf:'center',borderWidth: 1, borderColor: themecolor.BOXBORDERCOLOR1,backgroundColor:themecolor.RB2 }}>
                    <View style={StyleCss.ModalViewWidth}>
                        <View
                            style={{...StyleCss.ModelVideoCenter,width:'100%'}}>

<Image
                         source={require('../../assets/images/expesne/areusure.png')}
                         resizeMode="center"
                        //  style={StyleCss.backgroundVideo}
                         style={{
                           height: 134,
                           width: '100%',
                         }}
                       />
                          
                            <Text style={{...StyleCss.submittext,color:themecolor.TXTWHITE}}>
                            Are You sure you wants to Submit this servey?
                            </Text>
                        </View>
                        <View style={StyleCss.MV2} />

                        <View style={{...StyleCss.FLexCenter,justifyContent:'space-around',width:'90%'}}>
                            <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={() => navigation.navigate('ViewSurveyThree')}>
                                <View style={{...StyleCss.ModelDoneButton,backgroundColor:'#54c130',width:width*0.3,borderRadius:100,height:30}}>
                                    <Text
                                        style={{...StyleCss.textStyleDone,}}>
                                        Yes
                                    </Text>
                                </View>
                               
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={() => setModalVisible(false)}
                            // onPress={() => setModalVisible2(!modalVisible2)}
                            >
                                <View style={{...StyleCss.ModelDoneButton,backgroundColor:Colors.grey1,width:width*0.3,borderRadius:100,height:30}}>
                                    <Text
                                        style={{...StyleCss.textStyleDone,}}>
                                        No
                                    </Text>
                                </View>
                               
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
      </View>
  
    );
  };
  
  export default Checklist;
  