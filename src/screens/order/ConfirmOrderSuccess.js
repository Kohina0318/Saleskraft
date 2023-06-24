import React, { useState } from 'react';
import {
  StatusBar,
  View,
  Text,
  ScrollView,
  Dimensions,
  BackHandler,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import styles from '../../assets/css/styleProducts';
import Video from 'react-native-video';
import OHeader from '../../components/order/OHeader';
import { StackActions, useNavigation, useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { store } from '../../../App';
import MCIcon from 'react-native-vector-icons/MaterialIcons';
import { SharedMethod } from '../../repository/SyncData/SharedMethods';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import LoaderAllInOne from '../../components/shared/Loader';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Share from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';
import { getOutletRecentOrders } from '../../repository/outlet/OutletRepositoy';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getEmployeeDetailsById } from '../../repository/commonRepository';
const { width } = Dimensions.get('screen');


export default function ConfirmOrderSuccess(props) {
  const mode = useSelector(state => state.mode);
  const orderLineItem = useSelector(state => state.orderLineItem);
  console.log("orderLineItem----",orderLineItem)
  const themecolor = new MyThemeClass(mode).getThemeColor()
  const [loader, setLoader] = React.useState(true);
  const navigation = useNavigation();
  const customerDetails = useSelector(state => state.customerDetailsOutletId);
  const primaryDistributor = useSelector(state => state.primaryDistributor);
  console.log("CustomerDetails==",customerDetails)
  console.log("primaryDistributor==",primaryDistributor)
  const [count, setCount] = useState(1);
  const[subTotalMRP,setSubTotalMRP]=React.useState('');
  const[subTotalPTR,setSubTotalPTR]=React.useState('');
  const[subTotalPTRMargin,setSubTotalPTRMargin]=React.useState('');
 
  const network = useSelector(state => state.network);
  const fs = RNFetchBlob.fs;


  React.useEffect(()=>{
    var total = 0;
    var ptrmargin = 0;
    var subtotal = 0;  
    orderLineItem.forEach(item=>{
        total =  parseFloat(total) + parseFloat(item.totalPtr);
        console.log("total===========>>>>",item.totalPtr)
        setSubTotalPTR(total)
        ptrmargin = (parseFloat(ptrmargin) + parseFloat(item.ptrMargin)).toFixed(2);
        setSubTotalPTRMargin(ptrmargin)
        subtotal += item.subTotal;
        setSubTotalMRP(subtotal)
    })  
  },[]);



  function handleBackButtonClick() {
    // setTimeout(()=>{
    const popAction = StackActions.pop(5);
    navigation.dispatch(popAction);
    return true;
    // },2000)
  }

  React.useEffect(() => {
    store.dispatch({ type: 'REMOVE_ALL_OUTLET_CART'})

  })




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
    async function temp() {
      try {
        var sharemethodobj = new SharedMethod();
        await sharemethodobj.changeFailedOrdersStatus();
        await sharemethodobj.syncAllOrderData();
        setTimeout(() => {
          setLoader(false);
        }, 2000)
      } catch (e) {
        console.log("Error in Catch in ConfirmOrderSuccess Line 64", e);
      }
    }
    temp()
  }, [])



  const handleGotoOrders = async () => {
    navigation.push("OrderList", {
      outletId: customerDetails.Id,
      customerDetails: customerDetails,
      outletType: true,
      index: 1,
      screen: 'ConfirmOrderSuccess'
    });
  }



  const handleGoToShare = async () => {
    setLoader(true);
    var orderDate = ''
    var orderNumber = ''
    var beatName = ''
    var EmployeeName = ''
    var employeeMobileNumber = ''
    var companyName = ''
    var res;
    try{
   res = await getOutletRecentOrders(customerDetails.Id);
    console.log("res.data[0]",res.data);
    if(res.data[0].OrderDate != null){
      orderDate = res.data[0].OrderDate
    }
    if(res.data[0].OrderNumber != null){
      orderNumber = res.data[0].OrderNumber
    }
    if(res.data[0].BeatId != null){
     // To get BeatName 
      try {
        let tempName = await AsyncStorage.getItem('@beatName');
        beatName = `Order type - (Beat wise) Beat Name - ${tempName.replace(/['"]+/g, '')}`;
      } catch (e) { 
        console.log("Error in ConfirmOrderSuccess===>Line 209",e)
      }
    }
    if(res.data[0].BeatId == null){
     beatName = "Order type - Telephonic order"
    }
    }catch(e){
      console.log("error in confirmOrderSucess",e)
    }

    //  getEmployee Details start
    try{
     let emp = await getEmployeeDetailsById(res.data[0].EmployeeId) 
      EmployeeName = emp.EmployeeName;
      employeeMobileNumber = emp.Phone;
      companyName = emp.CompanyName
    }catch(e){
      console.log("erro in Catch Line 226 in ConfirmOrderSuccess----",e)
    }
    //  getEmployee Details End
      
    // <span style="color:black; font-size:100%;">
    // ${line.companyAdd}
    // </span>
    //Create PDF using HTML 

    try {
      const html = `
      <html>
        <head>
          <style>
            body {
              font-family: 'Helvetica';
              font-size: 12px;
            }
            header, footer {
              height: 50px;
              background-color: #fff;
              color: #000;
              display: flex;
              justify-content: center;
              padding: 0 20px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th, td {
              border: 1px solid #000;
              padding: 5px;
            }
            th {
              background-color: #ccc;
            }
            companyName {
              color: ;
            }
          </style>
        </head>
        <body>
          <header>
            <h1>Purchase order</h1>
          </header>
          
          <div>
          <span> 
          <span style="color:#2980b9; font-size:150%;">  
          ${companyName}
          </span>
          
          <span style="font-size:100%;float: right;">
          <span style="color:#74b9ff;"><b>${orderNumber}</b></span>
          </span>
          </span>

          </span><br>

       
          <span style="font-size:100%;float: right;">
          <span style="color:black;"><b>Date-</b></span>
          <span>${orderDate }</span>
          </span>
          </div>
          <br><br><br>
          
          
              
          <span>
          <span float: left;>
          ${[customerDetails].map(line => `
         
          <div style="color:#2980b9; font-size:120%;font-weight:'bold';">SHIP TO:-</div>
          <div style="color:black; font-size:110%;font-weight:'bold';">${line.OutletName}</div>
          <div style="font-size:100%;">${line.OutletAddress}</div>
          <div style="font-size:100%;">${line.OutletContactName}</div>
          <div style="font-size:100%;">${line.OutletEmail}</div>
          <div style="font-size:100%;">${line.OutletContactNo}</div>
          `,
          )
          .join('')}
          </span><br><br>
          <span float: right;>
          ${[primaryDistributor].map(line => `
         
          <div style="color:#2980b9; font-size:120%; ;font-weight:'bold';">FULFILL BY:-</div>
          <div style="color:black; font-size:110%;font-weight:'bold';">${line.OutletName}</div>
          <div style="font-size:100%;">${line.OutletAddress}</div>
          <div style="font-size:100%;">${line.OutletContactName}</div>
          <div style="font-size:100%;">${line.OutletEmail}</div>
          <div style="font-size:100%;">${line.OutletContactNo}</div>
          `,
          )
          .join('')}
          </span>
          </span> <br>  
          <table>
            <tr>
              <th>S.No.</th>
              <th>Product Name</th>
              <th>MRP</th>
              <th>PTR</th>
              <th>Quantity</th>
              <th>Total PTR</th>
            </tr>
            ${orderLineItem
              .map(
                (line,index) => `
              <tr>
                <td align="center">${index + 1}</td>
                <td align="center">${line.ProductName}</td>
                <td align="center">${line.MRP}</td>
                <td align="center">${line.PTR}</td>
                <td align="center">${line.Quantity}</td>
                <td align="center">${line.totalPtr}</td>
              </tr>
              
            `,
              )
              .join('')}
              <tr >
                <td colspan="6" align="right">
                <b>MRP SubTotal:</b> ${subTotalMRP}/-
                </td>
              </tr>
              <tr>
                <td colspan="6" align="right">
                <b>Total PTR Margin:</b> ${subTotalPTRMargin}/-
                </td>
              </tr>

              <tr>
                <td colspan="6" align="right">
                <b>Total PTR:</b> ${subTotalPTR}/-
                </td>
              </tr>
          </table>

          <span>
          <span float: left;>
          <div style="color:#2980b9; font-size:120%;font-weight:'bold';">Other Details:-</div>
          <div style="color:black; font-size:110%;font-weight:'bold';">Employee Name - ${EmployeeName}</div>
          <div style="font-size:100%;">Contact - ${employeeMobileNumber}</div>
          <div style="font-size:100%;">${beatName}</div> 
          </span><br><br>
          </span>
          <footer>
         
            <p style="color:#000;font-size:100%;">Thank you for your business!</p>
          </footer>
        </body>
      </html>
    `;

    
      const options = {
        html,
        fileName: `${orderNumber}`,
        directory: 'Invoices', 
        base64:true,
      };

      const file = await RNHTMLtoPDF.convert(options);
      console.log("FIle====",file)
      var imagePath = null;

         imagePath = `data:application/pdf;base64,${file.base64}`
         console.log("image Path===",imagePath)
      
         RNFetchBlob.config({
          fileCache: true,
      })

     var shareImage = {
            title: `${orderNumber}`, 
            url: imagePath,
            // type: 'application/pdf',
            failOnCancel: false
          };
          console.log("ShareImage====",shareImage)

          setLoader(false);
          Share.open(shareImage)
            .then((res) => {
              console.log("RES Line 230--->",res);
            })
            .catch((err) => {
              err && console.log("err Line 233",err);
            });
          return fs.unlink(file.filePath);
    } catch (e) {
      console.log('Error', e);
    }

  }


  useFocusEffect(
    React.useCallback(() => {
      async function temp() {
        var sharemethodobj = new SharedMethod();
        await sharemethodobj.syncAllDataCheckInCheckOutData();
        setTimeout(async () => {
          await sharemethodobj.changeFailedOrdersStatus();
          await sharemethodobj.syncAllOrderData();
        }, 1000);
      }
      try {
        if (network) {
          temp()
        }
      } catch (e) {
        console.log("Error Line 288 OrderList", e)
      }
    }, [network])

  )



  return (
    <>
      {loader ? (
        <LoaderAllInOne />
      ) : (
        <View style={{ ...styles.MainView, backgroundColor: themecolor.THEMECOLOR1 }}>
          <StatusBar translucent backgroundColor="transparent" />
          <OHeader title={'Order Confirmation'} Calign={'center'} navigateTo={"OutletView"} backFunction=
          
          {handleBackButtonClick} />
          {/* <TouchableOpacity style={{position:'absolute',justifyContent:'flex-end',alignSelf:'flex-end',marginVertical:45,right:20}}>
            <FAIcon name="share" size={16} color={'#FFF'} />
          </TouchableOpacity> 
          onPress={()=>handleGoToShare()}
          */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.FullHeight}>
            <View style={styles.MV} />
            <View style={styles.FLVIEW}>
              <View style={styles.ModelVideoCenter}>
                <Video
                  source={require('../../assets/images/expesne/confirmation.mp4')}
                  style={{ ...styles.backgroundVideo, backgroundColor: 'transparent' }}
                  muted={true}
                  resizeMode={'contain'}
                  repeat={true}
                  rate={2.0}
                  ignoreSilentSwitch={'obey'}
                />
                <Text style={{ ...styles.submittext, color: themecolor.TXTWHITE }}>Order Successfully Placed</Text>
                <Text style={{ ...styles.ModelTextSub, color: themecolor.TXTWHITE }}>Thank you.</Text>
              </View>
              <View style={styles.MV} />
              <FullsizeButton
                width={width * 0.45}
                BRadius={15}
                backgroundColor={themecolor.HEADERTHEMECOLOR}
                onPress={() => handleGotoOrders()}
                title="View order details"
              />
              <View style={styles.MV} />
              <FullsizeButton
                width={width * 0.45}
                BRadius={15}
                backgroundColor={'#54C130'}
                onPress={() => handleBackButtonClick()}
                title="< Back to outlet"
              />
              <View style={styles.MV} />

             


            </View>
            <View style={styles.MV50} />
          </ScrollView>
{ network &&
          <View
          
          style={{position:'absolute',justifyContent:'flex-end',alignSelf:'flex-end',right:20,bottom:10,zIndex:9999}}>
         <TouchableOpacity
         onPress={()=>handleGoToShare()}
         style={{backgroundColor:'#54C130',position:'absolute',alignSelf:'flex-end',justifyContent:'center',bottom:15,height:45,width:45,borderRadius:50,alignItems:'center'}}>

         <View style={{justifyContent:'center',alignItems:'center'}}>
              <MCIcon name="share" size={25} color={'#FFF'} />
              </View>
         </TouchableOpacity>
              
          </View>
} 
        </View>
      )}
    </>
  );
}

const styles1 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#aac',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    color: '#fff',
  },
  button: {
    backgroundColor: '#6c8ee3',
    padding: 15,
    borderRadius: 10,
    margin: 20,
  },
});
