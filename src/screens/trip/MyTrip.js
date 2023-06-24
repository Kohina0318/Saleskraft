import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  StatusBar,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
  TextInput,
  Dimensions,
  BackHandler,
} from 'react-native';
import styles from '../../assets/css/stylesDashboardBA';
import RBSheet from 'react-native-raw-bottom-sheet';
import Father from 'react-native-vector-icons/Feather';
import { useFocusEffect } from '@react-navigation/native';
import { FontFamily } from '../../assets/fonts/FontFamily';
import { FontSize } from '../../assets/fonts/Fonts';
import { Colors } from '../../assets/config/Colors';
import Header_2 from '../../components/shared/Header_2';
import { gettripLocationApi } from '../../repository/trip/tripRepository';
import { TripFilterSheet } from './TripFilterSheet';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';
import NoData from '../../components/shared/NoData';
import LoaderAllInOne from '../../components/shared/Loader';
import { store } from '../../../App';
import {
  MyTripDetailsList,
  // EmpTrips
} from '../../components/ExpenseData/TripdetailsData';
// import {CustomPicker} from 'react-native-custom-picker';
// import { Picker } from '@react-native-picker/picker';

const { width } = Dimensions.get('window');
const MyTrip = props => {
  const modes = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(modes).getThemeColor()
  const refRBSheet1 = useRef();
  const [triplist, setTriplist] = useState([]);
  const [tripkeys, setTripkeys] = useState([]);
  const [triplisttemp, setTriplisttemp] = useState([]);
  const [tripkeystemp, setTripkeystemp] = useState([]);
  const [triplisttemp1, setTriplisttemp1] = useState([]);
  const [tripkeystemp1, setTripkeystemp1] = useState([]);
  // const [triptype, setTriptype] = useState('');
  const [tripStatus, setTripStatus] = useState('');
  const [date, setDate] = useState(new Date());
  const [date1, setDate1] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [mode1, setMode1] = useState('date');
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [temp, setTemp] = useState('');
  const [done2, setDone2] = useState(false);
  const [loader, setLoader] = useState(true);
  // const [selected, setSelected] = useState('My Trips');
  const [newOptions, setNewOptions] = useState([]);
  const [placeholder, setPlaceholder] = useState('- My Trips -');

  const [empTrips, setEmptrips] = useState([])
  // alert(selected);



  const onChange = (event, selectedDate) => {
    try {
      const currentDate = selectedDate || date;
      store.dispatch({ type: 'REMOVE_AIRPORT_ROUTE_FILTER_TEMPORARY' });
      setShow(Platform.OS === 'ios');
      setDate(currentDate);
      // console.log(`event===${event}===selectdDate===>${selectedDate}`);
      props.setDuration(currentDate);
      setTemp(null);
      props.setDateValue(currentDate?.toString().slice(1, 15));
    } catch (e) {
      // console.log('Errr in onChange ', e);
    }
  };

  const onChange1 = (event, selectedDate) => {
    const currentDate = selectedDate || date1;
    store.dispatch({ type: 'REMOVE_AIRPORT_ROUTE_FILTER_TEMPORARY' });
    setShow1(Platform.OS === 'ios');
    setDate1(currentDate);
    setTemp(null);
    // datewisefilter(currentDate);
  };

  const showMode = currentMode => {
    setMode(currentMode);
  };

  const showMode1 = currentMode => {
    setMode1(currentMode);
  };

  const showDatepicker = () => {
    setShow(true);
    showMode('date');
  };

  const showDatepicker1 = () => {
    setShow1(true);
    showMode1('date');
  };

  // const enumerateDaysBetweenDates = (startDate, endDate) => {
  //   let now = moment(startDate),
  //     dates = [];
  //   while (now.isSameOrBefore(endDate)) {
  //     dates.push(now.format('M/D/YYYY'));
  //     now.add(1, 'days');
  //   }
  //   return dates;
  // };

  // var results = enumerateDaysBetweenDates(date, date1);

  // const dateConverter = (startDate, timeEnd) => {
  //   const newStartDate = new Date(startDate);
  //   const newEndDate = new Date(timeEnd);
  //   const one_day = 1000 * 60 * 60 * 24;
  //   let result;
  //   result = Math.ceil(
  //     (newEndDate.getTime() - newStartDate.getTime()) / one_day,
  //   );
  //   console.log('date Converter result', result);
  //   if (result < 0) {
  //     return 0;
  //   }
  //   return result;
  // };

  // console.log('triplist002', triplist);
  // console.log('tripkeys002', tripkeys);

  const getTrips = async () => {
    try {
      const response = await gettripLocationApi(`api/getEmployeeTrips`);
      // console.log('RESPONSE_DATA ', response.data);
      let keys1 = Object.keys(response.data);
      let removeLastEl = keys1.pop();
      let keys = keys1;
      // console.log('keys', keys);
      setTripkeys(keys);
      setTriplist(response.data);
      setLoader(false);
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(()=>{
  //   alert()
  //   getTrips()
  // },[done2])

  const datewisefilter = async date12 => {
    let start_date = `${date.getDate()}-${date.getMonth() + 1
      }-${date.getFullYear()}`;
    let end_date = `${date12.getDate()}-${date12.getMonth() + 1
      }-${date12.getFullYear()}`;

    // console.log(start_date);
    // console.log(end_date);

    try {
      const result = await gettripLocationApi(
        `api/getFilterTrips?start_date=${start_date}&end_date=${end_date}`,
      );
      // console.log('result-011', result);
      if (result.statusCode == 200) {
        let keys1 = Object.keys(result.data);
        let removeLastEl = keys1.pop();
        let keys = keys1;
        // console.log('keys8888', keys);
        // console.log('values', values1);
        setTripkeystemp1(keys);
        setTriplisttemp1(result.data);

        // console.log('result.data.Trips123', result.data);
      } else {
        // alert('hi');
        setTripkeystemp1([]);
        setTriplisttemp1([]);
      }
    } catch (er) {
      // console.log('catch filter error trips', er);
    }
    setDone2(true);
  };

  const getStatus = async () => {
    const statusResult = await gettripLocationApi('api/getStatus');
    // console.log('trip status list', statusResult.data[0].Trips);
    if (statusResult.statusCode == 200) {
      setTripStatus(statusResult.data[0].Trips);
    } else {
      alert(statusResult.message);
    }
  };

  const getEmployeeTrips = async () => {
    try {
      const result = await gettripLocationApi(`api/getawatingApprovalTrip`)
      if (result.statusCode == 200) {
        setEmptrips(result.data)
      } else {
        // console.log('Message of team trips', result.message)
      }
    } catch (err) {
      // console.log('Error:', err)
    }
  }

  useFocusEffect(
    useCallback(() => {
      getTrips();
      getStatus();
      getEmployeeTrips()
    }, []),
  );

  const filterOnPressDone = async (list, keys) => {
    //  alert(JSON.stringify(temp));
    // store.dispatch({type:'REMOVE_AIRPORT_ROUTE_FILTER_TEMPORARY'})

    if (temp == null || temp == '') {
      // alert("Inside If")
      let start_date = `${date.getDate()}-${date.getMonth() + 1
        }-${date.getFullYear()}`;
      let end_date = `${date1.getDate()}-${date1.getMonth() + 1
        }-${date1.getFullYear()}`;
      try {
        // console.log('Statrt Date' + start_date);
        // console.log('Emd Date' + end_date);
        const result = await gettripLocationApi(
          `api/getFilterTrips?start_date=${start_date}&end_date=${end_date}`,
        );

        // console.log('result-011', result);
        if (result.statusCode == 200) {
          let keys1 = Object.keys(result.data);
          let removeLastEl = keys1.pop();
          let keys = keys1;
          // console.log('keys8888', keys);
          // console.log('values', values1);
          setTriplist(result.data);
          setTripkeys(keys);
          refRBSheet1.current.close();
          // setTripkeystemp1(keys);
          // setTriplisttemp1(result.data);

          // console.log('result.data.Trips123', result.data);
        } else {
          setTriplist([]);
          setTripkeys([]);
          refRBSheet1.current.close();
        }
      } catch (e) {
        alert(e);
        console.log('Erro in Catch Line 216 in MyTrip', e);
      }
    } else {
      try {
        const result = await gettripLocationApi(
          `api/getFilterTrips?short_by=${temp}`,
        );
        // console.log('result-011', result);
        if (result.statusCode == 200) {
          let keys1 = Object.keys(result.data);
          let removeLastEl = keys1.pop();
          let keys = keys1;
          setTriplist(result.data);
          setTripkeys(keys);
          refRBSheet1.current.close();

          // console.log('result.data.Trips123', result.data);
        } else {
          setTriplist([]);
          setTripkeys([]);
          setDone2(true);
          refRBSheet1.current.close();
          // setTemp(!temp)
        }
      } catch (e) {
        // alert("Hiiii",e)
      }
    }
  };

  // useEffect(()=>{
  //   alert(temp)
  // },[temp])

  const handleBackButtonClick = () => {
    props.navigation.push('ExpenseCard');
    return true;
  };

  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);

      return () => {
        BackHandler.removeEventListener(
          'hardwareBackPress',
          handleBackButtonClick,
        );
      };
    }, []),
  );

  var attendanceSelect = ['Team Trips'];

  useEffect(() => {
    if (placeholder == 'Team Trips') {
      attendanceSelect = ['- My Trips -'];
    } else if (placeholder == '- My Trip -') {
      attendanceSelect = ['Team Trips'];
    }
    setNewOptions(attendanceSelect);
  }, [placeholder]);

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
      <View style={{ ...styles.bg, backgroundColor: themecolor.THEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR }}>
        <StatusBar translucent backgroundColor="transparent" />
        {/* <View> */}
        <Header_2
          title={'Trips'}
          onPressIconPlus={() => props.navigation.push('CreateTrip')}
          iconnameplus="plus"
          Size={20}
          iconname="filter"
          onPressIcon={() => {
            refRBSheet1.current.open();
          }}
          onPress={() => {
            store.dispatch({ type: 'REMOVE_AIRPORT_ROUTE_FILTER' });
            store.dispatch({ type: 'REMOVE_AIRPORT_ROUTE_FILTER_TEMPORARY' });
            props.navigation.push('ExpenseCard');
          }}
        />
        {/* <SearchBar /> */}
        <View style={{ position: 'relative' }}>
          <View style={styles.MV5} />
          {/* {
            empTrips.length >=1?
          <View style={{right: 10, top: 2, zIndex: 999, position: 'absolute'}}>
            <NewDropdown
              options={newOptions}
              setSelectedItem={setSelected}
              toValue={80}
              widthh={100}
              widthPlaceHolder={80}
              widthIcon={10}
              placeholder={placeholder}
              setPlaceholder={setPlaceholder}
            />
          </View>:<></>
          } */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ ...styles.H, position: 'relative' }}>
            {/* {placeholder == '- My Trips -' ? ( */}
            <View style={styles.view}>
              {tripkeys.length >= 1 ? (
                tripkeys.map((i, indx) => {
                  return (
                    <MyTripDetailsList
                      key={indx}
                      tripStatus={tripStatus}
                      Month={i}
                      DATA={triplist[i]}
                    />
                  );
                })
              ) : (
                <NoData message="Trip Not Found" />
              )}
            </View>
            {/* ) : (
              <View style={{...styles.view,width:width*0.95}}>
                
               <EmpTrips empTrips={empTrips} />
              </View>
            )} */}
          </ScrollView>
        </View>
        <RBSheet
          ref={refRBSheet1}
          animationType={'slide'}
          closeOnDragDown={true}
          closeOnPressMask={true}
          height={350}
          customStyles={{
            container: {
              borderTopRightRadius: 30,
              borderTopLeftRadius: 30,
              padding: 10,
              backgroundColor: themecolor.RB2
            },
            draggableIcon: {
              display: 'none',
            },
          }}>
          <View style={styles.RBVIEW}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => refRBSheet1.current.close()}>
              <Image
                source={require('../../assets/images/close.png')}
                style={styles.CloseIcon}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
            <View>
              <Text style={{ ...styles.CardText, color: themecolor.TXTWHITE }}>Set Filters</Text>
            </View>
            <View>
              <View>
                {!done2 ? (
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() =>
                      filterOnPressDone(triplisttemp, tripkeystemp)
                    }>
                    <Text style={{ ...styles.RBText1, color: themecolor.TXTWHITE }}>Done</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() =>
                      filterOnPressDone(triplisttemp1, tripkeystemp1)
                    }>
                    <Text style={{ ...styles.RBText1, color: themecolor.TXTWHITE }}>Done</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>

          <View style={styles.SortView}>
            <View style={styles.MV3} />
            <View style={styles.Width9}>
              <Text style={{ ...styles.CardText1, color: themecolor.TXTWHITE }}>Sort by</Text>
            </View>
            <TripFilterSheet
              setTriplisttemp={setTriplisttemp}
              setTripkeystemp={setTripkeystemp}
              setDone2={setDone2}
              setTripkeys={setTripkeys}
              setTriplist={setTriplist}
              setTemp={setTemp}
              temp={temp}
            />
            {/* ===================😍😎😎😎😋========= */}
            {/* <View style={styles.MV3} /> */}
            <Text style={{ ...styles.CardText1, color: themecolor.TXTWHITE }}>Sort by date range</Text>
            <View style={styles.MV3} />

            {/* ///////////////////date picker/////////////////// */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignSelf: 'center',
                width: width * 0.95,
                height: 40,
              }}>
              <TouchableOpacity onPress={showDatepicker}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: props.width,
                    backgroundColor: themecolor.MODAL,
                    borderRadius: 10,
                    borderWidth: 0.5,
                    borderColor: themecolor.BOXBORDERCOLOR1
                  }}>
                  <TextInput
                    editable={false}
                    value={date.toUTCString().substring(0, 16)}
                    label="* Enter Date"
                    style={{
                      fontSize: FontSize.labelText,
                      fontFamily: FontFamily.PopinsMedium,
                      height: 40,
                      color: Colors.black,
                      top: 3,
                      width: width * 0.36,
                      left: 7,
                    }}
                    underlineColor={'transparent'}
                    labelStyle={{ fontSize: 11 }}
                  />
                  <Father
                    name="calendar"
                    style={{ fontSize: 14, alignSelf: 'center', marginRight: 8, }}
                  />
                </View>
              </TouchableOpacity>
              {show && (
                <DateTimePicker
                  // minimumDate={new Date()}
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  is24Hour={false}
                  display="default"
                  onChange={onChange}
                />
              )}
              <View style={{ justifyContent: 'center' }}>
                <Text
                  style={{
                    fontSize: FontSize.labelText,
                    fontFamily: FontFamily.PopinsMedium,
                    color: themecolor.TXTWHITE
                  }}>
                  to
                </Text>
              </View>
              <TouchableOpacity onPress={showDatepicker1}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: props.width,
                    backgroundColor: themecolor.MODAL,
                    borderRadius: 10,
                    borderWidth: 0.5,
                    borderColor: themecolor.BOXBORDERCOLOR1
                  }}>
                  <TextInput
                    editable={false}
                    value={date1.toUTCString().substring(0, 16)}
                    label="* Enter Date"
                    style={{
                      fontSize: FontSize.labelText,
                      fontFamily: FontFamily.PopinsMedium,
                      height: 40,
                      color: Colors.black,
                      top: 3,
                      width: width * 0.36,
                      left: 7,
                    }}
                    underlineColor={'transparent'}
                    labelStyle={{ fontSize: 11 }}
                  />

                  <Father
                    name="calendar"
                    style={{ fontSize: 14, alignSelf: 'center', marginRight: 8 }}
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
        </RBSheet>
        {/* RBSHEET END TWO */}
      </View>
    </>
  );
};

export default MyTrip;
