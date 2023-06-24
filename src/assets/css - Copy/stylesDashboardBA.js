import { Colors } from '../config/Colors';
import { FontFamily } from '../fonts/FontFamily';
import { FontSize } from '../fonts/Fonts';
import {
  Dimensions,
  StyleSheet,
} from 'react-native';
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  Text: {
    fontSize: FontSize.labelText5,
    fontFamily: FontFamily.PopinsRegular,
    color: Colors.white,
    left: -10
  },
  bg:
    { flex: 1, backgroundColor: Colors.mainbg },
  mainview:
  {
    height: 90,
    backgroundColor: Colors.bluetheme,
   borderBottomRightRadius:15,
   borderBottomLeftRadius:15,
  },
  viewtop:
    { top: 25 },
  innerview:
  {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    top: 5,
  },
  img:
    { width: 25, height: 30 },
  mainview1:
  {
    width: width * 0.8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  H:
    { height: height },
  view:
  {
    width: width * 0.92,
    alignSelf: 'center',
    height: 'auto',
  },
  returnview:
  {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: Colors.borderColor,
    alignItems: 'center',
    padding: 10,
    borderRadius: 12,
    marginTop: 8
  },
  innerview1:
  {
    borderRadius: 100,
    height: 55,
    width: 55,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor:'red',
    overflow:'hidden'
  },
  text:
  {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 25
  },
  margin:
    { marginLeft: 14 },
  text1:
  {
    fontFamily: FontFamily.Popinssemibold,
    color: Colors.black,
    top: 3
  },
  text2:
  {
    fontFamily: FontFamily.PopinsRegular,
    color: Colors.black,
    fontSize:FontSize.smallText,
    marginTop:2,
  },
  view1:
  {
    flexDirection: 'row',
    alignItems: 'center',
    bottom: 3
  },
  touchview:
  {
    width: 50,
    height: 50,
    backgroundColor: Colors.bluetheme,
    borderRadius: 100,
    justifyContent: 'center',
    alignSelf: 'flex-end',
    right: 10,
    position: 'absolute',
    bottom: 10,
  },
  bottomicon: {
    justifyContent: 'center',
    alignSelf: 'center',
    height: 20,
    width: 20,
    overflow: 'hidden',
  },

})

export default styles;