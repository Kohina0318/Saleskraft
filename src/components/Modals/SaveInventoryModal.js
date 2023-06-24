import React, { useState } from 'react';
import {
    Image,
    View,
    Text,
    Modal,
    Dimensions,
} from 'react-native';
import { Colors } from '../../assets/config/Colors';
import StyleCss from '../../assets/css/styleOutlet';
import { FontFamily } from '../../assets/fonts/FontFamily';
import { FontSize } from '../../assets/fonts/Fonts';
const { width } = Dimensions.get('window');
import { useNavigation } from '@react-navigation/native';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';

export default function SaveInventoryModal(props) {
    const mode = useSelector(state => state.mode);
    const themecolor = new MyThemeClass(mode).getThemeColor()
    const navigation = useNavigation()
    const [modalVisible2, setModalVisible2] = useState(true);
    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible2}
                onRequestClose={() => setModalVisible2(false)}>

                <View style={StyleCss.centeredView}>
                    <View style={{...StyleCss.modalView,backgroundColor:themecolor.RB2}}>
                        <View style={StyleCss.ModalViewWidth}>
                            <View>
                                <Image source={require('../../assets/images/profile_user.png')}
                                    style={StyleCss.backgroundImageGifBell}
                                    resizeMode={'contain'}
                                />
                            </View>
                            <View style={StyleCss.MV2} />
                            <View>
                                <Text style={{ width: width * 0.8, color: themecolor.TXTWHITE, textAlign: 'center', justifyContent: 'center', fontFamily: FontFamily.Popinssemibold, fontSize: FontSize.labelText2 }}>
                                    {props.title}
                                </Text>

                            </View>
                            <View style={StyleCss.MV2} />
                            <View style={StyleCss.FLexCenter}>
                                <FullsizeButton width={width * 0.32} fontsize={11} BRadius={30} height={30} backgroundColor={themecolor.HEADERTHEMECOLOR} onPress={() => navigation.navigate('NewDashboard')} title='Submit' />
                                <FullsizeButton width={width * 0.25} fontsize={11} BRadius={30} height={30} backgroundColor={'transparent'} titlecolor={Colors.grey} onPress={() => navigation.navigate('NewDashboard')} title='Cancel' />
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    )
}