import React, { useState, useEffect } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Dimensions,
} from 'react-native';
import PieChart from 'react-native-pie-chart';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { Colors } from '../../assets/config/Colors';
import { FontFamily } from '../../assets/fonts/FontFamily';
import ProgressCircle from 'react-native-progress-circle';
import styles from '../../assets/css/stylesDashboard';
import { useNavigation } from '@react-navigation/native';
import NewDropdown from '../shared/NewDropdown';
import Color from '../../components/Theme/ThemeDarkLightColor';
const { width } = Dimensions.get('window');
import moment from 'moment';
import { FontSize } from '../../assets/fonts/Fonts';
import { Divider } from 'react-native-elements';
import { gettripLocationApi } from '../../repository/trip/tripRepository';
import NoReportImage from './NoReportImage';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';

function GraphCard({ item, props, index, sliceColor, themecolor }) {

  return (
    <>
      <View
        style={{
          padding: 4,
          // alignItems: 'center',
          // alignSelf: 'center',
          backgroundColor: themecolor.BOXTHEMECOLOR,
        }}>
        <View
          style={{ height: 'auto', alignItems: 'center', flexDirection: 'row' }}>
          <View
            style={{
              width: 13,
              height: 13,
              borderWidth: 1,
              borderColor: Colors.borderColor1,
              backgroundColor: sliceColor[index],
            }}></View>
          <Text
            style={{
              fontSize: FontSize.labelText,
              color: Colors.black,
              fontFamily: FontFamily.Popinssemibold,
              alignItems: 'flex-start',
              marginLeft: 5,
              color: themecolor.TXTWHITE
            }}>
            {item.c_name} :
            &nbsp;
            <Text
              style={{
                color: Color.Color.TXTWHITE,
                fontSize: 12,
                fontFamily: FontFamily.PopinsRegular,
                color: themecolor.TXTWHITE
              }}>
              <FAIcon name="rupee" size={10} /> {item.c_amount}
            </Text>
          </Text>
        </View>
      </View>
    </>
  );
}

