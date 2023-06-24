import React, {useState, useEffect} from 'react';
import CarouselList from '../../components/shared/CarousalDataList';
import DashboardButtonGrid from '../../components/shared/DashboardButtonGrid';
import Header from '../../components/shared/Header';
import {
  getAppToken,
  getEmployeeId,
  getUserCurrentLocationCommon,
  requestLocationPermission,
} from '../../repository/commonRepository';
import Geolocation from '@react-native-community/geolocation';
import {
  ComponentStartDays,
  ComponentBeatStart,
  ComponentEndDays,
  ComponentBeatEnd,
  ComponentViewRoasterPlan,
  ComponentBeatStartShimmer,
} from '../../components/shared/DashboardStartDay';
import {useToast} from 'react-native-toast-notifications';
import {
  attendancePostData,
} from '../../repository/attendence/attendence';
import {gettripLocationApi} from '../../repository/trip/tripRepository';
import {store} from '../../../App';
import {
  StoreDatatoAsync,
  getDatafromAsync,
  removeDatafromAsync,
} from '../../repository/AsyncStorageServices';
import {getUserProfile} from '../../repository/commonRepository';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {db} from '../../helper/SQLite DB/Sqlite';
import {useFocusEffect} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import AgendaModal from '../../components/Modals/AjendaModal';
import moment from 'moment';
import {
  getDailyCalls,
  getTargetWiseSales,
} from '../../repository/report/ReportRepository';
import {MyThemeClass} from '../../components/Theme/ThemeDarkLightColor';
import {
  insertMappingData,
  insertOutcomeData,
  insertStockData,
  outletBeatDump,
  TruncateAllTables,
} from '../SharedScreens/InsertData';
import {getCheckInOutStatus} from '../../repository/outlet/VerifyOutletRepository';
import {CategoryWiseOrderReport} from '../../components/ReportsComponent/CategoryWiseOrderReport';
import TargetVsAchievementReport from '../../components/ReportsComponent/TargetvsAchievementReport';
import {StatusBar, View, ScrollView, Alert,
  //  Appearance
  } from 'react-native';
// import MonthtillDateCallReport from '../../components/ReportsComponent/MonthtillDateCallReport';
// import DailyCallsReport from '../../components/ReportsComponent/DailyCallsReport';

