import React, { useEffect, useState } from 'react';
import {
  createTripApi,
  gettripLocationApi,
} from '../../repository/trip/tripRepository';
const { width } = Dimensions.get('window');
import { useNavigation } from '@react-navigation/native';
import { FontFamily } from '../../assets/fonts/FontFamily';
import Entypo from 'react-native-vector-icons/Entypo';
import Header_2 from '../../components/shared/Header_2';
import ConfirmationModal from '../../components/Modals/ConfirmationModal';
import { useToast } from 'react-native-toast-notifications';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';
import ProfileViewHeader from '../../components/shared/ProfileViewHeader';
import RejectModal from '../../components/Modals/RejectModal';
import {
  View, Text, Dimensions, TouchableOpacity,
  // Image
} from 'react-native';
import {
  getLastCheckInOutLocation,
  //  SERVER_URL 
} from '../../repository/commonRepository';

const EventDetails = props => {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  const toast = useToast()
  const navigation = useNavigation()
  const EventId = props.route.params?.EventId;
  const [details, setDetails] = useState([]);
  const [eventdetails, setEventDetails] = useState([]);
  const [eventtype, setEventType] = useState([]);
  const [designation, setDesignation] = useState('');
  const [eventStatus, setEventStatus] = useState('');
  const [fullName, setFullName] = useState('');
  const [location, setLocation] = useState('');
  const [modalVisible1, setModalVisible1] = useState(false)
  const [reject, setReject] = useState(false)
  const [approve, setApprove] = useState(false)

  const getEventById = async () => {
    try {
      const result = await gettripLocationApi(
        `api/getEventByID?event_id=${EventId}`,
      );

      if (result?.statusCode == 200) {
        setDetails(result.data.Event[0].EmployeeRelatedByEmployeeId);
        setFullName((result.data.Event[0].EmployeeRelatedByEmployeeId.FirstName == null || result.data.Event[0].EmployeeRelatedByEmployeeId.FirstName == undefined) ? 'not available' : result.data.Event[0].EmployeeRelatedByEmployeeId.FirstName.slice(0, 1).toUpperCase() + result.data.Event[0].EmployeeRelatedByEmployeeId.FirstName?.slice(1,).toLowerCase() + ' ' + result.data.Event[0].EmployeeRelatedByEmployeeId.LastName?.slice(0, 1).toUpperCase() + result.data.Event[0].EmployeeRelatedByEmployeeId.LastName?.slice(1,).toLowerCase())
        setEventDetails(result.data.Event[0]);
        setEventType((result.data.Event[0].EventTypes.EventTypeName == undefined || result.data.Event[0].EventTypes.EventTypeName == null) ? 'not available' : result.data.Event[0].EventTypes.EventTypeName);
        setDesignation((result.data.Designation[0].Designation == null || result.data.Designation[0].Designation == undefined) ? 'not available' : result.data.Designation[0].Designation);
        setEventStatus((result.data.Event[0].EventStatus == null || result.data.Event[0].EventStatus == undefined) ? "not available" : result.data.Event[0].EventStatus)
        // console.log('result.data.Event', result.data.Event[0].EventStatus);
        // alert(result.data.Event[0].EventStatus)
      } else {
        alert(result.message);
      }
    } catch (err) {
      alert(err);
    }
  };

  const getLocation = async () => {
    setLocation(await getLastCheckInOutLocation(details.EmployeeId))
  }

  useEffect(() => {
    getEventById();
    getLocation();
  }, []);

  // const actionOnRequest = async status => {
  //   // alert('hi')
  //   try {
  //     // const result = await createTripApi(
  //     //   `api/ChangeEventStatus?event_id=${EventId}&status_id=${status}`,
  //     // );
  //     // console.log('result of on action api', result);
  //     // if (result.statusCode == 200) {
  //     // alert(result.message);
  //     if (status == 2) {
  //       setApprove(!approve)
  //     } else if (status == 3) {
  //       setReject(!reject)
  //     }
  //     //   // props.navigation.goBack();
  //     // } else {
  //     //   alert(result.message);
  //     // }
  //   } catch (err) {
  //     alert(err);
  //   }
  // };

  const handleModal = (status) => {
    if (status == 2) {
      setApprove(!approve)
    } else {
      setReject(!reject)
    }
  }

  const actionOnRequest = async status => {
    try {
      const result = await createTripApi(
        `api/ChangeEventStatus?event_id=${EventId}&status_id=${status}`,
      );
      // console.log('result of on action api', result);
      if (result.statusCode == 200) {
        toast.show(result.message, {
          type: 'success',
          placement: 'bottom',
          duration: 4000,
          offset: 30,
          animationType: 'slide-in',
        });
        navigation.goBack()
      } else {
        toast.show(result.message, {
          type: 'warning',
          placement: 'bottom',
          duration: 4000,
          offset: 30,
          animationType: 'slide-in',
        });
      }
    } catch (err) {
      alert(err);
    }
  }

  const deleteEvent = async () => {
    try {
      const result = await gettripLocationApi(`api/eventDelete?event_id=${EventId}`)
      if (result.statusCode == 200) {
        toast.show(result.message, {
          type: 'success',
          placement: 'bottom',
          duration: 4000,
          offset: 30,
          animationType: 'slide-in',
        });
        setModalVisible1(!modalVisible1)
        props.navigation.goBack()
      } else {
        toast.show(result.message, {
          type: 'warning',
          placement: 'bottom',
          duration: 4000,
          offset: 30,
          animationType: 'slide-in',
        });
        setModalVisible1(!modalVisible1)
      }
    } catch (err) {
      console.log("Error: in delete trip", err)
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: themecolor.THEMECOLOR, }}>
      {(props.route.params.reportee) ?
        // <View
        //   style={{
        //     backgroundColor: themecolor.HEADERTHEMECOLOR,
        //     height: height * 0.38,
        //     borderBottomLeftRadius: 20,
        //     borderBottomRightRadius: 20,
        //   }}>
        //   <View
        //     style={{
        //       height: '25%',
        //       justifyContent: 'flex-end',
        //     }}>
        //     <View
        //       style={{
        //         width: width * 0.9,
        //         alignSelf: 'center',
        //         flexDirection: 'row',
        //         alignItems: 'center',
        //       }}>
        //       <TouchableOpacity
        //         onPress={() => {
        //           props.navigation.goBack();
        //         }}>
        //         <Image
        //           source={require('../../assets/images/back.png')}
        //           style={{ height: 20, width: 20 }}
        //           resizeMode={'contain'}
        //         />
        //       </TouchableOpacity>
        //       <Text
        //         style={{
        //           color: 'white',
        //           fontFamily: FontFamily.PopinsMedium,
        //           fontSize:18,
        //           marginLeft: 10,
        //           top: 2,
        //           color: Colors.white
        //         }}>
        //         Event Details
        //       </Text>
        //     </View>
        //   </View>
        //   <View style={{ marginVertical: 2 }} />
        //   <View style={{ height: '50%', alignItems: 'center' }}>
        //     <View
        //       style={{
        //         height: 110,
        //         width: 110,
        //         borderRadius: 100,
        //         overflow: 'hidden',
        //         borderWidth: 1,
        //         borderColor: Colors.borderColor1,
        //         justifyContent: 'center',
        //         alignItems: 'center',
        //       }}>
        //       {
        //         (details.ProfilePicture == null || details.ProfilePicture == undefined || details.ProfilePicture == '') ?
        //           <Image
        //             source={
        //               require('../../assets/images/dummyuser.png')
        //             }
        //             style={{ height: 110, width: 110 }}
        //             resizeMode={'cover'}
        //           /> :
        //           <Image
        //             source={{
        //               uri: `${async () => await SERVER_URL()}/uploads/2/${details.ProfilePicture}`,
        //             }}
        //             style={{ height: 110, width: 110 }}
        //             resizeMode={'cover'}
        //           />
        //       }
        //     </View>
        //     <View style={{ marginVertical: 4 }} />
        //     <View
        //       style={{
        //         height: '25%',
        //         alignItems: 'center',
        //       }}>
        //       <Text style={{ fontFamily: FontFamily.PopinsMedium, color: Colors.white }}>
        //         {fullName} - {designation}
        //       </Text>
        //       <View style={{ width: width * 0.86, alignContent: 'center', alignItems: 'center' }}>
        //         <Text
        //           style={{ color: 'white', fontFamily: FontFamily.PopinsRegular, fontSize: 9, textAlign: 'center' }}>
        //           <FIcon name="map-marker" size={10} />{' '}
        //           {location == null || location == ''
        //             ? 'Not available'
        //             : location}
        //         </Text>
        //         <Text
        //           style={{
        //             color: 'white',
        //             marginLeft: 10,
        //             fontFamily: FontFamily.PopinsRegular,
        //             fontSize: 12
        //           }}>
        //           <FIcon name="phone" size={12} /> {details.Phone}
        //         </Text>
        //       </View>
        //     </View>
        //   </View>

        // </View>
        <View style={{ height: 300 }} >
          <ProfileViewHeader empId={props.route.params.empId} title={'Event Details'} />
        </View>
        :
        <Header_2 title='Event Details' onPress={() => props.navigation.goBack()} onPressIconPlus={() => setModalVisible1(!modalVisible1)} iconnameplus='trash' />
      }
      <View style={{ width: width * 0.93, alignSelf: 'center' }}>
        <View style={{ height: 10 }} />
        <View>
          <Text
            style={{
              fontFamily: FontFamily.PopinsRegular,
              color: themecolor.TXTWHITE
            }}>
            Event Types
          </Text>
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 10,
              padding: 12,
              marginTop: 2,
              borderWidth: 0.5,
              borderColor: themecolor.BOXBORDERCOLOR1,
              backgroundColor: themecolor.BOXTHEMECOLOR
            }}>
            <Text
              style={{
                fontFamily: FontFamily.PopinsRegular,
                color: themecolor.TXTWHITE
              }}>
              {eventtype}
            </Text>
          </View>
        </View>
        <View style={{ height: 10 }} />
        <View>
          <Text
            style={{
              fontFamily: FontFamily.PopinsRegular,
              color: themecolor.TXTWHITE
            }}>
            Duration
          </Text>
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 10,
              padding: 12,
              marginTop: 2,
              borderWidth: 0.5,
              borderColor: themecolor.BOXBORDERCOLOR1,
              backgroundColor: themecolor.BOXTHEMECOLOR
            }}>
            <Text
              style={{
                fontFamily: FontFamily.PopinsRegular,
                color: themecolor.TXTWHITE
              }}>
              {eventdetails.EventDate}
            </Text>
          </View>
        </View>
        <View style={{ height: 10 }} />
        <View>
          <Text
            style={{
              fontFamily: FontFamily.PopinsRegular,
              color: themecolor.TXTWHITE
            }}>
            Remark
          </Text>
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 10,
              padding: 12,
              marginTop: 2,
              borderWidth: 0.5,
              borderColor: themecolor.BOXBORDERCOLOR1,
              backgroundColor: themecolor.BOXTHEMECOLOR
            }}>
            <Text
              style={{
                fontFamily: FontFamily.PopinsRegular,
                color: themecolor.TXTWHITE
              }}>
              {eventdetails.EventRemark}
            </Text>
          </View>
        </View>
        <View style={{ height: 20 }} />

        {(props.route.params.reportee) ? <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity
            onPress={() => handleModal(2)}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              // height: 40,
              borderRadius: 13,
              borderWidth: 1,
              width: '48%',
              borderColor: themecolor.BOXBORDERCOLOR1,
              padding: 10,

              flexDirection: 'row',
              backgroundColor: '#54C130',
            }}>
            <Text style={{ marginLeft: -5 }}>
              <Entypo name="check" size={15} color="white" />
            </Text>
            <Text
              style={{ fontFamily: FontFamily.PopinsRegular, color: 'white' }}>
              Approve Request
            </Text>
            {
              approve &&
              <ConfirmationModal btnlabel={'Yes'}
                setmodalVisible1={setApprove}
                singleb={false}
                title={"Are you sure you want to Approve this event"}
                onConfirm={() => {
                  actionOnRequest(2)
                }}
              />
            }
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleModal(3)}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              // height: 40,
              borderRadius: 13,
              borderWidth: 1,
              width: '48%',
              borderColor: themecolor.BOXBORDERCOLOR1,
              padding: 10,
              flexDirection: 'row',
              backgroundColor: '#DC2D2D',
              backgroundColor: '#ff0000',
            }}>
            <Text style={{ marginLeft: -5 }}>
              <Entypo name="cross" size={20} color="white" />
            </Text>
            <Text
              style={{ fontFamily: FontFamily.PopinsRegular, color: 'white' }}>
              Reject Request
            </Text>
            {
              reject &&
              <RejectModal reject={reject} setReject={setReject} EventId={EventId} OncPress={() => setReject(!reject)} OnsPress={() => actionOnRequest(3)} />
            }
          </TouchableOpacity>

        </View>

          :
          <></>
        }
      </View>
      {
        modalVisible1 &&
        <ConfirmationModal
          btnlabel={eventStatus == 2 ? 'Okay' : 'Yes'}
          PressDone={() => navigation.navigate('MyTrip')}
          singleb={eventStatus == 2 ? true : false}
          title={
            eventStatus == 2
              ? "Sorry You can not delete Approved Event"
              : "Are you sure you want to delete this event"
          }
          modalVisible1={modalVisible1}
          setmodalVisible1={setModalVisible1}
          onConfirm={() => {
            eventStatus == 2 ?
              setModalVisible1(!modalVisible1) : deleteEvent()
          }}
        />
      }
    </View>

  );
};

export default EventDetails;
