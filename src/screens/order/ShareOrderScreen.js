import React, { useEffect, useState } from 'react';
import styles from '../../assets/css/styleProducts';
import { PaymentDetailsList, CustomerCard, DistributerCard, FlatListProductList } from '../../components/order/OrderdetailsData';
import { getOrderById } from '../../repository/outlet/OutletRepositoy';
import LoaderAllInOne from '../../components/shared/Loader';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import FullsizeButton from '../../components/shared/FullsizeButton';
import {
    StatusBar,
    View,
    Text,
    ScrollView,
    Dimensions,
    BackHandler,
    Image
} from 'react-native';
import ImgToBase64 from 'react-native-image-base64';
import { captureScreen } from 'react-native-view-shot';
import Share from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';
import ViewShot from 'react-native-view-shot';
const { width, height } = Dimensions.get('screen');

export default function ShareOrderScreen(props) {
    const fs = RNFetchBlob.fs;
    const ref = React.useRef();
    const [g, s] = React.useState('')
    const [imageURI, setImageURI] = useState(
        'https://raw.githubusercontent.com/AboutReact/sampleresource/master/sample_img.png',
    );
    const [savedImagePath, setSavedImagePath] = useState('');

    const takeScreenShot = () => {
        // To capture Screenshot
        captureScreen({
            // Either png or jpg (or webm Android Only), Defaults: png
            format: 'jpg',
            // Quality 0.0 - 1.0 (only available for jpg)
            quality: 0.8,
        }).then(
            //callback function to get the result URL of the screnshot
            (uri) => {
                setSavedImagePath(uri);
                setImageURI(uri);
            },
            (error) => console.error('Oops, Something Went Wrong', error),
        );
    };  

    const mode = useSelector(state => state.mode);
    const themecolor = new MyThemeClass(mode).getThemeColor()
    const network = useSelector(state => state.network);
    const primaryDistributor = useSelector(state => state.primaryDistributor);
    const customerDetailsOutletId = useSelector(state => state.customerDetailsOutletId);
    console.log("CUstomerDetails", customerDetailsOutletId)
    const [loader, setLoader] = useState(true);
    const navigation = useNavigation();
    const [orderStatus, setOrderStatus] = useState({})
    const [customerDetails, setCustomerDetails] = useState([])
    const [distributer, setDistributer] = useState([])
    const [paymentDetails, setPaymentDetails] = useState([])
    const [productList, setProductList] = useState([])
    

    function handleBackButtonClick() {
        props.navigation.goBack();
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

    const handleOrderById = async () => {
        console.log("OrderId....>>", props.route.params.OrderId)
        try {
            if (network) {
                var res = await getOrderById(props.route.params.OrderId);
                console.log("OrderById...in OrderDetails Page line 331..>:", res.data.order.OrderStatus);
                if (res.statusCode == 200) {
                    setOrderStatus(res.data.order.OrderStatus)
                    setCustomerDetails([res.data.outletFrom])
                    setDistributer([res.data.outletTo])
                    setPaymentDetails([res.data.order])
                    setProductList(res.data.order.Orderliness)
                    setLoader(false);
                }
            }

        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        handleOrderById();
    }, [])


    captureAndShareScreenshot = () => {
        ref.current.capture().then((uri) => {
            console.log("do something with ", uri);
            // Convert uri to base64 
            ImgToBase64.getBase64String(uri).then(base64String => {
                console.log('Base 64 String ....', base64String);

                // After converting base64 we have to open share sheet

                let imagePath = null;
                RNFetchBlob.config({
                    fileCache: true,
                })

                var imageUrl = `${base64String}`

                let shareImage = {
                    url: imageUrl,
                };

                Share.open(shareImage)
                    .then((res) => {
                        console.log(res);
                    })
                    .catch((err) => {
                        err && console.log(err);
                    });
                return fs.unlink(imagePath);

            });



        }),
            (error) => console.error("Oops, snapshot failed", error);
    };

    return (
        <>
            {loader ? (
                <LoaderAllInOne />
            ) : (
                <>
                    <View style={{ ...styles.MainView, backgroundColor: themecolor.THEMECOLOR, flex: 1 }}>

                        <StatusBar translucent backgroundColor="transparent" />
                        {/* <Image
                            source={{ uri: imageURI }}
                            style={{
                                width: 200,
                                height: 300,
                                resizeMode: 'contain',
                                marginTop: 5
                            }}
                        /> */}
                        <View style={{ ...styles.HeaderMainVIew, backgroundColor: themecolor.HEADERTHEMECOLOR }}>
                            <View style={styles.MV} />
                        </View>

                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            style={styles.FullHeight}>
                            <View style={styles.MV} />

                            {/* Capture Area Start */}
                            <View style={styles.FLVIEW}>
                                <ViewShot ref={ref} options={{ format: "jpg", quality: 0.9 }}>

                                    {customerDetails.length > 0 ?
                                        (<>
                                            <View style={styles.MV} />
                                            <Text style={{ ...styles.FLHeadText12, color: themecolor.TXTWHITE, left: 2 }}>Customer details</Text>
                                            <CustomerCard customerDetails={customerDetails} />
                                        </>) : (<></>)
                                    }

                                    {distributer.length > 0 ?
                                        (<>
                                            <View style={styles.MV} />
                                            <Text style={{ ...styles.FLHeadText12, color: themecolor.TXTWHITE, left: 2 }}>Distributor</Text>
                                            <DistributerCard distributer={distributer} />
                                        </>) : (<></>)}

                                    {paymentDetails.length > 0 ?
                                        (<>
                                            <View style={styles.MV} />
                                            <Text style={{ ...styles.FLHeadText12, color: themecolor.TXTWHITE, left: 2 }}>Payment details</Text>
                                            <PaymentDetailsList props={props} paymentDetails={paymentDetails} />
                                        </>) : (<></>)}

                                    <View style={styles.MV} />
                                    <FlatListProductList productList={productList} />
                                </ViewShot>
                            </View>
                            {/* Capture Area End */}
                            <View style={styles.MV50} />
                        </ScrollView>
                        <FullsizeButton title={'Confirm share'} onPress={() =>
                       captureAndShareScreenshot()
                        } backgroundColor={themecolor.HEADERTHEMECOLOR} />
                        <View style={{ marginVertical: 4 }} />
                    </View>

                </>
            )}
        </>
    )
}