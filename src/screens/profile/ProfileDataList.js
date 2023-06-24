import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, FlatList, Text, Dimensions,Linking } from 'react-native';
import { FontFamily } from '../../assets/fonts/FontFamily';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../../assets/css/styleProfile';
import { db } from '../../helper/SQLite DB/Sqlite';
import TextTicker from 'react-native-text-ticker';
import { Colors } from '../../assets/config/Colors';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';
// import { FontSize } from '../../assets/fonts/Fonts';
// import { getDatafromAsync } from '../../repository/AsyncStorageServices';
// import { gettripLocationApi } from '../../repository/trip/tripRepository';
// import { useEffect } from 'react';
const { width } = Dimensions.get('screen');

function CustomerList1({ item ,themecolor}) {
  // console.log('(((((((((((((((', item);


 //////////
  
 const onPressMobileClick = (Phone) => {

  let phoneNumber = '';
  if (Platform.OS === 'android') {
    phoneNumber = `tel:${Phone}`;
  } else {
    phoneNumber = `telprompt:${Phone}`;
  }

  Linking.openURL(phoneNumber);
}

/////////

const emailId= 'uday@gmail.com'

const onPressMailClick = (Email) => {
      Linking.openURL('mailto:'+Email)
    //  Linking.openURL('mailto:Care@amazon.com')
   } 

  return (
    <>
      <TouchableOpacity activeOpacity={1}>
        <View style={{...styles.view3,backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR }}>
          <View>
            <Text
              numberOfLines={1}
              ellipsizeMode={'tail'}
              style={{
                color: Colors.black,
                fontSize: 12.5,
                fontFamily: FontFamily.Popinssemibold,
                color: themecolor.TXTWHITE 
              }}>
              {item.Designations.Designation}
            </Text>
            <View style={styles.marg3} />
          </View>

          <View style={{
            width: width * 0.85,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'center',
              // alignItems: 'center',
              alignSelf: 'center'
            }}>
              <View style={{ justifyContent: 'center', top: -1 }}>
                <EvilIcon
                  name="user"
                  style={{
                    ...styles.clr,
                    alignSelf: 'flex-start',
                  }}
                  size={18}
                />
              </View>
              <View style={{ justifyContent: 'center' }}>
                <Text
                  numberOfLines={2}
                  ellipsizeMode={'tail'}
                  style={{
                    ...styles.newstyle1,
                    width: width * 0.5,
                    color: themecolor.TXTWHITE 
                  }}>
                  &nbsp;{item.FirstName} {item.LastName}
                </Text>
              </View>
            </View>


            <View style={styles.flexs}>
              <FAIcon name="mobile" style={{...styles.clr,top:-2}} size={16} />
              <TouchableOpacity onPress={()=>{onPressMobileClick(item.Phone)}}>
              <Text style={{  ...styles.newstyle1, marginLeft: 5 ,color: themecolor.TXTWHITE }}>
                {item.Phone === '' ? 'Not Available' : item.Phone}
              </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.marg3} />
          <View style={styles.view4}>
            <View style={styles.view5}>
              <View style={{ top:3,marginHorizontal:2 }}>
             
                <Text ><Feather name="mail" color={Colors.bluetheme} size={12} /></Text></View>
                <TouchableOpacity onPress={() => onPressMailClick(emailId)}>
              <Text
                numberOfLines={1}
                ellipsizeMode={'tail'}
                style={{   ...styles.newstyle1, color: themecolor.TXTWHITE }}>
                {' '}
                {item.Email}
              </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.marg3} />
      </TouchableOpacity>
    </>
  );
}

function CustomerList1Shimmer({ item }) {
  // console.log('(((((((((((((((', item);
  return (
    <>
      <View style={styles.view3}>
        <SkeletonPlaceholder>
          <View style={{ width: width * 0.87, height: 20, borderRadius: 8 }} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ width: width * 0.42, height: 12, top: 8, borderRadius: 8 }} />
            <View style={{ width: width * 0.42, height: 12, top: 8, borderRadius: 8 }} />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ width: width * 0.42, height: 12, top: 16, borderRadius: 8 }} />
            <View style={{ width: width * 0.42, height: 12, top: 16, borderRadius: 8 }} />
          </View>

          <View style={{ width: width * 0.42, height: 12, top: 32, borderRadius: 8 }} />
          <View style={{ width: width * 0.42, height: 12, top: 40, borderRadius: 8 }} />
        </SkeletonPlaceholder>
      </View>
    </>
  );
}

