import { StyleSheet, Dimensions } from 'react-native';
import { FontFamily } from '../../assets/fonts/FontFamily';
import { FontSize } from '../../assets/fonts/Fonts';
import { Colors } from '../../assets/config/Colors';
const { width } = Dimensions.get('screen');

export default StyleSheet.create({

  MV5: { marginVertical: 5 },
  accordian: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 5,
    // overflow:'hidden'
  },
  customChart: {
    marginTop: 5,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-evenly',
  },
  header: {
    width: width,
    height: 170,
    backgroundColor: Colors.bluetheme,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
    // flex:1
  },
  FontStyle: {
    fontSize: FontSize.small,
    color: Colors.white,
    fontFamily: FontFamily.PopinsRegular,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  text: {
    fontSize: 11,
    color: 'white',
  },
  clearButton: {
    backgroundColor: 'grey',
    borderRadius: 5,
    marginRight: 10,
    padding: 5,
  },
  optionContainer: {
    padding: 10,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 0.4,
  },
  header1: {
    width: width,
    // height: 'auto',
    backgroundColor: Colors.bluetheme,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
  body: {
    flex: 1, width: width * 0.93, alignSelf: 'center'
  },
  Text: {
    fontSize: FontSize.labelText,
    fontFamily: FontFamily.PopinsRegular,
    color: Colors.white,
  },
  CardText: {
    fontSize: FontSize.labelText2,
    fontFamily: FontFamily.PopinsMedium,
    color: Colors.black,
    alignSelf: 'center',
  },
  attentanceCards: {
    alignSelf: 'center',
    backgroundColor: Colors.white,
    // top:8,
    borderRadius: 12,
    overflow: 'hidden',
    flex: 1,
    width: '100%',
    // height: 60,
    borderWidth: 1, borderColor: '#E9E9E9'
  },
  FontStyle: {
    fontSize: FontSize.small,
    color: Colors.white,
    fontFamily: FontFamily.PopinsRegular,
  },
  FLEX:
    { flex: 1 },
  BlueHead: {
    justifyContent: 'space-between',
    padding: 15,
    top: 25,
    width: width,
  },
  BlueHead2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    top: -13,
  },
  ImageStyle:
    { width: 20, height: 20 },
  MH8:
    { marginHorizontal: 8 },
  View1:
    { alignSelf: 'flex-end', alignItems: 'center',},
  Center:
    { alignItems: 'center'},
  Text1:
    { color: 'black', fontSize: FontSize.verysmallText },
  MainView:
  {
    width: 20,
    backgroundColor: '#FEA90D',
    borderBottomWidth: 1,
    alignSelf: 'center',
    marginVertical: 2
  },
  Text2:
  {
    fontSize: 7,
    fontWeight: 'bold',
    fontFamily: FontFamily.PopinsMedium,
    color: Colors.black,
    textAlign: 'center',
  },
  BoxView:
  {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    position: 'relative',
  },
  DropdownView:
    { position: 'absolute', right: 0, zIndex: 9999 },
  DataView:
  {
    width: width * 0.93,
    top: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E9E9E9',
    backgroundColor:'white',
    padding:10,
    alignItems:'center'
  },
  InnerView:
  {
    alignItems: 'flex-end',
    // alignSelf: 'center',
    padding: 5,
    flexDirection: 'row',
    flex: 1,
  },
  FlatListView:
    { width: width * 0.92, alignItems: 'center',},
  BottomView:
  {
    width: '100%',
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    padding: 14
  },
  SqView:
  { height: 15, width: 15, backgroundColor: '#F45831' },
  Text3:
  { marginLeft: 4, color: Colors.black, fontSize: 12 }
});
