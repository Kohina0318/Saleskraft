import React, { useState } from 'react';
import {
  TouchableOpacity,
  View,
  FlatList,
  Text,
  Image,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../../assets/css/styleProducts';
import { GetCategories } from '../../repository/catalogue/productRepository';
import { db } from '../../helper/SQLite DB/Sqlite';
import { SERVER_URL } from '../../repository/commonRepository';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { flex } from 'styled-system';

// import FAIcon from 'react-native-vector-icons/FontAwesome';

// SearchOUTLETSShow
// const OUTLETSCustomerdata = [
//     {
//       name: 'Nail File Small - NF5-BL',
//       name1: '82.62',
//       pic2: (
//         <Image
//           style={{
//             width: 55,
//             height: 55,
//             justifyContent: 'center',
//             alignSelf: 'center',
//           }}
//           source={require('../../assets/images/product/nailfile.png')}
//           resizeMode={'contain'}
//         />
//       ),
//       statuscolor: '#00C46F',
//     },
//     {
//       name: 'Dzyner Mini Nail File',
//       name1: '82.62',
//       pic2: (
//         <Image
//           style={{
//             width: 55,
//             height: 55,
//             justifyContent: 'center',
//             alignSelf: 'center',
//           }}
//           source={require('../../assets/images/product/Dzynernailfile.jpg')}
//           resizeMode={'contain'}
//         />
//       ),
//       statuscolor: 'orange',
//     },

//   ];
// OUTLETS_List END
function OUTLETSListD({ item, props }) {
  const generateColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0');
    return `#${randomColor}`;
  };

  var avatarName = '';
  if (item.dataType == 'Outlets') {
    if (item.OutletName != null) {
      avatarName = `${item.OutletName[0].toUpperCase()}`;
    }
  }
  return (

    <>
      <>
        <View
          style={styles.SearchFLMainVIew}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.SearchTouchable}>
            <View
              style={{...styles.SearchSecondView, }}>
              {/* <View style={styles.Width2}>{item.pic2}</View> */}

              {/* New Start */}
              <View style={styles.Width2}>
                <View
                  style={{
                    backgroundColor: generateColor(),
                    ...styles.CircleNewColor
                  }}>
                  <Text
                    style={styles.CircleNewColorText}>
                    {avatarName}
                  </Text>
                </View>
              </View>
              {/* New End */}

              <View style={styles.WIDTH7CENTER}>
                <Text
                  style={styles.ProductName}>
                  {item.OutletName}
                </Text>
                <Text
                  style={styles.MRPText}>
                  {item.OutletContactName}
                </Text>
                <Text
                  style={styles.MRPText}>
                  {item.OutletContactNo}
                </Text>

              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ marginVertical: 1 }} />
      </>
      {/* <View style={{width:100,height:18,borderRadius:10,backgroundColor:item.statuscolor}} >
                    <Text
                        style={styles.TagNewColorText}>
                    {props.Tag}
                      </Text>
         </View> */}
    </>

  );
}

function FlatListOUTLETSD(props) {
  return (
    <FlatList
      data={props.searchedData}
      // data={OUTLETSCustomerdata}
      renderItem={({ item }) => <OUTLETSListD item={item} props={props} />}
      showsVerticalScrollIndicator={false}
      scrollEnabled={false}
    />
  );
}
// SearchOUTLETSShow ENd

// SearchProductShow
// const SearchingProductdata = [
//     {
//       name: 'Nail File Small - NF5-BL',
//       name1: '82.62',
//       // screen: 'CallStatus',
//       pic2: (
//         <Image
//           style={{
//             width: 55,
//             height: 55,
//             justifyContent: 'center',
//             alignSelf: 'center',
//           }}
//           source={require('../../assets/images/product/nailfile.png')}
//           resizeMode={'contain'}
//         />

//       ),
//     },
//     {
//       name: 'Dzyner Mini Nail File',
//       name1: '82.62',
//       // screen: 'AttendanceReport',
//       pic2: (
//         <Image
//           style={{
//             width: 55,
//             height: 55,
//             justifyContent: 'center',
//             alignSelf: 'center',
//           }}
//           source={require('../../assets/images/product/Dzynernailfile.jpg')}
//           resizeMode={'contain'}
//         />
//       ),
//     },

//   ];
// Product_List END
async function ProductListD({ item }) {
  return (
    <>
      {/* <View
        style={styles.SearchFLMainVIew}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.SearchTouchable}>
          <View
            style={styles.SearchSecondView}>
            <View style={styles.Width2}>{item.pic2}</View>

            

            
            <View style={styles.WIDTH7CENTER}>
              <Text
                style={styles.ProductName}>
                {item.name}
              </Text>
              <Text
                style={styles.MRPText}>
                MRP : <FAIcon name="rupee" size={10} /> {item.name1}
              </Text>
            
            </View>
          </View>
        </TouchableOpacity>
      </View> */}

      <View
        style={styles.SearchFLMainVIew}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.SearchTouchable}>
          <View
            style={styles.SearchSecondView}>
            <View style={styles.Width2}>
              <Image
                source={{ uri: `${await SERVER_URL()}media?id=${item.ProductImages}` }}
                resizeMode={'contain'}
                style={{
                  width: 55,
                  height: 55,
                  justifyContent: 'center',
                  alignSelf: 'center',
                }}
              >
              </Image>
            </View>
            <View style={styles.WIDTH7CENTER}>
              <Text
                style={styles.ProductName}>
                {item.ProductName}
              </Text>
              {/* <Text
                style={styles.MRPText}>
                MRP : <FAIcon name="rupee" size={10} /> {item.name1}
              </Text> */}
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ marginVertical: 1 }} />
    </>
  );
}
function FlatListProductD(props) {

  return (
    <FlatList
      // data={SearchingProductdata}
      data={props.searchedData}
      renderItem={({ item }) => <ProductListD item={item} />}
      showsVerticalScrollIndicator={false}
      scrollEnabled={false}
    />
  );
}
// SearchProductShow ENd


