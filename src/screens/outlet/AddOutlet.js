import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  FlatList,
  ScrollView,
  TextInput,
  BackHandler,
} from 'react-native';
import StyleCss from '../../assets/css/styleOutlet';
import { Colors } from '../../assets/config/Colors';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import config from '../../../config';
import {
  getOutLatesTypes,
  postCreateOutlet,
} from '../../repository/outlet/OutletRepositoy';
import OTPModal from '../../components/shared/OTPModel';
import VerifyModel from '../../components/shared/VerifyModel';
import { getUserDistributor } from '../../repository/outlet/OutletRepositoy';
import { getEmployeeBeats } from '../../repository/outlet/OutletRepositoy';
import { RadioButton } from 'react-native-paper';
import { useToast } from 'react-native-toast-notifications';
import { useSelector } from 'react-redux';
import { store } from '../../../App';
import {
  createOTPRequest,
  getTerritory_id,
} from '../../repository/commonRepository';
import CustomMapAutoComplete from '../../assets/css/shared/CustomMapAutoComplete';
import DummyImage from '../../components/shared/DummyImage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { gettripLocationApi } from '../../repository/trip/tripRepository';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import Ionicons from 'react-native-vector-icons/Ionicons';


const { GOOGLE_KEY } = config;
const haversine = require('haversine');

//Stepper one render
function RenderRow({
  item,
  setOutletTypeId,
  refresh,
  setRefresh,
  setOutletType,
  outletType,
  outletTypeId,
}) {
  const onPressAction = rowItem => {
    console.log('List Item was Selected', rowItem.OutlettypeId);
    // console.dir(rowItem)
    setOutletType(rowItem.OutlettypeId);
    setOutletTypeId(rowItem.OutlettypeId);
    setRefresh(!refresh);
  };

  const isSelectedUser = outletType === item.OutlettypeId;
  const tickStyle = isSelectedUser ? StyleCss.visibletick : StyleCss.hiddentick;
  const imageStyle = isSelectedUser
    ? StyleCss.selectedImage
    : StyleCss.unSelectedImage;
  const textStyle = isSelectedUser
    ? StyleCss.selectedText
    : StyleCss.unSelectedText;

  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()

  return (
    <TouchableOpacity
      key={item.OutlettypeId}
      style={{ ...StyleCss.flatliststyle, backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR1, borderWidth: 0.5 }}
      onPress={() => onPressAction(item)}>
      <View style={{ ...StyleCss.SteperOneView, }}>
        {/* <Image resizeMode='center'source={require('../../assets/images/expesne/receipt.jpg')} 
          style={imageStyle} /> */}
        {/* <DummyImage width={100} height={100} style={imageStyle} /> */}
        <Image source={require('../../assets/images/store.png')} height={100} style={imageStyle} />
      </View>
      <Text style={{ ...textStyle, color: themecolor.TXTWHITE }}>{item.OutlettypeName}</Text>
      <View style={tickStyle}>
        <Image
          source={require('../../assets/images/addoutlet/tick.png')}
          style={StyleCss.TickImage}
        />
      </View>
    </TouchableOpacity>
  );
}

// Stepper 4 HOC
function ItemCheked({ item, checked, setChecked, themecolor }) {
  const outletBeatsRedux = useSelector(state => state.outletBeats);
  const outletBeatsReduxValue = Object.values(outletBeatsRedux);

  const handleRadioBox = () => {
    if (outletBeatsReduxValue.includes(item.BeatId)) {
      store.dispatch({ type: 'ADD_OUTLET_BEATS_BY_ID', payload: item.BeatId });
    } else {
      store.dispatch({
        type: 'ADD_OUTLET_BEATS',
        payload: [item.BeatId, item.BeatId],
      });
    }
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => handleRadioBox()}
        activeOpacity={0.5}
        style={{ ...StyleCss.TouchView, backgroundColor: themecolor.THEMECOLOR }}>
        <View style={StyleCss.RV}>
          <RadioButton
            color={'#3962F8'}
            uncheckedColor={Colors.grey}
            status={
              outletBeatsReduxValue.includes(item.BeatId)
                ? 'checked'
                : 'unchecked'
            }
            onPress={() => handleRadioBox()}
          />
        </View>
        <View style={{ ...StyleCss.StepView2, backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR1 }}>
          <Text style={{ ...StyleCss.StepViewTextFour, color: themecolor.TXTWHITE }}>{item.BeatName}</Text>
          <Text style={StyleCss.StepViewTextFour2}>
            {item.BeatOutletss.length} outlets mapped
          </Text>
        </View>
      </TouchableOpacity>
    </>
  );
}

