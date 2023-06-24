import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity, BackHandler ,Dimensions} from 'react-native';
import Header_2 from '../../components/shared/Header_2';
import { CartDataList } from '../../screens/sales/CartDataList'
import styles from '../../assets/css/styleSale';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import CartSaleModal from '../../components/Modals/CartSaleModal';
import VerifyModal from '../../components/shared/VerifyModel'
import { useSelector } from 'react-redux';
import { Divider } from 'react-native-elements';
const { width } = Dimensions.get('window')
import { useToast } from 'react-native-toast-notifications';
import { postBookRetailSale } from '../../repository/Sales/SalesRepository';
import { store } from '../../../App';
import { SalesCartItemShimmer, StockInInvoiceShimmer, } from '../../components/Beat_outlet/ProductCategoriesListShimmer';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';


export default function Cart(props) {

    const mode = useSelector(state => state.mode);
    const themecolor = new MyThemeClass(mode).getThemeColor()

    function handleBackButtonClick() {
        props.navigation.goBack()
        return true;
    }

    React.useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener(
                'hardwareBackPress',
                handleBackButtonClick,
            );
        };
    }, []);


    const toast = useToast();
    // const navigation = useNavigation();
    // const dispatch = useDispatch();
    const [loader, setLoader] = useState(true);
    const [cartmodal, setCartmodal] = useState(false)
    const [showmodal, setshowModal] = useState(false)

    const [Total, setTotal] = useState('');
    const [Quantity, setQuantity] = useState('');
    const [ptrMargin, setPTRMargin] = useState('');
    const [subTotal, setSubTotal] = useState('');

    const CartItem = useSelector(state => state.BASaleCart)
    const cartValues = Object.values(CartItem);
    //  console.log("cartValues===========>", cartValues)

    const [salutation, setSalutation] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [gst, setGst] = useState('');
    const [remark, setRemark] = useState('');
    const [paymentMode, setPaymentMode] = useState('')
    const [paymentRemark, setPaymentRemark] = useState('')

    React.useEffect(() => {
        var total = 0;
        var quantity = 0;
        var ptrmargin = 0;
        var subtotal = 0;
        cartValues.map(item => {
            total = total + item.TotalPtr;
            quantity += item.quantity;
            ptrmargin += item.ptrMargin;
            subtotal += item.subTotal;
        });
        setTotal(total);
        setQuantity(quantity);
        setPTRMargin(ptrmargin);
        setSubTotal(subtotal);
        setLoader(false)
    }, []);

    const handleCustomerDetails = async () => {

        var arrItems = [];

        if (salutation == '') {
            toast.show('Salutation is required', {
                type: 'warning',
                placement: 'bottom',
                duration: 3000,
                offset: 30,
                animationType: 'slide-in',
            });
        } else if (firstName == '') {
            toast.show('First Name is required', {
                type: 'warning',
                placement: 'bottom',
                duration: 3000,
                offset: 30,
                animationType: 'slide-in',
            });
        } else if (lastName == '') {
            toast.show('Last Name is required', {
                type: 'warning',
                placement: 'bottom',
                duration: 3000,
                offset: 30,
                animationType: 'slide-in',
            });
        } else if (email == '') {
            toast.show('Email Address is required', {
                type: 'warning',
                placement: 'bottom',
                duration: 3000,
                offset: 30,
                animationType: 'slide-in',
            });
        } else if (mobile == '') {
            toast.show('Phone Number is required', {
                type: 'warning',
                placement: 'bottom',
                duration: 3000,
                offset: 30,
                animationType: 'slide-in',
            });
        } else if (gst == '') {
            toast.show('GST Number is required', {
                type: 'warning',
                placement: 'bottom',
                duration: 3000,
                offset: 30,
                animationType: 'slide-in',
            });
        } else if (remark == '') {
            toast.show('Remark is required', {
                type: 'warning',
                placement: 'bottom',
                duration: 3000,
                offset: 30,
                animationType: 'slide-in',
            });
        } else if (paymentMode == '') {
            toast.show('Payment Mode is required', {
                type: 'warning',
                placement: 'bottom',
                duration: 3000,
                offset: 30,
                animationType: 'slide-in',
            });
        } else if (paymentRemark == '') {
            toast.show('Payment Remark is required', {
                type: 'warning',
                placement: 'bottom',
                duration: 3000,
                offset: 30,
                animationType: 'slide-in',
            });
        } else {

            cartValues.forEach((item) => {
                let obj = {
                    "product_id": item.Inventory.ProductId,
                    "serial_no": item.Inventory.SerailNo,
                    "batch_no": item.Inventory.BatchNo,
                    "qty": item.quantity,
                    "rate": item.PriceBook.SellingPrice
                }
                arrItems.push(obj)
            })

            var body = {
                "outlet_id": props.route.params.OutletId,
                "salutation": salutation,
                "fname": firstName,
                "lname": lastName,
                "email": email,
                "mobile": mobile,
                "gst": gst,
                "remark": remark,
                "payment_mode": paymentMode,
                "payment_remark": paymentRemark,
                "payment_status": "paid",
                "items": arrItems
            }
            console.log('body ------------------>', body);
            try {
                var res = await postBookRetailSale(body);
                console.log("handleCustomerDetails Function postBookRetailSale Api.....>>....in Cart Page...:", res)
                if (res.statusCode === 200) {
                    setCartmodal(false)
                    setshowModal(true)
                    store.dispatch({ type: 'REMOVE_ALL_SALE_CART' });
                } else {
                    console.log('Error....in postBookRetailSale api in sale cart page.');
                    toast.show(res.message, {
                        type: 'warning',
                        placement: 'bottom',
                        duration: 3000,
                        offset: 30,
                        animationType: 'slide-in',
                    });
                }
            } catch (e) {
                console.log('Error....in postBookRetailSale api in sale cart page >>>',e);
                toast.show('Something went wrong!, Try again later.', {
                    type: 'danger',
                    placement: 'bottom',
                    duration: 3000,
                    offset: 30,
                    animationType: 'slide-in',
                });
            }
        }
    };

    return (
        <>
            <View style={{ flex: 1, backgroundColor: themecolor.THEMECOLOR }}>
                <Header_2 title={'Cart'} onPress={() => handleBackButtonClick()} />

                <View>

                    {loader ? (
                        <SalesCartItemShimmer cartLength={cartValues.length} />
                    ) : (
                        <View>
                            <CartDataList data={cartValues} />
                        </View>
                    )}

                    <View>
                        <View style={styles.mainview}>
                            <Text style={{ ...styles.headtext, color: themecolor.TXTWHITE }}>
                                Price Details
                            </Text>
                        </View>

                        {loader ? (
                            <StockInInvoiceShimmer />
                        ) : (
                            <View style={{
                                alignItems: 'center',
                                alignSelf: 'center',
                                borderRadius: 10,
                                width: width * 0.93, backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR1, borderWidth: 0.5
                            }}>
                                <View style={{ ...styles.innerview1 }}>
                                    <View style={styles.viewCol}>
                                        <Text style={{ ...styles.innertext, color: themecolor.TXTWHITE }}>
                                            Total MRP({cartValues.length} items)
                                        </Text>
                                        <Text style={{ ...styles.innertext, color: themecolor.TXTWHITE }}>
                                            Discounts
                                        </Text>
                                    </View>

                                    <View style={{ ...styles.viewCol }}>
                                        <Text style={{ ...styles.righttext, color: themecolor.TXTWHITE }}>
                                            <FAIcon name='rupee' size={12} />{subTotal}
                                        </Text>
                                        <Text style={styles.righttext2}>
                                            - <FAIcon name='rupee' size={12} />{ptrMargin}
                                        </Text>
                                    </View>
                                </View>

                                <Divider style={styles.divider}
                                    orientation="horizontal" width={0.3} />

                                <View style={styles.bottomview}>
                                    <Text style={{ ...styles.righttext, color: themecolor.TXTWHITE }}>
                                        Total Amount
                                    </Text>
                                    <Text style={{ ...styles.righttext, color: themecolor.TXTWHITE }}>
                                        <FAIcon name='rupee' size={12} />{Total}
                                    </Text>
                                </View>
                            </View>
                        )}

                    </View>
                </View>

                {cartmodal &&
                    <CartSaleModal setCartmodal={setCartmodal} salutation={salutation} setSalutation={setSalutation} setFirstName={setFirstName} setLastName={setLastName} setEmail={setEmail} setMobile={setMobile} setGst={setGst} setRemark={setRemark} paymentMode={paymentMode} setPaymentMode={setPaymentMode} setPaymentRemark={setPaymentRemark} handleCustomerDetails={handleCustomerDetails} />
                }

                {showmodal &&
                    <VerifyModal title='Order Successfully Placed' buttontext={'Close'} navigateFrom="" navigateTo="OrderList" outletId={props.route.params.OutletId} outletType={false} index={0} />
                }

            </View>

            {loader ?
                <></> :
                <TouchableOpacity style={{...styles.touchview, backgroundColor:themecolor.HEADERTHEMECOLOR}} onPress={() => setCartmodal(true)} >
                    <View style={styles.mainView}>
                        <View style={styles.innerView}>
                            <Text style={styles.buttontext}>
                                Total:  <FAIcon name='rupee' size={12} />{Total}
                            </Text>
                        </View>
                        <View style={styles.imageview}>
                            <Image source={require('../../assets/images/addoutlet/next.png')}
                                style={styles.img} />
                        </View>
                    </View>
                </TouchableOpacity>
            }
        </>
    )
}