import {
    StatusBar,
    View,
} from 'react-native';
import React from 'react';
import Header_2 from '../../components/shared/Header_2';
import styles from '../../assets/css/stylesBeat';
import SearchBar from '../../components/shared/SearchBarComponent';
import { MerchDataList } from '../../screens/requestMerchandise/MerchDataList';

export default function RequestMerch(props) {
    return (
        <View style={styles. MainView}>
            <StatusBar translucent backgroundColor="transparent" />
            <View style={styles.container}>
                <Header_2 title={"Outlets"} onPress={() =>props.navigation.goBack()} />
            </View>
            <View>
                <SearchBar LeftIcon={'search'} placeholder={"Search Outlets"} />
            </View>
           <MerchDataList />
        </View>
    )
}
