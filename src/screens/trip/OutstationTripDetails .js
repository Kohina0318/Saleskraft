import {
  Text,
  View,
  Dimensions,
  StatusBar,
  TextInput,
  ScrollView,
  TouchableOpacity,
  BackHandler,
  Modal
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from '../../assets/config/Colors';
import { FontFamily } from '../../assets/fonts/FontFamily';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  createTripApi,
  gettripLocationApi,
} from '../../repository/trip/tripRepository';
import { useToast } from 'react-native-toast-notifications';
import styles from '../../assets/css/styleTrip';
import stylesH from '../../assets/css/styleProducts';
import Header_2 from '../../components/shared/Header_2';
import { FontSize } from '../../assets/fonts/Fonts';
import ActionButton from 'react-native-action-button';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import IoIcon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import stylesp from '../../assets/css/styleProducts';
import ConfirmationModal from '../../components/Modals/ConfirmationModal';
import { useFocusEffect } from '@react-navigation/native';
import LoaderAllInOne from '../../components/shared/Loader';
import AddMoreExpModal from '../../components/Modals/AddMoreExpModal';
import { StackActions, useNavigation } from '@react-navigation/native';
const { width, height } = Dimensions.get('screen');
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';
import {
  CreateCard,
  AmountCard,
  TableShow
} from '../../components/ExpenseData/TripdetailsData';
import moment from 'moment';

