import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { FontFamily } from '../../assets/fonts/FontFamily';
import { Colors } from '../../assets/config/Colors';
import styles from '../../assets/css/styleExpenses';
import { ExpenseData } from './ExpenseDataList';

const Expenses = ({ navigation }) => {
  const [btnnum, setBtnnum] = useState('1');

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <View style={styles.headerChildOne}>
          <View style={styles.view}>
            <TouchableOpacity
              style={styles.margleft}
              activeOpacity={0.5}
              onPress={() => navigation.goBack()}>
              <Image
                source={require('../../assets/images/back.png')}
                style={styles.wh}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
            <Text style={styles.txt}>Expenses</Text>
          </View>
          <View style={styles.margins}>
            <Icon name="search" size={28} color="white" />
          </View>
        </View>
        <View style={styles.headerTabContainer}>
          <TouchableOpacity
            onPress={() => setBtnnum(1)}
            style={{
              backgroundColor: btnnum == 1 ? 'white' : Colors.bluetheme,
              ...styles.headerTab,
            }}>
            <Text
              style={{
                fontFamily: FontFamily.PopinsMedium,
                fontSize: 13.5,
                color: btnnum == 1 ? Colors.bluetheme : '#163EB1',
              }}>
              Pending
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setBtnnum(2)}
            style={{
              backgroundColor: btnnum == 2 ? 'white' : Colors.bluetheme,
              ...styles.headerTab,
            }}>
            <Text
              style={{
                fontFamily: FontFamily.PopinsMedium,
                fontSize: 13.5,
                color: btnnum == 2 ? Colors.bluetheme : '#163EB1',
              }}>
              Approved
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setBtnnum(3)}
            style={{
              backgroundColor: btnnum == 3 ? 'white' : Colors.bluetheme,
              ...styles.headerTab,
            }}>
            <Text
              style={{
                fontFamily: FontFamily.PopinsMedium,
                fontSize: 13.5,
                color: btnnum == 3 ? Colors.bluetheme : '#163EB1',
              }}>
              Rejected
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.body}>
        <ExpenseData />
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('AddExpenses')}
          style={styles.touchview}>
          <Image
            source={require('../../assets/images/addoutlet/add.png')}
            style={styles.bottomicon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Expenses;
