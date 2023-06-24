import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from '../../assets/config/Colors';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';
const { height } = Dimensions.get('window');

const SwitchButtons = props => {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  const [block, setBlock] = useState('');
  const [container, setContainer] = useState(props.component1);

  useEffect(() => {
    setBlock(1);
    setContainer(props.component1);
  }, []);

  return (
    <>
      <View style={{...styles.main,backgroundColor:'white',borderColor:themecolor.BOXBORDERCOLOR1,}}>
        <TouchableOpacity
          style={{
            ...styles.main2,
            backgroundColor: block == 1 ? themecolor.HEADERTHEMECOLOR : 'white',
            borderTopRightRadius: block == 1 ? 10 : 0,
            borderBottomRightRadius: block == 1 ? 10 : 0,
            // width: block == 1 ?'55%':'45%'
          }}
          onPress={() => {
            setBlock(1);
            setContainer(props.component1);
          }}>
          <Text style={{ color: block == 1 ? Colors.white : 'black' }}>Open</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            // backgroundColor: block == 2 ? themecolor.HEADERTHEMECOLOR : 'white',
            backgroundColor: block == 2 ? themecolor.HEADERTHEMECOLOR : 'white',
            ...styles.main3,
            borderTopLeftRadius: block == 2 ? 10 : 0,
            borderBottomLeftRadius: block == 2 ? 10 : 0,
            // width: block == 2 ?'55%':'45%'
          }}
          onPress={() => {
            setBlock(2);
            setContainer(props.component2);
          }}>
          <Text style={{ color: block == 2 ? Colors.white : 'black' }}>
            Close
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ height: height * 0.85, }}>{container}</View>
    </>
  );
};

export default SwitchButtons;

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    borderColor: Colors.bluetheme,
    borderWidth:1,
    height:45

  },
  main2: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  main3: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
});
