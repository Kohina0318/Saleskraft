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

const Productdata = [
  {
    name: 'Field Trials',
    text2:'1/2 surveys submitted',
    screen: 'ViewSurvey',
    pic2: (
      <FAIcon name="check" color={'#FFF'} />
    ),
    borderLine:(
      <View style={{width:'90%',justifyContent:'center',alignSelf:'center',borderColor:Colors.borderColor,borderWidth:0.8}} />
    ),
    color:'#00acd3',
    view:'View',
    bgcolor:'#54c130',
  },
  {
    name: 'Event Meetings',
    text2:'3/3 surveys are pending',
    screen: 'ViewSurveySecond',
    pic2: (
      <FAIcon name="check" color={'#FFF'} />
    ),
    borderLine:(
      <View style={{width:'90%',justifyContent:'center',alignSelf:'center',borderColor:Colors.borderColor,borderWidth:0.8}} />
    ),
    color:'#00acd3',
    view:'View',
    bgcolor:'#fd7c22',
  },
  {
    name: 'Others',
    text2:'1/6 surveys are pending',
    screen: 'ViewSurveySecond',
    pic2: (
      <FAIcon name="check" color={'#FFF'} />
    ),
    borderLine:(
      <View style={{width:'98%',justifyContent:'center',alignSelf:'center',borderColor:Colors.borderColor,borderWidth:0.8}} />
    ),
    color:'#00acd3',
    view:'View',
    bgcolor:'#fd7c22',
  },
  // {
  //   name: 'Activation',
  //   text2:'0/4 surveys are pending',
  //   screen: 'ViewSurveySecond',
  //   pic2: (
  //     <FAIcon name="check" color={'#FFF'} />
  //   ),
  //   borderLine:(
  //     <View style={{width:'90%',justifyContent:'center',alignSelf:'center',borderColor:Colors.borderColor,borderWidth:0.8}} />
  //   ),
  //   color:'#00acd3',
  //   view:'View',
  //   bgcolor:'#fd7c22',
  // },
  // {
  //   name: 'Distribution',
  //   text2:'0/4 surveys are pending',
  //   screen: 'ViewSurveySecond',
  //   pic2: (
  //     <FAIcon name="check" color={'#FFF'} />
  //   ),
  //   borderLine:(
  //     <View style={{width:'90%',justifyContent:'center',alignSelf:'center',borderColor:Colors.borderColor,borderWidth:0.8}} />
  //   ),
  //   color:'#00acd3',
  //   view:'View',
  //   bgcolor:'#fd7c22',
  // },
  // {
  //   name: 'Check out',
  //   text2:'0/3 surveys are pending',
  //   screen: 'ViewSurveySecond',
  //   pic2: (
  //     <FAIcon name="check" color={'#FFF'} />
  //   ),
  //   borderLine:(
  //     <View style={{width:'90%',justifyContent:'center',alignSelf:'center',borderColor:Colors.borderColor,borderWidth:0.8}} />
  //   ),
  //   color:'#00acd3',
  //   view:'View',
  //   bgcolor:'#fd7c22',
  // },
];

// Products List Start
function SurveyListFlatList({item,props,checked}) {
  const navigation = useNavigation();
  const [g, s] = React.useState({});
  var answr;
  answr = g[item.id];

    return (
      <>
      <View style={{...styles.PLFL}}>
     
        <TouchableOpacity
          activeOpacity={0.5}
          // style={styles.TO}
          style={{width:'94%',}}
          onPress={() => navigation.navigate(item.screen)}
        >
          <View
            style={{...styles.PW}}>
            <TouchableOpacity style={{justifyContent:'center',alignItems:'center'}} >
            <View
                  style={{
                    width:'10%',borderRadius:50,width:32,height:32,justifyContent:'center',alignSelf:'center',alignItems:'center',left:5,
                    backgroundColor: item.bgcolor,
                  }}>
              {item.pic2}
              </View>
              </TouchableOpacity>
            <View style={{...styles.Width7,width:'60%'}}>
              <Text
                style={styles.PNameText}>
                {item.name}
              </Text>
              {/* <Text
                style={styles.PText}>
                {item.text2}
              </Text> */}
            </View>
            <TouchableOpacity  onPress={() => navigation.navigate(item.screen)} style={{width:'10%',borderRadius:50,backgroundColor:item.color,width:55,height:24,justifyContent:'center',alignSelf:'center',alignItems:'center',right:10}}>
              <Text
                style={{...styles.PNameText,color:Colors.white,fontSize:12}}>
                {item.view}
              </Text>
            </TouchableOpacity>
          </View>
          
        </TouchableOpacity>
        
      </View>
      {/* <View style={styles.MV3} /> */}
      <View style={{width:'92%',borderWidth:0.5,borderColor:Colors.borderColor,alignSelf:'center'}}>
      {/* {item.borderLine} */}
      </View>
    </>
    );
  }
