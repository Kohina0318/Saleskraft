import React, { useState, useEffect, useCallback } from 'react';
import {
  StatusBar,
  View,
  ScrollView,
  Alert
} from 'react-native';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import Header from '../../components/shared/Header';
import CarouselList from '../../components/shared/CarousalDataList';
import ComponentStartDays, {
  ComponentBeatEnd,
  ComponentBeatStart,
  ComponentBeatStartShimmer,
  ComponentEndDays,
  ComponentJointWorking,
  ComponentViewRoasterPlan,
} from '../../components/shared/DashboardStartDay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { gettripLocationApi } from '../../repository/trip/tripRepository';
import AgendaModal from '../../components/Modals/AjendaModal';
import Geolocation from '@react-native-community/geolocation';
import { useToast } from 'react-native-toast-notifications';
import {
  requestLocationPermission,
  getEmployeeId,
  getUserCurrentLocationCommon,
  getEmployeeDetailsById,
  checkForUpdate,
  rateYourApp,
  getUserProfile,
} from '../../repository/commonRepository';
import { attendancePostData } from '../../repository/attendence/attendence';
import {
  insertMappingData,
  insertOutcomeData,
  insertStockData,
  outletBeatDump,
  TruncateAllTables,
} from '../SharedScreens/InsertData';
import {
  getDatafromAsync,
  removeDatafromAsync,
  StoreDatatoAsync,
} from '../../repository/AsyncStorageServices';
import moment from 'moment';
import { getCheckInOutStatus } from '../../repository/outlet/VerifyOutletRepository';
import { CategoryWiseOrderReport } from '../../components/ReportsComponent/CategoryWiseOrderReport';
import DailyCallsReport from '../../components/ReportsComponent/DailyCallsReport';
import TargetVsAchievementReport from '../../components/ReportsComponent/TargetvsAchievementReport';
import MonthtillDateCallReport from '../../components/ReportsComponent/MonthtillDateCallReport';
import DashboardButtonGrid from '../../components/shared/DashboardButtonGrid';
import { store } from '../../../App';
import { db } from '../../helper/SQLite DB/Sqlite';
import { getDailyCalls, getTargetWiseSales } from '../../repository/report/ReportRepository';
import LoadingFullScreen from '../SharedScreens/LoadingFullScreen';


// Memoized Components Start
var HeaderMemoized = React.memo(Header);
var ComponentStartDaysMemoized = React.memo(ComponentStartDays);
var ComponentEndDaysMemoized = React.memo(ComponentEndDays);
var DashboardButtonGridMemoized = React.memo(DashboardButtonGrid);
var ComponentBeatStartMemoized = React.memo(ComponentBeatStart);
var ComponentBeatEndMemoized = React.memo(ComponentBeatEnd);
// Memoized Components End

