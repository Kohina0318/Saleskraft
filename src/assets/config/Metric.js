import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('screen');
export const screenWidth = width < height ? width : height;
export const screenHeight = width < height ? height : width;
