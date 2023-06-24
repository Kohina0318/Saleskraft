import React, { useState } from 'react';
import {
  TouchableOpacity,
  View,
  FlatList,
  Text,
  Image,
  Dimensions,
} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { Colors } from '../../assets/config/Colors';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import EIcon5 from 'react-native-vector-icons/EvilIcons';
import FIcon5 from 'react-native-vector-icons/FontAwesome5';
import FIcon from 'react-native-vector-icons/FontAwesome';
import MCIcon from 'react-native-vector-icons/MaterialIcons';
import MCCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../../assets/css/styleProducts';
import stylesC from '../../assets/css/stylesBeat';
import { FontFamily } from '../../assets/fonts/FontFamily';
import { GetCategories } from '../../repository/catalogue/productRepository';
import StepIndicator from 'react-native-step-indicator';
const { width } = Dimensions.get('screen');
const labels = ["Ordered", "Confirmed", "Completed"];
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
}
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
    Price2: '45 x 3'
  },

];

function ProductsListFlatList({ item, props }) {

  return (
    <>
      <View style={styles.PLFL}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.TO}
        // onPress={() => navigation.navigate(item.screen)}
        >
          <View
            style={styles.PW}>
            <View style={styles.Width2}>{item.pic2}</View>
            <View style={styles.Width7}>
              <Text
                style={styles.PNameText}>
                {item.name}
              </Text>
              <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                <Text
                  style={styles.PNameText}>
                  <FAIcon name='rupee' /> {item.Price2}
                </Text>
                <Text
                  style={{ ...styles.PNameText, right: 10 }}>
                  <FAIcon name='rupee' /> {item.Price}
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
    console.log("Product Data😒😒😒:", temp);
    if (temp.statusCode == 200 && temp.message == 'Get all category successfully!') {
      setProductData(temp.data)
    }
    else {
      console.log("getCategories line no 27:", temp.data)
    }
  }

  React.useEffect(() => {
    //alert("Hello kohina")
    ProductCategoriesApis()
  }, [])

  return (
    <FlatList
      data={Productdata}
      renderItem={({ item }) => <ProductsListFlatList item={item} props={props} />}
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
            <MCIcon name="bookmark" size={18} color={Colors.bluetheme} style={{ right: 2 }} />
            <Text style={{ ...stylesC.MobileTextRight }}>Chanel Category: {item.Category}</Text>
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
      renderItem={({ item }) => (
        <StatusListData item={item} props={props} />
      )}
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
              top: 10
            }}>
            <StepIndicator
              customStyles={customStyles}
              labels={labels}
              stepCount={3}
            />
          </View>
          <View style={styles.NumberInputView}>


          </View>
        </TouchableOpacity>
      </View>
      <View style={{ marginVertical: 1 }} />
    </>
  );
}
// Status Data End

{/* ORDERLISTSTART */ }
const OrderLISTdata = [
  {
    Orderno: 'VEG000#391',
    Orderdate: '1 Mar 2022',
    Subtotal: '505',
    Customer: 'Jaykishan Dave',
    TotalAmount: '505',
    Status: 'Ordered',
    statuscolor: 'orange',
  },
  {
    Orderno: 'VEG000#391',
    Orderdate: '1 Mar 2022',
    Subtotal: '505',
    Customer: 'Jaykishan Dave',
    TotalAmount: '505',
    Status: 'Confirmed',
    statuscolor: '#00C46F',
  },
];
// Customer_List END
function ORDERSListD({ props, item }) {
  const navigation = useNavigation();
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
                <Text style={{ ...styles.RateText }}>
                  {item.Orderno}
                </Text>
              </View>
              <View
                style={{ ...styles.FLEXDIREC1, justifyContent: 'space-between' }}>
                <Text style={styles.RateText}>Order date</Text>
                <Text style={{ ...styles.RateText }}>
                  {item.Orderdate}
                </Text>
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
                <Text style={styles.RateText}>Customer</Text>
                <Text style={styles.RateText}>
                  {item.Customer}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.border} />
          <View style={styles.NumberInputView}>
            <View style={styles.FLEXDIRECTIONROW}>
              <View style={{ ...styles.IconCircle, backgroundColor: item.statuscolor }}><MCCIcon name="cart" color={Colors.white} size={11} /></View>
              <Text style={{ ...styles.RateTextboldOrangeCircle, color: item.statuscolor }}>{item.Status}</Text>
            </View>

            <View style={styles.ModelVideoCenter}>
              <TouchableOpacity onPress={() => navigation.navigate('Orderdetails')} style={styles.ViewButton}>
                <Text style={styles.ViewButtonText}>view order</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.MV1} />
    </>
  );
}
function ORDERSDetailsList(props) {
  return (
    <FlatList
      data={OrderLISTdata}
      renderItem={({ item }) => <ORDERSListD item={item} props={props} />}
      showsVerticalScrollIndicator={false}
      scrollEnabled={false}
    />
  );
}
{/*ORDERLISTEND*/ }

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
                <Text style={{ ...styles.RateText }}>
                  {item.Orderno}
                </Text>
              </View>
              <View
                style={{ ...styles.FLEXDIREC1, justifyContent: 'space-between' }}>
                <Text style={styles.RateText}>Total items</Text>
                <Text style={{ ...styles.RateText }}>
                  {item.Totalitems}
                </Text>
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
// Products List End
export { PaymentListD, CustomerCard, StatusCard, DistributerCard, FlatListProductList, ORDERSDetailsList };
