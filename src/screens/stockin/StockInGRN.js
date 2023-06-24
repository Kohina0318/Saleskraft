import React, { useEffect, useState } from 'react';
import {
  View,
  Dimensions,
  StatusBar,
  Text,
  BackHandler
} from 'react-native';
import Header_2 from '../../components/shared/Header_2';
import { useNavigation } from '@react-navigation/native';
import FullsizeButton from '../../components/shared/FullsizeButton';
import { StockINGRNListFL, StockINList } from '../../screens/stockin/StockDataList';
import styles from '../../assets/css/styleStockIn';
import VerifyModel from '../../components/shared/VerifyModel';
import { getShippingOrderDetails, postProcessShippingOrder } from '../../repository/stockIn/StockInRepository';
import { useToast } from 'react-native-toast-notifications';
import NoData from '../../components/shared/NoData';
import { StockInInvoiceShimmer, StockInReturnLineItemShimmer } from '../../components/Beat_outlet/ProductCategoriesListShimmer';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';
import { db } from '../../helper/SQLite DB/Sqlite';
// import LoaderAllInOne from '../../components/shared/Loader';
const { width, height } = Dimensions.get('screen');


export default function StockInGRN(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()

  const toast = useToast();
  const navigation = useNavigation()
  const [showModal, setshowModal] = useState(false)
  const [loader, setLoader] = useState(true);
  const [shippingOrderDetailsData, setShippingOrderDetailsData] = useState([])
  const [stocksData, setStocksData] = useState([])

  const [qty, setQty] = useState(0)
  const [returnLineItems, setReturnLineItems] = useState({});
  console.log("return Line Items====", returnLineItems)


  // const handleShippingOrderDetails = async () => {
  //   try {
  //     const res = await getShippingOrderDetails(props.route.params.ShippingOrderId);
  //     console.log("Get getShippingOrderDetails......page StockIn line 24", res);
  //     if (res.statusCode === 200) {
  //       let arr = []
  //       arr.push(res.data)
  //       setShippingOrderDetailsData(arr);
  //       setStocksData(res.data.Stocks);
  //     }
  //       setLoader(false)
  //   } catch (e) {
  //     console.log("Error getShippingOrderDetails in StockIn page", e)
  //   }
  // }

  const handleShippingOrderDetails = async () => {
    try {
      const res = await getShippingOrderDetails(props.route.params.ShippingOrderId);
      console.log("Get getShippingOrderDetails......page StockIn line 24", res);
      if (res.statusCode === 200) {
        let arr = []
        arr.push(res.data)
        setShippingOrderDetailsData(arr);
        // setStocksData(res.data.Stocks);

        res.data.Stocks.forEach((item, index) => {
          db.transaction(async tx => {
            await tx.executeSql(
              `Select * from Products
              left join Outlets on Outlets.Id='${props.route.params.outletId}'
              left join Mapping on Mapping.SecondaryOutletId=Outlets.Id AND Mapping.isdefault=${1}
              left join PriceBooks on PriceBooks.PricebookId=Mapping.PricebookId AND
               PriceBooks.ProductId='${item.ProductId}'
              where Products.Id='${item.ProductId}'`,
              [],

              async (tx, results) => {
                if (results.rows.length > 0) {
                  console.log('results Line 183 ===> ', results);
                  var temp = [];
                  for (let i = 0; i < results.rows.length; ++i) {
                    temp.push(results.rows.item(i));
                  }
                  temp[0]['Stocks'] = item
                  console.log('temp productItem in page no StockDataList  ======> ', temp);
                  setStocksData(prev => [...prev, temp[0]]);
                } else {
                  console.log('Error product Item In  Line 76 ===> ', tx);
                  if (index == 0) {
                    toast.show('Please Sync Your Data.', {
                      type: 'warning',
                      placement: 'bottom',
                      duration: 3000,
                      offset: 30,
                      animationType: 'slide-in',
                    });
                  }
                }
              },
            )
          })

        })
      }
      setLoader(false)
    } catch (e) {
      console.log("Error getShippingOrderDetails in StockIn page", e)
      toast.show('Something went wrong!, Try again later.', {
        type: 'danger',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
    }
  }


  const handleProcessShippingOrder = async () => {
    var returnLines = Object.values(returnLineItems);
    var body = {
      "soid": props.route.params.ShippingOrderId,
      "return_lines": returnLines
    };
    console.log("Body of ProcessShippingOrder..:", body)
    if (qty > 0) {
      try {
        var res = await postProcessShippingOrder(body)
        console.log("ProcessShippingOrder.....in page StockInGrn line no 61>>>>:", res);
        if (res.statusCode == 200) {
          setshowModal(true);
        } else {
          toast.show(res.message, {
            type: 'warning',
            placement: 'bottom',
            duration: 3000,
            offset: 30,
            animationType: 'slide-in',
          });
        }
      } catch (e) {
        toast.show("Something went wrong!, Please try again later.", {
          type: 'danger',
          placement: 'bottom',
          duration: 3000,
          offset: 30,
          animationType: 'slide-in',
        });
      }
    } else {
      toast.show("Please Choose Product!", {
        type: 'warning',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
    }
  }

  useEffect(() => {
    handleShippingOrderDetails()
  }, [])

  function handleBackButtonClick() {
    // navigation.goBack();
    // props.route.params.setStockInModal(true)
    navigation.push('NewDashboard', {
      navigateFrom: 'temporaryParams',
      newProp: props.route.params.setStockInModal(true)
    })
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

  return (

    <View style={{ ...styles.flex, backgroundColor: themecolor.THEMECOLOR }}>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      <Header_2 title={'Stock In - GRN'} onPress={() => handleBackButtonClick()} />

      {/* <>
        {loader ? (
          <LoaderAllInOne />
        ) : ( */}
      <>

        <View style={{ marginTop: 10 }} />
        <View>
          {loader ? (
            <StockInInvoiceShimmer />
          ) : (
            shippingOrderDetailsData.length > 0 ?
              <StockINList shippingOrderDetailsData={shippingOrderDetailsData} /> :
              <NoData message="No Stock In- GRN" />
          )}

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center', width: width * 0.9, alignItems: 'center' }}>

            {loader ? (
              <View style={{ marginTop: 10 }}><Text style={{ ...styles.txt, color: themecolor.TXTWHITE }}>Return Line items</Text></View>
            ) : (
              <>
                {stocksData.length > 0 ? (
                  <View><Text style={{ ...styles.txt, color: themecolor.TXTWHITE }}>Return Line items</Text></View>
                ) : (<></>)}
              </>
            )}
          </View>

          {loader ? (
            <StockInReturnLineItemShimmer />
          ) : (
            <StockINGRNListFL stocksData={stocksData} outletId={props.route.params.outletId}
              setReturnLineItems={setReturnLineItems} setQty={setQty} />
          )}
        </View>

        {stocksData.length > 0 ? (
          <View style={styles.buttonView}>
            <FullsizeButton subt={true} subtitle={'9 Items'} title={'Complete GRN'} backgroundColor={themecolor.HEADERTHEMECOLOR}
              width={width} height={70} BRadius={0} onPress={() => handleProcessShippingOrder()} />
          </View>
        ) : (<></>)}

      </>
      {/* )
        }
      </> */}

      {showModal && (
        <VerifyModel
          setshowModal={setshowModal}
          navigateTo={'NewDashboard'}
          navigateFrom={'StockInGRN'}
          title="Your GRN has been successfully completed."
        />
      )}

    </View>
  )
}