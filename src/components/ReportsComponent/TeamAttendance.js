import React, { useState, useEffect } from 'react'
import { Text, View, Image, TouchableOpacity, Linking, Dimensions } from 'react-native'
import { SERVER_URL } from '../../repository/commonRepository'
import { gettripLocationApi } from '../../repository/trip/tripRepository'
import NewDropdown from '../shared/NewDropdown'
import styles from '../../assets/css/stylesReport'
import moment from 'moment';
import FIcon from 'react-native-vector-icons/FontAwesome';
import { Colors } from '../../assets/config/Colors';
import { getAttendance } from '../../repository/report/ReportRepository';
import AttendanceData from './AttendanceData'
import MI from "react-native-vector-icons/MaterialIcons"
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';
// import { Transition } from 'react-native-reanimated'

const { width } = Dimensions.get('window')

// const transition = (
//   <Transition.Together>
//     <Transition.In type='fade' durationMs={200} />
//     <Transition.Change />
//     <Transition.Out type='fade' durationMs={200} />
//   </Transition.Together>
// )

export default function TeamAttendance(props) {

  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()

  var attendanceSelect = [
    'Current Month',
    'FortNight',
    'Last Month',
    'Half Yearly',
    'Yearly',
  ];

  const [teamData, setTeamData] = useState([])
  const [newOptions, setNewOptions] = useState(attendanceSelect);
  const [placeholder, setPlaceholder] = useState('Current Month');
  const [attendanceData, setAttendanceData] = useState('');
  const [selectedAttendanceItem, setSelectedAttendanceItem] = useState('');
  const [employeeId, setEmployeeId] = useState("")
  const [tempData, setTempData] = useState({})
  const [serverUrl, setServerUrl] = useState('');

  useEffect(() => {
    const tempFun = async () => {
      try {
        const result = await gettripLocationApi("api/getMyTeam?filter=0")
        console.log("RSLT________", result)
        if (result.statusCode == 200) {
          setTeamData(result.data.team)
        }
      } catch (err) {
        console.log("🚀 ~ file: TeamAttendance.js:52 ~ useEffect ~ err", err)

      }

      const url = await SERVER_URL();
      setServerUrl(url)
    }
    tempFun()

  }, [])

  const handleAttendanceReport = async (st, ed, EmployeeId) => {
    // alert(st+'...'+ed)
    try {
      // console.log(
      //   'selectedAttendanceItem...<<<attendance:',
      //   selectedAttendanceItem,
      // );
      // console.log("41>>>>>>>>>>>>>>>>>>>>", st, ed, EmployeeId)
      var res = await getAttendance(st, ed, EmployeeId);
      console.log('Attendance Report ....page in Report..... line 700', res);
      if (res.statusCode === 200) {
        const tempD = res
        setAttendanceData(res.data);
        tempD['emp'] = EmployeeId
        // alert('hhh'+JSON.stringify(tempD))
        setTempData(tempD);

      }
    } catch (e) {
      console.log('Attendance Report....page in Report.>>:', e);
    }
  };

  useEffect(() => {
    if (placeholder == 'Current Month') {
      // alert(placeholder)
      const startOfMonth = moment().startOf('month').format('DD-MM-YYYY');
      const endOfMonth = moment().format('DD-MM-YYYY');
      // console.log('Current Month....Attendance>>:', startOfMonth, endOfMonth, employeeId);
      handleAttendanceReport(startOfMonth, endOfMonth, employeeId);
    } else if (placeholder == 'FortNight') {
      const startOfMonth = moment().subtract(15, 'days').format('DD-MM-YYYY');
      const endOfMonth = moment().format('DD-MM-YYYY');
      // alert(startOfMonth)
      // console.log('Fortnight....Attendance>>:', startOfMonth, endOfMonth, employeeId);
      handleAttendanceReport(startOfMonth, endOfMonth, employeeId);
    } else if (placeholder == 'Last Month') {
      const startOfMonth = moment()
        .subtract(1, 'months')
        .startOf('month')
        .format('DD-MM-YYYY');
      const endOfMonth = moment()
        .subtract(1, 'months')
        .endOf('month')
        .format('DD-MM-YYYY');
      // console.log('Last Month....Attendance>>:', startOfMonth, endOfMonth);
      handleAttendanceReport(startOfMonth, endOfMonth, employeeId);
    } else if (placeholder == 'Half Yearly') {
      // alert(selectedAttendanceItem)
      // const startOfMonth = moment().subtract(6,'months').startOf('month').format('DD-MM-YYYY');
      const startOfMonth = moment().subtract(6, 'months').format('DD-MM-YYYY');
      const endOfMonth = moment().format('DD-MM-YYYY');
      // console.log('Half Yearly....Attendance>>:', startOfMonth, endOfMonth);
      handleAttendanceReport(startOfMonth, endOfMonth, employeeId);
    } else if (placeholder == 'Yearly') {
      // alert(selectedAttendanceItem)
      const startOfMonth = moment().subtract(12, 'months').format('DD-MM-YYYY');
      const endOfMonth = moment().format('DD-MM-YYYY');
      // console.log('Yearly....Attendance>>:', startOfMonth, endOfMonth);
      handleAttendanceReport(startOfMonth, endOfMonth, employeeId);
    }
  }, [placeholder, employeeId])

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

  React.useEffect(() => {
    async function temp() {
      setBaseUrl(await SERVER_URL())
    }
    temp()
  }, [])



  const AccordianList = ({ EmployeeId, FirstName, LastName, Phone, ProfilePicture }) => {

    console.log("ProfilePicture", ProfilePicture)
    const [expanded, setExpanded] = useState(true)

    const handleChange = (empId) => {
      // alert(empId)
      setEmployeeId(empId)
      setExpanded(!expanded)
    }

    const onPressMobileNumClick = (Phone) => {
      let phoneNumber = '';
      if (Platform.OS === 'android') {
        phoneNumber = `tel:${Phone}`;
      } else {
        phoneNumber = `telprompt:${Phone}`;
      }
      Linking.openURL(phoneNumber);
    }


    return (
      <View style={{ margin: 10 }}>
        {ProfilePicture != null && ProfilePicture != '' ?
          (<><TouchableOpacity onPress={() => handleChange(EmployeeId)} style={{ alignItems: "center", flexDirection: "row", opacity: 0.9 }}>
            <View style={{ marginRight: 5 }} >
              <Image
                style={{
                  width: 45,
                  height: 45,
                  borderRadius: 50
                }}
                source={{
                  uri: `${serverUrl}uploads/2/${ProfilePicture}`,
                }}
              /></View>
            <View>
              <Text style={{ color: themecolor.TXTWHITE , fontWeight: "500" }}>{`${FirstName?.slice(0, 1).toUpperCase()}${FirstName?.slice(1).toLowerCase()} ${LastName
                ?.slice(0, 1)
                .toUpperCase()}${LastName?.slice(1).toLowerCase()}`}</Text>
              <View style={{ flexDirection: "row", alignItems: "center" }} >
                <FIcon name="mobile-phone" size={19} color={Colors.bluetheme} style={{ marginRight: 5 }} />
                <Text style={{ color: themecolor.TXTWHITE }}>{Phone}</Text>
              </View>
            </View>
            <MI name={(tempData.emp === EmployeeId && expanded) ? 'expand-less' : 'expand-more'} color={(tempData.emp === EmployeeId && expanded) ? '#3B64F8' : themecolor.TXTWHITE} size={30} style={{ marginLeft: "auto" }} />
          </TouchableOpacity>
            {(tempData.emp === EmployeeId && expanded) &&
              <View style={{
                // borderTopWidth: 1,
                // borderBottomWidth: 1,
                // borderBottomColor: "#ecf0f1",
                // borderTopColor: "#ecf0f1",
                marginVertical: 5,
              }}>
                <AttendanceData
                  TotalDays={`${attendanceData.TotalDays} (${attendanceData.TotalDaysPercentage}%)`}
                  PresentDays={`${attendanceData.PresentDays} (${attendanceData.PresentDaysPercentage}%)`}
                  PartiallyDays={`${attendanceData.PartiallyDays} (${attendanceData.PartiallyDaysPercentage}%)`}
                  WeekOffDays={`${attendanceData.WeekOffDays} (${attendanceData.WeekOffDaysPercentage})`}
                  LeaveDays={`${attendanceData.LeaveDays} (${attendanceData.LeaveDaysPercentage})`}
                  width={width * 0.88}
                />
              </View>
            }
          </>
          ) : (<>
            <TouchableOpacity onPress={() => handleChange(EmployeeId)} style={{ alignItems: "center", flexDirection: "row" }}>
              <View style={{ marginRight: 5 }}>
                <Image
                  source={require('../../assets/images/dummyuser.png')}
                  style={{
                    width: 45,
                    height: 45,
                    borderRadius: 50
                  }}
                /></View>
              <View>
                <Text style={{ color: "#000", fontWeight: "500", color: themecolor.TXTWHITE }}>{`${FirstName?.slice(0, 1).toUpperCase()}${FirstName?.slice(1).toLowerCase()} ${LastName
                  ?.slice(0, 1)
                  .toUpperCase()}${LastName?.slice(1).toLowerCase()}`}</Text>
                <View style={{ flexDirection: "row", alignItems: "center" }} >
                  <FIcon name="mobile-phone" size={19} color={Colors.bluetheme} style={{ marginRight: 5 }} />
                  <TouchableOpacity onPress={() => { onPressMobileNumClick(Phone) }}>
                    <Text style={{ color: "#000", color: themecolor.TXTWHITE }}>{Phone}</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <MI name={(tempData.emp === EmployeeId && expanded) ? 'expand-less' : 'expand-more'} color={(tempData.emp === EmployeeId && expanded) ? '#3B64F8' : themecolor.TXTWHITE} size={30} style={{ marginLeft: "auto" }} />
            </TouchableOpacity>
            {(tempData.emp === EmployeeId && expanded) &&
              <View style={{
                // borderTopWidth: 1,
                // borderBottomWidth: 1,
                // borderBottomColor: "#ecf0f1",
                // borderTopColor: "#ecf0f1",
                marginVertical: 5,
              }}>
                <AttendanceData
                  TotalDays={`${attendanceData.TotalDays} (${attendanceData.TotalDaysPercentage}%)`}
                  PresentDays={`${attendanceData.PresentDays} (${attendanceData.PresentDaysPercentage}%)`}
                  PartiallyDays={`${attendanceData.PartiallyDays} (${attendanceData.PartiallyDaysPercentage}%)`}
                  WeekOffDays={`${attendanceData.WeekOffDays} (${attendanceData.WeekOffDaysPercentage})`}
                  LeaveDays={`${attendanceData.LeaveDays} (${attendanceData.LeaveDaysPercentage})`}
                  width={width * 0.88}
                />
              </View>
            }
          </>
          )}
      </View>
    )
  }

  return (
    <View>
      {teamData.length > 0 ?
        <>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
              position: 'relative',
              marginTop: 13,
              marginBottom: 3
            }}>
            <View>
              <Text style={{ ...styles.CardText, color: themecolor.TXTWHITE, }}>Team Attendance Report</Text>
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

          <View style={{
            marginTop: 5, padding: 5, backgroundColor: "#fff", borderRadius: 10, borderRadius: 10,
            borderWidth: 1,
            borderColor: '#E9E9E9',
            backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR1
          }}>
            {teamData.map((item, index) => {
              return (
                <View>
                  <AccordianList
                    EmployeeId={item.EmployeeId}
                    Phone={item.Phone}
                    FirstName={item.FirstName}
                    LastName={item.LastName}
                    ProfilePicture={item.ProfilePicture} />
                </View>
              )
            })}
          </View></> : <></>}
    </View>)
}
