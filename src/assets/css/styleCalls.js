import { StyleSheet, Dimensions } from 'react-native';
import { FontFamily } from '../../assets/fonts/FontFamily';
import { Colors } from '../../assets/config/Colors';
const { width, } = Dimensions.get('screen');

export default StyleSheet.create({
    MainView:
    {
        flex: 1, backgroundColor: Colors.mainbg
    },
    SearchInputView: {
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        
      },
      PH10: { paddingHorizontal: 10 },
      InputText: { backgroundColor: 'transparent', width: width * 0.8, fontFamily: FontFamily.PopinsRegular, top: 2 },
    container: {
        borderColor: 'grey',
    },
    MainView2:{flex: 1, backgroundColor: Colors.mainbg},
    View93:{width: width * 0.93, alignSelf: 'center'},
    SearchInputView:{
      backgroundColor: 'white',
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 10,
      alignSelf:'center'
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
    },
    PH10:{paddingHorizontal: 8},
    FL1: {
        flexDirection: 'row',
        alignItems: 'center',
        left: -5,
    },
    FLHeadText: {
        fontFamily: FontFamily.Popinssemibold,
        color: Colors.black,
        fontSize: 13,
    },


})