import React, { useRef, useState, useEffect } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Dimensions,
  Image,
  Modal,
  FlatList,
  Platform,
  PermissionsAndroid,
  Alert,
  Linking,
  ScrollView
} from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import McIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../../assets/config/Colors';
import { FontFamily } from '../../assets/fonts/FontFamily';
import TextTicker from 'react-native-text-ticker';
import { getTeamlist } from '../../repository/commonRepository';
import { RadioButton, Avatar, Checkbox } from 'react-native-paper';
import RBSheet from 'react-native-raw-bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import styles from '../../assets/css/stylesDashboard';
import { db } from '../../helper/SQLite DB/Sqlite';
import LoaderAllInOne from '../../components/shared/Loader';
import Color, { MyThemeClass } from '../Theme/ThemeDarkLightColor';
import {
  getBeatOutlets,
} from '../../repository/beat Planning/beatPlaningRepository';
import {
  StoreDatatoAsync,
} from '../../repository/AsyncStorageServices';
import moment from 'moment';
import {
  getAllBeats,
  RoasterPlanOutlets,
} from '../../repository/dashboard/DashboardRepository';
import { useToast } from 'react-native-toast-notifications';
import { useSelector, useDispatch } from 'react-redux';
import Video from 'react-native-video';
import AwesomeLoading from 'react-native-awesome-loading';
import { launchCamera, } from 'react-native-image-picker';
import ImgToBase64 from 'react-native-image-base64';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { uploadMediaApi } from '../../repository/CaseGrievance/CaseGrievance';
import { attendanceStatusGetData } from '../../repository/attendence/attendence';
import { gettripLocationApi } from '../../repository/trip/tripRepository';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {
  getcurrentTime,
  getcurrentAmPm,
  getUserCurrentLocationCommon,
  getUserCurrentLatLngNew,
  // getEmployeeDetailsById,
} from '../../repository/commonRepository';
// import Spinner from 'react-native-loading-spinner-overlay';

const { width, height } = Dimensions.get('screen');

