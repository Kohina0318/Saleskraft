import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, FlatList, Text } from 'react-native';
import styles from '../../assets/css/styleExpenses';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import { CustomPicker } from 'react-native-custom-picker';
import ProgressCircle from 'react-native-progress-circle';
import { gettripLocationApi } from '../../repository/trip/tripRepository';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';

const TripData = [
  {
    CN: 'Approved Trips',
    CN1: '2 Trips',
    point: (
      <View
        style={{
          backgroundColor: '#67cdff',
          borderRadius: 50,
          width: 8,
          height: 8,
          left: 10,
          justifyContent: 'center',
        }}
      />
    ),
    icon: <SimpleIcon name="arrow-right" style={{ fontSize: 12 }} />,
    screen: 'MyTrip',
  },
  {
    CN: 'Rejected Trips',
    CN1: '1 Trips',
    border: <View style={{ borderWidth: 0.2, borderColor: 'lightgrey' }} />,
    point: (
      <View
        style={{
          backgroundColor: '#ef5c31',
          borderRadius: 50,
          width: 8,
          height: 8,
          left: 10,
          justifyContent: 'center',
        }}
      />
    ),
    icon: <SimpleIcon name="arrow-right" style={{ fontSize: 12 }} />,
  },
  {
    CN: 'Cancelled Trips',
    CN1: '1 Trips',
    border: <View style={{ borderWidth: 0.2, borderColor: 'lightgrey' }} />,
    point: (
      <View
        style={{
          backgroundColor: '#ef5c31',
          borderRadius: 50,
          width: 8,
          height: 8,
          left: 10,
          justifyContent: 'center',
        }}
      />
    ),
    icon: <SimpleIcon name="arrow-right" style={{ fontSize: 12 }} />,
  },
  {
    CN: 'Raised Trips',
    CN1: '2 Trips',
    border: <View style={{ borderWidth: 0.2, borderColor: 'lightgrey' }} />,
    point: (
      <View
        style={{
          backgroundColor: '#46dc5a',
          borderRadius: 50,
          width: 8,
          height: 8,
          left: 10,
          justifyContent: 'center',
        }}
      />
    ),
    icon: <SimpleIcon name="arrow-right" style={{ fontSize: 12 }} />,
  },
  {
    CN: 'Closed Trips',
    CN1: '2 Trips',
    border: <View style={{ borderWidth: 0.2, borderColor: 'lightgrey' }} />,
    point: (
      <View
        style={{
          backgroundColor: '#46dc5a',
          borderRadius: 50,
          width: 8,
          height: 8,
          left: 10,
          justifyContent: 'center',
        }}
      />
    ),
    icon: <SimpleIcon name="arrow-right" style={{ fontSize: 12 }} />,
  },
];

