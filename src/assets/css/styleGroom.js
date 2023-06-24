import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../../assets/config/Colors';
import { FontFamily } from '../fonts/FontFamily';
import { FontSize } from '../fonts/Fonts';
const { width } = Dimensions.get('screen');

export default StyleSheet.create({
  MainContainer: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: '#000',
    opacity: 0.9
  },
  Fbottom: {
    width: width,
    bottom: 40,
    position: 'absolute',
    flex: 1,
  },
  TextStyle: { fontFamily: FontFamily.PopinsMedium, fontSize: FontSize.labelText5, color: Colors.white, alignSelf: 'center' },
  TextStyleNote: { fontFamily: FontFamily.PopinsMedium, fontSize: FontSize.labelText, color: Colors.white, alignSelf: 'center' },
  NoteVIew: { width: width * 0.9, justifyContent: 'center', alignSelf: 'center' },
  MV5: { marginTop: 10 },
})