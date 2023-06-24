import * as React from 'react';
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { navigationRef } from '../NavigationDrw/NavigationService';
import { isDarkMode } from '../../components/Theme/ThemeDarkLightColor';
import {
  TransitionSpecs,
  HeaderStyleInterpolators,
} from '@react-navigation/stack';
import Splash from '../../screens/intro/Splash';
import ViewPager from '../../screens/intro/ViewPager';
import LoginByMobileNumber from '../../screens/auth/LoginByMobileNumber';
import EnterOTP from '../../screens/auth/EnterOTP';
import Action from '../../screens/action/Action';
import DrawerNavigation from '../drawer/DrawerNavigation';
import Trip from '../../screens/trip/Trip';
import MyTrip from '../../screens/trip/MyTrip';
import ExTowntrip from '../../screens/trip/ExTowntrip';
import CaseList from '../../screens/CaseOrGrievance/CaseList';
import CreateCase from '../../screens/CaseOrGrievance/CreateCase';
import ProfileNew from '../../screens/profile/ProfileNew';
import CreateEvent from '../../screens/event/CreateEvent';
import Events from '../../screens/event/Event';
import Expenses from '../../screens/expenses/Expenses';
import AddExpenses from '../../screens/expenses/AddExpenses';
import FoodExpenses from '../../screens/expenses/FoodExpenses';
import CreateTour from '../../screens/createtourvikram/CreateTour';
import AirportRoute from '../../screens/beat/Airportroute';
import RetailerCustomer from '../../screens/outlet/RetailerCustomer';
import AddOutlet from '../../screens/outlet/AddOutlet';
import OutletDetails from '../../screens/outlet/OutletDetails';
import OutletView from '../../screens/SharedScreens/OutletView';
import BeatOutletProductCategories from '../../screens/SharedScreens/BeatOutletProductCategories';
import BeatOutletProducts from '../../screens/SharedScreens/BeatOutletProducts';
import ConfirmOrder from '../../screens/order/ConfirmOrder';
import ConfirmOrder1 from '../../screens/order/ConfirmOrder1';
import ConfirmOrderSuccess from '../../screens/order/ConfirmOrderSuccess';
import SearchAllResult from '../../screens/Searching/SearchAllResult';
import Search from '../../screens/Searching/Search';
import Notifications from '../../screens/notifications/Notifications';
import VisitHistory from '../../screens/beat/VisitHistory';
import DistributerStore from '../../screens/beat/DistributerStore';
import Orderdetails from '../../screens/order/Orderdetails';
import OrderList from '../../screens/order/OrderList';
import ExpenseCard from '../../screens/Expense/ExpenseCard';
import CreateTrip from '../../screens/trip/CreateTrip';
import CaseDescription from '../../screens/CaseOrGrievance/CaseDescription';
import Groom from '../../components/Modals/Groom';
import OfferPromotion from '../../screens/OfferPromotion/OffersPromotions';
import SyncDataScreen from '../../screens/SharedScreens/SyncDataScreen';
import OutstationTrip from '../../screens/trip/OutstationTrip';
import OutstationTripDetails from '../../screens/trip/OutstationTripDetails ';
import Material from '../../screens/material/Material';
import CompetitionMapping from '../../screens/competitionmapping/CompetitionMapping';
import SuggestiveOrder from '../../screens/suggestiveOrder/SuggestiveOrder';
import UpdateTrip from '../../screens/trip/UpdateTrip';
import ExpenseList from '../../screens/Expense/ExpenseList';
import AddExpense from '../../screens/Expense/AddExpense';
import Sale from '../../screens/sales/Sale';
import Cart from '../../screens/sales/Cart';
import StockIn from '../../screens/stockin/StockIn';
import OpeningCloseStock from '../../screens/stockin/OpeningCloseStock';
import StockInProductCategory from '../../screens/stockin/StockInProductCategory';
import StockInGRN from '../../screens/stockin/StockInGRN';
import RoasterPlan from '../../screens/rosterplan/RoasterPlan';
import BAsProfile from '../../screens/BAs/BAsProfile';
import ExpenseLineitem from '../../screens/Expense/ExpenseLineitem';
import BAs from '../../screens/BAs/BAs';
import Loading from '../../screens/SharedScreens/Loading';
import Calls from '../../screens/ReportScreens/Calls';
import Outlets from '../../screens/outlet/Outlet';
import RequestMerch from '../../screens/requestMerchandise/RequestMerch';
import RequestMerchandise from '../../screens/requestMerchandise/RequestMerchandise';
import PrimaryOrders from '../../screens/order/PrimaryOrder';
import ProductMiddleScreen from '../../screens/SharedScreens/ProductMiddleScreen';
import { useSelector } from 'react-redux';
import ManagerEvent from '../../screens/event/ManagerEvent';
import EventDetails from '../../screens/event/EventDetails';
import ExpenseMDashboard from '../../screens/Expense/ExpenseMDashboard';
import ExpenseMProfile from '../../screens/Expense/ExpenseMProfile';
import ExpensesByStatus from '../../screens/Expense/ExpensesByStatus';
import TripByStatus from '../../screens/trip/TripByStatus';
import OutletListCategoryReport from '../../components/ReportsComponent/OutletListCategoryReport';
import VisitHistoryMoreDetails from "../../components/shared/VisitHistoryMoreDetails";
import QRScannerNew from '../../screens/auth/QRScannerNew';
import InternalServerError from '../../screens/errorPage/InternalServerError';
import RequestDashboardExp from '../../screens/Expense/RequestDashboardExp';
import EmpExpensesReqList from '../../screens/Expense/EmpExpensesReqList';
import ShimmerComponent from '../../components/ShimmerEffects/ShimmerComponent';
import TourHome from '../../screens/createtourvikram/TourHome';
import JointWorking from '../../screens/JointWorking';
import ScanQrFromGallery from '../../screens/auth/ScanQrFromGallery';
import LoadingFullScreen from '../../screens/SharedScreens/LoadingFullScreen';
import TourApproval from '../../screens/createtourvikram/TourApproval';
import RoasterHome from '../../screens/createtourvikram/RoasterHome';
import ScheduleCall from '../../components/ReportsComponent/ScheduleCall';
import MonthCalls from '../../components/ReportsComponent/MonthCalls';
import TeamTour from '../../screens/createtourvikram/TeamTour';
import CreateTeamTour from '../../screens/createtourvikram/CreateTeamTour';
import NewOrderList from '../../screens/SharedScreens/NewOrderList';
import EmpListForBeats from '../../screens/beat/EmpListForBeats';
import ShareOrderScreen from '../../screens/order/ShareOrderScreen';
import RecentOrderDetails from '../../screens/SharedScreens/RecentOrderDetails';

