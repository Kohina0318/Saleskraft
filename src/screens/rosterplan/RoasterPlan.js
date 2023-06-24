import React, {useEffect, useState} from 'react';
import {StatusBar, View, Text, ScrollView} from 'react-native';
import styles from '../../assets/css/styleCreateTour';
import FullsizeButton from '../../components/shared/FullsizeButton';
import HeaderWithPicker from '../../components/shared/HeaderWithPickerComponent';
import VerifyModel from '../../components/shared/VerifyModel';
import {gettripLocationApi} from '../../repository/trip/tripRepository';
import {postCreateTourApi} from '../../repository/createTour/createTourRepository';
import {useSelector} from 'react-redux';
import {store} from '../../../App';
import Custom from './Custom';
import LoaderAllInOne from '../../components/shared/Loader';
import HeaderTour from '../../components/shared/HeaderTour';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';

{
  /* Custom Select start */
}

export default function RoasterPlan(props) {
  // console.log("props on create tour89889",props)

  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()

  const tourPlansRedux = useSelector(state => state.RoasterPlans);
  const tempEmpId = useSelector(state => state.empId);
  const tourPlansVal = Object.values(tourPlansRedux);
  // const tourPlansKeys = Object.keys(tourPlansRedux);
  // console.log("88888888888",tourPlansRedux)
  // console.log("9999999999999",tourPlansVal)
  // const [collapsed, setCollapsed] = useState(true);
  // const [maxLines, setMaxLines] = useState(2);
  // const animationHeight = useRef(new Animated.Value(0)).current;
  // const [date, setDate] = useState(new Date());
  // const [mode, setMode] = useState('date');
  // const [show, setShow] = useState(false);
  const [allBeats, setAllBeats] = useState([]);
  const [eventTypes, setEventTypes] = useState([]);
  const [startdate, setStartdate] = useState();
  const [enddate, setEnddate] = useState();
  const [tourobj, setTourobj] = useState([]);
  const [wholemonthDates, setWholeMonthdates] = useState([]);
  const [wholemonthDatesObj, setWholeMonthdatesObj] = useState({});
  const [key1, setKey1] = useState([]);
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [buttonTitle, setButtonTitle] = useState('');
  const [createTour, setCreateTour] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [loader, setLoader] = useState(true);

  const [empId, setEmpId] = useState('');
  const [month, setMonth] = useState('');
  const [isShow, setIsShow] = React.useState(false);

  console.log('startdate on create tour', startdate);
  console.log('enddate on create tour', enddate);
  console.log('start date gettime', new Date(startdate).getTime());
  console.log('end date gettime', new Date(enddate).getTime());
  const [beatObj, setBeatObj] = useState({});

  // const editReduxKeys = useSelector(state=>state.tourPlans);

  const fetchBeats = async () => {
    let res = await gettripLocationApi(
      props.route.params.user !== false?
      'api/getEmpOutlets':`api/getEmpOutlets?employee_id=${tempEmpId}`
      );
    // console.log('getEmpOutlets======>>>>Line 68',res)
    if (res.statusCode == 200) {
      setAllBeats(res.data);
      if (props.route.params.screen != '') {
        res.data.forEach(itm => {
          setBeatObj(prev => ({...prev, [itm.BeatId]: itm.BeatName}));
        });
      }
    }
  };
  // console.log("======== ans Line 60--->", allBeats)

  const getEventTypes = async () => {
    let results = await gettripLocationApi('api/getEventTypes');
    // console.log('EventTypes==', results)
    setEventTypes(results.data);
    // setLoader(false)
  };

  //For Edit Roster plan
  async function getCurrentMonth() {
    setLoader(true);
    setIsShow(false);
    const result = await gettripLocationApi('api/getCurrentMonthTourPlan');
    // console.log('==============================ffffff',result)
    // console.log('Object.keys(result.data)',Object.keys(result.data)[Object.keys(result.data).length-1])
    setWholeMonthdates(Object.keys(result.data));
    setWholeMonthdatesObj(result.data);
    setStartdate(Object.keys(result.data)[0]);
    setEnddate(Object.keys(result.data)[Object.keys(result.data).length - 1]);
    setNote('You can only edit tour plan for current month');
    //  setCreateTour('Edit Tour');
    //  setWholeMonthdates(Object.keys(temporaryObj));
    //  setWholeMonthdatesObj(temporaryObj);
    // setLoader(false);
    setTimeout(() => {
      setIsShow(true);
      setLoader(false);
    }, 2000);
  }
  // alert(props.route.params.user)

  //For Create Roster plan
  async function getNextMonth() {
    setLoader(true);
    setIsShow(false);
    // alert('hi')
    // alert(empId)
    const result = await gettripLocationApi(
      props.route.params.user !== false
        ? 'api/getNextMonthTourPlan'
        : `api/getNextMonthTourPlan?employee_id=${tempEmpId}`,
    );

    // const result = await gettripLocationApi('api/getNextMonthTourPlan')

    const keys = Object.keys(result.data);
    setKey1(keys);
    let genrtour = Object.values(result.data);
    setTourobj(genrtour);
    console.log('startdate13', Object.values(result.data));
    console.log('enddate09', keys[keys.length - 1]);
    setCreateTour('Create Tour');
    setWholeMonthdates(keys);
    setWholeMonthdatesObj(result.data);
    setStartdate(keys[0]);
    setEnddate(keys[keys.length - 1]);
    setNote('You can only create tour plan for upcoming month');
    // setLoader(false);
    setTimeout(() => {
      setIsShow(true);
      setLoader(false);
    }, 2000);
  }

  // {"Fri, 30 Sep 2022": {"BeatId": "", "OutletIds": ["2", "4"], "TpDate": "2022-09-30", "TpId": 0, "TpRemark": "", "TpState": "RosterPlan"}, "Thu, 29 Sep 2022": {"BeatId": "", "OutletIds": [], "TpDate": "2022-09-29", "TpId": 0, "TpRemark": "", "TpState": "CLIENT VISIT"}}
  async function generateTourplan() {
    setLoader(true);
    var newArr = [];
    tourPlansVal.forEach(itm => {
      var a = '';
      try {
        a = itm.OutletIds.join(',');
      } catch (e) {
        a = '';
      }
      var obj = {};
      obj['BeatId'] = itm.BeatId;
      obj['OutletIds'] = a;
      obj['TpDate'] = itm.TpDate;
      obj['TpRemark'] = itm.TpRemark;
      obj['TpId'] = itm.TpId;
      obj['TpState'] = itm.TpState;
      newArr.push(obj);
    });

    console.log('newAr================>>>>>>>', newArr);

    // let body = {
    //   tour_plan: newArr,
    // };

    if (props.route.params.user !== false) {
      var body = {
        tour_plan: newArr,
      };
    } else {
      // alert('hi')
      var body = {
        emp_id: tempEmpId,
        tour_plan: newArr,
      };
    }
    console.log('Create tour Plans Finale Body ================>', body);
    const result = await postCreateTourApi('api/generateTourPlan', body);
    console.log('response from generate tour', result);
    if (result.statusCode == 200) {
      setLoader(false);
      setModalVisible2(!modalVisible2);
      store.dispatch({type: 'REMOVE_ROSTER_PLANS'});
      store.dispatch({type: 'REMOVE_ROSTER_PLANS_FINALE'});
    }
  }

  useEffect(() => {
    if (props.route.params.screen == '') {
      setTitle('Create Tour Plan');
      setButtonTitle('Generate Tour Plan');
      getNextMonth();
      setCreateTour(true);
    } else {
      setTitle('Edit Tour Plan');
      setButtonTitle('Update Tour Plan');
      getCurrentMonth();
    }
    fetchBeats();
    getEventTypes();
    // setLoader(false);
  }, [tempEmpId]);

  const [modalVisible2, setModalVisible2] = useState(false);

  return (
    <>
      {loader ? (
        <>
          <LoaderAllInOne />
        </>
      ) : (
        // <Spinner
        //   visible={true}
        //   textContent={'Loading...'}
        //   textStyle={{color: '#FFF'}}
        // />
        <></>
      )}
      <View style={{...styles.mainview,backgroundColor:themecolor.THEMECOLOR}}>
        <StatusBar translucent backgroundColor="transparent" />
        {/* <HeaderWithPicker title={title} startdate={startdate} enddate={enddate} /> */}
        {props.route.params.user !== false ? (
          <HeaderWithPicker
            title={title}
            startdate={startdate}
            enddate={enddate}
          />
        ) : (
          <>
            <HeaderTour
              onPress={() => {
                store.dispatch({type: 'REMOVE_EMPID'});
                props.navigation.push('RoasterHome');
              }}
              setEmpId={setEmpId}
              empId={empId}
              setMonth={setMonth}
            />
          </>
        )}
        {isShow ? (
          <>
            <View style={styles.container}>
              <ScrollView showsVerticalScrollIndicator={false} style={styles.H}>
                {/* <View style={styles.marg5} /> */}
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View style={styles.MV5} />
                  <View style={styles.widthcenterCustom}>
                    {props.route.params.screen == '' ? (
                      <>
                        <Custom
                          data={wholemonthDates}
                          allBeats={allBeats}
                          eventTypes={eventTypes}
                          wholemonthDatesObj={wholemonthDatesObj}
                          renderFor="createTour"
                          setRefresh={setRefresh}
                          refresh={refresh}
                          beatObj={beatObj}
                        />
                      </>
                    ) : (
                      <>
                        <Custom
                          data={wholemonthDates}
                          allBeats={allBeats}
                          eventTypes={eventTypes}
                          wholemonthDatesObj={wholemonthDatesObj}
                          renderFor="editTour"
                          setRefresh={setRefresh}
                          refresh={refresh}
                          beatObj={beatObj}
                        />
                      </>
                    )}
                  </View>
                </ScrollView>
                <View style={styles.marg10} />
                <View style={styles.NotesView}>
                  <Text style={{...styles.NoteText, color: themecolor.TXTWHITE}}>Note: {note}</Text>
                </View>
                <View style={styles.marg5} />
                <FullsizeButton
                  title={buttonTitle}
                  onPress={() => generateTourplan()}></FullsizeButton>
                <View style={styles.VikkuMV} />
              </ScrollView>
            </View>
          </>
        ) : (
          <></>
        )}
        {modalVisible2 && (
          <VerifyModel
            title={
              props.route.params.screen == ''
                ? 'Tour plan created successfully'
                : 'Tour plan edited successfully'
            }
            navigateFrom=""
            navigateTo="NewDashboard"
          />
        )}
      </View>
    </>
  );
}
