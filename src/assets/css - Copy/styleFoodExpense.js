import { StyleSheet, Dimensions } from 'react-native';
import { FontFamily } from '../fonts/FontFamily';
import { FontSize } from '../fonts/Fonts';
import { Colors } from '../config/Colors';
const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
    headerpart: {
        flex: 0.25,
        backgroundColor: Colors.bluetheme,
        borderRadius: 30,
    },
    bodypart: {
        flex: 0.75,
        width: width - 32,
        alignSelf: 'center',
    },
    headerwhitebox: {
        backgroundColor: 'white',
        width: width * 0.92,
        height: 90,
        position: 'relative',
        flexDirection: 'row',
        overflow: 'hidden',
    },
    view:
        { flex: 1,
         backgroundColor: Colors.mainbg },
    view1:
    {
        flex: 0.4,
        justifyContent: 'flex-end'
    },
    view2:
    {
        flexDirection: 'row',
        alignItems: 'center'
    },
    marg:
        { marginLeft: 15 },
    wh:
        { width: 25, height: 20 },
    txt:
    {
        color: 'white',
        marginLeft: 10,
        fontSize: 18,
        fontFamily: FontFamily.PopinsMedium,
    },
    headerview:
    {
        flex: 0.6,
        marginTop: 15,
        alignItems: 'center',
        overflow: 'hidden',
    },
    headerview1:
    {
        flex: 0.28,
        justifyContent: 'center',
        alignItems: 'center',
    },
    boxtext:
    {
        fontFamily: FontFamily.PopinsRegular,
        fontSize: 10,
        color: Colors.black,
    },
    texticon:
    {
        fontFamily: FontFamily.PopinsRegular,
        fontWeight: '700',
        fontSize: 13,
        color: Colors.black,
    },
    view3:
    {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    img:
    {
        borderRadius: 30,
        width: 50,
        height: 50,
        backgroundColor: 'lightblue',
        overflow: 'hidden',
    },
    heights:
    { width: 60, height: 60 },
    functionview:
    {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: 6,
        justifyContent: 'center',
        flexDirection: 'row',
        overflow: 'hidden',
        zIndex: 99999,
      },
      view4:
      {
        width: '100%',
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        borderRadius: 14,
        marginTop: 5,
        height: 'auto',
        padding: 10,
        borderWidth:1,borderColor:Colors.borderColor
      },
      view5:
      { flex: 0.13, 
        alignItems: 'center',
         marginTop: 10 },
         view6:
         { alignItems: 'center' },
         marg1:
         { marginBottom: -1 },
         iconview:
         { height: 50, width: 3, backgroundColor: '#E8E9E4' },
         marg2:
         { marginTop: -2 },
         flexs:
         { flex: 0.87 },
         view7:
         { paddingVertical: 5 },
         textstyle:
         {
            fontFamily: FontFamily.Popinssemibold,
            color: Colors.black,
            fontSize: FontSize.labelText3,
          },
          textstyle1:
          {
            marginTop: -5,
            fontFamily: FontFamily.PopinsRegular,
            fontSize: FontSize.small,
            color: '#6b707e',
            fontWeight: '700',
          },
          view8:
          { marginTop: 15, paddingVertical: 5 },











});


export default styles; 