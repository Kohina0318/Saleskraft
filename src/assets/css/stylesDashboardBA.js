import { Colors } from '../config/Colors';
import { FontFamily } from '../fonts/FontFamily';
import {
  Dimensions,
  StyleSheet,
} from 'react-native';
import { FontSize } from '../fonts/Fonts';
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  selectedDesig:{
    flex:1, 
    backgroundColor: "#fff", 
    marginHorizontal: 12, 
    height: 30, 
    borderRadius: 10, 
    alignItems: "center", 
    justifyContent: "center" },

    unSelectedDesig:{
      flex:1, 
      marginHorizontal: 12, 
      height: 30, 
      borderRadius: 10, 
      alignItems: "center", 
      justifyContent: "center" },
    

  Text: {
    fontSize: FontSize.labelText5,
    fontFamily: FontFamily.PopinsRegular,
    color: Colors.white,
    left: -10
  },
  SearchInputView: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
  },
  PH10: { paddingHorizontal: 10 },
  InputText: { backgroundColor: 'transparent', width: width * 0.8, fontFamily: FontFamily.PopinsRegular, top: 2 },
  Width2: { width: width * 0.2 },
  bg:
    {flex:1,  backgroundColor: Colors.mainbg },
  mainview:
  {
    height: 90,
    backgroundColor: Colors.bluetheme,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
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
  {
    height: height * 0.9,
    marginBottom: 15
  },
  view:
  {
    width: width * 0.94,
    alignSelf: 'center',
    // height: 'auto',
  },
  returnview:
  {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderWidth: 0.5,
    borderColor: Colors.borderColor,
    alignItems: 'center',
    padding: 6,
    borderRadius: 12,
    marginTop: 8
  },
  returnviewV:
  {
    flexDirection: 'row',
    // backgroundColor: '#FFFFFF',
    // borderWidth: 1,
    // borderColor: Colors.borderColor,
    alignItems: 'center',
    // padding: 10,
    // borderRadius: 12,
  },
  innerview1:
  {
    borderRadius: 100,
    height: 55,
    width: 55,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor:'red',
    overflow: 'hidden'
  },
  Width2: { width: width * 0.2 },
  text:
  {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 25
  },
  margin:
    { marginLeft: 10 },
  text1:
  {
    fontFamily: FontFamily.Popinssemibold,
    color: Colors.black,
    // top: 3
  },
  text2:
  {
    fontFamily: FontFamily.PopinsRegular,
    color: Colors.black,
    fontSize: FontSize.smallText,
    marginTop: 2,
  },
  textDate:
  {
    fontFamily: FontFamily.PopinsMedium,
    color: Colors.black,
    fontSize: FontSize.smallText,
    marginTop: 2,
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
  MV3: { marginVertical: 3 },
  MV5: { marginVertical: 5 },
  MV8: { marginVertical: 8 },
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
  CardText: {
    fontSize: FontSize.labelText5,
    fontFamily: FontFamily.PopinsMedium,
    color: Colors.black,
    alignSelf: 'center',
  },
  CloseIcon: { width: 14, height: 14 },
  RBText1: {
    fontSize: FontSize.labelText2,
    fontFamily: FontFamily.PopinsMedium,
    color: Colors.black
  },
  SortView: { justifyContent: 'center', alignSelf: 'center', flex: 1 },
  Width9: { width: width * 0.9 },
  SortMainView: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: width * 0.9,
  },
  CardText1: {
    fontSize: FontSize.labelText3,
    fontFamily: FontFamily.PopinsMedium,
    color: Colors.black,
    alignSelf: 'flex-start',
    left: 10
  },

  RateTextDetails: {
    fontSize: 13,
    color: Colors.black,
    fontFamily: FontFamily.Popinssemibold,
  },
  RateTextDetailsBlue: {
    fontSize: 13,
    color: Colors.bluetheme,
    fontFamily: FontFamily.Popinssemibold,
  },
  RateTextboldblackCircleDetails: {
    fontSize: 12,
    color: Colors.black,
    fontFamily: FontFamily.PopinsMedium,
  },
  RateTextboldblackCircleDetails1: {
    fontSize: 13,
    color: Colors.black,
    fontFamily: FontFamily.PopinsMedium,
  },
  viewImageDetails: { width: 70, height: 70, borderRadius: 5 },
})

export default styles;