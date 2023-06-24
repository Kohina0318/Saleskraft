import {
  View,
  Dimensions, Text, TextInput, TouchableOpacity, Image
} from 'react-native';
import React from 'react';
import styles from '../../assets/css/styleCalls';
import { CallsFlatList } from './CallsFlatList';
import NoData from '../../components/shared/NoData';
import { Colors } from '../../assets/config/Colors';
import { FontFamily } from '../../assets/fonts/FontFamily';
import { FontSize } from '../../assets/fonts/Fonts';
import FIcon from 'react-native-vector-icons/FontAwesome';
const { width } = Dimensions.get('screen');
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';
import { gettripLocationApi } from '../../repository/trip/tripRepository';
import { getEmployeeId } from '../../repository/commonRepository';
// import Header_2 from '../../components/shared/Header_2';

export default function Calls(props) {

  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  // console.log("DailyCalls===----------_+++++++", props.route.params);
  const [sCall, setSCall] = useState([]);
  const [data, setData] = React.useState(props.route.params.data)
  const [searchData, setSearchData] = React.useState(props.route.params.data)

  const filtering = async (search) => {
    console.log("searching txt", search);

    var temp = searchData.filter(item => {
      return (
        item.Outlets.OutletName.toLowerCase().includes(search.toLowerCase())
      )
    })
    setData(temp);
  }

  const handleScheduleCalls = async (t) => {
    let empId = await getEmployeeId()
    try {
      var res = await gettripLocationApi(
        `api/getScheduleCallsData?date=${t}&employee_id=${empId}`,
      );
      console.log('@@@@@@@@scheduleCalldata', res.data);
      if (res.statusCode === 200) {
        setSCall(res.data);
      }
    } catch (e) {
      console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>', e);
    }
  };

  useEffect(() => {
    const t = moment().format('YYYY-MM-DD')
    handleScheduleCalls(t)
  }, [])

  return (
    <View style={{ ...styles.MainView, backgroundColor: themecolor.THEMECOLOR }}>
      {/* <StatusBar translucent backgroundColor="transparent" /> */}

      {/* <Header_2 title={props.route.params.heading} Size={18} onPress={() => props.navigation.goBack()} /> */}
      <View style={{
        width: width,
        height: 90,
        backgroundColor: themecolor.HEADERTHEMECOLOR,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
      }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          padding: 15,
          flex: 1,
          width: width,
          alignSelf: 'center',
        }}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <TouchableOpacity activeOpacity={0.5} onPress={() => props.navigation.goBack()}>
              <Image
                source={require('../../assets/images/back.png')}
                style={{
                  width: 20,
                  height: 20,
                }}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
            <View>
              <Text
                style={{
                  fontSize: FontSize.labelText4,
                  fontFamily: FontFamily.PopinsMedium,
                  color: Colors.white,
                  top: 1,
                  alignSelf: props.Calign,
                  marginHorizontal: 10,
                }}>
                {props.route.params.heading}
                - ({props.route.params.count})
              </Text>
            </View>
          </View>

        </View>
      </View>
      <View>

        <View style={{ paddingVertical: 5 }} />
        <View style={{ ...styles.SearchInputView, width: width * 0.92 }}>
          <Text style={styles.PH10}>
            <FIcon name="search" size={15} />
          </Text>
          <TextInput
            onChangeText={text => filtering(text)}
            placeholder="Search Outlets" style={styles.InputText} />
        </View>

      </View>
      {data.length >= 1 ?
        <CallsFlatList view={props.route.params.view} list={props.route.params.list} data={data} heading={props.route.params.heading} count={props.route.params.count} />
        : <NoData message={'No data available'} />}

    </View>

  )
}