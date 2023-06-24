import { Dimensions, StyleSheet } from 'react-native';
import { FontFamily } from '../../assets/fonts/FontFamily';
import { Colors } from '../../assets/config/Colors';
import { FontSize } from '../../assets/fonts/Fonts';
const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
    mainview:
    {
        width: width - 30,
        alignSelf: 'center',
        marginTop: 10,
        borderRadius: 7,
        overflow: 'hidden',
        // elevation: 0.5,
        marginBottom: 1,
        borderWidth:0.5
    },
    innerview:
    {
        height: height * 0.2,
        overflow: 'hidden'
    },
    innerview1:
    {
        height: 'auto',
        backgroundColor: Colors.white,
        padding: 10
    },
    txt:
    {
        color: Colors.bluetheme,
        fontFamily: FontFamily.PopinsMedium,
        fontSize: FontSize.labelText2
    },
    txt1:
    {
        fontFamily: FontFamily.Popinssemibold,
        color: Colors.black,
        fontSize: FontSize.labelText
    },
    txt2:
    {
        fontFamily: FontFamily.PopinsRegular,
        fontSize: 10,
        color: Colors.black
    },
    returnview:
        { flex: 1, backgroundColor: Colors.mainbg },
    flex:
        { flex: 0.88 }
})

export default styles;  