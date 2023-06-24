import React, { useState, useEffect } from 'react'
import { Dimensions, Text, View, ScrollView } from 'react-native'
import { Row, Rows, Table } from 'react-native-table-component';
import stylesTrip from '../../assets/css/styleTrip';
import { gettripLocationApi } from '../../repository/trip/tripRepository';
import moment from 'moment';
import TopSellingDropdown from '../shared/TopSellingDropdown';
import NewDropdown from '../shared/NewDropdown';
import styles from '../../assets/css/stylesReport';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import NoReportImage from './NoReportImage';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';
const { width } = Dimensions.get('window');

const TeamSales = (props) => {

    const mode = useSelector(state => state.mode);
    const themecolor = new MyThemeClass(mode).getThemeColor()
    const navigation = useNavigation()

    var topSellingSelect = ['MTD', 'QTD', 'YTD'];

    // const [teamSalesData, setTeamSalesData] = useState([])
    const [teamSalesSummary, setTeamSalesSummary] = useState([])
    const [teamSalesSummary1, setTeamSalesSummary1] = useState({})
    const [lastDate, setLastDate] = useState(moment().subtract(1, 'month').format('YYYY-MM-DD'))
    const [curDate, setCurDate] = useState(moment().format('YYYY-MM-DD'))
    const [typeId, setTypeId] = useState(1)
    const [newOptions, setNewOptions] = useState(topSellingSelect);
    const [placeholder, setPlaceholder] = useState('MTD', 'TYPE');
    const [selectedTopSellingItem, setSelectedTopSellingItem] = useState('');
    const [employeeData, setEmployeeData] = useState([]);

    let empId = props.EmployeeId

    const fetchSalesEmployeeWise = async (startDate, endDate, typeId) => {
        let result = await gettripLocationApi(`api/getSalesEmployeWise?from_date=${startDate}&to_date=${endDate}&employee_id=${empId}&outlet_type_id=${typeId}`)
        // alert(startDate)
        if (result.statusCode == 200) {
            if (result.data != undefined) {
                let empdt = result.data[1]
                let summaryKeys = Object.keys(result.data.summary)
                // alert(summaryKeys.length)
                let summaryObj = result.data.summary
                setEmployeeData(empdt)
                setTeamSalesSummary1(summaryObj)
                setTeamSalesSummary(summaryKeys)
            }
        } else {
            alert(result.message)
        }
    }

    useEffect(() => {
        fetchSalesEmployeeWise(lastDate, curDate, typeId)
    }, [lastDate, curDate, props, placeholder, typeId])

    useEffect(() => {
        const enddt = moment().format('YYYY-MM-DD')
        if (placeholder == 'MTD') {
            topSellingSelect = [
                'QTD',
                'YTD',
            ]
            const sdate = moment().subtract(1, 'month').format('YYYY-MM-DD')
            setLastDate(sdate)
            setCurDate(enddt)

        } else if (placeholder == 'QTD') {
            topSellingSelect = [
                'MTD',
                'YTD',
            ]
            const sdate = moment().subtract(3, 'months').format('YYYY-MM-DD')
            setLastDate(sdate)
            setCurDate(enddt)
        } else if (placeholder == 'YTD') {
            topSellingSelect = [
                'MTD',
                'QTD',
            ]
            const sdate = moment().subtract(1, 'year').format('YYYY-MM-DD')
            setLastDate(sdate)
            setCurDate(enddt)
        }
        setNewOptions(topSellingSelect)
    }, [placeholder])

    const getUserData = (empId, key) => {
        console.log("empData001 ", employeeData)
        let filteredData = employeeData.filter((item) => {
            return item.EmployeeId == empId
        })
        if (filteredData == [] || filteredData == undefined || filteredData == null) {
            // alert('error')
            return '...'
        } else {
            if (key == 'name') {
                return `${filteredData[0].FirstName} ${filteredData[0].LastName}`
            } else {
                return filteredData[0].DesignationId
            }

        }

    }

    const salesOutletWise = (emp) => {
        navigation.push('BAsProfile', { data: { EmployeeId: emp } })}

    return (
        <>

            <View style={{ flexDirection: "row", position: "relative", marginVertical: 6}}>
                <View>
                    <Text style={{ ...styles.CardText, color: themecolor.TXTWHITE }}>Team Sales </Text>
                </View>
                <View style={{ flexDirection: "row", position: "absolute", right: 0, zIndex: 9999 }}>
                    {/* <View style={{ marginRight: 10, position:"absolute" }}> */}
                    <View style={{ marginRight: 10 }}>
                        <TopSellingDropdown setSelectedItem1={setTypeId} />
                    </View>
                    <View >
                        <NewDropdown
                            options={newOptions}
                            setSelectedItem={setSelectedTopSellingItem}
                            toValue={70}
                            widthh={85}
                            widthPlaceHolder={60}
                            widthIcon={10}
                            selectedPendingItem={selectedTopSellingItem}
                            placeholder={placeholder}
                            setPlaceholder={setPlaceholder}
                        />
                        {/* </View> */}
                    </View>
                </View>
            </View>

            <View style={{ ...stylesTrip.TableMainView, borderRadius: 10, width: width * 0.92, borderColor: themecolor.BOXBORDERCOLOR1, borderWidth: 1, backgroundColor: themecolor.BOXTHEMECOLOR }}>
                <Table
                    borderStyle={{
                        borderWidth: 0.5,
                        borderColor: themecolor.TABLE1,
                    }}>
                    <Row
                        data={['Name', 'Target', 'Sales']}
                        style={{ ...stylesTrip.headtable, backgroundColor: themecolor.TABLE,}}
                        textStyle={[stylesTrip.texttableBig, { textAlign: "center", color: themecolor.ICON, }]}
                    />
                </Table>
                {teamSalesSummary.length != 0 ?
                    <ScrollView>
                        <Table
                            borderStyle={{
                                borderWidth: 0.5,
                                borderColor: themecolor.TABLE1,
                            }}>
                            <Rows
                                data={teamSalesSummary.map((item) =>
                                    [
                                        <TouchableOpacity style={{ padding: 5 }} onPress={() => salesOutletWise(item)} >
                                            <Text style={{...stylesTrip.texttable, color: themecolor.TXTWHITE }}>
                                                {getUserData(item, 'name')}
                                            </Text>
                                        </TouchableOpacity>,
                                        // <TouchableOpacity style={{ padding: 5 }} onPress={() => salesOutletWise(item)} >
                                        //     <Text style={[stylesTrip.texttable, { textAlign: "center" }]}>
                                        //         {getUserData(item, 'desig')}
                                        //     </Text>
                                        // </TouchableOpacity>,
                                        <TouchableOpacity style={{ padding: 5 }} onPress={() => salesOutletWise(item)} >
                                            <Text style={[stylesTrip.texttable, { textAlign: "center", color: themecolor.TXTWHITE  }]}>
                                                {teamSalesSummary1[item] != undefined && teamSalesSummary1[item].Target}
                                            </Text>
                                        </TouchableOpacity>,
                                        <TouchableOpacity style={{ padding: 5 }} onPress={() => salesOutletWise(item)} >
                                            <Text style={[stylesTrip.texttable, { textAlign: "center" , color: themecolor.TXTWHITE }]}>
                                                {teamSalesSummary1[item] != undefined && teamSalesSummary1[item].TotalSales}
                                            </Text>
                                        </TouchableOpacity>,
                                    ])}
                                textStyle={{...stylesTrip.texttable, color: themecolor.TXTWHITE }}
                            />
                        </Table>
                    </ScrollView> : <><View style={{ justifyContent: 'center', marginTop: 0 }} >
                        <NoReportImage width={160} height={160} />
                    </View></>}
            </View>

        </>
    )
}

export default TeamSales
