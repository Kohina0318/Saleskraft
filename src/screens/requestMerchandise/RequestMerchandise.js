import {
    StatusBar,
    View,
} from 'react-native';
import React from 'react';
import Header_2 from '../../components/shared/Header_2';
import styles from '../../assets/css/stylesBeat';
import { RequestMechandiseDataList } from '../../screens/requestMerchandise/RequestMerchandiseDataList';

export default function RequestMerchandise(props) {
    return (
        <View style={styles.MainView}>
            <StatusBar translucent backgroundColor="transparent" />
            <View style={styles.container}>
                <Header_2 title={"Request Merchandise"} onPress={() =>props.navigation.goBack()} />
            </View>
            <RequestMechandiseDataList />           
        </View>
    )
}