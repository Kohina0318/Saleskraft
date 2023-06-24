import {
  TouchableOpacity,
  Dimensions,
  Image,
  StatusBar,
  View,
  Text,
  ScrollView,
  TextInput,
  BackHandler
} from 'react-native';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Colors } from '../../assets/config/Colors';
import { Picker } from '@react-native-picker/picker';
import styles from '../../assets/css/styleTrip';
import {
  createTripApi,
  gettripLocationApi,
} from '../../repository/trip/tripRepository';
import FullsizeButton from '../../components/shared/FullsizeButton';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import Feather from 'react-native-vector-icons/Feather';
import { useToast } from 'react-native-toast-notifications';
import Header_2 from '../../components/shared/Header_2';
import { FontFamily } from '../../assets/fonts/FontFamily';
import VerifyModal from '../../components/shared/VerifyModel';
import { StackActions, useNavigation, useFocusEffect } from '@react-navigation/native';
import moment from 'moment';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';
// import FIcon5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const { width } = Dimensions.get('window');
Feather.loadFont();

const CreateTrip = props => {
  // console.log('params updatetrip on create==>', props);
  const modes = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(modes).getThemeColor()
  const navigation = useNavigation();
  const toast = useToast();
  const [triptype, setTriptype] = useState('');
  const [tolocation, setTolocation] = useState(null);
  const [fromlocation, setFromlocation] = useState(null);
  const [remark, setRemark] = useState('');
  const [triplist, setTriplist] = useState({});
  const [originId, setOriginid] = useState('');
  const [originlng, setOriginlng] = useState('');
  const [originlat, setOriginlat] = useState('');
  const [destinationId, setDestinationid] = useState('');
  const [destinationlng, setDestinationlng] = useState('');
  const [destinationlat, setDestinationlat] = useState('');
  const [budgets, setBudgets] = useState([]);
  const [budgetid, setBudgetid] = useState('');
  const [checklocation, setChecklocation] = useState(true);
  const [checklocation1, setChecklocation1] = useState(true);
  const [fromeditlocation, setFromeditlocation] = useState('');
  const [toeditlocation, setToeditlocation] = useState('');

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');

  const [date1, setDate1] = useState(new Date());
  const [show1, setShow1] = useState(false);
  const [mode1, setMode1] = useState('date');

  const [time1, setTime1] = useState(new Date());
  const [showt1, setShowt1] = useState(false);
  const [modet1, setModet1] = useState('time');

  const [time2, setTime2] = useState(new Date());
  const [showt2, setShowt2] = useState(false);
  const [modet2, setModet2] = useState('time');

  const [modalVisible1, setmodalVisible1] = useState(false);
  const [temptripData, setTemptripdata] = useState('');

  // ================API_INSERTION=======🐱‍🐉🐱‍🐉🐱‍🐉🐱‍🐉🐱‍🐉🐱‍🐉🐱‍🐉🐱‍🐉🐱‍🐉🐱‍🐉🐱‍🐉🐱‍🐉🐱‍🐉🐱‍🐉🐱‍🐉===========================

  const showtriplist = () => {
    return Object.keys(triplist).map(item => {
      return (
        <Picker.Item
          label={triplist[item]}
          style={{
            fontSize: 13,
            color: '#333',
            fontWeight: 'bold',
            color: themecolor.TXTWHITE, backgroundColor: themecolor.BOXTHEMECOLOR,
            // height: 10,
          }}
          value={item}
        />
      );
    });
  };

  const showbudget = () => {
    return budgets.map(item => {
      return (
        <Picker.Item
          label={item.GroupName}
          style={{
            fontSize: 13,
            color: '#333',
            fontWeight: 'bold',
            // height: 10,
            color: themecolor.TXTWHITE,
            backgroundColor: themecolor.BOXTHEMECOLOR,

          }}
          value={item.Bgid}
        />
      );
    });
  };

  const getTriptypeApi = async () => {
    let result = await gettripLocationApi('api/getTripTypes');
    // console.log('Trip Type====', result);
    setTriplist(result.data.TripType);
  };

  const getbudget = async () => {
    let result = await gettripLocationApi('api/getbudgets');
    if (result.statusCode == 200) {
      setBudgets(result.data);
    }
  };

  // useEffect(() => {
  //   getTriptypeApi();
  //   getbudget();
  // }, []);

  //   {"BudgetId": 1, "CompanyId": 2, "CreatedAt": "2022-07-15 15:52:20.000000", "EmployeeId": 12, "TripCurrency": 1, "TripDestination": "1117169", "TripDestinationLatlong": "26.46666700,80.35000000", "TripDestinationName": "Kanpur | Uttar Pradesh", "TripEndDate": "2022-07-14 00:00:00.000000", "TripId": 76, "TripOrigin": "1103307", "TripOriginLatlong": "27.18333300,78.01666700", "TripOriginName": "Agra |
  // Uttar Pradesh", "TripReason": "Testing", "TripStartDate": "2022-07-14 00:00:00.000000", "TripStatus": 1, "TripType": 1, "UpdatedAt": "2022-07-15 15:52:20.000000"}

  function handleBackButtonClick() {
    const popAction = StackActions.pop((props.route.params == undefined) ? 2 : 1);
    navigation.dispatch(popAction);
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
    }, []),
  );

  // useFocusEffect(
  //   React.useCallback(() => {
  //     let tripData = props.route.params.tripData;
  //     setTriptype(`${tripData.TripType}`);
  //     setBudgetid(tripData.BudgetId);
  //   }, []),
  // );

  useEffect(() => {
    if (props.route.params == undefined) {
      getTriptypeApi();
      getbudget();
    } else {
      getTriptypeApi();
      getbudget();
      setChecklocation(false);
      setChecklocation1(false);
      let tripData = props.route.params.tripData;
      setTimeout(() => {
        setTriptype(`${tripData.TripType}`);
        setBudgetid(tripData.BudgetId);
      }, 500);
      setFromeditlocation(tripData.TripOriginName);
      setToeditlocation(tripData.TripDestinationName);

      const tolat = (tripData.TripOriginLatlong != null || tripData.TripOriginLatlong != '') ? tripData.TripOriginLatlong.toString().split(',')[0] : '';
      const tolong = (tripData.TripOriginLatlong != null || tripData.TripOriginLatlong != '') ? tripData.TripOriginLatlong.toString().split(',')[1] : '';
      const tdlat = (tripData.TripDestinationLatlong != null || tripData.TripDestinationLatlong != '') ? tripData.TripDestinationLatlong.toString().split(',')[0] : '';
      const tdlong = (tripData.TripDestinationLatlong != null || tripData.TripDestinationLatlong != '') ? tripData.TripDestinationLatlong.toString().split(',')[1] : '';

      setOriginid(tripData.TripOrigin);
      // console.log(tripData.)
      setFromlocation(tripData.TripOriginName);
      setOriginlng(tolat);
      setOriginlat(tolong);
      setDestinationid(tripData.TripDestination);
      setTolocation(tripData.TripDestinationName);
      setDestinationlat(tdlat);
      setDestinationlng(tdlong);

      // console.log(
      //   'props_tripData_Is',
      //   tripData.TripOriginLatlong.toString().split(',')[0],
      // );
      setTemptripdata(tripData);
      setRemark(tripData.TripReason);
      setDate(new Date(tripData.TripStartDate));
      setDate1(new Date(tripData.TripEndDate));
      setTime1(new Date(tripData.TripStartDate));
      setTime2(new Date(tripData.TripEndDate));

      // setTime1(tripData.)
    }
  }, []);

  // alert(triptype)

  const createTrip = async () => {
    try {
      // console.log('f', fromlocation);
      // console.log('t', tolocation);
      // console.log('tp', triptype);

      const from_date = JSON.stringify(date)?.slice(1).split('T')[0];

      const to_date = JSON.stringify(date1)?.slice(1).split('T')[0];

      const startTime = time1.toString().split(' ')[4];
      const endTime = time2.toString().split(' ')[4];
      // console.log('start ENd Time1', startTime + ' ' + endTime);
      // console.log('from_date==<>', from_date);
      // console.log('to_date==<>', to_date);
      if (
        fromlocation != null &&
        fromlocation != '' &&
        tolocation != null &&
        tolocation != '' &&
        triptype != '' &&
        budgetid != '' &&
        remark.length > 1 &&
        from_date != null &&
        to_date != null
      ) {
        const result = await createTripApi(
          `api/createTrip?trip_id=${props.route.params == undefined ? 0 : temptripData.TripId
          }&trip_type_id=${triptype}&trip_budget_id=${budgetid}&start_date=${from_date}&start_time=${startTime}&end_date=${to_date}&end_time=${endTime}&trip_origin_id=${originId}&trip_origin=${fromlocation}&trip_origin_latlong=${originlat}%2C${originlng}&trip_destination_id=${destinationId}&trip_destination=${tolocation}&trip_destination_latlong=${destinationlat}%2C${destinationlng}&remark=${remark}`,
        );

        // api/createTrip?trip_id=1&trip_type_id=1&trip_budget_id=1&start_date=1&start_time=1&end_date=1&end_time=1&trip_origin_id=1&trip_origin=1&trip_origin_latlong=1&trip_destination_id=1&trip_destination=1&trip_destination_latlong=1&remark=1

        if (result.statusCode == 200) {
          setmodalVisible1(!modalVisible1);
          // props.navigation.navigate('MyTrip')
        } else {
          toast.show(result.message, {
            type: 'warning',
            placement: 'bottom',
            duration: 4000,
            offset: 30,
            animationType: 'slide-in',
          });
        }
        // console.log('create trip result_789', result);
      } else {
        toast.show('All fields are required', {
          type: 'warning',
          placement: 'bottom',
          duration: 4000,
          offset: 30,
          animationType: 'slide-in',
        });
      }
    } catch (e) {
      console.log('catch err', e);
    }
  };

  const fromLocationOnpressFun = item => {
    // console.log('item in location>>', item);
    setFromlocation(item.title);
    setOriginid(item.id);
    setOriginlng(item.Longitude);
    setOriginlat(item.Latitude);
  };

  const toLocationOnpressFun = item => {
    // console.log('item in location_to>>', item);
    setTolocation(item.title);
    setDestinationid(item.id);
    setDestinationlng(item.Longitude);
    setDestinationlat(item.Latitude);
  };

  const showDatepicker = () => {
    setShow(true);
    showMode('date');
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

  };

  const showMode = currentMode => {
    setMode(currentMode);
  };

  // ===========================================================

  const showDatepicker1 = () => {
    setShow1(true);
    showMode1('date');
  };

  const onChange1 = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow1(Platform.OS === 'ios');
    setDate1(currentDate);
  };

  const showMode1 = currentMode => {
    setMode1(currentMode);
  };

  // =====================================================================

  const showTimepicker1 = () => {
    setShowt1(true);
    showModet1('time');
  };

  const onChanget1 = (event, selectedDate) => {
    const currentDate = selectedDate || time1;
    setShowt1(Platform.OS === 'ios');
    // alert(currentDate)
    // let time_1 = moment(currentDate).format('hh:mm A')
    // alert(time_1)
    setTime1(currentDate);
  };

  const showModet1 = currentMode => {
    setModet1(currentMode);
  };

  // ========================================================
  const showTimepicker2 = () => {
    setShowt2(true);
    showModet2('time');
  };

  const onChanget2 = (event, selectedDate) => {
    // alert(selectedDate.toLocaleString())
    const currentDate = selectedDate || date;
    setShowt2(Platform.OS === 'ios');
    setTime2(currentDate);
  };

  const showModet2 = currentMode => {
    setModet2(currentMode);
  };

  // ========================================================

  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [suggestionsList, setSuggestionsList] = useState([]);
  const [suggestionsList2, setSuggestionsList2] = useState([]);
  // const [selectedItem, setSelectedItem] = useState(null)
  const dropdownController = useRef(null);
  const dropdownController2 = useRef(null);

  const searchRef = useRef(null);
  const searchRef2 = useRef(null);

  const getSuggestions = useCallback(async q => {
    // console.log("here");
    const filterToken = q.toLowerCase();
    // console.log('getSuggestions', q, typeof q);
    if (typeof q !== 'string' || q.length < 3) {
      setSuggestionsList(null);
      return;
    }
    setLoading(true);
    // const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    // const items = await response.json()
    let result = await gettripLocationApi(
      `api/getTripLocations?search_location=${q}`,
    );
    // console.log('===============', result);
    const suggestions = result.data.map(item => ({
      id: item.id,
      title: item.label,
      Latitude: item.value.Latitude,
      Longitude: item.value.Longitude,
    }));
    setSuggestionsList(suggestions);
    setLoading(false);
  }, []);

  const getSuggestions2 = useCallback(async q => {
    // console.log("here");
    const filterToken = q.toLowerCase();
    // console.log('getSuggestions', q, typeof q);
    if (typeof q !== 'string' || q.length < 3) {
      setSuggestionsList(null);
      return;
    }
    setLoading2(true);
    // const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    // const items = await response.json()
    let result = await gettripLocationApi(
      `api/getTripLocations?search_location=${q}`,
    );
    // console.log('===============', result);
    const suggestions = result.data.map(item => ({
      id: item.id,
      title: item.label,
      Latitude: item.value.Latitude,
      Longitude: item.value.Longitude,
    }));
    setSuggestionsList2(suggestions);
    setLoading2(false);
  }, []);

  const onClearPress = useCallback(() => {
    setSuggestionsList(null);
  }, []);

  const onClearPress2 = useCallback(() => {
    setSuggestionsList(null);
  }, []);

  const onOpenSuggestionsList = useCallback(isOpened => { }, []);
  const onOpenSuggestionsList2 = useCallback(isOpened => { }, []);

  return (
    <View style={{ ...styles.main, backgroundColor: themecolor.THEMECOLOR }}>
      <StatusBar translucent backgroundColor="transparent" />
      <Header_2
        title={props.route.params == undefined ? 'Create Trip' : 'Update Trip'}
        onPress={() => handleBackButtonClick()}
      />
      <View style={{ flex: 1 }}>
        <View style={styles.MV5} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.typem}>
            <View>
              <Text style={{ ...styles.title, color: themecolor.TXTWHITE }}>Trip Type</Text>
            </View>
            <View
              style={{
                ...styles.textContainer1,
                backgroundColor: themecolor.BOXTHEMECOLOR,
                borderColor: themecolor.BOXBORDERCOLOR1,
                position: 'relative',
              }}>
              <Picker
                mode="dropdown"
                style={{ width: '100%', color: themecolor.TXTWHITE, }}
                dropdownIconColor={themecolor.TXTWHITE}
                selectedValue={triptype}
                itemStyle={{ height: 20, width: '100%', color: themecolor.TXTWHITE, backgroundColor: themecolor.BOXTHEMECOLOR, }}
                onValueChange={(item, index) => {
                  {
                    setTriptype(item);

                    // console.log('Ittttttttttttt', item, index);
                  }
                }}>
                <Picker.Item
                  label="Select"
                  style={{
                    fontSize: 13,
                    fontWeight: 'bold',
                    color: themecolor.TXTWHITE, backgroundColor: themecolor.BOXTHEMECOLOR,
                  }}
                  value={''}
                />

                {showtriplist()}
              </Picker>
            </View>
            <View style={{ height: 10 }} />
            <View style={styles.pdate1}>
              <View style={{ width: width * 0.93, alignSelf: 'center' }}>
                <Text style={{ ...styles.title, color: themecolor.TXTWHITE, }}>Origin location</Text>
                <View >
                  <View style={{ ...styles.vv1, }}>
                    {checklocation ? (
                      <View
                        style={[
                          {
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            zIndex: 99,
                          },
                          Platform.select({ ios: { zIndex: 0 } }),
                        ]}>
                        <AutocompleteDropdown
                          ref={searchRef}
                          controller={controller => {
                            dropdownController.current = controller;
                          }}
                          // initialValue={'1'}
                          initialValue={{ id: '2' }}
                          direction={Platform.select({ ios: 'down' })}
                          dataSet={suggestionsList}
                          onChangeText={getSuggestions}
                          onSelectItem={item => {
                            // console.log('item..>', item);
                            item && fromLocationOnpressFun(item);
                          }}
                          debounce={600}
                          suggestionsListMaxHeight={
                            Dimensions.get('window').height * 0.4
                          }
                          onClear={onClearPress}
                          //  onSubmit={(e) => onSubmitSearch(e.nativeEvent.text)}
                          onOpenSuggestionsList={onOpenSuggestionsList}
                          loading={loading}
                          useFilter={false} // set false to prevent rerender twice
                          textInputProps={{
                            placeholder: 'Type 3+ letters',
                            autoCorrect: false,
                            autoCapitalize: 'none',
                            style: {
                              borderRadius: 10,
                              // backgroundColor: '#FFF',
                              color: themecolor.TXTWHITE,
                              backgroundColor: themecolor.BOXTHEMECOLOR,
                              // color: '#000',
                              paddingLeft: 10,
                              borderWidth: 0.5,
                              borderColor: themecolor.BOXBORDERCOLOR1
                            },
                          }}
                          rightButtonsContainerStyle={{
                            right: 8,
                            height: 30,
                            alignSelf: 'center',
                          }}
                          inputContainerStyle={{
                            // backgroundColor: '#FFF',
                            borderRadius: 10,
                            zIndex: 9999,
                            // color: '#000',
                            color: themecolor.TXTWHITE,
                            backgroundColor: themecolor.BOXTHEMECOLOR,

                          }}
                          suggestionsListContainerStyle={{
                            // backgroundColor: '#FFF',
                            // color: '#000',
                            color: themecolor.TXTWHITE,
                            backgroundColor: themecolor.BOXTHEMECOLOR,

                          }}
                          containerStyle={{
                            flexGrow: 1,
                            flexShrink: 1,
                            width: width * 0.92,
                          }}
                          renderItem={(item, text) => (
                            <Text style={{ color: themecolor.TXTWHITE, padding: 8 }}>
                              {item.title}
                            </Text>
                          )}
                          ChevronIconComponent={
                            <Feather
                              name="chevron-down"
                              size={20}
                              color={themecolor.TXTWHITE}
                            />
                          }
                          ClearIconComponent={
                            <Feather name="x-circle" size={18} color={themecolor.TXTWHITE} />
                          }
                          inputHeight={45}
                          showChevron={false}
                          closeOnBlur={false}
                        />
                        <View style={{ width: 10 }} />
                        <FullsizeButton
                          style={{ flexGrow: 0 }}
                          backgroundColor={themecolor.HEADERTHEMECOLOR}
                          height={45}
                          width={width * 0.2}
                          title={'Toggle'}
                          onPress={() => dropdownController.current.toggle()}
                        />
                      </View>
                    ) : (
                      <TouchableOpacity
                        style={{
                          // backgroundColor: 'white',
                          color: themecolor.TXTWHITE,
                          backgroundColor: themecolor.BOXTHEMECOLOR,
                          width: width * 0.93,
                          alignSelf: 'center',
                          borderWidth: 1,
                          borderRadius: 12,
                          height: 45,
                          // borderColor: Colors.borderColor,
                          justifyContent: 'center',
                          borderColor: themecolor.BOXBORDERCOLOR1
                        }}
                        onPress={() => setChecklocation(true)}>
                        <Text style={{ marginLeft: 10, color: themecolor.TXTWHITE }}>
                          {fromeditlocation}
                        </Text>
                      </TouchableOpacity>
                    )}
                    {/* <View style={styles.atview}>
                      <Text style={styles.tx2}>
                        <FIcon5
                          name="map-marker-alt"
                          color={Colors.bluetheme}
                          size={13}
                        />
                      </Text>
                    </View> */}
                  </View>
                </View>
              </View>
              <View style={{ height: 10 }} />

              <View style={{ width: width * 0.93, alignSelf: 'center' }}>
                <Text style={{ ...styles.title, color: themecolor.TXTWHITE }}>Destination location</Text>
                <View >
                  <View style={styles.vv1}>
                    {checklocation1 ? (
                      <View
                        style={[
                          {
                            flex: 1,
                            width: '100%',
                            flexDirection: 'row',
                            alignItems: 'center',
                            alignSelf: 'center',
                            zIndex: 9,
                          },
                          Platform.select({ ios: { zIndex: 1 } }),
                        ]}>
                        <AutocompleteDropdown
                          ref={searchRef2}
                          controller={controller => {
                            dropdownController2.current = controller;
                          }}
                          direction={Platform.select({ ios: 'down' })}
                          dataSet={suggestionsList2}
                          onChangeText={getSuggestions2}
                          onSelectItem={item => {
                            // console.log('Onselect_item.id>', item);
                            item && toLocationOnpressFun(item);
                          }}
                          debounce={600}
                          suggestionsListMaxHeight={
                            Dimensions.get('window').height * 0.4
                          }
                          onClear={onClearPress2}
                          //  onSubmit={(e) => onSubmitSearch(e.nativeEvent.text)}
                          onOpenSuggestionsList={onOpenSuggestionsList2}
                          loading={loading2}
                          useFilter={false} // set false to prevent rerender twice
                          textInputProps={{
                            placeholder: 'Type 3+ letters',
                            autoCorrect: false,
                            autoCapitalize: 'none',
                            style: {
                              borderRadius: 10,
                              // backgroundColor: '#FFF',
                              // color: '#000',
                              paddingLeft: 10,
                              borderWidth: 0.5,
                              color: themecolor.TXTWHITE,
                              backgroundColor: themecolor.BOXTHEMECOLOR,
                              borderColor: themecolor.BOXBORDERCOLOR1
                            },
                          }}
                          rightButtonsContainerStyle={{
                            right: 8,
                            height: 30,
                            alignSelf: 'center',
                            borderRadius: 20,
                          }}
                          inputContainerStyle={{
                            // backgroundColor: '#FFF',
                            borderRadius: 10,
                            zIndex: 9999,
                            // color: '#000',
                            color: themecolor.TXTWHITE,
                            backgroundColor: themecolor.BOXTHEMECOLOR,
                          }}
                          suggestionsListContainerStyle={{
                            // backgroundColor: '#FFF',
                            // color: '#000',
                            color: themecolor.TXTWHITE,
                            backgroundColor: themecolor.BOXTHEMECOLOR,
                          }}
                          containerStyle={{
                            flexGrow: 1,
                            flexShrink: 1,
                            width: width * 0.4,
                          }}
                          renderItem={(item, text) => (
                            <Text style={{ color: themecolor.TXTWHITE, padding: 8 }}>
                              {item.title}
                            </Text>
                          )}
                          ChevronIconComponent={
                            <Feather
                              name="chevron-down"
                              size={18}
                              color={themecolor.TXTWHITE}
                            />
                          }
                          ClearIconComponent={
                            <Feather name="x-circle" size={18} color={themecolor.TXTWHITE} />
                          }
                          inputHeight={45}
                          showChevron={false}
                          closeOnBlur={false}
                        />
                        <View style={{ width: 10 }} />
                        <FullsizeButton
                          style={{ flexGrow: 0 }}
                          backgroundColor={themecolor.HEADERTHEMECOLOR}
                          height={45}
                          width={width * 0.2}
                          title={'Toggle'}
                          onPress={() => dropdownController2.current.toggle()}
                        />
                        {/* <Button
                            style={{flexGrow: 0}}
                            title="Toggle"
                            onPress={() => dropdownController2.current.toggle()}
                          /> */}
                      </View>
                    ) : (
                      <TouchableOpacity
                        style={{
                          // backgroundColor: 'white',
                          width: width * 0.93,
                          alignSelf: 'center',
                          borderWidth: 0.5,
                          borderRadius: 12,
                          height: 45,
                          // borderColor: Colors.borderColor,
                          justifyContent: 'center',
                          color: themecolor.TXTWHITE,
                          backgroundColor: themecolor.BOXTHEMECOLOR,
                          borderColor: themecolor.BOXBORDERCOLOR1
                        }}
                        onPress={() => setChecklocation1(true)}>
                        <Text style={{ marginLeft: 10, color: themecolor.TXTWHITE }}>
                          {toeditlocation}
                        </Text>
                      </TouchableOpacity>
                    )}

                    {/* <View style={styles.atview}>
                      <Text style={styles.tx2}>
                        <FIcon5
                          name="map-marker-alt"
                          color={Colors.bluetheme}
                          size={13}
                        />
                      </Text>
                    </View> */}
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={{ height: 10 }} />

          <View style={styles.tx1}>
            <View>
              <Text style={{ ...styles.title, color: themecolor.TXTWHITE, }}>Reason</Text>
            </View>
            <View style={{
              ...styles.ti, backgroundColor: themecolor.BOXTHEMECOLOR,
              borderColor: themecolor.BOXBORDERCOLOR1,
            }}>
              <TextInput
                value={remark}
                multiline={true}
                numberOfLines={3}
                textAlignVertical={'top'}
                onChangeText={text => setRemark(text)}
                style={{ width: '100%', borderRadius: 15, left: 5, color: themecolor.TXTWHITE }}
              />
            </View>
          </View>

          <View style={{ height: 10 }} />
          <View style={styles.datacheckFlatView}>
            <View>
              <Text style={{ ...styles.title, color: themecolor.TXTWHITE, }}>Budget</Text>
            </View>
            <View style={{ ...styles.textContainer1, backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR1, borderWidth: 0.5 }}>
              <Picker
                mode="dropdown"
                style={{ width: '100%', color: themecolor.TXTWHITE, backgroundColor: themecolor.BOXTHEMECOLOR, }}
                selectedValue={budgetid}
                dropdownIconColor={themecolor.TXTWHITE}
                itemStyle={{ height: 20, width: '100%', color: themecolor.TXTWHITE, backgroundColor: themecolor.BOXTHEMECOLOR, }}
                onValueChange={item => {
                  setBudgetid(item);
                }}>
                <Picker.Item
                  label="Select"
                  style={{
                    fontSize: 13,
                    color: themecolor.TXTWHITE,
                    backgroundColor: themecolor.BOXTHEMECOLOR,
                    fontWeight: 'bold',
                    // height: 10,
                  }}
                  value={''}
                />
                {showbudget()}
              </Picker>
            </View>
          </View>
          <View style={{ height: 10 }} />

          <View style={styles.pdate1}>
            <View
              style={{
                flexDirection: 'row',
                width: width * 0.93,
                justifyContent: 'space-between',
              }}>
              <View style={{ width: '60%' }}>
                <Text style={{ ...styles.title, color: themecolor.TXTWHITE, }}>Start date</Text>
                <View style={{}}>
                  <TouchableOpacity onPress={showDatepicker}>
                    <View style={{
                      ...styles.dpview, backgroundColor: themecolor.BOXTHEMECOLOR,
                      borderColor: themecolor.BOXBORDERCOLOR1,
                    }}>
                      <TextInput
                        editable={false}
                        value={date.toUTCString().substring(0, 16)}
                        style={{
                          top: 3,
                          fontSize: 12,
                          width: '100%',
                          fontFamily: FontFamily.Popinssemibold,
                          color: themecolor.TXTWHITE,
                        }}
                        labelStyle={{ fontSize: 12 }}
                      />
                      {/* <Image
                        source={require('../../assets/images/addoutlet/calendar.png')}
                        resizeMode="center"
                        style={{
                          height: 14,
                          width: 14,
                          position: 'absolute',
                          right: 10,
                        }}
                      /> */}
                      <Ionicons
                        name="calendar-sharp"
                        size={15}
                        color={themecolor.TXTWHITE}
                        style={{ position: 'absolute', right: 10 }}
                      />
                    </View>
                  </TouchableOpacity>

                  {show && (
                    <DateTimePicker
                      minimumDate={new Date()}
                      testID="dateTimePicker"
                      value={date}
                      mode={mode}
                      is24Hour={false}
                      display="default"
                      onChange={onChange}
                    />
                  )}
                </View>
              </View>
              <View style={{ width: '35%' }}>
                <Text style={{ ...styles.title, color: themecolor.TXTWHITE, }}>Start time</Text>
                <View style={{}}>
                  <TouchableOpacity onPress={showTimepicker1}>
                    <View style={{
                      ...styles.dpview, backgroundColor: themecolor.BOXTHEMECOLOR,
                      borderColor: themecolor.BOXBORDERCOLOR1,
                    }}>
                      <TextInput
                        editable={false}
                        value={moment(time1).format('hh:mm A')}
                        style={{
                          top: 3,
                          fontSize: 12,
                          width: '100%',
                          left: 10,
                          fontFamily: FontFamily.Popinssemibold,
                          color: themecolor.TXTWHITE,

                        }}
                        labelStyle={{ fontSize: 12 }}
                      />
                      {/* <Image
                        source={require('../../assets/images/addoutlet/calendar.png')}
                        resizeMode="center"
                        style={{
                          height: 14,
                          width: 14,
                          position: 'absolute',
                          right: 10,
                        }}
                      /> */}
                      <MCIcons
                        name="clock-outline"
                        size={15}
                        color={themecolor.TXTWHITE}
                        style={{ position: 'absolute', right: 10 }}
                      />
                    </View>
                  </TouchableOpacity>

                  {showt1 && (
                    <DateTimePicker
                      // minimumDate={new Date()}
                      testID="dateTimePicker"
                      value={time1}
                      mode={modet1}
                      is24Hour={false}
                      display="default"
                      onChange={onChanget1}
                    />
                  )}
                </View>
              </View>
            </View>
            <View style={{ height: 10 }} />

            <View
              style={{
                flexDirection: 'row',
                width: width * 0.93,
                justifyContent: 'space-between',
              }}>
              <View style={{ width: '60%' }}>
                <Text style={{ ...styles.title, color: themecolor.TXTWHITE, }}>End date & time</Text>
                <View style={{}}>
                  <TouchableOpacity onPress={showDatepicker1}>
                    <View style={{
                      ...styles.dpview, backgroundColor: themecolor.BOXTHEMECOLOR,
                      borderColor: themecolor.BOXBORDERCOLOR1,
                    }}>
                      <TextInput
                        editable={false}
                        value={date1.toUTCString().substring(0, 16)}
                        // placeholder="Select date & time for task"
                        // label="Select date & time for task"
                        style={{
                          top: 3,
                          fontSize: 12,
                          width: width * 0.85,
                          fontFamily: FontFamily.Popinssemibold,
                          color: themecolor.TXTWHITE,
                        }}
                        // underlineColor={'transparent'}
                        labelStyle={{ fontSize: 12 }}
                      />
                      {/* <Image
                        source={require('../../assets/images/addoutlet/calendar.png')}
                        resizeMode="center"
                        style={{
                          height: 14,
                          width: 14,
                          position: 'absolute',
                          right: 10,
                        }}
                      /> */}
                      <Ionicons
                        name="calendar-sharp"
                        size={15}
                        color={themecolor.TXTWHITE}
                        style={{ position: 'absolute', right: 10 }}
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
              <View style={{ width: '35%' }}>
                <Text style={{ ...styles.title, color: themecolor.TXTWHITE, }}>End time</Text>
                <View style={{}}>
                  <TouchableOpacity onPress={showTimepicker2}>
                    <View style={{
                      ...styles.dpview, backgroundColor: themecolor.BOXTHEMECOLOR,
                      borderColor: themecolor.BOXBORDERCOLOR1,
                    }}>
                      <TextInput
                        editable={false}
                        value={moment(time2).format('hh:mm A')}
                        style={{
                          top: 3,
                          fontSize: 12,
                          width: '100%',
                          left: 10,
                          fontFamily: FontFamily.Popinssemibold,
                          color: themecolor.TXTWHITE,
                        }}
                        labelStyle={{ fontSize: 12 }}
                      />
                      {/* <Image
                        source={require('../../assets/images/addoutlet/calendar.png')}
                        resizeMode="center"
                        style={{
                          height: 14,
                          width: 14,
                          position: 'absolute',
                          right: 10,
                        }}
                      /> */}
                       <MCIcons
                        name="clock-outline"
                        size={15}
                        color={themecolor.TXTWHITE}
                        style={{ position: 'absolute', right: 10 }}
                      />
                    </View>
                  </TouchableOpacity>

                  {showt2 && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={time2}
                      mode={modet2}
                      is24Hour={false}
                      display="default"
                      onChange={onChanget2}
                    />
                  )}
                </View>
              </View>
            </View>
          </View>
          <View style={{ marginVertical: 10 }} />

          {/* <View style={{position: 'absolute', alignSelf: 'center', bottom: 10}}> */}
          <FullsizeButton
            height={48}
            backgroundColor={themecolor.HEADERTHEMECOLOR}
            width={width * 0.93}
            title={'Submit'}
            onPress={() => createTrip()}
          />
          {/* </View> */}
        </ScrollView>
      </View>
      {modalVisible1 && (
        <VerifyModal
          PressDone={() => navigation.navigate('MyTrip')}
          title={`Your trip has been successfully ${props.route.params == undefined ? `created` : `updated`
            } .`}
          modalVisible1={modalVisible1}
          setmodalVisible1={setmodalVisible1}
          navigateTo={'MyTrip'}
        />
      )}
    </View>
  );
};

export default CreateTrip;
