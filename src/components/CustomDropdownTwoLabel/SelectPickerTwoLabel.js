import React, { useState } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

const App = () => {
  const [selected, setSelected] = useState(undefined);
  const data = [
    { label: 'One', value: '1', label1: 'Vikku', },
    { label: 'Two', value: '2', label1: 'Viks Diws', },
    { label: 'Three', value: '3', label1: 'Vikcy', },
    { label: 'Four', value: '4', label1: 'Chotu', },
  ];

  return (
    <View style={styles.container}>
      <Dropdown label="Select Item" data={data} onSelect={setSelected} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: width * 0.9,
    alignSelf: 'center',
  },
});

export default App;