//Main Component function
export default function AddOutlet(props) {
  const modes = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(modes).getThemeColor()
  const toast = useToast();
  const navigation = useNavigation();
  const outletBeatsRedux = useSelector(state => state.outletBeats);
  const outletBeatsReduxValue = Object.values(outletBeatsRedux);
  console.log('outletBeatsReduxValue.length', outletBeatsReduxValue.length);
  //*********************** Stepper one State ******************************** ******************
  const [outLatesTypes, setOutLatesTypes] = useState([]);
  const [Classifications, setClassifications] = useState([]);
  const [outletType, setOutletType] = useState('null');
  const [refresh, setRefresh] = useState(false);
  const [outletTypeId, setOutletTypeId] = useState('');
  const [outletId, setOutletId] = useState('');
  const [address, setAddress] = React.useState('');
  const [latitude, setLatitude] = React.useState('');
  const [longitude, setLongitude] = React.useState('');

  console.log('adrrsss +++++++++++++++', address);
  console.log('Latitude,Longitude in Add Outlet-->', latitude, longitude);

  const getAllClassification = async () => {
    let res = await gettripLocationApi('api/getClassifications');
    if (res.statusCode == 200) {
      setClassifications(res.data);
    }
  };

  React.useEffect(() => {
    getOutletTypesData();
    getAllClassification();
  }, []);

  const getOutletTypesData = async () => {
    let res = await getOutLatesTypes();
    console.log('res in Steper one Outlates...', res);
    setOutLatesTypes(res.data);
  };

  //*********************** Stepper one State End ******************************** ******************

  // ***********************Stepper Two States Start **************************************
  /**
   *
   * Child Coponent States
   */

  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [mode, setMode] = useState('date');
  const [mode1, setMode1] = useState('date');
  const [mode2, setMode2] = useState('date');
  const [selected, setSelected] = useState('1');
  /****
   * C
   *  Child Coponent State End*/

  const [outletName, setOutletName] = useState('');
  const [outletCode, setOutletCode] = useState('');
  const [outletSalutation, setOutletSalutation] = useState('MR.');
  const [outletOpeningDate, setOutletOpeningDate] = useState(new Date());
  const [outletContactFirstName, setOutletContactFirstName] = useState('');
  const [outletContactLastName, setOutletContactLastName] = useState('');
  const [outletContactName, setOutletContactName] = useState('');
  const [outletClassification, setOutletClassification] = useState('');
  const [outletContactNo, setOutletContactNo] = useState('');
  const [outletLandlineNo, setOutletLandlineNo] = useState('');
  const [outletAltContactNo, setOutletAltContactNo] = useState('');
  const [outletAltLandlineNo, setOutletAltLandlineNo] = useState('');
  const [outletAddress, setOutletAddress] = useState('');
  const [outletStreetName, setOutletStreetName] = useState('');
  const [outletCity, setOutletCity] = useState('');
  const [outletState, setOutletState] = useState('');
  const [outletCountry, setOutletCountry] = useState('');
  const [outletCounty, setOutletCounty] = useState('');
  const [outletPincode, setOutletPincode] = useState('');
  const [outletEmail, setOutletEmail] = useState('');
  const [outletContactBday, setOutletContactBday] = useState(new Date());
  const [outletContactAnniversary, setOutletContactAnniversary] = useState(
    new Date(),
  );

  console.log("outletContactAnniversary========>", outletContactAnniversary)
  const [outletGPS, setOutletGPS] = useState('');
  const [territoryId, setTerritoryId] = useState('');
  const [outletStatus, setOutletStatus] = useState('');
  const [OTPRequestId, setOTPRequestId] = useState('');
  const [date01, setDate01] = useState(
    'Select'
  );

  // Outlet Opening Date functions Start
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || outletOpeningDate;
    setShow(false);
    setOutletOpeningDate(currentDate);
  };
  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };
  const showDatepicker = () => {
    setShow(true);
    showMode('date');
  };
  // Outlet Opening Date functions End

  // Birth Date functions Start
  const onChange1 = (event, selectedDate) => {
    const currentDate = selectedDate || outletContactBday;
    setShow1(false);
    setOutletContactBday(currentDate);
  };
  const showMode1 = currentMode => {
    setShow1(true);
    setMode1(currentMode);
  };
  const showDatepicker1 = () => {
    setShow1(true);
    showMode1('date');
  };
  // Birth Date functions End

  // Anniversary Date functions Start
  const onChange2 = ({ type }, selectedDate) => {
    setShow2(false);
    const currentDate = selectedDate || outletContactAnniversary;
    if (type == 'dismissed') {
      setDate01('Select')
    } else {
      setOutletContactAnniversary(currentDate);
      setDate01(currentDate.toUTCString()
        .substring(0, 16));
      //  alert(JSON.stringify(event))
    }
  };
  // alert(date01+'    '+outletContactAnniversary)
  const showMode2 = currentMode => {
    setShow2(true);
    setMode2(currentMode);
  };
  const showDatepicker2 = () => {
    setShow2(true);
    showMode2('date');
  };
  // Birth Date functions End

  //*********** */ Stepper Two States End *****************************************************

  /************************ Stepper Three Start *******************************************/
  const [userDistributorList, setUserDistributorList] = useState([]);

  const [parentId, setParentId] = useState('');

  const handletick = item => {
    setParentId(item.Id);
  };

  function RenderContent({ item }) {
    const [endLat, setEndLat] = useState();
    const [endLng, setEndLng] = useState();

    React.useEffect(() => {
      try {
        setEndLat(item.OutletGps.split(',')[0]);
        setEndLng(item.OutletGps.split(',')[1]);
      } catch (e) { }
    }, []);
    // str.replace(/^"|"$/g, '')
    // console.log("item===>", item)
    // console.log("end Latitude-->", item.OutletGps.split(",")[0].trim())
    // console.log("endLongitude-->", item.OutletGps.split(",")[1].trim())

    const start = {
      latitude: 30.849635,
      longitude: -83.24559,
    };

    const end = {
      latitude: 27.950575,
      longitude: -82.457178,
    };

    try {
      if (
        latitude != '' &&
        longitude != '' &&
        item.OutletGps.split(',')[0] != '' &&
        item.OutletGps.split(',')[0] != ''
      ) {
        start.latitude = latitude;
        start.longitude = longitude;
        //  end.latitude = item.OutletGps.split(",")[0].trim();
        end.latitude = endLat;
        end.longitude = endLng;
        //  end.longitude = item.OutletGps.split(",")[0].trim();
      } else {
        start.latitude = '';
        start.longitude = '';
        end.latitude = '';
        end.longitude = '';
      }
    } catch (e) {
      start.latitude = '';
      start.longitude = '';
      end.latitude = '';
      end.longitude = '';
    }

    console.log('Start ====>===>', start);
    console.log('End ====>===>', end);

    var distance = '';
    try {
      distance = `${Math.round(haversine(start, end, { unit: 'km' }))}Km Away`;
      console.log('distance-===>', distance);
      if (distance === '0Km Away') {
        distance = '';
      }
    } catch (e) {
      distance = '';
    }

    console.log(haversine(start, end));
    console.log(haversine(start, end, { unit: 'mile' }));
    console.log(Math.round(haversine(start, end, { unit: 'km' })));
    console.log(haversine(start, end, { unit: 'meter' }));
    console.log(haversine(start, end, { threshold: 1 }));
    console.log(haversine(start, end, { threshold: 1, unit: 'mile' }));
    console.log(haversine(start, end, { threshold: 1, unit: 'meter' }));

    // getDistance()

    const isSelectedUser = parentId === item.Id;
    const tickStyle = isSelectedUser
      ? StyleCss.visibletick
      : StyleCss.hiddentick;
    const imageStyle = isSelectedUser
      ? StyleCss.selectedImage
      : StyleCss.unSelectedImage;
    const textStyle = isSelectedUser
      ? StyleCss.selectedText
      : StyleCss.unSelectedText;
    return (
      <TouchableOpacity
        key={item.Id}
        style={{ ...StyleCss.flatliststyle, backgroundColor: themecolor.BOXTHEMECOLOR, borderWidth: 0.5, borderColor: themecolor.BOXBORDERCOLOR1 }}
        onPress={() => handletick(item)}>
        <View style={StyleCss.StepThreeView}>
          <DummyImage width={100} height={100} style={{ ...imageStyle }} />
          {/* <Image source={require('../../assets/images/expesne/receipt.jpg')} resizeMode='center'  style={imageStyle} /> */}
        </View>
        <Text style={{ ...textStyle, color: themecolor.TXTWHITE }}>{item.OutletName}</Text>

        <Text style={{ ...textStyle, fontSize: 11, fontWeight: '600', color: themecolor.TXTWHITE }}>
          {distance}
        </Text>

        <View style={tickStyle}>
          <Image
            source={require('../../assets/images/addoutlet/tick.png')}
            style={StyleCss.TickImage}
          />
        </View>
      </TouchableOpacity>
      // null
    );
  }
  /************************ Stepper Three End *******************************************/

  /************************ Stepper four Start *********************************************/
  const [employeeBeatsList, setEmployeeBeatsList] = useState([]);
  const [checked, setChecked] = React.useState('first');

  const EmployeeBeats = async () => {
    var res = await getEmployeeBeats();
    console.log('getEmployee Beats Steper Four.........👀✔:', res);
    setEmployeeBeatsList(res.data);
  };

  React.useEffect(() => {
    EmployeeBeats();
  }, []);
  /************************ Stepper four End ***********************************************/

  console.log('props.....in Add outlet', props);
  const [btnbox, setBtnbox] = useState();
  const [titleone, setTitleone] = useState('Add retailer/customer');
  const [titletwo, setTitletwo] = useState('Select retailer/customer type');
  const [num, setNum] = useState(1);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [otp, setOTP] = useState('');

  const pressprevious = (num, t1, t2) => {
    setNum(num);
    setTitleone(t1);
    setTitletwo(t2);
  };

  console.log('outletTypeId....', outletTypeId);

  const pressnext = async (num, t1, t2) => {
    const reg = /(.+)@(.+){2,}\.(.+){2,}/;
    console.log(
      `num--->${num} && outletTypeId--->${outletTypeId} parentId--->${parentId}`,
    );
    setRefresh(!refresh);
    if (num == 2 && outletTypeId === '') {
      toast.show('Please choose retailer/customer type.', {
        type: 'warning',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
    } else if (num === 3) {
      console.log('outletCountry--------------------------', outletCountry);
      if (
        outletName === '' &&
        outletContactFirstName === '' &&
        outletContactLastName === '' &&
        outletContactNo === '' &&
        address === '' &&
        outletStreetName === '' &&
        outletState == '' &&
        outletCountry == '' &&
        outletPincode === ''
      ) {
        toast.show('Please fill all the fields.', {
          type: 'danger',
          placement: 'bottom',
          duration: 3000,
          offset: 30,
          animationType: 'slide-in',
        });
      } else if (outletClassification === '') {
        toast.show('Please choose classification.', {
          type: 'danger',
          placement: 'bottom',
          duration: 3000,
          offset: 30,
          animationType: 'slide-in',
        });
      } else if (outletCountry == '') {
        toast.show('Please fill all the fields.', {
          type: 'danger',
          placement: 'bottom',
          duration: 3000,
          offset: 30,
          animationType: 'slide-in',
        });
      } else if (outletPincode.length < 6) {
        toast.show('Please enter valid Zip Code.', {
          type: 'danger',
          placement: 'bottom',
          duration: 3000,
          offset: 30,
          animationType: 'slide-in',
        });
      } else if (outletContactNo.length < 10) {
        toast.show('Please enter valid mobile number.', {
          type: 'danger',
          placement: 'bottom',
          duration: 3000,
          offset: 30,
          animationType: 'slide-in',
        });
      } else if (outletContactFirstName.length < 3) {
        toast.show('First name must contain atleast three characters.', {
          type: 'warning',
          placement: 'bottom',
          duration: 3000,
          offset: 30,
          animationType: 'slide-in',
        });
      }
      // else if (reg.test(outletEmail) === false) {
      //   toast.show('Please enter valid email address.', {
      //     type: 'warning',
      //     placement: 'bottom',
      //     duration: 3000,
      //     offset: 30,
      //     animationType: 'slide-in',
      //   });
      // }
      else {
        var data = await getUserDistributor(outletTypeId);
        console.log('User Distributor Steper Three.........👀✔:', data);
        setNum(num);
        setTitleone(t1);
        setTitletwo(t2);
        setUserDistributorList(data.data);
      }
    } else if (num === 4 && parentId === '') {
      toast.show('Please choose warehouse/distributor.', {
        type: 'warning',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
    } else {
      setNum(num);
      setTitleone(t1);
      setTitletwo(t2);
    }
  };

  function handleBackButtonClick() {
    // BackHandler.exitApp(); //When want to Exit the app
    // Do Whatever you want to do on back button click
    // Return true to stop default back navigaton
    // Return false to keep default back navigaton
    // store.dispatch({ type: 'REMOVE_PRODUCT_FILTER' });
    // store.dispatch({ type: 'REMOVE_ALL_PRODUCT_FILTER' });
    // store.dispatch({ type: 'REMOVE_PRODUCT_FILTER_1' });

    if (num == 1) {
      7;
      navigation.reset({
        index: 0,
        routes: [{ name: 'NewDashboard' }],
      });
    } else if (num == 2) {
      setNum(1);
    } else if (num == 3) {
      setNum(2);
    } else if (num == 4) {
      setNum(3);
    }

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
    }, [num]),
  );

  const handleVerifyRetailer = async () => {
    if (outletBeatsReduxValue.length > 0) {
      setModalVisible1(!modalVisible1);
      let res = await createOTPRequest('+91', outletContactNo, 'create outlet');
      console.log('response in Add outlet Line 947--->', res);
      setOTPRequestId(res.data.OtpRequestId);
      // setOTPRequestId(2);
    } else {
      toast.show('Please choose route.', {
        type: 'warning',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
    }
  };

  const onPressFunction = async () => {
    // alert("Model Subit Clicked..")
    var territoryid = await getTerritory_id();
    var beatIDS = '';
    beatIDS = outletBeatsReduxValue
      .map(item => {
        return item;
      })
      .join(',');

    console.log('beat IDS Line 399--->', beatIDS);

    let body = {
      outlet_name: outletName,
      outlet_code: outletCode,
      outlet_salutation: outletSalutation,
      outlet_opening_date: outletOpeningDate,
      outlet_contact_name: `${outletContactFirstName} ${outletContactLastName}`,
      outlet_classification_id: outletClassification,
      outlet_contact_no: outletContactNo,
      outlet_landlineno: outletLandlineNo,
      outlet_alt_contact_no: outletAltContactNo,
      outlet_alt_landlineno: outletAltLandlineNo,
      outlet_address: address,
      outlet_street_name: outletStreetName,
      outlet_city: outletCity,
      outlet_state: outletState,
      outlet_country: outletCountry,
      outlet_pincode: outletPincode,
      outlet_email: outletEmail,
      outlet_contact_bday: outletContactBday,
      // "outlet_contact_bday": outletContactBday,
      outlet_contact_anniversary: date01 == 'Select' ? '' : outletContactAnniversary,
      // "outlet_contact_anniversary": outletContactAnniversary,
      outlet_gps: `${latitude},${longitude}`,
      territory_id: territoryid,
      outlet_type_id: outletTypeId,
      parent_outlet_id: parentId,
      beats_id: beatIDS,
      otp_request_id: OTPRequestId,
    };
    console.log('Create Outlet Body...Step Two.........🤞:', body);
    try {
      let res = await postCreateOutlet(body);
      console.log('res in create Outlet screen AddOutlet Line 433--->', res);
      if (res.statusCode == 200) {
        if (res.statusCode == 200) {
          setModalVisible2(true);
        }
      } else {
        alert('Something went,wrong please try again later.');
      }
    } catch (e) {
      console.log('Error in Catch in AddOutlet Line 582===', e);
    }
  };

  return (
    <View style={{ ...StyleCss.FLexOne, backgroundColor: themecolor.THEMECOLOR }}>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      <View style={{ ...StyleCss.ReturnMainVIew, backgroundColor: themecolor.HEADERTHEMECOLOR }}>
        <View style={StyleCss.ReturnSecondView}>
          <View style={StyleCss.FLex85}>
            <TouchableOpacity
              style={StyleCss.MarginL8}
              activeOpacity={0.5}
              onPress={() => handleBackButtonClick()}>
              <Image
                source={require('../../assets/images/back.png')}
                style={StyleCss.BackArrow1}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
            <View style={StyleCss.MarginL10}>
              <Text style={{ ...StyleCss.TitleOne, }}>{titleone}</Text>
              <Text style={StyleCss.TitleTwo}>{titletwo}</Text>
            </View>
          </View>
          <View style={StyleCss.Flex15}>
            <Text style={StyleCss.NumberChange}>{`${num}/4`}</Text>
          </View>
        </View>
      </View>
      <View style={StyleCss.Flex08}>
        {/* {box} */}

        {/* If Step == 1  Start*/}
        {num == 1 ? (
          <View style={{ ...StyleCss.StepOneFlatList, backgroundColor: themecolor.THEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR1 }}>
            <View style={StyleCss.MT}>
              <FlatList
                data={outLatesTypes}
                keyExtractor={item => item.OutlettypeId}
                numColumns={2}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <RenderRow
                    item={item}
                    setOutletTypeId={setOutletTypeId}
                    refresh={refresh}
                    setRefresh={setRefresh}
                    setOutletType={setOutletType}
                    outletType={outletType}
                    outletTypeId={outletTypeId}
                  />
                )}
              />
            </View>
          </View>
        ) : (
          <></>
        )}
        {/* If Step == 1  End*/}

        {/* If Step == 2  Start*/}
        {num == 2 ? (
          <>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{ ...StyleCss.StepOneFlatList, backgroundColor: themecolor.THEMECOLOR }}>
                <View style={{ ...StyleCss.StepTwoView, }}>
                  <Text style={{ ...StyleCss.StepTwoText, color: themecolor.TXTWHITE }}>Outlet Name</Text>
                  <View style={{ ...StyleCss.StepTwoText2, backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR1 }}>
                    <TextInput
                      placeholderTextColor={'black'}
                      style={{ ...StyleCss.StepTwoTextInput, color: themecolor.TXTWHITE }}
                      value={outletName}
                      onChangeText={txt => setOutletName(txt)}
                    />
                  </View>
                </View>
                <View style={StyleCss.ViewWidth93}>
                  <View style={StyleCss.FlexRow}>
                    <View style={StyleCss.FLEX051}>
                      <Text style={{ ...StyleCss.SalutationText, color: themecolor.TXTWHITE, }}>Salutation</Text>
                    </View>
                    <View style={StyleCss.Flex050}>
                      <Text style={{ ...StyleCss.SalutationText, color: themecolor.TXTWHITE }}>Opening date</Text>
                    </View>
                  </View>

                  <View style={StyleCss.MRMRSText}>
                    <View style={StyleCss.MRVIEW}>
                      <TouchableOpacity
                        onPress={() => {
                          setSelected('1');
                          setOutletSalutation('MR.');
                        }}
                        style={{
                          ...StyleCss.genderView,
                          borderColor: themecolor.BOXBORDERCOLOR1,
                          backgroundColor:
                            selected == '1' ? themecolor.HEADERTHEMECOLOR : '#EBECEF',
                        }}>
                        <Text
                          style={{
                            color: selected == '1' ? 'white' : '#7C7C7D',
                          }}>
                          MR.
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          setSelected('2');
                          setOutletSalutation('MRS.');
                        }}
                        style={{
                          ...StyleCss.genderView,
                          borderColor: themecolor.BOXBORDERCOLOR1,
                          backgroundColor:
                            selected == '2' ? themecolor.HEADERTHEMECOLOR : '#EBECEF',
                        }}>
                        <Text
                          style={{
                            color: selected == '2' ? 'white' : '#7C7C7D',
                          }}>
                          MRS.
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          setSelected('3');
                          setOutletSalutation('DR.');
                        }}
                        style={{
                          ...StyleCss.genderView,
                          borderColor: themecolor.BOXBORDERCOLOR1,
                          backgroundColor:
                            selected == '3' ? themecolor.HEADERTHEMECOLOR : '#EBECEF',
                        }}>
                        <Text
                          style={{
                            color: selected == '3' ? 'white' : '#7C7C7D',
                          }}>
                          DR.
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <View style={{ ...StyleCss.textContainerV, backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR1 }}>
                      <TouchableOpacity onPress={() => showDatepicker()}>
                        <View style={{ ...StyleCss.DateInput, backgroundColor: themecolor.BOXTHEMECOLOR }}>
                          <TextInput
                            editable={false}
                            style={{...StyleCss.DateText,color:themecolor.TXTWHITE}}
                            labelStyle={StyleCss.DateLabel}
                            placeholder="Select Date"
                            value={outletOpeningDate
                              .toUTCString()
                              .substring(0, 16)}
                          />
                          {/* <Image
                            source={require('../../assets/images/addoutlet/calendar.png')}
                            resizeMode="center"
                            style={StyleCss.DateIcon}
                          /> */}
                          <Ionicons
                            name="calendar-sharp"
                            size={15}
                            color={themecolor.TXTWHITE}
                            style={{position: 'absolute', right: 10}}
                          />
                        </View>
                      </TouchableOpacity>

                      {show && (
                        <DateTimePicker
                          testID="dateTimePicker"
                          value={outletOpeningDate}
                          mode={mode}
                          is24Hour={false}
                          display="default"
                          onChange={onChange}
                        />
                      )}
                    </View>
                  </View>
                </View>
                <View style={StyleCss.ViewWidth93}>
                  <Text style={{ ...StyleCss.SalutationText, color: themecolor.TXTWHITE }}>Contact Person</Text>
                  <View style={StyleCss.View1}>
                    <View style={{ ...StyleCss.FirstView45, backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR1,  color: themecolor.TXTWHITE  }}>
                      <TextInput
                        placeholder="First name"
                        style={{ ...StyleCss.FIrstInputtext, color: themecolor.TXTWHITE }}
                        value={outletContactFirstName}
                        onChangeText={txt => setOutletContactFirstName(txt)}
                        placeholderTextColor={themecolor.TXTGREY}
                      />
                    </View>
                    <View style={{ ...StyleCss.FirstView45, backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR1 ,  color: themecolor.TXTWHITE }}>
                      <TextInput
                        placeholder="Last name"
                        style={{ ...StyleCss.FIrstInputtext, color: themecolor.TXTWHITE }}
                        value={outletContactLastName}
                        onChangeText={txt => setOutletContactLastName(txt)}
                        placeholderTextColor={themecolor.TXTGREY}
                      />
                    </View>
                  </View>
                </View>
                <View style={StyleCss.ViewRetailer}>
                  <View>
                    <Text style={{ ...StyleCss.SalutationText, color: themecolor.TXTWHITE }}>
                      Retailer Classification
                    </Text>
                  </View>
                  <View style={{ ...StyleCss.textContainer, backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR1 }}>
                    <Picker
                      mode="dialog"
                      style={StyleCss.WIDTH100}
                      selectedValue={outletClassification}
                      itemStyle={{ ...StyleCss.PicketItemStyle, backgroundColor: themecolor.BOXTHEMECOLOR, color: themecolor.BOXTHEMECOLOR }}
                      dropdownIconColor={themecolor.TXTWHITE}
                      onValueChange={item => {
                        setOutletClassification(item);
                      }}>
                      <Picker.Item
                        onVal
                        label="Select classification"
                        style={{ ...StyleCss.PIS, color: themecolor.TXTWHITE }}
                        value=""
                      />
                      {Classifications.map(item => {
                        return (
                          <Picker.Item
                            onVal
                            label={item.Classification}
                            style={{ ...StyleCss.PIS, color: themecolor.TXTWHITE }}
                            value={item.Id}
                          />
                        );
                      })}
                    </Picker>
                  </View>
                </View>

                <View style={StyleCss.StepTwoView}>
                  <Text style={{ ...StyleCss.SalutationText, color: themecolor.TXTWHITE }}>Mobile number</Text>
                  <View style={{ ...StyleCss.StepTwoText2, backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR1 }}>
                    <TextInput
                      keyboardType="numeric"
                      placeholderTextColor={'#444850'}
                      style={{ ...StyleCss.StepTwoTextInput, color: themecolor.TXTWHITE }}
                      value={outletContactNo}
                      maxLength={10}
                      onChangeText={txt => {
                        let temp = '';
                        temp = txt.replace(/[^0-9]/g, '');
                        if (temp.length === 0) {
                          setOutletContactNo('');
                        } else {
                          setOutletContactNo(temp);
                        }
                      }}
                    />
                  </View>
                </View>
                <View style={StyleCss.StepTwoView}>
                  <Text style={{ ...StyleCss.SalutationText, color: themecolor.TXTWHITE }}>Landline number</Text>
                  <View style={{ ...StyleCss.StepTwoText2, backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR1 }}>
                    <TextInput
                      placeholderTextColor={'#444850'}
                      style={{ ...StyleCss.StepTwoTextInput, color: themecolor.TXTWHITE }}
                      value={outletLandlineNo}
                      keyboardType="numeric"
                      maxLength={11}
                      onChangeText={txt => {
                        let temp = '';
                        temp = txt.replace(/[^0-9]/g, '');
                        if (temp.length === 0) {
                          setOutletLandlineNo('');
                        } else {
                          setOutletLandlineNo(temp);
                        }
                      }}
                    />
                  </View>
                </View>
                <View style={StyleCss.StepTwoView}>
                  <Text style={{ ...StyleCss.SalutationText, color: themecolor.TXTWHITE }}>
                    Alternate contact number
                  </Text>
                  <View style={{ ...StyleCss.StepTwoText2, backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR1 }}>
                    <TextInput
                      placeholderTextColor={'#444850'}
                      style={{ ...StyleCss.StepTwoTextInput, color: themecolor.TXTWHITE }}
                      keyboardType="numeric"
                      value={outletAltContactNo}
                      maxLength={10}
                      onChangeText={txt => {
                        let temp = '';
                        temp = txt.replace(/[^0-9]/g, '');
                        if (temp.length === 0) {
                          setOutletAltContactNo('');
                        } else {
                          setOutletAltContactNo(temp);
                        }
                      }}
                    />
                  </View>
                </View>
                <View style={StyleCss.StepTwoView}>
                  <Text style={{ ...StyleCss.SalutationText, color: themecolor.TXTWHITE }}>
                    Landline/alternate number
                  </Text>
                  <View style={{ ...StyleCss.StepTwoText2, backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR1 }}>
                    <TextInput
                      placeholderTextColor={'#444850'}
                      style={{ ...StyleCss.StepTwoTextInput, color: themecolor.TXTWHITE }}
                      value={outletAltLandlineNo}
                      keyboardType="numeric"
                      maxLength={11}
                      onChangeText={txt => {
                        let temp = '';
                        temp = txt.replace(/[^0-9]/g, '');
                        if (temp.length === 0) {
                          setOutletAltLandlineNo('');
                        } else {
                          setOutletAltLandlineNo(temp);
                        }
                      }}
                    />
                  </View>
                </View>
                <View style={StyleCss.StepTwoView}>
                  <View style={StyleCss.FLEXSTART}>
                    <View>
                      <Text style={{ ...StyleCss.SalutationText, color: themecolor.TXTWHITE , }}>
                        Address
                      </Text>
                    </View>
                  </View>
                  <ScrollView>
                    <View style={{ ...StyleCss.MAPVIEW, borderColor: themecolor.BOXBORDERCOLOR1,  backgroundColor: themecolor.BOXTHEMECOLOR,}}>
                      <CustomMapAutoComplete
                        setAddress={setAddress}
                        setOutletCountry={setOutletCountry}
                        setOutletCity={setOutletCity}
                        setOutletState={setOutletState}
                        setOutletStreetName={setOutletStreetName}
                        setLatitude={setLatitude}
                        setLongitude={setLongitude}
                      />
                      <View style={{ ...StyleCss.MAPVIEW2, }}>
                        <Image
                          source={require('../../assets/images/addoutlet/map.png')}
                          resizeMode="center"
                          style={StyleCss.MAPIMAGE}
                        />
                        <Text style={StyleCss.MAPTEXT}>Map</Text>
                      </View>
                    </View>
                  </ScrollView>
                </View>
                <View style={{ ...StyleCss.StepTwoView, }}>
                  <Text style={{ ...StyleCss.SalutationText, color: themecolor.TXTWHITE }}>
                    House no. & street name
                  </Text>
                  <View style={{ ...StyleCss.StepTwoText2,color: themecolor.TXTWHITE, backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR1, borderWidth: 0.5 }}>
                    <TextInput
                      placeholderTextColor={'#444850'}
                      style={{...StyleCss.StepTwoTextInput, color: themecolor.TXTWHITE,}}
                      // value={outletStreetName}
                      value={address}
                      onChangeText={txt => setAddress(txt)}
                    />
                  </View>
                </View>
                <View style={StyleCss.StepTwoView}>
                  <Text style={{ ...StyleCss.SalutationText, color: themecolor.TXTWHITE }}>Village/town/city</Text>
                  <View style={{ ...StyleCss.StepTwoText2, borderColor: themecolor.BOXBORDERCOLOR1, borderWidth: 0.5, color: themecolor.TXTWHITE, backgroundColor: themecolor.BOXTHEMECOLOR, }}>
                    <TextInput
                      placeholderTextColor={'#444850'}
                      style={{...StyleCss.StepTwoTextInput,  color: themecolor.TXTWHITE,}}
                      value={outletCity}
                      onChangeText={txt => setOutletCity(txt)}
                      editable={false}
                    />
                  </View>
                </View>
                <View style={StyleCss.StepTwoView}>
                  <Text style={{ ...StyleCss.SalutationText, color: themecolor.TXTWHITE }}>State/province</Text>
                  <View style={{ ...StyleCss.StepTwoText2, borderColor: themecolor.BOXBORDERCOLOR1, borderWidth: 0.5 ,  backgroundColor: themecolor.BOXTHEMECOLOR,}}>
                    <TextInput
                      placeholderTextColor={'#444850'}
                      style={{...StyleCss.StepTwoTextInput, color: themecolor.TXTWHITE,}}
                      editable={false}
                      value={outletState}
                      onChangeText={txt => setOutletState(txt)}
                    />
                  </View>
                </View>
                <View style={StyleCss.StepTwoView}>
                  <Text style={{ ...StyleCss.SalutationText, color: themecolor.TXTWHITE }}>Region/country</Text>
                  <View style={{ ...StyleCss.StepTwoText2, borderColor: themecolor.BOXBORDERCOLOR1, borderWidth: 0.5,  backgroundColor: themecolor.BOXTHEMECOLOR, }}>
                    <TextInput
                      placeholderTextColor={'#444850'}
                      style={{...StyleCss.StepTwoTextInput, color: themecolor.TXTWHITE,}}
                      value={outletCountry}
                      editable={false}
                      onChangeText={txt => setOutletCountry(txt)}
                    />
                  </View>
                </View>
                <View style={StyleCss.StepTwoView}>
                  <Text style={{ ...StyleCss.SalutationText, color: themecolor.TXTWHITE }}>Zip code</Text>
                  <View style={{ ...StyleCss.StepTwoText2, backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR1 }}>
                    <TextInput
                      keyboardType="numeric"
                      maxLength={6}
                      placeholderTextColor={'#444850'}
                      style={{...StyleCss.StepTwoTextInput,  color: themecolor.TXTWHITE ,}}
                      value={outletPincode}
                      onChangeText={txt => {
                        let temp = '';
                        temp = txt.replace(/[^0-9]/g, '');
                        if (temp.length === 0) {
                          setOutletPincode('');
                        } else {
                          setOutletPincode(temp);
                        }
                      }}
                    />
                  </View>
                </View>
                <View style={StyleCss.StepTwoView}>
                  <Text style={{ ...StyleCss.SalutationText, color: themecolor.TXTWHITE }}>Email id</Text>
                  <View style={{ ...StyleCss.StepTwoText2, backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR1 }}>
                    <TextInput
                      placeholderTextColor={'#444850'}
                      style={{...StyleCss.StepTwoTextInput,  color: themecolor.TXTWHITE ,}}
                      value={outletEmail}
                      onChangeText={txt => setOutletEmail(txt)}
                    />
                  </View>
                </View>
                <View style={{ ...StyleCss.birthdate, }}>
                  <Text style={{ ...StyleCss.SalutationText, color: themecolor.TXTWHITE }}>Birthdate</Text>
                  <View style={{ ...StyleCss.textContainer, backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR1 }}>
                    <TouchableOpacity onPress={() => showDatepicker1()}>
                      <View style={{ ...StyleCss.DatePick, backgroundColor: themecolor.BOXTHEMECOLOR }}>
                        <TextInput
                          editable={false}
                          value={outletContactBday
                            .toUTCString()
                            .substring(0, 16)}
                          style={{ ...StyleCss.DatePickInput, color: themecolor.TXTWHITE }}
                          labelStyle={StyleCss.DateLabel}
                        />
                        {/* <Image
                          source={require('../../assets/images/addoutlet/calendar.png')}
                          resizeMode="center"
                          style={StyleCss.CalendarIcons}
                        /> */}
                        <Ionicons
                            name="calendar-sharp"
                            size={15}
                            color={themecolor.TXTWHITE}
                            style={{position: 'absolute', right: 10}}
                          />
                      </View>
                    </TouchableOpacity>

                    {show1 && (
                      <DateTimePicker
                        testID="dateTimePicker"
                        value={outletContactBday}
                        mode={mode1}
                        is24Hour={false}
                        display="default"
                        onChange={onChange1}
                      />
                    )}
                  </View>
                </View>
                <View style={StyleCss.birthdate}>
                  <Text style={{ ...StyleCss.SalutationText, color: themecolor.TXTWHITE }}>Anniversary</Text>
                  <View style={{ ...StyleCss.textContainer, backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR1 }}>
                    <TouchableOpacity onPress={showDatepicker2}>
                      <View style={{ ...StyleCss.DatePick, backgroundColor: themecolor.BOXTHEMECOLOR }}>
                        <TextInput
                          editable={false}
                          value={
                            // outletContactAnniversary
                            //   ()=>{
                            //   if(outletContactAnniversary != null){
                            // outletContactAnniversary
                            // .toUTCString()
                            // .substring(0, 16)
                            date01
                            //   }else{
                            //     `${new Date()}`
                            //   }
                            // }
                          }
                          style={{ ...StyleCss.DatePickInput, color: themecolor.TXTWHITE }}
                          labelStyle={StyleCss.DateLabel}
                        />
                        {/* <Image
                          source={require('../../assets/images/addoutlet/calendar.png')}
                          resizeMode="center"
                          style={StyleCss.CalendarIcons}
                        /> */}
                        <Ionicons
                            name="calendar-sharp"
                            size={15}
                            color={themecolor.TXTWHITE}
                            style={{position: 'absolute', right: 10}}
                          />
                      </View>
                    </TouchableOpacity>
                    {show2 && (
                      <DateTimePicker
                        testID="dateTimePicker"
                        value={outletContactAnniversary}
                        mode={mode2}
                        is24Hour={false}
                        display="default"
                        onChange={onChange2}
                      />
                    )}
                  </View>
                </View>
              </View>
            </ScrollView>
          </>
        ) : (
          <></>
        )}
        {/* If Step == 2  End*/}

        {/* If Step == 3  Start*/}
        {num == 3 ? (
          <View style={{ ...StyleCss.StepOneFlatList, backgroundColor: themecolor.THEMECOLOR }}>
            <View style={StyleCss.MT}>
              <FlatList
                data={userDistributorList}
                keyExtractor={item => item.id}
                numColumns={2}
                renderItem={({ item }) => <RenderContent item={item} />}
              />
            </View>
          </View>
        ) : (
          <></>
        )}
        {/* If Step == 3  End*/}

        {/* If Step == 4  Start*/}
        {num == 4 ? (
          <View style={{ ...StyleCss.StepFour, backgroundColor: themecolor.THEMECOLOR }}>
            <FlatList
              data={employeeBeatsList}
              renderItem={({ item }) => (
                <ItemCheked
                  item={item}
                  props={props}
                  checked={checked}
                  setChecked={setChecked}
                  themecolor={themecolor}
                />
              )}
              keyExtractor={item => item.BeatId}
            />
          </View>
        ) : (
          <></>
        )}
        {/* If Step == 4  End*/}
      </View>

      {/* Button Portion Start  */}

      {/* If Stepper One */}
      {num == 1 ? (
        <View style={StyleCss.Flex05}>
          <TouchableOpacity
            style={{ ...StyleCss.btn1, backgroundColor: themecolor.HEADERTHEMECOLOR }}
            onPress={() => {
              pressnext(2, 'Add retailer/customer', 'Enter details');
            }}>
            <Text style={StyleCss.BtnFun1NextButtonText}>Next</Text>
            <Image
              source={require('../../assets/images/addoutlet/next.png')}
              resizeMode="center"
              style={StyleCss.BtnFunRightArrow}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <></>
      )}

      {/* If stepper Two ***/}
      {num === 2 ? (
        <View style={{ ...StyleCss.BtnFunViewMain }}>
          <TouchableOpacity
            style={{ ...StyleCss.btn2, backgroundColor: themecolor.HEADERTHEMECOLOR }}
            onPress={() => {
              pressprevious(
                1,
                'Add retailer/customer',
                'Select retailer/Customer type',
              );
              handleBackButtonClick();
            }}>
            <Image
              source={require('../../assets/images/addoutlet/previous.png')}
              resizeMode="center"
              style={StyleCss.BtnFunRightArrowAlign}
            />
            <Text style={StyleCss.BtnFun1NextButtonText}>Previous</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ ...StyleCss.btn2, backgroundColor: themecolor.HEADERTHEMECOLOR }}
            onPress={() =>
              pressnext(3, 'Add Outlet', 'Map with warehouse and distributer')
            }>
            <Text style={StyleCss.BtnFun1NextButtonText}>Next</Text>
            <Image
              source={require('../../assets/images/addoutlet/next.png')}
              resizeMode="center"
              style={StyleCss.BtnFunRightArrow}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <></>
      )}

      {/* Steppr three */}
      {num === 3 ? (
        <View style={StyleCss.BtnFunViewMain}>
          <TouchableOpacity
            style={{ ...StyleCss.btn3, backgroundColor: themecolor.HEADERTHEMECOLOR }}
            onPress={() => {
              pressprevious(2, 'Add retailer/customer', 'Enter details');
              handleBackButtonClick();
            }}>
            <Image
              source={require('../../assets/images/addoutlet/previous.png')}
              resizeMode="center"
              style={StyleCss.BtnFunRightArrowAlign}
            />
            <Text style={StyleCss.BtnFun1NextButtonText}>Previous</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ ...StyleCss.btn3, backgroundColor: themecolor.HEADERTHEMECOLOR }}
            onPress={() => pressnext(4, 'Add Outlets', 'Map with route')}>
            <Text style={StyleCss.BtnFun1NextButtonText}>Next</Text>
            <Image
              source={require('../../assets/images/addoutlet/next.png')}
              resizeMode="center"
              style={StyleCss.BtnFunRightArrow}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <></>
      )}

      {/* Stepper Four  */}
      {num === 4 ? (
        <View style={StyleCss.BtnFunViewMain}>
          <TouchableOpacity
            style={{ ...StyleCss.btn4, backgroundColor: themecolor.HEADERTHEMECOLOR }}
            onPress={() => {
              pressprevious(
                3,
                'Add Outlet',
                'Map with warehouse and distributer',
              );
              handleBackButtonClick();
            }}>
            <Image
              source={require('../../assets/images/addoutlet/previous.png')}
              resizeMode="center"
              style={StyleCss.BtnFunRightArrowAlign}
            />
            <Text style={StyleCss.BtnFun1NextButtonText}>Previous</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ ...StyleCss.btn4second, backgroundColor: themecolor.HEADERTHEMECOLOR }}
            onPress={() => handleVerifyRetailer()}>
            <Text style={StyleCss.BtnFun1NextButtonText}>Verify Retailer</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <></>
      )}

      {/* Button Portion End */}

      {/*=============otp modal start=============== */}
      {modalVisible1 && (
        <OTPModal
          OTPRequestId={OTPRequestId}
          mobileNumber={outletContactNo}
          otp={otp}
          setOTP={setOTP}
          text="We have sent OTP to Retailer kindly enter below to create lead"
          setModalVisible1={setModalVisible1}
          setModalVisible2={setModalVisible2}
          onPressFunction={onPressFunction}
        />
      )}
      {/* {=====otp modal end==============} */}
      {/* VerifyModal Open */}
      {modalVisible2 && (
        <VerifyModel
          navigateTo="RetailerCustomer"
          navigateFrom="AddOutlet"
          title="Your request has been successfully submitted for approval"
        />
      )}
      {/* VerifyModal Close */}
    </View>
  );
}
