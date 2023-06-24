
import NetInfo from '@react-native-community/netinfo';
import React, {useEffect, useState} from 'react';
import {Animated} from 'react-native';
import {useDispatch} from 'react-redux';
let unsubscribe = '';
export default function NetInfoComponent(props) {
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
    }).start();
  }, [isConnected]);

  useEffect(() => {
    unsubscribe = NetInfo.addEventListener(async state => {
      console.log('inside unsubscribe...>>>', state.isConnected);
      if (state.isConnected) {
        dispatch({type: 'SET_NETWORK', payload: true});
      } else {
        dispatch({type: 'SET_NETWORK', payload: false});
      }
    });
  }, []);


  return null;
}


