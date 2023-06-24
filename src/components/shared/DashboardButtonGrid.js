import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import React from 'react';
import { View, StyleSheet, Dimensions, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { store } from '../../../App';
import { Colors } from '../../assets/config/Colors';
const { width } = Dimensions.get('window');
import {
  DashboardButton,
  DashboardButtonShimmer,
} from '../../components/shared/DashboardButton';
import { gettripLocationApi } from '../../repository/trip/tripRepository';

//Default Function
export default function DashboardButtonGrid(props) {
  const network = useSelector(state => state.network);
  const dashButton = useSelector(state => state.dashButton);
  const actionButton = useSelector(state => state.actionButton);
  const roles = useSelector(state => state.userRoles);
  const [buttonData, setButtonData] = React.useState([]);
  const [checkinOutstatus, setCheckinOutStatus] = React.useState();
  const [dashCoponent, setDashComponent] = React.useState(true);

  const getBAs = async () => {
    if (network) {
      try {
        const team = await gettripLocationApi('api/getMyTeam?filter=0');
        console.log('teams=========', team);
        if (team.data.team.length > 0) {
          return true;
        } else {
          return false;
        }
      } catch (e) {
        return false;
      }
    }
  };

  React.useEffect(() => {
    var mounted = true;
    if (mounted) {
      async function temp() {
        if (props.showOn == 'Dashboard') {
          var DashboardMenuNoParse = await AsyncStorage.getItem('@DashboardMenus');
          var DashboardMenu =JSON.parse(DashboardMenuNoParse);
          if (DashboardMenu != null && DashboardMenu != undefined) {
            store.dispatch({type:'ADD_DASH_BUTTON',payload:DashboardMenu})
          }
        } else {
          var ActiondMenuNoParse = await AsyncStorage.getItem('@actionMenus');
          var ActiondMenu = JSON.parse(ActiondMenuNoParse);
          if (ActiondMenu != null && ActiondMenu != undefined) {
            store.dispatch({type:'ADD_ACTION_BUTTON',payload:ActiondMenu})
          }
        }
      }
      temp()
    }
    return () => {
      mounted = false;
    }
  }, [])


  React.useEffect(() => {
    try {
      var mounted = true;
      if (mounted) {
        async function temp() {
          var isBAshow = false;
          var statusEvent = false;
          var statusExpense = false;
          isBAshow = await getBAs();
          // statusEvent = await getAllEventsforApproval();
          // statusExpense = await getExpenseApproval();
          // alert(JSON.stringify(statusEvent))
          //Checked if props.showOn == 'Dashboard'
       
          if (props.showOn == 'Dashboard' && dashButton.length > 0) {
            setButtonData(dashButton);
          }
          
          else if (props.showOn == 'action' && actionButton.length > 0) {
            setButtonData(actionButton);
          }
        
          /***
           * 
           *       Warning ! Do Not Remove THis Code /*** Abhinav
           */
          // if (network) {
          //   statusEvent = await getAllEventsforApproval();
          //   statusExpense = await getExpenseApproval();
          // isBAshow = await getBAs();
          // }
          /**
           *   Do Not Remove THis Code /*** Abhinav
           * 
           */
          else {
            var arr = [];
            if (roles.includes('can_verify_outlet') && props.showOn == 'Dashboard') {
              arr.push({
                bgcolor: Colors.Verify,
                iconimg: require('../../assets/images/dashboard/ba/VerifyOutlet.png'),
                title: 'Verify Outlet',
                navigateTo: '',
                navigateFrom: '',
                canAccessWithoutInternet: false,
                badge: { status: false, count: '' },
              });
            }
            if (roles.includes('can_do_material') && props.showOn == 'Dashboard') {
              arr.push({
                bgcolor: Colors.Material,
                iconimg: require('../../assets/images/dashboard/ba/matieral.png'),
                title: 'Material',
                navigateTo: 'Material',
                navigateFrom: 'Dashboard',
                canAccessWithoutInternet: false,
                badge: { status: false, count: '' },
              });
            }
            if (roles.includes('can_competition_mapping')) {
              arr.push({
                bgcolor: Colors.Comp,
                iconimg: require('../../assets/images/dashboard/ba/Competition.png'),
                title: 'Competition mapping',
                navigateTo: 'CompetitionMapping',
                navigateFrom: 'Dashboard',
                canAccessWithoutInternet: false,
                badge: { status: false, count: '' },
              });
            }
            if (roles.includes('can_do_stock_in') && props.showOn == 'Dashboard') {
              arr.push({
                bgcolor: Colors.StockIn,
                iconimg: require('../../assets/images/dashboard/ba/stockin.png'),
                title: 'Stock In',
                navigateTo: 'StockIn',
                navigateFrom: 'Dashboard',
                canAccessWithoutInternet: false,
                badge: { status: false, count: '' },
              });
            }
            if (roles.includes('can_do_sales') && props.showOn == 'Dashboard') {
              arr.push({
                bgcolor: Colors.Sales,
                iconimg: require('../../assets/images/dashboard/ba/sales.png'),
                title: 'Sales',
                navigateTo: 'Sale',
                navigateFrom: 'Dashboard',
                canAccessWithoutInternet: false,
                badge: { status: false, count: '' },
              });
            }
            if (roles.includes('can_book_cases') && props.showOn == 'Dashboard') {
              arr.push({
                bgcolor: Colors.case,
                iconimg: require('../../assets/images/dashboard/ba/case.png'),
                title: 'Case/Grievance',
                navigateTo: 'Caselist',
                navigateFrom: 'dashboard',
                canAccessWithoutInternet: false,
                badge: { status: false, count: '' },
              });
            }
            if (roles.includes('can_suggestive_order') && props.showOn == 'Dashboard') {
              arr.push({
                bgcolor: Colors.suggestive,
                iconimg: require('../../assets/images/dashboard/ba/Suggestive.png'),
                title: 'Suggestive Order',
                navigateTo: 'SuggestiveOrder',
                navigateFrom: 'dashboard',
                canAccessWithoutInternet: false,
                badge: { status: false, count: '' },
              });
            }
            if (roles.includes('can_view_offers')) {
              arr.push({
                bgcolor: Colors.offernew,
                iconimg: require('../../assets/images/dashboard/ba/offers.png'),
                title: 'Offers & Promotion',
                navigateTo: 'OfferPromotion',
                navigateFrom: 'dashboard',
                canAccessWithoutInternet: false,
                badge: { status: false, count: '' },
              });
            }
            if (roles.includes('can_add_events')) {
              arr.push({
                bgcolor: Colors.event,
                iconimg: require('../../assets/images/dashboard/ba/event.png'),
                title: 'Events',
                navigateTo: 'Events',
                navigateFrom: 'action',
                canAccessWithoutInternet: false,
                badge: statusEvent,
              });
            }
            if (roles.includes('can_do_expenses')) {
              // alert(JSON.stringify(getExpenseApproval()))
              arr.push({
                bgcolor: Colors.ExpenseSEGT,
                iconimg: require('../../assets/images/dashboard/expensewhite.png'),
                title: 'Expense',
                navigateTo: 'ExpenseCard',
                navigateFrom: 'Dashboard',
                canAccessWithoutInternet: false,
                badge: statusExpense,
              });
            }
            if (roles.includes('can_add_outlet') && props.showOn == 'Dashboard') {
              arr.push({
                bgcolor: Colors.AddOutletSEGT,
                iconimg: require('../../assets/images/dashboard/addoutlet.png'),
                title: 'Add Outlets',
                navigateTo: 'AddOutlet',
                navigateFrom: 'Dashboard',
                canAccessWithoutInternet: false,
                badge: { status: false, count: '' },
              });
            }
            if (roles.includes('can_download_catalogue')) {
              arr.push({
                bgcolor: Colors.ProductCatelogueSEMT,
                iconimg: require('../../assets/images/Action/productcatalogue.png'),
                title: 'Product Catalogue',
                navigateTo: 'ProductCatelogue',
                navigateFrom: '',
                canAccessWithoutInternet: true,
                badge: { status: false, count: '' },
              });
            }
            if (roles.includes('can_view_outlet') && props.showOn == 'Dashboard') {
              arr.push({
                bgcolor: Colors.OutletsSEMT,
                iconimg: require('../../assets/images/dashboard/addoutlet.png'),
                title: 'Outlets',
                navigateTo: 'Outlets',
                navigateFrom: 'Dashboard',
                canAccessWithoutInternet: true,
                badge: { status: false, count: '' },
              });
            }
            if (isBAshow) {
              arr.push({
                bgcolor: Colors.BASEMT,
                iconimg: require('../../assets/images/Action/user.png'),
                title: 'My Team',
                navigateTo: 'BAs',
                navigateFrom: 'dashboard',
                canAccessWithoutInternet: false,
                badge: { status: false, count: '' },
              });
            }
            // if (isBAshow) {
            //   arr.push({
            //     bgcolor: Colors.BASEMT,
            //     iconimg: require('../../assets/images/Action/user.png'),
            //     title:  'Team Tour',
            //     navigateTo: 'TeamTour',
            //     navigateFrom: 'dashboard',
            //     canAccessWithoutInternet: false,
            //     badge: { status: false, count: '' },
            //   });
            // }
            if (roles.includes('can_do_roster_plan') && props.showOn == 'action') {
              arr.push({
                bgcolor: Colors.RosterPlan,
                iconimg: require('../../assets/images/rosterplan.png'),
                title: 'Roster Plan',
                navigateTo: !isBAshow ? 'RoasterPlan' : 'RoasterHome',
                navigateFrom: 'action',
                canAccessWithoutInternet: false,
                badge: { status: false, count: '' },
              });
            }
            if (roles.includes('can_do_roster_plan') && props.showOn == 'action') {
              arr.push({
                bgcolor: Colors.EditRosterPlan,
                iconimg: require('../../assets/images/EditRosterPlan.png'),
                title: 'Edit roster plan',
                navigateTo: 'RoasterPlan',
                navigateFrom: 'action',
                canAccessWithoutInternet: false,
                badge: { status: false, count: '' },
              });
            }
            if (roles.includes('can_do_tour_plan') && props.showOn == 'action') {
              arr.push({
                bgcolor: Colors.RosterPlan,
                iconimg: require('../../assets/images/Action/tourplan.png'),
                title: 'Create Tour Plan',
                navigateTo: !isBAshow ? 'CreateTour' : 'TourHome',
                navigateFrom: 'action',
                canAccessWithoutInternet: false,
                badge: { status: false, count: '' },
              });
            }
            if (roles.includes('can_do_tour_plan') && props.showOn == 'action') {
              arr.push({
                bgcolor: Colors.Material,
                iconimg: require('../../assets/images/Action/tourplan.png'),
                title: 'Edit Tour Plan',
                navigateTo: 'CreateTour',
                navigateFrom: 'action',
                canAccessWithoutInternet: false,
                badge: { status: false, count: '' },
              });
            }
            if (roles.includes('can_do_change_agenda') && props.showOn == 'action') {
              arr.push({
                bgcolor: Colors.offerpromotion,
                iconimg: require('../../assets/images/Action/trip.png'),
                title: 'Change Agenda',
                navigateTo: '',
                navigateFrom: '',
                badge: { status: false, count: '' },
              });
            }

            if (roles.includes('can_do_leave') && props.showOn == 'action') {
              arr.push({
                bgcolor: Colors.Leave,
                iconimg: require('../../assets/images/Action/events.png'),
                title: 'Leave',
                navigateTo: '',
                navigateFrom: '',
                canAccessWithoutInternet: false,
                badge: { status: false, count: '' },
              });
            }
            if (roles.includes('can_edit_tour_plan') && props.showOn == 'action') {
              arr.push({
                bgcolor: Colors.Leave,
                iconimg: require('../../assets/images/Action/events.png'),
                title: 'Leave',
                navigateTo: '',
                navigateFrom: '',
                canAccessWithoutInternet: false,
                badge: { status: false, count: '' },
              });
            }
            if (roles.includes('can_do_primary_order') && props.showOn == 'action') {
              arr.push({
                bgcolor: Colors.RM,
                iconimg: require('../../assets/images/cart.png'),
                title: 'Primary Order',
                navigateTo: 'PrimaryOrders',
                navigateFrom: '',
                canAccessWithoutInternet: false,
                badge: { status: false, count: '' },
              });
            }
       
            // arr.push({
            //   bgcolor: '#ffa731',
            //   iconimg: require('../../assets/images/survey/suvrey.png'),
            //   title: 'Survey',
            //   navigateTo: 'SurveyCatelogue',
            //   navigateFrom: '',
            //   canAccessWithoutInternet: false,
            //   badge: { status: false, count: '' },
            // });
            //End finally add arr Data in DashboardMenus AsyncStorage and ActionMenuAsyncStorage

            setButtonData(arr);
            if (props.showOn == 'Dashboard') {
              await AsyncStorage.setItem('@DashboardMenus', JSON.stringify(arr));
            } else {
              await AsyncStorage.setItem('@actionMenus', JSON.stringify(arr));
            }
          }
          setDashComponent(false);
        }
        temp()

      }
    } catch (e) {
      console.log("Error in Catch Dashboard Button Grid", e)
    }
    return () => {
      mounted = false;
    }
  }, []);

  return (
    <View style={{...styles.GridCards,justifyContent: 'flex-start' }}>
      {dashCoponent ? (
        // <FlatList
        //   data={['1', '1', '1', '1', '1', '1']}
        //   numColumns={3}
        //   renderItem={({ item, index }) => (
        //     <DashboardButtonShimmer
        //     />
        //   )}
        //   keyExtractor={(item, index) => index}
        //   columnWrapperStyle={{ flex: 1, justifyContent: 'flex-start' }}
        // />
        ['1', '1', '1', '1', '1', '1'].map((item, indx) => <DashboardButtonShimmer key={indx} />)
      ) : (
        // <FlatList
        //   data={buttonData}
        //   numColumns={3}
        //   renderItem={({ item, index }) => <DashboardButton
        //     setCheckinOutStatus={setCheckinOutStatus}
        //     {...item}
        //   />
        //   }
        //   keyExtractor={(item, index) => index}
        //   columnWrapperStyle={{ flex: 1, justifyContent: 'flex-start' }}
        // />
        buttonData?.map((item,indx)=> <DashboardButton key={indx}
            setCheckinOutStatus={setCheckinOutStatus}
            {...item}
           />)
      )}
    </View>
  );
}



const styles = StyleSheet.create({
  GridCards: {
    width: width * 0.92,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    // marginVertical: 8,
  },
});
