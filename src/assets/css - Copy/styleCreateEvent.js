import { StyleSheet, Dimensions } from 'react-native';
import { FontFamily } from '../fonts/FontFamily';
import { FontSize } from '../fonts/Fonts';
import { Colors } from '../config/Colors';
const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
  MainView:
    { flex: 1, backgroundColor: Colors.mainbg },
  FontStyle:
  {
    fontSize: 13,
    color: Colors.black,
    fontFamily: FontFamily.PopinsRegular
  },
  container: {
    borderColor: 'grey',

  },
  header: {
    width: width,
    height: 100,
    backgroundColor: Colors.bluetheme,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    // flex:1
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',

  },
  text: {
    fontSize: 12
  },
  headerFooterContainer: {
    padding: 10,
    alignItems: 'center',

  },
  clearButton: {
    backgroundColor: 'grey', borderRadius: 5,
    overflow: 'hidden', marginRight: 10, padding: 5
  },
  optionContainer: {
    padding: 10,
    borderBottomColor: 'lightgrey',
    // borderBottomWidth: 0.4,
    borderRadius: 50,
    overflow: 'hidden'


  },
  optionInnerContainer: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 50,
    overflow: 'hidden'
  },
  box: {
    width: 15,
    height: 15,
    marginRight: 5,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 3,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  ChangeDoctorButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 20,
    width: width * 0.25,
    borderRadius: 50,
    alignSelf: 'center',
  },
  textStyle: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: FontSize.VText,
    fontFamily: FontFamily.PopinsMedium,
  },
  modalText: {
    marginBottom: 15,
    color: '#000',
    fontWeight: 'bold',
  },
  smalltext: {
    marginBottom: 30,
    fontSize: 12,
    color: '#000',
  },
  submittext: {
    fontSize: FontSize.h3,
    color: Colors.black,
    textAlign: 'center',
    width: width * 0.82,
    alignSelf: 'center',
    fontFamily: FontFamily.Popinssemibold,
  },
  submittextmini: {
    fontSize: FontSize.labelText,
    color: Colors.black,
    textAlign: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    fontFamily: FontFamily.PopinsRegular,
  },
  Text: {
    fontSize: FontSize.labelText4,
    fontFamily: FontFamily.PopinsRegular,
    color: Colors.white,
  },
  InputText: {
    fontSize: FontSize.labelText,
    height: 50,
    fontFamily: FontFamily.PopinsRegular,
    top: 2,
  },
  textContainer: {
    flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    height: 90,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    color: Colors.grey,
    overflow: 'hidden',
    backgroundColor: Colors.white,
  },
  QRIcon: {
    color: Colors.black,
    // left:5
  },
  positionbutton: {
    backgroundColor: Colors.bluetheme,
    borderRadius: 5,
    width: 'auto',
    height: 25,
    position: 'absolute',
    alignSelf: 'flex-end',
    top: 40,
    right: 10,
    paddingHorizontal: 5,
  },
  textStyleText: {
    fontSize: FontSize.labelText3,
    fontFamily: FontFamily.PopinsMedium,
    width: width * 0.85,
    height: 90,
    justifyContent: 'flex-start',
    textAlignVertical: 'top',
    top: 3,
    color: Colors.black,
  },

  item: {
    flex: 1,
    borderRadius: 3,
    margin: 2,
    width: '100%',
    borderWidth: 1,
    overflow: 'hidden',
    borderColor: Colors.borderColor,
  },

  center: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
  title: {
    fontSize: FontSize.labelText,
    fontFamily: FontFamily.PopinsMedium,
    color: Colors.black,
    lineHeight: 25,
  },
  title1: {
    fontSize: FontSize.smallText,
    fontFamily: FontFamily.PopinsMedium,
    color: Colors.grey,
    lineHeight: 25,
  },
  Borderline: {
    width: width * 0.9,
    justifyContent: 'center',
    alignSelf: 'center',
    borderWidth: 0.5,
    borderColor: Colors.borderColor,
  },
  LinearGradientStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    width: width * 0.9,
    borderRadius: 12,
    backgroundColor: Colors.bluetheme,
  },
  buttonText: {
    fontSize: FontSize.h4,
    textAlign: 'center',
    color: Colors.white,
    fontFamily: FontFamily.PopinsMedium,
  },
  tops:
    { top: 35 },
  view1:
  {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    padding: 15,
    top: 5,
  },
  img:
    { width: 25, height: 30 },
  img1:
    { width: width * 0.82 },
  heights:
    { height: height },
  marg5:
    { marginVertical: 5 },
  view2:
  {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  view3:
  {
    width: width * 0.9,
    justifyContent: 'center',
  },
  widths:
    { width: '100%' },
  heights1:
    { height: 20 },
  picker:
  {
    fontSize: 13,
    color: '#333',
    fontWeight: 'bold',
    height: 10,
  },
  picker1:
    { color: '#333', fontWeight: 'bold' },
  view4:
  {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  view5:
  {
    width: width * 0.44,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  new1:
  {
    fontSize: FontSize.labelText3,
    fontFamily: FontFamily.PopinsMedium,
    width: width * 0.78,
    height: 50,
    color: Colors.black,
    top: 3, width: width * 0.4, left: 7,
  },
  fonts:
  {
    fontSize: 11
  },
  calendar:
    { right: 6, fontSize: 14 },
  marg7:
    { marginVertical: 7 },
  view6:
  {
    justifyContent: 'center',
    alignSelf: 'center'
  },
  padding:
    { paddingVertical: 50 }

});

export default styles;  