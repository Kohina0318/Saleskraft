import { View, ActivityIndicator } from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {MyThemeClass} from '../../components/Theme/ThemeDarkLightColor';


export default function LoadingFullScreen(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();
 
    return (
        <>
          <View style={{ alignItems: 'center', justifyContent: 'center', alignSelf: 'center', flex: 1, backgroundColor: themecolor.THEMECOLOR  , width:'100%'}}>
              <ActivityIndicator size="large" color="#0000ff" />
          </View>
        </>
      );
    }
  