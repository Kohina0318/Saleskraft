import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import FIcon from 'react-native-vector-icons/FontAwesome';
import { Colors } from '../../assets/config/Colors';
import styles from '../../assets/css/styleFoodExpense';
const FoodExprenses = ({ navigation }) => {

  const functionborder = () => {
    let arr = [];
    for (let i = 0; i < 80; i++) {
      arr.push(i);
    }
    return arr.map(() => {
      return <Icon name="caret-up" size={8} color={Colors.bluetheme} />;
    });
  };

  return (
    <View style={styles.view}>
      <View style={styles.headerpart}>
        <View style={styles.view1}>
          <View style={styles.view2}>
            <TouchableOpacity
              style={styles.marg}
              activeOpacity={1}
              onPress={() => navigation.goBack()}>
              <Image
                source={require('../../assets/images/back.png')}
                style={styles.wh}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
            <Text
              style={styles.txt}>
              Food Expense
            </Text>
          </View>
        </View>
        <View
          style={styles.headerview}>
          <View style={styles.headerwhitebox}>
            <View
              style={styles.headerview1}>
              <View>
                <Text
                  style={styles.boxtext}>
                  Amount
                </Text>
                <Text
                  style={styles.texticon}>
                  <FIcon name="rupee" size={13} /> 530{' '}
                </Text>
              </View>
            </View>
            <View
              style={styles.view3}>
              <View>
                <Text
                  style={styles.boxtext}>
                  Date
                </Text>
                <Text
                  style={styles.texticon}>
                  10:56AM, 12 feb 2022
                </Text>
              </View>
            </View>
            <View
              style={styles.headerview1}>
              <View
                style={styles.img}>
                {/* <Image
                    source={require('../../assets/images/expesne/receipt.jpg')}
                    resizeMode="center"
                    style={styles.heights}
                  /> */}
              </View>
            </View>
            <View
              style={styles.functionview}>
              {functionborder()}
            </View>
          </View>
        </View>
      </View>
      <View style={styles.bodypart}>
        <Text
          style={styles.boxtext}>
          Status history
        </Text>
        <View
          style={styles.view4}>
          <View style={styles.view5}>
            <View style={styles.view6}>
              <View style={styles.marg1}>
                <FIcon name="circle-o" size={20} color={Colors.bluetheme} />
              </View>
              <View
                style={styles.iconview}
              />
              <View style={styles.marg2}>
                <FIcon name="circle-o" size={20} color={Colors.bluetheme} />
              </View>
            </View>
          </View>
          <View style={styles.flexs}>
            <View style={styles.view7}>
              <Text
                style={styles.textstyle}>
                Expense Created
              </Text>
              <Text
                style={styles.textstyle1}>
                12:12PM, 25 feb 2022
              </Text>
            </View>
            <View style={styles.view8}>
              <Text
                style={styles.textstyle}>
                Expense Approved
              </Text>
              <Text
                style={styles.textstyle1}>
                06:18PM, 27 march 2022
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};


export default FoodExprenses;
