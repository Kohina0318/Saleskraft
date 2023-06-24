import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect,useState } from 'react';
import {
  View,
  ScrollView,
  Appearance
} from 'react-native';
import { useSelector } from 'react-redux';
import styles from '../../assets/css/stylesAction';
import DashboardButtonGrid from '../../components/shared/DashboardButtonGrid';
import Header from '../../components/shared/Header';
import Color, { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { getUserProfile } from '../../repository/commonRepository';
var DashboardButtonGridMemoized = React.memo(DashboardButtonGrid);

export default function Action(props) {
const mode = useSelector(state => state.mode);
const themecolor = new MyThemeClass(mode).getThemeColor()
const network = useSelector(state=>state.network);
  const [name, setName] = useState('')
  const [greeting, setGreeting] = useState('')

  async function userdatafetch() {
    if(network){
    const data = await getUserProfile()
    const fname = JSON.parse(data).data.FirstName
    // const lname = JSON.parse(data).data.LastName
    console.log("fdname",fname)
    setName(fname)
    }else{
      var d = await AsyncStorage.getItem('@userprofile');
      d = JSON.parse(d);
      setName(d.data.FirstName);
    }
  }

  const getGreetingmessage = () => {
    const dt = new Date()
    const hrs = dt.getHours()
    let greet = ''
    if (hrs >= 0 && hrs < 12) {
      greet = 'Good Morning'
    } else if (hrs >= 12 && hrs < 17) {
      greet = 'Good Afternoon'
    } else {
      greet = 'Good Evening'
    }
    setGreeting(greet) 
  }
  
  useEffect(()=>{
    var mounted = true;
    if(mounted){
    userdatafetch()
    getGreetingmessage()
    }
    return ()=>{
      mounted = false;
    }
  },[])

  return (
    <View style={{...styles.MainView,backgroundColor:themecolor.THEMECOLOR }}>
      <Header username={name} greeting={greeting} height={100}/>
      <View style={styles.MV5} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.Vikramcards}>
          <DashboardButtonGridMemoized showOn={"action"}/>
        </View>
      </ScrollView>
    </View>
  );
}
