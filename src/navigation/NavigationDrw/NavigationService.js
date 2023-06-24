import * as React from 'react';
import {ToastAndroid} from 'react-native';
import {DrawerActions} from '@react-navigation/native';
import {CommonActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const navigationRef = React.createRef();
export const navigate = (screen, params = {}) => {
  navigationRef.current?.navigate(screen, params);
};
export const navigateToHome = async screen => {
  navigationRef.current?.reset({
    index: 0,
    routes: [
      {
        name: screen,
      },
    ],
  });
  await AsyncStorage.clear();
  ToastAndroid.showWithGravityAndOffset(
    `${'Token Expired'}`,
    ToastAndroid.TOP,
    ToastAndroid.LONG,
    10,
    10,
  );
};
export const onServerError = async screen => {
  navigationRef.current?.reset({
    index: 0,
    routes: [
      {
        name: screen,
      },
    ],
  });
};

export const goBack = (screen, params = {}) => {
  navigationRef.current?.goBack();
};

export const goBackTwoScreen = num => {
  navigationRef.current?.pop(num);
};

export const openDrawer = navigation => {
  navigationRef?.dispatch(DrawerActions.openDrawer());
};

export const closeDrawer = navigation => {
  navigation.dispatch(DrawerActions.closeDrawer());
};

export function navigateToClearStack(routeName, params) {
  navigationRef.current?.dispatch(
    CommonActions.reset({
      index: 1,
      routes: [{name: routeName, params: params}],
    }),
  );
}
