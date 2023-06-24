import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, Dimensions } from 'react-native'
import styles from '../../assets/css/stylesReport';
import NewDropdown from '../shared/NewDropdown';
import { Colors } from '../../assets/config/Colors';
import { FontFamily } from '../../assets/fonts/FontFamily';
import { getBeatWiseSales } from '../../repository/report/ReportRepository';
import TextTicker from 'react-native-text-ticker';
import moment from 'moment';
const { height } = Dimensions.get('screen');
import NoReportImage from './NoReportImage';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';

//Render Function OF BeatWiseSales
function BeatWiseSalesList({ item, themecolor }) {
  const [GraphHeight, setGraphHeight] = React.useState(0);

  React.useEffect(() => {
    if (item.TotalOrderAmount == 0) {
      setGraphHeight(0);
    } else if (item.TotalOrderAmount > 0 && item.TotalOrderAmount < 500) {
      setGraphHeight(10);
    } else if (item.TotalOrderAmount > 500 && item.TotalOrderAmount < 1200) {
      setGraphHeight(15);
    } else if (item.TotalOrderAmount > 1200 && item.TotalOrderAmount < 2000) {
      setGraphHeight(20);
    } else if (item.TotalOrderAmount > 2000 && item.TotalOrderAmount < 2500) {
      setGraphHeight(23);
    } else if (item.TotalOrderAmount > 2500 && item.TotalOrderAmount < 3000) {
      setGraphHeight(25);
    } else if (item.TotalOrderAmount > 3000 && item.TotalOrderAmount < 3500) {
      setGraphHeight(27);
    } else if (item.TotalOrderAmount > 3500 && item.TotalOrderAmount < 4000) {
      setGraphHeight(30);
    } else if (item.TotalOrderAmount > 4000 && item.TotalOrderAmount < 4500) {
      setGraphHeight(33);
    } else if (item.TotalOrderAmount > 4500 && item.TotalOrderAmount < 5000) {
      setGraphHeight(36);
    } else if (item.TotalOrderAmount > 5000 && item.TotalOrderAmount < 5500) {
      setGraphHeight(39);
    } else if (item.TotalOrderAmount > 5500 && item.TotalOrderAmount < 6000) {
      setGraphHeight(42);
    } else if (item.TotalOrderAmount > 6000 && item.TotalOrderAmount < 6500) {
      setGraphHeight(45);
    } else if (item.TotalOrderAmount > 6500 && item.TotalOrderAmount < 7000) {
      setGraphHeight(48);
    } else if (item.TotalOrderAmount > 7000 && item.TotalOrderAmount < 7500) {
      setGraphHeight(51);
    } else if (item.TotalOrderAmount > 7500 && item.TotalOrderAmount < 8000) {
      setGraphHeight(54);
    } else if (item.TotalOrderAmount > 8000 && item.TotalOrderAmount < 8500) {
      setGraphHeight(57);
    } else if (item.TotalOrderAmount > 8500 && item.TotalOrderAmount < 9000) {
      setGraphHeight(60);
    } else if (
      item.TotalOrderAmount > 9000 &&
      item.TotalOrderAmount < 10000
    ) {
      setGraphHeight(65);
    } else if (
      item.TotalOrderAmount > 10000 &&
      item.TotalOrderAmount < 11000
    ) {
      setGraphHeight(70);
    } else if (
      item.TotalOrderAmount > 11000 &&
      item.TotalOrderAmount < 12000
    ) {
      setGraphHeight(75);
    } else if (
      item.TotalOrderAmount > 12000 &&
      item.TotalOrderAmount < 13000
    ) {
      setGraphHeight(80);
    } else if (
      item.TotalOrderAmount > 13000 &&
      item.TotalOrderAmount < 14000
    ) {
      setGraphHeight(85);
    } else if (
      item.TotalOrderAmount > 14000 &&
      item.TotalOrderAmount < 15000
    ) {
      setGraphHeight(90);
    } else if (
      item.TotalOrderAmount > 15000 &&
      item.TotalOrderAmount < 20000
    ) {
      setGraphHeight(100);
    } else if (
      item.TotalOrderAmount > 20000 &&
      item.TotalOrderAmount < 25000
    ) {
      setGraphHeight(110);
    } else if (
      item.TotalOrderAmount > 25000 &&
      item.TotalOrderAmount < 30000
    ) {
      setGraphHeight(120);
    } else if (
      item.TotalOrderAmount > 30000 &&
      item.TotalOrderAmount < 35000
    ) {
      setGraphHeight(130);
    } else if (
      item.TotalOrderAmount > 35000 &&
      item.TotalOrderAmount < 40000
    ) {
      setGraphHeight(140);
    } else {
      setGraphHeight(145);
    }
  }, [item]);

  return (
    <View
      style={{
        alignItems: 'center',
        alignSelf: 'flex-end',
        //   height: '100%',
      }}>

      <View>
        <Text style={{ color: '#FEA90D', fontSize: 10 }}>{item.TotalOrderAmount}</Text>
      </View>


      <View
        style={{
          width: 23,
          height: GraphHeight,
          backgroundColor: '#FEA90D',
          borderBottomWidth: 1,
        }}
      />
      <View style={{ marginTop: 10 }}>
        <View style={{ width: 100 }}>
          <View style={{ alignSelf: 'center', justifyContent: 'center' }}>
            <TextTicker
              duration={8000}
              loop
              bounce
              repeatSpacer={50}
              marqueeDelay={1000}>
              <Text
                style={{
                  fontSize: 9,
                  fontWeight: 'bold',
                  fontFamily: FontFamily.PopinsMedium,
                  color: Colors.black,
                  textAlign: 'center',
                  color: themecolor.TXTWHITE
                }}>
                {item.Beat}
              </Text>
            </TextTicker>
          </View>
        </View>
      </View>
    </View>
  );
}

