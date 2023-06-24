import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Dimensions, StatusBar } from 'react-native';
import React, { useRef } from 'react';
import { Colors } from '../config/Colors';
import { FontFamily } from '../config/FontFamily';
import { FlatList } from 'react-native-gesture-handler';
import { FontSize } from '../config/Fonts';
import FIcon from 'react-native-vector-icons/FontAwesome';
import RBSheet from 'react-native-raw-bottom-sheet';
import { RadioButton } from 'react-native-paper';

const { width, height } = Dimensions.get('window')
const recentdata = [
    {
        id: 1,
        orderno: 'ORD123',
        orderdate: '16/02/2022',
        subtotal: '1600',
        status: 'Ordered',
        statuscolor: '#F88E3E',
        btn: 'view',
        customer: 'Jaykishan Dave',
        icon: 'shopping-cart'

    },
    {
        id: 2,
        orderno: 'ORD124',
        orderdate: '11/02/2022',
        subtotal: '2180',
        status: 'Confirmed',
        statuscolor: '#00C46F',
        btn: 'view',
        customer: 'Jaykishan Dave',
        icon: 'check-circle'
    }
]

const datachecked = [
    {
        name: 'Ordered',
        id: '0',
    },
    {
        name: 'Confirmed',
        id: '1',
    },
    {
        name: 'Completed',
        id: '2',
    },
    {
        name: 'Cancelled',
        id: '3',
    },
    {
        name: 'Cancellation requested',
        id: '4',
    },
];

// const button = [
//     {
//         point: (
//             <View
//                 style={{
//                     backgroundColor: '#ebecef',
//                     borderRadius: 10,
//                     width: 90,
//                     height: 30,
//                     justifyContent: 'center',
//                 }}>
//                 <Text
//                     style={{
//                         alignSelf: 'center',
//                         fontFamily: FontFamily.PopinsMedium,
//                         fontSize: 11,
//                     }}>
//                     Contacted
//                 </Text>
//             </View>
//         ),
//     },
//     {
//         point: (
//             <View
//                 style={{
//                     backgroundColor: '#ebecef',
//                     borderRadius: 10,
//                     width: 90,
//                     height: 30,
//                     justifyContent: 'center',
//                 }}>
//                 <Text
//                     style={{
//                         alignSelf: 'center',
//                         fontFamily: FontFamily.PopinsMedium,
//                         fontSize: 11,
//                     }}>
//                     Not contacted
//                 </Text>
//             </View>
//         ),
//     },
//     {
//         point: (
//             <View
//                 style={{
//                     backgroundColor: '#ebecef',
//                     borderRadius: 10,
//                     width: 90,
//                     height: 30,
//                     justifyContent: 'center',
//                 }}>
//                 <Text
//                     style={{
//                         alignSelf: 'center',
//                         fontFamily: FontFamily.PopinsMedium,
//                         fontSize: 11,
//                     }}>
//                     Intrested
//                 </Text>
//             </View>
//         ),
//     },
//     {
//         point: (
//             <View
//                 style={{
//                     backgroundColor: '#ebecef',
//                     borderRadius: 10,
//                     width: 90,
//                     height: 30,
//                     justifyContent: 'center',
//                 }}>
//                 <Text
//                     style={{
//                         alignSelf: 'center',
//                         fontFamily: FontFamily.PopinsMedium,
//                         fontSize: 11,
//                     }}>
//                     Not intrested
//                 </Text>
//             </View>
//         ),
//     },
//     {
//         point: (
//             <View
//                 style={{
//                     backgroundColor: '#4261f7',
//                     borderRadius: 10,
//                     width: 90,
//                     height: 30,
//                     justifyContent: 'center',
//                 }}>
//                 <Text
//                     style={{
//                         alignSelf: 'center',
//                         fontFamily: FontFamily.PopinsMedium,
//                         fontSize: 11,
//                         color: '#FFF',
//                     }}>
//                     Hot Followup
//                 </Text>
//             </View>
//         ),
//     },
//     {
//         point: (
//             <View
//                 style={{
//                     backgroundColor: '#ebecef',
//                     borderRadius: 10,
//                     width: 90,
//                     height: 30,
//                     justifyContent: 'center',
//                 }}>
//                 <Text
//                     style={{
//                         alignSelf: 'center',
//                         fontFamily: FontFamily.PopinsMedium,
//                         fontSize: 11,
//                     }}>
//                     Sales Closed
//                 </Text>
//             </View>
//         ),
//     },
//     {
//         point: (
//             <View
//                 style={{
//                     backgroundColor: '#ebecef',
//                     borderRadius: 10,
//                     width: 90,
//                     height: 30,
//                     justifyContent: 'center',
//                 }}>
//                 <Text
//                     style={{
//                         alignSelf: 'center',
//                         fontFamily: FontFamily.PopinsMedium,
//                         fontSize: 11,
//                     }}>
//                     Cold Followup
//                 </Text>
//             </View>
//         ),
//     },
// ];

