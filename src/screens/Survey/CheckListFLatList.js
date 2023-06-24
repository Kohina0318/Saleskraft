import React,{useState} from 'react';
import {
  TouchableOpacity,
  View,
  FlatList,
  Text,
  Image,
  Dimensions
} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { FontFamily } from '../../assets/fonts/FontFamily';
import { FontSize } from '../../assets/fonts/Fonts';
import { Colors } from '../../assets/config/Colors';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import styles from '../../assets/css/stylesSurvey';
import { GetCategories } from '../../repository/catalogue/productRepository';
const {width, height} = Dimensions.get('screen');
import { FlatListCallType } from '../Survey/Sorting/SortAndFilter';

const CheckProductdata = [
  {
    name: '1. Which brands are easily visible in frontend showcase?',
    text2:'1/2 surveys submitted',
    // screen: 'ProductCategories',
    pic2: (
      <FAIcon name="check" color={'#FFF'} />
    ),
    borderLine:(
      <View style={{width:'90%',justifyContent:'center',alignSelf:'center',borderColor:Colors.borderColor,borderWidth:0.8}} />
    )
  },
 
];

// Products List Start
function CheckSurveyListFlatList({item,props,checked}) {
  const navigation = useNavigation();
  const [selectedName,setSelectedName]=useState(false) 

  const CheckSelect = [
    {
      name: 'hello',
      text2:'1/2 surveys submitted',
      // screen: 'ProductCategories',
    
    },
   
  ];
    return (
      <>
      <View style={{...styles.PLFL,}}>
     
        <TouchableOpacity
          activeOpacity={0.5}
          // style={styles.TO}
          style={{width:'95%'}}
          onPress={() => navigation.navigate(item.screen)}
        >
          <View>
           
            <View style={{...styles.Width7,width:'100%'}}>
              <Text
                style={{...styles.PText,fontSize:12}}>
                {item.name}
              </Text>
             
            </View>
            <FlatListCallType/>
          </View>
          
        </TouchableOpacity>
        
      </View>
      {/* <View style={styles.MV3} /> */}
      {/* {item.borderLine} */}
    </>
    );
  }




function CheckFlatListSurveyList(props) {

const [productData,setProductData]=useState([]);
const ProductCategoriesApis=async()=>{
   var  temp=await GetCategories();
   console.log("Product Data😒😒😒:",temp);
   if(temp.statusCode==200 && temp.message=='Get all category successfully!'){
    setProductData(temp.data)
   }
   else{
     console.log("getCategories line no 27:",temp.data)
   }
}

React.useEffect(()=>{
  //alert("Hello kohina")
  ProductCategoriesApis()
},[])



  return (
    <>
    <View style={{backgroundColor:'white',flex:1,borderWidth:0.8,borderRadius:10,borderColor:Colors.borderColor1,marginVertical:10,paddingVertical:10}}>
    <FlatList
    data={CheckProductdata}
    renderItem={({item}) => <CheckSurveyListFlatList item={item} props={props} />}
    showsVerticalScrollIndicator={false}
    scrollEnabled={false}
  />
  </View>
  </>
  );
}
const Cdata = [
  {
    name: 'Check in',
    text2:'4 questions',
    screen: 'Checklist',
    pic2: (
      <FAIcon name="check" color={'#FFF'} />
    ),
    borderLine:(
      <View style={{width:'90%',justifyContent:'center',alignSelf:'center',borderColor:Colors.borderColor,borderWidth:0.8}} />
    ),
    buttonEdit:(
<View style={{width:'auto',paddingHorizontal:10,borderRadius:50,backgroundColor:Colors.orange,height:22,justifyContent:'flex-end',alignSelf:'flex-end',alignItems:'center',right:5}}>
      <Text
             style={{...styles.PNameText,color:Colors.white,fontSize:11,width:'100%',justifyContent:'center',alignSelf:'center',alignItems:'center',}}>
             Edit
           </Text>
           </View>
    )
  },
  {
    name: 'Retailer details',
    text2:'2 questions',
    // screen: 'ProductCategories',
    pic2: (
      <FAIcon name="check" color={'#FFF'} />
    ),
    borderLine:(
      <View style={{width:'90%',justifyContent:'center',alignSelf:'center',borderColor:Colors.borderColor,borderWidth:0.8}} />
    ),
    buttonEdit:(
      <View style={{width:'auto',paddingHorizontal:10,borderRadius:50,backgroundColor:Colors.bluetheme1,height:22,justifyContent:'flex-end',alignSelf:'flex-end',alignItems:'flex-end',right:5}}>
      <Text
             style={{...styles.PNameText,color:Colors.white,fontSize:11,justifyContent:'center',alignSelf:'center',alignItems:'center',textAlign:'center'}}>
             Start Survey
           </Text>
           </View>
          )
  },

];
// Customer_List END
function SurveyCustomerListD({item,navigation}) {
  return (
    <>
      <View style={{...styles.PLFL,}}>
     
     <TouchableOpacity
       activeOpacity={0.5}
       // style={styles.TO}
       style={{width:'95%'}}
       onPress={() => navigation.navigate(item.screen)}
     >
       <View
         style={{...styles.PW}}>
         <TouchableOpacity style={{justifyContent:'center',alignItems:'center',}} onPress={() => sb1(0)} >
         <View
               style={{
                 borderRadius:50,width:32,height:32,justifyContent:'center',alignSelf:'center',alignItems:'center',
                 backgroundColor: '#3e8afb',
               }}>
          
           {item.pic2}
           </View>
           </TouchableOpacity>
         <View style={{...styles.Width7,width:'60%',left:10}}>
           <Text
             style={styles.PNameText}>
             {item.name}
           </Text>
           <Text
             style={styles.PText}>
             {item.text2}
           </Text>
         </View>
         {/* <View style={{width:'25%',justifyContent:'center',alignSelf:'center',alignItems:'center',}}> */}
         <TouchableOpacity  onPress={() => navigation.navigate('Checklist')} style={{justifyContent:'center',alignSelf:'center',width:'30%',}} >
          {item.buttonEdit}
         </TouchableOpacity>
         {/* </View> */}
       </View>
       
     </TouchableOpacity>
     
   </View>
   {/* <View style={styles.MV3} /> */}
   {item.borderLine}
      </>
  );
}
export function SurveyFlatListCustomerD(props){
  const navigation = useNavigation();

  return(
    <>
     <View style={{backgroundColor:'white',flex:1,borderWidth:0.8,borderRadius:10,borderColor:Colors.borderColor1}}>
    <FlatList
    data={Cdata}
    renderItem={({item}) => <SurveyCustomerListD item={item} navigation={navigation} />}
    showsVerticalScrollIndicator={false}
    scrollEnabled={false}
  />
  </View>
  </>
  );
  }
// Products List End
export {CheckFlatListSurveyList};