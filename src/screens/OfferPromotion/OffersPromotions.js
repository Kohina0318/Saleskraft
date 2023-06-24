import { View, Text, Image, FlatList, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react'
import Header_2 from '../../components/shared/Header_2';
import { gettripLocationApi } from '../../repository/trip/tripRepository';
import styles from '../../assets/css/styleOffer';
import { BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import LoaderAllInOne from '../../components/shared/Loader';
import { SERVER_URL } from '../../repository/commonRepository';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';
import { useToast } from 'react-native-toast-notifications';
import { OfferListShimmer } from '../../components/Beat_outlet/ProductCategoriesListShimmer';
import NoData from '../../components/shared/NoData';

const { height } = Dimensions.get('screen')

const RenderFunction = ({ item, url, themecolor }) => {

    // console.log("item.MediaId======",item.MediaId)
    return (
        <View style={{ ...styles.mainview, borderColor: themecolor.BOXBORDERCOLOR1 }}>
            <View style={styles.innerview}>
                <Image source={{ uri: `${url}media?id=${item.MediaId}` }} resizeMode='stretch' style={{ height: '100%', width: '100%' }} />
            </View>
            <View style={{ ...styles.innerview1, backgroundColor: themecolor.BOXTHEMECOLOR, }}>
                <View>
                    <Text style={styles.txt}>{item.Title}</Text>
                </View>
                <View>
                    <Text style={{ ...styles.txt1, color: themecolor.TXTWHITE }}>{item.Description}</Text>
                </View>
                <View>
                    <Text style={{ ...styles.txt2, color: themecolor.TXTWHITE }}>{item.discription}</Text>
                </View>
            </View>
        </View>
    )
}
export default function OffersPromotions({ navigation }) {

    const mode = useSelector(state => state.mode);
    const themecolor = new MyThemeClass(mode).getThemeColor()

    const toast = useToast();
    const [data, setData] = useState([])
    const [loader, setLoader] = useState(true);
    const [url, setUrl] = useState('');


    const handleoffer = async () => {
        try {
            const result = await gettripLocationApi('api/getOffers')
            console.log("getOffers====>> ", result)
            if (result.statusCode == 200) {
                setData(result.data)
                setLoader(false)
            }
            else {
                console.log("Error Offer and promotion.......")
                toast.show(result.message, {
                    type: 'warning',
                    placement: 'bottom',
                    duration: 3000,
                    offset: 30,
                    animationType: 'slide-in',
                });
                setLoader(false)
            }
        } catch (e) {
            console.log("Error Offer and promotion ...... >>> ", e)
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

    function handleBackButtonClick() {
        navigation.goBack();
        return true;
    }

    useFocusEffect(
        React.useCallback(() => {
            BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
            return () => {
                BackHandler.removeEventListener(
                    'hardwareBackPress',
                    handleBackButtonClick,
                );
            };
        }, []),
    );

    useEffect(() => {
        handleoffer()
        async function temp() {
            setUrl(await SERVER_URL())
        }
        temp()
    }, [])

    return (
        <View style={{ backgroundColor: themecolor.THEMECOLOR, height: height }}>
            <Header_2 title={"Offers & Promotion"} onPress={() => handleBackButtonClick()} />
            {loader ? (
                < OfferListShimmer />
            ) : (
                <>
                    {data.length > 0 ?
                        <FlatList
                            data={data}
                            showsVerticalScrollIndicator={false}
                            scrollEnabled={true}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => <RenderFunction item={item} url={url} themecolor={themecolor} />}
                        /> :
                        <NoData message='No Offers & Promotion' />
                    }
                </>
            )}
        </View>
    )
}