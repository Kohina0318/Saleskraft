import React, { useState } from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import styles from '../../assets/css/stylesSearching';
import SearchHeader from '../../components/shared/SearchHeader';
import MCIcon from 'react-native-vector-icons/MaterialIcons';
import { SearchingFLList } from '../../components/SearchingData/SearchProductDataList';
import { getGlobalSearchedData } from '../../repository/commonRepository';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';

// var data =  {
//   "Outlets": [
//     {
//       "Id": 51,
//       "OutletName": "Vega store",
//       "OutletContactName": "Vishal Gupta",
//       "OutletContactNo": "8839082569",

//     },
//     {
//       "Id": 53,
//       "OutletName": "Vega DD Mall",
//       "OutletContactName": "Abhinav Shrivastava",
//       "OutletContactNo": "8839088784", 

//     }
//   ],
//   "Products":[
//     {
//       "Id":5,
//        "ProductName": "Vega DD Mall",
//        "MRP": 313,

//     }
//   ]
// }

export default function Search(props) {

  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  
  const [searchValue, setSearchValue] = useState('');
  const [searchAllData, setSearchAllData] = useState([]);
  const [showResultFound, setShowResultFound] = useState(false);
  console.log("search Value In Search.js---->", searchValue);

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
      <StatusBar translucent backgroundColor="transparent"   />
      <SearchHeader setSearchValue={setSearchValue} searchValue={searchValue} />
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => props.navigation.navigate('SearchAllResult', {
          searchedData: searchAllData
        })}
        style={{...styles.MainVIews, backgroundColor: themecolor.SEARCHSCREEN }}>
        <View style={{ ...styles.touchview, left: 10 }}>
          <TouchableOpacity activeOpacity={0.5}>
            <MCIcon name="search" size={22} color="gray" />
          </TouchableOpacity>
          <View>
            <Text style={styles.SearchText}>Search</Text>
          </View>
        </View>
        <View>

          {
            showResultFound && searchAllData.length == 0 ? (
              <Text style={{...styles.SearchText2,color:"gray"}}> No Result found</Text>
            ) : (<></>)
          }

          {
            showResultFound && searchAllData.length > 0 ? (
              <Text style={{...styles.SearchText2,color:"gray"}}>{searchAllData.length} Result found</Text>
            ) : (<></>)
          }

        </View>
      </TouchableOpacity>
      <View style={{marginTop:5}} />
      <SearchingFLList searchedData={searchAllData} />
      </View>
  );
}