function FlatListProductsList(props) {
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
      data={productData}
      renderItem={({ item }) => (
        <ProductsListFlatList item={item} props={props} />
      )}
      showsVerticalScrollIndicator={false}
      scrollEnabled={false}
    />
  );
}

// Customer_List END
function SearchProductList({ item, themecolor }) {
  
  const navigation = useNavigation();
  const [getBaseUrl, setBaseUrl] = React.useState('');

  React.useEffect(() => {
    async function temp() {
      setBaseUrl(await SERVER_URL())
    }
    temp()
  }, [])

  // console.log("========>", item);

  const generateColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0');
    return `#${randomColor}`;
  };

  var avatarName = '';
  if (item.dataType == 'Outlets') {
    if (item.OutletName != null) {
      avatarName = `${item.OutletName[0].toUpperCase()}`;
    }
  }

  const handleClickOnOutlet = async () => {
    try {
      await db.transaction(async tx => {
        await tx.executeSql(`select * from Outlets`, [], (tx, results) => {

          // console.log('result Line 141--->', results);
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
          }
          if (temp.length > 0) {
            navigation.push('OutletView', {
              item: item,
              navigateFrom: 'FromSearch'
            })
          } else {
            Alert.alert(
              'Warning',
              'Please Sync your data first.');
          }
          console.log('Data returned From CarousalDataList SQLITE ine 78 ----->', temp);
        });
      });
    } catch (e) {
      console.log("Err in cathc line 318 in SearchProductData==", e)
    }

  }

  return (
    <>
      {/*****************  If dataType == Products Start *********************************************/}
      {item.dataType == 'Products' ?
        (
          <>
            <View
              style={styles.SearchFLMainVIew}>
              <TouchableOpacity
                activeOpacity={0.5}
                style={{...styles.SearchTouchable, borderColor: themecolor.BOXBORDERCOLOR1}}>
                <View
                  style={{...styles.SearchSecondView,  backgroundColor: themecolor.BOXTHEMECOLOR, }}>
                  <View style={styles.Width2}>
                    <Image
                      source={{ uri: `${getBaseUrl}media?id=${item.ProductImages}` }}
                      resizeMode={'contain'}
                      style={{
                        width: 55,
                        height: 55,
                        justifyContent: 'center',
                        alignSelf: 'center',
                      }}
                    >
                    </Image>
                  </View>
                  <View style={styles.WIDTH7CENTER}>
                    <Text
                      style={{...styles.ProductName, color: themecolor.TXTWHITE}}>
                      {item.ProductName}
                    </Text>
                    {/* <Text
                      style={styles.MRPText}>
                      MRP : <FAIcon name="rupee" size={10} /> {item.name1}
                    </Text> */}
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ marginVertical: 1 }} />
          </>
        ) : (<></>)
      }
      {/*********************  If dataType == Products End  ***************************/}

      {/*****************  If dataType == Outlets Start ***************************/}
      {item.dataType == 'Outlets' ?
        (
          <>
            <View
              style={styles.SearchFLMainVIew}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => handleClickOnOutlet(item)}
                style={{...styles.SearchTouchable, borderColor: themecolor.BOXBORDERCOLOR1}}>
                <View
                  style={{...styles.SearchSecondView ,  backgroundColor: themecolor.BOXTHEMECOLOR, }}>
                  {/* <View style={styles.Width2}>{item.pic2}</View> */}

                  {/* New Start */}
                  <View style={styles.Width2}>
                    <View
                      style={{
                        backgroundColor: generateColor(),
                        ...styles.CircleNewColor
                      }}>
                      <Text
                        style={{...styles.CircleNewColorText, color: themecolor.TXTWHITE}}>
                        {avatarName}
                      </Text>
                    </View>
                  </View>
                  {/* New End */}

                  <View style={styles.WIDTH7CENTER}>
                    <Text
                      style={{...styles.ProductName, color: themecolor.TXTWHITE}}>
                      {item.OutletName}
                    </Text>
                    <Text
                      style={{...styles.MRPText, color: themecolor.TXTWHITE}}>
                      {item.OutletContactName}
                    </Text>
                    <Text
                      style={{...styles.MRPText,color: themecolor.TXTWHITE}}>
                      {item.OutletContactNo}
                    </Text>

                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ marginVertical: 1 }} />
          </>
        ) : (<></>)
      }
      {/*********************  If dataType == Outlets End  ***************************/}



    </>

  );
}
export function SearchingFLList(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
 
  return (
    <FlatList
      data={props.searchedData}
      renderItem={({ item }) => <SearchProductList item={item}  themecolor={themecolor}/>}
      showsVerticalScrollIndicator={false}
      scrollEnabled={true}
    />
  );
}
// Products List End
export { FlatListProductsList, FlatListProductD, FlatListOUTLETSD };
