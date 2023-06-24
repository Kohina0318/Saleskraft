import {
  View,
  Text,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import Color from '../../components/Theme/ThemeDarkLightColor';
import { FontFamily } from '../../assets/fonts/FontFamily';
import { useNavigation } from '@react-navigation/native';
import { FontSize } from '../../assets/fonts/Fonts';
import NoData from '../shared/NoData';
import { SERVER_URL } from '../../repository/commonRepository';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';

const { width, height } = Dimensions.get('window');
const RenderCode = ({ item, userData, navigation, getBaseUrl }) => {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()

  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        backgroundColor: Color.Color.BOXTHEMECOLOR,
        width: width * 0.93,
        marginTop: 2,
        // padding: 2,
        borderRadius: 12,
        borderWidth: 0.5,
        borderColor: Color.Color.BOXBORDERCOLOR,
        alignItems: 'center',
        backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR1
      }}
      onPress={() =>
        navigation.navigate('EventDetails', { EventId: item.EventId, reportee: false })
      }>
      <View
        style={{
          width: 50,
          height: 50,
          // borderWidth: 0.5,
          // borderColor:themecolor.BOXBORDERCOLOR1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
          borderRadius: 50,
          overflow: 'hidden',
          marginLeft: 6,

        }}>
        {userData.picture == null || userData.picture == '' ? (
          <Image
            source={require('../../assets/images/dummyuser.png')}
            style={{ height: 50, width: 50 }}
            resizeMode={'cover'}
          />
        ) : (
          <Image
            source={{
              uri: `${getBaseUrl}uploads/2/${userData.picture}`,
            }}
            style={{ height: 60, width: 60 }}
            resizeMode={'contain'}
          />
        )}
      </View>
      <View style={{ width: width * 0.93 - 80, marginLeft: 8, }}>
        <Text
          style={{
            color: Color.Color.TXTWHITE,
            fontSize: FontSize.labelText2,
            fontFamily: FontFamily.Popinssemibold,
            top: 4,
            color: themecolor.TXTWHITE
          }}>
          {(userData.user_name == null || userData.user_name == '' || userData.user_name == undefined) ? 'not available' : userData.user_name}
        </Text>
        <Text
          style={{
            color: Color.Color.TXTWHITE,
            fontSize: FontSize.smallText,
            fontFamily: FontFamily.PopinsRegular,
            color: themecolor.TXTWHITE
          }}>
          {(userData.designation == null || userData.designation == '' || userData.designation == undefined) ? 'not available' : userData.designation}
        </Text>
        <Text
          style={{
            color: Color.Color.TXTWHITE,
            fontSize: FontSize.smallText,
            fontFamily: FontFamily.PopinsRegular,
            bottom: 4,
            color: themecolor.TXTWHITE
          }}>
          {(item.EventDate == null || item.EventDate == '' || item.EventDate == undefined) ? 'not available' : item.EventDate} | {(item.EventTypes.EventTypeName == null || item.EventTypes.EventTypeName == undefined || item.EventTypes.EventTypeName == '') ? 'not available' : item.EventTypes.EventTypeName}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
