import React, { useEffect, useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import StyleCss from '../../assets/css/styleOutlet';
import styles from '../../assets/css/styleChangeAgenda';
import { FlatList } from 'react-native-gesture-handler';
import {
  createTripApi,
  gettripLocationApi,
} from '../../repository/trip/tripRepository';
import { useNavigation } from '@react-navigation/native';
import {
  getDatafromAsync,
  removeDatafromAsync,
  StoreDatatoAsync,
} from '../../repository/AsyncStorageServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useToast } from 'react-native-toast-notifications';
import {
  getTeamlist,
  getUserCurrentLocationCommon,
  requestLocationPermission,
  SERVER_URL,
} from '../../repository/commonRepository';
import { useDispatch, useSelector } from 'react-redux';
import { attendancePostData } from '../../repository/attendence/attendence';
import LoaderAllInOne from '../../components/shared/Loader';
import { RoasterPlanOutlets } from '../../repository/dashboard/DashboardRepository';
import { db } from '../../helper/SQLite DB/Sqlite';
import { Colors } from '../../assets/config/Colors';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import {
  outletBeatDump,
  TruncateAllTables,
  insertOutcomeData,
  insertMappingData,
  insertStockDataIfNotInserted,
  // insertStockData
} from '../../screens/SharedScreens/InsertData';



export default function AgendaModal(props) {
  // alert("props=="+JSON.stringify(props))

  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  const navigation = useNavigation();
  const toast = useToast();
  const dispatch = useDispatch();
  const [agendadata, setAgendadata] = useState([]);
  const [event, setEvent] = useState('');
  const [loader, setLoader] = useState(false);
  const [modalVisible, setModalVisible] = useState(true);
  // const [modalVisible4, setModalVisible4] = useState(false);
  // alert(modalVisible4)

  const [baseUrl, setBaseUrl] = useState('');
  // const [agendaid,setAgendaId] = useState();
  const [formattedaddress, setFormattedAddress] = useState('');
  // console.log('hasdsh_add', formattedaddress);
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const currentLatLng = useSelector(state => state.currentLatLng);

  useEffect(() => {
    // console.log('currentlatlong useeffect', currentLatLng);
    let lat = currentLatLng.latitude;
    let long = currentLatLng.longitude;
    setLat(lat);
    setLng(long);
    async function faddres() {
      const f_add = await getUserCurrentLocationCommon(lat, long);
      console.log('f_add in agenda', f_add);
      setFormattedAddress(f_add);
    }
    faddres();
    async function temp() {
      const url = await SERVER_URL()
      setBaseUrl(url);
    }
    temp();
  }, []);

  async function onsubmit(item, props) {
    console.log("Item======= Line 75 ChangeAgenda========>", item)
    props.setShowagenda(!props.showagenda);
    setModalVisible(!modalVisible);
    setLoader(true);
    await StoreDatatoAsync('agendatype', item.Agendacontroltype);

    try {
      // dispatch({type:'REMOVE_JOINT_WORKING_TEAM_ID'})
      if (props.changeAgenda == true) {
        if (item.Agendacontroltype == 'JointWorking') {
          let beatStatus = await AsyncStorage.getItem('@beatStatus');
          if (beatStatus === '"Started"') {
            toast.show('Plase end your beat first', {
              type: 'danger',
              placement: 'bottom',
              duration: 3000,
              offset: 30,
              animationType: 'slide-in',
            });
            props.setShowagenda(!props.showagenda);

          } else {
            navigation.navigate('JointWorking', {
              lat,
              lng,
              formattedaddress,
              todayTrip: props.todayTrip,
              agendaId: item.Agendaid,
              agendaCtype: item.Agendacontroltype,
              changeAgenda: props.changeAgenda,
              changeEmp: false,
            });
            props.setShowagenda(!props.showagenda);
          }
        } else {
          await AsyncStorage.removeItem('teamEmpId');
          const punchStatus = await gettripLocationApi('api/punchStatus');
          console.log('punchStatusForChangeAgenda', punchStatus);
          if (punchStatus.statusCode == 200) {
            if (punchStatus.data.Resp.AttendenceStatus == 'Punched in') {
              const attenId = punchStatus.data.Resp.AttendenceRec.AttendanceId;
              const ageId = item.Agendaid;
              const agendaChng = await createTripApi(
                `api/changeAgenda?attendance_id=${attenId}&agenda_id=${ageId}`,
              );
              console.log('=============>>>>>>>>>>>');

              await AsyncStorage.setItem('attendencestatus', 'Punched in');
              await StoreDatatoAsync('agendatype', 'FieldWork');

              console.log('changeAgendaResult', agendaChng);
              if (agendaChng.statusCode == 200) {
                // const agenda_type = `${agendaChng.data[0].Agendatypes.Agendacontroltype}`;
                // const agenda_id = agendaChng.data[0].AgendaId
                props.setShowagenda(false);

                /***If Agenda Change SuccessFully From Action and user choose Roster Plan Start */
                await TruncateAllTables();
                await AsyncStorage.removeItem('@beatId');
                await AsyncStorage.removeItem('@beatName');
                await AsyncStorage.removeItem('@firstTime');
                await AsyncStorage.setItem(
                  '@beatStatus',
                  JSON.stringify('NotStarted'),
                );
                await outletBeatDump();

                await insertMappingData();
                // await insertStockData();
                await StoreDatatoAsync('agendatype', item.Agendacontroltype);
                //  await StoreDatatoAsync('attendencestatus', item.Agendacontroltype);
                await insertOutcomeData();
                setTimeout(async () => {
                  await insertStockDataIfNotInserted();
                }, 2000);
                if (item.Agendacontroltype == 'RosterPlan') {
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
                      if (
                        res.data[0].OutletIds != null &&
                        res.data[0].OutletIds != ''
                      ) {
                        /*** Truncate Beat table Start ****/

                        db.transaction(async function (tx) {
                          tx.executeSql(
                            'DELETE FROM Beat',
                            [],
                            (tx, results) => { },
                          );
                        });
                        /**** Truncate Beat table End  ***/

                        /**
                         * Insert new data Beat Data
                         *
                         */
                        db.transaction(async function (tx) {
                          res.data[0].OutletIds.split(',')
                            .flat()
                            .forEach(async item => {
                              console.log('item@@@@@@@@@', item);
                              await tx.executeSql(
                                'insert into Beat(outletId,visitstatus) VALUES(?,?)',
                                [item, 'Pending'],
                                (tx, results) => {
                                  console.log(
                                    'Data Inserted Into Beat===',
                                    results,
                                  );
                                },
                              );
                            });
                        });

                        /****************/
                      }
                    }
                  } catch (e) {
                    // alert(e)
                    // toast.show('Something went wrong!, please try again later.', {
                    toast.show(e, {
                      type: 'danger',
                      placement: 'bottom',
                      duration: 3000,
                      offset: 30,
                      animationType: 'slide-in',
                    });
                  }
                }
                /***If Agenda Change SuccessFully From Action End */

                navigation.reset({
                  index: 0,
                  routes: [
                    {
                      name: 'NewDashboard',
                    },
                  ],
                });
                toast.show(agendaChng.message, {
                  type: 'success',
                  placement: 'bottom',
                  duration: 3000,
                  offset: 30,
                  animationType: 'slide-in',
                });
                // props.setAgendaType(agenda_type);
                // props.setAgendaId(agenda_id);
                // alert(JSON.stringify(agenda_id))
                // alert(agenda_type)
              } else if (agendaChng.statusCode == 400) {
                toast.show('Dont select same agenda', {
                  type: 'warning',
                  placement: 'bottom',
                  duration: 3000,
                  offset: 30,
                  animationType: 'slide-in',
                });
              }
            } else {
              toast.show(
                'First Start your day and choose Agenda of the Day.Then only you are able to change agenda',
                {
                  type: 'warning',
                  placement: 'bottom',
                  duration: 5000,
                  offset: 30,
                  animationType: 'slide-in',
                },
              );
            }
          }
        }
      } else {
        if (item.Agendacontroltype == 'JointWorking') {
          props.setAgendaType(item.Agendacontroltype);
          navigation.navigate('JointWorking', {
            lat,
            lng,
            formattedaddress,
            todayTrip: props.todayTrip,
            agendaId: item.Agendaid,
            agendaCtype: item.Agendacontroltype,
            changeAgenda: props.changeAgenda,
          });
          props.setShowagenda(!props.showagenda);
        } else {
          await AsyncStorage.removeItem('teamEmpId');
          setLoader(true);
          await requestLocationPermission();
          await removeDatafromAsync('teamEmpId');
          if (props.todayTrip == '') {
            var result = await attendancePostData(
              `api/punchin?latlnt=${lat}%2C${lng}&location=${formattedaddress}&agenda_id=${item.Agendaid}`,
            );
          } else {
            var result = await attendancePostData(
              `api/punchin?latlnt=${lat}%2C${lng}&location=${formattedaddress}&trip_id=${props.todayTrip}&agenda_id=${item.Agendaid}`,
            );
          }
          if (result.statusCode == 200) {
            console.log(JSON.stringify(result));

            await props.punchin();
            await TruncateAllTables();
            await AsyncStorage.removeItem('@beatId');
            await AsyncStorage.removeItem('@beatName');
            await AsyncStorage.removeItem('@firstTime');
            await AsyncStorage.setItem(
              '@beatStatus',
              JSON.stringify('NotStarted'),
            );
            await outletBeatDump();
            props.setAgendaId(item.Agendaid);
            props.setAgendaType(item.Agendacontroltype);
            props.setShowagenda(false);
            await insertMappingData();
            // await insertStockData();
            await StoreDatatoAsync('agendatype', item.Agendacontroltype);
            await AsyncStorage.setItem('attendencestatus', 'Punched in');
            await insertOutcomeData();
            setTimeout(async () => {
              await insertStockDataIfNotInserted(9);
            }, 2000);
            await AsyncStorage.removeItem('teamEmpId');

            if (item.Agendacontroltype == 'RosterPlan') {
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
                  if (
                    res.data[0].OutletIds != null &&
                    res.data[0].OutletIds != ''
                  ) {
                    /*** Truncate Beat table Start ****/

                    db.transaction(async function (tx) {
                      tx.executeSql(
                        'DELETE FROM Beat',
                        [],
                        (tx, results) => { },
                      );
                    });
                    /**** Truncate Beat table End  ***/

                    /**
                     * Insert new data Beat Data
                     *
                     */
                    db.transaction(async function (tx) {
                      res.data[0].OutletIds.split(',')
                        .flat()
                        .forEach(async item => {
                          console.log('item@@@@@@@@@', item);
                          await tx.executeSql(
                            'insert into Beat(outletId,visitstatus) VALUES(?,?)',
                            [item, 'Pending'],
                            (tx, results) => {
                              console.log(
                                'Data Inserted Into Beat===',
                                results,
                              );
                            },
                          );
                        });
                    });

                    /****************/
                  }
                }
              } catch (e) {
                toast.show(e, {
                  type: 'danger',
                  placement: 'bottom',
                  duration: 3000,
                  offset: 30,
                  animationType: 'slide-in',
                });
              }
            }
            // setLoader(false);
          } else {
            props.setShowagenda(false);
            toast.show('Something went wrong!, please try again later.', {
              type: 'danger',
              placement: 'bottom',
              duration: 3000,
              offset: 30,
              animationType: 'slide-in',
            });
            // setLoader(false);
          }
        }
      }
      setLoader(false);
    } catch (e) {
      console.log('EEEEe in AjendaModal Line 65', e);
      toast.show('Something went wrong!, please try again later.', {
        type: 'danger',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
    }
    setLoader(false);
  }

  const squareCard = (item, baseUrl, props) => {
    return (
      <>
        {/* <Text>{item.title}</Text> */}
        <TouchableOpacity
          style={{
            ...styles.innerview,
            flex: 1,
            backgroundColor: themecolor.MODAL,
            borderWidth: 1,
            borderColor: Colors.borderColor1,
          }}
          onPress={() => {
            onsubmit(item, props);
          }}>
          <View
            style={{
              ...styles.ImageView,
              backgroundColor: 'white',
              overflow: 'hidden',
              borderWidth: 1,
              borderColor: Colors.borderColor1,
            }}>
            <Image
              style={styles.IMGStyle}
              source={{
                uri: `${baseUrl}media?id=${item.Agendaimage}`,
              }}
              resizeMode={'cover'}
            />
          </View>
          <View style={{ height: 3 }} />
          <View style={{}}>
            <Text style={styles.CardText}>{item.Agendname}</Text>
          </View>
        </TouchableOpacity>
      </>
    );
  };

  const getagenda = async () => {
    let roleId = await getDatafromAsync('@user');
    let haveTeam = await getTeamlist();
    let teamCount = haveTeam.length;

    console.log('user****>', roleId.data.RoleId);
    const result = await gettripLocationApi(
      `api/getAgendas?role_id=${roleId.data.RoleId}`,
    );
    console.log('result of agenda api', result.data.Agenda);
    let filteredAgenda = result.data.Agenda.filter(item => {
      return item.Agendacontroltype != 'JointWorking';
    });
    if (teamCount > 0) {
      setAgendadata(result.data.Agenda);
    } else {
      setAgendadata(filteredAgenda);
    }
    setEvent(result.data.Event);
  };

  useEffect(() => {
    getagenda();
  }, []);

  return (
    <>
      {loader ? (
        <>
          <LoaderAllInOne />
          {/* <LoadingFullScreen style={{flex:1,zIndex:99999,position:'absolute'}}/> */}
        </>
      ) : (
        <></>
      )}

      <View style={{ flex: 1 }}>
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onDismiss={() => {
              props.setShowagenda(!props.showagenda);
              setModalVisible(!modalVisible);
            }}
            onRequestClose={() => {
              props.setShowagenda(!props.showagenda);
              setModalVisible(!modalVisible);
            }}>
            <View style={{ ...StyleCss.centeredView }}>
              <View
                style={{
                  ...StyleCss.modalView,
                  borderWidth: 1,
                  borderColor: themecolor.BOXBORDERCOLOR1,
                  backgroundColor: themecolor.RB2,
                }}>
                <View style={StyleCss.ModalViewWidth}>
                  <View>
                    <Text
                      style={{
                        ...StyleCss.submittext,
                        color: themecolor.TXTWHITE,
                      }}>
                      Select Agenda
                    </Text>
                  </View>
                  <View style={styles.H} />
                  <View style={{}}>
                    <FlatList
                      data={agendadata}
                      renderItem={({ item }) => squareCard(item, baseUrl, props)}
                      numColumns={2}
                      scrollEnabled={true}
                      columnWrapperStyle={{
                        flex: 1,
                        justifyContent: 'space-around',
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>
          </Modal>

          {/* <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible4}
            onDismiss={() => {
              // props.setShowagenda(!props.showagenda);
              setModalVisible4(!modalVisible4);
            }}
            onRequestClose={() => {
              // props.setShowagenda(!props.showagenda);
              setModalVisible4(!modalVisible4);
            }}>
            <View style={{ ...StyleCss.centeredView, }}>
              <View style={{ ...StyleCss.modalView, borderWidth: 1, borderColor: Colors.borderColor }}>
                <View style={StyleCss.ModalViewWidth}>
                  <View>
                    <Text style={StyleCss.submittext}>Select Agenda</Text>
                  </View>
                  <View style={styles.H} />
                  <View style={{}}>
                    <FlatList
                      data={teamData}
                      renderItem={({ item }) =><TeamList item={item} />}
                      numColumns={2}
                      columnWrapperStyle={{
                        flex: 1,
                        justifyContent: 'space-around',
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>
          </Modal> */}
        </View>

      </View>
    </>
  );
}
