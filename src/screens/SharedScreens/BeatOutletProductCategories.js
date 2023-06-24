import React from 'react';
import {
  StatusBar,
  View,
  Text,
  ScrollView,
  Dimensions,
} from 'react-native';
import ProductCategoriesList from '../../components/Beat_outlet/ProductCategoriesList';
import styles from '../../assets/css/styleProducts';
import { db } from '../../helper/SQLite DB/Sqlite';
import { useSelector } from 'react-redux';
const { width ,height} = Dimensions.get('window');
import { FontFamily } from '../../assets/fonts/FontFamily';
import { TextInput } from 'react-native-gesture-handler';
import FIcon from 'react-native-vector-icons/FontAwesome';
import { ProductCategoriesListShimmer } from '../../components/Beat_outlet/ProductCategoriesListShimmer';
import Header_2 from '../../components/shared/Header_2';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';

export default function BeatOutletProductCategories(props) {

  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()

  const primaryDistributor = useSelector(state => state.primaryDistributor);
  const [productCategories, setProductCategories] = React.useState([]);
  const [productCategoriesSearch, setProductCategoriesSearch] = React.useState([]);
  const [loader, setLoader] = React.useState(true);
  const [getOffset, setOffset] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);

  const getCategoriesFromDB = async () => {
    var qry;
    try {
      console.log("primaryDistributor.CategoryType", primaryDistributor.CategoryType)
      console.log("primaryDistributor.PricebookId", primaryDistributor.PricebookId)
      // alert(primaryDistributor.CategoryType)
      if (primaryDistributor.CategoryType === 'Regular') {
        qry = `SELECT * from Product_category where CategoryType='${primaryDistributor.CategoryType}' LIMIT 10 OFFSET ${getOffset}`
      }
      else if (primaryDistributor.CategoryType === 'Merchandise') {
        qry = `SELECT * from Product_category where CategoryType='${primaryDistributor.CategoryType}' LIMIT 10 OFFSET ${getOffset}`
      }
      else if (primaryDistributor.CategoryType === 'Samples') {
        qry = `SELECT * from Product_category where CategoryType='${primaryDistributor.CategoryType}' LIMIT 10 OFFSET ${getOffset}`
      }
      else {
        qry = `SELECT * from Product_category LIMIT 10 OFFSET ${getOffset}`
      }
    } catch (e) {

      qry = `SELECT * from Product_category LIMIT 10 OFFSET ${getOffset}`
    }

    try {
      await db.transaction(async tx => {
        await tx.executeSql(qry, [], (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
          }
          /********* Lazy loading Portion Start ************/
          // alert('length'+results.rows.length)
          if (results.rows.length > 0) {

            // alert('offset'+getOffset)
            var k = productCategories.concat(temp);
            setOffset(getOffset + 10);
            setProductCategories(k);
            setProductCategoriesSearch(k)
            setLoader(false);
            setIsLoading(true);
          } else {
            setLoader(false);
            setIsLoading(false);
          }

          /******** Lazy loading Portion End ************/
          // setProductCategories(temp)
          // setProductCategoriesSearch(temp)
          // setLoader(false);
          console.log('Data returned From Product_category SQLITE Line 28 ----->', temp);
        });
      });
    } catch (e) {
      alert(e);
    }
  }

  React.useEffect(() => {
    getCategoriesFromDB()
  }, [])

  var navigateFrom = ''
  try {
    if (props.route.params.navigateFrom == 'action') {
      navigateFrom = 'action'
    }
  } catch (e) {
  }

  const filtering = async (search) => {
    console.log("searching txt", search);
    var temp = productCategoriesSearch.filter(item => {
      return (
        item.CategoryName != null ? (
          item.CategoryName.toLowerCase().includes(search.toLowerCase())
        ) : (
          ''
        )

      )
    })
    setProductCategories(temp);
  }

  function handleBackButtonClick() {
    try {
      if (props.route.params.navigateFrom === 'action') {
        props.navigation.goBack();
      } else {
        // props.navigation.reset({
        //   index: 0,
        //   routes: [{ name: 'NewDashboard' }],});
        props.navigation.goBack();
      }
    } catch (e) {
      props.navigation.goBack();
    }
    return true;
  }

  return (
    <View style={{ ...styles.MainView, backgroundColor: themecolor.THEMECOLOR }}>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      {/* <View style={{
        width: width,
        height: 90,
        backgroundColor: Color.Color.HEADERTHEMECOLOR,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
      }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          padding: 15,
          flex: 1,
          width: width,
          alignSelf: 'center',
          // backgroundColor:'red',
        }}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => props.navigation.goBack()}>
              <Image
                source={require('../../assets/images/back.png')}
                style={styles.BackIcon}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
            <View style={{ alignContent: 'center', padding: 5 }}>
              <Text style={styles.Text}>Product Category </Text>
            </View>

          </View>
        </View>

      </View> */}
      <Header_2 title={'Product Category'} onPress={() => handleBackButtonClick()} />

      <View style={{ marginTop: 10 }} />
      <View
        style={{
          backgroundColor: 'white',
          flexDirection: 'row',
          alignItems: 'center',
          borderRadius: 10,
          backgroundColor: themecolor.BOXTHEMECOLOR,
          borderColor: themecolor.BOXBORDERCOLOR1,
          borderWidth: 0.5,
          width: width * 0.94,
          alignSelf: 'center'
        }}>
        <Text style={{ paddingHorizontal: 10,top:-2,left:2 }}>
          <FIcon name="search" size={12} color={themecolor.AV2} />
        </Text>
        <TextInput
          onChangeText={text => filtering(text)}
          placeholder="Search"
          style={{
            width: width * 0.8,
            fontFamily: FontFamily.PopinsRegular,
            color: themecolor.AV2
          }}
          placeholderTextColor={themecolor.AV2}
        />
      </View>
      {/* <View style={styles.MV} /> */}

      <View
        // showsVerticalScrollIndicator={false}
        style={styles.FullHeight}>
        <View style={styles.MV} />
        <View style={{ ...styles.FLVIEW,height:height-130 }}>

          {
            <>
              {
                loader ?
                  (
                    <>
                      <ProductCategoriesListShimmer />
                    </>
                  ) :
                  (
                    <ProductCategoriesList
                      outletId={props.route.params.outletId}
                      props={props} data={productCategories} navigateFrom={navigateFrom} isLoading={isLoading}
                      setIsLoading={setIsLoading} getCategoriesFromDB={getCategoriesFromDB} />
                  )
              }
            </>

          }
        </View>
        <View style={styles.MV50} />
      </View>
    </View >
  );
}