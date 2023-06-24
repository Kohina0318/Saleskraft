import { StyleSheet, Dimensions } from 'react-native';
import { FontFamily } from '../fonts/FontFamily';
import { FontSize } from '../fonts/Fonts';
import { Colors } from '../config/Colors';
const { width } = Dimensions.get('screen');
import Color from '../../components/Theme/ThemeDarkLightColor';

const styles = StyleSheet.create({
  efooter: {
    backgroundColor:Color.Color.THEMECOLOR,
    height: 75,
    elevation: 5,
    shadowColor: { width: 5, height: 5 },
    justifyContent: 'space-around',
    alignItems: 'center',
    width: width,
    flexDirection: 'row',
    // backgroundColor: '#FFF',
    // borderRadius: 10,
    padding: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0
  },
  footertouchv: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 41,
    height: 41,
    backgroundColor: Colors.StockIn,
    borderRadius: 50,
  },
  footerimg: { width: 22, height: 22 },
  footertext: {
    fontFamily: FontFamily.PopinsMedium,
    fontSize: FontSize.labelText,
    color:Color.Color.TXTWHITE
  },
  footerv: { justifyContent: 'center', alignItems: 'center' },
  mainContainer: {
    flex: 1,
  },
  header: {
    flex: 0.18,
    backgroundColor: Colors.bluetheme,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  body: { flex: 0.82, position: 'relative', backgroundColor: Colors.mainbg },
  flatContainer: {
    backgroundColor: '#FFFFFF',
    width: width * 0.93,
    marginTop: 10,
    padding: 7,
    borderRadius: 15,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.borderColor,
    marginBottom: 1,
  },
  headerChildOne: {
    flex: 0.65,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingTop: 5,
  },
  headerTabContainer: {
    flex: 0.35,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerTab: {
    borderRadius: 15,
    padding: 5,
    width: width / 3.5,
    height: 37,
    justifyContent: 'center',
    alignItems: 'center',
  },
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  margleft: { marginLeft: 15 },
  wh: { width: 25, height: 20 },
  txt: {
    color: 'white',
    marginLeft: 10,
    fontSize: FontSize.labelText5,
    fontWeight: '400',
  },
  margins: { marginTop: 20, marginRight: 13 },
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
    marginTop: 2,
  },
  txt3: {
    fontSize: 12,
    fontFamily: FontFamily.PopinsRegular,
    color: '#121327',
    marginLeft: 5,
  },
  touchview: {
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

  ExpenseNewCard: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: width * 0.9,
    backgroundColor: Colors.white,
    top: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.borderColor1,
    alignItems: 'center',
    paddingTop: 10
  },
  TripCount: {
    color: Colors.bluetheme,
    fontSize: FontSize.labelText5,
    fontFamily: FontFamily.Popinssemibold,
    top: 5,
  },
  TripText: {
    color: Colors.black,
    fontSize: FontSize.labelText,
    fontFamily: FontFamily.PopinsMedium,
  },
  MainVIewFL: {
    flex: 1,
    height: 40,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  CENTERFLEX: { justifyContent: 'center', alignSelf: 'center', flex: 1 },
  CENTERFLEX1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    // backgroundColor:'blue',
    // width:'100%'
  },
  WIDTH1: { width: width * 0.05, justifyContent: 'center', alignItems: 'center', },
  WIDTH6: { width: width * 0.55, marginLeft: 3 },
  MainText: {
    fontSize: FontSize.labelText3,
    color: Colors.black,
    fontFamily: FontFamily.PopinsMedium,
  },
  TripCountText: {
    width: width * 0.25,
    justifyContent: 'flex-end',
    alignSelf: 'center',
    flexDirection: 'row',
    // backgroundColor:'red'

  },
  TextBLue: {
    fontSize: FontSize.labelText,
    color: Colors.bluetheme,
    fontFamily: FontFamily.PopinsRegular,
  },
  DailyCallView: {
    flexDirection: 'row',
    width: width * 0.9,
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  CardTextDC: {
    fontSize: FontSize.labelText3,
    fontFamily: FontFamily.PopinsMedium,
    color: Colors.black,
    alignSelf: 'center',
    top: 10,
  },
  CustomSelect: {
    width: 'auto',
    alignSelf: 'center',
    backgroundColor: Colors.bluetheme,
    borderWidth: 1,
    overflow: 'hidden',
    borderColor: Colors.bluetheme,
    borderRadius: 15,
    top: 5,
  },
  CustomSelect2: {
    justifyContent: 'center',
    backgroundColor: Colors.bluetheme,
    width: 60,
    height: 20,
    alignSelf: 'center',
    padding: 3,
  },
  SIMPLEICON: {
    justifyContent: 'flex-end',
    position: 'absolute',
    alignSelf: 'flex-end',
    right: 8,
    color: '#FFF',
  },
  FontStyle: {
    fontSize: FontSize.verysmallText,
    color: Colors.white,
    fontFamily: FontFamily.PopinsRegular,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  optionContainer: {
    padding: 10,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 0.4,
  },
  text: {
    fontSize: 9,
    color: 'white',
  },

  //
});
export default styles;
