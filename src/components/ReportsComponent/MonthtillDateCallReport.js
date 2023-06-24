import { View, Text, Dimensions, TouchableOpacity, } from 'react-native'
import React, { useState, useEffect } from 'react'
import moment from 'moment';
import { FontFamily } from '../../assets/fonts/FontFamily'
import { FontSize } from '../../assets/fonts/Fonts';
import styles from '../../assets/css/stylesDashboard';
const { width } = Dimensions.get('window')
import { useNavigation } from '@react-navigation/native';
import NewDropdown from '../shared/NewDropdown';
import { getMonthTillDateCalls } from '../../repository/report/ReportRepository';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';

export default function MonthtillDateCallReport(props) {

  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()

  const [monthCalls, setMonthCalls] = useState('');
  const [monthCalls1, setMonthCalls1] = useState('. . .');
  const [monthCalls2, setMonthCalls2] = useState('. . .');
  const [monthCalls3, setMonthCalls3] = useState('. . .');
  const [monthCalls4, setMonthCalls4] = useState('. . .');
  const [monthCalls5, setMonthCalls5] = useState('. . .');
  const [monthCalls6, setMonthCalls6] = useState('. . .');
  const [monthCalls7, setMonthCalls7] = useState('. . .');
  const navigation = useNavigation()

  // var totalCallsSide = 0;
  // totalCallsSide = parseFloat(monthCalls.TotalCallsPercentage).toFixed(2);
  // var productiveCalls = 0;
  // productiveCalls = parseFloat(monthCalls.ProductiveCallsPercentage).toFixed(2);
  // var nonVisitOutlets = 0;
  // nonVisitOutlets = parseFloat(monthCalls.NonVisitOutletsPercentage).toFixed(1);
  // var zeroBillingOutlets = 0;
  // zeroBillingOutlets = parseFloat(monthCalls.ZeroBillingOutletsPercentage).toFixed(1);

  var monthSelect = ['MTD', 'QTD', 'YTD'];
  const [selectedMonthItem, setSelectedMonthItem] = useState('MTD');
  const [placeholder, setPlaceholder] = useState('MTD');
  const [newOptions, setNewOptions] = useState(monthSelect);

  useEffect(() => {
    if (placeholder == 'MTD') {
      monthSelect = [
        "QTD",
        "YTD"
      ]
    } else if (placeholder == 'QTD') {
      monthSelect = [
        "MTD",
        "YTD"
      ]
    } else if (placeholder == 'YTD') {
      monthSelect = [
        "MTD",
        "QTD",
      ]
    }
    setNewOptions(monthSelect)
    return()=>{

    }
  }, [placeholder])

  React.useEffect(() => {
    if (selectedMonthItem === 'MTD') {
      let f = moment().startOf('months').format('YYYY-MM-DD');
      let t = moment().endOf('months').format('YYYY-MM-DD');
      monthtilldatecalls(f, t);

    } else if (selectedMonthItem === 'QTD') {
      let f = moment().subtract(3, 'months').format('YYYY-MM-DD');
      let t = moment().endOf('months').format('YYYY-MM-DD');
      monthtilldatecalls(f, t);

    } else if (selectedMonthItem === 'YTD') {
      let f = moment().subtract(12, 'months').format('YYYY-MM-DD');
      let t = moment().endOf('months').format('YYYY-MM-DD');
      monthtilldatecalls(f, t);
    }

    return()=>{
      
    }
  }, [selectedMonthItem])

  const monthtilldatecalls = async (f, t) => {
    try {
      let result = await getMonthTillDateCalls(f, t);
      if (result.statusCode == 200) {
        setMonthCalls(result.data);
        setMonthCalls1(result.data.ScheduleCalls)
        setMonthCalls2(`${result.data.TotalCalls}(${result.data.TotalCallsPercentage.toFixed(2)}%)`)
        setMonthCalls3(`${result.data.ProductiveCalls}(${result.data.ProductiveCallsPercentage.toFixed(2)}%)`)
        setMonthCalls4(`${result.data.NonVisitOutlets} (${result.data.NonVisitOutletsPercentage.toFixed(2)}%)`)
        setMonthCalls5(`${result.data.ZeroBillingOutlets} (${result.data.ZeroBillingOutletsPercentage.toFixed(2)}%)`)
        setMonthCalls6(`${result.data.NewOnBoarding}`)
        setMonthCalls7(`${result.data.TelephonicOrder}`)
      }
      // console.log('............yyyyyyyyy...........', f, t);
    } catch (err) {
      console.log('catch error from', err);
    }
  };

  useEffect(() => {
    const f = moment().startOf('month').format('DD-MM-YYYY');
    const t = moment().endOf('month').format('DD-MM-YYYY');
    monthtilldatecalls(f, t)
    return()=>{
      
    }
 
  }, []);

  return (
    <>
      <View style={styles.DailyCallView}>
        <View>
          <Text style={{ ...styles.CardTextDC, color: themecolor.TXTWHITE }}>MTD Calls</Text>
        </View>
        {/* <View style={styles.DailyCallView2}>
          <View style={styles.DCFLex}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => { props.setMonthDate(0); setbg(1) }}
              style={{
                ...styles.TODAYBUTTOn,
                backgroundColor: bg == 1 ? '#4261f7' : '#FFF',
              }}>
              <Text
                style={{
                  ...styles.TodayButtonStyle,
                  color: bg == 1 ? '#FFF' : '#8498fa',
                }}>
                Today
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => { props.setMonthDate(1); setbg(2) }}
              style={{
                ...styles.YesterDayButton,
                backgroundColor: bg == 2 ? '#4261f7' : '#FFF',
              }}>
              <Text
                style={{
                  ...styles.TodayButtonStyle,
                  color: bg == 2 ? '#FFF' : '#8498fa',
                }}>
                Yesterday
              </Text>
            </TouchableOpacity>
          </View>
        </View> */}

        <View style={{ position: 'absolute', right: 0, zIndex: 9999 }}>
          <NewDropdown
            options={newOptions}
            setSelectedItem={setSelectedMonthItem}
            toValue={70}
            widthh={85}
            widthPlaceHolder={60}
            widthIcon={10}
            placeholder={placeholder}
            setPlaceholder={setPlaceholder}
          />
        </View>
      </View>

      <View style={{ marginVertical: 2 }} />
      <View style={{ ...styles.cardsView, backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR }}>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 8,
            width: width * 0.92,
          }}>
          <TouchableOpacity
            style={{
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
            }}
            activeOpacity={0.1}
            onPress={() => { navigation.navigate('MonthCalls', { 'heading': "Schedule Calls" }) }}>
            <View
              style={{
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
              }}>
              <Text
                style={{
                  fontSize: FontSize.labelText3,
                  // color: Colors.bluetheme,
                  color: themecolor.BLUEWHITE,
                  fontFamily: FontFamily.Popinssemibold,
                  textAlign: 'center'
                }}>{monthCalls1}</Text>
              <Text
                style={{
                  fontSize: FontSize.SMALL8,
                  // color: Colors.black,
                  color: themecolor.TXTWHITE,
                  fontFamily: FontFamily.PopinsMedium,
                }}>Schedule Calls</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
            }}
            activeOpacity={0.1}
            onPress={() => { navigation.navigate('MonthCalls', { 'heading': "Total Calls" }) }}>
            <View
              style={{
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
              }}>
              <Text
                style={{
                  fontSize: FontSize.labelText3,
                  // color: Colors.bluetheme,
                  color: themecolor.BLUEWHITE,
                  fontFamily: FontFamily.Popinssemibold,
                  textAlign: 'center'
                }}>{monthCalls2}
              </Text>
              <Text
                style={{
                  fontSize: FontSize.SMALL8,
                  // color: Colors.black,
                  color: themecolor.TXTWHITE,
                  fontFamily: FontFamily.PopinsMedium,
                }}>Total Calls</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
            }}
            activeOpacity={0.1}
            onPress={() => { navigation.navigate('MonthCalls', { 'heading': "Productive Calls" }) }}>
            <View
              style={{

                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
              }}>
              <Text
                style={{
                  fontSize: FontSize.labelText3,
                  // color: Colors.bluetheme,
                  color: themecolor.BLUEWHITE,
                  fontFamily: FontFamily.Popinssemibold,
                  textAlign: 'center'
                }}>{monthCalls3}</Text>
              <Text
                style={{
                  fontSize: FontSize.SMALL8,
                  // color: Colors.black,
                  color: themecolor.TXTWHITE,
                  fontFamily: FontFamily.PopinsMedium,
                }}>Productive Calls</Text>
            </View>
          </TouchableOpacity>
        </View>


        <View style={{
          borderWidth: 0.2,
          borderColor: 'lightgrey',
          width: width * 0.85,
          alignSelf: 'center',
        }} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 8,
            width: width * 0.92,
          }}>
          <TouchableOpacity
            style={{
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
            }}
            activeOpacity={0.1}
            onPress={() => { navigation.navigate('MonthCalls', { 'heading': "Non-Visit Outlets" }) }}>
            <View
              style={{
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
              }}>
              <Text
                style={{
                  fontSize: FontSize.labelText3,
                  // color: Colors.bluetheme,
                  color: themecolor.BLUEWHITE,
                  fontFamily: FontFamily.Popinssemibold,
                  textAlign: 'center'
                }}>{monthCalls4}</Text>
              <Text
                style={{
                  fontSize: FontSize.SMALL8,
                  // color: Colors.black,
                  color: themecolor.TXTWHITE,
                  fontFamily: FontFamily.PopinsMedium,
                }}>Non-visit Outlets</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
            }}
            activeOpacity={0.1}
            onPress={() => { navigation.navigate('MonthCalls', { 'heading': "Zero Billing Outlets" }) }}>
            <View
              style={{
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
              }}>
              <Text
                style={{
                  fontSize: FontSize.labelText3,
                  // color: Colors.bluetheme,
                  color: themecolor.BLUEWHITE,
                  fontFamily: FontFamily.Popinssemibold,
                  textAlign: 'center'
                }}>{monthCalls5}</Text>
              <Text
                style={{
                  fontSize: FontSize.SMALL8,
                  // color: Colors.black,
                  color: themecolor.TXTWHITE,
                  fontFamily: FontFamily.PopinsMedium,
                }}>Zero billing outlet</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
            }}
            activeOpacity={0.1}
            onPress={() => { navigation.navigate('MonthCalls', { 'heading': "New Onboarding" }) }}>
            <View
              style={{
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
              }}>
              <Text
                style={{
                  fontSize: FontSize.labelText3,
                  // color: Colors.bluetheme,
                  color: themecolor.BLUEWHITE,
                  fontFamily: FontFamily.Popinssemibold,
                  textAlign: 'center'
                }}>{monthCalls6}</Text>
              <Text
                style={{
                  fontSize: FontSize.SMALL8,
                  // color: Colors.black,
                  color: themecolor.TXTWHITE,
                  fontFamily: FontFamily.PopinsMedium,
                }}>New onboarding</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
            }}
            activeOpacity={0.1}
            onPress={() => { navigation.navigate('MonthCalls', { 'heading': "Telephonic Orders" }) }}>
            <View
              style={{
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
              }}>
              <Text
                style={{
                  fontSize: FontSize.labelText3,
                  // color: Colors.bluetheme,
                  color: themecolor.BLUEWHITE,
                  fontFamily: FontFamily.Popinssemibold,
                  textAlign: 'center'
                }}>{monthCalls7}</Text>
              <Text
                style={{
                  fontSize: FontSize.SMALL8,
                  // color: Colors.black,
                  color: themecolor.TXTWHITE,
                  fontFamily: FontFamily.PopinsMedium,
                }}>Telephonic orders</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
}
