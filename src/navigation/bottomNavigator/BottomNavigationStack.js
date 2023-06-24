import * as React from 'react';
import {
  View,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainNavigatorstyle } from '../../assets/css/MainNavigatorstyle'
import { Image as ImageR } from 'react-native';
import {
  TransitionSpecs,
  HeaderStyleInterpolators,
} from '@react-navigation/stack';
import { Colors } from '../../assets/config/Colors';
import { FontFamily } from '../../assets/fonts/FontFamily';
import NewDashboard from '../../screens/dashboard/NewDashboard';
import ReportList from '../../screens/reportList/ReportList';
import Action from '../../screens/action/Action';
import ProfileNew from '../../screens/profile/ProfileNew';
import { useSelector } from 'react-redux';
import Color from '../../components/Theme/ThemeDarkLightColor';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';

const Tab = createBottomTabNavigator();
const MyTransition = {
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  headerStyleInterpolator: HeaderStyleInterpolators.forFade,
};

export default function BottomNavigationStack() {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()

  var scopes = useSelector(state => state.userRoles);
  var network = useSelector(state => state.network);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 52, backgroundColor: Color.Color.LOGINTHEMECOLOR, borderColor: Color.Color.BOXBORDERCOLOR, backgroundColor: themecolor.THEMECOLOR1, borderColor: themecolor.BOXBORDERCOLOR, keyboardHidesTabBar: true,
          labelStyle: MainNavigatorstyle.tab1,
          style: MainNavigatorstyle.tab2,
          animationEnabled: true,
          inactiveTintColor: Colors.gray,
          activeTintColor: themecolor.HEADERTHEMECOLOR,
          showLabel: true,
          fontFamily: FontFamily.PopinsMedium,
          headerShown: false,
        },
      }}>

      <Tab.Screen
        name="NewDashboard"
        component={NewDashboard}
        options={{
          MyTransition,
          tabBarLabel: `${scopes?.includes('home') ? 'Home' : 'DCR'}`,
          tabBarLabelStyle: ({ top: -4 }),
          tabBarIcon: ({ color, size, focused }) =>
            focused ? (
              <>
                <ImageR
                  source={require('../../assets/images/footermenu/home_selected.png')}
                  style={MainNavigatorstyle.bottomicon}
                />
                <View style={MainNavigatorstyle.tabbarbottomborder} />
              </>
            ) : (
              <>
                <ImageR
                  source={require('../../assets/images/footermenu/home_notselected.png')}
                  style={MainNavigatorstyle.bottomicon}
                />
              </>
            ),
          headerShown: false,
        }}
      />
      {scopes?.includes("action") || scopes?.includes("my_data") ?
        (
          <Tab.Screen
            name="Action"
            component={Action}
            animation="fade"
            options={{
              gestureEnabled: true,
              gestureDirection: 'horizontal',
              tabBarLabel: `${scopes?.includes('action') ? 'Action' : 'My Data'}`,
              tabBarLabelStyle: ({ top: -4 }),
              tabBarIcon: ({ color, size, focused }) =>
                focused ? (
                  <>
                    <ImageR
                      source={require('../../assets/images/footermenu/action-selected.png')}
                      style={MainNavigatorstyle.bottomicon}
                    />
                    <View style={MainNavigatorstyle.tabbarbottomborder} />
                  </>
                ) : (
                  <ImageR
                    source={require('../../assets/images/footermenu/action_notselected.png')}
                    style={MainNavigatorstyle.bottomicon}
                  />
                ),
              headerShown: false,
            }}
          />
        ) : (
          <></>
        )}

      {scopes?.includes("report") ?
        (
          <Tab.Screen
            name="ReportList"
            component={ReportList}
            options={{
              tabBarLabel: 'Report',
              tabBarLabelStyle: ({ top: -4 }),
              tabBarIcon: ({ color, size, focused }) =>
                focused ? (
                  <>
                    <ImageR
                      source={require('../../assets/images/footermenu/report_selected.png')}
                      style={MainNavigatorstyle.bottomicon}
                    />
                    <View style={MainNavigatorstyle.tabbarbottomborder} />
                  </>
                ) : (
                  <ImageR
                    source={require('../../assets/images/footermenu/report_notselected.png')}
                    style={MainNavigatorstyle.bottomicon}
                  />
                ),
              headerShown: false,
            }}
          />
        ) : (
          <></>
        )
      }

      {scopes?.includes("profile") ?
        (<>
          <Tab.Screen
            name="Profile"
            component={ProfileNew}
            options={{
              tabBarLabel: "Profile",
              tabBarLabelStyle: ({ top: -4 }),
              tabBarIcon: ({ color, size, focused }) =>
                focused ? (
                  <>
                    <ImageR
                      source={require('../../assets/images/footermenu/profile_selected.png')}
                      style={MainNavigatorstyle.bottomicon}
                    />
                    <View style={MainNavigatorstyle.tabbarbottomborder} />
                  </>
                ) : (
                  <ImageR
                    source={require('../../assets/images/footermenu/profile_notselected.png')}
                    style={MainNavigatorstyle.bottomicon}
                  />
                ),
              headerShown: false,
            }}
          />
        </>
        ) : (
          <></>
        )
      }

    </Tab.Navigator>

  )
}