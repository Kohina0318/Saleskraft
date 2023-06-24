import { StyleSheet, Dimensions, StatusBar } from 'react-native';
import { Colors } from '../../assets/config/Colors';
import { FontFamily } from '../fonts/FontFamily';
import { FontSize } from '../fonts/Fonts';
const { width, height } = Dimensions.get('screen');

export default StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: Colors.bluetheme,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    justifyContent: 'flex-end',
  },
  cheader: {
    flexDirection: 'row',
    paddingVertical: 10,
    width: width * 0.92,
    alignSelf: 'center',
  },
  htitle: {
    fontFamily: FontFamily.PopinsMedium,
    color: Colors.white,
    marginLeft: 10,
    fontSize: FontSize.h4,
  },
  body: {
    // flex: 1,
    width: width * 0.92,
    alignSelf: 'center',
    // backgroundColor: 'lightblue',
  },
  flatContainer: {
    backgroundColor: '#FFFFFF',
    width: width * 0.93,
    marginTop: 10,
    padding: 4,
    borderRadius: 15,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.borderColor,
    marginBottom: 1,
  },
  padding: { padding: 8 },
  img: { width: 70, height: 70, borderRadius: 50 },
  margleft10: { marginLeft: 10 },
  txt1: {
    fontSize: 14,
    fontFamily: FontFamily.Popinssemibold,
    color: '#121327',
  },
  txt2: {
    fontSize: 12,
    color: '#121327',
    marginTop: -1,
  },
  view1: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginTop: 2,
  },
  txt3: {
    fontSize: 12,
    fontFamily: FontFamily.PopinsRegular,
    color: '#121327',
    marginLeft: 5,
  },
  textContainerr: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    // width: width * 0.8,
    // alignSelf: 'center',
    borderRadius: 10,
    height: 45,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    color: Colors.grey,
    overflow: 'hidden',
    fontFamily: FontFamily.Popinssemibold,
  },
  type: { fontFamily: FontFamily.PopinsMedium, color: '#444850', fontSize: 13 },
  typem: {
    width: width * 0.93,
    justifyContent: 'center',
    marginTop: 5,
    alignSelf: 'center',
  },
  media: { backgroundColor: Colors.borderColor1, height: 40, width: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  ti: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 11,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    position: 'relative',
    overflow: 'hidden',
  },
  CardText: {
    fontSize: FontSize.labelText3,
    fontFamily: FontFamily.PopinsMedium,
    color: Colors.black,
    alignSelf: 'center',
  },
  LinearGradientStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 55,
    width: width * 0.8,
    borderRadius: 12,
  },
  buttonText: {
    fontSize: FontSize.h4,
    textAlign: 'center',
    color: Colors.white,
    fontFamily: FontFamily.PopinsMedium,
    // textTransform:'uppercase'
  },
});