function CustomerList2({ item, navigation ,themecolor}) {

  return (
    <>
      <View>
        <View style={{ ...styles.view3,backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR }}>
          <View>
            <View style={{ width: '78%',  }} >
              <TextTicker
                style={{
                  color: Colors.black,
                  fontSize: 12,
                  fontFamily: FontFamily.Popinssemibold,
                  color: themecolor.TXTWHITE 
                }}
                duration={3000}
                loop
                bounce
                repeatSpacer={50}
                marqueeDelay={1000}>
                {item.OutletName} - {item.OutletCode}
              </TextTicker>

            </View>
            <View
              style={{
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
                position: 'absolute',
                alignSelf: 'flex-end',
                width: width * 0.9,
              }}>
              <View style={styles.TagView}>
                <Text style={{...styles.TagText,color: themecolor.TXTWHITE }}>{item.OutlettypeName}</Text>
              </View>
            </View>
          </View>

          <View style={styles.marg3} />
          <View style={{ ...styles.view4 }}>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignSelf: 'center'
            }}>
              <View style={{ justifyContent: 'center', top: -1 }}>
                <EvilIcon
                  name="user"
                  style={{
                    ...styles.clr,
                    alignSelf: 'flex-start',
                  }}
                  size={16}
                />
              </View>
              <View style={{ justifyContent: 'center' }}>
                <Text
                  numberOfLines={2}
                  ellipsizeMode={'tail'}
                  style={{
                    ...styles.newstyle1,
                    width: width * 0.5,
                    color: themecolor.TXTWHITE 
                  }}>
                  {item.OutletContactName}
                </Text>
              </View>
            </View>

            <View style={{
              alignItems: 'center',
              flexDirection: 'row',
            }}>
              <View style={{ justifyContent: 'center', alignSelf: 'center', top: -2 }}><FAIcon name="mobile" style={styles.clr} size={16} /></View>

              <Text style={{ ...styles.newstyle1,color: themecolor.TXTWHITE  }}>
                &nbsp;
                {item.OutletContactNo == null || item.OutletContactNo == ''
                  ? 'Not available'
                  : item.OutletContactNo}
              </Text>
            </View>
          </View>

          <View style={styles.view4}>
            <View style={{...styles.view5}}>
            <Ionicons name='location-outline' color={Colors.bluetheme} size={14} />
              <Text
                numberOfLines={2}
                ellipsizeMode={'tail'}
                style={{ ...styles.newstyle1, width: width * 0.6 ,color: themecolor.TXTWHITE }}>
                {item.OutletAddress}
              </Text>
            </View>
          </View>

          <View style={styles.view4}>
            <View style={{ ...styles.view5,  }}>
              <Ionicons name="bookmark-outline" style={styles.clr} size={12} />
              <Text
                numberOfLines={2}
                ellipsizeMode={'tail'}
                style={{ ...styles.newstyle1, bottom: 2,color: themecolor.TXTWHITE  }}>
                &nbsp;Channel Category :{' '}
                {item.OutletClassification == null ||
                  item.OutletClassification == ''
                  ? 'Not available'
                  : item.OutletClassification}
              </Text>
            </View>
          </View>

        </View>
      </View>
      <View style={{ marginVertical: 2 }} />
    </>
  );
}

