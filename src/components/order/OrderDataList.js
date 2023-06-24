import React, { useState } from 'react';
import {
  TouchableOpacity,
  View,
  FlatList,
  Text,
  Image,
  Dimensions
} from 'react-native';

import { Colors } from '../../assets/config/Colors';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import EIcon5 from 'react-native-vector-icons/EvilIcons';
import FIcon5 from 'react-native-vector-icons/FontAwesome5';
import FIcon from 'react-native-vector-icons/FontAwesome';
import MCIcon from 'react-native-vector-icons/MaterialIcons';
import styles from '../../assets/css/styleProducts';
import stylesC from '../../assets/css/stylesBeat';
import { GetCategories } from '../../repository/catalogue/productRepository';
import { useSelector } from 'react-redux';
const { width } = Dimensions.get('screen');
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';

const Productdata = [
  {
    name: 'Hair Brush',
    screen: 'ProductCategories',
    pic2: (
      <Image
        style={styles.ProductImage}
        source={require('../../assets/images/product/hairbrush.png')}
        resizeMode={'contain'}
      />

    ),
  },
  {
    name: 'Hair Combs',
    screen: 'ProductCategories',
    pic2: (
      <Image
        style={styles.ProductImage}
        source={require('../../assets/images/product/haircombs.png')}
        resizeMode={'contain'}
      />
    ),
  },
  {
    name: 'Bath Accessories',
    screen: 'ProductCategories',
    pic2: (
      <Image
        style={styles.ProductImage}
        source={require('../../assets/images/product/sponge.png')}
        resizeMode={'contain'}
      />
    ),
  },
  {
    name: 'Face Accessories',
    screen: 'ProductCategories',
    pic2: (
      <Image
        style={styles.ProductImage}
        source={require('../../assets/images/product/face.png')}
        resizeMode={'contain'}
      />
    ),
  },
  {
    name: 'Pedicure',
    screen: 'ProductCategories',
    pic2: (
      <Image
        style={styles.ProductImage}
        source={require('../../assets/images/product/pedicure.jpg')}
        resizeMode={'contain'}
      />
    ),
  },
  {
    name: 'Make up Brush',
    screen: 'ProductCategories',
    pic2: (
      <Image
        style={styles.ProductImage}
        source={require('../../assets/images/product/makeup.png')}
        resizeMode={'contain'}
      />
    ),
  },
  {
    name: 'Manicure',
    screen: 'ProductCategories',
    pic2: (
      <Image
        style={styles.ProductImage}
        source={require('../../assets/images/product/manicure.png')}
        resizeMode={'contain'}
      />
    ),
  },
  {
    name: 'Grooming',
    screen: 'ProductCategories',
    pic2: (
      <Image
        style={styles.ProductImage}
        source={require('../../assets/images/product/grooming.png')}
        resizeMode={'contain'}
      />
    ),
  },
];
// const DistributorCardData = [
//   {
//     id: 1,
//     shop: 'Delhi Warehouse',
//     shoptype: 'cosmetic store',
//     name: 'Jaykishan Dabe',
//     class: 'A',
//     address: '1 shangita apartment, Padli,Ahemdabad,Gujraat',
//     mobile: '9131372790',
//     shopid: 'VEGA#RE01',
//     screen: 'Store1',
//   },

// ];
function DistributorCard(props) {
  const primaryDistributor = useSelector(state => state.primaryDistributor);

  return (
    // <FlatList
    //   data={[primaryDistributor]}
    //   renderItem={({ item }) => <DistributorListFlatList item={item} props={props} setShipFrom={props.setShipFrom} setShipToName={props.setShipToName} setShipFromName={props.setShipFromName} />}
    //   showsVerticalScrollIndicator={false}
    //   scrollEnabled={false}
    // />
    <>{[primaryDistributor].map((item,index)=><DistributorListFlatList item={item} key={index} props={props} setShipFrom={props.setShipFrom} setShipToName={props.setShipToName} setShipFromName={props.setShipFromName} />)}</>
  );
}

