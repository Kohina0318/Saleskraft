import {
  Text,
  View,
  TextInput,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Image,
  Alert,
  BackHandler,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { Colors } from '../../assets/config/Colors';
import { FontFamily } from '../../assets/fonts/FontFamily';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import FIcon from 'react-native-vector-icons/FontAwesome';
import styles from '../../assets/css/stylesBeat';
import { useSelector } from 'react-redux';
import BeatOutletsList from '../../components/Beat_outlet/BeatOutletsList';
import { openDatabase } from 'react-native-sqlite-storage';
import FilterRBsheetComponent from '../../components/Search_Filter/FilterRBsheetComponent';
import FullsizeButton from '../../components/shared/FullsizeButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoaderAllInOne from '../../components/shared/Loader';
import { useNavigation } from '@react-navigation/native';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
// import {
//   insertMappingData,
//   insertOutcomeData,
//   insertStockData,
//   insertStockDataIfNotInserted,
//   outletBeatDump,
//   TruncateAllTables,
// } from '../SharedScreens/InsertData';
// import { gettripLocationApi } from '../../repository/trip/tripRepository';
// import { getBeatDump } from '../../repository/beat Planning/beatPlaningRepository';

var db = openDatabase({ name: 'Beatdump.db' });
const { height, width } = Dimensions.get('screen')

export default function AirportRoute(props) {
  console.log('Props In AirportRoute Line 26======>', props.route.params);
  const navigation = useNavigation();
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()

  function handleBackButtonClick() {
    if (
      props.route.params.navigateFrom == 'start_beat' ||
      props.route.params.navigateFrom == 'view_beat'
    ) {
      navigation.goBack();
      return true;
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: 'NewDashboard' }],
      })
      return true;
    }
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

  const network = useSelector(state => state.network);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [index, setIndex] = useState(0);
  const [PendingOutlets, setPendingOutlets] = useState([]);
  const [completedOutlets, setCompletedOutlets] = useState([]);
  const [beatOutletType, setBeatOutletType] = useState([]);
  const [clickOnFilter, setClickOnFilter] = useState(false);
  const [loader, setLoader] = React.useState(false);
  const [isRosterPlan, setIsRosterPlan] = useState(false);
  const [pendingOutletsForSearch, setPendingOutletsForSearch] = React.useState(
    [],
  );
  const [completedOutletsForSearch, setCompletedOutletsForSearch] =
    React.useState([]);

  // const [getOffset, setOffset] = React.useState(0);
  // const [isLoading, setIsLoading] = React.useState(false);
  // const [getOffset1, setOffset1] = React.useState(0);
  // const [isLoading1, setIsLoading1] = React.useState(false);

  const handleSingleIndexSelect = index => {
    setSelectedIndex(index);
    if (index === 1) {
      setIndex(1);
    } else {
      setIndex(0);
    }
  };

  useEffect(() => {
    setLoader(true);
  }, []);

  const fetchAllOutlets = async () => {
    // ------> Outlets getting from Table Outlets Start *******
    // agar joint worjing se
    // getBeatDump Outlets
    // const agendaType = await gettripLocationApi('api/punchStatus');
    // console.log('agenda type test002', agendaType.data.Agenda.Agendname);
    // const aType = agendaType.data.Agenda.Agendname;

    // if (aType == 'JOINT WORKING') {
    //   alert('Hii Line  104 AirportRoute');
    //   try {
    //     await StoreDatatoAsync('JointEnable', true);
    //     await TruncateAllTables();
    //     setTimeout(async () => {
    //       // alert("inside timeout"+props.route.params.beatId)
    //       await insertStockData(9);
    //       await insertStockDataIfNotInserted(9);
    //       await insertMappingData(9);
    //       await outletBeatDump(9);
    //       await insertOutcomeData(9);
    //     }, 0);
    //     // await getOutlets('Pending')
    //   } catch (e) {
    //     alert(e);
    //   }
    // } else {
    try {
      await db.transaction(async tx => {
        await tx.executeSql(
          `SELECT Out.*,Outyp.* FROM Outlets as Out join OutletsTypes as Outyp on Out.OutlettypeId=Outyp.OutlettypeId`,
          [],
          async (tx, results) => {
            console.log('errr', tx);
            console.log('result Line 141--->', results);
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i) {
              temp.push(results.rows.item(i));
            }
            console.log(
              'Data returned From Outlets SQLITE In AirporteRoute Line 572----->',
              temp,
            );

            //get Data From Beat table Start
            tx.executeSql(`SELECT * from Beat`, [], async (tx, results) => {
              console.log('errr', tx);
              console.log('result Line 141--->', results);
              var newTemp = [];
              for (let i = 0; i < results.rows.length; ++i) {
                newTemp.push(results.rows.item(i));
              }
              console.log(
                'Data returned From Beats SQLITE In AirporteRoute Line 591----->',
                newTemp,
              );
              var temp1 = [];
              var temp2 = [];

              temp.map((item, index) => {
                newTemp.forEach(itm => {
                  if (
                    item.Id == itm.OutletId &&
                    itm.visitStatus === 'Pending'
                  ) {
                    temp1.push(item);
                  } else if (
                    item.Id == itm.OutletId &&
                    itm.visitStatus === 'Completed'
                  ) {
                    temp2.push(item);
                  }
                });
              });
              // alert('temp 1 ' + JSON.stringify(temp1));
              setPendingOutlets(temp1);
              setPendingOutletsForSearch(temp1);
              setCompletedOutlets(temp2);
              setCompletedOutletsForSearch(temp2);
              setLoader(false);
            });
          },
        );
      });
    } catch (e) {
      alert('Error in AirporteRoute in Catch Line 577', e);
    }

  };

  const fetchAllRoasterOutlets = async () => {
    // ------> Outlets getting from Table Outlets Start *******
    try {
      await db.transaction(async tx => {
        await tx.executeSql(
          `SELECT Out.*,Outyp.* FROM Outlets as Out join OutletsTypes as Outyp on Out.OutlettypeId=Outyp.OutlettypeId`,
          [],
          async (tx, results) => {
            console.log('errr', tx);
            console.log('result Line 141--->', results);
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i) {
              temp.push(results.rows.item(i));
            }
            console.log(
              'Data returned From Outlets SQLITE In AirporteRoute Line 572----->',
              temp,
            );

            /***New Start */
            //*** get Data From Beat table Start
            tx.executeSql(`SELECT * from Beat`, [], async (tx, results) => {
              console.log('errr', tx);
              console.log('result Line 141--->', results);
              var newTemp = [];
              for (let i = 0; i < results.rows.length; ++i) {
                newTemp.push(results.rows.item(i));
              }
              console.log(
                'Data returned From Beats SQLITE In AirporteRoute Line 591----->',
                newTemp,
              );
              var temp1 = [];
              var temp2 = [];

              temp.map((item, index) => {
                newTemp.forEach(itm => {
                  if (
                    item.Id == itm.OutletId &&
                    itm.visitStatus === 'Pending'
                  ) {
                    temp1.push(item);
                  } else if (
                    item.Id == itm.OutletId &&
                    itm.visitStatus === 'Completed'
                  ) {
                    temp2.push(item);
                  }
                });
              });

              setPendingOutlets(temp1);
              setPendingOutletsForSearch(temp1);
              setCompletedOutlets(temp2);
              setCompletedOutletsForSearch(temp2);
              setLoader(false);
            });
            /***New End */
          },
        );
      });
    } catch (e) {
      alert('Error in AirporteRoute in Catch Line 677', e);
    }
  };

  React.useEffect(() => {
    console.log("PROPS*************", props.route.params.navigateFrom, props.route.params.beatName)
    if (props.route.params.navigateFrom == 'roaster_plan') {
      setIsRosterPlan(true);
      fetchAllRoasterOutlets();
    }
    else if (props.route.params.navigateFrom == 'checkout' && props.route.params.beatName == '') {
      setIsRosterPlan(true);
      fetchAllOutlets();
    }
    else if (props.route.params.navigateFrom == 'checkout') {
      fetchAllOutlets();
    }
    else if (
      props.route.params.navigateFrom == 'start_beat' ||
      props.route.params.navigateFrom == 'view_beat'
    ) {
      fetchAllOutlets();
    } else {
      console.log('In else in AirportRoute Line 668');
    }
  }, []);

  const getOutlets = async status => {
    try {
      await db.transaction(async tx => {
        await tx.executeSql(
          `SELECT Out.*,Outyp.* FROM Outlets as Out join OutletsTypes as Outyp on Out.Id=Outyp.OutlettypeId where Out.BeatStatus='${status}'`,
          [],
          (tx, results) => {
            console.log('errr', tx);
            console.log('result Line 141--->', results);
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i) {
              temp.push(results.rows.item(i));
            }
            alert(JSON.stringify(temp));
            if (status == 'Pending') {
              setPendingOutlets(temp);
            } else {
              setCompletedOutlets(temp);
            }
            console.log('Data returned From Outlets SQLITE ----->', temp);
          },
        );
      });
    } catch (e) {
      alert(e);
    }
  };

  const filterClickOnDoneFunction = async attribute_value => {
    var qry = '';
    if (attribute_value == 'Alphabetically A to Z') {
      qry = `SELECT Out.*,Outyp.* FROM Outlets as Out join OutletsTypes as Outyp on Out.Id=Outyp.OutlettypeId where Out.BeatStatus='Pending' order by Out.OutletName`;
    } else if (attribute_value == 'Alphabetically Z to A') {
      qry = `SELECT Out.*,Outyp.* FROM Outlets as Out join OutletsTypes as Outyp on Out.Id=Outyp.OutlettypeId where Out.BeatStatus='Pending' order by Out.OutletName desc`;
    } else if (attribute_value == 'Recently Added') {
      qry = `SELECT Out.*,Outyp.* FROM Outlets as Out join OutletsTypes as Outyp on Out.Id=Outyp.OutlettypeId where Out.BeatStatus='Pending' Out.CreatedAt `;
    }

    // Out.CreatedAt
    try {
      await db.transaction(async tx => {
        await tx.executeSql(qry, [], (tx, results) => {
          console.log('errr', tx);
          console.log('result Line 141--->', results);
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
          }
          setPendingOutlets(temp);
          console.log(
            'Data returned From Outlets SQLITE filterClickOnDoneFunction pending Outlets----->',
            temp,
          );
        });
      });
    } catch (e) {
      alert(e);
    }
  };

  const handleClickOnBeat = async () => {
    // alert('hi')
    if (network) {
      if (props.route.params.beatId != 'fromEndBeat') {
        props.navigation.push('SyncDataScreen', {
          navigateFrom: 'AirportRoute',
          beatId: props.route.params.beatId,
          beatName: props.route.params.beatName,
        });
      } else {
        //   // Navigate To Dashboard and End the Beat
        await AsyncStorage.removeItem('@beatId');
        await AsyncStorage.removeItem('@beatName');
        await AsyncStorage.removeItem('@firstTime');
        await AsyncStorage.setItem('@beatStatus', JSON.stringify('Ended'));
        await AsyncStorage.removeItem('@beatDate');

        props.navigation.push('NewDashboard', {
          navigateFrom: 'EndBeat',
        });
      }
    } else {
      Alert.alert('Warning', 'No internet');
    }
  };

  const filtering = async search => {
    console.log('searching txt', search);
    //Index 1 means Pending Outlets
    if (index == 0) {
      var temp = pendingOutletsForSearch.filter(item => {
        return (
          item.OutletName.toLowerCase().includes(search.toLowerCase()) ||
          item.OutletCode.toLowerCase().includes(search.toLowerCase())
        );
      });
      setPendingOutlets(temp);
    } else {
      var temp = completedOutletsForSearch.filter(item => {
        return (
          item.OutletName.toLowerCase().includes(search.toLowerCase()) ||
          item.OutletCode.toLowerCase().includes(search.toLowerCase())
        );
      });
      setCompletedOutlets(temp);
    }
  };

  var beatNamee = '';
  var beatIdd = '';
  try {
    beatNamee = props.route.params.beatName;
    beatIdd = props.route.params.beatId;
  } catch (e) { }

  return (
    <View style={{ ...styles.MainView2, backgroundColor: themecolor.THEMECOLOR }}>
      {loader ? (
        <>
          <LoaderAllInOne />
        </>
      ) : (
        <></>
      )}
      <StatusBar translucent backgroundColor="transparent" />
      <View style={{ ...styles.SecondView, backgroundColor: themecolor.HEADERTHEMECOLOR }}>
        <View style={{ ...styles.ThirdView }}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => handleBackButtonClick()}>
            {/* onPress={() => props.navigation.goBack()}> */}
            <Image
              source={require('../../assets/images/back.png')}
              style={{ ...styles.BackIcon, top: -2 }}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
          <View style={{ width: width * 0.84 }}>
            {index == 0 ? (
              <Text style={{ ...styles.Text, top: 2 }}>
                {isRosterPlan ? 'Roster plan' : beatNamee}{' '}
                {`(${PendingOutlets.length})`}
                {/* {`${beatNamee} (${PendingOutlets.length})`} */}
              </Text>
            ) : (
              <Text style={{ ...styles.Text, top: 2 }}>
                {isRosterPlan ? 'Roster plan' : beatNamee}{' '}
                {`(${completedOutlets.length})`}
              </Text>
            )}
            {/* <Text style={{...styles.Text, top: 2}}>{`${beatNamee} `}</Text> */}
            {/* <Text style={{...styles.Text, top: 2}}>{`${beatNamee} (${PendingOutlets.length})`}</Text> */}
          </View>

          {/* <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => setClickOnFilter(true)}
            // onPress={() => refRBSheet1.current.open()}
            >
            <Image
              source={require('../../assets/images/dashboard_filter.png')}
              style={styles.FilterIcon}
              resizeMode={'contain'}
            />
          </TouchableOpacity> */}
        </View>
      </View>
      <View style={styles.MV} />
      <View style={{
        width: width * 0.94,
        alignSelf: 'center',
        backgroundColor: Colors.white, borderRadius: 5,
        borderColor: Colors.borderColor, backgroundColor: themecolor.TRIP,
      }}>
        <SegmentedControlTab
          values={['Pending', 'Completed']}
          selectedIndex={selectedIndex}
          tabStyle={styles.tabStyle}
          activeTabStyle={{ ...styles.activeTabStyle, backgroundColor: themecolor.HEADERTHEMECOLOR }}
          tabsContainerStyle={{
            height: 45,
          }}
          tabTextStyle={{
            color: Colors.grey,
            fontFamily: FontFamily.PopinsMedium,
            fontSize: 14,
          }}
          activeTabTextStyle={{ color: '#FFF', fontSize: 14 }}
          onTabPress={handleSingleIndexSelect}
        />
      </View>
      <View style={styles.View93}>
        <View style={styles.MV} />

        {/* <View style={{ ...styles.SearchInputView, backgroundColor: '#FFF', borderColor: themecolor.BOXBORDERCOLOR1, borderWidth: 0.5 }}>
            <Text style={styles.PH10}>
              <FIcon name="search" size={15} />
            </Text>
            <TextInput
              onChangeText={text => filtering(text)}
              placeholder="Search Outlets"
              style={styles.InputText}
            />
          </View> */}
        <View
          style={{
            backgroundColor: 'white',
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 10,
            backgroundColor: themecolor.BOXTHEMECOLOR,
            borderColor: themecolor.BOXBORDERCOLOR1,
            borderWidth: 0.5,
            width: width * 0.94,
            alignSelf: 'center'
          }}>
          <Text style={{ paddingHorizontal: 10 }}>
            <FIcon name="search" size={15} color={themecolor.AV2} />
          </Text>
          <TextInput
            onChangeText={text => filtering(text)}
            placeholder="Search"
            style={{
              width: width * 0.8,
              fontFamily: FontFamily.PopinsRegular,
              color: themecolor.AV2
            }}
            placeholderTextColor={themecolor.AV2}
          />
        </View>

        <View
          showsVerticalScrollIndicator={false}
          style={{ height: height * 0.6 }}>
          {index == 0 ? (
            <>
              <BeatOutletsList
                props={props}
                beatOutlet={PendingOutlets}
                beatOutletType={beatOutletType}
                beatName={beatNamee}
                beatId={beatIdd}
              />
            </>
          ) : (
            <>
              <BeatOutletsList
                props={props}
                beatOutlet={completedOutlets}
                beatOutletType={beatOutletType}
                beatName={beatNamee}
                beatId={beatIdd}
              />
            </>
          )}
        </View>
      </View>
      {props.route.params.navigateFrom != 'roaster_plan' && !isRosterPlan ? (
        <>
          <View style={{ justifyContent: 'center', alignSelf: 'center', paddingTop: 8 }}>
            <FullsizeButton backgroundColor={themecolor.HEADERTHEMECOLOR} title="End Beat" onPress={() => handleClickOnBeat()} />
          </View>
        </>
      ) : (
        <></>
      )
      }
      {/* Filter Sheet */}
      <FilterRBsheetComponent
        clickOnFilter={clickOnFilter}
        setClickOnFilter={setClickOnFilter}
        filterClickOnDoneFunction={filterClickOnDoneFunction}
        loader={loader}
        setLoader={setLoader}
        onShow={'AirportRoute'}
      />
    </View >
  );
}
