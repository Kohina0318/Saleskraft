import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Dimensions,
} from 'react-native';
import NewDropdown from '../shared/NewDropdown';
import styles from '../../assets/css/stylesReport'
import moment from 'moment';
import { getAttendance } from '../../repository/report/ReportRepository';
import AttendanceData from './AttendanceData';
const { width } = Dimensions.get('window')
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';

export default function AttendanceReport(props) {

  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()

  var attendanceSelect = [
    'Current Month',
    'FortNight',
    'Last Month',
    'Half Yearly',
    'Yearly',
  ];

  const [attendanceData, setAttendanceData] = useState({});
  const [selectedAttendanceItem, setSelectedAttendanceItem] = useState('');
  const [placeholder, setPlaceholder] = useState('Current Month');
  const [newOptions, setNewOptions] = useState(attendanceSelect);
  const [totalDaysPer, setTotalDaysPer] = useState(". . .")
  const [presentDaysPer, setPresentDaysPer] = useState(". . .")
  const [partiallyDaysPer, setPartiallyDaysPer] = useState(". . .")
  const [weekOffDaysPer, setWeekOfDaysPer] = useState(". . .")
  const [leaveDaysPer, setLeaveDaysPer] = useState(". . .")

  useEffect(() => {
    if (placeholder == 'Current Month') {
      attendanceSelect = [
        'FortNight',
        'Last Month',
        'Half Yearly',
        'Yearly',
      ]
    } else if (placeholder == 'FortNight') {
      attendanceSelect = [
        'Current Month',
        'Last Month',
        'Half Yearly',
        'Yearly',
      ]
    } else if (placeholder == 'Last Month') {
      attendanceSelect = [
        'Current Month',
        'FortNight',
        'Half Yearly',
        'Yearly',
      ]
    } else if (placeholder == 'Half Yearly') {
      attendanceSelect = [
        'Current Month',
        'FortNight',
        'Last Month',
        'Yearly',
      ]
    } else if (placeholder == 'Yearly') {
      attendanceSelect = [
        'Current Month',
        'FortNight',
        'Last Month',
        'Half Yearly',
      ]
    }
    setNewOptions(attendanceSelect)
  }, [placeholder])

  const handleAttendanceReport = async (st, ed) => {
    try {
      console.log(
        'selectedAttendanceItem...<<<attendance:',
        selectedAttendanceItem,
      );
      console.log("oiygfdsdfghjk", st, ed, props.EmployeeId)
      var res = await getAttendance(st, ed, props.EmployeeId);
      console.log('Attendance Report ....page in Report..... line 700', res);
      // alert(res.statusCode)
      if (res.statusCode === 200) {
        setAttendanceData(res.data);
        setTotalDaysPer(`${res.data.TotalDays}`)
        setPresentDaysPer(`${res.data.PresentDays} (${res.data.PresentDaysPercentage}%)`)
        setPartiallyDaysPer(`${res.data.PartiallyDays} (${res.data.PartiallyDaysPercentage}%)`)
        setWeekOfDaysPer(`${res.data.WeekOffDays} (${res.data.WeekOffDaysPercentage}%)`)
        setLeaveDaysPer(`${res.data.LeaveDays} (${res.data.LeaveDaysPercentage}%)`)
      }
    } catch (e) {
      console.log('Attendance Report....page in Report.>>:', e);
    }
  };

  React.useEffect(() => {
    var strtdat = moment().startOf('month').format('DD-MM-YYYY');
    var enddat = moment().format('DD-MM-YYYY');
    handleAttendanceReport(strtdat, enddat);
  }, [props.EmployeeId])

  const AttendanceSelectedDate = () => {
    if (selectedAttendanceItem == 'Current Month') {
      // alert(selectedAttendanceItem)
      const startOfMonth = moment().startOf('month').format('DD-MM-YYYY');
      const endOfMonth = moment().format('DD-MM-YYYY');
      console.log('Current Month....Attendance>>:', startOfMonth, endOfMonth);
      handleAttendanceReport(startOfMonth, endOfMonth);
    } else if (selectedAttendanceItem == 'FortNight') {
      const startOfMonth = moment().subtract(15, 'days').format('DD-MM-YYYY');
      const endOfMonth = moment().format('DD-MM-YYYY');
      console.log('Fortnight....Attendance>>:', startOfMonth, endOfMonth);
      handleAttendanceReport(startOfMonth, endOfMonth);
    } else if (selectedAttendanceItem == 'Last Month') {
      const startOfMonth = moment()
        .subtract(1, 'months')
        .startOf('month')
        .format('DD-MM-YYYY');
      const endOfMonth = moment()
        .subtract(1, 'months')
        .endOf('month')
        .format('DD-MM-YYYY');
      console.log('Last Month....Attendance>>:', startOfMonth, endOfMonth);
      handleAttendanceReport(startOfMonth, endOfMonth);
    } else if (selectedAttendanceItem == 'Half Yearly') {
      // alert(selectedAttendanceItem)
      // const startOfMonth = moment().subtract(6,'months').startOf('month').format('DD-MM-YYYY');
      const startOfMonth = moment().subtract(6, 'months').format('DD-MM-YYYY');
      const endOfMonth = moment().format('DD-MM-YYYY');
      console.log('Half Yearly....Attendance>>:', startOfMonth, endOfMonth);
      handleAttendanceReport(startOfMonth, endOfMonth);
    } else if (selectedAttendanceItem == 'Yearly') {
      // alert(selectedAttendanceItem)
      const startOfMonth = moment().subtract(12, 'months').format('DD-MM-YYYY');
      const endOfMonth = moment().format('DD-MM-YYYY');
      console.log('Yearly....Attendance>>:', startOfMonth, endOfMonth);
      handleAttendanceReport(startOfMonth, endOfMonth);
    }
  }

  React.useEffect(() => {
    AttendanceSelectedDate();
  }, [selectedAttendanceItem])

  return (

    <View style={{ width: width * 0.93, justifyContent: 'center', alignSelf: 'center', }}>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          position: 'relative',
        }}>
        <View>
          <Text style={{ ...styles.CardText , color: themecolor.TXTWHITE }}>Attendance Report</Text>
        </View>

        <View style={{ position: 'absolute', right: 0, zIndex: 9999 }}>
          <NewDropdown
            options={newOptions}
            setSelectedItem={setSelectedAttendanceItem}
            toValue={105}
            widthh={115}
            widthPlaceHolder={90}
            widthIcon={10}
            selectedAttendanceItem={selectedAttendanceItem}
            placeholder={placeholder}
            setPlaceholder={setPlaceholder}
          />
        </View>
      </View>
      <View style={{ marginVertical: 3 }} />

      <View style={{ width: width * 0.93,}}>
        <AttendanceData
          TotalDays={totalDaysPer}
          PresentDays={presentDaysPer}
          PartiallyDays={partiallyDaysPer}
          WeekOffDays={weekOffDaysPer}
          LeaveDays={leaveDaysPer}
        />
        {/* <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 8,
              width: width * 0.92,
              flex: 1,
            }}>
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
                  color: Colors.bluetheme,
                  fontFamily: FontFamily.Popinssemibold,
                }}>
                {attendanceData.TotalDays}
                ( {attendanceData.TotalDaysPercentage}%)
              </Text>
              <Text
                style={{
                  fontSize: FontSize.small,
                  color: Colors.black,
                  fontFamily: FontFamily.PopinsMedium,
                }}>
                Total month days
              </Text>
            </View>
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
                  color: Colors.bluetheme,
                  fontFamily: FontFamily.Popinssemibold,
                }}>
                {attendanceData.PresentDays}
                ({attendanceData.PresentDaysPercentage}%)
              </Text>
              <Text
                style={{
                  fontSize: FontSize.small,
                  color: Colors.black,
                  fontFamily: FontFamily.PopinsMedium,
                }}>
                Present days
              </Text>
            </View>
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
                  color: Colors.bluetheme,
                  fontFamily: FontFamily.Popinssemibold,
                }}>
                {attendanceData.PartiallyDays} (
                {attendanceData.PartiallyDaysPercentage}%)
              </Text>
              <Text
                style={{
                  fontSize: FontSize.small,
                  color: Colors.black,
                  fontFamily: FontFamily.PopinsMedium,
                }}>
                Partially Present
              </Text>
            </View>
          </View>

          <View
            style={{
              borderWidth: 0.2,
              borderColor: 'lightgrey',
              width: width * 0.85,
              alignSelf: 'center',
            }}
          />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 8,
              width: width * 0.92,
            }}>
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
                  color: Colors.bluetheme,
                  fontFamily: FontFamily.Popinssemibold,
                }}>
                {attendanceData.WeekOffDays} (
                {attendanceData.WeekOffDaysPercentage}%)
              </Text>
              <Text
                style={{
                  fontSize: FontSize.verysmallText,
                  color: Colors.black,
                  fontFamily: FontFamily.PopinsMedium,
                }}>
                Weekly off
              </Text>
            </View>

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
                  color: Colors.bluetheme,
                  fontFamily: FontFamily.Popinssemibold,
                }}>
                {attendanceData.LeaveDays} (
                {attendanceData.LeaveDaysPercentage}%)
              </Text>
              <Text
                style={{
                  fontSize: FontSize.verysmallText,
                  color: Colors.black,
                  fontFamily: FontFamily.PopinsMedium,
                }}>
                Leave
              </Text>
            </View>
          </View> */}
      </View>

    </View>
  )
}