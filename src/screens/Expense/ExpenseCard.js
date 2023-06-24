import React, { useState, useCallback, useEffect } from 'react'
import { useFocusEffect } from '@react-navigation/native';

import ProgressCircle from 'react-native-progress-circle';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import stylese from '../../assets/css/styleExpenses';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';
import styles from '../../assets/css/styleOutlet';
import Header_2 from '../../components/shared/Header_2';
import moment from 'moment';
import { gettripLocationApi } from '../../repository/trip/tripRepository';
import LoaderAllInOne from '../../components/shared/Loader';
import EFooter from '../../components/ExpenseData/EFooter';
import {
  View,
  StatusBar,
  ScrollView,
  Text,
  TouchableOpacity,
  FlatList,
  BackHandler,
  // Image,
} from 'react-native';
import {
  TripExpenseDropdownText,
  // CardDataList,
} from '../../components/ExpenseData/ExpenseDataList';
// import Spinner from 'react-native-loading-spinner-overlay';
// import { Colors } from '../../assets/config/Colors';
// import estyles from '../../assets/css/styleExpenses';

export default function ExpenseCard(props) {
  // const navigation = useNavigation();
  const [tripstatapidata, setTripstatapidata] = useState();
  const [expensestatusapi, setExpensestatapidata] = useState();
  const [expensestatusapi1, setExpensestatapidata1] = useState();
  const [getPlaceholder, setPlaceholder] = useState(
    moment().format('MMM-YYYY'),
  );
  // alert(expensestatusapi)
  // console.log('log of expense card lifting', tripstatapidata);

  const [tadata, setTAdata] = useState('');
  const [trdata, setTRdata] = useState('');
  const [tcdata, setTCdata] = useState('');
  const [tradata, setTRadata] = useState('');
  const [tcldata, setTCLdata] = useState('');
  const [ttotal, setTTotal] = useState('');

  const [esdata, setESdata] = useState('');
  const [eadata, setEAdata] = useState('');
  const [erdata, setERdata] = useState('');
  const [etotal, setETotal] = useState('');
  const [ecdata, setECdata] = useState('');
  const [expenseFilter, setExpenseFilter] = useState('');
  const [lengthOfExp, setLengthOfExp] = useState(0);

  const [monthId, setMonthId] = useState(
    `${moment().startOf('month').format('YYYY-MM-DD')}|${moment()
      .endOf('month')
      .format('YYYY-MM-DD')}`,
  );
  // const [ecreated, setECreated] = useState('');
  const [loader, setLoader] = useState(true);

  useFocusEffect(
    useCallback(() => {
      async function tripdashboard() {
        const start_date = moment().startOf('month').format('YYYY-MM-DD');
        const end_date = moment().endOf('month').format('YYYY-MM-DD');
        setPlaceholder(moment().format('MMM-YYYY'));

        setExpensestatapidata1(`${start_date}|${end_date}`);
        const result = await gettripLocationApi(
          `api/getAllTripStat?start_date=${start_date}&end_date=${end_date}`,
        );
        if (result.statusCode == 200) {
          // console.log('te fun result', result);
          setTAdata(result.data.myTripStatus.Approved);
          setTRdata(result.data.myTripStatus.Rejected);
          setTCdata(result.data.myTripStatus.Cancelled);
          setTRadata(result.data.myTripStatus.Raised);
          setTCLdata(result.data.myTripStatus.Closed);
          setTTotal(result.data.myTripStatus.Total);
          // setLoader(false);
        } else {
          toast.show(result.message, {
            type: 'warning',
            placement: 'bottom',
            duration: 4000,
            offset: 30,
            animationType: 'slide-in',
          });
          // setLoader(false);
        }
      }
      tripdashboard();

      async function expensedashboard() {
        setLoader(true);
        const start_date = moment().startOf('month').format('YYYY-MM-DD');
        const end_date = moment().endOf('month').format('YYYY-MM-DD');
        // setMonthId(`${start_date}|${end_date}`);
        setExpensestatapidata(`${start_date}|${end_date}`);

        const result = await gettripLocationApi(
          `api/getAllExpenseStat?start_date=${start_date}&end_date=${end_date}`,
        );
        // console.log('ex fun result', result);
        if (result == undefined || result.statusCode != 200) {
          // alert('expense stats undefined');
          setLoader(false);
        } else {
          try {
            // console.log(
            //   'result.data.myExpenseStatus ',
            //   result.data.myExpenseStatus,
            // );
            setESdata(result.data.myExpenseStatus.Submitted);
            setEAdata(result.data.myExpenseStatus.Approved);
            setERdata(result.data.myExpenseStatus.Rejected);
            setETotal(result.data.myExpenseStatus.Total);
            setECdata(result.data.myExpenseStatus.Created);
            setLoader(false);
          } catch (e) {
            console.log('catch error expense stats', e);
            setLoader(false);
          }
        }
      }
      expensedashboard();
    }, []),
  );

  const tripfilter = async (s_day, e_day) => {
    // alert(JSON.stringify({s_day,e_day}));
    // console.log('last day', e_day);
    const result = await gettripLocationApi(
      `api/getAllTripStat?start_date=${s_day}&end_date=${e_day}`,
    );
    if (result.statusCode == 200) {
      // console.log('trip_stats on console', result);
      setTAdata(result.data.myTripStatus.Approved);
      setTRdata(result.data.myTripStatus.Rejected);
      setTCdata(result.data.myTripStatus.Cancelled);
      setTRadata(result.data.myTripStatus.Raised);
      setTCLdata(result.data.myTripStatus.Closed);
      setTTotal(result.data.myTripStatus.Total);
    }
  };

  const expensefilter = async (s_day, e_day) => {
    // alert('hi')
    try {
      const result = await gettripLocationApi(
        `api/getAllExpenseStat?start_date=${s_day}&end_date=${e_day}`,
      );
      // alert(JSON.stringify(result))
      // console.log('Expense_filter ', result);
      if (result.statusCode == 200) {
        setECdata(result.data.myExpenseStatus.Created);
        setEAdata(result.data.myExpenseStatus.Approved);
        setESdata(result.data.myExpenseStatus.Submitted);
        setERdata(result.data.myExpenseStatus.Rejected);
        setETotal(result.data.myExpenseStatus.Total);
      }
    } catch (err) {
      console.log('catch filter error in expense filter', err);
    }
  };

  // function tr(selectedItem, type, fun) {
  //   if (selectedItem == undefined) {
  //     console.log('item not selected yet');
  //   } else {
  //     setExpenseFilter(selectedItem);
  //     if (selectedItem == 'Weekly') {

  //       const startOfMonth = moment().startOf('week').format('DD-MM-YYYY');
  //       const endOfMonth = moment().endOf('week').format('DD-MM-YYYY');
  //       fun(startOfMonth, endOfMonth);
  //     } else if (selectedItem == 'Monthly') {
  //       // alert('monthly');
  //       const startOfMonth = moment().startOf('month').format('DD-MM-YYYY');
  //       const endOfMonth = moment().endOf('month').format('DD-MM-YYYY');
  //       fun(startOfMonth, endOfMonth);
  //     } else if (selectedItem == 'Quaterly') {
  //       // alert(type)
  //       if (type == 'trip') {
  //         const current_day = moment().format('DD-MM-YYYY');
  //         const pastMonth = moment().add(3, 'M').format('DD-MM-YYYY');
  //         console.log('futureMonth1285689', pastMonth);
  //         fun(current_day, pastMonth);
  //       } else {
  //         const current_day = moment().format('DD-MM-YYYY');
  //         const pastMonth = moment().subtract(3, 'M').format('DD-MM-YYYY');
  //         console.log('futureMonth1285689EXP', pastMonth);
  //         fun(pastMonth, current_day);
  //       }
  //     }
  //   }
  // }

  function tr(selectedItem, type, fun) {
    if (selectedItem == undefined) {
    } else {
      // alert(fun)
      // console.log('selected++++++Itemmm', selectedItem);
      let start_date = selectedItem.split('|')[0].toString();
      let end_date = selectedItem.split('|')[1].toString();
      // alert(end_date)
      fun(start_date, end_date);
      // setMonthId(selectedItem)
    }
  }
  function tr1(selectedItem, type, fun) {
    if (selectedItem == undefined) {
    } else {
      // alert(fun)
      // console.log('selected++++++Itemmm', selectedItem);
      let start_date = selectedItem.split('|')[0].toString();
      let end_date = selectedItem.split('|')[1].toString();
      // alert(end_date)
      fun(start_date, end_date);
      // setMonthId(selectedItem)
    }
  }

  const TripData = [
    {
      CN: 'Approved ',
      CN1: `${tadata} `,
      point: (
        <View
          style={{
            backgroundColor: 'green',
            borderRadius: 50,
            width: 8,
            height: 8,
            // left: 10,
            justifyContent: 'center',
          }}
        />
      ),
      icon: <SimpleIcon name="arrow-right" style={{ fontSize: 12 }} />,
      screen: 'TripByStatus',
      status: 2,
    },
    {
      CN: 'Rejected ',
      CN1: `${trdata} `,
      border: <View style={{ borderWidth: 0.2, borderColor: 'lightgrey' }} />,
      point: (
        <View
          style={{
            backgroundColor: '#ef5c31',
            borderRadius: 50,
            width: 8,
            height: 8,
            // left: 10,
            justifyContent: 'center',
          }}
        />
      ),
      icon: <SimpleIcon name="arrow-right" style={{ fontSize: 12 }} />,
      screen: 'TripByStatus',
      status: 3,
    },
    {
      CN: 'Cancelled ',
      CN1: `${tcdata} `,
      border: <View style={{ borderWidth: 0.2, borderColor: 'lightgrey' }} />,
      point: (
        <View
          style={{
            backgroundColor: '#ef5c31',
            borderRadius: 50,
            width: 8,
            height: 8,
            // left: 10,
            justifyContent: 'center',
          }}
        />
      ),
      status: 4,
    },
    {
      CN: 'Raised ',
      CN1: `${tradata} `,
      border: <View style={{ borderWidth: 0.2, borderColor: 'lightgrey' }} />,
      point: (
        <View
          style={{
            backgroundColor: '#46dc5a',
            borderRadius: 50,
            width: 8,
            height: 8,
            // left: 10,
            justifyContent: 'center',
          }}
        />
      ),
      icon: <SimpleIcon name="arrow-right" style={{ fontSize: 12 }} />,
      status: 1,
    },
    {
      CN: 'Closed ',
      CN1: `${tcldata} `,
      point: (
        <View
          style={{
            backgroundColor: '#46dc5a',
            borderRadius: 50,
            width: 8,
            height: 8,
            // left: 10,
            justifyContent: 'center',
          }}
        />
      ),
      icon: <SimpleIcon name="arrow-right" style={{ fontSize: 12 }} />,
      status: 5,
    },
  ];

  const TripDataExpense = [
    {
      CN: 'Created ',
      CN1: `${ecdata} `,
      point: (
        <View
          style={{
            backgroundColor: '#67cdff',
            borderRadius: 50,
            width: 8,
            height: 8,
            // left: 10,
            justifyContent: 'center',
          }}
        />
      ),
      icon: <SimpleIcon name="arrow-right" style={{ fontSize: 12 }} />,
      screen: 'ExpensesByStatus',
      status: 1,
    },
    {
      CN: 'Submitted ',
      CN1: `${esdata} `,
      point: (
        <View
          style={{
            backgroundColor: 'blue',
            borderRadius: 50,
            width: 8,
            height: 8,
            // left: 10,
            justifyContent: 'center',
          }}
        />
      ),
      icon: <SimpleIcon name="arrow-right" style={{ fontSize: 12 }} />,
      screen: 'ExpensesByStatus',
      status: 2,
    },
    {
      CN: 'Approved ',
      CN1: `${eadata} `,
      border: <View style={{ borderWidth: 0.2, borderColor: 'lightgrey' }} />,
      point: (
        <View
          style={{
            backgroundColor: 'green',
            borderRadius: 50,
            width: 8,
            height: 8,
            // left: 10,
            justifyContent: 'center',
          }}
        />
      ),
      icon: <SimpleIcon name="arrow-right" style={{ fontSize: 12 }} />,
      screen: 'ExpensesByStatus',
      status: 3,
    },
    {
      CN: 'Rejected ',
      CN1: `${erdata} `,
      border: <View style={{ borderWidth: 0.2, borderColor: 'lightgrey' }} />,
      point: (
        <View
          style={{
            backgroundColor: '#ef5c31',
            borderRadius: 50,
            width: 8,
            height: 8,
            // left: 10,
            justifyContent: 'center',
          }}
        />
      ),
      screen: 'ExpensesByStatus',
      status: 4,
    },
  ];

  function TripDataList({ item, navigation, themecolor }) {
    //const navigation = useNavigation();
    // console.log("check---",props)
    return (
      <View style={{ ...stylese.MainVIewFL, }}>
        <View style={{ borderWidth: 0.2, borderColor: 'lightgrey' }} />
        <View style={stylese.CENTERFLEX} activeOpacity={0.5}>
          <View style={stylese.CENTERFLEX1}>
            <View style={stylese.WIDTH1}>{item.point}</View>
            <View style={stylese.WIDTH6}>
              <Text style={{ ...stylese.MainText, color: themecolor.TXTWHITE }}>
                {item.CN}
              </Text>
            </View>
            <View style={stylese.TripCountText}>
              <TouchableOpacity
                onPress={() =>
                  navigation.push('TripByStatus', {
                    navigateFrom: item.CN,
                    expenseFilter: expenseFilter,
                    monthId: expensestatusapi1,
                    status: item.status,
                  })
                }>
                <Text
                  style={{ ...stylese.TextBLue, color: themecolor.TXTWHITE }}>
                  {item.CN1}{' '}
                  <SimpleIcon
                    name="arrow-right"
                    color={themecolor.TXTWHITE}
                    style={{ fontSize: 12 }}
                  />
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }

  function TripDataListExpense({ item, navigation, expenseFilter, themecolor, monthId }) {
    //const navigation = useNavigation();
    // console.log("check---",props)

    return (
      <View style={stylese.MainVIewFL}>
        <View style={{ borderWidth: 0.2, borderColor: 'lightgrey' }} />
        <View style={stylese.CENTERFLEX} activeOpacity={0.5}>
          <View style={stylese.CENTERFLEX1}>
            <View style={{ ...stylese.WIDTH1, }}>{item.point}</View>

            <View style={stylese.WIDTH6}>
              <Text style={{ ...stylese.MainText, color: themecolor.TXTWHITE }}>
                {item.CN}
              </Text>
            </View>
            <View style={stylese.TripCountText}>
              <TouchableOpacity
                onPress={() =>
                  navigation.push(item.screen, {
                    navigateFrom: item.CN,
                    expenseFilter: expenseFilter,
                    monthId: expensestatusapi,
                    status: item.status,
                  })
                }>
                <Text
                  style={{ ...stylese.TextBLue, color: themecolor.TXTWHITE }}>
                  {item.CN1}
                  <SimpleIcon
                    name="arrow-right"
                    color={themecolor.TXTWHITE}
                    style={{ fontSize: 12 }}
                  />
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }

  useEffect(() => {
    tr(expensestatusapi, 'exp', expensefilter);
  }, [expensestatusapi]);

  useEffect(() => {
    tr1(expensestatusapi1, 'trip', tripfilter);
  }, [expensestatusapi1]);

  const handleBackButtonClick = () => {
    props.navigation.reset({
      index: 0,
      routes: [{ name: 'NewDashboard' }],
    });
    return true;
  };

  const getExpenseApproval = async () => {
    try {
      const to_date = moment().format('DD-MM-YYYY');
      const from_date = moment().subtract(30, 'd').format('DD-MM-YYYY');

      const result = await gettripLocationApi(
        `api/getawatingApprovalExpenses?from_date=${from_date}&to_date=${to_date}`,
      );
      const result1 = await gettripLocationApi(
        `api/getawatingApprovalTripNew?filterdate=${to_date}`,
      );

      if (result.statusCode == 200 && result1.statusCode == 200) {
        // alert(JSON.stringify(result1))
        // alert(JSON.stringify(result))

        return result.data.length + result1.data.length
        // if (result.data.length >= 1 && result1.data.length >= 1) {
        //   alert(JSON.stringify(result1.data.length));
        //   return  true

        // } else {
        //   return false
        // }
      } else {
        alert(result.message);
      }
    } catch (e) {
      console.log('catch error', e);
      return false;
    }
  };

  useEffect(() => {
    const tempasync = async () => {
      const exp = await getExpenseApproval()
      setLengthOfExp(exp)
    }
    tempasync()
  }, [])

  // alert('alert is ' + getExpenseApproval())

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
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()

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
      <View style={{ ...styles.mainContainer, backgroundColor: themecolor.THEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR1 }}>
        <StatusBar translucent backgroundColor="transparent" />
        <Header_2
          title="Expense"
          onPress={() => {
            try {
              // if(props.route.params.navigateFrom == 'expensestatus'){
              //   props.navigation.reset({
              //     index: 0,
              //     routes: [
              //       {
              //         name: 'NewDashboard',
              //       },
              //     ],
              //   });
              // }
              props.navigation.push('NewDashboard');
            } catch (e) {
              props.navigation.push('NewDashboard');
            }
          }}
          iconnameplus=""
          Size={18}
          onPressIcon={() => props.navigation.navigate('Search')}
        />
        {/* ==================== */}
        <ScrollView showsVerticalScrollIndicator={false}>
          <TripExpenseDropdownText
            setTripstatapidata={setExpensestatapidata1}
            CardHeading="Trip overview"
            ptext={getPlaceholder}
          />
          <View style={{ ...stylese.ExpenseNewCard, backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR1 }}>
            <View style={stylese.padding}>
              <ProgressCircle
                percent={ttotal.length >= 3 ? parseFloat(ttotal / 2) : parseInt(ttotal)}
                radius={50}
                borderWidth={12}
                color="#f45831"
                shadowColor="#ffd8ce"
                bgColor={themecolor.BOXTHEMECOLOR}>
                <Text style={{ ...stylese.TripCount, color: themecolor.TXTWHITE }}>{ttotal}</Text>
                <Text style={{ ...stylese.TripText, color: themecolor.TXTWHITE }}>{'Trips'}</Text>
              </ProgressCircle>
            </View>
            {/* 
            <FlatList
              data={TripData}
              renderItem={({item}) => (
                <TripDataList item={item} themecolor={themecolor} navigation={props.navigation} />
              )}
              showsHorizontalScrollIndicator={false}
            /> */}
            {TripData.map((item, indx) => <TripDataList key={indx} item={item} themecolor={themecolor} navigation={props.navigation} />)}
          </View>

          {/* ========================= */}

          <View style={{ marginVertical: 5 }} />
          <TripExpenseDropdownText
            setTripstatapidata={setExpensestatapidata}
            CardHeading="Expenses overview"
            ptext={getPlaceholder}
          // monthId={monthId}
          />
          {/* <CardDataList
          CountTrip="1"
          triptext="Expenses"
          Color1="#3862f8"
          Color2="#9fb4ff"
        /> */}
          {/* ========= */}

          <View style={{ ...stylese.ExpenseNewCard, backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR1 }}>
            <View style={stylese.padding}>
              <ProgressCircle
                percent={etotal.length >= 3 ? parseFloat(etotal / 2) : parseInt(etotal)}
                radius={50}
                borderWidth={12}
                color={'#3862f8'}
                shadowColor={'#9fb4ff'}
                bgColor={themecolor.BOXTHEMECOLOR}>
                <Text style={{ ...stylese.TripCount, color: themecolor.TXTWHITE }}>{etotal}</Text>
                <Text style={{ ...stylese.TripText, color: themecolor.TXTWHITE }}>Expenses</Text>
              </ProgressCircle>
            </View>
            {/* <FlatList
              data={TripDataExpense}
              renderItem={({item}) => (
                <TripDataListExpense
                  item={item}
                  themecolor={themecolor}
                  navigation={props.navigation}
                  expenseFilter={expenseFilter}
                  monthId={monthId}
                />
              )}
              showsHorizontalScrollIndicator={false}
            /> */}
            {TripDataExpense.map((item, index) => <TripDataListExpense
              key={index}
              item={item}
              themecolor={themecolor}
              navigation={props.navigation}
              expenseFilter={expenseFilter}
              monthId={monthId}
            />)}
          </View>

          {/* ========= */}
          <View style={{ marginVertical: 30 }} />
        </ScrollView>
        {/* <View style={estyles.efooter}>
          <View style={estyles.footerv}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('MyTrip')}
              style={estyles.footertouchv}>
              <Image
                resizeMode="center"
                style={estyles.footerimg}
                source={require('../../assets/images/Action/trip.png')}
              />
            </TouchableOpacity>
            <Text style={estyles.footertext}>Trips</Text>
          </View>
          <View style={estyles.footerv}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('ExpenseList');
              }}
              style={{
                ...estyles.footertouchv,
                backgroundColor: Colors.ExpenseSEGT,
              }}>
              <Image
                resizeMode="center"
                style={estyles.footerimg}
                source={require('../../assets/images/dashboard/expensewhite.png')}
              />
            </TouchableOpacity>
            <Text style={estyles.footertext}>Expense</Text>
          </View>
        </View> */}
        <EFooter manager={lengthOfExp == 0 ? false : true} navigateFrom={'Expenses'} />
      </View>
    </>
  );
}
