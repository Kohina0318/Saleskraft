import React,{useState, useEffect} from 'react'
import {View,Text,Modal,TextInput,TouchableOpacity} from"react-native"
import StyleCss from '../../assets/css/styleOutlet';
import styles from '../../assets/css/styleNotifications';
import { Colors } from '../../assets/config/Colors';
import { FontFamily } from '../../assets/fonts/FontFamily';
import Header_2 from '../../components/shared/Header_2';
import { RadioButton } from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
export default function Check(props){
  const navigation = useNavigation();
    const [modalVisible3, setModalVisible3] = useState(false);
    const [checked, setChecked] = React.useState('first');

// useEffect(()=>{
//   //let data = props.route.params.data;
//    alert(data)
//    console.log(data)
// },[])


return(
<View>
  <View style={styles.container}>
  <Header_2 title={"Display"} onPress={() =>props.navigation.goBack()} />
  </View>
   
  <View  style={styles.Check}>
  <View style={styles.list}>
  <View style={styles.Checklist}>
  </View>
  <View style={styles.Click1}>
  <Text style={styles.Click2}>Brandvisiblity</Text>
  <Text style={styles.Click3}>3 questions</Text>
  </View>
  <View style={styles.Click4}>
  <TouchableOpacity onPress={() => navigation.navigate('Checklist')}>
  <Text style={styles.Click5}>Start survey</Text>
  </TouchableOpacity>
  </View>
    </View>
     
      <View style={styles.Click6}>
        <View style={styles.Click7}>
      </View>
        <View style={styles.Click8}>
        <Text style={styles.Click9}>Showcase placements</Text>
        <Text style={styles.Click10}>2 questions</Text>
      </View>
      <View style={styles.Click11}>
      <TouchableOpacity onPress={() => navigation.navigate('Checklist')}>
        <Text style={styles.Click12}>Start survey</Text>
        </TouchableOpacity>
      </View>
    </View>
    <View style={styles.Click13}>
     <View style={styles.Click14}>
     </View>
       <View style={styles.Click15}>
       <Text style={styles.Click16}>product informations</Text>
       <Text style={styles.Click17}>5 questions</Text>
     </View>
     <View style={styles.Click18}>
     <TouchableOpacity onPress={() => navigation.navigate('Checklist')}>
       <Text style={styles.Click19}>Start survey</Text>
       </TouchableOpacity>
     </View>
   </View>
    </View>
   </View>
)

}