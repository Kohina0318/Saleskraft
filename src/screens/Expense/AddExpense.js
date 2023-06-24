import React, { useState, useEffect } from 'react';
import {
  TouchableOpacity,
  StatusBar,
  View,
  Text,
  ScrollView,
  TextInput,
  Dimensions,
} from 'react-native';
import Father from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { Colors } from '../../assets/config/Colors';
import styles from '../../assets/css/styleTrip';
import Header_2 from '../../components/shared/Header_2';
import { useToast } from 'react-native-toast-notifications';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';
import {
  createTripApi,
  gettripLocationApi,
} from '../../repository/trip/tripRepository';
import {
  getUserCurrentLatLng,
  getUserCurrentLocationCommon,
} from '../../repository/commonRepository';
import moment from 'moment';
import LoaderAllInOne from '../../components/shared/Loader';
import Ionicons from 'react-native-vector-icons/Ionicons';

// import Spinner from 'react-native-loading-spinner-overlay';
// import {FontFamily} from '../../assets/fonts/FontFamily';
// import {FontSize} from '../../assets/fonts/Fonts';
// import { useNavigation } from '@react-navigation/native';
const { width, height } = Dimensions.get('window');

export default function AddExpense(props) {
  const modes = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(modes).getThemeColor()
  const toast = useToast();
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [budgets, setBudgets] = useState([]);
  const [date, setDate] = useState(new Date());
  const [date1, setDate1] = useState(new Date());
  const [workingat, setWorkingat] = useState('');
  const [budgetid, setBudgetid] = useState('');
  const [tripData, setTripData] = useState([]);
  const [tripType, setTripType] = useState({});
  const [wdinpt, setdinpt] = useState(['1']);
  const [loader, setLoader] = useState(true);
  const [pow, setPow] = useState('');
  const [pow1, setPow1] = useState('');
  const [address, setAddress] = useState('');

  // alert(typeof(workingat))

  const currentLatLng = useSelector(state => state.currentLatLng);

  // alert(address)
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    // alert(currentDate)
    setShow(false);
    let datedt = currentDate.getDate();
    let month = currentDate.getMonth() + 1;
    let year = currentDate.getFullYear();
    let final_date = `${datedt}/${month}/${year}`;
    // let final_date1 = `${date}-${month}-${year}`;
    setDate(new Date(currentDate));
    setDate1(final_date);
    getWorkingAtData(final_date.replaceAll('/', '-'));
  };

  const getWorkingAtData = async date => {
    // console.log('date898989 ==', date);
    const result = await gettripLocationApi(
      `api/getWorkingAt?selected_date=${date}`,
    );
    if (result.statusCode == 200) {
      // console.log('rdT', result.data.Trip);
      setTripData(result.data.Trip);
      setTripType(result.data.TripType.TripType);
      // console.log('tripData==>>length ', result.data.Trip.length);
      // if (result.data.Trip.length == 0) {
      //   setWorkingat(address)
      // }
      setdinpt(result.data.Trip);
      setLoader(false);
    } else {
      alert(result.message);
    }
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    setShow(true);
    showMode('date');
  };

  const getbudget = async () => {
    let result = await gettripLocationApi('api/getbudgets');
    if (result.statusCode == 200) {
      // console.log('result==>>', result);
      setBudgets(result.data);
    }
  };

  const getPow = async () => {
    let result = await gettripLocationApi('api/getPlaceOfWork');
    if (result.statusCode == 200) {
      setPow1(result.data[0]);
      // setPow(result.data[0]);
    } else {
      toast.show(result.message, {
        type: 'warning',
        placement: 'bottom',
        duration: 4000,
        offset: 30,
        animationType: 'slide-in',
      });
    }
  };

  const getLocation = async () => {
    await getUserCurrentLatLng();
    const addrs = await getUserCurrentLocationCommon(
      currentLatLng.latitude,
      currentLatLng.longitude,
    );

    // console.log('latlong in Add expense0012', addrs);
    setAddress(addrs);
    setPow(addrs);
    // setWorkingat(0);
  };

  useEffect(() => {
    if (props.route.params != undefined) {
      let dtmdl = props.route.params.modaldate;
      var dtf = dtmdl.split('-')[0];
      let mt = dtmdl.split('-')[1];
      let yr = dtmdl.split('-')[2];

      let fordt = dtf.split('')[0];
      var d = new Date();
      if (fordt == 0) {
        let new_d = dtmdl.split('')[1];
        d.setDate(new_d);
      } else {
        d.setDate(dtf);
      }
      d.setMonth(mt - 1);
      d.setFullYear(yr);
      setDate(d);
      // alert(d)
      setDate1(dtmdl.replaceAll('-', '/'));
      getWorkingAtData(dtmdl);
    } else {
      // alert('else')
      let dt_curr = moment().format('L');
      let dt1 = dt_curr.split('/')[1];
      let mt1 = dt_curr.split('/')[0];
      let yr1 = dt_curr.split('/')[2];
      let f_date = `${dt1}-${mt1}-${yr1}`;
      setDate1(f_date.replaceAll('-', '/'));

      // alert(f_date)
      getWorkingAtData(f_date);
    }
    getLocation();
    getbudget();
    getPow();
  }, []);

  const showbudget = () => {
    return budgets?.map((item, index) => {
      return (
        <Picker.Item
          key={index}
          label={item.GroupName}
          style={{
            fontSize: 13,
            color: '#333',
            fontWeight: 'bold',
            // height: 10,
            backgroundColor: themecolor.BOXTHEMECOLOR, color: themecolor.TXTWHITE
          }}
          value={item.Bgid}
        />
      );
    });
  };
  const showWorkingAt = () => {
    return tripData?.map((item, index) => {
      return (
        <Picker.Item
          key={index}
          label={item.TripDestinationName}
          style={{
            fontSize: 13,
            color: '#333',
            fontWeight: 'bold',
            // height: 10,
            backgroundColor: themecolor.BOXTHEMECOLOR, color: themecolor.TXTWHITE
          }}
          value={item.TripId}
        />
      );
    });
  };
  const showTripType = () => {
    // return Object.keys(tripType).map(item => {
    return (
      <Picker.Item
        label={'HQ'}
        style={{
          fontSize: 13,
          color: '#333',
          fontWeight: 'bold',
          // height: 10,
          backgroundColor: themecolor.BOXTHEMECOLOR, color: themecolor.TXTWHITE
        }}
        value={'HQ'}
      />
    );
    // });
  };

  const handlePress = async () => {
    // console.log('hjbxjsbjasbcjasb date1cjsa  bcsbcsbcjasbc', date1);
    // console.log('hjbxjsbjasbcjasb workingat  cjsabcsbcsbcjasbc', workingat);
    // console.log('hjbxjsbjasbcjasb workingat  cjsabcsbcsbcjasbc', address);
    // console.log('hjbxjsbjasbcjasb budgetidc  jsabcsbcsbcjasbc', budgetid);
    // console.log('hjbxjsbjasbcjasb powcjsabc  sbcsbcjasbc', pow);
    // console.log('hjbxjsbjasbcjasb powcjsabc  sbcsbcjasbc', wdinpt.length);

    if (
      date1 == '' ||
      (workingat == '') ||
      budgetid == '' ||
      pow == ''
    ) {
      toast.show(`All fields are required`, {
        type: 'warning',
        placement: 'bottom',
        duration: 4000,
        offset: 30,
        animationType: 'zoom-in | slide-in',
      });
    } else {
      // const address = await getUserCurrentLocationCommon(
      //   currentLatLng.latitude,
      //   currentLatLng.longitude,
      // );
      // console.log('date1', date1);
      // console.log('workingat', workingat);
      // console.log('budgetid', budgetid);
      // console.log('pow', pow);

      // const result = await createTripApi(
      //   `api/createExpenses?ExpenseDate=${date1}&ExpenseTrip=${wdinpt.length == 0 ? address.replace(/[0-9]/g, '') : workingat
      //   }&BudgetId=${budgetid}&ExpensePlacewrk=${pow}`
      // );
      try {
        const result = await createTripApi(
          `api/createExpenses?ExpenseDate=${date1}&ExpenseTrip=${workingat}&BudgetId=${budgetid}&ExpensePlacewrk=${pow}`,
        );
        // console.log('result add expense ==>>', result);
        if (result.statusCode == 200) {
          toast.show(result.message, {
            type: 'success',
            placement: 'bottom',
            duration: 4000,
            offset: 30,
            animationType: 'slide-in',
          });
          // console.log('result .data', result.data);
          props.navigation.navigate('OutstationTripDetails', {
            date1: date1,
            expId: result.data.expid,
            // workingat: pow,
            navigateFrom: 'addexpense',
          });
        } else {
          toast.show(result.message, {
            type: 'warning',
            placement: 'bottom',
            duration: 4000,
            offset: 30,
            animationType: 'slide-in',
          });
        }
      } catch (e) {
        alert(e);
      }
    }
  };
  var dt = new Date();
  // alert(pow)
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
      <View style={{ ...styles.FirstView, backgroundColor: themecolor.THEMECOLOR }}>
        <StatusBar translucent backgroundColor="transparent" />
        <Header_2
          title={'Add Expense'}
          onPress={() => props.navigation.goBack()}
        />
        <ScrollView showsVerticalScrollIndicator={false} style={styles.SView}>
          <View style={styles.MV5} />
          <View style={styles.datacheckFlatView}>
            <Text style={{ ...styles.title, color: themecolor.TXTWHITE }}>Date</Text>
            <View
              style={{ ...styles.textContainer1, backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR1 }}>
              <TouchableOpacity onPress={() => showDatepicker()}>
                <View style={{ ...styles.RangeDateView1 }}>
                  <TextInput
                    editable={false}
                    value={
                      /*props.route.params != undefined
                      ? date
                      :*/ date.toUTCString().substring(0, 16)
                    }
                    label="* Enter Date"
                    style={{ ...styles.SelectDateInput, width: width * 0.9, color: themecolor.TXTWHITE, backgroundColor: themecolor.BOXTHEMECOLOR }}
                    underlineColor={'transparent'}
                    labelStyle={{ fontSize: 12 }}
                  />
                  {/* <Father name="calendar" style={styles.CalendarIcon} /> */}
                  <Ionicons
                        name="calendar-sharp"
                        size={15}
                        color={themecolor.TXTWHITE}
                        style={{ position: 'absolute', right: 6 }}
                      />
                </View>
              </TouchableOpacity>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  maximumDate={dt.setDate(dt.getDate() + 1)}
                  minimumDate={dt.setMonth(dt.getMonth() - 3)}
                  value={date}
                  mode={mode}
                  is24Hour={false}
                  display="default"
                  onChange={onChange}
                />
              )}
            </View>
          </View>
          <View style={styles.MV5} />
          <View style={styles.datacheckFlatView}>
            <View>
              <Text style={{ ...styles.title, color: themecolor.TXTWHITE }}>Working at</Text>
            </View>
            {/* {wdinpt.length >= 1 ? ( */}
            <View style={{ ...styles.textContainer1, backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR1 }}>
              <Picker
                // value={workingat}
                mode="dropdown"
                style={{ width: width * 0.96, color: themecolor.TXTWHITE }}
                selectedValue={workingat}
                dropdownIconColor={themecolor.TXTWHITE}
                itemStyle={{ height: 20, width: '100%' ,backgroundColor: themecolor.BOXTHEMECOLOR, color: themecolor.TXTWHITE}}
                onValueChange={item => {
                  setWorkingat(item);
                  setPow(typeof item == 'number' ? address : pow1);
                  // console.log('🤔😙☺🤔', item);
                }}>
                <Picker.Item
                  label="Select"
                  style={{
                    fontSize: 13,
                    color: '#333',
                    fontWeight: 'bold',
                    backgroundColor: themecolor.BOXTHEMECOLOR, color: themecolor.TXTWHITE
                  }}
                  value=""
                />
                {showTripType()}
                {showWorkingAt()}
              </Picker>
            </View>
            {/* ) : ( */}
            {/* <View
                style={{
                  width: '100%',
                  borderWidth: 1,
                  borderRadius: 13,
                  borderColor: Colors.borderColor,
                  backgroundColor: 'white',
                }}>
                
                <Text style={{left:5,padding:5,color:'black',fontFamily:FontFamily.PopinsRegular,fontSize:FontSize.labelText}} >{address}</Text>
              </View> */}
            {/* )} */}
          </View>
          <View style={styles.MV5} />
          <View style={styles.TViewMain}>
            <View style={styles.datacheckFlatView}>
              <View>
                <Text style={{ ...styles.title, color: themecolor.TXTWHITE }}>Budget</Text>
              </View>
              <View style={{ ...styles.textContainer1, backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR1 }}>
                <Picker
                  mode="dropdown"
                  style={{ width: width * 0.96, color: themecolor.TXTWHITE }}
                  selectedValue={budgetid}
                  dropdownIconColor={themecolor.TXTWHITE}
                  itemStyle={{ height: 20, width: '100%', backgroundColor: themecolor.BOXTHEMECOLOR, color: themecolor.TXTWHITE }}
                  onValueChange={item => {
                    setBudgetid(item);
                  }}>
                  <Picker.Item
                    label="Select"
                    style={{
                      fontSize: 13,
                      // color: '#333',
                      fontWeight: 'bold',
                      // height: 10,
                      // color: themecolor.TXTWHITE
                      backgroundColor: themecolor.BOXTHEMECOLOR, color: themecolor.TXTWHITE
                    }}
                    value=""
                  />
                  {showbudget()}
                </Picker>
              </View>
            </View>
            <View style={styles.MV5} />
            <View style={styles.datacheckFlatView}>
              <Text style={{ ...styles.title, color: themecolor.TXTWHITE }}>Place of work</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 12,
                  // height: 48,
                  borderWidth: 0.5,
                  borderColor: Colors.borderColor,
                  color: Colors.grey,
                  overflow: 'hidden',
                  justifyContent: 'flex-start',
                  backgroundColor: Colors.white,
                  backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR1
                }}>
                {/* {typeof workingat == 'string' ? ( */}
                <TextInput
                  value={pow}
                  editable={typeof workingat == 'number' ? true : false}
                  placeholder=""
                  keyboardType="name-phone-pad"
                  style={{ ...styles.FullInput, width: width * 0.8, left: 5 ,color: themecolor.TXTWHITE}}
                  multiline={true}
                  onChangeText={text => setPow(text)}
                />
                {/* // ) : ( */}
                {/* <Text
                    style={{
                      left: 5,
                      padding: 5,
                      color: 'black',
                      fontFamily: FontFamily.PopinsRegular,
                      fontSize: FontSize.labelText,
                    }}>
                    {pow}
                  </Text> */}
                {/* // )} */}
              </View>
            </View>
          </View>
          <View style={styles.MV7} />
          <View style={{ alignSelf: 'center' }}>
            <FullsizeButton
              backgroundColor={themecolor.HEADERTHEMECOLOR}
              onPress={() => handlePress()}
              title="Next"
              width={width * 0.93}
            />
          </View>
        </ScrollView>
      </View>
    </>
  );
}
