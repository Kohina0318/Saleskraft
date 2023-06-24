import {StyleSheet, Dimensions} from 'react-native';
import {Colors} from '../../assets/config/Colors';
import {FontFamily} from '../../assets/fonts/FontFamily';
import {FontSize} from '../../assets/fonts/Fonts';
const {width, height} = Dimensions.get('screen');
export default StyleSheet.create({
  SliderImageView:{
    backgroundColor: '#fef2db',
    borderRadius: 50,
    width: 60,
    height: 60,
    left: 5,
    justifyContent: 'center',
  },
  SliderImgStyle:{
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  RenderImageView:{
    width: width * 0.9,
    margin: 3,
    borderRadius: 10,
    overflow: 'hidden',
    borderColor: Colors.borderColor,
    borderWidth: 1,
  },
  RenderImageView2:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    backgroundColor: Colors.white,
    overflow: 'hidden',
    elevation: 5,
  },
  Width2:{width: width * 0.2},
  Width65:{width: width * 0.65},
  SliderHeading:{
    fontSize: FontSize.labelText3,
    color: Colors.black,
    fontFamily: FontFamily.PopinsMedium,
  },
  SliderHeading2:{
    fontSize: FontSize.small,
    color: Colors.grey,
    fontFamily: FontFamily.PopinsRegular,
    width:width*0.66
  },
  SLiderBorder:{borderWidth: 0.2, borderColor: 'lightgrey'}
});
