import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  BackHandler,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  createTripApi,
  gettripLocationApi,
} from '../../repository/trip/tripRepository';
import Header_2 from '../../components/shared/Header_2';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Colors } from '../../assets/config/Colors';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import MCIcon from 'react-native-vector-icons/MaterialIcons';
import styles from '../../assets/css/styleProducts';
import { FontFamily } from '../../assets/fonts/FontFamily';
import NoData from '../../components/shared/NoData';
import LoaderAllInOne from '../../components/shared/Loader';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';

const { width, height } = Dimensions.get('window');

function MyTripListD({ item, tripStatus, navigation,themecolor }) {
  var statusColor = '';
  let Icon = '';
  if (tripStatus[item.TripStatus] == 'Approved') {
    statusColor = '#00C46F';
    Icon = (
      <>
        <FAIcon name="check-circle" />
      </>
    );
  } else if (tripStatus[item.TripStatus] == 'Raised') {
    statusColor = 'orange';
    Icon = (
      <>
        <MCIcon name="error-outline" />
      </>
    );
  } else {
    statusColor = 'red';
    Icon = (
      <>
        <Feather name="x-circle" />
      </>
    );
  }
  return (
    <>
      <View style={{...styles.CUSTOMERdvIEW,}}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() =>
            navigation.push('OutstationTrip', { tripId: item.TripId })
          }
          style={{...styles.CUSTOMERVIEWTO, backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR1,marginTop:5}}>
          <View style={styles.NumberInputView}>
            <View
              style={{
                ...styles.Width85,
                justifyContent: 'center',
                alignSelf: 'center',
              }}>
              <View
                style={{ ...styles.FLEXDIREC1, justifyContent: 'space-between' }}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{ ...styles.RateText, width: width * 0.6,color:themecolor.TXTWHITE }}>
                  <FAIcon
                    size={15}
                    name="map-marker"
                    color={Colors.bluetheme}
                  />{' '}
                  {item.TripOriginName}
                </Text>
              </View>
              <View
                style={{ ...styles.FLEXDIREC1, justifyContent: 'space-between' }}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{ ...styles.RateText, width: width * 0.6,color:themecolor.TXTWHITE }}>
                  <FAIcon
                    size={15}
                    name="map-marker"
                    color={Colors.bluetheme}
                  />{' '}
                  {item.TripDestinationName}
                </Text>
                <View style={{ ...styles.FLEXDIRECTIONROW, top: -8 }}>
                  <Text
                    style={{
                      ...styles.RateTextboldOrangeCircle,
                      color: statusColor,
                    }}>
                    {Icon} {tripStatus[item.TripStatus]}{' '}
                  </Text>
                </View>
              </View>
              <View
                style={{ ...styles.FLEXDIREC1, justifyContent: 'space-between' }}>
                <Text style={{...styles.RateText,color:themecolor.TXTWHITE}}>
                  <FAIcon size={11} name="calendar" color={Colors.bluetheme} />{' '}
                  {item.TripStartDate?.slice(0, 10)
                    .split('-')
                    .reverse()
                    .join('-')}{' '}
                  <Text style={{ fontFamily: FontFamily.Popinssemibold }}>
                    to
                  </Text>{' '}
                  {item.TripEndDate?.slice(0, 10).split('-').reverse().join('-')}
                </Text>
                <Text style={{ ...styles.RateText, top: -8,color:themecolor.TXTWHITE }}>
                  <FAIcon name="rupee" size={11} />
                  {item.expTotal}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.MV1} />
    </>
  );
}

export default TripByStatus = props => {
  const navigation = useNavigation();
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  const [triplist, setTriplist] = useState([]);
  const [tripStatus, setTripStatus] = useState([]);
  const [loader, setLoder] = useState(true);

  useEffect(() => {
    const expensesByStatus = async () => {
      const result = await createTripApi(
        `api/getTripsMonthwise?status=${props.route.params.status}`,
      );
      if (result.statusCode == 200) {
        // console.log('data status wise for expenses', result.data.data);
        let filtered_data = result.data.data.filter(
          item => item.Month.Monthid == props.route.params.monthId,
        );
        setTriplist(filtered_data[0].Trips.Trips);
        // console.log(
        //   'filtered_data of trips new ',
        //   filtered_data[0].Trips.Trips,
        // );
        setLoder(false);
      } else {
        alert(result.message);
        setLoder(false);
      }
    };
    const getStatus = async () => {
      const statusResult = await gettripLocationApi('api/getStatus');
      // console.log('trip status list', statusResult.data[0].Trips);
      if (statusResult.statusCode == 200) {
        setTripStatus(statusResult.data[0].Trips);
      } else {
        alert(statusResult.message);
      }
    };
    getStatus();
    expensesByStatus();
  }, [props]);

  const handleBackButtonClick = () => {
    navigation.push('ExpenseCard');
    return true;
  };

  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);

      return () => {
        BackHandler.removeEventListener(
          'hardwareBackPress',
          handleBackButtonClick,
        );
      };
    }, []),
  );

  //   alert(JSON.stringify(props.route.params));

  // useEffect(() => {
  //   const backAction = () => {
  //     Alert.alert("Hold on!", "Are you sure you want to go back?", [
  //       {
  //         text: "Cancel",
  //         onPress: () => null,
  //         style: "cancel"
  //       },
  //       { text: "YES", onPress: () => BackHandler.exitApp() }
  //     ]);
  //     return true;
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     "hardwareBackPress",
  //     backAction
  //   );

  //   return () => backHandler.remove();
  // }, []);

  return (
    <>
      {loader ? (
        <>
          <LoaderAllInOne />
        </>
      ) : (
        // <Spinner
        //   visible={true}
        //   textContent={'Loading...'}
        //   textStyle={{color: '#FFF'}}
        // />
        <></>
      )}
      <View style={{ flex: 1, backgroundColor: themecolor.THEMECOLOR }}>
        <Header_2
          onPress={() =>
            props.navigation.push('ExpenseCard', {
              navigateFrom: 'expensestatus',
            })
          }
          title={props.route.params.navigateFrom}
        />
        <View>
          {triplist.length >= 1 ? (
            <View 
              style={{ height: height - 80 }}>
              <FlatList
                data={triplist}
                renderItem={({ item }) => (
                  <MyTripListD
                    tripStatus={tripStatus}
                    item={item}
                    navigation={navigation}
                    themecolor={themecolor}
                  />
                )}
                showsVerticalScrollIndicator={false}
                scrollEnabled={true}
                ListFooterComponent={<View style={{ height: 20 }}></View>}
              />
            </View>
          ) : (
            <NoData message="Data not found" />
          )}
        </View>
      </View>
    </>
  );
};
