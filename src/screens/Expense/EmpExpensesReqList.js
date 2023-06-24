import { Text, View, TouchableOpacity, Dimensions } from 'react-native';
import React, { useCallback, useState } from 'react';
import ProfileViewHeader from '../../components/shared/ProfileViewHeader';
import { createTripApi } from '../../repository/trip/tripRepository';
import styles from '../../assets/css/styleProducts';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { gettripLocationApi } from '../../repository/trip/tripRepository';
import { FontSize } from '../../assets/fonts/Fonts';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import { Colors } from '../../assets/config/Colors';
import { FontFamily } from '../../assets/fonts/FontFamily';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
const { width, height } = Dimensions.get('screen');

const EmpExpensesReqList = props => {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()

  const navigation = useNavigation();

  const [expenseData, setExpenseData] = useState([]);
  const [tripData, setTripData] = useState([]);
  const [expstatus, setExpstatus] = useState({});
  const [tripStatus, setTripStatus] = useState({});
  const [loader, setLoader] = useState(true);

  const empId = props.route.params.empId;
  // console.log('EMPLOYEE ID', empId);

  const navigateFrom = props.route.params.navigateFrom;

  const fetchexpensestatus = async () => {
    const response = await gettripLocationApi('api/getStatus');
    if (response.statusCode == 200) {
      // console.log('response of status', response.data[0].Expenses);
      setExpstatus(response.data[0].Expenses);
      // setLoader(!loader);
      // console.log('expenses status', response.data[0]);
    } else {
      // setLoder(false);
      toast.show(result.message, {
        type: 'warning',
        placement: 'bottom',
        duration: 4000,
        offset: 30,
        animationType: 'slide-in',
      });
    }
    setLoader(!loader)
  };

  const getStatus = async () => {
    const statusResult = await gettripLocationApi('api/getStatus');
    // console.log('trip status list', statusResult.data[0].Trips);
    if (statusResult.statusCode == 200) {
      setTripStatus(statusResult.data[0].Trips);
      // setLoader(!loader)
    } else {
      alert(statusResult.message);
    }
    setLoader(!loader)
  };

  //   console.log("STATUS DATA >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",expstatus)

  useFocusEffect(
    useCallback(async () => {
      if (navigateFrom == 'Expense') {
        const result = await createTripApi(
          `api/getEmployeetoExpenses?EmpId=${empId}`,
        );
        if (result.statusCode == 200) {
          setExpenseData(result.data);
          // setLoader(!loader)
        }
        // console.log('EXPENSE DATA IN LIST 18>>>>>>>>>>>>', result.data);
        fetchexpensestatus();
      } else if (navigateFrom == 'Trip') {
        const result2 = await gettripLocationApi(
          `api/getemployeeTrip?employee_id=${empId}`,
        );
        if (result2.statusCode == 200) {
          setTripData(result2.data);
          // setLoader(!loader)
        }
        getStatus();
      }
    }, []),
  );

  ////////////////////////// STATUS COLOR AND ICON ///////////////////////////////////////////
  var statusColor = '';
  var Icon = '';
  {
    expenseData.map((item, index) => {
      if (
        expstatus[item.ExpenseStatus] == 'Approved' ||
        expstatus[item.ExpenseStatus] == 'Submit'
      ) {
        statusColor = '#00C46F';
        Icon = (
          <>
            <FAIcon name="check-circle" />
          </>
        );
      } else if (expstatus[item.ExpenseStatus] == 'Created') {
        statusColor = 'orange';
        Icon = (
          <>
            <MIcon name="error-outline" />
          </>
        );
      } else if (expstatus[item.ExpenseStatus] == 'Proceed for Payment') {
        statusColor = 'green';
        Icon = (
          <>
            <FAIcon name="check-circle" />
          </>
        );
      } else {
        statusColor = 'red';
        Icon = (
          <>
            <Feather name="x-circle" />
          </>
        );
      }
    });
  }
  /////////////////////////////////////////////////////////////////////////////////////

  function ComponentEmpReqShimmer(props) {
    return (
      <SkeletonPlaceholder>
        <View
          style={{
            justifyContent: 'center',
            alignSelf: 'center',
            alignContent: 'center',
            alignItems: 'center',
          }}>
          <View style={styles.CUSTOMERVIEWTO}>
            <View style={styles.NumberInputView}>
              <View style={{
                ...styles.Width85,
                justifyContent: 'center',
                alignSelf: 'center',
              }}>
                <View style={{
                  ...styles.FLEXDIREC1,
                  justifyContent: 'space-between',
                }}>
                  <View style={{ height: 13, width: width * 0.55 }} />
                  <View style={{
                    height: 13,
                    width: width * 0.2,
                  }} />
                  {/* <View>
                      <View style={{
                        height: 13,
                        //   alignSelf:'flex-end',
                        textAlign: 'right',
                        width: width * 0.3,
                      }} />
                    </View> */}
                </View>
                <View style={{
                  ...styles.FLEXDIREC1,
                  justifyContent: 'space-between',
                  marginTop: 13
                }}>
                  <View style={{ height: 13, width: width * 0.55 }} />
                  <View style={{
                    height: 13,
                    width: width * 0.2
                  }} />
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={{marginVertical:4}} />
      </SkeletonPlaceholder>
    )
  }

  function ComponentEmpReqTripShimmer(props) {
    return (
      <SkeletonPlaceholder>
        <View
          style={{
            justifyContent: 'center',
            alignSelf: 'center',
            alignContent: 'center',
            alignItems: 'center',
          }}>
          <View style={styles.CUSTOMERVIEWTO}>
            <View style={styles.NumberInputView}>
              <View style={{
                ...styles.Width85,
                justifyContent: 'center',
                alignSelf: 'center',
              }}>
                <View style={{ flexDirection: "row" }}>
                  <View>
                    <View style={{ height: 14, width: width * 0.6, marginBottom: 5 }} />
                    <View style={{ height: 14, width: width * 0.6, marginBottom: 5 }} />
                    <View style={{ height: 14, width: width * 0.6 }} />
                  </View>
                  <View style={{ justifyContent: "center", alignItems: "center", marginLeft: "auto" }}>
                    <View style={{ height: 14, width: width * 0.2, marginBottom: 5 }} />
                    <View style={{ height: 14, width: width * 0.2 }} />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={{marginVertical:4}} />
      </SkeletonPlaceholder>
    )
  }

  return (
    <View style={{ flex: 1, backgroundColor: themecolor.THEMECOLOR }}>
      <View style={{ height: 300 }}><ProfileViewHeader empId={empId} title="" /></View>


      <View style={{ flex: 2, marginTop: 10, backgroundColor: themecolor.THEMECOLOR }}>
        {navigateFrom == 'Expense' ? loader ?
          expenseData.map(() => {
            return <View style={{ marginBottom: 5, }}><ComponentEmpReqShimmer /></View>
          }) :
          expenseData.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  justifyContent: 'center',
                  alignSelf: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('OutstationTripDetails', {
                      date1: item.ExpenseDate,
                      expId: item.ExpId,
                      workingat: item.ExpensePlacewrk,
                      Manager: 'Manager',
                      empId: empId,
                    })
                  }
                  activeOpacity={0.5}
                  style={{ ...styles.CUSTOMERVIEWTO, backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR1, borderRadius: 10, }}>
                  <View style={{ ...styles.NumberInputView,}}>
                    <View
                      style={{
                        ...styles.Width85,
                        justifyContent: 'center',
                        alignSelf: 'center',
                      }}>
                      <View
                        style={{
                          ...styles.FLEXDIREC1,
                          justifyContent: 'space-between',
                        }}>
                        <Text style={{ ...styles.RateTextBig, }}></Text>
                        <Text
                          numberOfLines={1}
                          ellipsizeMode="tail"
                          style={{
                            ...styles.RateTextBig,
                            width: width * 0.55,
                            color: themecolor.TXTWHITE
                          }}>
                          {item.ExpensePlacewrk}
                        </Text>
                        <View>
                          <Text
                            style={{
                              ...styles.RateTextboldOrangeCircle,
                              color: statusColor,
                              //   alignSelf:'flex-end',
                              textAlign: 'right',
                              width: width * 0.3,
                            }}>
                            {Icon}
                            &nbsp;{expstatus[item.ExpenseStatus]}
                          </Text>
                        </View>
                      </View>

                      <View
                        style={{
                          ...styles.FLEXDIREC1,
                          justifyContent: 'space-between',
                        }}>
                        <Text style={{ ...styles.RateText, color: themecolor.TXTWHITE }}>
                          {item.ExpenseDate == '' || item.ExpenseDate == null
                            ? 'Date not available'
                            : item.ExpenseDate.split('-').reverse().join('-')}
                        </Text>
                        <View style={{ width: 90 }}>
                          <Text
                            style={{
                              ...styles.RateText,
                              top: -5,
                              alignSelf: 'flex-end',
                              fontSize: FontSize.labelText3,
                              color: themecolor.TXTWHITE
                            }}>
                            <FAIcon name="rupee" size={11} />{' '}
                            {item.ExpenseFinalAmt}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
                <View style={{marginVertical:4}} />
              </View>
            );
          })
          : (navigateFrom == "Trip" && loader) ? tripData.map(() => {
            return <View style={{ marginBottom: 5 }}><ComponentEmpReqTripShimmer /></View>
          }) : tripData.map(item => {
            var statusColor = '';
            let Icon = '';
            if (tripStatus[item.TripStatus] == 'Approved') {
              statusColor = '#00C46F';
              Icon = (
                <>
                  <FAIcon name="check-circle" />
                </>
              );
            } else if (tripStatus[item.TripStatus] == 'Raised') {
              statusColor = 'orange';
              Icon = (
                <>
                  <MIcon name="error-outline" />
                </>
              );
            } else {
              statusColor = 'red';
              Icon = (
                <>
                  <Feather name="x-circle" />
                </>
              );
            }

            return (
              <View
                style={{
                  justifyContent: 'center',
                  alignSelf: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() =>
                    navigation.push('OutstationTrip', {
                      tripId: item.TripId,
                      manager: true,
                    })
                  }
                  style={{ ...styles.CUSTOMERVIEWTO, backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR1 }}>
                  <View style={{ ...styles.NumberInputView, }}>
                    <View
                      style={{
                        ...styles.Width85,
                        justifyContent: 'center',
                        alignSelf: 'center',
                      }}>
                      <View
                        style={{
                          ...styles.FLEXDIREC1,
                          justifyContent: 'space-between',
                        }}>
                        <Text
                          numberOfLines={1}
                          ellipsizeMode="tail"
                          style={{ ...styles.RateText, width: width * 0.6, color: themecolor.TXTWHITE }}>
                          <FAIcon
                            size={15}
                            name="map-marker"
                            color={Colors.bluetheme}
                          />{' '}
                          {item.TripOriginName}
                        </Text>
                      </View>
                      <View
                        style={{
                          ...styles.FLEXDIREC1,
                          justifyContent: 'space-between',
                        }}>
                        <Text
                          numberOfLines={1}
                          ellipsizeMode="tail"
                          style={{ ...styles.RateText, width: width * 0.6, color: themecolor.TXTWHITE }}>
                          <FAIcon
                            size={15}
                            name="map-marker"
                            color={Colors.bluetheme}
                          />{' '}
                          {item.TripDestinationName}
                        </Text>
                        <View style={{ ...styles.FLEXDIRECTIONROW, top: -8 }}>
                          <Text
                            style={{
                              ...styles.RateTextboldOrangeCircle,
                              color: statusColor,
                            }}>
                            {Icon} {tripStatus[item.TripStatus]}{' '}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          ...styles.FLEXDIREC1,
                          justifyContent: 'space-between',
                        }}>
                        <Text style={{ ...styles.RateText, color: themecolor.TXTWHITE }}>
                          <FAIcon
                            size={11}
                            name="calendar"
                            color={Colors.bluetheme}
                          />{' '}
                          {item.TripStartDate?.slice(0, 10)
                            .split('-')
                            .reverse()
                            .join('-')}{' '}
                          <Text
                            style={{ fontFamily: FontFamily.Popinssemibold, color: themecolor.TXTWHITE }}>
                            to
                          </Text>{' '}
                          {item.TripEndDate?.slice(0, 10)
                            .split('-')
                            .reverse()
                            .join('-')}
                        </Text>
                        <Text style={{ ...styles.RateText, top: -8, color: themecolor.TXTWHITE }}>
                          <FAIcon name="rupee" size={11} />
                          {item.expTotal}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
                <View style={{marginVertical:4}} />
              </View>
            );
          })}
      </View>
    </View>
  );
};

export default EmpExpensesReqList;
