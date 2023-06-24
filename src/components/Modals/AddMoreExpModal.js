import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import StyleCss from '../../assets/css/styleOutlet';
import { useNavigation } from '@react-navigation/native';
import {  Checkbox } from 'react-native-paper';
import { Colors } from '../../assets/config/Colors';
import { FontFamily } from '../../assets/fonts/FontFamily';
import { FontSize } from '../../assets/fonts/Fonts';
import { createTripApi } from '../../repository/trip/tripRepository';
import { useToast } from 'react-native-toast-notifications';
import { useSelector } from 'react-redux';
import { store } from '../../../App';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';

export default AddMoreExpModal = props => {
  const mode = useSelector(state => state.mode);
    const themecolor = new MyThemeClass(mode).getThemeColor()

  const toast = useToast();
  const navigation = useNavigation();
  const [modalVisible2, setModalVisible2] = useState(true);
  const [mexpId, setMexpId] = useState(false);
  // ===================================
  const moreExparr = props.moreExparr;

  const moreExpenseRedux = useSelector(state => state.moreExpense);

  const moreExpenseReduxValue = Object.values(moreExpenseRedux);

  // console.log('moreExpenseArray 9988', moreExpenseReduxValue);
  const handleClickOnDone = () => {
    setModalVisible2(!modalVisible2);
    navigation.push(props.navigateTo, {
      navigateFrom: props.navigateFrom,
    });
    //   props.setShowmodal(false)
  };

  const handleTodayTrip = id => {
    // if (mexpId == id) {
    //   props.setMoreexpid('');
    //   setMexpId('');
    // } else {
    //   props.setMoreexpid(id);
    //   setMexpId(id);
    // }

    if (moreExpenseReduxValue.includes(id)) {
      store.dispatch({ type: 'ADD_MORE_EXPENSE_BY_ID', payload: id });
    } else {
      store.dispatch({
        type: 'ADD_MORE_EXPENSE',
        payload: [id, id],
      });
    }
  };


  const addMoreExpense = async () => {
    // alert(mexpId);
    // props.setLoader(true)
    // alert(mexpId)
    try {
      if (moreExpenseReduxValue.length < 1) {
        toast.show('Please select the expense you want to add.', {
          type: 'warning',
          placement: 'bottom',
          duration: 4000,
          offset: 30,
          animationType: 'slide-in',
        });
      } else {
        console.log('mexpId8858888', moreExpenseReduxValue);
        // let exparr = moreExpenseReduxValue;
        moreExpenseReduxValue.map(async i => {
          const resultep = await createTripApi(
            `api/addMoreExpPost/${props.expId}?ExpMasterId%5B%5D=${[i]}`,
          );
          console.log('result in the more expense modal', resultep);
        });
        props.setAddMoreExpModal(!props.addMoreExpModal);
        props.setRefreshm(!props.refreshm);
        store.dispatch({
          type: 'REMOVE_MORE_EXPENSE'
        });
      }
    } catch (err) {
      // alert('catching', err);
      console.log('catch error in more expense', err);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible2}
    // onRequestClose={() => {
    //     setModalVisible2(!modalVisible2);
    // }}
    >
      <View style={StyleCss.centeredView}>
        <View style={{ ...StyleCss.modalView, margin: 40, paddingVertical: 20, backgroundColor:themecolor.RB2 }}>
          <View style={{ ...StyleCss.ModalViewWidth, paddingBottom: 0 }}>
            <View style={{ alignSelf: 'center' }}>
              <Text
                style={{
                  fontFamily: FontFamily.PopinsMedium,
                  color: themecolor.TXTWHITE,
                  fontSize: FontSize.labelText4,
                }}>
                Add more expenses
              </Text>
            </View>
            <View style={{ height: 10 }} />
            <View>
              {moreExparr.length != 0 ? (
                <View
                  style={{
                    alignItems: 'center',
                    flexDirection: 'column',
                    // height: 50,
                  }}>
                  <ScrollView>
                    {moreExparr.length >= 1 ? (
                      moreExparr.map(i => {
                        return (
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Checkbox
                              // value={checked1}
                              tintColors={{
                                true: Colors.bluetheme,
                                false: 'black',
                              }}
                              // style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
                              color={Colors.bluetheme}
                              uncheckedColor={Colors.lightgrey}
                              // status={
                              //   mexpId == i.value ? 'checked' : 'unchecked'
                              // }
                              status={
                                moreExpenseReduxValue.includes(i.value)
                                  ? 'checked'
                                  : 'unchecked'
                              }
                              onPress={() => handleTodayTrip(i.value)}
                            />
                            <TouchableOpacity>
                              <Text
                                style={{
                                  color:themecolor.TXTWHITE,
                                  fontFamily: FontFamily.PopinsRegular,
                                }}>
                                {i.label}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        );
                      })
                    ) : (
                      <></>
                    )}
                  </ScrollView>
                </View>
              ) : (
                <></>
              )}
            </View>
            <View style={{ height: 10 }} />
            <View
              style={{
                justifyContent: 'space-around',
                width: '50%',
                alignSelf: 'center',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  backgroundColor: themecolor.HEADERTHEMECOLOR,
                  borderRadius: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: 10,
                  paddingVertical: 2,
                }}
                onPress={() => {
                  addMoreExpense();
                }}>
                <Text style={{ color: 'white' }}>Add +</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  borderRadius: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: 10,
                  paddingVertical: 2,
                }}
                onPress={() => {
                  props.setAddMoreExpModal(!props.addMoreExpModal);
                  store.dispatch({
                    type: 'REMOVE_MORE_EXPENSE',
                  });
                }}>
                <Text style={{ color: Colors.grey }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};
