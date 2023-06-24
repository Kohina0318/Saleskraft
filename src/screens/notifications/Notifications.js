import { View, TouchableOpacity, Text, Image, } from 'react-native';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import Header_2 from '../../components/shared/Header_2';
import { gettripLocationApi } from '../../repository/trip/tripRepository';
import { NotificationFlatList } from './NotificationFlatList';
import NoData from '../../components/shared/NoData';
import styles from '../../assets/css/stylesDashboardBA';
import RBSheet from 'react-native-raw-bottom-sheet';
import { TripFilterSheet1 } from '../trip/TripFilterSheet';
import { SERVER_URL } from '../../repository/commonRepository';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

const Notifications = props => {

  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()

  const refRBSheet1 = useRef();

  // alert('hi')
  const [actionData, setActionData] = useState([]);
  const [nameData, setNameData] = useState([]);

  // alert(JSON.stringify(actionData))

  // =================================
  const [temp, setTemp] = useState('');
  const [done2, setDone2] = useState(false);
  const [sortBy, setSortBy] = useState(0);
  const [moduleName, setModuleName] = useState('');
  const [colorChange, setColorChange] = useState(1)
  const [getBaseUrl, setBaseUrl] = useState('')


  useEffect(() => {
    async function temp() {
      setBaseUrl(await SERVER_URL())
    }
    temp()
  }, [])

  // alert(actionData)
  const getNotification = async () => {
    const result = await gettripLocationApi(
      `api/getNotification?sort_by=${sortBy}&filter_by=${moduleName}`,
    );
    console.log('Notification data actions', result.data.Actions.emps);
    // alert(JSON.stringify(result))
    if (result.statusCode == 200) {
      setActionData(
        result.data.Actions.actions != undefined
          ? result.data.Actions.actions
          : null,
      );
      setNameData(
        result.data.Actions.length == 0
          ? result.data.Actions
          : result.data.Actions.emps,
      );
    }
  };

  const handleRemoveFilter = () => {
    refRBSheet1.current.close()
    setSortBy(0)
    setColorChange(1)
    setModuleName("")
  }

  // useEffect(() => {
  // }, []);

  useFocusEffect(
    useCallback(() => {
      getNotification();
    }, [])
  )

  return (
    <>
      <View style={{ backgroundColor: themecolor.THEMECOLOR, flex: 1 }}>
        <Header_2
          title="Notifications"
          onPress={() => props.navigation.goBack()}
          iconnameplus="filter"
          onPressIconPlus={() => {
            refRBSheet1.current.open();
          }}
        />

        <View>
          {actionData ? (
            <NotificationFlatList getBaseUrl={getBaseUrl} actionData={actionData} nameData={nameData} />
          ) : (
            <NoData message="No Notification" />
          )}
        </View>
      </View>

      <RBSheet
        ref={refRBSheet1}
        animationType={'slide'}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={300}
        customStyles={{
          container: {
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            padding: 10,
            backgroundColor: themecolor.RB2
          },
          draggableIcon: {
            display: 'none',
          },
        }}>
        <View style={styles.RBVIEW}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => handleRemoveFilter()}>
            <Image
              source={require('../../assets/images/close.png')}
              style={styles.CloseIcon}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
          <View>
            <Text style={{ ...styles.CardText, color: themecolor.TXTWHITE }}>Set Filters</Text>
          </View>
          <View>
            <View>
              {!done2 ? (
                <TouchableOpacity
                  activeOpacity={0.5}
                  // onPress={() => filterOnPressDone(triplisttemp, tripkeystemp)}
                  onPress={() => {
                    getNotification(), refRBSheet1.current.close();
                  }}>
                  <Text style={{ ...styles.RBText1, color: themecolor.TXTWHITE }}>Done</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  activeOpacity={0.5}
                  // onPress={() =>
                  //   filterOnPressDone(triplisttemp1, tripkeystemp1)
                  // }
                  onPress={() => {
                    getNotification(), refRBSheet1.current.close();
                  }}>
                  <Text style={{ ...styles.RBText1, color: themecolor.TXTWHITE }}>Done</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>

        <View style={{}}>
          <View style={styles.Width9}>
            <Text style={{ ...styles.CardText1, color: themecolor.TXTWHITE }}>Sort by</Text>
          </View>
          <TripFilterSheet1
            // setTriplisttemp={setTriplisttemp}
            // setTripkeystemp={setTripkeystemp}
            setDone2={setDone2}
            setActionData={setActionData}
            setNameData={setNameData}
            setTemp={setTemp}
            temp={temp}
            setSortBy={setSortBy}
            sortBy={sortBy}
          />
          <View>
            <Text style={{ ...styles.CardText1, color: themecolor.TXTWHITE }}>Module</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ height: 5 }} />
            <TouchableOpacity
              style={{
                paddingHorizontal: 10,
                borderWidth: 0.5,
                borderColor: themecolor.BOXBORDERCOLOR1,
                height: 35,
                borderRadius: 12,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 1 === colorChange ? themecolor.HEADERTHEMECOLOR : "#fff",
                marginLeft: 10,
              }}
              onPress={() => { setModuleName(''), setColorChange(1) }}>
              <Text style={{ fontSize: 10, color: 1 === colorChange ? 'white' : "#000" }}>All</Text>
            </TouchableOpacity>
            <View style={{ height: 5 }} />
            <TouchableOpacity
              style={{
                paddingHorizontal: 10,
                borderWidth: 0.5,
                borderColor: themecolor.BOXBORDERCOLOR1,
                height: 35,
                borderRadius: 12,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 2 === colorChange ? themecolor.HEADERTHEMECOLOR : "#fff",
                marginLeft: 10,
              }}
              onPress={() => { setModuleName('Trips'), setColorChange(2) }}>
              <Text style={{ fontSIze: 10, color: 2 === colorChange ? 'white' : "#000" }}>Trips</Text>
            </TouchableOpacity>
            <View style={{ height: 5 }} />
            <TouchableOpacity
              style={{
                paddingHorizontal: 10,
                borderWidth: 0.5,
                borderColor: themecolor.BOXBORDERCOLOR1,
                height: 35,
                borderRadius: 12,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 3 === colorChange ? themecolor.HEADERTHEMECOLOR : "#fff",
                marginLeft: 10,
              }}
              onPress={() => { setModuleName('Expenses'), setColorChange(3) }}>
              <Text style={{ fontSIze: 10, color: 3 === colorChange ? 'white' : "#000" }}>Expenses</Text>
            </TouchableOpacity>
            <View style={{ height: 5 }} />
            <TouchableOpacity
              style={{
                paddingHorizontal: 10,
                borderWidth: 0.5,
                borderColor: themecolor.BOXBORDERCOLOR1,
                height: 35,
                borderRadius: 12,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 4 === colorChange ? themecolor.HEADERTHEMECOLOR : "#fff",
                marginLeft: 10,
              }}
              onPress={() => { setModuleName('Events'), setColorChange(4) }}>
              <Text style={{ fontSIze: 10, color: 4 === colorChange ? 'white' : "#000" }}>Events</Text>
            </TouchableOpacity>
          </View>
        </View>
      </RBSheet>
    </>
  );
};

export default Notifications;
