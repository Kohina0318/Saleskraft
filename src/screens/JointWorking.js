import {
  View,
  Text,
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Colors } from '../assets/config/Colors';
import { useToast } from 'react-native-toast-notifications';
import FIcon from 'react-native-vector-icons/FontAwesome';
import { MyThemeClass } from '../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';
import {
  createTripApi,
  gettripLocationApi,
} from '../repository/trip/tripRepository';
import Header_2 from '../components/shared/Header_2';
import { FontFamily } from '../assets/fonts/FontFamily';
import { StoreDatatoAsync } from '../repository/AsyncStorageServices';
import {
  insertMappingData,
  insertOutcomeData,
  insertStockDataIfNotInserted,
  outletBeatDump,
  TruncateAllTables,
} from './SharedScreens/InsertData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import NoData from '../components/shared/NoData';

const { height, width } = Dimensions.get('window');

const TeamList = ({ item, punchinWithJointWorking, navigation, themecolor }) => {
  return (
    <TouchableOpacity
      style={{
        marginTop: 5,
        backgroundColor: 'white',
        alignSelf: 'center',
        borderRadius: 15,
        borderWidth: 0.5,
        borderColor: Colors.borderColor1,
        padding: 10,
        width: width * 0.94,
        backgroundColor: themecolor.BOXTHEMECOLOR,
        borderColor: themecolor.BOXBORDERCOLOR1
      }}
      onPress={() => punchinWithJointWorking(item.EmployeeId, navigation)}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: 80,
            borderWidth: 1,
            borderColor: 1,
            borderColor: Colors.borderColor1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {item.ProfilePicture == null ||
            item.ProfilePicture == '' ||
            item.ProfilePicture == undefined ? (
            <Image
              style={{ width: 50, height: 50 }}
              source={require('../assets/images/dummyuser.png')}
            />
          ) : (
            <Image
              style={{ width: 50, height: 50 }}
              source={require('../assets/images/dummyuser.png')}
            />
          )}
        </View>
        <View style={{ marginLeft: 5, }}>
          <Text
            style={{
              color: 'black',
              fontSize: 13,
              fontFamily: FontFamily.PopinsRegular,
              color: themecolor.TXTWHITE
            }}>
            {(item?.FirstName != null || item?.FirstName != '') && item.FirstName?.slice(0, 1).toUpperCase()}{item.FirstName?.slice(1,).toLowerCase()} {(item.LastName != null || item.LastName != '') && item.LastName?.slice(0, 1).toUpperCase()}{item.LastName?.slice(1,).toLowerCase()}
          </Text>
          <Text
            style={{
              color: 'black',
              fontSize: 13,
              fontFamily: FontFamily.PopinsRegular,
              color: themecolor.TXTWHITE
            }}>
            {item.Designations.Designation}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const JointWorking = props => {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const toast = useToast();
  const [teamData, setTeamData] = useState([]);
  const [teamTempData, setTeamTempData] = useState([]);
  const [getArray, setArray] = useState([])
  // alert(props.route.params.agendaId)
  if (props.route.params.changeEmp == undefined) {
    var tripId = props.route.params.todayTrip;
    var f_add = props.route.params.formattedaddress;
    var lat = props.route.params.lat;
    var lng = props.route.params.lng;
  }
  var agendaId = props.route.params.agendaId;
  const changeAgenda = props.route.params.changeAgenda;

  useEffect(() => {
    getTeamList();
  }, []);

  const punchinWithJointWorking = async (empId, navigation) => {
    await StoreDatatoAsync('teamEmpId', empId)
    // alert(empId)
    try {
      if (changeAgenda == true) {
        // alert('hi on joint')
        const punchStatus = await gettripLocationApi('api/punchStatus');
        console.log('punchStatusForChangeAgenda', punchStatus);
        if (punchStatus.statusCode == 200) {
          if (punchStatus.data.Resp.AttendenceStatus == 'Punched in') {
            const attenId = punchStatus.data.Resp.AttendenceRec.AttendanceId;
            // alert(attenId)
            // const ageId = item.Agendaid;
            // api/changeAgenda?attendance_id=4543&agenda_id=55&joint_emp=12
            console.log("data is ===123", attenId, agendaId, empId)
            console.log('check joint url', `api/changeAgenda?attendance_id=${attenId}&agenda_id=${agendaId}&joint_emp=${empId}`)
            const agendaChng = await createTripApi(
              `api/changeAgenda?attendance_id=${attenId}&agenda_id=${agendaId}&joint_emp=${empId}`,
            );
            // alert(JSON.stringify(agendaChng));
            await AsyncStorage.setItem('attendencestatus', 'Punched in');
            await StoreDatatoAsync('agendatype', 'FieldWork');
            console.log('changeAgendaResult', agendaChng);
            if (agendaChng.statusCode == 200) {
              // const agenda_type = `${agendaChng.data[0].Agendatypes.Agendacontroltype}`;
              // const agenda_id = agendaChng.data[0].AgendaId
              // props.setShowagenda(false);
              navigation.reset({
                index: 0,
                routes: [
                  {
                    name: 'NewDashboard',
                  },
                ],
              });
              toast.show(agendaChng.message, {
                type: 'success',
                placement: 'bottom',
                duration: 3000,
                offset: 30,
                animationType: 'slide-in',
              });
              /***If Agenda Change SuccessFully From Action and user choose Roster Plan Start */
              await TruncateAllTables();
              await AsyncStorage.removeItem('@beatId');
              await AsyncStorage.removeItem('@beatName');
              await AsyncStorage.removeItem('@firstTime');
              await AsyncStorage.setItem(
                '@beatStatus',
                JSON.stringify('NotStarted'),
              );
              await outletBeatDump(9);
              await insertMappingData(9);
              await StoreDatatoAsync('agendatype', item.Agendacontroltype);
              await insertOutcomeData(9);
              setTimeout(async () => {
                await insertStockDataIfNotInserted(9);
              }, 2000);

              // props.setAgendaType(agenda_type);
              // props.setAgendaId(agenda_id);
              // alert(JSON.stringify(agenda_id))
              // alert(agenda_type)
            } else if (agendaChng.statusCode == 400) {
              toast.show(agendaChng.message, {
                type: 'warning',
                placement: 'bottom',
                duration: 3000,
                offset: 30,
                animationType: 'slide-in',
              });
            }
          } else {
            toast.show(
              'First Start your day and choose Agenda of the Day.Then only you are able to change agenda',
              {
                type: 'warning',
                placement: 'bottom',
                duration: 5000,
                offset: 30,
                animationType: 'slide-in',
              },
            );
          }
        } else {
          alert(result.message);
        }
      } else {
        if (props.route.params.changeEmp == true) {
          alert('changeEMp api will be integrated')
        } else {

          const result = await createTripApi(
            tripId == ''
              ? `api/punchin?latlnt=${lat}%2C${lng}&location=${f_add}&agenda_id=${agendaId}&joint_emp=${empId}`
              : `api/punchin?latlnt=${lat}%2C${lng}&location=${f_add}&trip_id=${tripId}&agenda_id=${agendaId}&joint_emp=${empId}`,
          );
          if (result.statusCode === 200) {
            console.log('punchin result data00' + JSON.stringify(result.data));
            navigation.push('NewDashboard');
            toast.show(result.message, {
              type: 'success',
              placement: 'bottom',
              duration: 3000,
              offset: 30,
              animationType: 'slide-in',
            });
          } else {
            toast.show(result.message, {
              type: 'warning',
              placement: 'bottom',
              duration: 3000,
              offset: 30,
              animationType: 'slide-in',
            });
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getTeamList = async () => {
    try {
      const result = await gettripLocationApi(`api/getMyTeam?filter=0`);
      if (result.statusCode == 200) {
        console.log("teamData001", result.data);
        let tempArr = [];
        let a = []
        result.data.attendance.map((i) => {
          if (!tempArr.includes(i.EmployeeId)) {
            tempArr.push(i.EmployeeId)
          }
        })
        result.data.team.map((item) => {
          if (tempArr.includes(item.EmployeeId)) {
            a.push(item)
          }
        })
        setTeamData(a);
        setTeamTempData(a);

      }
      // console.log("data of team is ",result.data)
    } catch (err) {
      console.log(err);
    }
  };

  const filterTeam = text => {
    if (text.length == 0) {
      setTeamData(teamTempData);
    } else {
      const filtered_data = teamTempData.filter(
        item =>
          item.FirstName.toLowerCase().includes(text.toLowerCase()) ||
          item.LastName.toLowerCase().includes(text.toLowerCase()),
      );
      setTeamData(filtered_data);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: themecolor.THEMECOLOR }}>
      <Header_2
        title="Jointly working with"
        onPress={() => navigation.push('NewDashboard')}
      />
      <View style={{ height: 10 }} />
      <View
        style={{
          width: width * 0.94,
          alignSelf: 'center',
          height: 'auto',
        }}>
        <View
          style={{
            backgroundColor: 'white',
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 10,
            backgroundColor: themecolor.BOXTHEMECOLOR,
            borderColor: themecolor.BOXBORDERCOLOR1,
            borderWidth: 0.5
          }}>
          <Text style={{ paddingHorizontal: 10 }}>
            <FIcon name="search" size={15} color={themecolor.AV2} />
          </Text>
          <TextInput
            onChangeText={text => filterTeam(text)}
            placeholder="Search"
            style={{
              width: width * 0.8,
              fontFamily: FontFamily.PopinsRegular,
              color: themecolor.AV2
            }}
            placeholderTextColor={themecolor.AV2}
          />
        </View>
      </View>
      {teamData.length > 0 ?
        <FlatList
          data={teamData}
          renderItem={({ item }) => (
            <TeamList
              item={item}
              punchinWithJointWorking={punchinWithJointWorking}
              // setTeamEmpId={setTeamEmpId}
              navigation={navigation}
              themecolor={themecolor}
            />
          )}
        /> : <NoData message="No one marked attendance yet" />
      }
    </View>
  );
};

export default JointWorking;
