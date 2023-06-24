import { View, Text, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react';
import styles from '../../assets/css/stylesReport';
import NewDropdown from '../shared/NewDropdown';
import { Colors } from '../../assets/config/Colors';
import PieChart from 'react-native-pie-chart';
const { width } = Dimensions.get('window');
import moment from 'moment';
import FIcon from 'react-native-vector-icons/FontAwesome';
import { gettripLocationApi } from '../../repository/trip/tripRepository';
import { FontFamily } from '../../assets/fonts/FontFamily'
import Accordion from 'react-native-collapsible/Accordion';
import { getEmployeeId } from '../../repository/commonRepository';
import TopSellingDropdown from '../shared/TopSellingDropdown';
import NoReportImage from './NoReportImage';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';

export default function TopSellingReports() {

  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()

  var obj = {}
  const [activeSections, setActiveSections] = useState([]);
  const [accordianicon, setAccordianicon] = useState(false);
  const [targetWiseSalesData, setTargetWiseSalesData] = useState([]);
  const [temp, setTemp] = useState({});
  const [series, setSeries] = useState([]);
  const widthAndHeight = 98;
  const [outletTargetWiseSalesData, setOutletTargetWiseSalesData] = useState([]);
  var topSellingSelect = ['MTD', 'QTD', 'YTD'];
  const [selectedTopSellingItem, setSelectedTopSellingItem] = useState('MTD');
  const [placeholder, setPlaceholder] = useState('MTD', 'TYPE');
  const [newOptions, setNewOptions] = useState(topSellingSelect);
  const [color1, setColor1] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  // const [outType, setOutType] = useState(1);
  const [typeId, setTypeId] = useState(1)

  useEffect(() => {
    if (placeholder == 'MTD') {
      topSellingSelect = [
        'QTD',
        'YTD',
      ]
    } else if (placeholder == 'QTD') {
      topSellingSelect = [
        'MTD',
        'YTD',
      ]
    } else if (placeholder == 'YTD') {
      topSellingSelect = [
        'MTD',
        'QTD',
      ]
    }
    setNewOptions(topSellingSelect)
  }, [placeholder])

  function TopSellingSelectedDate() {

    if (selectedTopSellingItem == "MTD") {
      const startOfMonth = moment().startOf('month').format('DD-MM-YYYY');
      const endOfMonth = moment().endOf('month').format('DD-MM-YYYY');
      // console.log('====================>>>>>>>>>>>>🤦‍♀️', startOfMonth, endOfMonth);
      TargetWiseSales(startOfMonth, endOfMonth, typeId);
    }
    else if (selectedTopSellingItem == "QTD") {
      const startOfMonth = moment().subtract(3, 'months').format('DD-MM-YYYY');
      const endOfMonth = moment().format('DD-MM-YYYY');
      console.log('<<<<<<<<<<<<<<<<<<<<<<<<😢', startOfMonth, endOfMonth);
      TargetWiseSales(startOfMonth, endOfMonth, typeId)
    }
    else if (selectedTopSellingItem == "YTD") {
      const startOfMonth = moment().subtract(12, 'months').format('DD-MM-YYYY');
      const endOfMonth = moment().format('DD-MM-YYYY');
      // console.log('>>>>>>>>>>>>>>>>>>>>>>>>🐱‍🏍', startOfMonth, endOfMonth);
      TargetWiseSales(startOfMonth, endOfMonth, typeId)
    }
  }

  useEffect(() => {
    TopSellingSelectedDate();
  }, [selectedTopSellingItem, typeId]);

  const renderHeader = sections => {
    // console.log("Sectionnnnnnnnnnnnnnnnnn========================😒", sections)
    const generateColor = () => {
      const randomColor = Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, '0');
      return `#${randomColor}`;
    };

    var avatarName = '';
    var key = Object.keys([sections])
    if (key != null) {
      console.log('>>>>>>>>>>>>>>>>>>>>------<<<<<<<<<<<<<<<<<<<<<<', sections)
      // avatarName = `${(key[0].slice(1, 1)).toUpperCase()}`;
      avatarName = ((sections.ShopName).length >= 1) ? sections.ShopName[0]?.slice(0, 1).toUpperCase() : ''
    }

    return (
      <View
        style={{
          paddingVertical: 10,
          borderBottomWidth: 1,
          borderBottomColor: '#E9E8E8',
          flexDirection: 'row',
          marginBottom: 30,
          width: width * 0.85,
          alignSelf: 'center',
        }}>
        <View
          style={{
            width: 60,
            height: 60,
            borderRadius: 33,
            // backgroundColor: sections.color,
            backgroundColor: generateColor(),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 20 }}>
            {avatarName}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '82%',
          }}>
          <View style={{ marginLeft: 8 }}>
            <Text
              style={{
                fontFamily: FontFamily.Popinssemibold,
                color: Colors.black,
                color: themecolor.TXTWHITE
              }}>
              {sections.ShopName}
            </Text>
            <Text style={{ color: Colors.black, fontSize: 12 ,color: themecolor.TXTWHITE}}>
              Total Value:  <FIcon name="rupee" size={12} /> {(sections.totalSale == null) ? 0 : sections.totalSale}
            </Text>
          </View>
          <View>
            <FIcon
              name={!accordianicon ? 'angle-down' : 'angle-up'}
              color={Colors.bluetheme}
              size={30}
            />
          </View>
        </View>
      </View>

    );
  };

  function RenderContent({ data }) {

    return (
      <>
        <View style={{ alignSelf: 'center', height: 'auto', flexDirection: 'row', }}>
          <View style={{ flex: 0.5, alignItems: 'center' }}>
            <View style={{ borderRadius: 80, position: 'relative', borderWidth: 1, borderColor: Colors.borderColor1 }}>
              <PieChart
                widthAndHeight={widthAndHeight}
                series={series}
                sliceColor={color1}
              />
            </View>
            {(data != undefined) &&
              Object.keys(data).map((i, j) => {
                return (
                  <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <View style={{
                      width: 12, height: 12, borderColor: Colors.borderColor1, borderWidth: 1,alignItems:'center',justifyContent:'center',marginTop:2,
                      backgroundColor: color1[j]
                    }} />
                    <View style={{ marginHorizontal: 4 }} />
                    <Text style={{ color: 'black', fontSize: 12, fontFamily: FontFamily.PopinsMedium ,color: themecolor.TXTWHITE}}>
                      {i + ' : ' + data[i]}
                    </Text>
                  </View>
                )
              })
            }
          </View>
        </View>
        <View style={{ marginVertical: 10 }} />
      </>
    );
  };

  const updateSections = activeSections => {

    if (obj.hasOwnProperty(`${activeSections}`)) {
      setAccordianicon(!accordianicon);
      setActiveSections(activeSections);

    } else {
      try {
        setAccordianicon(!accordianicon);
        obj[activeSections] = true;
        setTemp(outletTargetWiseSalesData[activeSections])
        setSeries(Object.values(outletTargetWiseSalesData[activeSections]))
        setActiveSections(activeSections);
      } catch (err) {
        console.log('Accordian error' + err)
      }
    }
  };

  const TargetWiseSales = async (f, t, typeId) => {
    // alert('typeId is '+typeId)
    let empId = await getEmployeeId()
    const result = await gettripLocationApi(`api/getTargetWiseSales?from_date=${f}&to_date=${t}&employee_id=${empId}&outlet_type_id=${typeId}`)
    console.log(">>>>>>>>>>>>>>>>>=====<<<<<<<<<<<", result)
    if (result.statusCode == 200) {
      let temparr = []
      Object.keys(result.data.Outlets).map((i) => {
        console.log("i in target ", i)
        temparr.push({ 'ShopName': i, "totalSale": result.data.Outlets[i].TotalSales })
      })
      Object.values(result.data.Outlets).map(async (i) => {
        await OutletTargetWiseSales(f, t, i.Outlet_id)
      })
      console.log('temp34>>>>>>>>>>>>>>>>>>>>>>>>>>values', Object.values(result.data.Outlets))
      setTargetWiseSalesData(temparr)
    }
    else {
      alert(result.message)
    }
  };

  function generateColor1(num) {
    let colorArr = []
    for (let i = 0; i < num; i++) {
      const randomColor = Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, '0');
      colorArr.push(`#${randomColor}`);
    }
    setColor1(colorArr)
  };

  const OutletTargetWiseSales = async (f, t, outId) => {
    const result = await gettripLocationApi(`api/getOutletTargetWiseSales?from_date=${f}&to_date=
      ${t}&outlet_id=${outId}`)
    console.log(">>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<✌✌", result)
    if (result.statusCode == 200) {
      setOutletTargetWiseSalesData(prev => ([...prev, result.data.Category]))
      setCategoryList(Object.values(result.data.Category))
      generateColor1(Object.values(result.data.Category).length)
    }
    else {
      alert(result.message)
    }
  };

  // const getOutletTypes = async () => {
  //   let res = await getOutLatesTypes();
  //   console.log('=============ddddddddddddddddd', res.data);
  //   setOutLatesTypes(res.data)
  // };

  useEffect(() => {
    const f = moment().startOf('month').format('DD-MM-YYYY');
    const t = moment().endOf('month').format('DD-MM-YYYY');
    TargetWiseSales(f, t, typeId)
    // getOutletTypes();
  }, []);

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
          <Text style={{ ...styles.CardText ,color: themecolor.TXTWHITE}}>Top Selling</Text>
        </View>

        <View style={{ position: 'absolute', right: 0, zIndex: 9999, flexDirection: 'row' }}>
          <View>
            {/* <NewDropdown
            options={['a','b','c']}
            setSelectedItem={setOutType}
            toValue={70}
            widthh={118}
            widthPlaceHolder={90}
            widthIcon={10}
            placeholder={placeholder}
            setPlaceholder={setPlaceholder}
          /> */}
            <TopSellingDropdown setSelectedItem1={setTypeId} />
          </View>

          <View style={{ marginHorizontal: 4 }} />
          <View>
            <NewDropdown
              options={newOptions}
              setSelectedItem={setSelectedTopSellingItem}
              toValue={70}
              widthh={85}
              widthPlaceHolder={60}
              widthIcon={10}
              selectedPendingItem={selectedTopSellingItem}
              placeholder={placeholder}
              setPlaceholder={setPlaceholder}
            />
          </View>
        </View>
      </View>
      <View
        style={{
          ...styles.accordian,
          marginTop: 4,
          borderWidth: 1,
          borderColor: '#E9E9E9',
          backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR1
        }}>
        {targetWiseSalesData.length > 1 ?
          <Accordion
            activeSections={activeSections}
            sections={targetWiseSalesData}
            underlayColor="white"
            enablePointerEvents={true}
            style={{ borderBottomWidth: 1, borderBottomColor: '#E9E8E8' }}
            renderHeader={renderHeader}
            renderContent={() =>
              <RenderContent data={temp} setTemp={setTemp} color1={color1} setColor1={setColor1} />
            }
            onChange={
              updateSections}
          /> : (
            <View style={{ justifyContent: 'center', marginTop: 0 }} >
              <NoReportImage width={160} height={160} />
            </View>
          )}

      </View>
      {/* <View
              style={{ marginTop: 20, alignItems: 'flex-end', marginBottom: 5 }}>
              <TouchableOpacity
                style={{
                  backgroundColor: Colors.bluetheme,
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 12,
                  paddingVertical: 0,
                  justifyContent: 'space-between',
                  borderRadius: 15,
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 12,
                    fontFamily: FontFamily.PopinsRegular,
                  }}>
                  view all
                </Text>
                <Text style={{ left: 5 }}>
                  <FIcon name="angle-right" size={14} color={'white'} />
                </Text>
              </TouchableOpacity>
            </View> */}
    </View>
  )
}