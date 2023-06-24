import { StyleSheet, Dimensions } from 'react-native';
const { height } = Dimensions.get('screen');

export default StyleSheet.create({
  MainView: {
    flex: 1,
    zIndex: 99999,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    paddingVertical: 300,
    backgroundColor: 'rgba(245, 245, 245, 0.9)',
    height: height * 1.0
  },
  IMGLOGO: {
    resizeMode: 'contain',
    alignSelf: 'center',
    height: 25
  },
  IMGGIFLOGO: {
    resizeMode: 'contain',
    alignSelf: 'center',
    height: 130
  },
  MV5: { marginVertical: 5 },
});
