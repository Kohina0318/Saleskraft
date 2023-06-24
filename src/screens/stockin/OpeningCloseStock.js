import React, { useEffect, useState } from 'react';
import {
    View,
    BackHandler
} from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import Header_2 from '../../components/shared/Header_2';
import { useNavigation } from '@react-navigation/native';
import SearchBar from '../../components/shared/NewSearchBarMicComponent';
import { StockDataList } from '../../screens/stockin/StockDataList';
import styles from '../../assets/css/styleStockIn';
import { getCheckInOutStatus } from '../../repository/outlet/VerifyOutletRepository';
import { getStockView, } from '../../repository/stockIn/StockInRepository';
import { db } from '../../helper/SQLite DB/Sqlite';
import NoData from '../../components/shared/NoData';
import { StockInReturnLineItemShimmer } from '../../components/Beat_outlet/ProductCategoriesListShimmer';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';
// import LoaderAllInOne from '../../components/shared/Loader';

export default function OpeningStock(props) {
    const mode = useSelector(state => state.mode);
    const themecolor = new MyThemeClass(mode).getThemeColor()

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

    const toast = useToast();
    const navigation = useNavigation()
    const [loader, setLoader] = useState(true);
    const [searchValue, setSearchValue] = useState('')
    console.log("searchValue.....>", searchValue)
    const [outletId, setOutletId] = useState('')
    const [stockViewData, setStockViewData] = useState([])
    const [stockViewDataSearch, setStockViewDataSearch] = useState([])

    const filtering = async (search) => {
        console.log("Inside Filtering---->", search)
        var temp = stockViewDataSearch.filter(item => {
            return (
                item.ProductName.toLowerCase().includes(search.toLowerCase())
            )
        })
        setStockViewData(temp);
    }

    useEffect(() => {
        filtering(searchValue)
    }, [searchValue])

    const checkInOutStatus = async () => {
        try {
            const res = await getCheckInOutStatus();
            console.log("Get Check In Out Status......page Opening Stock line 24", res);
            if (res.statusCode === 200) {
                setOutletId(res.data.data.CheckInRec.OutletId)
                handleStockView(res.data.data.CheckInRec.OutletId);
            }
            else {
                console.log("Error CheckInOutStatus in Opening Stock page")
                toast.show(res.message, {
                    type: 'warning',
                    placement: 'bottom',
                    duration: 3000,
                    offset: 30,
                    animationType: 'slide-in',
                });
            }
        } catch (e) {
            console.log("Error CheckInOutStatus in Opening Stock page", e)
            toast.show('Something went wrong!, Try again later.', {
                type: 'danger',
                placement: 'bottom',
                duration: 3000,
                offset: 30,
                animationType: 'slide-in',
            });
        }
    }

    const handleStockView = async (outletId) => {
        try {
            console.log("Category Id......In OPenClose Stock>>:", props.route.params.categoryId)
            const res = await getStockView(outletId, props.route.params.categoryId);
            console.log("Stock View...>>Openning Stock>>:", res);

            if (res.statusCode === 200) {
                if (res.data.length > 0) {

                    res.data.forEach((itm, index) => {
                        console.log("itm.ProductId+++++++++++++++++", itm.ProductId)
                        db.transaction(async tx => {
                            await tx.executeSql(
                                `Select * from Products
                            left join Outlets on Outlets.Id='${outletId}'
                            where Products.Id='${itm.ProductId}'`,
                                [],

                                async (tx, results) => {
                                    if (results.rows.length > 0) {
                                        console.log('results Line 90====== ===> ', results);
                                        var temp = [];
                                        for (let i = 0; i < results.rows.length; ++i) {
                                            temp.push(results.rows.item(i));
                                        }
                                        console.log(' ===============> ', temp);
                                        temp[0]['FreeQty'] = itm.FreeQty
                                        temp[0]['ProductId'] = itm.ProductId
                                        setStockViewData(prev => [...prev, temp[0]]);
                                        setStockViewDataSearch(prev => [...prev, temp[0]])
                                        setLoader(false)
                                    } else {
                                        setLoader(false)
                                        if (index == 0) {
                                            console.log('Error product Item In  Line 76 ===> ', tx);
                                            toast.show("Something went wrong!, Please try again later.", {
                                                type: 'danger',
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
                }
                else {
                    setLoader(false)
                }
            }
            else {
                setLoader(false)
                toast.show(res.message, {
                    type: 'danger',
                    placement: 'bottom',
                    duration: 3000,
                    offset: 30,
                    animationType: 'slide-in',
                });
            }
        } catch (e) {
            setLoader(false)
            console.log("Error StockView in Opening Stock page", e)
            toast.show("Something went wrong!, Please try again later.", {
                type: 'danger',
                placement: 'bottom',
                duration: 3000,
                offset: 30,
                animationType: 'slide-in',
            });
        }
    }

    useEffect(() => {
        checkInOutStatus()
    }, [])

    return (
        <View style={{ ...styles.flex, backgroundColor: themecolor.THEMECOLOR }}>
            <Header_2 title={props.route.params.title} onPress={() => navigation.goBack()} />
            <SearchBar placeholder={'Search product...'} RightMicIcon='mic'
                // RightCloseIcon={''} 
                LeftIcon={'search'}
                searchValue={searchValue} setSearchValue={setSearchValue} />
            {/* <>
                {loader ? (
                    <LoaderAllInOne />
                ) : ( */}
            <View style={styles.H}>
                {loader ? (
                    < StockInReturnLineItemShimmer />
                ) : (
                    <View>
                        {stockViewData.length > 0 ? (
                            <StockDataList stockViewData={stockViewData} outletId={outletId} />
                        ) : (
                            <NoData message={props.route.params.message} />
                        )}
                    </View>
                )}
            </View>
            {/* )}
            </> */}
        </View>
    )
}