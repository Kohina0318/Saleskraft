import React, { useState, useEffect } from 'react';
import {
  TouchableOpacity,
  View,
  FlatList,
  Text,
  Image,
  Dimensions,
  ScrollView,
  Modal,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../assets/config/Colors';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import EIcon5 from 'react-native-vector-icons/EvilIcons';
import FIcon5 from 'react-native-vector-icons/FontAwesome5';
import FIcon from 'react-native-vector-icons/FontAwesome';
import MCIcon from 'react-native-vector-icons/MaterialIcons';
import MCCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../../assets/css/styleProducts';
import stylesC from '../../assets/css/stylesBeat';
import stylesTrip from '../../assets/css/styleTrip';
import { FontFamily } from '../../assets/fonts/FontFamily';
import { GetCategories } from '../../repository/catalogue/productRepository';
import StepIndicator from 'react-native-step-indicator';
import { Row, Rows, Table } from 'react-native-table-component';
import { FontSize } from '../../assets/fonts/Fonts';
import ConfirmationModal from '../Modals/ConfirmationModal';
import { SERVER_URL } from '../../repository/commonRepository';
import { useToast } from 'react-native-toast-notifications';
import { createTripApi } from '../../repository/trip/tripRepository';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';

const { width } = Dimensions.get('screen');
const labels = ['Ordered', 'Confirmed', 'Completed'];
const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 5,
  stepStrokeCurrentColor: Colors.bluetheme,
  stepStrokeWidth: 2,
  stepStrokeFinishedColor: Colors.bluetheme,
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: Colors.bluetheme,
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: Colors.bluetheme,
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 0,
  currentStepIndicatorLabelFontSize: 0,
  stepIndicatorLabelCurrentColor: Colors.bluetheme,
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 12,
  currentStepLabelColor: Colors.black,
  labelFontFamily: FontFamily.PopinsMedium,
};
const Productdata = [
  {
    name: 'Dzyner Mini Nail File',
    screen: 'ProductCategories',
    pic2: (
      <Image
        style={styles.ProductImage}
        source={require('../../assets/images/product/hairbrush.png')}
        resizeMode={'contain'}
      />
    ),
    Price: '135',
    Price2: '45 x 3',
  },
];
// Products List Start
function ProductsListFlatList({ item, props }) {
  // const navigation = useNavigation();
  return (
    <>
      <View style={styles.PLFL}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.TO}
        // onPress={() => navigation.navigate(item.screen)}
        >
          <View style={styles.PW}>
            <View style={styles.Width2}>{item.pic2}</View>
            <View style={styles.Width7}>
              <Text style={styles.PNameText}>{item.name}</Text>
              <View
                style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                <Text style={styles.PNameText}>
                  <FAIcon name="rupee" /> {item.Price2}
                </Text>
                <Text style={{ ...styles.PNameText, right: 10 }}>
                  <FAIcon name="rupee" /> {item.Price}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.MV3} />
    </>
  );
}

function FlatListProductList(props) {
  const [productData, setProductData] = useState([]);

  const ProductCategoriesApis = async () => {
    var temp = await GetCategories();
    // console.log('Product Data😒😒😒:', temp);
    if (
      temp.statusCode == 200 &&
      temp.message == 'Get all category successfully!'
    ) {
      setProductData(temp.data);
    } else {
      console.log('getCategories line no 27:', temp.data);
    }
  };

  React.useEffect(() => {
    //alert("Hello kohina")
    ProductCategoriesApis();
  }, []);

  return (
    <FlatList
      data={Productdata}
      renderItem={({ item }) => (
        <ProductsListFlatList item={item} props={props} />
      )}
      showsVerticalScrollIndicator={false}
      scrollEnabled={false}
    />
  );
}
// Distributer Card Start
const DistributerCardData = [
  {
    id: 1,
    shop: 'Delhi Warehouse',
    name: 'Jaykishan Dabe',
    address: '1 shangita apartment, Padli,Ahemdabad,Gujraat',
    mobile: '9131372790',
    screen: 'Store1',
    Category: 'A',
  },
];
function DistributerCard(props) {
  return (
    <FlatList
      data={DistributerCardData}
      renderItem={({ item }) => (
        <DistributerListFlatList item={item} props={props} />
      )}
      showsVerticalScrollIndicator={false}
      scrollEnabled={false}
    />
  );
}
function DistributerListFlatList({ item, props }) {
  // const navigation = useNavigation();
  return (
    <>
      <View style={stylesC.FLMAINViewNew}>
        <View>
          <View>
            <View style={stylesC.FL1}>
              <Text style={stylesC.FLHeadText}>{item.shop}</Text>
            </View>
          </View>
          <View style={stylesC.FLVIEW}>
            <View style={stylesC.FLVIEW2}>
              <EIcon5 name="user" size={25} color={Colors.bluetheme} />
              <Text style={stylesC.SmallHeading}>{item.name}</Text>
            </View>
            <View style={stylesC.MPVIew}>
              <FIcon name="mobile-phone" size={22} color={Colors.bluetheme} />
              <Text style={stylesC.MobileText}>{item.mobile}</Text>
            </View>
          </View>
          <View style={stylesC.NEWVIEW82}>
            <FIcon5 name="map-marker-alt" size={18} color={Colors.bluetheme} />
            <Text style={stylesC.MobileText}>{item.address}</Text>
          </View>
          <View style={stylesC.NEWVIEW82}>
            <MCIcon
              name="bookmark"
              size={18}
              color={Colors.bluetheme}
              style={{ right: 2 }}
            />
            <Text style={{ ...stylesC.MobileTextRight }}>
              Chanel Category: {item.Category}
            </Text>
          </View>
        </View>
      </View>
    </>
  );
}
// Distributer Card End

