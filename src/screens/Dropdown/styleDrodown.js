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
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.borderColor,
        color: Colors.grey,
        overflow: 'hidden',
        backgroundColor: Colors.white,
        height:45
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
        fontSize: FontSize.labelText,
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
        lineHeight: 25,
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
        alignSelf: 'center',
    },
    view1:
    {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    calendar:
        { right: 6, fontSize: 14, alignSelf: 'center', justifyContent: 'center' },
    fontsize:
        { fontSize: 11 },
    H:
        { height: height },
    H1:
        { height: 2,
        },
    W:
        { width:width * 0.8, },
    W1:
     { width: 0.8 },
    marg5:
    {
        marginVertical: 5,
    },
    widthcenter:
    {
        width: width * 0.97,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
       
    },
    widthcenterCustom:
    {
        // width: width,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical:10
    },
    view2:
    {
        width: width * 0.98,
    },
    viewCustom:
    {
        width: width * 0.86,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    picker:
    {
        fontSize: 13,
        color: 'black',
        fontWeight: 'bold',
        height: 10,
    },
    pickeritem:
        { color: '#333', fontWeight: 'bold' },
    marg7:
        { marginVertical: 7 },
    NotesView:
    {
        justifyContent: 'center',
        alignSelf: 'center',
        width: width * 0.9
    },
    NoteText:
    {
        fontSize: FontSize.small,
        fontFamily: FontFamily.PopinsMedium,
        color: Colors.black
    },
    mv:
        { marginVertical: 20 },
    VikkuMV:
    {
        marginVertical: 80
    },
    view3:
    {
        width: width * 0.8,
        height: 'auto'
    },
    textview:
    {
        fontSize: 12,
        fontFamily: FontFamily.PopinsMedium,
        textAlign: 'center', color: '#000'
    },
    marg5:
        { marginVertical: 5 },
    marg10:
        { marginVertical: 10 },

    view4:
        { flexDirection: 'row', justifyContent: 'center' },

    MV15:
    {
        marginVertical: 15
    },
    MV10:
    {
        marginVertical: 10
    },
    mainContainer:
    {
        flex: 1,
    },
    itemV: {
        width: width * 0.95,
        borderRadius: 10,
        borderColor: '#666',
        // elevation: 5,
        borderWidth: 1,
        borderColor: Colors.borderColor,
        marginBottom: 8,
    },
    backgroundFlat: {
        justifyContent: 'center',
        width: width * 0.94,
    },
    TC: {
        width: width * 0.9,
        alignSelf: 'center',
    },
    List: {
        fontSize: 14,
        color: '#000',
        fontWeight: 'bold',
        left: 10,
        fontFamily: FontFamily.PopinsMedium
    },
    IconRight:
    {
        color: '#000',
        alignSelf: 'flex-end',
        justifyContent: 'flex-end'
    },
    MainView: {
        width: width * 0.9,
        alignSelf: 'center',
        overflow: 'hidden',
        height: 50,
    },
    MainVIew2: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      },
      checkboxContainer: {
        flexDirection: "row",
        marginBottom: 20,
      },
      checkbox: {
        alignSelf: "center",
      },
      label: {
        margin: 8,
      },
});
export default styles;