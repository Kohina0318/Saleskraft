import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  Modal,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import Header_2 from '../../components/shared/Header_2';
import { gettripLocationApi } from '../../repository/trip/tripRepository';
import { FontSize } from '../../assets/fonts/Fonts';
import { FontFamily } from '../../assets/fonts/FontFamily';
import FullsizeButton from '../../components/shared/FullsizeButton';
const { width } = Dimensions.get('window');
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';

const TourTeam = ({ item, props, themecolor }) => {

  console.log('itemitem000222', item);
  const [fullname, setfullname] = useState(`${item.FirstName.slice(0, 1).toUpperCase()}${item.FirstName.slice(1,).toLowerCase()} ${item.LastName.slice(0, 1).toUpperCase()}${item.LastName.slice(1,).toLowerCase()}`)
  return (
    <>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('TourApproval', { empId: item.EmployeeId })}
        style={{
          flexDirection: 'row',
          backgroundColor: themecolor.BOXTHEMECOLOR,
          width: width * 0.93,
          marginTop: 5,
          padding: 7,
          borderRadius: 12,
          borderWidth: 0.5,
          borderColor: themecolor.BOXBORDERCOLOR1,
          alignItems: 'center',
        }}>
        <View
          style={{
            width: 50,
            height: 50,
            borderWidth: 0.5,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            borderRadius: 50,
            overflow: 'hidden',
            marginLeft: 6,
          }}>
          {/* {item.ProfilePicture == null || item.ProfilePicture == '' ? ( */}
          <Image
            source={require('../../assets/images/dummyuser.png')}
            style={{ height: 50, width: 50 }}
            resizeMode={'cover'}
          />
          {/* ) : ( */}
          {/* <Image
              source={{
                uri: `${getBaseUrl}uploads/2/${item.ProfilePicture}`,
              }}
              style={{height: 60, width: 60}}
              resizeMode={'stretch'}
            />
          )} */}

        </View>
        <View style={{ width: width * 0.93 - 80, marginLeft: 8 }}>
          <Text
            style={{
              color: themecolor.TXTWHITE,
              fontSize: FontSize.labelText2,
              fontFamily: FontFamily.Popinssemibold,
              top: 4,
            }}>
            {fullname}
          </Text>
          <View style={{ marginVertical: 2 }} />
          <Text
            style={{
              color: themecolor.TXTWHITE,
              fontSize: FontSize.smallText,
              fontFamily: FontFamily.PopinsMedium,
            }}>
            {item.Designations.Designation}
          </Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default function TourHome(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  const roles = useSelector(state => state.userRoles);

  const [teamlist, setteamlist] = useState([]);
  const [modalVisible5, setmodalVisible5] = useState(false);

  const getMyTeam = async () => {
    const result = await gettripLocationApi(`api/getMyTeam?filter=0`);
    console.log('data in console', result.data.team);
    setteamlist(result.data.team);
    // setfullname(result.data.FirstName);
  };

  useEffect(() => {
    getMyTeam();
    setmodalVisible5(false)
  }, []);

  return (
    <View style={{ flex: 1, position: 'relative', backgroundColor: themecolor.THEMECOLOR }}>
      <View style={{ flex: 0.12, overflow: 'hidden' }}>
        <Header_2
          title="Tour Plan"
          onPress={() => props.navigation.push('NewDashboard')}
        />
      </View>
      <View style={{ flex: 0.88, alignItems: 'center' }}>
        <View style={{ marginTop: 7 }} />
        <FlatList
          data={teamlist}
          renderItem={({ item }) => <TourTeam item={item} props={props} roles={roles} themecolor={themecolor} />}
        />
      </View>
      <View style={{ position: 'absolute', bottom: 10, alignItems: 'center', justifyContent: 'center', width: '100%' }} >
        <FullsizeButton title='Create Tour' onPress={() => { setmodalVisible5(!modalVisible5) }} backgroundColor={themecolor.HEADERTHEMECOLOR} />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible5}
        onRequestClose={() => {
          setmodalVisible5(!modalVisible5);
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <View
            style={{
              margin: 20,
              backgroundColor: themecolor.RB2,
              borderRadius: 20,
              padding: 35,
              alignItems: 'center',
            }}>
            <View style={{ width: width * 0.6, alignSelf: 'center' }}>

              <View>

                <View style={{ marginTop: 5 }}>
                  <Text
                    style={{
                      fontFamily: FontFamily.PopinsRegular,
                      color: themecolor.TXTWHITE,
                    }}>
                    Create tour for
                  </Text>
                  <View
                    style={{
                      backgroundColor: themecolor.RB2,
                      borderRadius: 12,
                      // borderWidth: 1,
                      // borderColor: themecolor.BOXBORDERCOLOR1,
                      // overflow: 'hidden',
                      // position: 'relative',
                      // height: 42,
                    }}>
                    <FullsizeButton title='Me' width={'100%'} backgroundColor={themecolor.HEADERTHEMECOLOR} onPress={() => props.navigation.push('CreateTour', { screen: '',user:true })} />
                    <View style={{ height: 10, }} />
                    <FullsizeButton title='Team' width={'100%'} backgroundColor={themecolor.HEADERTHEMECOLOR} onPress={() => props.navigation.push('TeamTour')} />

                  </View>
                </View>
                <View style={{ marginVertical: 5 }} />
              </View>
            </View>
            <View style={{ width: width * 0.45 }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  marginTop: 10,
                }}>

                <TouchableOpacity
                  style={{
                    borderRadius: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: 5,
                    // paddingVertical: 2,
                    // backgroundColor:'red'
                  }}
                  onPress={() => {
                    setmodalVisible5(!modalVisible5);
                  }}>
                  <Text style={{ color: themecolor.TXTWHITE }}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
