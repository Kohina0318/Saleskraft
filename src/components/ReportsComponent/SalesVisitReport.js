import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import { FontFamily } from '../../assets/fonts/FontFamily'
import { FontSize } from '../../assets/fonts/Fonts';
import NewDropdown from '../shared/NewDropdown';
import styles from '../../assets/css/stylesReport'
import { getDailyCalls } from '../../repository/report/ReportRepository';
const { width } = Dimensions.get('window')
import Color from '../../components/Theme/ThemeDarkLightColor';
import { useNavigation } from '@react-navigation/native';

export default function SalesVisitReport(props) {

    const navigation = useNavigation()

    var salesVistSelect = ['Daily', 'Weekly', 'Monthly'];

    const [selectedSalesVistItem, setSelectedSalesVistItem] = useState('');
    const [placeholder, setPlaceholder] = useState('Daily');
    const [newOptions, setNewOptions] = useState(salesVistSelect);
    const [dailyCalls, setDailyCalls] = useState('');
    const [dailyDate, setDailyDate] = useState('');
    // console.log('mmmmmmmmmmmmmmmmmm', dailyCalls)

    useEffect(() => {
        if (placeholder == 'Daily') {
            salesVistSelect = [
                'Weekly',
                'Monthly',
            ]
        } else if (placeholder == 'Weekly') {
            salesVistSelect = [
                'Daily',
                'Monthly',
            ]
        } else if (placeholder == 'Monthly') {
            salesVistSelect = [
                'Daily',
                'Weekly',
            ]
        }
        setNewOptions(salesVistSelect)
    }, [placeholder])


    const monthtilldatecalls = async (f, t) => {
        try {
            var result = await getDailyCalls(f, t);
            // console.log('===========================666666&&&&&&&🤦‍♀️', result);
            if (result.statusCode == 200) {
                // console.log('llllllllllllllllhhhhhhhhhhhhh', result.data.TotalCalls)
                setDailyCalls(result.data);
            }
            else {
                alert(result.message)
            }
        } catch (e) {
            console.log('Error Daily Calls Api.....', e);
        }
        setLoader(false)
    };

    // console.log('677????????????????????????????????', dailyCalls.ScheduleCalls)

    useEffect(async () => {
        const f = moment().startOf('month').format('DD-MM-YYYY');
        const t = moment().endOf('month').format('DD-MM-YYYY');
        monthtilldatecalls(f, t)
    }, []);

    useEffect(() => {
        if (dailyDate == 0) {
            const date = moment().format('DD-MM-YYYY');
            // console.log('gggggggggggggggggggggg', date);
            monthtilldatecalls(date);
        } else {
            const date = moment().subtract(1, 'days').format('DD-MM-YYYY');
            // console.log('ffffffffffff', date);
            monthtilldatecalls(date);
        }
    }, [dailyDate]);

    return (
        <View style={{ width: width * 0.93, justifyContent: 'center', alignSelf: 'center', }}>
            <View
                style={{
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'space-between',
                    position: 'relative',
                }}>
                <View>
                    <Text style={{ ...styles.CardText ,color: themecolor.TXTWHITE}}>Sales Visit Report</Text>
                </View>

                <View style={{ position: 'absolute', right: 0, zIndex: 9999 }}>
                    <NewDropdown
                        options={newOptions}
                        setSelectedItem={setSelectedSalesVistItem}
                        toValue={70}
                        widthh={85}
                        widthPlaceHolder={60}
                        widthIcon={10}
                        selectedSalesItem={selectedSalesVistItem}
                        placeholder={placeholder}
                        setPlaceholder={setPlaceholder}
                    />
                </View>
            </View>


            <View style={{ marginVertical: 3 }} />

            {/* {dailyCalls.length > 1 ? */}

            <View style={{ ...styles.attentanceCards, zIndex: 0 }}>

                <View style={{ ...styles.cardsView, backgroundColor: Color.Color.BOXTHEMECOLOR, borderColor: Color.Color.BOXBORDERCOLOR }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            padding: 8,
                            width: width * 0.92,
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                alignSelf: 'center',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flex: 1,
                            }}
                            activeOpacity={0.1}
                            onPress={() =>
                                navigation.navigate('Calls', {
                                    'heading': "Schedule Calls",
                                    "data": dailyCalls.ScheduleCallsData
                                })}>
                            <Text
                                style={{
                                    fontSize: FontSize.labelText3,
                                    // color: Colors.bluetheme,
                                    color: Color.Color.BLUEWHITE,
                                    fontFamily: FontFamily.Popinssemibold,
                                }}>

                                {dailyCalls.ScheduleCalls} ({dailyCalls.ScheduleCallsInPercentage}%)
                            </Text>
                            <Text
                                style={{
                                    fontSize: FontSize.SMALL8,
                                    // color: Colors.black,
                                    color: Color.Color.TXTWHITE,
                                    fontFamily: FontFamily.PopinsMedium,
                                }}>Schedule Call</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                alignSelf: 'center',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flex: 1,
                            }}
                            activeOpacity={0.1}
                            onPress={() =>
                                navigation.navigate('Calls', {
                                    'heading': "Total Calls",
                                    data: dailyCalls.TotalCallsData,
                                    'view': true
                                })
                            }>
                            <Text
                                style={{
                                    fontSize: FontSize.labelText3,
                                    // color: Colors.bluetheme,
                                    color: Color.Color.BLUEWHITE,
                                    fontFamily: FontFamily.Popinssemibold,
                                }}>
                                {dailyCalls.TotalCalls} ({dailyCalls.TotalCallsPercentage}%)
                            </Text>
                            <Text
                                style={{
                                    fontSize: FontSize.SMALL8,
                                    // color: Colors.black,
                                    color: Color.Color.TXTWHITE,
                                    fontFamily: FontFamily.PopinsMedium,
                                }}>Total Calls</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                alignSelf: 'center',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flex: 1,
                            }}
                            activeOpacity={0.1}
                            onPress={() =>
                                navigation.navigate('Calls', {
                                    'heading': "Productive Calls",
                                    data: dailyCalls.ProductiveCallsData,
                                    'view': true
                                })
                            }>
                            <Text
                                style={{
                                    fontSize: FontSize.labelText3,
                                    // color: Colors.bluetheme,
                                    color: Color.Color.BLUEWHITE,
                                    fontFamily: FontFamily.Popinssemibold,
                                }}>
                                {dailyCalls.ProductiveCalls} ({dailyCalls.ProductiveCallsPercentage}%)
                            </Text>
                            <Text
                                style={{
                                    fontSize: FontSize.SMALL8,
                                    // color: Colors.black,
                                    color: Color.Color.TXTWHITE,
                                    fontFamily: FontFamily.PopinsMedium,
                                }}>Productive Calls</Text>
                        </TouchableOpacity>
                    </View>

                    <View
                        style={{
                            borderWidth: 0.2,
                            borderColor: 'lightgrey',
                            width: width * 0.85,
                            alignSelf: 'center',
                        }} />
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            padding: 8,
                            width: width * 0.92,
                        }}>
                        <TouchableOpacity
                            style={{
                                alignSelf: 'center',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flex: 1,
                            }}
                            activeOpacity={0.1}
                            onPress={() =>
                                navigation.navigate('Calls', {
                                    'heading': "Non-visit Outlets",
                                    data: dailyCalls.NonVisitOutletsData
                                })}>
                            <Text
                                style={{
                                    fontSize: FontSize.labelText3,
                                    // color: Colors.bluetheme,
                                    color: Color.Color.BLUEWHITE,
                                    fontFamily: FontFamily.Popinssemibold,
                                }}>{dailyCalls.NonVisitOutlets}({dailyCalls.NonVisitOutletsPercentage}%)</Text>
                            <Text
                                style={{
                                    fontSize: FontSize.SMALL8,
                                    // color: Colors.black,
                                    color: Color.Color.TXTWHITE,
                                    fontFamily: FontFamily.PopinsMedium,
                                }}>Non-visit Outlets</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                alignSelf: 'center',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flex: 1,
                            }}
                            activeOpacity={0.1}
                            onPress={() =>
                                navigation.navigate('Calls', {
                                    'heading': "Zero billing oulets", 'view': true,
                                    data: dailyCalls.ZeroBillingOutletsData
                                })
                            }
                        >
                            <Text
                                style={{
                                    fontSize: FontSize.labelText3,
                                    // color: Colors.bluetheme,
                                    color: Color.Color.BLUEWHITE,
                                    fontFamily: FontFamily.Popinssemibold,
                                }}>{dailyCalls.ZeroBillingOutlets}({dailyCalls.ZeroBillingOutletsPercentage}%)</Text>
                            <Text
                                style={{
                                    fontSize: FontSize.SMALL8,
                                    // color: Colors.black,
                                    color: Color.Color.TXTWHITE,
                                    fontFamily: FontFamily.PopinsMedium,
                                }}>Zero billing outlet</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                alignSelf: 'center',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flex: 1,
                            }}
                            activeOpacity={0.1}
                            onPress={() =>
                                navigation.navigate('Calls', {
                                    'heading': "New onboarding outlets", 'list': 'show',
                                    data: dailyCalls.NewOnBoardingData.Outlets
                                })
                            }>
                            <Text
                                style={{
                                    fontSize: FontSize.labelText3,
                                    // color: Colors.bluetheme,
                                    color: Color.Color.BLUEWHITE,
                                    fontFamily: FontFamily.Popinssemibold,
                                }}>{dailyCalls.NewOnBoarding}</Text>
                            <Text
                                style={{
                                    fontSize: FontSize.SMALL8,
                                    // color: Colors.black,
                                    color: Color.Color.TXTWHITE,
                                    fontFamily: FontFamily.PopinsMedium,
                                }}>New onboarding</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                alignSelf: 'center',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flex: 1,
                            }}
                            activeOpacity={0.1}
                            onPress={() =>
                                navigation.navigate('Calls', {
                                    'heading': "Total Calls",
                                    data: dailyCalls.TelephonicOrderData,
                                    'view': true
                                })
                            }>
                            <Text
                                style={{
                                    fontSize: FontSize.labelText3,
                                    // color: Colors.bluetheme,
                                    color: Color.Color.BLUEWHITE,
                                    fontFamily: FontFamily.Popinssemibold,
                                }}>{dailyCalls.TelephonicOrder}</Text>
                            <Text
                                style={{
                                    fontSize: FontSize.SMALL8,
                                    // color: Colors.black,
                                    color: Color.Color.TXTWHITE,
                                    fontFamily: FontFamily.PopinsMedium,
                                }}>Telephonic orders</Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </View>

        </View>
    )
}