import {StyleSheet, Dimensions} from 'react-native';
import {FontFamily} from '../../assets/fonts/FontFamily';
import {FontSize} from '../../assets/fonts/Fonts';
import {Colors} from '../../assets/config/Colors';
const {width, height} = Dimensions.get('screen');
export default StyleSheet.create({
 
  MV5:{marginVertical: 5},
  accordian: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 5,
    // overflow:'hidden'
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
  Vikramcards: {
    alignSelf: 'center',
    backgroundColor: Colors.white,


    height: 'auto',
    // top:8,
    borderRadius: 12,
    overflow: 'hidden',
    flex: 1,
    width: '100%',
    borderWidth: 1, borderColor: '#E9E9E9'
    // backgroundColor:'red'
  },
  FontStyle: {
    fontSize: FontSize.small,
    color: Colors.white,
    fontFamily: FontFamily.PopinsRegular,
  },
  FLEX:{flex: 1},
  BlueHead:{
    justifyContent: 'space-between',
    padding: 15,
    top: 25,
    width: width,
  },
  BlueHead2:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    top: -13,
  },
  ImageStyle:{width: 20, height: 20},
});
