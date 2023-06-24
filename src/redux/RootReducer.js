import { createReducer } from '@reduxjs/toolkit'

const initialState = {
  network: true,
  userRoles: [],
  outletBeats: {},
  moreExpense: {},
  FrequentlyOrdered: {},
  FrequentlyOrderedNumericInput: {},
  orderListFilter: {},
  orderListFilterTemporary: {},
  beatDump: {},
  ticketImages: {},
  expenseImages: {},
  OutletCart: {},
  primaryDistributor: {},
  AirportRouteFilterRadio: {},
  AirportRouteFilterRadioTemporary: {},
  AirportRouteFilterBox: {},
  AirportRouteFilterBoxTemporary: {},
  BAPunchInSelfie: '',
  BAOutletVerifySelfie: '',
  BAOutletVerifyGroom: '',
  BACompetitionMappingImage: '',
  BACompetitionProducts: {},
  BASuggestiveOrderFilter: {},
  BASuggestiveOrderFilterTemporary: {},
  BASuggestiveOrderFilterBox: {},
  BASuggestiveOrderFilterBoxTemporary: {},
  BASaleCart: {},
  SaleFilter: {},
  SaleFilterTemporary: {},
  BAsFilter: {},
  BAsFilterTemporary: {},
  ProductFilter: {},
  ProductFilterTemporary: {},
  ProductFilterBox: {},
  ProductFilterBoxTemporary: {},
  CheckoutImage: {},
  currentLatLng:
  {
    latitude: '',
    longitude: ''
  },
  tourPlans: {},
  tripstat: {},
  googleAPI: '',
  customerDetailsOutletId: {},
  navigateFromOnOutletView: '',
  RoasterPlans: {},
  isDataSyncPening:
  {
    Checkout_Lat: '',
    OutletName: '',
    SyncFlag: ''
  },
  isOrderSync: false,
  isOutletVerify: '',
  isBAshow: [],
  mode: 'light',
  teamEmpIdForJointWrkng: '',
  checkCalling: 0,
  salesOutletWise: {},
  salesOutletArray: [],
  pendingTpIds: {},
  empId: '',
  TourRosterPlans: {},
  orderLineItem:[],
  dashButton:[],
  actionButton:[],
  productCarouselImage: {}
};

