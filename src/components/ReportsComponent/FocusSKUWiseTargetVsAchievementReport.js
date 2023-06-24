import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Colors } from '../../assets/config/Colors';
import FIcon from 'react-native-vector-icons/FontAwesome';
import styles from '../../assets/css/stylesReport';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';

export default function FocusSKUWiseTargetVsAchievementReport(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()

  let chartBarHeightIncentive = [568, 354, 600];

  const [select, setSelect] = useState(1);
  return (
    <View>
      <View style={{ flexDirection: 'row' }}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            alignSelf: 'center',
            justifyContent: 'space-between',
            // backgroundColor:'lightgreen',
            alignItems: 'center',
          }}>
          <View>
            <Text style={{ ...styles.CardText }}>
              Focus SKU wise Target vs Achievement
            </Text>
          </View>
          <View
            style={{
              width: 55,
              alignSelf: 'center',
              backgroundColor: Colors.white,
              borderWidth: 1,
              overflow: 'hidden',
              borderColor: Colors.bluetheme,
              height: 25,
              borderRadius: 15,
            }}>
            <View
              style={{
                justifyContent: 'space-between',
                flex: 1,
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => setSelect(1)}
                style={{
                  justifyContent: 'center',
                  backgroundColor: select == 1 ? themecolor.HEADERTHEMECOLOR : '#FFF',
                  padding: 3,
                  height: 25,
                  width: 27.5,
                  borderTopLeftRadius: 10,
                  borderBottomLeftRadius: 10,
                }}>
                <Text
                  style={{
                    ...styles.CardText,
                    color: select == 1 ? '#FFF' : themecolor.HEADERTHEMECOLOR,
                    fontSize: 10,
                  }}>
                  <FIcon name="rupee" />
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => setSelect(2)}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: select == 2 ? themecolor.HEADERTHEMECOLOR : '#FFF',
                  // padding: 3,
                  // height: 25,
                  width: 30,

                  borderTopRightRadius: 10,
                  borderBottomRightRadius: 10,
                }}>
                <Text
                  style={{
                    ...styles.CardText,
                    color: select == 2 ? '#FFF' : themecolor.HEADERTHEMECOLOR,
                    fontSize: 10,
                  }}>
                  <FIcon name="percent" size={10} />
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View></View>
      </View>
      <View
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 10,
          paddingBottom: 10,
          borderWidth: 1,
          borderColor: '#E9E9E9',
          marginTop: 4,
        }}>
        <View
          style={{ ...styles.customChart, justifyContent: 'space-evenly' }}>
          <View
            style={{
              width: '27%',
              alignItems: 'center',
              alignSelf: 'flex-end',
            }}>
            <View>
              <Text>{chartBarHeightIncentive[0]}</Text>
            </View>
            <View
              style={{
                width: 60,
                height: chartBarHeightIncentive[0] / 6,
                backgroundColor: '#FEA90D',
                borderBottomWidth: 1,
              }}
            />

          </View>
          <View
            style={{
              width: '27%',
              alignItems: 'center',
              alignSelf: 'flex-end',
            }}>
            <View>
              <Text>{chartBarHeightIncentive[1]}</Text>
            </View>
            <View
              style={{
                width: 60,
                height: chartBarHeightIncentive[1] / 6,
                backgroundColor: '#F45831',
                borderBottomWidth: 1,
              }}
            />

          </View>
          <View
            style={{
              width: '27%',
              alignItems: 'center',
              alignSelf: 'flex-end',
            }}>
            <View>
              <Text>{chartBarHeightIncentive[2]}</Text>
            </View>
            <View
              style={{
                width: 60,
                height: chartBarHeightIncentive[2] / 6,
                backgroundColor: '#54C130',
                borderBottomWidth: 1,
              }}
            />

          </View>
        </View>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 10, top: -3, color: 'black' }}>
            2021-2022
          </Text>
        </View>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignSelf: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 5,
            }}>
            <View
              style={{ height: 17, width: 17, backgroundColor: '#FEA90D' }}
            />
            <Text
              style={{ marginLeft: 2, color: Colors.black, fontSize: 11 }}>
              Focus SKU
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 5,
            }}>
            <View
              style={{ height: 17, width: 17, backgroundColor: '#F45831' }}
            />
            <Text
              style={{ marginLeft: 2, color: Colors.black, fontSize: 11 }}>
              Target
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 5,
            }}>
            <View
              style={{ height: 17, width: 17, backgroundColor: '#54C130' }}
            />
            <Text
              style={{ marginLeft: 2, color: Colors.black, fontSize: 11 }}>
              Achievement
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
}