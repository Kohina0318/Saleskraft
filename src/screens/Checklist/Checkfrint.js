import React,{useState,} from 'react'
import {View,Text,Modal,TextInput,TouchableOpacity} from"react-native"
import StyleCss from '../../assets/css/styleOutlet';
import styles from '../../assets/css/styleNotifications';
import { Colors } from '../../assets/config/Colors';
import { FontFamily } from '../../assets/fonts/FontFamily';
import Header_2 from '../../components/shared/Header_2';
import { RadioButton } from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
export default function Checkfrint(props){
  const navigation = useNavigation();
    const [modalVisible3, setModalVisible3] = useState(false);
    const [checked, setChecked] = React.useState('first');

   
return(
  
    

  <View>
          
    {/* <View style={{backgroundColor:"#FFF",marginTop:120,borderRadius:10,height:380,width:320,left:20}}> */}
    <View style={styles. Checklist1}>
   
    {/* <View style={{justifyContent:'space-around',paddingTop:25,flexDirection:'row'}}> */}

    <View style={styles.Checklist2}>
     
      {/* <View style={{width:30,height:30,borderRadius:20,margin:4,justifyContent:'center',marginTop:0,borderColor:"#54c130",borderWidth:2,alignItems:"center",backgroundColor:"#54c130",right:10,}}> */}

      <View style={styles.Checklist3}>
        {/* <Text style={{color:'#FFF',marginLeft:8,right:5,height:24}}>Start survey</Text> */}
      </View>

      <View style={{borderRadius:20,width:105,height:25,justifyContent:"center",alignItems:"center",marginTop:0,right:50,}}>
        <Text style={{color:'#000',marginLeft:8,right:5,height:24,fontWeight:"bold",marginTop:10}}>Check in</Text>
        <Text style={{color:'#000',width:140,left:40}}>1/2 surveys submitted</Text>
      </View>

      <View style={{width:50,height:25,borderRadius:20,margin:4,justifyContent:'center',marginTop:0,borderColor:"#fd7c22",borderWidth:2,alignItems:"center",backgroundColor:"#fd7c22",left:10,}}>
      <TouchableOpacity onPress={() => navigation.navigate('Check')}>
        <Text style={{color:'#FFF',marginLeft:8,right:5,height:24}}>Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
    

    <View style={{justifyContent:'space-around',paddingTop:25,flexDirection:'row'}}>
     
      <View style={{width:30,height:30,borderRadius:20,margin:4,justifyContent:'center',marginTop:0,borderColor:"#fd7c22",borderWidth:2,alignItems:"center",backgroundColor:"#fd7c22",right:0,}}>
        {/* <Text style={{color:'#FFF',marginLeft:8,right:5,height:24}}>Start survey</Text> */}
      </View>

      <View style={{borderRadius:20,width:160,height:25,justifyContent:"center",alignItems:"center",marginTop:0,right:55,}}>
        <Text style={{color:'#000',marginLeft:8,right:5,height:24,fontWeight:"bold"}}>Display</Text>
        <Text style={{color:'#000',width:150,left:50}}>3/3 surveys are pending</Text>
      </View>
      
      <View style={{width:50,height:25,borderRadius:20,margin:4,justifyContent:'center',marginTop:0,borderColor:"#3862f8",borderWidth:2,alignItems:"center",backgroundColor:"#3862f8",right:0,}}>
      <TouchableOpacity onPress={() => navigation.navigate('Check')}>
        <Text style={{color:'#FFF',marginLeft:8,right:5,height:24}}>View</Text>
        </TouchableOpacity>
      </View>
      
    </View>



    <View style={{justifyContent:'space-around',paddingTop:25,flexDirection:'row'}}>
     
     <View style={{width:30,height:30,borderRadius:20,margin:4,justifyContent:'center',marginTop:0,borderColor:"#fd7c22",borderWidth:2,alignItems:"center",backgroundColor:"#fd7c22",right:0,}}>
       {/* <Text style={{color:'#FFF',marginLeft:8,right:5,height:24}}>Start survey</Text> */}
     </View>

     <View style={{borderRadius:20,width:155,height:25,justifyContent:"center",alignItems:"center",marginTop:0,right:55,}}>
       <Text style={{color:'#000',marginLeft:8,right:5,height:24,fontWeight:"bold"}}>Pricing</Text>
       <Text style={{color:'#000',width:150,left:49}}>1/6 surveys are pending</Text>
     </View>

     <View style={{width:50,height:25,borderRadius:20,margin:4,justifyContent:'center',marginTop:0,borderColor:"#3862f8",borderWidth:2,alignItems:"center",backgroundColor:"#3862f8",right:0,}}>
     <TouchableOpacity onPress={() => navigation.navigate('Check')}>
       <Text style={{color:'#FFF',marginLeft:8,right:5,height:24}}>View</Text>
       </TouchableOpacity>
     </View>
   </View>

   <View style={{justifyContent:'space-around',paddingTop:25,flexDirection:'row'}}>
     
     <View style={{width:30,height:30,borderRadius:20,margin:4,justifyContent:'center',marginTop:0,borderColor:"#fd7c22",borderWidth:2,alignItems:"center",backgroundColor:"#fd7c22",right:0,}}>
       {/* <Text style={{color:'#FFF',marginLeft:8,right:5,height:24}}>Start survey</Text> */}
     </View>

     <View style={{borderRadius:20,width:155,height:25,justifyContent:"center",alignItems:"center",marginTop:0,right:45,}}>
       <Text style={{color:'#000',marginLeft:8,right:5,height:24,fontWeight:"bold"}}>Activation</Text>
       <Text style={{color:'#000',width:150,left:40}}>0/4 surveys are pending</Text>
     </View>

     <View style={{width:50,height:25,borderRadius:20,margin:4,justifyContent:'center',marginTop:0,borderColor:"#3862f8",borderWidth:2,alignItems:"center",backgroundColor:"#3862f8",right:0,}}>
     <TouchableOpacity onPress={() => navigation.navigate('Check')}>
       <Text style={{color:'#FFF',marginLeft:8,right:5,height:24}}>View</Text>
       </TouchableOpacity>
     </View>
   </View>

   <View style={{justifyContent:'space-around',paddingTop:25,flexDirection:'row'}}>
     
     <View style={{width:30,height:30,borderRadius:20,margin:4,justifyContent:'center',marginTop:0,borderColor:"#fd7c22",borderWidth:2,alignItems:"center",backgroundColor:"#fd7c22",right:0,}}>
       {/* <Text style={{color:'#FFF',marginLeft:8,right:5,height:24}}>Start survey</Text> */}
     </View>

     <View style={{borderRadius:20,width:155,height:25,justifyContent:"center",alignItems:"center",marginTop:0,right:40,}}>
       <Text style={{color:'#000',marginLeft:8,right:5,height:24,fontWeight:"bold"}}>Distribution</Text>
       <Text style={{color:'#000',width:150,left:35}}>0/4 surveys are pending</Text>
     </View>

     <View style={{width:50,height:25,borderRadius:20,margin:4,justifyContent:'center',marginTop:0,borderColor:"#3862f8",borderWidth:2,alignItems:"center",backgroundColor:"#3862f8",right:0,}}>
     <TouchableOpacity onPress={() => navigation.navigate('Check',{data:'4q'})}>
       <Text style={{color:'#FFF',marginLeft:8,right:5,height:24}}>View</Text>
       </TouchableOpacity>
     </View>
   </View>

   <View style={{justifyContent:'space-around',paddingTop:25,flexDirection:'row'}}>
     
     <View style={{width:30,height:30,borderRadius:20,margin:4,justifyContent:'center',marginTop:0,borderColor:"#fd7c22",borderWidth:2,alignItems:"center",backgroundColor:"#fd7c22",right:0,}}>
       {/* <Text style={{color:'#FFF',marginLeft:8,right:5,height:24}}>Start survey</Text> */}
     </View>

     <View style={{borderRadius:20,width:155,height:25,justifyContent:"center",alignItems:"center",marginTop:0,right:50,}}>
       <Text style={{color:'#000',marginLeft:8,right:5,height:24,fontWeight:"bold"}}>Check out</Text>
       <Text style={{color:'#000',width:150,left:45}}>0/3 surveys are pending</Text>
     </View>

    
     <View style={{width:50,height:25,borderRadius:20,margin:4,justifyContent:'center',marginTop:0,borderColor:"#3862f8",borderWidth:2,alignItems:"center",backgroundColor:"#3862f8",right:0,}}>
     <TouchableOpacity onPress={() => navigation.navigate('Check')}>
       <Text style={{color:'#FFF',marginLeft:8,right:5,height:24}}>View</Text>
       </TouchableOpacity>
     </View>
   </View>

    </View>
   </View>

)

}