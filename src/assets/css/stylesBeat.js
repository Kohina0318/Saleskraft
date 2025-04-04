import { StyleSheet, Dimensions } from 'react-native';
import { FontFamily } from '../../assets/fonts/FontFamily';
import { FontSize } from '../../assets/fonts/Fonts';
import { Colors } from '../../assets/config/Colors';
const { width, height } = Dimensions.get('screen');

export default StyleSheet.create({
  imageStyle: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  PH10:{paddingHorizontal: 10},
  InputText:{backgroundColor:'transparent', width: width * 0.8,fontFamily: FontFamily.PopinsRegular,top:2},
  CalendarView:{
    flexDirection: 'row',
    alignItems: 'center',
    left: -2,
  },
  imageStyleVH: {
    width: 45,
    height: 45,
    resizeMode: 'contain',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  borderBottom: { borderWidth: 0.5, borderColor: Colors.borderColor1, width: width * 0.85, alignSelf: 'center' },
  title: {
    fontSize: FontSize.labelText,
    fontFamily: FontFamily.PopinsMedium,
    color: Colors.black,
  },
  title1: {
    fontSize: FontSize.labelText,
    fontFamily: FontFamily.PopinsRegular,
    color: Colors.grey,
  },
  customChart: {
    marginTop: 5,
    backgroundColor: '#FFFFFF',
    height: height * 0.25,
    borderRadius: 10,
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-evenly',
  },
  CardText: {
    fontSize: FontSize.labelText3,
    fontFamily: FontFamily.PopinsMedium,
    color: Colors.black,
    alignSelf: 'center',
  },
  CardText1: {
    fontSize: FontSize.labelText3,
    fontFamily: FontFamily.PopinsMedium,
    color: Colors.black,
    alignSelf: 'flex-start',
    left: 10
  },
  RBText: {
    fontSize: FontSize.labelText2,
    fontFamily: FontFamily.PopinsMedium,
    color: Colors.black,
    color: Colors.bluetheme
  },
  RBText1: {
    fontSize: FontSize.labelText2,
    fontFamily: FontFamily.PopinsMedium,
    color: Colors.bluetheme
  },

  MainView: { flex: 1, backgroundColor: Colors.mainbg },
  SecondView: { width: width, height: 90, backgroundColor: Colors.bluetheme, borderBottomLeftRadius: 15, borderBottomRightRadius: 15 },
  ThirdView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    padding: 15,
    flex: 1
  },
  BackIcon: { width: 20, height: 20 },
  BackIcon1: { width: 20, height: 20 },
  Width78: { width: width * 0.78 },
  SearchIcon: { color: '#FFF', right: 12, top: -2 },
  DownloadIcon: { color: '#FFF', },
  FilterIcon: { width: 16, height: 16, top: -2 },
  MV: { marginVertical: 5 },
  MV3: { marginVertical: 3 },
  RBVIEW: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  CloseIcon: { width: 14, height: 14 },
  SortView: { justifyContent: 'center', alignSelf: 'center', flex: 1 },
  Width9: { width: width * 0.9 },
  SortMainView: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: width * 0.9,
  },

  //   Beat Start
  container: {
    borderColor: 'grey',
  },
  tabStyle: {
    backgroundColor: Colors.white,
    borderWidth: 0,
    borderColor: 'transparent',
    borderRadius: 5,
  },
  activeTabStyle: {
    backgroundColor: Colors.bluetheme,
  },
  tabviewstyle: {
    width: width * 0.93,
    alignSelf: 'center',
    backgroundColor: Colors.white,
    padding: 2,
    borderRadius: 5,
    borderColor: Colors.borderColor,
    borderWidth: 1,
  },
  header: {
    width: width,
    height: 80,
    backgroundColor: Colors.bluetheme,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    // flex:1
  },
  Text: {
    fontSize: FontSize.labelText4,
    fontFamily: FontFamily.PopinsRegular,
    color: Colors.white,
  },
  FLMAINView: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderWidth: 0.5,
    borderColor: Colors.borderColor,
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    marginTop: 8,
  },
  FLMAINViewNew: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderWidth: 0.5,
    borderColor: Colors.borderColor,
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    alignSelf:'center'
  },
  FL1: {
    flexDirection: 'row',
    alignItems: 'center',
    left: -5,
  },
  FLHeadText: {
    fontFamily: FontFamily.Popinssemibold,
    color: Colors.black,
    fontSize: 13,
  },
  TagView: { width: 70, height: 18, padding: 2, borderRadius: 30, backgroundColor: '#54c130', justifyContent: 'center', }
