import {StyleSheet, Dimensions} from 'react-native';
import { FontFamily } from '../../assets/fonts/FontFamily';
import { FontSize } from '../../assets/fonts/Fonts';
import { Colors } from '../../assets/config/Colors';
export default StyleSheet.create({
 ButtonView:{
  backgroundColor: Colors.SortButton,
  borderRadius: 10,
  width: 90,
  height: 30,
  justifyContent: 'center',
},
ButtonViewBlue:{
  backgroundColor: Colors.BLueButton,
  borderRadius: 10,
  width: 90,
  height: 30,
  justifyContent: 'center',
},
TextWhite:{alignSelf:'center',fontFamily:FontFamily.PopinsMedium,fontSize:11,color:Colors.white},
TextDark:{alignSelf:'center',fontFamily:FontFamily.PopinsMedium,fontSize:11,color:Colors.grey},
PointView:{
  flexDirection:'row',
  padding:2
},
RadioView:{
  flexDirection: 'row',
  justifyContent: 'center',
  alignSelf: 'flex-start',
},
RadioText:{
  top: 10,
  fontFamily: FontFamily.PopinsRegular,
  color: Colors.black,
  fontSize: FontSize.labelText,
},

});
