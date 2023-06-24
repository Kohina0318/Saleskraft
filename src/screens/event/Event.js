import React, { useState } from 'react';
import CalendarPicker from 'react-native-calendar-picker';
import styles from '../../assets/css/styleEvent';
import CreateButton from '../../components/shared/CreateButton';
import { getAllevent } from '../../repository/event/eventRepository';
import { useFocusEffect } from '@react-navigation/native';
import moment from 'moment';
import LoaderAllInOne from '../../components/shared/Loader';
import ManagerEvent from './ManagerEvent';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';
import Header_2 from '../../components/shared/Header_2';
import {
  StatusBar,
  View,
  BackHandler,
  Dimensions,
  // Text,
  // ScrollView,
  // TouchableOpacity,
  // Image,
} from 'react-native';
const { height, width } = Dimensions.get('window')

export default function Events(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const startDate = selectedStartDate ? selectedStartDate.toString() : '';
  // console.log('selected Start Date..', startDate);
  const [allEventData, setAllEventData] = useState([]);
  const [getColors, setAllColors] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loader, setLoader] = useState(true);
  const [customDate, setCustomDate] = useState(moment().startOf('month').format('YYYY-MM-DD'))

  // alert(customDate)

  const onDateChange = date => {
    // alert(date)
    setSelectedStartDate(date);
    setRefresh(!refresh);
  };

  // console.log('customDatesStyles --- 51', getColors);

  const allEvent = async () => {
    // alert('hellllllooo')
    async function getDateInFun(datee) {
      let yy = datee.getFullYear();
      let mm = datee.getMonth() + 1;
      if (mm < 10) {
        mm = `0${mm}`;
      }
      let dd = datee.getDate();
      if (dd < 10) {
        dd = `0${dd}`;
      }
      var finalDate = `${yy}-${mm}-${dd}`;
      return finalDate;
      // console.log("finalDate========",finalDate)
    }

    var res = await getAllevent(
      `${await getDateInFun(new Date(selectedStartDate))}`,
    );
    // setCustomDate(await getDateInFun(new Date(selectedStartDate)))
    // console.log('res================== Line 65---->,res', res);
    // console.log('Get All EveNT..>>:', res);
    // New Portion Start
    let today = moment();
    let day = today.clone().startOf('month');
    let customDatesStyles = [];
    while (day.add(1, 'day').isSame(today, 'month')) {
      res.data.forEach(item => {
        if (item.EventStatus === 1) {
          customDatesStyles.push({
            date: new Date(item.EventDate),
            style: { backgroundColor: '#ff7c17' },
            textStyle: { color: '#fff' }, // sets the font color
            containerStyle: [], // extra styling for day container
            allowDisabled: true, // allow custom style to apply to disabled dates
          });
        } else if (item.EventStatus === 2) {
          customDatesStyles.push({
            date: new Date(item.EventDate),
            style: { backgroundColor: '#1ecc91' },
            textStyle: { color: '#fff' }, // sets the font color
            containerStyle: [], // extra styling for day container
            allowDisabled: true, // allow custom style to apply to disabled dates
          });
        } else if (item.EventStatus === 3) {
          // customDatesStyles.push({
          //   date: new Date(item.EventDate),
          //   // Random colors
          //   style: { backgroundColor: '#ff1717' },
          //   textStyle: { color: '#fff' }, // sets the font color
          //   containerStyle: [], // extra styling for day container
          //   allowDisabled: true, // allow custom style to apply to disabled dates
          // });
        } else {

        }
      });
    }
    setAllColors(customDatesStyles);
    setAllEventData(res.data);
    setLoader(false)
  };

  useFocusEffect(
    React.useCallback(() => {
      allEvent();
      // setLoader(false);
      // temporaryColor()
    }, [refresh]),
  );

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

  function handleBackButtonClick() {
    try {
      if (props.route.params.navigateFrom === 'action') {
        props.navigation.goBack();
      } else {
        props.navigation.reset({
          index: 0,
          routes: [{ name: 'NewDashboard' }],
        });
      }
    } catch (e) {
      props.navigation.goBack();
    }
    return true;
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
      <View style={{ backgroundColor: themecolor.THEMECOLOR }}>
        <StatusBar translucent backgroundColor="transparent" />
        {/* <View> */}
        <View style={{ ...styles.header, backgroundColor: themecolor.HEADERTHEMECOLOR, }}>
          <Header_2 title="Events" onPress={() => handleBackButtonClick()} />
          {/* <View style={{ ...styles.view3, backgroundColor: themecolor.HEADERTHEMECOLOR }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => handleBackButtonClick()}>
              <Image
                source={require('../../assets/images/back.png')}
                style={styles.WH}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
            <View style={{ ...styles.widths1, }}>
              <Text style={{ ...styles.eventstyle, backgroundColor: themecolor.HEADERTHEMECOLOR, }}>Events</Text>
            </View>
          </View> */}
          <CalendarPicker
            selectedDayColor="#fff"
            selectedDayTextColor="#3862f8"
            textStyle={styles.txtstyle}
            onDateChange={onDateChange}
            customDatesStyles={getColors}
            onMonthChange={async e => {
              // alert(new Date(e))
              setCustomDate(moment(e).format('YYYY-MM-DD'))
              // alert(e)
              async function getDateInFun(datee) {
                let yy = datee.getFullYear();
                let mm = datee.getMonth() + 1;
                if (mm < 10) {
                  mm = `0${mm}`;
                }
                let dd = datee.getDate();
                if (dd < 10) {
                  dd = `0${dd}`;
                }
                var finalDate = `${yy}-${mm}-${dd}`;
                return finalDate;
                // console.log("finalDate========",finalDate)
              }
              // setCustomDate(await getDateInFun(new Date(e)))
              var res = await getAllevent(
                `${await getDateInFun(new Date(e))}`,
              );
              // alert(await getDateInFun(new Date(e)));
              // console.log('res================== Line 65---->,res', res);
              // console.log('Get All EveNT..>>:', res);

              // New Portion Start
              let today = moment();
              let day = today.clone().startOf('month');
              let customDatesStyles = [];
              while (day.add(1, 'day').isSame(today, 'month')) {
                res.data.forEach(item => {
                  //console.log("itm 800000000000000-->", item.EventStatus);

                  if (item.EventStatus === 1) {
                    customDatesStyles.push({
                      // date: day.clone(),
                      date: new Date(item.EventDate),
                      // Random colors
                      style: { backgroundColor: '#ff7c17' },
                      textStyle: { color: '#fff' }, // sets the font color
                      containerStyle: [], // extra styling for day container
                      allowDisabled: true, // allow custom style to apply to disabled dates
                    });
                  } else if (item.EventStatus === 2) {
                    customDatesStyles.push({
                      date: new Date(item.EventDate),
                      // Random colors
                      style: { backgroundColor: '#1ecc91' },
                      textStyle: { color: '#fff' }, // sets the font color
                      containerStyle: [], // extra styling for day container
                      allowDisabled: true, // allow custom style to apply to disabled dates
                    });
                  } else if (item.EventStatus === 3) {
                    // customDatesStyles.push({
                    //   date: new Date(item.EventDate),
                    //   // Random colors
                    //   style: { backgroundColor: '#ff1717' },
                    //   textStyle: { color: '#fff' }, // sets the font color
                    //   containerStyle: [], // extra styling for day container
                    //   allowDisabled: true, // allow custom style to apply to disabled dates
                    // });
                  } else {
                  }
                });
              }
              setAllColors(customDatesStyles);
              setAllEventData(res.data);
            }}
          />
        </View>
        <View style={{ height: height * 0.45 }} >
          <ManagerEvent setLoader={setLoader} customDate={customDate} />
        </View>
      </View>

      <CreateButton onPress={() => props.navigation.push('CreateEvent')} />
      {/* </View> */}
    </>
  );
}
