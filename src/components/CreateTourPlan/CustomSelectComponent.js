import React from 'react';
import { View, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from '../../assets/css/styleCreateTour';
import { store } from '../../../App';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';

const CSdata = [
  {
    CUSTOMPICKERS: (
      <Picker mode="dropdown" style={styles.W} itemStyle={styles.H1}  >
        <Picker.Item label="Airport Route" style={styles.picker} value="" />
        <Picker.Item
          label="Distributor visit"
          style={styles.pickeritem}
          value="Distributor visit"
        />
        <Picker.Item
          label="Distributor visit2"
          style={styles.pickeritem}
          value="Distributor visit2"
        />
        <Picker.Item
          label="Distributor visit3"
          style={styles.pickeritem}
          value="Distributor visit3"
        />
        <Picker.Item
          label="Distributor visit4"
          style={styles.pickeritem}
          value="Distributor visit4"
        />
      </Picker>
    ),
  },
];

function CusPickerListD({
  item,
  eventTypes,
  setBeatforShow,
  setCollapsed,
  collapsed,
  headingVal,
  navigateFor,
  TPID,
  themecolor
}) {


  function formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }


  const handleSelectEvent = (itemValue, itemIndex) => {
    let k = null;
    if (navigateFor == 'createTour') {
      let obj = {
        TpId: TPID,
        TpDate: formatDate(headingVal),
        BeatId: k,
        OutletIds: '',
        TpState: itemValue,
        TpRemark: '',
      };

      store.dispatch({
        type: 'ADD_TOUR_PLANS',
        payload: [headingVal, obj],
      });
      setBeatforShow(itemValue);
      setCollapsed(!collapsed);
    } else {
      let obj = {
        TpId: TPID,
        TpDate: formatDate(headingVal),
        BeatId: k,
        OutletIds: '',
        TpState: itemValue,
        TpRemark: '',
      };

      store.dispatch({
        type: 'ADD_TOUR_PLANS',
        payload: [headingVal, obj],
      });
      setBeatforShow(itemValue);
      setCollapsed(!collapsed);
    }
  }

  return (
    <>
      <View>
        <View style={styles.marg5} />
        <View style={{ ...styles.viewCustom }}>
          <View style={{ ...styles.textContainer, backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.CARD }}>
            <Picker
              mode="dropdown"
              style={{ ...styles.W }}
              itemStyle={styles.H1}
              selectedValue={''}  
              dropdownIconColor={themecolor.TXTWHITE}
              onValueChange={(itemValue, itemIndex) =>
                // setSelectedValue(itemValue)
                handleSelectEvent(itemValue, itemIndex)
              }>
              <Picker.Item label="Select" style={{ ...styles.picker, color: themecolor.TXTWHITE, backgroundColor: themecolor.BOXTHEMECOLOR }} value="" />
              {eventTypes.map((itmm, index) => {
                return (
                  <Picker.Item
                    key={index}
                    label={itmm.EventTypeName}
                    style={{ ...styles.picker, color: themecolor.TXTWHITE, backgroundColor: themecolor.BOXTHEMECOLOR }}
                    value={itmm.EventTypeName}
                  />
                );
              })}
            </Picker>
          </View>
        </View>
      </View>
    </>
  );
}

export default function CustomSelect(props) {
  const { eventTypes, wholemonthDatesObj, setCollapsed, setBeatforShow, collapsed, headingVal, navigateFor, TPID } = props;
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  return (
    <FlatList
      data={CSdata}
      keyExtractor={(_, indx) => indx}
      renderItem={({ item, index }) => (
        <CusPickerListD
          item={item}
          eventTypes={eventTypes}
          setBeatforShow={setBeatforShow}
          setCollapsed={setCollapsed}
          collapsed={collapsed}
          headingVal={headingVal}
          wholemonthDatesObj={wholemonthDatesObj}
          navigateFor={navigateFor}
          TPID={TPID}
          themecolor={themecolor}
        />
      )}
      showsVerticalScrollIndicator={false}
      scrollEnabled={false}
    />
  );
}
