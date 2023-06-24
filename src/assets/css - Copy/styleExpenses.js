import { StyleSheet, Dimensions } from 'react-native';
import { FontFamily } from '../fonts/FontFamily';
import { FontSize } from '../fonts/Fonts';
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
    body: { flex: 0.82, position: 'relative', backgroundColor: Colors.mainbg },
    flatContainer: {
        backgroundColor: '#FFFFFF',
        width: width * 0.93,
        marginTop: 10,
        padding: 7,
        borderRadius: 15,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1, borderColor: Colors.borderColor,
        marginBottom: 1,
    },
    headerChildOne: {
        flex: 0.65,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 5,
        paddingTop: 5,
    },
    headerTabContainer: {
        flex: 0.35,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    headerTab: {
        borderRadius: 15,
        padding: 5,
        width: width / 3.5,
        height: 37,
        justifyContent: 'center',
        alignItems: 'center',
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
        { width: 25, height: 20 },
    txt:
    {
        color: 'white',
        marginLeft: 10,
        fontSize: FontSize.labelText5,
        fontWeight: '400',
    },
    margins:
        { marginTop: 20, marginRight: 13 },
    padding:
        { padding: 8 },
    img:
        { width: 70, height: 70, borderRadius: 50 },
    margleft10:
        { marginLeft: 10 },
    txt1: {
        fontSize: 14,
        fontFamily: FontFamily.Popinssemibold,
        color: '#121327',
    },
    txt2:
    {
        fontSize: 12,
        color: '#121327',
        marginTop: -1,
    },
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