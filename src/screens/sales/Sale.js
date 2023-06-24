import React, { useRef, useState, useEffect, } from 'react';
import { View, Image, Text, TouchableOpacity, BackHandler } from 'react-native';
import SearchBar from '../../components/shared/NewSearchBarMicComponent';
import Header_2 from '../../components/shared/Header_2';
import styles from '../../assets/css/styleSale';
import { useNavigation } from '@react-navigation/native';
import { InventroySortByFlatList, SalesDataList } from './SalesDataList';
import { getCheckInOutStatus } from '../../repository/outlet/VerifyOutletRepository';
import { getInventoryView } from '../../repository/stockIn/StockInRepository';
import { db } from '../../helper/SQLite DB/Sqlite';
import NoData from '../../components/shared/NoData';
import { useSelector } from 'react-redux';
import { useToast } from 'react-native-toast-notifications';
import { store } from '../../../App';
import RBSheet from 'react-native-raw-bottom-sheet';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { ProductCategoriesListShimmer, StockInReturnLineItemShimmer } from '../../components/Beat_outlet/ProductCategoriesListShimmer';
var _ = require('lodash');

export default function Sale(props) {

    const mode = useSelector(state => state.mode);
    const themecolor = new MyThemeClass(mode).getThemeColor()

    function handleBackButtonClick() {
        store.dispatch({ type: 'REMOVE_SALE_FILTER' });
        store.dispatch({ type: 'REMOVE_SALE_FILTER_TEMPORARY' });
        store.dispatch({ type: 'REMOVE_ALL_SALE_CART' });
        // props.navigation.goBack();
        props.navigation.navigate('NewDashboard');
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
    const navigation = useNavigation()
    const refRBSheet1 = useRef();
    const [loader, setLoader] = useState(true);
    const [searchValue, setSearchValue] = useState('')
    console.log("searchValue.....>", searchValue)
    const [OutletId, setOutletId] = useState('')
    const [inventoryViewData, setInventoryViewData] = useState([]);
    const [inventoryViewDataSearch, setInventoryViewDataSearch] = useState([]);

    const CartItem = useSelector(state => state.BASaleCart)
    const cartValues = Object.values(CartItem);

    const [isDoneVisible, setIsDoneVisible] = React.useState(false);
    const SaleFilterRedux = useSelector(state => state.SaleFilter);
    const SaleFilterReduxValue = Object.values(SaleFilterRedux);
    const SaleFilterReduxTemp = useSelector(
        state => state.SaleFilterTemporary,
    );
    const SaleFilterReduxValueTemp = Object.values(SaleFilterReduxTemp);


    const filtering = async (search) => {
        console.log("Inside Filtering---->", search)
        var temp = inventoryViewDataSearch.filter(item => {
            return (
                item.ProductName.toLowerCase().includes(search.toLowerCase())
            )
        })
        setInventoryViewData(temp);
    }

    React.useEffect(() => {
        filtering(searchValue)
    }, [searchValue])

    const checkInOutStatus = async () => {
        try {
            const res = await getCheckInOutStatus();
            console.log("Get Check In Out Status......page Sale line 36", res);
            if (res.statusCode === 200) {
                setOutletId(res.data.data.CheckInRec.OutletId)
                handleInventoryView(res.data.data.CheckInRec.OutletId);
            }else{
                console.log("Error CheckInOutStatus in Sale page")
                toast.show(res.message, {
                    type: 'warning',
                    placement: 'bottom',
                    duration: 3000,
                    offset: 30,
                    animationType: 'slide-in',
                });
            }
        } catch (e) {
            console.log("Error CheckInOutStatus in Sale page >>",e)
            toast.show('Something went wrong!, Try again later.', {
                type: 'danger',
                placement: 'bottom',
                duration: 3000,
                offset: 30,
                animationType: 'slide-in',
            });
        }
    }

    const handleInventoryView = async (outletId) => {
        try {
            // alert(outletId)
            var productId = '';
            var res = await getInventoryView(productId, outletId);
            console.log('InventoryView....in Sales', res)
            if (res.statusCode == 200) {

                res.data.inventory.forEach(( itm , index) => {
                    db.transaction(async tx => {
                        await tx.executeSql(
                            `Select ProductDescription,ProductName,ProductSku,ProductSummary,ProductImages from Products
                            left join Outlets on Outlets.Id='${itm.OutletId}'
                            where Products.Id='${itm.ProductId}'`,
                            [],

                            async (tx, results) => {
                                if (results.rows.length > 0) {
                                    var temp = [];
                                    for (let i = 0; i < results.rows.length; ++i) {
                                        temp.push(results.rows.item(i));
                                    }
                                    console.log(' ===============> ', temp);
                                    temp[0]['Inventory'] = itm
                                    res.data.pricebook.forEach((item) => {
                                        if (item.ProductId == itm.ProductId) {
                                            temp[0]['PriceBook'] = item
                                        }
                                    })
                                    setInventoryViewData(prev => [...prev, temp[0]]);
                                    setInventoryViewDataSearch(prev => [...prev, temp[0]])
                                    setLoader(false)
                                } else {
                                    setLoader(false)
                                    console.log('Error product Item In  Line 76 ===> ', tx);

                                    if(index==0){
                                    toast.show('Please Sync Your Data..', {
                                        type: 'warning',
                                        placement: 'bottom',
                                        duration: 3000,
                                        offset: 30,
                                        animationType: 'slide-in',
                                    });
                                    }
                                }
                            },
                        );
                    });
                })
                setTimeout(() => {
                    setLoader(false)
                }, 20000)
            }
            else {
                console.log("Error getInventoryView......in Sales")
                toast.show(res.message, {
                    type: 'warning',
                    placement: 'bottom',
                    duration: 3000,
                    offset: 30,
                    animationType: 'slide-in',
                });
                setLoader(false)
            }
        } catch (e) {
            console.log("Error getInventoryView......in Sales >>> ", e)
            toast.show('Something went wrong!, Try again later.', {
                type: 'danger',
                placement: 'bottom',
                duration: 3000,
                offset: 30,
                animationType: 'slide-in',
            });
            setLoader(false)
        }
    }

    useEffect(() => {
        checkInOutStatus()
    }, [])

    const handleClickOnDone = async () => {
        store.dispatch({
            type: 'ADD_SALE_FILTER',
            payload: [SaleFilterReduxValueTemp[0], SaleFilterReduxValueTemp[0]],
        });
        if (SaleFilterReduxValueTemp[0] == 1) {
            var chars = _.orderBy(inventoryViewData, ['ProductName'], ['asc']);
            console.log("Charssssssssssssssssss=======", chars)
            setInventoryViewData(chars)
            refRBSheet1.current.close();
        } else if (SaleFilterReduxValueTemp[0] == 2) {
            var chars = _.orderBy(inventoryViewData, ['ProductName'], ['desc']);
            setInventoryViewData(chars)
            refRBSheet1.current.close();
        } else if (SaleFilterReduxValueTemp[0] == 3) {
            var chars = _.orderBy(inventoryViewData, ['Id'], ['asc']);
            setInventoryViewData(chars)
            refRBSheet1.current.close();
        }
    }

    return (
        <>
            <View style={{ ...styles.flex, backgroundColor: themecolor.THEMECOLOR }}>
                <Header_2 title={'Sale'}
                    onPress={() => {
                        store.dispatch({ type: 'REMOVE_SALE_FILTER_TEMPORARY' });
                        store.dispatch({ type: 'REMOVE_SALE_FILTER' });
                        setIsDoneVisible(false);
                        handleBackButtonClick();
                    }}
                    iconnameplus="filter"
                    onPressIconPlus={() => refRBSheet1.current.open()}
                />
                <SearchBar placeholder={'Search product...'} RightMicIcon='mic'
                    // RightCloseIcon={'barcode'} 
                    LeftIcon={'search'} searchValue={searchValue} setSearchValue={setSearchValue} />


                {loader ? (
                    <StockInReturnLineItemShimmer />
                ) : (
                    inventoryViewData.length > 0 ?
                        (<View style={{ marginTop: 6 }}>
                            <SalesDataList inventoryViewData={inventoryViewData} />
                        </View>
                        ) : (
                            <NoData message="NO Inventory" />
                        )
                )}

            </View >


            {inventoryViewData.length > 0 ?
                <TouchableOpacity style={{ ...styles.touchview, backgroundColor: themecolor.HEADERTHEMECOLOR }}
                    onPress={() => {
                        cartValues.length > 0 ?
                            navigation.navigate('Cart', { OutletId: OutletId })
                            :
                            toast.show('Please Choose Product!', {
                                type: 'warning',
                                placement: 'bottom',
                                duration: 3000,
                                offset: 30,
                                animationType: 'slide-in',
                            });
                    }}
                >
                    <View style={styles.mainView}>
                        <View style={styles.innerView}>
                            <Text style={styles.buttontext}>
                                Proceed to Place Order
                            </Text>
                        </View>
                        <View style={styles.imageview}>
                            <Image source={require('../../assets/images/addoutlet/next.png')}
                                style={styles.img} />
                        </View>
                    </View>

                </TouchableOpacity>
                : <></>
            }

            <RBSheet
                ref={refRBSheet1}
                animationType={'slide'}
                closeOnDragDown={true}
                closeOnPressMask={true}
                height={220}
                customStyles={{
                    container: {
                        borderTopRightRadius: 30,
                        borderTopLeftRadius: 30,
                        padding: 10,
                        backgroundColor: themecolor.RB2
                    },
                    draggableIcon: {
                        display: 'none',
                    },
                }}>
                <View style={styles.RBVIEW}>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => {
                            store.dispatch({ type: 'REMOVE_SALE_FILTER_TEMPORARY' });
                            refRBSheet1.current.close();
                        }}>
                        <Image
                            source={require('../../assets/images/close.png')}
                            style={styles.CloseIcon}
                            resizeMode={'contain'}
                        />
                    </TouchableOpacity>
                    <View>
                        <Text style={{ ...styles.CardText, color: themecolor.TXTWHITE }}>Set Filters</Text>
                    </View>
                    <View>
                        <View>
                            <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={() => handleClickOnDone()}>
                                <Text style={{ ...styles.RBText1, color: themecolor.TXTWHITE }}>Done</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.SortView}>
                    <View style={styles.MV3} />
                    <View style={styles.Width9}>
                        <Text style={{ ...styles.CardText1, color: themecolor.TXTWHITE }}>Sort by</Text>
                    </View>

                    <InventroySortByFlatList setIsDoneVisible={setIsDoneVisible} />
                </View>
            </RBSheet>

        </>
    )
}