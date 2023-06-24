import React from 'react';
import {
    TouchableOpacity,
    View,
    FlatList,
    Text,
    Dimensions,
} from 'react-native';

import EIcon5 from 'react-native-vector-icons/EvilIcons';
import FIcon5 from 'react-native-vector-icons/FontAwesome5';
import FIcon from 'react-native-vector-icons/FontAwesome';
import { Colors } from '../../assets/config/Colors';
import styles from '../../assets/css/styleRequestMerch'
import { useNavigation } from '@react-navigation/native';
const { width } = Dimensions.get('window');

const merchdata = [
    {
        id: 1,
        shop: 'Gheli Medicines',
        shoptype: 'Cash & Carry',
        name: 'Jaykishan Dabe',
        class: 'B+',
        address: '1 shangita apartment, Padli,Ahemdabad,Gujraat',
        mobile: '9131372790',
        color: '#54c130',
    },
    {
        id: 1,
        shop: 'Pathik Chemist',
        shoptype: 'Retail',
        name: 'Ajay Kumar',
        class: 'B+',
        address: '1 shangita apartment, Padli,Ahemdabad,Gujraat',
        mobile: '9131372790',
        color: 'skyblue'
    },
];

function MerchView({ item, props }) {
    const navigation = useNavigation()
    return (
        <>
            <TouchableOpacity onPress={() => navigation.navigate('RequestMerchandise')}
                style={styles.FLMAINView}>
                <View style={{ width: width * 0.87 }}>
                    <View
                        style={styles.FL1}>
                        <View style={{ flex: 1 }}>
                            <Text
                                style={styles.FLHeadText}>
                                {item.shop}
                            </Text>
                        </View>
                        <View style={{ ...styles.TagView, backgroundColor: item.color }}><Text style={styles.TagText}>{item.shoptype}</Text></View>
                    </View>
                    <View
                        style={styles.FLVIEW}>
                        <View
                            style={styles.FLVIEW2}>
                            <EIcon5 name="user" size={22} color={Colors.bluetheme} />
                            <Text
                                style={styles.SmallHeading}>
                                {item.name}
                            </Text>
                        </View>
                        <View style={styles.MPVIew}>
                            <FIcon name="mobile-phone" size={20} color={Colors.bluetheme} />
                            <Text
                                style={styles.MobileText}>
                                {item.mobile}
                            </Text>
                        </View>
                    </View>

                    <View
                        style={styles.StarVIew}>
                        <View
                            style={styles.FLVIEW3}>
                            <FIcon name="star" size={15} color={Colors.bluetheme} />
                            <Text
                                style={styles.MobileText}>
                                Classification: {item.class}
                            </Text>
                        </View>
                    </View>
                    <View
                        style={styles.NEWVIEW82}>
                        <FIcon5
                            name="map-marker-alt"
                            size={15}
                            color={Colors.bluetheme}
                        />
                        <Text
                            style={styles.MobileText}>
                            {item.address}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
            <View style={styles.MV} />

        </>
    );
}

export function MerchDataList(props) {
    return (
        <FlatList
            data={merchdata}
            renderItem={({ item }) => <MerchView item={item} />}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
        />
    );
}