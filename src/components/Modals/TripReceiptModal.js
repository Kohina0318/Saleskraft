import React, { useState } from 'react';
import {
  View,
  Modal,
  Image,
  Dimensions,
} from 'react-native';
import { Colors } from '../../assets/config/Colors';
import { FontSize } from '../../assets/fonts/Fonts';
import { FontFamily } from '../../assets/fonts/FontFamily';
import { TextInput } from 'react-native-gesture-handler';
import { useToast } from 'react-native-toast-notifications';
import { uploadMediaApi } from '../../repository/CaseGrievance/CaseGrievance';
import { createTripApi } from '../../repository/trip/tripRepository';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../Theme/ThemeDarkLightColor';

export default function TripReceiptModal(props) {
  // const navigation = useNavigation()
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  
  const toast = useToast();
  const { width, height } = Dimensions.get('screen');

  const [amount, setAmount] = useState(null);
  const [discription, setDiscription] = useState('');

  console.log('imgValues', props.Imageurl);

  const onsubmit = async () => {

    if (props.isVisible) {
      let body = {
        folder_id: '1',
        media: [props.Imageurl],
      };

      const result = await uploadMediaApi('api/uploadMediaBase64', body);
      console.log('result frpm upload', result);
      const d1 = result.data.toString();

      if (discription.length > 1 && amount != null) {
        const result_2 = await createTripApi(
          `api/createExpenseListDetailss?expense_list_id=${props.ExpMasterId}&image=${d1}&description=${discription}&amount=${amount}`,
        );
        console.log('result_2', result_2);
        if (result_2.statusCode == 200) {
          toast.show(result_2.message, {
            type: 'success',
            placement: 'bottom',
            duration: 4000,
            offset: 30,
            animationType: 'slide-in',
          });
          props.setTripModal(false);
          props.setisVisible(false);
          props.setRefresh(!props.refresh)
          props.setLoader(false);
        }
      } else {
        toast.show(`All fields are required`, {
          type: 'warning',
          placement: 'bottom',
          duration: 4000,
          offset: 30,
          animationType: 'slide-in',
        });
      }
    } else {
      if (discription.length > 1 && amount != null) {
        const result = await createTripApi(
          `api/createExpenseListDetailss?expense_list_id=${props.ExpMasterId}&description=${discription}&amount=${amount}`,
        );
        console.log('result of no attachment api', result);
        if (result.statusCode == 200) {
          toast.show(result.message, {
            type: 'success',
            placement: 'bottom',
            duration: 4000,
            offset: 30,
            animationType: 'slide-in',
          });
          props.setTripModal(false);
          props.setisVisible(false);
          props.setRefresh(!props.refresh)
          // navigation.goBack()
          // props.setLoader(false)

        }
      } else {
        toast.show(`All fields are required`, {
          type: 'warning',
          placement: 'bottom',
          duration: 4000,
          offset: 30,
          animationType: 'slide-in',
        });
      }
    }


    // props.setShowImage(false)

  };

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.modalVisible}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.2)',
          }}>
          <View
            style={{
              margin: 25,
              backgroundColor: themecolor.RB2,
              borderRadius: 20,
              padding: 35,
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
            }}>
            {props.isVisible && (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 200,
                  borderWidth: 1,
                  width: width * 0.8,
                  borderRadius: 12,
                  borderColor: Colors.borderColor,
                }}>
                <Image
                  source={{
                    uri: `data:image/jpeg;base64,${props.Imageurl}`,
                  }}
                  resizeMode="cover"
                  style={{
                    width: width * 0.8,
                    height: height * 0.25,
                    borderRadius: 10,
                  }}
                />
              </View>
            )}
            <View style={{ marginVertical: 5 }} />
            <View style={{ width: width * 0.8 ,}}>
              <TextInput
                style={{
                  fontSize: FontSize.labelText2,
                  width: width * 0.8,
                  alignSelf: 'center',
                  fontFamily: FontFamily.Popinssemibold,
                  borderWidth: 1,
                  borderRadius: 12,
                  backgroundColor:themecolor.BOXBORDERCOLOR,
                  borderColor: themecolor.BOXBORDERCOLOR1,
                  color:themecolor.TXTWHITE,
                }}
                value={amount}
                onChangeText={txt => {
                  let temp = '';
                  temp = txt.replace(/[^0-9]/g, '');
                  if (temp.length === 0) {
                    setAmount('');
                  } else {
                    setAmount(temp);
                  }
                }}
                placeholder={'  Enter Amount'}
                placeholderTextColor={Colors.grey}></TextInput>
              <View style={{ marginVertical: 5 }} />
              <TextInput
                style={{
                  fontSize: FontSize.labelText2,
                  width: width * 0.8,
                  alignSelf: 'center',
                  fontFamily: FontFamily.Popinssemibold,
                  borderWidth: 1,
                  borderRadius: 12,
                  height: 90,
                  // borderColor: Colors.borderColor,
                  textAlignVertical: 'top',
                  backgroundColor:themecolor.BOXBORDERCOLOR,
                  borderColor: themecolor.BOXBORDERCOLOR1,
                  color:themecolor.TXTWHITE,
                
                }}
                onChangeText={t => setDiscription(t)}
                placeholder={'  Enter Discription'}
                placeholderTextColor={Colors.grey}></TextInput>
            </View>
            <View style={{ marginVertical: 5 }} />
            <View style={{ flexDirection: 'row', alignSelf: 'flex-start', width: width * 0.8, alignSelf: 'center' }}>
              <FullsizeButton
                width={80}
                BRadius={80}
                height={30}
                title={'Submit'}
                onPress={() => onsubmit()}
                backgroundColor={themecolor.HEADERTHEMECOLOR}
              />
              <FullsizeButton
                width={80}
                BRadius={80}
                height={30}
                title={'Cancel'}
                backgroundColor={'white'}
                titlecolor={'grey'}
                onPress={() => {
                  props.setTripModal(false);
                  props.setisVisible(false);
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
