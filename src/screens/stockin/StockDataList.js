import React, { useEffect, useState } from 'react';
import {
    TouchableOpacity,
    View,
    FlatList,
    Text,
    Image,
    ScrollView,
    Dimensions
} from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import NumericInput from 'react-native-numeric-input'
import styles from '../../assets/css/styleStockIn';
import { db } from '../../helper/SQLite DB/Sqlite';
import DummyImage from '../../components/shared/DummyImage';
import TextTicker from 'react-native-text-ticker';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import styles1 from '../../assets/css/styleProducts';
import { getInventoryView } from '../../repository/stockIn/StockInRepository'
import { SERVER_URL } from '../../repository/commonRepository';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { FontFamily } from '../../assets/fonts/FontFamily';
import { FontSize } from '../../assets/fonts/Fonts';
import NoData from '../../components/shared/NoData';

const { width } = Dimensions.get('window')

function StockINGRNListD({ item, fIndex, props, outletId, setQty, setReturnLineItems, themecolor,  }) {

    const toast = useToast();
    // const [productItemData, setProductItemData] = useState({})
    // const [ptr, setPTR] = useState('')
    // const [mrp, setMRP] = useState('')
    const [getServerUrl, setServerUrl] = useState('')

    // const productItem = async () => {
    //     await db.transaction(async tx => {
    //         await tx.executeSql(
    //             `Select * from Products
    //             left join Outlets on Outlets.Id='${outletId}'
    //             left join Mapping on Mapping.SecondaryOutletId=Outlets.Id AND Mapping.isdefault=${1}
    //             left join PriceBooks on PriceBooks.PricebookId=Mapping.PricebookId AND
    //              PriceBooks.ProductId='${item.ProductId}'
    //             where Products.Id='${item.ProductId}'`,
    //             [],

    //             async (tx, results) => {
    //                 if (results.rows.length > 0) {
    //                     console.log('results Line 183 ===> ', results);
    //                     var temp = [];
    //                     for (let i = 0; i < results.rows.length; ++i) {
    //                         temp.push(results.rows.item(i));
    //                     }
    //                     setPTR(temp[0].SellingPrice);
    //                     setMRP(temp[0].MaxRetailPrice);
    //                     console.log('temp productItem in page no StockDataList  ======> ', temp);
    //                     setProductItemData(temp[0]);
    //                     setItemData(temp[0]);

    //                 } else {
    //                     console.log('Error product Item In  Line 76 ===> ', tx);
    //                     if (fIndex == 0) {
    //                         toast.show('Please Sync Your Data..', {
    //                             type: 'warning',
    //                             placement: 'bottom',
    //                             duration: 3000,
    //                             offset: 30,
    //                             animationType: 'slide-in',
    //                         });
    //                     }
    //                 }
    //             },
    //         );
    //     });
    // }

    useEffect(() => {
        // productItem()
        let body = {
            stid: item.Stocks.Stid,
            qty: 0
        }

        setReturnLineItems(prev => ({ ...prev, [item.Stocks.Stid]: body }));
        async function temp() {
            setServerUrl(await SERVER_URL());
        }
        temp();
    }, [])

    return (
        <View style={{
            backgroundColor: themecolor.BOXTHEMECOLOR, width: width * 0.93,
            borderRadius: 10,
            overflow: 'hidden',
            borderColor: themecolor.BOXBORDERCOLOR1,
            borderWidth: 0.5,
            flexDirection: 'row',
            justifyContent: 'center',
            alignSelf: 'center',
            padding: 6,
            marginVertical: 3 
        }}>

            <View style={styles.innerviewV}>
                {/* {productItemData.ProductImages === null || productItemData.ProductImages === "" ? ( */}
                {item.ProductImages === null || item.ProductImages === "" ? (
                    <View style={styles.pic} >
                        <DummyImage width={45} height={45} />
                    </View>
                ) : (
                    <View style={styles.pic} >
                        <Image
                            source={{ uri: `${getServerUrl}media?id=${item.ProductImages}` }}
                            style={styles.GRNFLLISTIMG} />
                    </View>
                )
                }

                <View style={styles.innerview1}>
                    <TextTicker
                        duration={8000}
                        loop
                        bounce
                        repeatSpacer={50}
                        marqueeDelay={1000}>
                        <Text
                            style={{ ...styles.txt, color: themecolor.TXTWHITE }}>
                            {item.ProductName}
                        </Text>
                    </TextTicker>

                    <Text
                        style={styles.txt1}>
                        Instock : {parseInt(item.Stocks.Qty)}
                    </Text>

                    <Text
                        style={{ ...styles.txt2, color: themecolor.TXTWHITE }}>
                        {item.ProductSku} {' '}
                        <FAIcon name='rupee' size={10} />
                        {item.SellingPrice}
                    </Text>
                </View>
            </View>
            <View style={{ ...styles.NumericInputView, left: -4 }}>
                <NumericInput
                    containerStyle={{ backgroundColor: themecolor.BOXTHEMECOLOR, borderWidth: 0.5 }}
                    totalWidth={74}
                    totalHeight={24}
                    iconSize={14}
                    value={0}
                    step={1}
                    minValue={0}
                    maxValue={parseInt(item.Stocks.Qty)}
                    rounded
                    type="plus-minus"
                    textColor={themecolor.ICON}
                    iconStyle={{ color: themecolor.ICON }}
                    rightButtonBackgroundColor={themecolor.BOXTHEMECOLOR}
                    leftButtonBackgroundColor={themecolor.BOXTHEMECOLOR}
                    onChange={value => {
                        let body = {
                            stid: item.Stocks.Stid,
                            qty: value
                        }
                        setReturnLineItems(prev => ({ ...prev, [item.Stocks.Stid]: body }));
                        setQty(value)
                    }}
                />
            </View>
            <View style={styles.marVer} />
        </View>
    );
}

