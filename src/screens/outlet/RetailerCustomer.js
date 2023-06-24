import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  BackHandler
} from 'react-native';
import React, { useState } from 'react';
import { Colors } from '../../assets/config/Colors';
import styles from '../../assets/css/styleOutlet';
import { FlatListRetailerList } from './RetailerDataList';
import { useNavigation } from '@react-navigation/native';
import { openDatabase } from 'react-native-sqlite-storage';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';
import Header_2 from '../../components/shared/Header_2';

var db = openDatabase({ name: 'Beatdump.db' });

export default function RetailerCustomer(props) {

  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  const navigation = useNavigation();
  const [getOffset, setOffset] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [getOffset1, setOffset1] = React.useState(0);
  const [isLoading1, setIsLoading1] = React.useState(false);

  console.log("props.route.params.navigateFrom===", props.route.params.navigateFrom)

  function handleBackButtonClick() {
    if (props.route.params.navigateFrom == "DrawerContent") {
      navigation.goBack()
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: 'NewDashboard' }],
      })
    }
    return true;

  }

  React.useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);

  const [btnnum, setBtnnum] = useState(1);
  const [inActiveData, setInActiveData] = useState([]);
  const [activeData, setActiveData] = useState([]);

  React.useEffect(() => {
    fetchAllOutlets()
  }, [btnnum]);

  const fetchAllOutlets = async () => {
    // alert(getOffset1)
    var qry = '';
    //Means InActive Data
    if (btnnum == 2) {

      //  qry = `SELECT * from Outlets where OutletStatus='inactive' LIMIT 10 OFFSET ${getOffset}`
      qry = `SELECT * from Outlets where OutletStatus='inactive' or OutletStatus='Inactive' LIMIT 10 OFFSET ${getOffset}`
    } else {
      qry = `SELECT * from Outlets where OutletStatus='active' or OutletStatus='Active' LIMIT 10 OFFSET ${getOffset1}`
    }
    try {
      await db.transaction(async tx => {
        await tx.executeSql(qry, [], (tx, results) => {
          console.log('errr', tx);
          console.log('result Line 141--->', results);
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
          }

          console.log('Data returned From Outlets SQLITE In RetailerCustomer Line 68----->', temp);
          if (results.rows.length > 0) {
            setIsLoading(true);
            if (btnnum == 2) {
              setOffset(getOffset + 10)
              var k = inActiveData.concat(temp);
              setInActiveData(k)
            } else if (btnnum == 1) {
              setOffset1(getOffset1 + 10)
              var k = activeData.concat(temp);
              setActiveData(k)
            }
          } else {
            setIsLoading(false);
          }
        });
      });
    } catch (e) {
      alert(e);
    }
  }

  return (
    <View style={{ backgroundColor: themecolor.THEMECOLOR, flex: 1 }}>
      <StatusBar translucent backgroundColor="transparent" />
      <Header_2 title={'Retailer / Customer'} iconnameplus={'search'} Size2={16} onPress={() => handleBackButtonClick()} bottomLeftRadius={0} bottomRightRadius={0} onPressIconPlus={() => props.navigation.navigate('Search')} />
      <View style={{
        // flex: 0.2,
        backgroundColor: Colors.bluetheme,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        height: 50,
        backgroundColor: themecolor.HEADERTHEMECOLOR
      }}>
        <View style={{ ...styles.headerTabContainer, }}>


          <TouchableOpacity
            onPress={() => setBtnnum(1)}
            style={{
              backgroundColor: btnnum == 1 ? 'white' : themecolor.HEADERTHEMECOLOR,
              ...styles.headerTab,
            }}>
            <Text
              style={{
                ...styles.PendingTab,
                color: btnnum == 1 ? themecolor.HEADERTHEMECOLOR : '#FFFFFF',
              }}>
              Active
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setBtnnum(2)}
            style={{
              backgroundColor: btnnum == 2 ? 'white' : themecolor.HEADERTHEMECOLOR,
              ...styles.headerTab,
            }}>
            <Text
              style={{
                ...styles.PendingTab,
                color: btnnum == 2 ? themecolor.HEADERTHEMECOLOR : '#FFFFFF',
              }}>
              Inactive
            </Text>
          </TouchableOpacity>

        </View>
      </View>

      {/* <View style={styles.body}> */}

      {/* Data Flatlist */}
      {/* If Pending Button Active */}
      {btnnum == 2 ?
        (<FlatListRetailerList props={props} renderData={inActiveData} isLoading={isLoading}
          setIsLoading={setIsLoading}
          getOffset={getOffset} fetchAllOutlets={fetchAllOutlets} />
        ) : (<></>)}

      {/* If Approved Button Active */}
      {btnnum == 1 ?
        (<FlatListRetailerList props={props} renderData={activeData} isLoading={isLoading1}
          setIsLoading={setIsLoading1} getOffset={getOffset1} fetchAllOutlets={fetchAllOutlets} />

        ) : (<></>)}

      <View style={{ marginBottom: 10 }} />

      {/* If Rejected Button Active */}

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => props.navigation.push('AddOutlet')}
        style={{ ...styles.AddOutletCircle, backgroundColor: themecolor.HEADERTHEMECOLOR }}>
        <Image
          source={require('../../assets/images/addoutlet/add.png')}
          style={styles.PlusImage}
        />
      </TouchableOpacity>
    </View>
    // </View>
  );
}