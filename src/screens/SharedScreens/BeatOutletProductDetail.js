import React, { useEffect, useState } from "react";
import { View, Text, StatusBar, ScrollView, Image, Dimensions, TouchableOpacity } from "react-native";
import Header_2 from "../../components/shared/Header_2";
import {
    StackActions,
    useNavigation,
} from '@react-navigation/native';
import styles from '../../assets/css/styleProducts';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import DummyImage from "../../components/shared/DummyImage";
import Carousel from 'react-native-banner-carousel';
import { SERVER_URL } from "../../repository/commonRepository";
import { Colors } from "../../assets/config/Colors";
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { FontFamily } from "../../assets/fonts/FontFamily";
import Entypo from 'react-native-vector-icons/Entypo';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import NumericInput from 'react-native-numeric-input';
import { useSelector, useDispatch } from 'react-redux';
import { store } from "../../../App";
import OtherProductDetailsList from "../../components/Beat_outlet/OtherProductDetailsList";
import { textAlign } from "styled-system";

const { width, height } = Dimensions.get('screen');

export default function BeatOutletProductDetail(props) {

    const navigation = useNavigation();
    const mode = useSelector(state => state.mode);
    const themecolor = new MyThemeClass(mode).getThemeColor()
    const dispatch = useDispatch();
    const [serverUrl, setServerUrl] = useState('');
    const [refresh1, setRefresh1] = React.useState(false);
    const [isImageVisible, setIsImageVisible] = React.useState(false);
    const [getSmallImages, setSmallImages] = React.useState([]);
    const [largeImage, setLargeImage] = React.useState(0);
    const [productHighlight, setProductHighlight] = React.useState(0);
    const [openDetails, setOpenDetails] = useState(false)
    const [qty, setQty] = React.useState(props.route.params.qty);
    var network = useSelector(state => state.network);


    const ProductCarouselImage = useSelector(state => state.productCarouselImage);
    // alert(ProductCarouselImage)

    function handleBackButtonClick() {
        const popAction = StackActions.pop(1);
        navigation.dispatch(popAction);
        return true;
    }

    useEffect(() => {
        async function temp() {
            const url = await SERVER_URL()
            setServerUrl(url)
        }
        temp()
    }, [])

    React.useEffect(() => {
        if (props.route.params.productDetailsData.ProductImages != null) {
            setSmallImages(props.route.params.productDetailsData.ProductImages.split(','));
            setIsImageVisible(true);
        } else {
            setIsImageVisible(false);
        }
    }, [refresh1]);

    function renderimage(image, index) {

        return (
            <View key={index}>
                <TouchableOpacity
                    activeOpacity={1}
                    style={{
                        width: width * 0.9,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        flex: 1,
                        backgroundColor: themecolor.BOXTHEMECOLOR,
                    }} >
                    <Image
                        style={{
                            width: '100%',
                            height: 200,
                            overflow: 'hidden',
                        }}
                        source={{ uri: `${serverUrl}media?id=${image}` }}
                        resizeMode={'contain'}
                    />
                </TouchableOpacity>
            </View>
        );
    }

    const handleAddToCart = (value, item1) => {
        console.log("item1.Id==>", item1.Id, value)
        if (value > 0) {
            setQty(value);
            item1['quantity'] = value;
            item1['sellingPrice'] = props.route.params.productDetailsMore.SellingPrice;
            item1['maxRetailPrice'] = props.route.params.productDetailsMore.MaxRetailPrice;
            item1['TotalPtr'] = parseFloat(props.route.params.productDetailsMore.SellingPrice * value).toFixed(2)
            item1['subTotal'] = props.route.params.productDetailsMore.MaxRetailPrice * value;
            item1['ptrMargin'] = (props.route.params.productDetailsMore.MaxRetailPrice - props.route.params.productDetailsMore.SellingPrice) * value;
            store.dispatch({ type: 'ADD_OUTLET_CART', payload: [item1.Id, item1] })
            props.route.params.setRefresh(!props.route.params.refresh);
        } else {
            setQty(value);
            store.dispatch({ type: 'REMOVE_OUTLET_CART', payload: item1.Id })
            props.route.params.setRefresh(!props.route.params.refresh);
        }
        setRefresh1(!refresh1)
    }

   
    return (
        <View style={{ ...styles.MainView, backgroundColor: themecolor.THEMECOLOR }}>
            <StatusBar translucent backgroundColor="transparent" />
            <Header_2
                title={props.route.params.productDetailsData.ProductName}
                onPress={() => {
                    handleBackButtonClick();
                    // props.navigation.goBack()
                }}
            />

            <ScrollView showsVerticalScrollIndicator={false}>

                <View
                    style={{
                        width: width * 0.93,
                        alignSelf: 'center',
                        borderRadius: 5,
                    }}>

                    <View style={{ marginVertical: 5 }} />

                    <View
                        style={{
                            backgroundColor: themecolor.BOXTHEMECOLOR,
                            height: 'auto',
                            flex: 1,
                            borderWidth: 1,
                            borderColor: themecolor.BOXBORDERCOLOR1,
                            // overflow: 'hidden',
                            width: width * 0.93,
                            borderRadius: 8,
                            elevation: 2,
                        }}>
                        <View style={{ marginVertical: 5 }} />

                        {isImageVisible ? (
                            <Carousel
                                autoplay={false}
                                index={largeImage}
                                onPageChanged={index => {
                                    setProductHighlight(index);
                                    setRefresh1(!refresh1);
                                }}
                                pageSize={(width, height)}
                            >
                                {getSmallImages.map((image, index) =>
                                    renderimage(image, index)
                                )}
                            </Carousel>
                        ) : (
                            <DummyImage width="80%" height={200} />
                        )}

                        <View
                            style={{
                                flex: 1,
                                alignSelf: 'center',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <View style={{ marginVertical: 5 }} />
                            <ScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                scrollEventThrottle={200}
                                decelerationRate="fast"
                                pagingEnabled>
                                <View
                                    style={{
                                        flex: 1,
                                        alignSelf: 'center',
                                        justifyContent: 'flex-start',
                                        flexDirection: 'row',
                                        width: width * 0.85,
                                    }}>
                                    {isImageVisible ? (
                                        getSmallImages.map((item, index) => {
                                            console.log('index...', index);
                                            console.log(
                                                'producct HighLight...',
                                                productHighlight,
                                            );
                                            var temp = false;
                                            if (productHighlight === index) {
                                                temp = true;
                                            }
                                            return (
                                                <>
                                                    <TouchableOpacity
                                                        style={{
                                                            borderWidth: 0.5,
                                                            borderRadius: 5,
                                                            borderColor: temp
                                                                ? themecolor.ICON
                                                                : themecolor.BOXBORDERCOLOR1,
                                                            margin: 5,
                                                            backgroundColor: themecolor.RB2
                                                        }}
                                                        activeOpacity={0.5}
                                                        onPress={() => {
                                                            renderimage(item, index)
                                                            setProductHighlight(index);
                                                            setRefresh1(!refresh1)
                                                        }}
                                                    >
                                                        <Image
                                                            style={{
                                                                width: 50,
                                                                height: 50,
                                                                resizeMode: 'contain',
                                                                alignSelf: 'center',
                                                                margin: 5
                                                            }}
                                                            source={{ uri: `${serverUrl}media?id=${item}` }}>
                                                        </Image>
                                                    </TouchableOpacity>
                                                </>
                                            );
                                        })
                                    ) : (
                                        <DummyImage width={50} height={50} />
                                    )}
                                </View>
                            </ScrollView>
                            <View style={{ marginVertical: 5 }} />
                        </View>

                        <View
                            style={{
                                alignSelf: 'center',
                                justifyContent: 'flex-start',
                                width: width * 0.82,
                            }}>
                            <Text style={{ ...styles.HeadText, color: themecolor.TXTWHITE }}>
                                {props.route.params.productDetailsData.ProductName}
                            </Text>

                            {props.route.params.productDetailsMore.MaxRetailPrice != null && props.route.params.productDetailsMore.MaxRetailPrice != "" && props.route.params.productDetailsMore.MaxRetailPrice != undefined && props.route.params.productDetailsMore.SellingPrice != null && props.route.params.productDetailsMore.SellingPrice != "" && props.route.params.productDetailsMore.SellingPrice != undefined ?
                                <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignSelf: 'center', width: width * 0.82 }}>
                                    <View style={{ ...styles.FLEXDIREC1, width: '80%', alignSelf: 'center', }}>
                                        <Text style={{ ...styles.RateText, color: themecolor.TXTWHITE, }}>
                                            MRP : {" "}
                                        </Text>
                                        <Text style={{ ...styles.RateTextBig, color: 'grey', textDecorationLine: 'line-through', }}>
                                            <FAIcon name="rupee" size={12} /> {props.route.params.productDetailsMore.MaxRetailPrice}
                                        </Text>
                                        <Text style={{ ...styles.RateTextBig, color: Colors.green1, }}>
                                            {" "} <FAIcon name="rupee" size={12} /> {props.route.params.productDetailsMore.SellingPrice}
                                        </Text>
                                    </View>

                                    <View style={{ ...styles.FLEXDIREC1, width: "20%", }}>
                                        {qty == 0 ?
                                            <TouchableOpacity onPress={() => handleAddToCart(1, props.route.params.productDetailsData)} >
                                                <View style={{ backgroundColor: themecolor.BOXTHEMECOLOR, width: 72, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', height: 26, borderRadius: 5, borderColor: '#CAD3C8', borderWidth: 0.5 }}>
                                                    <Text style={{
                                                        color: themecolor.ICON,
                                                        fontFamily: FontFamily.PopinsMedium,
                                                        fontSize: 11,
                                                        textAlign: "center",
                                                        top: 2,
                                                    }}>Add <Entypo name='plus' /></Text>
                                                </View>
                                            </TouchableOpacity>
                                            :
                                            <NumericInput
                                                containerStyle={{ backgroundColor: themecolor.BOXTHEMECOLOR, borderWidth: 0.5 }}
                                                totalWidth={72}
                                                totalHeight={25}
                                                iconSize={14}
                                                value={qty}
                                                rounded
                                                minValue={0}
                                                step={1}
                                                valueType="integer"
                                                type="plus-minus"
                                                style={{ fontFamily: FontFamily.PopinsMedium, fontSize: 11, }}
                                                textColor={themecolor.ICON}
                                                iconStyle={{ color: themecolor.ICON }}
                                                rightButtonBackgroundColor={themecolor.BOXTHEMECOLOR}
                                                leftButtonBackgroundColor={themecolor.BOXTHEMECOLOR}
                                                onChange={value => {
                                                    handleAddToCart(value, props.route.params.productDetailsData)
                                                }
                                                }
                                            />
                                        }
                                    </View>
                                </View>
                                : <></>
                            }


                            <TouchableOpacity onPress={() => setOpenDetails(!openDetails)} >
                                <Text style={{ ...styles.RateTextBig, color: Colors.bluetheme }}>
                                    More details<Entypo name='plus' />
                                </Text>
                            </TouchableOpacity>

                            {openDetails == true ?
                                <View style={{ left: 2, width: width * 0.82, alignContent: 'center', flex: 1 }}>

                                    <View style={{ ...styles.FLEXDIREC1, width: '92%', }}>
                                        <Text style={{ ...styles.RateTextbold1, color: themecolor.TXTWHITE, width: 'auto' }}>
                                            <MCI name='music-note-whole' size={15} /> Packing Quantity :
                                        </Text>
                                        {props.route.params.productDetailsData.PackingQty != undefined && props.route.params.productDetailsData.PackingQty != null && props.route.params.productDetailsData.PackingQty != "" && props.route.params.productDetailsMore.UnitDescription != undefined && props.route.params.productDetailsMore.UnitDescription != null && props.route.params.productDetailsMore.UnitDescription != "" ?
                                            <Text style={{ ...styles.RateText, color: themecolor.TXTWHITE, width: '74%', }}>
                                                &nbsp; {props.route.params.productDetailsData.PackingQty}&nbsp;{props.route.params.productDetailsMore.UnitDescription}
                                            </Text>
                                            :
                                            <Text style={{ ...styles.RateText, color: themecolor.TXTWHITE, width: '74%', }}>
                                                &nbsp; 0&nbsp;{props.route.params.productDetailsMore.UnitDescription}
                                            </Text>
                                        }
                                    </View>

                                    <View style={{ ...styles.FLEXDIREC1, width: '92%', }}>
                                        <Text style={{ ...styles.RateTextbold1, color: themecolor.TXTWHITE, width: 'auto' }}>
                                            <MCI name='music-note-whole' size={15} /> Available Stock :
                                        </Text>
                                        {props.route.params.stock != undefined && props.route.params.stock != null && props.route.params.stock != "" && props.route.params.productDetailsMore.UnitCode != undefined && props.route.params.productDetailsMore.UnitCode != null && props.route.params.productDetailsMore.UnitCode != "" ?
                                            <Text style={{ ...styles.RateText, color: themecolor.TXTWHITE, width: '74%', textAlign: 'justify' }}>
                                                &nbsp; {props.route.params.stock}&nbsp;{props.route.params.productDetailsMore.UnitCode}
                                            </Text>
                                            :
                                            <Text style={{ ...styles.RateText, color: themecolor.TXTWHITE, width: '74%', textAlign: 'justify' }}>
                                                &nbsp; 0&nbsp;{props.route.params.productDetailsMore.UnitCode}
                                            </Text>
                                        }
                                    </View>

                                    {props.route.params.productDetailsData.ProductDescription != undefined && props.route.params.productDetailsData.ProductDescription != null && props.route.params.productDetailsData.ProductDescription != "" ?
                                        <View style={{ ...styles.FLEXDIREC1, width: '92%', }}>
                                            <View style={{ width: 'auto' }}>
                                                <Text style={{ ...styles.RateTextbold1, color: themecolor.TXTWHITE, }}>
                                                    <MCI name='music-note-whole' size={15} /> Description :
                                                </Text>
                                            </View>
                                            <View style={{ width: '82%', justifyContent: 'flex-start', alignSelf: 'flex-start' }}>
                                                <Text style={{ ...styles.RateText, color: themecolor.TXTWHITE, textAlign: 'justify' }}>
                                                    &nbsp; {props.route.params.productDetailsData.ProductDescription}
                                                </Text>
                                            </View>
                                        </View>
                                        : <></>}

                                    {props.route.params.productDetailsData.ProductDescription != undefined && props.route.params.productDetailsData.ProductDescription != null && props.route.params.productDetailsData.ProductDescription != "" ?
                                        <View style={{ ...styles.FLEXDIREC1, width: '92%' }}>
                                            <View style={{ width: 'auto' }}>
                                                <Text style={{ ...styles.RateTextbold1, color: themecolor.TXTWHITE, }}>
                                                    <MCI name='music-note-whole' size={15} /> Product Summary :
                                                </Text>
                                            </View>
                                            <View style={{ width: '70%', justifyContent: 'flex-start', alignSelf: 'flex-start' }}>
                                                <Text style={{ ...styles.RateText, color: themecolor.TXTWHITE, textAlign: 'left' }}>
                                                    &nbsp; {props.route.params.productDetailsData.ProductSummary}
                                                </Text>
                                            </View>
                                        </View>
                                        : <></>}
                                </View>
                                : <></>
                            }

                        </View>
                        <View style={{ marginVertical: 7 }} />

                    </View>

                    <View style={{ marginVertical: 10 }} />

                    {props.route.params.allProductData.length > 1 && props.route.params.allProductData != undefined && props.route.params.allProductData != null && props.route.params.outletId != "" && props.route.params.outletId != undefined && props.route.params.outletId != null && props.route.params.setRefresh != undefined && props.route.params.setRefresh != null && props.route.params.refresh != undefined && props.route.params.refresh != null ?
                        <View style={{ justifyContent: 'flex-start' }}>
                            <Text style={{ ...styles.HeadText, color: themecolor.TXTWHITE }}>
                                Other Products
                            </Text>
                            <View>
                                <OtherProductDetailsList data={props.route.params.allProductData} outletId={props.route.params.outletId} Id={props.route.params.productDetailsData.Id} setRefresh={props.route.params.setRefresh} refresh={props.route.params.refresh} />
                            </View>
                        </View>
                        : <></>}
                </View>

                <View style={{ marginVertical: 5 }} />
            </ScrollView>

        </View>
    )
}