function DistributorListFlatList({ item, props, setShipFrom, setShipFromName, setShipToName }) {

  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  // console.log("Distributor Data----> Line 148 ", item);
  React.useEffect(() => {
    setShipFrom(item.SecondaryOutletId);
    setShipFromName(item.shipFromName);
    setShipToName(item.shipToName);
  }, [])
  // const navigation = useNavigation();
  return (
    <>
      <View style={{ ...stylesC.FLMAINViewNew, backgroundColor: themecolor.BOXTHEMECOLOR, width: width * 0.94, borderColor: themecolor.BOXBORDERCOLOR1, }}>
        <View style={{marginLeft:5}}>
          <View>
            <View style={stylesC.FL1}>
              <Text style={{ ...stylesC.FLHeadText, color: themecolor.TXTWHITE }}>
                {item.OutletName==''||item.OutletName==null?'not available':item.OutletName}
              </Text>
            </View>
          </View>
          <View style={stylesC.FLVIEW}>
            <View style={stylesC.FLVIEW2}>
              <EIcon5 name="user" size={20} color={Colors.bluetheme} />
              <Text style={{ ...stylesC.SmallHeading, color: themecolor.TXTWHITE }}>{item.OutletContactName==''||item.OutletContactName==null?'not available':item.OutletContactName}</Text>
            </View>
            <View style={stylesC.MPVIew}>
              <FIcon name="mobile-phone" size={20} color={Colors.bluetheme} />
              {
                <Text style={{ ...stylesC.MobileText, color: themecolor.TXTWHITE }}>{(item.OutletContactNo == '' || item.OutletContactNo == null) ? 'Not available' : item.OutletContactNo}</Text>
              }
            </View>
          </View>
          <View style={stylesC.NEWVIEW82}>
            <FIcon5 name="map-marker-alt" size={14} color={Colors.bluetheme} />
            <Text style={{ ...stylesC.MobileText, color: themecolor.TXTWHITE }}>{item.OutletAddress==''||item.OutletAddress==null?'not available':item.OutletAddress}</Text>
          </View>
          <View style={stylesC.StarVIew}>
            <View style={{ ...stylesC.FLVIEW3, right: 2 }}>
              {
                item.OutletClassification == null ?
                  (
                    <><View></View></>
                  ) :
                  <><View style={{ flexDirection: 'row' }}>
                    <Text><MCIcon name="bookmark-outline" size={15} color={Colors.bluetheme} /></Text>
                    <Text style={{ ...stylesC.MobileText, color: themecolor.TXTWHITE }}>
                      Chanel Category: {item.OutletClassification}
                    </Text>
                  </View>
                  </>
              }
            </View>

          </View>
          {/*  
          

          */}


        </View>
      </View>
    </>
  )
}

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
          <View
            style={styles.PW}>
            <View style={styles.Width2}>{item.pic2}</View>
            <View style={styles.Width7}>
              <Text
                style={styles.PNameText}>
                {item.name}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.MV3} />
    </>
  );
}
function FlatListOrderList(props) {

  const [productData, setProductData] = useState([]);
  const ProductCategoriesApis = async () => {
    var temp = await GetCategories();
    // console.log("Product Data😒😒😒:", temp);
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
const Orderdata = [
  {
    name1: '82.62',
  },

];
// Customer_List END
function OrderListD({ item }) {
  return (
    <>
      <View style={styles.CUSTOMERdvIEW}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.CUSTOMERVIEWTO}
        >
          <View
            style={styles.NumberInputView}>
            <View style={{ ...styles.Width85, justifyContent: 'center', alignSelf: 'center' }}>
              <View style={{ ...styles.FLEXDIREC1, justifyContent: 'space-between' }}>
                <Text
                  style={styles.RateText}>
                  Subtotal
                </Text>
                <Text
                  style={{
                    ...styles.RateText,
                  }}>
                  <FAIcon name='rupee' size={11} /> {item.name1}
                </Text>
              </View>
              <View style={{ ...styles.FLEXDIREC1, justifyContent: 'space-between' }}>
                <Text
                  style={styles.RateText}>
                  PTR margin
                </Text>
                <Text
                  style={{
                    ...styles.RateText, color: Colors.green1
                  }}>
                  <FAIcon name='rupee' size={11} /> {item.name1}
                </Text>
              </View>
            </View>

          </View>
          <View style={styles.border} />
          <View style={styles.NumberInputView}>
            <View >
              <Text style={styles.RateTextbold}>Total</Text>

            </View>

            <View style={styles.FLEXDIREC1}>
              <View >
                <Text style={styles.RateTextbold}> <FAIcon name='rupee' size={11} /> {item.name1}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>

      </View>
      <View style={{ marginVertical: 1 }} />
    </>
  );
}
export function FlatListCustomerD(props) {

  return (
    <FlatList
      data={Orderdata}
      renderItem={({ item }) => <OrderListD item={item} />}
      showsVerticalScrollIndicator={false}
      scrollEnabled={false}
    />
  );
}
// Products List End
export { FlatListOrderList, DistributorCard };