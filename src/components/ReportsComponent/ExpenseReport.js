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
const { width } = Dimensions.get('window');
import moment from 'moment';
import NoReportImage from './NoReportImage';
import { getExpenseReport } from '../../repository/report/ReportRepository';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';

function GraphCard({ item, index, sliceColor, themecolor, mode }) {
    return (
        <View style={{ flexDirection: 'row' }}>
            <View style={{
                width: 13,
                height: 13,
                borderWidth: 1,
                alignSelf: 'center',
                borderColor: Colors.borderColor1,
                backgroundColor: sliceColor[index],
            }}>
            </View>
            <View style={{ marginHorizontal: 4 }} />
            <Text style={{ color: 'black', fontSize: 12, fontFamily: FontFamily.PopinsMedium, color: themecolor.TXTWHITE }}>
                {item.exphead} : {' '}
            </Text>
            <Text
                style={{
                    color: themecolor.TXTWHITE,
                    fontSize: 12,
                    fontFamily: FontFamily.PopinsRegular,
                }}>
                <FAIcon name="rupee" size={10} /> {item.netpayableamount}
            </Text>
        </View>
    );
}

function ExpenseReport(props) {

    const mode = useSelector(state => state.mode);
    const themecolor = new MyThemeClass(mode).getThemeColor()
    const navigation = useNavigation()

    var expenseSelect = [
        'Current Month',
        'FortNight',
        'Last Month',
        'Half Yearly',
        'Yearly',
    ];
    const [selectedExpenseItem, setSelectedExpenseItem] = useState('');
    const [placeholder, setPlaceholder] = useState('Current Month');
    const [newOptions, setNewOptions] = useState(expenseSelect);
    const widthAndHeight = 140;
    const [expenseData, setExpenseData] = useState([]);
    const [sliceColor, setSliceColor] = useState([]);
    const [series, setSeries] = useState([]);

    useEffect(() => {
        if (placeholder == 'Current Month') {
            expenseSelect = [
                'FortNight',
                'Last Month',
                'Half Yearly',
                'Yearly',
            ]
        } else if (placeholder == 'FortNight') {
            expenseSelect = [
                'Current Month',
                'Last Month',
                'Half Yearly',
                'Yearly',
            ]
        } else if (placeholder == 'Last Month') {
            expenseSelect = [
                'Current Month',
                'FortNight',
                'Half Yearly',
                'Yearly',
            ]
        } else if (placeholder == 'Half Yearly') {
            expenseSelect = [
                'Current Month',
                'FortNight',
                'Last Month',
                'Yearly',
            ]
        } else if (placeholder == 'Yearly') {
            expenseSelect = [
                'Current Month',
                'FortNight',
                'Last Month',
                'Half Yearly',
            ]
        }
        setNewOptions(expenseSelect)
    }, [placeholder])

    const handleExpenseSelectedDate = (employeeId) => {
        if (selectedExpenseItem == 'Current Month') {
            const startOfMonth = moment().startOf('month').format('YYYY-MM-DD');
            const endOfMonth = moment().endOf('month').format('YYYY-MM-DD');
            // console.log('Current Month....Attendance>>:', startOfMonth, endOfMonth);
            handleExpense(startOfMonth, endOfMonth, employeeId);
        }
        else if (selectedExpenseItem == 'FortNight') {
            const startOfMonth = moment().subtract(15, 'days').format('YYYY-MM-DD');
            const endOfMonth = moment().format('YYYY-MM-DD');
            // console.log('Fortnight....Attendance>>:', startOfMonth, endOfMonth);
            handleExpense(startOfMonth, endOfMonth, employeeId);
        }
        else if (selectedExpenseItem == 'Last Month') {
            const startOfMonth = moment()
                .subtract(1, 'months')
                .startOf('month')
                .format('YYYY-MM-DD');
            const endOfMonth = moment()
                .subtract(1, 'months')
                .endOf('month')
                .format('YYYY-MM-DD');
            // console.log('Last Month....Attendance>>:', startOfMonth, endOfMonth);
            handleExpense(startOfMonth, endOfMonth, employeeId);
        }
        else if (selectedExpenseItem == 'Half Yearly') {
            const startOfMonth = moment().subtract(6, 'months').format('YYYY-MM-DD');
            const endOfMonth = moment().format('YYYY-MM-DD');
            // console.log('Half Yearly....Attendance>>:', startOfMonth, endOfMonth);
            handleExpense(startOfMonth, endOfMonth, employeeId);
        }
        else if (selectedExpenseItem == 'Yearly') {
            const startOfMonth = moment().subtract(12, 'months').format('YYYY-MM-DD');
            const endOfMonth = moment().format('YYYY-MM-DD');
            // console.log('Yearly....Attendance>>:', startOfMonth, endOfMonth);
            handleExpense(startOfMonth, endOfMonth, employeeId);
        }
    }

    useEffect(() => {
        handleExpenseSelectedDate(props.employeeId);
    }, [selectedExpenseItem, props])

    const handleExpense = async (sd, ed, employeeId) => {
        try {
            const result = await getExpenseReport(sd, ed, employeeId);

            if (result?.statusCode == 200) {
                var data = Object.values(result.data.heads).filter((i) => {
                    return i.netpayableamount != 0
                })
                setExpenseData(data);

                var seri = data.map((i) => {
                    return i.netpayableamount
                })
                console.log(" Seri value  Array......Seri>>>:", seri)
                setSeries(seri);
                generateColor1(seri.length);
            } else {
                alert(result.message);
            }
        } catch (err) {
            console.log("Catch Error in Expense Report:", err)
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

    React.useEffect(() => {
        const startOfMonth = moment().startOf('month').format('YYYY-MM-DD');
        const endOfMonth = moment().endOf('month').format('YYYY-MM-DD');
        // console.log('Current Month....Attendance>>:', startOfMonth, endOfMonth);
        handleExpense(startOfMonth, endOfMonth, props.employeeId);
    }, [props]);

    return (
        <>
            <View style={styles.DailyCallView}>
                <View>
                    <Text style={{ ...styles.CardTextDC, color: themecolor.TXTWHITE }}>Category Wise Expenses</Text>
                </View>
                <View style={{ position: 'absolute', right: 0, zIndex: 9999 }}>
                    <NewDropdown
                        options={newOptions}
                        setSelectedItem={setSelectedExpenseItem}
                        toValue={105}
                        widthh={115}
                        widthPlaceHolder={90}
                        widthIcon={10}
                        selectedExpenseItem={selectedExpenseItem}
                        placeholder={placeholder}
                        setPlaceholder={setPlaceholder}
                    />
                </View>
            </View>
            <View style={{ marginVertical: 2 }} />
            <View
                style={{
                    alignSelf: 'center',
                    backgroundColor: Colors.white,
                    borderWidth: 1,
                    borderColor: Colors.borderColor,
                    height: 'auto',
                    borderRadius: 12,
                    overflow: 'hidden',
                    width: width * 0.93,
                    backgroundColor: themecolor.BOXTHEMECOLOR,
                    borderColor: themecolor.BOXBORDERCOLOR1
                }}>
                {expenseData.length > 0 ? (
                    <TouchableOpacity
                        // onPress={() => navigation.push('OutletListCategoryReport', { outletList: outletList })}
                        style={{
                            backgroundColor: themecolor.BOXTHEMECOLOR,
                            borderColor: themecolor.BOXBORDERCOLOR,
                            flexDirection: 'row',
                            paddingVertical: 10
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
                                sliceColor={sliceColor} />
                        </View>

                        <View style={{ width: width * 0.45, alignItems: 'center', padding: 10, }}>
                            {/* <ScrollView> */}
                                <FlatList
                                    data={expenseData}
                                    scrollEnabled={true}
                                    renderItem={({ item, index }) => (
                                        <GraphCard
                                            item={item}
                                            index={index}
                                            mode={mode}
                                            themecolor={themecolor}
                                            sliceColor={sliceColor}
                                            navigation={navigation}
                                        />
                                    )}
                                    showsHorizontalScrollIndicator={false}
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

export { ExpenseReport };
