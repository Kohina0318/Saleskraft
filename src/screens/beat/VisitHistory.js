import React from 'react';
import {
  StatusBar,
  View,
  ScrollView,
  TextInput,
  Text,
  Dimensions
} from 'react-native';
import styles from '../../assets/css/stylesDashboardBA';
import { VisitHistoryList } from '../../components/shared/BeatComponent';
import Header_2 from '../../components/shared/Header_2';
import { getOutletHistory } from '../../repository/outlet/OutletRepositoy';
import { FontFamily } from '../../assets/fonts/FontFamily';
import { useToast } from 'react-native-toast-notifications';
import FIcon from 'react-native-vector-icons/FontAwesome';
import LoaderAllInOne from '../../components/shared/Loader';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { VisitHistoryListShimmer } from '../../components/Beat_outlet/ProductCategoriesListShimmer';
const { width } = Dimensions.get('window');

export default function VisitHistory(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  const toast = useToast();
  const network = useSelector(state => state.network);
  const [visitHistoryData, setVisitHistoryData] = React.useState([]);
  const [visitHistoryDataSearch, setVisitHistoryDataSearch] = React.useState([]);
  const [loader, setLoader] = React.useState(false);

  const fetchHistory = async () => {
    try {
      if (network) {
        let res = await getOutletHistory(props.route.params.outletId);
        console.log("res in getOutletHistory Line 19----->", res)
        if (res.statusCode == 200) {
          setVisitHistoryData(res.data);
          setVisitHistoryDataSearch(res.data)
          setLoader(false);
        }
        else {
          toast.show(`${res.message}`, {
            type: 'danger',
            placement: 'bottom',
            duration: 3000,
            offset: 30,
            animationType: 'slide-in',
          });
          setLoader(false);
        }
      }
      else {
        toast.show('No internet', {
          type: 'danger',
          placement: 'bottom',
          duration: 3000,
          offset: 30,
          animationType: 'slide-in',
        });
        setLoader(false);
      }


    } catch (e) {
      console.log("ERRR in catch ", e)
    }
  }

  React.useEffect(() => {
    setLoader(true)
  }, [])

  React.useEffect(() => {
    fetchHistory()
  }, [])

  const filtering = async (search) => {
    console.log("Inside Filtering---->", search)
    var temp = visitHistoryDataSearch.filter(item => {
      return (
        item.EmployeeRelatedByEmpId.FirstName.toLowerCase().includes(search.toLowerCase())
      )
    })
    setVisitHistoryData(temp);
  }

  return (
    <>
      {/* {loader ? (
        <>
          <LoaderAllInOne />
          <VisitHistoryListShimmer/>
        </>
       ) : (
        <></>
      )} */}
      <View style={{ ...styles.bg, backgroundColor: themecolor.THEMECOLOR }}>
        <StatusBar translucent backgroundColor="transparent" />
        <View>
          <Header_2 title={"Visit History"} iconname="" onPress={() => props.navigation.goBack()} />
          <View style={{ marginVertical: 4 }} />
          
          <View
            style={{
              backgroundColor: 'white',
              flexDirection: 'row',
              alignItems: 'center',
              borderRadius: 10,
              backgroundColor: themecolor.BOXTHEMECOLOR,
              borderColor: themecolor.BOXBORDERCOLOR1,
              borderWidth: 0.5,
              width: width * 0.94,
              alignSelf: 'center'
            }}>
            <Text style={{ paddingHorizontal: 10, top: -2, left: 2 }}>
              <FIcon name="search" size={12} color={themecolor.AV2} />
            </Text>
            <TextInput
              onChangeText={text => filtering(text)}
              placeholder="Search"
              style={{
                width: width * 0.8,
                fontFamily: FontFamily.PopinsRegular,
                color: themecolor.AV2
              }}
              placeholderTextColor={themecolor.AV2}
            />
          </View>

          {loader ? (
            <VisitHistoryListShimmer />
          ) : (
            <View style={{...styles.MV5,}} >
              <View
                style={styles.H}>
                <View
                  style={styles.view}>
                  <VisitHistoryList data={visitHistoryData} />
                </View>
              </View>
            </View>
          )
          }
        </View >
      </View >
    </>
  )
}


