import { StyleSheet, Dimensions } from 'react-native';
import { FontFamily } from '../fonts/FontFamily';
import { FontSize } from '../fonts/Fonts';
import { Colors } from '../config/Colors';
const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
    mainview:
    {
        justifyContent: 'flex-start',
        alignSelf: 'center',
        flex: 1,
    },
    touchview:
    {
        width: width * 0.93,
        margin: 2,
        top: 4,
        borderRadius: 10,
        overflow: 'hidden',
        borderColor: Colors.borderColor,
        borderWidth: 0.5,
    },
    innerview:
    {  //width: width * 0.93,
        flexDirection: 'row',
        paddingVertical: 5,
        backgroundColor: Colors.white,
        overflow: 'hidden',
    },
    innerviewV:
    {   width: width * 0.72,
        flexDirection: 'row',
        overflow: 'hidden',
    },
    NumericInputView:
    {
        width: width * 0.2,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        alignSelf: 'center',
        marginRight: 8,
    },
    container: {

        alignItems: "center",
        justifyContent: "center",
    },
    checkboxContainer: {
        justifyContent: 'center',
        color: Colors.gray,
    },
    checkbox: {
        alignSelf: "center",
        justifyContent: 'center',
        width: 20,
        marginLeft: 4,
    },

    pic:
    {
        width: width * 0.16,
        justifyContent: 'center',
        alignSelf: 'center',
        marginLeft: 8
    },
    innerview1:
    {
        width: width * 0.65,
        alignSelf: 'center',
    },
    innervieww1:
    {
        width: width * 0.64,
        alignSelf: 'center',
    },
    txt:
    {
        fontSize: FontSize.labelText,
        color: Colors.black,
        fontFamily: FontFamily.PopinsMedium,
    },
    txt1:
    {
        fontSize: 11,
        color: Colors.bluetheme,
        fontFamily: FontFamily.PopinsRegular,
        width: width * 0.7
    },
    txt2:
    {
        fontSize: 10,
        color: Colors.black,
        fontFamily: FontFamily.PopinsRegular,
        // width: width * 0.7
    },
     marVer:
        { marginVertical: 4 },
    flex:
        { flex: 1 },
    H:
        { height: height * 0.8 },
    buttonView:
    {
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center'
    },
    ImagesPic: {
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    CUSTOMERdvIEW: { justifyContent: 'center', alignSelf: 'center', flex: 1, alignContent: 'center', alignItems: 'center' },
    CUSTOMERVIEWTO: {
        width: width * 0.8,
        margin: 2,
        borderRadius: 10,
        borderColor: Colors.borderColor,
        borderWidth: 1,
        backgroundColor: Colors.white,
    },
    CUSTOMERVIEWTO00: {
        width: width * 0.9,
        margin: 2,
        borderRadius: 10,
        borderColor: Colors.borderColor,
        borderWidth: 1,
        backgroundColor: Colors.white,
    },
    CUSTOMERVIEWTO9: {
        width: width * 0.93,
        margin: 2,
        borderRadius: 10,
        borderColor: Colors.borderColor,
        borderWidth: 1,
        backgroundColor: Colors.white,
    },
    NumberInputView: { flexDirection: 'row', alignSelf: 'center', paddingVertical: 8 },
    Width68: { width: width * 0.68, },
    Width75: { width: width * 0.75, marginHorizontal: 10 },
    Width755: { width: width * 0.83, marginHorizontal: 10 },
    Width80: { width: width * 0.8, },
    Width85: { width: width * 0.85 },
    FLEXDIREC1: { flexDirection: 'row' },
    RateText: {
        fontSize: 12,
        color: Colors.bluetheme1,
        fontFamily: FontFamily.Popinssemibold,
    },
    RateTextbold: {
        fontSize: 12,
        color: Colors.black,
        fontFamily: FontFamily.Popinssemibold,
    },
    RateTextboldblackCircle: {
        fontSize: 12,
        color: Colors.black,
        fontFamily: FontFamily.PopinsMedium,
    },
    MV1: { marginVertical: 1 },
    GRNFLLISTIMG: {
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    MV5: { marginVertical: 5 },
    HEIGHT8: { height: height * 0.8 },
    MV3: { marginVertical: 3 },
    MV5: { marginVertical: 5 },
    MV8: { marginVertical: 8 },
    RBVIEW: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
    },
    CloseIcon: { width: 14, height: 14 },
    SortView: { justifyContent: 'center', alignSelf: 'center', flex: 1 },
    Width9: { width: width * 0.9 },
    SortMainView: {
        justifyContent: 'center',
        alignSelf: 'center',
        width: width * 0.9,
    },
    CardText: {
        fontSize: FontSize.labelText5,
        fontFamily: FontFamily.PopinsMedium,
        color: Colors.black,
        alignSelf: 'center',
    },
    CloseIcon: { width: 14, height: 14 },
    RBText1: {
        fontSize: FontSize.labelText2,
        fontFamily: FontFamily.PopinsMedium,
        color: Colors.black
    },
    SortView: { justifyContent: 'center', alignSelf: 'center', flex: 1 },
    Width9: { width: width * 0.9 },
    SortMainView: {
        justifyContent: 'center',
        alignSelf: 'center',
        width: width * 0.9,
    },
    CardText1: {
        fontSize: FontSize.labelText3,
        fontFamily: FontFamily.PopinsMedium,
        color: Colors.black,
        alignSelf: 'flex-start',
        left: 10
    },
    BOTTOMTWOBUTTON: { flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center', width: width * 0.93, bottom: 10, position: 'absolute' }
})
export default styles;  