const CustomerCardData = [
  {
    id: 1,
    shop: 'Gheli Medicines',
    name: 'Jaykishan Dabe',
    address: '1 shangita apartment, Padli,Ahemdabad,Gujraat',
    mobile: '9131372790',
    screen: 'Store1',
  },
];
function CustomerCard(props) {
  return (
    <FlatList
      data={CustomerCardData}
      renderItem={({ item }) => (
        <CustomerListFlatList item={item} props={props} />
      )}
      showsVerticalScrollIndicator={false}
      scrollEnabled={false}
    />
  );
}
function CustomerListFlatList({ item, props }) {
  // const navigation = useNavigation();
  return (
    <>
      <View style={stylesC.FLMAINViewNew}>
        <View>
          <View>
            <View style={stylesC.FL1}>
              <Text style={stylesC.FLHeadText}>{item.shop}</Text>
            </View>
          </View>
          <View style={stylesC.FLVIEW}>
            <View style={stylesC.FLVIEW2}>
              <EIcon5 name="user" size={25} color={Colors.bluetheme} />
              <Text style={stylesC.SmallHeading}>{item.name}</Text>
            </View>
            <View style={stylesC.MPVIew}>
              <FIcon name="mobile-phone" size={22} color={Colors.bluetheme} />
              <Text style={stylesC.MobileText}>{item.mobile}</Text>
            </View>
          </View>
          <View style={stylesC.NEWVIEW82}>
            <FIcon5 name="map-marker-alt" size={18} color={Colors.bluetheme} />
            <Text style={stylesC.MobileText}>{item.address}</Text>
          </View>
        </View>
      </View>
    </>
  );
}

