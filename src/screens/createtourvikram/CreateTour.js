import React, {useRef, useEffect, useState} from 'react';
import {
  StatusBar,
  View,
  Text,
  ScrollView,
  Animated,
  Dimensions,
} from 'react-native';
import styles from '../../assets/css/styleCreateTour';
import FullsizeButton from '../../components/shared/FullsizeButton';
import HeaderWithPicker from '../../components/shared/HeaderWithPickerComponent';
import VerifyModel from '../../components/shared/VerifyModel';
import CustomCollaps from '../../components/CustomDropdownTwoLabel/CustomCollaps';
import {gettripLocationApi} from '../../repository/trip/tripRepository';
import {postCreateTourApi} from '../../repository/createTour/createTourRepository';
import {useSelector} from 'react-redux';
import {store} from '../../../App';
import LoaderAllInOne from '../../components/shared/Loader';
const {width} = Dimensions.get('window');
import {MyThemeClass} from '../../components/Theme/ThemeDarkLightColor';
import HeaderTour from '../../components/shared/HeaderTour';
// import Spinner from 'react-native-loading-spinner-overlay';

export default function CreateTour(props) {
  // console.log("props on create tour89889",props)
  const modes = useSelector(state => state.mode);
  const tempEmpId = useSelector(state => state.empId);
  // const[refreshEmpState,setRefresh]
  const themecolor = new MyThemeClass(modes).getThemeColor();

  const tourPlansRedux = useSelector(state => state.tourPlans);
  const tourPlansVal = Object.values(tourPlansRedux);
  console.log('9999999999999', tourPlansVal);
  const [collapsed, setCollapsed] = useState(true);
  const [maxLines, setMaxLines] = useState(2);
  const animationHeight = useRef(new Animated.Value(0)).current;
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
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
  const [getCreateTour, setCreateTour] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [loader, setLoader] = useState(true);
  const [empId, setEmpId] = useState('');
  const [month, setMonth] = useState('');
  const [refreshA, setRefreshA] = React.useState(false);
  const [isShow, setIsShow] = React.useState(false);

  console.log('startdate on create tour', startdate);
  console.log('enddate on create tour', enddate);
  console.log('start date gettime', new Date(startdate).getTime());
  console.log('end date gettime', new Date(enddate).getTime());
  const [beatObj, setBeatObj] = useState({});
  // alert(empId)
  const fetchBeats = async () => {
    try {
      if (props.route.params.user !== false) {
        var res = await gettripLocationApi('api/getAllBeat');
      } else {
        // alert(empId)
        var res = await gettripLocationApi(
          `api/getAllBeat?employee_id=${empId}`,
        );
      }
      // console.log('resres==>>201',res)
      if (res.statusCode == 200) {
        console.log('======== ans1', res.data);
        setAllBeats(res.data);
        if (props.route.params.screen != '') {
          res.data.forEach(itm => {
            setBeatObj(prev => ({...prev, [itm.BeatId]: itm.BeatName}));
          });
        }
        // console.log("fetchALlBeats012",res)
      }
    } catch (e) {
      console.log('Catch Error : ' + e);
    }
  };

  // console.log("======== ans Line 60--->", allBeats)

  const getEventTypes = async () => {
    let results = await gettripLocationApi('api/getEventTypes');
    // console.log('EventTypes==', results)
    setEventTypes(results.data);
    // setLoader(false);
  };

  //For Edit tour plan
  async function getCurrentMonth() {
    setLoader(true);
    setIsShow(false);
    const result = await gettripLocationApi('api/getCurrentMonthTourPlan');
    // console.log('==============================ffffff', result);
    console.log(
      'Object.keys(result.data)',
      Object.keys(result.data)[Object.keys(result.data).length - 1],
    );

    // setCreateTour('Edit Tour');
    setWholeMonthdates(Object.keys(result.data));
    setWholeMonthdatesObj(result.data);
    setStartdate(Object.keys(result.data)[0]);
    setEnddate(Object.keys(result.data)[Object.keys(result.data).length - 1]);
    setNote('You can only edit tour plan for current month');
    // setLoader(false);
    //  setWholeMonthdates(Object.keys(temporaryObj));
    //  setWholeMonthdatesObj(temporaryObj);
    setTimeout(() => {
      setIsShow(true);
      setLoader(false);
    }, 2000);
  }
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
    console.log('Next Month Tour Plan=====>', result);
    const keys = Object.keys(result.data);
    setKey1(keys);
    let genrtour = Object.values(result.data);
    setTourobj(genrtour);
    // console.log('startdate13', Object.values(result.data));
    // console.log('enddate09', keys[keys.length - 1]);
    // setCreateTour('CreateTour');
    setWholeMonthdates(keys);
    setWholeMonthdatesObj(result.data);
    setStartdate(keys[0]);
    setEnddate(keys[keys.length - 1]);
    setNote('You can only create tour plan for upcoming month');
    // setIsShow(true)
    setTimeout(() => {
      setIsShow(true);
      setLoader(false);
    }, 2000);
  }

  

  // React.useEffect(()=>{
  //   // alert(empId)
  // console.log("EmpId88",empId)
  // setRefreshA(!refreshA)
  // },[tempEmpId])

  async function generateTourplan() {
    setLoader(true);
    if (props.route.params.user !== false) {
      var body = {
        tour_plan: tourPlansVal,
      };
    } else {
      var body = {
        emp_id: tempEmpId,
        tour_plan: tourPlansVal,
      };
    }
    console.log('Create tour Plans Finale Body =======>', body);
    const result = await postCreateTourApi('api/generateTourPlan', body);
    console.log('response from generate tour', result);
    if (result.statusCode == 200) {
      setLoader(false);
      setModalVisible2(!modalVisible2);
      store.dispatch({type: 'REMOVE_ALL_TOUR_PLANS'});
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
  // alert(JSON.stringify(tourPlansVal))
  const acceptPlan = async () => {
    try {
      const TpIds = [];
      tourPlansVal.map(item => {
        TpIds.push(item.TpId);
      });
      // alert(TpIds)
      const result = await gettripLocationApi(`api/approveTP?tpid=${TpIds}`);
      if (result.statusCode == 200) {
        props.navigation.goBack();
        // alert(result.message)
      }
    } catch (err) {
      console.log(err);
    }
  };

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
      <View
        style={{...styles.mainview, backgroundColor: themecolor.THEMECOLOR}}>
        <StatusBar translucent backgroundColor="transparent" />
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
                props.navigation.push('NewDashboard');
              }}
              setEmpId={setEmpId}
              empId={empId}
              setMonth={setMonth}
            />
          </>
        )}
        {isShow ? (
          <>
            <View
              style={{
                ...styles.container,
                backgroundColor: themecolor.THEMECOLOR,
              }}>
              <ScrollView showsVerticalScrollIndicator={false} style={styles.H}>
                <View style={styles.marg5} />
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View style={styles.widthcenterCustom}>
                    {props.route.params.screen == '' ? (
                      <>
                        <CustomCollaps
                          data={wholemonthDates}
                          allBeats={allBeats}
                          eventTypes={eventTypes}
                          wholemonthDatesObj={wholemonthDatesObj}
                          renderFor="createTour"
                          setRefresh={setRefresh}
                          refresh={refresh}
                          beatObj={beatObj}
                          empId={props.route.params.empId}
                          refreshA={refreshA}
                          setRefreshA={setRefreshA}
                        />
                      </>
                    ) : (
                      <>
                        <CustomCollaps
                          data={wholemonthDates}
                          allBeats={allBeats}
                          eventTypes={eventTypes}
                          wholemonthDatesObj={wholemonthDatesObj}
                          renderFor="editTour"
                          setRefresh={setRefresh}
                          refresh={refresh}
                          beatObj={beatObj}
                          empId={props.route.params.empId}
                          refreshA={refreshA}
                        />
                      </>
                    )}
                  </View>
                </ScrollView>
                <View style={styles.marg10} />
                <View style={styles.NotesView}>
                  <Text style={{...styles.NoteText,color:themecolor.TXTWHITE}}>Note: {note}</Text>
                </View>
                <View style={styles.marg5} />
                {props.route.params.empId != undefined && (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: width * 0.9,
                      alignSelf: 'center',
                      marginBottom: 5,
                    }}>
                    <View>
                      <FullsizeButton
                        title="Accept"
                        width={width / 2.3}
                        backgroundColor="green"
                        onPress={() => acceptPlan()}
                      />
                    </View>
                    <View>
                      <FullsizeButton
                        title="Reject"
                        width={width / 2.3}
                        backgroundColor="tomato"
                        onPress={() => rejectPlan()}
                      />
                    </View>
                  </View>
                )}
                <FullsizeButton
                  title={
                    props.route.params.empId == undefined
                      ? buttonTitle
                      : 'Edit and accept'
                  }
                  backgroundColor={themecolor.HEADERTHEMECOLOR}
                  onPress={() =>
                    props.route.params.empId == undefined
                      ? generateTourplan()
                      : ''
                  }></FullsizeButton>
                <View style={styles.VikkuMV} width={width * 0.95} />
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
