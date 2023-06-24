import {
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import HeaderWithPicker from '../../components/shared/HeaderWithPickerComponent';
import moment from 'moment';
import { gettripLocationApi } from '../../repository/trip/tripRepository';
import styles from '../../assets/css/stylesDashboard';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { FontFamily } from '../../assets/fonts/FontFamily';
import { Colors } from '../../assets/config/Colors';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import { Picker } from '@react-native-picker/picker';
import { Checkbox } from 'react-native-paper';
import styles1 from '../../assets/css/styleCreateTour';
import FullsizeButton from '../../components/shared/FullsizeButton';
import { store } from '../../../App';
import { postCreateTourApi } from '../../repository/createTour/createTourRepository';
import VerifyModel from '../../components/shared/VerifyModel';
import { useToast } from 'react-native-toast-notifications';
import LoaderAllInOne from '../../components/shared/Loader';


const { width, height } = Dimensions.get('window');

function RenderOutlets({
  item1,
  wholemonthDatesObj,
  themecolor,
  tpList,
  allBeats,
  allOutlets,
  setTempRefresh,
  tempRefresh,
  getAllBeatsObj,
  headingVal,
  checked,
  setChecked,
  TourRosterPlans,
}) {
  console.log('TOuRoasterPlans Line 93--->', TourRosterPlans);

  function formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  const handleChecked = itm => {
    console.log('HandleChecked Line 109===>', itm);
    setChecked(checked);
    var index = TourRosterPlans[headingVal].OutletIds.indexOf(
      `${itm.Outlets.Id}`,
    );
    var convertedArr = TourRosterPlans[headingVal].TpOutlets.split(',');
    convertedArr.splice(index, 1);
    console.log('index========>', index);

    var TpString =
      TourRosterPlans[headingVal].TpOutlets == ''
        ? itm.Outlets.OutletName
        : TourRosterPlans[headingVal].OutletIds.includes(`${itm.Outlets.Id}`)
          ? convertedArr.join(',')
          : TourRosterPlans[headingVal].TpOutlets + ', ' + itm.Outlets.OutletName;
    console.log('ITM_ON_CLICK_ROSTER_PLAN', itm);
    let obj = {
      TpId: wholemonthDatesObj[headingVal].TpId,
      TpDate: formatDate(headingVal),
      BeatId: null,
      BeatName: '',
      TpOutlets: TpString,
      OutletIds: `${itm.Outlets.Id}`,
      TpState: 'RosterPlan',
      TpRemark: TpString,
    };

    store.dispatch({
      type: 'ADD_TOUR_ROSTER_PLANS',
      payload: [headingVal, obj],
    });
  };

  var temporary = false;
  try {
    if (TourRosterPlans[headingVal].OutletIds.includes(`${item1.Outlets.Id}`)) {
      temporary = true;
    }
  } catch (e) {
    console.log('catch Line 350===>', e);
    temporary = false;
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        zIndex: 99999,
        alignItems: 'center',
      }}>
      <Checkbox
        value={checked}
        tintColors={{
          true: Colors.bluetheme,
          false: 'black',
        }}
        color={Colors.bluetheme}
        uncheckedColor={Colors.lightgrey}
        status={temporary ? 'checked' : 'unchecked'}
        onPress={() => handleChecked(item1)}
      />
      <TouchableOpacity style={{}} onPress={() => handleChecked(item1)}>
        <Text style={{ ...styles1.List, lineHeight: 30, color: themecolor.TXTWHITE, }}>
          {item1.Outlets.OutletName}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

// flatlist component

function RenderFunction({
  headingVal,
  wholemonthDatesObj,
  themecolor,
  tpList,
  allBeats,
  setTempRefresh,
  tempRefresh,
  getAllBeatsObj,
  allOutlets,
  setAllOutlets,
  allOutletsTemp,
}) {
  const TourRosterPlans = useSelector(state => state.TourRosterPlans);
  const RoasterPlans = useSelector(state => state.RoasterPlans);
  const [showModal, setShowModal] = useState(false);
  const [show, setShow] = useState(0);
  const [plandate, setPlandate] = useState('');
  const [activity, setActivity] = useState('UnPlanned');
  const [beatforshow, setBeatforShow] = React.useState('Select');
  const [selectedValue, setSelectedValue] = useState('');
  const [checked, setChecked] = useState(false);
  pickerName = React.useRef(null);
  console.log('ROster Plan from Redux ===>>', TourRosterPlans);

  React.useEffect(() => {
    try {
      // wholemonthDatesObj[headingVal].TpState != null
      if (wholemonthDatesObj[headingVal]) {
        //------>>>>> FieldWork
        if (wholemonthDatesObj[headingVal].TpState == 'FieldWork') {
          let obj = {
            TpId: wholemonthDatesObj[headingVal].TpId,
            TpDate: formatDate(headingVal),
            BeatId: wholemonthDatesObj[headingVal].BeatId,
            BeatName: wholemonthDatesObj[headingVal].BeatName,
            OutletIds: [],
            TpOutlets: '',
            TpState: wholemonthDatesObj[headingVal].TpState,
            TpRemark: wholemonthDatesObj[headingVal].TpRemark,
          };
          setBeatforShow(wholemonthDatesObj[headingVal].BeatName);
          setActivity(wholemonthDatesObj[headingVal].TpState);
          store.dispatch({
            type: 'ADD_TOUR_ROSTER_PLANS',
            payload: [headingVal, obj],
          });
          store.dispatch({
            type: 'ADD_ROSTER_PLANS_FINALE',
            payload: [headingVal, obj],
          });
        }
        //----->>>> RosterPlan
        else if (wholemonthDatesObj[headingVal].TpState == 'RosterPlan') {
          console.log(
            'wholemonthDatesObj[headingVal].TpState == ',
            wholemonthDatesObj[headingVal],
          );
          var a = wholemonthDatesObj[headingVal].OutletIds.split(',');
          console.log('a==>', a);
          let obj = {
            TpId: wholemonthDatesObj[headingVal].TpId,
            TpDate: formatDate(headingVal),
            BeatId: null,
            BeatName: wholemonthDatesObj[headingVal].BeatName,
            OutletIds: a,
            TpOutlets: wholemonthDatesObj[headingVal].TpOutlets,
            TpState: wholemonthDatesObj[headingVal].TpState,
            TpRemark: wholemonthDatesObj[headingVal].TpOutlets,
          };
          setBeatforShow(wholemonthDatesObj[headingVal].TpOutlets);
          setActivity(wholemonthDatesObj[headingVal].TpState);
          store.dispatch({
            type: 'ADD_TOUR_ROSTER_PLANS',
            payload: [headingVal, obj],
          });
          store.dispatch({
            type: 'ADD_ROSTER_PLANS_FINALE',
            payload: [headingVal, obj],
          });
        } else {
          console.log(
            '----------------------Else',
            wholemonthDatesObj[headingVal],
          );
          let obj = {
            TpId: wholemonthDatesObj[headingVal].TpId,
            TpDate: formatDate(headingVal),
            BeatId: null,
            BeatName: '',
            OutletIds: [],
            TpOutlets: wholemonthDatesObj[headingVal].TpOutlets,
            TpState:
              wholemonthDatesObj[headingVal].TpState == null
                ? ''
                : wholemonthDatesObj[headingVal].TpState,
            TpRemark: wholemonthDatesObj[headingVal].TpOutlets,
          };
          setBeatforShow(
            wholemonthDatesObj[headingVal].TpState != ''
              ? wholemonthDatesObj[headingVal].TpState
              : 'Select',
          );
          setActivity(wholemonthDatesObj[headingVal].TpState);
          store.dispatch({
            type: 'ADD_TOUR_ROSTER_PLANS',
            payload: [headingVal, obj],
          });
          store.dispatch({
            type: 'ADD_ROSTER_PLANS_FINALE',
            payload: [headingVal, obj],
          });
        }
      } else {
        let obj = {
          TpId: wholemonthDatesObj[headingVal].TpId,
          TpDate: formatDate(headingVal),
          BeatId: wholemonthDatesObj[headingVal].BeatId,
          BeatName: wholemonthDatesObj[headingVal].BeatName,
          OutletIds: [],
          TpOutlets: '',
          TpState: wholemonthDatesObj[headingVal].TpState,
          TpRemark: wholemonthDatesObj[headingVal].TpRemark,
        };
        setBeatforShow(wholemonthDatesObj[headingVal].BeatName);
        setActivity(wholemonthDatesObj[headingVal].TpState);
        store.dispatch({
          type: 'ADD_TOUR_ROSTER_PLANS',
          payload: [headingVal, obj],
        });
        store.dispatch({
          type: 'ADD_ROSTER_PLANS_FINALE',
          payload: [headingVal, obj],
        });
      }
    } catch (e) {
      //End of try
      // alert(e)
      console.log('Error', e);
    }
  }, [wholemonthDatesObj, headingVal]);

  React.useEffect(() => {
    try {
      if (RoasterPlans[headingVal].TpState == 'FieldWork') {
        setBeatforShow(RoasterPlans[headingVal].BeatName);
        setSelectedValue(RoasterPlans[headingVal].BeatId);
      } else if (RoasterPlans[headingVal].TpState == 'RosterPlan') {
        setBeatforShow(RoasterPlans[headingVal].TpOutlets);
      } else if (RoasterPlans[headingVal].TpState == '') {
        setBeatforShow('Select');
      } else {
        setBeatforShow(RoasterPlans[headingVal].TpState);
      }
    } catch (e) { }
  }, [RoasterPlans]);

  function formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  const handleClickOnSelectBeat = itmId => {
    setSelectedValue(itmId);
    console.log('itm in handleClickOnSelectBeat===', itmId);
    console.log('BeatName--->', getAllBeatsObj[itmId]);
    let obj = {
      TpId: wholemonthDatesObj[headingVal].TpId,
      TpDate: formatDate(headingVal),
      BeatId: itmId,
      BeatName: getAllBeatsObj[itmId],
      OutletIds: [],
      TpOutlets: wholemonthDatesObj[headingVal].TpOutlets,
      TpState:
        wholemonthDatesObj[headingVal].TpState == null
          ? activity
          : wholemonthDatesObj[headingVal].TpState,
      TpRemark: wholemonthDatesObj[headingVal].TpRemark,
    };
    store.dispatch({ type: 'ADD_TOUR_ROSTER_PLANS', payload: [headingVal, obj] });
  };

  // const handleChecked = (itm) => {
  //   setChecked(checked);
  //   console.log("ITM_ON_CLICK_ROSTER_PLAN", itm)
  //   let obj = {
  //     TpId: wholemonthDatesObj[headingVal].TpId,
  //     TpDate: formatDate(headingVal),
  //     BeatId: null,
  //     OutletIds: `${itm.Outlets.Id}`,
  //     TpState: 'RosterPlan',
  //     TpRemark: '',
  //   };

  //   store.dispatch({
  //     type: 'ADD_ROSTER_PLANS',
  //     payload: [headingVal, obj],
  //   });
  // }

  const handleClickOnSubmit = () => {
    console.log(
      'RoasterPlans[headingVal].TpState_CLICK_ON_SUBMIT====>',
      RoasterPlans[headingVal].TpState,
      activity,
    );
    console.log(
      'FInal=== INSIDE HANDLE_CLICK========>',
      RoasterPlans[headingVal],
    );
    console.log(
      'Temporary=== INSIDE HANDLE_CLICK========>',
      TourRosterPlans[headingVal],
    );

    try {
      if (
        RoasterPlans[headingVal].TpState == 'FieldWork' &&
        activity == 'FieldWork'
      ) {
        if (
          TourRosterPlans[headingVal].BeatId == '' ||
          TourRosterPlans[headingVal].BeatId == null
        ) {
          alert('Please choose Beat.');
        } else {
          let obj = {
            TpId: TourRosterPlans[headingVal].TpId,
            TpDate: TourRosterPlans[headingVal].TpDate,
            BeatId: TourRosterPlans[headingVal].BeatId,
            BeatName: TourRosterPlans[headingVal].BeatName,
            TpOutlets: TourRosterPlans[headingVal].TpOutlets,
            OutletIds: [],
            TpState: 'FieldWork',
            TpRemark: TourRosterPlans[headingVal].TpRemark,
          };
          store.dispatch({
            type: 'ADD_ROSTER_PLANS_FINALE',
            payload: [headingVal, obj],
          });
          setShowModal(!showModal);
        }
      } else if (
        RoasterPlans[headingVal].TpState == 'RosterPlan' &&
        activity == 'RosterPlan'
      ) {
        if (TourRosterPlans[headingVal].OutletIds.length == 0) {
          alert('Please choose any outlet.');
        } else {
          let obj = {
            TpId: TourRosterPlans[headingVal].TpId,
            TpDate: TourRosterPlans[headingVal].TpDate,
            BeatId: null,
            BeatName: '',
            OutletIds: TourRosterPlans[headingVal].OutletIds,
            TpOutlets: TourRosterPlans[headingVal].TpOutlets,
            TpState: 'RosterPlan',
            TpRemark: TourRosterPlans[headingVal].TpRemark,
          };
          store.dispatch({
            type: 'ADD_ROSTER_PLANS_FINALE',
            payload: [headingVal, obj],
          });
          setShowModal(!showModal);
        }
      } else if (
        RoasterPlans[headingVal].TpState == 'FieldWork' &&
        activity == 'RosterPlan'
      ) {
        if (TourRosterPlans[headingVal].OutletIds.length == 0) {
          alert('Please choose any outlet.');
        } else {
          let obj = {
            TpId: TourRosterPlans[headingVal].TpId,
            TpDate: TourRosterPlans[headingVal].TpDate,
            BeatId: null,
            BeatName: '',
            OutletIds: TourRosterPlans[headingVal].OutletIds,
            TpOutlets: TourRosterPlans[headingVal].TpOutlets,
            TpState: 'RosterPlan',
            TpRemark: TourRosterPlans[headingVal].TpRemark,
          };
          store.dispatch({
            type: 'ADD_ROSTER_PLANS_FINALE',
            payload: [headingVal, obj],
          });
          setShowModal(!showModal);
        }
      } else if (
        RoasterPlans[headingVal].TpState == 'RosterPlan' &&
        activity == 'FieldWork'
      ) {
        if (
          TourRosterPlans[headingVal].BeatId == '' ||
          TourRosterPlans[headingVal].BeatId == null
        ) {
          alert('Please choose Beat.');
        } else {
          let obj = {
            TpId: TourRosterPlans[headingVal].TpId,
            TpDate: TourRosterPlans[headingVal].TpDate,
            BeatId: TourRosterPlans[headingVal].BeatId,
            BeatName: TourRosterPlans[headingVal].BeatName,
            OutletIds: [],
            TpOutlets: TourRosterPlans[headingVal].TpOutlets,
            TpState: 'FieldWork',
            TpRemark: TourRosterPlans[headingVal].TpRemark,
          };
          store.dispatch({
            type: 'ADD_ROSTER_PLANS_FINALE',
            payload: [headingVal, obj],
          });
          setShowModal(!showModal);
        }
      } else {
        if (activity == 'FieldWork') {
          let obj = {
            TpId: TourRosterPlans[headingVal].TpId,
            TpDate: TourRosterPlans[headingVal].TpDate,
            BeatId: TourRosterPlans[headingVal].BeatId,
            BeatName: TourRosterPlans[headingVal].BeatName,
            OutletIds: [],
            TpOutlets: TourRosterPlans[headingVal].TpOutlets,
            TpState: 'FieldWork',
            TpRemark: TourRosterPlans[headingVal].TpRemark,
          };
          store.dispatch({
            type: 'ADD_ROSTER_PLANS_FINALE',
            payload: [headingVal, obj],
          });
          setShowModal(!showModal);
        } else if (activity == 'RosterPlan') {
          let obj = {
            TpId: TourRosterPlans[headingVal].TpId,
            TpDate: TourRosterPlans[headingVal].TpDate,
            BeatId: null,
            BeatName: '',
            OutletIds: TourRosterPlans[headingVal].OutletIds,
            TpOutlets: TourRosterPlans[headingVal].TpOutlets,
            TpState: 'RosterPlan',
            TpRemark: TourRosterPlans[headingVal].TpRemark,
          };
          store.dispatch({
            type: 'ADD_ROSTER_PLANS_FINALE',
            payload: [headingVal, obj],
          });
          setShowModal(!showModal);
        } else {
          let obj = {
            TpId: TourRosterPlans[headingVal].TpId,
            TpDate: TourRosterPlans[headingVal].TpDate,
            BeatId: null,
            BeatName: '',
            OutletIds: [],
            TpOutlets: TourRosterPlans[headingVal].TpOutlets,
            TpState: activity,
            TpRemark: '',
          };
          store.dispatch({
            type: 'ADD_ROSTER_PLANS_FINALE',
            payload: [headingVal, obj],
          });
          setShowModal(!showModal);
        }
      }
    } catch (e) {
      setShowModal(!showModal);
      console.log('ERRRRRORRRRRRRRRRRRR==', e);
    }

    // else if (activityType == 'RosterPlan') {
    // } else {
    // }
  };

  const handleClickOnCancel = () => {
    setActivity(RoasterPlans[headingVal].TpState);
    setShowModal(!showModal);
  };

  const handleClickOnEdit = () => {
    setShowModal(true);
    if (wholemonthDatesObj[headingVal].TpState == 'FieldWork') {
      setShow(1);
    }
  };

  try {
    console.log(
      'tourPlans[headingVal].BeatName-------------->',
      tourPlans[headingVal].BeatName,
    );
  } catch (e) { }

  const filtetFunction = txt => {
    try {
      // alert(JSON.stringify(allOutlets))
      // alert(txt)
      // alert(txt.length)
      if (txt.length > 0) {
        let data = allOutlets.filter(items => {
          return items.Outlets.OutletName.toLowerCase().includes(
            txt.toLowerCase(),
          );
          // item.Outlets.OutletName.toLowerCase().includes(search.toLowerCase())
        });
        setAllOutlets(data);
      } else {
        // alert('else')
        setAllOutlets(allOutletsTemp);
      }
    } catch (e) {
      alert(e);
      // alert(txt)
    }
  };
  // console.log("themecolor.TOUREDITICON==>> ",themecolor.TOUREDITICON)
  return (
    <>
      {wholemonthDatesObj[headingVal] != undefined && (
        <View style={{ width: width * 0.93, alignSelf: 'center' }}>
          <View style={{ marginVertical: 2 }} />
          <Text
            style={{
              fontFamily: FontFamily.PopinsRegular,
              fontWeight: 'bold',
              // color: 'black',
              color: themecolor.TXTWHITE,
              fontSize: 13,
              left: 5,
              marginBottom: 2,
            }}>
            {headingVal}
          </Text>
          <View
            style={{
              // backgroundColor: 'white',
              backgroundColor: themecolor.BOXTHEMECOLOR,
              borderWidth: 1,
              borderColor: themecolor.BOXBORDERCOLOR1,
              // borderColor: Colors.borderColor1,
              borderRadius: 12,
              position: 'relative',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: width * 0.93,
              padding: 5,
            }}>
            <View style={{ width: '90%' }}>
              <Text
                style={{
                  // backgroundColor: 'white',
                  // padding: 5,,
                  left: 5,
                  color: themecolor.TXTWHITE,
                  // color: 'black',
                  // borderWidth: 1,
                  // borderRadius: 12,
                }}>
                <Text
                  style={{
                    fontFamily: FontFamily.PopinsRegular,
                    fontWeight: 'bold',
                    fontSize: 13,
                  }}>
                  Activity :-
                </Text>{' '}
                <Text style={{ fontSize: 12 }}>
                  {activity == '' || activity == null ? 'Select' : activity}
                </Text>
              </Text>
              <Text
                style={{
                  // backgroundColor: 'white',
                  // padding: 5,
                  // color: 'black',
                  left: 5,
                  color: themecolor.TXTWHITE,
                  // borderWidth: 1,
                  // borderRadius: 12,
                }}>
                <Text
                  style={{
                    fontFamily: FontFamily.PopinsRegular,
                    fontWeight: 'bold',
                    fontSize: 13,
                  }}>
                  Selection :-
                </Text>{' '}
                <Text style={{ fontSize: 12 }}>{beatforshow}</Text>
              </Text>
            </View>
            <TouchableOpacity
              style={{
                // position: 'absolute',
                // right: 10,
                width: '10%',
                justifyContent: 'center',
                alignItems: 'center',
                // top: 15,
                // backgroundColor: 'white',
                // width: width * 0.93,
              }}
              onPress={() => {
                handleClickOnEdit();
              }}>
              <FAIcon name="edit" size={18} style={{color:themecolor.ICON}} />
            </TouchableOpacity>
          </View>
        </View>
      )}
      {showModal && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={true}
          onRequestClose={() => {
            setShowModal(false);
          }}>
          <View style={{ ...styles.centeredView, padding: 2 }}>
            <View
              style={{
                ...styles.modalView,
                backgroundColor: themecolor.LIGHTGREY,
              }}>
              <View style={{ ...styles.Modal85, paddingVertical: 10 }}>
                <Text
                  style={{
                    fontFamily: FontFamily.Popinssemibold,
                    fontWeight: '800',
                    fontSize: 17,
                    color: themecolor.TXTWHITE,
                    // color: 'black',
                    alignSelf: 'center',
                    // width: "90%",

                    // color:'blue'
                  }}>
                  Add plan for {headingVal}
                </Text>
                <View style={{ marginVertical: 10 }} />
                <View>
                  <Text
                    style={{
                      fontFamily: FontFamily.PopinsRegular,
                      fontWeight: '800',
                      width: '90%',
                      alignSelf: 'center',
                      // color:'black'
                      color: themecolor.TXTWHITE,
                    }}>
                    Activity
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 12,
                      height: 48,
                      borderWidth: 1,
                      backgroundColor: themecolor.BOXTHEMECOLOR,
                      borderColor: themecolor.BOXBORDERCOLOR1,
                      // borderColor: Colors.borderColor1,
                      color: themecolor.TXTWHITE,
                      // color: Colors.grey,
                      overflow: 'hidden',
                      marginTop: 5,
                      width: '90%',
                      alignSelf: 'center',
                      // backgroundColor:'white'
                    }}>
                    <Picker
                      selectedValue={activity}
                      dropdownIconColor={themecolor.TXTWHITE}
                      onValueChange={(itemValue, itemIndex) =>
                        setActivity(itemValue)
                      }
                      style={{
                        color: themecolor.TXTWHITE, width: '100%', backgroundColor: themecolor.BOXTHEMECOLOR,
                      }}>
                      {Object.keys(tpList).map(item => {
                        return (
                          <Picker.Item label={item} value={item} key={item}
                            style={{ color: themecolor.TXTWHITE, }} />
                        );
                      })}
                    </Picker>
                  </View>
                </View>
                <View style={{ height: 10 }}></View>
                <View>
                  <Text
                    style={{
                      fontFamily: FontFamily.PopinsRegular,
                      fontWeight: '800',
                      width: '90%',
                      alignSelf: 'center',
                      // color:'black',
                      color: themecolor.TXTWHITE,
                    }}>
                    Remark
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 12,
                      height: 48,
                      borderWidth: 1,
                      // borderColor: Colors.borderColor1,
                      backgroundColor: themecolor.BOXTHEMECOLOR,
                      borderColor: themecolor.BOXBORDERCOLOR1,
                      // borderColor: Colors.borderColor1,
                      color: themecolor.TXTWHITE,
                      // color: Colors.grey,
                      overflow: 'hidden',
                      marginTop: 5,
                      width: '90%',
                      alignSelf: 'center',
                      // backgroundColor:'white'
                    }}>
                    <TextInput style={{ width: '100%', left: 5, color: themecolor.TXTWHITE, }} />
                  </View>
                </View>
                <View style={{ height: 10 }}></View>

                {activity == 'FieldWork' && (
                  <View>
                    <Text
                      style={{
                        fontFamily: FontFamily.PopinsRegular,
                        fontWeight: '800',
                        width: '90%',
                        alignSelf: 'center',
                        color: themecolor.TXTWHITE,
                      }}>
                      Beats
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 12,
                        height: 48,
                        borderWidth: 1,
                        // borderColor: Colors.borderColor1,
                        borderColor: themecolor.BOXBORDERCOLOR1,
                        color: themecolor.TXTWHITE,
                        // color: Colors.grey,
                        overflow: 'hidden',
                        marginTop: 5,
                        width: '90%',
                        alignSelf: 'center',
                      }}>
                      <Picker
                        selectedValue={selectedValue}
                        ref={pickerName}
                        onValueChange={(itemValue, itemIndex) =>
                          handleClickOnSelectBeat(itemValue)
                        }
                        style={{ color: themecolor.TXTWHITE, width: '100%', backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR1, }}>
                        <Picker.Item label="Select" value={''} />
                        {allBeats.map((i, index) => {
                          return (
                            <Picker.Item label={i.BeatName} value={i.BeatId} style={{ color: themecolor.TXTWHITE, }} />
                          );
                        })}
                      </Picker>
                    </View>
                  </View>
                )}
                {activity == 'RosterPlan' && (
                  <View>
                    <Text
                      style={{
                        fontFamily: FontFamily.PopinsRegular,
                        fontWeight: '800',
                        width: '90%',
                        alignSelf: 'center',
                        color: themecolor.TXTWHITE,
                      }}>
                      Outlets
                    </Text>
                    <View
                      style={{
                        justifyContent: 'center',
                        // height: 150,
                        borderColor: themecolor.BOXBORDERCOLOR1,
                        color: themecolor.TXTWHITE,
                        // borderColor: Colors.borderColor1,
                        // color: Colors.grey,
                        overflow: 'hidden',
                        marginTop: 5,
                        width: '90%',
                        alignSelf: 'center',
                        maxHeight: 150,
                      }}>
                      <View style={{
                        borderRadius: 12,
                        borderWidth: 1,
                        borderColor: themecolor.BOXBORDERCOLOR1,
                        // borderColor:Colors.borderColor1,
                        backgroundColor: themecolor.BOXTHEMECOLOR,
                        // backgroundColor:'white'
                      }} >
                        <TextInput
                          placeholder="Search Outlet..."
                          onChangeText={txt => filtetFunction(txt)}
                          style={{ left: 5 }}
                        />
                      </View>
                      {/* <ScrollView> */}
                      <FlatList
                        data={allOutlets}
                        scrollEnabled={true}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => (
                          <RenderOutlets
                            item1={item}
                            wholemonthDatesObj={wholemonthDatesObj}
                            themecolor={themecolor}
                            tpList={tpList}
                            allBeats={allBeats}
                            allOutlets={allOutlets}
                            setTempRefresh
                            tempRefresh
                            getAllBeatsObj={getAllBeatsObj}
                            headingVal={headingVal}
                            checked={checked}
                            setChecked={setChecked}
                            TourRosterPlans={TourRosterPlans}
                          />
                        )}
                      />
                      {/* </ScrollView> */}
                      {/* FlatList Of OUtlets Start */}

                      {/* FlatList Of OUtlets End */}
                    </View>
                  </View>
                )}
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: width * 0.7,
                }}>
                <FullsizeButton
                  title="Cancel"
                  width={width * 0.32}
                  onPress={() => handleClickOnCancel()}
                  BRadius={15}
                  height={35}
                  backgroundColor={'white'}
                  titlecolor={'black'}
                />
                <FullsizeButton
                  title="submit"
                  width={width * 0.32}
                  backgroundColor={themecolor.HEADERTHEMECOLOR}
                  onPress={() => handleClickOnSubmit()}
                  BRadius={15}
                  height={35}
                />
              </View>
            </View>
          </View>
        </Modal>
      )}
    </>
  );
}

