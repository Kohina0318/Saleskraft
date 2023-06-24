import { Text, View, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { RadioButton } from 'react-native-paper';
import styles from '../../assets/css/stylesSorting';
import { useSelector } from 'react-redux';
import { store } from '../../../App'
import { Colors } from '../../assets/config/Colors';

const BAFlatListSortByData = [
  {
    name: 'Alphabetical A To Z',
    id: 1,
  },
  {
    name: 'Alphabetical Z to A',
    id: 2,
  },
  {
    name: 'Newley added',
    id: 3,
  }
];

function BAFlatListSortByList({ item, setIsDoneVisible }) {

  const BAsFilterRedux = useSelector(state => state.BAsFilter);
  const BAsFilterReduxValue = Object.values(BAsFilterRedux);
  const BAsFilterReduxTemp = useSelector(
    state => state.BAsFilterTemporary,
  );
  const BAsFilterReduxValueTemp = Object.values(BAsFilterReduxTemp);
    
  var merged = [...BAsFilterReduxValueTemp];
  console.log("merged 238====", merged);

  if (merged.length == 0) {
    merged = [...BAsFilterReduxValue]
  }

  React.useEffect(() => {
    if (merged.length == 0) {
      setIsDoneVisible(false);
    }
  }, []);

  const handleRadioBox = () => {
    store.dispatch({ type: 'ADD_BAS_FILTER_TEMPORARY', payload: [item.id, item.id] })
    setIsDoneVisible(true);
  };

  return (
    <TouchableOpacity
      onPress={() => handleRadioBox()}
      activeOpacity={1}
      style={{
        backgroundColor: merged.includes(item.id) ? '#FFF' : '#fff',
      }}>
      <View style={styles.RadioView}>
        <RadioButton
          color={Colors.bluetheme}
          uncheckedColor={Colors.lightgrey}
          status={merged.includes(item.id) ? 'checked' : 'unchecked'}
          onPress={() => handleRadioBox()}
        />
        <Text style={styles.RadioText}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );
}

export function BAFlatListSortBy(props) {
  return (
    <FlatList
      data={BAFlatListSortByData}
      renderItem={({ item }) => (
        <BAFlatListSortByList
          item={item}
          props={props}
          setIsDoneVisible={props.setIsDoneVisible}
        />
      )}
      keyExtractor={item => item.name}
    />
  );
}