const RenderCodeReportees = ({
  item,
  eventTypes,
  navigation,
  designationTypes,
  getBaseUrl
}) => {
  console.log('Item console', item);
  const [fullName, setFullName] = useState((item.EmployeeRelatedByEmployeeId.FirstName == null || item.EmployeeRelatedByEmployeeId.FirstName == undefined) ? 'not available' :
    item.EmployeeRelatedByEmployeeId?.FirstName
    
    +' ' +
    item.EmployeeRelatedByEmployeeId?.LastName
    
  );

  const gettypesofevent = id => {
    if (id == null || id == undefined || id == '') {
      return 'not available'
    } else {
      return eventTypes
        .filter(i => {
          return i.EventTypeId == id;
        })
        .map(itm => {
          return itm.EventTypeName;
        });

    }
  };
  const gettypesofdesignation = (id) => {
    if (id == null || id == undefined || id == '') {
      return 'not available'
    } else {
      return designationTypes
        .filter(i => {
          return i.DesignationId == id;
        })
        .map(itm => {
          return itm.Designation;
        });
    }
  };
  // console.log("types result",gettypesofevent())
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()

  return (
    // <ScrollView>
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('EventDetails', { EventId: item.EventId, reportee: true,empId:item.EmployeeId })
      }
      style={{
        flexDirection: 'row',
        backgroundColor: Color.Color.BOXTHEMECOLOR,
        width: width * 0.93,
        marginTop: 2,
        // padding: 0,
        borderRadius: 12,
        borderWidth: 0.5,
        borderColor: Color.Color.BOXBORDERCOLOR,
        alignItems: 'center',
        backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR1
      }}>
      <View
        style={{
          width: 50,
          height: 50,
          borderWidth: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
          borderRadius: 50,
          overflow: 'hidden',
          marginLeft: 6,
        }}>
        {item.EmployeeRelatedByEmployeeId.ProfilePicture == null ||
          item.EmployeeRelatedByEmployeeId.ProfilePicture == '' ? (
          <Image
            source={require('../../assets/images/dummyuser.png')}
            style={{ height: 50, width: 50 }}
            resizeMode={'cover'}
          />
        ) : (
          <Image
            source={{
              uri: `${getBaseUrl}uploads/2/${item.EmployeeRelatedByEmployeeId.ProfilePicture}`,
            }}
            style={{ height: 60, width: 60 }}
            resizeMode={'stretch'}
          />
        )}
      </View>
      <View style={{ width: width * 0.93 - 80, marginLeft: 8 }}>
        <Text
          style={{
            color: Color.Color.TXTWHITE,
            fontSize: FontSize.labelText2,
            fontFamily: FontFamily.Popinssemibold,
            top: 4,
            color: themecolor.TXTWHITE
          }}>
          {fullName}
        </Text>
        <Text
          style={{
            color: Color.Color.TXTWHITE,
            fontSize: FontSize.smallText,
            fontFamily: FontFamily.PopinsMedium,
            color: themecolor.TXTWHITE
          }}>
          {gettypesofdesignation(
            item.EmployeeRelatedByEmployeeId.DesignationId,
          )}
        </Text>
        <Text
          style={{
            color: Color.Color.TXTWHITE,
            fontSize: FontSize.smallText,
            fontFamily: FontFamily.PopinsMedium,
            bottom: 4,
            color: themecolor.TXTWHITE
          }}>
          {(item.EventDate == null || item.EventDate == undefined || item.EventDate == '') ? 'not available' : item.EventDate} | {gettypesofevent(item.EventTypeId)}
        </Text>
      </View>
    </TouchableOpacity>
    // </ScrollView>
  );
};
export default DataList = props => {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  const userData = props.userData;
  const eventTypes = props.eventTypes;
  const designationTypes = props.designationTypes;
  const navigation = useNavigation();
  const [getBaseUrl, setBaseUrl] = React.useState('');
  // console.log('result.data456', eventTypes);

  React.useEffect(() => {
    async function temp() {
      setBaseUrl(await SERVER_URL())
    }
    temp()
  }, [])
  // alert(JSON.stringify(userData))

  const noDataAvailable = () => {
    if (props.data.length == 0 && props.dataforapproval.length == 0) {
      return <NoData height={250} message='Data not available' />
    }
  }

  return (
    <View
      style={{
        width: width * 0.93,
        alignSelf: 'center',
        height: height * 0.45,
        overflow: 'hidden',

      }}>
      {props.dataforapproval.length >= 1 ? (
        <View style={{ flex: props.dataforapproval.length == 1 ? 0.4 : 1 }}>
          <View style={{ backgroundColor: themecolor.THEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR }}>
            <Text
              style={{
                color: Color.Color.TXTWHITE,
                fontFamily: FontFamily.PopinsMedium,
                color: themecolor.TXTWHITE
              }}>
              Event Requests
            </Text>
          </View>
          {/* <ScrollView style={{}}> */}
            <FlatList
              scrollEnabled={true}
              data={props.dataforapproval}
              renderItem={({ item }) => (
                <RenderCodeReportees
                  navigation={navigation}
                  eventTypes={eventTypes}
                  designationTypes={designationTypes}
                  item={item}
                  getBaseUrl={getBaseUrl}
                />
              )}
              keyExtractor={item => item.EventId}
              ListEmptyComponent={<View style={{ height: 20 }} ></View>}
            />
          {/* </ScrollView> */}
        </View>
      ) : (
        <></>
      )}
      {
        props.data.length != 0 ?
          <View style={{ flex: 1, backgroundColor: themecolor.THEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR }}>
            <View style={{ marginTop: 5 }}>
              <Text
                style={{
                  color: Color.Color.TXTWHITE,
                  fontFamily: FontFamily.PopinsMedium,
                  color: themecolor.TXTWHITE
                }}>
                My Events
              </Text>
            </View>
            {/* <ScrollView style={{}}> */}
              {props.data.length >= 1 ?
                <FlatList
                  scrollEnabled={true}
                  data={props.data}
                  renderItem={({ item }) => (
                    <RenderCode item={item} userData={userData} navigation={navigation} getBaseUrl={getBaseUrl} />
                  )}
                  keyExtractor={item => item.EventId}
                  ListFooterComponent={<View style={{ height: 80 }}></View>}
                /> : <NoData height={200} message='Data not available' />

              }
            {/* </ScrollView> */}
          </View> : noDataAvailable()
      }
    </View>
  );
};
