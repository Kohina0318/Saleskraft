import React, {useEffect, useState} from 'react';
import {Modal,View,Text,TouchableOpacity,TextInput,Image,Pressable,StyleSheet,} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import StyleCss from '../../assets/css/styleOutlet';
import {useNavigation} from '@react-navigation/native';
import styles from '../../assets/css/styleTrip';
import {FontFamily} from '../../assets/fonts/FontFamily';
import {Colors} from '../../assets/config/Colors';
import FA from 'react-native-vector-icons/FontAwesome'
import { Input } from 'react-native-elements';

export default ConfirmationModal = props => {
  const navigation = useNavigation();
  const [modalVisible3, setModalVisible3] = useState(false);
  const [datetime, setDate] = useState(new Date())
  const [show, setShow] = useState(false);
  const [selectedDate,setSelectedDate]=useState(false)
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [message,setMessage]=useState('')
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [text, onChangeText] = React.useState("Useless Text");

 const showDatePicker = () => {
   setShow(true)
   setDatePickerVisible(true);
 };

 const hideDatePicker = () => {
   setDatePickerVisible(false);
 };

 const handleConfirm = (date) => {
 
   setSelectedDate(true)
   setSelectedDateTime(date);
   
   hideDatePicker();
 };


  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || datetime;
    setSelectedDateTime(currentDate);
    setShowDateTime(true)
    setDate(currentDate);
  };


  return (
   <View style={{flex:1,justifyContent:"center",alignItems:"center",marginTop:22}}>
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible3}
      onRequestClose={() => {
       
       setModalVisible3(!modalVisible3);
     }}
    >
      <View style={StyleCss.centeredView}>
        <View style={StyleCss.modalView}>
          <View style={{...StyleCss.ModalViewWidth, paddingBottom: 0}}>
            <View
              style={{...StyleCss.ModelVideoCenter, alignSelf: 'flex-start'}}>
              <Text style={{...StyleCss.textStyleDone, color: 'black'}}>
                Set Reminder
              </Text>
            </View>
            <View style={StyleCss.MV2} />
            {/* Date start here=== */}
            <View>
              <View style={{width: '100%'}}>
                <View style={{width: '100%'}}>
                  <TouchableOpacity onPress={showDatePicker}>
                    <View
                      style={{
                        ...styles.dpview,
                        width: '100%',
                        borderWidth: 1,
                        borderColor: Colors.borderColor1,
                      }}>
                      <TextInput
                        editable={false}
                       
                         value={selectedDate ? selectedDateTime.toLocaleString(0,25) : 'No date time selected'}
                        style={{
                          top: 3,
                          left: 5,
                          fontSize: 12,
                          width: '100%',
                          fontFamily: FontFamily.Popinssemibold,
                          color: Colors.black,
                        }}
                        labelStyle={{fontSize: 12}}
                      />
                      <Image
                        source={require('../../assets/images/addoutlet/calendar.png')}
                        resizeMode="center"
                        style={{
                          height: 14,
                          width: 14,
                          position: 'absolute',
                          right: 10,
                        }}
                      />
                    </View>
                  </TouchableOpacity>
                   {
                  show && (
                   <DateTimePickerModal
                   minimumDate={10}
                   value={selectedDateTime}
                   isVisible={datePickerVisible}
                   mode="datetime"
                  is24Hour={true}
                   onCancel={hideDatePicker}
                   onConfirm={handleConfirm}
                 />
                  )
                 } 
                </View>
              </View>
            </View>
            <View>
              <View style={{...styles.tx1, width: '100%'}}>
                <View style={{height: 10}}></View>
                <View style={{...styles.ti, borderColor: Colors.borderColor1}}>
                  <TextInput

                    multiline={true}
                    numberOfLines={3}
                    color="#000"
                    textAlignVertical={'top'}
                   onChangeText={text => setMessage(text)}
                    style={{width: '100%', borderRadius: 15, left: 5}}
                    placeholder="Special Note & or remark"
                    placeholderTextColor={'black'}
                  />
                </View>
              </View>
            </View>

            <View
              style={{...StyleCss.FLexCenter, justifyContent: 'flex-start'}}>
              <TouchableOpacity
                activeOpacity={0.5}
                //onPress={props.onConfirm}
                onPress={() => setModalVisible3(!modalVisible3)}
               >
                <View
                  
                  style={{...StyleCss.ModelDoneButton, height: 30, width: 120}}>
                   
                  <Text style={StyleCss.textStyleDone}>Set reminder</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.5}
                // onPress={() => handleClickOnDone()}
                //onPress={() => props.setmodalVisible2(false)}
                
                >
                <View
                  style={{
                    ...StyleCss.ModelDoneButton,
                    backgroundColor: 'white',
                    height: 30,
                    width: 70,
                  }}>
                  <Text style={{...StyleCss.textStyleDone, color: 'black'}}>
                    Cancel
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
     <View
     style={{backgroundColor:"#fff3db",width:290,height:260,borderColor:"#fff3db",borderRadius:10}}
      >
       <Image
           source={require('../../assets/images/product/reminder.png')}
           resizeMode="center"
           style={{
           height: 44,
           width: 44,
           position: 'absolute',
           right: 130,
           marginTop:20
           }}
           />

    {/* <TextInput
      // style={styles.input}
       // onChangeText={onChangeText}
       // value={text}
       backgroundColor="#bb9"
       marginTop={60}
       value={selectedDate ? selectedDateTime.toLocaleString(0,25) : 'No date time selected'}
       //borderRadius={20}
       
      
     />  */}
      <Input
                //onChangeText={txt =>setEmailid(txt)}
               placeholder='No date time selected'
               placeholderTextColor="#000"
               fontSize={15}
               //fontWeight="bold"
               marginTop={60}
               underlineColor="#000"
               value={selectedDate ? selectedDateTime.toLocaleString(0,25) : 'No date time selected'}
              // leftIcon={<FA name="envelope" size={20} color={"#000"} />}
             />

            <Input
                //onChangeText={txt =>setEmailid(txt)}
               placeholder='No Remark selected'
               placeholderTextColor="#000"
               fontSize={15}
               value={message}
               //fontWeight="bold"
               underlineColor="#000"
              // leftIcon={<FA name="envelope" size={20} color={"#000"} />}
             />
       {/* <TextInput
       // onChangeText={onChangeText}
       // value={text}
       backgroundColor="#bb9"
       marginTop={0}
       //borderRadius={20}
      value={message}
     />  */}
     {/* <Text style={{color:"#000",alignItems:"center",justifyContent:"center",left:80,marginTop:60,}}>No reminders found</Text> */}
     
     
     <View
     style={{...StyleCss.ModelDoneButt, height: 30, width: 80,left:100,borderColor:"#fff",borderWidth:2}}>
     <TouchableOpacity onPress={() => setModalVisible3(true)}>
     <Text style={StyleCss.textStyleCreate}>+Create</Text>
     </TouchableOpacity>
     </View>
    
   </View>
  
   
  </View>
   
  );
};


const style = StyleSheet.create({
 input: {
   height: 30,
   margin: 12,
   borderWidth: 1,
   padding: 10,
  // backgroundColor:"#000",
 // borderRadius:20
 
 },
});