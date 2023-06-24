import {
    FlatList,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    Image, BackHandler
  } from 'react-native';
  import React, { useState, useEffect } from 'react';
  import Header_2 from '../../components/shared/Header_2';
  import { gettripLocationApi } from '../../repository/trip/tripRepository';
  import { FontSize } from '../../assets/fonts/Fonts';
  import { FontFamily } from '../../assets/fonts/FontFamily';
  import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
  import { useSelector } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
  const { width,height } = Dimensions.get('window');


const TourTeam = ({item, props, themecolor}) => {
  console.log('itemitem000222', item);
  const [fullname, setfullname] = useState(
    `${item.FirstName.slice(0, 1).toUpperCase()}${item.FirstName.slice(
      1,
    ).toLowerCase()} ${item.LastName.slice(
      0,
      1,
    ).toUpperCase()}${item.LastName.slice(1).toLowerCase()}`,
  );
  return (
    <>
      <TouchableOpacity
        onPress={() =>
          props.navigation.push('CreateTeamTour', {empId: item.EmployeeId,empName:`${item.FirstName} ${item.LastName} - ${item.Designations.Designation&&item.Designations.Designation}`})
        }
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
            style={{height: 50, width: 50}}
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
        <View style={{width: width * 0.93 - 80, marginLeft: 8}}>
          <Text
            style={{
              color: themecolor.TXTWHITE,
              fontSize: FontSize.labelText2,
              fontFamily: FontFamily.Popinssemibold,
              top: 4,
            }}>
            {fullname}
          </Text>
          <View style={{marginVertical: 2}} />
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

export default TeamTour = props => {

    const mode = useSelector(state => state.mode);
    const themecolor = new MyThemeClass(mode).getThemeColor()
    const roles = useSelector(state => state.userRoles);
  
    const [teamlist, setteamlist] = useState([]);
    const [modalVisible5, setmodalVisible5] = useState(false);
  
    function handleBackButtonClick() {
      props.navigation.goBack()
      return true;
  }

  React.useEffect(() => {
      BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
      return () => {
          BackHandler.removeEventListener(
              'hardwareBackPress',
              handleBackButtonClick,
          );
      };
  }, []);

    const getMyTeam = async () => {
      const result = await gettripLocationApi(`api/getMyTeam?filter=0`);
      console.log('data in console', result.data.team);
      setteamlist(result.data.team);
      // setfullname(result.data.FirstName);
    };
  
    useEffect(() => {
      getMyTeam();
    //   setmodalVisible5(false)
    }, []);

  return (
    <View style={{height, backgroundColor:themecolor.THEMECOLOR}}>
      <Header_2 title="Team Tour" onPress={() => props.navigation.goBack()} />

      <View style={{backgroundColor:themecolor.THEMECOLOR}}>
      <View style={{width:width*0.93,alignSelf:'center',height:'100%'}} >
        <FlatList
          data={teamlist}
          renderItem={({item}) => (
            <TourTeam
              item={item}
              props={props}
              roles={roles}
              themecolor={themecolor}
            />
          )}
          scrollEnabled={true}
        /> 
      </View>
      </View>
    </View>
  );
};
