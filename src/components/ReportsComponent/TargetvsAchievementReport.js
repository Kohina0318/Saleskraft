import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Dimensions,
    FlatList,
} from 'react-native';
import { Colors } from '../../assets/config/Colors';
import styles from '../../assets/css/stylesReport';
import { FontFamily } from '../../assets/fonts/FontFamily';
import { FontSize } from '../../assets/fonts/Fonts';
import NoData from '../shared/NoData';
const { width, height } = Dimensions.get('window');
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';

function TargetAchievemenList({ item, themecolor }) {
    const [GraphHeight1, setGraphHeight1] = React.useState(0)
    const [GraphHeight2, setGraphHeight2] = React.useState(0)
    var filter = 1;
    // const mode = useSelector(state => state.mode);
    // const themecolor = new MyThemeClass(mode).getThemeColor()

    React.useEffect(() => {
        if (filter == 1) {
            if (item.Target == 0) {
                setGraphHeight1(0)
            } else if (item.Target > 0 && item.Target < 500) {
                setGraphHeight1(10)
            }
            else if (item.Target >= 500 && item.Target < 1000) {
                setGraphHeight1(15)
            }
            else if (item.Target >= 1000 && item.Target < 1500) {
                setGraphHeight1(20)
            }
            else if (item.Target >= 1500 && item.Target < 2000) {
                setGraphHeight1(25)
            }
            else if (item.Target >= 2000 && item.Target < 2500) {
                setGraphHeight1(30)
            }
            else if (item.Target >= 2500 && item.Target < 3000) {
                setGraphHeight1(35)
            }
            else if (item.Target >= 3000 && item.Target < 3500) {
                setGraphHeight1(40)
            }
            else if (item.Target >= 3500 && item.Target < 4000) {
                setGraphHeight1(45)
            }
            else if (item.Target >= 4000 && item.Target < 4500) {
                setGraphHeight1(50)
            }
            else if (item.Target >= 4500 && item.Target < 5000) {
                setGraphHeight1(55)
            }
            else if (item.Target >= 5000 && item.Target < 5500) {
                setGraphHeight1(60)
            }
            else if (item.Target >= 5500 && item.Target < 6000) {
                setGraphHeight1(65)
            }
            else if (item.Target >= 6000 && item.Target < 6500) {
                setGraphHeight1(70)
            }
            else if (item.Target >= 6500 && item.Target < 7000) {
                setGraphHeight1(75)
            }
            else if (item.Target >= 7000 && item.Target < 7500) {
                setGraphHeight1(80)
            }
            else if (item.Target >= 7500 && item.Target < 8000) {
                setGraphHeight1(85)
            }
            else if (item.Target >= 8000 && item.Target < 8500) {
                setGraphHeight1(90)
            } 
            else if (item.Target >= 8500 && item.Target < 9000) {
                setGraphHeight1(95)
            } 
            else if (item.Target >= 9000 && item.Target < 9500) {
                setGraphHeight1(100)
            } 
            else if (item.Target >= 9500 && item.Target < 10000) {
                setGraphHeight1(105)
            } 
            else if (item.Target >= 10000 && item.Target < 15000) {
                setGraphHeight1(110)
            }
            else if (item.Target >= 15000 && item.Target < 20000) {
                setGraphHeight1(115)
            } 
            else if (item.Target >= 20000 && item.Target < 25000) {
                setGraphHeight1(120)
            } 
            else if (item.Target >= 25000 && item.Target < 30000) {
                setGraphHeight1(125)
            } 
            else if (item.Target >= 30000 && item.Target < 35000) {
                setGraphHeight1(130)
            } 
            else if (item.Target >= 35000 && item.Target < 40000) {
                setGraphHeight1(135)
            } 
            else if (item.Target >= 40000 && item.Target < 45000) {
                setGraphHeight1(140)
            } 
            else if (item.Target >= 45000 && item.Target < 50000) {
                setGraphHeight1(145)
            } 
            else if (item.Target >= 50000 && item.Target < 55000) {
                setGraphHeight1(150)
            } 
            else if (item.Target >= 55000 && item.Target < 60000) {
                setGraphHeight1(155)
            } 
            else if (item.Target >= 60000 && item.Target < 65000) {
                setGraphHeight1(160)
            } 
            else {
                setGraphHeight1(165)
            }

            /*** */

            if (item.TotalSales == 0) {
                setGraphHeight2(0)
            } else if (item.TotalSales > 0 && item.TotalSales < 500) {
                setGraphHeight2(10)
            }
            else if (item.TotalSales >= 500 && item.TotalSales < 1000) {
                setGraphHeight2(15)
            }
            else if (item.TotalSales >= 1000 && item.TotalSales < 1500) {
                setGraphHeight2(20)
            }
            else if (item.TotalSales >= 1500 && item.TotalSales < 2000) {
                setGraphHeight2(25)
            }
            else if (item.TotalSales >= 2000 && item.TotalSales < 2500) {
                setGraphHeight2(30)
            }
            else if (item.TotalSales >= 2500 && item.TotalSales < 3000) {
                setGraphHeight2(35)
            }
            else if (item.TotalSales >= 3000 && item.TotalSales < 3500) {
                setGraphHeight2(40)
            }
            else if (item.TotalSales >= 3500 && item.TotalSales < 4000) {
                setGraphHeight2(45)
            }
            else if (item.TotalSales >= 4000 && item.TotalSales < 4500) {
                setGraphHeight2(50)
            }
            else if (item.TotalSales >= 4500 && item.TotalSales < 5000) {
                setGraphHeight2(55)
            }
            else if (item.TotalSales >= 5000 && item.TotalSales < 5500) {
                setGraphHeight2(60)
            }
            else if (item.TotalSales >= 5500 && item.TotalSales < 6000) {
                setGraphHeight2(65)
            }
            else if (item.TotalSales >= 6000 && item.TotalSales < 6500) {
                setGraphHeight2(70)
            }
            else if (item.TotalSales >= 6500 && item.TotalSales < 7000) {
                setGraphHeight2(75)
            }
            else if (item.TotalSales >= 7000 && item.TotalSales < 7500) {
                setGraphHeight2(80)
            }
            else if (item.TotalSales >= 7500 && item.TotalSales < 8000) {
                setGraphHeight2(85)
            }
            else if (item.TotalSales >= 8000 && item.TotalSales < 8500) {
                setGraphHeight2(90)
            }
            else if (item.TotalSales >= 8500 && item.TotalSales < 9000) {
                setGraphHeight2(95)
            }
            else if (item.TotalSales >= 9000 && item.TotalSales < 9500) {
                setGraphHeight2(100)
            }
            else if (item.TotalSales >= 9500 && item.TotalSales < 10000) {
                setGraphHeight2(105)
            }
            else if (item.TotalSales >= 10000 && item.TotalSales < 15000) {
                setGraphHeight2(110)
            }
            else if (item.TotalSales >= 15000 && item.TotalSales < 20000) {
                setGraphHeight2(115)
            }
            else if (item.TotalSales >= 20000 && item.TotalSales < 25000) {
                setGraphHeight2(120)
            }
            else if (item.TotalSales >= 30000 && item.TotalSales < 35000) {
                setGraphHeight2(125)
            }
            else if (item.TotalSales >= 35000 && item.TotalSales < 40000) {
                setGraphHeight2(130)
            }
            else if (item.TotalSales >= 40000 && item.TotalSales < 45000) {
                setGraphHeight2(135)
            }
            else if (item.TotalSales >= 45000 && item.TotalSales < 50000) {
                setGraphHeight2(140)
            }
            else if (item.TotalSales >= 50000 && item.TotalSales < 55000) {
                setGraphHeight2(145)
            }
            else if (item.TotalSales >= 60000 && item.TotalSales < 65000) {
                setGraphHeight2(150)
            }
            else if (item.TotalSales >= 60000 && item.TotalSales < 65000) {
                setGraphHeight2(155)
            }
            else if (item.TotalSales >= 60000 && item.TotalSales < 65000) {
                setGraphHeight2(160)
            }
            else {
                setGraphHeight2(165)
            }
        }
        //If percent
        else {
        }

    }, [])

    return (
        <>
            <View style={{ marginHorizontal: 8 }} />
            <View style={{ alignSelf: 'flex-end', alignItems: 'center' }} >
                <View style={{ flexDirection: 'row', alignItems: 'flex-end', }}>
                    <View>
                        <Text style={{ color: '#FEA90D', fontSize: FontSize.verysmallText, textAlign: 'center' }}>{item.Target}</Text>
                        <View
                            style={{
                                width: 20,
                                height: GraphHeight1,
                                backgroundColor: '#FEA90D',
                                borderBottomWidth: 1,
                            }}
                        />
                    </View>
                    <View style={{ marginHorizontal: 4 }} />
                    <View>
                        <Text style={{ color: '#F45831', fontSize: FontSize.verysmallText, textAlign: 'center' }}>{item.TotalSales}</Text>
                        <View
                            style={{
                                width: 20,
                                height: GraphHeight2,
                                backgroundColor: '#F45831',
                                borderBottomWidth: 1,
                            }}
                        />
                    </View>
                </View>
                <Text style={{ fontSize: 10, fontWeight: 'bold', color: 'black', color: themecolor.TXTWHITE }}>{item.monthName}</Text>
                <Text style={{ fontSize: 8, color: 'black', fontFamily: FontFamily.PopinsMedium, color: themecolor.TXTWHITE }} >(Total Sale)</Text>
            </View>
            <View style={{ marginHorizontal: 22 }} />
        </>
    );
}