function StockINGRNListFL(props) {
    const mode = useSelector(state => state.mode);
    const themecolor = new MyThemeClass(mode).getThemeColor()
    return (
        <>
            <FlatList
                data={props.stocksData}
                renderItem={({ item, index }) => <StockINGRNListD item={item} fIndex={index} props={props} outletId={props.outletId} setQty={props.setQty} setReturnLineItems={props.setReturnLineItems} themecolor={themecolor} />}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
                ListFooterComponent={<View style={{ height: 90 }}>
                </View>}
            />
        </>
    );
}

function CustomerListD({ item, outletId, themecolor }) {

    const [open, setOpen] = useState(false);
    const toast = useToast();
    const [inventoryViewData, setInventoryViewData] = useState([]);
    const [inventoryMaxPrice, setInventoryMaxPrice] = useState('');
    const [getServerUrl, setServerUrl] = useState('');


    const handleInventoryView = async () => {
        try {
            console.log("ProductId......, outletId", item.ProductId, outletId)
            var res = await getInventoryView(item.ProductId, outletId);
            console.log('InventoryView....in StockDataList', res)
            if (res.statusCode == 200) {
                setInventoryViewData(res.data.inventory);
                setInventoryMaxPrice(res.data.pricebook[0].MaxRetailPrice)
            }
            else {
                console.log("Error getInventoryView......in StockDataList>>> ")
                // toast.show(res.message, {
                //     type: 'warning',
                //     placement: 'bottom',
                //     duration: 3000,
                //     offset: 30,
                //     animationType: 'slide-in',
                // });
            }
        } catch (e) {
            console.log("Error getInventoryView......in StockDataList ", e)
            // toast.show('Something went wrong!, Try again later.', {
            //     type: 'danger',
            //     placement: 'bottom',
            //     duration: 3000,
            //     offset: 30,
            //     animationType: 'slide-in',
            // });
        }
    }

    useEffect(() => {
        async function temp() {
            setServerUrl(await SERVER_URL())
        }
        temp();
        handleInventoryView()

    }, [])

    function InventoryViewFlatList({ item1 }) {
        return (
            <>
                <View style={styles.CUSTOMERdvIEW}>
                    <TouchableOpacity activeOpacity={0.5}
                        style={{ ...styles.CUSTOMERVIEWTO00, backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR1, borderWidth: 0.5 }}>

                        <View style={{ ...styles.NumberInputView, }}>
                            <View
                                style={{
                                    ...styles.Width755,
                                    justifyContent: 'center',
                                    alignSelf: 'center',
                                }}>
                                <View
                                    style={{ ...styles.FLEXDIREC1, justifyContent: 'space-between' }}>
                                    <Text style={styles.RateText}>Batch/Sr</Text>
                                    <Text style={{ ...styles.RateTextboldblackCircle, color: themecolor.TXTWHITE }}>
                                        {item1.BatchNo != null ? item1.BatchNo : ''} / {item1.SerailNo != null ? item1.SerailNo : ''}
                                    </Text>
                                </View>
                                <View
                                    style={{ ...styles.FLEXDIREC1, justifyContent: 'space-between' }}>
                                    <Text style={styles.RateText}>Available</Text>
                                    <View style={{ ...styles.FLEXDIRECTIONROW }}>
                                        <Text style={{ ...styles.RateTextboldblackCircle, color: themecolor.TXTWHITE }}>{item1.Available != null ? item1.Available : ''}</Text>
                                    </View>
                                </View>

                            </View>
                        </View>

                    </TouchableOpacity>
                </View>
            </>
        );
    }

    return (
        <>
            <View style={styles.mainview}>
                <View activeOpacity={0.5} style={{ ...styles.touchview, backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR1, }}>
                    <View style={{ ...styles.innerview, backgroundColor: themecolor.BOXTHEMECOLOR }}>

                        {item.ProductImages === null || item.ProductImages === "" ? (
                            <View style={styles.pic} >
                                <DummyImage width={45} height={45} />
                            </View>
                        ) : (
                            <View style={styles.pic} >
                                <Image
                                    source={{ uri: `${getServerUrl}media?id=${item.ProductImages}` }}
                                    style={styles.GRNFLLISTIMG} />
                            </View>
                        )
                        }

                        <View style={styles.innervieww1}>
                            <Text
                                style={{ ...styles.txt, color: themecolor.TXTWHITE }}>
                                {item.ProductName != null ? item.ProductName : ''}
                            </Text>

                            <Text
                                style={{ ...styles.txt1, color: themecolor.ICON }}>
                                Instock : {item.FreeQty != null ? item.FreeQty : ''}
                            </Text>

                            <Text style={{ ...styles.txt2, color: themecolor.TXTWHITE }}>
                                {item.ProductSku != null ? item.ProductSku : ''} {' '}
                                {inventoryMaxPrice != "" ?
                                    <FAIcon name='rupee' size={10} />
                                    : ""}
                                {inventoryMaxPrice}
                            </Text>
                        </View>

                        {inventoryViewData.length > 0 ?
                            <TouchableOpacity onPress={() => setOpen(!open)} style={{ justifyContent: 'center' }} >
                                {open == false ?
                                    <FAIcon name="angle-down" size={32} color={'lightgrey'} />
                                    :
                                    <FAIcon name="angle-up" size={32} color={'lightgrey'} />
                                }
                            </TouchableOpacity>
                            : <></>}

                    </View>
                </View>
            </View>
            <View style={styles.marVer} />

            {inventoryViewData.length > 0 && open ?
                <FlatList
                    data={inventoryViewData}
                    renderItem={({ item }) => <InventoryViewFlatList item1={item} />}
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={false}
                />
                : <></>
            }

        </>
    );
}

