import React, {useEffect, useState} from 'react';
import {StatusBar, View, Text, ScrollView, TextInput} from 'react-native';
import VerifyModel from '../../components/shared/VerifyModel';
import FullsizeButton from '../../components/shared/FullsizeButton';
import CustomSelect from '../../screens/event/CustomSelect';
import styles from '../../assets/css/styleCreateEvent';
import {DatePickerRange} from '../../components/shared/DatePickerComponent';
import {
  getEventTypes,
  postCreateEvent,
} from '../../repository/event/eventRepository';
import {useToast} from 'react-native-toast-notifications';
import { useSelector } from 'react-redux';
import Header_2 from '../../components/shared/Header_2';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';

export default function CreateEvent(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  const toast = useToast();
  const roles = useSelector(state => state.userRoles);
  // alert(roles)
  // const navigation = useNavigation()
  const [modalVisible2, setModalVisible2] = useState(false);
  const [eventTypeData, setEventTypesData] = useState([]);
  const [eventTypeName, setEventTypeName] = useState('');
  const [duration, setDuration] = useState(new Date());
  const [remark, setRemark] = useState('');
  const [fromDate1, setFromDate1] = useState('');

  const eventType = async () => {
    const res = await getEventTypes();
    setEventTypesData(res.data);
  };

  const handleCreateEvent = async () => {
    let yy = duration.getFullYear();
    let mm = duration.getMonth() + 1;
    if (mm < 10) {
      mm = `0${mm}`;
    }
    let dd = duration.getDate();
    if (dd < 10) {
      dd = `0${dd}`;
    }
    var finalDate = `${yy}-${mm}-${dd}`;

    if (remark == '') {
      toast.show('Remark is required', {
        type: 'warning',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
    } else {
      try {
        var res = await postCreateEvent(eventTypeName, finalDate, remark);
        // console.log('test Post Create Event Api....>>>>>:', res);
        if (res.statusCode === 200) {
          setModalVisible2(!modalVisible2);
        } else {
          toast.show(res.message, {
            type: 'warning',
            placement: 'bottom',
            duration: 3000,
            offset: 30,
            animationType: 'slide-in',
          });
          // console.log('ErroR...in Create Event...page 40', res.message);
        }
      } catch (e) {
        console.log('Catch Error....IN cREATE Event', e);
      }
    }
  };

  useEffect(() => {
    eventType();
  }, []);

  return (
    <View style={{...styles.MainView,backgroundColor: themecolor.THEMECOLOR}}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={[styles.container]}>
        <Header_2 title={'Create Event'} onPress={() => props.navigation.goBack()} />
        <View style={styles.heights}>
          {/* <View style={styles.marg5} /> */}
          <View style={{...styles.view2,backgroundColor: themecolor.THEMECOLOR}}>
            {/* <View style={styles.marg5} /> */}
            <CustomSelect
              heading={'Select Event Type'}
              eventTypeData={eventTypeData}
              setEventTypeName={setEventTypeName}
              eventTypeName={eventTypeName}
              themecolor={themecolor}
            />
            <View style={styles.marg5} />
            <View style={styles.view3}>
              <View style={{backgroundColor: themecolor.THEMECOLOR}}>
                <Text style={{...styles.title,color: themecolor.TXTWHITE }}>Date</Text>
              </View>
              <View style={styles.view3}>
                <DatePickerRange  minimumDate={new Date()} setDuration={setDuration} getDate={duration} setDateValue={setFromDate1} />
              </View>
            </View>
            <View style={styles.marg5} />
            <View style={styles.view3}>
              <View>
                <Text style={{...styles.title,color: themecolor.TXTWHITE }}>Remark</Text>
              </View>
              <View style={{...styles.textContainer,backgroundColor: themecolor.BOXTHEMECOLOR,borderColor:themecolor.BOXBORDERCOLOR1}}>
                <TextInput
                  value={remark}
                  multiline={true}
                  numberOfLines={10}
                  textAlign="left"
                  onChangeText={text => setRemark(text)}
                  style={{...styles.textStyleText,backgroundColor: themecolor.BOXTHEMECOLOR,color:themecolor.TXTWHITE,left:10}}
                />
              </View>
            </View>
          </View>
          <View style={styles.marg7} />
          <FullsizeButton
            title={'Submit'}
            backgroundColor={themecolor.HEADERTHEMECOLOR}
            onPress={() => handleCreateEvent()}></FullsizeButton>
          <View style={styles.VikkuMV} />
        </View>
      </View>
      {modalVisible2 && (
        <VerifyModel
          navigateTo={
            roles.includes('can_approve_events') ? 'ManagerEvent' : 'Events'
          }
          navigateFrom={''}
          title=" Your request has been successfully submited for approval"
        />
      )}
    </View>
  );
}