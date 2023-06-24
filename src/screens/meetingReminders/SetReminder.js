import React,{useState} from 'react'
import {Modal,View,Text,Image,TouchableOpacity,Dimensions,TextInput} from"react-native"
import { FlatList } from 'react-native-gesture-handler';
import Meeting from './Meeting';
import styles from '../../assets/css/styleNotifications';
import { Colors } from '../../assets/config/Colors';
import { FontFamily } from '../../assets/fonts/FontFamily';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import StyleCss from '../../assets/css/styleOutlet';

const {width,height}= Dimensions.get("window")

export default function SetReminder(props){
  

  const [modalVisible3, setModalVisible3] = useState(false);
  const [datetime, setDate] = useState(new Date())
  const [show, setShow] = useState(false);
  const [selectedDate,setSelectedDate]=useState(false)
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [message,setMessage]=useState('')
  const [datePickerVisible, setDatePickerVisible] = useState(false);
 

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



  function TripDataList({item, navigation, themecolor}) { 
 //const navigation = useNavigation(); 
 // console.log("check---",props) 
 return ( 
 <View style={stylese.MainVIewFL}> 
 <View style={{borderWidth: 0.2, borderColor: 'lightgrey'}} /> 
 <View style={stylese.CENTERFLEX} activeOpacity={0.5}> 
 <View style={stylese.CENTERFLEX1}> 
 {/* <View style={stylese.WIDTH6}> */} 
 <View> 
 {/* <Text style={{...stylese.MainText, color: themecolor.TXTWHITE}}> */} 
 <Image 
 source={{uri: 'https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/aiz6bn4u0dbhdks2ilv4.jpg'}} 
 style={{width: 50, height: 60,marginLeft:8}} 
  /> 
  {/* </Text> */} 
  </View> 
 <View 
   style={{ 
   width: width * 0.7, 
   margin: 8, 
   // flexDirection: 'row', 
  }}> 
   <Text style={{...stylese.MainText, color: themecolor.TXTWHITE}}>Hello</Text>
<Text style={{...stylese.MainText1, color: themecolor.TXTWHITE}}>MK</Text>
</View>

</View>
</View>
</View>
);
}

return(
  
  <>

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
                           marginTop:20,
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
                 onPress={() => setModalVisible3(!modalVisible3)}
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
     

     <View style={{
      backgroundColor:"#FFF",
      marginTop:150,
      borderRadius:20,
      height:160,
      width:330,
      left:12
      }}>
    <View style={{
      justifyContent:'space-around',
      paddingTop:50,
      flexDirection:'row'
      }}>
      <View>
        <Text style={{color:'#000'}}>Date Picker</Text>
      </View>
      <TouchableOpacity onPress={() => setModalVisible3(true)}>
      <View style={{borderColor:"#7ad4e8",
      borderWidth:1,
      width:width*.14,
      alignSelf:'center',
      height:height*.04 , 
      borderStyle:'solid',
      borderRadius:20,
      margin:4,
      justifyContent:'center'
      }}>
        <Text style={{color:'#7ad4e8',marginLeft:8}}>
          +Add
        </Text>
      </View>
      </TouchableOpacity>
    </View>

    <View style={{
      flexDirection:'row',
      justifyContent:'flex-start',
      marginLeft:30
      }}>
    {/* <View>
      <Text style={{color:'green',marginTop:8}}>
                     <Image
                        source={require('../../assets/images/addoutlet/clock.png')}
                         resizeMode="center"
                         style={{
                           height: 12,
                           width: 12,
                           position: 'absolute',
                           right: 10,
                           marginTop:20,
                         }}
                       />
      {selectedDate ? selectedDateTime.toLocaleString(0).slice(12,25) : 'Time'}
      </Text>
    </View>
     */}


    <View style={{flexDirection:'column',marginLeft:40}}>
      <Text style={{color:'green'}}>
                     <Image
                        source={require('../../assets/images/addoutlet/cal.png')}
                         resizeMode="center"
                         style={{
                           height: 12,
                           width: 12,
                           position: 'absolute',
                           right: 10,
                           marginTop:20,
                         }}
                       />
      {selectedDate ? selectedDateTime.toLocaleString(0).slice(0,10) : 'Date'}
      </Text>
      <Text style={{color:'#000',fontSize:15}} onChangeText={text => setMessage(text)}>
        {message ? message : "No Reminder"}
      </Text>
    </View>

    </View>
    </View>

             
</>                 
)
}

