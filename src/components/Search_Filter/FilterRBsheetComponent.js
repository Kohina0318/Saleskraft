import { Text, View, TouchableOpacity, Image, FlatList } from 'react-native';
import styles from '../../assets/css/stylesSorting';
import React, { useRef } from 'react';
import { RadioButton } from 'react-native-paper';
import { Colors } from '../../assets/config/Colors';
import RBSheet from 'react-native-raw-bottom-sheet';
import { useDispatch, useSelector } from 'react-redux';
import styles1 from '../../assets/css/stylesBeat';

const CustomerListSortBY = [
  {
    name: 'Alphabetically A to Z',
    id: 0,
  },
  {
    name: 'Alphabetically Z to A',
    id: 1,
  },
  {
    name: 'Recently Added',
    id: 2,
  },
];

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

// Sort FlatList Render Function
function FlatListSortByCustomer({ item, setIsDoneVisible }) {

  const dispatch = useDispatch();
  const radioFilterRedux = useSelector(state => state.AirportRouteFilterRadio);
  const radioFilterKeys = Object.keys(radioFilterRedux);
  const temporaryRadioFilterRedux = useSelector(
    state => state.AirportRouteFilterRadioTemporary,
  );
  const temporaryRadioFilterKeys = Object.keys(temporaryRadioFilterRedux);
  let mergedKeys = [...temporaryRadioFilterKeys];
  console.log("prev merged keys  ", mergedKeys);

  if (mergedKeys.length == 0) {
    mergedKeys = [...radioFilterKeys]
  }

  console.log(`radioFilterKeys---->`, radioFilterKeys.includes(`${item.id}`));
  console.log(
    `temporaryRadioFilterKeys ---->`,
    temporaryRadioFilterKeys.includes(`${item.id}`),
  );
  console.log(`mergedKeys ---->`, mergedKeys);

  const [g, s] = React.useState({});

  React.useEffect(() => {
    if (mergedKeys.length == 0) {
      setIsDoneVisible(false);
    }
  }, []);

  const handleRadioBox = (id, name) => {
    console.log('Event>>>>', id, name);
    dispatch({ type: 'ADD_AIRPORT_ROUTE_FILTER_TEMPORARY', payload: [id, name] });
    setIsDoneVisible(true)
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
          // value={item.id}
          // value={answr}
          color={'#000'}
          uncheckedColor={'#000'}
          status={mergedKeys.includes(`${item.id}`) ? 'checked' : 'unchecked'}
          onPress={() => handleRadioBox(item.id, item.name)}
        />
        <Text style={styles.RadioText}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );
}

