import React, { useState, useEffect } from 'react';
import {
    TouchableOpacity,
    View,
    FlatList,
    Text,
    Dimensions,
    ScrollView,
} from 'react-native';
import PieChart from 'react-native-pie-chart';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { Colors } from '../../assets/config/Colors';
import { FontFamily } from '../../assets/fonts/FontFamily';
import styles from '../../assets/css/stylesDashboard';
import { useNavigation } from '@react-navigation/native';
import NewDropdown from '../shared/NewDropdown';
import Color from '../../components/Theme/ThemeDarkLightColor';
const { width } = Dimensions.get('window');
import moment from 'moment';
import { gettripLocationApi } from '../../repository/trip/tripRepository';
import { getEmployeeId, } from '../../repository/commonRepository';
import NoReportImage from './NoReportImage';
import { getPaymentMode } from '../../repository/report/ReportRepository';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';

function GraphCard({ item, props, index, sliceColor, themecolor }) {

    return (
        <View
            style={{ flexDirection: 'row' }}>
            <View
                style={{
                    width: 13,
                    height: 13,
                    borderWidth: 1,
                    alignSelf: 'center',
                    borderColor: themecolor.BOXBORDERCOLORR,
                    backgroundColor: sliceColor[index],
                }}></View>

            <View style={{ marginHorizontal: 4 }} />
            <Text
                style={{ color: themecolor.TXTWHITE, fontSize: 12, fontFamily: FontFamily.PopinsMedium }}>
                {item.PaymentMode} : {' '}
                <Text
                    style={{
                        color: themecolor.TXTWHITE,
                        fontSize: 12,
                        fontFamily: FontFamily.PopinsRegular,
                    }}>
                    <FAIcon name="rupee" size={10} color={themecolor.TXTWHITE} />{item.InvoiceAmount}
                </Text>
            </Text>
        </View>
    );
}

