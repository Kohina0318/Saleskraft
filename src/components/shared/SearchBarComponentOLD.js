import React from 'react';
import {
    View,
    TextInput,
    Dimensions,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
const { width, height } = Dimensions.get('window')

export default function SearchBar() {
    return (
        <View style={{ width: width * 0.92, alignSelf: 'center', flexDirection: 'row', backgroundColor: 'white', marginTop: 10, borderRadius: 10, height: height * 0.06 }}>
            <View style={{ alignSelf: 'center', left: 10 }}>
                <Icon name="search" size={14} color="lightgray" />
            </View>
            <TextInput style={{ left: 15, width: width * 0.8 }} placeholder='Search' />
        </View>
    )
}