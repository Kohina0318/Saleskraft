import React, { useState, useEffect } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Dimensions,
} from 'react-native';

import FAIcon from 'react-native-vector-icons/FontAwesome';
import { Colors } from '../../assets/config/Colors';
import { FontFamily } from '../../assets/fonts/FontFamily';
import ProgressCircle from 'react-native-progress-circle';
import NewDropdown from '../../components/shared/NewDropdown';
import styles from '../../assets/css/stylesDashboard';
import Color from '../Theme/ThemeDarkLightColor';
const { width } = Dimensions.get('window');

// const GraphDataCircle = [
//   {
//     point: (
//       <ProgressCircle
//         percent={60}
//         radius={50}
//         borderWidth={14}
//         color={Colors.yellowcircle}
//         shadowColor="#f45831"
//         bgColor={Color.Color.BOXTHEMECOLOR}>
//         <Text
//           style={{
//             color: Color.Color.BLUEWHITE,
//             fontSize: 12,
//             fontWeight: 'bold',
//             fontFamily: FontFamily.bold1,
//           }}>
//           Total
//         </Text>
//         <Text
//           style={{
//             color: Color.Color.TXTWHITE,
//             fontSize: 9,
//             fontFamily: FontFamily.PopinsRegular,
//           }}>
//           <FAIcon name="rupee" size={9} /> 1.60 Cr. 72%
//         </Text>
//       </ProgressCircle>
//     ),
//     CN: '2.30 Cr.',
//     CN1: '5(12.5%)',
//     target: 'Target:',
//     achieved: 'Achieved:',
//     name3: '1.60 Cr. (50%)',
//   },
//   {
//     point: (
//       <View>
//         <View
//           style={{
//             flexDirection: 'row',
//             justifyContent: 'center',
//             alignSelf: 'center',
//           }}>
//           <View
//             style={{
//               width: 14,
//               height: 14,
//               backgroundColor: Colors.yellowcircle,
//             }}></View>
//           <Text
//             style={{
//               color: Color.Color.TXTWHITE,
//               fontSize: 12,
//               fontWeight: 'bold',
//               fontFamily: FontFamily.PopinsMedium,
//               left: 5,
//               top: -1,
//             }}>
//             BCA
//           </Text>
//         </View>
//         <Text
//           style={{
//             color: Color.Color.TXTWHITE,
//             fontSize: 9,
//             fontFamily: FontFamily.PopinsRegular,
//           }}>
//           <FAIcon name="rupee" size={9} /> 1.15 Cr. 72%
//         </Text>
//       </View>
//     ),
//     border: (
//       <View
//         style={{
//           borderWidth: 0.2,
//           borderColor: 'lightgrey',
//           width: width * 0.85,
//           alignSelf: 'center',
//         }}
//       />
//     ),
//     target: (
//       <View>
//         <View
//           style={{
//             flexDirection: 'row',
//             justifyContent: 'center',
//             alignSelf: 'center',
//             top: 15,
//           }}>
//           <View
//             style={{ width: 14, height: 14, backgroundColor: '#f45831' }}></View>
//           <Text
//             style={{
//               color: Color.Color.TXTWHITE,
//               fontSize: 12,
//               fontWeight: 'bold',
//               fontFamily: FontFamily.PopinsMedium,
//               left: 5,
//               top: -1,
//             }}>
//             PCA
//           </Text>
//         </View>
//         <Text
//           style={{
//             color: Color.Color.TXTWHITE,
//             fontSize: 9,
//             fontFamily: FontFamily.PopinsRegular,
//             top: 15,
//           }}>
//           <FAIcon name="rupee" size={9} /> 1.15 Cr. 72%
//         </Text>
//       </View>
//     ),
//     // achieved:'Achieved:',
//     // name3:'45.12 lac. 28%',
//   },
// ];

// function GraphCard({ item, props }) {
//   return (
//     <>
//       <View style={styles.New}>
//         {item.border}
//         <TouchableOpacity
//           activeOpacity={1}
//           onPress={() => props.navigation.navigate('Inventory')}>
//           <View style={styles.NewFlexD}>
//             <View style={styles.FlexView}>
//               <Text style={styles.FlexPoint}>
//                 <ProgressCircle
//                   percent={60}
//                   radius={50}
//                   borderWidth={14}
//                   color={Colors.yellowcircle}
//                   shadowColor="#f45831"
//                   bgColor={Color.Color.BOXTHEMECOLOR}>
//                   <Text
//                     style={{
//                       color: Color.Color.BLUEWHITE,
//                       fontSize: 12,
//                       fontWeight: 'bold',
//                       fontFamily: FontFamily.bold1,
//                     }}>
//                     Total
//                   </Text>
//                   <Text
//                     style={{
//                       color: Color.Color.TXTWHITE,
//                       fontSize: 9,
//                       fontFamily: FontFamily.PopinsRegular,
//                     }}>
//                     <FAIcon name="rupee" size={9} /> 1.60 Cr. 72%
//                   </Text>
//                 </ProgressCircle>
//               </Text>
//             </View>

