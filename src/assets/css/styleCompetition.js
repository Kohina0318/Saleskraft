import { Dimensions, StyleSheet } from 'react-native';
import { FontFamily } from '../../assets/fonts/FontFamily';
import { FontSize } from '../../assets/fonts/Fonts';
import { Colors } from '../../assets/config/Colors';
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    FontStyle:
    {
        fontSize: 13,
        color: Colors.black,
        fontFamily: FontFamily.PopinsRegular
    },
    container: {
        borderColor: 'grey',
    },
    header: {
        width: width,
        height: 180,
        backgroundColor: Colors.bluetheme,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        // flex:1
    },
    headerCTP: {
        width: width,
        height: 'auto',
        backgroundColor: Colors.bluetheme,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        // flex:1
    },
    innerContainer: {
        flexDirection: 'row',
        alignItems: 'stretch',
    },
    text: {
        fontSize: 12
    },
    headerFooterContainer: {
        padding: 10,
        alignItems: 'center',
    },
    clearButton: {
        backgroundColor: 'grey', borderRadius: 5,
        overflow: 'hidden', marginRight: 10, padding: 5
    },
    optionContainer: {
        padding: 10,
        borderBottomColor: 'lightgrey',
        // borderBottomWidth: 0.4,
        borderRadius: 50,
        overflow: 'hidden'
    },
    optionInnerContainer: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 50,
        overflow: 'hidden'
    },
    box: {
        width: 15,
        height: 15,
        marginRight: 5,
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 3,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    backgroundVideo: {
        height: 200,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    ChangeDoctorButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        height: 40,
        width: width * 0.3,
        top: 10,
        backgroundColor: Colors.bluetheme,
        borderRadius: 50
    },
    textStyle: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: FontSize.VText,
        fontFamily: FontFamily.PopinsMedium,
    },
    modalText: {
        marginBottom: 15,
        color: '#000',
        fontWeight: 'bold',
    },
    smalltext: {
        marginBottom: 30,
        fontSize: 12,
        color: '#000',
    },
    submittext: {
        fontSize: FontSize.h3,
        color: Colors.black,
        textAlign: 'center',
        width: width * 0.82,
        alignSelf: 'center',
        fontFamily: FontFamily.Popinssemibold,
        // top:5
    },
    submittextmini: {
        fontSize: FontSize.labelText,
        color: Colors.black,
        textAlign: 'center',
        // top: 3,
        justifyContent: 'center',
        alignSelf: 'center',
        fontFamily: FontFamily.PopinsRegular,
    },
    Text: {
        fontSize: FontSize.labelText4,
        fontFamily: FontFamily.PopinsRegular,
        color: Colors.white,
    },
    note:
    {
        fontSize: FontSize.small,
        fontWeight: '600',
        color: 'black'
    },
    txt1:
    {
        justifyContent: 'center',
        alignSelf: 'center',
        width: width * 0.9
    },
    InputText: {
        fontSize: FontSize.labelText,
        height: 50,
        fontFamily: FontFamily.PopinsRegular,
        top: 2,
    },
    textContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.borderColor,
        color: Colors.grey,
        overflow: 'hidden',
        backgroundColor: Colors.white,
    },
    QRIcon: {
        color: Colors.black,
        // left:5
    },
    positionbutton: {
        backgroundColor: Colors.bluetheme,
        borderRadius: 5,
        width: 'auto',
        height: 25,
        position: 'absolute',
        alignSelf: 'flex-end',
        top: 40,
        right: 10,
        paddingHorizontal: 5,
    },
    textStyleText: {
        fontSize: FontSize.labelText3,
        fontFamily: FontFamily.PopinsMedium,
        height: 40,
        color: Colors.black,
        top: 3,
        width: width * 0.4,
        left: 7,
    },
    item: {
        flex: 1,
        borderRadius: 3,
        margin: 2,
        width: '100%',
        borderWidth: 1,
        overflow: 'hidden',
        borderColor: Colors.borderColor,
    },
    center: {
        justifyContent: 'center',
        alignSelf: 'center',
    },
    title: {
        fontSize: FontSize.labelText,
        fontFamily: FontFamily.PopinsMedium,
        color: Colors.black,
        //lineHeight: 25,
    },
    title1: {
        fontSize: FontSize.smallText,
        fontFamily: FontFamily.PopinsMedium,
        color: Colors.grey,
        lineHeight: 25,
    },
    Borderline: {
        width: width * 0.9,
        justifyContent: 'center',
        alignSelf: 'center',
        borderWidth: 0.5,
        borderColor: Colors.borderColor,
    },
    LinearGradientStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 45,
        width: width * 0.9,
        borderRadius: 12,
        backgroundColor: Colors.bluetheme
    },
    buttonText: {
        fontSize: FontSize.h4,
        textAlign: 'center',
        color: Colors.white,
        fontFamily: FontFamily.PopinsMedium,
    },
    mainview:
        { flex: 1, backgroundColor: Colors.mainbg },
    innerview:
    {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        top: 35,
        // flex:1
    },
    hw:
        { width: 25, height: 30 },
    widths:
        { width: width * 0.82 },
    view:
    {
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: width * 0.9,
        alignSelf: 'center',
    },
    view1:
    {
        width: width * 0.44,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    calendar:
        { right: 6, fontSize: 14 },
    fontsize:
        { fontSize: 11 },
    H:
        { height: height },
    H1:
        { height: 10 },
    W:
        { width: '100%' },
    marg5:
        { marginVertical: 5 },
    widthcenter:
    {
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    view2:
    {
        width: width * 0.9,
        justifyContent: 'center'
    },
    picker:
    {
        fontSize: FontSize.labelText2,
        color: Colors.black,
        height: 10,
    },
    pickeritem:
        { color: '#000', fontWeight: 'bold', fontSize: 13 },
    marg7:
        { marginVertical: 7 },
    NotesView: { justifyContent: 'center', alignSelf: 'center', width: width * 0.9 },
    NoteText: { fontSize: FontSize.small, fontFamily: FontFamily.PopinsMedium, color: Colors.black },
    mv:
        { marginVertical: 20 },
    VikkuMV: { marginVertical: 80 },
    view3:
        { width: width * 0.8, height: 'auto' },
    textview:
    {
        fontSize: 12,
        fontFamily: FontFamily.PopinsMedium,
        textAlign: 'center', color: '#000'
    },
    marg2:
        { marginVertical: 2 },
    view4:
        { flexDirection: 'row', justifyContent: 'center' },

    MV15: { marginVertical: 15 },
    MV5: { marginVertical: 5 },

    CompMView1: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    CompMView2: {
        margin: 25,
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 6,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        }
    },
    CompMViewMarginV: { marginVertical: 5 },
    CompMText: {
        fontSize: FontSize.buttonText,
        fontFamily: FontFamily.Popinssemibold,
        color: Colors.black,
    },
    CompMView3: {
        height: 45,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.borderColor,
        color: Colors.grey,
        overflow: 'hidden',
        backgroundColor: Colors.white,
        width: width * 0.8
    },
    CompMInputText: {
        fontSize: FontSize.labelText2,
        color: Colors.black,
        left: 8
    },
    CompMView4: {
        height: 45,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.borderColor,
        color: Colors.grey,
        overflow: 'hidden',
        backgroundColor: Colors.white,
        width: width * 0.38,

    },
    CompMView5: {
        height: 90,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.borderColor,
        color: Colors.grey,
        overflow: 'hidden',
        backgroundColor: Colors.white,
        width: width * 0.8
    }




});
export default styles;  