// Status Data
const StatusCard1 = [
  {
    Order: 'Ordered',
    Confirmed: 'Confirmed',
    Completed: 'Completed',
  },
];
function StatusCard(props) {
  return (
    <FlatList
      data={StatusCard1}
      renderItem={({ item }) => <StatusListData item={item} props={props} />}
      showsVerticalScrollIndicator={false}
      scrollEnabled={false}
    />
  );
}
function StatusListData({ item, props }) {
  // const navigation = useNavigation();
  return (
    <>
      <View style={styles.CUSTOMERdvIEW}>
        <TouchableOpacity activeOpacity={0.5} style={styles.CUSTOMERVIEWTO}>
          {/* <View style={styles.border} /> */}
          <View
            style={{
              width: width * 0.9,
              justifyContent: 'center',
              alignSelf: 'center',
              top: 10,
            }}>
            <StepIndicator
              customStyles={customStyles}
              labels={labels}
              stepCount={3}
            />
          </View>
          <View style={styles.NumberInputView}></View>
        </TouchableOpacity>
      </View>
      <View style={{ marginVertical: 1 }} />
    </>
  );
}
// Status Data End
{
  /* OutStationViewLISTSTART */
}
const OutStationdata = [
  {
    id: 1,
    Address: 'Ahmedabad, Gujarat',
    Address1: 'Gwalior, Madhya Pradesh',
    Date: '10 June 2022 - 13 June 2022',
    date1: '01/06/2022',
    Status: 'Approved',
    statuscolor: '#00C46F',
    Icons: <AntIcon name="checkcircleo" />,
    simpletext: 'Lorem ipsum is a simple dummy text.',
  },
];
function OutStationView({ props, item }) {
  const navigation = useNavigation();
  return (
    <>
      <View style={styles.CUSTOMERdvIEW}>
        <TouchableOpacity activeOpacity={0.5} onPress={() => { }} style={{}}>
          <View style={styles.NumberInputView}>
            <View
              style={{
                ...styles.Width85,
                justifyContent: 'center',
                alignSelf: 'center',
              }}>
              <View
                style={{ ...styles.FLEXDIREC1, justifyContent: 'space-between' }}>
                <Text style={styles.RateText}>
                  <FAIcon
                    size={15}
                    name="map-marker"
                    color={Colors.bluetheme}
                  />{' '}
                  &nbsp;kokokokk
                </Text>
              </View>
              <View
                style={{ ...styles.FLEXDIREC1, justifyContent: 'space-between' }}>
                <Text style={styles.RateText}>
                  <FAIcon
                    size={15}
                    name="map-marker"
                    color={Colors.bluetheme}
                  />{' '}
                  &nbsp;{item.Address1}
                </Text>
                <View style={{ ...styles.FLEXDIRECTIONROW, top: -8 }}>
                  <Text
                    style={{
                      ...styles.RateTextboldOrangeCircle,
                      color: item.statuscolor,
                    }}>
                    {item.Icons} {item.Status}
                  </Text>
                </View>
              </View>
              <View
                style={{ ...styles.FLEXDIREC1, justifyContent: 'space-between' }}>
                <Text style={styles.RateText}>
                  <FAIcon size={10} name="calendar" color={Colors.bluetheme} />{' '}
                  &nbsp;{item.Date}
                </Text>
                <Text style={{ ...styles.RateText, top: -8 }}>{item.date1}</Text>
              </View>
              <View
                style={{ ...styles.FLEXDIREC1, justifyContent: 'space-between' }}>
                <Text style={styles.RateText}>
                  &nbsp;&nbsp;&nbsp;&nbsp; {item.simpletext}
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
function OutStationFLList(props) {
  return (
    <>
      <FlatList
        data={OutStationdata}
        renderItem={({ item }) => <OutStationView item={item} props={props} />}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
      />
    </>
  );
}
{
  /*OutStationViewLISTEND*/
}
{
  /* ORDERLISTSTART */
}
// const MyTripLISTdata = [
//   {
//     Address: 'Ahmedabad, Gujarat',
//     Address1: 'Gwalior, Madhya Pradesh',
//     Date: '10 June 2022 - 13 June 2022',
//     Subtotal: '505',
//     Status: 'Approved',
//     statuscolor: '#00C46F',
//     Icons: <AntIcon name="checkcircleo" />,
//   },
//   {
//     Address: 'Ahmedabad, Gujarat',
//     Address1: 'Gwalior, Madhya Pradesh',
//     Date: '10 June 2022 - 13 June 2022',
//     Subtotal: '505',
//     Status: 'Raised',
//     statuscolor: 'red',
//     Icons: <Ionicons name="alert-circle-outline" />,
//   },
//   {
//     Address: 'Ahmedabad, Gujarat',
//     Address1: 'Gwalior, Madhya Pradesh',
//     Date: '10 June 2022 - 13 June 2022',
//     Subtotal: '0',
//     Status: 'Rejected',
//     statuscolor: 'red',
//     Icons: <Ionicons name="alert-circle-outline" />,
//   },
// ];

// Customer_List END

function MyTripListD({ item, tripStatus, themecolor }) {
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
  const navigation = useNavigation();
  
  return (
    <>
      <View style={{ ...styles.CUSTOMERdvIEW,marginTop:4 }}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() =>
            navigation.push('OutstationTrip', {
              tripId: item.TripId,
              manager: false,
            })
          }
          style={{ ...styles.CUSTOMERVIEWTO, backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR1, borderWidth: 0.5,width:width*0.94 }}>
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
                  style={{ ...styles.RateText, width: width * 0.6, color: themecolor.TXTWHITE }}>
                  <FAIcon
                    size={14}
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
                  style={{ ...styles.RateText, width: width * 0.6, color: themecolor.TXTWHITE }}>
                  <FAIcon
                    size={14}
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
                <Text style={{ ...styles.RateText, color: themecolor.TXTWHITE }}>
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
                <Text style={{ ...styles.RateText, top: -8, color: themecolor.TXTWHITE }}>
                  <FAIcon name="rupee" size={10} />
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

function MyTripDetailsList({ DATA, tripStatus, Month }) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  // console.log("conso in mytripdetails",DATA)
  return (
    <>
      <Text style={{ ...styles.RateText, color: themecolor.TXTWHITE }}>{Month}</Text>
      {/* <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <MyTripListD tripStatus={tripStatus} themecolor={themecolor} item={item} />
        )}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        ListFooterComponent={<View style={{ height: 20 }}></View>}
      /> */}
      {DATA?.map((item,index)=><MyTripListD key={index} tripStatus={tripStatus} themecolor={themecolor} item={item} />)}
    </>
  );
}

// Manager app trip requests function===============

function EmpTripsFlat({ item, navigation }) {
  // console.log("item===",item)
  return (
    <>
      <TouchableOpacity
        style={{
          padding: 10,
          backgroundColor: 'white',
          borderWidth: 1,
          borderRadius: 17,
          overflow: 'hidden',
          borderColor: Colors.borderColor,
          width: '100%',
          alignSelf: 'center',
          flexDirection: 'row',
        }}
        onPress={() =>
          navigation.navigate('ExpenseMProfile', { empId: item.EmployeeId })
        }>
        <View
          style={{
            height: 50,
            width: 50,
            overflow: 'hidden',
            borderRadius: 50,
            borderWidth: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={require('../../assets/images/dummyuser.png')}
            style={{ height: 50, width: 50 }}
            resizeMode={'cover'}
          />
        </View>
        <Text
          style={{
            fontFamily: FontFamily.PopinsRegular,
            marginLeft: 5,
            fontSize: FontSize.labelText2,
          }}>
          {item.employeeName}
        </Text>
      </TouchableOpacity>
    </>
  );
}

function EmpTrips({ empTrips }) {
  const navigation = useNavigation();
  return (
    <>
      <View>
        <FlatList
          data={empTrips}
          renderItem={({ item }) => (
            <EmpTripsFlat item={item} navigation={navigation} />
          )}
        />
      </View>
    </>
  );
}
{
  /*ORDERLISTEND*/
}

const Paymentdata = [
  {
    Orderno: 'VEG000#391',
    Totalitems: '5 items',
    Subtotal: '771',
    PTRmargin: '216',
    TotalAmount: '505',
  },
];
// Customer_List END
function PaymentListD({ item }) {
  return (
    <>
      <View style={styles.CUSTOMERdvIEW}>
        <TouchableOpacity activeOpacity={0.5} style={styles.CUSTOMERVIEWTO}>
          <View style={styles.NumberInputView}>
            <View
              style={{
                ...styles.Width85,
                justifyContent: 'center',
                alignSelf: 'center',
              }}>
              <View
                style={{ ...styles.FLEXDIREC1, justifyContent: 'space-between' }}>
                <Text style={styles.RateText}>Order no.</Text>
                <Text style={{ ...styles.RateText }}>{item.Orderno}</Text>
              </View>
              <View
                style={{ ...styles.FLEXDIREC1, justifyContent: 'space-between' }}>
                <Text style={styles.RateText}>Total items</Text>
                <Text style={{ ...styles.RateText }}>{item.Totalitems}</Text>
              </View>
              <View
                style={{ ...styles.FLEXDIREC1, justifyContent: 'space-between' }}>
                <Text style={styles.RateText}>Subtotal</Text>
                <Text style={{ ...styles.RateText }}>
                  <FAIcon name="rupee" size={11} /> {item.Subtotal}
                </Text>
              </View>
              <View
                style={{ ...styles.FLEXDIREC1, justifyContent: 'space-between' }}>
                <Text style={styles.RateText}>PTR margin</Text>
                <Text style={{ ...styles.RateText, color: Colors.green1 }}>
                  <FAIcon name="rupee" size={11} /> {item.PTRmargin}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.border} />
          <View style={styles.NumberInputView}>
            <View>
              <Text style={styles.RateTextbold}>Total</Text>
            </View>

            <View style={styles.FLEXDIREC1}>
              <View>
                <Text style={styles.RateTextbold}>
                  <FAIcon name="rupee" size={11} /> {item.TotalAmount}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ marginVertical: 1 }} />
    </>
  );
}

export function PaymentDetailsList(props) {
  return (
    <FlatList
      data={Paymentdata}
      renderItem={({ item }) => <PaymentListD item={item} />}
      showsVerticalScrollIndicator={false}
      scrollEnabled={false}
    />
  );
}

{
  /* OutStationViewLISTSTART */
}

function OutStationView1({ props, item, index, isDateAllowed, toast, themecolor }) {
  // console.log('item', item);
  const tripStatus = props.tripStatus;
  const tripData = props.tripData;
  const listofDates = props.listofDates;
  const listofAmount = props.listofAmount;
  const listofExpId = props.listofExpId;
  // alert(JSON.stringify(listofAmount))
  // console.log('listofExpId', listofDates);

  const tripstat = tripStatus[tripData.TripStatus];
  const navigation = useNavigation();
  const [modalVisible1, setmodalVisible1] = useState(false);
  const [modaldate, setModaldate] = useState('');
  const [modalday, setModalday] = useState('');
  const handlePress = (day, date) => {
    if (tripstat == 'Raised') {
      setModalday(day);
      setModaldate(date);
      setmodalVisible1(!modalVisible1);
    } else if (tripstat == 'Approved') {
      if (isDateAllowed(date) == true) {
        setModalday(day);
        setModaldate(date);
        setmodalVisible1(!modalVisible1);
      } else {
        toast.show(`Sorry you can not add expense for ${date}`, {
          type: 'warning',
          placement: 'bottom',
          duration: 4000,
          offset: 30,
          animationType: 'slide-in',
        });
      }
    } else {
      setModalday(day);
      setModaldate(date);
      setmodalVisible1(!modalVisible1);
    }
  };
  const handlePress2 = (expId, date) => {
    navigation.navigate('OutstationTripDetails', { date1: date, expId: expId });
    // alert(date)
  };

  return (
    <>
      <View style={{ ...stylesTrip.marg3, }} />
      <View
        style={{
          width: width * 0.95,
          justifyContent: 'center',
          alignSelf: 'center',

        }}>
        <TouchableOpacity activeOpacity={1}>
          <View style={{ ...stylesTrip.view, backgroundColor: themecolor.BOXTHEMECOLOR, borderWidth: 0.5, borderColor: themecolor.BOXBORDERCOLOR1 }}>
            <View style={stylesTrip.view1}>
              <View
                style={{
                  ...stylesTrip.DayCircle,
                  backgroundColor: Colors.bluetheme,
                }}>
                <Text style={{ ...stylesTrip.DayText, top: 5, }}>Day</Text>
                <Text style={{ ...stylesTrip.DayText, fontSize: FontSize.h4, }}>
                  {index + 1}
                </Text>
              </View>

              <View style={{ ...stylesTrip.widths }}>
                {listofDates.includes(item.date) ? (
                  <Text style={{ ...stylesTrip.StatusText, color: themecolor.TXTWHITE }}>
                    <FIcon name="rupee" size={10}/> {listofAmount[item.date]}
                  </Text>
                ) : (
                  <>
                    <Text style={{ ...stylesTrip.StatusText, color: themecolor.TXTWHITE }}>{item.day}</Text>
                    <Text style={{ ...stylesTrip.StatusText, top: -5, color: themecolor.TXTWHITE }}>
                      {item.date}
                    </Text>
                  </>
                )}
              </View>
              <View style={{ ...stylesTrip.view2, alignItems: 'flex-end' }}>
                {/* <TouchableOpacity
                  onPress={() => navigation.navigate('OutstationTripDetails')}>
                  <Text style={stylesTrip.StatusText}>jjjj</Text>
                </TouchableOpacity> */}
                {listofDates.includes(item.date) ? (
                  <TouchableOpacity
                    onPress={() =>
                      handlePress2(listofExpId[item.date], item.date)
                    }
                    style={{ alignItems: 'flex-end' }}>
                    <Text
                      style={{
                        fontFamily: FontFamily.Popinssemibold,
                        fontSize: FontSize.labelText,
                        color: '#373231',
                        color: themecolor.TRIP2
                      }}>
                      <Ionicons
                        name="md-create-outline"
                        size={13}
                        color={themecolor.ICON}
                      />
                      Created
                    </Text>
                    <Text
                      style={{
                        fontFamily: FontFamily.Popinssemibold,
                        fontSize: FontSize.labelText,
                        top: -3,
                        color: '#373231',
                        color: themecolor.TXTWHITE
                      }}>
                      {item.date}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={{ alignItems: 'center', flexDirection: 'row' }}
                    onPress={() => {
                      handlePress(item.day, item.date);
                    }}>
                    <Text>
                      <Feather
                        name="plus"
                        size={15}
                        color={
                          isDateAllowed(item.date) == false ||
                            props.status != 'Approved'
                            ? '#A8B1BD'
                            : Colors.bluetheme
                        }
                      />
                    </Text>
                    <Text
                      style={{
                        ...stylesTrip.StatusText,
                        color:
                          isDateAllowed(item.date) == false ||
                            props.status != 'Approved'
                            ? '#A8B1BD'
                            : Colors.bluetheme,
                        fontFamily: FontFamily.Popinssemibold,
                        marginLeft: 3,
                      }}>
                      Add expense
                    </Text>
                  </TouchableOpacity>
                )}
                {/* <Text style={stylesTrip.align}>{item.tag}</Text> */}
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      {modalVisible1 && (
        <ConfirmationModal
          btnlabel={tripstat != 'Approved' ? 'Okey' : 'Yes'}
          PressDone={() => navigation.navigate('MyTrip')}
          singleb={tripstat != 'Approved' ? true : false}
          title={
            tripstat != 'Approved'
              ? "Your trip hasn't approved yet. Please ask your manager to approve trip first "
              : `Are you sure you wants to create expense for ${modaldate} ${modalday} ?`
          }
          modalVisible1={modalVisible1}
          setmodalVisible1={setmodalVisible1}
          onConfirm={() => {
            setmodalVisible1(!modalVisible1);
            {
              tripstat == 'Approved' &&
                navigation.navigate('AddExpense', {
                  modaldate: modaldate,
                });
            }
          }}
        />
      )}
    </>
  );
}

function OutStationFLList1(props,) {
  const toast = useToast();
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  const isDateAllowed = expdate => {
    let dd1 = expdate.split('-')[0];
    let mm1 = expdate.split('-')[1];
    let yy1 = expdate.split('-')[2];
    let strtdt1 = new Date();
    strtdt1.setUTCDate(dd1);
    strtdt1.setUTCMonth(mm1 - 1);
    strtdt1.setUTCFullYear(yy1);
    let d = new Date();
    d.setDate(d.getDate() + 1);
    return d >= strtdt1;
  };

  // alert(JSON.stringify(props.temp_arr))
  return (
    <>
      <FlatList
        data={props.temp_arr}
        renderItem={({ item, index }) => (
          <OutStationView1
            item={item}
            index={index}
            props={props}
            themecolor={themecolor}
            isDateAllowed={isDateAllowed}
            toast={toast}
          />
        )}
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
        ListFooterComponent={<View style={{ height: 20 }}></View>}
      />
    </>
  );
}


function CreateCard(props) {

  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  // const [name, setName] = useState();
  // const [ppicture, setPpicture] = useState('');
  const [getServerUrl, setServerUrl] = useState('');
  const fname = props.fname;
  const lname = props.lname;
  const picture = props.picture;
  // alert(JSON.stringify(props.empdata));

  let createdAt = props.expenseCreateAt
    .split(' ')[0]
    .split('-')
    .reverse()
    .join('-');

  // async function userdatafetch() {
  //   const data = await getUserProfile();
  //   console.log('data in drawer', data);
  //   const fname = JSON.parse(data).data.FirstName;
  //   const lname = JSON.parse(data).data.LastName;
  //   const pp = JSON.parse(data).data.ProfilePicture;
  //   setPpicture(pp);

  //   setName(
  //     `${fname.slice(0, 1).toUpperCase()}${fname.slice(1).toLowerCase()} ${lname
  //       .slice(0, 1)
  //       .toUpperCase()}${lname.slice(1).toLowerCase()}`,
  //   );
  // }

  useEffect(() => {
    // userdatafetch();
    async function temp() {
      setServerUrl(await SERVER_URL());
    }
    temp();
  }, []);

  return (
    <View style={{...stylesTrip.returnview,backgroundColor:themecolor.BOXTHEMECOLOR,borderColor:themecolor.BOXBORDERCOLOR1}}>
      <View style={{ ...stylesTrip.innerview1 }}>
        {picture == null || picture == '' || picture == undefined ? (
          <Image
            source={require('../../assets/images/dummyuser.png')}
            style={{ height: 70, width: 70 }}
            resizeMode={'cover'}
          />
        ) : (
          <Image
            source={{
              uri: `${getServerUrl}uploads/2/${picture}`,
            }}
            style={stylesTrip.ImageCircles}
            resizeMode="contain"
          />
        )}
      </View>
      <View style={stylesTrip.margin}>
        <View>
          <Text style={{...stylesTrip.text2,color: themecolor.TXTWHITE}}>Created by :</Text>
          <Text style={{...stylesTrip.text1,color: themecolor.TXTWHITE}}>{fname + ' ' + lname}</Text>
        </View>
        <View style={stylesTrip.view1}>
          <Text style={{...stylesTrip.text2,color: themecolor.TXTWHITE}}>
            {<MCCIcon name="calendar" size={13} color={Colors.bluetheme} />}{' '}
            {createdAt}
          </Text>
        </View>
      </View>
    </View>
  );
}

function AmountCard(props) {
  return (
    <View style={stylesTrip.AMountCardView}>
      <View style={stylesTrip.CardDesign}>
        <Text style={stylesTrip.text2}>Total Requested</Text>
        <Text style={stylesTrip.text1}>
          <FAIcon name="rupee" size={14} /> {props.expdata.ExpenseReqAmt}
        </Text>
      </View>
      <View style={stylesTrip.CardDesign}>
        <Text style={stylesTrip.text2}>Final</Text>
        <Text style={stylesTrip.text1}>
          <FAIcon name="rupee" size={14} /> {props.expdata.ExpenseFinalAmt}
        </Text>
      </View>
    </View>
  );
}

function TableShow(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  const toast = useToast();
  const [visible, setVisible] = useState(false);
  const [requestedAmt, setRequestedAmt] = useState('');
  const [allData, setAllData] = useState('');
  // console.log('ALL DATA>>>>>>>>>>>>>>>>>>>', allData);
  const [noteTxt, setNoteTxt] = useState('');
  const tableHead = [props.H1, props.H2, props.H3, props.H4];
  const masterData = props.masterData;
  // console.log('MASTTER DATA>>>>>>>>>', masterData);
  const expenseStat = props.expenseStat;
  const expense_statuses = props.expense_statuses;
  const manager = props.manager;
  // console.log('PROPS OF MANAGER IN TABLE SHOW', manager);
  const [amount, setAmount] = useState('');
  // alert(manager)
  // alert(JSON.stringify(expense_statuses[expenseStat]))
  const expId = props.expId;
  // console.log('master_data', masterData);
  // alert( expenseStat);
  const navigation = useNavigation();

  const approvedRequestedAmt = async () => {
    // alert(allData.data.lineId +' '+noteTxt)
    try {
      if (requestedAmt !== '') {
        const result = await createTripApi(`api/editApprovelExpenses/${allData.data.lineId}?action=auth&ExpAprAmount=${requestedAmt}&ExpNote=${noteTxt}`);
        if (result.statusCode === 200) {
          setVisible(!visible);
          props.setRefreshm(!props.refreshm)
        } else {
          alert(result.message)
        }
      } else {
        toast.show(`Please fill approved amount`, {
          type: 'warning',
          placement: 'bottom',
          duration: 4000,
          offset: 30,
          animationType: 'slide-in',
        });
      }
    }
    catch (e) {
      console.log("Approved request amount>>>>>>1168", e)
    }
  };

  return (
    <View style={{...stylesTrip.TableMainView, backgroundColor: themecolor.BOXTHEMECOLOR,}}>
      <Table
        borderStyle={{
          borderWidth: 0.5,
          borderColor: '#c8e1ff',
        }}>
        <Row
          data={tableHead}
          style={{...stylesTrip.headtable, backgroundColor: themecolor.TABLE,}}
          textStyle={{...stylesTrip.texttableBig, color: themecolor.ICON}}
        />
      </Table>
      <ScrollView>
        <Table
          borderStyle={{
            borderWidth: 0.5,
            borderColor: '#c8e1ff',
          }}>
          <Rows
            data={masterData.map(item => [
              <View style={{ padding: 5 }}>
                <Text style={{...stylesTrip.texttable, color: themecolor.TXTWHITE}}>
                  {item.ExpenseMaster.ExpenseName}
                </Text>
              </View>,
              <View style={{ padding: 5 }}>
                <Text style={{...stylesTrip.texttable, color: themecolor.TXTWHITE}}>{item.ExpIlAmount}</Text>
              </View>,
              <View style={{ padding: 5 }}>
                <Text style={{...stylesTrip.texttable, color: themecolor.TXTWHITE}}>{item.ExpFinalAmount}</Text>
              </View>,

              <Text style={[stylesTrip.texttable, { textAlign: 'center' }]}>
                {'Manager' === manager && (
                  <Text style={{ flexDirection: 'row', alignSelf: 'center' }}>
                    {' '}
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('ExpenseLineitem', {
                          expenseName: item.ExpenseMaster.ExpenseName,
                          data: {
                            lineId: item.ExpListId,
                            expId: item.ExpId,
                            ExpMasterId: item.ExpMasterId,
                            ExpListId: item.ExpListId,
                            isRateApplied: item.ExpenseMaster.Israteapplied,
                            Mode: item.ExpenseMaster.Mode,
                            Rate: item.ExpenseMaster.Rate,
                            requestedAmount: item.ExpIlAmount,
                            remark: item.ExpRemark,
                            expNote: item.ExpNote,
                            auditRemark: item.ExpAuditRemark
                            // expenseStatus:expenseStatus
                            // masterData:masterData,
                          },
                          lineItemData: item.ExpenseListDetailss,
                          expenseStat: expenseStat,
                          expense_statuses: expense_statuses,
                        });
                      }}>
                      <FAIcon name="eye" size={15} color={Colors.bluetheme1} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setVisible(true);
                        setRequestedAmt(item.ExpFinalAmount);
                        setAllData({
                          data: {
                            lineId: item.ExpListId,
                            expId: item.ExpId,
                            ExpMasterId: item.ExpMasterId,
                            ExpListId: item.ExpListId,
                            isRateApplied: item.ExpenseMaster.Israteapplied,
                            Mode: item.ExpenseMaster.Mode,
                            Rate: item.ExpenseMaster.Rate,
                            requestedAmount: item.ExpIlAmount,
                            remark: item.ExpRemark,
                            expNote: item.ExpNote,
                          },
                        });
                      }}>
                      <FAIcon
                        name="edit"
                        size={15}
                        color={Colors.bluetheme1}
                        style={{ marginLeft: 8, bottom: -1.6 }}
                      />
                    </TouchableOpacity>
                  </Text>
                )}
                {'Manager' !== manager ? (
                  <>
                    {expense_statuses[expenseStat] == 'Created' &&
                      expense_statuses[expenseStat] != 'Submit' ? (
                      <TouchableOpacity
                        onPress={() => {
                          if ('Manager' === manager) {
                            setVisible(true);
                            setRequestedAmt(item.ExpFinalAmount);
                            setAllData({
                              data: {
                                lineId: item.ExpListId,
                                expId: item.ExpId,
                                ExpMasterId: item.ExpMasterId,
                                ExpListId: item.ExpListId,
                                isRateApplied: item.ExpenseMaster.Israteapplied,
                                Mode: item.ExpenseMaster.Mode,
                                Rate: item.ExpenseMaster.Rate,
                                requestedAmount: item.ExpIlAmount,
                                remark: item.ExpRemark,
                                expNote: item.ExpNote,
                              }
                            })
                          } else {

                            navigation.navigate('ExpenseLineitem', {
                              expenseName: item.ExpenseMaster.ExpenseName,
                              data: {
                                lineId: item.ExpListId,
                                expId: item.ExpId,
                                ExpMasterId: item.ExpMasterId,
                                ExpListId: item.ExpListId,
                                isRateApplied: item.ExpenseMaster.Israteapplied,
                                Mode: item.ExpenseMaster.Mode,
                                Rate: item.ExpenseMaster.Rate,
                                requestedAmount: item.ExpIlAmount,
                                remark: item.ExpRemark,
                                expNote: item.ExpNote,
                                // expenseStatus:expenseStatus

                                // masterData:masterData,
                              },
                              lineItemData: item.ExpenseListDetailss,
                              expenseStat: expenseStat,
                              expense_statuses: expense_statuses,
                            })
                          }
                        }
                        }>
                        <FAIcon
                          name="edit"
                          size={15}
                          color={Colors.bluetheme1}
                          style={{ marginLeft: 8, bottom: -1.6 }}
                        />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('ExpenseLineitem', {
                            expenseName: item.ExpenseMaster.ExpenseName,
                            data: {
                              lineId: item.ExpListId,
                              expId: item.ExpId,
                              ExpMasterId: item.ExpMasterId,
                              ExpListId: item.ExpListId,
                              isRateApplied: item.ExpenseMaster.Israteapplied,
                              Mode: item.ExpenseMaster.Mode,
                              Rate: item.ExpenseMaster.Rate,
                              requestedAmount: item.ExpIlAmount,
                              remark: item.ExpRemark,
                              expNote: item.ExpNote,
                              // expenseStatus:expenseStatus

                              // masterData:masterData,
                            },
                            lineItemData: item.ExpenseListDetailss,
                            expenseStat: expenseStat,
                            expense_statuses: expense_statuses,
                          });
                        }}>
                        <FAIcon
                          name="eye"
                          size={15}
                          color={Colors.bluetheme1}
                        />
                      </TouchableOpacity>
                    )}
                  </>
                ) : (
                  <></>
                )}
              </Text>,
            ])}
            textStyle={stylesTrip.texttable}
          />
        </Table>

        {/* ================ */}
        {
          // <Table
          //   borderStyle={{
          //     borderWidth: 0.5,
          //     borderColor: '#c8e1ff',
          //   }}>
          //   <Rows
          //     data={moreExpenses.map(item => [
          //       <View style={{padding: 5}}>
          //         <Text style={stylesTrip.texttable}>{item.label}</Text>
          //       </View>,
          //       <View style={{padding: 5}}>
          //         <Text style={stylesTrip.texttable}>{item.ExpReqAmount}</Text>
          //       </View>,
          //       <View style={{padding: 5}}>
          //         <Text style={stylesTrip.texttable}>
          //           {item.ExpFinalAmount}
          //         </Text>
          //       </View>,
          //       <TouchableOpacity
          //         onPress={() => {
          //           navigation.navigate('ExpenseLineitem', {
          //             expenseName: item.ExpenseMaster.ExpenseName,
          //             data: {
          //               lineId: item.ExpListId,
          //               expId: item.ExpId,
          //               ExpMasterId: item.ExpMasterId,
          //               isRateApplied: item.ExpenseMaster.Israteapplied,
          //               Mode: item.ExpenseMaster.Mode,
          //               Rate: item.ExpenseMaster.Rate,
          //             },
          //           });
          //         }}
          //         style={{
          //           padding: 5,
          //           justifyContent: 'center',
          //           alignItems: 'center',
          //         }}>
          //         <Text style={stylesTrip.texttable}>
          //           <FAIcon name="edit" size={15} color={Colors.bluetheme1} />
          //         </Text>
          //       </TouchableOpacity>,
          //     ])}
          //     textStyle={stylesTrip.texttable}
          //   />
          // </Table>
        }
        {/* =============== */}
      </ScrollView>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={visible}
          onRequestClose={() => {
            setVisible(!visible);
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
                  <Text
                    style={{
                      fontFamily: FontFamily.PopinsRegular,
                      color: Colors.black,
                    }}>
                    Approved Amount
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
                  </View>
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
                      approvedRequestedAmt();
                    }}>
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
                      setVisible(!visible);
                    }}>
                    <Text style={{ color: 'black' }}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

