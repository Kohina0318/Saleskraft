import React, { useEffect, useState } from 'react';
import {
    ScrollView,
    View,
    BackHandler
} from 'react-native';
import Header_2 from "../../components/shared/Header_2"
import NoData from '../../components/shared/NoData';
import { getAllMaterial } from '../../repository/Material/MaterialRepository';
import { MaterialFlatList } from './MaterialDataList';
import { useToast } from 'react-native-toast-notifications';
import { ProductCategoriesListShimmer } from '../../components/Beat_outlet/ProductCategoriesListShimmer';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';

export default function Material(props) {
    const mode = useSelector(state => state.mode);
    const themecolor = new MyThemeClass(mode).getThemeColor()
    const toast = useToast();
    const [loader, setLoader] = useState(true);
    const [allData, setAllData] = useState([])

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
        
    const allMaterial = async () => {
        try {
            var res = await getAllMaterial();
            console.log("All Material Data......page Material line 11..>>:", res)
            if (res.statusCode == 200) {
                setAllData(res.data)
                setLoader(false);
            } else {
                console.log("Error... allMaterial in Material Page..")
                toast.show(res.message, {
                    type: 'warning',
                    placement: 'bottom',
                    duration: 3000,
                    offset: 30,
                    animationType: 'slide-in',
                });
                setLoader(false);
            }
        } catch (e) {
            console.log("Error... allMaterial in Material Page",e)
            toast.show('Something went wrong!, Try again later.', {
                type: 'danger',
                placement: 'bottom',
                duration: 3000,
                offset: 30,
                animationType: 'slide-in',
            }); 
            setLoader(false);
           
        }
    }

    useEffect(() => {
        allMaterial();
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: themecolor.THEMECOLOR }}>
            <Header_2 title='Material' onPress={() => props.navigation.goBack()} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ marginBottom: 5 }} />
                {loader ? (
                    <ProductCategoriesListShimmer />
                ) : (
                    allData.length > 0 ?
                        (
                            <MaterialFlatList allData={allData} />
                        ) : (
                            <NoData message="No Material" />
                        )
                )}

            </ScrollView>
        </View>

    )
}