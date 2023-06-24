import React, { useState } from 'react';
import { TouchableOpacity, View, TextInput, Dimensions } from 'react-native';
import Father from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from '../../assets/css/styleCreateTour';
// import moment from 'moment';
const { width } = Dimensions.get('window');


function ReusableDatePicker(props) {

  const [date, setDate] = useState(new Date());
  // const [date1, setDate1] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [mode1, setMode1] = useState('date');
  const [show, setShow] = useState(false);
  // const [show1, setShow1] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
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

  // const showDatepicker1 = () => {
  //   setShow1(true);
  //   showMode1('date');
  // };

  // const enumerateDaysBetweenDates = (startDate, endDate) => {
  //   // console.log('StartDate', startDate);
  //   // console.log('EndDate', endDate);
  //   let now = moment(startDate),
  //     dates = [];

  //   while (now.isSameOrBefore(endDate)) {
  //     dates.push(now.format('M/D/YYYY'));
  //     now.add(1, 'days');
  //   }
  //   return dates;
  // };

  // var results = enumerateDaysBetweenDates(date, date1);
  // console.log('Results in Dates====60', results);


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
    <View style={styles.view}>
      <View style={{ ...styles.textContainer }}>
        <TouchableOpacity onPress={showDatepicker}>
          <View style={{ ...styles.view1, width: props.width }}>
            <TextInput
              editable={false}
              value={date.toUTCString().substring(0, 16)}
              // value={arrDate[0]}
              label="* Enter Date"
              style={styles.textStyleText}
              underlineColor={'transparent'}
              labelStyle={styles.fontsize}
            />

            <Father name="calendar" style={styles.calendar} />
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
  );
}

ReusableDatePicker.defaultProps = {
  width: width * 0.92
}

export { ReusableDatePicker };
