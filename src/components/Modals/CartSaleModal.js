import React, { useState } from 'react';
import {
    View,
    Text,
    Modal,
    Dimensions,
    TextInput,
} from 'react-native';
import { Colors } from '../../assets/config/Colors';
import { FontFamily } from '../../assets/fonts/FontFamily';
import { FontSize } from '../../assets/fonts/Fonts';
const { width } = Dimensions.get('window');
import { Picker } from '@react-native-picker/picker';
import FullsizeButton from '../shared/FullsizeButton';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';

export default function CartSaleModal(props) {
    const mode = useSelector(state => state.mode);
    const themecolor = new MyThemeClass(mode).getThemeColor()

    const [modalCart, setModalCart] = useState(true)

    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalCart}>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    backgroundColor:themecolor.MODAL1,
                }}>
                    <View style={{
                        margin: 25,
                        backgroundColor: themecolor.THEMECOLOR1,
                        borderRadius: 15,
                        padding: 6,
                        alignItems: 'center',
                        shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: 2
                        }
                    }}>
                        <View style={{ width: width * 0.8, height: 'auto', paddingBottom: 20 }}>

                            <View style={{ marginTop: 8, padding: 5 }}>
                                <Text style={{
                                    fontSize: FontSize.buttonText,
                                    fontFamily: FontFamily.Popinssemibold,
                                    color: themecolor.TXTWHITE,
                                }}>
                                    Customer Details
                                </Text>
                            </View>

                            <View style={{
                                flexDirection: 'row',
                                height: 45,
                                borderRadius: 8,
                                borderWidth: 0.5,
                                borderColor: themecolor.BOXBORDERCOLOR1,
                                overflow: 'hidden',
                                backgroundColor: themecolor.RB2,
                            }}>
                                <Picker
                                    mode="dropdown"
                                    selectedValue={props.salutation}
                                    placeholder="Select Salutation"
                                    dropdownIconColor={themecolor.TXTWHITE}
                                    style={{ width: '100%',color:  themecolor.AV2, fontSize: 13,backgroundColor: themecolor.RB2, }}
                                    onValueChange={(itemValue, itemIndex) =>
                                        props.setSalutation(itemValue)
                                    }>
                                    <Picker.Item
                                        label="Select Salutation"
                                        style={{ color:  themecolor.AV2, fontSize: 13, fontFamily: FontFamily.PopinsMedium, backgroundColor: themecolor.RB2,}}
                                    />
                                    <Picker.Item
                                        label="Mr."
                                        value="Mr."
                                        style={{ color:  themecolor.AV2, fontSize: FontSize.labelText, fontFamily: FontFamily.PopinsMedium,backgroundColor: themecolor.RB2, }}
                                    />
                                    <Picker.Item
                                        label="Mrs."
                                        value="Mrs."
                                        style={{ color:  themecolor.AV2, fontSize: FontSize.labelText, fontFamily: FontFamily.PopinsMedium,backgroundColor: themecolor.RB2, }}
                                    />
                                    <Picker.Item
                                        label="Other"
                                        value="Other"
                                        style={{ color: themecolor.AV2, fontSize: FontSize.labelText, fontFamily: FontFamily.PopinsMedium, backgroundColor: themecolor.RB2,}}
                                    />

                                </Picker>
                            </View>

                            <View style={{ marginVertical: 5 }} />

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{
                                    height: 40,
                                    borderRadius: 8,
                                    borderWidth: 0.5,
                                    borderColor: themecolor.BOXBORDERCOLOR1,
                                    overflow: 'hidden',
                                    backgroundColor: themecolor.RB2,
                                    width: width * 0.38
                                }}>
                                    <TextInput placeholder={'First Name'} placeholderTextColor={'lightgrey'} style={{
                                        fontSize: FontSize.labelText,
                                        fontFamily: FontFamily.PopinsMedium,
                                        color: themecolor.TXTWHITE,
                                        left: 8
                                    }} onChangeText={txt => props.setFirstName(txt)} />

                                </View>
                                <View style={{
                                    height: 40,
                                    borderRadius: 8,
                                    borderWidth: 0.5,
                                    borderColor: themecolor.BOXBORDERCOLOR1,
                                    color: Colors.grey,
                                    overflow: 'hidden',
                                    backgroundColor: themecolor.RB2,
                                    width: width * 0.38
                                }}>
                                    <TextInput placeholder={'Last Name'} placeholderTextColor={'lightgrey'} style={{
                                        fontSize: FontSize.labelText,
                                        fontFamily: FontFamily.PopinsMedium,
                                        color: themecolor.TXTWHITE,
                                        left: 8
                                    }} onChangeText={txt => props.setLastName(txt)} />
                                </View>
                            </View>

                            <View style={{ marginVertical: 5 }} />

                            <View style={{
                                height: 40,
                                borderRadius: 8,
                                borderWidth: 0.5,
                                borderColor: themecolor.BOXBORDERCOLOR1,
                                overflow: 'hidden',
                                backgroundColor: themecolor.RB2,
                                width: width * 0.8
                            }}>
                                <TextInput placeholder={'Email Address'} placeholderTextColor={'lightgrey'} style={{
                                    fontSize: FontSize.labelText,
                                    fontFamily: FontFamily.PopinsMedium,
                                    color: themecolor.TXTWHITE,
                                    left: 8
                                }} onChangeText={txt => props.setEmail(txt)} />

                            </View>

                            <View style={{ marginVertical: 5 }} />

                            <View style={{
                                height: 40,
                                borderRadius: 8,
                                borderWidth: 0.5,
                                borderColor: themecolor.BOXBORDERCOLOR1,
                                overflow: 'hidden',
                                backgroundColor: themecolor.RB2,
                                width: width * 0.8
                            }}>

                                <TextInput placeholder={'Phone Number'} placeholderTextColor={'lightgrey'} style={{
                                    fontSize: FontSize.labelText,
                                    fontFamily: FontFamily.PopinsMedium,
                                    color: themecolor.TXTWHITE,
                                    left: 8
                                }} keyboardType="numeric"
                                    maxLength={10}
                                    onChangeText={txt => {
                                        let temp = '';
                                        temp = txt.replace(/[^0-9]/g, '');
                                        if (temp.length === 0) {
                                            props.setMobile('');
                                        } else {
                                            props.setMobile(temp);
                                        }
                                    }} />
                            </View>

                            <View style={{ marginVertical: 5 }} />

                            <View style={{
                                height: 40,
                                borderRadius: 8,
                                borderWidth: 0.5,
                                borderColor: themecolor.BOXBORDERCOLOR1,
                                overflow: 'hidden',
                                backgroundColor: themecolor.RB2,
                                width: width * 0.8
                            }}>

                                <TextInput placeholder={'GST Number'} placeholderTextColor={'lightgrey'} style={{
                                    fontSize: FontSize.labelText,
                                    fontFamily: FontFamily.PopinsMedium,
                                    color: themecolor.TXTWHITE,
                                    left: 8
                                }} onChangeText={txt => props.setGst(txt)} />
                            </View>

                            <View style={{ marginVertical: 5 }} />

                            <View style={{
                                height: 60,
                                borderRadius: 8,
                                borderWidth: 0.5,
                                borderColor: themecolor.BOXBORDERCOLOR1,
                                overflow: 'hidden',
                                backgroundColor:themecolor.RB2,
                                width: width * 0.8
                            }}>

                                <TextInput placeholder={'Remark'} placeholderTextColor={'lightgrey'} style={{
                                    fontSize: FontSize.labelText,
                                    fontFamily: FontFamily.PopinsMedium,
                                    color: themecolor.TXTWHITE,
                                    left: 8
                                }}
                                    onChangeText={txt => props.setRemark(txt)} />
                            </View>

                            <View style={{ marginVertical: 5 }} />

                            <View style={{
                                flexDirection: 'row',
                                height: 45,
                                borderRadius: 8,
                                borderWidth: 0.5,
                                borderColor: themecolor.BOXBORDERCOLOR1,
                                overflow: 'hidden',
                                backgroundColor: themecolor.RB2,
                            }}>
                                <Picker
                                    mode="dropdown"
                                    selectedValue={props.paymentMode}
                                    placeholder="Select Payment Mode"
                                    dropdownIconColor={themecolor.TXTWHITE}
                                    style={{ width: '100%', color: themecolor.TXTWHITE, fontSize: 13, backgroundColor: themecolor.RB2,}}
                                    onValueChange={(itemValue, itemIndex) =>
                                        props.setPaymentMode(itemValue)
                                    }
                                >
                                    <Picker.Item
                                        label="Select Payment Mode"
                                        style={{ color: themecolor.TXTWHITE, fontSize: 13, fontFamily: FontFamily.PopinsMedium,backgroundColor: themecolor.RB2, }}
                                    />
                                    <Picker.Item
                                        label="Cash"
                                        value="Cash"
                                        style={{ color:themecolor.TXTWHITE, fontSize: FontSize.labelText, fontFamily: FontFamily.PopinsMedium, backgroundColor: themecolor.RB2,}}
                                    />
                                    <Picker.Item
                                        label="Online"
                                        value="Online"
                                        style={{ color:themecolor.TXTWHITE, fontSize: FontSize.labelText, fontFamily: FontFamily.PopinsMedium, backgroundColor: themecolor.RB2,}}
                                    />
                                </Picker>
                            </View>

                            <View style={{ marginVertical: 5 }} />

                            <View style={{
                                height: 60,
                                borderRadius: 8,
                                borderWidth: 0.5,
                                borderColor: themecolor.BOXBORDERCOLOR1,
                                overflow: 'hidden',
                                backgroundColor:themecolor.RB2,
                                width: width * 0.8
                            }}>

                                <TextInput placeholder={'Payment Remark'} placeholderTextColor={'lightgrey'} style={{
                                    fontSize: FontSize.labelText,
                                    fontFamily: FontFamily.PopinsMedium,
                                    color: themecolor.TXTWHITE,
                                    left: 8,
                                }}
                                    onChangeText={txt => props.setPaymentRemark(txt)} />
                            </View>

                        </View>

                        <View style={{ flexDirection: 'row', width: width * 0.8, }}>
                            <View>
                                <FullsizeButton title={'Submit'}
                                    width={65} BRadius={18} height={25} onPress={() => { props.handleCustomerDetails() }} backgroundColor={themecolor.HEADERTHEMECOLOR} fontsize={12}/>
                            </View>
                            <View style={{marginHorizontal:6}} />
                            <View>
                                <FullsizeButton title={'Cancel'}
                                    width={65} BRadius={18} height={25} backgroundColor={'transparent'} titlecolor={'gray'} fontsize={12} onPress={() => {
                                        setModalCart(false)
                                        props.setCartmodal(false)
                                    }
                                    } />
                            </View>
                        </View>

                        <View style={{ marginVertical: 5 }} />
                    </View>

                </View>
            </Modal>
        </>
    )
}