import React, { useRef, useState, useEffect } from 'react';
import {
  TouchableOpacity,
  Image,
  StatusBar,
  View,
  Text,
  Dimensions,
  BackHandler,
} from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import RBSheet from 'react-native-raw-bottom-sheet';
import { Colors } from '../../assets/config/Colors';
import styles from '../../assets/css/styleProducts';
import { ProductSortByFlatList } from '../beat/RBSheetSort';
import { FontSize } from '../../assets/fonts/Fonts';
import { FontFamily } from '../../assets/fonts/FontFamily';
import ProductCatalogueList from '../../components/Beat_outlet/ProductCatalogueList';
import { db } from '../../helper/SQLite DB/Sqlite';
import {
  StackActions,
  useNavigation,
  useFocusEffect,
  useIsFocused,
} from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { useToast } from 'react-native-toast-notifications';
import Header_2 from '../../components/shared/Header_2';
import { store } from '../../../App';
const { width, height } = Dimensions.get('screen');
import { TextInput } from 'react-native-gesture-handler';
import FIcon from 'react-native-vector-icons/FontAwesome';
import { ProductCategoriesListShimmer, VisitHistoryListShimmer } from '../../components/Beat_outlet/ProductCategoriesListShimmer';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';

export default function BeatOutletProducts(props) {

  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  const isFocused = useIsFocused();

  console.log("isFocused============>", isFocused)
  const navigation = useNavigation();
  const Cart = useSelector(state => state.OutletCart);
  const toast = useToast();
  const primaryDistributor = useSelector(state => state.primaryDistributor);
  console.log('primaryDistributor====> Line 25', primaryDistributor);
  var CartValue = Object.values(Cart);
  const [Total, setTotal] = useState('');
  const [Quantity, setQuantity] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [refresh1, setRefresh1] = useState(false);
  const [productCatalogue, setProductCatalogue] = React.useState([]);
  const [productCatalogueSearch, setProductCatalogueSearch] = React.useState([]);
  const [productCatalogue1, setProductCatalogue1] = React.useState([]);
  const [productCatalogue2, setProductCatalogue2] = React.useState([]);
  const [productCatalogue3, setProductCatalogue3] = React.useState([]);
  const refRBSheet1 = useRef();
  const [fromCatalogue, setFromCatalogue] = React.useState(true);
  const [getOffset, setOffset] = React.useState(0);
  const [getOffset1, setOffset1] = React.useState(0);
  const [getOffset2, setOffset2] = React.useState(0);
  const [getOffset3, setOffset3] = React.useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [loader, setLoader] = React.useState(true);
  const [isShow, setIsShow] = React.useState(false);
  console.log(
    'props.route.params.categoryId====> Line 34',
    props.route.params.categoryId,
  );
  const [isDoneVisible, setIsDoneVisible] = React.useState(false);
  const ProductFilterRedux = useSelector(state => state.ProductFilter);
  const ProductFilterReduxValue = Object.values(ProductFilterRedux);
  const ProductFilterReduxTemp = useSelector(
    state => state.ProductFilterTemporary,
  );
  const ProductFilterReduxValueTemp = Object.values(ProductFilterReduxTemp);
  const OutletCart = useSelector(state => state.OutletCart);

  console.log("jhgfdsaSDFGHJKK",productCatalogue)


  function handleBackButtonClick() {
    store.dispatch({ type: 'REMOVE_PRODUCT_FILTER' });
    store.dispatch({ type: 'REMOVE_PRODUCT_FILTER_TEMPORARY' });
    const popAction = StackActions.pop(1);
    navigation.dispatch(popAction);
    return true;
  }

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


  React.useEffect(() => {
    try {
      if (props.route.params.isNavigateFrom == 'action') {
        setFromCatalogue(false);
      }
    } catch (e) { }
  }, []);

  const getDataFromDBWithoutStock = async () => {
    try {
      await db.transaction(async tx => {
        await tx.executeSql(
          // `SELECT * from Products where CategoryId='${props.route.params.categoryId}'`,
          `SELECT * from Products where CategoryId='${props.route.params.categoryId}' LIMIT 10 OFFSET ${getOffset}`,
          [],
          (tx, results) => {
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i) {
              temp.push(results.rows.item(i));
            }
            /********* Lazy loading Portion Start ************/
            if (results.rows.length > 0) {
              // alert('length'+results.rows.length)
              // alert('offset'+getOffset)
              var k = productCatalogue.concat(temp);
              setOffset(getOffset + 10);
              setProductCatalogue(k);
              setProductCatalogueSearch(k)
              setLoader(false);
              setIsLoading(true);
            } else {
              setLoader(false);
              setIsLoading(false);
            }

            /******** Lazy loading Portion End ************/

            // setProductCatalogue(temp);
            // setProductCatalogueSearch(temp);
            // setLoader(false); 
            // setIsLoading(false);
            console.log(
              'Data returned From Products SQLITE Line 89 ----->',
              temp,
            );
          },
        );
      });
    } catch (e) {
      console.log(
        'Error in Catch in getDataFromDBWithoutStock Line 94 in BeatOutletProducts==>',
        e,
      );
    }
  };

  React.useEffect(() => {
    try {

      getDataFromDBWithoutStock();
    } catch (e) {
      getDataFromDBWithoutStock();
    }

  }, [refresh1]);


  React.useEffect(() => {
    if (isFocused) {
      try {
        setIsShow(false);
        getDataFromDBWithoutStock();
      } catch (e) {
        getDataFromDBWithoutStock();
      }
      setTimeout(() => {
        setIsShow(true)

      }, 1000)
    }
  }, [isFocused])


  React.useEffect(() => {
    if (isFocused) {
    var total = 0;
    var quantity = 0;
    CartValue.map(item => {
      total = parseFloat(total) + parseFloat(item.TotalPtr);
      quantity += item.quantity;
    });
    setTotal(total);
    setQuantity(quantity);
  }
  }, [refresh, refresh1,isFocused]);

  console.log(
    'ProductFilterReduxValueTemp-----------',
    ProductFilterReduxValueTemp.length,
  );

  const handleClickOnDone = async attribute_value => {
    // alert("offset=="+getOffset)
    // alert("offset1=="+getOffset1)
    // alert("offset2=="+getOffset2)

    store.dispatch({
      type: 'ADD_PRODUCT_FILTER',
      payload: [ProductFilterReduxValueTemp[0], ProductFilterReduxValueTemp[0]],
    });

    var qry = '';

    if (ProductFilterReduxValueTemp[0] == 1) {
      qry = `SELECT * from Products where CategoryId='${props.route.params.categoryId}' order by ProductName Asc LIMIT 10 OFFSET ${getOffset1}`;
    } else if (ProductFilterReduxValueTemp[0] == 2) {
      qry = `SELECT * from Products where CategoryId='${props.route.params.categoryId}' order by ProductName DESC LIMIT 10 OFFSET ${getOffset2}`;
    } else if (ProductFilterReduxValueTemp[0] == 3) {
      qry = `SELECT * from Products where CategoryId='${props.route.params.categoryId}' order by Id desc LIMIT 10 OFFSET ${getOffset3}`;
    }

    try {
      await db.transaction(async tx => {
        await tx.executeSql(qry, [], (tx, results) => {
          console.log('errr', tx);
          console.log('result Line 141--->', results);
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
          }

          if (results.rows.length > 0) {
            if (ProductFilterReduxValueTemp[0] == 1) {
              setProductCatalogueSearch([])
              setProductCatalogue2([]);
              setProductCatalogue3([]);
              setOffset2(0);
              setOffset3(0);
              setOffset(0);
              var k = productCatalogue1.concat(temp);
              setProductCatalogue(k);
              setProductCatalogue1(k);
              setProductCatalogueSearch(k)
              setOffset1(getOffset1 + 10);
              setOffset(getOffset1 + 10);

            }
            else if (ProductFilterReduxValueTemp[0] == 2) {
              setProductCatalogue1([]);
              setProductCatalogue3([]);
              setProductCatalogueSearch([])
              setOffset1(0);
              setOffset3(0);
              setOffset(0);
              var k = productCatalogue2.concat(temp);
              setProductCatalogue(k);
              setProductCatalogue2(k);
              setProductCatalogueSearch(k)
              setOffset2(getOffset2 + 10);
              setOffset(getOffset2 + 10);

            } else if (ProductFilterReduxValueTemp[0] == 3) {
              setProductCatalogue1([]);
              setProductCatalogue2([]);
              setProductCatalogueSearch([])
              setOffset1(0);
              setOffset2(0);
              setOffset(0);
              var k = productCatalogue3.concat(temp);
              setProductCatalogue(k);
              setProductCatalogue3(k);
              setProductCatalogueSearch(k)
              setOffset3(getOffset3 + 10);
              setOffset(getOffset3 + 10);

            }
            setIsLoading(true);
            setLoader(false);
          } else {
            setLoader(false);
            setIsLoading(false);
          }
          // if(ProductFilterReduxValueTemp.length == 0){

          //   setOffset1(getOffset1 + 10);
          //   setIsLoading(false);
          // }else{
          //   var k =productCatalogue.concat(temp)
          //  setProductCatalogue(k);
          //  setOffset1(getOffset1 + 10);
          //  setIsLoading(false);
          // console.log('Data returned From Outlets SQLITE filterClickOnDoneFunction pending Outlets----->', temp);
          // }

          /***Old */
          // setProductCatalogue(temp);
          refRBSheet1.current.close();
        });
      });
    } catch (e) { }
    setIsDoneVisible(false);
  };

  const filtering = async (search) => {
    console.log("searching txt", search);
    var temp = productCatalogueSearch.filter(item => {
      return (
        item.ProductName != null ? (
          item.ProductName.toLowerCase().includes(search.toLowerCase())
        ) : (
          ''
        )
      )
    })
    setProductCatalogue(temp);
  }


  return (
    <View style={{ ...styles.MainView, backgroundColor: themecolor.THEMECOLOR }}>
      <StatusBar translucent backgroundColor="transparent" />
      <Header_2
        title={props.route.params.CategoryName}
        onPress={() => {
          store.dispatch({ type: 'REMOVE_PRODUCT_FILTER_TEMPORARY' });
          store.dispatch({ type: 'REMOVE_PRODUCT_FILTER' });
          setIsDoneVisible(false);
          handleBackButtonClick();
          // props.navigation.goBack()
        }}
        iconnameplus="filter"
        onPressIconPlus={() => refRBSheet1.current.open()}
      />

      <View style={{ marginTop: 10 }} />

      {/* <View>
        <View style={{
          width: width * 0.92,
          alignSelf: 'center',
          height: 45,
        }}>
          <View style={{
            backgroundColor: 'white',
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 10,
          }}>
            <Text style={{ paddingHorizontal: 10 }}>
              <FIcon name="search" size={15} />
            </Text>
            <TextInput
              onChangeText={text => filtering(text)}
              placeholder="Search Products" style={{ backgroundColor: 'transparent', width: width * 0.8, fontFamily: FontFamily.PopinsRegular, top: 2 }} />
          </View>
        </View>
    </View> */}

      {/* <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 0.5,
        width: width * 0.96,
        alignSelf: 'center',
        borderColor: themecolor.BOXBORDERCOLOR1,
        backgroundColor: themecolor.BOXTHEMECOLOR
      }}>
        <Text style={{ paddingHorizontal: 10 }}>
          <FIcon name="search" size={15} />
        </Text>
        <TextInput
          onChangeText={text => filtering(text)}
          placeholder="Search Product Category" style={{ backgroundColor: 'transparent', width: width * 0.8, fontFamily: FontFamily.PopinsRegular, top: 2, }} />
      </View> */}

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
        <Text style={{ paddingHorizontal: 10, top: -2, left: 2 }}>
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

      <View style={styles.MV} />
      <View style={{ ...styles.FLVIEW, height: fromCatalogue ? Object.keys(OutletCart).length > 0 ? height - 290 : height - 200 : height - 200, }}>
        {
          loader ?
            (
              <>
                {/* <ProductCategoriesListShimmer /> */}
                < VisitHistoryListShimmer />
              </>
            ) :
            (
              isShow ?
                (
                  <>
                    <ProductCatalogueList
                      props={props}
                      data={productCatalogue}
                      refresh={refresh}
                      setRefresh={setRefresh}
                      refresh1={refresh1}
                      setRefresh1={setRefresh1}
                      fromCatalogue={fromCatalogue}
                      outletId={props.route.params.outletId}
                      getProductsFromDB={getDataFromDBWithoutStock}
                      isLoading={isLoading}
                      setIsLoading={setIsLoading}
                      ProductFilterReduxValueTemp={ProductFilterReduxValueTemp}
                      handleClickOnDone={handleClickOnDone}
                      themecolor={themecolor}
                    />
                  </>
                ) : (<></>)
            )
        }
      </View>
      <View style={styles.MV50} />

      {fromCatalogue ? (
        Object.keys(OutletCart).length > 0 ?
          <View style={styles.BottomButton}>
            <TouchableOpacity
              style={{
                backgroundColor: themecolor.HEADERTHEMECOLOR,
                width: width,
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                height: 80,
              }}
              onPress={() => {
                if (Quantity > 0) {
                  props.navigation.navigate('ConfirmOrder', { refresh1: refresh1, setRefresh1: setRefresh1 });
                } else {
                  toast.show('Please choose any product.', {
                    type: 'danger',
                    placement: 'bottom',
                    duration: 3000,
                    offset: 30,
                    animationType: 'slide-in',
                  });
                }
              }}>
              <View style={{ justifyContent: 'space-between', width: width * 0.88, flexDirection: 'row', alignSelf: 'center', paddingVertical: 8 }}>
                <View>
                  <Text
                    style={{
                      ...styles.AStock,
                      color: Colors.white,
                      fontSize: FontSize.smallText,
                    }}>
                    {Quantity} Quantity
                  </Text>
                  <Text
                    style={{
                      ...styles.RateText,
                      color: Colors.white,
                      fontSize: FontSize.labelText3,
                      fontFamily: FontFamily.Popinssemibold,
                    }}>
                    Total <FAIcon name="rupee" /> {Total}
                  </Text>
                </View>

                <View style={styles.FLEXDIREC1}>
                  <View style={styles.JC}>
                    <Image
                      source={require('../../assets/images/right.png')}
                      style={styles.BackIcon}
                      resizeMode={'contain'}
                    />
                  </View>
                  <View></View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          : <></>
      ) : (
        <></>
      )}

      {/* Filter Sheet */}
      {/* <FilterRBsheetComponent clickOnFilter={clickOnFilter} setClickOnFilter={setClickOnFilter} filterClickOnDoneFunction = {filterClickOnDoneFunction} loader={loader} setLoader={setLoader} onShow={'beatOutletProduct'}/> */}

      <RBSheet
        ref={refRBSheet1}
        animationType={'slide'}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={220}
        customStyles={{
          container: {
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            padding: 10,
            backgroundColor: themecolor.RB2
          },
          draggableIcon: {
            display: 'none',
          },
        }}>
        <View style={styles.RBVIEW}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              store.dispatch({ type: 'REMOVE_PRODUCT_FILTER_TEMPORARY' });
              refRBSheet1.current.close();
            }}>
            <Image
              source={require('../../assets/images/close.png')}
              style={styles.CloseIcon}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
          <View>
            <Text style={{ ...styles.CardText, color: themecolor.TXTWHITE }}>Set Filters</Text>
          </View>
          <View>
            <View>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => handleClickOnDone()}>
                <Text style={{ ...styles.RBText1, color: themecolor.TXTWHITE }}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.SortView}>
          <View style={styles.MV3} />
          <View style={styles.Width9}>
            <Text style={{ ...styles.CardText1, color: themecolor.TXTWHITE }}>Sort by</Text>
          </View>

          <ProductSortByFlatList setIsDoneVisible={setIsDoneVisible} />
        </View>
      </RBSheet>

    </View>
  );
}
