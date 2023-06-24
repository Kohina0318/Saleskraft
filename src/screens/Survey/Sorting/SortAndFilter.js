import React,{useState,useEffect} from 'react';
import {
  TouchableOpacity,
  View,
  FlatList,
  Text,
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import styles from '../../../assets/css/stylesSorting';
import styless from '../../../assets/css/styleGrievance';
import {Colors} from '../../../assets/config/Colors';

function CallTypeButton({item,props,checked}) {
  const [selectedName,setSelectedName]=useState(false) 
  return (
    <> 
   <View style={{
          borderRadius:20,
          width:'auto',
          height:25,
          justifyContent:"center",
          alignItems:"center",
          backgroundColor:selectedName ? "#50b030" : "#acb0bd",
          marginVertical:2,
          marginHorizontal:1
          }}>
    <View
      style={{...styles.PointView,marginHorizontal:10}}>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() =>setSelectedName(!selectedName)}>
          <Text style={{...styles.TextDark,color:selectedName ? '#FFF' : '#000',}}>{item.point}</Text>
     
      </TouchableOpacity>
    </View>
    </View>
    </>
  );
}
const CallTypeButtonData = [
  
  {
    name:'1. Which brands are easily visible in frontend showcase?',
    point: (
      <View>
          <Text style={{...styles.TextWhite}}>The Balvenie</Text>
        </View>
    ),
  },
  {
    point: (
      <View>
          <Text style={styles.TextWhite}>Tullamore D.E.W</Text>
        </View>
    ),
  },
  {
    point: (
      <View>
          <Text style={styles.TextWhite}>Grant's</Text>
        </View>
    ),
  },
  {
    point: (
      <View>
          <Text style={styles.TextWhite}>Glenfiddich</Text>
        </View>
    ),
  },
  {
    point: (
      <View>
          <Text style={styles.TextWhite}>Sailor Jerry</Text>
        </View>
    ),
  },
  {
    point: (
      <View>
          <Text style={styles.TextWhite}>Drambuie</Text>
        </View>
    ),
  },
  {
    point: (
      <View>
          <Text style={styles.TextWhite}>Monkey Shoulder</Text>
        </View>
    ),
  },
];
const CustomerListSortBY = [
  {
    name: 'Yes',
    id: '0',
  },
  {
    name: 'No',
    id: '1',
  },
 
 
];
function FlatListSortByCustomer({item, props, checked, setChecked}) {
  const [g, s] = React.useState({});
  const handleRadioBox = (id, name) => {
    console.log('Event>>>>', id, name);
    s(prev => ({...prev, [id]: name}));
    setChecked(name);
  };
  var col = Object.keys(g).indexOf(item.id.toString());
  var answr;
  answr = g[item.id];
  return (
  <>
    <TouchableOpacity
      onPress={() => handleRadioBox(item.id, item.name)}
      activeOpacity={1}
      style={{backgroundColor: checked == answr ? '#FFF' : '#fff'}}>
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
    </>
  );
}


export function FlatListSortBy(props) {
    const [checked, setChecked] = React.useState('English');
  return (
    <>
   <View style={{backgroundColor:'white',flex:1,borderWidth:0.8,borderRadius:10,borderColor:Colors.borderColor1,marginVertical:10,paddingVertical:10}}>
   <View
      style={{...styles.PointView,marginHorizontal:7}}>
  <Text style={{...styles.TextDark,color:'#000',fontSize:12}}>2.Does our showcase placed at first counter?</Text>
  </View>
    <FlatList
    data={CustomerListSortBY}
    renderItem={({item}) => (
      <FlatListSortByCustomer
        item={item}
        props={props}
        checked={checked}
        setChecked={setChecked}
      />
    )}
    keyExtractor={item => item.id}
  />
  </View>
  </>
  );
}

export function FlatListCallType(props) {
  return (
    <>
    <FlatList
    data={CallTypeButtonData}
    renderItem={({item}) => <CallTypeButton item={item} />}
    showsHorizontalScrollIndicator={false}
    numColumns={3}
  />
  </>
  );
}


export {FlatListSortByCustomer};