function PaymentModeReport(props) {
    const mode = useSelector(state => state.mode);
    const themecolor = new MyThemeClass(mode).getThemeColor()

    const navigation = useNavigation()

    var paymentModeSelect = [
        'Current Month',
        'FortNight',
        'Last Month',
        'Half Yearly',
        'Yearly',
    ];
    const [selectedPaymentModeItem, setSelectedPaymentModeItem] = useState('');
    const [placeholder, setPlaceholder] = useState('Current Month');
    const [newOptions, setNewOptions] = useState(paymentModeSelect);

    const widthAndHeight = 140;
    const [paymentModeData, setPaymentModeData] = useState([]);
    const [sliceColor, setSliceColor] = useState([]);
    const [series, setSeries] = useState([]);

    useEffect(() => {
        if (placeholder == 'Current Month') {
            paymentModeSelect = [
                'FortNight',
                'Last Month',
                'Half Yearly',
                'Yearly',
            ]
        } else if (placeholder == 'FortNight') {
            paymentModeSelect = [
                'Current Month',
                'Last Month',
                'Half Yearly',
                'Yearly',
            ]
        } else if (placeholder == 'Last Month') {
            paymentModeSelect = [
                'Current Month',
                'FortNight',
                'Half Yearly',
                'Yearly',
            ]
        } else if (placeholder == 'Half Yearly') {
            paymentModeSelect = [
                'Current Month',
                'FortNight',
                'Last Month',
                'Yearly',
            ]
        } else if (placeholder == 'Yearly') {
            paymentModeSelect = [
                'Current Month',
                'FortNight',
                'Last Month',
                'Half Yearly',
            ]
        }
        setNewOptions(paymentModeSelect)
    }, [placeholder])

    const handlePaymentModeSelectedDate = () => {
        if (selectedPaymentModeItem == 'Current Month') {
            const startOfMonth = moment().startOf('month').format('YYYY-MM-DD');
            const endOfMonth = moment().format('YYYY-MM-DD');
            // console.log('Current Month....Attendance>>:', startOfMonth, endOfMonth);
            handlePaymentMode(startOfMonth, endOfMonth);
        }
        else if (selectedPaymentModeItem == 'FortNight') {
            const startOfMonth = moment().subtract(15, 'days').format('YYYY-MM-DD');
            const endOfMonth = moment().format('YYYY-MM-DD');
            // console.log('Fortnight....Attendance>>:', startOfMonth, endOfMonth);
            handlePaymentMode(startOfMonth, endOfMonth);
        }
        else if (selectedPaymentModeItem == 'Last Month') {
            const startOfMonth = moment()
                .subtract(1, 'months')
                .startOf('month')
                .format('YYYY-MM-DD');
            const endOfMonth = moment()
                .subtract(1, 'months')
                .endOf('month')
                .format('YYYY-MM-DD');
            // console.log('Last Month....Attendance>>:', startOfMonth, endOfMonth);
            handlePaymentMode(startOfMonth, endOfMonth);
        }
        else if (selectedPaymentModeItem == 'Half Yearly') {
            const startOfMonth = moment().subtract(6, 'months').format('YYYY-MM-DD');
            const endOfMonth = moment().format('YYYY-MM-DD');
            // console.log('Half Yearly....Attendance>>:', startOfMonth, endOfMonth);
            handlePaymentMode(startOfMonth, endOfMonth);
        }
        else if (selectedPaymentModeItem == 'Yearly') {
            const startOfMonth = moment().subtract(12, 'months').format('YYYY-MM-DD');
            const endOfMonth = moment().format('YYYY-MM-DD');
            // console.log('Yearly....Attendance>>:', startOfMonth, endOfMonth);
            handlePaymentMode(startOfMonth, endOfMonth);
        }
    }

    React.useEffect(() => {
        handlePaymentModeSelectedDate();
    }, [selectedPaymentModeItem])

    const handlePaymentMode = async (sd, ed) => {

        const empId = await getEmployeeId()
        const res = await gettripLocationApi(`api/getProfile?EmployeeId=${empId}`)
        var UserId = res.data.Userss[0].UserId
        console.log("UserId....getProfile...>> ", UserId)

        var result = await getPaymentMode(sd, ed, UserId);
        // console.log("Payment Mode Report...>>>>...:", result.data);

        if (result.statusCode == 200) {
            // setPaymentModeData(result.data);

            var data = result.data.filter((i) => {
                return i.InvoiceAmount != 0
            })
            //console.log("lkjhgfdsdfghj...data>>>", data)
            setPaymentModeData(data);

            var seri = data.map((i) => {
                return i.InvoiceAmount
            })
            console.log("Seri......>>", seri)
            setSeries(seri)
            generateColor1(seri.length);
        } else {
            alert(result.message);
        }
    };

    function generateColor1(num) {
        let colorArr = [];
        for (let i = 0; i < num; i++) {
            const randomColor = Math.floor(Math.random() * 16777215)
                .toString(16)
                .padStart(6, '0');
            colorArr.push(`#${randomColor}`);
        }
        setSliceColor(colorArr);
    }

    useEffect(() => {
        const startOfMonth = moment().startOf('month').format('YYYY-MM-DD');
        const endOfMonth = moment().format('YYYY-MM-DD');
        console.log('Current Month....Attendance>>:', startOfMonth, endOfMonth);
        handlePaymentMode(startOfMonth, endOfMonth)
    }, [props]);

    return (
        <>
            <View style={styles.DailyCallView}>
                <View>
                    <Text style={{ ...styles.CardTextDC,color:themecolor.TXTWHITE }}>Payment Mode</Text>
                </View>
                <View style={{ position: 'absolute', right: 0, zIndex: 9999 }}>
                    <NewDropdown
                        options={newOptions}
                        setSelectedItem={setSelectedPaymentModeItem}
                        toValue={105}
                        widthh={115}
                        widthPlaceHolder={90}
                        widthIcon={10}
                        selectedExpenseItem={selectedPaymentModeItem}
                        placeholder={placeholder}
                        setPlaceholder={setPlaceholder}
                    />
                </View>
            </View>

            <View style={{ marginVertical: 5 }} />

            <View
                style={{
                    alignSelf: 'center',
                    backgroundColor: themecolor.BOXTHEMECOLOR,
                    borderWidth: 1,
                    borderColor: themecolor.BOXBORDERCOLOR1,
                    height: 'auto',
                    borderRadius: 12,
                    overflow: 'hidden',
                    width: width * 0.93,
                }}>

                {paymentModeData.length > 0 ? (
                    <TouchableOpacity
                        // onPress={() => navigation.push('OutletListCategoryReport', { outletList: outletList })}
                        style={{
                            backgroundColor: themecolor.BOXTHEMECOLOR,
                            borderColor: themecolor.BOXBORDERCOLOR,
                            flexDirection: 'row',
                            paddingVertical: 10,
                        }}>
                        <View
                            style={{
                                width: width * 0.45,
                                justifyContent: 'center',
                                alignItems: 'center',
                                paddingHorizontal: 5,
                                padding: 10,
                            }}>

                            <PieChart
                                widthAndHeight={widthAndHeight}
                                series={series}
                                sliceColor={sliceColor}
                            />

                        </View>

                        <View style={{ width: width * 0.45, alignItems: 'center', padding: 10, alignSelf: 'center', }}>
                            {/* <ScrollView> */}
                                <FlatList
                                    data={paymentModeData}
                                    renderItem={({ item, index }) => (
                                        <GraphCard
                                            item={item}
                                            index={index}
                                            sliceColor={sliceColor}
                                            navigation={navigation}
                                            themecolor={themecolor}
                                        />
                                    )}
                                    showsHorizontalScrollIndicator={false}
                                    scrollEnabled={true}
                                />
                            {/* </ScrollView> */}
                        </View>
                    </TouchableOpacity>
                ) : (
                    <View style={{ padding: 10 }}>
                        <NoReportImage width={165} height={165} />
                    </View>
                )
                }

            </View>
        </>
    );
}

export { PaymentModeReport };
