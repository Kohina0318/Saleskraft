/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Appbar} from 'react-native-paper';
import {Platform} from 'react-native';

function AppHeaderUser({tabname}) {
  return (
    <Appbar.Header>
      <Appbar.Content
        title={tabname}
        titleStyle={{
          fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'Poppins-SemiBold',
          justifyContent: 'center',
          alignItems: 'center',
          fontWeight: '500',
          textAlign: 'center',
          fontSize: 16,
          textTransform: 'uppercase',
        }}
      />
    </Appbar.Header>
  );
}

export default AppHeaderUser;
