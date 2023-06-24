import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomNavigationStack from '../bottomNavigator/BottomNavigationStack';
import DrawerContent from './DrawerContent';
const DrawerNav = createDrawerNavigator();

export default function DrawerNavigation(props) {
  return (
    <DrawerNav.Navigator
      drawerContent={() => <DrawerContent />}
      screenOptions={{
        drawerStyle: {
          backgroundColor: 'tranparent',
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          overflow: 'hidden',
        },
      }}
      initialRouteName="NewDashboard">
      <DrawerNav.Screen
        name="NewDashboard"
        component={BottomNavigationStack}
        options={{ headerShown: false }}
      />
    </DrawerNav.Navigator>
  );
}