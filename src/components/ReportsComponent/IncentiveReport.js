import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import styles from '../../assets/css/stylesReport';
import NewDropdown from '../../components/shared/NewDropdown';
import { Colors } from '../../assets/config/Colors';
import FIcon from 'react-native-vector-icons/FontAwesome';
import { FontFamily } from '../../assets/fonts/FontFamily';
import moment from 'moment';
import NoReportImage from './NoReportImage';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';

//Render function of FlatList
function IncentiveList({ item, incentiveFilter ,themecolor}) {
  const [GraphHeight, setGraphHeight] = React.useState(0)

  React.useEffect(() => {
    if (incentiveFilter == 1) {
      if (item.Incentive == 0) {
        setGraphHeight(5)
      } else if (item.Incentive > 0 && item.Incentive < 500) {
        setGraphHeight(10)
      }
      else if (item.Incentive > 500 && item.Incentive < 1200) {
        setGraphHeight(15)
      }
      else if (item.Incentive > 1200 && item.Incentive < 2000) {
        setGraphHeight(20)
      }
      else if (item.Incentive > 2000 && item.Incentive < 2500) {
        setGraphHeight(23)
      }
      else if (item.Incentive > 2500 && item.Incentive < 3000) {
        setGraphHeight(25)
      }
      else if (item.Incentive > 3000 && item.Incentive < 3500) {
        setGraphHeight(27)
      }
      else if (item.Incentive > 3500 && item.Incentive < 4000) {
        setGraphHeight(30)
      }
      else if (item.Incentive > 4000 && item.Incentive < 4500) {
        setGraphHeight(33)
      }
      else if (item.Incentive > 4500 && item.Incentive < 5000) {
        setGraphHeight(36)
      }
      else if (item.Incentive > 5000 && item.Incentive < 5500) {
        setGraphHeight(39)
      }
      else if (item.Incentive > 5500 && item.Incentive < 6000) {
        setGraphHeight(42)
      }
      else if (item.Incentive > 6000 && item.Incentive < 6500) {
        setGraphHeight(45)
      }
      else if (item.Incentive > 6500 && item.Incentive < 7000) {
        setGraphHeight(48)
      }
      else if (item.Incentive > 7000 && item.Incentive < 7500) {
        setGraphHeight(51)
      }
      else if (item.Incentive > 7500 && item.Incentive < 8000) {
        setGraphHeight(54)
      }
      else if (item.Incentive > 8000 && item.Incentive < 8500) {
        setGraphHeight(57)
      }
      else if (item.Incentive > 8500 && item.Incentive < 9000) {
        setGraphHeight(60)
      }
      else if (item.Incentive > 9000 && item.Incentive < 10000) {
        setGraphHeight(65)
      }
      else if (item.Incentive > 10000 && item.Incentive < 11000) {
        setGraphHeight(70)
      }
      else if (item.Incentive > 11000 && item.Incentive < 12000) {
        setGraphHeight(75)
      }
      else if (item.Incentive > 12000 && item.Incentive < 13000) {
        setGraphHeight(80)
      }
      else if (item.Incentive > 13000 && item.Incentive < 14000) {
        setGraphHeight(85)
      }
      else if (item.Incentive > 14000 && item.Incentive < 15000) {
        setGraphHeight(90)
      }
      else if (item.Incentive > 15000 && item.Incentive < 20000) {
        setGraphHeight(100)
      }
      else if (item.Incentive > 20000 && item.Incentive < 25000) {
        setGraphHeight(110)
      }
      else if (item.Incentive > 25000 && item.Incentive < 30000) {
        setGraphHeight(120)
      }
      else if (item.Incentive > 30000 && item.Incentive < 35000) {
        setGraphHeight(130)
      }
      else if (item.Incentive > 35000 && item.Incentive < 40000) {
        setGraphHeight(140)
      }
      else {
        setGraphHeight(145)
      }
    } else {
      if (item.Percentage == 0) {
        setGraphHeight(5)
      } else if (item.Percentage > 0 && item.Percentage < 0.5) {
        setGraphHeight(8)
      }
      else if (item.Percentage > 0.5 && item.Percentage < 1) {
        setGraphHeight(6)
      }
      else if (item.Percentage > 1 && item.Percentage < 1.5) {
        setGraphHeight(9)
      }
      else if (item.Percentage > 1.5 && item.Percentage < 2) {
        setGraphHeight(12)
      }
      else if (item.Percentage > 2 && item.Percentage < 2.5) {
        setGraphHeight(15)
      }
      else if (item.Percentage > 2.5 && item.Percentage < 3) {
        setGraphHeight(18)
      }
      else if (item.Percentage > 3 && item.Percentage < 3.5) {
        setGraphHeight(21)
      }
      else if (item.Percentage > 3.5 && item.Percentage < 4) {
        setGraphHeight(24)
      }
      else if (item.Percentage > 4 && item.Percentage < 4.5) {
        setGraphHeight(27)
      }
      else if (item.Percentage > 4.5 && item.Percentage < 5) {
        setGraphHeight(30)
      }
      else if (item.Percentage > 5 && item.Percentage < 5.5) {
        setGraphHeight(33)
      }
      else if (item.Percentage > 5.5 && item.Percentage < 6) {
        setGraphHeight(36)
      }
      else if (item.Percentage > 6 && item.Percentage < 6.5) {
        setGraphHeight(39)
      }
      else if (item.Percentage > 6.5 && item.Percentage < 7) {
        setGraphHeight(42)
      }
      else if (item.Percentage > 7 && item.Percentage < 7.5) {
        setGraphHeight(45)
      }
      else if (item.Percentage > 7.5 && item.Percentage < 8) {
        setGraphHeight(48)
      }
      else if (item.Percentage > 8 && item.Percentage < 8.5) {
        setGraphHeight(51)
      }
      else if (item.Percentage > 8.5 && item.Percentage < 9) {
        setGraphHeight(54)
      }
      else if (item.Percentage > 9 && item.Percentage < 9.5) {
        setGraphHeight(57)
      }
      else if (item.Percentage > 9.5 && item.Percentage < 10) {
        setGraphHeight(60)
      }
      else if (item.Percentage > 10 && item.Percentage < 15) {
        setGraphHeight(63)
      }
      else if (item.Percentage > 15 && item.Percentage < 20) {
        setGraphHeight(66)
      }
      else if (item.Percentage > 20 && item.Percentage < 25) {
        setGraphHeight(69)
      }
      else if (item.Percentage > 25 && item.Percentage < 30) {
        setGraphHeight(72)
      }
      else if (item.Percentage > 30 && item.Percentage < 35) {
        setGraphHeight(75)
      }
      else if (item.Percentage > 35 && item.Percentage < 40) {
        setGraphHeight(78)
      }
      else if (item.Percentage > 40 && item.Percentage < 45) {
        setGraphHeight(81)
      }
      else if (item.Percentage > 45 && item.Percentage < 50) {
        setGraphHeight(84)
      }
      else if (item.Percentage > 50 && item.Percentage < 55) {
        setGraphHeight(87)
      }
      else if (item.Percentage > 55 && item.Percentage < 60) {
        setGraphHeight(90)
      }
      else if (item.Percentage > 60 && item.Percentage < 65) {
        setGraphHeight(93)
      }
      else if (item.Percentage > 65 && item.Percentage < 70) {
        setGraphHeight(96)
      }
      else if (item.Percentage > 70 && item.Percentage < 75) {
        setGraphHeight(99)
      }
      else if (item.Percentage > 75 && item.Percentage < 80) {
        setGraphHeight(105)
      }
      else if (item.Percentage > 80 && item.Percentage < 85) {
        setGraphHeight(115)
      }
      else if (item.Percentage > 85 && item.Percentage < 90) {
        setGraphHeight(125)
      }
      else if (item.Percentage > 90 && item.Percentage < 100) {
        setGraphHeight(135)
      }
      else if (item.Percentage > 100 && item.Percentage < 110) {
        setGraphHeight(140)
      }
      else {
        setGraphHeight(145)
      }
    }


  }, [incentiveFilter])

  return (
    <>
    <View
      style={{
        //   width: '70%',
        // flex:1,
        alignItems: 'center',
        alignSelf: 'flex-end',
        padding: 5
      }}>
      {incentiveFilter == 1 ? (
        <View style={{ justifyContent: 'center' }}>
          <Text style={{ color: '#F45831',color: themecolor.TXTWHITE }}>{item.Incentive}</Text>
        </View>
      ) : (
        <View style={{ justifyContent: 'center' }}>
          <Text style={{ color: '#F45831',color: themecolor.TXTWHITE }}>{item.Percentage}</Text>
        </View>
      )}

      <View
        style={{
          width: 45,
          height: GraphHeight,
          backgroundColor: '#F45831',
          borderBottomWidth: 1,
        }}
      />
      <View style={{ marginTop: 10 }}>
        <View style={{ width: 110 }}>
          <View style={{ alignSelf: 'center', justifyContent: 'center' }}>
            <Text
              style={{
                fontSize: 11,
                fontWeight: 'bold',
                fontFamily: FontFamily.PopinsMedium,
                color: Colors.black,
              }}>
              {item.Month}
            </Text>
          </View>
        </View>
      </View>
    </View>
    </>
  );
}