function ComponentBeatStart(props) {

  const network = useSelector(state => state.network);
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();
  console.log("themecolor", themecolor)
  var arr = [];
  const toast = useToast();
  const navigation = useNavigation();
  const [checked, setChecked] = React.useState('');
  const [beatName, setBeatName] = React.useState('');
  const [modalVisible1, setModalVisible1] = useState(false);
  const [date, setDate] = useState(new Date());
  const [allBeats, setAllBeats] = useState([]);
  const [defaultBeat, setIsDefaultBeat] = useState('');
  const [isTourPlan, setIsTourPlan] = useState('');
  const [loader, setLoader] = useState(false);
  const [modalVisible5, setmodalVisible5] = useState(false);


  // console.log('beat Name-----------=============>', beatName);
  // console.log(`All Beats ----> ${JSON.stringify(allBeats)}`);
  const getBeats = async () => {
    // alert("empId in Beat component",props.empId)
    // console.log("data of empid on beat component",props.empId)
    // alert(JSON.stringify(props))
    try {
      let res = await getAllBeats(props.empId);
      console.log('res Line 70 In DashboardStartDay====', res);
      if (res.statusCode == 200) {
        if (res.data.DefaultBeat != null) {
          if (Object.keys(res.data.DefaultBeat).length > 0) {
            res.data.DefaultBeat['isBeat'] = true;
            res.data.DefaultBeat['isChecked'] = true;
            setIsDefaultBeat('yes');
            arr.push(res.data.DefaultBeat);
            setChecked(res.data.DefaultBeat.BeatId);
            setBeatName(res.data.DefaultBeat.BeatName);
            await AsyncStorage.setItem(
              '@beatStatus',
              JSON.stringify('NotStarted'),
            );
          }
        }

        res.data.OtherBeats.forEach(item => {
          item['isBeat'] = false;
          item['isChecked'] = false;
          arr = [...arr, item];
        });
        setAllBeats(arr);
        console.log('arr******', arr);
      } else if (res.statusCode == 500 && res.message == 'No Tour Plan Set') {
        setIsTourPlan(res.message);
        console.warn(
          'No Tour Plan Set DahboardStartDay.js Line 61---->',
          res.message,
        );
      } else {
        setIsTourPlan(res.message);
      }
    } catch (e) {
      console.log('In Catch in getAllBeats Line 44 --->', e);
    }
  };

  React.useEffect(() => {
    getBeats();
  }, []);

  function ItemCheked({
    item,
    checked,
    setChecked,
    index,
    setBeatName,
    defaultBeat,
    themecolor,
    // agendaType1
  }) {
    console.log('item-->', item);
    const [g, s] = React.useState({});
    const [refresh, setRefresh] = React.useState(false);

    // const network = useSelector(state => state.network);
    console.log(item);

    const handleRadioBox = (id, name) => {
      console.log('Event>>>>', id, name);
      console.log('isChecked-->>>>', item.isChecked);
      setChecked(id);
      setBeatName(name);
      setRefresh(!refresh);
    };

    var answr;
    answr = g[item.BeatId];
    console.log('answer----defaultBeat->', defaultBeat);
    console.log("item.isbeat --->", item.isBeat)
    return (
      <>
        {/* If Default Beat != ''  */}
        {defaultBeat != '' ? (
          item.isBeat ? (
            <>
              <View style={styles.CenterView}>
                <Text style={{ ...styles.submittext, color: themecolor.TXTWHITE }}>Default Beat</Text>
                <TouchableOpacity>
                  <View style={styles.R1}>
                    <View style={styles.RadioVIew}>
                      <RadioButton
                        value={answr}
                        color={themecolor.TXTWHITE}
                        uncheckedColor={themecolor.TXTWHITE}
                        status={
                          item.BeatId == checked ? 'checked' : 'unchecked'
                        }
                        onPress={() =>
                          handleRadioBox(item.BeatId, item.BeatName)
                        }
                      />
                    </View>
                    <Text style={{ ...styles.BoxHeading, color: themecolor.TXTWHITE }}>{item.BeatName}</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.Borderline2} />
              <View style={styles.MV5} />
              <Text style={{ ...styles.submittext, color: themecolor.TXTWHITE }}>All Beats</Text>
            </>
          ) : (
            <>
              <TouchableOpacity
                onPress={() => handleRadioBox(item.BeatId, item.BeatName)}
                activeOpacity={1}
              // style={{ backgroundColor: answr == checked ? '#FFF' : '#fff' }}
              >
                <View style={styles.RadioVIew}>
                  <RadioButton
                    // value={item.isChecked}
                    color={themecolor.TXTWHITE}
                    uncheckedColor={themecolor.TXTWHITE}
                    status={item.BeatId == checked ? 'checked' : 'unchecked'}
                    onPress={() => handleRadioBox(item.BeatId, item.BeatName)}
                  />

                  <Text style={{ ...styles.RadioText, color: themecolor.TXTWHITE }}>{item.BeatName}</Text>
                </View>
              </TouchableOpacity>
            </>
          )
        ) : (
          <>
            {index == 0 ? (
              <Text style={{ ...styles.submittext, color: themecolor.TXTWHITE }}>All Beats</Text>
            ) : (
              <></>
            )}
            <TouchableOpacity
              onPress={() => handleRadioBox(item.BeatId, item.BeatName)}
              activeOpacity={1}
            // style={{ backgroundColor: answr == checked ? '#FFF' : '#fff' }}
            >
              <View style={styles.RadioVIew}>
                <RadioButton
                  // value={item.isChecked}
                  color={themecolor.TXTWHITE}
                  uncheckedColor={themecolor.TXTWHITE}
                  status={item.BeatId == checked ? 'checked' : 'unchecked'}
                  onPress={() => handleRadioBox(item.BeatId, item.BeatName)}
                />

                <Text style={{ ...styles.RadioText, color: themecolor.TXTWHITE }}>{item.BeatName}</Text>
              </View>
            </TouchableOpacity>
          </>
        )}

      </>
    );
  }

  const handleSubmitData = async () => {
    try {
      // console.log('beatId-------', checked);
      if (network) {
        if (checked != '') {
          setLoader(true);
          setModalVisible1(false);
          let res = await getBeatOutlets(checked);
          // console.log("==============",res)
          if (res.statusCode == 200) {
            /*** Truncate Beat table Start ****/

            db.transaction(async function (tx) {
              tx.executeSql('DELETE FROM Beat', [], (tx, results) => { });
            });
            /**** Truncate Beat table End  ***/

            /**
             * Insert new data Beat Data
             *
             */
            var tempArr = [];
            res.data.OutletCheckInDump.forEach(item1 => {
              tempArr.push(Object.keys(item1)[0]);
            });
            console.log('tempArr Line 199===>', tempArr);

            db.transaction(async function (tx) {
              res.data.OutletIds.forEach(async item => {
                console.log("beat chech data", item)
                //if checkinCheckout already Sync
                if (tempArr.includes(`${item}`)) {

                  await tx.executeSql(
                    'insert into Beat(outletId,visitstatus) VALUES(?,?)',
                    [item, 'Completed'],
                    (tx, results) => {
                      // alert("Beat Status Completed"+JSON.stringify(results),item);
                    },
                  );
                  //if checkinCheckout Pending
                } else {
                  console.log("ITem Line 284===", item)
                  await tx.executeSql(
                    'insert into Beat(outletId,visitstatus) VALUES(?,?)',
                    [item, 'Pending'],
                    (tx, results) => {
                      // alert("Beat Status Pending"+JSON.stringify(results),item);
                    },
                  );
                }
              }); //End of forEach Loop
            });

            await AsyncStorage.setItem('@beatId', JSON.stringify(checked));
            await AsyncStorage.setItem('@beatName', JSON.stringify(beatName));
            await AsyncStorage.setItem(
              '@firstTime',
              JSON.stringify('firstTime'),
            );
            await AsyncStorage.setItem(
              '@beatStatus',
              JSON.stringify('Started'),
            );
            await AsyncStorage.setItem('@beatDate', JSON.stringify(new Date()));
            navigation.navigate('AirportRoute', {
              beatId: checked,
              beatName: beatName,
              navigateFrom: 'start_beat',
            });
          }
          else if (res.statusCode == 404) {
            toast.show(`${res.message}`, {
              type: 'danger',
              placement: 'bottom',
              duration: 3000,
              offset: 30,
              animationType: 'slide-in',
            });
            setModalVisible1(!modalVisible1);
            setLoader(false)
          } else {
            toast.show('Something went wrong,please try again later.', {
              type: 'danger',
              placement: 'bottom',
              duration: 3000,
              offset: 30,
              animationType: 'slide-in',
            });
            setModalVisible1(!modalVisible1);
          }
        } else {
          toast.show('Please choose your beat.', {
            type: 'danger',
            placement: 'bottom',
            duration: 3000,
            offset: 30,
            animationType: 'slide-in',
          });
        }
      } else {
        toast.show('No network.', {
          type: 'danger',
          placement: 'bottom',
          duration: 3000,
          offset: 30,
          animationType: 'slide-in',
        });
        setModalVisible1(!modalVisible1);
      }
    } catch (e) {
      // alert(e)
      toast.show('Something went wrong,please try again later.', {
        type: 'danger',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
      setModalVisible1(!modalVisible1);
    }
  };

  const handleStartBeat = () => {
    setmodalVisible5(false)
    if (isTourPlan != '') {
      toast.show(isTourPlan, {
        type: 'danger',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
    } else {
      if (allBeats.length > 0) {
        setDate(new Date());
        setModalVisible1(!modalVisible1);
      } else {
        toast.show("No beat found!", {
          type: 'danger',
          placement: 'bottom',
          duration: 3000,
          offset: 30,
          animationType: 'slide-in',
        });
      }
    }
  };

  const handleBeat = async () => {
    const team = await getTeamlist();
    const haveTeam = team.length > 0
    // alert(haveTeam)
    if (haveTeam) {
      setmodalVisible5(!modalVisible5);
    } else {
      handleStartBeat()
    }


  }


  // console.log('CheckEd Line 191', checked, beatName);

  return (
    <>
      {loader ? (
        <>
          <LoaderAllInOne />
        </>
        // <Spinner
        //   visible={true}
        //   textContent={'Loading...'}
        //   textStyle={{color: '#FFF'}}
        // />
      ) : (
        <></>
      )}
      <View style={{ ...styles.EndMYDAY, backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR }}>
        <View style={styles.EndMYDAY2}>
          <TouchableOpacity
            style={styles.FLEXJ}
            activeOpacity={0.5}
            onPress={() => {
              // handleStartBeat();
              handleBeat()
            }}>
            <View style={styles.LEFT20}>
              <View>
                <Text style={{ ...styles.STARTBEATTEXT, color: themecolor.TXTWHITE }}>Start the Beat</Text>
              </View>
              <View style={styles.BEATICON}>
                <Image
                  style={styles.BEATVIew}
                  source={require('../../assets/images/dashboard/beat.png')}
                />
                <Text style={{ ...styles.SelectBeatText, color: themecolor.TXTWHITE }}>Select beat</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible1}
      // onRequestClose={() => {
      //     setModalVisible1(!modalVisible1);
      // }}
      >
        <View style={{ ...styles.centeredView, }}>
          <View style={{ ...styles.modalView, backgroundColor: themecolor.LIGHTGREY, }}>
            {/* <View style={{ ...styles.Modal85,backgroundColor:'yellow' }}> */}
            <FlatList
              data={allBeats}
              renderItem={({ item, index }) => (
                <ItemCheked
                  item={item}
                  index={index}
                  props={props}
                  checked={checked}
                  setChecked={setChecked}
                  allBeats={allBeats}
                  setBeatName={setBeatName}
                  setLoader={setLoader}
                  defaultBeat={defaultBeat}
                  themecolor={themecolor}
                // agendaType1={props.agendaType1}
                />
              )}
              keyExtractor={(item, indx) => indx}
              scrollEnabled={true}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignSelf: 'center', }}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => handleSubmitData()}
                style={{
                  height: 30,
                  width: width * 0.25,
                  // top: 10,
                  backgroundColor: Colors.bluetheme,
                  borderRadius: 50,
                  justifyContent: 'center',
                  backgroundColor: themecolor.HEADERTHEMECOLOR
                }}>
                <Text style={{ ...styles.textStyle }}>Submit</Text>
              </TouchableOpacity>
              <View style={{ marginHorizontal: 4 }} />
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => setModalVisible1(false)}
                style={{
                  height: 30,
                  width: width * 0.25,
                  backgroundColor: Colors.white,
                  borderRadius: 50,
                  justifyContent: 'center'
                }}>
                <Text style={{ ...styles.textStyle, color: Colors.grey }}>
                  Cancel
                </Text>

              </TouchableOpacity>
            </View>
            {/* <View style={styles.MV2} /> */}
            {/* </View> */}

          </View>

        </View>
      </Modal >
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible5}
        onRequestClose={() => {
          setmodalVisible5(!modalVisible5);
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <View
            style={{
              margin: 20,
              backgroundColor: themecolor.RB2,
              borderRadius: 20,
              padding: 35,
              alignItems: 'center',
            }}>
            <View style={{ width: width * 0.6, alignSelf: 'center' }}>

              <View>

                <View style={{ marginTop: 5 }}>
                  <Text
                    style={{
                      fontFamily: FontFamily.PopinsRegular,
                      color: themecolor.TXTWHITE,
                    }}>
                    Start beat for
                  </Text>
                  <View
                    style={{
                      backgroundColor: themecolor.RB2,
                      borderRadius: 12,
                      // borderWidth: 1,
                      // borderColor: themecolor.BOXBORDERCOLOR1,
                      // overflow: 'hidden',
                      // position: 'relative',
                      // height: 42,
                    }}>
                    <FullsizeButton title='Me' width={'100%'} backgroundColor={themecolor.HEADERTHEMECOLOR} onPress={() => { handleStartBeat() }} />
                    <View style={{ height: 10, }} />
                    <FullsizeButton title='Team' width={'100%'} backgroundColor={themecolor.HEADERTHEMECOLOR} onPress={() => { navigation.navigate('EmpListForBeats') }} />

                  </View>
                </View>
                <View style={{ marginVertical: 5 }} />
              </View>
            </View>
            <View style={{ width: width * 0.45 }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  marginTop: 10,
                }}>

                <TouchableOpacity
                  style={{
                    borderRadius: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: 5,
                    // paddingVertical: 2,
                    // backgroundColor:'red'
                  }}
                  onPress={() => {
                    setmodalVisible5(!modalVisible5);
                  }}>
                  <Text style={{ color: themecolor.TXTWHITE }}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

function ComponentBeatStartShimmer(props) {
  return (
    <SkeletonPlaceholder>
      <View style={styles.EndMYDAY}>
        <View style={{ width: width * 0.56, height: 25, top: 10, left: 20 }} />
        <View style={{ width: width * 0.30, height: 10, top: 20, left: 20 }} />
      </View>
    </SkeletonPlaceholder>
  )
}

function ComponentBeatEnd(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  const navigation = useNavigation();
  const [modalVisible1, setModalVisible1] = useState(false);
  const [getBeatName, setBeatName] = useState('');

  React.useEffect(() => {
    async function getBeatNameFun() {
      try {
        let beatname = await AsyncStorage.getItem('@beatName');
        setBeatName(beatname.replace(/['"]+/g, ''));
      } catch (e) { }
    }
    getBeatNameFun();
  }, []);

  const handleViewBeat = async () => {
    let beatid = await AsyncStorage.getItem('@beatId');
    let beatname = await AsyncStorage.getItem('@beatName');
    console.log('beatname=========', beatname);


    navigation.push('AirportRoute', {
      navigateFrom: 'view_beat',
      beatId: beatid,
      beatName: beatname.replace(/['"]+/g, ''),
    });
  };



  return (
    <>
      <View style={{ ...styles.EndMYDAY, backgroundColor: themecolor.BOXTHEMECOLOR }}>

        <View style={styles.EndMYDAY2}>
          <View
            style={{ ...styles.FLEXJ, width: width * 0.9 }}
            activeOpacity={0.5}
            onPress={() => {
              setDate(new Date());
              setModalVisible1(!modalVisible1);
            }}>
            <View style={{ ...styles.LEFT20, flex: 1, justifyContent: 'center' }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ ...styles.STARTBEATTEXT, color: themecolor.TXTWHITE, }}>View Beat</Text>
                <View style={{ left: -20, width: 170, flexDirection: 'row', alignItems: 'center' }} >
                  {/* <Text style={{marginRight:5}} ><EntypoIcon name='shop' size={15} color={Colors.bluetheme} /></Text> */}
                  {/* <TextTicker
                  duration={8000}
                  loop
                  bounce
                  repeatSpacer={50}
                  marqueeDelay={1000}>
                  <Text style={{ fontFamily: FontFamily.PopinsRegular, color: themecolor.TXTWHITE, width: 80 ,fontSize:10}} >hhffhjhjhjhjhjfffffffffffffjjjjjdfddgfdgffgffdfjfh</Text>
                </TextTicker> */}

                </View>
              </View>
              <View
                style={{ flexDirection: 'row', }}>
                <TouchableOpacity onPress={() => handleViewBeat()}>
                  <View style={styles.BEATICON}>
                    <Image
                      style={styles.BEATVIew}
                      source={require('../../assets/images/dashboard/beat.png')}
                    />
                    <Text style={{ ...styles.SelectBeatText, color: themecolor.TXTWHITE }}>{getBeatName}</Text>

                  </View>
                </TouchableOpacity>

                <View style={{ marginLeft: 20 }} />
                {/* <TouchableOpacity>
                  <View style={styles.BEATICON}>
                    <Image
                      style={styles.BEATVIew}
                      source={require('../../assets/images/dashboard/beat.png')}
                    />
                    <Text style={styles.SelectBeatText}>End beat</Text>
                  </View>
                </TouchableOpacity> */}
              </View>
            </View>
          </View>
        </View>
      </View>
      {/* <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible1}
                    // onRequestClose={() => {
                    //     setModalVisible1(!modalVisible1);
                    // }}
                    >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={styles.Modal85}>
                                <View
                                    style={styles.CenterView}>
                                    <Text style={styles.submittext}>
                                        Default beat
                                    </Text>
                                    <View
                                        style={styles.R1}>
                                        <RadioButton
                                            color={'#000'}
                                            uncheckedColor={'#000'}
                                        />

                                        <Text
                                            style={styles.BoxHeading}>
                                            Airport Route
                                        </Text>
                                    </View>
                                </View>
                                <View
                                    style={styles.Borderline2}
                                />

                                <View style={styles.MV5} />
                                <Text style={styles.submittext}>
                                    All beat
                                </Text>
                                <FlatList
                                    data={datachecked}
                                    renderItem={({ item }) => (
                                        <ItemCheked
                                            item={item}
                                            props={props}
                                            checked={checked}
                                            setChecked={setChecked}
                                        />
                                    )}
                                    keyExtractor={item => item.id}
                                />
                                <View style={styles.MV2} />
                                <View style={styles.SubmitBVIew}>

                                    <TouchableOpacity
                                        activeOpacity={0.5}
                                        onPress={() => handleSubmitData()}
                                        >
                                        <View
                                            style={styles.SubmitButtonStyle}>
                                            <Text
                                                style={{ ...styles.textStyle, }}>
                                                Submit
                                            </Text>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        activeOpacity={0.5}
                                        onPress={() => setModalVisible1(false)}>
                                        <View
                                            style={styles.CencelButton}>
                                            <Text style={{ ...styles.textStyle, color: Colors.grey }}>
                                                Cancel
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal> */}
    </>
  );
}

function ComponentViewRoasterPlan(props) {
  const toast = useToast();
  const navigation = useNavigation();
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  const [checked, setChecked] = React.useState('English');
  const [modalVisible1, setModalVisible1] = useState(false);
  const [getBeatName, setBeatName] = useState('');
  const [getRoasterPlanOutlets, setRoasterPlanOutlets] = useState([]);
  const [getRoasterPlanOutletsErr, setRoasterPlanOutletsErr] = useState({});

  const fetchRoasterPlan = async () => {
    function getDate() {
      let date = new Date();
      let yy = date.getFullYear();
      let mm = date.getMonth() + 1;
      if (mm < 10) {
        mm = `0${mm}`;
      }
      let dd = date.getDate();
      if (dd < 10) {
        dd = `0${dd}`;
      }

      let finalDate = `${yy}-${mm}-${dd}`;
      return finalDate;
    }
    try {
      //  let res = await RoasterPlanOutlets("2022-06-06");
      let res = await RoasterPlanOutlets(getDate());
      console.log('res===Roster Plan>', res);
      if (res.statusCode == 200) {
        if (res.data[0].OutletIds != null || res.data[0].OutletIds != '') {
          setRoasterPlanOutlets(res.data[0].OutletIds.split(',').flat());
        } else {
          setRoasterPlanOutletsErr(res);
        }
      } else if (res.statusCode == 400 && res.data.length == 0) {
        setRoasterPlanOutlets(res.data);
      } else {
        setRoasterPlanOutletsErr(res);
      }
    } catch (e) { }
  };

  React.useEffect(() => {
    fetchRoasterPlan();
  }, []);

  const handleViewBeat = async () => {
    console.log('getRoasterPlanOutlets', getRoasterPlanOutlets);
    if (getRoasterPlanOutlets.length > 0) {
      navigation.navigate('AirportRoute', {
        beatId: '',
        beatName: '',
        navigateFrom: 'roaster_plan',
        roasterIdsArray: getRoasterPlanOutlets,
      });
    } else if (getRoasterPlanOutlets.length == 0) {
      toast.show('No roster plan outlets found!', {
        type: 'danger',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
    } else {
      toast.show(`${getRoasterPlanOutletsErr.message}`, {
        type: 'danger',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
    }
  };

  return (
    <>
      <View style={{ ...styles.EndMYDAY, backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR }}>
        <View style={styles.EndMYDAY2}>
          <View
            style={styles.FLEXJ}
            activeOpacity={0.5}
            onPress={() => {
              setDate(new Date());
              setModalVisible1(!modalVisible1);
            }}>
            <View style={styles.LEFT20}>
              <View>
                <Text style={{ ...styles.STARTBEATTEXT, color: themecolor.TXTWHITE }}>Roster Plan</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => handleViewBeat()}>
                  <View style={styles.BEATICON}>
                    <Image
                      style={styles.BEATVIew}
                      source={require('../../assets/images/dashboard/beat.png')}
                    />
                    <Text style={styles.SelectBeatText}>View</Text>
                  </View>
                </TouchableOpacity>
                {/* <View style={{marginLeft: 20}} /> */}
                {/* <TouchableOpacity>
                  <View style={styles.BEATICON}>
                    <Image
                      style={styles.BEATVIew}
                      source={require('../../assets/images/dashboard/beat.png')}
                    />
                    <Text style={styles.SelectBeatText}>End beat</Text>
                  </View>
                </TouchableOpacity> */}
              </View>
            </View>
          </View>
        </View>
      </View>
      {/* <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible1}
                    // onRequestClose={() => {
                    //     setModalVisible1(!modalVisible1);
                    // }}
                    >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={styles.Modal85}>
                                <View
                                    style={styles.CenterView}>
                                    <Text style={styles.submittext}>
                                        Default beat
                                    </Text>
                                    <View
                                        style={styles.R1}>
                                        <RadioButton
                                            color={'#000'}
                                            uncheckedColor={'#000'}
                                        />

                                        <Text
                                            style={styles.BoxHeading}>
                                            Airport Route
                                        </Text>
                                    </View>
                                </View>
                                <View
                                    style={styles.Borderline2}
                                />

                                <View style={styles.MV5} />
                                <Text style={styles.submittext}>
                                    All beat
                                </Text>
                                <FlatList
                                    data={datachecked}
                                    renderItem={({ item }) => (
                                        <ItemCheked
                                            item={item}
                                            props={props}
                                            checked={checked}
                                            setChecked={setChecked}
                                        />
                                    )}
                                    keyExtractor={item => item.id}
                                />
                                <View style={styles.MV2} />
                                <View style={styles.SubmitBVIew}>

                                    <TouchableOpacity
                                        activeOpacity={0.5}
                                        onPress={() => handleSubmitData()}
                                        >
                                        <View
                                            style={styles.SubmitButtonStyle}>
                                            <Text
                                                style={{ ...styles.textStyle, }}>
                                                Submit
                                            </Text>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        activeOpacity={0.5}
                                        onPress={() => setModalVisible1(false)}>
                                        <View
                                            style={styles.CencelButton}>
                                            <Text style={{ ...styles.textStyle, color: Colors.grey }}>
                                                Cancel
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal> */}
    </>
  );
}

export default function ComponentStartDays(props) {
  console.log("Child in ComponentStartDays", props)
  const Roles = useSelector(state => state.userRoles);
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  const network = useSelector(state => state.network);
  const toast = useToast();
  const navigation = useNavigation();
  console.log('Roles............😫', Roles);
  console.log('props.rstatus 849 58985898589', props);


  const [formattedaddress, setFormattedAddress] = useState('');
  const [checked, setChecked] = React.useState('');
  const [todaysTrip, setTodaysTrip] = useState([]);
  const currentLatLng = useSelector(state => state.currentLatLng);
  const apikey = useSelector(state => state.googleAPI);


  const getUserCurrentLocation = async () => {
    let add = await getUserCurrentLocationCommon(
      currentLatLng.latitude,
      currentLatLng.longitude,
    );
    setFormattedAddress(add);
  };

  const gettodayTrip = async () => {
    const result = await gettripLocationApi(`api/getTodayTrips`);
    if (result.statusCode == 200) {
      setTodaysTrip(result.data.Trips);
      console.log('get today trips data', result.data.Trips.length);
    }
  };

  React.useEffect(() => {
    var mounted = true

    function temp() {
      getUserCurrentLocation();
      gettodayTrip();
    }
    if (mounted) {
      temp();
    }
    return () => {
      mounted = false;
    }
  }, []);

  console.log('props', props);


  const refRBSheet = useRef();
  const refRBSheetBA_MT = useRef();
  const refRBSheetBA_MTCapture = useRef();
  const [date, setDate] = useState(new Date());
  const [ct, setCt] = useState();
  const [ampm, setAmPm] = useState();
  const [tripId, setTripId] = useState(false);
  var monthName1 = [
    'Jan',
    'Feb',
    'Mar',
    'April',
    'May',
    'June',
    'July',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const dayName = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const [filePath, setFilePath] = useState({
    uri: 'https://picsum.photos/200/300?random=1',
  });
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();
  const punchInSelfie = useSelector(state => state.BAPunchInSelfie);
  console.log('Selfie........🤐', punchInSelfie);

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
        console.log(err);
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  };

  const captureImage = async type => {
    refRBSheetBA_MT.current.close();

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
        refRBSheetBA_MTCapture.current.open();

        ImgToBase64.getBase64String(`${response.assets[0].uri}`).then(
          base64String => {
            console.log('Base 64 String ....', base64String);
            let body = {
              imgurl: base64String,
              id: response.assets[0].fileName,
            };
            // setPunchinSb64(base64String)
            dispatch({
              type: 'ADD_BA_PUNCH_IN_SELFIE',
              payload: base64String,
            });
            setRefresh(!refresh);
            getBaMediaId(base64String);
          },
        );
      });
    }
  };

  async function getBaMediaId(b64) {
    console.log('inside function', b64);
    let body5 = {
      folder_id: '1',
      media: [b64],
    };

    // console.log("arr", imgarr)
    const result = await uploadMediaApi('api/uploadMediaBase64', body5);
    console.log('result frpm upload media', result);
    const d1 = result.data.toString();
    console.log('d1hjgh', d1);
    // props.setPunchinMediaId(d1)
    await StoreDatatoAsync('selfi_punchin', d1);
  }

  const openSettings = () => {
    navigation.push('Splash');
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:');
    } else {
      Linking.openSettings();
    }
  };

  // alert(JSON.stringify(currentLatLng))
  async function strtday() {
    if (network) {
      setCt(getcurrentTime());
      setAmPm(getcurrentAmPm());
      if (currentLatLng.latitude == '' || currentLatLng.longitude == '') {
        // Alert.alert('Please Enable location or allow location permission and restart the app');

        Alert.alert(
          'Please provide the require permission from settings',
          'Make sure to enable device location',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'Go To Settings',
              onPress: () => {
                openSettings();
              },
            },
          ],
        );

        // const granted = await PermissionsAndroid.check(
        //   PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        // );

        // if (granted) {
        //   console.log('You can use the ACCESS_FINE_LOCATION');
        // } else {
        //   console.log('ACCESS_FINE_LOCATION permission denied');
        // }
      } else {
        await getUserCurrentLocation();

        if (Roles.includes('is_selfi_required')) {
          refRBSheetBA_MT.current.open();
        } else {
          if (network) {
            refRBSheet.current.open();
          } else {
            toast.show('No internet.', {
              type: 'danger',
              placement: 'bottom',
              duration: 3000,
              offset: 30,
              animationType: 'slide-in',
            });
          }
        }
      }
    } else {
      toast.show('No internet.', {
        type: 'danger',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
    }
  }

  async function handledaystart() {
    await refRBSheet.current.close();
    setTimeout(() => {
      props.onpress();
    }, 400);
  }

  const handleTodayTrip = id => {
    if (tripId == id) {
      props.setTodayTrip('');
      setTripId('');
    } else {
      props.setTodayTrip(id);
      setTripId(id);
    }
  };


  return (
    <>
      <View style={{ ...styles.EndMYDAY, backgroundColor: themecolor.BOXTHEMECOLOR, }}>
        <View style={styles.EndMYDAY2}>
          <TouchableOpacity
            style={styles.FLEXJ}
            activeOpacity={0.5}
            onPress={() => {
              // setCt(getcurrentTime());
              // setAmPm(getcurrentAmPm());
              // if (Roles.includes('is_selfi_required')) {

              //   refRBSheetBA_MT.current.open();
              // } else {
              //   refRBSheet.current.open();
              // }
              strtday();
            }}>
            <View style={styles.LEFT20}>
              <View>
                <Text style={{ ...styles.STARTBEATTEXT, color: themecolor.TXTWHITE }}>Lets Start your day</Text>
              </View>
              <View style={styles.BEATICON}>
                <View style={styles.PlayIconView}>
                  <FAIcon
                    name="play"
                    color={'#FFF'}
                    style={styles.PlayIconstyle}
                  />
                </View>
                <Text style={{ ...styles.StartDayText, color: themecolor.ICON }}>Start my day!</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <RBSheet
        ref={refRBSheet}
        animationType={'slide'}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          container: {
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 0,
            height: todaysTrip.length == 0 ? 240 : 310,
            backgroundColor: themecolor.RB2,
          },
          draggableIcon: {
          },
        }}>
        <View style={styles.FirstRBVIEW}>
          <View>
            <Text style={{ ...styles.RBCardText, }}>
              {ct}
              <Text style={{ ...styles.AMPMText, }}>{ampm}</Text>
            </Text>
            {/* </View> */}
            <Text style={{ ...styles.CardText, fontSize: 20, }}>{` ${dayName[date.getDay()]
              },  ${date.getDate()} ${monthName1[date.getMonth()]} ${date
                .getFullYear()
                .toString()}`}</Text>

            <View style={{ marginVertical: 1 }} />
            {
              todaysTrip.length != 0 ? (
                <View
                  style={{
                    ...styles.RBNEWVIEW,
                    alignItems: 'center',
                    flexDirection: 'column',
                    height: 50,
                  }}>
                  <View>
                    {todaysTrip.length >= 1 ? (
                      todaysTrip.map(i => {
                        return (
                          <View
                            style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Checkbox
                              // value={checked1}
                              tintColors={{ true: Colors.bluetheme, false: 'black' }}
                              // style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
                              color={themecolor.HEADERTHEMECOLOR}
                              uncheckedColor={'black'}
                              status={tripId == i.TripId ? 'checked' : 'unchecked'}
                              onPress={() => handleTodayTrip(i.TripId)}
                            />
                            <TouchableOpacity>
                              <Text
                                style={{
                                  // color: 'black',
                                  fontFamily: FontFamily.PopinsRegular,
                                  color: "#000"
                                }}>
                                {i.TripOriginName.split(' ')[0]} to{' '}
                                {i.TripDestinationName.split(' ')[0]}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        );
                      })
                    ) : (
                      <></>
                    )}
                  </View>
                </View>
              ) : (<></>)}

            <View style={styles.RBNEWVIEW}>
              <Text style={{ ...styles.CardTextRBNew, }}>
                <FAIcon name="map-marker" size={13} />
                &nbsp;
                {formattedaddress}
              </Text>
            </View>

            <View style={styles.SDBVIEW}>
              <FullsizeButton
                width={width * 0.9}
                backgroundColor={themecolor.HEADERTHEMECOLOR}
                onPress={handledaystart}
                title="Start My Day"
              />
            </View>
          </View>
        </View>
        <View style={styles.PV30} />
      </RBSheet>
      {/* <Agenda/> */}

      {/* Capture Selfie Start */}
      <RBSheet
        ref={refRBSheetBA_MT}
        animationType={'slide'}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={380}
        customStyles={{
          container: {
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            backgroundColor: themecolor.RB2,
          },
          draggableIcon: {
            display: 'none',
          },
        }}>
        <View style={styles.FirstRBVIEW}>
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'center',
              }}>
              <Text style={styles.RBCardText}>
                {ct}
                <Text style={{ ...styles.AMPMText }}>{ampm}</Text>
              </Text>
            </View>
            <Text style={{ ...styles.CardText, fontSize: 20 }}>{` ${dayName[date.getDay()]
              },  ${date.getDate()} ${monthName1[date.getMonth()]} ${date
                .getFullYear()
                .toString()}`}</Text>
            <Video
              source={require('../../assets/images/gif/selfie-capture.webm')}
              style={styles.backgroundVideo}
              muted={true}
              resizeMode={'contain'}
              repeat={true}
              rate={2.0}
              ignoreSilentSwitch={'obey'}
            />
            <View style={{ marginVertical: 5 }} />
            <View style={styles.RBNEWVIEW}>
              <Text style={styles.CardTextRBNew}>
                <FAIcon name="map-marker" size={13} />
                &nbsp;
                {formattedaddress}
              </Text>
            </View>
            <View style={styles.SDBVIEW}>
              <FullsizeButton
                width={width * 0.9}
                backgroundColor={themecolor.HEADERTHEMECOLOR}
                // onPress={()=>{refRBSheetBA_MT.current.close(); refRBSheetBA_MTCapture.current.open()}}
                onPress={() => captureImage('photo')}
                Icon="arrow-forward-ios"
                title="Capture Selfie"
              />
            </View>
          </View>
        </View>
        <View style={styles.PV15} />
      </RBSheet>
      {/* Capture Selfie End */}

      {/* Capture2 Selfie Start */}
      <RBSheet
        ref={refRBSheetBA_MTCapture}
        animationType={'slide'}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={380}
        customStyles={{
          container: {
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            backgroundColor: themecolor.RB2,
          },
          draggableIcon: {
            display: 'none',
          },
        }}>
        <View style={styles.FirstRBVIEW}>
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'center',
              }}>
              <Text style={styles.RBCardText}>
                {ct}
                <Text style={{ ...styles.AMPMText }}>{ampm}</Text>
              </Text>
            </View>
            <Text style={{ ...styles.CardText, fontSize: 20 }}>{` ${dayName[date.getDay()]
              },  ${date.getDate()} ${monthName1[date.getMonth()]} ${date
                .getFullYear()
                .toString()}`}</Text>
            <View style={styles.ProImageView}>
              <Image
                source={{ uri: `data:image/jpeg;base64,${punchInSelfie}` }}
                style={styles.ProImage}
                resizeMode={'cover'}
              />
            </View>
            <View style={{ marginVertical: 5 }} />
            <View style={styles.RBNEWVIEW}>
              <Text style={styles.CardTextRBNew}>
                <FAIcon name="map-marker" size={13} />
                &nbsp;
                {formattedaddress}
              </Text>
            </View>
            <View style={styles.SDBVIEW}>
              <FullsizeButton
                width={width * 0.9}
                backgroundColor={themecolor.HEADERTHEMECOLOR}
                // onPress={()=>refRBSheetBA_MTCapture.current.close() }
                //   onPress={()=>alert("Hello")}

                onPress={props.onpress}
                Icon=""
                title="Start My Day"
              />
            </View>
          </View>
        </View>
        <View style={styles.PV15} />
      </RBSheet>
      {/* Capture2 Selfie End */}
    </>
  );
}


