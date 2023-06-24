import React, { useRef, useEffect, useState } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  Animated,
} from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import styles from '../../assets/css/styleCreateTour';
import { Colors } from '../../assets/config/Colors';
import { getOutLatesTypes } from '../../repository/outlet/OutletRepositoy';
import Color, { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';

function Item({
  options,
  setSelectedItem,
  pholder,
  setPholder,
  filterTypeData,
  allData,
  themecolor
}) {
  const [open, setOpen] = useState(true);
  const [collapsed, setCollapsed] = useState(true);

  const [maxLines, setMaxLines] = useState(2);
  const animationHeight = useRef(new Animated.Value(0)).current;

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const collapseView = () => {
    Animated.timing(animationHeight, {
      duration: 0,
      toValue: 17,
    }).start();
  };

  const expandView = () => {
    setMaxLines(null);
    Animated.timing(animationHeight, {
      duration: 0,
      toValue: 80,
    }).start();
  };

  useEffect(() => {
    if (collapsed) {
      collapseView();
    } else {
      expandView();
    }
    setOpen(!open);
  }, [collapsed]);

  //   const onpressfun = (t, i) => {
  //     // setPlaceholder(t)

  //     toggleCollapsed();
  //   };

  return (
    <TouchableOpacity onPress={toggleCollapsed}>
      <View
        style={{
          ...styles.itemV,
          backgroundColor: Colors.bluetheme,
          width: 105,
          borderRadius: 14,
          //   alignSelf: 'flex-end',
          overflow: 'hidden',
          padding: 2.5,
          backgroundColor: themecolor.HEADERTHEMECOLOR
        }}>
        <Animated.View style={{ maxHeight: animationHeight }}>
          <Text style={{ ...styles.paragraph }} numberOfLines={maxLines}>
            <View
              style={{
                width: 115,
                overflow: 'hidden',
                height: 'auto',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  width: 115,
                  alignItems: 'center',

                  position: 'relative',
                  right: 10,
                }}>
                <View style={{}}>
                  <Text style={{ color: 'white', left: 15, fontSize: 11 }}>
                    {pholder}
                  </Text>
                </View>
                <View style={{ position: 'absolute', right: 10 }}>
                  <View onPress={() => { }} style={{ justifyContent: 'center' }}>
                    {open == false ? (
                      <FAIcon
                        name="caret-down"
                        size={18}
                        style={{ color: 'white' }}
                      />
                    ) : (
                      <FAIcon
                        name="caret-up"
                        size={18}
                        style={{ color: 'white' }}
                      />
                    )}
                  </View>
                </View>
              </View>
            </View>
            <View>
              {options.map((i, ind) => {
                return (
                  <TouchableOpacity
                    key={ind}
                    onPress={() => {
                      setSelectedItem(i.OutlettypeId);
                      filterTypeData(allData, i.OutlettypeName);
                      setPholder(i.OutlettypeName);
                      setCollapsed(!collapsed);
                    }}>
                    <Text style={{ left: 5, color: 'white', fontSize: 12 }}>
                      {i.OutlettypeName}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </Text>

          <View style={{ marginVertical: 1 }} />
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
}

export default function TopSellingDropdown(props) {

  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  const {
    options,
    widthh,
    toValue,
    widthPlaceHolder,
    widthIcon,
    selectedAttendanceItem,
  } = props;
  const setSelectedItem = props.setSelectedItem1;
  const [outLatesTypes, setOutLatesTypes] = useState([]);
  const [allData, setAllData] = useState([]);
  const [pholder, setPholder] = useState('');

  const getOutletTypes = async () => {
    let res = await getOutLatesTypes();
    console.log('=============ddddddddddddddddd in dropdown', res.data);

    if (res.statusCode == 200) {
      setAllData(res.data);
      setPholder(res.data[0].OutlettypeName);
      filterTypeData(res.data, res.data[0].OutlettypeName);
    } else {
      alert(`Warning ${res.statusCode}`, res.message)
    }
  };

  const filterTypeData = (data, key) => {
    const filteredData = data?.filter(i => i.OutlettypeName != key);
    // alert(JSON.stringify(filteredData))
    setOutLatesTypes(filteredData);
    console.log('filteredData is ', filteredData);
  };

  useEffect(() => {
    getOutletTypes();
  }, []);

  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ width: 105 }} >
          <Item
            options={outLatesTypes}
            setSelectedItem={setSelectedItem}
            pholder={pholder}
            setPholder={setPholder}
            filterTypeData={filterTypeData}
            allData={allData}
            themecolor={themecolor}
          />
        </View>
      </ScrollView>
    </View>
  );
}
