import React, { useState } from 'react';
import { TouchableOpacity, View, TextInput, Dimensions } from 'react-native';
import moment from 'moment';
import Father from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Colors } from '../../assets/config/Colors';
import { FontSize } from '../../assets/fonts/Fonts';
import { FontFamily } from '../../assets/fonts/FontFamily';
const { width } = Dimensions.get('window');
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';

function DatePickerRange(props) {
  const modes = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(modes).getThemeColor()

  // const [date, setDate] = useState(new Date());
  // const [date1, setDate1] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [mode1, setMode1] = useState('date');
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    // setDate(currentDate);
    console.log(`event===${event}===selectdDate===>${selectedDate}`)
    props.setDuration(currentDate)
    props.setDateValue(currentDate?.toString().slice(1, 15));
  };


  // const onChange1 = (event, selectedDate) => {
  //   const currentDate = selectedDate || date1;
  //   setShow1(Platform.OS === 'ios');
  //   setDate1(currentDate);
  // };

  const showMode = currentMode => {
    setMode(currentMode);
  };

  const showMode1 = currentMode => {
    setMode1(currentMode);
  };

  const showDatepicker = () => {
    setShow(true);
    showMode('date');
  };

  const showDatepicker1 = () => {
    setShow1(true);
    showMode1('date');
  };

  const enumerateDaysBetweenDates = (startDate, endDate) => {
    let now = moment(startDate),
      dates = [];

    while (now.isSameOrBefore(endDate)) {
      dates.push(now.format('M/D/YYYY'));
      now.add(1, 'days');
    }
    return dates;
  };

  // var results = enumerateDaysBetweenDates(date, date1);

  const dateConverter = (startDate, timeEnd) => {
    const newStartDate = new Date(startDate);
    const newEndDate = new Date(timeEnd);
    const one_day = 1000 * 60 * 60 * 24;
    let result
    result = Math.ceil((newEndDate.getTime() - newStartDate.getTime()) / (one_day))
    console.log('date Converter result', result)
    if (result < 0) { return 0 }
    return result
  }

  return (
    <View
      style={{
        // justifyContent: 'space-between',
        flexDirection: 'row',
        width: props.width,
        alignSelf: 'center',
      }}>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        borderWidth: 0.8,
        borderColor: Colors.borderColor,
        color: Colors.grey,
        overflow: 'hidden',
        backgroundColor: themecolor.BOXTHEMECOLOR,
        // backgroundColor: 'red',
        width: '100%',
        borderColor: themecolor.BOXBORDERCOLOR1,
        height: 45
      }}>
        <TouchableOpacity onPress={showDatepicker}>
          <View
            style={{
              width: props.width,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
            }}>

            <TextInput
              editable={false}
              value={props.getDate?.toUTCString().substring(0, 16)}
              label="* Enter Date"
              style={{
                fontSize: FontSize.labelText,
                fontFamily: FontFamily.PopinsMedium,
                height: 40,
                color: Colors.black,
                top: 3,
                width: '100%',
                left: 7,
                color: themecolor.TXTWHITE
              }}
              underlineColor={'transparent'}
              labelStyle={{ fontSize: 11 }}
            />
            <View style={{ position: 'absolute', right: 10, }} >
              <Ionicons
                name="calendar-sharp"
                size={15}
                color={themecolor.TXTWHITE}
              />
              {/* <Father name="calendar" color={Colors.bluetheme} style={{ fontSize: 14 }} /> */}
            </View>
          </View>
        </TouchableOpacity>
        {show && (
          <DateTimePicker
            // minimumDate={new Date()}
            // maximumDate={new Date()}
            {...props}
            testID="dateTimePicker"
            value={props.getDate}
            mode={mode}
            is24Hour={false}
            display="default"
            onChange={onChange}
          />
        )}
      </View>

    </View>
  );
}

DatePickerRange.defaultProps = {
  width: width * 0.9
}

export { DatePickerRange };
