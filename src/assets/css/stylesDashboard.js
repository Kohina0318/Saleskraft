import { StyleSheet, Dimensions } from 'react-native';
import { FontFamily } from '../fonts/FontFamily';
import { FontSize } from '../fonts/Fonts';
import { Colors } from '../config/Colors';
const { width } = Dimensions.get('screen');
import Color from '../../components/Theme/ThemeDarkLightColor';

const styles = StyleSheet.create({

    // FOR RING ANIMATION ON NOTIFICATION
    box: {
        width: 100,
        height: 100,
        backgroundColor: "tomato",
      },
      ring: {
        position: "absolute",
        width: 40,
        right:0,
        bottom:-1.3,
        left:-1.8,
        height: 40,
        borderRadius: 50,
        borderColor: "#fff",
        borderWidth: 5,
      },
      ////////////////////////////

    cardsView: {
        alignSelf: 'center',
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: Colors.borderColor,
        height: 'auto',
        // top:8,
        borderRadius: 12,
        overflow: 'hidden',
        flex: 1,
    },
    Borderline: {
        width: width,
        justifyContent: 'center',
        alignSelf: 'center',
        borderWidth: 0.5,
        borderColor: Colors.borderColor,
    },
    RBText: {
        fontSize: FontSize.labelText2,
        fontFamily: FontFamily.PopinsMedium,
        color: Colors.black,
    },

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    circleimg: {
        width: 280,
        height: 200,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
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
        borderRadius: 50,
        alignSelf: 'center',
    },
    textStyle: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: FontSize.labelText,
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
        // textAlign: 'center',
        width: width * 0.82,
        alignSelf: 'center',
        fontFamily: FontFamily.Popinssemibold,
        // top: 5,
    },
    underlineStyleBase: {
        width: 55,
        height: 45,
        borderWidth: 0,
        borderRadius: 10,
        backgroundColor: Colors.Textinputbg,
        color: Colors.black,
    },

    underlineStyleHighLighted: {
        borderColor: "#03DAC6",
    },
    backgroundVideo: {
        height: 130,

    },
    ProImage: {
        height: 120,
        width: 120,
        borderRadius: 150,
    },
    ProImageView: {
        display: "flex",
        alignSelf: 'center'
    },
    InputText: {
        fontSize: FontSize.labelText,
        height: 80,
        fontFamily: FontFamily.PopinsRegular,
        left: 2,
        // width: width * 0.9,
        width: '100%',
    },

    Text: {
        fontSize: FontSize.labelText,
        fontFamily: FontFamily.PopinsRegular,
        color: Colors.white,
    },
    backgroundImageGifBell: {
        height: 100,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    CardText: {
        fontSize: FontSize.labelText3,
        fontFamily: FontFamily.PopinsMedium,
        color: Colors.black,
        alignSelf: 'center',
        // backgroundColor:'blue'
    },
    PercentageText: {
        fontSize: FontSize.labelText5,
        fontFamily: FontFamily.PopinsMedium,
        color: Colors.black,
        alignSelf: 'center',
    },
    CardTextRBNew: {
        fontSize: FontSize.small,
        fontFamily: FontFamily.PopinsMedium,
        color: Colors.black,
        alignSelf: 'center',
        marginLeft: 5,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        width: width * 0.8
    },
    FULLBVIew: {
        justifyContent: 'center',
        alignSelf: 'center',
        top: 10,
    },
    LinearGradientStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 55,
        width: width * 0.8,
        borderRadius: 12,
    },
    buttonText: {
        fontSize: FontSize.h4,
        textAlign: 'center',
        color: Colors.white,
        fontFamily: FontFamily.PopinsMedium,
        // textTransform:'uppercase'
    },
    FontStyle: {
        fontSize: FontSize.small,
        color: Color.Color.TXTWHITE,
        fontFamily: FontFamily.PopinsRegular,
    },
    innerContainer: {
        flexDirection: 'row',
        alignItems: 'stretch',
    },
    text: {
        fontSize: 11,
        // color: 'white',
    },
    clearButton: {
        backgroundColor: 'grey',
        borderRadius: 5,
        marginRight: 10,
        padding: 5,
    },
    optionContainer: {
        padding: 10,
        borderBottomColor: 'lightgrey',
        borderBottomWidth: 0.4,
    },
    header: {
        width: width,
        height: 'auto',
        // backgroundColor: Colors.bluetheme,
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
    },
    EndMYDAY: {
        width: width * 0.92,
        alignSelf: 'center',
        backgroundColor: Colors.white,
        // borderWidth: 1,
        // borderColor: Colors.borderColor,
        borderRadius: 12,
        overflow: 'hidden',
        height: 70,
    },
    EndMYDAYShimmer: {
        width: width * 0.92,
        alignSelf: 'center',
        borderRadius: 12,
        overflow: 'hidden',
        height: 70,
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: Colors.borderColor,
        borderRadius: 12,
    },
    EndMYDAY2: {
        flex: 1,
        height: 70,
        justifyContent: 'center',
        alignSelf: 'flex-start',
    },
    FLEXJ: { flex: 1, justifyContent: 'center', },
    LEFT20: { left: 20 },
    STARTBEATTEXT: {
        fontSize: FontSize.labelTextbig,
        color: Colors.black,
        fontFamily: FontFamily.Popinsbold,
    },
    BEATICON: { flexDirection: 'row', top: -8 },
    BEATVIew: {
        width: 15,
        height: 12,
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    SelectBeatText: {
        fontSize: FontSize.labelText,
        color: Colors.bluetheme1,
        fontFamily: FontFamily.PopinsMedium,
        left: 4,
        top: 2,
    },
    SelectBeatTextNew: {
        fontSize: FontSize.labelText,
        color: Colors.bluetheme1,
        fontFamily: FontFamily.PopinsMedium,
        left: 0,
        top: 2,
    },
    PlayIconView: {
        backgroundColor: '#0887fc',
        borderRadius: 50,
        width: 15,
        height: 15,
        justifyContent: 'center',
        alignSelf: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    PlayIconstyle: { fontSize: 9, left: 1 },

    StartDayText: {
        fontSize: FontSize.labelText,
        color: Colors.bluetheme1,
        fontFamily: FontFamily.PopinsMedium,
        left: 4,
        top: 2,
    },
    RBSHETT: { justifyContent: 'center', alignSelf: 'center', },
    RBSHETT2: { flexDirection: 'row', alignItems: 'center', alignSelf: 'center', },
    RadioVIew: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'flex-start',
    },
    MV10: { marginVertical: 10 },
    GEOADDRESSVIEW: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',
        width: width * 0.9,
    },
    CLOCKINVIEW: {
        alignSelf: 'center',
        width: width * 0.85,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    AITEMS: { alignItems: 'center' },
    ClockINText: {
        color: Colors.black,
        fontFamily: FontFamily.PopinsRegular,
        fontSize: FontSize.smallText
    },
    TIMECLOCK: {
        fontSize: FontSize.h3,
        fontFamily: FontFamily.PopinsMedium,
        color: Colors.black,
    },
    flexDirectionVIEW: { flexDirection: 'row' },
    RadioText: {
        top: 10,
        fontFamily: FontFamily.PopinsRegular,
        color: Colors.black,
        fontSize: FontSize.labelText,
    },
    Modal85: { width: width * 0.85, height: 'auto',},
    CenterView: {
        justifyContent: 'center',
        alignSelf: 'center',
    },
    R1: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'flex-start',
    },
    BoxHeading: {
        top: 10,
        fontFamily: FontFamily.PopinsRegular,
        color: Colors.black,
        fontSize: FontSize.labelText,
    },
    Borderline2: {
        borderWidth: 0.2,
        borderColor: 'lightgrey',
        width: width * 0.85,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    MV5: { marginVertical: 5 },
    MV2: { marginVertical: 2 },
    SubmitBVIew: { flexDirection: 'row', paddingHorizontal: 10, justifyContent: 'center', alignSelf: 'center' },
    SubmitButtonStyle: {
        height: 30,
        width: width * 0.25,
        top: 10,
        backgroundColor: Colors.bluetheme,
        borderRadius: 50,
        justifyContent: 'center'
    },
    CencelButton: {
        height: 30,
        width: width * 0.25,
        top: 10,
        backgroundColor: Colors.white,
        borderRadius: 50,
        justifyContent: 'center'
    },
    FirstRBVIEW: { justifyContent: 'center', alignSelf: 'center', flex: 1 },
    RBCardText: {
        fontSize: FontSize.LabelText70,
        fontFamily: FontFamily.PopinsMedium,
        color: Colors.black,
        alignSelf: 'center',
        top: 20,
        // backgroundColor:'yellow'
    },
    AMPMText: {
        fontSize: FontSize.labelText5,
        fontFamily: FontFamily.Popinssemibold,
        color: Colors.black,
        // top:5,
        // left:5,
        // textAlignVertical: 'top', 
        textAlignVertical: 'bottom',
        position: 'absolute',
        bottom: 1,
        marginHorizontal: 125
    },
    RBSHETT: { justifyContent: 'center', alignSelf: 'center', },
    RBSHETT2: { flexDirection: 'row', alignItems: 'center', alignSelf: 'center', },
    MV10: { marginVertical: 10 },
    CLOCKINVIEW: {
        alignSelf: 'center',
        width: width * 0.85,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    AITEMS: { alignItems: 'center' },
    TIMECLOCK: {
        fontSize: FontSize.h3,
        fontFamily: FontFamily.PopinsMedium,
        color: Colors.black,
    },
    GEOADDRESSVIEW: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',
        width: width * 0.9,
    },
    FULLBVIew: {
        justifyContent: 'center',
        alignSelf: 'center',
        top: 10,
    },
    flexDirectionVIEW: { flexDirection: 'row' },
    PV30: { paddingVertical: 30 },
    ClockINText: { color: Colors.black, fontFamily: FontFamily.PopinsRegular, fontSize: FontSize.smallText },
    RBNEWVIEW: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',
        width: width * 0.9,
    },
    SDBVIEW: {
        justifyContent: 'center',
        alignSelf: 'center',
        top: 10,
    },
    PV30: { paddingVertical: 30 },
    PV15: { paddingVertical: 15 },
    DailyCallView: {
        flexDirection: 'row',
        width: width * 0.9,
        alignSelf: 'center',
        justifyContent: 'space-between',
        marginTop: 5
    },
    CardTextDC: {
        fontSize: FontSize.labelText2,
        fontFamily: FontFamily.PopinsMedium,
        color: Colors.black,
        alignSelf: 'center',
    },
    DailyCallView2: {
        alignSelf: 'center',
        backgroundColor: Colors.white,
        borderWidth: 1,
        overflow: 'hidden',
        borderColor: Colors.bluetheme,
        height: 25,
        borderRadius: 15,
    },
    DCFLex: {
        flex: 1,
        flexDirection: 'row',
    },
    TODAYBUTTOn: {
        justifyContent: 'center',
        // backgroundColor: bg == 1 ? '#4261f7' : '#FFF',
        padding: 3,
        height: 25,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        paddingHorizontal: 5
    },
    TodayButtonStyle: {
        fontSize: FontSize.verysmallText,
        fontFamily: FontFamily.PopinsMedium,
        color: Colors.black,
        alignSelf: 'center',
    },
    YesterDayButton: {
        justifyContent: 'center',
        padding: 3,
        height: 25,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        paddingHorizontal: 5
    },
    CustomSelect: {
        width: 'auto',
        alignSelf: 'center',
        backgroundColor: Colors.bluetheme,
        borderWidth: 1,
        overflow: 'hidden',
        borderColor: Colors.bluetheme,
        borderRadius: 15,
        top: 5,
    },
    CustomSelect2: {
        justifyContent: 'center',
        backgroundColor: Colors.bluetheme,
        width: 85,
        height: 'auto',
        alignSelf: 'center',
        padding: 3,
    },
    SIMPLEICON: {
        justifyContent: 'flex-end',
        position: 'absolute',
        alignSelf: 'flex-end',
        right: 8,
        color: '#FFF',
    },
    New: {
        flex: 1,
        height: 'auto',
        padding: 8
    },
    NewFlexD: {
        flexDirection: 'row',
        paddingVertical: 5,
    },
    FlexView: {
        width: width * 0.45,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 5,

    },
    FlexPoint: {
        fontSize: FontSize.labelText3,
        color: Colors.bluetheme,
        fontFamily: FontFamily.Popinssemibold,
    },
    FD: {
        flexDirection: 'row', alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    TargetText: {
        fontSize: FontSize.labelText,
        color: Colors.black,
        fontFamily: FontFamily.Popinssemibold,
        alignItems: 'flex-start',
    },
    TargetText2: {
        fontSize: FontSize.labelText,
        color: Colors.bluetheme,
        fontFamily: FontFamily.PopinsRegular,
    },
    HeadView: {
        justifyContent: 'center',
        marginVertical: 30
    },
    Head2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        padding: 15,
        width: width,
    },
    HeadSmallView: { top: -10, width: width * 0.1, },
    Menu: { width: 20, height: 20 },
    ProfileIcon: { width: width * 0.1, top: -5 },
    ProfileUser: {
        width: 35,
        height: 35,
        borderRadius: 50,
    },
    BellIcon: {
        width: 22,
        height: 22,
    },
    TextGood: { width: width * 0.65, top: 8, left: 5 },
    TextGood2: {
        fontFamily: FontFamily.PopinsRegular,
        color: Colors.white,
        fontSize: 16,
        top: -6,
    },
    LastView: { top: -13, width: width * 0.1 },
    AMPMText: {
        fontSize: FontSize.labelText5,
        fontFamily: FontFamily.Popinssemibold,
        color: Colors.black,
        // top:5,
        // left:5,
        // textAlignVertical: 'top', 
        textAlignVertical: 'bottom',
        position: 'absolute',
        bottom: 1,
        marginHorizontal: 125
    },
});
export default styles;  