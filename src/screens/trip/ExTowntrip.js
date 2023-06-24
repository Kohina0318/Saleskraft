import {
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { useEffect,useState } from 'react';
import { Colors } from '../../assets/config/Colors';
import { FontFamily } from '../../assets/fonts/FontFamily';
import FIcon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import { gettripLocationApi } from '../../repository/trip/tripRepository';
import FIcon5 from 'react-native-vector-icons/FontAwesome5';
import styles from '../../assets/css/styleTrip';

// const {width, height} = Dimensions.get('window');

const ExTowntrip = props => {
  const [trip_data, setTrip_data] = useState('');
  const [trip_type, setTrip_type] = useState('');
  const [start_time, setStart_time] = useState('');
  const [end_time, setEnd_time] = useState('');
  // console.log('PROPS OF EXTRIP', props);
  // var TripId = props.route.params.TripId;

  const tripbyid = async () => {
    const result = await gettripLocationApi(`api/geIdByTrip?trip_id=${TripId}`);
    setTrip_data(result.data.Trips[0]);
    setTrip_type(result.data.TripType);

    // console.log('ExTOWN_TRIPS', result.data.Trips[0]);
    setStart_time(
      result.data.Trips[0].TripStartDate.split(' ')[0]
        .split('-')
        .reverse()
        .join('-'),
    );
    setEnd_time(
      result.data.Trips[0].TripEndDate.split(' ')[0]
        .split('-')
        .reverse()
        .join('-'),
    );
  };

  useEffect(() => {
    tripbyid();
  }, []);

  const functionborder = () => {
    let arr = [];
    for (let i = 0; i < 80; i++) {
      arr.push(i);
    }
    return arr.map(() => {
      return <Icon name="caret-up" size={8} color={Colors.bluetheme} />;
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.headerpart}>
        <View style={{ flex: 0.4, justifyContent: 'flex-end' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity
              style={{ marginLeft: 15 }}
              activeOpacity={1}
              onPress={() => props.navigation.goBack()}>
              <Image
                source={require('../../assets/images/back.png')}
                style={{ width: 25, height: 20 }}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
            <Text
              style={styles.a}>
              {trip_type[trip_data.TripType]}
            </Text>
          </View>
        </View>
        <View
          style={styles.b}>
          <View style={styles.headerwhitebox}>
            <View style={styles.c}>
              <View style={{ alignItems: 'center', top: 3.5 }}>
                <FIcon size={10} name="circle-o" />
                <View
                  style={styles.d}
                />
                <FIcon size={10} name="circle-o" />
              </View>
              <View style={{ marginLeft: 10, width: '90%' }}>
                <View
                  style={styles.e}>
                  <Text
                    style={styles.f}>
                    {trip_data.TripOriginName}
                  </Text>
                  <View
                    style={styles.g}>
                    <FIcon5
                      name="calendar-alt"
                      size={13}
                      color={Colors.bluetheme}
                    />
                    <Text
                      style={styles.h}>
                      {start_time}
                    </Text>
                  </View>
                </View>
                <View
                  style={styles.i}>
                  <Text
                    style={styles.j}>
                    {trip_data.TripDestinationName}
                  </Text>
                  <View>
                    <View
                      style={styles.k}>
                      <FIcon5
                        name="calendar-alt"
                        size={13}
                        color={Colors.bluetheme}
                      />
                      <Text
                        style={styles.l}>
                        {end_time}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <View
              style={styles.m}>
              {functionborder()}
            </View>
          </View>
        </View>
      </View>
      <View style={styles.bodypart}>
        <View style={styles.b1}>
          <Text
            style={{
              fontFamily: FontFamily.Popinssemibold,
              color: Colors.black,
            }}>
            Expenses
          </Text>
        </View>

      </View>
    </View>
  );
};

export default ExTowntrip;