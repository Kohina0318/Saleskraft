/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Appbar} from 'react-native-paper';
import {fontSize} from '../../Config/FontSize';
import {FontType} from '../../Config/Fonts';

function AppHeader({navigation, scene}) {
  // console.log('scene', scene);
  // console.log('AppHeader... ', navigation.options);

  return (
    <Appbar.Header>
      <Appbar.BackAction onPress={() => navigation.goBack()} />
      <Appbar.Content
        title={scene.route.name}
        titleStyle={{
          fontFamily: FontType.regularFont,
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: fontSize.medium,
        }}
      />
    </Appbar.Header>
  );
}

export default AppHeader;
