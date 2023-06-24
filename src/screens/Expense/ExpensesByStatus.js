import {View, Text, FlatList, TouchableOpacity, Dimensions, ScrollView,BackHandler} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createTripApi, gettripLocationApi} from '../../repository/trip/tripRepository';
import Header_2 from '../../components/shared/Header_2';
import styles from '../../assets/css/styleProducts';
import {useNavigation,useFocusEffect} from '@react-navigation/native';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import MCIcon from 'react-native-vector-icons/MaterialIcons';
import { FontSize } from '../../assets/fonts/Fonts';
import { Colors } from '../../assets/config/Colors';
import NoData from '../../components/shared/NoData';
import LoaderAllInOne from '../../components/shared/Loader';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';

const {width, height} = Dimensions.get('window');

const RenderByStatus = ({item,expstatus,themecolor}) => {
  var statusColor = '';
  var Icon = '';
  if (expstatus[item.ExpenseStatus] == 'Approved') {
    statusColor = '#00C46F';
    Icon = (
      <>
        <FAIcon name="check-circle" />
      </>
    );
  } else if (expstatus[item.ExpenseStatus] == 'Submit') {
    statusColor = Colors.bluetheme;
    Icon = (
      <>
        <FAIcon name="check-circle" />
      </>
    );
  } else if (expstatus[item.ExpenseStatus] == 'Created') {
    statusColor = 'orange';
    Icon = (
      <>
        <MCIcon name="error-outline" />
      </>
    );
  } else if (expstatus[item.ExpenseStatus] == 'Proceed for Payment') {
    statusColor = 'green';
    Icon = (
      <>
        <FAIcon name="check-circle" />
      </>
    );
  } else {
    statusColor = 'red';
    Icon = (
      <>
        <Feather name="x-circle" />
      </>
    );
  }
  const navigation = useNavigation();

  return (
    <View style={{...styles.CUSTOMERdvIEW,marginTop:5,}}>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() =>
          navigation.navigate('OutstationTripDetails', {
            expId: item.ExpId,
            date1: item.ExpenseDate.split('-').reverse().join('-'),
            workingat: item.ExpensePlacewrk,
          })
        }
        style={{...styles.CUSTOMERVIEWTO,backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR1}}>
        <View style={styles.NumberInputView}>
          <View
            style={{
              ...styles.Width85,
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            <View
              style={{...styles.FLEXDIREC1, justifyContent: 'space-between'}}>
              {/* <Text style={styles.RateTextBig}></Text> */}
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{...styles.RateTextBig, width: width * 0.55,color:themecolor.TXTWHITE}}>
                {item.ExpensePlacewrk}
              </Text>
              <View>
                <Text
                  style={{
                    ...styles.RateTextboldOrangeCircle,
                    color: statusColor,
                    // alignSelf:'flex-end',
                    textAlign: 'right',
                    width: width * 0.3,
                  }}>
                  {Icon}&nbsp;{expstatus[item.ExpenseStatus]}
                </Text>
              </View>
            </View>

            <View
              style={{...styles.FLEXDIREC1, justifyContent: 'space-between'}}>
              <Text style={{...styles.RateText,color:themecolor.TXTWHITE}}>
                {item.ExpenseDate == '' || item.ExpenseDate == null
                  ? 'Date not available'
                  : item.ExpenseDate.split('-').reverse().join('-')}
              </Text>
              <View style={{width: 90}}>
                <Text
                  style={{
                    ...styles.RateText,
                    top: -5,
                    alignSelf: 'flex-end',
                    fontSize: FontSize.labelText3,
                    color:themecolor.TXTWHITE
                  }}>
                  <FAIcon name="rupee" size={11} /> {item.ExpenseFinalAmt}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ExpensesByStatus = props => {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  const [expenselist, setExpenselist] = useState([]);
  const [expstatus, setExpstatus] = useState([]);
  const [loader,setLoder] = useState(true)

  const handleBackButtonClick=() =>{
    props.navigation.push('ExpenseCard')
    return true
    
  }

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

  useEffect(() => {
    // alert(props.route.params.monthId)
    // alert(props.route.params.status)
    const expensesByStatus = async () => {
      const result = await createTripApi(
        `api/getExpensesMonthwise?status=${props.route.params.status}`,
      );
      // console.log("hhhhhhhhhhhhhhhh",result)
      if (result.statusCode == 200) {
        // console.log('data status wise for expenses', result.data.data);
        let filtered_data = result.data.data.filter(
          item => item.Month.Monthid == props.route.params.monthId,
        );
        setExpenselist(filtered_data[0].Employee);
        // console.log('filtered_data in clg', filtered_data[0].Employee);
        setLoder(false)
      } else {
        alert(result.message);
        setLoder(false)
      }
    };
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
    expensesByStatus();
  }, []);

  return (
    <>
      {loader ? (
        <>
          <LoaderAllInOne />
        </>
      ) : (
        // <Spinner
        //   visible={true}
        //   textContent={'Loading...'}
        //   textStyle={{color: '#FFF'}}
        // />
        <></>
      )}
    <View style={{flex: 1,backgroundColor:themecolor.THEMECOLOR,}}>
      <Header_2
        title={props.route.params.navigateFrom}
        // onPressIconPlus={() => props.navigation.navigate('AddExpense')}
        // iconnameplus="plus"
        Size={18}
        IconSize={23}
        onPressIcon={() => refRBSheet1.current.open()}
        onPress={() => {
          props.navigation.push('ExpenseCard',{
            navigateFrom:'expensestatus'
          })
        }
        }
      />
      <View>
        {(expenselist.length>=1)?
        <View  style={{height:height-80, }}  >
        <FlatList
          data={expenselist}
          renderItem={({item}) => <RenderByStatus expstatus={expstatus} item={item} themecolor={themecolor}/>}
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
          ListFooterComponent={<View style={{height: 20}}></View>}
        />
        </View>
        :<NoData message='Data not found'/>
        
}
      </View>
    </View></>
  );
};
