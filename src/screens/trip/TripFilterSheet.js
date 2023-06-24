import React from 'react';
import { TouchableOpacity, View, FlatList, Text } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../assets/css/stylesSorting';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';

const CustomerListSortBY = [
  {
    name: 'Newley added',
    id: 1,
  },
  {
    name: 'Current Month',
    id: 2,
  },
  {
    name: 'Last Month',
    id: 3,
  },
  {
    name: 'Last 3 Month',
    id: 4,
  },
];

function FlatListSortByCustomer({
  item,
  setDone2,
  setTemp,
  temp,
}) {
  React.useEffect(() => {
    if (temp == '') {
    }
    //  props.setClickOnDone(true)
  }, []);

  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()

  const dispatch = useDispatch();
  const radioFilterRedux = useSelector(state => state.AirportRouteFilterRadio);
  const radioFilterValue = Object.values(radioFilterRedux);
  const radioFilterKeys = Object.keys(radioFilterRedux);

  const temporaryRadioFilterRedux = useSelector(
    state => state.AirportRouteFilterRadioTemporary,
  );
  const temporaryRadioFilterValue = Object.values(temporaryRadioFilterRedux);
  const temporaryRadioFilterKeys = Object.keys(temporaryRadioFilterRedux);

  const mergedKeys = [...radioFilterKeys, ...temporaryRadioFilterKeys];
  // console.log(`radioFilterKeys---->`, radioFilterKeys.includes(`${item.id}`));
  // console.log(
  //   `temporaryRadioFilterKeys ---->`,
  //   temporaryRadioFilterKeys.includes(`${item.id}`),
  // );
  var radioId = mergedKeys[0];
  // console.log(`mergedKeys ---->`, mergedKeys[0]);

  const [g, s] = React.useState({});

  const handleRadioBox = async (id, name) => {
    try {
      // console.log('Event>>>>', id, name);
      dispatch({
        type: 'ADD_AIRPORT_ROUTE_FILTER_TEMPORARY',
        payload: [id, name],
      });

      setTemp(id);

      //     const result = await gettripLocationApi(
      //       `api/getFilterTrips?short_by=${id}`,
      //     );
      //     console.log("result-011",result);
      //     if (result.statusCode == 200) {
      //       let keys1 = Object.keys(result.data);
      //       let removeLastEl = keys1.pop();
      //       let keys = keys1;
      //       console.log('keys8888', keys);
      //       // console.log('values', values1);
      //       setTripkeystemp(keys);
      //       setTriplisttemp(result.data);

      //       console.log('result.data.Trips123', result.data);
      //     } else {
      //       setTemp(!temp)
      // // setTripkeys([])
      // // setTriplist([])
      //       // alert(result.message);
      //     }
      //   } catch (er) {
      //     console.log("catch filter error trips",er)
      //   }
      setDone2(false);
    } catch (e) {
      console.log('Error in catch Line 102===', e);
    }
  };

  return (
    <TouchableOpacity
      onPress={() => handleRadioBox(item.id, item.name)}
      activeOpacity={1}
      style={{
        backgroundColor: mergedKeys.includes(`${item.id}`) ? themecolor.RB2 : themecolor.RB2,
      }}>
      <View style={styles.RadioView}>
        <RadioButton
          color={themecolor.HEADERTHEMECOLOR}
          uncheckedColor={themecolor.TXTWHITE}
          status={mergedKeys.includes(`${item.id}`) ? 'checked' : 'unchecked'}
          onPress={() => handleRadioBox(item.id, item.name)}
        />
        <Text style={{...styles.RadioText,color:themecolor.TXTWHITE}}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );
}

export function TripFilterSheet({
  props,
  setTriplisttemp,
  setTripkeystemp,
  setDone2,
  setTripkeys,
  setTriplist,
  setTemp,
  temp,
}) {
  const [checked, setChecked] = React.useState('English');
  return (
    <FlatList
      data={CustomerListSortBY}
      renderItem={({ item }) => (
        <FlatListSortByCustomer
          item={item}
          props={props}
          checked={checked}
          setTriplisttemp={setTriplisttemp}
          setTripkeystemp={setTripkeystemp}
          setChecked={setChecked}
          setDone2={setDone2}
          setTripkeys={setTripkeys}
          setTriplist={setTriplist}
          setTemp={setTemp}
          temp={temp}
        />
      )}
      keyExtractor={item => item.id}
    />
  );
}

