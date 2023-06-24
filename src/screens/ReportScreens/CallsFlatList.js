import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import React from 'react';
import FIcon5 from 'react-native-vector-icons/FontAwesome5';
import EIcon5 from 'react-native-vector-icons/EvilIcons';
import FIcon from 'react-native-vector-icons/FontAwesome';
import { Colors } from '../../assets/config/Colors';
import { FontFamily } from '../../assets/fonts/FontFamily';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';
// import { FontSize } from '../../assets/fonts/Fonts';

const { width } = Dimensions.get('screen');

function Totalcall({ item, props, heading }) {

    const mode = useSelector(state => state.mode);
    const themecolor = new MyThemeClass(mode).getThemeColor()

    return (
        <>
            <View style={{
                width: width * 0.92,
                justifyContent: 'center',
                alignSelf: 'center'
            }}>
                <TouchableOpacity
                    // onPress={() => navigation.navigate('Store1')}
                    style={{
                        backgroundColor: '#FFF',
                        borderWidth: 0.5,
                        borderColor: themecolor.BOXBORDERCOLOR1,
                        // alignItems: 'center',
                        padding: 12,
                        borderRadius: 10,
                        marginTop: 8,
                        // elevation: 2,
                        backgroundColor:themecolor.BOXTHEMECOLOR
                    }}>

                    <View
                        style={{
                            flexDirection: 'row',
                            width: width * 0.88,
                        }}>
                        <View style={{ width: width * 0.68 }}>
                            <Text
                                style={{
                                    fontFamily: FontFamily.Popinssemibold,
                                    color: Colors.black,
                                    fontSize: 13,
                                    color: themecolor.TXTWHITE
                                }}>
                                {
                                    heading == 'New onboarding outlets' ? item.OutletName : item.Outlets.OutletName
                                }
                            </Text>
                        </View>
                        <View style={{ width: 70, height: 18, padding: 2, borderRadius: 30, backgroundColor: '#54c130', justifyContent: 'center', backgroundColor: item.color, }}>
                            <Text style={{ fontSize: 9, justifyContent: 'center', alignSelf: 'center', color: '#FFF', fontFamily: FontFamily.Popinssemibold }}>{item.shoptype}</Text>
                        </View>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 2
                        }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                width: 170,
                                left: -5,
                            }}>
                            <EIcon5 name="user" size={22} color={Colors.bluetheme} />
                            <Text
                                style={{
                                    fontFamily: FontFamily.PopinsRegular,
                                    color: Colors.black,
                                    fontSize: 10,
                                    color: themecolor.TXTWHITE
                                }}>

                                {
                                    heading == 'New onboarding outlets' ? item.OutletContactName :
                                        item.Outlets.OutletContactName
                                }
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <FIcon name="mobile-phone" size={20} color={Colors.bluetheme} />
                            
                            <Text
                                style={{
                                    fontFamily: FontFamily.PopinsRegular,
                                    color: Colors.black,
                                    fontSize: 10,
                                    left: 5,
                                    color: themecolor.TXTWHITE
                                }}>
                                {
                                    heading == 'New onboarding outlets' ?
                                        item.OutletContactNo : item.Outlets.OutletContactNo}
                            </Text>
                            
                        </View>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 5,
                            maxWidth: width * 0.82,
                        }}>
                        <FIcon5
                            name="map-marker-alt"
                            size={15}
                            color={Colors.bluetheme}
                        />
                        <Text
                            style={{
                                fontFamily: FontFamily.PopinsRegular,
                                color: Colors.black,
                                fontSize: 10,
                                left: 5,
                                color: themecolor.TXTWHITE
                            }}>
                            {
                                heading == 'New onboarding outlets' ?
                                    item.OutletAddress : item.Outlets.OutletAddress
                            }
                        </Text>
                    </View>
                </TouchableOpacity>

            </View>


            {/* {props.list == 'show' ?
                (

                    <TouchableOpacity
                        key={item.id}
                        style={{
                            backgroundColor: '#FFFFFF',
                            width: width * 0.93,
                            marginTop: 10,
                            padding: 7,
                            borderRadius: 15,
                            alignSelf: 'center',
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderWidth: 1,
                            borderColor: Colors.borderColor,
                            marginBottom: 1,
                        }}>
                        <View style={{
                            width: 48, borderRadius: 100, height: 48,
                            backgroundColor: 'green', justifyContent: 'center'
                        }}>
                            <Text style={{
                                fontSize: 20,
                                fontFamily: FontFamily.Popinssemibold,
                                color: 'white',
                                textTransform: 'capitalize',
                                justifyContent: 'center',
                                alignSelf: 'center',
                            }}>
                                {item.shop.substring(0, 1)}
                            </Text>
                        </View>
                        <View style={{ marginLeft: 10 }}>
                            <Text style={{
                                fontSize: 14,
                                fontFamily: FontFamily.Popinssemibold,
                                color: '#121327',
                                textTransform: 'capitalize'
                            }}>{outletName}</Text>

                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                                <Text style={{
                                    fontSize: 12,
                                    fontFamily: FontFamily.PopinsMedium,
                                    color: '#121327',

                                }}>{outletContactName}</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                                <Text style={{
                                    fontSize: 12,
                                    fontFamily: FontFamily.PopinsMedium,
                                    color: '#121327',
                                }}>{outletContactNo}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                ) : (
                    <View style={{ justifyContent: 'center', alignSelf: 'center', width: width * 0.93, }} >

                        <TouchableOpacity onPress={() => navigation.navigate('Store1')}
                            style={{
                                // flexDirection: 'row',
                                backgroundColor: '#FFF',
                                borderWidth: 0.5,
                                borderColor: Colors.borderColor,
                                // alignItems: 'center',
                                padding: 12,
                                borderRadius: 10,
                                marginTop: 8,
                                elevation: 2,
                            }}>

                            <View
                                style={{
                                    flexDirection: 'row',
                                    // alignItems: 'center',
                                    width: width * 0.88
                                }}>
                                <View style={{ width: width * 0.68 }}>
                                    <Text
                                        style={{
                                            fontFamily: FontFamily.Popinssemibold,
                                            color: Colors.black,
                                            fontSize: 13,
                                        }}>
                                        {outletName}
                                    </Text>
                                </View>
                                <View style={{ width: 70, height: 18, padding: 2, borderRadius: 30, backgroundColor: '#54c130', justifyContent: 'center', backgroundColor: item.color, }}>
                                    <Text style={{ fontSize: 9, justifyContent: 'center', alignSelf: 'center', color: '#FFF', fontFamily: FontFamily.Popinssemibold }}>{item.shoptype}</Text>
                                </View>
                            </View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginTop: 2
                                }}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        width: 170,
                                        left: -5,
                                    }}>
                                    <EIcon5 name="user" size={22} color={Colors.bluetheme} />
                                    <Text
                                        style={{
                                            fontFamily: FontFamily.PopinsRegular,
                                            color: Colors.black,
                                            fontSize: 10,
                                        }}>
                                        {outletContactName}
                                    </Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <FIcon name="mobile-phone" size={20} color={Colors.bluetheme} />
                                    <Text
                                        style={{
                                            fontFamily: FontFamily.PopinsRegular,
                                            color: Colors.black,
                                            fontSize: 10,
                                            left: 5
                                        }}>
                                        {outletContactNo}
                                    </Text>
                                </View>
                            </View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginTop: 5,
                                    maxWidth: width * 0.82,
                                }}>
                                <FIcon5
                                    name="map-marker-alt"
                                    size={15}
                                    color={Colors.bluetheme}
                                />
                                <Text
                                    style={{
                                        fontFamily: FontFamily.PopinsRegular,
                                        color: Colors.black,
                                        fontSize: 10,
                                        left: 5,
                                    }}>
                                    {outletAddress}
                                </Text>
                            </View>

                            {(props.view == true)
                                &&
                                <View>
                                    < Divider style={{
                                        height: height * 0.02,
                                        width: width * 0.85,
                                        alignSelf: 'center',
                                        color: Colors.borderColor
                                    }} orientation="horizontal" width={0.3} />
                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        width: width * 0.85,
                                        alignSelf: 'center',
                                        paddingVertical: 5,

                                    }}>
                                        <View style={{
                                            justifyContent: 'center',
                                            alignSelf: 'center',
                                            top: 7
                                        }}>
                                            <Text style={{
                                                color: Colors.bluetheme,
                                                fontFamily: FontFamily.PopinsMedium,
                                                fontSize: FontSize.labelText
                                            }}>
                                                Check In
                                            </Text>
                                            <Text style={{
                                                color: Colors.black,
                                                fontSize: FontSize.labelText,
                                                fontFamily: FontFamily.PopinsMedium
                                            }}>
                                                10:24:12
                                            </Text>
                                        </View>
                                        <View style={{
                                            justifyContent: 'center',
                                            alignSelf: 'center',
                                            top: 7
                                        }}>
                                            <Text style={{
                                                color: Colors.bluetheme,
                                                fontFamily: FontFamily.PopinsMedium,
                                                fontSize: FontSize.labelText
                                            }}>
                                                Check Out
                                            </Text>
                                            <Text style={{
                                                color: Colors.black,
                                                fontSize: FontSize.labelText,
                                                fontFamily: FontFamily.PopinsMedium
                                            }}>
                                                10:24:12
                                            </Text>
                                        </View>
                                    </View>
                                </View>}



                        </TouchableOpacity>

                        <View style={{ marginVertical: 2 }} />
                    </View >

                )

            } */}

        </>


    );
}

export function CallsFlatList(props) {

    return (
        <>
            <FlatList
                data={props.data}
                renderItem={({ item }) => (<Totalcall item={item} props={props} heading={props.heading} />)}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.id}
                scrollEnabled={true}

            />

        </>
    )
}