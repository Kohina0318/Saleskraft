/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Appbar} from 'react-native-paper';
import {Institute} from '../../Config/Institute';
import {FontType} from '../../Config/Fonts';
import {fontSize} from '../../Config/FontSize';
// import {openDrawer} from '../../Navigation/NavigationService';

function AppHeaderMain({scene, navigation}) {
  // console.log('scene', scene);
  // console.log('scene', scene);
  // console.log('====================================');
  // console.log({navigation});
  // console.log('====================================');
  // const headerTitle = scene.route.name;
  const headerTitle = Institute.name;

  return (
    <Appbar.Header style={{justifyContent: 'space-between'}}>
      <Appbar.Action icon={'menu'} onPress={() => navigation.openDrawer()} />

      {/* <Appbar.Content
        title={<Headline style={styles.titleStyle}>{headerTitle}</Headline>}
      /> */}
      <Appbar.Content
        title={headerTitle}
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

export default AppHeaderMain;
