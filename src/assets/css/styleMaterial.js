import { StyleSheet, Dimensions } from 'react-native';
import { FontFamily } from '../fonts/FontFamily';
import { Colors } from '../config/Colors';
const { width } = Dimensions.get('screen');

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    header: {
        flex: 0.18,
        backgroundColor: Colors.bluetheme,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
    },
    body:
    {
        flex: 0.82, position: 'relative', backgroundColor: Colors.mainbg
    },
    flatContainer: {
        backgroundColor: '#FFFFFF',
        width: width * 0.93,
        height: 70,
        marginTop: 7,
        padding: 13,
        borderRadius: 10,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: Colors.borderColor,
        // marginBottom: 1,
    },
    view:
    {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,

    },
    margleft:
        { marginLeft: 15 },
    wh:
        { width: 20, height: 20 },
    margins:
        { marginTop: 20, marginRight: 13 },
    padding:
    {
        borderRadius: 50,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
    },
    img:
        { width: 20, height: 20 },
    margleft10:
        { marginLeft: 15 },
    txt1: {
        fontSize: 12,
        fontFamily: FontFamily.Popinssemibold,
        color: '#121327',
    },
    txt11: {
        fontSize: 15,
        fontFamily: FontFamily.Popinssemibold,
        color: '#121327',
    },
    txt2:
    {
        fontSize: 11,
        color: Colors.bluetheme,
        marginTop: -1,
        marginLeft: 2
    },
    iconview:
        { flexDirection: 'row', alignItems: 'center' },
    view1:
    {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 2,
    },
    txt3:
    {
        fontSize: 12,
        fontFamily: FontFamily.PopinsRegular,
        color: '#121327',
        marginLeft: 5,
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
    bottomicon:
    {
        justifyContent: 'center',
        alignSelf: 'center',
        height: 20,
        width: 20,
        overflow: 'hidden',
    },
});
export default styles;  