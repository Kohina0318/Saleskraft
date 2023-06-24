import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Dimensions, Image, TouchableOpacity } from 'react-native';
import styles from '../../assets/css/styleNotifications';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';
import { FontFamily } from '../../assets/fonts/FontFamily';
import { useNavigation } from '@react-navigation/native';
import { getEmployeeId } from '../../repository/commonRepository';
import { useToast } from 'react-native-toast-notifications';

const { width } = Dimensions.get('screen');

function NotificationList({ item, nameData, getBaseUrl, index, redirectToPage }) {

  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()

  console.log("Notification data=", item)

  return (
    <>
      {nameData.map((items, indx) => {
        // alert(items.EmployeeId===item.WfOriginEmployee)
        if (items.EmployeeId === item.WfOriginEmployee) {
          // console.log(`${items.EmployeeId}====${item.WfOriginEmployee}`)
          return (
            <TouchableOpacity key={indx} onPress={() => { redirectToPage(item) }} >
              <View style={{ ...styles.innerview, borderColor: themecolor.BOXBORDERCOLOR1, backgroundColor: themecolor.BOXTHEMECOLOR }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', width: 50, height: 50, borderRadius: 80, }}>

                  {(items.ProfilePicture === null || items.ProfilePicture === "" ? (
                    <Image source={require('../../assets/images/dummyuser.png')} resizeMode='cover' style={{ height: 60, width: 60 }} />
                  ) : (
                    <Image source={{ uri: `${getBaseUrl}uploads/2/${item.ProfilePicture}` }} resizeMode='center' style={{ height: 50, width: 50 }} />
                  ))
                  }
                </View>

                <View style={{ width: width * 0.7, alignSelf: 'center', flex: 3 }}>
                  <Text style={{ ...styles.text, left: 5, color: themecolor.TXTWHITE }}>{item.WfEntityName}</Text>
                  <Text style={{ color: "#000", fontFamily: FontFamily.PopinsMedium, top: -3, left: 5, fontSize: 12, color: themecolor.TXTWHITE }} >{`${items.FirstName.slice(0, 1).toUpperCase()}${items.FirstName.slice(1).toLowerCase()}`} {`${items.LastName.slice(0, 1).toUpperCase()}${items.LastName.slice(1).toLowerCase()}`}</Text>
                  <Text style={{ ...styles.text2, top: -3, color: 'black', left: 5, fontSize: 10.5, fontFamily: FontFamily.PopinsMedium, color: themecolor.TXTWHITE }}>{item.WfDesc}</Text>
                </View>
                <View style={{ ...styles.dateview, }}>
                  <Text style={styles.text2}>
                    {moment(item.CreatedAt).format('Do MMM YYYY')}
                  </Text>
                  <Text style={{ ...styles.text2, top: -3 }}>
                    {moment(item.CreatedAt).format('HH:mm A')}
                  </Text>
                </View>
              </View>
              <View style={styles.marg2} />
            </TouchableOpacity>)
        }
      })}
    </>
  );
}
export function NotificationFlatList(props) {
  // alert(JSON.stringify(props.nameData));
  const toast = useToast();
  const [emp, setEmp] = useState('')
  const navigation = useNavigation()
  useEffect(() => {
    const funTemp = async () => {
      const emp = await getEmployeeId();
      setEmp(emp);
    }
    funTemp()
  }, [])

  const redirectToPage = (item) => {
    try {
      if (item.WfEntityName == 'Trips') {
        navigation.push('OutstationTrip', { tripId: item.WfDocPk, manager: item.WfOriginEmployee !== emp })
      } else if (item.WfEntityName == 'Events') {
        // alert(item.WfDocPk)
        navigation.push('EventDetails', { EventId: item.WfDocPk, reportee: item.WfOriginEmployee !== emp, empId: item.WfOriginEmployee })
      } else if (item.WfEntityName == 'Expenses') {
        // alert(item.WfEntityName)
        navigation.push('OutstationTripDetails', { expId: item.WfDocPk, Manager: item.WfOriginEmployee !== emp ? 'Manager' : false, empId: item.WfOriginEmployee, navigateFrom: 'Notifications' })
      } else {
        console.log(`No mapping for ${item.WfEntityName}`);
      }
    } catch (err) {
      console.log("Catch Error in Notification Redirection function : ", err)
    }
  }


  return (
    <>
      <View style={{ marginVertical: 5 }} />
      <FlatList
        keyExtractor={(item, indx) => indx}
        data={props.actionData}
        renderItem={({ item, index }) => (
          <NotificationList item={item} nameData={props.nameData} index={index} getBaseUrl={props.getBaseUrl} redirectToPage={redirectToPage} />
        )}
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
      />
    </>
  );
}
