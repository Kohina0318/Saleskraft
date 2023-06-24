import React, { useEffect, useState } from 'react';
import {
  TouchableOpacity,
  Image,
  StatusBar,
  View,
  Text,
  ScrollView,
} from 'react-native';
import { useSelector } from 'react-redux';
import styles from '../../assets/css/styleProfile';
import { getEmployeeId, SERVER_URL } from '../../repository/commonRepository';
import { gettripLocationApi } from '../../repository/trip/tripRepository';
import { ProfileDetails, Customer1, Customer2, ProfileDetailsShimmer, Customer1Shimmer } from './ProfileDataList';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
  interpolate,
} from "react-native-reanimated";
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';

export default function ProfileNew(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  const network = useSelector(state => state.network)
  const [selected, setselected] = useState(1);
  const [email, setEmail] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [designation, setDesignation] = useState('');
  const [picture, setPicture] = useState('');
  const [mobile, setMobile] = useState('');
  const [rsmdata, setRsmdata] = useState('');
  const [loader, setLoader] = useState(true);
  const [terrName, setTerrName] = useState('');
  const [reportingTo, setReportingto] = useState('');
  const [empCode, setEmpCode] = useState('');
  const [baseTarget, setBaseTarget] = useState('');
  const [getBaseUrl, setBaseUrl] = useState('');
  const [actionData, setActionData] = useState("")

  React.useEffect(() => {
    async function temp() {
      let urll = await SERVER_URL()
      setBaseUrl(urll);
    }
    temp()
  }, [])


  const fetchuserdata = async () => {
    try {
      if (network) {
        const empId = await getEmployeeId();
        const d = await gettripLocationApi(`api/getProfile?EmployeeId=${empId}`);
        if(d.statusCode == 200){
        console.log("data is 1 ", d.data.Reporting.length)

        let mngrFname = d.data.Reporting.length > 0 ? (d.data.Reporting[0].FirstName == "" || d.data.Reporting[0].FirstName == null || d.data.Reporting[0].FirstName == undefined) ? 'not available' : d.data.Reporting[0].FirstName?.slice(0,1).toUpperCase()+d.data.Reporting[0].FirstName?.slice(1,).toLowerCase() : 'not available';

        let mngrLname = d.data.Reporting.length > 0 ? (d.data.Reporting[0].LastName == "" || d.data.Reporting[0].LastName == null || d.data.Reporting[0].LastName == undefined) ? '' : d.data.Reporting[0].LastName?.slice(0,1).toUpperCase()+d.data.Reporting[0].LastName?.slice(1,).toLowerCase() : '';

        setDesignation(d.data.Designations.Designation != undefined && d.data.Designations?.Designation);
        setEmail(d.data.Email == null || d.data.Email == '' || d.data.Email == undefined ? 'not available' : d.data?.Email);
        setFname(d.data.FirstName == null || d.data.FirstName == '' || d.data.FirstName == undefined ? 'not available' : d.data?.FirstName);
        setLname(d.data.LastName == null || d.data.LastName == '' || d.data.LastName == undefined ? '' : d.data?.LastName);
        setPicture(d.data.ProfilePicture == null || d.data.ProfilePicture == '' || d.data.ProfilePicture == undefined ? '' : d.data?.ProfilePicture);
        setMobile(d.data.Phone == null || d.data.Phone == '' || d.data.Phone == undefined ? 'not available' : d.data?.Phone);
        setRsmdata(d.data?.Reporting);
        setTerrName(d.data.TerritoriesRelatedByTerritoryId.TerritoryName == undefined || d.data.TerritoriesRelatedByTerritoryId.TerritoryName == '' || d.data.TerritoriesRelatedByTerritoryId.TerritoryName == null ? 'not available' : d.data.TerritoriesRelatedByTerritoryId?.TerritoryName);
        setReportingto(mngrFname + " " + mngrLname);
        setEmpCode(d.data.EmployeeCode == null || d.data.EmployeeCode == '' || d.data.EmployeeCode == undefined ? '' : d.data?.EmployeeCode);
        setBaseTarget(d.data.BaseMtarget == null || d.data.BaseMtarget == '' || d.data.BaseMtarget == undefined ? 'not available' : d.data?.BaseMtarget);
        console.log('userss', d.data);
        setLoader(false);
       }
      } else {
        var d = await AsyncStorage.getItem('@userprofile');
        d = JSON.parse(d);
        setDesignation(d.data.Designations.Designation != undefined && d.data.Designations.Designation);
        setEmail(d.data.Email == null || d.data.Email == '' || d.data.Email == undefined ? 'not available' : d.data.Email);
        setFname(d.data.FirstName == null || d.data.FirstName == '' || d.data.FirstName == undefined ? 'not available' : d.data.FirstName);
        setLname(d.data.LastName == null || d.data.LastName == '' || d.data.LastName == undefined ? 'not available' : d.data.LastName);
        setPicture(d.data.ProfilePicture == null || d.data.ProfilePicture == '' || d.data.ProfilePicture == undefined ? '' : d.data.ProfilePicture);
        setMobile(d.data.Phone == null || d.data.Phone == '' || d.data.Phone == undefined ? 'not available' : d.data.Phone);
        setRsmdata(d.data.Reporting);
        setTerrName(d.data.TerritoriesRelatedByTerritoryId.TerritoryName == undefined || d.data.TerritoriesRelatedByTerritoryId.TerritoryName == '' || d.data.TerritoriesRelatedByTerritoryId.TerritoryName == null ? 'not available' : d.data.TerritoriesRelatedByTerritoryId.TerritoryName);

        let mngrFname = d.data.Reporting.length > 0 ? (d.data.Reporting[0].FirstName == "" || d.data.Reporting[0].FirstName == null || d.data.Reporting[0].FirstName == undefined) ? 'not available' : d.data.Reporting[0].FirstName?.slice(0,1).toUpperCase()+d.data.Reporting[0].FirstName?.slice(1,).toLowerCase() : 'not available';

        let mngrLname = d.data.Reporting.length > 0 ? (d.data.Reporting[0].LastName == "" || d.data.Reporting[0].LastName == null || d.data.Reporting[0].LastName == undefined) ? '' : d.data.Reporting[0].LastName?.slice(0,1).toUpperCase()+d.data.Reporting[0].LastName?.slice(1,).toLowerCase() : '';

        setReportingto(mngrFname+' '+mngrLname)
        setEmpCode(d.data.EmployeeCode == null || d.data.EmployeeCode == '' || d.data.EmployeeCode == undefined ? '' : d.data.EmployeeCode);
        setBaseTarget(d.data.BaseMtarget == null || d.data.BaseMtarget == '' || d.data.BaseMtarget == undefined ? 'not available' : d.data.BaseMtarget);
        console.log('userss', d.data);
        setLoader(false);
      }
    } catch (err) {
      console.log("Catch Error in Profile New, Error: ", err)
    }
  }


  useEffect(() => {
    const temp = async () => {
      try {
        const result = await gettripLocationApi('api/getNotification')
        if (result.statusCode == 200) {
          setActionData((result.data.Actions.actions != undefined) ? result.data.Actions.actions : 0)
        }
      } catch (err) {
        console.log("Catch Error on line 105 Profile New ", err)
      }
    }
    temp()
    // console.log("GET NOTIFICATION LENGTH>>>>>>>>>>>>>",actionData.length)
  }, [])

  useEffect(() => {
    fetchuserdata();
  }, [props]);

  const Ring = ({ delay }) => {
    const ring = useSharedValue(0);
    const ringStyle = useAnimatedStyle(() => {
      return {
        opacity: 0.9 - ring.value,
        transform: [
          {
            scale: interpolate(ring.value, [10, 150], [10, 150]),
          },
        ],
      };
    });

    ring.value = withDelay(
      delay,
      withRepeat(
        withTiming(1, {
          duration: 4000,
        }),
        -1,
        false
      )
    );

    return <Animated.View style={[styles.ring, ringStyle]} />;
  };

  return (
    <>
      <View style={{ ...styles.view6, backgroundColor: themecolor.THEMECOLOR }}>
        <StatusBar translucent backgroundColor={'transparent'} />
        <View style={styles.headerContainer}>
          <View style={{ ...styles.headerBackgroundImage, backgroundColor: themecolor.HEADERTHEMECOLOR }}>
            <View style={styles.view7}>
              <TouchableOpacity
                // activeOpacity={1}
                style={{ zIndex: 9999 }}
                onPress={() => props.navigation.goBack()}>
                <Image
                  source={require('../../assets/images/back.png')}
                  style={styles.HW}
                  resizeMode={'contain'}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={{ zIndex: 99999, }}
                onPress={() => props.navigation.navigate('Notifications')} >
                {actionData.length > 0 ?
                  <View style={{ zIndex: 77868686 }}>
                    <Ring delay={0} />
                    <Ring delay={1000} />
                    <Ring delay={2000} />
                    <Ring delay={3000} />
                    <View>
                      <Image
                        source={require('../../assets/images/dashboard/notifications.png')}
                        style={styles.BellIcon}
                        resizeMode={'center'}
                      /></View>
                  </View>
                  : <Image
                    source={require('../../assets/images/dashboard/notifications.png')}
                    style={styles.BellIcon}
                    resizeMode={'center'}
                  />}
              </TouchableOpacity>
            </View>

            <View style={styles.headerColumn}>

              {
                picture != null && picture != '' ?
                  (
                    loader ?
                      (<SkeletonPlaceholder>
                        <View style={styles.userImage}>
                        </View>
                      </SkeletonPlaceholder>) : (
                        <Image
                          style={styles.userImage}
                          source={{
                            uri: `${getBaseUrl}uploads/2/${picture}`,
                          }}
                        />)

                  ) : (

                    loader ?
                      (
                        <SkeletonPlaceholder>
                          <View style={styles.userImage}>
                          </View>
                        </SkeletonPlaceholder>
                      ) : (
                        <Image
                          source={require('../../assets/images/dummyuser.png')}
                          style={styles.userImage}
                          resizeMode={'cover'}
                        />
                      ))
              }

              {
                loader ?
                  (
                    <SkeletonPlaceholder>
                      <View style={{ flex: 1, zIndex: 9999 }}>
                        <View style={{ width: 200, height: 25, alignSelf: 'center', borderRadius: 10, top: 5 }} />
                        <View style={{ width: 120, height: 12, alignSelf: 'center', borderRadius: 10, top: 10 }} />
                      </View>
                    </SkeletonPlaceholder>
                  ) : (

                    <View style={styles.view8}>
                      <View style={styles.align1}>
                        <Text style={styles.txt}>
                          {fname} {lname}
                        </Text>
                        <Text style={styles.txt1}>{designation}</Text>
                      </View>
                    </View>
                  )
              }

            </View>
          </View>
        </View>
        <View style={styles.marg4} />
        <View style={{ ...styles.view9, backgroundColor: themecolor.THEMECOLOR1 }}>

          <View style={styles.view10}>

            <TouchableOpacity
              activeOpacity={1}
              onPress={() => setselected(1)}
              style={{
                justifyContent: 'center',
                borderBottomColor: selected == 1 ? '#4261f7' : '#FFF',
                height: 50,
                alignSelf: 'center',
                borderBottomWidth: 3,
                width: 100,
              }}>
              <Text
                style={{
                  ...styles.CardText,
                  color: selected == 1 ? '#4261f7' : '#c1c1c1',
                  top: 3,
                }}>
                Profile Details
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={1}
              onPress={() => setselected(2)}
              style={{
                justifyContent: 'center',
                borderBottomColor: selected == 2 ? '#4261f7' : '#FFF',
                height: 50,
                alignSelf: 'center',
                borderBottomWidth: 3,
                width: 100,
              }}>
              <Text
                style={{
                  ...styles.CardText,
                  color: selected == 2 ? '#4261f7' : '#c1c1c1',
                  top: 3,
                }}>
                Contacts
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={1}
              onPress={() => setselected(3)}
              style={{
                justifyContent: 'center',
                borderBottomColor: selected == 3 ? '#4261f7' : '#FFF',
                height: 50,
                alignSelf: 'center',
                borderBottomWidth: 3,
                width: 100,
              }}>
              <Text
                style={{
                  ...styles.CardText,
                  color: selected == 3 ? '#4261f7' : '#c1c1c1',
                  top: 3,
                }}>
                Distributors
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.view11}>
            {/* Profile Details Start */}
            {
              selected == 1 ?
                (
                  <>
                    {loader ?
                      (
                        <ProfileDetailsShimmer email={email} mobile={mobile} terrName={terrName} reportingTo={reportingTo} empCode={empCode} baseTarget={baseTarget} />
                      )
                      : (
                        <ProfileDetails email={email} mobile={mobile} terrName={terrName} reportingTo={reportingTo} empCode={empCode} baseTarget={baseTarget} />
                      )}
                  </>
                ) : (
                  <></>
                )}
            {/* Profile Details end */}


            {/* Contacts Start */}
            {
              selected == 2 ?
                (
                  <>
                    {
                      loader ?
                        (
                          <Customer1Shimmer />
                        )
                        : (<Customer1 data={rsmdata} loader={loader} />)
                    }
                  </>
                )
                :
                (
                  <>
                  </>
                )}

            {/* Contacts End */}

            {/* Distributors Start */}

            {
              selected == 3 ?
                (
                  <>
                    {
                      loader ?
                        (
                          <Customer1Shimmer />
                        )
                        : (<Customer2 />)
                    }
                  </>
                )
                :
                (
                  <>
                  </>
                )}

            {/* Distributors End */}

          </View>
          <View style={styles.marg150} />
        </ScrollView>
      </View>
    </>
  );
}