export default CreateTeamTour = props => {
  const mode = useSelector(state => state.mode);
  const toast = useToast();
  const [loader, setLoader] = useState(false);
  const themecolor = new MyThemeClass(mode).getThemeColor();
  const teamEmpId = props.route.params.empId;
  const teamEmpName = props.route.params.empName;
  const [startdate, setStartdate] = useState(
    moment().add(1, 'month').startOf('month').format('Do MMM YYYY'),
  );

  const [enddate, setEnddate] = useState(
    moment().add(1, 'month').endOf('month').format('Do MMM YYYY'),
  );

  const TourRosterPlans = useSelector(state => state.TourRosterPlans);
  const RoasterPlans = useSelector(state => state.RoasterPlans);
  console.log(
    'TourRosterPlan...Parent======>>>> from Redux ===>>',
    TourRosterPlans,
  );
  console.log('Final redux body ===>>', RoasterPlans);

  const [dates, setDates] = useState([]);
  const [getAllBeatsObj, setAllBeatsObj] = useState({});
  const [tpList, setTpList] = useState({});
  const [allBeats, setAllBeats] = useState([]);
  const [allOutlets, setAllOutlets] = useState([]);
  const [allOutletsTemp, setAllOutletsTemp] = useState([]);
  const [wholemonthDates, setWholeMonthdates] = useState([]);
  const [wholemonthDatesObj, setWholeMonthdatesObj] = useState({});
  const [modalVisible2, setModalVisible2] = useState(false);

  const fetchTeamTourData = async () => {
    const result = await gettripLocationApi(
      `api/getNextMonthTourPlan?employee_id=${teamEmpId}`,
    );
    console.log('response==>> ', result);
    setWholeMonthdates(Object.keys(result.data));
    setWholeMonthdatesObj(result.data);
  };

  useEffect(() => {
    setLoader(true);
    fetchTeamTourData();
    getTpstateList();
    getAllEmpBeats();
    getOutlets();
    setTimeout(() => {
      setLoader(false);
    }, 3000);
  }, []);

  const getAllEmpBeats = async () => {
    try {
      const res = await gettripLocationApi(
        `api/getAllBeat?employee_id=${teamEmpId}`,
      );
      res.data.forEach(itm => {
        setAllBeatsObj(prev => ({ ...prev, [itm.BeatId]: itm.BeatName }));
      });
      console.log('result==>> beat', res.data);
      setAllBeats(res.data);
    } catch (err) {
      console.log('error is :' + err);
    }
  };

  const getTpstateList = async () => {
    try {
      const result = await gettripLocationApi('api/getTPStates');
      if (result.statusCode == 200) {
        setTpList(result.data);
      } else {
        alert(result.message);
      }
    } catch (e) {
      console.log('Error in line 205 Tour Approval Page', e);
    }
  };

  // const getBeats=()=>{
  // }

  const getOutlets = async () => {
    try {
      const result = await gettripLocationApi(
        `api/getEmpOutlets?employee_id=${teamEmpId}`,
      );
      if (result.statusCode === 200) {
        setAllOutlets(result.data);
        setAllOutletsTemp(result.data);
        // setLoader(false)
      } else {
        alert(result.message);
      }
    } catch (errr) {
      console.log('Error of Catch :', errr);
    }
  };

  const handleGenerate = async () => {
    setLoader(true);
    let objKeys = Object.keys(RoasterPlans);
    var arr = [];
    objKeys.forEach(key => {
      let body = {
        TpId: RoasterPlans[key].TpId,
        TpDate: RoasterPlans[key].TpDate,
        BeatId: RoasterPlans[key].BeatId,
        OutletIds: `${RoasterPlans[key].OutletIds.join(',')}`,
        TpState: RoasterPlans[key].TpState,
        TpRemark: RoasterPlans[key].TpRemark,
      };
      arr.push(body);
    });

    let body = {
      emp_id: teamEmpId,
      tour_plan: arr,
    };
    console.log('FInal body Generate Tour Plan====>', body);
    try {
      let res = await postCreateTourApi('api/generateTourPlan', body);
      console.log('RES=create_Tour_plan', res);
      if (res.statusCode == 200) {
        setLoader(false);
        store.dispatch({ type: 'REMOVE_ALL_TOUR_PLANS' });
        store.dispatch({ type: 'REMOVE_ALL_TOUR_ROSTER_PLANS' });
        setModalVisible2(!modalVisible2);
      } else {
        setLoader(false);
        toast.show(res.message, {
          type: 'danger',
          placement: 'bottom',
          duration: 3000,
          offset: 30,
          animationType: 'slide-in',
        });
      }
    } catch (e) {
      setLoader(false);
      toast.show('Something went wrong! please try again later.', {
        type: 'danger',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
    }
  };

  const [tempRefresh, setTempRefresh] = React.useState(false);
  console.log('tempRfresh=========', tempRefresh);

  return (
    <>
      {loader ? (
        <>
          <LoaderAllInOne />
        </>
      ) : (
        <></>
      )}
      <View style={{ backgroundColor: themecolor.THEMECOLOR, flex: 1 }}>
        <HeaderWithPicker
          title={teamEmpName}
          startdate={startdate}
          enddate={enddate}
        />
        <View>
          <View contentContainerStyle={{height: height - 180}}>
            <FlatList
              data={wholemonthDates}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              scrollEnabled={true}
              renderItem={({ item, index }) => (
                <RenderFunction
                  headingVal={item}
                  wholemonthDatesObj={wholemonthDatesObj}
                  themecolor={themecolor}
                  tpList={tpList}
                  allBeats={allBeats}
                  allOutlets={allOutlets}
                  setAllOutlets={setAllOutlets}
                  allOutletsTemp={allOutletsTemp}
                  setTempRefresh
                  tempRefresh
                  getAllBeatsObj={getAllBeatsObj}
                />
              )}
            />
          </View>
          <View  style={{margin:5}}/>
          <FullsizeButton
            title="Generate Tour"
            width={width * 0.93}
            backgroundColor={themecolor.HEADERTHEMECOLOR}
            onPress={() => handleGenerate()}
          />
        </View>
        {modalVisible2 && (
          <VerifyModel
            title={
              props.route.params.screen == ''
                ? 'Tour plan created successfully'
                : 'Tour plan updated successfully'
            }
            navigateFrom=""
            navigateTo="NewDashboard"
          />
        )}
      </View>
    </>
  );
};
