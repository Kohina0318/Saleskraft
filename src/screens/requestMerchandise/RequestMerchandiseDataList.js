import React, { useState } from 'react';
import {
    TouchableOpacity,
    View,
    FlatList,
    Text,
    Image,
    Dimensions
} from 'react-native';
import { FontFamily } from '../../assets/fonts/FontFamily';
import { FontSize } from '../../assets/fonts/Fonts';
import { Colors } from '../../assets/config/Colors';
import FAIcon from 'react-native-vector-icons/FontAwesome';
const { width, height } = Dimensions.get('screen');
import NumericInput from 'react-native-numeric-input'

const MerchandiseData = [
    {
        name: 'Nail File Small - NF5-BL',
        name1: '82.62',
        // screen: 'CallStatus',
        pic2: (

            <Image
                style={{
                    width: 55,
                    height: 55,
                    justifyContent: 'center',
                    alignSelf: 'center',
                }}
                source={require('../../assets/images/product/nailfile.png')}
                resizeMode={'contain'}
            />

        ),
    },
    {
        name: 'Dzyner Mini Nail File',
        name1: '82.62',
        // screen: 'AttendanceReport',
        pic2: (

            <Image
                style={{
                    width: 55,
                    height: 55,
                    justifyContent: 'center',
                    alignSelf: 'center',
                }}
                source={require('../../assets/images/product/Dzynernailfile.jpg')}
                resizeMode={'contain'}
            />
        ),
    },
    {
        name: 'Nail Clipper (Large)',
        name1: '90.15',
        // screen: 'AttendanceReport',
        pic2: (

            <Image
                style={{
                    width: 55,
                    height: 55,
                    justifyContent: 'center',
                    alignSelf: 'center',
                }}
                source={require('../../assets/images/product/NailClipper.png')}
                resizeMode={'contain'}
            />
        ),
    },
];
function MerchandiseView({ item }) {
    return (
        <View>
            <View style={{ marginTop: 5 }} />
            <View style={{ justifyContent: 'center', alignSelf: 'center', flex: 1, alignContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity
                    activeOpacity={0.5}
                    style={{
                        width: width * 0.93,
                        margin: 2,
                        borderRadius: 10,
                        overflow: 'hidden',
                        borderColor: Colors.borderColor,
                        borderWidth: 1,

                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingVertical: 10,
                            backgroundColor: Colors.white,
                            overflow: 'hidden',

                        }}>
                        <View style={{ width: width * 0.18, }}>{item.pic2}</View>
                        <View style={{ width: width * 0.5, alignSelf: 'center' }}>
                            <Text
                                style={{
                                    fontSize: FontSize.labelText3,
                                    color: Colors.black,
                                    fontFamily: FontFamily.PopinsMedium,
                                }}>
                                {item.name}
                            </Text>
                            <Text
                                style={{
                                    fontSize: 11,
                                    color: Colors.black,
                                    fontFamily: FontFamily.PopinsRegular,
                                    width: width * 0.62
                                }}>
                                MRP :  <FAIcon name='rupee' size={10} /> {item.name1}
                            </Text>

                        </View>
                        <View style={{ alignContent: 'center', width: width * 0.2, justifyContent: 'center' }}>
                            <NumericInput
                                onLimitReached={(isMax, msg) => console.log(isMax, msg)}
                                totalWidth={70}
                                totalHeight={30}
                                iconSize={28}
                                step={1.5}
                                valueType='interger'
                                separatorWidth={0}
                                inputStyle={{ borderRadius: 4, backgroundColor: 'lightgray' }}
                                containerStyle={{ borderColor: 'white', }}
                                textColor='black'

                            />
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}
export function RequestMechandiseDataList(props) {
    const [modalVisible1, setmodalVisible1] = useState(false);
    return (
        <View style={{ height }} >
            <View style={{ height: height * 0.8 }}>
                <FlatList
                    data={MerchandiseData}
                    renderItem={({ item }) => <MerchandiseView item={item} />}
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={false}
                />
            </View>
            <View style={{ height: height * 0.2 }}>
                <FullsizeButton title={'Submit Request'} onPress={() => setmodalVisible1(true)} />
            </View>
            {modalVisible1 && (
                <VerifyModal
                    modalVisible1={modalVisible1}
                    setmodalVisible1={setmodalVisible1}
                    title={'Your request has been successfully created'}
                />
            )}


        </View>
    );
}