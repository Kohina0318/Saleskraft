import React, { useEffect, useState, useRef } from 'react';
import { View, Image, TouchableOpacity, Text, BackHandler } from 'react-native';
import styles from '../../assets/css/styleStockIn';
import SearchBar from '../../components/shared/SearchBarComponent';
import Header_2 from '../../components/shared/Header_2';
import { SuggestiveOrderDataList } from '../../screens/suggestiveOrder/SuggestiveOrderDataList';
import { getDefaultParentOutlets, getFilterSuggestiveOrder, getSuggestiveOrder } from '../../repository/suggestiveOrder/SuggestiveOrderRepository';
import { getCheckInOutStatus, } from '../../repository/outlet/VerifyOutletRepository';
import RBSheet from 'react-native-raw-bottom-sheet';
import { FlatListButton, OrderSuggestiveFlatList, } from '../beat/RBSheetSort';
import { useToast } from 'react-native-toast-notifications';
import { useSelector } from 'react-redux';
import { store } from '../../../App';
import { db } from '../../helper/SQLite DB/Sqlite';
import LoaderAllInOne from '../../components/shared/Loader';
import NoData from '../../components/shared/NoData';
import Color, { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { StockInReturnLineItemShimmer } from '../../components/Beat_outlet/ProductCategoriesListShimmer';

export default function SuggestiveOrder(props) {

    const mode = useSelector(state => state.mode);
    const themecolor = new MyThemeClass(mode).getThemeColor()

    const refRBSheet1 = useRef();
    const toast = useToast();
    const [loader, setLoader] = useState(true);
    const [searchValue, setSearchValue] = useState('')
    console.log("searchValue.....>", searchValue)
    const [suggestiveOrderData, setSuggestiveOrderData] = useState([]);
    const [suggestiveOrderDataSearch, setSuggestiveOrderDataSearch] = useState([]);
    const [primaryOutletId, setPrimaryOutletId] = useState('')
    const [secondaryOutletId, setSecondaryOutletId] = useState('')
    console.log("primaryOutletId, secondaryOutletId", primaryOutletId, secondaryOutletId)
    const [isOffset, setIsOffset] = React.useState(10)
    const [filterCategory, setFilterCategory] = useState([])

    const [isDoneVisible, setIsDoneVisible] = React.useState(false);
    const suggestiveOrderFilterRedux = useSelector(state => state.BASuggestiveOrderFilter);
    const suggestiveOrderFilterReduxValue = Object.values(suggestiveOrderFilterRedux);
    const suggestiveOrderFilterReduxTemp = useSelector(state => state.BASuggestiveOrderFilterTemporary);
    const suggestiveOrderFilterReduxValueTemp = Object.values(suggestiveOrderFilterReduxTemp);

    const [isDoneVisibleBox, setIsDoneVisibleBox] = React.useState(false);
    const suggestiveOrderFilterBoxRedux = useSelector(state => state.BASuggestiveOrderFilterBox);
    const suggestiveOrderFilterBoxReduxValue = Object.values(suggestiveOrderFilterBoxRedux);
    const suggestiveOrderFilterBoxReduxTemp = useSelector(state => state.BASuggestiveOrderFilterBoxTemporary);
    const suggestiveOrderFilterBoxReduxValueTemp = Object.values(suggestiveOrderFilterBoxReduxTemp);


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
    

    const filtering = async (search) => {
        console.log("Inside Filtering---->", search)
        var temp = suggestiveOrderDataSearch.filter(item => {
            return (
                item.ProductName.toLowerCase().includes(search.toLowerCase())
            )
        })
        setSuggestiveOrderData(temp);
    }

    const checkInOutStatus = async () => {
        try {
            const res = await getCheckInOutStatus();
            console.log(
                'Get Check In Out Status......page Competition Mapping line 190',
                res,
            );
            if (res.statusCode === 200) {
                PrimaryOutletId(res.data.data.CheckInRec.OutletId)
            }
            else {
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
            console.log("Error in checkInOutStatus in SuggestiveOrder...", e)
            toast.show("Something went wrong!, Please try again later.", {
                type: 'danger',
                placement: 'bottom',
                duration: 3000,
                offset: 30,
                animationType: 'slide-in',
            });
            setLoader(false)
        }
    };

    const PrimaryOutletId = async (outletId) => {
        try {
            const res = await getDefaultParentOutlets(outletId)
            console.log("PrimaryOutletId..in suggestiveOrder", res.data[0].Id, outletId)
            if (res.statusCode === 200) {
                suggestiveOrder(res.data[0].Id, outletId)
                setPrimaryOutletId(res.data[0].Id)
                setSecondaryOutletId(outletId)
            } else {
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
            console.log("Error in PrimaryOutletId in SuggestiveOrder...", e)
            toast.show("Something went wrong!, Please try again later.", {
                type: 'danger',
                placement: 'bottom',
                duration: 3000,
                offset: 30,
                animationType: 'slide-in',
            });
            setLoader(false)
        }
    }

    const suggestiveOrder = async (primaryOutletId, secondaryOutletId) => {
        try {
            var res = await getSuggestiveOrder(primaryOutletId, secondaryOutletId);
            console.log("sUGGestive Order Data....:", res)
            if (res.statusCode === 200) {
                setSuggestiveOrderData(res.data)
                setSuggestiveOrderDataSearch(res.data)
                setLoader(false)
            } else {
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
            console.log("Error in suggestiveOrder in SuggestiveOrder...", e)
            toast.show("Something went wrong!, Please try again later.", {
                type: 'danger',
                placement: 'bottom',
                duration: 3000,
                offset: 30,
                animationType: 'slide-in',
            });
            setLoader(false)
        }
    }

    const handleClickOnDone = async () => {

        store.dispatch({ type: 'ADD_SUGGESTIVE_ORDER_FILTER', payload: [suggestiveOrderFilterReduxValueTemp[0], suggestiveOrderFilterReduxValueTemp[0]] })
        store.dispatch({ type: 'ADD_SUGGESTIVE_ORDER_FILTER_BOX', payload: [suggestiveOrderFilterBoxReduxValueTemp[0], suggestiveOrderFilterBoxReduxValueTemp[0]] })
    //   console.log("primaryOutletId, secondaryOutletId", primaryOutletId, secondaryOutletId,  suggestiveOrderFilterBoxReduxValueTemp[0])
        try {
            var res = await getFilterSuggestiveOrder(primaryOutletId, secondaryOutletId, suggestiveOrderFilterReduxValueTemp[0], suggestiveOrderFilterBoxReduxValueTemp[0])
            console.log("FilterSuggestiveOrder...... page Suggestive Order line 76 >>:", res)
            if (res.statusCode === 200) {
                setSuggestiveOrderData(res.data);
                refRBSheet1.current.close();
            } else {
                setSuggestiveOrderData(res.data);
                refRBSheet1.current.close();
                toast.show(res.message, {
                    type: 'warning',
                    placement: 'bottom',
                    duration: 3000,
                    offset: 30,
                    animationType: 'slide-in',
                });
            }
            setIsDoneVisible(false);
            setIsDoneVisibleBox(false);
        } catch (e) {
            console.log("Error in getFilterSuggestiveOrder in SuggestiveOrder...", e)
            toast.show("Something went wrong!, Please try again later.", {
                type: 'danger',
                placement: 'bottom',
                duration: 3000,
                offset: 30,
                animationType: 'slide-in',
            });
            setLoader(false)
        }
    }

    const handleFilterCategory = async () => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT * from Product_category`,
                [],
                async (tx, results) => {

                    if (results.rows.length > 0) {
                        console.log('results Line 183 ===> ', results);
                        var temp = []
                        for (let i = 0; i < results.rows.length; ++i) {
                            temp.push(results.rows.item(i));
                        }
                        console.log('getProductCategories in InsertData Line 665 =======> ', temp);
                        setFilterCategory(temp);
                    } else {
                        console.log('Error in InsertData  In  Line 667 ===> ', tx);
                        toast.show('Please Sync Your Data..', {
                            type: 'warning',
                            placement: 'bottom',
                            duration: 3000,
                            offset: 30,
                            animationType: 'slide-in',
                        });
                    }
                },
            );
        });
    }

    useEffect(() => {
        checkInOutStatus()
        handleFilterCategory()
    }, [])

    useEffect(() => {
        filtering(searchValue)
    }, [searchValue])


    return (
        <View style={{ flex: 1, backgroundColor: themecolor.THEMECOLOR }} >
            <Header_2 title={"Suggestive Order"} Size={17} iconname={filterCategory.length > 0 ? "filter" : ""}
                onPress={() => {
                    store.dispatch({ type: 'REMOVE_SUGGESTIVE_ORDER_FILTER_TEMPORARY' })
                    store.dispatch({ type: 'REMOVE_SUGGESTIVE_ORDER_FILTER' })
                    setIsDoneVisible(false)
                    store.dispatch({ type: 'REMOVE_SUGGESTIVE_ORDER_FILTER_BOX_TEMPORARY' })
                    store.dispatch({ type: 'REMOVE_SUGGESTIVE_ORDER_FILTER_BOX' })
                    setIsDoneVisibleBox(false)
                    props.navigation.goBack()
                }}
                onPressIcon={() => refRBSheet1.current.open()}
            />
            <SearchBar placeholder={'Search product...'} RightMicIcon='mic' RightCloseIcon="" LeftIcon={'search'}
                searchValue={searchValue} setSearchValue={setSearchValue} />


            <View style={{ marginBottom: 2 }} />

            <View>
                {loader ? (
                    // <LoaderAllInOne />
                    <StockInReturnLineItemShimmer />
                ) : (
                    suggestiveOrderData.length > 0 ? (
                        <SuggestiveOrderDataList suggestiveOrderData={suggestiveOrderData?.slice(0, isOffset)} setIsOffset={setIsOffset} isOffset={isOffset} />
                    ) : (
                        <NoData message="No Suggestive Order" />
                    )
                )}
            </View>


            <View>
                <RBSheet
                    ref={refRBSheet1}
                    animationType={'slide'}
                    closeOnDragDown={true}
                    closeOnPressMask={true}
                    closeOnPressBack={false}
                    height={350}
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
                                store.dispatch({ type: 'REMOVE_SUGGESTIVE_ORDER_FILTER_TEMPORARY' })
                                store.dispatch({ type: 'REMOVE_SUGGESTIVE_ORDER_FILTER_BOX_TEMPORARY' })
                                refRBSheet1.current.close()
                            }}
                        >
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

                        <OrderSuggestiveFlatList setIsDoneVisible={setIsDoneVisible} />

                        {/* <View style={styles.MV3} /> */}

                        {filterCategory.length > 0 ? 
                        <>
                            <View style={styles.Width9}>
                                <Text style={{ ...styles.CardText1, color: themecolor.TXTWHITE }}>
                                    Category
                                </Text>
                            </View>

                            <View style={{ height: 105 }}>
                                <FlatListButton filterCategory={filterCategory} setIsDoneVisibleBox={setIsDoneVisibleBox} />
                            </View>
                        </> : <></>}

                    </View>

                </RBSheet>
            </View>
        </View>
    )
}