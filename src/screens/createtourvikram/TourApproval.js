import { View, Text, FlatList, Dimensions, Modal, TextInput, BackHandler } from 'react-native';
import React, { useEffect, useState } from 'react';
import { gettripLocationApi } from '../../repository/trip/tripRepository';
import moment from 'moment';
import Header_2 from '../../components/shared/Header_2';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector, useDispatch } from 'react-redux';
import { Checkbox } from 'react-native-paper';
import FullsizeButton from '../../components/shared/FullsizeButton';
import { useToast } from 'react-native-toast-notifications';
import { Picker } from '@react-native-picker/picker';
import styles from '../../assets/css/stylesDashboard';
import NoData from '../../components/shared/NoData';
import { FontFamily } from '../../assets/fonts/FontFamily';
import { Colors } from '../../assets/config/Colors';
import { db } from '../../helper/SQLite DB/Sqlite';

const { width } = Dimensions.get('window');

const TourRequestList = ({
  beats,
  item,
  themecolor,
  handleCheckedTp,
  listOfIds,
  setOutlets,
  getOutletNames,
}) => {
  console.log('item are', item);
  // {"BeatId": null, "CompanyId": 2, "EmployeeId": 7, "OutletIds": "2,9", "TpDate": "2022-12-06", "TpId": 1545, "TpRemark": "", "TpState": "RosterPlan", "TpStatus": 0}

  useEffect(() => {
    async function temp() {
      db.transaction(async tx => {
        try {
          console.log('item.OutletIds.length1', item.OutletIds);
        } catch (e) {
          console.log('Catch Log===>');
        }
        if (item.OutletIds != '') {
          // alert('hi')
          item.OutletIds.toString()
            .split(',')
            .forEach(async itm1 => {
              console.log('Line 61 item-->', itm1);

              await tx.executeSql(
                `SELECT * from Outlets where Id='${itm1}'`,

                [],
                async (tx, results) => {
                  // console.log("llllll 3222",results)
                  console.log('Length====>01 ', results.rows.length);
                  if (results.rows.length > 0) {
                    console.log('results Line 183 ===>  SalesOrder', results);
                    var temp = [];
                    for (let i = 0; i < results.rows.length; ++i) {
                      temp.push(results.rows.item(i));
                    }
                    console.log('Temp[0===>', temp[0]);
                    setOutlets(prev => ({ ...prev, [itm1]: temp[0].OutletName }));
                    console.log(
                      '[itm1]:temp[0].OutletName',
                      temp[0].OutletName,
                    );
                    console.log('Outlets ======> Line 75=====>', temp);
                  } else {
                    console.log('Error SalesOrde 31 In  Line 188 ===> ', tx);
                  }
                },
              );
            });
        }
      });
    }

    // outletId[item.Id]

    if (item.BeatId == null && item.TpState == 'RosterPlan') {
      try {
        // alert('hi')
        temp();
      } catch (e) {
        console.log('Error Line 90', e);
      }
    }
  }, [item]);

  return (
    <View
      style={{
        backgroundColor: themecolor.BOXTHEMECOLOR,
        borderColor: themecolor.BOXBORDERCOLOR1,
        marginTop: 6,
        borderRadius: 10,
        padding: 5,
        borderWidth: 0.6,
      }}>
      <View
        style={{
          width: width * 0.8,
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <View
          style={{
            width: '15%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Checkbox
            status={
              listOfIds.includes(`${item.TpId}`) ? 'checked' : 'unchecked'
            }
            uncheckedColor={themecolor.TXTWHITE}
            onPress={() => handleCheckedTp(item)}
            color={themecolor.ICON}
          />
        </View>
        <View style={{ width: '80%' }}>
          <View style={{ alignItems: 'center', flexDirection: 'row' }}>
            <Text
              style={{
                color: themecolor.TXTWHITE,
                padding: 1,
                fontWeight: 'bold',
              }}>
              Date :
            </Text>
            <Text style={{ color: themecolor.TXTWHITE, padding: 1 }}>
              {item.TpDate == undefined || item.TpDate == null
                ? 'not available'
                : item.TpDate.split('-').reverse().join('-')}
            </Text>
          </View>
          <View style={{ alignItems: 'center', flexDirection: 'row' }}>
            <Text
              style={{
                color: themecolor.TXTWHITE,
                padding: 1,
                fontWeight: 'bold',
              }}>
              Activity -
            </Text>
            <Text style={{ color: themecolor.TXTWHITE, padding: 1 }}>
              {item.TpState}
            </Text>
          </View>

          {item.TpState == 'RosterPlan' || item.TpState == 'FieldWork' ?
            (<View style={{ flexDirection: 'row' }}>
              <Text
                style={{
                  color: themecolor.TXTWHITE,
                  padding: 1,
                  fontWeight: 'bold',
                }}>
                Selection -
              </Text>
              <Text
                style={{ color: themecolor.TXTWHITE, padding: 1, width: '80%' }}>
                {
                  item.BeatId != null ? beats[item.BeatId] : item.TpRemark
                }
              </Text>
            </View>
            ) : (<></>)
          }
        </View>
        {/* <View
          style={{
            width: '20%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              setShowModal(true);
              setPlandate(item.TpDate);
            }}>
            <FIcon name="edit" size={20} color={themecolor.ICON} />
          </TouchableOpacity>
        </View> */}
      </View>
    </View>
  );
};

export default TourApproval = props => {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();
  const toast = useToast();
  const [requests, setRequests] = useState([]);
  const [outlets, setOutlets] = React.useState({});
  const [beats, setBeats] = useState({});
  const [plandate, setPlandate] = useState('');
  const [tpList, setTpList] = useState({});

  console.log('OutletIds----------------->>>>', outlets);

  React.useEffect(() => { }, [outlets]);

  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();
  const tpIds = useSelector(state => state.pendingTpIds);
  const listOfIds = Object.keys(tpIds);
  // alert(listOfIds)

  const [modalVisible, setModalVisible] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [activity, setActivity] = useState('');
  // alert(JSON.stringify(listOfIds))

  function handleBackButtonClick() {
    props.navigation.goBack();
    dispatch({ type: 'REMOVE_ALL_TP_IDS' });
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


  const handleCheckedTp = item => {
    // alert(JSON.stringify(item));
    if (listOfIds.includes(`${item.TpId}`)) {
      dispatch({ type: 'REMOVE_TP_BY_ID', payload: [item.TpId, item] });
    } else {
      dispatch({ type: 'ADD_TP_BY_ID', payload: [item.TpId, item] });
    }
  };

  const getOutletNames = ({ OutletIds, TpState }) => {
    console.log('ids are ==', OutletIds);
    console.log('outlets are ==😊', outlets);

    return OutletIds.split(',').map(itm => {
      if (outlets[itm] === undefined || outlets[itm] === null) {
        return ` ${TpState == 'RosterPlan' ? 'no mapping, ' : 'not needed'}`;
      } else {
        return `${outlets[itm]}, `;
      }
    });
  };

  const getPendingRequests = async () => {
    try {
      const empId = props.route.params.empId;
      const startDate = moment().format('YYYY-MM-DD');
      const endDate = moment()
        .add(2, 'months')
        .endOf('month')
        .format('YYYY-MM-DD');
      const result = await gettripLocationApi(
        `api/getPendingTPbyEmployee?employee_id=${empId}&from_date=${startDate}&to_date=${endDate}`,
      );
      // alert(JSON.stringify({empId,startDate,endDate}))
      console.log('data for tesing pending for approval tp ', result.data);
      if (result.statusCode == 200) {
        setBeats(result.data.beats);
        console.log('list of tour plans==>>', result.data.tourplan);
        // add a filter because only submited roster requests should be sheen ====
        const fData = result.data.tourplan.filter(item => {
          return item.TpState != null;
        });
        // alert(JSON.stringify(fData))
        // =================================
        setRequests(fData);
      } else {
        alert(result.message);
      }
    } catch (err) {
      console.log('Error catch in Tour Approval', err);
    }
  };

  const getTpstateList = async () => {
    try {
      const result = await gettripLocationApi('api/getTPStates');
      if (result.statusCode == 200) {
        setTpList(result.data);
      } else {
        alert(result.message);
      }
    } catch (e) {
      console.log('Error in line 205 Tour Approval Page', e);
    }
  };

  useEffect(() => {
    getPendingRequests();
    getTpstateList();
  }, []);

  const acceptPlan = async () => {
    // alert(listOfIds)
    console.log('tpids list ==', listOfIds);
    if (listOfIds.length > 0) {
      try {
        const result = await gettripLocationApi(
          `api/approveTP?tpid=${listOfIds}`,
        );
        if (result.statusCode == 200) {
          props.navigation.goBack();
          toast.show(result.message, {
            type: 'success',
            placement: 'bottom',
            duration: 4000,
            offset: 30,
            animationType: 'slide-in',
          });
          dispatch({ type: 'REMOVE_ALL_TP_IDS' });
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      toast.show('Please select atleast one request ', {
        type: 'warning',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: themecolor.THEMECOLOR }}>
      <Header_2
        title="Pending Requests"
        onPress={() => {
          props.navigation.goBack();
          dispatch({ type: 'REMOVE_ALL_TP_IDS' });
        }}
      />
      <View style={{ width: '94%', alignSelf: 'center', flex: 1 }}>
        {requests.length > 0 ? (
          <FlatList
            data={requests}
            keyExtractor={i => {
              i.TpId;
            }}
            renderItem={({ item, index }) => (
              <TourRequestList
                item={item}
                props={props}
                themecolor={themecolor}
                handleCheckedTp={handleCheckedTp}
                beats={beats}
                checked={checked}
                setChecked={setChecked}
                listOfIds={listOfIds}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                showModal={showModal}
                setShowModal={setShowModal}
                activity={activity}
                setActivity={setActivity}
                setPlandate={setPlandate}
                index={index}
                setOutlets={setOutlets}
                getOutletNames={getOutletNames}
              />
            )}
            ListFooterComponent={<View style={{ marginVertical: 40 }} />}
          />
        ) : (
          <NoData message="No pending requests" />
        )}
      </View>
      {requests.length > 0 ? (
        <View style={{ position: 'absolute', bottom: 10, alignSelf: 'center' }}>
          <FullsizeButton
            title="Approve"
            width={width * 0.94}
            backgroundColor={themecolor.HEADERTHEMECOLOR}
            onPress={() => acceptPlan()}
          />
        </View>
      ) : (
        <></>
      )}
      {showModal && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={true}
          onRequestClose={() => {
            setShowModal(false);
          }}>
          <View style={{ ...styles.centeredView }}>
            <View
              style={{
                ...styles.modalView,
                backgroundColor: themecolor.LIGHTGREY,
              }}>
              <View style={{ ...styles.Modal85 }}>
                <Text
                  style={{
                    fontFamily: FontFamily.Popinssemibold,
                    fontWeight: '800',
                    fontSize: 17,
                    color: 'black',
                  }}>
                  Add plan for{' '}
                  {plandate == undefined || plandate == null
                    ? 'not available'
                    : plandate.split('-').reverse().join('-')}{' '}
                </Text>
                <View style={{ marginVertical: 10 }} />
                <View>
                  <Text
                    style={{
                      fontFamily: FontFamily.PopinsRegular,
                      fontWeight: '800',
                    }}>
                    Activity
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 12,
                      height: 48,
                      borderWidth: 1,
                      borderColor: Colors.borderColor1,
                      color: Colors.grey,
                      overflow: 'hidden',
                      marginTop: 5,
                    }}>
                    <Picker
                      selectedValue={activity}
                      onValueChange={(itemValue, itemIndex) =>
                        setActivity(itemValue)
                      }
                      style={{ color: themecolor.TXTWHITE, width: '100%' }}>
                      {Object.keys(tpList).map(item => {
                        return (
                          <Picker.Item label={item} value={item} key={item} />
                        );
                      })}
                    </Picker>
                  </View>
                </View>
                <View style={{ height: 10 }} />
                <View>
                  <Text
                    style={{
                      fontFamily: FontFamily.PopinsRegular,
                      fontWeight: '800',
                    }}>
                    Remark
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 12,
                      height: 48,
                      borderWidth: 1,
                      borderColor: Colors.borderColor1,
                      color: Colors.grey,
                      overflow: 'hidden',
                      marginTop: 5,
                    }}>
                    <TextInput style={{ width: '100%', left: 5 }} />
                  </View>
                </View>
                <View style={{ height: 10 }}></View>
                <View>
                  <Text
                    style={{
                      fontFamily: FontFamily.PopinsRegular,
                      fontWeight: '800',
                    }}>
                    Beats
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 12,
                      height: 48,
                      borderWidth: 1,
                      borderColor: Colors.borderColor1,
                      color: Colors.grey,
                      overflow: 'hidden',
                      marginTop: 5,
                    }}>
                    <Picker
                      selectedValue={activity}
                      onValueChange={(itemValue, itemIndex) =>
                        setActivity(itemValue)
                      }
                      style={{ color: themecolor.TXTWHITE, width: '100%' }}>
                      {/* {getActivity()} */}
                      <Picker.Item label="select" value="" />
                    </Picker>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};