// Products List End

// const EXPENSEMyTripLISTdata = [
//   {
//     Address: 'Ex-HQ',
//     Date: '10 June 2022 - 13 June 2022',
//     Subtotal: '505',
//     Status: 'Approved',
//     statuscolor: 'black',
//     Icons: <AntIcon name="checkcircleo" />,
//   },
//   {
//     Address: 'Ex-HQ',
//     Date: '10 June 2022 - 13 June 2022',
//     Subtotal: '505',
//     Status: 'Raised',
//     statuscolor: 'black',
//     Icons: <Ionicons name="alert-circle-outline" />,
//   },
// ];

// Customer_List END
function EXPENSEMyTripListD({ expstatus, item ,themecolor}) {
  // const mode = useSelector(state => state.mode);
  // const themecolor = new MyThemeClass(mode).getThemeColor()
  // console.log('item=item in expense list new012', item);
  var statusColor = '';
  var Icon = '';
  if (expstatus[item.ExpenseStatus] == 'Approved') {
    statusColor = '#00C46F';
    Icon = (
      <>
        <FAIcon name="check-circle" />
      </>
    );
  } else if (expstatus[item.ExpenseStatus] == 'Submit') {
    statusColor = Colors.bluetheme;
    Icon = (
      <>
        <FAIcon name="check-circle" />
      </>
    );
  } else if (expstatus[item.ExpenseStatus] == 'Created') {
    statusColor = 'orange';
    Icon = (
      <>
        <MCIcon name="error-outline" />
      </>
    );
  } else if (expstatus[item.ExpenseStatus] == 'Proceed for Payment') {
    statusColor = 'green';
    Icon = (
      <>
        <FAIcon name="check-circle" />
      </>
    );
    }else if (expstatus[item.ExpenseStatus] == 'Hold') {
      statusColor = '#f9ca24';
      Icon = (
        <>
          <FAIcon name="circle" />
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
  const navigation = useNavigation();
  return (
    <>
      <View style={{...styles.CUSTOMERdvIEW,marginTop:4}}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() =>
            navigation.navigate('OutstationTripDetails', {
              expId: item.ExpId,
              date1: item.ExpenseDate.split('-').reverse().join('-'),
              workingat: item.ExpensePlacewrk,
            })
          }
          style={{...styles.CUSTOMERVIEWTO,backgroundColor:themecolor.BOXTHEMECOLOR,borderWidth:0.5,borderColor:themecolor.BOXBORDERCOLOR1,width:width*0.94}}>
          <View style={styles.NumberInputView}>
            <View
              style={{
                ...styles.Width85,
                justifyContent: 'center',
                alignSelf: 'center',
              }}>
              <View
                style={{ ...styles.FLEXDIREC1, justifyContent: 'space-between' }}>
                {/* <Text style={styles.RateTextBig}></Text> */}
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{ ...styles.RateTextBig, width: width * 0.55,color: themecolor.TXTWHITE }}>
                  {item.ExpensePlacewrk}
                </Text>
                <View>
                  <Text
                    style={{
                      ...styles.RateTextboldOrangeCircle,
                      color: statusColor,
                      // alignSelf:'flex-end',
                      textAlign: 'right',
                      width: width * 0.3,
                      
                    }}>
                    {Icon}&nbsp;{expstatus[item.ExpenseStatus]}
                  </Text>
                </View>
              </View>

              <View
                style={{ ...styles.FLEXDIREC1, justifyContent: 'space-between' }}>
                <Text style={{...styles.RateText,color: themecolor.TXTWHITE}}>
                  {item.ExpenseDate == '' || item.ExpenseDate == null
                    ? 'Date not available'
                    : item.ExpenseDate.split('-').reverse().join('-')}
                </Text>
                <View style={{ width: 90 }}>
                  <Text
                    style={{
                      ...styles.RateText,
                      top: -5,
                      alignSelf: 'flex-end',
                      fontSize: FontSize.labelText3,
                      color: themecolor.TXTWHITE
                    }}>
                    <FAIcon name="rupee" size={11} /> {item.ExpenseFinalAmt}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.MV1} />
    </>
  );
}

