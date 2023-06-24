import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Colors } from '../../assets/config/Colors';
import { FontFamily } from '../../assets/fonts/FontFamily';
import { FontSize } from '../../assets/fonts/Fonts';
import FIcon from 'react-native-vector-icons/FontAwesome';
import { gettripLocationApi } from '../../repository/trip/tripRepository';
import { useNavigation } from '@react-navigation/native';
import { getLastCheckInOutLocation } from '../../repository/commonRepository';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';
const { width } = Dimensions.get('window');

export default function ProfileViewHeader(props) {
  // alert(props.empId)
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()

  const navigation = useNavigation();
  const { title } = props;

  const [name, setName] = useState('________');
  const [location, setLocation] = useState('________');
  const [contact, setContact] = useState('__________');
  const [picture, setPicture] = useState('');


  const getEmployeeDetails = async id => {
    // alert(id)
    try {
      const result = await gettripLocationApi(
        `api/getProfile?EmployeeId=${id}`,
      );
      if (result.statusCode == 200) {
        console.log('empDetails in component', result.data);

        setName(`${result.data.FirstName} ${result.data.LastName}`);
        setContact(result.data.Phone);
        setPicture(result.data.ProfilePicture);
      } else {
        console.log('Status Error in ProfileView Component:', result.message);
      }
    } catch (err) {
      console.log('Catch Error', err);
    }
  };

  const getLocation = async empId => {
    const l = await getLastCheckInOutLocation(empId);
    // alert(l)
    setLocation(l);
  };

  useEffect(() => {
    getEmployeeDetails(props.empId);
    // alert(props.empId);
    getLocation(props.empId);
  }, [props]);

  return (
    <View
      style={{
        backgroundColor: Colors.bluetheme,
        //   height: height * 0.35,
        flex: 1,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        backgroundColor: themecolor.HEADERTHEMECOLOR
      }}>
      <View
        style={{
          height: '25%',
          justifyContent: 'flex-end',
        }}>
        <View
          style={{
            width: width * 0.9,
            alignSelf: 'center',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Image
              source={require('../../assets/images/back.png')}
              style={{ height: 18, width: 18, }}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: FontSize.labelText4,
              fontFamily: FontFamily.PopinsMedium,
              color: Colors.white,
              marginLeft: 8
            }}>
            {title}
          </Text>
        </View>
      </View>
      <View style={{ alignItems: 'center' }}>
        <View
          style={{
            height: 110,
            width: 110,
            borderRadius: 100,
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: Colors.borderColor1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {picture == null || picture == undefined || picture == '' ? (
            <Image
              source={require('../../assets/images/dummyuser.png')}
              style={{ height: 110, width: 110 }}
              resizeMode={'cover'}
            />
          ) : (
            <Image
              source={{
                uri: `${async () => await SERVER_URL()}/uploads/2/${picture}`,
              }}
              style={{ height: 110, width: 110 }}
              resizeMode={'cover'}
            />
          )}
        </View>
      </View>
      <View
        style={{
          //   height: '25%',
          alignItems: 'center',
          padding: 5
          // justifyContent: 'space-evenly',
        }}>
        <Text style={{ color: 'white', fontFamily: FontFamily.PopinsMedium }}>
          {name}
        </Text>
        <Text
          style={{
            color: 'white',
            marginLeft: 10,
            fontFamily: FontFamily.PopinsRegular,
          }}>
          <FIcon name="phone" size={14} /> {contact}{' '}
        </Text>
        <View style={{ alignItems: 'center' }}>
          <Text
            style={{
              color: 'white',
              fontFamily: FontFamily.PopinsRegular,
              fontSize: 10,
              textAlign: 'center',
              width: width * 0.9,
            }}>
            <FIcon name="map-marker" size={12} />{' '}
            {location == null || location == '' ? 'Not available' : location}
          </Text>
        </View>
      </View>
    </View>
  );
}
