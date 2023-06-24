import {
   Text,
   View,
   TouchableOpacity,
   Image,
   Dimensions
} from 'react-native';
import React, { useEffect } from 'react';
import styles from '../../assets/css/styleTrip';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';
import { FontFamily } from '../../assets/fonts/FontFamily';
import { Picker } from '@react-native-picker/picker';
import { gettripLocationApi } from '../../repository/trip/tripRepository';
import { useState } from 'react';
import moment from 'moment';
import { store } from '../../../App';

const { width } = Dimensions.get('window');

const HeaderTour = props => {
   const mode = useSelector(state => state.mode);
   const themecolor = new MyThemeClass(mode).getThemeColor()
   const [data, setData] = useState([])
   // const [empId, setEmpId] = useState('')

   useEffect(() => {
      const getempdetails = async () => {
         const result = await gettripLocationApi(`api/getMyTeam?filter=0`)
         if (result.statusCode == 200) {
            setData(result.data.team);
            props.setEmpId(result.data.team[0].EmployeeId);

            store.dispatch({ type: 'SET_EMPID', payload: result.data.team[0].EmployeeId })
         }
      }
      getempdetails()
   }, [])

   const getemployee = () => {
      return (
         data.map((i) => {
            return (
               <Picker.Item
                  label={`${i.FirstName} ${i.LastName}  -  ${i.Designations.Designation}`}
                  style={{ color: themecolor.TXTWHITE, fontSize: 13, fontFamily: FontFamily.PopinsMedium, backgroundColor: themecolor.BOXTHEMECOLOR }}
                  value={i.EmployeeId}
               />
            )
         })
      )
   }

   return (
      <View style={{
         width: width,
         borderBottomLeftRadius: 20,
         borderBottomRightRadius: 20,
         backgroundColor: themecolor.HEADERTHEMECOLOR,
         height: 160
      }}>
         <View style={{ ...styles.ThirdViewHeader, }}>
            <View style={styles.touchview}>
               <TouchableOpacity activeOpacity={0.5} onPress={props.onPress}>
                  <Image
                     source={require('../../assets/images/back.png')}
                     style={styles.BackIcon}
                     resizeMode={'contain'}
                  />
               </TouchableOpacity>
               <View>
                  <Text
                     style={{
                        ...styles.Text,
                        top: 1,
                        alignSelf: props.Calign,
                        left: 7,
                     }}>
                     Create Tour Plan
                  </Text>
               </View>
            </View>
         </View>



         <View>
            <View style={{
               height: 35,
               borderRadius: 10,
               borderWidth: 0.5,
               borderColor: themecolor.BOXBORDERCOLOR1,
               color: themecolor.TXTWHITE,
               overflow: 'hidden',
               width: width * 0.86,
               justifyContent: 'center',
               alignSelf: 'center',
               backgroundColor: themecolor.BOXTHEMECOLOR,
            }}>
               <Picker
                  mode="dropdown"
                  selectedValue={props.empId}
                  placeholder="Select Employee"
                  style={{ width: '100%', color: themecolor.TXTWHITE, fontSize: 13 }}
                  onValueChange={(itemValue, itemIndex) => {
                     props.setEmpId(itemValue)
                     store.dispatch({ type: 'SET_EMPID', payload: itemValue })
                  }}
               >
                  {/* <Picker.Item
                     label="Select user"
                     style={{ color: themecolor.AV2, fontSize: 13, fontFamily: FontFamily.PopinsMedium, }}
                     value=''
                  /> */}
                  {getemployee()}

               </Picker>
            </View>
            <View style={{ marginVertical: 2 }} />

            <View style={{
               height: 35,
               borderRadius: 10,
               borderWidth: 0.5,
               borderColor: themecolor.BOXBORDERCOLOR1,
               color: themecolor.TXTWHITE,
               overflow: 'hidden',
               width: width * 0.86,
               justifyContent: 'center',
               alignSelf: 'center',
               backgroundColor: themecolor.BOXTHEMECOLOR,
            }}>
               <Picker
                  mode="dropdown"
                  enabled={false}
                  // selectedValue={props.salutation}
                  placeholder="Select month"
                  style={{ width: '100%', color: themecolor.TXTWHITE, fontSize: 13 }}
                  onValueChange={(itemValue, itemIndex) =>
                     props.setMonth(itemValue)
                  }>
                  <Picker.Item
                     label={moment().add(1, 'month').format('MMMM')}
                     style={{ color: themecolor.TXTWHITE, fontSize: 13, fontFamily: FontFamily.PopinsMedium, }}
                     value={moment().add(1, 'month').format('MMMM')}
                  />
               </Picker>
            </View>
         </View>
         <View style={{ marginVertical: 3 }} />
      </View>
   );
};



export default HeaderTour;
