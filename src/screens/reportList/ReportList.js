import {
  View,
  ScrollView,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import styles from '../../assets/css/stylesReport';
import Header from '../../components/shared/Header';
import { getEmployeeId, getTeamlist, getUserProfile } from '../../repository/commonRepository';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';
import moment from 'moment';
import BeatWiseSalesReport from '../../components/ReportsComponent/BeatWiseSalesReport';
import PendingReport from '../../components/ReportsComponent/PendingReport';
import AttendanceReport from '../../components/ReportsComponent/AttendanceReport';
import TargetVsAchievementReport from '../../components/ReportsComponent/TargetvsAchievementReport';
import IncentiveReport from '../../components/ReportsComponent/IncentiveReport';
import TopSellingReports from '../../components/ReportsComponent/TopSellingReports';
import OutletVerificationReport from '../../components/ReportsComponent/OutletVerificationReport';
import { getTargetWiseSales } from '../../repository/report/ReportRepository';
import { ExpenseReport } from '../../components/ReportsComponent/ExpenseReport';
import { PaymentModeReport } from '../../components/ReportsComponent/PaymentModeReport';
import TeamAttendance from '../../components/ReportsComponent/TeamAttendance';
import CashInHandReport from '../../components/ReportsComponent/CashInHandReport';
import TeamSales from '../../components/ReportsComponent/TeamSales';
// import FocusSKUWiseTargetVsAchievementReport from '../../components/ReportsComponent/FocusSKUWiseTargetVsAchievementReport';

// const { width, height } = Dimensions.get('window');
const ReportList = props => {
  
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  
  const [name, setName] = useState('');
  const [greeting, setGreeting] = useState('');
  const [EmployeeId, setEmployeeId] = useState('');
  
  const [haveTeam, setHaveTeam] = useState(0);
  // alert(haveTeam)
  
  async function userdatafetch() {
    const data = await getUserProfile();
    const fname = JSON.parse(data).data.FirstName;
    console.log('fdname', fname);
    setName(fname);
  }

  const getGreetingmessage = () => {
    const dt = new Date();
    const hrs = dt.getHours();
    let greet = '';
    if (hrs >= 0 && hrs < 12) {
      greet = 'Good Morning';
    } else if (hrs >= 12 && hrs < 17) {
      greet = 'Good Afternoon';
    } else {
      greet = 'Good Evening';
    }
    setGreeting(greet);
  };

  useEffect(() => {
    userdatafetch();
    getGreetingmessage();
  }, []);

  const Roles = useSelector(state => state.userRoles);

  const [bottomData, setBottomData] = React.useState([]);
  const [insideData, setInsideData] = React.useState([]);

  React.useEffect(() => {
    async function temp() {
      const startOfThirdMonth = moment()
        .subtract(2, 'months')
        .startOf('month')
        .format('DD-MM-YYYY');
      const endOfThirdMonth = moment()
        .subtract(2, 'months')
        .endOf('month')
        .format('DD-MM-YYYY');

      console.log('startOfThirdMonth....endOfThirdMonth>>:', startOfThirdMonth, endOfThirdMonth);
      let res1 = await getTargetWiseSales(startOfThirdMonth, endOfThirdMonth);
      console.log("RESULT TArgte vs Achievment=====>",res1)
      const ThirdMonthName = moment().subtract(2, 'months').format('MMM-YYYY')
      setInsideData([{
        Target: parseInt(res1.data.Target),
        TotalSales: res1.data.TotalSales,
        monthName: ThirdMonthName
      }])

      const startOfSecondMonth = moment()
        .subtract(1, 'months')
        .startOf('month')
        .format('DD-MM-YYYY');
      const endOfSecondMonth = moment()
        .subtract(1, 'months')
        .endOf('month')
        .format('DD-MM-YYYY');
      let res2 = await getTargetWiseSales(startOfSecondMonth, endOfSecondMonth);
      const SecondMonthName = moment().subtract(1, 'months').format('MMM-YYYY')
      setInsideData(prev => ([...prev, {
        Target: parseInt(res2.data.Target),
        TotalSales: res2.data.TotalSales,
        monthName: SecondMonthName
      }]))

      const startOfCurrentMonth = moment()
        .startOf('month')
        .format('DD-MM-YYYY');
      const endOfCurrentMonth = moment()
        .endOf('month')
        .format('DD-MM-YYYY');
      let res3 = await getTargetWiseSales(startOfCurrentMonth, endOfCurrentMonth);
      const CurrentMonthName = moment().format('MMM-YYYY')
      setInsideData(prev => ([...prev,
      {
        Target: parseInt(res3.data.Target),
        TotalSales: res3.data.TotalSales,
        monthName: CurrentMonthName
      }]))
    }
    temp()

    const getTeam=async()=>{
      const data = await getTeamlist();
      setHaveTeam(data.length)
    }

    getTeam()
  }, [])

  useEffect(() => {
    async function tem() {
      var res = await getEmployeeId();
      setEmployeeId(res);
    } tem()
  }, [])

  return (
    <View style={{flex: 1, backgroundColor:themecolor.THEMECOLOR}}>
      <Header username={name} greeting={greeting} height={100} />
      <View style={styles.MV5} />

      <ScrollView style={{ ...styles.body, }} showsVerticalScrollIndicator={false}>

        {/*--------.... Target Vs Achievement ....------------ */}
        {(Roles.includes('emp_has_targets') || Roles.includes('can_do_counter_sales')) ? (
          <TargetVsAchievementReport data={insideData}
            bottomData={bottomData}
          />
         
        ) : (<></>)}

        {/*--------.... Beat wise Sales ....------------ */}
        {Roles.includes('can_do_beats') ? (
          <>
            <View style={{ marginVertical: 5 }} />
            <BeatWiseSalesReport />
          </>
        ) : (<></>)}

        {/*--------.... Attendance Report ....------------ */}
        {(Roles.includes('emp_has_targets') || Roles.includes('can_do_counter_sales')) ? (
          <>
            <View style={{ marginVertical: 5 }} />
            <AttendanceReport EmployeeId={EmployeeId} />
          </>
        ) : (<></>)}

        {/* <TeamAttendance /> */}
        <TeamAttendance />

        {/*--------.... Incentive ....------------ */}
        {(Roles.includes('emp_has_targets') || Roles.includes('can_do_counter_sales')) ? (
          <>
            <View style={{ marginVertical: 5 }} />
            <IncentiveReport />
          </>
        ) : (<></>)}

        {/*--------.... Focus SKU wise Target vs Achievement ....------------ */}
        {/* {(Roles.includes('emp_has_targets') || Roles.includes('can_do_counter_sales')) ? (
          <>
            <View style={{ marginVertical: 5 }} />
            <FocusSKUWiseTargetVsAchievementReport />
          </>
        ) : (<></>)} */}

        {/*--------.... Pending PO ....------------ */}
        {Roles.includes('emp_has_targets') ? (
          <>
            <View style={{ marginVertical: 5 }} />
            <PendingReport />
          </>
        ) : (<></>)}

        {/*--------.... Outlet Verification Report ....------------ */}
        {Roles.includes('can_do_counter_sales') ? (
          <>
            <View style={{ marginVertical: 5 }} />
            <OutletVerificationReport EmployeeId={EmployeeId} />
          </>
        ) : (<></>)}

        {/*--------.... Expense Report ....------------ */}
        {(Roles.includes('emp_has_targets') || Roles.includes('can_do_expenses')) ? (
          <>
            <View style={{ marginVertical: 5 }} />
            <ExpenseReport employeeId={EmployeeId} />
          </>
        ) : (<></>)}

        {/*--------.... Cash in Hand ....------------ */}
        {Roles.includes('can_do_counter_sales') ? (
          <>
            <View style={{ marginVertical: 5 }} />
            <CashInHandReport />
          </>
        ) : (<></>)}

        {/*--------.... Payment Mode Report ....------------ */}
        {Roles.includes('can_do_counter_sales') ? (
          <>
            <View style={{ marginVertical: 5 }} />
            <PaymentModeReport />
          </>
        ) : (<></>)}

        
        {/*--------.... Top Selling retailers ....------------ */}
        {Roles.includes('emp_has_targets') ? (
          <>
            <View style={{ marginVertical: 5 }} />
            <TopSellingReports/>
          </>
        ) : (<></>)}

        {/*--------.... Team Sales Manager ....------------ */}
        <View style={{ marginVertical: 5 }} />
        {haveTeam == 0 ?<></>:
        <TeamSales EmployeeId={EmployeeId} />
        }
      </ScrollView>
      <View style={{ marginVertical: 5 }} />
    </View>
  );
};

export default ReportList; 
