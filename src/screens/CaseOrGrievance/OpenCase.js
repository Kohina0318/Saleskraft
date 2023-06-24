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
import styles from '../../assets/css/styleGrievance';
import { getallTicketsApi } from '../../repository/CaseGrievance/CaseGrievance';
import { getDatafromAsync } from '../../repository/AsyncStorageServices';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import DummyImage from '../../components/shared/DummyImage';
import LoaderAllInOne from '../../components/shared/Loader';
import NoData from '../../components/shared/NoData';
import { SERVER_URL } from '../../repository/commonRepository';
import moment from 'moment';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';
import { Colors } from '../../assets/config/Colors';
const { width } = Dimensions.get('window');

export default function OpenCase(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  const navigation = useNavigation();
  const [getBaseUrl, setBaseUrl] = React.useState('')

  function DataList({ item, getBaseUrl }) {
    console.log('media_id', item.TicketType.MediaId);
    return (
      <>
        {/* <ScrollView showsVerticalScrollIndicator={false}> */}
          <TouchableOpacity
            key={item.id}
            style={{ ...styles.flatContainer, backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR1 }}
            onPress={() =>
              navigation.navigate('CaseDescription', { Case_id: item.Id })
            }>
            <View style={{ overflow: 'hidden', justifyContent: 'center', alignItems: 'center', height: 50, width: 50, borderRadius: 80, marginLeft: 2, borderWidth: 1 }}>
              {(item.TicketType.MediaId == null || item.TicketType.MediaId == '') ? (
                <DummyImage width={50} height={50} />
              ) : (
                <Image
                  source={{ uri: `${getBaseUrl}media?id=${item.TicketType.MediaId}` }}
                  style={styles.img}
                />
              )}
            </View>
            <View style={styles.margleft10}>
              <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                style={{ ...styles.txt1, left: 3, width: width * 0.7, color: themecolor.TXTWHITE }}>
                {item.TicketType.TicketType}
              </Text>
              {/* <Text style={styles.txt2}>{`${item.time},${item.date}`}</Text> */}
              <View
                style={{
                  ...styles.view1,
                  width: width * 0.65,
                  justifyContent: 'flex-start',
                  left: 3
                }}>
                <FontAwesome
                  name="user-circle"
                  style={{ alignSelf: 'flex-start', top: 3 }}
                  size={12}
                  color={Colors.bluetheme1}
                  // color={themecolor.ICON}
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
                  left: 3.5,
                }}>
                {/* <Image
                  source={require('../../assets/images/addoutlet/calendar.png')}
                  style={{width: 10, height: 10}}
                  resizeMode="center"
                /> */}
                <Text><FontAwesome name='calendar' color={Colors.bluetheme1} size={10} /></Text>
                <Text style={{ ...styles.txt2, color: themecolor.TXTWHITE }}> {getdatefun(item.CreatedAt)}</Text>
              </View>
            </View>
          </TouchableOpacity>
        {/* </ScrollView> */}
      </>
    );
  }

  const [opencase, setOpencase] = useState('');
  const [loader, setLoder] = useState(true);
  // const [mediaid,setMediaid] = useState()

  const getdatefun = date => {
    let final_date = moment(date).format('Do MMM YYYY  HH:mm A');
    return final_date;
  };

  const opencasedata = async () => {
    const w_data = await getDatafromAsync('@user');
    const emp_id = w_data.data.EmployeeId;
    // console.log('EMP_ID>>', emp_id);
    const response = await getallTicketsApi(
      `api/getAllTicket?employee_id=${emp_id}&ticket_status=open`,
    );
    setOpencase(response.data);
    setLoder(false);
    // console.log(
    //   'dataa open case 4545==>',
    //   getdatefun(response.data[0].CreatedAt),
    // );
    // console.log('786 > ', response.data[0].TicketType.MediaId);
    // const media_id = response.data[0].MediaId
    // setMediaid(response.data[0].TicketType.MediaId)
    // response.data.map((item, index) => {
    //   console.log("mediaId>", item.MediaId)
    // var response_2 = await gettripLocationApi(`api/getMedia?media_ids=${item.MediaId}`)
    // })
  };

  useFocusEffect(
    React.useCallback(() => {

      opencasedata();
      async function temp() {
        setBaseUrl(await SERVER_URL())
      }
      temp()
    }, []),
  );
  console.log('length of opencase', opencase.length);

  return (
    <>
      {loader ? (
          <LoaderAllInOne />
      ) : (
        <>
         {opencase.length >= 1 ? (
        // <ScrollView showsVerticalScrollIndicator={false}>
          <FlatList
            data={opencase}
            renderItem={({ item }) => <DataList item={item} getBaseUrl={getBaseUrl} />}
            showsVerticalScrollIndicator={false}
            scrollEnabled={true}
            ListFooterComponent={<View style={{ height: 30 }}></View>}
          />
        // </ScrollView>
      ) : (
        <NoData message="No open cases" />
      )}
      </>
      )}
     
    </>
  );
}
