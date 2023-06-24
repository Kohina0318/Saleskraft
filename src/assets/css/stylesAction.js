import { StyleSheet, Dimensions } from 'react-native';
import { FontFamily } from '../../assets/fonts/FontFamily';
import { FontSize } from '../../assets/fonts/Fonts';
import { Colors } from '../../assets/config/Colors';
const { width } = Dimensions.get('screen');

export default StyleSheet.create({
  imageH: {
    width: 90,
    height: 'auto',
    resizeMode: 'contain',
  },
  CardTextH: {
    fontSize: FontSize.labelText,
    fontFamily: FontFamily.PopinsMedium,
    color: Colors.black,
    alignSelf: 'center',
    textAlign: 'center',
  },
  Vikramcards: {
    alignSelf: 'center',
    height: 'auto',
    overflow: 'hidden',
  },
  Borderline: {
    width: width,
    justifyContent: 'center',
    alignSelf: 'center',
    borderWidth: 0.5,
    borderColor: Colors.borderColor,
  },
  Text: {
    fontSize: FontSize.small,
    fontFamily: FontFamily.PopinsRegular,
    color: Colors.white,
  },
  header: {
    width: width,
    height: 120,
    backgroundColor: Colors.bluetheme,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    // flex:1
    justifyContent: 'center',
    alignItems: 'center',
  },

  ViewWhite2: {
    alignSelf: 'center',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TOView: {
    width: 120,
    height: 120,
    margin: 2,
    borderRadius: 10,
    overflow: 'hidden',
    borderColor: Colors.borderColor,
    borderWidth: 1,
    justifyContent: 'center',
    backgroundColor: Colors.white,
    alignItems: 'center',
  },
  MainView:{flex: 1, backgroundColor: Colors.mainbg},
  Headers2:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    width: width,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    top: 20
  },
  Width1: { width: width * 0.1 },
  MenuIcon: { width: 20, height: 20 },
  ProfileIcon: {
    width: 35,
    height: 35,
    borderRadius: 50,
  },
  TextView: { width: width * 0.65, left: 5, top: 5 },
  BigText: {
    fontSize: FontSize.labelText4,
    fontFamily: FontFamily.PopinsRegular,
    color: Colors.white,
    top: -8,
  },
  MV5: { marginVertical: 5 },

});
