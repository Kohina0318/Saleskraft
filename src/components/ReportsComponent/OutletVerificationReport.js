import { View, Text, TouchableOpacity, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react';
const { width } = Dimensions.get('window')
import styles from '../../assets/css/stylesReport';
import { FontSize } from '../../assets/fonts/Fonts';
import { Colors } from '../../assets/config/Colors';
import { FontFamily } from '../../assets/fonts/FontFamily';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';
import NewDropdown from '../../components/shared/NewDropdown';
import { getOutletVerification } from '../../repository/report/ReportRepository';
import moment from 'moment';

export default function OutletVerificationReport() {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()

  var outletVerificationSelect = [
    'Current Month',
    'FortNight',
    'Last Month',
    'Half Yearly',
    'Yearly',
  ];

  const [outletVerificationData, setOutletVerificationData] = useState('');
  const [selectedOutletVerificationItem, setSelectedOutletVerificationItem] = useState('');
  const [placeholder, setPlaceholder] = useState('Current Month');
  const [newOptions, setNewOptions] = useState(outletVerificationSelect);

  useEffect(() => {
    if (placeholder == 'Current Month') {
      outletVerificationSelect = [
        'FortNight',
        'Last Month',
        'Half Yearly',
        'Yearly',
      ]
    } else if (placeholder == 'FortNight') {
      outletVerificationSelect = [
        'Current Month',
        'Last Month',
        'Half Yearly',
        'Yearly',
      ]
    } else if (placeholder == 'Last Month') {
      outletVerificationSelect = [
        'Current Month',
        'FortNight',
        'Half Yearly',
        'Yearly',
      ]
    } else if (placeholder == 'Half Yearly') {
      outletVerificationSelect = [
        'Current Month',
        'FortNight',
        'Last Month',
        'Yearly',
      ]
    } else if (placeholder == 'Yearly') {
      outletVerificationSelect = [
        'Current Month',
        'FortNight',
        'Last Month',
        'Half Yearly',
      ]
    }
    setNewOptions(outletVerificationSelect)
  }, [placeholder])

  const handleOutletVerification = async (st, ed) => {
    try {
      console.log(
        'selectedOutletVerificationItem...<<<Outlet Verification Report :',
        selectedOutletVerificationItem,
      );
      var res = await getOutletVerification(st, ed);
      console.log('Verification Report Report ....page in Report..... line 700', res);
      
      if (res.statusCode === 200) {
        setOutletVerificationData(res.data);
      }
    } catch (e) {
      console.log('Verification Report Report....page in Report.>>:', e);
    }
  };

  useEffect(() => {
    let strtdat = moment().startOf('month').format('DD-MM-YYYY');
    let enddat = moment().format('DD-MM-YYYY');
    handleOutletVerification(strtdat, enddat);
  }, []);

  function OutletVerificationSelectedDate() {
    if (selectedOutletVerificationItem == 'Current Month') {
      const startOfMonth = moment().startOf('month').format('DD-MM-YYYY');
      const endOfMonth = moment().format('DD-MM-YYYY');
      // console.log('Current Month....Outlet Verification>>:', startOfMonth, endOfMonth);
      handleOutletVerification(startOfMonth, endOfMonth);
    } else if (selectedOutletVerificationItem == 'FortNight') {
      const startOfMonth = moment().subtract(15, 'days').format('DD-MM-YYYY');
      const endOfMonth = moment().format('DD-MM-YYYY');
      // console.log('Fortnight....Outlet Verification>>:', startOfMonth, endOfMonth);
      handleOutletVerification(startOfMonth, endOfMonth);
    } else if (selectedOutletVerificationItem == 'Last Month') {
      const startOfMonth = moment()
        .subtract(1, 'months')
        .startOf('month')
        .format('DD-MM-YYYY');
      const endOfMonth = moment()
        .subtract(1, 'months')
        .endOf('month')
        .format('DD-MM-YYYY');
      // console.log('Last Month....Outlet Verification>>:', startOfMonth, endOfMonth);
      handleOutletVerification(startOfMonth, endOfMonth);
    } else if (selectedOutletVerificationItem == 'Half Yearly') {
      const startOfMonth = moment().subtract(6, 'months').format('DD-MM-YYYY');
      const endOfMonth = moment().format('DD-MM-YYYY');
      // console.log('Half Yearly....Outlet Verification>>:', startOfMonth, endOfMonth);
      handleOutletVerification(startOfMonth, endOfMonth);
    } else if (selectedOutletVerificationItem == 'Yearly') {
      const startOfMonth = moment().subtract(12, 'months').format('DD-MM-YYYY');
      const endOfMonth = moment().format('DD-MM-YYYY');
      // console.log('Yearly....Outlet Verification>>:', startOfMonth, endOfMonth);
      handleOutletVerification(startOfMonth, endOfMonth);
    }
  }

  useEffect(() => {
    OutletVerificationSelectedDate();
  }, [selectedOutletVerificationItem]);


  return (
    <View style={{ width: width * 0.93, justifyContent: 'center', alignSelf: 'center', }}>
      <View >
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            position: 'relative',
          }}>
          <View>
            <Text style={{ ...styles.CardText, color: themecolor.TXTWHITE }}>Outlet Verification Report</Text>
          </View>

          <View style={{ position: 'absolute', right: 0, zIndex: 9999999 }}>
            <NewDropdown
              options={newOptions}
              setSelectedItem={setSelectedOutletVerificationItem}
              toValue={105}
              widthh={115}
              widthPlaceHolder={90}
              widthIcon={10}
              placeholder={placeholder}
              setPlaceholder={setPlaceholder}
            />
          </View>
        </View>
        <View style={{ marginVertical: 3 }} />

        <View style={{
          ...styles.attentanceCards, zIndex: 0, backgroundColor: themecolor.BOXTHEMECOLOR,
          borderWidth: 1,
          borderColor: themecolor.BOXBORDERCOLOR1
        }}>
          <TouchableOpacity
            style={{
              flex: 1,
            }}
            activeOpacity={1}
          //onPress={() => props.navigation.navigate('Inventory')}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 8,
                width: width * 0.92,
                flex: 1,
              }}>
              <View
                style={{
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,
                }}>
                <Text
                  style={{
                    fontSize: FontSize.labelText3,
                    color: Colors.bluetheme,
                    fontFamily: FontFamily.Popinssemibold,
                  }}>
                  {outletVerificationData.TotalMonthDays}
                </Text>
                <Text
                  ellipsizeMode='tail'
                  numberOfLines={1}
                  style={{
                    fontSize: FontSize.small,
                    color: Colors.black,
                    fontFamily: FontFamily.PopinsMedium,
                    color: themecolor.TXTWHITE 
                  }}>
                  Total month days
                </Text>
              </View>
              <View
                style={{
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,
                }}>
                <Text
                  style={{
                    fontSize: FontSize.labelText3,
                    color: Colors.bluetheme,
                    fontFamily: FontFamily.Popinssemibold,
                  }}>
                  {outletVerificationData.SuccessfullVerification} (
                  {outletVerificationData.SuccessfullVerificationPercentage}%)
                </Text>
                <Text
                  ellipsizeMode='tail'
                  numberOfLines={1}
                  style={{
                    fontSize: FontSize.verysmallText,
                    color: Colors.black,
                    fontFamily: FontFamily.PopinsMedium,
                    color: themecolor.TXTWHITE 
                  }}>
                  Successfull Verification
                </Text>
              </View>
              <View
                style={{
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,
                }}>
                <Text

                  style={{
                    fontSize: FontSize.labelText3,
                    color: Colors.bluetheme,
                    fontFamily: FontFamily.Popinssemibold,
                  }}>
                  {outletVerificationData.UnattamptedVerification} (
                  {outletVerificationData.UnattamptedVerificationPercentage}%)
                </Text>
                <Text
                  ellipsizeMode='tail'
                  numberOfLines={1}
                  style={{
                    fontSize: FontSize.verysmallText,
                    color: Colors.black,
                    fontFamily: FontFamily.PopinsMedium,
                    color: themecolor.TXTWHITE 
                  }}>
                  Unattampted Verification
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}