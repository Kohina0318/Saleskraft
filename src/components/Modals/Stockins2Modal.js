import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Modal,
  Dimensions,
  ScrollView,
  Image, TouchableOpacity
} from 'react-native';
import { Colors } from '../../assets/config/Colors';
import { FontFamily } from '../../assets/fonts/FontFamily';
import { FontSize } from '../../assets/fonts/Fonts';
const { width } = Dimensions.get('window');
import { StockINList } from '../../screens/stockin/StockInData'
import { getCheckInOutStatus } from '../../repository/outlet/VerifyOutletRepository';
import { getOrderForGRN } from '../../repository/stockIn/StockInRepository';
import MCIcon from 'react-native-vector-icons/MaterialIcons';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';

export default function Stockins2Modal(props) {

  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()

  const [loader, setLoader] = useState(true);
  const [modalCart, setModalCart] = useState(true)
  const [orderForGRNData, setorderForGRNData] = useState([])
  const [outletId, setOutletId] = useState('')

  const checkInOutStatus = async () => {
    try {
      const res = await getCheckInOutStatus();
      console.log("Get Check In Out Status......page StockIn line 24", res);
      if (res.statusCode === 200) {
        setOutletId(res.data.data.CheckInRec.OutletId)
        handleOrderForGRN(res.data.data.CheckInRec.OutletId);
      }
    } catch (e) {
      console.log("Error CheckInOutStatus in StockIn page")
    }
  }

  const handleOrderForGRN = async (outletId) => {
    try {
      // alert(outletId)
      const res = await getOrderForGRN(outletId);
      console.log("OrderForGRN...>Stock In >>:", res);
      if (res.statusCode === 200) {
        setorderForGRNData(res.data)
      }
      setLoader(false)
    } catch (e) {
      console.log("Error OrderForGRN in Stock In page")
    }
  }

  useEffect(() => {
    checkInOutStatus()
  }, [])

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalCart}
        onRequestClose={() => {
          props.setStockInModal(false);
          props.setmodalVisible3(true)
        }}
      >
        <View style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: 'rgba(0,0,0,0.2)',
        }}>
          <View style={{
            margin: 25,
            backgroundColor: themecolor.RB2,
            borderRadius: 15,
            padding: 6,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2
            }
          }}>

            <View style={{ width: width * 0.8, height: 250, paddingBottom: 20, }}>

              <View style={{ flexDirection: 'row', marginTop: 8, padding: 5 }}>
                <View style={{ width: width * 0.734, }}>
                  <Text style={{
                    fontSize: FontSize.buttonText,
                    fontFamily: FontFamily.Popinssemibold,
                    color: themecolor.TXTWHITE,
                  }}>
                    Stock In
                  </Text>
                </View>
                <TouchableOpacity onPress={() => {
                  props.setStockInModal(false);
                  props.setmodalVisible3(true)
                }}>
                  <View style={{ width: 23, height: 23, borderRadius: 25, borderWidth: 0.5, borderColor:themecolor.TXTWHITE, justifyContent: 'center', alignItems: 'center', marginTop: -8 ,}}>
                    <MCIcon name="close" color={themecolor.TXTWHITE} size={18} />
                  </View>
                </TouchableOpacity>
              </View>

              {loader ? (
                <Image
                  style={{
                    resizeMode: 'contain',
                    alignSelf: 'center',
                    height: 150
                  }}
                  source={require('../../assets/images/dot.gif')}
                />
              ) : (

                orderForGRNData.length > 0 ?
                  (
                    <ScrollView >
                      <StockINList setStockInModal={props.setStockInModal} orderForGRNData={orderForGRNData} outletId={outletId} />
                    </ScrollView>
                  ) : (
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 180
                      }}>
                      <View
                        style={{
                          paddingHorizontal: 15,
                          paddingVertical: 8,
                          backgroundColor: Colors.green1,
                          borderRadius: 15,
                        }}>
                        <Text
                          style={{
                            fontFamily: FontFamily.Popinssemibold,
                            fontSize: FontSize.h4,
                            color: 'white',
                          }}>
                          <Text> No Stock In</Text>
                        </Text>
                      </View>
                    </View>
                  )

              )}
            </View>


            <View style={{ marginVertical: 5 }} />
          </View>

        </View>
      </Modal>
    </>
  )
}