export function ProfileDetails(props) {
  const mode = useSelector(state=>state.mode)
  const themecolor = new MyThemeClass(mode).getThemeColor()

 ////
  const onPressMobileNumClick = (mobile) => {

    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${mobile}`;
    } else {
      phoneNumber = `telprompt:${mobile}`;
    }

    Linking.openURL(phoneNumber);
 }
/////


const emailId= 'vrishikesh990@gmail.com'

const onPressMailClick = (email) => {
      Linking.openURL('mailto:'+email)
    //  Linking.openURL('mailto:Care@amazon.com')
   } 

/////
  return (
    <TouchableOpacity activeOpacity={1}>
 
      <View style={{...styles.view,backgroundColor:themecolor.BOXTHEMECOLOR,borderColor:themecolor.BOXBORDERCOLOR}}>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ marginRight: 6 }}>
            <Text ><Feather name="mail" color={Colors.bluetheme} size={12} /></Text></View>
          <Text style={{ ...styles.newstyle1,color:themecolor.TXTWHITE }}>
            Email id:</Text>
          <View style={{ marginLeft: 4 }} />
          <TouchableOpacity onPress={() => onPressMailClick(emailId)}>
          <Text style={{ ...styles.newstyle,color:themecolor.TXTWHITE }}> {props.email}</Text>
          </TouchableOpacity>
        </View>
       

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ marginRight: 6 }}>
            <Text >
              <Feather name="phone" color={Colors.bluetheme} size={12} />
            </Text>
          </View>
          <Text style={{...styles.newstyle1,color:themecolor.TXTWHITE}}>
            Mob. No. :</Text>
          <View style={{ marginLeft: 4 }} />
          <TouchableOpacity onPress={()=>{onPressMobileNumClick(props.mobile)}}>
          <Text style={{ ...styles.newstyle,color:themecolor.TXTWHITE }}>
            {' '}
            {props.mobile == null || props.mobile == ''
              ? 'Not Available'
              : props.mobile}
          </Text>
          </TouchableOpacity>
        </View>
       

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ marginRight: 5 }}>
            <Ionicons name='location-outline' color={Colors.bluetheme} size={12} />
          </View>
          <Text style={{...styles.newstyle1,color:themecolor.TXTWHITE}}>
            Terr. Name :</Text>
          <View style={{ marginLeft: 4 }} />
          <Text style={{ ...styles.newstyle,color:themecolor.TXTWHITE }}>
            {' '}
            {props.terrName == null || props.terrName == ''
              ? 'Not Available'
              : props.terrName}
          </Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ marginRight: 6 }}>
            <MCIcon name='human-greeting-variant' color={Colors.bluetheme} size={12} />
          </View>
          <Text style={{...styles.newstyle1,color:themecolor.TXTWHITE}} >
            Reporting to :</Text>
          <View style={{ marginLeft: 4 }} />
          <Text style={{ ...styles.newstyle,color:themecolor.TXTWHITE }}>
            {' '}
            {props.reportingTo == null || props.reportingTo == ''
              ? 'Not Available'
              : props.reportingTo}
          </Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ marginRight: 6 }}>
            <AntDesign name='idcard' color={Colors.bluetheme} size={12} />
          </View>
          <Text style={{...styles.newstyle1,color:themecolor.TXTWHITE }} >
            Emp. Code :
          </Text>
          <View style={{ marginLeft: 4 }} />
          <Text style={{ ...styles.newstyle,color:themecolor.TXTWHITE  }}>
            {' '}
            {props.empCode == null || props.empCode == ''
              ? 'Not Available'
              : props.empCode}
          </Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ marginRight: 6 }}>
            <MaterialCommunityIcons name='target-account' color={Colors.bluetheme} size={12} />
          </View>
          <Text style={{...styles.newstyle1,color:themecolor.TXTWHITE }}>
            Base Target :</Text>
          <View style={{ marginLeft: 4 }}/>
          <Text style={{ ...styles.newstyle ,color:themecolor.TXTWHITE }}>
            {' '}
            {props.baseTarget == null || props.baseTarget == ''
              ? 'Not Available'
              : props.baseTarget}
          </Text>
        </View>
      </View>
      <View style={styles.marg3} />
    </TouchableOpacity>
  );
}

export function ProfileDetailsShimmer(props) {
  return (
    <SkeletonPlaceholder >
      <View style={{ width: width * 0.85, height: 20, borderRadius: 8 }} />
      <View style={{ width: width * 0.45, height: 12, top: 8, borderRadius: 8 }} />
      <View style={{ width: width * 0.45, height: 12, top: 16, borderRadius: 8 }} />
      <View style={{ width: width * 0.45, height: 12, top: 24, borderRadius: 8 }} />
      <View style={{ width: width * 0.45, height: 12, top: 32, borderRadius: 8 }} />
      <View style={{ width: width * 0.45, height: 12, top: 40, borderRadius: 8 }} />
    </SkeletonPlaceholder>
  );
}

export function Customer1(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  console.log('propssss', props);
  const Cdata1 = props.data;

  return (
    <FlatList
      data={Cdata1}
      renderItem={({ item }) => <CustomerList1 item={item} themecolor={themecolor} />}
      showsVerticalScrollIndicator={false}
      scrollEnabled={false}
    />
  );
}

export function Customer1Shimmer(props) {
  return (
    <FlatList
      data={["1", "1", "1", "1", "1"]}
      renderItem={({ item }) => <CustomerList1Shimmer item={item} />}
      showsVerticalScrollIndicator={false}
      scrollEnabled={true}
    />
  );
}

export function Customer2(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  const navigation = useNavigation();
  const [distributor, setDistributor] = useState([]);

  async function getdistributors() {
    // alert('hhh')
    // const trId = await getDatafromAsync('@user');
    // let terr_Id = trId.employee[0].TerritoryId;
    // const result = await gettripLocationApi(
    //   `api/getParentOutlets?territory_id=${terr_Id}&outlet_type_id=1`,
    // );
    // console.log('distributors', result);
    // console.log('terr_Id', trId);
    // setDistributor(result.data);

    await db.transaction(async tx => {
      await tx.executeSql(
        `SELECT * from PrimaryOutlets left join OutletsTypes on PrimaryOutlets.OutlettypeId=OutletsTypes.OutlettypeId`,
        [],
        async (tx, results) => {
          console.log('PrimaryOutlets====>', results);
          console.log('PrimaryOutlets---->>>====>', results.rows.length);
          if (results.rows.length > 0) {
            console.log('results Line 183 ===> ', results);
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i) {
              temp.push(results.rows.item(i));
            }
            console.log(
              'PrimaryOutlets in ProfileDataList Line 198 ======> ',
              temp,
            );
            setDistributor(temp);
          } else {
            console.log('Error in PrimaryOutlets Line 200 ===> ', tx);
          }
        },
      );
    });
  }

  useEffect(() => {
    getdistributors();
  }, []);

  return (
    <>
      {distributor.length >= 1 ? (
        <FlatList
          data={distributor}
          renderItem={({ item }) => (
            <CustomerList2 navigation={navigation} item={item} themecolor={themecolor} />
          )}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
        />
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Distributors Not Available</Text>
        </View>
      )}
    </>
  );
}