function CategoryWiseOrderReport(props) {

  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()

  const navigation = useNavigation()
  const [categoryData, setCategoryData] = useState([]);
  const [target1, setTarget1] = useState('');
  const [tSales, setTSales] = useState('');
  const [sliceColor, setSliceColor] = useState([]);
  const [series, setSeries] = useState([]);
  const [outletList, setOutletList] = useState([])
  const widthAndHeight = 98;
  // const [typeId, setTypeId] = useState(1)
  var categorySelect = ['MTD', 'QTD', 'YTD'];
  const [placeholder, setPlaceholder] = useState('MTD');
  const [newOptions, setNewOptions] = useState(categorySelect);
  const [selectedCategoryItem, setSelectedCategoryItem] = useState('');

  useEffect(() => {
    if (placeholder == 'MTD') {
      categorySelect = [
        'QTD',
        'YTD',
      ]
    } else if (placeholder == 'QTD') {
      categorySelect = [
        'MTD',
        'YTD',
      ]
    } else if (placeholder == 'YTD') {
      categorySelect = [
        'MTD',
        'QTD',
      ]
    }
    setNewOptions(categorySelect)
  }, [placeholder])

  function CategorySelectedDate() {
    if (selectedCategoryItem == "MTD") {
      const startOfMonth = moment().startOf('month').format('DD-MM-YYYY');
      const endOfMonth = moment().endOf('month').format('DD-MM-YYYY');
      // console.log('mmmmmmmmmmmmmmmmmmmmmmmmmm', startOfMonth, endOfMonth);
      // alert(startOfMonth, endOfMonth)
      CategoryWiseOrder(startOfMonth, endOfMonth);
    }
    else if (selectedCategoryItem == "QTD") {
      const startOfMonth = moment().subtract(3, 'months').format('DD-MM-YYYY');
      const endOfMonth = moment().format('DD-MM-YYYY');
      console.log('<<<<<<<<<<<<<<<<<<<<<<<<😢', startOfMonth, endOfMonth);
      CategoryWiseOrder(startOfMonth, endOfMonth,)
    }

    else if (selectedCategoryItem == "YTD") {
      const startOfMonth = moment().subtract(12, 'months').format('DD-MM-YYYY');
      const endOfMonth = moment().format('DD-MM-YYYY');
      // console.log('>>>>>>>>>>>>>>>>>>>>>>>>🐱‍🏍', startOfMonth, endOfMonth);
      CategoryWiseOrder(startOfMonth, endOfMonth,)
    }
  }

  useEffect(() => {
    CategorySelectedDate();
  }, [selectedCategoryItem,]);

  const CategoryWiseOrder = async (f, t) => {
    let empId = props.EmployeeId;
    const result = await gettripLocationApi(`api/getTargetWiseSales?from_date=${f}&to_date=${t}&employee_id=${empId}`)
    console.log(
      '@@@@@@@@@@@@@1234',
      result,
    );
    // alert(result.statusCode)
    if (result.statusCode == 200) {
      setTarget1(result.data.Target);
      setTSales(result.data.TotalSales);
      let temparr = [];
      Object.keys(result.data.Category).map(i => {
        console.log('i in target ' + i + ' ' + result.data.Category[i]);
        temparr.push({ c_amount: result.data.Category[i], c_name: i });
      });
      // console.log('🤦‍♀️oooooooooooooo===============', temparr);
      setCategoryData(temparr);
      console.log('values of category' + Object.values(result.data.Category));
      let seri = Object.values(result.data.Category);
      setSeries(seri);
      generateColor1(seri.length);
      //   alert(JSON.stringify(Object.values(result.data.Outlets)))
      setOutletList(Object.values(result.data.Outlets))

    } else {
      alert(result.message);
    }
  };

  function generateColor1(num) {
    let colorArr = [];
    for (let i = 0; i < num; i++) {
      const randomColor = Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, '0');
      colorArr.push(`#${randomColor}`);
    }
    setSliceColor(colorArr);
  }

  // const OutletWiseItemSales = async (f, t, outId) => {
  //   const result = await gettripLocationApi(
  //     `api/getOutletWiseItemSales?from_date=${f}-09-01&to_date=${t}&outlet_id=${outId}`,
  //   );
  //   if (result.statusCode == 200) {
  //     setCategoryWiseItemSales(prev => [...prev, result.data.Category]);
  //     setCategoryList(Object.values(result.data.Category));
  //   } else {
  //     alert(result.message);
  //   }
  // };

  useEffect(() => {
    const f = moment().startOf('month').format('DD-MM-YYYY');
    const t = moment().endOf('month').format('DD-MM-YYYY');
    // console.log('??????????????????', f, t);
    CategoryWiseOrder(f, t,);
  }, []);

  return (
    <>
      <View style={styles.DailyCallView}>
        <View>
          <Text style={{ ...styles.CardTextDC, color: themecolor.TXTWHITE }}>{props.heading}</Text>
        </View>
        <View style={{ position: 'absolute', right: 0, zIndex: 9999 }}>
          <NewDropdown
            options={newOptions}
            setSelectedItem={setSelectedCategoryItem}
            toValue={70}
            widthh={85}
            widthPlaceHolder={60}
            widthIcon={10}
            placeholder={placeholder}
            setPlaceholder={setPlaceholder}
          />
        </View>
      </View>
      <View style={{ marginVertical: 2 }} />
      <View
        style={{
          alignSelf: 'center',
          backgroundColor: Colors.white,
          borderWidth: 1,
          borderColor: Colors.borderColor,
          height: 'auto',
          borderRadius: 12,
          overflow: 'hidden',
          width: width * 0.93,
          backgroundColor: themecolor.BOXTHEMECOLOR,
          borderColor: themecolor.BOXBORDERCOLOR1
        }}>
        {categoryData.length > 0 ?
          (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  paddingVertical: 10,
                }}>
                <View
                  style={{
                    width: width * 0.4,
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: 5,
                  }}>
                  <Text style={styles.FlexPoint}>

                    <ProgressCircle
                      percent={Math.floor((tSales / target1) * 100)}
                      radius={50}
                      borderWidth={14}
                      color={Colors.yellowcircle}
                      shadowColor="#f45831"
                      bgColor={themecolor.BOXTHEMECOLOR}>
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
                          color: themecolor.TXTWHITE,
                          fontSize: 9,
                          fontFamily: FontFamily.PopinsRegular,
                        }}>
                        <FAIcon name="rupee" size={9} /> {tSales}
                      </Text>
                    </ProgressCircle>
                  </Text>
                </View>

                <View
                  style={{
                    width: width * 0.45,
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: 5,
                  }}>
                  <View style={styles.FD}>
                    <View
                      style={{
                        width: 12,
                        height: 12,
                        backgroundColor: '#f45831',
                        right: 4
                      }}
                    />
                    <Text style={{ ...styles.TargetText, color: themecolor.TXTWHITE }}>
                      Target:{' '}
                    </Text>
                    <Text
                      style={{
                        ...styles.TargetText2,
                        color: themecolor.BLUEWHITETEXT,
                      }}>
                      <FAIcon name="rupee" size={10} /> {target1}
                    </Text>
                  </View>
                  <View style={styles.FD}>
                    <View
                      style={{
                        width: 12,
                        height: 12,
                        backgroundColor: Colors.yellowcircle,
                        right: 4
                      }}
                    />
                    <Text style={{ ...styles.TargetText, color: themecolor.TXTWHITE }}>
                      Achieved:{' '}
                    </Text>
                    <Text
                      style={{
                        ...styles.TargetText2,
                        color: Color.Color.BLUEWHITETEXT,
                      }}>
                      <FAIcon name="rupee" size={10} /> {tSales}
                    </Text>
                  </View>
                </View>
              </View>

              <Divider width={1} style={{ width: width * 0.85, alignSelf: 'center', color: Colors.borderColor }} />
              <TouchableOpacity
                onPress={() => navigation.push('OutletListCategoryReport', { outletList: outletList })}
                style={{
                  flexDirection: 'row',
                  paddingVertical: 10,
                  backgroundColor: themecolor.BOXTHEMECOLOR,
                  // backgroundColor: 'red',
                  alignItems: 'center',
                  height: 150,
                }}>
                <View
                  style={{
                    width: width * 0.38,
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    // paddingHorizontal: 5,
                  }}>
                  <PieChart
                    widthAndHeight={widthAndHeight}
                    series={series}
                    sliceColor={sliceColor}
                  />
                </View>
                <View style={{ flexDirection: 'column', height: '100%',width:width * 0.56}}>

                  {/* <FlatList
                    data={categoryData}
                    keyExtractor={(_, indx) => indx}
                    renderItem={({ item, index }) => (
                      <GraphCard
                        item={item}
                        index={index}
                        themecolor={themecolor}
                        sliceColor={sliceColor}
                        navigation={navigation}
                      />
                    )}
                    showsHorizontalScrollIndicator={false}
                    scrollEnabled={true}
                  /> */}
                  {
                    categoryData.map((item, index) => <GraphCard
                      key={index}
                      item={item}
                      index={index}
                      themecolor={themecolor}
                      sliceColor={sliceColor}
                      navigation={navigation}
                    />)
                  }

                </View>
              </TouchableOpacity>
            </>) : (
            <NoReportImage width={165} height={165} />)
        }

      </View>
    </>
  );
}

export { CategoryWiseOrderReport };
