import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { MainNavigatorstyle } from '../../assets/css/MainNavigatorstyle';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Image as ImageR } from 'react-native';
import { navigate } from '../NavigationDrw/NavigationService';
import { Colors } from '../../assets/config/Colors';
import { getCurrentVersion, getEmployeeId, handleLogout, SERVER_URL } from '../../repository/commonRepository';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import MasterSyncModal from '../../components/shared/MasterSyncModal';
import { useToast } from 'react-native-toast-notifications';
import { gettripLocationApi } from '../../repository/trip/tripRepository';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { SharedMethod } from '../../repository/SyncData/SharedMethods';
import { store } from '../../../App';
import moment from 'moment';
import { getCheckInOutStatus } from '../../repository/outlet/VerifyOutletRepository';
import SLIcon from 'react-native-vector-icons/SimpleLineIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';

const { width } = Dimensions.get('window');

export default function DrawerContent(props) {

  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()

  var scopes = useSelector(state => state.userRoles);
  var network = useSelector(state => state.network);
  var toast = useToast();
  const navigation = useNavigation();
  const [refresh, setRefresh] = React.useState(false);
  const [eventStatus, setEventStatus] = useState(false);
  const [expenseStatus, setExpenseStatus] = useState(false);
  const isOutletVerify = useSelector(state => state.isOutletVerify);
  const [getBaseUrl, setBaseUrl] = React.useState('')
  const [currentVersion, setCurrentVersion] = React.useState('')

  React.useEffect(() => {
    async function temp() {
      setBaseUrl(await SERVER_URL())
      setCurrentVersion(await getCurrentVersion());
    }
    temp()
  }, [])

  useEffect(() => {
    async function temp() {
      var sharemethodobj = new SharedMethod();
      await sharemethodobj.syncAllDataCheckInCheckOutData();
      setTimeout(async () => {
        await sharemethodobj.syncAllOrderData();
      }, 2000);
    }
    if (network) {
      temp();
    }
  }, [props]);

  const getAllEventsforApproval = async () => {
    try {
      const curr_date = moment().format('DD-MM-YYYY');
      const result = await gettripLocationApi(
        `api/getAllPendingApprovalEvent?start_date=${curr_date}`,
      );
      // console.log('result of getevents in dashboardgrid', result);
      if (result?.statusCode == 200) {
        if (result?.data.length >= 1) {
          // setCanApproveEvent(1);
          return true;
        } else {
          return false;
        }
        // console.log('In dashboard grid component event data', result.data);
      }
    } catch (e) {
      console.log('catch error', e);
      return false;
    }
  };

  const getExpenseApproval = async () => {
    try {
      const to_date = moment().format('DD-MM-YYYY');
      const from_date = moment().subtract(30, 'd').format('DD-MM-YYYY');
      // api/getawatingApprovalExpenses?from_date=2022-04-01&to_date=2022-09-07
      const result = await gettripLocationApi(
        `api/getawatingApprovalExpenses?from_date=${from_date}&to_date=${to_date}`,
      );
      if (result.statusCode == 200) {
        // alert(JSON.stringify(result))
        if (result.data.length >= 1) {
          // setCanApproveEvent(1);
          console.log('result.dataofrepottes for expenses', result.data);
          return true;
        } else {
          return false;
        }
      } else {
        alert(result.message);
      }
    } catch (e) {
      console.log('catch error', e);
      return false;
    }
  };

  useEffect(() => {
    const temp1 = async () => {
      const eventStat = await getAllEventsforApproval();
      //  alert(eventStat)
      setEventStatus(eventStat);
      const expenseStat = await getExpenseApproval();
      setExpenseStatus(expenseStat);

    }
    temp1()
  }, []);

  useEffect(() => {
    async function temp() {
      var sharemethodobj = new SharedMethod();
      setTimeout(async () => {
        await sharemethodobj.insertStockDataIfNotInserted();
      }, 1000);
    }
    if (network) {
      temp();
    }
  }, [props, refresh]);

  const [empid, setEmpId] = useState();
  const [name, setName] = useState('');
  const [ppicture, setPpicture] = useState('');
  const [modalVisible1, setModalVisible1] = React.useState(false);
  const [outletId, setOutletId] = React.useState('')

  const handleLogoutFun = async () => {
    await handleLogout();
  };

  async function userdatafetch() {
    if (network) {

      const empId = await getEmployeeId();
      const d = await gettripLocationApi(`api/getProfile?EmployeeId=${empId}`);
      const fname = d.data.FirstName;
      const lname = d.data.LastName;
      const emp = d.data.EmployeeCode;
      const pp = d.data.ProfilePicture;
      console.log("User Profile=========149==", d)
      setPpicture(pp);
      setEmpId(emp);
      // setName(
      //   `${fname.slice(0, 1).toUpperCase()}${fname.slice(1).toLowerCase()} ${lname
      //     .slice(0, 1)
      //     .toUpperCase()}${lname.slice(1).toLowerCase()}`,
      // );
      try {

        if (d.data.FirstName != null) {
          setName(fname)
        }
      }


      catch (e) {
        setName('')
      }
      //----
      try {

        if (d.data.LastName != null) {
          setName(`${fname} ${d.data.LastName}`)
        }
      }


      catch (e) {
        setName(`${d.data.FirstName}`)
      }
      // setName(fname)
    } else {
      var d = await AsyncStorage.getItem('@userprofile');
      console.log("User Profile=========158", d)
      d = JSON.parse(d);
      const fname = d.data.FirstName;
      const lname = d.data.LastName;
      const emp = d.data.EmployeeCode;
      const pp = d.data.ProfilePicture;
      setPpicture(pp);
      setEmpId(emp);
      // setName(
      //   `${fname.slice(0, 1).toUpperCase()}${fname.slice(1).toLowerCase()} ${lname
      //     .slice(0, 1)
      //     .toUpperCase()}${lname.slice(1).toLowerCase()}`,
      // );  

      try {

        if (d.data.FirstName != null) {
          setName(fname)
        }
      }


      catch (e) {
        setName('')
      }
      //----
      try {

        if (d.data.LastName != null) {
          setName(`${fname} ${d.data.LastName}`)
        }
      }


      catch (e) {
        setName(`${d.data.FirstName}`)
      }

    }
  }

  useEffect(() => {
    userdatafetch();
  }, [props]);

  const handleGotoTransactionalSync = () => {
    navigation.push('SyncDataScreen', {
      navigateFrom: '',
    });
  };

  const checkInOutStatus = async () => {
    const res = await getCheckInOutStatus();
    console.log(
      'Get Check In Out Status......page Drawer Content  line 165',
      res,
    );
    setOutletId(res.data.data.CheckInRec.OutletId);
  };

  useEffect(() => {
    try {
      if (scopes?.includes('can_verify_outlet')) {
        checkInOutStatus();
      }
      
    } catch (e) {console.log("Errror......>>",e) }
  }, []);


  return (
    // <>
    <DrawerContentScrollView
      showsVerticalScrollIndicator={false}
      style={{
        // backgroundColor: Colors.white,
        borderTopRightRadius: 35,
        borderBottomRightRadius: 35,
        overflow: 'hidden',
        width: width * 0.65,
        backgroundColor: themecolor.THEMECOLOR1,
        borderColor: themecolor.BOXBORDERCOLOR1,
        borderWidth: 1,
      }}
      {...props}>
      <View style={{ ...MainNavigatorstyle.drawerContent, }}>
        <View style={MainNavigatorstyle.userInfoSection}>
          <View style={MainNavigatorstyle.userinfo1}>
            <ImageR
              style={{ ...MainNavigatorstyle.userimg, backgroundColor: 'transparent' }}
              source={require('../../assets/images/app,intro,splashscreen,login/saleskraftlogo.png')}
            />
            <View style={{ marginVertical: 5 }} />
            <View style={{ ...MainNavigatorstyle.Borderline, borderWidth: 1.5, borderColor: themecolor.BOXBORDERCOLOR1 }} />
            <View style={{ marginVertical: 2 }} />
            <View style={MainNavigatorstyle.view1}>
              <View style={{ borderRadius: 100, overflow: 'hidden' }}>
                {ppicture ? (
                  <ImageR
                    source={{
                      uri: `${getBaseUrl}uploads/2/${ppicture}`,
                    }}
                    style={MainNavigatorstyle.view1img}
                    resizeMode={'contain'}
                  />
                ) : (
                  <ImageR
                    source={require('../../assets/images/dummyuser.png')}
                    style={MainNavigatorstyle.view1img}
                    resizeMode={'cover'}
                  />
                )}
              </View>
              <View style={{ width: width * 0.5, left: 15 }}>
                <Text style={{ ...MainNavigatorstyle.signintext, color: themecolor.TXTWHITE }}>
                  {name}
                </Text>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => navigate('')}>
                  <Text style={{ ...MainNavigatorstyle.signintextmini, top: -8, }}>
                    {empid}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ ...MainNavigatorstyle.Borderline, borderWidth: 1.5, borderColor: themecolor.BOXBORDERCOLOR1 }} />
            <View style={{ paddingVertical: 5 }} />
            <ScrollView showsVerticalScrollIndicator={false}>
              <TouchableOpacity
                onPress={() => navigate('NewDashboard')}
                style={MainNavigatorstyle.viewstyle}>
                <ImageR
                  source={require('../../assets/images/sidemenu/home.png')}
                  style={MainNavigatorstyle.labelicon}
                />
                <Text style={{ ...MainNavigatorstyle.labelstylecss, color: themecolor.TXTWHITE }}>Home</Text>
              </TouchableOpacity>


              {scopes?.includes('can_do_sales') ? (
                <TouchableOpacity
                  style={MainNavigatorstyle.viewstyle}
                  onPress={() => {
                    if (network) {
                      if (isOutletVerify == 'Checked in') {
                        navigation.dispatch(DrawerActions.closeDrawer());
                        navigate('OrderList', { outletId: outletId, outletType: false, index: 0 });
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
                  }}>
                  <SLIcon name="social-dropbox" size={18} style={{ color: '#3862F8', }} />
                  <Text style={{ ...MainNavigatorstyle.labelstylecss, color: themecolor.TXTWHITE }}>Order</Text>
                </TouchableOpacity>
              ) : (
                <></>
              )}

              {scopes?.includes('can_view_outlet') ? (
                <TouchableOpacity
                  onPress={() => {
                    navigation.dispatch(DrawerActions.closeDrawer());
                    navigate('Outlets');
                  }}
                  style={MainNavigatorstyle.viewstyle}>
                  <ImageR
                    source={require('../../assets/images/sidemenu/retailer.png')}
                    style={MainNavigatorstyle.labelicon}
                  />
                  <Text style={{ ...MainNavigatorstyle.labelstylecss, color: themecolor.TXTWHITE }}>Outlet</Text>
                </TouchableOpacity>
              ) : (
                <></>
              )}

              {scopes?.includes('can_add_outlet') ? (
                <TouchableOpacity
                  onPress={() => {
                    navigation.dispatch(DrawerActions.closeDrawer());
                    navigation.push('RetailerCustomer', {
                      navigateFrom: 'DrawerContent',
                    });
                  }}
                  style={MainNavigatorstyle.viewstyle}>
                  <ImageR
                    source={require('../../assets/images/sidemenu/retailer.png')}
                    style={MainNavigatorstyle.labelicon}
                  />
                  <Text style={{ ...MainNavigatorstyle.labelstylecss, color: themecolor.TXTWHITE }}>
                    Retailer / Customer / Tele.
                  </Text>
                </TouchableOpacity>
              ) : (
                <></>
              )}

              {scopes?.includes('can_do_beats') ? (
                <TouchableOpacity
                  onPress={() => {
                    if (network) {
                      navigation.dispatch(DrawerActions.closeDrawer());
                      navigate('CreateTour', {
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
                  }}
                  style={MainNavigatorstyle.viewstyle}>
                  <ImageR
                    source={require('../../assets/images/sidemenu/beatplanning.png')}
                    style={MainNavigatorstyle.labelicon}
                    resizeMode={'contain'}
                  />
                  <Text style={{ ...MainNavigatorstyle.labelstylecss, color: themecolor.TXTWHITE }}>
                    Beat Planning
                  </Text>
                </TouchableOpacity>
              ) : (
                <></>
              )}

              {scopes?.includes('can_view_offers') ? (
                <TouchableOpacity
                  style={MainNavigatorstyle.viewstyle}
                  onPress={() => {
                    if (network) {
                      if (scopes?.includes('can_verify_outlet')) {
                        if (isOutletVerify == 'Checked in') {
                          navigation.dispatch(DrawerActions.closeDrawer());
                          navigate('OfferPromotion');
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
                        navigate('OfferPromotion');
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
                  }}>
                  <ImageR
                    source={require('../../assets/images/sidemenu/offers.png')}
                    style={MainNavigatorstyle.labelicon}
                    resizeMode={'contain'}
                  />
                  <Text style={{ ...MainNavigatorstyle.labelstylecss, color: themecolor.TXTWHITE }}>
                    Offers & Promotion
                  </Text>
                </TouchableOpacity>
              ) : (
                <></>
              )}

              {scopes?.includes('can_download_catalogue') ? (
                <TouchableOpacity
                  onPress={() => {
                    navigation.dispatch(DrawerActions.closeDrawer());
                    store.dispatch({ type: 'REMOVE_PRIMARY_DISTRIBUTOR' });
                    navigate('BeatOutletProductCategories', {
                      navigateFrom: 'action',
                    });
                  }}
                  style={MainNavigatorstyle.viewstyle}>
                  <ImageR
                    source={require('../../assets/images/sidemenu/productcatalogue.png')}
                    style={MainNavigatorstyle.labelicon}
                  />
                  <Text style={{ ...MainNavigatorstyle.labelstylecss, color: themecolor.TXTWHITE }}>
                    Product Catalogue
                  </Text>
                </TouchableOpacity>
              ) : (
                <></>
              )}

              {scopes?.includes('can_do_expenses') ? (
                <TouchableOpacity
                  onPress={() => {
                    if (network) {
                      if (scopes.includes('can_verify_outlet')) {
                        if (isOutletVerify == 'Checked in') {
                          navigation.dispatch(DrawerActions.closeDrawer());
                          navigate('ExpenseCard');
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
                        navigate('ExpenseCard');
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
                  }}
                  style={MainNavigatorstyle.viewstyle}>
                  <ImageR
                    source={require('../../assets/images/sidemenu/expense.png')}
                    style={MainNavigatorstyle.labelicon}
                  />
                  <Text style={{ ...MainNavigatorstyle.labelstylecss, color: themecolor.TXTWHITE }}>Expense</Text>
                </TouchableOpacity>
              ) : (
                <></>
              )}

              {/* {scopes.includes("can_do_trips") ? (
                <TouchableOpacity style={MainNavigatorstyle.viewstyle}
                  onPress={() => navigate('Trip')}>
                  <ImageR
                    source={require('../../assets/images/sidemenu/trips.png')}
                    style={MainNavigatorstyle.labelicon}
                  />
                  <Text style={MainNavigatorstyle.labelstylecss}>Trips</Text>
                </TouchableOpacity>
              ) : (<></>)} */}

              {scopes?.includes('can_add_events') ? (
                <TouchableOpacity
                  style={MainNavigatorstyle.viewstyle}
                  onPress={() => {
                    if (network) {
                      if (scopes?.includes('can_verify_outlet')) {
                        if (isOutletVerify == 'Checked in') {
                          navigation.dispatch(DrawerActions.closeDrawer());
                          navigate('Events');
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
                        navigate('Events');
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
                  }}>
                  <ImageR
                    source={require('../../assets/images/sidemenu/leave.png')}
                    style={MainNavigatorstyle.labelicon}
                  />
                  <Text style={{ ...MainNavigatorstyle.labelstylecss, color: themecolor.TXTWHITE }}>Event</Text>
                </TouchableOpacity>
              ) : (
                <></>
              )}

              {scopes?.includes('can_competition_mapping') ? (
                <TouchableOpacity
                  style={MainNavigatorstyle.viewstyle}
                  onPress={() => {
                    if (network) {
                      if (isOutletVerify == 'Checked in') {
                        navigation.dispatch(DrawerActions.closeDrawer());
                        navigate('CompetitionMapping');
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
                  }}>
                  <ImageR
                    source={require('../../assets/images/sidemenu/Competition.png')}
                    style={MainNavigatorstyle.labelicon}
                  />
                  <Text style={{ ...MainNavigatorstyle.labelstylecss, color: themecolor.TXTWHITE }}>
                    Competition Mapping
                  </Text>
                </TouchableOpacity>
              ) : (
                <></>
              )}

              {scopes?.includes('can_do_material') ? (
                <TouchableOpacity
                  style={MainNavigatorstyle.viewstyle}
                  onPress={() => {
                    if (network) {
                      if (isOutletVerify == 'Checked in') {
                        navigation.dispatch(DrawerActions.closeDrawer());
                        navigate('Material');
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
                  }}>
                  <ImageR
                    source={require('../../assets/images/sidemenu/material.png')}
                    style={MainNavigatorstyle.labelicon}
                  />
                  <Text style={{ ...MainNavigatorstyle.labelstylecss, color: themecolor.TXTWHITE }}>Material</Text>
                </TouchableOpacity>
              ) : (
                <></>
              )}

              {scopes?.includes('can_book_cases') ? (
                <TouchableOpacity
                  style={MainNavigatorstyle.viewstyle}
                  onPress={() => {
                    if (network) {
                      if (scopes?.includes('can_verify_outlet')) {
                        if (isOutletVerify == 'Checked in') {
                          navigation.dispatch(DrawerActions.closeDrawer());
                          navigate('Caselist');
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
                        navigate('Caselist');
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
                  }}>
                  <ImageR
                    source={require('../../assets/images/sidemenu/case.png')}
                    style={MainNavigatorstyle.labelicon}
                  />
                  <Text style={{ ...MainNavigatorstyle.labelstylecss, color: themecolor.TXTWHITE }}>
                    Case/Grievance
                  </Text>
                </TouchableOpacity>
              ) : (
                <></>
              )}


              {scopes?.includes('can_view_orders') ? (
                <TouchableOpacity
                  style={MainNavigatorstyle.viewstyle}
                  onPress={() => {
                    if (network) {
                      navigation.dispatch(DrawerActions.closeDrawer());
                      navigate('NewOrderList');
                    } else {
                      toast.show('No internet.', {
                        type: 'danger',
                        placement: 'bottom',
                        duration: 3000,
                        offset: 30,
                        animationType: 'slide-in',
                      });
                    }
                  }}>
                  {/* <ImageR
                    source={require('../../assets/images/sidemenu/recentOrder.png')}
                    style={{ ...MainNavigatorstyle.labelicon, width: 17, height: 18 }}
                  /> */}
                  <MCIcon  name="cart-arrow-right" color={Colors.bluetheme}  style={{ fontSize:20,}}/>
                  <Text style={{ ...MainNavigatorstyle.labelstylecss, color: themecolor.TXTWHITE }}>
                    Recent Orders
                  </Text>
                </TouchableOpacity>
              ) : (
                <></>
              )}



              {network ? (
                <TouchableOpacity
                  style={{
                    ...MainNavigatorstyle.viewstyle,
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    navigation.dispatch(DrawerActions.closeDrawer());
                    handleGotoTransactionalSync()}}>
                  {/* <ImageR
                    source={require('../../assets/images/sidemenu/logout.png')}
                    style={MainNavigatorstyle.labelicon}
                  /> */}
                  <Text>
                    <MCIcon
                      name="sync"
                      size={20}
                      color={Colors.bluetheme}
                    />
                  </Text>
                  <Text style={{ ...MainNavigatorstyle.labelstylecss, color: themecolor.TXTWHITE }}>
                    Transactional Sync
                  </Text>
                </TouchableOpacity>
              ) : null}
              {network ? (
                <TouchableOpacity
                  style={MainNavigatorstyle.viewstyle}
                  onPress={() => setModalVisible1(!modalVisible1)}>
                  <Text>
                    <MCIcon
                      name="database-sync"
                      size={20}
                      color={Colors.bluetheme}
                    />
                  </Text>
                  <Text style={{ ...MainNavigatorstyle.labelstylecss, color: themecolor.TXTWHITE }}>
                    Master Sync
                  </Text>
                </TouchableOpacity>
              ) : null}

              <TouchableOpacity
                disabled={!network ? true : false}
                style={MainNavigatorstyle.viewstyle}
                onPress={() => {navigation.dispatch(DrawerActions.closeDrawer());handleLogoutFun()}}>
                <ImageR
                  source={require('../../assets/images/sidemenu/logout.png')}
                  style={MainNavigatorstyle.labelicon}
                />
                <Text style={{ ...MainNavigatorstyle.labelstylecss, color: network ? themecolor.TXTWHITE : 'grey' }}>Logout</Text>
              </TouchableOpacity>
            </ScrollView>

            <View style={{ marginVertical: 10 }} />
            <View style={MainNavigatorstyle.view2}>
              <View
                style={{ ...MainNavigatorstyle.Borderline, borderWidth: 1.5, borderColor: themecolor.BOXBORDERCOLOR1 }}
              />
              <Text style={MainNavigatorstyle.view2txt}>App Version {currentVersion} </Text>
            </View>
          </View>
        </View>
        <View style={{ ...MainNavigatorstyle.Borderline, borderWidth: 1.5, borderColor: themecolor.BOXBORDERCOLOR1 }} />
        {/* Master Sync Modal */}
        {modalVisible1 ? (
          <MasterSyncModal
            setModalVisible1={setModalVisible1}
            modalVisible1={modalVisible1}
            setRefresh={setRefresh}
            refresh={refresh}
          />
        ) : (
          <></>
        )}
        {modalVisible1 ? (
          navigation.dispatch(DrawerActions.closeDrawer())
        ) : (
          <></>
        )}
      </View>
    </DrawerContentScrollView>
    // </>
  );
}
