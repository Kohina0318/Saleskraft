import React from 'react';
import { TouchableOpacity, View, FlatList, Text, } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { Colors } from '../../assets/config/Colors';
import styles from '../../assets/css/stylesSorting';
import { gettripLocationApi } from '../../repository/trip/tripRepository';
import { store } from '../../../App';
import { FontFamily } from '../../assets/fonts/FontFamily';
import Color, { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';


const OutletClassificationData = [
  {
    id: 0,
    attributeName: 'A+ Class',
  },
  {
    id: 1,
    attributeName: 'A Class',
  },
  {
    id: 2,
    attributeName: 'B+ Class',
  },
  {
    id: 3,
    attributeName: 'B Class',
  },
  {
    id: 4,
    attributeName: 'C+ Class',
  },
  {
    id: 5,
    attributeName: 'C Class',
  },
];

function RenderFunctionOfOutlets({ item }) {
  const handlePressOnClassification = () => { };

  return (
    <View style={styles.PointView}>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => handlePressOnClassification()}>
        <View style={styles.ButtonView}>
          <Text style={styles.TextDark}>{item.attributeName}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
// const CallTypeButtonData = [
//   {
//     point: (
//       <View style={styles.ButtonView}>
//         <Text style={styles.TextDark}>A+ Class</Text>
//       </View>
//     ),
//   },
//   {
//     point: (
//       <View style={styles.ButtonView}>
//         <Text style={styles.TextDark}>A Class</Text>
//       </View>
//     ),
//   },
//   {
//     point: (
//       <View style={styles.ButtonView}>
//         <Text style={styles.TextDark}>B+ Class</Text>
//       </View>
//     ),
//   },
//   {
//     point: (
//       <View style={styles.ButtonViewBlue}>
//         <Text style={styles.TextWhite}>B Class</Text>
//       </View>
//     ),
//   },
//   {
//     point: (
//       <View style={styles.ButtonViewBlue}>
//         <Text style={styles.TextWhite}>C+ Class</Text>
//       </View>
//     ),
//   },
//   {
//     point: (
//       <View style={styles.ButtonViewBlue}>
//         <Text style={styles.TextWhite}>C Class</Text>
//       </View>
//     ),
//   },
// ];
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
  setTriplist,
  setTripkeys,
}) {
  React.useEffect(() => {
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
  console.log(`radioFilterKeys---->`, radioFilterKeys.includes(`${item.id}`));
  console.log(
    `temporaryRadioFilterKeys ---->`,
    temporaryRadioFilterKeys.includes(`${item.id}`),
  );
  var radioId = mergedKeys[0];
  console.log(`mergedKeys ---->`, mergedKeys[0]);

  const [g, s] = React.useState({});

  const handleRadioBox = async (id, name) => {
    try {
      console.log('Event>>>>', id, name);
      dispatch({
        type: 'ADD_AIRPORT_ROUTE_FILTER_TEMPORARY',
        payload: [id, name],
      });

      const result = await gettripLocationApi(
        `api/getFilterTrips?short_by=${id}`,
      );
      console.log("result-011", result);
      if (result.statusCode == 200) {
        let keys1 = Object.keys(result.data);
        let removeLastEl = keys1.pop();
        let keys = keys1;
        console.log('keys8888', keys);
        // console.log('values', values1);
        setTripkeys(keys);
        setTriplist(result.data);

        console.log('result.data.Trips123', result.data);
      } else {
        alert(result.message);
      }
    } catch (er) {
      console.log("catch filter error trips", er)
    }
  };

  return (
    <TouchableOpacity
      onPress={() => handleRadioBox(item.id, item.name)}
      activeOpacity={1}
      style={{
        backgroundColor: mergedKeys.includes(`${item.id}`) ? '#FFF' : '#fff',
      }}>
      <View style={styles.RadioView}>
        <RadioButton
          color={Colors.bluetheme}
          uncheckedColor={'#000'}
          status={mergedKeys.includes(`${item.id}`) ? 'checked' : 'unchecked'}
          onPress={() => handleRadioBox(item.id, item.name)}
        />
        <Text style={styles.RadioText}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );
}

export function FlatListSortBy({ props, setTriplist, setTripkeys }) {
  const [checked, setChecked] = React.useState('English');
  return (
    <FlatList
      data={CustomerListSortBY}
      renderItem={({ item }) => (
        <FlatListSortByCustomer
          item={item}
          props={props}
          checked={checked}
          setTriplist={setTriplist}
          setTripkeys={setTripkeys}
          setChecked={setChecked}
        />
      )}
      keyExtractor={item => item.id}
    />
  );
}
const OrderListSortBY = [
  {
    name: 'Created',
    id: 1,
  },
  {
    name: 'Accepted',
    id: 2,
  },
  {
    name: 'Executed',
    id: 3,
  },
  {
    name: 'Completed',
    id: 4,
  },
  {
    name: 'Cancelled',
    id: 5,
  },
];

function FlatListSortByOrder({ item, props, setIsDoneVisible, themecolor }) {

  const orderListFilterRedux = useSelector(state => state.orderListFilter);
  const orderListFilterReduxValue = Object.values(orderListFilterRedux);
  const orderListFilterReduxTemp = useSelector(
    state => state.orderListFilterTemporary,
  );
  const orderListFilterReduxValueTemp = Object.values(orderListFilterReduxTemp);
  console.log("orderListFilterReduxValue 234====", orderListFilterReduxValue);
  console.log("orderListFilterReduxValueTemp 235====", orderListFilterReduxValueTemp);

  var merged = [...orderListFilterReduxValueTemp];
  console.log("merged 238====", merged);

  if (merged.length == 0) {
    merged = [...orderListFilterReduxValue]
  }

  React.useEffect(() => {
    if (merged.length == 0) {
      setIsDoneVisible(false);
    }
  }, []);

  const handleRadioBox = () => {
    store.dispatch({ type: 'ADD_ORDER_LIST_FILTER_TEMPORARY', payload: [item.name, item.name] })
    setIsDoneVisible(true);
  };
  console.log("ADD_ORDER_LIST_FILTER_MULTIPLE_ITEM===>", merged.includes(item.name))

  return (
    <TouchableOpacity
      onPress={() => handleRadioBox()}
      activeOpacity={1}
      style={{
        backgroundColor: themecolor.RB2,
      }}>
      <View style={styles.RadioView}>
        <RadioButton
          color={Colors.bluetheme}
          uncheckedColor={Colors.lightgrey}
          status={merged.includes(item.name) ? 'checked' : 'unchecked'}
          onPress={() => handleRadioBox()}
        />
        <Text style={{ ...styles.RadioText, color: themecolor.TXTWHITE }}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );
}

export function FlatListSortByOrderList(props,) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  return (
    <FlatList
      data={OrderListSortBY}
      renderItem={({ item }) => (
        <FlatListSortByOrder
          item={item}
          props={props}
          themecolor={themecolor}
          setIsDoneVisible={props.setIsDoneVisible}
        />
      )}
      keyExtractor={item => item.id}
    />
  );
}

export function ClassificationOfOutlets(props) {
  return (
    <FlatList
      data={OutletClassificationData}
      renderItem={({ item }) => <RenderFunctionOfOutlets item={item} />}
      showsHorizontalScrollIndicator={false}
      numColumns={3}
    />
  );
}

const OrderData = [
  {
    name: 'Alphabetically A to Z',
    id: '1',
  },
  {
    name: 'Alphabetically Z to A',
    id: '2',
  },
  {
    name: 'Recently Added',
    id: '3',
  },

];

function OrderSuggestive({ item, props, setIsDoneVisible, themecolor }) {

  const suggestiveOrderFilterRedux = useSelector(state => state.BASuggestiveOrderFilter);
  const suggestiveOrderFilterReduxValue = Object.values(suggestiveOrderFilterRedux);
  const suggestiveOrderFilterReduxTemp = useSelector(state => state.BASuggestiveOrderFilterTemporary);
  const suggestiveOrderFilterReduxValueTemp = Object.values(suggestiveOrderFilterReduxTemp);

  var merged = [...suggestiveOrderFilterReduxValueTemp];

  if (merged.length == 0) {
    merged = [...suggestiveOrderFilterReduxValue]
  }

  React.useEffect(() => {
    if (merged.length == 0) {
      setIsDoneVisible(false);
    }
  }, [])

  const handleRadioBox = (id, name) => {
    store.dispatch({ type: 'ADD_SUGGESTIVE_ORDER_FILTER_TEMPORARY', payload: [item.id, item.id] })
    setIsDoneVisible(true);
  }

  return (
    <TouchableOpacity
      onPress={() => handleRadioBox()}
      activeOpacity={1}
      style={{
        backgroundColor: merged.includes(item.id) ? themecolor.RB2 : themecolor.RB2,
      }}>
      <View
        style={styles.RadioView}>
        <RadioButton
          color={themecolor.HEADERTHEMECOLOR}
          uncheckedColor={Colors.lightgrey}
          status={merged.includes(item.id) ? 'checked' : 'unchecked'}
          onPress={() => handleRadioBox()}
        />
        <Text style={{ ...styles.RadioText, color: themecolor.TXTWHITE }}>
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export function OrderSuggestiveFlatList(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  return (
    <FlatList
      data={OrderData}
      renderItem={({ item }) => (
        <OrderSuggestive
          item={item}
          props={props}
          setIsDoneVisible={props.setIsDoneVisible}
          themecolor={themecolor}
        />
      )}
      keyExtractor={item => item.id}
    />
  );
}

function Buttonview({ item, props, setIsDoneVisibleBox,themecolor }) {

  const suggestiveOrderFilterBoxRedux = useSelector(state => state.BASuggestiveOrderFilterBox);
  const suggestiveOrderFilterBoxReduxValue = Object.values(suggestiveOrderFilterBoxRedux);
  const suggestiveOrderFilterBoxReduxTemp = useSelector(state => state.BASuggestiveOrderFilterBoxTemporary);
  const suggestiveOrderFilterBoxReduxValueTemp = Object.values(suggestiveOrderFilterBoxReduxTemp);

  var merged = [...suggestiveOrderFilterBoxReduxValueTemp];
  console.log("Merged ====", merged)

  if (merged.length == 0) {
    merged = [...suggestiveOrderFilterBoxReduxValue]
  }

  const handlePressOnClassification = () => {
    if (merged.includes(item.Id)) {
      store.dispatch({ type: 'REMOVE_SUGGESTIVE_ORDER_FILTER_BOX_TEMPORARY', payload: [item.Id, item.Id] })
    } else {
      store.dispatch({ type: 'ADD_SUGGESTIVE_ORDER_FILTER_BOX_TEMPORARY', payload: [item.Id, item.Id] })
    }
    setIsDoneVisibleBox(true);
  }

  React.useEffect(() => {
    if (merged.length == 0) {
      setIsDoneVisibleBox(false);
    }
  }, [])

  return (
    <View
      style={{flex:1,backgroundColor: merged.includes(item.Id) ? themecolor.HEADERTHEMECOLOR : Colors.SortButton,margin:2, borderRadius: 10,
        height: 30,
        justifyContent: 'center',}}>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => handlePressOnClassification()}>
        <View>
          <Text
            style={{
              fontFamily: FontFamily.PopinsMedium,
              fontSize: 11,
              color: merged.includes(item.Id) ? '#FFF' : Colors.grey,
              textAlign:'center'
            }}
          >
            {item.CategoryName}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export function FlatListButton(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()

  return (
    <FlatList
      data={props.filterCategory}
      renderItem={({ item }) => <Buttonview item={item} setIsDoneVisibleBox={props.setIsDoneVisibleBox} themecolor={themecolor}/>}
      showsHorizontalScrollIndicator={false}
      numColumns={3}
    />
  );
}

const ProductSortData = [
  {
    name: 'Alphabetically A to Z',
    id: '1',
  },
  {
    name: 'Alphabetically Z to A',
    id: '2',
  },
  {
    name: 'Recently Added',
    id: '3',
  },

];

function ProductSortBy({ item, props, setIsDoneVisible }) {

  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()

  const ProductFilterRedux = useSelector(state => state.ProductFilter);
  const ProductFilterReduxValue = Object.values(ProductFilterRedux);
  const ProductFilterReduxTemp = useSelector(state => state.ProductFilterTemporary);
  const ProductFilterReduxValueTemp = Object.values(ProductFilterReduxTemp);

  var merged = [...ProductFilterReduxValueTemp];

  if (merged.length == 0) {
    merged = [...ProductFilterReduxValue]
  }

  React.useEffect(() => {
    if (merged.length == 0) {
      setIsDoneVisible(false);
    }
  }, [])

  const handleRadioBox = (id, name) => {
    store.dispatch({ type: 'ADD_PRODUCT_FILTER_TEMPORARY', payload: [item.id, item.id] })
    setIsDoneVisible(true);
  }

  return (
    <TouchableOpacity
      onPress={() => handleRadioBox()}
      activeOpacity={1}
      style={{
        backgroundColor: merged.includes(item.id) ? themecolor.RB2 : themecolor.RB2,
      }}>
      <View
        style={styles.RadioView}>
        <RadioButton
          color={themecolor.HEADERTHEMECOLOR}
          uncheckedColor={Colors.lightgrey}
          status={merged.includes(item.id) ? 'checked' : 'unchecked'}
          onPress={() => handleRadioBox()}
        />
        <Text style={{ ...styles.RadioText, color: themecolor.TXTWHITE }}>
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export function ProductSortByFlatList(props) {

  return (
    <FlatList
      data={ProductSortData}
      renderItem={({ item }) => (
        <ProductSortBy
          item={item}
          props={props}
          setIsDoneVisible={props.setIsDoneVisible}
        />
      )}
      keyExtractor={item => item.id}
    />
  );
}

export { FlatListSortByCustomer };
