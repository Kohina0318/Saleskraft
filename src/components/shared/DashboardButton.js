import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { FontSize } from '../../assets/fonts/Fonts';
import { Colors } from '../../assets/config/Colors';
import { FontFamily } from '../../assets/fonts/FontFamily';
import { useNavigation } from '@react-navigation/native';
import VerifyOutletModal from '../../components/Modals/VerifyOutletModal';
import VerifyOutletModal2 from '../../components/Modals/VerifyOutletModal2';
import { getCheckInOutStatus } from '../../repository/outlet/VerifyOutletRepository';
import { attendanceStatusGetData } from '../../repository/attendence/attendence';
import StockInModal from '../Modals/StockInModal';
import SelectProductModal from '../Modals/SelectModalProduct';
import Stockins2Modal from '../Modals/Stockins2Modal';
import { useSelector } from 'react-redux';
import { useToast } from 'react-native-toast-notifications';
import AgendaModal from '../Modals/AjendaModal';
import { gettripLocationApi } from '../../repository/trip/tripRepository';
import Color, { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { store } from '../../../App';
import { db } from '../../helper/SQLite DB/Sqlite';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import moment from 'moment';
const { width } = Dimensions.get('window');
var status = 'checkin';

const DashboardButton = props => {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  const toast = useToast();
  const navigation = useNavigation();

  const network = useSelector(state => state.network);
  const roles = useSelector(state => state.userRoles);

  const isOutletVerify = useSelector(state => state.isOutletVerify);
  console.log("IsOUTLETVERIFY+++++++", isOutletVerify)

  const [modalVisible1, setmodalVisible1] = useState(false);
  const [modalVisible2, setmodalVisible2] = useState(false);
  const [modalVisible3, setmodalVisible3] = useState(false);
  const [modalVisible4, setmodalVisible4] = useState(false);
  const [outletId, setOutletId] = useState('');
  const [checkInStatus, setCheckInStatus] = useState('');
  const [punchStatus, setPunchStatus] = React.useState('');
  // const [refresh, setRefresh] = React.useState(false);
  const [reason, setReason] = React.useState('');
  const [stockInModal, setStockInModal] = useState(false);
  const [ChangeAgendaModal, setChangeAgendaModal] = useState(false);
  const [Outlets, setOutlets] = React.useState([]);
  const [badge, setBadge] = React.useState({ count: 0, status: false });

  // const [badge1,setBadge1] = React.useState({});

  const checkInOutStatus = async () => {
    try {
      if (network) {
        var res = await getCheckInOutStatus();
        console.log('CheckInOutStatus.....page DashBOARD button line 31..>:', res);
        if (res.statusCode == 200) {
          setCheckInStatus(res.data.data.CheckInStatus);
          console.log("Checkin Status====", res.data.data.CheckInStatus)
          props.setCheckinOutStatus(res.data.data.CheckInStatus);
        }
      }
    } catch (e) {
      console.log("error in checkin out status api ", e)
    }
  };

  useEffect(() => {
    try {
      setBadge({ count: 0, status: false })
      async function temp() {

        console.log("Calling Function temp Inside useEffect in Dashboard Button")
        if (roles.includes('can_verify_outlet')) {
          if (props.title == 'Verify Outlet') {
            checkInOutStatus();
          }
        }
      }
      if (network) {
        temp()
      }
    } catch (e) {
      alert(e)
    }
  }, []);

  React.useEffect(() => {
    async function temp() {
      if (props.title === 'Expense' || props.title == 'Events') {
        var statusEvent = false;
        var statusExpense = false;
        if (props.title == 'Events') {
          statusEvent = await getAllEventsforApproval();
          setBadge(statusEvent)
        }
        if (props.title === 'Expense') {
          statusExpense = await getExpenseApproval();
          setBadge(statusExpense)
        }
      }

      // alert(JSON.stringify(statusEvent))
    }
    if (network) {
      temp();
    }
    return () => {

    }
  }, []);


  const getAllEventsforApproval = async () => {
    console.log("Function Calling of getAllEventsforApproval")
    try {
      const curr_date = moment().format('DD-MM-YYYY');
      const result = await gettripLocationApi(
        `api/getAllPendingApprovalEvent?start_date=${curr_date}`,
      );
      // console.log('resultofevent@@@@@@@@@@@', result)
      if (result?.statusCode == 200) {
        if (result?.data.length >= 1) {
          return { status: true, count: result.data.length };
        } else {
          return { status: false, count: result.data.length };
        }
      }
    } catch (e) {
      console.log('catch error', e);
      return { status: false, count: result.data.length };
    }
  };

  const getExpenseApproval = async () => {
    console.log("Function Calling of getExpenseApproval")
    try {
      const to_date = moment().format('YYYY-MM-DD');
      const from_date = moment().subtract(30, 'd').format('YYYY-MM-DD');
      // alert(from_date + ' - ' + to_date);
      const result = await gettripLocationApi(
        `api/getawatingApprovalExpenses?from_date=${from_date}&to_date=${to_date}`,
      );
      const result1 = await gettripLocationApi(
        `api/getawatingApprovalTripNew?filterdate=${to_date}`,
      );
      // console.log('///////////hhhhhhhhhhhhhhhhhh/', result)

      if (result.statusCode == 200 && result1.statusCode == 200) {
        if (result.data.length >= 1 || result1.data.length >= 1) {
          // console.log('result.dataofrepottes for expenses', result1.data.length + result.data.length);
          return {
            status: true,
            count: result.data.length + result1.data.length,
          };
        } else {
          return { status: false, count: result.data.length };
        }

      } else {
        alert(result.message);
      }
    } catch (e) {
      console.log('catch error', e);
      return false;
    }
  };

  const styles = StyleSheet.create({
    CardText: {
      fontSize: FontSize.verysmallText,
      fontFamily: FontFamily.PopinsMedium,
      color: Colors.black,
      alignSelf: 'center',
      top: 15,
    },
    MainView: { height: 'auto', padding: 1 },
    SecondView: {
      alignSelf: 'center',
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: 0.5,
      flex: 1,
      backgroundColor: Colors.white,
      width: width * 0.30,
      borderRadius: 10,
      borderColor: Colors.borderColor,
      borderWidth: 1,
      height: 110,
    },
    ImageView: {
      backgroundColor: props.bgcolor,
      borderRadius: 50,
      width: 55,
      height: 55,
      justifyContent: 'center',
      alignSelf: 'center',
      top: 15,
    },
    IMGStyle: {
      width: 32,
      height: 32,
      justifyContent: 'center',
      alignSelf: 'center',
    },
    statusTextIn: {
      fontSize: FontSize.verysmallText,
      color: Colors.black,
      fontFamily: FontFamily.PopinsRegular,
      alignSelf: 'center',
      top: 12,
      color: '#44bd32',
    },
    DotStatusGreenColor: {
      width: 5,
      height: 5,
      borderRadius: 10,
      backgroundColor: '#44bd32',
    },
  });

  const handlePress = async () => {
    if (network) {
      try {
        const result = await attendanceStatusGetData('api/punchStatus');
        console.log('status api data ', result);
        console.log(
          'PUNCHIN STATUS  🙌🙌===>========',
          result.data.AttendenceStatus,
        );
        setPunchStatus(result.data.Resp.AttendenceStatus);
        if (result.data.Resp.AttendenceStatus === 'Punched in') {
          setmodalVisible1(true);
        } else {
          // alert('Please Start your day first.');
          toast.show('Please start Your day first', {
            type: 'warning',
            placement: 'bottom',
            duration: 3000,
            offset: 30,
            animationType: 'slide-in',
            badge: { status: false, count: '' },
          });
        }
      } catch (e) {
        console.log("Error in Catch Line 178 in DashboardButton.js==", e)
      }
    }
  };

  const fetchAllOutlets = async () => {
    // ------> Outlets getting from Table Outlets Start ******* 

    try {
      await db.transaction(async tx => {
        await tx.executeSql(`SELECT Out.*,Outyp.* FROM Outlets as Out join OutletsTypes as Outyp on Out.OutlettypeId=Outyp.OutlettypeId`, [], async (tx, results) => {
          console.log('errr', tx);
          console.log('result Line 141--->', results);
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
          }
          console.log('Data returned From Outlets SQLITE In AirporteRoute Line 572----->', temp);
          setOutlets(temp);
          if (temp.length > 0) {
            navigation.push('OutletView', {
              item: temp[0],
              beatName: props.beatName,
              beatId: props.beatId,
              navigateFrom: 'Outlets',
              badge: { status: false, count: '' },
            })
          } else {
            toast.show('Please sync your data first', {
              type: 'danger',
              placement: 'bottom',
              duration: 3000,
              offset: 30,
              animationType: 'slide-in',
              badge: { status: false, count: '' },
            });
          }
        });
      });
    } catch (e) {
      console.log("Error in AirporteRoute in Catch Line 577=========>", e);
    }
  }

  const handleClickOnStockIn = async () => {
    setmodalVisible3(true);
    // alert("Hello")
    // alert(isOutletVerify)
    // if(isOutletVerify == null){
    //   // setmodalVisible3(true);
    // }else{
    //   toast.show('Please start your day', {
    //     type: 'danger',
    //     placement: 'bottom',
    //     duration: 3000,
    //     offset: 30,
    //     animationType: 'slide-in',
    //   });
    // }
  };

  const handleClickOnAgenda = async () => {
    try {
      const punchStatus = await gettripLocationApi('api/punchStatus')
      console.log("punchStatusForChangeAgenda", punchStatus)
      if (punchStatus.statusCode == 200) {
        if (punchStatus.data.Resp.AttendenceStatus == 'Punched in') {
          setChangeAgendaModal(!ChangeAgendaModal);

        } else {
          toast.show('Please start Your day first', {
            type: 'danger',
            placement: 'bottom',
            duration: 3000,
            offset: 30,
            animationType: 'slide-in',
            badge: { status: false, count: '' },
          });
        }
      } else {
        alert(punchStatus.message)
      }
    } catch (e) {
      toast.show('Something went wrong!,please try again later.', {
        type: 'danger',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
    }

    // if(punchStatus.data.AttendenceStatus == 'Punched in'){
    // alert("Hello")
  };

  return (
    // navigation.push(props.navigateTo)
    <>
      {/* {console.log('dash---', props.navigateTo)} */}
      <TouchableOpacity
        activeOpacity={0.5}

        onPress={() => {

          if (props.title == 'Verify Outlet') {
            handlePress();
          }
          else if (props.title == 'Roster Plan' && roles.includes('can_verify_outlet')) {
            if (network) {
              if (isOutletVerify == "Checked in") {
                navigation.push(props.navigateTo, {
                  navigateFrom: 'RoasterPlan',
                  screen: '',
                  badge: { status: false, count: '' },
                });
              } else {
                toast.show('Please Verify Outlet First!', {
                  type: 'warning',
                  placement: 'bottom',
                  duration: 3000,
                  offset: 30,
                  animationType: 'slide-in',
                });
              }
            } else {
              toast.show('No internet.', {
                type: 'danger',
                placement: 'bottom',
                duration: 3000,
                offset: 30,
                animationType: 'slide-in',
              });
            }
          }
          else if (props.title == 'Edit roster plan' && roles.includes('can_verify_outlet')) {
            if (network) {
              if (isOutletVerify == "Checked in") {
                navigation.push(props.navigateTo, {
                  navigateFrom: 'RoasterPlan',
                  screen: 'edit',
                  badge: { status: false, count: '' },
                });
              } else {
                toast.show('Please Verify Outlet First!', {
                  type: 'warning',
                  placement: 'bottom',
                  duration: 3000,
                  offset: 30,
                  animationType: 'slide-in',
                });
              }
            } else {
              toast.show('No internet.', {
                type: 'danger',
                placement: 'bottom',
                duration: 3000,
                offset: 30,
                animationType: 'slide-in',
              });
            }
          }

          else if (props.title == 'Edit Tour Plan') {
            if (network) {
              navigation.push(props.navigateTo, {
                screen: 'edit',
                user: 'true',
                badge: { status: false, count: '' },
              });
            } else {
              toast.show('No internet.', {
                type: 'danger',
                placement: 'bottom',
                duration: 3000,
                offset: 30,
                animationType: 'slide-in',
              });
            }
          }

          else if (props.title == 'Stock In') {
            if (network) {
              if (isOutletVerify == "Checked in") {
                handleClickOnStockIn();
              } else {
                toast.show('Please Verify Outlet First!', {
                  type: 'warning',
                  placement: 'bottom',
                  duration: 3000,
                  offset: 30,
                  animationType: 'slide-in',
                  badge: { status: false, count: '' },
                });
              }
            } else {
              toast.show('No internet.', {
                type: 'danger',
                placement: 'bottom',
                duration: 3000,
                offset: 30,
                animationType: 'slide-in',
              });
            }
          }

          else if (props.title == 'Change Agenda') {
            if (network) {
              handleClickOnAgenda();
            } else {
              toast.show('No internet.', {
                type: 'danger',
                placement: 'bottom',
                duration: 3000,
                offset: 30,
                animationType: 'slide-in',
                badge: { status: false, count: '' },
              });
            }
          }

          else if (props.title == 'Roster Plan') {
            if (network) {
              navigation.push(props.navigateTo, {
                screen: '',
                badge: { status: false, count: '' },
              });
            }
          }

          else if (props.title == 'Edit roster plan') {
            if (network) {
              navigation.push(props.navigateTo, {
                screen: 'edit',
                badge: { status: false, count: '' },
              });
            }
          }

          else if (props.title == 'Product Catalogue') {
            store.dispatch({ type: 'REMOVE_PRIMARY_DISTRIBUTOR' });
            navigation.push('BeatOutletProductCategories', {
              navigateFrom: 'action',
              badge: { status: false, count: '' },
            });
          }

          else if (props.title == 'Outlets') {
            if (network) {
              navigation.push(props.navigateTo, {
                navigateFrom: 'Outlets',
                badge: { status: false, count: '' },
              });
            } else {
              toast.show('No internet.', {
                type: 'danger',
                placement: 'bottom',
                duration: 3000,
                offset: 30,
                animationType: 'slide-in',
              });
            }
          }

          else if (props.title == 'Request Merchandise') {
            if (network) {
              navigation.push(props.navigateTo, {
                navigateFrom: 'RequestMerchandise',
                badge: { status: false, count: '' },
              });
            } else {
              toast.show('No internet.', {
                type: 'danger',
                placement: 'bottom',
                duration: 3000,
                offset: 30,
                animationType: 'slide-in',
              });
            }
          }

          else if (props.title == 'Material') {
            if (network) {
              if (isOutletVerify == "Checked in") {
                navigation.push(props.navigateTo, {
                  navigateFrom: 'Material',
                  badge: { status: false, count: '' },
                });
              } else {
                toast.show('Please Verify Outlet First!', {
                  type: 'warning',
                  placement: 'bottom',
                  duration: 3000,
                  offset: 30,
                  animationType: 'slide-in',
                });
              }
            } else {
              toast.show('No internet.', {
                type: 'danger',
                placement: 'bottom',
                duration: 3000,
                offset: 30,
                animationType: 'slide-in',
              });
            }
          }

          else if (props.title == 'Competition mapping') {
            if (network) {
              if (isOutletVerify == "Checked in") {
                navigation.push(props.navigateTo, {
                  navigateFrom: 'CompetitionMapping',
                  badge: { status: false, count: '' },
                });
              } else {
                toast.show('Please Verify Outlet First!', {
                  type: 'warning',
                  placement: 'bottom',
                  duration: 3000,
                  offset: 30,
                  animationType: 'slide-in',
                });
              }
            } else {
              toast.show('No internet.', {
                type: 'danger',
                placement: 'bottom',
                duration: 3000,
                offset: 30,
                animationType: 'slide-in',
              });
            }
          }

          else if (props.title == 'Sales') {
            if (network) {
              if (isOutletVerify == "Checked in") {
                navigation.push(props.navigateTo, {
                  navigateFrom: 'Sale',
                  badge: { status: false, count: '' },
                });
              } else {
                toast.show('Please Verify Outlet First!', {
                  type: 'warning',
                  placement: 'bottom',
                  duration: 3000,
                  offset: 30,
                  animationType: 'slide-in',
                });
              }
            } else {
              toast.show('No internet.', {
                type: 'danger',
                placement: 'bottom',
                duration: 3000,
                offset: 30,
                animationType: 'slide-in',
              });
            }
          }

          else if (props.title == 'Suggestive Order') {
            if (network) {
              if (isOutletVerify == "Checked in") {
                navigation.push(props.navigateTo, {
                  navigateFrom: 'SuggestiveOrder',
                  badge: { status: false, count: '' },
                });
              } else {
                toast.show('Please Verify Outlet First!', {
                  type: 'warning',
                  placement: 'bottom',
                  duration: 3000,
                  offset: 30,
                  animationType: 'slide-in',
                });
              }
            } else {
              toast.show('No internet.', {
                type: 'danger',
                placement: 'bottom',
                duration: 3000,
                offset: 30,
                animationType: 'slide-in',
              });
            }
          }

          else if (props.title == 'Primary Order') {
            if (isOutletVerify == "Checked in") {
              // navigation.push(props.navigateTo, {
              //   navigateFrom: 'PrimaryOrders',
              // });
              fetchAllOutlets();
            } else {
              toast.show('Please Verify Outlet First!', {
                type: 'warning',
                placement: 'bottom',
                duration: 3000,
                offset: 30,
                animationType: 'slide-in',
              });
            }
          }

          else if (props.title == 'Case/Grievance' && roles.includes('can_verify_outlet')) {
            if (network) {
              if (isOutletVerify == "Checked in") {
                navigation.push(props.navigateTo, {
                  navigateFrom: 'Caselist',
                  badge: { status: false, count: '' },
                });
              } else {
                toast.show('Please Verify Outlet First!', {
                  type: 'warning',
                  placement: 'bottom',
                  duration: 3000,
                  offset: 30,
                  animationType: 'slide-in',
                });
              }
            } else {
              toast.show('No internet.', {
                type: 'danger',
                placement: 'bottom',
                duration: 3000,
                offset: 30,
                animationType: 'slide-in',
              });
            }
          }

          else if (props.title == 'Offers & Promotion' && roles.includes('can_verify_outlet')) {
            if (network) {
              if (isOutletVerify == "Checked in") {
                navigation.push(props.navigateTo, {
                  navigateFrom: 'OfferPromotion',
                  badge: { status: false, count: '' },
                });
              } else {
                toast.show('Please Verify Outlet First!', {
                  type: 'warning',
                  placement: 'bottom',
                  duration: 3000,
                  offset: 30,
                  animationType: 'slide-in',
                });
              }
            } else {
              toast.show('No internet.', {
                type: 'danger',
                placement: 'bottom',
                duration: 3000,
                offset: 30,
                animationType: 'slide-in',
              });
            }
          }

          else if (props.title == 'Events' && roles.includes('can_verify_outlet')) {
            if (network) {
              if (isOutletVerify == "Checked in") {
                navigation.push(props.navigateTo, {
                  navigateFrom: 'Events',
                });
              } else {
                toast.show('Please Verify Outlet First!', {
                  type: 'warning',
                  placement: 'bottom',
                  duration: 3000,
                  offset: 30,
                  animationType: 'slide-in',
                });
              }
            } else {
              toast.show('No internet.', {
                type: 'danger',
                placement: 'bottom',
                duration: 3000,
                offset: 30,
                animationType: 'slide-in',
              });
            }
          }

          else if (props.title == 'My Team' && roles.includes('can_verify_outlet')) {
            if (network) {
              if (isOutletVerify == "Checked in") {
                navigation.push(props.navigateTo, {
                  navigateFrom: 'My Team',
                });
              } else {
                toast.show('Please Verify Outlet First!', {
                  type: 'warning',
                  placement: 'bottom',
                  duration: 3000,
                  offset: 30,
                  animationType: 'slide-in',
                });
              }
            } else {
              toast.show('No internet.', {
                type: 'danger',
                placement: 'bottom',
                duration: 3000,
                offset: 30,
                animationType: 'slide-in',
              });
            }
          }


          else if (props.title == 'Expense' && roles.includes('can_verify_outlet')) {
            if (network) {
              if (isOutletVerify == "Checked in") {
                navigation.push(props.navigateTo, {
                  navigateFrom: 'ExpenseCard',
                });
              } else {
                toast.show('Please Verify Outlet First!', {
                  type: 'warning',
                  placement: 'bottom',
                  duration: 3000,
                  offset: 30,
                  animationType: 'slide-in',
                });
              }
            } else {
              toast.show('No internet.', {
                type: 'danger',
                placement: 'bottom',
                duration: 3000,
                offset: 30,
                animationType: 'slide-in',
              });
            }
          }


          else {

            if (network) {
              navigation.push(props.navigateTo, {
                screen: '',
              });
            } else {
              toast.show('No internet.', {
                type: 'danger',
                placement: 'bottom',
                duration: 3000,
                offset: 30,
                animationType: 'slide-in',
              });
            }
          }
        }}>

        <View style={styles.MainView}>
          <View style={{ ...styles.SecondView, backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR }}>
            <View style={{ ...styles.ImageView, position: 'relative' }}>
              <Image
                style={styles.IMGStyle}
                source={props.iconimg}
                resizeMode={'contain'}
              />
              {
                network ?
                  (badge.status ?
                    <View style={{ backgroundColor: 'orange', borderRadius: 15, width: badge.count >= 10 ? 35 : 22, height: 22, position: 'absolute', top: -5, right: -4, justifyContent: 'center', alignItems: 'center', borderWidth: 0.5, borderColor: Colors.borderColor1 }} >
                      <Text style={{ color: 'white', fontFamily: FontFamily.Popinssemibold, fontSize: FontSize.labelText }} >{(badge.count >= 10) ? `${badge.count}+` : badge.count}</Text>
                    </View> : <></>
                  ) : (<></>)
              }
            </View>
            <Text numberOfLines={2} ellipsizeMode='tail' style={{ ...styles.CardText, paddingVertical: 5, textAlign: 'center', color: themecolor.TXTWHITE }}>{props.title}</Text>


            {props.title == 'Verify Outlet' && status != '' ? (
              <>
                {checkInStatus == 'Checked in' ? (
                  <Text style={styles.statusTextIn}>
                    <View style={styles.DotStatusGreenColor} /> In
                  </Text>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <></>
            )}
          </View>
        </View>

      </TouchableOpacity>

      {/*================...otp modal start...=============== */}

      {modalVisible1 ? (
        <VerifyOutletModal
          modalVisible1={modalVisible1}
          setmodalVisible1={setmodalVisible1}
          handleOpen2={outletId => {
            console.log('outletId---------------->', outletId);
            setmodalVisible1(false);
            setmodalVisible2(true);
            setOutletId(outletId);
          }}
        />
      ) : (
        <></>
      )}
      {modalVisible2 ? (
        <VerifyOutletModal2
          outletId={outletId}
          modalVisible2={modalVisible2}
          setmodalVisible2={setmodalVisible2}
          setmodalVisible1={setmodalVisible1}
        />
      ) : (
        <></>
      )}

      {modalVisible3 ? (
        <>
          <StockInModal
            setmodalVisible3={setmodalVisible3}
            setmodalVisible4={setmodalVisible4}
            setReason={setReason}
            setStockInModal={setStockInModal}
          />
        </>
      ) : (
        <></>
      )}

      {modalVisible4 ? (
        <>
          <SelectProductModal
            setmodalVisible3={setmodalVisible3}
            setmodalVisible4={setmodalVisible4}
            reason={reason}
            setStockInModal={setStockInModal}
          />
        </>
      ) : (
        <></>
      )}

      {stockInModal ? (
        <>
          <Stockins2Modal setStockInModal={setStockInModal} setmodalVisible3={setmodalVisible3} />
        </>
      ) : (
        <></>
      )}
      {ChangeAgendaModal ? (
        <>
          <AgendaModal setShowagenda={setChangeAgendaModal} showagenda={ChangeAgendaModal} changeAgenda={true} />
        </>
      ) : (
        <></>
      )}
    </>
  );
};

const DashboardButtonShimmer = (props) => {

  const styles = StyleSheet.create({
    CardText: {
      fontSize: FontSize.verysmallText,
      fontFamily: FontFamily.PopinsMedium,
      color: Colors.black,
      alignSelf: 'center',
      top: 15,
    },
    MainView: { height: 'auto', padding: 1 },
    SecondView: {
      alignSelf: 'center',
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: 0.5,
      flex: 1,
      backgroundColor: Colors.white,
      width: width * 0.30,
      borderRadius: 10,
      borderColor: Colors.borderColor,
      borderWidth: 1,
      height: 110,
    },
    ImageView: {
      backgroundColor: props.bgcolor,
      borderRadius: 50,
      width: 55,
      height: 55,
      justifyContent: 'center',
      alignSelf: 'center',
      top: 15,
    },
    IMGStyle: {
      width: 32,
      height: 32,
      justifyContent: 'center',
      alignSelf: 'center',
    },
    statusTextIn: {
      fontSize: FontSize.verysmallText,
      color: Colors.black,
      fontFamily: FontFamily.PopinsRegular,
      alignSelf: 'center',
      top: 12,
      color: '#44bd32',
    },
    DotStatusGreenColor: {
      width: 5,
      height: 5,
      borderRadius: 10,
      backgroundColor: '#44bd32',
    },
  });
  return (
    <SkeletonPlaceholder>
      <View
        style={styles.MainView}
      >
        <View style={{ ...styles.SecondView, backgroundColor: Color.Color.BOXTHEMECOLOR, borderColor: Color.Color.BOXBORDERCOLOR }}>
          <View style={{ ...styles.ImageView, position: 'relative' }}>
          </View>
          <View style={{ width: width * 0.2, height: 10, top: 20 }}></View>
        </View>
      </View>
    </SkeletonPlaceholder>
  )
}

export { DashboardButton, DashboardButtonShimmer };