//Render Function of Bottom Portion
function RenderFunctionOfOutlets({ item }) {
  const dispatch = useDispatch();
  // Box Filter Redux Part Start
  const boxFilterRedux = useSelector(state => state.AirportRouteFilterBox);
  // const boxFilterValue = Object.values(boxFilterRedux);
  const boxFilterKeys = Object.keys(boxFilterRedux);

  const temporaryBoxFilterRedux = useSelector(
    state => state.AirportRouteFilterBoxTemporary,
  );
  // const temporaryBoxFilterValue = Object.values(temporaryBoxFilterRedux);
  const temporaryBoxFilterKeys = Object.keys(temporaryBoxFilterRedux);

  const mergedKeys = [...boxFilterKeys, ...temporaryBoxFilterKeys];
  console.log("mergerdKeys---->", mergedKeys)
  // Box Filter Redux Part End

  const handlePressOnClassification = () => {
    console.log("id---->", item.id)
    console.log("attributeName---->", item.attributeName)

    if (boxFilterKeys.includes(`${item.id}`)) {
      dispatch({ type: 'REMOVE_AIRPORT_ROUTE_BOX_FILTER_BY_ID', payload: item.id })
    }
    else if (temporaryBoxFilterKeys.includes(`${item.id}`)) {
      dispatch({ type: 'REMOVE_AIRPORT_ROUTE_BOX_FILTER_TEMPORARY_BY_ID', payload: item.id })
    } else {
      dispatch({ type: 'ADD_AIRPORT_ROUTE_BOX_FILTER_TEMPORARY', payload: [item.id, item.attributeName] })
    }


    // if(mergedKeys.includes(item.id)){
    //     store.dispatch({type:'ADD_OUTLET_BEATS_BY_ID',payload:item.id})  
    // }else{
    //   store.dispatch({type:'ADD_OUTLET_BEATS',payload:[item.id,item.attributeName]})
    // }
  };

  return (
    <View style={styles.PointView}>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => handlePressOnClassification()}>
        <View style={{
          backgroundColor: mergedKeys.includes(`${item.id}`) ? Colors.BLueButton : '#FFF',
          borderRadius: 10,
          width: 90,
          height: 30,
          justifyContent: 'center',
        }}>
          <Text style={styles.TextDark}>{item.attributeName}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default function FilterRBsheetComponent(props) {
  const radioFilterRedux = useSelector(state => state.AirportRouteFilterRadio);
  // const radioFilterValue = Object.values(radioFilterRedux);
  const radioFilterKeys = Object.keys(radioFilterRedux);

  const temporaryRadioFilterRedux = useSelector(
    state => state.AirportRouteFilterRadioTemporary,
  );
  const temporaryRadioFilterValue = Object.values(temporaryRadioFilterRedux);
  const temporaryRadioFilterKeys = Object.keys(temporaryRadioFilterRedux);

  // Box Filter Redux Part Start
  const boxFilterRedux = useSelector(state => state.AirportRouteFilterBox);
  const boxFilterValue = Object.values(boxFilterRedux);
  const boxFilterKeys = Object.keys(radioFilterRedux);

  const temporaryBoxFilterRedux = useSelector(
    state => state.AirportRouteFilterBoxTemporary,
  );
  const temporaryBoxFilterValue = Object.values(temporaryBoxFilterRedux);
  const temporaryBoxFilterKeys = Object.keys(temporaryBoxFilterRedux);
  // Box Filter Redux Part End

  const mergedKeys = [...boxFilterKeys, ...temporaryBoxFilterKeys];
  const mergedValues = [...boxFilterValue, ...temporaryBoxFilterValue];

  const refRBSheet1 = useRef();
  const dispatch = useDispatch();
  const [checked, setChecked] = React.useState('English');
  const [checked1, setChecked1] = React.useState('English');
  const [isDoneVisible, setIsDoneVisible] = React.useState(false);

  React.useEffect(() => {
    if (props.clickOnFilter) {
      refRBSheet1.current.open();
    }
  }, [props.clickOnFilter]);


  const handleCloseRBSheet = () => {
    dispatch({ type: 'REMOVE_AIRPORT_ROUTE_FILTER_TEMPORARY' });
    refRBSheet1.current.close();
    props.setClickOnFilter(false);
    setIsDoneVisible(false);
  };

  const handleClickOnDone = () => {
    // console.log(radioFilterKeys, "<===170")
    // console.log(temporaryRadioFilterValue[0], "<===171")
    //  console.log("inside handleClickOnDone ====>",mergedValues[0]); 
    props.setLoader(true);
    props.filterClickOnDoneFunction(temporaryRadioFilterValue[0]).then(res => {
      refRBSheet1.current.close();
      dispatch({ type: 'ADD_AIRPORT_ROUTE_FILTER', payload: [temporaryRadioFilterKeys[0], temporaryRadioFilterValue[0]] });
      props.setLoader(false);
      props.setClickOnFilter(false);
    }).catch(e => {
      console.log("Error In FilterRBsheetComponent Line 169 --->", e);
    })
  }

  // console.log("clickOnDone =======>>>>>",clickOnDone);
  return (
    <>
      <RBSheet
        ref={refRBSheet1}
        animationType={'slide'}
        closeOnPressMask={false}
        closeOnPressBack={false}
        height={350}
        customStyles={{
          container: {
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
          },
          draggableIcon: {
            display: 'none',
          },
        }}>
        <View style={styles1.RBVIEW}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => handleCloseRBSheet()} style={{ padding: 10 }}>
            <Image
              source={require('../../assets/images/close.png')}
              style={styles1.CloseIcon}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
          <View>
            <Text style={{ ...styles1.CardText }}>Set Filters</Text>
          </View>
          <View>

            {isDoneVisible ? (
              <View>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => handleClickOnDone()}
                >
                  <Text style={styles1.RBText1}>Done</Text>
                </TouchableOpacity>
              </View>
            ) :
              (<></>)
            }
          </View>
        </View>
        {/* <View style={{...styles.Borderline}} /> */}
        <View style={styles1.SortView}>
          <View style={styles1.Width9}>
            <Text style={styles1.CardText1}>Sort by</Text>
          </View>
          <View style={styles1.SortMainView}>
            <FlatList
              data={CustomerListSortBY}
              renderItem={({ item }) => (
                <FlatListSortByCustomer
                  item={item}
                  props={props}
                  checked={checked}
                  setChecked={setChecked}
                  setIsDoneVisible={setIsDoneVisible}
                />
              )}
              keyExtractor={item => item.id}
            />
            <View style={styles1.MV} />
            <Text style={styles1.CardText1}>Classification of outlets</Text>
            <FlatList
              data={OutletClassificationData}
              renderItem={({ item }) => <RenderFunctionOfOutlets item={item} setChecked1={setChecked1} checked1={checked1} />}
              showsHorizontalScrollIndicator={false}
              numColumns={3}
            />
          </View>
        </View>
      </RBSheet>
    </>
  );
}
