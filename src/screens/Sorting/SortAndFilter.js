import React from 'react';
import {
  TouchableOpacity,
  View,
  FlatList,
  Text,
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import styles from '../../assets/css/stylesSorting';

function CallTypeButton({ item }) {
  return (
    <View
      style={styles.PointView}>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => props.navigation.navigate('Inventory')}>
        {item.point}
      </TouchableOpacity>
    </View>
  )
}
const CallTypeButtonData = [
  {
    point: (
      <View
        style={styles.ButtonView}>
        <Text style={styles.TextDark}>Nail File</Text>
      </View>
    ),
  },
  {
    point: (
      <View
        style={styles.ButtonView}>
        <Text style={styles.TextDark}>Nail Clipper</Text>
      </View>
    ),
  },
  {
    point: (
      <View
        style={styles.ButtonView}>
        <Text style={styles.TextDark}>Manicure Set</Text>
      </View>
    ),
  },
  {
    point: (
      <View
        style={styles.ButtonViewBlue}>
        <Text style={styles.TextWhite}>Manicure Tool</Text>
      </View>
    ),
  },

];

const CustomerListSortBY = [
  {
    name: 'Alphabetically A to Z',
    id: '0',
  },
  {
    name: 'Alphabetically Z to A',
    id: '1',
  },
  {
    name: 'Recently Added',
    id: '2',
  },

];

function FlatListSortByCustomer({ item, checked, setChecked }) {
  const [g, s] = React.useState({});
  const handleRadioBox = (id, name) => {
    console.log('Event>>>>', id, name);
    s(prev => ({ ...prev, [id]: name }));
    setChecked(name);
  };
  var col = Object.keys(g).indexOf(item.id.toString());
  var answr;
  answr = g[item.id];
  return (
    <TouchableOpacity
      onPress={() => handleRadioBox(item.id, item.name)}
      activeOpacity={1}
      style={{ backgroundColor: checked == answr ? '#FFF' : '#fff' }}>
      <View
        style={styles.RadioView}>
        <RadioButton
          value={answr}
          color={'#000'}
          uncheckedColor={'#000'}
          status={checked == answr ? 'checked' : 'unchecked'}
          onPress={() => handleRadioBox(item.id, item.name)}
        />
        <Text
          style={styles.RadioText}>
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export function FlatListSortBy(props) {
  const [checked, setChecked] = React.useState('English');
  return (
    <FlatList
      data={CustomerListSortBY}
      renderItem={({ item }) => (
        <FlatListSortByCustomer
          item={item}
          props={props}
          checked={checked}
          setChecked={setChecked}
        />
      )}
      keyExtractor={item => item.id}
    />
  );
}

export function FlatListCallType(props) {
  return (
    <FlatList
      data={CallTypeButtonData}
      renderItem={({ item }) => <CallTypeButton item={item} />}
      showsHorizontalScrollIndicator={false}
      numColumns={3}
    />
  );
}


export { FlatListSortByCustomer };
