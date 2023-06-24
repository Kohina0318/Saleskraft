import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import estyles from '../../assets/css/styleExpenses';
import { Colors } from '../../assets/config/Colors';
import { useNavigation } from '@react-navigation/native';
import II from "react-native-vector-icons/Ionicons"
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';

export default EFooter = props => {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  const navigation = useNavigation();
  return (
    <View style={{...estyles.efooter,backgroundColor: themecolor.FOOTER,borderTopWidth:0.5,borderColor:Colors.borderColor1 }}>
      <View style={estyles.footerv}>
        <TouchableOpacity
          onPress={() => navigation.push('MyTrip')}
          style={estyles.footertouchv}>
          <Image
            resizeMode="center"
            style={estyles.footerimg}
            source={require('../../assets/images/Action/trip.png')}
          />
        </TouchableOpacity>
        <Text style={{...estyles.footertext, color: themecolor.TXTWHITE }}>Trips</Text>
      </View>
      <View style={estyles.footerv}>
        <TouchableOpacity
          onPress={() => {
            navigation.push('ExpenseList', { navigateFrom: props.navigateFrom });
          }}
          style={{
            ...estyles.footertouchv,
            backgroundColor: Colors.ExpenseSEGT,
          }}>
          <Image
            resizeMode="center"
            style={estyles.footerimg}
            source={require('../../assets/images/dashboard/expensewhite.png')}
          />
        </TouchableOpacity>
        <Text style={{...estyles.footertext, color: themecolor.TXTWHITE }}>Expense</Text>
      </View>
      {props.manager && (
        <View style={estyles.footerv}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('RequestDashboardExp');
            }}
            style={{
              ...estyles.footertouchv,
              backgroundColor: "#4BD0FA",
            }}>
            <II name="checkmark-sharp" size={28} color="#fff" />
          </TouchableOpacity>
          <Text style={{...estyles.footertext, color: themecolor.TXTWHITE}}>Approvals</Text>
        </View>
      )}
    </View>
  );
};

EFooter.defaultProps = {
  manager: false,
};
