/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import NetInfo from '@react-native-community/netinfo';
import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {
  Animated,
  StyleSheet,
  Image,
  Dimensions,
  // Text,
} from 'react-native';

let unsubscribe = '';
const {width, height} = Dimensions.get('window');
const deviceWidth = width < height ? width : height;

export default function NoInternetConnectionUI() {
  let [isConnected, closeModal] = useState(false);
  let [animation] = useState(new Animated.Value(0));
  const dispatch = useDispatch();

  useEffect(() => {
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isConnected ? 1 : 0,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [isConnected]);

  const slideUp = {
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [1 * 900, -1 * 0],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  useEffect(() => {
    unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected) {
        // Constants.NETWORK_CHECK = true;
        dispatch({type: SET_NETWORK, payload: true});
        // closeModal(false);
      } else {
        // Constants.NETWORK_CHECK = false;
        dispatch({type: SET_NETWORK, payload: false});
        // closeModal(true);
      }
    });
  }, []);

  return (
    <Animated.View style={[styles.mainContainer, slideUp]}>
      {/* <Text allowFontScaling={false} style={styles.offlineTextStyle}>
        {'Please check your internet connectivity'}
      </Text> */}
      <Image
        source={require('../../Screens/Assets/no_internet.webp')}
        style={{width: '100%', height: '60%'}}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  // mainContainer: {
  //   backgroundColor: '#CC0099',
  //   width: '100%',
  //   padding: 10,
  //   justifyContent: 'center',
  //   flexDirection: 'column',
  //   position: 'absolute',
  //   bottom: 0,
  // },
  // offlineTextStyle: {
  //   color: '#fff',
  //   fontSize: 15,
  //   fontFamily: 'Roboto',
  //   justifyContent: 'center',
  // },
  mainContainer: {
    backgroundColor: '#fbfbf6',
    width: '100%',
    height: '100%',
    padding: deviceWidth / 30,
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
  },
  offlineTextStyle: {
    // color: '#fff',
    fontSize: 16,
    fontFamily: 'Lato-Regular',
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
});