const RootReducer = createReducer(initialState, (builder) => {
  builder.addCase('SET_NETWORK', (state, action) => {
    state.network = action.payload;
  })
  builder.addCase('THEME_CHANGE', (state, action) => {
    console.log('THEME_CHANGE in redux...', action);
    state.mode = action.payload;
  })
  builder.addCase('CHECK_CALLING', (state, action) => {
    state.checkCalling += action.payload;
  })
  builder.addCase('SET_USER_ROLES', (state, action) => {
    state.userRoles = action.payload;
  })
  builder.addCase('SET_GOOGLEAPI', (state, action) => {
    state.googleAPI = action.payload;
  })
  builder.addCase('REMOVE_GOOGLEAPI', (state, action) => {
    state.googleAPI = '';
  })
  builder.addCase('REMOVE_USER_ROLES', (state, action) => {
    state.userRoles = [];
  })
  builder.addCase('ADD_OUTLET_BEATS', (state, action) => {
    state, state.outletBeats[action.payload[0]] = action.payload[1];
  })
  builder.addCase('ADD_OUTLET_BEATS_BY_ID', (state, action) => {
    state, delete state.outletBeats[action.payload]
  })
  builder.addCase('REMOVE_OUTLET_BEATS', (state, action) => {
    state.outletBeats = new Object();
  })
  builder.addCase('ADD_MORE_EXPENSE', (state, action) => {
    state, state.moreExpense[action.payload[0]] = action.payload[1];
  })
  builder.addCase('ADD_MORE_EXPENSE_BY_ID', (state, action) => {
    state, delete state.moreExpense[action.payload]
  })
  builder.addCase('REMOVE_MORE_EXPENSE', (state, action) => {
    state.moreExpense = new Object();
  })
  builder.addCase('ADD_TICKET_IMAGES', (state, action) => {
    state.ticketImages[action.payload[0]] = action.payload[1];
  })
  builder.addCase('REMOVE_TICKET_IMAGES', (state, action) => {
    delete state.ticketImages[action.payload];
  })
  builder.addCase('REMOVE_ALL_TICKET_IMAGES', (state, action) => {
    state.ticketImages = new Object();
  })
  builder.addCase('ADD_EXPENSE_IMAGES', (state, action) => {
    state.expenseImages[action.payload[0]] = action.payload[1];
  })
  builder.addCase('REMOVE_EXPENSE_IMAGES', (state, action) => {
    delete state.expenseImages[action.payload];
  })
  builder.addCase('REMOVE_ALL_EXPENSE_IMAGES', (state, action) => {
    state.expenseImages = new Object();
  })
  builder.addCase('ADD_BEAT_DUMP', (state, action) => {
    state.beatDump = action.payload;
  })
  builder.addCase('ADD_OUTLET_CART', (state, action) => {
    state.OutletCart[action.payload[0]] = action.payload[1];
  })
  builder.addCase('REMOVE_OUTLET_CART', (state, action) => {
    delete state.OutletCart[action.payload];
  })
  builder.addCase('REMOVE_ALL_OUTLET_CART', (state, action) => {
    state.OutletCart = new Object();
  })

  builder.addCase('ADD_FREQUENTLY_ORDERED_CHECKBOX_ITEM', (state, action) => {
    state, state.FrequentlyOrdered[action.payload[0]] = action.payload[1];
  })
  builder.addCase('ADD_FREQUENTLY_ORDERED_CHECKBOX_MULTIPLE_ITEM', (state, action) => {
    state, delete state.FrequentlyOrdered[action.payload]
  })
  builder.addCase('REMOVE_FREQUENTLY_ORDERED_CHECKBOX_ITEM', (state, action) => {
    state.FrequentlyOrdered = new Object();
  })
  builder.addCase('ADD_FREQUENTLY_ORDERED_NUMERIC_INPUT', (state, action) => {
    state.FrequentlyOrderedNumericInput[action.payload[0]] = action.payload[1];
  })
  builder.addCase('REMOVE_FREQUENTLY_ORDERED_NUMERIC_INPUT_BY_ID', (state, action) => {
    delete state.FrequentlyOrderedNumericInput[action.payload];
  })
  builder.addCase('REMOVE_FREQUENTLY_ORDERED_NUMERIC_INPUT', (state, action) => {
    state.FrequentlyOrderedNumericInput = new Object();
  })

  builder.addCase('ADD_ORDER_LIST_FILTER', (state, action) => {
    state.orderListFilter = {};
    state.orderListFilter[action.payload[0]] = action.payload[1];
  })
  builder.addCase('ADD_ORDER_LIST_FILTER_TEMPORARY', (state, action) => {
    state.orderListFilterTemporary = {};
    state.orderListFilterTemporary[action.payload[0]] = action.payload[1];
  })
  builder.addCase('REMOVE_ORDER_LIST_FILTER_TEMPORARY', (state, action) => {
    state.orderListFilterTemporary = new Object();
  })
  builder.addCase('ADD_ORDER_LIST_FILTER_MULTIPLE_ITEM', (state, action) => {
    delete state.orderListFilter[action.payload]
  })
  builder.addCase('REMOVE_ORDER_LIST_FILTER', (state, action) => {
    state.orderListFilter = new Object();
  })

  builder.addCase('ADD_PRODUCT_CAROUSEL_IMAGE', (state, action) => {
    state.productCarouselImage[action.payload[0]] = action.payload[1];
  })
  builder.addCase('REMOVE_PRODUCT_CAROUSEL_IMAGE', (state, action) => {
    state.productCarouselImage = new Object();
  })



  /*************************** BA Outlet Verify  **************************/

  builder.addCase('ADD_BA_PUNCH_IN_SELFIE', (state, action) => {
    state.BAPunchInSelfie = action.payload;
  })
  builder.addCase('ADD_PRIMARY_DISTRIBUTOR', (state, action) => {
    state.primaryDistributor = action.payload;
  })
  builder.addCase('REMOVE_PRIMARY_DISTRIBUTOR', (state, action) => {
    state.primaryDistributor = new Object();
  })
  builder.addCase('ADD_CUSTOMER_DETAILS_OUTLETID', (state, action) => {
    state.customerDetailsOutletId = action.payload;
  })


  builder.addCase('REMOVE_BA_PUNCH_IN_SELFIE', (state, action) => {
    state.BAPunchInSelfie = '';
  })
  builder.addCase('ADD_BA_OUTLET_VERIFY_SELFIE', (state, action) => {
    state.BAOutletVerifySelfie = action.payload;
  })
  builder.addCase('REMOVE_BA_OUTLET_VERIFY_SELFIE', (state, action) => {
    state.BAOutletVerifySelfie = '';
  })
  builder.addCase('ADD_BA_OUTLET_VERIFY_GROOM', (state, action) => {
    state.BAOutletVerifyGroom = action.payload;
  })
  builder.addCase('REMOVE_BA_OUTLET_VERIFY_GROOM', (state, action) => {
    state.BAOutletVerifyGroom = '';
  })

  builder.addCase('ADD_ISVERIFY_OUTLET_STATUS', (state, action) => {
    state.isOutletVerify = action.payload;
  })
  builder.addCase('REMOVE_ISVERIFY_OUTLET_STATUS', (state, action) => {
    state.isOutletVerify = action.payload;
  })



  /*************************** BA Competition Mapping  **************************/

  builder.addCase('ADD_BA_COMETITION_MAPPING_IMAGE', (state, action) => {
    state.BACompetitionMappingImage = action.payload;
  })
  builder.addCase('REMOVE_BA_COMETITION_MAPPING_IMAGE', (state, action) => {
    state.BACompetitionMappingImage = '';
  })

  builder.addCase('ADD_BA_COMPETITION_PRODUCTS', (state, action) => {
    state.BACompetitionProducts[action.payload[0]] = action.payload[1];
  })
  builder.addCase('REMOVE_BA_COMPETITION_PRODUCTS', (state, action) => {
    delete state.BACompetitionProducts[action.payload];
  })
  builder.addCase('REMOVE_ALL_BA_COMPETITION_PRODUCTS', (state, action) => {
    state.BACompetitionProducts = new Object();
  })

  /*********************** BA Suggestive Order ****************************/

  builder.addCase('ADD_SUGGESTIVE_ORDER_FILTER', (state, action) => {
    state.BASuggestiveOrderFilter = {};
    state.BASuggestiveOrderFilter[action.payload[0]] = action.payload[1];
  })
  builder.addCase('REMOVE_SUGGESTIVE_ORDER_FILTER', (state, action) => {
    state.BASuggestiveOrderFilter = new Object();
  })

  builder.addCase('ADD_SUGGESTIVE_ORDER_FILTER_TEMPORARY', (state, action) => {
    state.BASuggestiveOrderFilterTemporary = {};
    state.BASuggestiveOrderFilterTemporary[action.payload[0]] = action.payload[1];
  })
  builder.addCase('REMOVE_SUGGESTIVE_ORDER_FILTER_TEMPORARY', (state, action) => {
    state.BASuggestiveOrderFilterTemporary = new Object();
  })


  builder.addCase('ADD_SUGGESTIVE_ORDER_FILTER_BOX', (state, action) => {
    state.BASuggestiveOrderFilterBox = {};
    state.BASuggestiveOrderFilterBox[action.payload[0]] = action.payload[1];
  })
  builder.addCase('REMOVE_SUGGESTIVE_ORDER_FILTER_BOX', (state, action) => {
    state.BASuggestiveOrderFilterBox = new Object();
  })

  builder.addCase('ADD_SUGGESTIVE_ORDER_FILTER_BOX_TEMPORARY', (state, action) => {
    state.BASuggestiveOrderFilterBoxTemporary = {};
    state.BASuggestiveOrderFilterBoxTemporary[action.payload[0]] = action.payload[1];
  })
  builder.addCase('REMOVE_SUGGESTIVE_ORDER_FILTER_BOX_TEMPORARY', (state, action) => {
    state.BASuggestiveOrderFilterBoxTemporary = new Object();
  })


  /*************************** BA Sales ********************************/

  builder.addCase('ADD_SALE_CART', (state, action) => {
    state.BASaleCart[action.payload[0]] = action.payload[1];
  })
  builder.addCase('REMOVE_SALE_CART', (state, action) => {
    delete state.BASaleCart[action.payload];
  })
  builder.addCase('REMOVE_ALL_SALE_CART', (state, action) => {
    state.BASaleCart = new Object();
  })

  builder.addCase('ADD_SALE_FILTER', (state, action) => {
    state.SaleFilter = {};
    state.SaleFilter[action.payload[0]] = action.payload[1];
  })
  builder.addCase('REMOVE_SALE_FILTER', (state, action) => {
    state.SaleFilter = new Object();
  })

  builder.addCase('ADD_SALE_FILTER_TEMPORARY', (state, action) => {
    state.SaleFilterTemporary = {};
    state.SaleFilterTemporary[action.payload[0]] = action.payload[1];
  })
  builder.addCase('REMOVE_SALE_FILTER_TEMPORARY', (state, action) => {
    state.SaleFilterTemporary = new Object();
  })

  /*************************** BA'S ********************************/

  builder.addCase('ADD_BAS_FILTER', (state, action) => {
    state.BAsFilter = {};
    state.BAsFilter[action.payload[0]] = action.payload[1];
  })
  builder.addCase('REMOVE_BAS_FILTER', (state, action) => {
    state.BAsFilter = new Object();
  })

  builder.addCase('ADD_BAS_FILTER_TEMPORARY', (state, action) => {
    state.BAsFilterTemporary = {};
    state.BAsFilterTemporary[action.payload[0]] = action.payload[1];
  })
  builder.addCase('REMOVE_BAS_FILTER_TEMPORARY', (state, action) => {
    state.BAsFilterTemporary = new Object();
  })


  /****************** Product Category Filter  *******************/

  builder.addCase('ADD_PRODUCT_FILTER', (state, action) => {
    state.ProductFilter = {};
    state.ProductFilter[action.payload[0]] = action.payload[1];
  })
  builder.addCase('REMOVE_PRODUCT_FILTER', (state, action) => {
    state.ProductFilter = new Object();
  })

  builder.addCase('ADD_PRODUCT_FILTER_TEMPORARY', (state, action) => {
    state.ProductFilterTemporary = {};
    state.ProductFilterTemporary[action.payload[0]] = action.payload[1];
  })
  builder.addCase('REMOVE_PRODUCT_FILTER_TEMPORARY', (state, action) => {
    state.ProductFilterTemporary = new Object();
  })


  builder.addCase('', (state, action) => {
    state.ProductFilterBox = {};
    state.ProductFilterBox[action.payload[0]] = action.payload[1];
  })
  builder.addCase('REMOVE_PRODUCT_FILTER_BOX', (state, action) => {
    state.ProductFilterBox = new Object();
  })

  builder.addCase('ADD_PRODUCT_FILTER_BOX_TEMPORARY', (state, action) => {
    state.ProductFilterBoxTemporary = {};
    state.ProductFilterBoxTemporary[action.payload[0]] = action.payload[1];
  })
  builder.addCase('REMOVE_PRODUCT_FILTER_BOX_TEMPORARY', (state, action) => {
    state.ProductFilterBoxTemporary = new Object();
  })


  /****************** Airport Route Sort Filter Start *******************/

  builder.addCase('ADD_CHECKOUT_IMAGE', (state, action) => {
    state.CheckoutImage[action.payload[0]] = action.payload[1];
  })
  builder.addCase('REMOVE_CHECKOUT_IMAGE', (state, action) => {
    delete state.CheckoutImage[action.payload];
  })
  builder.addCase('REMOVE_ALL_CHECKOUT_IMAGES', (state, action) => {
    state.CheckoutImage = new Object();
  })

  /****************** Airport Route Sort Filter Start *******************/
  builder.addCase('ADD_AIRPORT_ROUTE_FILTER', (state, action) => {
    state.AirportRouteFilterRadio = {};
    state.AirportRouteFilterRadio[action.payload[0]] = action.payload[1];
  })
  builder.addCase('REMOVE_AIRPORT_ROUTE_FILTER_BY_ID', (state, action) => {
    delete state.AirportRouteFilterRadio[action.payload];
  })
  builder.addCase('REMOVE_AIRPORT_ROUTE_FILTER', (state, action) => {
    state.AirportRouteFilterRadio = new Object();
  })
  builder.addCase('ADD_AIRPORT_ROUTE_FILTER_TEMPORARY', (state, action) => {
    state.AirportRouteFilterRadioTemporary = {};
    state.AirportRouteFilterRadioTemporary[action.payload[0]] = action.payload[1];
  })
  builder.addCase('REMOVE_AIRPORT_ROUTE_FILTER_TEMPORARY_BY_ID', (state, action) => {
    delete state.AirportRouteFilterRadioTemporary[action.payload];
  })
  builder.addCase('REMOVE_AIRPORT_ROUTE_FILTER_TEMPORARY', (state, action) => {
    state.AirportRouteFilterRadioTemporary = new Object();
  })
  /****************** Airport Route Sort Filter *******************/


  /************* Airport Route Box Filter Start  **************/
  builder.addCase('ADD_AIRPORT_ROUTE_BOX_FILTER', (state, action) => {
    state.AirportRouteFilterBox[action.payload[0]] = action.payload[1];
  })
  builder.addCase('REMOVE_AIRPORT_ROUTE_BOX_FILTER_BY_ID', (state, action) => {
    state, delete state.AirportRouteFilterBox[action.payload];
  })
  builder.addCase('REMOVE_AIRPORT_ROUTE_BOX_FILTER', (state, action) => {
    state.AirportRouteFilterBox = new Object();
  })
  builder.addCase('ADD_AIRPORT_ROUTE_BOX_FILTER_TEMPORARY', (state, action) => {
    state.AirportRouteFilterBoxTemporary[action.payload[0]] = action.payload[1];
  })
  builder.addCase('REMOVE_AIRPORT_ROUTE_BOX_FILTER_TEMPORARY_BY_ID', (state, action) => {
    delete state.AirportRouteFilterBoxTemporary[action.payload];
  })
  builder.addCase('REMOVE_AIRPORT_ROUTE_BOX_FILTER_TEMPORARY', (state, action) => {
    state.AirportRouteFilterBoxTemporary = new Object();
  })

  /************* Airport Route Box Filter Start  **************/

  builder.addCase('ADD_LAT_LNG', (state, action) => {
    state.currentLatLng = action.payload;
  })
  builder.addCase('REMOVE_LAT_LNG', (state, action) => {
    state.currentLatLng = new Object({
      latitude: '',
      longitude: ''
    });
  })

  /********** Tour Plan Start **********/
  builder.addCase('ADD_TOUR_PLANS', (state, action) => {
    console.log("ADD_TOUR_PLANS_REDUX", action)
    state.tourPlans[action.payload[0]] = action.payload[1];
  })
  builder.addCase('REMOVE_TOUR_PLANS', (state, action) => {
    delete state.tourPlans[action.payload];
  })

  builder.addCase('REMOVE_ALL_TOUR_PLANS', (state, action) => {
    state.tourPlans = new Object();
  })
  /********** Tour Plan End ************/

  /********** Roster Plan Start **********/
  builder.addCase('ADD_ROSTER_PLANS', (state, action) => {
    /**
     * if id exist and TpState == 'RoasterPlan' means choosed Dropdown checkbox again
     */

    var temp = state.RoasterPlans[action.payload[0]];
    if (state.RoasterPlans.hasOwnProperty(action.payload[0])) {
      if (action.payload[1].TpState == 'RosterPlan') {
        console.log("action.payload[1]", action.payload[1]);
        var index = temp.OutletIds.indexOf(`${action.payload[1].OutletIds}`);

        //Means value exist in array
        if (index > -1) {
          temp.OutletIds.splice(index, 1);
          console.log("Outlets Line 459---", temp.OutletIds)
          var obj = {
            TpId: action.payload[1].TpId,
            TpDate: action.payload[1].TpDate,
            BeatId: action.payload[1].BeatId,
            OutletIds: [...temp.OutletIds],
            TpState: action.payload[1].TpState,
            TpRemark: '',
          }
          state.RoasterPlans[action.payload[0]] = obj;
        } else {

          var obj = {
            TpId: action.payload[1].TpId,
            TpDate: action.payload[1].TpDate,
            BeatId: action.payload[1].BeatId,
            OutletIds: [...temp.OutletIds, action.payload[1].OutletIds],
            TpState: action.payload[1].TpState,
            TpRemark: '',
          }
          state.RoasterPlans[action.payload[0]] = obj;
        }
      }

      /**
       * If id  exist and TpState != 'RoasterPlan' means choosed Dropdown Second
       */

      else if (action.payload[1].TpState != 'RosterPlan') {
        var obj = {
          TpId: action.payload[1].TpId,
          TpDate: action.payload[1].TpDate,
          BeatId: action.payload[1].BeatId,
          OutletIds: [],
          TpState: action.payload[1].TpState,
          TpRemark: '',
        }
        state.RoasterPlans[action.payload[0]] = obj;
      }


    }

    /**
     * If id doesn't exist and TpState == 'RoasterPlan' means choosed Dropdown checkbox first time
     */
    else if (action.payload[1].TpState == 'RosterPlan') {

      var obj = {
        TpId: action.payload[1].TpId,
        TpDate: action.payload[1].TpDate,
        BeatId: action.payload[1].BeatId,
        OutletIds: [action.payload[1].OutletIds],
        TpState: action.payload[1].TpState,
        TpRemark: '',
      }
      state.RoasterPlans[action.payload[0]] = obj;
    }
    /**
     * If id doesn't exist and TpState = !'RoasterPlan'
     */
    else {

      var obj = {
        TpId: action.payload[1].TpId,
        TpDate: action.payload[1].TpDate,
        BeatId: action.payload[1].BeatId,
        OutletIds: [],
        TpState: action.payload[1].TpState,
        TpRemark: '',
      }
      state.RoasterPlans[action.payload[0]] = obj;
    }

  })
  builder.addCase('REMOVE_ROSTER_PLANS', (state, action) => {
    delete state.RoasterPlans[action.payload];
  })

  builder.addCase('REMOVE_ALL_ROSTER_PLANS', (state, action) => {
    state.RoasterPlans = new Object();
  })

  builder.addCase('ADD_ROSTER_PLANS_FINALE', (state, action) => {
    console.log("ADD_ROSTER_PLANS_FINALE_REDUX_PAYLOAD",action.payload)
    state.RoasterPlans[action.payload[0]] = action.payload[1];
  })
  builder.addCase('REMOVE_ROSTER_PLANS_FINALE', (state, action) => {
    state.RoasterPlans = new Object();
  })
  /********** Roster Plan End ************/


  /*********TourRosterPlan Start ****************/

  builder.addCase('ADD_TOUR_ROSTER_PLANS', (state, action) => {
    console.log("ADD_TOUR_ROSTER_PLANS", action)
    // state.TourRosterPlans[action.payload[0]] =action.payload[1] ;


    /**
     * If user choose Fieldwork 
     * 
     */
    if (action.payload[1].TpState == 'FieldWork') {
      state.TourRosterPlans[action.payload[0]] = action.payload[1];
    }
    /**
     * If user choose RosterPlan
     */
    else if (action.payload[1].TpState == 'RosterPlan') {

      /**
     * if id exist and TpState == 'RoasterPlan' means choosed Dropdown checkbox again
     */

    var temp = state.TourRosterPlans[action.payload[0]];
    if (state.TourRosterPlans.hasOwnProperty(action.payload[0])) {
      // alert("574")
      if (action.payload[1].TpState == 'RosterPlan') {

        console.log("TEMP>OUTLETS+++", temp.OutletIds)
        console.log("action.payload[1]", action.payload[1]);
        var index = temp.OutletIds.indexOf(`${action.payload[1].OutletIds}`);
        console.log("INDEX________", index);

        //Means value exist in array
        if (index > -1) {
          temp.OutletIds.splice(index, 1);
          console.log("Outlets Line 459---", temp.OutletIds)
          var obj = {
            TpId: action.payload[1].TpId,
            TpDate: action.payload[1].TpDate,
            BeatId: action.payload[1].BeatId,
            BeatName: action.payload[1].BeatName,
            OutletIds: [...temp.OutletIds],
            TpOutlets:action.payload[1].TpOutlets,
            TpState: action.payload[1].TpState,
            TpRemark:action.payload[1].TpRemark,
          }
          state.TourRosterPlans[action.payload[0]] = obj;
        } else {

          var obj = {
            TpId: action.payload[1].TpId,
            TpDate: action.payload[1].TpDate,
            BeatName: action.payload[1].BeatName,
            BeatId: action.payload[1].BeatId,
            TpOutlets:action.payload[1].TpOutlets,
            OutletIds: [...temp.OutletIds, action.payload[1].OutletIds],
            TpState: action.payload[1].TpState,
            TpRemark:action.payload[1].TpRemark,
          }
          state.TourRosterPlans[action.payload[0]] = obj;
        }
      }

      /**
       * If id  exist and TpState != 'RoasterPlan' means choosed Dropdown Second
       */

      else if (action.payload[1].TpState != 'RosterPlan') {
        var obj = {
          TpId: action.payload[1].TpId,
          TpDate: action.payload[1].TpDate,
          BeatName: action.payload[1].BeatName,
          TpOutlets:action.payload[1].TpOutlets,
          BeatId: action.payload[1].BeatId,
          OutletIds: [],
          TpState: action.payload[1].TpState,
          TpRemark:action.payload[1].TpRemark,
        }
        state.TourRosterPlans[action.payload[0]] = obj;
      }


    }

    /**
     * If id doesn't exist and TpState == 'RoasterPlan' means choosed Dropdown checkbox first time
     */
    else if (action.payload[1].TpState == 'RosterPlan') {
      console.log("FIrst TIme===",action.payload[1])
      var obj = {
        TpId: action.payload[1].TpId,
        TpDate: action.payload[1].TpDate,
        BeatId: action.payload[1].BeatId,
        BeatName: action.payload[1].BeatName,
        TpOutlets:action.payload[1].TpOutlets,
        OutletIds: action.payload[1].OutletIds,
        TpState: action.payload[1].TpState,
        TpRemark:action.payload[1].TpRemark,
      }
      state.TourRosterPlans[action.payload[0]] = obj;
    }
    /**
     * If id doesn't exist and TpState = !'RoasterPlan'
     */
    else {

      var obj = {
        TpId: action.payload[1].TpId,
        TpDate: action.payload[1].TpDate,
        BeatId: action.payload[1].BeatId,
        BeatName: action.payload[1].BeatName,
        OutletIds: [],
        TpOutlets:action.payload[1].TpOutlets,
        TpState: action.payload[1].TpState,
        TpRemark:action.payload[1].TpRemark,
      }
      state.TourRosterPlans[action.payload[0]] = obj;
    }
     
    }//End of RosterPlan if
    /**
     *if User choosed another activity execlude FieldWork and RosterPlan
     */
    else {
      var obj = {
        TpId: action.payload[1].TpId,
        TpDate: action.payload[1].TpDate,
        BeatId: action.payload[1].BeatId,
        BeatName: action.payload[1].BeatName,
        OutletIds: [],
        TpOutlets:action.payload[1].TpOutlets,
        TpState: action.payload[1].TpState,
        TpRemark:action.payload[1].TpRemark,
      }
      state.TourRosterPlans[action.payload[0]] = obj;
    }


  })
  builder.addCase('REMOVE_TOUR_ROSTER_PLANS', (state, action) => {
    delete state.TourRosterPlans[action.payload];
  })

  builder.addCase('REMOVE_ALL_TOUR_ROSTER_PLANS', (state, action) => {
    state.TourRosterPlans = new Object();
  })

  /*********TourRosterPlan End ****************/



  builder.addCase('Add_TRIP_STAT', (state, action) => {
    state.tripstat = action.payload;
  })

  /*****OutletView Navigate From */
  builder.addCase('ADD_NAVIGATE_FROM_ON_OUTLETVIEW', (state, action) => {
    state.navigateFromOnOutletView = action.payload;
  })
  builder.addCase('isDataSyncPening', (state, action) => {
    state.isDataSyncPening = action.payload;
  })
  builder.addCase('REMOVE_isDataSyncPening', (state, action) => {
    state.isDataSyncPening = new Object({
      Checkout_Lat: '',
      OutletName: '',
      SyncFlag: ''
    });
  })

  builder.addCase('ADD_isOrderSync', (state, action) => {
    state.isOrderSync = true;
  })
  builder.addCase('REMOVE_isOrderSync', (state, action) => {
    state.isOrderSync = false;
  })

  builder.addCase('ADD_BA_SHOW', (state, action) => {
    state.isBAshow = ["true"];
  })
  builder.addCase('REMOVE_BA', (state, action) => {
    state.isBAshow = [];
  });
  builder.addCase('ADD_JOINT_WORKING_TEAM_ID', (state, action) => {
    console.log('ADD_JOINT working employeeId --->', action);
    state.teamEmpIdForJointWrkng = action.payload;
  });
  builder.addCase('REMOVE_JOINT_WORKING_TEAM_ID', (state, action) => {
    console.log('REMOVE_JOINT--->', action.payload);
    state.teamEmpIdForJointWrkng = '';
  });
  builder.addCase('ADD_SALES_OUTLET_BY', (state, action) => {
    console.log('ADD_SALES_OUTLET_BY Line 587=== --->', action);
    // alert(action.payload[0])
    state.salesOutletWise[action.payload[0]] = action.payload[1];
  });
  builder.addCase('REMOVE_SALES_OUTLET_BY', (state, action) => {
    console.log('REMOVE_JOINT--->', action.payload);
    state.salesOutletWise = new Object();
  });
  builder.addCase('ADD_SALES_OUTLET_ARRAY', (state, action) => {
    console.log('Redux ADD_SALES_OUTLET_ARRAY --->', action);
    state.salesOutletArray = action.payload;
  });
  builder.addCase('REMOVE_SALES_OUTLET_ARRAY', (state, action) => {
    console.log('REMOVE_JOINT--->', action.payload);
    state.salesOutletArray = new Array();
  });
  builder.addCase('ADD_TP_BY_ID', (state, action) => {
    console.log('ADD TP BY ID --->', action);
    state.pendingTpIds[action.payload[0]] = action.payload[1];
  });
  builder.addCase('REMOVE_TP_BY_ID', (state, action) => {
    console.log('REMOVE_TPBYID--->', action.payload);
    delete state.pendingTpIds[action.payload[0]];
  });
  builder.addCase('REMOVE_ALL_TP_IDS', (state, action) => {
    console.log('REMOVE_ADD--->', action.payload);
    state.pendingTpIds = new Object();
  });
  builder.addCase('SET_EMPID', (state, action) => {
    console.log('SET_EMPID State', action.payload);
    state.empId = action.payload;
  });
  builder.addCase('REMOVE_EMPID', (state, action) => {
    console.log('REMOVE_EMPID State', action.payload);
    state.empId = '';
  });
  builder.addCase('ADD_ORDER_LINE_ITEMS', (state, action) => {
    console.log('ADD_ORDER_LINE_ITEMS--->', action.payload);
    state.orderLineItem = action.payload;
  });
  builder.addCase('ADD_DASH_BUTTON', (state, action) => {
    console.log('ADD_DASH_BUTTON--->', action.payload);
    state.dashButton = action.payload;
  });
  builder.addCase('REMOVE_DASH_BUTTON', (state, action) => {
    console.log('REMOVE_DASH_BUTTON--->', action.payload);
    state.dashButton = new Array();
  });
  builder.addCase('ADD_ACTION_BUTTON', (state, action) => {
    console.log('ADD_ACTION_BUTTON--->', action.payload);
    state.actionButton = action.payload;
  });
  builder.addCase('REMOVE_ACTION_BUTTON', (state, action) => {
    console.log('REMOVE_ACTION_BUTTON--->', action.payload);
    state.actionButton = new Array();
  });
});
// //////////////////////////HAHAHA////////////////////////////////////////////


export default RootReducer;