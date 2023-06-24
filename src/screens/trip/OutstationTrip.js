import {
  Text,
  View,
  StatusBar,
  Dimensions,
  Modal,
  TouchableOpacity,
  TextInput
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from '../../assets/config/Colors';
import { FontFamily } from '../../assets/fonts/FontFamily';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  createTripApi,
  gettripLocationApi,
} from '../../repository/trip/tripRepository';
import styles from '../../assets/css/styleTrip';
import stylesp from '../../assets/css/styleProducts';
import moment from 'moment';
import { OutStationFLList1 } from '../../components/ExpenseData/TripdetailsData';
import Header_2 from '../../components/shared/Header_2';
import { FontSize } from '../../assets/fonts/Fonts';
import ActionButton from 'react-native-action-button';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ScrollView } from 'react-native-gesture-handler';
import ConfirmationModal from '../../components/Modals/ConfirmationModal';
import TripExtendModal from '../../components/Modals/TripExtendModal';
import VerifyModel from '../../components/shared/VerifyModel';
import { useToast } from 'react-native-toast-notifications';
import { useFocusEffect } from '@react-navigation/native';
import LoaderAllInOne from '../../components/shared/Loader';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';
// import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
// import Entypo from 'react-native-vector-icons/Entypo';

const { width } = Dimensions.get('window');
const OutstationTrip = props => {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  const toast = useToast();
  // console.log('tripId props on OutstationTrip ', props.route.params.tripId);
  const [tripData, setTripData] = useState('');
  const [tripType, setTripType] = useState('');
  const [tripStatus, setTripStatus] = useState('');
  const [tripstartdate, setTripstartdate] = useState('');
  const [tripenddate, setTripenddate] = useState('');
  const [tripcreateat, setTripcreateat] = useState('');
  const [temp_arr, setTempArr] = useState([]);
  const [loader, setLoader] = useState(true);
  const [budgetName, setBudgetName] = useState({});

  const [listofDates, setListOfDates] = useState([]);
  const [listofAmount, setListOfAmount] = useState({});
  const [listofExpId, setListOfExpId] = useState({});

  const [modalVisible1, setmodalVisible1] = useState(false);
  const [modalVisible2, setmodalVisible2] = useState(false);
  const [modalVisible3, setmodalVisible3] = useState(false);
  const [modalVisible4, setmodalVisible4] = useState(false);
  const [modalVisible5, setmodalVisible5] = useState(false);

  const [noteTxt,setNoteTxt]=useState('')

  // extend trip states===================

  const [reason, setReason] = useState('');
  const [date1, setDate1] = useState(new Date());

  var tripId = props.route.params.tripId;
  var manager = props.route.params.manager;
  // var empId = props.route.params.empId;

  const functionborder = () => {
    let arr = [];
    for (let i = 0; i < 80; i++) {
      arr.push(i);
    }
    return arr.map(() => {
      return <Icon name="caret-up" size={8} color={themecolor.HEADERTHEMECOLOR} />;
    });
  };

  const getTripDetails = async () => {
    const result = await gettripLocationApi(
      `api/getIdByTrip?trip_id=${tripId}`,
    );
    // console.log('result gettripbyid', result.data);
    if (result.statusCode == 200) {
      setTripData(result.data.Trips[0]);
      setTripType(result.data.TripType);
      setBudgetName(result.data.Budget[0]);
      // console.log('@9999999999999999999888', result.data.Budget[0]);
      let strdt = result.data.Trips[0].TripStartDate.split(' ')[0]
        .split('-')
        .reverse()
        .join('-');
      let enddt = result.data.Trips[0].TripEndDate.split(' ')[0]
        .split('-')
        .reverse()
        .join('-');
      setTripstartdate(strdt);
      setTripenddate(enddt);
      setTripcreateat(
        result.data.Trips[0].CreatedAt.split(' ')[0]
          .split('-')
          .reverse()
          .join('-'),
      );
      if (strdt == enddt) {
        let tar = [];
        // alert(strdt)
        tar.push({ date: strdt, day: moment(strdt).format('dddd') });
        setTempArr(tar);
      } else {
        getDateDifference(strdt, enddt);
      }
      setLoader(false);
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

  function getDateDifference(s, e) {
    try {
      var startDate = moment(`${s}`, 'DD-MM-YYYY');
      var endDate = moment(`${e}`, 'DD-MM-YYYY');

      // console.log('startdate', startDate);
      // console.log('endDate', endDate);

      let dates = [];

      for (var m = moment(startDate); m.isBefore(endDate); m.add(1, 'days')) {
        dates.push({ date: m.format('DD-MM-YYYY'), day: m.format('dddd') });
      }
      let lastdate = dates[dates.length - 1].date;
      var new_date = moment(lastdate, 'DD-MM-YYYY')
        .add(1, 'days')
        .format('DD-MM-YYYY');

      var oneDate = moment(`${new_date}`, 'DD-MM-YYYY');
      var newDay = oneDate.format('dddd');
      dates.push({ date: new_date, day: newDay });
      setTempArr(dates);
      // console.log('dates', dates);
      // console.log('last dates', lastdate);
      // console.log('new dates', new_date);
      // console.log('newtry', dayName);
    } catch (e) {
      console.log('catch error', e);
    }
  }

  const getStatus = async () => {
    const statusResult = await gettripLocationApi('api/getStatus');
    // console.log('statusResult123', statusResult.statusCode);
    if (statusResult.statusCode == 200) {
      // alert(JSON.stringify(statusResult.data[0].Trips));
      setTripStatus(statusResult.data[0].Trips);
    } else {
      toast.show(statusResult.message, {
        type: 'warning',
        placement: 'bottom',
        duration: 4000,
        offset: 30,
        animationType: 'slide-in',
      });
    }
  };

  useEffect(() => {
    getTripDetails();
    getStatus();
  }, [modalVisible3]);

  const getDateExpenseStatus = async () => {
    setLoader(true);
    const result = await gettripLocationApi(
      `api/getTripExpenses?trip_id=${tripId}`,
    );
    // console.log('data of trip date expense', result.data);
    if (result.statusCode == 200) {
      if (result.data.expenses.length >= 1) {
        let dateLists = [];
        let amountList = [];
        let expenseId = {};
        var obj = {};
        result.data.expenses.map(i => {
          var d = i.ExpenseDate.split('-').reverse().join('-');
          var r = i.ExpenseFinalAmt;
          obj[d] = r;
          expenseId[d] = i.ExpId;
          // console.log('dddddddd', d);
          dateLists.push(d);
          amountList.push(obj);
        });
        setListOfDates(dateLists);
        setListOfAmount(obj);
        setListOfExpId(expenseId);
        // console.log('formatted array', dateLists);
      }
    }
    setLoader(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      getDateExpenseStatus();
    }, []),
  );

  const handleCancelTrip = async () => {
    const result = await gettripLocationApi(`api/tripCancel?trip_id=${tripId}`);
    if (result.statusCode == 200) {
      toast.show(result.message, {
        type: 'success',
        placement: 'bottom',
        duration: 4000,
        offset: 30,
        animationType: 'slide-in',
      });
      // <ToastAlert/>
      props.navigation.navigate('MyTrip');
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

  const deleteTrip = async () => {
    const result = await gettripLocationApi(`api/tripDeleteNew?pk=${tripId}`);
    // alert(JSON.stringify(result));
    if (result.statusCode == 200) {
      toast.show(result.message, {
        type: 'success',
        placement: 'bottom',
        duration: 4000,
        offset: 30,
        animationType: 'slide-in',
      });
      props.navigation.navigate('MyTrip');
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

  const extendTrip = async () => {
    const result = await createTripApi(
      `api/modifyTripNew?id=${tripId}&EndDate=${date1}&trip_reason=${reason}`,
    );
    if (result.statusCode == 200) {
      setmodalVisible3(!modalVisible3);
    }
  };

  const managerActions = async key => {
    const result = await createTripApi(
      `api/tripApproveRejectCancel?type=trip&TripId=${tripId}&status=${key}&note=${noteTxt}`,
    );
    if (result.statusCode == 200) {
      toast.show(result.message, {
        type: 'success',
        placement: 'bottom',
        duration: 4000,
        offset: 30,
        animationType: 'slide-in',
      });
      props.navigation.goBack()
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

  var statusColor = '';
  if (tripStatus[tripData.TripStatus] == 'Approved') {
    statusColor = '#00C46F';
  } else if (tripStatus[tripData.TripStatus] == 'Raised') {
    statusColor = 'orange';
  } else {
    statusColor = 'red';
  }

  return (
    <>
      {loader ? (
        <>
          <LoaderAllInOne />
        </>
      ) : (
        <></>
      )}
      <View style={{ flex: 1, backgroundColor: '#FFF',backgroundColor:themecolor.THEMECOLOR }}>
        <StatusBar translucent backgroundColor="transparent" />

        <View
          style={{
            width: width,
            height: 'auto',
            backgroundColor: Colors.bluetheme,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            flex: 0.28,
            paddingBottom: 10,
            backgroundColor: themecolor.HEADERTHEMECOLOR,
          }}>
          <Header_2
            title={tripType[tripData.TripType]}
            // iconname="edit"
            onPressIconPlus={() =>
              tripStatus[tripData.TripStatus] == 'Raised'
                ? props.navigation.push('CreateTrip', { tripData: tripData })
                : toast.show(
                  `Sorry you can not update ${tripStatus[tripData.TripStatus]
                  } trip`,
                  {
                    type: 'warning',
                    placement: 'bottom',
                    duration: 4000,
                    offset: 30,
                    animationType: 'slide-in',
                  },
                )
            }
            iconnameplus={!manager && 'edit'}
            Size={20}
            IconSize={18}
            onPressIcon={() => !manager && refRBSheet1.current.open()}
            onPress={() => props.navigation.goBack()}
          />
          <View style={{ ...styles.b, }}>
            <View style={{ ...styles.headerwhitebox,}}>
              {/* <OutStationFLList /> */}
              <View style={{ ...stylesp.CUSTOMERdvIEW }}>
                <View style={stylesp.NumberInputView}>
                  <View
                    style={{
                      ...stylesp.Width85,
                      justifyContent: 'center',
                      alignSelf: 'center',
                    }}>
                    <View
                      style={{
                        ...stylesp.FLEXDIREC1,
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        numberOfLines={2}
                        ellipsizeMode={'tail'}
                        style={{ ...stylesp.RateText, width: width * 0.65, }}>
                        <FAIcon
                          size={14}
                          name="map-marker"
                          color={Colors.bluetheme}
                        />
                        &nbsp;{tripData.TripOriginName}
                      </Text>
                    </View>
                    <View
                      style={{
                        ...stylesp.FLEXDIREC1,
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        numberOfLines={2}
                        ellipsizeMode={'tail'}
                        style={{ ...stylesp.RateText, width: width * 0.6, }}>
                        <FAIcon
                          size={14}
                          name="map-marker"
                          color={Colors.bluetheme}
                        />
                        &nbsp;{tripData.TripDestinationName}
                      </Text>
                      <View style={{ ...stylesp.FLEXDIRECTIONROW, top: -8 }}>
                        <Text
                          style={{
                            ...stylesp.RateTextboldOrangeCircle,
                            color: statusColor,
                          }}>
                          {tripStatus[tripData.TripStatus] == 'Approved' && (
                            <FAIcon name="check-circle" />
                          )}
                          {tripStatus[tripData.TripStatus] == 'Raised' && (
                            <MIcon name="error-outline" />
                          )}
                          {(tripStatus[tripData.TripStatus] == 'Rejected' ||
                            tripStatus[tripData.TripStatus] == 'Cancelled') && (
                              <Feather name="x-circle" />
                            )}
                          &nbsp;{tripStatus[tripData.TripStatus]}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        ...stylesp.FLEXDIREC1,
                        justifyContent: 'space-between',
                      }}>
                      <Text style={{...stylesp.RateText,}}>
                        <FAIcon
                          size={10}
                          name="calendar"
                          color={Colors.bluetheme}
                        />{' '}
                        {tripstartdate}{' '}
                        <Text style={{ fontFamily: FontFamily.Popinssemibold}}>
                          {' '}
                          to{' '}
                        </Text>{' '}
                        {tripenddate}
                      </Text>
                      <Text style={{ ...stylesp.RateText, top: -8,}}>
                        {tripcreateat}
                      </Text>
                    </View>
                    <View
                      style={{
                        ...stylesp.FLEXDIREC1,
                        // justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          ...stylesp.RateText,
                          left: -2,
                          fontFamily: FontFamily.PopinsMedium,
                        }}>
                        <MCIcon
                          name="note-text-outline"
                          size={14}
                          color={Colors.bluetheme}
                        />{' '}
                        Trip Reason:
                      </Text>
                      <Text style={{ ...stylesp.RateText, width: width * 0.6 ,}}>
                        {tripData.TripReason}
                      </Text>
                    </View>

                    <View
                      style={{
                        ...stylesp.FLEXDIREC1,
                        // justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <Text style={{ left: -1 }}>
                        <MaterialCommunityIcons
                          name="cash"
                          size={14}
                          color={Colors.bluetheme}
                        />
                      </Text>
                      <Text
                        style={{
                          ...stylesp.RateText,
                          fontFamily: FontFamily.PopinsMedium,
                        }}>
                        Budget:
                      </Text>
                      <Text
                        style={{
                          ...stylesp.RateText,
                          width: width * 0.6,
                          right: -2,
                        }}>
                        {budgetName.GroupName != undefined ||
                          budgetName.GroupName != null
                          ? budgetName.GroupName
                          : 'Not found'}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={stylesp.MV1} />

              <View style={styles.m}>{functionborder()}</View>
            </View>
          </View>
          <View style={styles.MV} />
        </View>
        <View style={{...styles.bodypart,backgroundColor:themecolor.THEMECOLOR}}>
          {!manager && (
            <View style={{ height: 'auto' }}>
              <OutStationFLList1
                tripstartdate={tripstartdate}
                tripenddate={tripenddate}
                tripcreateat={tripcreateat}
                tripData={tripData}
                tripStatus={tripStatus}
                status={tripStatus[tripData.TripStatus]}
                temp_arr={temp_arr}
                listofDates={listofDates}
                listofAmount={listofAmount}
                listofExpId={listofExpId}
              />
            </View>
          )}
        </View>
      </View>
      <ActionButton
        backdrop={false}
        activeOpacity={0.85}
        shadowStyle={styles.elevation}
        backgroundTappable={false}
        buttonColor={themecolor.HEADERTHEMECOLOR}
        position="right"
        offsetX={25}
        offsetY={25}
        size={45}
        outRangeScale={1.1}
        inRangeScale={1.1}
        bgColor="rgba(0,0,0,.5)"
        degrees={180}
        // icon={<Fontisto name="nav-icon-grid" size={20} color={Colors.white} />}
        renderIcon={()=><Fontisto name="nav-icon-grid" size={20} color={Colors.white} />}
        >
        <ActionButton.Item
          shadowStyle={styles.elevation}
          size={35}
          title={manager ? 'Approved' : 'Extend Trip'}
          buttonColor="#1abc9c"
          textStyle={{
            color: '#1abc9c',
            fontFamily: FontFamily.PopinsMedium,
            fontSize: FontSize.smallText,
          }}
          onPress={() => {
            if (manager) {
              tripStatus[tripData.TripStatus] == 'Raised'
                ? managerActions(2)
                : alert(
                  `Can not approve already ${tripStatus[tripData.TripStatus]
                  } trip`,
                );
            } else {
              tripStatus[tripData.TripStatus] == 'Approved' ||
                tripStatus[tripData.TripStatus] == 'Raised'
                ? setmodalVisible2(!modalVisible2)
                : toast.show(
                  `Sorry you can not extend ${tripStatus[tripData.TripStatus]
                  } trip`,
                  {
                    type: 'warning',
                    placement: 'bottom',
                    duration: 4000,
                    offset: 30,
                    animationType: 'slide-in',
                  },
                );
            }
          }}>
          <AntDesign name="check" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          shadowStyle={styles.elevation}
          size={35}
          title={manager ? 'Reject' : 'Cancel Trip'}
          buttonColor="#f97d61"
          textStyle={{
            color: '#f97d61',
            fontFamily: FontFamily.PopinsMedium,
            fontSize: FontSize.smallText,
          }}
          onPress={() => {
            if (manager) {
              tripStatus[tripData.TripStatus] == 'Raised'
                ? setmodalVisible5(!modalVisible5)
                : alert(
                  `Can not Reject already ${tripStatus[tripData.TripStatus]
                  } trip`,
                );
            } else {
              setmodalVisible4(!modalVisible4);
            }
          }}>
          <AntDesign name="closecircle" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          shadowStyle={styles.elevation}
          size={35}
          title={manager ? 'Cancel' : 'Delete'}
          buttonColor="#f3a841"
          textStyle={{
            color: '#f3a841',
            fontFamily: FontFamily.PopinsMedium,
            fontSize: FontSize.smallText,
          }}
          onPress={() => {
            if (manager) {
              tripStatus[tripData.TripStatus] == 'Raised'
                ? managerActions(4)
                : alert(
                  `Can not approve already ${tripStatus[tripData.TripStatus]} trip`,
                );
            } else {
              tripStatus[tripData.TripStatus] == 'Approved'
                ? toast.show('Sorry You can not delete Approved Trip', {
                  type: 'warning',
                  placement: 'bottom',
                  duration: 4000,
                  offset: 30,
                  animationType: 'slide-in',
                })
                : setmodalVisible1(!modalVisible1);
            }
          }}>
          {manager ? (
            <MIcon name="error-outline" style={styles.actionButtonIcon} />
          ) : (
            <AntDesign
              name="delete"
              size={25}
              style={styles.actionButtonIcon}
            />
          )}
        </ActionButton.Item>
      </ActionButton>
      {modalVisible1 && (
        <ConfirmationModal
          btnlabel="Yes"
          PressDone={() => navigation.navigate('MyTrip')}
          title={`Are you sure you wants to delete this trip ?`}
          modalVisible1={modalVisible1}
          setmodalVisible1={setmodalVisible1}
          onConfirm={() => {
            setmodalVisible1(!modalVisible1);
            deleteTrip();
          }}
        />
      )}
      {modalVisible2 && (
        <TripExtendModal
          PressDone={() => navigation.navigate('MyTrip')}
          title={`Are you sure you wants to extend this trip ?`}
          setReason={setReason}
          reason={reason}
          tripstartdate={tripstartdate}
          setDate1={setDate1}
          modalVisible2={modalVisible2}
          tripenddate={tripenddate}
          setmodalVisible2={setmodalVisible2}
          onConfirm={() => {
            setmodalVisible2(!modalVisible2);
            extendTrip();
          }}
        />
      )}
      {modalVisible4 && (
        <ConfirmationModal
          btnlabel="yes"
          PressDone={() => navigation.navigate('MyTrip')}
          title={`Are you sure you wants to cancel this trip ?`}
          modalVisible1={modalVisible4}
          setmodalVisible1={setmodalVisible4}
          onConfirm={() => {
            setmodalVisible4(!modalVisible4);
            handleCancelTrip();
          }}
        />
      )}
      {modalVisible3 && <VerifyModel title="Trip Extended Successfully" />}
      <View>
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
                borderRadius: 16,
                padding: 20,
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
              }}>
              <View style={{ width: width * 0.68, alignSelf: 'center' }}>
                {/* <View style={{marginVertical: 10}} /> */}
                <View>
                  {/* <Text
                    style={{
                      fontFamily: FontFamily.PopinsRegular,
                      color: Colors.black,
                    }}>
                    Aprroved Amount
                  </Text> */}
                  {/* <View
                    style={{
                      backgroundColor: 'white',
                      borderRadius: 12,
                      borderWidth: 1,
                      borderColor: Colors.borderColor,
                      overflow: 'hidden',
                      position: 'relative',
                      height: 42,
                    }}>
                    <TextInput
                      value={requestedAmt}
                      style={{ left: 18 }}
                      onChangeText={txt => {
                        let temp = '';
                        temp = txt.replace(/[^0-9]/g, '');
                        if (temp.length === 0) {
                          setRequestedAmt('');
                        } else {
                          setRequestedAmt(temp);
                        }
                      }}
                      placeholderTextColor={'black'}
                      keyboardType="number-pad"
                    />
                    <Text style={{ position: 'absolute', top: 13, left: 10 }}>
                      <FIcon name="rupee" size={13} />
                    </Text>
                  </View> */}
                  <View style={{ marginTop: 5 }}>
                    <Text
                      style={{
                        fontFamily: FontFamily.PopinsRegular,
                        color: themecolor.TXTWHITE,
                      }}>
                      Note
                    </Text>
                    <View
                      style={{
                        backgroundColor: themecolor.RB2,
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: themecolor.BOXBORDERCOLOR1,
                        overflow: 'hidden',
                        height: 42,
                      }}>
                      <TextInput
                        value={noteTxt}
                        style={{ paddingHorizontal: 10,color:themecolor.TXTWHITE }}
                        onChangeText={txt => setNoteTxt(txt) }
                        placeholderTextColor={themecolor.TXTWHITE}
                        placeholder="Type note here..."
                      />
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
                      backgroundColor: themecolor.HEADERTHEMECOLOR,
                      borderRadius: 15,
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingHorizontal: 10,
                      paddingVertical: 4,
                      width: 80
                    }}
                    onPress={() => {
                      if(noteTxt!='')
                      managerActions(3)
                      else
                      toast.show(
                        "Please fill note...",
                        {
                          type: 'warning',
                          placement: 'bottom',
                          duration: 4000,
                          offset: 30,
                          animationType: 'slide-in',
                        },
                      );
                    } }
                    >
                    <Text style={{ color: 'white' }}>Save</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      borderRadius: 15,
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingHorizontal: 5,
                      paddingVertical: 2,
                      // backgroundColor:'red'
                    }}
                    onPress={() => {
                      setmodalVisible5(!modalVisible5);
                    }}>
                    <Text style={{ color: 'black' }}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};

export default OutstationTrip;