function FlatListSurveyList(props) {

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
    <View style={{backgroundColor:'white',flex:1,borderWidth:0.8,borderRadius:10,borderColor:Colors.borderColor1,width:'95%',justifyContent:'center',alignSelf:'center'}}>
    <FlatList
    data={Productdata}
    renderItem={({item}) => <SurveyListFlatList item={item} props={props} />}
    showsVerticalScrollIndicator={false}
    scrollEnabled={false}
  />
  </View>
  </>
  );
}

// Second Page
const CdataSecond = [
  {
    name: 'Brand visibility',
    text2:'3 questions',
    screen: 'Checklist',
    pic2: (
      <FAIcon name="check" color={'#FFF'} />
    ),
    borderLine:(
      <View style={{width:'90%',justifyContent:'center',alignSelf:'center',borderColor:Colors.borderColor,borderWidth:0.8}} />
    ),
    buttonEdit:(
<View>
      <Text
             style={{...styles.PNameText,color:Colors.white,fontSize:11,width:'100%',justifyContent:'center',alignSelf:'center',alignItems:'center',}}>
             Start Survey
           </Text>
           </View>
    ),
    color:'#54c130',
    bgcolor:'#ffb300'
  },
  {
    name: 'Showcase placements',
    text2:'2 questions',
    screen: 'Checklist',
    pic2: (
      <FAIcon name="check" color={'#FFF'} />
    ),
    borderLine:(
      <View style={{width:'90%',justifyContent:'center',alignSelf:'center',borderColor:Colors.borderColor,borderWidth:0.8}} />
    ),
    buttonEdit:(
      <View>
      <Text
             style={{...styles.PNameText,color:Colors.white,fontSize:11,justifyContent:'center',alignSelf:'center',alignItems:'center',textAlign:'center'}}>
             Start Survey
           </Text>
           </View>
          ),
          color:'#54c130',
          bgcolor:'#f24b30'
  },
  {
    name: 'Product informations',
    text2:'5 questions',
    screen: 'Checklist',
    pic2: (
      <FAIcon name="check" color={'#FFF'} />
    ),
    borderLine:(
      <View style={{width:'90%',justifyContent:'center',alignSelf:'center',borderColor:Colors.borderColor,borderWidth:0.8}} />
    ),
    buttonEdit:(
      <View >
      <Text
             style={{...styles.PNameText,color:Colors.white,fontSize:11,justifyContent:'center',alignSelf:'center',alignItems:'center',textAlign:'center'}}>
             Start Survey
           </Text>
           </View>
          ),
  color:'#54c130',
  bgcolor:'#fd7c22'
  },
];
function SurveyCustomerListDSecond({item}) {
  const navigation = useNavigation();
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
         <TouchableOpacity style={{justifyContent:'center',alignItems:'center',}} >
         <View
               style={{
                 borderRadius:50,width:32,height:32,justifyContent:'center',alignSelf:'center',alignItems:'center',
                 backgroundColor: item.bgcolor,
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
         <TouchableOpacity  onPress={() => navigation.navigate('Checklist')} style={{justifyContent:'center',alignSelf:'center',width:'30%',}} >
          <View style={{width:'auto',paddingHorizontal:10,borderRadius:50,backgroundColor:item.color,height:22,justifyContent:'flex-end',alignSelf:'flex-end',alignItems:'flex-end',right:5}}>
          {item.buttonEdit}
          </View>
         </TouchableOpacity>
       </View>
       
     </TouchableOpacity>
     
   </View>
   {/* <View style={styles.MV3} /> */}
   {item.borderLine}
      </>
  );
}

function FlatListSurveyListCSecond(props) {

    return (
      <>
      <View style={{backgroundColor:'white',flex:1,borderWidth:0.8,borderRadius:10,borderColor:Colors.borderColor1,width:'95%',justifyContent:'center',alignSelf:'center'}}>
      <FlatList
      data={CdataSecond}
      renderItem={({item}) => <SurveyCustomerListDSecond item={item} props={props} />}
      showsVerticalScrollIndicator={false}
      scrollEnabled={false}
    />
    </View>
    </>
    );
  }
// Second Page End


// Three Page Start
const CdataThree = [
  {
    name: 'Sowing',
    text2:'4 questions',
    screen: 'Checklist',
    pic2: (
      <FAIcon name="check" color={'#FFF'} />
    ),
    borderLine:(
      <View style={{width:'90%',justifyContent:'center',alignSelf:'center',borderColor:Colors.borderColor,borderWidth:0.8}} />
    ),
    buttonEdit:(
<View style={{width:'auto',paddingHorizontal:10,borderRadius:50,backgroundColor:Colors.bluetheme1,height:22,justifyContent:'flex-end',alignSelf:'flex-end',alignItems:'center',right:5}}>
      <Text
             style={{...styles.PNameText,color:Colors.white,fontSize:11,width:'100%',justifyContent:'center',alignSelf:'center',alignItems:'center',}}>
             Start Survey
           </Text>
           </View>
    )
  },
  {
    name: 'Manuring',
    text2:'2 questions',
    screen: 'Checklist',
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
  {
    name: 'Stage 1',
    text2:'2 questions',
    screen: 'Checklist',
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
  {
    name: 'Stage 2',
    text2:'2 questions',
    screen: 'Checklist',
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
  {
    name: 'Stage 3',
    text2:'2 questions',
    screen: 'Checklist',
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
  {
    name: 'Harvesting',
    text2:'2 questions',
    screen: 'Checklist',
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
function SurveyCustomerListDThree({item,navigation}) {
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
           {/* <Text
             style={styles.PText}>
             {item.text2}
           </Text> */}
         </View>
         <TouchableOpacity  onPress={() => navigation.navigate('Checklist')} style={{justifyContent:'center',alignSelf:'center',width:'30%',}} >
          {item.buttonEdit}
         </TouchableOpacity>
       </View>
       
     </TouchableOpacity>
     
   </View>
   {/* <View style={styles.MV3} /> */}
   {item.borderLine}
      </>
  );
}

function SurveyFlatListCustomerDThree({item,props}) {
  const navigation = useNavigation();

  return(
    <>
    <View style={{backgroundColor:'white',flex:1,borderWidth:0.8,borderRadius:10,borderColor:Colors.borderColor1,width:'95%',justifyContent:'center',alignSelf:'center'}}>
    <FlatList
    data={CdataThree}
    renderItem={({item}) => <SurveyCustomerListDThree item={item} navigation={navigation} />}
    showsVerticalScrollIndicator={false}
    scrollEnabled={false}
    />
  </View>
  </>
  );
  }
// Three Page End


const Cdata = [
  {
    name: 'Maize Seeds',
    text2:'6 questions',
    screen: 'ViewSurveyThree',
    pic2: (
      <FAIcon name="check" color={'#FFF'} />
    ),
    borderLine:(
      <View style={{width:'90%',justifyContent:'center',alignSelf:'center',borderColor:Colors.borderColor,borderWidth:0.8}} />
    ),
    buttonEdit:(
<View style={{width:'auto',paddingHorizontal:10,borderRadius:50,backgroundColor:Colors.bluetheme1,height:22,justifyContent:'flex-end',alignSelf:'flex-end',alignItems:'center',right:5}}>
      <Text
             style={{...styles.PNameText,color:Colors.white,fontSize:11,width:'100%',justifyContent:'center',alignSelf:'center',alignItems:'center',}}>
             View
           </Text>
           </View>
    )
  },
  {
    name: 'Corn Seeds',
    text2:'6 questions',
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
             View
           </Text>
           </View>
          )
  },
  {
    name: 'Bajara',
    text2:'6 questions',
    screen: 'ViewSurveyThree',
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
             View
           </Text>
           </View>
          )
  },
];
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
         <TouchableOpacity  onPress={() => navigation.navigate('ViewSurveyThree')} style={{justifyContent:'center',alignSelf:'center',width:'30%',}} >
          {item.buttonEdit}
         </TouchableOpacity>
       </View>
       
     </TouchableOpacity>
     
   </View>
   {/* <View style={styles.MV3} /> */}
   {item.borderLine}
      </>
  );
}
export function SurveyFlatListCustomerD({props,item}){
  const navigation = useNavigation();

  return(
    <>
     <View style={{backgroundColor:'white',flex:1,borderWidth:0.8,borderRadius:10,borderColor:Colors.borderColor1,width:'95%',justifyContent:'center',alignSelf:'center'}}>
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
export {FlatListSurveyList,FlatListSurveyListCSecond,SurveyFlatListCustomerDThree};