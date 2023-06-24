import React, { useState } from 'react';
import { View, Text, } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from '../../assets/css/styleCreateTour';

export default function CustomSelect(props, item) {
  // console.log('Item in Custome Select', item);
  // console.log('Props in Custome Select', props.getList);
  // const [getState, setState] = useState();
  const [getBeat, setBeat] = useState();

  const showAllBeat = () => {
    return props.getList.map(item => {
      return (
        <Picker.Item
          label={item.BeatName}
          style={styles.pickeritem}
          value={item.BeatId}
        />
      );
    });
  };
  return (
    <View style={styles.widthcenter}>
      <View style={styles.marg5} />
      <View style={styles.view2}>
        <View>
          <Text style={styles.title}>{props.heading}</Text>
        </View>
        <View style={styles.textContainer}>
          <Picker
            mode="dropdown"
            style={styles.W}
            itemStyle={styles.H1}
            selectedValue={getBeat}
            onValueChange={(item) => {
              setBeat(item)
            }}>
            <Picker.Item
              label="Select event type"
              style={styles.pickeritem}
              value=""
            />
            {showAllBeat()}
          </Picker>
        </View>
      </View>
    </View>
  );
}