//             <View style={styles.FlexView}>
//               <View style={styles.FD}>
//                 <Text
//                   style={{ ...styles.TargetText, color: Color.Color.TXTWHITE }}>
//                   {item.target}{' '}
//                 </Text>
//                 <Text
//                   style={{
//                     ...styles.TargetText2,
//                     color: Color.Color.BLUEWHITETEXT,
//                   }}>
//                   {item.CN}
//                 </Text>
//               </View>
//               <View style={styles.FD}>
//                 <Text
//                   style={{ ...styles.TargetText, color: Color.Color.TXTWHITE }}>
//                   {item.achieved}{' '}
//                 </Text>
//                 <Text
//                   style={{
//                     ...styles.TargetText2,
//                     color: Color.Color.BLUEWHITETEXT,
//                   }}>
//                   {item.name3}
//                 </Text>
//               </View>
//             </View>
//           </View>
//         </TouchableOpacity>
//       </View>
//     </>
//   );
// }

function BAsTargetvsAchievementReport(props) {
  var TargetvsAchievementSelect = ['MTD', 'QTD', 'YTD'];

  const [selectedTargetvsAchievementItem, setSelectedTargetvsAchievementItem] =
    useState('');
  const [placeholder, setPlaceholder] = useState('MTD');
  const [newOptions, setNewOptions] = useState(TargetvsAchievementSelect);

  useEffect(() => {
    if (placeholder == 'MTD') {
      TargetvsAchievementSelect = ['QTD', 'YTD'];
    } else if (placeholder == 'QTD') {
      TargetvsAchievementSelect = ['MTD', 'YTD'];
    } else if (placeholder == 'YTD') {
      TargetvsAchievementSelect = ['MTD', 'QTD'];
    }
    setNewOptions(TargetvsAchievementSelect);
  }, [placeholder]);

  return (
    <View
      style={{
        width: width * 0.93,
        justifyContent: 'center',
        alignSelf: 'center',
      }}>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          position: 'relative',
        }}>
        <View>
          <Text style={{ ...styles.CardText }}>Target vs Achievement</Text>
        </View>

        <View style={{ position: 'absolute', right: 0, zIndex: 9999 }}>
          <NewDropdown
            options={newOptions}
            setSelectedItem={setSelectedTargetvsAchievementItem}
            toValue={70}
            widthh={85}
            widthPlaceHolder={60}
            widthIcon={10}
            placeholder={placeholder}
            setPlaceholder={setPlaceholder}
          />
        </View>
      </View>
      <View style={{ marginVertical: 3 }} />

      <View
        style={{
          ...styles.cardsView,
          backgroundColor: Color.Color.BOXTHEMECOLOR,
          borderColor: Color.Color.BOXBORDERCOLOR,
        }}>
        <View style={styles.New}>
          {/* {item.border} */}
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => props.navigation.navigate('Inventory')}>
            <View style={styles.NewFlexD}>
              <View style={styles.FlexView}>
                <Text style={styles.FlexPoint}>
                  <ProgressCircle
                    percent={60}
                    radius={50}
                    borderWidth={14}
                    color={Colors.yellowcircle}
                    shadowColor="#f45831"
                    bgColor={Color.Color.BOXTHEMECOLOR}>
                    <Text
                      style={{
                        color: Color.Color.BLUEWHITE,
                        fontSize: 12,
                        fontWeight: 'bold',
                        fontFamily: FontFamily.bold1,
                      }}>
                      Total
                    </Text>
                    <Text
                      style={{
                        color: Color.Color.TXTWHITE,
                        fontSize: 9,
                        fontFamily: FontFamily.PopinsRegular,
                      }}>
                      <FAIcon name="rupee" size={9} /> 1.60 Cr. 72%
                    </Text>
                  </ProgressCircle>
                </Text>
              </View>

              <View style={styles.FlexView}>
                <View style={styles.FD}>
                  <Text
                    style={{ ...styles.TargetText, color: Color.Color.TXTWHITE }}>
                    Target
                  </Text>
                  <Text
                    style={{
                      ...styles.TargetText2,
                      color: Color.Color.BLUEWHITETEXT,
                    }}>
                    15245
                  </Text>
                </View>
                <View style={styles.FD}>
                  <Text
                    style={{ ...styles.TargetText, color: Color.Color.TXTWHITE }}>
                    Achieved
                  </Text>
                  <Text
                    style={{
                      ...styles.TargetText2,
                      color: Color.Color.BLUEWHITETEXT,
                    }}>
                    548689
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        {/* <FlatList
                    data={GraphDataCircle}
                    renderItem={({ item }) => <GraphCard item={item} />}
                    showsHorizontalScrollIndicator={false}
                /> */}
      </View>
    </View>
  );
}

export { BAsTargetvsAchievementReport };
