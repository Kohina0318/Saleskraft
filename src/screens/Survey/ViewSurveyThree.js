import React,{useState} from 'react';
import {
  TouchableOpacity,
  Image,
  StatusBar,
  View,
  Text,
  ScrollView,
} from 'react-native';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { SurveyFlatListCustomerD,FlatListSurveyListCSecond,SurveyFlatListCustomerDThree } from './SurveyDataList';
import Header_2 from '../../components/shared/Header_2';
import styles from '../../assets/css/stylesSurvey';

export default function ViewSurveyThree(props) {

  return (
    <View style={styles.MainView}>
       <Header_2 title={"Survey"} onPress={() =>props.navigation.goBack()} />
      <StatusBar translucent={true} backgroundColor={'transparent'} />
       
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.FullHeight}>
          <View style={styles.MV} />
          <View style={styles.FLVIEW}>
            <SurveyFlatListCustomerDThree props={props}/>
            
          </View>
          <View style={styles.MV50} />
        </ScrollView>
    </View>
  );
}
