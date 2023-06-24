import React, { useState } from 'react';
import { Modal, View, Text, Dimensions, Image, StyleSheet } from 'react-native'
import StyleCss from '../../assets/css/styleOutlet';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../assets/config/Colors';
import { Picker } from "@react-native-picker/picker";
const { width } = Dimensions.get('window');
import { useToast } from "react-native-toast-notifications";
import { useDispatch } from 'react-redux';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';


export default SelectDistributorModal = (props) => {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  const navigation = useNavigation()
  const dispatch = useDispatch();
  const [modalVisible2, setModalVisible2] = useState(true);
  // const [Enable, setEnable] = useState("courses");
  const [parentId, setParentId] = useState("")
  const [primaryDistributor, setPrimaryDistributor] = useState({})
  const toast = useToast();

  const handleClickOnCancel = () => {
    setParentId('');
    setPrimaryDistributor('');
    props.setModalVisible2(false);
    setModalVisible2(!modalVisible2);
    dispatch({ type: 'REMOVE_PRIMARY_DISTRIBUTOR', payload: '' });
  }

  const handleClickOnDone = async () => {
    if (parentId == '') {
      toast.show("Please choose distributor.", {
        type: "warning",
        placement: "bottom",
        duration: 3000,
        offset: 30,
        animationType: "slide-in",
      });
    } else {
      setModalVisible2(!modalVisible2);
      // setModalVisible3(!modalVisible3)
      // primaryDistributor['shipTo']=props.outletId
      dispatch({ type: 'ADD_PRIMARY_DISTRIBUTOR', payload: primaryDistributor });
      dispatch({type:'ADD_ORDER_LINE_ITEMS',payload:[]})
      props.setModalVisible2(false);
      navigation.push('BeatOutletProductCategories', {
        navigateFrom: 'outletView',
        outletId: props.outletId,
        orderType: props.tempProp
      });
    }
  }

  const handleChangeDistributor = (itemid, index) => {
    console.log("completely Item ---->", itemid);
    console.log("completely Item ---->11", props.data[index - 1]);
    setParentId(itemid);
    let objj = props.data[index - 1]
    objj["outlettype"] = props.outletType
    objj["shipFromName"] = props.shipFromName
    objj["shipToName"] = props.data[index - 1].OutletName
    console.log("obk==", objj)
    setPrimaryDistributor(objj);
  }

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
        <View style={{...StyleCss.modalView,backgroundColor:themecolor.RB2}}>
          <View style={StyleCss.ModalViewWidth1}>
            <View
              style={StyleCss.ModelVideoCenter}>
              <Image
                source={require('../../assets/images/multiuser.gif')}
                style={{...StyleCss.backgroundImageGif,backgroundColor:'transparent'}}
                resizeMode={'contain'}
              />
              <Text style={{...StyleCss.submittext,color:themecolor.TXTWHITE}}>
                Please select the distributor who fulfill the order.
              </Text>

            </View>

            <View style={StyleCss.MV5} />
            <View style={{...styles.InputMainView,backgroundColor:themecolor.BOXTHEMECOLOR,borderColor: themecolor.BOXBORDERCOLOR1}}>
              <Picker
                // numberOfLines={1}
                selectedValue={parentId}
                style={{  width: width * 0.8,color: themecolor.TXTWHITE ,}}
                itemStyle={{backgroundColor:themecolor.BOXTHEMECOLOR,color:themecolor.BOXTHEMECOLOR}}
                mode={"dialog"}
                dropdownIconColor={themecolor.TXTWHITE}
                onValueChange={(itemValue, index) => handleChangeDistributor(itemValue, index)}
              >
                <Picker.Item label={"Select distributor"} value=''    />
                {
                  props.data.map((item) => (
                    <Picker.Item label={`${item.OutletName} (${item.CategoryType})`} value={item.Id} 
                  />
                  ))
                }
              </Picker>
            </View>
            <View style={StyleCss.MV5} />
            <View style={{ ...StyleCss.FLexCenter, ...StyleCss.FLexCenterCustom }}>
              <FullsizeButton width={width * 0.25} BRadius={30} height={30} backgroundColor={themecolor.HEADERTHEMECOLOR} onPress={() => handleClickOnDone()} title='Confirm' />
              <FullsizeButton width={width * 0.25} BRadius={30} height={30} backgroundColor={themecolor.HEADERTHEMECOLOR}  onPress={() => handleClickOnCancel()} title='Cancel' />
            </View>
          </View>
        </View>
        {/* <View style={styles.container}> */}

      </View>
      {/* </View> */}
    </Modal>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  InputMainView:
  {
    width: width * 0.8,
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: Colors.borderColor,
    height: 45
  },
});