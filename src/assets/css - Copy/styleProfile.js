import { StyleSheet, Dimensions } from 'react-native';
import { FontFamily } from '../../assets/fonts/FontFamily';
import { FontSize } from '../../assets/fonts/Fonts';
import { Colors } from '../../assets/config/Colors';
const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
  headerBackgroundImage: {
    zIndex: 9999,
    height: 260,
    backgroundColor: Colors.bluetheme,
  },
  CardText: {
    fontSize: FontSize.labelText2,
    fontFamily: FontFamily.Popinssemibold,
    alignSelf: 'center',
  },
  userImage: {
    borderColor: '#FFF',
    borderRadius: 85,
    borderWidth: 3,
    height: 130,
    width: 130,
    // marginTop: StatusBar.currentHeight,
  },
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
  headerColumn: {
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        alignItems: 'center',
        elevation: 1,
        marginTop: -1,
      },
      android: {
        alignItems: 'center',
      },
    }),
  },
  view:
  {
    flex: 1,
    padding: 15,
    backgroundColor: Colors.white,
    overflow: 'hidden',
    borderRadius: 7,
    borderColor: Colors.borderColor,
    borderWidth: 1
  },
  view1:
  {
    justifyContent: 'flex-start',
    flex: 1,
    flexDirection: 'row'
  },
  view2:
    { justifyContent: 'center', alignSelf: 'center' },
  align:
    { alignSelf: 'flex-end' },
  align1:
  {
    alignItems: 'center'
  },
  widths:
    { width: width * 0.8 },
  newstyle:
  {
    fontFamily: FontFamily.PopinsMedium,
    color: Colors.black,
    fontSize: FontSize.labelText2,
  },
  newstyle1:
  {
    fontFamily: FontFamily.PopinsMedium,
    color: Colors.black,
    fontSize: FontSize.smallText,
    color: '#333',
    top: 3
  },
  marg3:
    { marginVertical: 3 },
  view3:
  {
    flex: 1,
    padding: 10,
    backgroundColor: Colors.white,
    overflow: 'hidden',
    borderRadius: 7,
    borderColor: Colors.borderColor,
    borderWidth: 1,
    justifyContent: 'center'
  },
  newstyle2:
  {
    color: Colors.black,
    fontSize: FontSize.labelText3,
    fontFamily: FontFamily.Popinssemibold
  },
  view4:
  {
    width: width * 0.7,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  view5:
  {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  clr:
    { color: Colors.bluetheme, },
  newstyle3: {
    top: 2,
    fontSize: FontSize.labelText,
    fontFamily: FontFamily.PopinsMedium,
    color: Colors.black,
  },
  flexs:
  {
    flexDirection: 'row'
  },
  newstyle4:
  {
    fontFamily: FontFamily.Popinssemibold,
    fontSize: FontSize.labelText,
    color: Colors.black,
  },
  view6:
    { flex: 1, backgroundColor: Colors.mainbg },
  view7:
  {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    padding: 15,
    top: 40
  },
  HW:
    { width: 25, height: 25 },
  HW1:
    { width: 20, height: 20 },
  view8:
  {
    flexDirection: 'row',
    width: width * 0.9,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',

  },
  txt:
  {
    color: Colors.white,
    fontFamily: FontFamily.PopinsMedium,
    fontSize: FontSize.labelText4,
    top: 5
  },
  txt1:
  {
    color: Colors.white,
    fontFamily: FontFamily.PopinsMedium,
    fontSize: FontSize.smallText,
    opacity: 0.8
  },
  marg4:
    { marginVertical: 4 },
  view9:
  {
    width: width,
    alignSelf: 'center',
    backgroundColor: Colors.white,
    overflow: 'hidden',
    height: 50,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    top: -20,
    zIndex: 99999,
  },
  view10:
  {
    justifyContent: 'space-around',
    flex: 1,
    flexDirection: 'row',
  },
  view11:
  {
    width: width * 0.92,
    alignSelf: 'center',
    height: 'auto',
  },
  marg150:
    { marginVertical: 150 },
  icons:
    { color: Colors.bluetheme, top: 8 },
});

export default styles;  