export default function BeatWiseSalesReport(props) {

  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()

  var beatWiseSalesSelect = ['Daily', 'Weekly', 'Monthly'];

  const [selectedBeatWiseSalesItem, setSelectedBeatWiseSalesItem] =
    React.useState('Daily');
  const [beatWiseSalesFilter, setBeatWiseSalesFilter] = React.useState(1);
  const [beatWiseSalesData, setBeatWiseSalesData] = React.useState([]);
  const [placeholder, setPlaceholder] = useState('Daily');
  const [newOptions, setNewOptions] = useState(beatWiseSalesSelect);
  // alert(JSON.stringify(beatWiseSalesData))
  useEffect(() => {
    if (placeholder == 'Daily') {
      beatWiseSalesSelect = ['Weekly', 'Monthly'];
    } else if (placeholder == 'Weekly') {
      beatWiseSalesSelect = ['Daily', 'Monthly'];
    } else if (placeholder == 'Monthly') {
      beatWiseSalesSelect = ['Daily', 'Weekly'];
    }
    setNewOptions(beatWiseSalesSelect);
  }, [placeholder]);

  const BeatWiseSales = async (sd, ed) => {
    // alert(sd+' se1 '+ed)

    try {
      var res = await getBeatWiseSales(sd, ed);
      // console.log('Beat Wise Sales....page in Report..... line 688', res.data);
      // alert(JSON.stringify(res))
      if (res.statusCode === 200) {
        setBeatWiseSalesData(res.data);
      } else if (res.statusCode === 400) {
        setBeatWiseSalesData([]);
      }
    } catch (e) {
      console.log('Error Beat Wise Sales....page in Report.>>:', e);
    }
  };

  React.useEffect(() => {
    // alert(selectedBeatWiseSalesItem)
    if (selectedBeatWiseSalesItem == 'Daily') {
      let ed = moment().format('YYYY-MM-DD');
      BeatWiseSales(ed, ed);
    } else if (selectedBeatWiseSalesItem == 'Weekly') {
      let sd = moment().subtract(7, 'days').format('YYYY-MM-DD');
      let ed = moment().format('YYYY-MM-DD');
      BeatWiseSales(sd, ed);
    } else if (selectedBeatWiseSalesItem == 'Monthly') {
      let sd = moment().subtract(1, 'months').format('YYYY-MM-DD');
      let ed = moment().format('YYYY-MM-DD');
      BeatWiseSales(sd, ed);
    }
  }, [selectedBeatWiseSalesItem]);

  React.useEffect(() => {
    let ed = moment().format('YYYY-MM-DD');
    BeatWiseSales(ed, ed);
  }, [beatWiseSalesFilter]);

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          position: 'relative',
        }}>
        <View>
          <Text style={{ ...styles.CardText, color: themecolor.TXTWHITE }}>Beat wise Sales</Text>
        </View>
        <View style={{ flexDirection: 'row', }}>
          <View
            style={{
              position: 'absolute',
              zIndex: 9999,
              right: 0,
            }}>
            <NewDropdown
              options={newOptions}
              setSelectedItem={setSelectedBeatWiseSalesItem}
              toValue={70}
              widthh={85}
              widthPlaceHolder={60}
              widthIcon={10}
              placeholder={placeholder}
              setPlaceholder={setPlaceholder}
            />
          </View>
        </View>
      </View>

      <View
        style={{
          ...styles.customChart,
          height: beatWiseSalesData.length >= 1 ? height * 0.26 : height * 0.25,
          borderWidth: 1,
          borderColor: '#E9E9E9',
          alignItems: 'flex-end',
          backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR1
        }}>
        {
          beatWiseSalesData.length >= 1 ?
            <FlatList
              data={beatWiseSalesData}
              renderItem={({ item }) => (
                <BeatWiseSalesList
                  item={item}
                  themecolor={themecolor}
                />
              )}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            /> :
            <View style={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
              <NoReportImage width={160} height={160} />
            </View>
        }
      </View>
    </View>
  );
}