const CustomerListSortBY1 = [
  {
    name: 'Alphabetically A to Z',
    id: 1,
  },
  {
    name: 'Alphabetically Z to A',
    id: 2,
  },
  {
    name: 'Recently Requested',
    id: 3,
  },
];

function FlatListSortByCustomer1({
  item,
  setDone2,
  setTemp,
  temp,
  setActionData,
  setSortBy,
  sortBy,
  themecolor
}) {
  // alert(JSON.stringify(setActionData))
  React.useEffect(() => {
    if (temp == '') {
    }
    //  props.setClickOnDone(true)
  }, []);

  const dispatch = useDispatch();
  const radioFilterRedux = useSelector(state => state.AirportRouteFilterRadio);
  const radioFilterValue = Object.values(radioFilterRedux);
  const radioFilterKeys = Object.keys(radioFilterRedux);

  const temporaryRadioFilterRedux = useSelector(
    state => state.AirportRouteFilterRadioTemporary,
  );
  const temporaryRadioFilterValue = Object.values(temporaryRadioFilterRedux);
  const temporaryRadioFilterKeys = Object.keys(temporaryRadioFilterRedux);

  const mergedKeys = [...radioFilterKeys, ...temporaryRadioFilterKeys];
  // console.log(`radioFilterKeys---->`, radioFilterKeys.includes(`${item.id}`));
  // console.log(
  //   `temporaryRadioFilterKeys ---->`,
  //   temporaryRadioFilterKeys.includes(`${item.id}`),
  // );
  var radioId = mergedKeys[0];
  // console.log(`mergedKeys ---->`, mergedKeys[0]);

  // const [g, s] = React.useState({});

  const handleRadioBox = async (id, name) => {
    try {
      // console.log('Event>>>>', id, name);
      dispatch({
        type: 'ADD_AIRPORT_ROUTE_FILTER_TEMPORARY',
        payload: [id, name],
      });
      setTemp(id);

      const result = await gettripLocationApi(`api/getNotification?sort_by=${id}`);
      // console.log("result-011", result);
      if (result.statusCode == 200) {
        alert("xxxxxxxxxx")
        let keys1 = Object.keys(result.data);
        let removeLastEl = keys1.pop();
        let keys = keys1;
        // console.log('keys8888', keys);
        // console.log('values', values1);
        // setTripkeystemp(keys);
        // setTriplisttemp(result.data);

        // alert(JSON.stringify(result))
        setActionData(result.data)
        // console.log('result.data.Trips123', result.data);
      } else {
        setTemp(!temp)
        // setTripkeys([])
        // setTriplist([])
        // alert(result.message);
      }
    } catch (er) {
      console.log("catch filter error trips", er)
    }
    setDone2(false);
    // } catch (e) {
    //   console.log('Error in catch Line 102===', e);
    // }
  };

  return (
    <TouchableOpacity
      onPress={() => setSortBy(item.id)}
      activeOpacity={1}
      style={{
        backgroundColor: sortBy === item.id ? themecolor.RB2 : themecolor.RB2,
      }}>
      <View style={styles.RadioView}>
        <RadioButton
          color={themecolor.HEADERTHEMECOLOR}
          uncheckedColor={themecolor.TXTWHITE}
          status={sortBy === item.id ? 'checked' : 'unchecked'}
          onPress={() => setSortBy(item.id)}
        />
        <Text style={{ ...styles.RadioText, color: themecolor.TXTWHITE }}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );
}

export function TripFilterSheet1({
  props,
  setDone2,
  setTripkeys,
  setTriplist,
  setTemp,
  temp,
  setActionData,
  setSortBy,
  sortBy
}) {
  const [checked, setChecked] = React.useState('English');
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  return (
    <FlatList
      data={CustomerListSortBY1}
      renderItem={({ item }) => (
        <FlatListSortByCustomer1
          item={item}
          props={props}
          checked={checked}
          setChecked={setChecked}
          setDone2={setDone2}
          setTripkeys={setTripkeys}
          setTriplist={setTriplist}
          setTemp={setTemp}
          temp={temp}
          setActionData={setActionData}
          setSortBy={setSortBy}
          sortBy={sortBy}
          themecolor={themecolor}
        />
      )}
      keyExtractor={item => item.id}
    />
  );
}