export default function Dashboard(props) {
  const network = useSelector(state => state.network);
  const toast = useToast();
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();
  const [agendaid, setAgendaId] = useState('');
  const [agendatype, setAgendaType] = useState('');
  const apikey = useSelector(state => state.googleAPI);
  const isDataSyncPening = useSelector(state => state.isDataSyncPening);
  const [dataPending, setDataPending] = useState(isDataSyncPening);
  const isOrderSync = useSelector(state => state.isOrderSync);
  // const teamEmpId = useSelector(state => state.teamEmpIdForJointWrkng);
  const [dataOrderSync, setDataOrderSync] = useState(isOrderSync);
  const [agendaType1, setAgendaType1] = useState('');
  const [teamEmpId,setTeamEmpId] = useState('');
  // alert('TeamempId0 '+teamEmpId);
  // alert("agenda type "+agendatype)
  // alert(agendatype)
  // alert("teamEmpIdd=="+teamEmpId)
  // const [dataCheckInCheckOutSync, setDataCheckInCheckOutSync] = useState();
  const [refresh, setRefresh] = useState(false);
  // console.log('agendaid on deshboard', agendaid);
  // console.log('isDataSyncPening deshboard', isDataSyncPening);
  const [formattedaddress, setFormattedAddress] = useState('');

  // console.log('Data Pending==========>', dataPending);
  // console.log('Data dataOrderSync Pending==========>', dataOrderSync);

  useEffect(() => {
    setRefresh(!refresh);
    
  }, []);
  async function getTeamEmp(){
    try{
      const teamEmpId = await getDatafromAsync('teamEmpId')
      setTeamEmpId(teamEmpId)
    }catch(err){
      console.log('Error ',err)
    }
  }
  getTeamEmp()



  useFocusEffect(
    React.useCallback(() => {
      console.log(isDataSyncPening);
      setDataPending(isDataSyncPening);
      setDataOrderSync(dataOrderSync);
    }, [refresh, props]),
  );

  // console.log('hasdsh_add', formattedaddress);
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [name, setName] = useState('');
  const [greeting, setGreeting] = useState('');
  const [loader, setLoader] = useState(true);
  const [beatId, setBeatId] = useState('');
  const [rstatus, setRstatus] = useState(true);
  const [punchStatus, setPunchStatus] = useState('');
  const [carouselStatus, setCarouselStatus] = useState(true);
  const [showagenda, setShowagenda] = useState(false);
  const [showtour, setShowtour] = useState(false);
  const [showbeat, setShowbeat] = useState(false);
  const [showRoasterPlan, setShowRoasterPlan] = useState(false);
  // const [attendanceId, setAttendanceId] = useState('');
  // const [punchoutAttendanceId, setPunchoutAttendanceId] = useState('');
  const [punchoutMediaId, setPunchoutMediaId] = useState('');
  const [punchinMediaId, setPunchinMediaId] = useState('');
  const [checkinOutStatus, setCheckinOutStatus] = useState('');
  const [dailyCalls, setDailyCalls] = useState('');
  const [dailyDate, setDailyDate] = useState('');
  const [dailyCalls1, setDailyCalls1] = useState('. . .');
  const [dailyCalls2, setDailyCalls2] = useState('. . .');
  const [dailyCalls3, setDailyCalls3] = useState('. . .');
  const [dailyCalls4, setDailyCalls4] = useState('. . .');
  const [dailyCalls5, setDailyCalls5] = useState('. . .');
  const [dailyCalls6, setDailyCalls6] = useState('. . .');
  const [dailyCalls7, setDailyCalls7] = useState('. . .');

  // console.log('mmmmmmmmmmmmmmmmmm', dailyCalls)

  const [empIdd, setEmpIdd] = useState('');

  useEffect(() => {
    getAppToken();
  }, []);

  useFocusEffect(
    React.useCallback(async () => {
      let beatId = await AsyncStorage.getItem('@beatId');
      console.log(' nb v bn ', beatId);
      setBeatId(beatId);
    }, []),
  );

  // console.log('jndjsbds667776667676', todayTrip);

  const [todayTrip, setTodayTrip] = useState('');
  const [StartComponent, setStartComponent] = useState(
    <ComponentStartDays
      setPunchinMediaId={setPunchinMediaId}
      rstatus={rstatus}
      setDate={new Date()}
      onpress={() => handlepunchinApi()}
      setTodayTrip={setTodayTrip}
    />,
  );

  // console.log('checkin status in dashboard=>👀', checkinOutStatus);
  // console.log('media id punchin', punchinMediaId);
  // console.log('media id punchout', punchoutMediaId);
  // console.log('attendace_id', attendanceId);
  // console.log('attendace_id', punchoutAttendanceId);
  // alert( todayTrip);

  // console.log('ShowBEat=================>Dashboard', showbeat);
  // console.log('beatId=================>Dashboard', beatId);

  useEffect(() => {
    const temp = atnd_stat => {
      setShowRoasterPlan(false);
      if (atnd_stat == 'Punched in') {
        setShowbeat(true);
        setShowtour(true);
      }
    };

    const temp0 = async atnd_stat => {
      if (atnd_stat == 'Punched in') {
        setShowRoasterPlan(true);
      }
    };

    const temp1 = () => {
      setShowbeat(false);
      setShowtour(false);
      setShowRoasterPlan(false);
    };

    const punchStatusfun = async () => {
      // setTimeout(async () => {
      let checkin_status = await AsyncStorage.getItem('attendencestatus');
      console.log(
        'checkin_status Line 219 on Dashboard.js=====',
        checkin_status,
      );
      // },1000)

      if (network) {
        const pstatus = await gettripLocationApi('api/punchStatus');
        if (pstatus.statusCode == 200) {
          if (pstatus.data.Agenda != undefined) {
            console.log('agenda TYpe===', pstatus);
            let agendaType = pstatus.data.Agenda.Agendacontroltype;
            let attendace_stat = pstatus.data.Resp.AttendenceStatus;

            if (agendaType == 'FieldWork' || agendaType == 'JointWorking') {
              temp(attendace_stat);
            } else if (agendaType == 'RosterPlan') {
              temp0(attendace_stat);
            } else {
              temp1();
            }
          }
        } else {
          alert(pstatus.message);
        }
      } else {
        let agenda_control_type = await AsyncStorage.getItem('agendatype');
        let t = JSON.parse(agenda_control_type);
        let checkin_status = await AsyncStorage.getItem('attendencestatus');
        console.log(
          'checkin_status Line 219 on Dashboard.js=====',
          checkin_status,
        );

        if (t == 'FieldWork') {
          temp(checkin_status);
        } else if (t == 'RosterPlan') {
          temp0(checkin_status);
        } else {
          temp1();
        }
      }
    };
    // if (network) {
    punchStatusfun();
    // }
    // }, 10);
  }, [agendatype, network]);

  const Roles = useSelector(state => state.userRoles);
  const currentLatLng = useSelector(state => state.currentLatLng);
  console.log('Roles are :🧨', Roles);

  const [isDataPending, setIsDataPending] = React.useState(false);

  const checkDataPendingForSync = async () => {
    db.transaction(async tx => {
      tx.executeSql(
        `SELECT * from CheckinCheckout where SyncFlag = 0`,
        [],
        async (tx, results) => {
          if (results.rows.length > 0) {
            console.log('results Line 183 ===> ', results);
            try {
              let obj = {
                Checkout_Lat: results.rows.item(0).Checkout_Lat,
                OutletName: results.rows.item(0).OutletName,
                SyncFlag: results.rows.item(0).SyncFlag,
              };
              // store.dispatch({type: 'isDataSyncPening', payload: obj});
              console.log('result===============278 ======>', obj);
              // setRefresh(!refresh)

              AsyncStorage.setItem('@checkindatapending', JSON.stringify(obj));
            } catch (e) {
              await AsyncStorage.removeItem('@checkindatapending');
            }
          } else {
            await AsyncStorage.removeItem('@checkindatapending');
          }
        },
      );
    });

    db.transaction(async tx => {
      tx.executeSql(
        `SELECT * from SalesOrder where SyncFlag = 0`,
        [],
        async (tx, results) => {
          if (results.rows.length > 0) {
            console.log('results Line 183 ===> ', results);

            AsyncStorage.setItem('@orderdatapending', true);
          } else {
            await AsyncStorage.removeItem('@orderdatapending');
          }
        },
      );
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      handlepunchStatus();
      checkDataPendingForSync();
    }, [network]),
  );

  /*============================== START DAY COMPONENT==================================*/

  const getUserCurrentLocation = async () => {
    let latitude, longitude;

    Geolocation.getCurrentPosition(
      info => {
        console.log('info_location', info);
        const {coords} = info;
        console.log('coords', coords);

        latitude = coords.latitude;
        longitude = coords.longitude;
        // console.log('latitde =========', coords.latitude);
        // console.log('longitude =========', coords.longitude);

        setLat(latitude);
        setLng(longitude);

        getUserCurrentAddress(latitude, longitude);
      },
      error => console.log(error),
      {
        enableHighAccuracy: false,
        timeout: 1000,
        maximumAge: 3600000,
      },
    );
  };

  async function getUserCurrentAddress(lat, lng) {
    // alert(lat +' and '+ lng + '  ' + apikey1 )
    await StoreDatatoAsync('latlong', {lat: lat, long: lng});

    const f_address = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apikey}`,
    );
    const f = await f_address.json();
    // console.log('fffffff7845', f_address);
    console.log('fffffff7845=====', f);
    const f_add = f.results[0].formatted_address;
    setFormattedAddress(f_add);
  }

  async function userdatafetch() {
    try {
      const data = await getUserProfile();
      // alert(data)
      const fname =
        data == null || data == '' || data == undefined
          ? 'No name'
          : JSON.parse(data).data.FirstName;
      setName(fname);
    } catch (e) {
      console.log('Error in Dashboar Line 271===', e);
    }
  }

  const getGreetingmessage = () => {
    const dt = new Date();
    const hrs = dt.getHours();
    let greet = '';
    if (hrs >= 0 && hrs < 12) {
      greet = 'Good Morning';
    } else if (hrs >= 12 && hrs < 17) {
      greet = 'Good Afternoon';
    } else {
      greet = 'Good Evening';
    }
    setGreeting(greet);
  };

  const handleDailyCalls = async d => {
    if (network) {
      try {
        var result = await getDailyCalls(d);
        // console.log('Daily Calls....>>>:', result);
        if (result.statusCode == 200) {
          setDailyCalls(result.data);
          setDailyCalls1(result.data.ScheduleCalls);
          setDailyCalls2(
            `${
              result.data.TotalCalls
            }(${result.data.TotalCallsPercentage.toFixed(2)}%)`,
          );
          setDailyCalls3(
            `${
              result.data.ProductiveCalls
            }(${result.data.ProductiveCallsPercentage.toFixed(2)}%)`,
          );
          setDailyCalls4(
            `${
              result.data.NonVisitOutlets
            } (${result.data.NonVisitOutletsPercentage.toFixed(2)}%)`,
          );
          setDailyCalls5(
            `${
              result.data.ZeroBillingOutlets
            } (${result.data.ZeroBillingOutletsPercentage.toFixed(2)}%)`,
          );
          setDailyCalls6(`${result.data.NewOnBoarding}`);
          setDailyCalls7(`${result.data.TelephonicOrder}`);
        }
      } catch (e) {
        console.log('Error Daily Calls Api.....', e);
      }
      setLoader(false);
    }
  };

  useEffect(() => {
    async function temp() {
      getUserCurrentLocation();
      userdatafetch();
      getGreetingmessage();
      const f = moment().startOf('month').format('DD-MM-YYYY');
      const t = moment().endOf('month').format('DD-MM-YYYY');

      const date1 = moment().format('DD-MM-YYYY');
      handleDailyCalls(date1);

      const a = await getEmployeeId();
      // alert('ser emp id ',a)
      setEmpIdd(a);
    }
    temp();
  }, [network]);


  useEffect(() => {
    if (dailyDate == 0) {
      const date = moment().format('DD-MM-YYYY');
      // console.log('gggggggggggggggggggggg', date);
      handleDailyCalls(date);
    } else {
      const date = moment().subtract(1, 'days').format('DD-MM-YYYY');
      // console.log('ffffffffffff', date);
      handleDailyCalls(date);
    }
  }, [dailyDate, network]);

  /*============================== START DAY COMPONENT==================================*/

  const handlepunchStatus = async () => {
    var beatDate = await AsyncStorage.getItem('@beatDate');
    beatDate = JSON.parse(beatDate);
    const result = await gettripLocationApi('api/punchStatus');

    if (result.data.Agenda != undefined) {
      var agendatype = result.data.Agenda.Agendacontroltype;
      setAgendaType1(agendatype);
    }

    if (agendatype == 'FieldWork') {
      function isToday(date) {
        const today = new Date();

        // 👇️ Today's date
        console.log(today);

        if (today.toDateString() === date.toDateString()) {
          return true;
        }
        return false;
      }

      if (beatDate != null || beatDate != undefined) {
        if (isToday(new Date(beatDate))) {
          setAgendaType(agendatype);
        }
      }
    }
    // setAgendaType(agendatype);
    // console.log('agendaa TYpe In Dashboard Line 289 Dashboard', agendatype);
    // if (network) {
    const result1 = await gettripLocationApi('api/punchStatus');
    // console.log('status api data ', result1);

    console.log('PUNCHIN STATUS  🙌🙌===>', result1.data.Resp.AttendenceStatus);
    setPunchStatus(result1.data.Resp.AttendenceStatus);
    if (
      result1.data.Resp.AttendenceStatus == 'Punched in' &&
      Roles.includes('can_do_beats') &&
      agendatype == 'FieldWork'
    ) {
      setShowbeat(true);
    }
    if (
      result1.data.Resp.AttendenceStatus == 'Punched Out' &&
      Roles.includes('can_do_beats') &&
      (beatId == null || beatId == undefined)
    ) {
      setShowbeat(true);
    }
    if (result1.data.Resp.AttendenceStatus == 'Punched in') {
      setStartComponent(
        <ComponentEndDays
          checkinOutStatus={checkinOutStatus}
          setPunchoutMediaId={setPunchoutMediaId}
          onpress={() => handlepunchoutApi()}
        />,
      );
      // setShowtour(true)
    } else if (result1.data.Resp.AttendenceStatus == 'Punched Out') {
      setStartComponent(
        <ComponentStartDays
          setPunchinMediaId={setPunchinMediaId}
          setDate={new Date()}
          onpress={() => handlepunchinApi()}
          setTodayTrip={setTodayTrip}
        />,
      );
    }
    setLoader(false);
    // } else {
    //   setLoader(false);
    // }
  };

  const handlepunchinApi = async () => {
    // alert(todayTrip)
    // console.log('NETWORK===', network);
    if (network) {
      // console.log('NETWORK=== Line 383', network);
      if (isDataPending) {
        props.navigation.push('SyncDataScreen', {
          navigateFrom: 'NewDashboard',
        });
      } else {
        await requestLocationPermission();

        if (Roles.includes('can_do_change_agenda')) {
          setShowagenda(true);
        } else if (Roles.includes('is_selfi_required')) {
          try {
            const data = await getDatafromAsync('latlong');
            console.log('data ba punchin====>', data);
            const foradd = await getUserCurrentLocationCommon(
              data.lat,
              data.long,
            );

            console.log('address new ba', foradd);
            const result = await attendancePostData(
              `api/punchin?latlnt=${data.lat}%2C${data.long}&location=${foradd}`,
            );
            console.log('RSLT PUNCHIN++++++++++++++++>>>>>>>>', result);
            // alert(result.message);
            if (result.statusCode == 200) {
              await StoreDatatoAsync(
                'punchinTime',
                result.data.StartTime.substr(0, 8),
              );
              console.log(
                'Result from Punch API ============= 1327',
                result.data.StartTime,
              );

              /****** Insert Data into LocalDatabase Start *****/
              await TruncateAllTables();
              await outletBeatDump();
              await insertMappingData();
              await insertStockData();
              await insertOutcomeData();
              /****** Insert Data into LocalDatabase End *****/
              // setAttendanceId(result.data.AttendanceId);
              setStartComponent(
                <ComponentEndDays
                  checkinOutStatus={checkinOutStatus}
                  setPunchoutMediaId={setPunchoutMediaId}
                  onpress={() => handlepunchoutApi()}
                />,
              );
              const mId = await getDatafromAsync('selfi_punchin');
              const result7 = await attendancePostData(
                `api/attachMediaAttendance?media_id=${mId}&entity_pk=${result.data.AttendanceId}&purpose=Selfi-In`,
              );
              console.log('after punchin upload media api response', result7);
              // alert(result7.message);
            } else {
              Alert.alert('Warning', `${result.message}`);
            }
          } catch (e) {
            console.log('catch error ba punchin', e);
          }
          // alert('ba')
        } else {
          try {
            const data = await getDatafromAsync('latlong');
            console.log('data ba punchin', data);
            const foradd = await getUserCurrentLocationCommon(
              data.lat,
              data.long,
            );
            console.log('address new ba', foradd);
            const result = await attendancePostData(
              `api/punchin?latlnt=${data.lat}%2C${data.long}&location=${foradd}`,
            );
            console.log('RSLT PUNCHIN++++++++++++++++>>>>>>>>', result);
            // alert(result.message);
            if (result.statusCode == 200) {
              await StoreDatatoAsync(
                'punchinTime',
                result.data.StartTime.substr(0, 8),
              );
              console.log(
                'Result from Punch API ============= 1327',
                result.data.StartTime,
              );

              /****** Insert Data into LocalDatabase Start *****/
              await TruncateAllTables();
              await outletBeatDump();
              await insertMappingData();
              await insertStockData();
              await insertOutcomeData();
              /****** Insert Data into LocalDatabase End *****/

              // setAttendanceId(result.data.AttendanceId);
              setStartComponent(
                <ComponentEndDays
                  checkinOutStatus={checkinOutStatus}
                  setPunchoutMediaId={setPunchoutMediaId}
                  onpress={() => handlepunchoutApi()}
                />,
              );
            } else {
              Alert.alert('Warning', `${result.message}`);
            }
          } catch (e) {
            console.log('catch error ba punchin', e);
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
  };
// alert("teamEMpId "+teamEmpId)
  const punchin = async () => {
    if (network) {
      setStartComponent(
        <ComponentEndDays
          checkinOutStatus={checkinOutStatus}
          setPunchoutMediaId={setPunchoutMediaId}
          onpress={() => handlepunchoutApi()}
        />,
      );
      setRstatus(false);
    } else {
      toast.show('No internet.', {
        type: 'danger',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
    }
  };

  const handlepunchoutApi = async () => {
    alert('hi')
    await removeDatafromAsync('teamEmpId');

    if (dataPending.Checkout_Lat == null) {
      toast.show(
        `Please Checkout first recently visited outlet, ${dataPending.OutletName}.`,
        {
          type: 'danger',
          placement: 'bottom',
          duration: 5000,
          offset: 10,
          animationType: 'slide-in',
        },
      );
    }
    // else if(dataPending.Checkout_Lat != null){
    //   props.navigation.push('SyncDataScreen', {
    //     navigateFrom: 'Dashboard',
    //   })
    // }
    else if (dataOrderSync) {
      props.navigation.push('SyncDataScreen', {
        navigateFrom: 'NewDashboard',
      });
    } else {
      try {
        const data = await getDatafromAsync('latlongNew');
        console.log('async data latlong New', data);

        const f_addrs = await getUserCurrentLocationCommon(
          data.latitude,
          data.longitude,
        );

        let remark = 'DayEnd';
        const result = await attendancePostData(
          `api/punchout?latlnt=${lat}%2C${lng}&location=${f_addrs}&remark=${remark}`,
        );
        console.log('punchout result', result);
        if (
          result.statusCode == 200 &&
          result.message == 'Punch out Successfully.'
        ) {

          setStartComponent(
            <ComponentStartDays
              setPunchinMediaId={setPunchinMediaId}
              setDate={new Date()}
              onpress={() => handlepunchinApi()}
              add={formattedaddress}
              setTodayTrip={setTodayTrip}
            />,
          );
          setShowtour(false);
          setShowbeat(false);
          setShowRoasterPlan(false);
          await removeDatafromAsync('teamEmpId');
          await removeDatafromAsync('agendatype');
          await removeDatafromAsync('beat');
          await removeDatafromAsync('@checkindatapending');
          await removeDatafromAsync('@orderdatapending');
          setAgendaType('');
          setLoader(false);
        } else {
          alert(result.message);
        }
        if (Roles.includes('is_selfi_required')) {
          console.log('media punchout id intimeout', punchoutMediaId);
          const mId = await getDatafromAsync('selfi_punchout');
          const result7 = await attendancePostData(
            `api/attachMediaAttendance?media_id=${mId}&entity_pk=${result.data.AttendanceId}&purpose=Selfi-Out`,
          );
          console.log('after punchout upload media api response', result7);
          alert(result7.error.message);
        }
      } catch (e) {
        console.log('catch_punchout_error', e);
      }
    }
  };

  // const isDarkMode = Appearance.getColorScheme() === 'dark';

  useFocusEffect(
    React.useCallback(() => {
      async function temp() {
        try {
          var res = await getCheckInOutStatus();
          if (res != null) {
            alert(JSON.stringify(res));
            if (res.statusCode == 200) {
              // console.log("CheckInOutStatus...in useFocusEffect..in DashBOARD>",res.data.data.CheckInStatus)
              store.dispatch({
                type: 'ADD_ISVERIFY_OUTLET_STATUS',
                payload: res.data.data.CheckInStatus,
              });
            }
          }
        } catch (e) {
          console.log('Error in CheckInOutStatus...in useFocusEffect..>', e);
        }
      }
      temp();
    }, [network]),
  );

  const [bottomData, setBottomData] = React.useState([]);
  const [insideData, setInsideData] = React.useState([]);
  React.useEffect(() => {
    async function temp() {
      const startOfThirdDaily = moment()
        .subtract(2, 'months')
        .startOf('month')
        .format('DD-MM-YYYY');
      const endOfThirdDaily = moment()
        .subtract(2, 'months')
        .endOf('month')
        .format('DD-MM-YYYY');

      // console.log('startOfThirdDaily....endOfThirdDaily>>:', startOfThirdDaily, endOfThirdDaily);
      let res1 = await getTargetWiseSales(startOfThirdDaily, endOfThirdDaily);
      const ThirdDailyName = moment().subtract(2, 'months').format('MMM-YYYY');
      setInsideData([
        {
          Target: parseInt(res1.data.Target),
          TotalSales: res1.data.TotalSales,
          monthName: ThirdDailyName,
        },
      ]);

      const startOfSecondDaily = moment()
        .subtract(1, 'months')
        .startOf('month')
        .format('DD-MM-YYYY');
      const endOfSecondDaily = moment()
        .subtract(1, 'months')
        .endOf('month')
        .format('DD-MM-YYYY');
      let res2 = await getTargetWiseSales(startOfSecondDaily, endOfSecondDaily);
      const SecondDailyName = moment().subtract(1, 'months').format('MMM-YYYY');
      setInsideData(prev => [
        ...prev,
        {
          Target: parseInt(res2.data.Target),
          TotalSales: res2.data.TotalSales,
          monthName: SecondDailyName,
        },
      ]);

      const startOfCurrentDaily = moment()
        .startOf('month')
        .format('DD-MM-YYYY');
      const endOfCurrentDaily = moment().endOf('month').format('DD-MM-YYYY');
      let res3 = await getTargetWiseSales(
        startOfCurrentDaily,
        endOfCurrentDaily,
      );
      const CurrentDailyName = moment().format('MMM-YYYY');
      setInsideData(prev => [
        ...prev,
        {
          Target: parseInt(res3.data.Target),
          TotalSales: res3.data.TotalSales,
          monthName: CurrentDailyName,
        },
      ]);
    }
    try {
      temp();
    } catch (e) {
      setLoader(false);
    }
  }, [network]);

  //   useEffect( () => {
  //   if (network == false) {
  //     setLoader(false);
  //   }
  // }, [network]);

  useFocusEffect(
    React.useCallback(() => {
      if (network == false) {
        // alert("Hello")
        setLoader(false);
      } else {
        setLoader(true);
      }
    }, [network]),
  );

  return (
    <>
      <>
        <View style={{flex: 1, backgroundColor: themecolor.THEMECOLOR}}>
          <StatusBar
            translucent
            backgroundColor="transparent"
            barStyle={mode === 'dark' ? 'light-content' : 'dark-content'}
          />
          <Header
            height={carouselStatus ? 'auto' : 100}
            username={name}
            greeting={greeting}
          />
          {carouselStatus && (
            <CarouselList setCarouselStatus={setCarouselStatus} />
          )}
          <View style={{marginVertical: carouselStatus ? 20 : 5}} />

          <ScrollView showsVerticalScrollIndicator={false}>
            {network ? (
              <>
                {loader ? <ComponentBeatStartShimmer /> : <>{StartComponent}</>}
              </>
            ) : (
              <></>
            )}
            {/* <View style={{ marginVertical: 5 }} /> */}

            {Roles.includes('can_do_beats') ? (
              showbeat ? (
                beatId == '' || beatId == null || beatId == undefined ? (
                  <>
                    {loader ? (
                      <>
                        <ComponentBeatStartShimmer />
                      </>
                    ) : (
                      <ComponentBeatStart
                        empId={(teamEmpId == ''||teamEmpId ==null) ? empIdd : teamEmpId}
                        agendaStatus={agendaType1}
                      />
                    )}
                  </>
                ) : (
                  <>
                    {loader ? (
                      <>
                        <ComponentBeatStartShimmer />
                      </>
                    ) : (
                      <ComponentBeatEnd />
                    )}
                  </>
                )
              ) : (
                <></>
              )
            ) : (
              <></>
            )}
            <View style={{marginVertical: 5}} />
            {
              // Roles.includes('can_do_tour_plan')

              showRoasterPlan ? (
                <>
                  <ComponentViewRoasterPlan />
                </>
              ) : (
                <></>
              )
            }

            <View style={{flex: 1}}>
              <DashboardButtonGrid
                punchStatus={punchStatus}
                props={props}
                showOn={'Dashboard'}
                setCheckinOutStatus={setCheckinOutStatus}
              />

              {/*__________ Daily Calls Report __________ */}
              {/* {Roles.includes('emp_has_targets') && network ? (
                <>
                  <View style={{paddingVertical: 5}} />

                  <DailyCallsReport
                    dailyCalls={dailyCalls}
                    dailyCalls1={dailyCalls1}
                    dailyCalls2={dailyCalls2}
                    dailyCalls3={dailyCalls3}
                    dailyCalls4={dailyCalls4}
                    dailyCalls5={dailyCalls5}
                    dailyCalls6={dailyCalls6}
                    dailyCalls7={dailyCalls7}
                    setDailyDate={setDailyDate}
                  />
                </>
              ) : (
                <></>
              )} */}
              <View style={{ marginVertical: 5 }} />
              {
                showRoasterPlan ? (
                  <>
                    <ComponentViewRoasterPlan />
                  </>
                ) : (
                  <></>
                )
              }

              {/*__________ Category Wise Order Report Report __________*/}
              {Roles.includes('emp_has_targets') && network ? (
                <>
                  <View style={{marginVertical: 5}} />
                  <CategoryWiseOrderReport
                    EmployeeId={empIdd}
                    heading="Total Sales Calls"
                  />
                </>
              ) : (
                <></>
              )}

                {/*__________ Daily Calls Report __________ */}
                {Roles.includes('emp_has_targets') && network ? (
                  <>
                    <View style={{ paddingVertical: 5 }} />
{/*                     
                    <DailyCallsReport
                      dailyCalls={dailyCalls}
                      dailyCalls1={dailyCalls1}
                      dailyCalls2={dailyCalls2}
                      dailyCalls3={dailyCalls3}
                      dailyCalls4={dailyCalls4}
                      dailyCalls5={dailyCalls5}
                      dailyCalls6={dailyCalls6}
                      dailyCalls7={dailyCalls7}
                      setDailyDate={setDailyDate}
                    />
                     */}
                  </>
                ) : (<></>)}

                {/*__________ Daily till date calls Report __________*/}
                {Roles.includes('emp_has_targets') && network ? (
                  <>
                    <View style={{ marginVertical: 5 }} />
                    {/* <MonthtillDateCallReport/> */}
                  </>
                ) : (<></>)} 

                {/*__________ Category Wise Order Report Report __________*/}
                {Roles.includes('emp_has_targets') && network ? (
                  <>
                    <View style={{ marginVertical: 5 }} />
                    <CategoryWiseOrderReport EmployeeId={empIdd} heading='Total Sales Calls' />
                  </>
                ) : (<></>)}

                {/*--------.... Target Vs Achievement ....------------ */}
                {Roles.includes('can_do_counter_sales') && network ? (
                  <>
                    <View style={{ marginVertical: 5 }} />
                    <TargetVsAchievementReport data={insideData}
                      bottomData={bottomData}
                    />
                  </>
                ) : (<></>)}

                {/*__________ SKU Wise Target Vs AchievementReport __________*/}
                {/* {Roles.includes('can_do_counter_sales') ? (
                  <>
                    <View style={{ marginVertical: 5 }} />
                    <SKUWiseTargetVsAchievementReport />
                  </>
                ) : (<></>)} */}
            </View>
            <View style={{marginVertical: 5}} />
          </ScrollView>
          {showagenda && (
            <AgendaModal
              setShowbeat={setShowbeat}
              setShowtour={setShowtour}
              punchin={punchin}
              showagenda={showagenda}
              setShowagenda={setShowagenda}
              setAgendaId={setAgendaId}
              setAgendaType={setAgendaType}
              setShowRoasterPlan={setShowRoasterPlan}
              todayTrip={todayTrip}
              // setTeamEmpId={setTeamEmpId}
            />
          )}
        </View>
      </>
    </>
  );
}
