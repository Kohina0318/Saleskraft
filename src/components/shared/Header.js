import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Appearance
} from 'react-native';
import React, { useState, useEffect } from 'react';
import styles from '../../assets/css/stylesDashboard';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import TextTicker from 'react-native-text-ticker';
import { getEmployeeId, SERVER_URL } from '../../repository/commonRepository';
import { gettripLocationApi } from '../../repository/trip/tripRepository';
import { MyThemeClass } from '../Theme/ThemeDarkLightColor';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
  interpolate,
} from "react-native-reanimated";
import { useSelector } from 'react-redux';
import { getDatafromAsync, StoreDatatoAsync } from '../../repository/AsyncStorageServices';


export default function Header(props) {
  const network = useSelector(state => state.network);
  console.log("child render Header", props);
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  const [profilepicture, setProfilepicture] = useState('');
  const [fullname, setFullName] = useState('');
  const [actionData, setActionData] = useState("");
  const [serverUrl, setServerUrl] = useState("");

  const isDarkMode = (Appearance.getColorScheme() === 'dark')
  const navigation = useNavigation();
  useEffect(() => {
    console.log("USEEFFECT IN HEADER")
    function temp() {
      getUserpicture();
    }
    temp();
    return () => {
      console.log("Cleanup in Header 40")
    }
  }, [props]);


  async function getUserpicture() {
    try {
      if (!network) {
        const f_name = await getDatafromAsync('fstName')
        setFullName(f_name)
      } else {
        const empId = await getEmployeeId();
        const d = await gettripLocationApi(`api/getProfile?EmployeeId=${empId}`);
        if (d.statusCode == 200) {
          const f_name = d.data.FirstName?.slice(0, 1).toUpperCase() + d.data.FirstName?.slice(1,).toLowerCase()
          // const l_name = d.data.LastName.slice(0,1).toUpperCase()+d.data.LastName.slice(1,).toLowerCase()
          console.log("profilePicture001", d.data.ProfilePicture)
          setFullName(f_name)
          await StoreDatatoAsync('fstName', f_name);
          setProfilepicture(d.data.ProfilePicture != null && d.data.ProfilePicture);
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    async function temp() {
      try {
        const result = await gettripLocationApi('api/getNotification')
        setActionData((result.data.Actions.actions != undefined) ? result.data.Actions.actions : 0)
        console.log("GET NOTIFICATION LENGTH>>>>>>>>>>>>>", actionData.length)
        const url = await SERVER_URL()
     
        setServerUrl(url)
      } catch (err) {
        console.log("Catch Error", err)
      }
    }
    temp();
    return () => {
      console.log("Cleanup Line 66")
    }
  }, [])

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

  const [getBaseUrl, setBaseUrl] = React.useState('');

  React.useEffect(() => {
    async function temp() {
      setBaseUrl(await SERVER_URL())
    }
    temp()
  }, [])

  return (
    <View style={{ ...styles.header, height: props.height, backgroundColor: themecolor.HEADERTHEMECOLOR }}>
      <View style={styles.HeadView}>
        <View style={{ ...styles.Head2, height: 80 }}>
          <View style={styles.HeadSmallView}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
              <Image
                source={
                  isDarkMode == 0
                    ? require('../../assets/images/dashboard/hemburgermenu.png')
                    : require('../../assets/images/dashboard/hemburgermenu.png')
                }
                style={styles.Menu}
                resizeMode={'center'}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.ProfileIcon}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Profile')}>
            {profilepicture ? (
              <Image
                source={{
                  uri: `${getBaseUrl}/uploads/2/${profilepicture}`,
                }}
                style={styles.ProfileUser}
                resizeMode={'contain'}
              />
            ) : (
              <Image
                source={require('../../assets/images/dummyuser.png')}
                style={styles.ProfileUser}
                resizeMode={'cover'}
              />
            )}
          </TouchableOpacity>
          <View style={styles.TextGood}>

            {/* <Text style={{ ...styles.Text }}>
              {props.greeting} and Stay healthy!
            </Text> */}
            <TextTicker
              style={{ ...styles.Text}}
              duration={8000}
              loop
              bounce
              repeatSpacer={50}
              marqueeDelay={1000}>
              {props.greeting} and Stay healthy!
            </TextTicker>
            <TextTicker
              style={styles.TextGood2}
              duration={8000}
              loop
              bounce
              repeatSpacer={50}
              marqueeDelay={1000}>
              Hey {fullname}, how are you?
            </TextTicker>
          </View>

          <View style={styles.LastView}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => navigation.navigate('Notifications')}>
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
        </View>
      </View>
    </View>
  );
}

Header.defaultProps = {
  height: 'auto',
};