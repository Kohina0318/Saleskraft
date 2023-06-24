import { StyleSheet, Dimensions } from 'react-native';
import { FontFamily } from '../../assets/fonts/FontFamily';
import { FontSize } from '../../assets/fonts/Fonts';
import { Colors } from '../../assets/config/Colors';
const { width, height } = Dimensions.get('screen');

export default StyleSheet.create({
    flex:
        { flex: 1 },
    Height:
        { height: height * 0.8 },
    Height1:
        { height: height },
    mainview:
    {
        justifyContent: 'center',
        alignSelf: 'center',
        width: width * 0.94,
        marginTop: 30
    },
    headtext:
    {
        fontSize: FontSize.labelText2,
        fontFamily: FontFamily.Popinssemibold,
        color: Colors.black,
    },
    innerview:
    {
        backgroundColor: '#FFFFFF',
        borderColor: Colors.borderColor,
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 10,
        width: width * 0.93,
        padding: 10
    },
    innerview1:
    {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: width * 0.82,
        alignSelf: 'center',
        paddingVertical: 8,
    },
    viewCol: {
        width: width * 0.41,
    },
    innertext:
    {
        color: Colors.black,
        fontSize: FontSize.labelText,
        flexDirection: 'column',
        fontFamily: FontFamily.PopinsRegular
    },
    righttext:
    {
        color: Colors.black,
        fontSize: FontSize.labelText,
        flexDirection: 'column',
        fontFamily: FontFamily.PopinsMedium,
        textAlign: "right"
    },
    righttext1:
    {
        color: Colors.red,
        fontSize: FontSize.labelText,
        flexDirection: 'column',
        fontFamily: FontFamily.PopinsMedium,

    },
    righttext2:
    {
        color: Colors.green,
        fontSize: FontSize.labelText,
        flexDirection: 'column',
        fontFamily: FontFamily.PopinsMedium,
        textAlign: "right"
    },
    divider:
    {
        height: height * 0.01,
        width: width * 0.85,
        alignSelf: 'center',
        color: Colors.borderColor,
    },
    bottomview:
    {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: width * 0.82,
        alignSelf: 'center',
        paddingVertical: 10,
        fontSize: FontSize.VText,
    },
    touchview:
    {
        backgroundColor: Colors.bluetheme,
        width: width,
        position: 'absolute',
        bottom: 0,
        height: 65,
        justifyContent: 'center'
    },
    mainView:
    {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10
    },
    innerView:
    {
        width: width * 0.6,
    },
    buttontext:
    {
        color: 'white',
        fontSize: 14,
        fontFamily: FontFamily.PopinsRegular
    },
    imageview:
    {
        width: width * 0.18,
        alignItems: 'center',
        justifyContent:"center",
    },
    img:
        { width: 24, height: 12 },
    MainView:
    {
        justifyContent: 'center',
        alignSelf: 'center',
        flex: 1,
        width: width * 0.93,
        marginTop: 10,
        borderRadius: 10,
        overflow: 'hidden',
        borderColor: Colors.borderColor,
        borderWidth: 1,
    },
    InnerView:
    {
        flexDirection: 'row',
        paddingVertical: 5,
        backgroundColor: Colors.white,
        overflow: 'hidden',
        paddingVertical: 8,
    },
    Width:
    {
        width: width * 0.7,
    },
    text:
    {
        fontSize: FontSize.labelText,
        color: Colors.black,
        fontFamily: FontFamily.Popinssemibold,
    },
    view:
    {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    Fd:
        { flexDirection: 'row' },
    text1:
    {
        fontSize: 11,
        color: Colors.black,
        fontFamily: FontFamily.PopinsRegular,

    },
    text2:
    {
        fontSize: 10,
        color: Colors.black,
        fontFamily: FontFamily.PopinsRegular,
        borderWidth: 1,
        borderColor: Colors.borderColor,
        borderRadius: 5,
        padding: 2,
        textAlign: 'center',
        height: 19
    },
    text3:
    {
        fontSize: 11,
        color: Colors.bluetheme,
        fontFamily: FontFamily.PopinsRegular,
        marginLeft: 6
    },
    text4:
    {
        // alignSelf: 'center', 
        fontSize: 11,
        color: Colors.bluetheme,
        fontFamily: FontFamily.PopinsRegular,
    },
    text5:
    {
        color: 'black',
        fontFamily: FontFamily.Popinssemibold
    },

    mainviewlist:
    {
        justifyContent: 'flex-start',
        alignSelf: 'center',
        flex: 1,
    },
    touchviewList:
    {
        width: width * 0.93,
        margin: 2,
        top: 4,
        borderRadius: 10,
        overflow: 'hidden',
        borderColor: Colors.borderColor,
        borderWidth: 0.5,
    },
    innerviewList:
    {  //width: width * 0.93,
        flexDirection: 'row',
        paddingVertical: 5,
        backgroundColor: Colors.white,
        overflow: 'hidden',
    },
    containerList: {

        alignItems: "center",
        justifyContent: "center",
    },
    checkboxContainerList: {
        justifyContent: 'center',
        color: Colors.gray,
    },
    picList:
    {
        width: width * 0.2,
        justifyContent: 'center',
        alignSelf: 'center',
        padding:5
    },
    GRNFLLISTIMGList: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    innerview1List:
    {
        alignSelf: 'center',
    },
    innerviewVList:
    {
        width: width * 0.76,
        flexDirection: 'row',
        overflow: 'hidden',
    },
    txtList:
    {
        fontSize: FontSize.labelText,
        color: Colors.black,
        fontFamily: FontFamily.PopinsMedium,
    },
    txt1List:
    {
        fontSize: 10,
        color: Colors.bluetheme,
        fontFamily: FontFamily.PopinsRegular,
        width: width * 0.7
    },
    txt1SaveList:
    {
        fontSize: 11,
        color: Colors.green,
        fontFamily: FontFamily.PopinsRegular,
        width: width * 0.7
    },
    txt2List:
    {
        fontSize: 10,
        color: Colors.black,
        fontFamily: FontFamily.PopinsRegular,

    },
    txtLineList:
    {
        fontSize: 11,
        color: "grey",
        fontFamily: FontFamily.PopinsRegular,
        textDecorationLine: 'line-through'
    },
    NumericInputViewList:
    {
        width: width * 0.10,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        alignSelf: 'center',
        // marginRight: 8,
    },
    marVerList:
        { marginVertical: 1 },

    RBVIEW: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
    },
    CloseIcon: { width: 14, height: 14 },
    CardText: {
        fontSize: FontSize.labelText5,
        fontFamily: FontFamily.PopinsMedium,
        color: Colors.black,
        alignSelf: 'center',
    },
    CardText1: {
        fontSize: FontSize.labelText3,
        fontFamily: FontFamily.PopinsMedium,
        color: Colors.black,
        alignSelf: 'flex-start',
        left: 10
    },
    RBText: {
        fontSize: FontSize.labelText2,
        fontFamily: FontFamily.PopinsMedium,
        color: Colors.black,
        color: Colors.bluetheme
    },
    RBText1: {
        fontSize: FontSize.labelText2,
        fontFamily: FontFamily.PopinsMedium,
        color: Colors.bluetheme
    },
    Width9: { width: width * 0.9 },
    RadioView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'flex-start',
      },
      RadioText: {
        top: 10,
        fontFamily: FontFamily.PopinsRegular,
        color: Colors.black,
        fontSize: FontSize.labelText,
      },
    


})