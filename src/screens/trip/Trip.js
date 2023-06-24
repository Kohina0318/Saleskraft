import React, { useState, useCallback } from 'react';
import FIcon5 from 'react-native-vector-icons/FontAwesome5';
import { FontFamily } from '../../assets/fonts/FontFamily';
import { FontSize } from '../../assets/fonts/Fonts';
import { Colors } from '../../assets/config/Colors';
import styles from '../../assets/css/styleTrip';
import { gettripLocationApi } from '../../repository/trip/tripRepository';
import { getDatafromAsync } from '../../repository/AsyncStorageServices';
import FIcon from 'react-native-vector-icons/FontAwesome';
import AwesomeLoading from 'react-native-awesome-loading';
import { useFocusEffect } from '@react-navigation/native';
import CreateButton from '../../components/shared/CreateButton';
import Header_2 from '../../components/shared/Header_2';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';
import {
  TouchableOpacity,
  StatusBar,
  View,
  FlatList,
  Text,
  ScrollView,
  // Dimensions,
} from 'react-native';
// import Header from '../../components/shared/Header';

// const { width, height } = Dimensions.get('window');
// POPOP end
export default function Trip(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()

  const [triplist, setTriplist] = useState('');
  const [triptype, setTriptype] = useState('');
  const [loader, setLoader] = useState(true);

  const getTrips = async () => {
    try {
      const w_data = await getDatafromAsync('@user');
      const emp_id = w_data.data.EmployeeId;
      // console.log('EMP_ID>>', emp_id);
      const response = await gettripLocationApi(`api/getEmployeeTrips`);
      // console.log('RESPONSE_DATA', response.message);
      // console.log('trip_data_02', response);
      setTriplist(response.data.Trips);
      setTriptype(response.data.TripType);
      setLoader(false);
      // alert(response.message)
    } catch (err) {
      console.log(err);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getTrips();
    }, []),
  );

  function CustomerList({ item }) {
    return (
      <ScrollView>
        <View style={{...styles.scview,backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR,backgroundColor:'red'}}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.viewmain}>
            <View style={styles.viewmain1}>
              <View style={styles.viewmain1c}>
                <View style={styles.viewmain2}>
                  <FIcon name="plane" color={'white'} size={35} />
                </View>
              </View>
              <View style={styles.viewmain3}>
                <View style={{ justifyContent: 'center' }}>
                  <Text style={styles.maintext1}>
                    {triptype[item.TripType]}
                  </Text>
                </View>
                <View style={{ top: 0, flexDirection: 'row' }}>
                  <View style={{ alignItems: 'center', top: 3.5 }}>
                    <FIcon size={8} name="circle-o" />
                    <View style={styles.circleview} />
                    <FIcon size={8} name="circle-o" />
                  </View>
                  <View style={{ marginLeft: 5, width: '65%', }}>
                    <View style={{ ...styles.view4, }}>
                      <Text style={styles.maintext2}>
                        {item.TripOriginName}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          fontSize: FontSize.small,
                          color: Colors.grey,
                          fontFamily: FontFamily.PopinsRegular,
                        }}>
                        {item.TripDestinationName}
                      </Text>
                    </View>
                  </View>
                  <View style={{ width: '35%', }}>

                    <View style={styles.mainview5}>
                      <FIcon5
                        name="calendar-alt"
                        size={13}
                        color={Colors.bluetheme}
                      />
                      <Text style={styles.maintext3}>
                        {item.TripStartDate.split(' ')[0]
                          .split('-')
                          .reverse()
                          .join('-')}
                      </Text>
                    </View>
                    <View style={{ ...styles.mainview5, marginTop: 6 }}>
                      <FIcon5
                        name="calendar-alt"
                        size={13}
                        color={Colors.bluetheme}
                      />
                      <Text style={styles.maintext4}>
                        {item.TripEndDate.split(' ')[0]
                          .split('-')
                          .reverse()
                          .join('-')}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ marginVertical: 3 }} />
      </ScrollView>
    );
  }
  return (
    <>
      {/* <AwesomeLoading indicatorId={10} size={50} isActive={loader} text="loading..." /> */}
      <View style={{ flex: 1, backgroundColor: Colors.mainbg }}>
        <StatusBar translucent backgroundColor="transparent" />

        <Header_2 title={'Trip'} onPress={() => props.navigation.goBack()} />
        <View >
          <View style={{ marginTop: 10 }} />
          <View>
            <AwesomeLoading
              indicatorId={8}
              size={50}
              isActive={loader}
              text="loading..."
            />
            <View style={styles.flatview}>
              <FlatList
                data={triplist}
                renderItem={({ item }) => <CustomerList item={item} />}
                showsVerticalScrollIndicator={false}
                scrollEnabled={true}
                ListFooterComponent={<View style={{ height: 120 }} />}
              />
            </View>
          </View>
        </View>
        <CreateButton onPress={() => props.navigation.navigate('CreateTrip')} />
      </View>
    </>
  );
}