import React from 'react';
import {
    View,
    Text,
    FlatList
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from '../../screens/Dropdown/styleDrodown';

const CSdata = [
    {
      CUSTOMPICKERS: (
        <Picker
        mode="dropdown"
        style={styles.W}
        itemStyle={styles.H1}
        >
        <Picker.Item
            label="Airport Route"
            style={styles.picker}
            value=""
        />
        <Picker.Item
            label="Distributor visit"
            style={styles.pickeritem}
            value="Distributor visit"
        />
    </Picker>
      ),
    },
    
  ];
function CusPickerListD({item,props}) {
    return (
<View>
        <View style={styles.marg5} />
        <View style={styles.viewCustom}>
            <View>
                <Text style={styles.title}>
                    {item.DateHeadingShow}
                </Text>
            </View>
            <View style={styles.textContainer}>
             {item.CUSTOMPICKERS}
            </View>
        </View>
        <View style={styles.marg5} />
    </View>
    );
}

export default function CustomSelect(props) {
    return(
   
       <FlatList
       keyExtractor={(item,index)=>index}
       data={CSdata}
       renderItem={({item}) => <CusPickerListD item={item} />}
       showsVerticalScrollIndicator={false}
       scrollEnabled={false}
     />
)}