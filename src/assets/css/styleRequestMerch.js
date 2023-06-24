import { StyleSheet, Dimensions } from 'react-native';
import { FontFamily } from '../../assets/fonts/FontFamily';
import { Colors } from '../../assets/config/Colors';
const { width } = Dimensions.get('screen');

export default StyleSheet.create({
    MainView:
    {
        flex: 1, backgroundColor: Colors.mainbg
    },
    container: {
        borderColor: 'grey',
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
        width:width*0.92,
        justifyContent:'center',
        alignSelf:'center'
    },
    FL1: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    FLHeadText: {
        fontFamily: FontFamily.Popinssemibold,
        color: Colors.black,
        fontSize: 13,
    },
    SmallHeading: {
        fontFamily: FontFamily.PopinsRegular,
        color: Colors.black,
        fontSize: 10,
    },
    MPVIew: { flexDirection: 'row', alignItems: 'center' },
    MobileText: {
        fontFamily: FontFamily.PopinsRegular,
        color: Colors.black,
        fontSize: 10,
        left: 5,
    },
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
    TagView: {
        width: 70, height: 18, padding: 2, borderRadius: 30, backgroundColor: '#54c130', justifyContent: 'center',
    },
    TagText: { fontSize: 9, justifyContent: 'center', alignSelf: 'center', color: '#FFF', fontFamily: FontFamily.Popinssemibold },
    StarVIew: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    FLVIEW3: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 170,
    },
    NEWVIEW82: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
        maxWidth: width * 0.82,
    },
    MV: { marginVertical: 5 },




})