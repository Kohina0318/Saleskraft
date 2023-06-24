import { StyleSheet, Dimensions } from 'react-native';
import { FontFamily } from '../fonts/FontFamily';
import { FontSize } from '../fonts/Fonts';
import { Colors } from '../config/Colors';
const { width } = Dimensions.get('screen');

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.mainbg,
    },
    headerView: {
        flex: 0.11,
        backgroundColor: Colors.bluetheme,
        flexDirection: 'row',
        alignItems: 'flex-end',
        borderRadius: 20,
        paddingBottom: 3,
    },
    bodyView: {
        flex: 0.89,
    },
    tripdrop: {
        width: width * 0.91,
        alignSelf: 'center',
        marginTop: 10,
        borderWidth: 1,
        borderColor: Colors.borderColor,
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowOffset: { width: 0, height: 5 },
    },
    inputmedia: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e9e9e9',
        borderRadius: 15,
        marginLeft: 5,

    },
    textinput: {
        fontSize: 13.5,
        fontFamily: FontFamily.PopinsMedium,
        width: width * 0.78,
        height: 50,
        color: Colors.black,
        backgroundColor: '#FFFFFF',
        width: '100%',
        paddingLeft: 18
    },

    textContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        height: 50,
        borderWidth: 1,
        borderWidth: 1, borderColor: Colors.borderColor,
        borderColor: Colors.borderColor,
        color: Colors.grey,
        overflow: 'hidden',
        backgroundColor: Colors.Textinputbg,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    modalView: {
        margin: 25,
        backgroundColor: 'white',
        borderRadius: 30,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },
    submittext: {
        fontSize: FontSize.h4,
        color: Colors.black,
        textAlign: 'center',
        width: width * 0.82,
        alignSelf: 'center',
        fontFamily: FontFamily.Popinssemibold,
        top: 5,
    },
    ChangeDoctorButton: {
        height: 45,
        width: width * 0.3,
        top: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        alignSelf: 'center',
        backgroundColor: Colors.bluetheme,
    },
    textStyle: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: FontSize.labelText2,
        fontFamily: FontFamily.PopinsMedium,
    },
    backgroundVideo: {
        height: 200,
        width: 200,
        alignSelf: 'center',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 9999,
    },
    view:
    {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5
    },
    marg15:
        { marginLeft: 15 },
    hw:
        { width: 25, height: 20 },
    txt:
    {
        color: 'white',
        marginLeft: 10,
        fontSize: 18,
        fontWeight: '500'
    },
    txt1:
    {
        fontFamily: FontFamily.PopinsMedium,
        fontSize: FontSize.labelText3,
        color: '#313239',
    },
    picker:
    {
        backgroundColor: '#FFFFFF',
        borderRadius: 7,
        borderWidth: 1,
        borderColor: Colors.borderColor
    },
    picker1:
        { width: '100%', height: 50 },
    h20:
        { height: 20 },
    picker2:
    {
        fontSize: 12,
        color: '#333',
        fontWeight: 'bold',
        height: 9
    },
    picker3:
        { color: '#333', fontWeight: 'bold' },
    view1:
    {
        width: width * 0.94,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        position: 'relative',
    },
    textStyleText: {
        top: 3,
        width: '100%',
        left: 18,
        fontSize: 12,
    },
    img:
    {
        height: 13,
        width: 13,
        position: 'absolute',
        right: 26,
    },
    margins:
        { marginTop: 10, marginLeft: 15.5 },
    txt2:
    {
        fontSize: 10,
        color: 'black',
        fontWeight: '500',
        marginTop: 4,
    },
    view2:
    {
        width: width * 0.91,
        alignSelf: 'center',
        marginTop: 10
    },
    txtinp:
    {
        paddingLeft: 18,
        fontSize: 13.5,
        fontFamily: FontFamily.PopinsMedium,
        width: width * 0.78,
        height: 50,
        color: Colors.black,
        backgroundColor: 'white',
        width: '100%',
        paddingLeft: 18
    },
    txtContainer:
    {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        height: 100,
        borderWidth: 1,
        borderWidth: 1, borderColor: Colors.borderColor,
        borderColor: Colors.borderColor,
        color: Colors.grey,
        overflow: 'hidden',
    },
    view3:
    {
        width: width * 0.93,
        alignSelf: 'center',
        marginTop: 20,
        justifyContent: 'center',
    },
    touchview:
    {
        backgroundColor: Colors.bluetheme,
        height: 45,
        borderRadius: 15,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    txt3:
    {
        color: 'white',
        textAlign: 'center',
        fontFamily: FontFamily.PopinsMedium,
    },
    widths:
        { width: width * 0.8 },
    center:
    {
        justifyContent: 'center',
        alignSelf: 'center',
    },
    marg2:
        { marginVertical: 2 },
    view4:
    {
        flexDirection: 'row',
        justifyContent: 'center'
    },
});

export default styles; 