import Check from '../../screens/Checklist/Check'
import Checkfrint from '../../screens/Checklist/Checkfrint';
import SurveyCatelogue from '../../screens/Survey/SurveyCatelogue';
import ViewSurvey from '../../screens/Survey/ViewSurvey';
import ViewSurveySecond from '../../screens/Survey/ViewSurveySecond';
import ViewSurveyThree from '../../screens/Survey/ViewSurveyThree';
import Checklist from '../../screens/Survey/Checklist';
import BeatOutletProductDetail from '../../screens/SharedScreens/BeatOutletProductDetail';
const MyTransition = {
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  headerStyleInterpolator: HeaderStyleInterpolators.forFade,
};

var state = {
  categes: [{ cat_id: '1', cat_name: 'abc', backgroundcolor: '#fff' }],
  change: false,
};

function MainNavigationStack(props) {
  const network = useSelector(state => state.network);
  const Stack = createStackNavigator();

  return (
    <NavigationContainer
      theme={isDarkMode ? DarkTheme : DefaultTheme}
      ref={navigationRef}>
      <Stack.Navigator headerShown={false}>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ViewPager"
          component={ViewPager}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BLoginByMobileNumber"
          component={LoginByMobileNumber}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BEnterOTP"
          component={EnterOTP}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="NewDashboard"
          component={DrawerNavigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Action"
          component={Action}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddOutlet"
          component={AddOutlet}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Trip"
          component={Trip}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreateTrip"
          component={CreateTrip}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ExTowntrip"
          component={ExTowntrip}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Caselist"
          component={CaseList}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreateCase"
          component={CreateCase}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="ProfileNew"
          component={ProfileNew}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreateEvent"
          component={CreateEvent}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Events"
          component={Events}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Expenses"
          component={Expenses}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddExpenses"
          component={AddExpenses}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FoodExpenses"
          component={FoodExpenses}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreateTour"
          component={CreateTour}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AirportRoute"
          component={AirportRoute}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RetailerCustomer"
          component={RetailerCustomer}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OutletDetails"
          component={OutletDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BAs"
          component={BAs}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="BAsProfile"
          component={BAsProfile}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="DistributerStore"
          component={DistributerStore}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Orderdetails"
          component={Orderdetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SearchAllResult"
          component={SearchAllResult}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ExpenseCard"
          component={ExpenseCard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MyTrip"
          component={MyTrip}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Notifications"
          component={Notifications}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CaseDescription"
          component={CaseDescription}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BeatOutletProductCategories"
          component={BeatOutletProductCategories}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BeatOutletProducts"
          component={BeatOutletProducts}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BeatOutletProductDetail"
          component={BeatOutletProductDetail}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ConfirmOrder"
          component={ConfirmOrder}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ConfirmOrder1"
          component={ConfirmOrder1}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ConfirmOrderSuccess"
          component={ConfirmOrderSuccess}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VisitHistory"
          component={VisitHistory}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OrderList"
          component={OrderList}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OutletView"
          component={OutletView}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Groom"
          component={Groom}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OfferPromotion"
          component={OfferPromotion}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SyncDataScreen"
          component={SyncDataScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="OutstationTrip"
          component={OutstationTrip}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OutstationTripDetails"
          component={OutstationTripDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Material"
          component={Material}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CompetitionMapping"
          component={CompetitionMapping}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SuggestiveOrder"
          component={SuggestiveOrder}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UpdateTrip"
          component={UpdateTrip}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddExpense"
          component={AddExpense}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Sale"
          component={Sale}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ExpenseList"
          component={ExpenseList}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="StockIn"
          component={StockIn}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OpeningCloseStock"
          component={OpeningCloseStock}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="StockInProductCategory"
          component={StockInProductCategory}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="StockInGRN"
          component={StockInGRN}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RoasterPlan"
          component={RoasterPlan}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ExpenseLineitem"
          component={ExpenseLineitem}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Loading"
          component={Loading}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Calls"
          component={Calls}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Outlets"
          component={Outlets}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RequestMerch"
          component={RequestMerch}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RequestMerchandise"
          component={RequestMerchandise}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PrimaryOrders"
          component={PrimaryOrders}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProductMiddleScreen"
          component={ProductMiddleScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ManagerEvent"
          component={ManagerEvent}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EventDetails"
          component={EventDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ExpenseMDashboard"
          component={ExpenseMDashboard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ExpenseMProfile"
          component={ExpenseMProfile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ExpensesByStatus"
          component={ExpensesByStatus}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TripByStatus"
          component={TripByStatus}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OutletListCategoryReport"
          component={OutletListCategoryReport}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VisitHistoryMoreDetails"
          component={VisitHistoryMoreDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="QRScannerNew"
          component={QRScannerNew}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="InternalServerError"
          component={InternalServerError}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RequestDashboardExp"
          component={RequestDashboardExp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EmpExpensesReqList"
          component={EmpExpensesReqList}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ShimmerComponent"
          component={ShimmerComponent}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TourHome"
          component={TourHome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RoasterHome"
          component={RoasterHome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="JointWorking"
          component={JointWorking}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ScanQrFromGallery"
          component={ScanQrFromGallery}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoadingFullScreen"
          component={LoadingFullScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TourApproval"
          component={TourApproval}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ScheduleCall"
          component={ScheduleCall}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MonthCalls"
          component={MonthCalls}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TeamTour"
          component={TeamTour}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreateTeamTour"
          component={CreateTeamTour}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NewOrderList"
          component={NewOrderList}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EmpListForBeats"
          component={EmpListForBeats}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ShareOrderScreen"
          component={ShareOrderScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RecentOrderDetails"
          component={RecentOrderDetails}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="Check"
          component={Check}
          options={{headerShown: false}}
        />

<Stack.Screen
          name="SurveyCatelogue"
          component={SurveyCatelogue}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ViewSurvey"
          component={ViewSurvey}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Checklist"
          component={Checklist}
          options={{headerShown: false}}
        />
         <Stack.Screen
          name="ViewSurveySecond"
          component={ViewSurveySecond}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ViewSurveyThree"
          component={ViewSurveyThree}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigationStack;