function StockDataList(props) {
    const mode = useSelector(state => state.mode);
    const themecolor = new MyThemeClass(mode).getThemeColor()
    return (
        // <ScrollView>
            <FlatList
                data={props.stockViewData}
                renderItem={({ item }) => <CustomerListD item={item} outletId={props.outletId} themecolor={themecolor} />}
                showsVerticalScrollIndicator={false}
                scrollEnabled={true}
                ListFooterComponent={<View style={{ height: 90 }}>
                </View>}
            />
        // </ScrollView>
    );
}


function StockINListD({ props, item, themecolor }) {
    return (
        <>
            <View style={styles.CUSTOMERdvIEW}>
                <View activeOpacity={0.5}
                    // onPress={() => navigation.navigate('OutstationTrip')}
                    style={{
                        ...styles.CUSTOMERVIEWTO9, backgroundColor: themecolor.BOXTHEMECOLOR,
                        borderWidth: 0.5, borderColor: themecolor.BOXBORDERCOLOR1
                    }}>
                    <View style={styles.NumberInputView}>
                        <View
                            style={{
                                ...styles.Width85,
                                justifyContent: 'center',
                                alignSelf: 'center',
                            }}>
                            <View
                                style={{ ...styles.FLEXDIREC1, justifyContent: 'space-between' }}>
                                <Text style={styles.RateText}>Invoice ID</Text>
                                <Text style={{ ...styles.RateTextboldblackCircle, color: themecolor.TXTWHITE }}>{item.ShippingOrder.SoNumber != null ? item.ShippingOrder.SoNumber : ''}</Text>
                            </View>
                            <View
                                style={{ ...styles.FLEXDIREC1, justifyContent: 'space-between' }}>
                                <Text style={styles.RateText}>Invoice Number</Text>
                                <View style={{ ...styles.FLEXDIRECTIONROW }}>
                                    <Text style={{ ...styles.RateTextboldblackCircle, color: themecolor.TXTWHITE }}>{item.ShippingOrder.InvoiceNumber != null ? item.ShippingOrder.InvoiceNumber : ''}</Text>
                                </View>
                            </View>
                            <View
                                style={{ ...styles.FLEXDIREC1, justifyContent: 'space-between' }}>
                                <Text style={styles.RateText}>Invoice Amount</Text>
                                <View style={{ ...styles.FLEXDIRECTIONROW }}>
                                    <Text style={{ ...styles.RateTextboldblackCircle, color: themecolor.TXTWHITE }}>{item.ShippingOrder.InvoiceAmount != null ? item.ShippingOrder.InvoiceAmount : ''}</Text>
                                </View>
                            </View>
                            <View
                                style={{ ...styles.FLEXDIREC1, justifyContent: 'space-between' }}>
                                <Text style={styles.RateText}>Invoice date</Text>
                                <Text style={{ ...styles.RateTextboldblackCircle, color: themecolor.TXTWHITE }}>
                                    {item.ShippingOrder.ShippingOrderDate != null ? item.ShippingOrder.ShippingOrderDate : ''}
                                </Text>
                            </View>

                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.MV5} />
        </>
        // <></>
    );
}