function EXPENSEMyTripDetailsList({ DATA, expstatus, Month }) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  return (
    // <>
    //   <Text style={styles.RateText}>{props.Month}</Text>
    //   <FlatList
    //     data={props.expenselist}
    //     renderItem={({ item }) => (
    //       <EXPENSEMyTripListD item={item} props={props} />
    //     )}
    //     showsVerticalScrollIndicator={false}
    //     scrollEnabled={false}
    //     ListFooterComponent={<View style={{ height: 20 }}></View>}
    //   />
    // </>
    <View style={{...styles.bg, backgroundColor: themecolor.THEMECOLOR,}}>
      <View><Text style={{...styles.RateText,color: themecolor.TXTWHITE}}>{Month}</Text></View>
      
      {/* <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <EXPENSEMyTripListD expstatus={expstatus} themecolor={themecolor} item={item} />
        )}
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
        ListFooterComponent={<View style={{ height: 20 }}></View>}
      /> */}
      {DATA?.map((item,index)=><EXPENSEMyTripListD key={index} expstatus={expstatus} themecolor={themecolor} item={item} />)}
    </View>
  );
}

export {
  PaymentListD,
  CustomerCard,
  StatusCard,
  DistributerCard,
  FlatListProductList,
  MyTripDetailsList,
  OutStationFLList,
  OutStationFLList1,
  CreateCard,
  AmountCard,
  TableShow,
  EXPENSEMyTripDetailsList,
  EmpTrips,
};
