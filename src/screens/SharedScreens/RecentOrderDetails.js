import {
    StatusBar,
    View,
    TouchableOpacity,
    Image,
    Text,
    BackHandler,
    Dimensions
} from 'react-native';
import React, { useState } from 'react'
import Header_2 from '../../components/shared/Header_2'
import styles2 from '../../assets/css/styleProducts';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import EIcon5 from 'react-native-vector-icons/EvilIcons';
import FIcon5 from 'react-native-vector-icons/FontAwesome5';
import MCCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../../assets/config/Colors';
import { FontFamily } from '../../assets/fonts/FontFamily';
import { ScrollView } from 'react-native-gesture-handler';
import { gettripLocationApi } from '../../repository/trip/tripRepository';
import ConfirmationModal from '../../components/Modals/ConfirmationModal';
import { useToast } from "react-native-toast-notifications";


export default function RecentOrderDetails(props) {
    const mode = useSelector(state => state.mode);
    const toast = useToast();
    const themecolor = new MyThemeClass(mode).getThemeColor();
    const [openModal, setOpenModal] = useState(false);
    let item = props.route.params.item
    console.log(item)

    const changeOrderStatus = async (orderId) => {
        try {
            const result = await gettripLocationApi(`api/orderMarkDelivered?order_id=${orderId}`);
            console.log(result)
            if (result.statusCode == 200) {
                toast.show(result.message, {
                    type: 'success',
                    placement: 'bottom',
                    duration: 3000,
                    offset: 30,
                    animationType: 'slide-in',
                });
                props.navigation.goBack();
            } else {
                toast.show(result.message, {
                    type: 'warning',
                    placement: 'bottom',
                    duration: 3500,
                    offset: 30,
                    animationType: 'slide-in',
                });
            }
        } catch (err) {
            console.log('Catch Error in Mark delieverd line 35', err)
        }
    }

    return (
        <View style={{ flex: 1 }} >
            <Header_2 title='Order more details' onPress={() => props.navigation.goBack()} />
            <View style={{ marginVertical: 5 }} />
            <ScrollView showsVerticalScrollIndicator={false} >
                <View style={{ width: '94%', alignSelf: 'center' }} ><Text style={{ ...styles2.RateTextbold, color: themecolor.TXTWHITE }} >Order Details</Text></View>

                <View activeOpacity={0.5} style={{ ...styles2.CUSTOMERVIEWTO, alignSelf: 'center', borderColor: themecolor.BOXBORDERCOLOR1, backgroundColor: themecolor.BOXTHEMECOLOR }}>
                    <View style={styles2.NumberInputView}>
                        <View
                            style={{
                                ...styles2.Width85,
                                justifyContent: 'center',
                                alignSelf: 'center',
                            }}>
                            <View
                                style={{ ...styles2.FLEXDIREC1, justifyContent: 'space-between' }}>
                                <Text style={{ ...styles2.RateText, color: themecolor.TXTWHITE }}>Order No.</Text>
                                <Text style={{ ...styles2.RateText, color: themecolor.TXTWHITE }}>
                                    {
                                        item.OrdOrderNumber != null ? item.OrdOrderNumber : ''
                                    }
                                </Text>
                            </View>
                            <View
                                style={{ ...styles2.FLEXDIREC1, justifyContent: 'space-between' }}>
                                <Text style={{ ...styles2.RateText, color: themecolor.TXTWHITE }}>Order Date</Text>
                                <Text style={{ ...styles2.RateText, color: themecolor.TXTWHITE }}>
                                    {item.OrdOrderDate != null ? item.OrdOrderDate : ''}
                                </Text>
                            </View>
                            <View
                                style={{ ...styles2.FLEXDIREC1, justifyContent: 'space-between' }}>
                                <Text style={{ ...styles2.RateText, color: themecolor.TXTWHITE }}>Subtotal</Text>
                                <Text style={{ ...styles2.RateText, color: themecolor.TXTWHITE }}>
                                    <FAIcon name="rupee" size={11} /> {
                                        (item.OrdOrderSubtotal == '' || item.OrdOrderSubtotal == null) ?
                                            'not available'
                                            : item.OrdOrderSubtotal
                                    }
                                </Text>
                            </View>
                            <View
                                style={{ ...styles2.FLEXDIREC1, justifyContent: 'space-between' }}>
                                <Text style={{ ...styles2.RateText, color: themecolor.TXTWHITE }}>Total</Text>
                                <Text style={{ ...styles2.RateText, color: themecolor.TXTWHITE }}>
                                    <FAIcon name="rupee" size={11} /> {
                                        item.OrdOrderTotal != null ? item.OrdOrderTotal : ''
                                    }
                                </Text>
                            </View>
                            <View
                                style={{ ...styles2.FLEXDIREC1, justifyContent: 'space-between' }}>
                                <Text style={{ ...styles2.RateText, color: themecolor.TXTWHITE }}>Discount</Text>
                                <Text style={{ ...styles2.RateText, color: themecolor.TXTWHITE }}>
                                    <FAIcon name="rupee" size={11} /> {

                                        item.OrdOrderDiscount != null ?
                                            item.OrdOrderDiscount
                                            : "not available"
                                    }
                                </Text>
                            </View>
                            <View
                                style={{ ...styles2.FLEXDIREC1, justifyContent: 'space-between' }}>
                                <Text style={{ ...styles2.RateText, color: themecolor.TXTWHITE }}>Quantity</Text>
                                <Text style={{ ...styles2.RateText, color: themecolor.TXTWHITE }}>
                                    {
                                        item.OrdOrderQty != null ?
                                            item.OrdOrderQty
                                            : "not available"
                                    }

                                </Text>
                            </View>
                            <View
                                style={{ ...styles2.FLEXDIREC1, justifyContent: 'space-between' }}>
                                <Text style={{ ...styles2.RateText, color: themecolor.TXTWHITE }}>Product</Text>
                                <Text style={{ ...styles2.RateText, color: themecolor.TXTWHITE }}>
                                    {
                                        item.ProductName != null ?
                                            item.ProductName
                                            : "not available"
                                    }

                                </Text>
                            </View>

                            {item.BeatBeatName == null ? <></> :
                                <View
                                    style={{ ...styles2.FLEXDIREC1, justifyContent: 'space-between' }}>
                                    <Text style={{ ...styles2.RateText, color: themecolor.TXTWHITE }}>Beat</Text>
                                    <Text style={{ ...styles2.RateText, color: themecolor.TXTWHITE }}>
                                        {item.BeatBeatName}
                                    </Text>
                                </View>
                            }
                            <View
                                style={{ ...styles2.FLEXDIREC1, justifyContent: 'space-between' }}>
                                <Text style={{ ...styles2.RateText, color: themecolor.TXTWHITE }}>Remark</Text>
                                <Text style={{ ...styles2.RateText, color: themecolor.TXTWHITE }}>
                                    {
                                        (item.OrdOrderRemark == '' || item.OrdOrderRemark == null) ?
                                            'not available'
                                            : item.OrdOrderRemark
                                    }
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ ...styles2.border, borderColor: themecolor.BORDER }} />
                    <View style={styles2.NumberInputView}>
                        <View style={styles2.ModelVideoCenter}>
                            <Text style={{ color: 'black', fontFamily: FontFamily.PopinsMedium }}>status</Text>
                        </View>
                        <View style={styles2.FLEXDIRECTIONROW}>
                            {item.OrdOrderStatus === "Created" ? (
                                <>
                                    <View style={{ ...styles2.IconCircle, backgroundColor: "#00C46F", borderRadius: 50, margin: 2 }}><MCCIcon name="check" color={Colors.white} size={11} /></View>
                                    <Text style={{ ...styles2.RateTextboldOrangeCircle, color: "#00C46F", }}>{item.OrdOrderStatus}</Text>
                                </>
                            ) : (
                                <>
                                    <View style={{ ...styles2.IconCircle, backgroundColor: "#F88E3E", borderRadius: 50, margin: 2 }}><MCCIcon name="cart" color={Colors.white} size={11} /></View>
                                    <Text style={{ ...styles2.RateTextboldOrangeCircle, color: "#F88E3E" }}>{item.OrdOrderStatus}</Text>
                                </>
                            )}
                        </View>

                    </View>
                </View>
                <View style={{ marginVertical: 5 }} />

                {/* ==================================From Outlet Detail================================ */}

                <View style={{ width: '94%', alignSelf: 'center' }} ><Text style={{ ...styles2.RateTextbold, color: themecolor.TXTWHITE }} >From Outlet</Text></View>
                <View activeOpacity={0.5} style={{ ...styles2.CUSTOMERVIEWTO, width: '94%', alignSelf: 'center', borderColor: themecolor.BOXBORDERCOLOR1, backgroundColor: themecolor.BOXTHEMECOLOR }}>
                    <View style={styles2.NumberInputView}>
                        <View
                            style={{
                                ...styles2.Width85,
                                // width:'85%',
                                justifyContent: 'center',
                                alignSelf: 'center',
                            }}>
                            <View
                                style={{ ...styles2.FLEXDIREC1, justifyContent: 'space-between' }}>
                                <Text style={{ ...styles2.RateText, color: themecolor.TXTWHITE }}>Outlet Name</Text>
                                <Text style={{ ...styles2.RateText, color: themecolor.TXTWHITE }}>
                                    {
                                        item.FrmOutletName != null ?
                                            item.FrmOutletName
                                            : ""
                                    }

                                </Text>
                            </View>
                            <View
                                style={{ ...styles2.FLEXDIREC1, justifyContent: 'space-between' }}>
                                <Text style={{ ...styles2.RateText, color: themecolor.TXTWHITE }}>Outlet Code</Text>
                                <Text style={{ ...styles2.RateText, color: themecolor.TXTWHITE }}>
                                    {
                                        item.FrmOutletCode != null ?
                                            item.FrmOutletCode
                                            : ""
                                    }

                                </Text>
                            </View>
                            <View
                                style={{ ...styles2.FLEXDIREC1, justifyContent: 'space-between' }}>
                                <Text style={{ ...styles2.RateText, color: themecolor.TXTWHITE }}>Contact Person</Text>
                                <Text style={{ ...styles2.RateText, color: themecolor.TXTWHITE }}>
                                    {
                                        item.FrmOutletContactName != null ? item.FrmOutletContactName : 'not available'
                                    }
                                </Text>
                            </View>
                            <View
                                style={{ ...styles2.FLEXDIREC1, justifyContent: 'space-between' }}>
                                <Text style={{ ...styles2.RateText, color: themecolor.TXTWHITE }}>Contact Number</Text>
                                <Text style={{ ...styles2.RateText, color: themecolor.TXTWHITE }}>
                                    {
                                        (item.FrmOutletContactNo == '' || item.FrmOutletContactNo == null) ?
                                            'not available'
                                            : item.FrmOutletContactNo
                                    }
                                </Text>
                            </View>
                            <View
                                style={{ ...styles2.FLEXDIREC1, justifyContent: 'space-between' }}>
                                <Text style={{ ...styles2.RateText, color: themecolor.TXTWHITE }}>Alt. Contact Number</Text>
                                <Text style={{ ...styles2.RateText, color: themecolor.TXTWHITE }}>
                                    {
                                        (item.FrmOutletAltContactNo == '' || item.FrmOutletAltContactNo == null) ?
                                            'not available'
                                            : item.FrmOutletAltContactNo
                                    }
                                </Text>
                            </View>
                            <View
                                style={{ ...styles2.FLEXDIREC1, justifyContent: 'space-between' }}>
                                <Text style={{ ...styles2.RateText, color: themecolor.TXTWHITE }}>Address</Text>
                                <Text style={{ ...styles2.RateText, color: themecolor.TXTWHITE }}>
                                    {item.FrmOutletAddress != null ? item.FrmOutletAddress : ''}
                                </Text>
                            </View>
                            <View
                                style={{ ...styles2.FLEXDIREC1, justifyContent: 'space-between' }}>
                                <Text style={{ ...styles2.RateText, color: themecolor.TXTWHITE }}>Potential</Text>
                                <Text style={{ ...styles2.RateText, color: themecolor.TXTWHITE }}>
                                    {/* <FAIcon name="rupee" size={11} />  */}
                                    {
                                        item.FrmOutletPotential != null ? item.FrmOutletPotential : 'not available'
                                    }
                                </Text>
                            </View>
                            <View
                                style={{ ...styles2.FLEXDIREC1, justifyContent: 'space-between' }}>
                                <Text style={{ ...styles2.RateText, color: themecolor.TXTWHITE }}>status</Text>
                                <Text style={{ ...styles2.RateText, color: item.FrmOutletStatus == 'active' ? Colors.bluetheme : 'tomato' }}>
                                    {
                                        item.FrmOutletStatus != null ?
                                            item.FrmOutletStatus
                                            : ""
                                    }
                                </Text>
                            </View>



                        </View>
                    </View>
                    <View style={{ ...styles2.border, borderColor: themecolor.BORDER }} />

                </View>
                <View style={{ marginVertical: 5 }} />

                {/* ==================================To Outlet Detail================================ */}


                <View style={{ width: '94%', alignSelf: 'center' }} ><Text style={{ ...styles2.RateTextbold, color: themecolor.TXTWHITE }} >To Outlet</Text></View>

                <View activeOpacity={0.5} style={{ ...styles2.CUSTOMERVIEWTO, width: '94%', alignSelf: 'center', borderColor: themecolor.BOXBORDERCOLOR1, backgroundColor: themecolor.BOXTHEMECOLOR }}>
                    <View style={styles2.NumberInputView}>
                        <View
                            style={{
                                ...styles2.Width85,
                                // width:'85%',
                                justifyContent: 'center',
                                alignSelf: 'center',
                            }}>

                            <View
                                style={{ ...styles2.FLEXDIREC1, justifyContent: 'space-between' }}>
                                <Text style={{ ...styles2.RateText, color: themecolor.TXTWHITE }}>Outlet Name</Text>
                                <Text style={{ ...styles2.RateText, color: themecolor.TXTWHITE }}>
                                    {
                                        item.ToOutletName != null ?
                                            item.ToOutletName
                                            : ""
                                    }

                                </Text>
                            </View>
                            <View
                                style={{ ...styles2.FLEXDIREC1, justifyContent: 'space-between' }}>
                                <Text style={{ ...styles2.RateText, color: themecolor.TXTWHITE }}>Outlet Code</Text>
                                <Text style={{ ...styles2.RateText, color: themecolor.TXTWHITE }}>
                                    {
                                        item.ToOutletCode != null ?
                                            item.ToOutletCode
                                            : ""
                                    }

                                </Text>
                            </View>
                            <View
                                style={{ ...styles2.FLEXDIREC1, justifyContent: 'space-between' }}>
                                <Text style={{ ...styles2.RateText, color: themecolor.TXTWHITE }}>Contact Person</Text>
                                <Text style={{ ...styles2.RateText, color: themecolor.TXTWHITE }}>
                                    {
                                        item.ToOutletContactName != null ? item.ToOutletContactName : 'not available'
                                    }
                                </Text>
                            </View>
                            <View
                                style={{ ...styles2.FLEXDIREC1, justifyContent: 'space-between' }}>
                                <Text style={{ ...styles2.RateText, color: themecolor.TXTWHITE }}>Contact Number</Text>
                                <Text style={{ ...styles2.RateText, color: themecolor.TXTWHITE }}>
                                    {
                                        (item.ToOutletContactNo == '' || item.ToOutletContactNo == null) ?
                                            'not available'
                                            : item.ToOutletContactNo
                                    }
                                </Text>
                            </View>
                            <View
                                style={{ ...styles2.FLEXDIREC1, justifyContent: 'space-between' }}>
                                <Text style={{ ...styles2.RateText, color: themecolor.TXTWHITE }}>Alt. Contact Number</Text>
                                <Text style={{ ...styles2.RateText, color: themecolor.TXTWHITE }}>
                                    {
                                        (item.ToOutletAltContactNo == '' || item.ToOutletAltContactNo == null) ?
                                            'not available'
                                            : item.ToOutletAltContactNo
                                    }
                                </Text>
                            </View>
                            <View
                                style={{ ...styles2.FLEXDIREC1, justifyContent: 'space-between' }}>
                                <Text style={{ ...styles2.RateText, color: themecolor.TXTWHITE }}>Address</Text>
                                <Text style={{ ...styles2.RateText, color: themecolor.TXTWHITE }}>
                                    {item.ToOutletAddress != null ? item.ToOutletAddress : ''}
                                </Text>
                            </View>
                            <View
                                style={{ ...styles2.FLEXDIREC1, justifyContent: 'space-between' }}>
                                <Text style={{ ...styles2.RateText, color: themecolor.TXTWHITE }}>Potential</Text>
                                <Text style={{ ...styles2.RateText, color: themecolor.TXTWHITE }}>
                                    {/* <FAIcon name="rupee" size={11} />  */}
                                    {
                                        item.ToOutletPotential != null ? item.ToOutletPotential : 'not available'
                                    }
                                </Text>
                            </View>
                            <View
                                style={{ ...styles2.FLEXDIREC1, justifyContent: 'space-between' }}>
                                <Text style={{ ...styles2.RateText, color: themecolor.TXTWHITE }}>status</Text>
                                <Text style={{ ...styles2.RateText, color: item.FrmOutletStatus == 'active' ? Colors.bluetheme : 'tomato' }}>
                                    {
                                        item.ToOutletStatus != null ?
                                            item.ToOutletStatus
                                            : ""
                                    }
                                </Text>
                            </View>


                        </View>
                    </View>
                    <View style={{ ...styles2.border, borderColor: themecolor.BORDER }} />

                </View>

                {/* ========================================== */}
                <View style={{ marginVertical: 40 }} />
            </ScrollView>
            <View style={{ position: 'absolute', bottom: 5, alignSelf: 'center' }} >
                <FullsizeButton title='Mark as delievered' onPress={() => {
                    item.OrdOrderStatus == 'Created' ?
                        setOpenModal(!openModal) :
                        toast.show(`Order is in ${item.OrdOrderStatus} status. Can not mark as delivered`, {
                            type: 'warning',
                            placement: 'bottom',
                            duration: 3000,
                            offset: 30,
                            animationType: 'slide-in',
                        });
                }
                } />

            </View>
            {openModal ?
                <ConfirmationModal
                    btnlabel={'yes'}
                    title='Are you sure you want to mark this order as delivered'
                    modalVisible1={openModal}
                    setmodalVisible1={setOpenModal}
                    onConfirm={() => {
                        changeOrderStatus(props.route.params.OrderId)
                    }}
                /> : <></>
            }
        </View>
    )
}


// ================================================================================