,
TagText: { fontSize: 9, justifyContent: 'center', alignSelf: 'center', color: '#FFF', fontFamily: FontFamily.Popinssemibold },

  FLVIEW: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  FLVIEW2: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 170,
    left: -5,
  },
  SmallHeading: {
    fontFamily: FontFamily.PopinsRegular,
    color: Colors.black,
    fontSize: 10,
  },
  MPVIew: { flexDirection: 'row', alignItems: 'center' },
  MobileText: {
    fontFamily: FontFamily.PopinsRegular,
    color: Colors.black,
    fontSize: 10,
    left: 5,
  },
  MobileTextRight: {
    fontFamily: FontFamily.PopinsRegular,
    color: Colors.black,
    fontSize: 10,
    right: 0,
  },
  NEWVIEW82: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    maxWidth: width * 0.82,
  },
  StarVIew: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  FLVIEW3: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 170,
  },
  DateView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  RingView: {
    flexDirection: 'row',
    alignItems: 'center',
    left: -6,
  },
  RingText: {
    fontFamily: FontFamily.PopinsRegular,
    color: Colors.black,
    fontSize: 10,
  },
  MainView2: { flex: 1, backgroundColor: Colors.mainbg },
  View93: { width: width * 0.93, alignSelf: 'center' },
  SearchInputView: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
  },
  PH10: { paddingHorizontal: 10 },
  InputText: { backgroundColor: 'transparent', width: width * 0.8, fontFamily: FontFamily.PopinsRegular, },
  CalendarView: {
    flexDirection: 'row',
    alignItems: 'center',
    left: -2,
  },
  TagView: { width: 70, height: 18, padding: 2, borderRadius: 30, backgroundColor: '#54c130', justifyContent: 'center', },
  TagView1: { width: 70, height: 18, padding: 2, borderRadius: 30, backgroundColor: '#10bcf9', justifyContent: 'center', },
  TagText: { fontSize: 9, justifyContent: 'center', alignSelf: 'center', color: '#FFF', fontFamily: FontFamily.Popinssemibold },
  StoreFlex: { flex: 1, backgroundColor: Colors.white },
  FlexMainView: {
    flex: 1.8,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    overflow: 'hidden',
    backgroundColor: 'white'
  },
  BGBG: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

  },
  BGBottonText: {
    height: height * 0.1,
    justifyContent: 'flex-end',
    width: width * 0.95,
    alignSelf: 'center',

  },
  FLexJ: { flexDirection: 'row', justifyContent: 'space-between' },
  FlexJ2: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  HeadingText: {
    color: 'white',
    marginLeft: 10,
    fontSize: 16,
    fontFamily: FontFamily.PopinsMedium
  },
  TOP3: { top: 3 },
  TypeText: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    backgroundColor: Colors.bluetheme,
    alignSelf: 'center',
    opacity: 0.9,
  },
  DIstributerTypeBottom: { justifyContent: 'space-between', width: width, flexDirection: 'row', padding: 10 },
  TYPETEXT2: { flex: 1, paddingVertical: 10,justifyContent:'flex-start', },
  T1: { color: Colors.white, fontSize: 12, fontFamily: FontFamily.PopinsMedium, textAlign: "center" },
  T2: { color: Colors.white, fontSize: 11, fontFamily: FontFamily.PopinsMedium, textAlign: "center" },
  ChenelCategoryText: { color: Colors.white, fontSize: 11, fontFamily: FontFamily.PopinsMedium, alignSelf: 'flex-end' },

  MT10: { marginTop: 10, },
  MT20: { marginTop: 20 },
  NewView: {
    flex: 4,
    width: width * 0.93,
    alignSelf: 'center',
    backgroundColor: Colors.white,
  },
  RecentOrder: {
    overflow: 'hidden',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  MainVIewRound: { borderWidth: 0.5, borderRadius: 12,overflow: 'hidden', justifyContent: 'space-between', margin: 1, flex: 1 },
  RecentOrder41: {
    width: width * 0.41,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#F4F4F4',
    margin: 5
  },
  Recent1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  RecentOrderText: {
    fontFamily: FontFamily.PopinsRegular,
    color: Colors.black,
    fontSize: 10,
  },
  RecentView: {
    flexDirection: 'row',
    width: width * 0.41,
    justifyContent: 'space-between',
    paddingVertical: 5,
    alignItems: 'center',
  },
  ViewButton: {
    backgroundColor: Colors.bluetheme,
    borderRadius: 10,
    paddingHorizontal: 8,
    height: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ViewButtonText: {
    fontFamily: FontFamily.PopinsRegular,
    color: Colors.white,
    fontSize: 10,
  },
  StatusColor: {
    fontFamily: FontFamily.PopinsRegular,
    color: Colors.statuscolorGreen,
    fontSize: 11,
  },
  IconCircle: { backgroundColor: Colors.orange, width: 12, height: 12, borderRadius: 20, justifyContent: 'center', alignSelf: 'center', alignItems: 'center' },
  FLEXDIRECTIONROW: { flexDirection: 'row' },
  SalesText: {
    color: Colors.black,
    fontFamily: FontFamily.Popinssemibold,
  },
  SaleView: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    flexDirection: 'row',
    paddingVertical: 10,
    borderWidth: 0.5,
    borderColor: Colors.borderColor,
  },
  SalesView2: { flex: 2, alignItems: 'center',  },
  SalexTextBig: {
    color: Colors.bluetheme,
    fontFamily: FontFamily.Popinsbold,
    fontSize: 20,
  },
  ViewFLex1: { flex: 1, alignItems: 'center' },
  FrequetlyView: {
    backgroundColor: Colors.white,
    height: 'auto',
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.borderColor,
    padding: 2
  },
  AddButton: {
    backgroundColor: Colors.bluetheme,
    borderRadius: 12,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  AddButtonIcon: { color: Colors.white, fontSize: 10, left: -1.5 },
  CompetitorView: {
    backgroundColor: Colors.white,
    height: 'auto',
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: Colors.borderColor,
  },
  CompetitorView2: {
    flex: 1,
    backgroundColor: '#F1F5FE',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderColor,
  },
  CompetitorText: { fontSize: 12, color: '#2D4495' },
  BlankView: { flex: 1, backgroundColor: Colors.white },
  RadioTView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  WIDTH1: { width: width * 0.1 },
  WIDTH6: { width: width * 0.6 },
  WIDTH2: { width: width * 0.2 },
  WIDTH22: { width: width * 0.25 },
  borderLine: { borderWidth: 0.4, borderColor: Colors.borderColor, width: width * 0.85, justifyContent: 'center', alignSelf: 'center' },
  BottoMText: { justifyContent: 'space-between', flexDirection: 'row', },
  ClockinTextMain: { color: Colors.black, fontFamily: FontFamily.PopinsMedium, color: Colors.black, fontSize: FontSize.small, top: 3 },
  ClockinText: { color: Colors.black, fontFamily: FontFamily.PopinsMedium, color: Colors.black, fontSize: FontSize.small },
  ALCENTER: { alignItems: 'center' },
  RecentOrderVIew: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  RecentText: {
    color: 'black',
    fontFamily: FontFamily.Popinssemibold,
  },
  VIEWALLBUTTON: {
    backgroundColor: Colors.bluetheme,
    borderRadius: 12,
    paddingHorizontal: 7,
    paddingVertical: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  VIEWALLTEXT: { color: 'white', fontSize: 11 },
});
