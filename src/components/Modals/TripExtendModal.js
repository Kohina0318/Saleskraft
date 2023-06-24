import React, { useEffect, useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';

import StyleCss from '../../assets/css/styleOutlet';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from '../../assets/css/styleTrip';
import { FontFamily } from '../../assets/fonts/FontFamily';
import { Colors } from '../../assets/config/Colors';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default ConfirmationModal = props => {
  const modes = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(modes).getThemeColor()

  const navigation = useNavigation();
  const [modalVisible3, setModalVisible3] = useState(true);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');
  const [miniDate, setMiniDate] = useState();
  console.log('tripstatrt date is ', props.tripstartdate)
  const showDatepicker = () => {

    setShow(true);
    showMode('date');
  };

  useEffect(() => {
    // let dd = props.tripstartdate.split('-')[0]
    // let mm = props.tripstartdate.split('-')[1]
    // let yy = props.tripstartdate.split('-')[2]
    // let strtdt = new Date();
    // strtdt.setUTCDate(dd)
    // strtdt.setUTCMonth(mm-1)
    // strtdt.setUTCFullYear(yy)
    // setMiniDate(strtdt)
    let dd1 = props.tripenddate.split('-')[0]
    let mm1 = props.tripenddate.split('-')[1]
    let yy1 = props.tripenddate.split('-')[2]
    let strtdt1 = new Date();
    strtdt1.setUTCDate(dd1)
    strtdt1.setUTCMonth(mm1 - 1)
    strtdt1.setUTCFullYear(yy1)
    setDate(strtdt1)
  }, [])

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    props.setDate1(currentDate.toISOString().slice(0, 10));
  };

  const showMode = currentMode => {
    setMode(currentMode);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible3}>
      <View style={StyleCss.centeredView}>
        <View style={{ ...StyleCss.modalView, backgroundColor: themecolor.RB2 }}>
          <View style={{ ...StyleCss.ModalViewWidth, paddingBottom: 0 }}>
            <View
              style={{ ...StyleCss.ModelVideoCenter, alignSelf: 'flex-start' }}>
              <Text style={{ ...StyleCss.textStyleDone, color: themecolor.TXTWHITE }}>
                Extend trip to
              </Text>
            </View>
            <View style={StyleCss.MV2} />
            {/* Date start here=== */}
            <View>
              <View style={{ width: '100%' }}>
                <View style={{ width: '100%' }}>
                  <TouchableOpacity onPress={showDatepicker}>
                    <View
                      style={{
                        ...styles.dpview,
                        width: '100%',
                        borderWidth: 1,
                        backgroundColor: themecolor.BOXTHEMECOLOR,
                        borderColor: themecolor.BOXBORDERCOLOR1,
                      }}>
                      <TextInput
                        editable={false}
                        value={date.toUTCString().substring(0, 16)}
                        style={{
                          top: 3,
                          left: 5,
                          fontSize: 12,
                          width: '100%',
                          fontFamily: FontFamily.Popinssemibold,
                          color: themecolor.TXTWHITE
                        }}
                        labelStyle={{ fontSize: 12 }}
                      />
                      {/* <Image
                        source={require('../../assets/images/addoutlet/calendar.png')}
                        resizeMode="center"
                        style={{
                          height: 14,
                          width: 14,
                          position: 'absolute',
                          right: 10,
                        }}
                      /> */}
                        <Ionicons
                        name="calendar-sharp"
                        size={15}
                        color={themecolor.TXTWHITE}
                        style={{ position: 'absolute', right: 10 }}
                      />
                    </View>
                  </TouchableOpacity>

                  {show && (
                    <DateTimePicker
                      minimumDate={date}
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
            </View>
            <View>
              <View style={{ ...styles.tx1, width: '100%' }}>
                <View style={{ height: 10 }}></View>
                <View style={{
                  ...styles.ti,
                  backgroundColor: themecolor.BOXTHEMECOLOR,
                  borderColor: themecolor.BOXBORDERCOLOR1,
                }}>
                  <TextInput
                    value={props.reason}
                    multiline={true}
                    numberOfLines={3}
                    textAlignVertical={'top'}
                    onChangeText={text => props.setReason(text)}
                    style={{ width: '100%', borderRadius: 15, left: 5 , color: themecolor.TXTWHITE}}
                    placeholder="Enter reason"
                    placeholderTextColor={'grey'}
                  />
                </View>
              </View>
            </View>

            <View
              style={{ ...StyleCss.FLexCenter, justifyContent: 'flex-start' }}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={props.onConfirm}
              // onPress={() => setModalVisible2(!modalVisible2)}
              >
                <View
                  style={{ ...StyleCss.ModelDoneButton, height: 30, width: 70,backgroundColor:themecolor.HEADERTHEMECOLOR }}>
                  <Text style={StyleCss.textStyleDone}>Submit</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.5}
                // onPress={() => handleClickOnDone()}
                onPress={() => props.setmodalVisible2(false)}>
                <View
                  style={{
                    ...StyleCss.ModelDoneButton,
                    backgroundColor: 'white',
                    height: 30,
                    width: 70,
                  }}>
                  <Text style={{ ...StyleCss.textStyleDone, color: 'black' }}>
                    Cancel
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};
