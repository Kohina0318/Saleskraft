import { View, Text, FlatList, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import styles from '../../assets/css/stylesReport';
import NewDropdown from '../shared/NewDropdown';
import moment from 'moment';
import { gettripLocationApi } from '../../repository/trip/tripRepository';
import NoReportImage from './NoReportImage';
const { height } = Dimensions.get('screen');
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';


function PendingList({ item, mode, themecolor }) {
  const [GraphHeight, setGraphHeight] = React.useState(0);
  
  React.useEffect(() => {

    if (item.OrderTotal == 0) {
      setGraphHeight(0);
    } else if (item.OrderTotal > 0 && item.OrderTotal < 100) {
      setGraphHeight(5);
    } else if (item.OrderTotal >= 100 && item.OrderTotal < 200) {
      setGraphHeight(10);
    } else if (item.OrderTotal >= 200 && item.OrderTotal < 400) {
      setGraphHeight(12);
    } else if (item.OrderTotal >= 400 && item.OrderTotal < 600) {
      setGraphHeight(14);
    } else if (item.OrderTotal >= 600 && item.OrderTotal < 800) {
      setGraphHeight(18);
    } else if (item.OrderTotal >= 800 && item.OrderTotal < 1000) {
      setGraphHeight(20);
    } else if (item.OrderTotal >= 1000 && item.OrderTotal < 1200) {
      setGraphHeight(25);
    } else if (item.OrderTotal >= 1200 && item.OrderTotal < 1400) {
      setGraphHeight(30);
    } else if (item.OrderTotal >= 1400 && item.OrderTotal < 1600) {
      setGraphHeight(35);
    } else if (item.OrderTotal >= 1600 && item.OrderTotal < 1800) {
      setGraphHeight(40);
    } else if (item.OrderTotal >= 1800 && item.OrderTotal < 2000) {
      setGraphHeight(45);
    } else if (item.OrderTotal >= 2000 && item.OrderTotal < 2200) {
      setGraphHeight(50);
    } else if (item.OrderTotal >= 2200 && item.OrderTotal < 2400) {
      setGraphHeight(55);
    } else if (item.OrderTotal >= 2400 && item.OrderTotal < 2600) {
      setGraphHeight(60);
    } else if (item.OrderTotal >= 2600 && item.OrderTotal < 2800) {
      setGraphHeight(65);
    } else if (item.OrderTotal >= 2800 && item.OrderTotal < 3000) {
      setGraphHeight(70);
    } else if (item.OrderTotal >= 3000 && item.OrderTotal < 3200) {
      setGraphHeight(75);
    } else if (item.OrderTotal >= 3200 && item.OrderTotal < 3400) {
      setGraphHeight(80);
    } else if (item.OrderTotal >= 3400 && item.OrderTotal < 3600) {
      setGraphHeight(85);
    } else if (item.OrderTotal >= 3600 && item.OrderTotal < 3800) {
      setGraphHeight(90);
    } else if (item.OrderTotal >= 3800 && item.OrderTotal < 4000) {
      setGraphHeight(95);
    } else if (item.OrderTotal >= 4000 && item.OrderTotal < 4500) {
      setGraphHeight(100);
    } else if (item.OrderTotal >= 4500 && item.OrderTotal < 5000) {
      setGraphHeight(105);
    } else if (item.OrderTotal >= 5000 && item.OrderTotal < 5500) {
      setGraphHeight(110);
    } else if (item.OrderTotal >= 5500 && item.OrderTotal < 6000) {
      setGraphHeight(115);
    } else if (item.OrderTotal >= 6000 && item.OrderTotal < 6500) {
      setGraphHeight(120);
    } else if (item.OrderTotal >= 6500 && item.OrderTotal < 7000) {
      setGraphHeight(125);
    } else if (item.OrderTotal >= 7000 && item.OrderTotal < 7500) {
      setGraphHeight(130);
    } else if (item.OrderTotal >= 7500 && item.OrderTotal < 8000) {
      setGraphHeight(135);
    } else if (item.OrderTotal >= 8000 && item.OrderTotal < 8500) {
      setGraphHeight(140);
    } else if (item.OrderTotal >= 8500 && item.OrderTotal < 9000) {
      setGraphHeight(145);
    } else if (item.OrderTotal >= 9000 && item.OrderTotal < 10000) {
      setGraphHeight(150);
    } else if (item.OrderTotal >= 10000 && item.OrderTotal < 15000) {
      setGraphHeight(155);
    } else if (item.OrderTotal >= 15000 && item.OrderTotal < 20000) {
      setGraphHeight(160);
    } else if (item.OrderTotal >= 20000 && item.OrderTotal < 25000) {
      setGraphHeight(165);
    } else if (item.OrderTotal >= 25000 && item.OrderTotal < 30000) {
      setGraphHeight(170);
    } else if (item.OrderTotal >= 30000 && item.OrderTotal < 35000) {
      setGraphHeight(175);
    } else if (item.OrderTotal >= 35000 && item.OrderTotal < 40000) {
      setGraphHeight(180);
    } else if (item.OrderTotal >= 4000 && item.OrderTotal < 45000) {
      setGraphHeight(182);
    } else {
      setGraphHeight(185);
    }
  }, [item]);


  return (
    <>
      <View style={styles.MH8} />
      <View style={styles.View1}>
        {/* <View style={styles.Center}> */}
        <Text style={{...styles.Text1,color: themecolor.TXTWHITE}}>
          {item.OrderTotal}
        </Text>
        <View style={{ ...styles.MainView, height: GraphHeight }} />
        <Text
          style={{ ...styles.Text2, color: themecolor.TXTWHITE }}>
          {item.OrderDate}
        </Text>
        {/* </View> */}
      </View>
    </>
  );
}

export default function PendingReport(props) {

  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()


  var pendingSelect = ['Current Month', 'Last Month'];
  const [pendingData, setPendingData] = React.useState([]);
  const [selectedPendingItem, setSelectedPendingItem] = useState('Current Month');
  const [placeholder, setPlaceholder] = useState('Current Month');
  const [newOptions, setNewOptions] = useState(pendingSelect);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (placeholder == 'Current Month') {
      pendingSelect = ['Last Month'];
    } else {
      pendingSelect = ['Current Month'];
    }
    setNewOptions(pendingSelect);
  }, [placeholder]);

  const PendingPO = async (f, t) => {
    try {
      var res = await gettripLocationApi(
        `api/getPendingPo?from_date=${f}&to_date=${t}`,
      );
      // console.log('==============🤦‍♀️============', res);
      if (res.statusCode === 200) {
        setPendingData(res.data);
      }
    } catch (e) {
      console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>', e);
    }
  };

  React.useEffect(() => {
    const f = moment().startOf('month').format('YYYY-MM-DD');
    const t = moment().endOf('month').format('YYYY-MM-DD');
    // console.log('🤦‍♀️🤦...................', f, t);
    PendingPO(f, t);
  }, []);

  function PendingSelectedDate() {
    if (selectedPendingItem == 'Current Month') {
      const startOfMonth = moment().startOf('month').format('DD-MM-YYYY');
      const endOfMonth = moment().endOf('month').format('DD-MM-YYYY');
      // console.log('-------------------------🤦🐱‍🏍', startOfMonth, endOfMonth);
      PendingPO(startOfMonth, endOfMonth);
    } else {
      const startOfMonth = moment()
        .subtract(1, 'months')
        .startOf('month')
        .format('DD-MM-YYYY');
      const endOfMonth = moment()
        .subtract(1, 'months')
        .endOf('month')
        .format('DD-MM-YYYY');
      // console.log(
      //   '===============🎶=================',
      //   startOfMonth,
      //   endOfMonth,
      // );
      PendingPO(startOfMonth, endOfMonth);
    }
  }

  useEffect(() => {
    PendingSelectedDate();
  }, [selectedPendingItem]);

  return (
    <View>
      <View style={styles.BoxView}>
        <View>
          <Text style={{ ...styles.CardText, color: themecolor.TXTWHITE }}>Pending PO</Text>
        </View>

        <View style={styles.DropdownView}>
          <NewDropdown
            options={newOptions}
            setSelectedItem={setSelectedPendingItem}
            toValue={105}
            widthh={115}
            widthPlaceHolder={90}
            widthIcon={10}
            placeholder={placeholder}
            setPlaceholder={setPlaceholder}
            setRefresh={setRefresh}
            refresh={refresh}
          />
        </View>
      </View>

      <View style={{
        ...styles.DataView, backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR1,
        height: pendingData.length >= 1 ? 280 : height * 0.24
      }}>
        {
          pendingData.length >= 1 ?
            <FlatList
              data={pendingData}
              renderItem={({ item }) => <PendingList item={item} themecolor={themecolor} mode={mode} />}
              horizontal={true}
              refresh={refresh} setRefresh={setRefresh}
              showsHorizontalScrollIndicator={false}
            />
            :
            <View style={{ justifyContent: 'center', marginTop: 0 }} >
              <NoReportImage width={160} height={160} />
            </View>
        }
        {
          pendingData.length >= 1 ?
            <View
              style={styles.BottomView}>
              <View style={styles.SqView} />
              <Text style={{ ...styles.Text3, color: themecolor.TXTWHITE }}>
                Amount
              </Text>

            </View>
            : <></>
        }
      </View>
    </View>

  );
}
