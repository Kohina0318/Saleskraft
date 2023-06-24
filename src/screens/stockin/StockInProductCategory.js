import React from 'react';
import {
    TouchableOpacity,
    Image,
    StatusBar,
    View,
    Text,
    ScrollView,
    BackHandler
} from 'react-native';
import styles from '../../assets/css/styleProducts';
import { db } from '../../helper/SQLite DB/Sqlite';
import { useSelector } from 'react-redux';
import NoData from '../../components/shared/NoData';
import { ProductCategories, } from '../../screens/stockin/StockDataList';
import LoaderAllInOne from '../../components/shared/Loader';
import { useToast } from 'react-native-toast-notifications';
import { ProductCategoriesListShimmer } from '../../components/Beat_outlet/ProductCategoriesListShimmer';
import Color, { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import Header_2 from '../../components/shared/Header_2';
import { useNavigation, StackActions ,useFocusEffect } from '@react-navigation/native';


export default function StockInProductCategory(props) {
    const mode = useSelector(state => state.mode);
    const themecolor = new MyThemeClass(mode).getThemeColor()
    const navigation = useNavigation()
    const toast = useToast();
    const [loader, setLoader] = React.useState(true);
    const primaryDistributor = useSelector(state => state.primaryDistributor);
    const [productCategories, setProductCategories] = React.useState([]);

    const getCategoriesFromDB = async () => {
        var qry;
        try {
            console.log("primaryDistributor.CategoryType", primaryDistributor.CategoryType)
            console.log("primaryDistributor.PricebookId", primaryDistributor.PricebookId)
            // alert(primaryDistributor.CategoryType)
            if (primaryDistributor.CategoryType === 'Regular') {
                qry = `SELECT * from Product_category where CategoryType='${primaryDistributor.CategoryType}'`
            }
            else if (primaryDistributor.CategoryType === 'Merchandise') {
                qry = `SELECT * from Product_category where CategoryType='${primaryDistributor.CategoryType}'`
            }
            else if (primaryDistributor.CategoryType === 'Samples') {
                qry = `SELECT * from Product_category where CategoryType='${primaryDistributor.CategoryType}'`
            }
            else {
                qry = `SELECT * from Product_category`
            }
        } catch (e) {
            qry = `SELECT * from Product_category`
        }

        try {
            await db.transaction(async tx => {
                await tx.executeSql(qry, [], (tx, results) => {
                    if (results.rows.length > 0) {
                        var temp = [];
                        for (let i = 0; i < results.rows.length; ++i) {
                            temp.push(results.rows.item(i));
                        }
                        setProductCategories(temp)
                        setLoader(false)
                        console.log('Data returned From Product_category SQLITE Line 28 ----->', temp);
                    } else {
                        setLoader(false)
                        console.log("ERROR in Stock IN product Category...")
                        toast.show('Please Sync Your Data..', {
                            type: 'warning',
                            placement: 'bottom',
                            duration: 3000,
                            offset: 30,
                            animationType: 'slide-in',
                        });
                    }
                });
            });
        } catch (e) {
            alert(e);
        }
    }

    React.useEffect(() => {
        getCategoriesFromDB()
    }, [])

    function handleBackButtonClick() {
    
        navigation.push('NewDashboard', {
            navigateFrom: 'temporaryParams',
            newProp:props.route.params.setmodalVisible3(true)
          })

        props.route.params.setmodalVisible3(true)
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

 
    return (
        <View style={{...styles.MainView,backgroundColor:themecolor.THEMECOLOR}}>
            <StatusBar translucent={true} backgroundColor={'transparent'} />
            <Header_2 title={'Select Product Category'} onPress={() => handleBackButtonClick()}/>

            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.FullHeight}>
                <View style={styles.MV} />
                <View style={styles.FLVIEW}>
                    {/* <ProductCategoriesList props={props} data={props.route.params.productOutlet} AllOutletByIdData={props.route.params.outletById}/> */}
                    {loader ? (
                        <ProductCategoriesListShimmer />
                    ) : (
                        productCategories.length >= 1 ?
                            (<ProductCategories
                                outletId={props.route.params.outletId}
                                props={props} data={productCategories} title={props.route.params.title} message={props.route.params.message} />
                            ) : (
                                <NoData message='No Products Available' />
                            )
                    )}
                </View>
                <View style={styles.MV50} />
            </ScrollView>
        </View>
    );
}