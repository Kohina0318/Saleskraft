import { View, Text, FlatList, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import styles from '../../assets/css/stylesReport';
import NoReportImage from './NoReportImage';
import { FontFamily } from '../../assets/fonts/FontFamily';
import { FontSize } from '../../assets/fonts/Fonts/';
import CashInHandDropdown from './CashInHandDropdown';
import { getUserDetails } from '../../repository/commonRepository';
import { getEmpOutlets } from '../../repository/outlet/VerifyOutletRepository';
import { getCashInHand } from '../../repository/report/ReportRepository';
const { width } = Dimensions.get('screen');
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';

function CashList({ item, themecolor }) {
    const [GraphHeight, setGraphHeight] = React.useState(0);

    React.useEffect(() => {

        if (item.Total == 0) {
            setGraphHeight(0);
        } else if (item.Total > 0 && item.Total < 100) {
            setGraphHeight(5);
        } else if (item.Total >= 100 && item.Total < 200) {
            setGraphHeight(10);
        } else if (item.Total >= 200 && item.Total < 400) {
            setGraphHeight(15);
        } else if (item.Total >= 400 && item.Total < 600) {
            setGraphHeight(20);
        } else if (item.Total >= 600 && item.Total < 800) {
            setGraphHeight(25);
        } else if (item.Total >= 800 && item.Total < 1000) {
            setGraphHeight(30);
        } else if (item.Total >= 1000 && item.Total < 1200) {
            setGraphHeight(35);
        } else if (item.Total >= 1200 && item.Total < 1400) {
            setGraphHeight(40);
        } else if (item.Total >= 1400 && item.Total < 1600) {
            setGraphHeight(45);
        } else if (item.Total >= 1600 && item.Total < 1800) {
            setGraphHeight(50);
        } else if (item.Total >= 1800 && item.Total < 2000) {
            setGraphHeight(55);
        } else if (item.Total >= 2000 && item.Total < 2200) {
            setGraphHeight(60);
        } else if (item.Total >= 2200 && item.Total < 2400) {
            setGraphHeight(65);
        } else if (item.Total >= 2400 && item.Total < 2600) {
            setGraphHeight(70);
        } else if (item.Total >= 2600 && item.Total < 2800) {
            setGraphHeight(75);
        } else if (item.Total >= 2800 && item.Total < 3000) {
            setGraphHeight(80);
        } else if (item.Total >= 3000 && item.Total < 3200) {
            setGraphHeight(85);
        } else if (item.Total >= 3200 && item.Total < 3400) {
            setGraphHeight(90);
        } else if (item.Total >= 3400 && item.Total < 3600) {
            setGraphHeight(95);
        } else if (item.Total >= 3600 && item.Total < 3800) {
            setGraphHeight(100);
        } else if (item.Total >= 3800 && item.Total < 4000) {
            setGraphHeight(105);
        } else if (item.Total >= 4000 && item.Total < 4500) {
            setGraphHeight(110);
        } else if (item.Total >= 4500 && item.Total < 5000) {
            setGraphHeight(115);
        } else if (item.Total >= 5000 && item.Total < 5500) {
            setGraphHeight(120);
        } else if (item.Total >= 5500 && item.Total < 6000) {
            setGraphHeight(125);
        } else if (item.Total >= 6000 && item.Total < 6500) {
            setGraphHeight(130);
        } else if (item.Total >= 6500 && item.Total < 7000) {
            setGraphHeight(135);
        } else if (item.Total >= 7000 && item.Total < 7500) {
            setGraphHeight(140);
        } else if (item.Total >= 7500 && item.Total < 8000) {
            setGraphHeight(145);
        } else if (item.Total >= 8000 && item.Total < 8500) {
            setGraphHeight(150);
        } else if (item.Total >= 8500 && item.Total < 9000) {
            setGraphHeight(155);
        } else if (item.Total >= 9000 && item.Total < 10000) {
            setGraphHeight(160);
        } else if (item.Total >= 10000 && item.Total < 15000) {
            setGraphHeight(165);
        } else if (item.Total >= 15000 && item.Total < 20000) {
            setGraphHeight(170);
        } else if (item.Total >= 20000 && item.Total < 25000) {
            setGraphHeight(175);
        } else if (item.Total >= 25000 && item.Total < 30000) {
            setGraphHeight(180);
        } else if (item.Total >= 30000 && item.Total < 35000) {
            setGraphHeight(185);
        } else if (item.Total >= 35000 && item.Total < 40000) {
            setGraphHeight(190);
        } else if (item.Total >= 4000 && item.Total < 45000) {
            setGraphHeight(195);
        } else {
            setGraphHeight(200);
        }
    }, []);

    return (
        <>
            <View style={styles.MH8} />
            <View style={styles.View1}>
                <Text style={{ ...styles.Text1, color: "#FEA90D" }}>
                    ₹{parseFloat(item.Total).toFixed(2)}
                </Text>
                <View style={{ ...styles.MainView, height: GraphHeight, }} />
                <Text
                    style={{ ...styles.Text2, color: themecolor.TXTWHITE }}>
                    {item.ShippingOrderDate}
                </Text>
            </View>
        </>
    );
}

export default function CashInHandReport(props) {
    const mode = useSelector(state => state.mode);
    const themecolor = new MyThemeClass(mode).getThemeColor()

    const [refresh, setRefresh] = useState(false);
    const [cashData, setCashData] = React.useState([]);
    const [empOutletData, setEmpOutletData] = useState([]);
    const [empOutletName, setEmpOutletName] = useState([]);
    console.log('empOutletName.........CashInHand Report...>', empOutletName);

    const [selectedCashItem, setSelectedCashItem] = useState('');
    const [placeholder, setPlaceholder] = useState('');
    const [newOptions, setNewOptions] = useState(empOutletName);

    useEffect(() => {
        var empOutletNameFilter = empOutletName.filter((item) => {
            return placeholder != item
        })
        setNewOptions(empOutletNameFilter)
    }, [placeholder])


    const handleEmpOutlet = async () => {
        let res = await getEmpOutlets();
        console.log('getEmpOutlets.........>>>>CashInHand Report...>', res.data);
        setEmpOutletData(res.data);
        var AllOutletName = res.data.map((item) => {
            return item.Outlets.OutletName
        })
        setEmpOutletName(AllOutletName)
        setPlaceholder(AllOutletName[0])
        handleCashInHand(res.data[0].Outlets.Id)
    };

    useEffect(() => {
        handleEmpOutlet()
    }, []);

    const handleCashInHand = async (outletId) => {
        try {
            const data1 = await getUserDetails()
            let userId = JSON.parse(data1).data.UserId
            var res = await getCashInHand(outletId, userId)
            console.log('getCashInHand........api', res);
            if (res.statusCode === 200) {
                setCashData(res.data);
            }
        } catch (e) {
            console.log('................................', e);
        }
    }

    const handleCashSelectedDate = () => {
        var EmpOutletId = ""
        empOutletData.map((item) => {
            if (selectedCashItem == item.Outlets.OutletName) {
                return EmpOutletId = item.OutletId
            }
        })
        console.log('EmpOutletId....>>:', EmpOutletId);
        handleCashInHand(EmpOutletId);
    }

    React.useEffect(() => {
        handleCashSelectedDate();
    }, [selectedCashItem])


    return (
        <View>
            <View style={{
                flexDirection: 'row',
                width: width * 0.9,
                alignSelf: 'center',
                justifyContent: 'space-between',
                marginTop: 5
            }}>
                <View>
                    <Text style={{
                        fontSize: FontSize.labelText2,
                        fontFamily: FontFamily.PopinsMedium,
                        color: themecolor.TXTWHITE,
                        alignSelf: 'center',
                    }}>Cash In Hand</Text>
                </View>
                <View style={{ position: 'absolute', right: 0, zIndex: 9999 }}>
                    <CashInHandDropdown
                        options={newOptions}
                        setSelectedItem={setSelectedCashItem}
                        toValue={200}
                        widthh={125}
                        widthPlaceHolder={98}
                        widthIcon={10}
                        selectedExpenseItem={selectedCashItem}
                        placeholder={placeholder}
                        setPlaceholder={setPlaceholder}
                    />
                </View>
            </View>
            <View style={{ marginVertical: 5 }} />

            <View style={{
                width: width * 0.93,
                top: 4,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: themecolor.BOXBORDERCOLOR1,
                backgroundColor: themecolor.BOXTHEMECOLOR,
                padding: 10,
                alignItems: 'center',
                height: 180
            }}>
                {cashData.length > 0 ?
                    <FlatList
                        data={cashData}
                        renderItem={({ item }) => <CashList item={item} themecolor={themecolor} />}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    />
                    :
                    <NoReportImage width={165} height={165} />
                }
            </View>
        </View>
    )
}