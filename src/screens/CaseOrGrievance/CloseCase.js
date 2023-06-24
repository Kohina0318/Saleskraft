import {
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import React, { useState } from 'react';
import EIcon from 'react-native-vector-icons/EvilIcons';
import styles from '../../assets/css/styleGrievance';
import { getDatafromAsync } from '../../repository/AsyncStorageServices';
import { getallTicketsApi } from '../../repository/CaseGrievance/CaseGrievance';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import DummyImage from '../../components/shared/DummyImage';
import LoaderAllInOne from '../../components/shared/Loader';
import NoData from '../../components/shared/NoData';
import { SERVER_URL } from '../../repository/commonRepository';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';
import { Colors } from '../../assets/config/Colors';

const { width } = Dimensions.get('window');

const CloseCase = () => {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  const [getBaseUrl, setBaseUrl] = React.useState('');
  function DataList({ item, getBaseUrl }) {
    const getdatefun = date => {
      let final_date = moment(date).format('Do MMM YYYY  HH:mm A');
      return final_date;
    };
    // alert(item);
    const navigation = useNavigation();

    return (
      <>
        {/* <ScrollView> */}
          <TouchableOpacity
            key={item.id}
            style={{ ...styles.flatContainer, backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR1 }}
            onPress={() =>
              navigation.navigate('CaseDescription', { Case_id: item.Id })
            }>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: 50,
                height: 50,
                marginLeft: 2,
                borderRadius: 80,
                overflow: 'hidden',
                borderWidth: 1,
              }}>
              {item.TicketType.MediaId == null ||
                item.TicketType.MediaId == '' ? (
                <DummyImage width={50} height={50} />
              ) : (
                <Image
                  source={{
                    uri: `${getBaseUrl}media?id=${item.TicketType.MediaId}`,
                  }}
                  style={styles.img}
                />
              )}
            </View>
            <View style={styles.margleft10}>
              <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                style={{ ...styles.txt1, width: width * 0.7, left: 3, color: themecolor.TXTWHITE }}>
                {item.TicketType.TicketType}
              </Text>
              <View
                style={{
                  ...styles.view1,
                  width: width * 0.65,
                  justifyContent: 'flex-start',
                  left:3
                }}>
                <FontAwesome
                  name="user-circle"
                  style={{ alignSelf: 'flex-start', top: 3 }}
                  size={12}
                  color={Colors.bluetheme1}
                 
                />
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{ ...styles.txt3, color: themecolor.TXTWHITE }}> {`${item.Outlets.OutletName}`}</Text>
              </View>
              <View
                style={{
                  ...styles.view1,
                  width: width * 0.65,
                  justifyContent: 'flex-start',
                  left: 3,
                }}>
                {/* <Image
                  source={require('../../assets/images/addoutlet/calendar.png')}
                  style={{ width: 10, height: 10, }}
                  resizeMode="center"
                /> */}
                <Text style={{ top: -2 }}>
                  <FontAwesome name="calendar" color={Colors.bluetheme1} size={10} />
                </Text>
                <Text style={{ ...styles.txt3, color: themecolor.TXTWHITE }}> {getdatefun(item.CreatedAt)}</Text>
              </View>
            </View>
          </TouchableOpacity>
        {/* </ScrollView> */}
      </>
    );
  }

  const [closecase, setClosecase] = useState('');
  const [loader, setLoder] = useState(true);
  const [mediaid, setMediaid] = useState();

  const closecasedata = async () => {
    const w_data = await getDatafromAsync('@user');
    const emp_id = w_data.data.EmployeeId;
    // console.log('EMP_ID>>', emp_id);
    const response = await getallTicketsApi(
      `api/getAllTicket?employee_id=${emp_id}&ticket_status=close`,
    );
    // console.log('cllose case response', response);
    setClosecase(response.data);
    if (response.data.length >= 1) {
      setMediaid(response.data[0].TicketType.MediaId);
      // console.log('close ', response.data[0].TicketType.MediaId);
    }
    setLoder(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      closecasedata();
      async function temp() {
        setBaseUrl(await SERVER_URL());
      }
      temp();
    }, []),
  );

  return (
    <>
      {loader ? (
          <LoaderAllInOne />
      ) : (
        <>
         {closecase.length >= 1 ? (
        // <ScrollView>
          <FlatList
            data={closecase}
            keyExtractor={(_,index)=>index}
            renderItem={({ item }) => (
              <DataList item={item} getBaseUrl={getBaseUrl} />
            )}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
          />
        // </ScrollView>
      ) : (
        <NoData message="No close cases" />
      )}
    
        </>
      )}

     </>
  );
};

export default CloseCase;
