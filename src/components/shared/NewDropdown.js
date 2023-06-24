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
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';

function Item({ options, setSelectedItem, widthh, toValue, widthPlaceHolder, widthIcon, selectedAttendanceItem, placeholder, setPlaceholder }) {

  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()

  const [open, setOpen] = useState(true)
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
      toValue: toValue,
    }).start();
  };

  useEffect(() => {
    if (collapsed) {
      collapseView();
    } else {
      expandView();
    }
    setOpen(!open)
  }, [collapsed]);

  const onpressfun = (t, i) => {
    setPlaceholder(t)
    setSelectedItem(t)
    toggleCollapsed()
  }

  return (

    <TouchableOpacity onPress={toggleCollapsed} >
      <View style={{ ...styles.itemV, backgroundColor: Colors.bluetheme, width: widthh, borderRadius: 14, alignSelf: 'flex-end', overflow: 'hidden', padding: 3 ,backgroundColor:themecolor.HEADERTHEMECOLOR}}>
        <Animated.View
          style={{ maxHeight: animationHeight }}>
          <Text style={{ ...styles.paragraph, }} numberOfLines={maxLines}>
            <View style={{ ...styles.MainViewDrop }}>
              <View style={{ flexDirection: 'row', width: '100%', }}>
                <View style={{ width: widthPlaceHolder }}>
                  <Text style={{ color: 'white', left: 5, fontSize: 12 }}>{placeholder}</Text>
                </View>
                <View style={{ width: widthIcon ,left:5}}>
                  <View style={{ justifyContent: 'center', }} >
                    {open == false ?
                      <FAIcon name="caret-down" size={18} style={{ color: 'white' ,}} />
                      :
                      <FAIcon name="caret-up" size={18} style={{ color: 'white' ,}} />}
                  </View>
                </View>
              </View>
            </View>
            <View >
              {options.map((i, ind) => {
                return (
                  <TouchableOpacity key={ind} onPress={() => onpressfun(i, ind + 1)}  ><Text style={{ left: 5, color: 'white', fontSize: 12 }}>{i}</Text></TouchableOpacity>
                )
              })}

            </View>
          </Text>

          <View style={{ marginVertical: 1 }} />
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
}

export default function NewDropdown(props) {

  const { options, widthh, toValue, widthPlaceHolder, widthIcon, selectedAttendanceItem } = props;
  const setSelectedItem = props.setSelectedItem

  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View >
          <Item options={options} setSelectedItem={setSelectedItem} widthh={widthh} toValue={toValue} widthPlaceHolder={widthPlaceHolder} widthIcon={widthIcon} selectedAttendanceItem={selectedAttendanceItem}
            placeholder={props.placeholder} setPlaceholder={props.setPlaceholder}
          />
        </View>
      </ScrollView>
    </View>
  );
}

