import {
  View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState, useCallback } from 'react';
import { gettripLocationApi } from '../../repository/trip/tripRepository';
import PendingHeader from '../../components/shared/PendingHeader';
import DataList from '../../components/events/DataList';
import { getEmployeeId } from '../../repository/commonRepository';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';

export default ManagerEvent = props => {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  const [btnnum, setBtnnum] = useState(1);
  const [data, setData] = useState([]);
  const [dataforapproval, setDataofApproval] = useState([]);
  const [userData, setUserData] = useState({});
  const [eventTypes, setEventTypes] = useState([]);
  const [designationTypes, setDesignationTypes] = useState([]);
  // const [loader, setLoader] = useState(true);

  useFocusEffect(
    useCallback(() => {
      // alert(props.customDate)
      getAllEvents(`${props.customDate}`);
      getUserData();
      getAllEventsforApproval(props.customDate);
      getEventTypes();
      // setLoader(false)
    }, [props.customDate, btnnum]),
  );

  useEffect(() => {
    getDesignationTypes();
  }, []);

  const getUserData = async () => {
    // const user_d = await getUserProfile();
    const empId = await getEmployeeId();
    const d = await gettripLocationApi(`api/getProfile?EmployeeId=${empId}`);
    // console.log('data for test', d);
    let tempObj = {};
    tempObj['user_name'] =
      d.data.FirstName +
      ' ' +
      d.data.LastName
    tempObj['designation'] = d.data.Designations.Designation;
    tempObj['picture'] = d.data.ProfilePicture;
    // console.log('customize user details', tempObj);
    setUserData(tempObj);
    // const result = await gettripLocationApi('api/getProfile?EmployeeId=7')
  };

  const filterEvents = (data, status) => {
    return data.filter(i => {
      return i.EventStatus == status;
    });
  };

  const getAllEvents = async (date) => {
    // props.setLoder(true);
    // alert(date)
    try {
      // const curr_date = moment().format('DD-MM-YYYY');
      // alert(curr_date)
      const result = await gettripLocationApi(
        `api/getAllevent?start_date=${date}`,
      );
      // console.log('result of getevents', result);
      if (result.statusCode == 200) {
        let p_data = filterEvents(result.data, 1);
        // console.log("pending_data001", p_data)
        // alert(p_data.length)
        let a_data = filterEvents(result.data, 2);
        let r_data = filterEvents(result.data, 3);
        if (btnnum == 1) {
          setData(p_data);
        } else if (btnnum == 2) {
          setData(a_data);
        } else if (btnnum == 3) {
          setData(r_data);
        }
        // console.log('only 3 status', p_data);
      }
      // props.setLoder(false);
    } catch (e) {
      console.log('catch error', e);
      // props.setLoder(false);
    }
  };

  const getAllEventsforApproval = async (curr_date) => {
    props.setLoader(true)
    try {
      // const curr_date = moment().format('DD-MM-YYYY');
      const result = await gettripLocationApi(
        `api/getAllPendingApprovalEvent?start_date=${curr_date}`,
      );
      // console.log('result of getevents001', result);
      if (result?.statusCode == 200) {
        let p_data = filterEvents(result.data, 1);
        let a_data = filterEvents(result.data, 2);
        let r_data = filterEvents(result.data, 3);
        if (btnnum == 1) {
          setDataofApproval(p_data);
        } else if (btnnum == 2) {
          setDataofApproval(a_data);
        } else if (btnnum == 3) {
          setDataofApproval(r_data);
        }
        // console.log('only 3 status', p_data);
        // setLoader(false);
        props.setLoader(false)
      }
    } catch (e) {
      console.log('catch error', e);
      // setLoader(false);
    }
  };

  const getDesignationTypes = async () => {
    try {
      const result = await gettripLocationApi(`api/getDesignation`);
      if (result.statusCode == 200) {
        setDesignationTypes(result.data);
      } else {
        alert(result.message);
      }
    } catch (err) {
      alert(err);
    }
  };

  const getEventTypes = async () => {
    try {
      const result = await gettripLocationApi(`api/getEventTypes`);
      if (result.statusCode == 200) {
        // console.log("result.data456",result.data)
        setEventTypes(result.data);
      } else {
        alert(result.message);
      }
    } catch (err) {
      console.log(err);
    }
  };
  // const isDarkMode = (Appearance.getColorScheme() === 'dark')

  return (
    <View style={{ flex: 1, backgroundColor: themecolor.THEMECOLOR, }}>
      <PendingHeader
        setBtnnum={setBtnnum}
        btnnum={btnnum}
      />
      {/* <View style={{height: 10}} /> */}
      <View style={{ flex: 1, backgroundColor: themecolor.THEMECOLOR, }} >
        <DataList
          data={data}
          dataforapproval={dataforapproval}
          userData={userData}
          eventTypes={eventTypes}
          designationTypes={designationTypes}
        />
      </View>

      {/* <CreateButton onPress={() => props.navigation.navigate('CreateEvent')} /> */}
    </View>
  );
};