function StockINList(props) {
    const mode = useSelector(state => state.mode);
    const themecolor = new MyThemeClass(mode).getThemeColor()
    return (
        <>
            <FlatList
                data={props.shippingOrderDetailsData}
                renderItem={({ item }) => <StockINListD item={item} props={props} themecolor={themecolor} />}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
            />
        </>
    );
}

// Products List Start
function Item({ item, outletId, title, message, themecolor }) {
    var network = useSelector(state => state.network);

    console.log("item #### =======", item)
    const navigation = useNavigation();
    const [productImage, setProductImage] = React.useState('')

    useEffect(() => {
        async function temp() {
            if (network) {
                try {
                    if (item.CategoryMedia == "" || item.CategoryMedia == null) {
                        setProductImage('');
                    }
                    else {
                        setProductImage(`${await SERVER_URL()}media?id=${item.CategoryMedia}`);
                    }
                } catch (e) {
                    setProductImage('');
                }
            } else {
                setProductImage('');
            }
        }
        temp()
    }, [])


    return (
        <>
            {/* <View style={styles1.PLFL}> */}
            <TouchableOpacity
                activeOpacity={0.5}
                style={{ ...styles1.TO, alignSelf: 'center', backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR1 }}
                onPress={() => navigation.push('OpeningCloseStock', {
                    CategoryName: item.CategoryName, categoryId: item.Id,
                    outletId: outletId,
                    title: title,
                    message: message
                })}
            >
                <View
                    style={{ ...styles1.PW, backgroundColor: themecolor.BOXTHEMECOLOR }}>
                    <View style={styles1.Width2}>
                        {productImage == null || productImage == '' ?
                            (
                                <DummyImage width={52} height={52} />
                            ) : (
                                <Image
                                    source={{ uri: `${productImage}` }}
                                    style={styles1.ProductImage}
                                    resizeMode={'contain'} />
                            )
                        }
                    </View>
                    <View style={styles1.Width7}>
                        <Text
                            style={{ ...styles1.PNameText, color: themecolor.TXTWHITE }}>
                            {item.CategoryName != null ? item.CategoryName : ''}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
            {/* </View> */}
            <View style={styles1.MV3} />
        </>
    );
}

function ProductCategories(props) {
    const mode = useSelector(state => state.mode);
    const themecolor = new MyThemeClass(mode).getThemeColor()
    console.log("------->", props)
    return (
        <FlatList
            data={props.data}
            renderItem={({ item }) => <Item outletId={props.outletId} item={item} props={props} title={props.title} message={props.message} themecolor={themecolor} />}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
        />
    );
}


export { StockDataList, StockINGRNListFL, StockINList, ProductCategories };