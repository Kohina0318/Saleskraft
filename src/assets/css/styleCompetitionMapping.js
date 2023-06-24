import { StyleSheet, Dimensions } from 'react-native';
import { FontFamily } from '../fonts/FontFamily';
import { FontSize } from '../fonts/Fonts';
import { Colors } from '../config/Colors';
const { width } = Dimensions.get('screen');

const styles = StyleSheet.create({
    mainView:
    {
        width: width * 0.95,
        marginTop: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center'
    },
    innerView:
    {
        width: width * 0.95,
        height: 'auto',
        paddingBottom: 8
    },
    heading:
    {
        fontSize: FontSize.labelText,
        fontFamily: FontFamily.Popinssemibold,
        color: Colors.black,
    },
    boxView:
    {
        height: 40,
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: Colors.borderColor,
        color: Colors.grey,
        overflow: 'hidden',
        backgroundColor: Colors.white,
        width: width * 0.94,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    textinput:
    {
        fontSize: FontSize.small,
        fontFamily: FontFamily.PopinsMedium,
        color: Colors.black,
        left: 8
    },
    view:
    {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textinput1:
    {
        height: 40,
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: Colors.borderColor,
        color: Colors.grey,
        overflow: 'hidden',
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignSelf: 'center',
        width: width * 0.55,
    },
    textinput2:
    {
        height: 40,
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: Colors.borderColor,
        color: Colors.grey,
        overflow: 'hidden',
        backgroundColor: Colors.white,
        width: width * 0.2,
    },
    ButtonView:
    {
        position: 'relative',
        width: width * 0.14,
       // backgroundColor:"red"
    },
    container:
    {
        height: 70,
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: Colors.borderColor,
        color: Colors.grey,
        overflow: 'hidden',
        backgroundColor: Colors.white,
        width: width * 0.94,
    },
    boxText:
    {
        fontSize: FontSize.small,
        fontFamily: FontFamily.PopinsMedium,
        color: Colors.black,
        left: 8,
        textAlignVertical: 'top'
    },
    camView:
    {
        backgroundColor: "white",
        height: 51,
        width: 51,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: Colors.borderColor,
        color: Colors.grey,
        alignSelf: 'flex-start',
        justifyContent:'center',
        alignItems:'center'
    },
    viewImage:{width: 50, height: 50, borderRadius: 10},
    iconTouchableOpacity:{position: 'absolute', right: -5, top: -5},
    MT:
    { marginTop: 8 },

    bottombuttonimg: {
        justifyContent: 'center',
        alignSelf: 'center',
        height: 18,
        width: 18,
        overflow: 'hidden',
    },
    bottombuttonicon: {
        justifyContent: 'center',
        alignSelf: 'center',
        overflow: 'hidden',
    },
    bottombutton: {
        width: 50,
        height: 39,
        backgroundColor: Colors.bluetheme,
        borderRadius: 10,
        justifyContent: 'center',
        alignSelf: 'flex-end',
        //right: 10,
        position: 'absolute',
        //bottom: 10,
    },

})
export default styles;  