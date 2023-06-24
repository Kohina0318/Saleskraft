import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StatusBar, View, ScrollView, Dimensions, BackHandler } from 'react-native';
import styles from '../../assets/css/stylesDashboardBA';
import { EXPENSEMyTripDetailsList } from '../../components/ExpenseData/TripdetailsData';

import Header_2 from '../../components/shared/Header_2';
import { gettripLocationApi } from '../../repository/trip/tripRepository';
import { useFocusEffect } from '@react-navigation/native';
import LoaderAllInOne from '../../components/shared/Loader';
import NoData from '../../components/shared/NoData';
const { height } = Dimensions.get('window');
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';

const ExpenseList = props => {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()

  const refRBSheet1 = useRef();
  const [expenselist, setExpenselist] = useState([]);
  const [expstatus, setExpstatus] = useState([]);
  const [loader, setLoder] = useState(true);

  const [triplist, setTriplist] = useState([]);
  const [tripkeys, setTripkeys] = useState([]);

  useEffect(() => {
    const fetchexpensestatus = async () => {
      const response = await gettripLocationApi('api/getStatus');
      if (response.statusCode == 200) {
        setExpstatus(response.data[0].Expenses);
        // setLoder(false);
        // console.log('expenses status', response.data[0]);
      } else {
        // setLoder(false);
        toast.show(result.message, {
          type: 'warning',
          placement: 'bottom',
          duration: 4000,
          offset: 30,
          animationType: 'slide-in',
        });
      }
    };
    fetchexpensestatus();
  }, []);

  const handleBackButtonClick = () => {
    props.navigation.push('ExpenseCard');
    return true;
  };

  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);

      return () => {
        BackHandler.removeEventListener(
          'hardwareBackPress',
          handleBackButtonClick,
        );
      };
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      const getExpenses = async () => {
        setLoder(true);
        try {
          const response = await gettripLocationApi(`api/getEmployeeExpenses`);
          if (response.statusCode == 200) {
            // console.log('RESPONSE_DATA ', response.data);
            let keys1 = Object.keys(response.data);
            // console.log('keys', keys1);
            setTripkeys(keys1);
            setTriplist(response.data);
            setLoder(false);
          } else {
            setLoder(false);
            alert(result.message);
          }
        } catch (err) {
          console.log(err);
        }
      };
      getExpenses();

      // console.log('params are :', props.route.params);
    }, []),
  );

  return (
    <>
      {loader ? (
        <>
          <LoaderAllInOne />
        </>
      ) : (
        <></>
      )}

      <View style={{ flex: 1, backgroundColor: themecolor.THEMECOLOR, }}>
        <StatusBar translucent backgroundColor="transparent" />
        <View>
          <Header_2
            title={'Expenses'}
            onPressIconPlus={() => props.navigation.navigate('AddExpense')}
            iconnameplus="plus"
            Size={18}
            IconSize={23}
            onPressIcon={() => refRBSheet1.current.open()}
            onPress={() => props.navigation.push('ExpenseCard')}
          />
          <View style={styles.MV5} />
          <ScrollView showsVerticalScrollIndicator={false} style={styles.H}>
            <View style={styles.view}>
              {/* {expenselist.length >= 1 ? (
                <EXPENSEMyTripDetailsList
                  expstatus={expstatus}
                  expenselist={expenselist}
                />
              ) : (
                <NoData message="Expense Not Found" />
              )} */}
              {tripkeys.length < 1 ? (
                <NoData message="Expense Not Found" />
              ) : (
                // <NoData message="Expense Not Found" />
                tripkeys.map((i, indx) => {
                  return (
                    <EXPENSEMyTripDetailsList
                      key={indx}
                      expstatus={expstatus}
                      Month={i}
                      DATA={triplist[i]}
                    />
                  );
                })
              )}
            </View>
          </ScrollView>
        </View>
      </View>
    </>
  );
};

export default ExpenseList;