const OutstationTripDetails = props => {
  const toast = useToast();
  const navigation = useNavigation();
  // console.log(
  //   'PARAMS>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>55',
  //   props.route.params,
  // );
  function handleBackButtonClick() {
    try {
      if (props.route.params.navigateFrom == 'addexpense') {
        const popAction = StackActions.pop(2);
        navigation.dispatch(popAction);
        return true;
      } else {
        navigation.goBack();
        return true;
      }
    } catch (e) {
      navigation.goBack();
      return true;
    }
  }

  // alert(props.route.params.Manager)

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

  let headerdate = props.route.params.date1;
  let expId = props.route.params.expId;
  // alert(expId)
  // console.log('546985689', props.route.params);
  if (props.route.params.workingat) {
    var workingat = props.route.params.workingat;
    // console.log('addressnworking', workingat);
  } else {
    // console.log('else');
  }
  // console.log('headerdate==>>0', headerdate);

  // const [trAmount, setTrAmount] = useState(0);
  // const [fAmount, setFAmount] = useState(0);
  const [masterData, setMasterData] = useState([]);
  const [expTrip, setExpTrip] = useState([]);
  const [expenseCreateAt, setExpCreateAt] = useState('');
  const [expdata, setExpdata] = useState({});
  const [firstName, setFirstName] = useState('');
  const [lastName, setLatstName] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [expcreatedate, setExpCreateDate] = useState('');
  const [expstatuses, setExpstatuses] = useState([]);
  const [refreshm, setRefreshm] = useState(false);
  const [loader, setLoader] = useState(true);
  const [wtfRemark, setWtfRemark] = useState('');
  // const [lineItemData,setLineItemsData] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [addMoreExpModal, setAddMoreExpModal] = useState(false);

  const [moreExparr, setMoreExparr] = useState([]);
  const [moreexpid, setMoreexpid] = useState([]);
  // alert(wtfRemark)
  // const [moreExpenses, setMoreExpenses] = useState([]);
  const [remark, setRemark] = useState('');

  const [modalVisible5, setmodalVisible5] = useState(false);

  const [noteTxt, setNoteTxt] = useState('')

  // console.log('master__000111', masterData);
  // console.log('expense_data__000111888888', expdata.ExpenseStatus);
  const functionborder = () => {
    let arr = [];
    for (let i = 0; i < 120; i++) {
      arr.push(i);
    }
    return arr.map((_, index) => {
      return <Icon key={index} name="caret-up" size={8} color={themecolor.HEADERTHEMECOLOR} />;
    });
  };

  const getExpenseMaster = async () => {
    setLoader(true);
    // console.log('expense id under expensemaster api', expId);
    const result = await createTripApi(`api/getExpensesMaster?ExpId=${expId}`);
    // console.log('result of master api ', result.data);
    if (result.statusCode == 200) {
      setLoader(false);
      setMasterData(result.data.data);
      setRemark(result.data.expenses.ExpenseNote);
      // alert(result.data.expenses.Employee.FirstName.slice(0,1).toUpperCase()+result.data.expenses.Employee.FirstName.slice(1,).toLowerCase())
      // setLineItemsData(result.data.data[0].ExpenseListDetailss)
      setExpTrip(result.data.trip);
      setExpCreateAt(result.data.expenses.CreatedAt);
      setExpdata(result.data.expenses);
      setFirstName(
        result.data.expenses.Employee.FirstName?.slice(0, 1).toUpperCase() +
        result.data.expenses.Employee.FirstName?.slice(1).toLowerCase(),
      );
      setLatstName(
        result.data.expenses.Employee.LastName?.slice(0, 1).toUpperCase() +
        result.data.expenses.Employee.LastName?.slice(1).toLowerCase(),
      );
      setProfilePicture(result.data.expenses.Employee.ProfilePicture);
      // alert(result.data.expenses.Employee.ProfilePicture)
      setExpCreateDate(
        result.data.expenses.CreatedAt?.split(' ')[0]
          .split('-')
          .reverse()
          .join('-'),
      );
      // console.log('trips in master api', result.data);
      setLoader(false);
    } else {
      // alert(result.message);
      setLoader(false);
    }
  };

  useEffect(() => {
    const fetchexpensestatus = async () => {
      const response = await gettripLocationApi('api/getStatus');
      if (response.statusCode == 200) {
        setExpstatuses(response.data[0].Expenses);
        // console.log('expenses status', response.data[0]);
      } else {
        alert(response.message);
      }
    };
    fetchexpensestatus();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getExpenseMaster();
    }, [refreshm]),
  );

  const SubheaderT = ({ expTrip }) => {
    var statusColor = '';
    if (
      expstatuses[expdata.ExpenseStatus] == 'Approved' ||
      expstatuses[expdata.ExpenseStatus] == 'Submit'
    ) {
      statusColor = '#00C46F';
    } else if (expstatuses[expdata.ExpenseStatus] == 'Created') {
      statusColor = 'orange';
    } else if (expstatuses[expdata.ExpenseStatus] == 'Proceed for Payment') {
      statusColor = 'green';
    }
    else if (expstatuses[expdata.ExpenseStatus] == 'Hold') {
      statusColor = '#f9ca24';
    } else {
      statusColor = 'red';
    }

    let tripStartdate = expTrip.TripStartDate.split(' ')[0]
      .split('-')
      .reverse()
      .join('-');
    let tripEnddate = expTrip.TripEndDate.split(' ')[0]
      .split('-')
      .reverse()
      .join('-');

    return (
      <View style={{ ...styles.headerwhitebox, }}>
        <View style={stylesp.CUSTOMERdvIEW}>
          <TouchableOpacity activeOpacity={0.5} onPress={() => { }} style={{}}>
            <View style={stylesp.NumberInputView}>
              <View
                style={{
                  ...stylesp.Width85,
                  justifyContent: 'center',
                  alignSelf: 'center',
                }}>
                <View
                  style={{
                    ...stylesp.FLEXDIREC1,
                    justifyContent: 'space-between',
                  }}>
                  <Text style={stylesp.RateText}>
                    <FAIcon
                      size={15}
                      name="map-marker"
                      color={Colors.bluetheme}
                    />{' '}
                    &nbsp;{expTrip.TripOriginName}
                  </Text>
                </View>
                <View
                  style={{
                    ...stylesp.FLEXDIREC1,
                    justifyContent: 'space-between',
                  }}>
                  <Text style={stylesp.RateText}>
                    <FAIcon
                      size={15}
                      name="map-marker"
                      color={Colors.bluetheme}
                    />{' '}
                    {expTrip.TripDestinationName}
                  </Text>
                  <View style={{ ...stylesp.FLEXDIRECTIONROW, top: -8 }}>
                    <Text
                      style={{
                        ...stylesp.RateTextboldOrangeCircle,
                        color: statusColor,
                        textAlign: 'right',
                      }}>
                      {(expstatuses[expdata.ExpenseStatus] == 'Approved' ||
                        expstatuses[expdata.ExpenseStatus] == 'Submit') && (
                          <FAIcon name="check-circle" />
                        )}
                      {expstatuses[expdata.ExpenseStatus] == 'Created' && (
                        <MIcon name="error-outline" />
                      )}
                      {expstatuses[expdata.ExpenseStatus] == 'Rejected' && (
                        <Feather name="x-circle" />
                      )}
                      {expstatuses[expdata.ExpenseStatus] ==
                        'Proceed for Payment' && <FAIcon name="check-circle" />}
                      {expstatuses[expdata.ExpenseStatus] ==
                        'Hold' && <FAIcon name="circle" />}
                      &nbsp;{expstatuses[expdata.ExpenseStatus]}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    ...stylesp.FLEXDIREC1,
                    justifyContent: 'space-between',
                  }}>
                  <Text style={stylesp.RateText}>
                    <FAIcon
                      size={10}
                      name="calendar"
                      color={Colors.bluetheme}
                    />{' '}
                    {tripStartdate}
                    <Text style={{ fontFamily: FontFamily.Popinssemibold }}>
                      {' '}
                      to{' '}
                    </Text>{' '}
                    {tripEnddate}
                  </Text>
                  <Text style={{ ...stylesp.RateText, top: -8 }}>
                    {expcreatedate}
                  </Text>
                </View>
                <View
                  style={{
                    ...stylesp.FLEXDIREC1,
                    justifyContent: 'space-between',
                  }}>
                  <Text style={stylesp.RateText}></Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={stylesp.MV1} />
        <View style={styles.m}>{functionborder()}</View>
      </View>

    );
  };

  const SubheaderE = () => {
    var statusColor = '';
    var Icon = '';

    if (
      expstatuses[expdata.ExpenseStatus] == 'Approved' ||
      expstatuses[expdata.ExpenseStatus] == 'Submit'
    ) {
      statusColor = '#00C46F';
      Icon = (
        <>
          <FAIcon name="check-circle" />
        </>
      );
    } else if (expstatuses[expdata.ExpenseStatus] == 'Created') {
      statusColor = 'orange';
      Icon = (
        <>
          <MIcon name="error-outline" />
        </>
      );
    } else if (expstatuses[expdata.ExpenseStatus] == 'Proceed for Payment') {
      statusColor = 'green';
      Icon = (
        <>
          <FAIcon name="check-circle" />
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
      <View style={{ ...styles.headerwhitebox, height: 80 }}>
        <View style={stylesp.CUSTOMERdvIEW}>
          <TouchableOpacity activeOpacity={0.5} onPress={() => { }} style={{}}>
            {/* <View style={stylesp.NumberInputView}> */}
            <View
              style={{
                ...stylesp.Width85,
                justifyContent: 'center',
                // alignSelf: 'center',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  ...stylesp.FLEXDIREC1,
                  justifyContent: 'space-between',
                  width: '70%',
                }}>
                <Text style={stylesp.RateText}>
                  <FAIcon
                    size={15}
                    name="map-marker"
                    color={Colors.bluetheme}
                  />{' '}
                  {expdata.ExpensePlacewrk}
                </Text>
              </View>

              <View
                style={{
                  width: '30%',
                }}>
                <View style={{ alignSelf: 'flex-end' }}>
                  <Text
                    style={{
                      ...stylesp.RateTextboldOrangeCircle,
                      color: statusColor,
                      textAlign: 'right',
                    }}>
                    {Icon}&nbsp;{expstatuses[expdata.ExpenseStatus]}
                  </Text>
                  <Text style={stylesp.RateText}>{expcreatedate}</Text>
                </View>
              </View>
            </View>
            {/* </View> */}
            <View>
              <View
                style={{
                  ...stylesp.FLEXDIREC1,
                  // justifyContent: 'space-between',
                }}>
                <Text style={stylesp.RateText}>
                  <FAIcon size={10} name="calendar" color={Colors.bluetheme} />
                  {/* {tripstartdate}{' '} */}
                  <Text
                    style={{
                      fontFamily: FontFamily.PopinsMedium,
                      textAlign: 'right',
                    }}>
                    {moment(expdata?.ExpenseDate).format('DD-MM-YYYY')}
                  </Text>
                  {/* {tripenddate} */}
                </Text>
                <Text style={{ ...stylesp.RateText, top: -8 }}>
                  {/* {tripcreateat} */}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={stylesp.MV1} />
        <View style={styles.m}>{functionborder()}</View>
      </View>
    );
  };

  const deleteExpense = async () => {
    // console.log('expId85978', expId);
    try {
      const result = await gettripLocationApi(`api/expDeleteNew?pk=${expId}`);
      // console.log('delete expense fun', result);
      if (result.statusCode == 200) {
        toast.show(result.message, {
          type: 'success',
          placement: 'bottom',
          duration: 4000,
          offset: 30,
          animationType: 'slide-in',
        });
        props.navigation.navigate('ExpenseList');
      } else {
        toast.show(result.message, {
          type: 'success',
          placement: 'bottom',
          duration: 4000,
          offset: 30,
          animationType: 'slide-in',
        });
      }
    } catch (er) {
      console.log('catch error in expense delete', er);
    }
  };

  // ==========================================Add More Expense===========================================

  const addMoreExpense = async () => {
    try {
      if (expstatuses[expdata.ExpenseStatus] == 'Created') {
        const result = await gettripLocationApi(`api/addMoreExp/${expId}`);
        // console.log('result458568', result);
        if (result.statusCode == 200) {
          // console.log('addmoreExp data56456', result.data);
          // let exparr = [];
          // result.data.map(item => {
          //   exparr.push(item.value);
          // });
          setMoreExparr(result.data);
          if (result.data.length >= 1) {
            setAddMoreExpModal(true);
          } else {
            alert('no more expenses to add');
          }
        } else if (result.statusCode == 100) {
          toast.show(result.message, {
            type: 'warning',
            placement: 'bottom',
            duration: 4000,
            offset: 30,
            animationType: 'slide-in',
          });
        }
      } else {
        toast.show(
          `Sorry Can not add more expense.expense is already in ${expstatuses[expdata.ExpenseStatus]
          } state`,
          {
            type: 'warning',
            placement: 'bottom',
            duration: 4000,
            offset: 30,
            animationType: 'slide-in',
          },
        );
      }
    } catch (e) {
      alert(e);
    }
    // ?==================================?
    // setLoader(true);
    // console.log(expId);
    // // api/addMoreExpPost/48?ExpMasterId%5B%5D=2
    // const result = await gettripLocationApi(`api/addMoreExp/${expId}`);
    // console.log('result458568', result);
    // if (result.statusCode == 200) {
    //   console.log('addmoreExp data', result.data);
    //   toast.show(result.message, {
    //     type: 'success',
    //     placement: 'bottom',
    //     duration: 4000,
    //     offset: 30,
    //     animationType: 'slide-in',
    //   });
    //   let exparr = [];
    //   result.data.map(item => {
    //     exparr.push(item.value);
    //   });
    //   console.log('data after making array', exparr);
    //   const resultep = await createTripApi(
    //     `api/addMoreExpPost/${expId}?ExpMasterId%5B%5D=${exparr}`,
    //   );
    //   console.log('add more expense post console', resultep);
    // } else if (result.statusCode == 100) {
    //   toast.show(result.message, {
    //     type: 'warning',
    //     placement: 'bottom',
    //     duration: 4000,
    //     offset: 30,
    //     animationType: 'slide-in',
    //   });
    //   setLoader(false);
    // }
    // setRefreshm(!refreshm);
  };

  const submitExpenseforApproval = async (status) => {
    try {
      if (expstatuses[expdata.ExpenseStatus] == 'Created' || props.route.params.Manager === "Manager") {
        if (expdata.ExpenseReqAmt < 1) {
          toast.show(
            `There is no requested amount. So you can not submit this expense`,
            {
              type: 'warning',
              placement: 'bottom',
              duration: 4000,
              offset: 30,
              animationType: 'slide-in',
            },
          );
        } else {
          var result = await createTripApi(`api/expensesApproved?ExpId=${expId}&status=${status}&note=${noteTxt}`)
          if (result.statusCode == 200) {
            toast.show(result.message, {
              type: 'success',
              placement: 'bottom',
              duration: 4000,
              offset: 30,
              animationType: 'slide-in',
            });
            { props.route.params.Manager === "Manager" && props.navigation.goBack() }
            setRefreshm(!refreshm);
          } else {
            toast.show(result.message, {
              type: 'warning',
              placement: 'bottom',
              duration: 4000,
              offset: 30,
              animationType: 'slide-in',
            });
          }
        }
      } else {
        toast.show(
          `Sorry You can not Submit already ${expstatuses[expdata.ExpenseStatus]
          } expense`,
          {
            type: 'warning',
            placement: 'bottom',
            duration: 4000,
            offset: 30,
            animationType: 'slide-in',
          },
        );
      }
    } catch (err) {
      console.log('catch error from submit for approval', err);
    }
  };
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()

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
      <View style={{ height, backgroundColor: themecolor.THEMECOLOR }}>
        <StatusBar translucent backgroundColor="transparent" />

        <View style={{ ...stylesH.HeaderMainVIew, height: height * 0.24, backgroundColor: themecolor.HEADERTHEMECOLOR }}>
          <Header_2
            title={moment(expdata?.ExpenseDate).format('DD-MM-YYYY')}
            iconname=""
            onPressIconPlus={() => {
              expstatuses[expdata.ExpenseStatus] == 'Created'
                ? setDeleteModal(true)
                : toast.show(
                  `Sorry can not delete ${expstatuses[expdata.ExpenseStatus]
                  } expense`,
                  {
                    type: 'danger',
                    placement: 'bottom',
                    duration: 4000,
                    offset: 30,
                    animationType: 'slide-in',
                  },
                );
            }}
            iconnameplus="trash"
            Size={20}
            IconSize={18}
            onPressIcon={() => refRBSheet1.current.open()}
            onPress={() => handleBackButtonClick()}
          />
          <View style={{ ...styles.b }}>
            {expTrip.TripId == undefined ? (
              <SubheaderE />
            ) : (
              <SubheaderT expTrip={expTrip} />
            )}
          </View>
          <View style={styles.MV} />
        </View>
        <View
          style={{
            ...styles.bodypart1,
            backgroundColor: '#f5f5f5',
            height: height * 0.7,
            backgroundColor: themecolor.THEMECOLOR
          }}>
          <ScrollView >
            <CreateCard
              expenseCreateAt={expenseCreateAt}
              fname={firstName}
              lname={lastName}
              picture={profilePicture}
            />
            <View style={{ marginVertical: 5 }} />
            <AmountCard expdata={expdata} />
            <View style={{ marginVertical: 5 }} />
            <TableShow
              H1={'Title'}
              H2={'Requested'}
              H3={'Final'}
              H4={''}
              manager={props.route.params.Manager}
              masterData={masterData}
              expenseStat={expdata.ExpenseStatus}
              expense_statuses={expstatuses}
              refreshm={refreshm}
              setRefreshm={setRefreshm}
            // expenseStatus={expstatuses}
            // moreExpenses={moreExpenses}
            // lineItemData={lineItemData}
            />
            <View style={{ marginVertical: 1.5 }} />
            {props.route.params.Manager != 'Manager' &&
              <View style={{ width: width * 0.93, alignSelf: 'center' }}>
                <TouchableOpacity
                  style={{ ...styles.BigTextInputView, alignSelf: 'flex-end' }}
                  onPress={() => addMoreExpense()}>
                  <Text style={{ ...styles.title, color: Colors.bluetheme1 }}>
                    <MCIcon name="plus" size={14} /> Add more expense
                  </Text>
                </TouchableOpacity>
              </View>
            }
            <View style={{ marginVertical: 2 }} />
            <View
              style={{
                ...styles.BigTextInputView,
                width: width * 0.95,
                alignSelf: 'center',
              }}>
              <Text style={{ ...styles.title, color: themecolor.TXTWHITE }}>{expstatuses[expdata.ExpenseStatus] == 'Submit' ? 'Remark' : 'Add Remark'}</Text>
              <View
                style={{
                  ...styles.textContainer1,
                  alignSelf: 'center',
                  ...styles.Height70,
                  backgroundColor: '#FFFFFF',
                  borderWidth: 0.5,
                  borderColor: themecolor.BOXBORDERCOLOR1,
                  width: width * 0.95,
                  backgroundColor: themecolor.BOXTHEMECOLOR
                }}>
                <TextInput
                  placeholder=""
                  value={remark}
                  editable={
                    expstatuses[expdata.ExpenseStatus] == 'Submit'
                      ? false
                      : true
                  }
                  keyboardType="name-phone-pad"
                  multiline={true}
                  style={{ ...styles.TextArea, top: 0, color: themecolor.TXTWHITE }}
                  onChangeText={t => setRemark(t)}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
      <ActionButton
        backdrop={false}
        activeOpacity={0.85}
        shadowStyle={styles.elevation}
        backgroundTappable={false}
        buttonColor={Colors.bluetheme1}
        position="right"
        offsetX={25}
        offsetY={25}
        size={45}
        outRangeScale={1.1}
        inRangeScale={1.1}
        bgColor="rgba(0,0,0,.5)"
        degrees={180}
        // icon={<Fontisto name="nav-icon-grid" size={20} color={Colors.white} />}
        renderIcon={() => <Fontisto name="nav-icon-grid" size={20} color={Colors.white} />}
      >
        <ActionButton.Item
          shadowStyle={styles.elevation}
          size={35}
          title={props.route.params.Manager === "Manager" ? "Approve" : "Submit for Approval"}
          buttonColor={props.route.params.Manager === "Manager" ? "#54C130" : "#1abc9c"}
          textStyle={{
            color: '#1abc9c',
            fontFamily: FontFamily.PopinsMedium,
            fontSize: FontSize.smallText,
          }}
          onPress={() => submitExpenseforApproval(props.route.params.Manager === "Manager" ? 3 : 2)}>
          <IoIcon name={props.route.params.Manager === "Manager" ? "checkmark-sharp" : "paper-plane-outline"} style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          shadowStyle={styles.elevation}
          size={35}
          title={props.route.params.Manager === "Manager" ? "Reject" : "New Claimsheet"}
          buttonColor={props.route.params.Manager === "Manager" ? "#F62727" : "#1abc9c"}
          textStyle={{
            color: '#1abc9c',
            fontFamily: FontFamily.PopinsMedium,
            fontSize: FontSize.smallText,
          }}
          onPress={() => {
            props.route.params.Manager === "Manager" ?
              setmodalVisible5(!modalVisible5)
              : props.navigation.navigate('AddExpense')
          }}>
          <AntDesign name={props.route.params.Manager === "Manager" ? "closecircle" : "plussquareo"} style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
      {deleteModal && (
        <ConfirmationModal
          btnlabel="Yes"
          PressDone={() => navigation.navigate('MyTrip')}
          title={`Are you sure you wants to delete this Expense ?`}
          modalVisible1={deleteModal}
          setmodalVisible1={setDeleteModal}
          onConfirm={() => {
            setDeleteModal(!deleteModal);
            deleteExpense();
          }}
        />
      )}
      {addMoreExpModal && (
        <AddMoreExpModal
          moreExparr={moreExparr}
          setMoreexpid={setMoreexpid}
          addMoreExpModal={addMoreExpModal}
          setAddMoreExpModal={setAddMoreExpModal}
          expId={expId}
          // setLoader={setLoader}
          setRefreshm={setRefreshm}
          refreshm={refreshm}
        />
      )}
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible5}
          onRequestClose={() => {
            setmodalVisible5(!modalVisible5);
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.5)',
            }}>
            <View
              style={{
                margin: 20,
                backgroundColor: '#ffffffff',
                borderRadius: 20,
                padding: 35,
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
              }}>
              <View style={{ width: width * 0.6, alignSelf: 'center' }}>
                {/* <View style={{marginVertical: 10}} /> */}
                <View>
                  {/* <Text
                    style={{
                      fontFamily: FontFamily.PopinsRegular,
                      color: Colors.black,
                    }}>
                    Aprroved Amount
                  </Text> */}
                  {/* <View
                    style={{
                      backgroundColor: 'white',
                      borderRadius: 12,
                      borderWidth: 1,
                      borderColor: Colors.borderColor,
                      overflow: 'hidden',
                      position: 'relative',
                      height: 42,
                    }}>
                    <TextInput
                      value={requestedAmt}
                      style={{ left: 18 }}
                      onChangeText={txt => {
                        let temp = '';
                        temp = txt.replace(/[^0-9]/g, '');
                        if (temp.length === 0) {
                          setRequestedAmt('');
                        } else {
                          setRequestedAmt(temp);
                        }
                      }}
                      placeholderTextColor={'black'}
                      keyboardType="number-pad"
                    />
                    <Text style={{ position: 'absolute', top: 13, left: 10 }}>
                      <FIcon name="rupee" size={13} />
                    </Text>
                  </View> */}
                  <View style={{ marginTop: 5 }}>
                    <Text
                      style={{
                        fontFamily: FontFamily.PopinsRegular,
                        color: Colors.black,
                      }}>
                      Note
                    </Text>
                    <View
                      style={{
                        backgroundColor: 'white',
                        borderRadius: 12,
                        borderWidth: 1,
                        borderColor: Colors.borderColor,
                        overflow: 'hidden',
                        position: 'relative',
                        height: 42,
                      }}>
                      <TextInput
                        value={noteTxt}
                        style={{ paddingHorizontal: 10 }}
                        onChangeText={txt => setNoteTxt(txt)}
                        placeholderTextColor={'#bdc3c7'}
                        placeholder="Type note here..."
                      />
                    </View>
                  </View>
                  <View style={{ marginVertical: 5 }} />
                </View>
              </View>
              <View style={{ width: width * 0.45 }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    marginTop: 10,
                  }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: Colors.bluetheme,
                      borderRadius: 15,
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingHorizontal: 10,
                      paddingVertical: 4,
                      width: 80
                    }}
                    onPress={() => {
                      if (noteTxt != '')
                        submitExpenseforApproval(4)
                      else
                        toast.show(
                          "Please fill note...",
                          {
                            type: 'warning',
                            placement: 'bottom',
                            duration: 4000,
                            offset: 30,
                            animationType: 'slide-in',
                          },
                        );
                    }}
                  >
                    <Text style={{ color: 'white' }}>Save</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      borderRadius: 15,
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingHorizontal: 5,
                      paddingVertical: 2,
                      // backgroundColor:'red'
                    }}
                    onPress={() => {
                      setmodalVisible5(!modalVisible5);
                    }}>
                    <Text style={{ color: 'black' }}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};
export default OutstationTripDetails;
