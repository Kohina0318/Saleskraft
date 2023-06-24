import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Dimensions, StatusBar } from 'react-native';
import React, { useEffect,useState } from 'react';
import { Colors } from '../config/Colors';
import { FontFamily } from '../config/FontFamily';
import { FlatList } from 'react-native-gesture-handler';
import { FontSize } from '../config/Fonts';
import FIcon from 'react-native-vector-icons/FontAwesome';
import EIcon5 from 'react-native-vector-icons/EvilIcons';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import FIcon5 from 'react-native-vector-icons/FontAwesome5';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';

const { width, height } = Dimensions.get('window')
const stockdata = [
    {
        id: 1,
        shop: 'Gheli Medicines',
        shoptype: 'cosmetic store',
        name: 'Jaykishan Dabe',
        class: 'B+',
        openingdate: '02 feb 2022',
        address: '1 shangita apartment, Padli,Ahemdabad,Gujraat',
        mobile: '9131372790',
        shopid: 'VEGA#RE01',
        dob: '27 May 1997',
        anniversary: '08 Feb 2019'

    },
]
const stockdata1 = [
    {
        id: 1,
        shop: 'Delhi Warehouse',
        shoptype: 'cosmetic store',
        name: 'Jaykishan Dabe',
        class: 'B+',
        openingdate: '02 feb 2022',
        address: '1 shangita apartment, Padli,Ahemdabad,Gujraat',
        mobile: '9131372790',
        shopid: 'VEGA#RE01',
        dob: '27 May 1997',
        anniversary: '08 Feb 2019',
        channel: 'A'

    },
]
const paymentdetails = [
    {
        id: '1',
        orderno: 'VEG000#391',
        totalitems: '5 items',
        subtotal: '771',
        margin: '2216'
    }
]
const Cdata = [
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
                source={require('../../vegaimg/product/nailfile.png')}
                resizeMode={'contain'}
            />

        ),
        quantity: '3',
        amount: '135'
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
                source={require('../../vegaimg/product/Dzynernailfile.jpg')}
                resizeMode={'contain'}
            />
        ),
        quantity: '3',
        amount: '135'
    },
    {
        name: 'Cuticle Nipper',
        name1: '78.62',
        // screen: 'AttendanceReport',
        pic2: (

            <Image
                style={{
                    width: 55,
                    height: 55,
                    justifyContent: 'center',
                    alignSelf: 'center',
                }}
                source={require('../../vegaimg/product/CuticleNipper.png')}
                resizeMode={'contain'}
            />
        ),
        quantity: '3',
        amount: '135'
    },

];
const OrderDetails = (props) => {
    const [selection, setSelection] = useState('')
    const [box, setBox] = useState(<Summary />)

    function CustomerList({ item, }) {
        return (
            <>
                <View style={{ justifyContent: 'center', alignSelf: 'center', flex: 1, alignContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={{
                            width: width * 0.92,
                            margin: 2,
                            borderRadius: 10,
                            overflow: 'hidden',
                            borderColor: Colors.borderColor,
                            borderWidth: 1,
                        }}
                    // onPress={() => props.navigation.navigate(item.screen)}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                paddingVertical: 10,
                                backgroundColor: Colors.white,
                                overflow: 'hidden',
                                // elevation: 5,
                            }}>
                            <View style={{ width: width * 0.2 }}>{item.pic2}</View>
                            <View style={{ width: width * 0.7, alignSelf: 'center', }}>
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
                                        width: width * 0.7
                                    }}>
                                    <FAIcon name='rupee' size={10} /> {item.name1}
                                </Text>

                            </View>
                            <View style={{ alignSelf: 'center', right: 50 }}>
                                <Text style={{ color: Colors.black }}> <FAIcon name='rupee' size={12} /> {item.amount}</Text>
                            </View>

                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ marginVertical: 3 }} />
            </>
        );
    }

    function Summary() {
        return (
            <View>
                <View>
                    <View>
                        <Text style={{ fontFamily: FontFamily.PopinsMedium, color: Colors.black, fontSize: 12.5 }}>Status</Text>
                    </View>
                    <View style={{ backgroundColor: 'white', borderRadius: 10, borderWidth: 1, borderColor: Colors.borderColor }}>
                        <View style={{ flex: 1 }}>
                            <ProgressSteps>
                                <ProgressStep label="Ordered">
                                    <View style={{ alignItems: 'center' }}>
                                        {/* <Text>This is the content within step 1!</Text> */}
                                    </View>
                                </ProgressStep>
                                <ProgressStep label="Confirmed">
                                    <View style={{ alignItems: 'center' }}>
                                        {/* <Text>This is the content within step 2!</Text> */}
                                    </View>
                                </ProgressStep>
                                <ProgressStep label="Completed">
                                    <View style={{ alignItems: 'center' }}>
                                        {/* <Text>This is the content within step 3!</Text> */}
                                    </View>
                                </ProgressStep>
                            </ProgressSteps>
                        </View>
                    </View>
                    <View>
                        <Text style={{ fontFamily: FontFamily.PopinsMedium, color: Colors.black, fontSize: 12.5 }}>Customer details</Text>
                    </View>
                    <View style={{ flexDirection: 'row', backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: Colors.borderColor, alignItems: 'center', padding: 10, borderRadius: 10, }}>
                        <View style={{}}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', left: -5 }}>
                                <Text style={{ fontFamily: FontFamily.Popinssemibold, color: Colors.black }}> {stockdata[0].shop}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', width: 170, left: -5 }}>
                                    <EIcon5 name='user' size={25} color={Colors.bluetheme} />
                                    <Text style={{ fontFamily: FontFamily.PopinsRegular, color: Colors.black, fontSize: 10, left: 0 }}>{stockdata[0].name}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <FIcon name='mobile-phone' size={22} color={Colors.bluetheme} />
                                    <Text style={{ fontFamily: FontFamily.PopinsRegular, color: Colors.black, fontSize: 10, left: 5 }}>{stockdata[0].mobile}</Text>
                                </View>

                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5, maxWidth: width * 0.82, }}>
                                <FIcon5 name='map-marker-alt' size={18} color={Colors.bluetheme} />
                                <Text style={{ fontFamily: FontFamily.PopinsRegular, color: Colors.black, fontSize: 10, left: 5 }}>{stockdata[0].address}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ marginTop: 8 }} />
                <View>
                    <View>
                        <Text style={{ fontFamily: FontFamily.PopinsMedium, color: Colors.black, fontSize: 12.5 }}>Distributor</Text>
                    </View>
                    <View style={{ flexDirection: 'row', backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: Colors.borderColor, alignItems: 'center', padding: 10, borderRadius: 10 }}>
                        <View style={{}}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', left: -5 }}>
                                <Text style={{ fontFamily: FontFamily.Popinssemibold, color: Colors.black }}> {stockdata1[0].shop}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', width: 170, left: -5 }}>
                                    <EIcon5 name='user' size={25} color={Colors.bluetheme} />
                                    <Text style={{ fontFamily: FontFamily.PopinsRegular, color: Colors.black, fontSize: 10, left: 0 }}>{stockdata1[0].name}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <FIcon name='mobile-phone' size={22} color={Colors.bluetheme} />
                                    <Text style={{ fontFamily: FontFamily.PopinsRegular, color: Colors.black, fontSize: 10, left: 5 }}>{stockdata1[0].mobile}</Text>
                                </View>

                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5, maxWidth: width * 0.82, }}>
                                <FIcon5 name='map-marker-alt' size={18} color={Colors.bluetheme} />
                                <Text style={{ fontFamily: FontFamily.PopinsRegular, color: Colors.black, fontSize: 10, left: 5 }}>{stockdata1[0].address}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5, maxWidth: width * 0.82, }}>
                                <FIcon name='tag' size={18} color={Colors.bluetheme} />
                                <Text style={{ fontFamily: FontFamily.PopinsRegular, color: Colors.black, fontSize: 10, left: 5 }}>Channel Category: {stockdata1[0].channel}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ marginTop: 8 }} />
                <View>
                    <View>
                        <Text style={{ fontFamily: FontFamily.PopinsMedium, color: Colors.black, fontSize: 12.5 }}>Distributor</Text>
                    </View>
                    <View style={{ alignSelf: 'center', width: '100%', borderRadius: 12, overflow: 'hidden', backgroundColor: 'white', borderWidth: 1, borderColor: Colors.borderColor, }}>
                        <View style={{ borderBottomWidth: 1, borderBottomColor: '#F4F4F4', width: '92%', alignSelf: 'center', paddingVertical: 10, }}>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                                <Text style={{ fontFamily: FontFamily.PopinsRegular, color: Colors.black, fontSize: 10 }}>Order no.</Text>
                                <Text style={{ fontFamily: FontFamily.PopinsRegular, color: Colors.black, fontSize: 10 }}>{paymentdetails[0].orderno}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                                <Text style={{ fontFamily: FontFamily.PopinsRegular, color: Colors.black, fontSize: 10 }}>Total items</Text>
                                <Text style={{ fontFamily: FontFamily.PopinsRegular, color: Colors.black, fontSize: 10 }}>{paymentdetails[0].totalitems}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                                <Text style={{ fontFamily: FontFamily.PopinsRegular, color: Colors.black, fontSize: 10 }}>Sub total</Text>
                                <Text style={{ fontFamily: FontFamily.PopinsRegular, color: Colors.black, fontSize: 10, }}> <FIcon name={'rupee'} size={10} /> {paymentdetails[0].subtotal}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                                <Text style={{ fontFamily: FontFamily.PopinsRegular, color: Colors.black, fontSize: 10 }}>PTR margin</Text>
                                <Text style={{ fontFamily: FontFamily.PopinsRegular, color: Colors.black, fontSize: 10, }}> <FIcon name={'rupee'} size={10} /> {paymentdetails[0].margin}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', width: '92%', justifyContent: 'space-between', paddingVertical: 10, alignItems: 'center', alignSelf: 'center' }}>
                            <View style={{}}>
                                <Text style={{ fontFamily: FontFamily.PopinsMedium, color: Colors.black, fontSize: 12, }}>Total</Text>
                            </View>
                            <View style={{}}>

                                <Text style={{ fontFamily: FontFamily.PopinsMedium, color: Colors.black, fontSize: 12, }}><FIcon name={'rupee'} /> 500</Text>
                            </View>
                        </View>


                    </View>
                </View>

            </View>
        )
    }

    function Item() {
        return (
            <View>
                <FlatList
                    data={Cdata}
                    renderItem={({ item }) => <CustomerList item={item} />}
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={false}
                />
            </View>
        )
    }


    useEffect(() => {
        setSelection('1');
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: Colors.mainbg }}>
            <StatusBar translucent backgroundColor="transparent" />

            <View>
                <View style={{ height: 135, backgroundColor: Colors.bluetheme, borderRadius: 15 }}>

                    <View style={{ marginTop: 25, }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: 15,
                                top: 5,
                            }}>
                            <TouchableOpacity
                                activeOpacity={1}
                                onPress={() => props.navigation.goBack()}>
                                <Image
                                    source={require('../../vegaimg/back.png')}
                                    style={{ width: 25, height: 30 }}
                                    resizeMode={'contain'}
                                />
                            </TouchableOpacity>
                            <View style={{ width: width * 0.8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Text style={{ ...styles.Text, left: -10 }}>Order Details</Text>

                            </View>

                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: width * 0.85, alignSelf: 'center' }}>
                        <TouchableOpacity onPress={() => { setSelection('1'); setBox(<Summary />) }}><Text style={{ fontFamily: FontFamily.PopinsRegular, fontSize: 14, color: (selection == 1) ? 'white' : 'black' }}>Summary</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => { setSelection('2'); setBox(<Item />) }}><Text style={{ fontFamily: FontFamily.PopinsRegular, fontSize: 14, color: (selection == 2) ? 'white' : 'black' }}>Items</Text></TouchableOpacity>
                    </View>
                </View>
                <ScrollView showsVerticalScrollIndicator={false} style={{ height: height, }} >
                    <View style={{ width: width * 0.93, alignSelf: 'center', marginTop: 10 }}>
                        {box}
                    </View>

                </ScrollView>
            </View>
        </View>
    )
}
export default OrderDetails

const styles = StyleSheet.create({
    Text: {
        fontSize: FontSize.labelText5,
        fontFamily: FontFamily.PopinsRegular,
        color: Colors.white,
    },
})