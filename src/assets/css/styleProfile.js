import { StyleSheet, Dimensions } from 'react-native';
import { FontFamily } from '../../assets/fonts/FontFamily';
import { FontSize } from '../../assets/fonts/Fonts';
import { Colors } from '../../assets/config/Colors';
const { width } = Dimensions.get('screen');

const styles = StyleSheet.create({

    // FOR RING ANIMATION ON NOTIFICATION
    box: {
      width: 100,
      height: 100,
      backgroundColor: "tomato",
    },
    ring: {
      position: "absolute",
      width: 40,
      right:0,
      bottom:-1.3,
      left:-1.8,
      height: 40,
      borderRadius: 50,
      borderColor: "#fff",
      borderWidth: 5,
    },
    ////////////////////////////

    BellIcon: {
      width: 22,
      height: 22,
  },

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
  FLMAINView: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: Colors.borderColor,
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    marginTop: 8,
  },
  FLMAINViewNew: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: Colors.borderColor,
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
  },
  FL1: {
    flexDirection: 'row',
    alignItems: 'center',
    // left: -5,
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
  FLMAINView: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: Colors.borderColor,
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    marginTop: 8,
  },
  FLMAINViewNew: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: Colors.borderColor,
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
  },
  FL1: {
    flexDirection: 'row',
    alignItems: 'center',
    // left: -5,
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
    padding: 10,
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
    { justifyContent: 'center', alignSelf: 'center', },
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

  },
  marg3:
    { marginTop: 2 },
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
    fontSize: 14,
    fontFamily: FontFamily.Popinssemibold
  },
  view4:
  {
    width: width * 0.85,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  view5:
  {
    flexDirection: 'row',
    justifyContent: 'center',
    // alignItems: 'center',
    alignSelf: 'center'
  },
  clr:
    { color: Colors.bluetheme, },
  newstyle3: {
    // top: 2,
    fontSize: FontSize.labelText,
    fontFamily: FontFamily.PopinsMedium,
    color: Colors.black,
  },
  flexs:
  {
    alignItems: 'center',
    flexDirection: 'row',
    // backgroundColor:'blue'
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
  {
    width: 22,
    height: 22,
  },
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