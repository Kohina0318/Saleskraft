import { View, Text, FlatList, Dimensions, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { gettripLocationApi } from '../../repository/trip/tripRepository'
import Header_2 from '../shared/Header_2'
import { Colors } from '../../assets/config/Colors';
import { FontFamily } from '../../assets/fonts/FontFamily';
import { FontSize } from '../../assets/fonts/Fonts';
import FAIcon from 'react-native-vector-icons/FontAwesome';;
const { width } = Dimensions.get('window');
import TextTicker from 'react-native-text-ticker';
import { SERVER_URL } from '../../repository/commonRepository';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';
import NoData from '../shared/NoData';
import moment from 'moment';

const Renderfun = ({ item, getServerUrl, themecolor }) => {
    return (
        <>
            <View style={{
                alignSelf: 'center',
                backgroundColor: Colors.white,
                borderWidth: 0.5,
                borderColor: Colors.borderColor1,
                height: 'auto',
                overflow: 'hidden',
                width: width * 0.96,
                marginVertical: 2,
                borderRadius: 12,
                paddingVertical: 5,
                backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR1,
            }}>
                <View style={{ flexDirection: 'row', }}>
                    <View style={{ width: width * 0.34, justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            source={{ uri: `${getServerUrl}media?id=${item.ProductImages}` }}
                            style={{ width: 70, height: 70, }}
                            resizeMode={'contain'}
                        />
                    </View>
                    <View style={{ width: width * 0.56, alignSelf: 'center',overflow:'hidden' }}>
                        <View style={{ flexDirection: 'row' }}>

                            <Text style={{
                                fontSize: FontSize.smallText,
                                color: Colors.black,
                                fontFamily: FontFamily.Popinssemibold,
                                color: themecolor.TXTWHITE
                            }}>Category Name : </Text>
                            <Text style={{
                                color: Colors.black,
                                fontSize: FontSize.smallText,
                                fontFamily: FontFamily.Popinssemibold,
                                color: themecolor.TXTWHITE
                            }}> {item.CategoryName}</Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{
                                fontSize: FontSize.smallText,
                                color: Colors.black,
                                fontFamily: FontFamily.Popinssemibold,
                                color: themecolor.TXTWHITE
                            }}>Product Name : </Text>
                            <TextTicker
                               duration={5000}
                               loop
                               bounce
                               repeatSpacer={50}
                               marqueeDelay={1000}>
                                <Text style={{
                                    color: Colors.black,
                                    fontSize: FontSize.smallText,
                                    fontFamily: FontFamily.PopinsRegular,
                                    color: themecolor.TXTWHITE
                                }}> {item.ProductName}
                                </Text>
                            </TextTicker>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{
                                fontSize: FontSize.smallText,
                                color: Colors.black,
                                fontFamily: FontFamily.Popinssemibold,
                                color: themecolor.TXTWHITE
                            }}>Outlet Name : </Text>
                            <Text style={{
                                color: Colors.black,
                                fontSize: FontSize.smallText,
                                fontFamily: FontFamily.PopinsRegular,
                                color: themecolor.TXTWHITE
                            }}> {item.OutletName}</Text>
                        </View>



                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{
                                fontSize: FontSize.smallText,
                                color: Colors.black,
                                fontFamily: FontFamily.Popinssemibold,
                                color: themecolor.TXTWHITE
                            }}>Outlet Type: </Text>
                            <Text style={{
                                color: Colors.black,
                                fontSize: FontSize.smallText,
                                fontFamily: FontFamily.PopinsRegular,
                                color: themecolor.TXTWHITE
                            }}> {item.OutletTypeName}</Text>

                        </View>


                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{
                                fontSize: FontSize.smallText,
                                color: Colors.black,
                                fontFamily: FontFamily.Popinssemibold,
                                color: themecolor.TXTWHITE
                            }}>Outlet Potential: </Text>
                            <Text style={{
                                color: Colors.black,
                                fontSize: FontSize.smallText,
                                fontFamily: FontFamily.PopinsRegular,
                                color: themecolor.TXTWHITE
                            }}> {(item.OutletPotential == null) ? 0 : item.OutletPotential}</Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{
                                fontSize: FontSize.smallText,
                                color: Colors.black,
                                fontFamily: FontFamily.Popinssemibold,
                                color: themecolor.TXTWHITE
                            }}>Sales Target:  </Text>
                            <Text style={{
                                color: Colors.black,
                                fontSize: FontSize.smallText,
                                fontFamily: FontFamily.PopinsRegular,
                                color: themecolor.TXTWHITE
                            }}><FAIcon name="rupee" size={10} />{(item.Salestarget == null) ? 0 : item.Salestarget}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </>
    )
}

export default function OutletListCategoryReport(props) {

    const mode = useSelector(state => state.mode);
    const themecolor = new MyThemeClass(mode).getThemeColor()

    const [data, setData] = useState([])
    const [getServerUrl, setServerUrl] = useState('')

    useEffect(() => {
        let outletIdsJson = props.route.params.outletList
        const f = moment().startOf('month').format('DD-MM-YYYY');
        const t = moment().endOf('month').format('DD-MM-YYYY');
        fetchCategoryById(outletIdsJson, f, t)
        async function temp() {
            setServerUrl(await SERVER_URL())
        }
        temp()
    }, [])

    const fetchCategoryById = async (outlets) => {
        outlets.map(async (i) => {
            const f = moment().startOf('month').format('YYYY-MM-DD');
            const t = moment().endOf('month').format('YYYY-MM-DD');
            const result = await gettripLocationApi(`api/getOutletWiseItemSales?from_date=${f}&to_date=${t}&outlet_id=${i.Outlet_id}`)
            setData(prev => ([...prev, ...result.data]))
        })
    }

    // console.log("data123", JSON.stringify(data))
    return (
        <View style={{ backgroundColor: themecolor.THEMECOLOR, flex: 1 }}>
            <Header_2 title={'Total Sales Calls'} onPress={() => props.navigation.push('NewDashboard')} />
            <View style={{
                width: width * 0.98,
                justifyContent: 'center',
                alignSelf: 'center',
                marginTop: 5,
                backgroundColor: themecolor.THEMECOLOR
            }}>
                {data.length > 0 ?
                    (
                        <FlatList
                            data={data}
                            renderItem={({ item }) => <Renderfun item={item} themecolor={themecolor} getServerUrl={getServerUrl} />}
                            ListFooterComponent={
                                <View style={{ height: 100 }} />}
                        />
                    ) : (
                        <NoData message={'No data available'} />)
                }
            </View>
        </View>
    )
}

