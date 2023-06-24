import React, { useState } from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import styles from '../../assets/css/stylesSearching';
import SearchHeader from '../../components/shared/SearchHeader';
import { FontFamily } from '../../assets/fonts/FontFamily';
import { SearchingFLList, FlatListProductD, FlatListOUTLETSD } from '../../components/SearchingData/SearchProductDataList';
import { getGlobalSearchedData } from '../../repository/commonRepository';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';

export default function SearchAllResult(props) {
  //   const navigation = useNavigation();
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
 
  const [selected, setselected] = useState(1);
  const [searchAllData, setSearchAllData] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [showResultFound, setShowResultFound] = useState(false);

  React.useEffect(() => {
    if (props.route.params != undefined) {
      setSearchAllData(props.route.params.searchedData);
    }
  }, [])

  const fetchSearchedData = async () => {
    let res = await getGlobalSearchedData(searchValue);
    if (res.statusCode == 200) {
      var arr = [];
      Object.keys(res.data).forEach(key => {
        res.data[key].forEach(item1 => {
          item1["dataType"] = key;
          arr.push(item1);
        })
      })


      if (arr.length == 0) {
        setSearchAllData(arr);
        setShowResultFound(true);
        //  alert("No Data Found");
      } else {
        setShowResultFound(true);
        setSearchAllData(arr);
        console.log('arrrrrr In Search.js =====>', arr)
      }
    }
  }

  React.useEffect(() => {
    if (searchValue.length >= 3) {
      fetchSearchedData();
    }
  }, [searchValue])


  const handleSingleIndexSelect = index => {
    setSelectedIndex(index);
    if (index === 1) {
      setIndex(1);
    } else {
      setIndex(0);
    }
  };

  return (
    <View style={{backgroundColor:themecolor.THEMECOLOR,flex:1}}>
      <StatusBar translucent backgroundColor="transparent" />
      <SearchHeader setSearchValue={setSearchValue} searchValue={searchValue} />
      <View style={{ ...styles.BlueView4Menu, backgroundColor: themecolor.SEARCHSCREEN }}>
        <View style={styles.BlueView4MenuAlign}>

          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => setselected(1)}
            style={{ justifyContent: 'center' }}>
            <Text
              style={{
                ...styles.CardText,
                fontFamily: FontFamily.Popinssemibold,
                color: selected == 1 ? '#0887fc' : '#666',
              }}>
              All Results
            </Text>
          </TouchableOpacity>


          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => setselected(2)}
            style={{ justifyContent: 'center' }}>
            <Text
              style={{
                ...styles.CardText,
                color: selected == 2 ? '#0887fc' : '#666',
              }}>
              Outlets
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => setselected(3)}
            style={{ justifyContent: 'center' }}>
            <Text
              style={{
                ...styles.CardText,
                color: selected == 3 ? '#0887fc' : '#666',
              }}>
              Expense
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => setselected(4)}
            style={{ justifyContent: 'center' }}>
            <Text
              style={{
                ...styles.CardText,
                color: selected == 4 ? '#0887fc' : '#666',
              }}>
              Products
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => setselected(5)}
            style={{ justifyContent: 'center' }}>
            <Text
              style={{
                ...styles.CardText,
                color: selected == 5 ? '#0887fc' : '#666',
              }}>
              Case
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.MV5} />

      {/* All Outlets */}
      {selected == 1 && <SearchingFLList searchedData={searchAllData} />}
      {/* Outlets */}
      {selected == 2 && <FlatListOUTLETSD searchedData={[]} />}
      {/*Expense  */}
      {selected == 3 && <FlatListProductD searchedData={[]} />}
      {/*Products  */}
      {selected == 4 && <FlatListProductD searchedData={searchAllData} />}
      {/*Case  */}
    </View>
  );
}
