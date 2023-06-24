import { StyleSheet, Dimensions } from 'react-native';
import { FontFamily } from '../fonts/FontFamily';
import { Colors } from '../config/Colors';
import { FontSize } from '../fonts/Fonts';
const { width } = Dimensions.get('screen');

const styles = StyleSheet.create({
    marg2:
        { marginVertical: 2 },
    mainview:
        { justifyContent: 'center', alignSelf: 'center', alignContent: 'center', alignItems: 'center', backgroundColor:'red'},
    innerview:
    {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        alignItems:'center',
        overflow: 'hidden',
        width: width * 0.94,
        padding: 4,
        borderRadius: 10,
        borderColor: Colors.borderColor,
        borderWidth: 0.5,
        alignSelf:'center'
    },
    View:
        { flex: 0.8, justifyContent:"center",alignItems:"center",paddingRight:10},
    View1:
        {backgroundColor: 'lightgray', borderRadius: 50, height: 50, width: 50, overflow: 'hidden',justifyContent:'center',alignItems:'center'},
    text:
    {
        fontSize: FontSize.labelText2,
        color: Colors.black,
        fontFamily: FontFamily.Popinssemibold,
    },
    text1:
    {
        fontSize: 10,
        color: Colors.black,
        fontFamily: FontFamily.PopinsRegular,
        width: width * 0.7
    },
    dateview:
        { width: width * 0.25, },
    text2:
    {
        fontSize: 10.5,
        color: Colors.gray,
        fontFamily: FontFamily.Popinssemibold,
        width: width * 0.7,
        color:"#3862F8",
    },
})
export default styles;  