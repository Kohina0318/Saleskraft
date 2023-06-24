import React, { useEffect, useState } from 'react';
import {
    View,
    FlatList,
    Text,
    Image,
    ActivityIndicator,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import { FontFamily } from '../../assets/fonts/FontFamily';
import { Colors } from '../../assets/config/Colors';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import styles from '../../assets/css/styleProducts';
import NumericInput from 'react-native-numeric-input';
import { useSelector, useDispatch } from 'react-redux';
import { useToast } from "react-native-toast-notifications";
import DummyImage from '../shared/DummyImage';
import { db } from '../../helper/SQLite DB/Sqlite';
import { SERVER_URL } from '../../repository/commonRepository';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { filter } from 'lodash';
import { useFocusEffect, StackActions, useNavigation, useIsFocused, } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import { Value } from 'react-native-reanimated';
import TextTicker from 'react-native-text-ticker';
import { OtherProductShimmer } from './ProductCategoriesListShimmer';
const { width, height } = Dimensions.get('screen');

function Item({ item, setServerUrl, serverUrl, outletId, Id, allProductData, setRefresh, refresh }) {

    const navigation = useNavigation();
    const mode = useSelector(state => state.mode);
    const themecolor = new MyThemeClass(mode).getThemeColor()
    var network = useSelector(state => state.network);
    const toast = useToast();
    const dispatch = useDispatch();
    const primaryDistributor = useSelector(state => state.primaryDistributor);
    const [sellingPrice, setSellingPrice] = React.useState('');
    const [maxRetailPrice, setMaxRetailPrice] = React.useState('');
    const [productDetailsMore, setProductDetailsMore] = React.useState({});
    const [stock, setStock] = React.useState(0);
    const [qty, setQty] = React.useState(0);

    const OutletCart = useSelector(state => state.OutletCart);
    const OutletCartRedux = Object.values(OutletCart);

    React.useEffect(() => {
        if (OutletCartRedux.length > 0) {
            OutletCartRedux.forEach(item1 => {
                if (item1.Id === item.Id) {
                    setQty(item1.quantity)
                    console.log("kkkkkkkkkkkkkkkkkk....", item1.quantity)
                }
            })
        }
    })

    useEffect(() => {
        async function temp() {
            const url = await SERVER_URL()
            setServerUrl(url)
        }
        temp()
    }, [])

    const getProductsFromDB = async () => {
        try {
            await db.transaction(async tx => {
                await tx.executeSql(
                    `select * from Outlets
                     left join Mapping on Mapping.SecondaryOutletId='${outletId}' AND Mapping.PrimaryOutletId='${primaryDistributor.Id}' 
                     left join PriceBooks on PriceBooks.PricebookId=Mapping.PricebookId AND PriceBooks.ProductId='${item.Id}'
                     left join Products on Products.Id='${item.Id}'
                     left join Units on Units.UnitId='${item.UnitD}'
                     where Outlets.Id='${outletId}'`
                    // left join Stock on Stock.ProductId='${item.Id}' AND Stock.OutletId=${primaryDistributor.Id}
                    // `select * from Outlets
                    //  left join Mapping on Mapping.SecondaryOutletId='${outletId}' 
                    //  left join PriceBooks on PriceBooks.PricebookId=Mapping.PricebookId AND PriceBooks.ProductId='${item.Id}'
                    //  left join Products on Products.Id='${item.Id}'
                    //  left join Units on Units.UnitId='${item.UnitD}'
                    //  where Outlets.Id='${outletId}'`
                    , [], (tx, results) => {

                        var temp = [];
                        for (let i = 0; i < results.rows.length; ++i) {
                            temp.push(results.rows.item(i));
                            console.log("------------+++++++++++++59", results.rows.item(i))
                        }
                        try {
                            setProductDetailsMore(temp[0])
                            if (temp[0].SellingPrice == null)  {
                                setSellingPrice(0)
                            } else {
                                setSellingPrice(temp[0].SellingPrice);
                            }
                            if (temp[0].MaxRetailPrice == null ) {
                                setMaxRetailPrice(0)
                            } else {
                                setMaxRetailPrice(temp[0].MaxRetailPrice);
                            }
                        } catch (e) {
                            console.log("Error in Other Product Details List....", e)
                        }
                        // console.log('Data returned From PriceBooks SQLITE Line 45 in Product Catalogue List -----+====>', temp);
                    });
            });
        } catch (e) {
            alert(e);
        }
    }

    const getStockFromDB = async () => {
        try {
            await db.transaction(async tx => {
                await tx.executeSql(
                    `Select * from Stock where ProductId='${item.Id}' AND OutletId=${primaryDistributor.Id}`
                    , [], (tx, results) => {

                        var temp = [];
                        for (let i = 0; i < results.rows.length; ++i) {
                            temp.push(results.rows.item(i));
                        }
                        console.log("Stock in ProductCatalogue==========>", temp)
                        try {
                            setStock(temp[0].FreeQty);
                        } catch (e) {
                            setStock(0);
                        }
                        // console.log('Data returned From PriceBooks SQLITE Line 45 in Product Catalogue List -----+====>', temp);
                    });
            });
        } catch (e) {
            alert(e);
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            getProductsFromDB()
            getStockFromDB()
        }, [])
    )


    return (
        <>
            {Id == item.Id ?
                <></> :
                maxRetailPrice != null && maxRetailPrice != "" && sellingPrice != null && sellingPrice != "" ?
                    <>
                        <TouchableOpacity activeOpacity={0.5}
                            onPress={() =>
                                navigation.push('BeatOutletProductDetail', {
                                    productDetailsData: item,
                                    productDetailsMore: productDetailsMore,
                                    stock: stock,
                                    qty: qty,
                                    allProductData: allProductData,
                                    outletId: outletId,
                                    setRefresh: setRefresh,
                                    refresh: refresh
                                })
                            }
                            style={{
                                ...styles.CUSTOMERVIEWTO, backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR1, borderWidth: 0.5, alignSelf: 'center', width: width * 0.45,
                                borderRadius: 10,
                                overflow: 'hidden',
                                borderColor: Colors.borderColor,
                                borderWidth: 0.5,
                                backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR1,
                                height: 240,
                                margin: 4,
                            }}>
                            <View style={{ backgroundColor: themecolor.BOXTHEMECOLOR, }}>
                                <View style={{ width: width * 0.4, justifyContent: 'center', alignSelf: 'center', }}>
                                    {!network || item.ProductImages == null || item.ProductImages == '' ? (
                                        <DummyImage width="100%" height={170} style={{ justifyContent: 'center', alignSelf: 'center', }} />
                                    ) : (
                                        <Image
                                            source={{ uri: `${serverUrl}media?id=${item.ProductImages}` }}
                                            style={{ width: "100%", height: 170, justifyContent: 'center', alignSelf: 'center', backgroundColor: 'transparent' }}
                                            resizeMode={'contain'}
                                        />
                                    )}
                                    <View >
                                        <TextTicker style={{ ...styles.HeadText, color: themecolor.TXTWHITE, width: width * 0.4, }}>{item.ProductName}</TextTicker>
                                    </View>

                                    <View style={{ ...styles.FLEXDIREC1, margin: 1, width: width * 0.4 }}>
                                        <Text style={{ ...styles.RateText, color: themecolor.TXTWHITE, }}>
                                            MRP : {" "}
                                        </Text>
                                        <Text style={{ ...styles.RateText, color: 'grey', textDecorationLine: 'line-through', }}>
                                            <FAIcon name="rupee" size={10} /> {maxRetailPrice}
                                        </Text>
                                        <Text style={{ ...styles.RateText, color: Colors.green1, }}>
                                            {" "}<FAIcon name="rupee" size={10} /> {sellingPrice}
                                        </Text>
                                    </View>
                                </View>

                            </View>
                        </TouchableOpacity>
                        <View style={{ marginVertical: 4 }} />
                    </>
                    :
                    <OtherProductShimmer />
            }
        </>
    );
}

export default function OtherProductDetailsList(props) {
    const [serverUrl, setServerUrl] = useState('');

    return (
        <>
            <FlatList
                data={props.data}
                renderItem={({ item, index }) => (
                    <Item
                        item={item}
                        serverUrl={serverUrl}
                        setServerUrl={setServerUrl}
                        outletId={props.outletId}
                        Id={props.Id}
                        allProductData={props.data}
                        setRefresh={props.setRefresh}
                        refresh={props.refresh}
                    />
                )}
                horizontal={true}
                showsVerticalScrollIndicator={false}
                scrollEnabled={true}
            />

        </>
    );
}