function TripDataList({ item, navigation }) {
  //const navigation = useNavigation();
  // console.log("check---",props)
  return (
    <View style={styles.MainVIewFL}>
      {item.border}
      <TouchableOpacity
        style={styles.CENTERFLEX}
        activeOpacity={0.5}
        onPress={() => navigation.navigate(item.screen)}>
        <View style={styles.CENTERFLEX1}>
          <View style={styles.WIDTH1}>{item.point}</View>

          <View style={styles.WIDTH6}>
            <Text style={styles.MainText}>{item.CN}</Text>
          </View>
          <View style={styles.TripCountText}>
            <TouchableOpacity
            // onPress={() => navigation.navigate('MyTrip')}
            >
              <Text style={styles.TextBLue}>
                {item.CN1} {item.icon}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

function CardDataList(props) {
  // const navigation = useNavigation();
  var data = props;
  console.log('data in progress circle', data);
  return (
    <>
      <View style={styles.ExpenseNewCard}>
        <View style={styles.padding}>
          <ProgressCircle
            percent={55}
            radius={50}
            borderWidth={12}
            color={props.Color2}
            shadowColor={props.Color1}
            bgColor="#fff">
            <Text style={styles.TripCount}>{props.CountTrip}</Text>
            <Text style={styles.TripText}>{props.triptext}</Text>
          </ProgressCircle>
        </View>
        {/* <FlatList
          data={TripData}
          renderItem={({ item }) => (
            <TripDataList item={item} navigation={props.navigation} />
          )}
          showsHorizontalScrollIndicator={false}
        /> */}
        {TripData.map((item,index)=><TripDataList item={item} navigation={props.navigation} key={index}/>)}
      </View>
    </>
  );
}
// const optionsChargerType = [
//   {
//     label: 'Weekly',
//     value: 1,
//   },
//   {
//     label: 'Monthly',
//     value: 2,
//   },
//   {
//     label: 'Quaterly',
//     value: 3,
//   },
// ];
function TripExpenseDropdownText(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  // console.log('props 152564451541 expense', props);
  const [formattedData, setFormattedData] = useState([]);

  const getAllowedMonths = async () => {
    const result = await gettripLocationApi(`api/getAllowedMonths`);
    if (result.statusCode == 200) {
      let values = Object.values(result.data[0]);
      let keys = Object.keys(result.data[0]);
      // alert(JSON.stringify(keys))
      let new_data = [];
      // console.log('allowed months are ', result.data);
      const getdatesofMonth = i => {
        return keys[i];
      };
      values.map((item, index) => {
        new_data.push({ label: item, value: getdatesofMonth(index) });
      });
      // alert(JSON.stringify(new_data))
      //  alert(JSON.stringify(new_data))
      setFormattedData(new_data);
    }
  };

  useEffect(() => {
    getAllowedMonths();
  }, []);
  // console.log('formatted_data with state', formattedData);
  function OptionChargerType(settings) {
    const { item, getLabel } = settings;
    return (
      <View style={{ ...styles.optionContainer,backgroundColor:themecolor.FOOTER }}>
        <View style={styles.innerContainer}>
          <Text style={{ alignSelf: 'flex-start', fontSize: 10,color:themecolor.AV}}>
            {getLabel(item)}
          </Text>
        </View>
      </View>
    );
  }

  function FieldChargerType(settings) {
    // console.log('Lin 214===================>');

    const { selectedItem, defaultText, getLabel } = settings;
    // console.log('selsctedItems', typeof selectedItem);

    return (
      <View style={{ alignSelf: 'center' }}>
        <View>
          {!selectedItem && (
            <Text style={[styles.text, { color: '#FFF' }]}>{defaultText}</Text>
          )}
          {selectedItem && (
            <View style={{ ...styles.innerContainer }}>
              <Text
                style={[
                  styles.text,
                  { color: selectedItem.color, color: '#FFF' },
                ]}>
                {getLabel(selectedItem)}
              </Text>
            </View>
          )}
        </View>
      </View>
    );
  }

  function tr(selectedItem) {

    // console.log("selected Item==>>",selectedItem)
    // alert(selectedItem)
    props.setTripstatapidata(selectedItem);
  }

  return (
    <>
      {/* CWO Start */}
      <View style={{ marginVertical: 5 }} />
      <View style={styles.DailyCallView}>
        <View>
          <Text style={{ ...styles.CardTextDC,color: themecolor.TXTWHITE }}>{props.CardHeading}</Text>
        </View>
        <View style={{...styles.CustomSelect,backgroundColor:themecolor.HEADERTHEMECOLOR, }}>
          <View style={{ ...styles.CustomSelect2, alignItems: 'center',backgroundColor:themecolor.HEADERTHEMECOLOR }}>
            <CustomPicker
              placeholder={
                <Text style={{ ...styles.FontStyle, }}>{props.ptext}</Text>
              }
              options={formattedData}
              getLabel={item => item.label}
              fieldTemplate={FieldChargerType}
              optionTemplate={OptionChargerType}
              onValueChange={item => tr(item.value)}
            />
            {/* <SimpleIcon name="arrow-down" size={8} style={styles.SIMPLEICON} /> */}
          </View>
        </View>
      </View>
    </>
  );
}

export function ExpenseData(props) {
  console.log('props--', props);
  return <> </>;
}

export { CardDataList, TripExpenseDropdownText };
