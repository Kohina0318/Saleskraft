import { StyleSheet, Dimensions } from 'react-native';
import { FontFamily } from '../fonts/FontFamily';
import { FontSize } from '../fonts/Fonts';
import { Colors } from '../config/Colors';
const { width } = Dimensions.get('screen');

export default StyleSheet.create({
  SearcMainView: {
    backgroundColor: Colors.bluetheme,
    height: 100
  },
  SearchSecondView: {
    flexDirection: 'row',
    width: width * 0.9,
    alignSelf: 'center',
    marginVertical: 60
  },
  WIDTH8: { width: width * 0.8 },
  SearchBarComponent: { width: width * 0.92, alignSelf: 'center', flexDirection: 'row', backgroundColor: 'white', marginTop: 10, borderRadius: 10, height: 40 ,borderWidth:0.5},
  SearchIcon: { alignSelf: 'center', left: 10 },
  SearchTextInput: { left: 15, width: width * 0.75, fontFamily: FontFamily.PopinsRegular, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', top: 2 },
  MicIcon: { alignSelf: 'center', left: 0 },
  Close: { alignSelf: 'center', left: 12 },
  touchview:
    { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  MainVIews: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    padding: 10,
    width: width,
    alignSelf: 'center',
    backgroundColor: '#e9e9e9',
    elevation: 2
  },
  SearchText: { marginHorizontal: 10, fontFamily: FontFamily.PopinsMedium, fontSize: FontSize.labelText2, color: Colors.bluetheme1 },
  SearchText2: { fontFamily: FontFamily.PopinsMedium, fontSize: FontSize.labelText2, right: 5 },
  BlueView4Menu: {
    width: width,
    alignSelf: 'center',
    backgroundColor: '#e9e9e9',
    height: 40,
    elevation: 2
  },
  BlueView4MenuAlign: {
    justifyContent: 'space-around',
    flex: 1,
    flexDirection: 'row',
  },
  CardText: {
    fontSize: FontSize.labelText,
    fontFamily: FontFamily.PopinsMedium,
    color: Colors.black,
    alignSelf: 'center',
  },
});