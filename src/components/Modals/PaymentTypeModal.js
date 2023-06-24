import React, { useState } from 'react';
import { Modal, View, Text, Image } from 'react-native';
import StyleCss from '../../assets/css/styleOutlet';
import styles from '../../assets/css/styleChangeAgenda';
import { FlatList } from 'react-native-gesture-handler';
import { Colors } from '../../assets/config/Colors';
// import {
//   createTripApi,
//   gettripLocationApi,
// } from '../../repository/trip/tripRepository';
// import { useNavigation } from '@react-navigation/native';
// import {
//   getDatafromAsync,
//   StoreDatatoAsync,
// } from '../../repository/AsyncStorageServices';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useToast } from 'react-native-toast-notifications';
// import OTPModel from './OTPModel';
// import Spinner from 'react-native-loading-spinner-overlay';
// import {
//   insertStockData,
//   outletBeatDump,
//   TruncateAllTables,
//   insertOutcomeData,
//   insertMappingData,
//   insertStockDataIfNotInserted,
// } from '../../screens/SharedScreens/InsertData';
// import {
//   getUserCurrentLocationCommon,
//   requestLocationPermission,
// } from '../../repository/commonRepository';
// import { useSelector } from 'react-redux';
// import { attendancePostData } from '../../repository/attendence/attendence';
// import LoaderAllInOne from '../../components/shared/Loader';
// import { RoasterPlanOutlets } from '../../repository/dashboard/DashboardRepository';
// import { db } from '../../helper/SQLite DB/Sqlite';
// import Video from 'react-native-video';

export default function PaymentTypeModal(props) {
  const [modalVisible, setModalVisible] = useState(true);
  // const [agendaid,setAgendaId] = useState();

  var data = [
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
    {
      id: 4,
    },
    {
      id: 5,
    },
    {
      id: 6,
    },
    {
      id: 7,
    },
    {
      id: 8,
    },
  ];

  const squareCard = ({ item }) => {
    return (
      <View
        style={{
          marginTop: 5,
          marginLeft: 2,
          marginRight: 2,
          paddingVertical: 10,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: Colors.borderColor1,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          height: 60,
          //   width:90
        }}>
        <Text>{item.id}</Text>
      </View>
    );
  };

  return (
    <>
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onDismiss={() => {
            setModalVisible(!modalVisible);
          }}
          onRequestClose={() => {
            props.setShowagenda(!props.showagenda);
            setModalVisible(!modalVisible);
          }}>
          <View style={StyleCss.centeredView}>
            <View style={{ ...StyleCss.modalView, backgroundColor: '#F9F9F9' }}>
              <View style={StyleCss.ModalViewWidth}>

                {/* <View style={{}}> */}
                <Image
                  source={require('../../assets/images/pay.gif')}
                  style={{ height: 180, width: '100%' }}
                  resizeMode={'contain'}
                />
                {/* </View> */}
                <Text style={StyleCss.submittext}>Select Payment Mode</Text>

                <View style={styles.H} />
                <View style={{}}>
                  <FlatList
                    data={data}
                    renderItem={squareCard}
                    numColumns={3}
                    columnWrapperStyle={{
                      flex: 1,
                      justifyContent: 'space-around',
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
}