export default function IncentiveReport(props) {

  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()

  var incentiveSelect = ['MTD', 'QTD', 'YTD'];

  const [selectedIncentiveItem, setSelectedIncentiveItem] = useState('MTD');
  const [incentiveFilter, setIncentiveFilter] = useState(1);
  const [incentiveData, setIncentiveData] = useState([]);
  const [placeholder, setPlaceholder] = useState('MTD');
  const [newOptions, setNewOptions] = useState(incentiveSelect);
// alert(selectedIncentiveItem)

  useEffect(() => {
    if (placeholder == 'MTD') {
      incentiveSelect = [
        "QTD",
        "YTD"
      ]
    } else if (placeholder == 'QTD') {
      incentiveSelect = [
        "MTD",
        "YTD"
      ]
    } else if (placeholder == 'YTD') {
      incentiveSelect = [
        "MTD",
        "QTD",
      ]
    }
    setNewOptions(incentiveSelect)
  }, [placeholder])

  const Incentive = async (sd,ed) => {
    try {
      var res = await getInc
      entive(sd,ed);
      // console.log('Incentive....page in Report..... line 710', res);
      if (res.statusCode === 200) {
        setIncentiveData(res.data);
      }
    } catch (e) {
      console.log('Incentive....page in Report.>>:', e);
    }
  };

  React.useEffect(() => {
    if(selectedIncentiveItem === 'MTD'){
      let sd = moment().startOf('months').format('YYYY-MM-DD');
      let ed = moment().endOf('months').format('YYYY-MM-DD');
      Incentive(sd,ed);

    }else if(selectedIncentiveItem === 'QTD'){
      let sd = moment().subtract(3,'months').format('YYYY-MM-DD');
      let ed = moment().endOf('months').format('YYYY-MM-DD');
      // alert(sd)
      Incentive(sd,ed);
    }else if(selectedIncentiveItem === 'YTD'){
      let sd = moment().subtract(12,'months').format('YYYY-MM-DD');
      let ed = moment().endOf('months').format('YYYY-MM-DD');
      Incentive(sd,ed);
    }
  }, [selectedIncentiveItem])

  return (
    <View >
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          position: 'relative',
        }}>
        <View>
          <Text style={{ ...styles.CardText,color: themecolor.TXTWHITE }}>Incentive</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View
            style={{
              position: 'absolute',
              zIndex: 9999,
              right: 0,
              marginRight: 60,
            }}>
            <NewDropdown
              options={newOptions}
              setSelectedItem={setSelectedIncentiveItem}
              toValue={70}
              widthh={85}
              widthPlaceHolder={60}
              widthIcon={10}
              placeholder={placeholder}
              setPlaceholder={setPlaceholder}
            />
          </View>

          <View
            style={{
              width: 55,
              alignSelf: 'center',
              backgroundColor: Colors.white,
              borderWidth: 1,
              overflow: 'hidden',
              borderColor: themecolor.HEADERTHEMECOLOR,
              height: 25,
              borderRadius: 15,
            }}>
            <View
              style={{
                justifyContent: 'space-between',
                flex: 1,
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => setIncentiveFilter(1)}
                style={{
                  justifyContent: 'center',
                  backgroundColor:
                    incentiveFilter == 1 ? themecolor.HEADERTHEMECOLOR : '#FFF',
                  padding: 3,
                  height: 25,
                  width: 27.5,
                  borderTopLeftRadius: 10,
                  borderBottomLeftRadius: 10,
                }}>
                <Text
                  style={{
                    ...styles.CardText,
                    color: incentiveFilter == 1 ? '#FFF' : themecolor.HEADERTHEMECOLOR,
                    fontSize: 10,
                  }}>
                  <FIcon name="rupee" />
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => setIncentiveFilter(2)}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor:
                    incentiveFilter == 2 ? themecolor.HEADERTHEMECOLOR : '#FFF',
                  // padding: 3,
                  // height: 25,
                  width: 30,
                  borderTopRightRadius: 10,
                  borderBottomRightRadius: 10,
                }}>
                <Text
                  style={{
                    ...styles.CardText,
                    color: incentiveFilter == 2 ? '#FFF' : themecolor.HEADERTHEMECOLOR,
                    fontSize: 10,
                  }}>
                  <FIcon name="percent" size={10} />
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <View
        style={{
          ...styles.customChart,
          borderWidth: 1,
          borderColor: '#E9E9E9',
          alignContent: 'flex-end',
          justifyContent: 'space-between',
          flex: 1,
          backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR1
          //backgroundColor:"red"
        }}>
          {
            incentiveFilter.length>=1?
            <FlatList
              data={incentiveData}
              renderItem={({ item }) => (
                <IncentiveList item={item} incentiveFilter={incentiveFilter} themecolor={themecolor} />
              )}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
            :
            <View style={{justifyContent:'center',alignItems:'center',width:'100%'}} >
             <NoReportImage width={160} height={160}/>
            </View>

          }
      </View>
    </View>
  )
}