// function VerticalButton({ item }) {
//     return (
//         <View
//             style={{
//                 // flex: 1,
//                 // justifyContent: 'center',
//                 // alignSelf: 'center',
//                 flexDirection: 'row',
//                 // backgroundColor:'red',width:100,height:40
//                 padding: 2,
//             }}>
//             <TouchableOpacity
//                 style={{}}
//                 activeOpacity={1}
//                 onPress={() => props.navigation.navigate('Inventory')}>
//                 {item.point}
//             </TouchableOpacity>
//         </View>
//     );
// }

function ItemCheked({ item, props, checked, setChecked }) {
    const [g, s] = React.useState({});
    const handleRadioBox = (id, name) => {
        console.log('Event>>>>', id, name);
        s(prev => ({ ...prev, [id]: name }));
        setChecked(name);
    };
    var col = Object.keys(g).indexOf(item.id.toString());
    var answr;
    answr = g[item.id];
    return (
        <TouchableOpacity
            onPress={() => handleRadioBox(item.id, item.name)}
            activeOpacity={1}
            style={{ backgroundColor: checked == answr ? '#FFF' : '#fff' }}>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignSelf: 'flex-start',
                }}>
                <RadioButton
                    value={answr}
                    color={'#000'}
                    uncheckedColor={'#000'}
                    status={checked == answr ? 'checked' : 'unchecked'}
                    onPress={() => handleRadioBox(item.id, item.name)}
                />

                <Text
                    style={{
                        top: 10,
                        fontFamily: FontFamily.PopinsRegular,
                        color: Colors.black,
                        // left: 10,
                        fontSize: FontSize.labelText,
                    }}>
                    {item.name}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const OrderList = (props) => {
    const [checked, setChecked] = React.useState('English');
    const refRBSheet1 = useRef();
    return (
        <View style={{ flex: 1, backgroundColor: Colors.mainbg }}>
            <StatusBar translucent backgroundColor="transparent" />

            <View>
                <View style={{ height: 90, backgroundColor: Colors.bluetheme, borderRadius: 15 }}>

                    <View style={{ top: 25, }}>
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
                                <Text style={{ ...styles.Text, left: -10 }}>Order list</Text>
                                <TouchableOpacity onPress={() => refRBSheet1.current.open()} >
                                    <Image source={require('../../vegaimg/dashboard_filter.png')} style={{ width: 20, height: 20 }} />
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                </View>
                <ScrollView showsVerticalScrollIndicator={false} style={{ height: height, }} >
                    {/* <View style={{marginTop:10}} /> */}
                    <View style={{ width: width * 0.93, alignSelf: 'center' }}>
                        <FlatList
                            data={recentdata}
                            keyExtractor={(item) => item.id}

                            renderItem={({ item }) => {
                                return (
                                    <View style={{ alignSelf: 'center', width: '100%', borderRadius: 12, overflow: 'hidden', backgroundColor: 'white', borderWidth: 1, borderColor: Colors.borderColor, marginTop: 10 }}>
                                        <View style={{ borderBottomWidth: 1, borderBottomColor: '#F4F4F4', width: '92%', alignSelf: 'center', paddingTop: 10, }}>

                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                                                <Text style={{ fontFamily: FontFamily.PopinsRegular, color: Colors.black, fontSize: 10 }}>Order no.</Text>
                                                <Text style={{ fontFamily: FontFamily.PopinsRegular, color: Colors.black, fontSize: 10 }}>{item.orderno}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                                                <Text style={{ fontFamily: FontFamily.PopinsRegular, color: Colors.black, fontSize: 10 }}>Order date.</Text>
                                                <Text style={{ fontFamily: FontFamily.PopinsRegular, color: Colors.black, fontSize: 10 }}>{item.orderdate}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                                                <Text style={{ fontFamily: FontFamily.PopinsRegular, color: Colors.black, fontSize: 10 }}>Sub total</Text>
                                                <Text style={{ fontFamily: FontFamily.PopinsRegular, color: Colors.black, fontSize: 10 }}>{item.subtotal}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                                                <Text style={{ fontFamily: FontFamily.PopinsRegular, color: Colors.black, fontSize: 10 }}>Customer</Text>
                                                <Text style={{ fontFamily: FontFamily.PopinsRegular, color: Colors.black, fontSize: 10 }}>{item.customer}</Text>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'row', width: '92%', justifyContent: 'space-between', paddingVertical: 10, alignItems: 'center', alignSelf: 'center' }}>
                                            <View style={{}}>

                                                <Text style={{ fontFamily: FontFamily.PopinsRegular, color: item.statuscolor, fontSize: 11 }}><FIcon name={item.icon} /> {item.status}</Text>
                                            </View>
                                            <TouchableOpacity style={{ backgroundColor: Colors.bluetheme, borderRadius: 10, paddingHorizontal: 8, height: 20, justifyContent: 'center', alignItems: 'center' }} onPress={() => props.navigation.navigate('OrderDetails')}>
                                                <Text style={{ fontFamily: FontFamily.PopinsRegular, color: Colors.white, fontSize: 8 }}>view order</Text>
                                            </TouchableOpacity>
                                        </View>


                                    </View>
                                )
                            }}
                        />
                    </View>



                </ScrollView>
            </View>
            <RBSheet
                ref={refRBSheet1}
                animationType={'slide'}
                closeOnDragDown={true}
                closeOnPressMask={true}
                height={350}
                customStyles={{
                    container: {
                        borderTopRightRadius: 20,
                        borderTopLeftRadius: 20,
                        borderBottomLeftRadius: 0,
                    },
                    draggableIcon: {
                        display: 'none',
                    },
                }}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: 20,
                        top: 10
                    }}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => refRBSheet1.current.close()}>
                        <Image
                            source={require('../../vegaimg/close.png')}
                            style={{ width: 14, height: 14 }}
                            resizeMode={'contain'}
                        />
                    </TouchableOpacity>
                    <View>
                        <Text style={{ ...styles.CardText, color: Colors.black, fontFamily: FontFamily.Popinssemibold }}>Set Filters</Text>
                    </View>
                    <View>
                        <View>
                            <TouchableOpacity
                                activeOpacity={1}
                                onPress={() => refRBSheet1.current.close()}>
                                <Text style={{ ...styles.RBText, color: Colors.bluetheme }}>
                                    Done
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                {/* <View style={{...styles.Borderline}} /> */}
                <View
                    style={{ justifyContent: 'center', alignSelf: 'center', flex: 1 }}>
                    <View style={{ width: width * 0.9 }}>
                        <Text
                            style={{ ...styles.CardText, alignSelf: 'flex-start', left: 10, color: Colors.black, fontFamily: FontFamily.PopinsMedium }}>
                            Order status filter
                        </Text>
                    </View>
                    <View style={{ marginTop: 10 }} />
                    <View
                        style={{
                            // flexDirection: 'row',
                            justifyContent: 'center',
                            alignSelf: 'center',
                            width: width * 0.9,
                        }}>
                        <FlatList
                            data={datachecked}
                            renderItem={({ item }) => (
                                <ItemCheked
                                    item={item}
                                    props={props}
                                    checked={checked}
                                    setChecked={setChecked}
                                />
                            )}
                            keyExtractor={item => item.id}
                        />
                        <View style={{ marginVertical: 10 }} />
                        {/* <Text
                            style={{ ...styles.CardText, alignSelf: 'flex-start', left: 10 }}>
                            Call type
                        </Text>
                        <FlatList
                            data={button}
                            renderItem={({ item }) => <VerticalButton item={item} />}
                            showsHorizontalScrollIndicator={false}
                            numColumns={3}
                        /> */}
                    </View>
                </View>
            </RBSheet>
        </View>
    )
}

export default OrderList

const styles = StyleSheet.create({
    Text: {
        fontSize: FontSize.labelText5,
        fontFamily: FontFamily.PopinsRegular,
        color: Colors.white,
    },
})