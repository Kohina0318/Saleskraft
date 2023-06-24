import { View, Image, StyleSheet } from 'react-native';
import React from 'react';

export default function Loading() {
  return (
    <>
      <View style={{ alignItems: 'center', justifyContent: 'center', alignSelf: 'center', flex: 1 }}>

        <View style={[styles.container, styles.horizontal,]}>
          <Image
            style={{
              resizeMode: 'contain',
              alignSelf: 'center',
              height: 25
            }}
            source={require('../../assets/images/app,intro,splashscreen,login/saleskraftlogo.png')}
          />
          <Image
            style={{
              resizeMode: 'contain',
              alignSelf: 'center',
              height: 150
            }}
            source={require('../../assets/images/dots.gif')}
          />
          {/* <ActivityIndicator size="large" color="#0000ff" /> */}
        </View>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    // flexDirection: "row",
    // justifyContent: "space-around",
    padding: 10
  }
});