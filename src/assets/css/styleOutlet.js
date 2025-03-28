import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../../assets/config/Colors';
import { FontFamily } from '../fonts/FontFamily';
import { FontSize } from '../fonts/Fonts';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
const { width } = Dimensions.get('screen');

export default StyleSheet.create({
  textStyle: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: FontSize.labelText,
    fontFamily: FontFamily.PopinsMedium,
  },
  RadioVIew: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  RadioText: {
    top: 10,
    fontFamily: FontFamily.PopinsRegular,
    color: Colors.black,
    fontSize: FontSize.labelText,
  },
  ChangeDoctorButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    alignSelf: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    // backgroundColor:themecolor.RB2,
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
  modalView1: {
    margin: 25,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    height:185
  },
  modalView2: {
    margin: 25,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    height:460
  },
  submittext: {
    fontSize: FontSize.h4,
    color: Colors.black,
    textAlign: 'center',
    width: width * 0.82,
    alignSelf: 'center',
    fontFamily: FontFamily.Popinssemibold,
    top: 5,
  },
  submittext1: {
    fontSize: FontSize.labelText2,
    color: Colors.black,
    width: width * 0.8,
    fontFamily: FontFamily.Popinssemibold,
    // top: 5,
  },
  submitundertext1: {
    fontSize: FontSize.labelText2,
    color: Colors.black,
    width: width * 0.8,
    // top: 5,
  },
  btn1: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.bluetheme,
    width: width * 0.95,
    alignSelf: 'center',
    height: 45,
    borderRadius: 15,
    flexDirection: 'row',
  },
  btn2: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.bluetheme,
    width: width * 0.45,
    alignSelf: 'center',
    height: 45,
    borderRadius: 15,
    flexDirection: 'row',
    position: 'relative',
    bottom: -10
  },
  btn3: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.bluetheme,
    width: width * 0.45,
    alignSelf: 'center',
    height: 45,
    borderRadius: 15,
    flexDirection: 'row',
  },
  btn4: {
    alignItems: 'center',
    padding: 5,
    justifyContent: 'center',
    backgroundColor: Colors.bluetheme,
    width: width * 0.45,
    alignSelf: 'center',
    height: 45,
    borderRadius: 15,
    flexDirection: 'row',
  },
  btn4second: {
    alignItems: 'center',
    padding: 5,
    justifyContent: 'center',
    backgroundColor: Colors.bluetheme,
    width: width * 0.45,
    alignSelf: 'center',
    height: 45,
    borderRadius: 15,
  },
  backgroundVideo: {
    height: 250,
  },
  backgroundImageGif: {
    height: 200,
  },
  backgroundImageGifBell: {
    height: 200,
    width: 200,
    borderRadius: 150,
    justifyContent: 'center',
    alignSelf: 'center'
  },

  underlineStyleBase: {
    width: 55,
    height: 45,
    borderWidth: 0,
    borderRadius: 10,
    backgroundColor: Colors.Textinputbg,
    color: Colors.black,
  },
  underlineStyleHighLighted: {
    borderColor: '#03DAC6',
  },
  BtnFun1NextButtonText: {
    color: '#FFFFFF',
    marginRight: 7,
    fontWeight: 'bold',
    fontSize: 15,
  },
  BtnFunRightArrow: { width: 20 },
  BtnFunRightArrowAlign: { width: 20, right: 7 },
  BtnFunViewMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  FLexOne: { flex: 1 },
  ReturnMainVIew: {
    // flex: 0.11,
    height: 90,
    backgroundColor: Colors.bluetheme,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: 'center',
  },
  ReturnSecondView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginTop: 35,
  },
  FLex85: {flex: 0.85, flexDirection: 'row', alignItems: 'center'},
  MarginL8: {marginLeft: 8},
  BackArrow: {width: 25, height: 20},
  BackArrow1: {width: 20, height: 20},
  MarginL10: {marginLeft: 10},
  Flex15: {flex: 0.15},
  TitleOne: {
    color: '#FFFFFF',
    fontFamily: FontFamily.PopinsRegular,
    fontSize: 10,
  },
  TitleTwo: { color: '#FFFFFF', marginTop: -7 },
  NumberChange: { color: '#FFFFFF', fontFamily: FontFamily.Popinsbold },
  Flex08: { flex: 0.95 },
  Flex05: { flex: 0.1 },
  ModalViewWidth: { width: width * 0.8, height: 'auto', paddingBottom: 20 },
  ModalViewWidth1: { width: width * 0.8, height: 'auto', paddingBottom: 0 },
  ModelVideoCenter: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
  ModelTextSub: {
    fontSize: 12,
    fontFamily: FontFamily.PopinsMedium,
    textAlign: 'center',
    // color: '#000',
  },
  OTPINPUTVIEW: {width: '80%', height: 45, alignSelf: 'center'},
  MV2: {marginVertical: 2},
  MV5: {marginVertical: 5},
  FLexCenter: {flexDirection: 'row', justifyContent: 'center'},
  CLOSEBUTTON:{width:25,height:25,borderRadius:30,borderWidth:0.5,justifyContent:'center',alignItems:'center',},
  FLexLeft: {flexDirection: 'row', justifyContent: 'flex-start'},
  camView:
  {
    backgroundColor: 'white',
    height: 45,
    width: 45,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    color: Colors.grey,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center'
  },
  viewImage: { width: 50, height: 50, borderRadius: 10 },
  iconTouchableOpacity: { position: 'absolute', right: -5, top: -5 },
  FLexCenterCustom: { justifyContent: 'space-around', width: width * 0.55, alignSelf: 'center' },
  ModelSubmitButton: {
    height: 30,
    width: width * 0.2,
    top: 10,
    backgroundColor: Colors.bluetheme,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ModelCencelButton: {
    height: 30,
    width: width * 0.2,
    top: 10,
    backgroundColor: Colors.white,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyleGrey: {
    color: Colors.grey,
    textAlign: 'center',
    fontSize: FontSize.labelText,
    fontFamily: FontFamily.PopinsMedium,
  },
  ModelDoneButton: {
    height: 45,
    width: width * 0.3,
    top: 10,
    backgroundColor: Colors.bluetheme,
    borderRadius: 18,
    justifyContent: 'center',
  },
  textStyleDone: {
    color: Colors.white,
    textAlign: 'center',
    fontSize: FontSize.labelText3,
    fontFamily: FontFamily.PopinsMedium,
  },
  SteperOneView: {
    borderRadius: 60,
    overflow: 'hidden',
    width: 100,
    height: 100,
  },
  unSelectedText: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 13,
    opacity: 0.5,
  },
  flatliststyle: {
    backgroundColor: '#FFFFFF',
    margin: 7,
    width: width * 0.44,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    // elevation: 2,
    // shadowColor: 'black',
    // position: 'relative',
  },
  visibletick: {
    position: 'absolute',
    right: 10,
    top: 10,
    display: 'flex',
  },
  hiddentick: {
    position: 'absolute',
    right: 10,
    top: 10,
    display: 'none',
  },
  selectedImage: {
    width: 100,
    height: 100,
    // opacity: 2,
    borderRadius: 50
  },
  unSelectedImage: {
    width: 100,
    height: 100,
    opacity: 0.55,
    borderRadius: 50
  },
  selectedText: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 13,
    opacity: 1,
  },
  TickImage: { width: 23, height: 23 },
  StepOneFlatList: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.mainbg,
  },
  MT: { marginTop: 8 },
  StepTwoView: { width: width * 0.93, marginTop: 5 },
  StepTwoText: {
    fontFamily: FontFamily.PopinsMedium,
    color: '#444850',
    fontSize: 13,
  },
  StepTwoText2: {
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 0.5,
    borderColor: Colors.borderColor,
  },
  StepTwoTextInput: { width: '100%', borderRadius: 15 },
  ViewWidth93: { width: width * 0.93, marginTop: 5 },
  FlexRow: { flexDirection: 'row', flex: 1 },
  FLEX051: { flex: 0.5, justifyContent: 'center', alignItems: 'flex-start' },
  SalutationText: {
    fontFamily: FontFamily.PopinsMedium,
    color: '#444850',
    fontSize: 13,
  },
  Flex050: { flex: 0.5 },
  MRMRSText: { flexDirection: 'row', flex: 1, justifyContent: 'space-between' },
  MRVIEW: {
    flex: 0.48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  birthdate: {
    width: width * 0.93,
    alignSelf: 'center',
    marginTop: 5,
   
    // shadowColor: 'black',
    // shadowOpacity: 0.5,
    // shadowOffset: { width: 0, height: 5 },
  },
  inputmedia: {
    width: 55,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E9E9E9',
    borderRadius: 15,
    marginLeft: 5,
    borderWidth: 1,
    borderColor: Colors.borderColor,
  },
  textinput: {
    fontSize: FontSize.labelText3,
    fontFamily: FontFamily.PopinsMedium,
    width: width * 0.78,
    height: 50,
    color: Colors.black,
    backgroundColor: '#FFFFFF',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    height: 50,
    borderWidth: 0.5,
    borderColor: Colors.borderColor,
    overflow: 'hidden',
    // width:'100%'
  },
  textContainerRemark: {
    flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    height: 90,
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: Colors.borderColor,
    color: Colors.grey,
    overflow: 'hidden',
    backgroundColor: Colors.white,
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
    left: 5
  },
  genderView: {
    backgroundColor: Colors.bluetheme,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: Colors.borderColor,
  },
  textContainerV: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    height: 50,
    borderWidth: 0.5,
    borderColor: Colors.borderColor,
    overflow: 'hidden',
    alignSelf: 'center',
    flex: 0.48,
  },
  DateInput: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  DateText: { top: 3, width: '100%', left: 10, fontSize: 12 },
  DateLabel: { fontSize: 12 },
  DateIcon: { height: 17, width: 17, position: 'absolute', right: 10 },
  View1: { width: '100%', flexDirection: 'row', justifyContent: 'space-between' },
  FirstView45: {
    width: width * 0.45,
    backgroundColor: '#FFFFFF',
    borderRadius: 11,
    borderWidth: 0.5,
    borderColor: Colors.borderColor,
  },
  FIrstInputtext: { width: '100%', borderRadius: 15, left: 10 },
  ViewRetailer: { width: width * 0.93, justifyContent: 'center', marginTop: 5 },
  PicketItemStyle: { height: 20, width: '100%' },
  WIDTH100: { width: '100%' },
  PIS: {
    fontSize: 13,
    color: '#333',
    fontWeight: 'bold',
  },
  PIS2: { color: '#333', fontWeight: 'bold' },
  FLEXSTART: { alignItems: 'flex-start' },
  MAPVIEW: {
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 0.5,
    borderColor: Colors.borderColor,
    position: 'relative',

  },
  MAPVIEW2: {
    right: '2%',
    top: 11,
    backgroundColor: '#3962F8',
    borderRadius: 13,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    height: 22,
    position: 'absolute',
  },
  MAPIMAGE: { width: 12, height: 12 },
  MAPTEXT: { fontSize: 11, color: '#FFFFFF', marginLeft: 2, marginRight: 1 },
  DatePick: {
    backgroundColor: '#FFFFFF',
    width: width * 0.9,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  DatePickInput: { top: 3, width: '100%', left: 10, fontSize: 12, color: 'black', fontFamily: FontFamily.PopinsRegular },
  CalendarIcons: { height: 17, width: 17, position: 'absolute', right: 10 },
  StepThreeView: { borderRadius: 40, overflow: 'hidden' },
  StepFour: { flex: 1, padding: 7, backgroundColor: Colors.mainbg },
  TouchView: { marginTop: 7, flexDirection: 'row', flex: 1, marginBottom: 1 },
  RV: { justifyContent: 'center', alignItems: 'center', flex: 0.1 },
  StepView2: {
    flex: 0.88,
    marginLeft: 5,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 10,
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: Colors.borderColor,
  },
  StepViewTextFour: {
    fontFamily: FontFamily.PopinsMedium,
    color: Colors.black,
    marginLeft: 10,
    fontSize: FontSize.labelText4,
  },
  StepViewTextFour2: {
    fontSize: 12,
    color: Colors.grey,
    fontFamily: FontFamily.PopinsRegular,
    marginLeft: 10,
    marginTop: -5,
  },

  // RetailerCUstomer CSS
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
    padding: 5,
    borderRadius: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: Colors.borderColor,
    marginBottom: 1,
  },
  OUTLATENAMES:{
    fontSize: 12,
    fontFamily: FontFamily.Popinssemibold,
    color: '#121327',
    width:width*0.7
   },
   OUTLATENAMESMINI:{
    fontSize: 11,
    fontFamily: FontFamily.PopinsRegular,
    color: '#121327',
    width:width*0.7
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
    justifyContent: 'space-evenly',
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
  RSecondView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  PH: { paddingHorizontal: 10 },
  RetailerText: {
    color: 'white',
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '500',
  },
  SearchIconVIew: { marginTop: 20, marginRight: 13 },
  PendingTab: {
    fontFamily: FontFamily.PopinsMedium,
    fontSize: 13.5,
  },
  AddOutletCircle: {
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
  PlusImage: {
    justifyContent: 'center',
    alignSelf: 'center',
    height: 20,
    width: 20,
    overflow: 'hidden',
  },
  view3:
  {
    width: width * 0.8,
    justifyContent: 'center',
  },
  title: {
    fontSize: FontSize.labelText,
    fontFamily: FontFamily.PopinsMedium,
    color: Colors.black,
  },
  titleReport: {
    fontSize: FontSize.labelText5,
    fontFamily: FontFamily.PopinsMedium,
    color: Colors.black,
  },
  widths:
    { width: width * 0.82 },
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
  CameraView: { backgroundColor: Colors.GREY2, borderRadius: 10, width: 55, height: 55, justifyContent: 'center', alignSelf: 'center', top: 8, borderWidth: 1, borderColor: Colors.borderColor1 },
  ImageView: { width: 32, height: 32, alignSelf: 'center' },
});
