import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import MainNavigationStack from './src/navigation/mainNavigationStack/MainNavigationStack';
import { ToastProvider } from 'react-native-toast-notifications';
import { LogBox } from 'react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import RootReducer from './src/redux/RootReducer';
import NetInfoComponent from './src/helper/NetInfoComponent';
import * as Sentry from "@sentry/react-native";
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import {
  createProductCategoryTable,
  creatProductsTable,
  createOutletsTable,
  createMappingTable,
  createPrimaryOutletsTable,
  createPriceBookTable,
  createOutletsTypesTable,
  createUnitsTable,
  creatCheckinCheckoutTable,
  createStockTable,
  createSalesOrderTable,
  createSalesOrderLineItemTable,
  createBeatTable,
  createOutcomeTable
} from './src/helper/SQLite DB/Sqlite';
import { requestUserPermission, NotificationListner, getDeviceInfo } from './src/PushNotificationFcm/pushnotification_helper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NewTheme from './src/assets/config/NewTheme';
// import MapComponent from './src/helper/mapComponent/MapComponent';
// getDefaultMiddleware({
//   serializableCheck: false
// })

export const store = configureStore({
  reducer: RootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export async function googleKey() {
  let key = await AsyncStorage.getItem('@google_key')
  console.log("Key============", key)
  return key;
}


// const[user,setUser]=React.useState({});

const App = (props) => {

  React.useEffect(() => {
    async function sentryConfiguration() {
      let userprofile = JSON.parse(await AsyncStorage.getItem('@UserProfile'));
      console.log("User profile on NewDashboard Line 402=======>", userprofile);
      Sentry.init({
        // dsn: "https://d8d5ba54220143e3b6cd5c4cbc1ea891@o4504178276368384.ingest.sentry.io/4504178280628224",
        dsn: "https://cd26fbfe308a4b3a80a672b4efef5f09@o4504399116369920.ingest.sentry.io/4504399118467072",
        // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
        // We recommend adjusting this value in production.
        tracesSampleRate: 1.0,
        attachScreenshot: true,
      });
      Sentry.setUser({});
      Sentry.configureScope((scope) => {
        scope.setUser({
          id: userprofile.data.EmployeeId,
          email: `${userprofile.data.Email}`,
          name: `${userprofile.data.FirstName != null ? userprofile.data.FirstName : ''} ${userprofile.data.LastName != null ? userprofile.data.LastName : ''}`,
          endpoint: `${userprofile.data.Userss[0].AppToken}`,

        })
      })

    }
    if (!__DEV__) {
      sentryConfiguration();
    }
    async function temp() {
      await googleKey()
      await createProductCategoryTable();
      await creatProductsTable();
      await createOutletsTable(),
        await createMappingTable(),
        await createPrimaryOutletsTable(),
        await createPriceBookTable(),
        await createOutletsTypesTable(),
        await createUnitsTable();
      await creatCheckinCheckoutTable();
      await createStockTable();
      await createSalesOrderTable();
      await createSalesOrderLineItemTable();
      await createBeatTable();
      await createOutcomeTable();
      requestUserPermission();
      NotificationListner();
      getDeviceInfo();
    }
    temp();
  }, []);

  LogBox.ignoreAllLogs(true);
  LogBox.ignoreLogs(['Animated: `useNativeDriver`']);

  return (
    <>
      <StatusBar translucent backgroundColor="transparent"
      />
      <View style={styles.mainContainer}>
        <Provider store={store}>
          <NewTheme />
          <ToastProvider swipeEnabled={true}>
            <MainNavigationStack />
          </ToastProvider>
          <NetInfoComponent />
        </Provider>
      </View>
      {/* <View>
          <MapComponent/>
        </View>  */}

    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 0,
    marginBottom: 0,
    backgroundColor: '#FFF',
    flex: 1,
  },
});


export default Sentry.wrap(App);
// export default App()



