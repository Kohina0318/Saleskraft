import {View, Text, FlatList,TouchableOpacity,Dimensions,Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import Color from '../../components/Theme/ThemeDarkLightColor';
import Header_2 from '../../components/shared/Header_2';
import EFooter from '../../components/ExpenseData/EFooter';
import {gettripLocationApi} from '../../repository/trip/tripRepository';
import moment from 'moment';
import DummyImage from '../../components/shared/DummyImage';
import { SERVER_URL } from '../../repository/commonRepository';
const {width,height} = Dimensions.get('window');

const ExpenseRender = async({item}) => {
  return (
    <TouchableOpacity
      onPress={
        () => {}
        //   navigation.navigate('EventDetails', {EventId: item.EventId})
      }
      style={{
        flexDirection: 'row',
        backgroundColor: Color.Color.BOXTHEMECOLOR,
        width: width * 0.93,
        marginTop: 5,
        padding: 10,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Color.Color.BOXBORDERCOLOR,
      }}>
      <View
        style={{
          width: 60,
          height: 60,
          borderWidth: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
          borderRadius: 50,
          overflow: 'hidden',
        }}>
        {item.emprec.ProfilePicture == null ||
        item.emprec.ProfilePicture == '' ? (
          <DummyImage height={50} width={50} />
        ) : (
          <Image
            source={{
              uri: `${await SERVER_URL()}uploads/2/${item.emprec.ProfilePicture}`,
            }}
            style={{height: 60, width: 60}}
            resizeMode={'stretch'}
          />
        )}
      </View>
      <View style={{width: width * 0.93 - 80, marginLeft: 8}}>
        <Text style={{color: Color.Color.TXTWHITE}}>{item.employeeName}</Text>
        {/* <Text style={{color: Color.Color.TXTWHITE}}>
        
        </Text> */}
        <Text style={{color: Color.Color.TXTWHITE}}>{item.Amount}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ExpenseMDashboard = props => {
  const [expdata, setExpdata] = useState([]);

  const getexpenseforapprove = async (f_date,t_date) => {
    try {
      const result = await gettripLocationApi(
        `api/getawatingApprovalExpenses?from_date=${f_date}&to_date=${t_date}`,
      );
      if(result.statusCode == 200){
        setExpdata(result.data)
      }else{
        alert(result.message)
      }

      // console.log("data of awaiting expenses",result)

    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    let to_dt = moment().format('YYYY-MM-DD');
    let from_dt = moment().subtract(30, 'd').format('YYYY-MM-DD');
    getexpenseforapprove(from_dt,to_dt);
  }, []);

  return (
    <View style={{backgroundColor: Color.Color.THEMECOLOR, flex: 1}}>
      <Header_2
        title="NewDashboard"
        iconname="search"
        iconnameplus="filter"
        onPress={() => props.navigation.goBack()}
      />
      <View style={{alignSelf:'center'}} >
      <FlatList
        data={expdata}
        keyExtractor={item => item.EmployeeId}
        renderItem={({item}) => <ExpenseRender item={item} />}
      />

      </View>

      <View style={{position: 'absolute', bottom: 0}}>
        <EFooter manager={true} />
      </View>
    </View>
  );
};
