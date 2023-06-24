import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, Dimensions } from 'react-native';
import AttendanceReport from '../../components/ReportsComponent/AttendanceReport';
import OutletVerificationReport from '../../components/ReportsComponent/OutletVerificationReport';
import { CategoryWiseOrderReport } from '../../components/ReportsComponent/CategoryWiseOrderReport';
import ProfileViewHeader from '../../components/shared/ProfileViewHeader';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';
import { ExpenseReport } from '../../components/ReportsComponent/ExpenseReport';
import moment from 'moment';
import { Row, Rows, Table } from 'react-native-table-component';
import stylesTrip from '../../assets/css/styleTrip';
import TopSellingDropdown from '../../components/shared/TopSellingDropdown';
import NewDropdown from '../../components/shared/NewDropdown';
import styles from '../../assets/css/stylesReport';
import NoReportImage from '../../components/ReportsComponent/NoReportImage';
import { gettripLocationApi } from '../../repository/trip/tripRepository';
import { db } from '../../helper/SQLite DB/Sqlite';
import { store } from '../../../App';
import { TouchableOpacity } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');

export default function BAsProfile(props) {
  const mode = useSelector(state => state.mode);
  const salesOutletWiseRedux = Object.keys(
    useSelector(state => state.salesOutletWise),
  );
  const salesOutletArray = useSelector(state => state.salesOutletArray);
  const themecolor = new MyThemeClass(mode).getThemeColor();
  try {
    var Designation = props.route.params.data.Designations.Designation;
  } catch (e) {
    console.log('Error Catch Team Profile: ' + e);
  }
  // alert(Designation)

  console.log('salesOutletWise---------------', salesOutletWiseRedux);

  var topSellingSelect = ['MTD', 'QTD', 'YTD'];

  const [employeeId, setEmployeeId] = useState('');

  // alert(props.route.params.data.EmployeeId)

  // alert(employeeId)

  const [teamSalesData, setTeamSalesData] = useState([]);
  const [teamSalesSummary, setTeamSalesSummary] = useState([]);
  const [teamSalesSummary1, setTeamSalesSummary1] = useState({});
  const [lastDate, setLastDate] = useState(
    moment().subtract(1, 'month').format('YYYY-MM-DD'),
  );
  const [curDate, setCurDate] = useState(moment().format('YYYY-MM-DD'));
  const [typeId, setTypeId] = useState(1);
  const [newOptions, setNewOptions] = useState(topSellingSelect);
  const [placeholder, setPlaceholder] = useState('MTD', 'TYPE');
  const [selectedTopSellingItem, setSelectedTopSellingItem] = useState('');
  const [employeeData, setEmployeeData] = useState([]);

  // let empId = props.EmployeeId

  const fetchSalesEmployeeWise = async (startDate, endDate, typeId) => {
    // alert(`${startDate}:${endDate}:${typeId}:${props.route.params.data.EmployeeId}`)

    let result = await gettripLocationApi(
      `api/getSalesOutletWise?from_date=${startDate}&to_date=${endDate}&employee_id=${props.route.params.data.EmployeeId}&outlet_type_id=${typeId}`,
    );
    // alert(JSON.stringify(result.statusCode))
    if (result.statusCode == 200) {
      if (result.data != undefined) {
        let empdt = result.data[1];
        let summaryKeys = Object.keys(result.data.summary);
        // alert(summaryKeys.length)
        store.dispatch({ type: 'ADD_SALES_OUTLET_ARRAY', payload: summaryKeys });
        // setArray()
        let summaryObj = result.data.summary;
        // setEmployeeData(empdt)
        setTeamSalesSummary1(summaryObj);
        setTeamSalesSummary(summaryKeys);
      }
    } else {
      alert(result.message);
    }
  };

  // alert(JSON.stringify(teamSalesSummary))

  useEffect(() => {
    fetchSalesEmployeeWise(lastDate, curDate, typeId);
  }, [lastDate, curDate, props, placeholder, typeId]);

  const [getArray, setArray] = React.useState([]);

  // useEffect(() => {
  /**New Start */
  async function localDataByOutId() {
    // alert("Hii")
    //*** */
    // await salesOutletArray.forEach(async itm1 => {
    try {
      db.transaction(async tx => {
        salesOutletArray.forEach(async (itm1, index) => {
          console.log('Index======', index, itm1);
          // alert(index)
          tx.executeSql(
            // `SELECT Out.*,Outyp.* FROM Outlets as Out join OutletsTypes as Outyp on Out.OutlettypeId=Outyp.OutlettypeId where Out.Id=${itm1}`,
            `select * from Outlets where Id=${itm1}`,
            [],
            (tx, results) => {
              console.log('errr', tx);
              console.log('result Line 141--->', results);
              var temp = [];
              for (let i = 0; i < results.rows.length; ++i) {
                temp.push(results.rows.item(i));
                // alert(results.rows.item(i).Id)
              }
              console.log('RESULT LINE 108===>', temp[0]);
              try {
                if (temp[0].Id != undefined) {
                  store.dispatch({
                    type: 'ADD_SALES_OUTLET_BY',
                    payload: [temp[0].Id, temp[0]],
                  });
                  console.log('OutletName=== Line 147', temp);
                  // setArray(prev=>([...prev,temp[0]]));
                }
              } catch (e) {
                // alert("Line 119"+e)
                console.log('Erro in Catch Line 150', e);
              }
              // try {
              //   setOutletCategory(temp[0].OutletClassification);
              // } catch (e) {
              //   setOutletCategory('');
              // }
              console.log(
                'Data returned From Outlets SQLITE ine 66 ----->',
                temp,
              );
            },
          );
        });
      });
    } catch (e) {
      // alert("Line 137" + JSON.stringify(e))
      console.log('Err in OutletvIew Line 174', e);
    }
    /** */
    // })
  }
  // temp()
  /**New ENd */
  // }, [salesOutletArray])

  useEffect(() => {
    const enddt = moment().format('YYYY-MM-DD');
    if (placeholder == 'MTD') {
      topSellingSelect = ['QTD', 'YTD'];
      const sdate = moment().subtract(1, 'month').format('YYYY-MM-DD');
      setLastDate(sdate);
      setCurDate(enddt);
    } else if (placeholder == 'QTD') {
      topSellingSelect = ['MTD', 'YTD'];
      const sdate = moment().subtract(3, 'months').format('YYYY-MM-DD');
      setLastDate(sdate);
      setCurDate(enddt);
    } else if (placeholder == 'YTD') {
      topSellingSelect = ['MTD', 'QTD'];
      const sdate = moment().subtract(1, 'year').format('YYYY-MM-DD');
      setLastDate(sdate);
      setCurDate(enddt);
    }
    setNewOptions(topSellingSelect);
  }, [placeholder]);

  const getUserData = (empId, key) => {
    console.log('empData001 ', employeeData);
    let filteredData = employeeData.filter(item => {
      return item.EmployeeId == empId;
    });
    if (
      filteredData == [] ||
      filteredData == undefined ||
      filteredData == null
    ) {
      // alert('error')
      return '...';
    } else {
      if (key == 'name') {
        return `${filteredData[0].FirstName} ${filteredData[0].LastName}`;
      } else {
        return filteredData[0].DesignationId;
      }
    }
  };

  console.log('getArray==========>', getArray);

  const getOutletName = async () => { };

  useEffect(() => {
    const empId = props.route.params.data.EmployeeId;
    // alert()
    setEmployeeId(empId);
  }, []);

  const outlet360View = id => {
    // alert(id)
  };


  return (
    <View style={{ backgroundColor: themecolor.THEMECOLOR, flex: 1 }}>
      <View style={{ flex: 0.35 }}>
        {/* <BAsHeader
          onPress={() => props.navigation.goBack()}
          data={props.route.params.data}
        /> */}
        <ProfileViewHeader empId={employeeId} />
      </View>
      <View style={{ flex: 0.66, marginTop: 10 }}>
        <ScrollView>
          <CategoryWiseOrderReport
            EmployeeId={employeeId}
            heading="Target vs Achievement"
          />
          <View style={{ marginVertical: 4 }} />
          <AttendanceReport EmployeeId={props.route.params.data.EmployeeId} />
          <View style={{ marginVertical: 4 }} />
          <ExpenseReport employeeId={employeeId} />
          <View style={{ marginVertical: 4 }} />
          {Designation == 'BA' && <OutletVerificationReport
            EmployeeId={props.route.params.data.EmployeeId}
          />}

          <View
            style={{
              width: width * 0.93,
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                position: 'relative',
                marginVertical: 10,
              }}>
              <View>
                <Text style={{...styles.CardText, color:themecolor.TXTWHITE}}>Sales Outlet wise </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  position: 'absolute',
                  right: 0,
                  zIndex: 9999,
                }}>
                {/* <View style={{ marginRight: 10, position:"absolute" }}> */}
                <View style={{ marginRight: 10 }}>
                  <TopSellingDropdown setSelectedItem1={setTypeId} />
                </View>
                <View>
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
            <View style={{...stylesTrip.TableMainView, borderColor: themecolor.BOXBORDERCOLOR1, backgroundColor: themecolor.BOXTHEMECOLOR,}}>
              <Table
                borderStyle={{
                  borderWidth: 0.5,
                  borderColor: '#c8e1ff',
                }}>
                <Row
                  data={['Outlet Name', 'Potential', 'Total Sales']}
                  style={{...stylesTrip.headtable, backgroundColor: themecolor.TABLE,}}
                  textStyle={[stylesTrip.texttableBig, { textAlign: 'center',color: themecolor.ICON, }]}
                />
              </Table>
              {teamSalesSummary.length != 0 ? (
                <ScrollView>
                  <Table
                    borderStyle={{
                      borderWidth: 0.5,
                      borderColor: '#c8e1ff',
                    }}>
                    <Rows
                      data={teamSalesSummary.map((item, index) => [
                        <TouchableOpacity
                          key={index}
                          style={{ padding: 5 }}
                          onPress={() => outlet360View(item)}>
                          <Text
                            style={[
                              stylesTrip.texttable,
                              { textAlign: 'center', color: themecolor.ICON, },
                            ]}>
                            {/* {getUserData(item, 'name')} */}
                            {/* {item} */}
                            {/* {salesOutletWise[index].OutletName} */}
                            {teamSalesSummary1[item] != undefined &&
                              teamSalesSummary1[item].OutletName != null
                              ? teamSalesSummary1[item].OutletName
                              : 'null'}
                          </Text>
                        </TouchableOpacity>,
                        // <TouchableOpacity style={{ padding: 5 }} onPress={() => salesOutletWise(item)} >
                        //     <Text style={[stylesTrip.texttable, { textAlign: "center" }]}>
                        //         {getUserData(item, 'desig')}
                        //     </Text>
                        // </TouchableOpacity>,
                        <View
                          style={{ padding: 5 }}
                          onPress={() => salesOutletWise(item)}>
                          <Text
                            style={[
                              stylesTrip.texttable,
                              { textAlign: 'center' },
                            ]}>
                            {teamSalesSummary1[item] != undefined &&
                              teamSalesSummary1[item].Potential != null
                              ? teamSalesSummary1[item].Potential
                              : 'null'}
                          </Text>
                        </View>,
                        <View
                          style={{ padding: 5 }}
                          onPress={() => salesOutletWise(item)}>
                          <Text
                            style={[
                              stylesTrip.texttable,
                              { textAlign: 'center' },
                            ]}>
                            {teamSalesSummary1[item] != undefined &&
                              teamSalesSummary1[item].TotalSales}
                          </Text>
                        </View>,
                      ])}
                      textStyle={stylesTrip.texttable}
                    />
                  </Table>
                </ScrollView>
              ) : (
                <>
                  <View style={{ justifyContent: 'center', marginTop: 0 }}>
                    <NoReportImage width={160} height={160} />
                  </View>
                </>
              )}
            </View>
          </View>
          <View style={{ marginVertical: 18 }} />
        </ScrollView>
      </View>
    </View>
  );
}