export default function NewDashboard(props) {

  const mode = useSelector(state => state.mode);
  const network = useSelector(state => state.network);
  const Roles = useSelector(state => state.userRoles);
  const apikey = useSelector(state => state.googleAPI);
  const themecolor = new MyThemeClass(mode).getThemeColor();
  // console.log('THeme Color==', themecolor);
  const toast = useToast();
  const [count, setCount] = useState(0);
  const [agendaid, setAgendaId] = useState('');
  const [loader, setLoader] = useState(true);
  const [punchoutMediaId, setPunchoutMediaId] = useState('');
  const [punchinMediaId, setPunchinMediaId] = useState('');
  const [checkinOutStatus, setCheckinOutStatus] = useState('');
  const [punchStatus, setPunchStatus] = useState('');
  const [carouselStatus, setCarouselStatus] = useState(network ? true : false);
  const [todayTrip, setTodayTrip] = useState('');
  const [isDayStart, setIsDayStart] = useState(true);
  const [agendatype, setAgendaType] = useState('');
  const [showagenda, setShowagenda] = useState(false);
  const [showbeat, setShowbeat] = useState(false);
  const [agendaType1, setAgendaType1] = useState('');

  const [punchinFunCallBack, setPunchinFunCallBack] = useState(false);
  const [showRoasterPlan, setShowRoasterPlan] = useState(false);
  const [isDataPending, setIsDataPending] = React.useState(false);
  const isDataSyncPening = useSelector(state => state.isDataSyncPening);
  const [dataPending, setDataPending] = useState(isDataSyncPening);
  const isOrderSync = useSelector(state => state.isOrderSync);
  console.log("IsOrderSync-------------------->>>>>", isOrderSync);
  const [dataOrderSync, setDataOrderSync] = useState(isOrderSync);
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [name, setName] = useState('');
  const [greeting, setGreeting] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [formattedaddress, setFormattedAddress] = useState('');
  const [beatId, setBeatId] = useState('');
  const [rstatus, setRstatus] = useState(true);
  const [showtour, setShowtour] = useState(false);
  const [empIdd, setEmpIdd] = useState('');
  const [doJointWorking, setDoJointWorking] = useState(false);
  const [jointTeamName, setJointTeamName] = useState('');
  const [insideData, setInsideData] = React.useState([]);
  const [jointTeamEmpId, setJointTeamEmpId] = useState(null);
  const [asyncJointEmpName, setAsyncJointEmpName] = useState('')
  // alert(jointTeamEmpId)
  console.log("jointWorking ✌ TeamEmpID==>> ", jointTeamEmpId);
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

              await AsyncStorage.setItem('@checkindatapending', JSON.stringify(obj));
            } catch (e) {
              await AsyncStorage.removeItem('@checkindatapending');
            }
          } else {
            console.log("INSIDE ELSE IN NEWDASHBOARD LINE 153", results.rows.length)
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
      try {
        console.log("props.route.params.navigateFrom =========", props.route.params)
        // alert(props.route.params.navigateFrom)
        if (props.route.params.navigateFrom === 'temporaryParams') {

        } else {
          handlepunchStatus();
          checkDataPendingForSync();
        }
      } catch (e) {
        handlepunchStatus();
        checkDataPendingForSync();
      }
    }, [network]),
  );
  // alert(showbeat)
  useEffect(() => {
    const temp = atnd_stat => {
      // alert(atnd_stat)
      try {
        setShowRoasterPlan(false);
        setDoJointWorking(false);
        if (atnd_stat == "Punched in") {
          setShowbeat(true);
        }
      } catch (e) {
        // alert("Err",e)
      }
    };

    const temp0 = async atnd_stat => {
      if (atnd_stat == 'Punched in') {
        setShowRoasterPlan(true);
      }
    };

    const tempNew = atnd_stat => {
      // alert('hell')
      if (atnd_stat == 'Punched in') {
        setDoJointWorking(true);
        // setShowbeat(true)
      }
    };

    const temp1 = () => {
      setShowbeat(false);
      setShowtour(false);
      setShowRoasterPlan(false);
      setDoJointWorking(false);
    };


    const punchStatusfun = async () => {
      let checkin_status = await AsyncStorage.getItem('attendencestatus');
      console.log(
        'checkin_status Line 219 on Dashboard.js=====',
        checkin_status,
      );
      if (network) {
        const pstatus = await gettripLocationApi('api/punchStatus');
        console.log("pStatus-------------->", pstatus)
        // {"data": {"Agenda": {"Agendacontroltype": "FieldWork", "Agendaid": 29, "Agendaimage": 2337, "Agendname": "Market Visit", "CompanyId": 11, "RoleId": 6}, "Resp": {"AttendenceCode": 1, "AttendenceRec": [Object], "AttendenceStatus": "Punched in"}}, "message": "Punch Status.", "statusCode": 200, "timestamp": {"date": "2022-12-15 12:04:35.184321", "timezone": "Asia/Kolkata", "timezone_type": 3}}

        if (pstatus.statusCode == 200) {

          if (pstatus.data.Agenda != undefined) {

            console.log('agenda TYpe===', pstatus);
            let agendaType = pstatus.data.Agenda.Agendacontroltype;
            let attendace_stat = pstatus.data.Resp.AttendenceStatus;
            StoreDatatoAsync('attendencestatus', attendace_stat);
            StoreDatatoAsync('agendatype', agendaType);
            if (agendaType == 'FieldWork' /* || agendaType == 'JointWorking'*/) {
              temp(attendace_stat);
            } else if (agendaType == 'RosterPlan') {
              temp0(attendace_stat);
            } else if (agendaType == 'JointWorking') {
              tempNew(attendace_stat);
            } else {
              temp1();
            }
          }
        } else {
          toast.show(pstatus.message, {
            type: 'danger',
            placement: 'bottom',
            duration: 3000,
            offset: 30,
            animationType: 'slide-in',
          });
        }
      }
      else {
        let agenda_control_type = await AsyncStorage.getItem('agendatype');
        let t = JSON.parse(agenda_control_type);
        let checkin_status = JSON.parse(await AsyncStorage.getItem('attendencestatus'));
        if (t == 'FieldWork') {
          temp(checkin_status);
        } else if (t == 'RosterPlan') {
          temp0(checkin_status);
        } else if (t == 'JointWorking') {
          tempNew(checkin_status);
        }
        else {
          temp1();
        }
      }
    };

    punchStatusfun();
  }, [agendatype, network]);

  useFocusEffect(
    React.useCallback(() => {
      async function temp() {
        try {
          var res = await getCheckInOutStatus();

          if (res.statusCode == 200) {
            store.dispatch({
              type: 'ADD_ISVERIFY_OUTLET_STATUS',
              payload: res.data.data.CheckInStatus,
            });
          }
        } catch (e) {
          console.log('Error in CheckInOutStatus...in useFocusEffect..>', e);
        }
      }
      if (Roles.includes('can_verify_outlet') && network) {
        temp();
      }
    }, [network]),
  );

  //To check PunchIn Status whether user punchIn or Not
  const handlepunchStatus = async () => {
    console.log('Function handlePunchStatus on Dashboard');
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
    const result1 = await gettripLocationApi('api/punchStatus');
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
      setIsDayStart(false);
    } else if (result1.data.Resp.AttendenceStatus == 'Punched Out') {
      setIsDayStart(true);
    }

    // Adding for joint Working========

    if (
      result1.data.Resp.AttendenceStatus == 'Punched in' &&
      agendatype == 'JointWorking'
    ) {
      try {
        let empId =
          result1.data.Resp.AttendenceRec.JointEmp != null
            ? result1.data.Resp.AttendenceRec.JointEmp
            : null;
        if (empId != null) {
          setJointTeamEmpId(empId)
          const data = await getEmployeeDetailsById(empId);
          const name = data.EmployeeName;
          await StoreDatatoAsync('jointEmpNameInLocal', name)
          setJointTeamName(name);
          setDoJointWorking(true);
        } else {

        }
      } catch (er) {
        // alert('Error :123456 ' + er);
      }
    }

    // Joint Working End===========
    setLoader(false);
  };
  //End the function of punchIn status

  useEffect(() => {
    setRefresh(!refresh);
  }, []);

  //Function to call a punchin method
  const punchin = async () => {
    if (network) {
      setIsDayStart(false);
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

  //A function for handlePuchin Start
  const handlepunchinApi = React.useCallback(() => {
    async function temp() {
      console.log('Inside handlepuhcinApi');
      if (network) {
        if (isDataPending) {
          props.navigation.push('SyncDataScreen', {
            navigateFrom: 'Dashboard',
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

                setIsDayStart(false);
                const mId = await getDatafromAsync('selfi_punchin');
                const result7 = await attendancePostData(
                  `api/attachMediaAttendance?media_id=${mId}&entity_pk=${result.data.AttendanceId}&purpose=Selfi-In`,
                );
              } else {
                // Alert.alert('Warning', `${result.message}`);
                toast.show(`${result.message}`, {
                  type: 'warning',
                  placement: 'bottom',
                  duration: 3000,
                  offset: 30,
                  animationType: 'slide-in',
                });
              }
            } catch (e) {
              console.log('catch error ba punchin=====', e);
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

              if (result.statusCode == 200) {
                await StoreDatatoAsync(
                  'punchinTime',
                  result.data.StartTime.substr(0, 8),
                );

                /****** Insert Data into LocalDatabase Start *****/
                await removeDatafromAsync('teamEmpId');
                await TruncateAllTables();
                await outletBeatDump();
                await insertMappingData();
                await insertStockData();
                await insertOutcomeData();
                /****** Insert Data into LocalDatabase End *****/

                setIsDayStart(false);
              } else {
                // Alert.alert('Warning', `${result.message}`);
                toast.show(`${result.message}`, {
                  type: 'warning',
                  placement: 'bottom',
                  duration: 3000,
                  offset: 30,
                  animationType: 'slide-in',
                });
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

      setPunchinFunCallBack(!punchinFunCallBack);
    }
    var mounted = true;
    if (mounted) {
      temp();
    }
    return () => {
      console.log('Cleanup Inside handlePunchin Function');
      mounted = false;
    };
  }, [punchinFunCallBack]);

  //A function for handlePuchin End

  //A function for handlePunchOut Start
  const handlepunchoutApi = async () => {
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
    // else if (dataOrderSync) {
    //   props.navigation.push('SyncDataScreen', {
    //     navigateFrom: 'Dashboard',
    //   });
    // } 
    else {
      try {
        const data = await getDatafromAsync('latlongNew');
        // console.log('async data latlong New', data);

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
          setIsDayStart(true);
          setShowtour(false);
          setShowbeat(false);
          setShowRoasterPlan(false);
          setDoJointWorking(false);
          await removeDatafromAsync('agendatype');
          await removeDatafromAsync('beat');
          await removeDatafromAsync('@checkindatapending');
          await removeDatafromAsync('@orderdatapending');
          setAgendaType('');
          setLoader(false);
        } else {
          // alert(result.message);
          toast.show(result.message, {
            type: 'warning',
            placement: 'bottom',
            duration: 3000,
            offset: 30,
            animationType: 'slide-in',
          });
        }
        if (Roles.includes('is_selfi_required')) {
          console.log('media punchout id intimeout', punchoutMediaId);
          const mId = await getDatafromAsync('selfi_punchout');
          const result7 = await attendancePostData(
            `api/attachMediaAttendance?media_id=${mId}&entity_pk=${result.data.AttendanceId}&purpose=Selfi-Out`,
          );
          console.log('after punchout upload media api response', result7);
          // alert(result7.error.message);
          toast.show(result7.error.message, {
            type: 'danger',
            placement: 'bottom',
            duration: 3000,
            offset: 30,
            animationType: 'slide-in',
          });
        }
      } catch (e) {
        console.log('catch_punchout_error', e);
      }
    }
  };
  //A function for handlePunchOut End

  async function getUserCurrentAddress(lat, lng) {
    // alert(lat +' and '+ lng + '  ' + apikey1 )
    console.log(`lat==${lat}==lng=${lng}`);
    await StoreDatatoAsync('latlong', { lat: lat, long: lng });

    const f_address = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apikey}`,
    );
    const f = await f_address.json();
    // console.log('fffffff7845', f_address);
    console.log('fffffff7845=====', f);
    const f_add = f.results[0].formatted_address;
    setFormattedAddress(f_add);
  }

  useFocusEffect(
    React.useCallback(() => {
      console.log(isDataSyncPening);
      setDataPending(isDataSyncPening);
      setDataOrderSync(dataOrderSync);
    }, [refresh, props]),
  );

  useFocusEffect(
    React.useCallback(() => {
      const tfun = async () => {
        let beatId = await AsyncStorage.getItem('@beatId');
        console.log(' nb v bn ', beatId);
        setBeatId(beatId);
      };
      tfun();
    }, []),
  );


  useEffect(() => {
    async function temp() {
      getUserCurrentLocation();
      userdatafetch();
      getGreetingmessage();
      const f = moment().startOf('month').format('DD-MM-YYYY');
      const t = moment().endOf('month').format('DD-MM-YYYY');
      const date1 = moment().format('DD-MM-YYYY');
      const a = await getEmployeeId();
      setEmpIdd(a);
      if (network) {
        rateYourApp();
        checkForUpdate();
      }
    }
    temp();
  }, [network]);

  const getUserCurrentLocation = async () => {
    let latitude, longitude;
    Geolocation.getCurrentPosition(
      info => {
        console.log('info_location', info);
        const { coords } = info;
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
    try {
      console.log('userCurrent Lat Lng Line 566----', lat, lng);
      await StoreDatatoAsync('latlong', { lat: lat, long: lng });

      const f_address = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apikey}`,
      );
      const f = await f_address.json();
      // console.log('fffffff7845', f_address);
      console.log('fffffff7845=====', f);
      const f_add = f.results[0].formatted_address;
      setFormattedAddress(f_add);
    } catch (e) {
      console.log('Error in catch=== Line 579', e);
    }
  }

  async function userdatafetch() {
    try {
      if (!network) {
        const username = await getDatafromAsync('usrName');
        setName(username && username)
      } else {
        const data = await getUserProfile();
        const fname =
          data == null || data == '' || data == undefined
            ? 'No name'
            : JSON.parse(data).data.FirstName;
        setName(fname);
        await StoreDatatoAsync('usrName', fname)
      }
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



  useFocusEffect(
    React.useCallback(() => {
      if (network == false) {
        setLoader(false);
      } else {
        setLoader(true);
      }
      const temp = async () => {
        nm = await getDatafromAsync('jointEmpNameInLocal')
        // alert(nm)
        setAsyncJointEmpName(nm && nm)
      }
      temp()
    }, [network]),
  );

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
      if (network) {
        temp();
      }
    } catch (e) {
      setLoader(false);
    }
  }, [network]);

  console.log("ShowBEat---", showbeat)
  console.log("beatId---", beatId)





  return (
    <>

      <View style={{ flex: 1, backgroundColor: themecolor.THEMECOLOR }}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle={mode === 'dark' ? 'light-content' : 'dark-content'}
        />
        {loader ? (
          <>
            <LoadingFullScreen style={{ flex: 1 }} />
          </>
        ) : (
          <>


            <HeaderMemoized
              height={carouselStatus ? 'auto' : 100}
              username={name}
              greeting={greeting}
            />

            {carouselStatus ? (
              <CarouselList setCarouselStatus={setCarouselStatus} />
            ) : <></>}
            <View style={{ marginVertical: carouselStatus ? 24 : 4 }} />

            <ScrollView nestedScrollEnabled={true} showsVerticalScrollIndicator={false} >
              {network ? (
                <>
                  {loader ? (
                    <ComponentBeatStartShimmer />
                  ) : (
                    <>
                      {isDayStart ? (
                        <>
                          <ComponentStartDaysMemoized
                            setPunchinMediaId={setPunchinMediaId}
                            onpress={() => handlepunchinApi()}
                            setTodayTrip={setTodayTrip}
                          />
                          <View style={{ marginVertical: 4 }} /></>

                      ) : (
                        <>
                          <ComponentEndDaysMemoized
                            checkinOutStatus={checkinOutStatus}
                            setPunchoutMediaId={setPunchoutMediaId}
                            onpress={() => handlepunchoutApi()}
                          />
                          <View style={{ marginVertical: 4 }} />

                        </>
                      )}
                    </>
                  )}
                </>
              ) : (
                <></>
              )}

              {doJointWorking ? (
                <View>
                  <ComponentJointWorking jointEmpName={network ? jointTeamName : asyncJointEmpName} />
                  <View style={{ marginVertical: 4 }} />
                </View>
              ) : (
                <></>
              )}

              {Roles.includes('can_do_beats') ? (
                showbeat ? (
                  beatId == '' || beatId == null || beatId == undefined ? (
                    <>
                      {loader && network ? (
                        <>
                          <ComponentBeatStartShimmer />
                        </>
                      ) : (<>
                        {network ? (<>
                          <ComponentBeatStartMemoized
                            empId={empIdd}
                            agendaStatus={agendaType1}
                          />
                          <View style={{ marginVertical: 4 }} />
                        </>) : <></>}
                      </>
                      )}
                    </>
                  ) : (
                    <>
                      {loader ? (
                        <>
                          <ComponentBeatStartShimmer />
                        </>
                      ) : (
                        <ComponentBeatEndMemoized />
                      )}
                    </>
                  )
                ) : (
                  <></>
                )
              ) : (
                <></>
              )}

              {showRoasterPlan ? (
                <>
                  <View style={{ marginVertical: 5 }} />
                  <ComponentViewRoasterPlan />
                </>
              ) : (
                <></>
              )}
              <View style={{ flex: 1 }}>
                {/* vrtualError */}
                <DashboardButtonGridMemoized
                  punchStatus={punchStatus}
                  props={props}
                  showOn={'Dashboard'}
                  setCheckinOutStatus={setCheckinOutStatus}
                />
                {/*__________ Daily Calls Report __________ */}
                {Roles.includes('emp_has_targets') && network ? (
                  <>
                    <View style={{ paddingVertical: 5 }} />
                    <DailyCallsReport />
                  </>
                ) : (
                  <></>
                )}
                {/*__________ Month till date calls Report __________*/}
                {Roles.includes('emp_has_targets') && network ? (
                  <>
                    <View style={{ marginVertical: 5 }} />
                    <MonthtillDateCallReport
                    />
                  </>
                ) : (
                  <></>
                )}

                {/*__________ Category Wise Order Report Report ________vrtualError__*/}
                {Roles.includes('emp_has_targets') && network ? (
                  <>
                    <View style={{ marginVertical: 5 }} />
                    <CategoryWiseOrderReport
                      EmployeeId={empIdd}
                      heading="Total Sales Calls"
                    />
                  </>
                ) : (
                  <></>
                )}

                {/*--------.... Target Vs Achievement ....------------vrtualError */}
                {Roles.includes('can_do_counter_sales') && network ? (
                  <>
                    <View style={{ marginVertical: 5 }} />
                    <TargetVsAchievementReport data={insideData} />
                  </>
                ) : (
                  <></>
                )}

                {/*__________ SKU Wise Target Vs AchievementReport __________*/}
                {/* {Roles.includes('can_do_counter_sales') ? (
                  <>
                    <View style={{ marginVertical: 5 }} />
                    <SKUWiseTargetVsAchievementReport />
                  </>
                ) : (<></>)} */}
              </View>
              <View style={{ marginVertical: 5 }} />
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
              />
              // <></>
            )}
          </>
        )}

        {/* <Button title={"Take snap"} onPress={()=>takeScreenShot()} /> */}
      </View>

    </>
  );
}
