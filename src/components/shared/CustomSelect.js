import React from 'react';
import {
    View,
    Text,
    FlatList
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from '../../assets/css/styleCreateTour';

const CSdata = [
    {
        //   DateHeadingShow:"2 June 2022",
        CUSTOMPICKERS: (
            <Picker
                mode="dropdown"
                style={styles.W1}
                itemStyle={styles.H1}
            >
                <Picker.Item
                    label="Airport Route"
                    style={styles.picker}
                    value="Airport Route"
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

function CusPickerListD({ item, props }) {
    return (
        <View
        // style={styles.widthcenterCustom}
        >
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
        </View>
    );
}

export default function CustomSelect(props) {
    return (

        <FlatList
            data={CSdata}
            renderItem={({ item }) => <CusPickerListD item={item} />}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
        />
    )
}