export default function TargetVsAchievementReport(props) {

    const mode = useSelector(state => state.mode);
    const themecolor = new MyThemeClass(mode).getThemeColor()
    // const [refresh, setRefresh] = React.useState(false);
    // const [select, setSelect] = useState(1);
    const [getData, setData] = useState([]);

    useEffect(() => {
        try {
            if (props.data.length > 0) {
                setData(props.data)
            }
        } catch (e) {
            setData([])
        }
    }, [props.data])

    // console.log("Left Data========>", props.leftData)
    // console.log("Botttom Data========>", props.bottomData)
    // console.log("Inside Data========>", props.data)

    return (
        <View style={{ width: width * 0.93, alignSelf: 'center', }}>
            <View
                style={{
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'space-between',
                    position: 'relative',
                }}>
                <View>
                    <Text style={{ ...styles.CardText, color: themecolor.TXTWHITE }}>Target vs Achievement</Text>
                </View>
                {/* 
            <View style={{ position: 'absolute', right: 0, zIndex: 9999 }}>
                <NewDropdown
                    options={newOptions}
                    setSelectedItem={setSelectedPendingItem}
                    toValue={105}
                    widthh={115}
                    widthPlaceHolder={90}
                    widthIcon={10}
                    selectedPendingItem={selectedPendingItem}
                    placeholder={placeholder}
                    setPlaceholder={setPlaceholder}
                />
            </View> */}
            </View>
            <View
                style={{
                    width: width * 0.93,
                    height: height * 0.4,
                    top: 4,
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: '#E9E9E9',
                    backgroundColor: '#FFF',
                    backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR1
                }}>
                <View style={{
                    alignItems: 'flex-end',
                    alignSelf: 'center',
                    padding: 5,
                    flexDirection: 'row',
                    flex: 1,

                }}>
                    <View style={{ width: width * 0.92, alignItems: 'center' }} >
                        {getData.length > 1 ?
                            <FlatList
                                data={getData}
                                renderItem={({ item }) => (
                                    <TargetAchievemenList
                                        item={item}
                                        mode={mode}
                                        themecolor={themecolor}
                                    />)}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                            />
                            :
                            <NoData height={200} message={'No Data Available'} />
                        }
                    </View>
                </View>
                <View
                    style={{
                        width: '100%',
                        flexDirection: 'row',
                        alignSelf: 'center',
                        justifyContent: 'center',
                        padding: 14
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <View
                            style={{ height: 15, width: 15, backgroundColor: '#FEA90D' }}
                        />
                        <Text
                            style={{ marginLeft: 2, color: Colors.black, fontSize: 11, color: themecolor.TXTWHITE }}>
                            Target
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingHorizontal: 5,
                        }}>
                        <View
                            style={{ height: 15, width: 15, backgroundColor: '#F45831' }}
                        />
                        <Text
                            style={{ marginLeft: 2, color: Colors.black, fontSize: 11, color: themecolor.TXTWHITE }}>
                            Achievement
                        </Text>
                    </View>
                </View>
            </View>

        </View>
    )

}