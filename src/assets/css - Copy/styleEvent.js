import { StyleSheet, Dimensions } from 'react-native';
import { FontFamily } from '../fonts/FontFamily';
import { FontSize } from '../fonts/Fonts';
import { Colors } from '../config/Colors';
const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
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
    Text: {
        fontSize: FontSize.labelText4,
        fontFamily: FontFamily.PopinsRegular,
        color: Colors.white,
    },
    header: {
        width: width,
        backgroundColor: Colors.bluetheme,
        borderBottomRightRadius: 25,
        borderBottomLeftRadius: 25,
        overflow: 'hidden'
    },
    center: {
        justifyContent: 'center',
        alignSelf: 'center',
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
    widths:
        { width: width * 0.7 },
    widths1:
        { width: width * 0.82 },
    newstyle:
    {
        fontFamily: FontFamily.PopinsMedium,
        color: Colors.black,
        fontSize: FontSize.labelTex2
    },
    newstyle1:
    {
        fontFamily: FontFamily.PopinsRegular,
        fontSize: FontSize.smallText,
        color: '#333'
    },
    view2:
    {
        width: width * 0.15,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    align:
        { alignSelf: 'flex-end' },
    marg3:
        { marginVertical: 3 },
    background:
        { flex: 1, backgroundColor: Colors.mainbg },
    padding10:
        { paddingVertical: 10 },
    view3:
    {
        flexDirection: 'row',
        //justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
    },
    eventstyle:
    {fontFamily:FontFamily.PopinsMedium,fontSize:FontSize.labelText5,color:Colors.white,marginLeft:10},
    WH:
        { width: 20, height: 18 },
    txtstyle:
    {
        fontFamily: FontFamily.PopinsMedium,
        color: '#FFF',
    },
    marg10:
        { marginVertical: 10 },
    marg8:
        { marginVertical: 8 },
    view4:
    {
        width: width * 0.9,
        alignSelf: 'center',
    },
    txt:
    {
        color: Colors.black,
        fontFamily: FontFamily.PopinsMedium,
        //fontSize: FontSize.labelText4,
        top:3
    },
    view5:
    {
        width: width * 0.92,
        alignSelf: 'center',
        // height: 'auto',
        height:height*0.7
       
      },
      marg150:
      {marginVertical: 150},
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
      bottomicon:{
        justifyContent: 'center',
        alignSelf: 'center',
        height: 20,
        width: 20,
        overflow: 'hidden',

      }
});
export default styles;  