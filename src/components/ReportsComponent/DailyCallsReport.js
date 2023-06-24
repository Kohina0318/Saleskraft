import { View, Text, Dimensions, TouchableOpacity, } from 'react-native'
import React, { useState, useEffect } from 'react'
import { FontFamily } from '../../assets/fonts/FontFamily'
import { FontSize } from '../../assets/fonts/Fonts';
import styles from '../../assets/css/stylesDashboard';
const { width } = Dimensions.get('window')
import moment from 'moment';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';
import { getDailyCalls } from '../../repository/report/ReportRepository';
import { useNavigation } from '@react-navigation/native';

export default function DailyCallsReport(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  // console.log('hhhhhhhhhhh',props.dailyCalls1)
  const [dailyCalls, setDailyCalls] = useState('');
  const [dailyDate, setDailyDate] = useState('');
  const network = useSelector(state => state.network);
  const [dailyCalls1, setDailyCalls1] = useState('. . .');
  const [dailyCalls2, setDailyCalls2] = useState('. . .');
  const [dailyCalls3, setDailyCalls3] = useState('. . .');
  const [dailyCalls4, setDailyCalls4] = useState('. . .');
  const [dailyCalls5, setDailyCalls5] = useState('. . .');
  const [dailyCalls6, setDailyCalls6] = useState('. . .');
  const [dailyCalls7, setDailyCalls7] = useState('. . .');
  const navigation = useNavigation()
  
  var scheduleCall = 0;
  scheduleCall = parseFloat(dailyCalls.ScheduleCallsInPercentage).toFixed(2);
  var totalCallsSide = 0;
  totalCallsSide = parseFloat(dailyCalls.TotalCallsPercentage).toFixed(2);
  var productiveCalls = 0;
  productiveCalls = parseFloat(dailyCalls.ProductiveCallsPercentage).toFixed(2);
  var nonVisitOutlets = 0;
  nonVisitOutlets = parseFloat(dailyCalls.NonVisitOutletsPercentage).toFixed(2);
  var zeroBillingOutlets = 0;
  zeroBillingOutlets = parseFloat(dailyCalls.ZeroBillingOutletsPercentage).toFixed(2);

  const handleDailyCalls = async d => {
    if (network) {
      try {
        // props.setLoader(true)
        var result = await getDailyCalls(d);
        // console.log('Daily Calls....>>>:', result);
        if (result.statusCode == 200) {
          setDailyCalls(result.data);
          setDailyCalls1(result.data.ScheduleCalls);
          setDailyCalls2(
            `${
              result.data.TotalCalls
            }(${result.data.TotalCallsPercentage.toFixed(2)}%)`,
          );
          setDailyCalls3(
            `${
              result.data.ProductiveCalls
            }(${result.data.ProductiveCallsPercentage.toFixed(2)}%)`,
          );
          setDailyCalls4(
            `${
              result.data.NonVisitOutlets
            } (${result.data.NonVisitOutletsPercentage.toFixed(2)}%)`,
          );
          setDailyCalls5(
            `${
              result.data.ZeroBillingOutlets
            } (${result.data.ZeroBillingOutletsPercentage.toFixed(2)}%)`,
          );
          setDailyCalls6(`${result.data.NewOnBoarding}`);
          setDailyCalls7(`${result.data.TelephonicOrder}`);
        }
      } catch (e) {
        console.log('Error Daily Calls Api.....', e);
      }
      // props.setLoader(false);
    }
  };
  
  useEffect(() => {
    if (dailyDate == 0) {
      const date = moment().format('YYYY-MM-DD');
      handleDailyCalls(date);
      // const t = moment().format('YYYY-MM-DD');
      // handleScheduleCalls(t)
    } else {
      const date1 = moment().subtract(1, 'days').format('DD-MM-YYYY');
      // console.log('ffffffffffff', date);
      handleDailyCalls(date1);
    }
  }, [dailyDate, network]);
  
  return (
    <>
      <View style={styles.DailyCallView}>
        <View>
          <Text style={{ ...styles.CardTextDC, color: themecolor.TXTWHITE }}>Daily calls</Text>
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
            onPress={() =>
              { 
                // if(dailyCalls1 != '. . .'){
                  navigation.navigate('ScheduleCall',{'heading': "Schedule Calls"})
             }}
          >
            <Text
              style={{
                fontSize: FontSize.labelText3,
                // color: Colors.bluetheme,
                color: themecolor.BLUEWHITE,
                fontFamily: FontFamily.Popinssemibold,
                textAlign:'center'
              }}>
              {dailyCalls1}
            </Text>
            <Text
              style={{
                fontSize: FontSize.SMALL8,
                // color: Colors.black,
                color: themecolor.TXTWHITE,
                fontFamily: FontFamily.PopinsMedium,
              }}>Schedule Call</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
            }}
            activeOpacity={0.1}
            // onPress={() =>
            //   { 
            //     if(props.dailyCalls2 != '. . .'){
            //   navigation.navigate('Calls', { 'heading': "Total Calls",'count': props.dailyCalls.TotalCalls,
            //   data: props.dailyCalls.TotalCallsData,
            //   'view': true })}
            // }}
            onPress={() =>
            {navigation.navigate('ScheduleCall',{'heading': "Total Calls"})}}
            >
            <Text
              style={{
                fontSize: FontSize.labelText3,
                // color: Colors.bluetheme,
                color: themecolor.BLUEWHITE,
                fontFamily: FontFamily.Popinssemibold,
                textAlign:'center'
              }}>{dailyCalls2}
            </Text>
            <Text
              style={{
                fontSize: FontSize.SMALL8,
                // color: Colors.black,
                color: themecolor.TXTWHITE,
                fontFamily: FontFamily.PopinsMedium,
              }}>Total Calls</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
            }}
            activeOpacity={0.1}
            onPress={() =>
              {navigation.navigate('ScheduleCall',{'heading': "Productive Calls"})}}>
            <Text
              style={{
                fontSize: FontSize.labelText3,
                // color: Colors.bluetheme,
                color: themecolor.BLUEWHITE,
                fontFamily: FontFamily.Popinssemibold,
                textAlign:'center'
              }}>{dailyCalls3}</Text>
            <Text
              style={{
                fontSize: FontSize.SMALL8,
                // color: Colors.black,
                color:themecolor.TXTWHITE,
                fontFamily: FontFamily.PopinsMedium,
              }}>Productive Calls</Text>
          </TouchableOpacity>
        </View>

        <View style={{
            borderWidth: 0.2,
            borderColor: 'lightgrey',
            width: width * 0.85,
            alignSelf: 'center',}}/>

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
            onPress={() =>
              {navigation.navigate('ScheduleCall',{'heading': "Non-Visit Outlets"})}}>
            <Text
              style={{
                fontSize: FontSize.labelText3,
                // color: Colors.bluetheme,
                color: themecolor.BLUEWHITE,
                fontFamily: FontFamily.Popinssemibold,
                textAlign:'center'
              }}>{dailyCalls4}</Text>
            <Text
              style={{
                fontSize: FontSize.SMALL8,
                // color: Colors.black,
                color: themecolor.TXTWHITE,
                fontFamily: FontFamily.PopinsMedium,
              }}>Non-visit Outlets</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
            }}
            activeOpacity={0.1}
            onPress={() =>
              {navigation.navigate('ScheduleCall',{'heading': "Zero Billing Outlets"})}}>
            <Text
              style={{
                fontSize: FontSize.labelText3,
                // color: Colors.bluetheme,
                color: themecolor.BLUEWHITE,
                fontFamily: FontFamily.Popinssemibold,
                textAlign:'center'
              }}>{dailyCalls5}</Text>
            <Text
              style={{
                fontSize: FontSize.SMALL8,
                // color: Colors.black,
                color: themecolor.TXTWHITE,
                fontFamily: FontFamily.PopinsMedium,
              }}>Zero billing outlet</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
            }}
            activeOpacity={0.1}
            onPress={() =>
              {navigation.navigate('ScheduleCall',{'heading': "New Onboarding"})}}>
            <Text
              style={{
                fontSize: FontSize.labelText3,
                // color: Colors.bluetheme,
                color: themecolor.BLUEWHITE,
                fontFamily: FontFamily.Popinssemibold,
                textAlign:'center'
              }}>{dailyCalls6}</Text>
            <Text
              style={{
                fontSize: FontSize.SMALL8,
                // color: Colors.black,
                color: themecolor.TXTWHITE,
                fontFamily: FontFamily.PopinsMedium,
              }}>New onboarding</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
            }}
            activeOpacity={0.1}
            onPress={() =>
              {navigation.navigate('ScheduleCall',{'heading': "Telephonic Orders"})}}>
            <Text
              style={{
                fontSize: FontSize.labelText3,
                // color: Colors.bluetheme,
                color: themecolor.BLUEWHITE,
                fontFamily: FontFamily.Popinssemibold,
                textAlign:'center'
              }}>{dailyCalls7}</Text>
            <Text
              style={{
                fontSize: FontSize.SMALL8,
                // color: Colors.black,
                color: themecolor.TXTWHITE,
                fontFamily: FontFamily.PopinsMedium,
              }}>Telephonic orders</Text>
          </TouchableOpacity>
        </View>

      </View>
    </>
  )
}


