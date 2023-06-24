import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import React, { useState } from 'react';
import { Colors } from '../../assets/config/Colors';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Video from 'react-native-video';
import styles from '../../assets/css/styleAddexpense';

const AddExpenses = ({ navigation }) => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);

  const onChange = (selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };
  const showMode = currentMode => {
    setMode(currentMode);
  };
  const showDatepicker = () => {
    setShow(true);
    showMode('date');
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerView}>
        <View style={styles.view}>
          <TouchableOpacity
            style={styles.marg15}
            activeOpacity={1}
            onPress={() => navigation.goBack()}>
            <Image
              source={require('../../assets/images/back.png')}
              style={styles.hw}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
          <Text style={styles.txt}>
            Add Expense
          </Text>
        </View>
      </View>

      <View style={styles.bodyView}>
        <View style={styles.tripdrop}>
          <Text
            style={styles.txt1}>
            Trip
          </Text>
          <View style={styles.picker}>
            <Picker
              mode="dialog"
              style={styles.picker1}
              itemStyle={styles.h20}>
              <Picker.Item
                label="Select trip related to expense"
                style={styles.picker2}
                value=""
              />
              <Picker.Item
                label="Anuj Sahan"
                style={styles.picker3}
                value="Anuj Sahan"
              />
              <Picker.Item
                label="Jignesh Doshi"
                style={styles.picker3}
                value="Jignesh Doshi"
              />
            </Picker>
          </View>
        </View>
        <View style={styles.tripdrop}>
          <Text
            style={styles.txt1}>
            Expense Type
          </Text>
          <View style={styles.picker}>
            <Picker
              mode="dialog"
              style={styles.picker1}
              itemStyle={styles.h20}>
              <Picker.Item
                label="Select expense type"
                style={styles.picker2}
                value=""
              />
              <Picker.Item
                label="Anuj Sahan"
                style={styles.picker3}
                value="Anuj Sahan"
              />
              <Picker.Item
                label="Jignesh Doshi"
                style={styles.picker3}
                value="Jignesh Doshi"
              />
            </Picker>
          </View>
        </View>
        <View style={styles.tripdrop}>
          <Text
            style={styles.txt1}>
            Expense date & time
          </Text>
          <View style={{ ...styles.textContainer }}>
            <TouchableOpacity onPress={showDatepicker}>
              <View
                style={styles.view1}>
                <TextInput
                  editable={false}
                  placeholder="Select date & time for task"
                  placeholderTextColor={'black'}
                  label="Select date & time for task"
                  style={styles.textStyleText}
                  underlineColor={'transparent'}
                  labelStyle={{ fontSize: 12 }}
                />
                <Image
                  source={require('../../assets/images/expesne/calendar.png')}
                  resizeMode="center"
                  style={styles.img}
                />
              </View>
            </TouchableOpacity>

            {show && (
              <DateTimePicker
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
        <View style={styles.margins}>
          <Text
            style={styles.txt1}>
            Attach repeipt
          </Text>
          <TouchableOpacity style={styles.inputmedia}>
            <Image
              resizeMode="center"
              source={require('../../assets/images/expesne/receipt.png')}
              style={styles.hw}
            />
          </TouchableOpacity>
          <Text
            style={styles.txt2}>
            Only JPEG and PNG file types are allowed
          </Text>
        </View>
        <View style={styles.view2}>
          <Text
            style={styles.txt1}>
            Amount
          </Text>
          <View style={styles.textContainer}>
            <TextInput placeholder="00.00" style={styles.txtinp} backgroundColor='#FFFFFF' placeholderTextColor={Colors.black} />
          </View>
        </View>
        <View style={styles.view2}>
          <Text
            style={styles.txt1}>
            Remark
          </Text>
          <View style={styles.txtContainer}>
            <TextInput multiline style={styles.txtinp} />
          </View>
        </View>
        <View
          style={styles.view3}>
          <TouchableOpacity
            style={styles.touchview}
            onPress={() => setModalVisible1(!modalVisible1)}>
            <Text
              style={styles.txt3}>
              Submit Expenses
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible1}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          setModalVisible1(!modalVisible1);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.widths}>
              <View
                style={styles.widths}>
                <Video
                  source={require('../../assets/images/expesne/confirmation.mp4')}
                  style={styles.backgroundVideo}
                  muted={true}
                  resizeMode={'cover'}
                  repeat={true}
                  rate={2.0}
                  ignoreSilentSwitch={'obey'}
                />
                <Text style={styles.submittext}>
                  Your request has been successfully
                </Text>
                <Text style={styles.submittext}>
                  submited for approval
                </Text>
              </View>
              <View style={styles.marg2} />
              {/* </View> */}
              <View style={styles.view4}>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => setModalVisible1(!modalVisible1)}>
                  <View
                    style={styles.ChangeDoctorButton}>
                    <Text
                      style={styles.textStyle}>
                      Done
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AddExpenses;