export function ComponentEndDays(props) {
  console.log("ComponentEndDays render child")
  const toast = useToast()
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  const refRBSheet5 = useRef();
  const refRBSheetBA_MTClose = useRef();
  const refRBSheetBA_MTCaptureClose = useRef();
  const [date, setDate] = useState(new Date());
  const [punchinTime, setPunchinTime] = useState('');
  const [ctime, setCtime] = useState('');
  const [ampm, setAmpm] = useState('');
  const [timedifference, setTimedifference] = useState('');
  const [mh, setMh] = useState('');
  const [loader, setLoader] = useState(true);
  const [checkinoutstatus, setCheckInOutstatus] = useState('');

  const [formattedaddress, setFormattedAddress] = useState('');
  const [filePath, setFilePath] = useState({
    uri: 'https://picsum.photos/200/300?random=1',
  });
  const [refresh, setRefresh] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const punchInSelfie = useSelector(state => state.BAPunchInSelfie);
  console.log('Selfie........🤐', punchInSelfie);
  const Roles = useSelector(state => state.userRoles);
  console.log('Roles............😫', Roles);
  const currentLatLng = useSelector(state => state.currentLatLng);
  const isDataSyncPening = useSelector(state => state.isDataSyncPening);
  const [dataPending, setDataPending] = useState(isDataSyncPening);
  console.log("dataPending-------------", dataPending)

  console.log("isDataSyncPening============1439==>", isDataSyncPening);
  const [refreshForSync, setRefreshForSync] = useState(false);

  const apikey = useSelector(state => state.googleAPI);

  const getUserCurrentLocation = async () => {
    let add = await getUserCurrentLocationCommon(
      currentLatLng.latitude,
      currentLatLng.longitude,
    );
    setFormattedAddress(add);
    // setFormattedAddress(f.results[0].formatted_address);
  };

  async function getUserCurrentAddress(lat, lng) {
    const f_address = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apikey}`,
    );
    const f = await f_address.json();
    // console.log("full address24", f.results[0])
    console.log(
      'fffffff7845==========224===>>>>',
      f.results[0].formatted_address,
    );
    setFormattedAddress(f.results[0].formatted_address);
  }

  useEffect(() => {
    getUserCurrentLocation();
  }, []);


  useEffect(() => {
    setDataPending(isDataSyncPening)
  }, [refreshForSync])


  var monthName1 = [
    'Jan',
    'Feb',
    'Mar',
    'April',
    'May',
    'June',
    'July',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const dayName = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const openSettings = () => {
    navigation.push('Splash');
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:');
    } else {
      Linking.openSettings();
    }
  };

  const temporaryFun = async () => {
    const result10 = await attendanceStatusGetData('api/punchStatus');
    if (currentLatLng.latitude == '' || currentLatLng.longitude == '') {
      // alert('Please allow location Permission or enable your location. And restart the app');
      Alert.alert(
        'Please provide the location permission from settings ',
        'Make sure to enable device location',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'Go To Settings',
            onPress: () => {
              openSettings();
            },
          },
        ],
      );
    } else {
      await getUserCurrentLocation();

      if (result10.statusCode == 200) {
        console.log('status api data ', result10.data.Resp.AttendenceRec.StartTime);
        const inTime = result10.data.Resp.AttendenceRec?.StartTime?.slice(0, 5);
        const intime_2 = moment(`${inTime}`, `hh:mm A `).format(`hh:mm A`);
        setPunchinTime(intime_2);

        var inhour = inTime.split(':')[0];
        var inmins = inTime.split(':')[1];
        // var insec = inTime.split(':')[2];

        var cTime = new Date();
        var hh = cTime.getHours();
        var mm = cTime.getMinutes();
        // var ss = cTime.getSeconds();
        // alert('hh'+''+hh)
        // if(hh>0){
        //   mh = 'h'
        // }else{
        //   mh = 'm'
        // }
        // setMh(mh)
        const time1 = moment(`${inhour}:${inmins}`, `hh:mm`);
        const time2 = moment(`${hh}:${mm}`, `hh:mm`);
        const subtract = JSON.stringify(time2.subtract(time1));
        const splited_time = subtract?.split('T')[1]?.split('.')[0]?.slice(0, 5);
        const diffhr = splited_time?.split(':')[0];
        st = '';
        if (diffhr > 0) {
          st = 'h';
        } else {
          st = 'm';
        }
        setMh(st);

        setDate(new Date());
        // setInterval(() => {
        setCtime(getcurrentTime());
        setAmpm(getcurrentAmPm());

        // }, 1000)
        setTimedifference(splited_time);
        // alert('banner')
        setLoader(false);
        // refRBSheet5.current.open();
        // console.log("timetimetime", getcurrentTime())

        if (Roles.includes('is_selfi_required')) {
          if (
            Roles.includes('can_verify_outlet') &&
            checkinoutstatus == 'Checked in'
          ) {
            console.log('checked in');
          } else {
            refRBSheetBA_MTClose.current.open();
          }
        } else {
          refRBSheet5.current.open();
        }
      } else {
        console.log('iN eLSE cheKiN lINE 1067', result10);
      }
    }
  };


  // const checkDataPendingForSync =async () => {
  //   let checkindatapending = await AsyncStorage.getItem('@checkindatapending');
  //   console.log('checkindatapending 1602 in DashbordStartDay===',checkindatapending);
  // };


  // useFocusEffect(
  //   React.useCallback(() => {
  //     checkDataPendingForSync();
  //     setRefreshForSync(!refreshForSync);
  //   },[])
  // )



  const endDayBannerTime = async () => {
    await getUserCurrentLatLngNew();
    let beatStatus = await AsyncStorage.getItem('@beatStatus');
    console.log('beatStatus======> 1078', beatStatus);
    let checkindatapending = await AsyncStorage.getItem('@checkindatapending');
    let orderdatapending = await AsyncStorage.getItem('@orderdatapending');
    let k = JSON.parse(checkindatapending);
    console.log('checkindatapending 1619 in DashbordStartDay===', checkindatapending);
    console.log('orderdatapending 1622 in DashbordStartDay===', orderdatapending);

    if (Roles.includes('can_do_beats') && beatStatus === '"Started"') {
      toast.show('Plase end your beat first', {
        type: 'danger',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
    }
    //If checkin data pending for sync 
    else if (checkindatapending != null) {
      if (k.Checkout_Lat == null) {
        toast.show(`Please checkout first recently visited outlet ${k.OutletName}`, {
          type: 'danger',
          placement: 'bottom',
          duration: 3000,
          offset: 30,
          animationType: 'slide-in',
        });
      } else {
        navigation.push('SyncDataScreen', {
          navigateFrom: 'NewDashboard',
        });
      }
    } else if (orderdatapending != null && orderdatapending) {
      navigation.push('SyncDataScreen', {
        navigateFrom: 'NewDashboard',
      });
    }
    else if (Roles.includes('can_verify_outlet')) {
      // alert('')
      const chechinstatus = await gettripLocationApi('api/checkInOutStatus');
      console.log('chechinstatus.statusCode 1071', chechinstatus.statusCode);
      console.log('chechinstatus 1071', chechinstatus);
      if (chechinstatus.statusCode != 400) {
        let stat = chechinstatus.data.data.CheckInStatus;
        setCheckInOutstatus(stat);
        if (stat == 'Checked in') {
          // alert('Please checkout first');
          toast.show("Please checkout first", {
            type: 'warning',
            placement: 'bottom',
            duration: 3000,
            offset: 30,
            animationType: 'slide-in',
          });
        } else {
          // alert('Please checkout hjhuj');
          temporaryFun();
        }
        // } else if (Roles.includes('can_verify_outlet') && stat == 'Checked in') {
        //   alert('Please checkout first');
        //   console.log('stat', stat);
      } else {
        temporaryFun();
      }
    } else {
      temporaryFun();
    }
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

  const captureImage = async type => {
    refRBSheetBA_MTClose.current.close();

    let options = {
      mediaType: type,
      maxWidth: 250,
      maxHeight: 250,
      quality: 0.5,
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
      cameraType:'front'
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
        refRBSheetBA_MTCaptureClose.current.open();

        ImgToBase64.getBase64String(`${response.assets[0].uri}`).then(
          base64String => {
            console.log('Base 64 String ....', base64String);
            let body = {
              imgurl: base64String,
              id: response.assets[0].fileName,
            };
            dispatch({
              type: 'ADD_BA_PUNCH_IN_SELFIE',
              payload: base64String,
            });
            setRefresh(!refresh);
            getBaMediaId(base64String);
          },
        );
      });
    }
  };

  async function getBaMediaId(b64) {
    console.log('inside function', b64);
    let body5 = {
      folder_id: '1',
      media: [b64],
    };

    // console.log("arr", imgarr)
    const result = await uploadMediaApi('api/uploadMediaBase64', body5);
    console.log('result frpm upload media', result);
    const d1 = result.data.toString();
    console.log('d1', d1);
    // props.setPunchoutMediaId(d1)
    StoreDatatoAsync('selfi_punchout', d1);
  }

  return (
    <>
      <View style={{ ...styles.EndMYDAY, backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: Color.Color.BOXBORDERCOLOR }}>
        <View style={styles.EndMYDAY2}>
          {/* setDate(new Date()); refRBSheet5.current.open() */}
          <TouchableOpacity
            style={styles.FLEXJ}
            activeOpacity={0.5}
            onPress={() => {
              endDayBannerTime();
              // if (Roles.includes('is_selfi_required')) {
              //   if (
              //     Roles.includes('can_verify_outlet') &&
              //     checkinoutstatus == 'Checked in'
              //   ) {
              //     console.log('checked in')
              //   }
              //   else {
              //     refRBSheetBA_MTClose.current.open();
              //   }
              // } else {
              //   refRBSheet5.current.open();
              // }
            }}
          // onPress={() => refRBSheet5.current.open()}
          >
            <View style={styles.LEFT20}>
              <View>
                <Text style={{ ...styles.STARTBEATTEXT, color: themecolor.TXTWHITE }}>Let's End your day</Text>
              </View>
              <View style={styles.BEATICON}>
                <View style={styles.PlayIconView}>
                  <FAIcon
                    name="play"
                    color={'#FFF'}
                    style={styles.PlayIconstyle}
                  />
                </View>
                <Text style={styles.StartDayText}>End my day!</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <RBSheet
        ref={refRBSheet5}
        animationType={'slide'}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          container: {
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            height: height * 0.5,
            backgroundColor: themecolor.RB2
          },
          draggableIcon: {
            display: 'none',
          },
        }}>
        {/* <View style={{...styles.Borderline}} /> */}

        <View style={styles.RBSHETT}>
          <AwesomeLoading
            indicatorId={9}
            size={50}
            isActive={loader}
            text="loading..."
          />
          <View>
            <View style={styles.RBSHETT2}>
              <Text style={{ ...styles.RBCardText, }}>
                {/* {`${date.getHours()}:${date.getMinutes()}`} */}
                {ctime}
                <Text style={{ ...styles.AMPMText, }}>{ampm}</Text>
              </Text>
            </View>

            <Text style={{ ...styles.CardText, fontSize: 20 }}>
              {` ${dayName[date.getDay()]},  ${date.getDate()} ${monthName1[date.getMonth()]
                } ${date.getFullYear().toString()}`}
            </Text>

            <View style={styles.MV10} />
            <View style={styles.CLOCKINVIEW}>
              <View style={styles.AITEMS}>
                <EntypoIcon
                  name="back-in-time"
                  style={{ transform: [{ rotateY: '180deg' }] }}
                  size={35}
                  color={Colors.bluetheme}
                />
                <Text style={styles.ClockINText}>Clock in</Text>
                <Text style={styles.TIMECLOCK}>{punchinTime}</Text>
              </View>
              <View style={styles.AITEMS}>
                <EntypoIcon
                  name="back-in-time"
                  size={35}
                  color={Colors.bluetheme}
                />
                <Text style={styles.ClockINText}>Clock out</Text>
                <View style={styles.flexDirectionVIEW}>
                  <Text style={styles.TIMECLOCK}>{ctime}</Text>
                  <Text style={styles.TIMECLOCK}>&nbsp;{ampm}</Text>
                </View>
              </View>
              <View style={styles.AITEMS}>
                <McIcon
                  name="timer-outline"
                  size={35}
                  color={Colors.bluetheme}
                />
                <Text style={styles.ClockINText}>Working hrs'</Text>
                <Text style={styles.TIMECLOCK}>
                  {timedifference} {mh}
                </Text>
              </View>
            </View>
            <View style={styles.MV10} />
            <View style={styles.RBNEWVIEW}>
              <Text style={styles.CardTextRBNew}>

                <FAIcon name="map-marker" size={15} style={{ top: 2 }} />
                &nbsp;{formattedaddress}

              </Text>
            </View>
            <View style={styles.FULLBVIew}>
              <FullsizeButton
                title="End My Day"
                backgroundColor={themecolor.HEADERTHEMECOLOR}
                onPress={props.onpress}
              />
            </View>
          </View>
        </View>
        {/* <View style={styles.PV30} /> */}
      </RBSheet>

      {/* Capture Selfie Start */}
      <RBSheet
        ref={refRBSheetBA_MTClose}
        animationType={'slide'}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={480}
        customStyles={{
          container: {
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            backgroundColor: themecolor.RB2
          },
          draggableIcon: {
            display: 'none',
          },
        }}>
        <View style={styles.FirstRBVIEW}>
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'center',
              }}>
              <Text style={styles.RBCardText}>
                {ctime}
                <Text style={{ ...styles.AMPMText }}>{ampm}</Text>
              </Text>
            </View>
            <Text style={{ ...styles.CardText, fontSize: 20 }}>{` ${dayName[date.getDay()]
              },  ${date.getDate()} ${monthName1[date.getMonth()]} ${date
                .getFullYear()
                .toString()}`}</Text>
            <Video
              source={require('../../assets/images/gif/selfie-capture.webm')}
              style={styles.backgroundVideo}
              muted={true}
              resizeMode={'contain'}
              repeat={true}
              rate={2.0}
              ignoreSilentSwitch={'obey'}
            />
            <View style={{ marginVertical: 5 }} />
            <View style={styles.CLOCKINVIEW}>
              <View style={styles.AITEMS}>
                <EntypoIcon
                  name="back-in-time"
                  style={{ transform: [{ rotateY: '180deg' }] }}
                  size={35}
                  color={Colors.bluetheme}
                />
                <Text style={styles.ClockINText}>Clock in</Text>
                <Text style={styles.TIMECLOCK}>{punchinTime}</Text>
              </View>
              <View style={styles.AITEMS}>
                <EntypoIcon
                  name="back-in-time"
                  size={35}
                  color={Colors.bluetheme}
                />
                <Text style={styles.ClockINText}>Clock out</Text>
                <View style={styles.flexDirectionVIEW}>
                  <Text style={styles.TIMECLOCK}>{ctime}</Text>
                  <Text style={styles.TIMECLOCK}>&nbsp;{ampm}</Text>
                </View>
              </View>
              <View style={styles.AITEMS}>
                <McIcon
                  name="timer-outline"
                  size={35}
                  color={Colors.bluetheme}
                />
                <Text style={styles.ClockINText}>Working hrs'</Text>
                <Text style={styles.TIMECLOCK}>
                  {timedifference} {mh}
                </Text>
              </View>
            </View>
            <View style={styles.RBNEWVIEW}>
              <Text style={styles.CardTextRBNew}>
                <FAIcon name="map-marker" size={13} />
                &nbsp;
                {formattedaddress}
              </Text>
            </View>
            <View style={styles.SDBVIEW}>
              <FullsizeButton
                width={width * 0.9}
                backgroundColor={themecolor.HEADERTHEMECOLOR}
                // onPress={()=>{refRBSheetBA_MTClose.current.close(); refRBSheetBA_MTCaptureClose.current.open()}}
                onPress={() => captureImage('photo')}
                Icon="arrow-forward-ios"
                title="Capture Selfie"
              />
            </View>
          </View>
        </View>
        <View style={styles.PV15} />
      </RBSheet>
      {/* Capture Selfie End */}

      {/* Capture2 Selfie Start */}
      <RBSheet
        ref={refRBSheetBA_MTCaptureClose}
        animationType={'slide'}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={480}
        customStyles={{
          container: {
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            backgroundColor: themecolor.RB2
          },
          draggableIcon: {
            display: 'none',
          },
        }}>
        <View style={styles.FirstRBVIEW}>
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'center',
              }}>
              <Text style={styles.RBCardText}>
                {ctime}
                <Text style={{ ...styles.AMPMText }}>{ampm}</Text>
              </Text>
            </View>
            <Text style={{ ...styles.CardText, fontSize: 20 }}>{` ${dayName[date.getDay()]
              },  ${date.getDate()} ${monthName1[date.getMonth()]} ${date
                .getFullYear()
                .toString()}`}</Text>
            <View style={styles.ProImageView}>
              <Avatar.Image
                source={{ uri: `data:image/jpeg;base64,${punchInSelfie}` }}
                // style={{width:120,height:120,borderRadius:100}}
                // resizeMode={'contain'}
                size={120}
              />
            </View>
            <View style={{ marginVertical: 10 }} />
            <View style={styles.CLOCKINVIEW}>
              <View style={styles.AITEMS}>
                <EntypoIcon
                  name="back-in-time"
                  style={{ transform: [{ rotateY: '180deg' }] }}
                  size={35}
                  color={Colors.bluetheme}
                />
                <Text style={styles.ClockINText}>Clock in</Text>
                <Text style={styles.TIMECLOCK}>{punchinTime}</Text>
              </View>
              <View style={styles.AITEMS}>
                <EntypoIcon
                  name="back-in-time"
                  size={35}
                  color={Colors.bluetheme}
                />
                <Text style={styles.ClockINText}>Clock out</Text>
                <View style={styles.flexDirectionVIEW}>
                  <Text style={styles.TIMECLOCK}>{ctime}</Text>
                  <Text style={styles.TIMECLOCK}>&nbsp;{ampm}</Text>
                </View>
              </View>
              <View style={styles.AITEMS}>
                <McIcon
                  name="timer-outline"
                  size={35}
                  color={Colors.bluetheme}
                />
                <Text style={styles.ClockINText}>Working hrs'</Text>
                <Text style={styles.TIMECLOCK}>
                  {timedifference} {mh}
                </Text>
              </View>
            </View>
            <View style={{ marginVertical: 10 }} />
            <View style={styles.RBNEWVIEW}>
              <Text style={styles.CardTextRBNew}>
                <FAIcon name="map-marker" size={13} />
                &nbsp;
                {formattedaddress}
              </Text>
            </View>
            <View style={styles.SDBVIEW}>
              <FullsizeButton
                width={width * 0.9}
                backgroundColor={themecolor.HEADERTHEMECOLOR}
                // onPress={()=>refRBSheetBA_MTCaptureClose.current.close() }
                //   onPress={()=>alert("Hello")}

                onPress={props.onpress}
                Icon=""
                title="End My Day"
              />
            </View>
          </View>
        </View>
        <View style={styles.PV15} />
      </RBSheet>
      {/* Capture2 Selfie End */}
    </>
  );
}

export function TourPlan(props) {
  return (
    <View
      style={{
        ...styles.EndMYDAY,
        backgroundColor: Color.Color.BOXTHEMECOLOR,
        borderWidth: 0.5,
        borderColor: Color.Color.BOXBORDERCOLOR,
      }}>
      <View style={styles.EndMYDAY2}>
        <TouchableOpacity
          style={styles.FLEXJ}
          activeOpacity={0.5}
          onPress={() => { }}>
          <View style={styles.LEFT20}>
            <View>
              <Text style={{ ...styles.STARTBEATTEXT, color: Color.Color.TXTWHITE }}>Tour Plan</Text>
            </View>
            <View style={styles.BEATICON}>
              <View style={styles.BEATVIew}>
                <Image
                  style={styles.BEATVIew}
                  source={require('../../assets/images/dashboard/beat.png')}
                />
              </View>
              <Text style={{ ...styles.StartDayText, color: Color.Color.TXTWHITE }}>Select Outlets</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const ComponentJointWorking = (props) => {
  const navigation = useNavigation();
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  const [teamMemberName, setTeamMemberName] = useState('')

  // useEffect(()=>{
  //   try{
  //     const getDetails=async()=>{
  //       const data = await getEmployeeDetailsById(props.jointEmpName)
  //       setTeamMemberName(data.EmployeeName)
  //     }
  //     getDetails()
  //   }catch(e){
  //     alert(e)
  //   }
  // },[props.jointEmpName])

  return (
    <>
      <View style={{ ...styles.EndMYDAY, backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: Color.Color.BOXBORDERCOLOR }}>
        <View style={styles.EndMYDAY2}>
          {/* setDate(new Date()); refRBSheet5.current.open() */}
          <View
            style={styles.FLEXJ}
            activeOpacity={0.5}
            onPress={() => {
              // endDayBannerTime();
              // if (Roles.includes('is_selfi_required')) {
              //   if (
              //     Roles.includes('can_verify_outlet') &&
              //     checkinoutstatus == 'Checked in'
              //   ) {
              //     console.log('checked in')
              //   }
              //   else {
              //     refRBSheetBA_MTClose.current.open();
              //   }
              // } else {
              //   refRBSheet5.current.open();
              // }
            }}
          // onPress={() => refRBSheet5.current.open()}
          >
            <View style={styles.LEFT20}>
              <View>
                <Text style={{ ...styles.STARTBEATTEXT, fontSize: 17, color: themecolor.TXTWHITE }}>You are jointly working with</Text>
              </View>
              <View style={{ height: 5 }} />
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', width: width * 0.8, alignSelf: 'center' }} >

                <View style={styles.BEATICON}>
                  <View style={styles.PlayIconView}>
                    <FAIcon
                      name="user"
                      color={'#FFF'}
                      size={13}
                      style={{ top: -1 }}
                    />
                  </View>
                  <Text style={styles.StartDayText}>{props.jointEmpName}</Text>
                </View>
                <TouchableOpacity style={{ ...styles.BEATICON, alignItems: 'center' }} onPress={() => navigation.navigate('JointWorking', { changeEmp: true, changeAgenda: false })} >
                  <View style={{ top: 2, marginLeft: 10 }}>
                    {/* <FAIcon
                      name="edit"
                      color={'tomato'}
                      size={17}
                      style={{ top: -1 }}
                    /> */}
                  </View>
                  <Text style={{ ...styles.StartDayText, color: 'tomato' }} ></Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </>
  )
}

ComponentJointWorking.defaultProps = {
  jointEmpName: '_______'
}

export { ComponentBeatStart, ComponentBeatEnd, ComponentViewRoasterPlan, ComponentBeatStartShimmer, ComponentJointWorking };
