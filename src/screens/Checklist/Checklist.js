
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
  ScrollView
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

 

const { width } = Dimensions.get('window');

const Checklist = props => {

    const [checked, setChecked] = React.useState('first');
    const [RadioButton, setRadioButton] = useState("Yes");


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

  return (
    <View style={{ flex: 1, backgroundColor: themecolor.THEMECOLOR }}>
      {/* <View style={{ flex: 0.1 }}> */}
      <Header_2
        title={'Display-2'}
        onPress={() => deleteAllTickets()}
      />
      {/* </View> */}
      <ScrollView>
      <View>
      
        <View style={{ height: 10 }} />
        <View style={styles.typem}>

        <View style={{
      backgroundColor:"#FFF",
      marginTop:0,
      borderRadius:10,
      height:200,
      width:330,
      left:0
      }}>
   
    
    
    <View style={{
      justifyContent:'space-around',
      paddingTop:25,
      flexDirection:'row'
      }}>
      
    <View style={{left:60}}>
        <Text style={{color:"#000"}}>
         1. Which brands are easily visible in frontend showcase?
        </Text>
    </View>



      <View style={{
        //borderColor:"#ebecef",
       // borderWidth:2,
        borderRadius:20,
        width:95,
        height:25,
        justifyContent:"center",
        alignItems:"center",
        marginTop:50,
        backgroundColor:selectedName ? "#ff8e02" : "blue",
        right:130
        }}>
           {/* <TouchableOpacity onPress={() => props.navigation.navigate('Check',{data:'TheBalvenie'})}></TouchableOpacity> */}
          <TouchableOpacity onPress={() =>setSelectedName(!selectedName)}>
        <Text style={{
          color:selectedName ? '#FFF' : '#FFF',
          marginLeft:8,
          right:5,
          height:24
          }}>TheBalvenie</Text>
          </TouchableOpacity>
      </View>
     
      <View style={{
        width:119,
        height:25,
        borderRadius:20,
        margin:4,
        justifyContent:'center',
        marginTop:50,
        //borderColor:"#3862f8",
        //borderWidth:2,
        alignItems:"center",
        backgroundColor:selected ? "#ff8e02" : "blue",
        right:45,
        }}>
           <TouchableOpacity onPress={() =>setSelected(!selected)}>
        <Text style={{
          color:selected ? '#FFF' : '#FFF',
          marginLeft:8,
          right:5,
          height:24
          }}> TullamureD.E.W</Text>
          </TouchableOpacity>
      </View>

      <View style={{
        width:65,
        height:25,
        height:24 ,
        borderRadius:20,
        margin:4,
        justifyContent:'center',
        marginTop:50,
        //borderColor:"#3862f8",
       // borderWidth:2,
        alignItems:"center",
        backgroundColor:selectedId ? "#ff8e02" : "blue",
        left:35,
        }}>
          <TouchableOpacity onPress={() =>setSelectedId(!selectedId)}>
        <Text style={{
          color:selectedId ? '#FFF' : '#FFF',
          marginLeft:8,
          right:5,
          height:24
          }}>Grant's</Text>
          </TouchableOpacity>
      </View>

      <View style={{
        width:105,
        height:25,
        height:24 ,
        borderRadius:20,
        margin:4,
        justifyContent:'center',
        marginTop:90,
       // borderColor:"#ebecef",
        //borderWidth:2,
        alignItems:"center",
        backgroundColor: selectedValue ? "#ff8e02" : "blue",
        left:10,
        }}>
          <TouchableOpacity onPress={() =>setSelectedValue(!selectedValue)}>
        <Text style={{
          color:selectedValue ? '#FFF' : '#FFF',
          marginLeft:8,
          right:5,
          height:24
          }}>Glenfiddich</Text>
          </TouchableOpacity>
      </View>

      <View style={{
        width:85,
        height:25,
        height:24 ,
        borderRadius:20,
        margin:4,
        justifyContent:'center',
        marginTop:90,
        // borderColor:"#ebecef",
        // borderWidth:2,
        alignItems:"center",
        backgroundColor:select ? "#ff8e02" : "blue",
        right:200
        }}>
           <TouchableOpacity onPress={() =>setSelect(!select)}>
        <Text style={{
          color:selectedName ? '#FFF' : '#FFF',
          marginLeft:8,
          right:5,
          height:24
          }}>sailorjerry</Text>
          </TouchableOpacity>
      </View>

      <View style={{
        width:85,
        height:25,
        height:24 ,
        borderRadius:20,
        margin:4,
        justifyContent:'center',
        marginTop:90,
        // borderColor:"#ebecef",
        // borderWidth:2,
        alignItems:"center",
        backgroundColor:selectedused ? "#ff8e02" : "blue",
        right:115
        }}>
            <TouchableOpacity onPress={() =>setSelectedUsed(!selectedused)}>
        <Text style={{
          color:selectedused ? '#FFF' : '#FFF',
          marginLeft:8,
          right:5,
          height:24
          }}>Drambuie</Text>
          </TouchableOpacity>
      </View>

      <View style={{
        width:125,
        height:25,
        height:24 ,
        borderRadius:20,
        margin:4,
        justifyContent:'center',
        marginTop:130,
        // borderColor:"#3862f8",
        // borderWidth:2,
        alignItems:"center",
        backgroundColor:selectedusedname ? "#ff8e02" : "blue",
        right:215
        }}>
          <TouchableOpacity onPress={() =>setSelectedUsedName(!selectedusedname)}>
        <Text style={{
          color:selectedusedname ? '#FFF' : '#FFF',
          marginLeft:8,
          right:5,
          height:24
          }}>monkeyShoulder</Text>
          </TouchableOpacity>
      </View>
     
    </View>
    
    
    </View>



          {/* <View>
            <Text style={{ ...styles.type, color: themecolor.TXTWHITE }}>
              Case type
            </Text>
          </View> */}
          {/* <View
            style={{
              ...styles.textContainerr,
              backgroundColor: themecolor.BOXTHEMECOLOR,
              borderColor: themecolor.BOXBORDERCOLOR1,
            }}>
            <Picker
              mode="dropdown"
              style={{ width: '100%', color: themecolor.TXTWHITE }}
              selectedValue={casetype}
              itemStyle={{ height: 20, width: '100%' }}
              onValueChange={item => {
                setCasetype(item);
              }}>
              {showcaselist()}
            </Picker>
          </View> */}
        </View>
        <View style={{ height: 10 }} />
        <View style={styles.typem}>

          

    <View style={{
      backgroundColor:"#FFF",
      marginTop:0,
      borderRadius:10,
      height:100,
      width:330,
      left:0,
      bottom:10
      }}>
    <View >
        <Text style={{color:'#000',left:20,marginTop:20}}>
          2.Does our showcase placed at first counter?
        </Text>
      </View>
    <View>
     
     <View style={{left:20}}>
   
    <TouchableOpacity onPress={() => setRadioButton("Yes")}>
     <Text style={{color:"#000",marginTop:10}}>
       <Ionicons name={RadioButton === "Yes" ? "radio-button-on" : "radio-button-off" } size={18} color="blue" /> 
      Yes
     </Text>
     </TouchableOpacity>
    
   <TouchableOpacity onPress={() => setRadioButton("No")}>
    <Text style={{color:"#000"}}>
      <Ionicons name={RadioButton === "No" ? "radio-button-on" : "radio-button-off"} size={18} color="blue" />
      No
    </Text>
   </TouchableOpacity> 


    </View>
    
    </View>
        
    </View>

    

        <View style={{ height: 10 }} />
        <View style={styles.typem}>

        <View >
        <Text style={{color:'#000',left:0,marginTop:0,bottom:20}}>
        <SetReminder/>
        </Text>
      </View>
      </View>
      

          {/* <View>
            <Text style={{ ...styles.type, color: themecolor.TXTWHITE }}>
              Reporting on behalf of
            </Text>
          </View>  */}
           {/* <View
            style={{
              ...styles.textContainerr,
              backgroundColor: themecolor.BOXTHEMECOLOR,
              borderColor: themecolor.BOXBORDERCOLOR1,
            }}>
            <Picker
              mode="dropdown"
              style={{ width: '100%', color: themecolor.TXTWHITE }}
              selectedValue={outlet}
              itemStyle={{ height: 20, width: '100%' }}
              onValueChange={item => {
                setOutlet(item);
              }}>
              {showoutletlist()}
            </Picker>
          </View> */}
          
        </View> 

        

        <View style={{ height: 5 }} />
        <View style={styles.typem}>
        <View style={{
      backgroundColor:"#FFF",
      marginTop:0,
      borderRadius:10,
      height:100,
      width:330,
      left:0,
      bottom:25
      }}>
          <View>
            <Text style={{ ...styles.type, color:"#000", left:10 }}>
            3.Upload first counter showcase photograph
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
                backgroundColor: themecolor.BOXTHEMECOLOR,
              }}
              onPress={() => {
                refRBSheet1.current.open();
              }}>
              <FIcon name="camera" size={18} color={'grey'} />
            </TouchableOpacity>
          </View>
          {/* <Text style={{ fontSize: FontSize.small, color: themecolor.TXTWHITE }}>
            Only JPEG & PNG file types are allowed
          </Text> */}
        </View>
        </View>
        <View style={{ height: 5 }} />
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
            {/* <TextInput
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
                color:"#000",
                // minHeight:40,
                // height:'auto'
              }}
            /> */}

<TextInput
        style={{color:"#000"}}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="useless placeholder"
        keyboardType="numeric"
      />
          
           
            
          </View>
          {/* <SetReminder/> */}
        </View>
        
        <View style={{ height: 10 }} />
        {/* <CheckSubmit/> */}
      </View>
     
          </ScrollView>
          <View style={{bottom:30}}>
          <CheckSubmit/>
          </View>   
        {/* <FullsizeButton
          height={45}
          backgroundColor={themecolor.HEADERTHEMECOLOR}
          width={width * 0.92}
          onPress={() => onsubmit()}
        />  */}
         
        

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
      
    </View>

  );
};

export default Checklist;
