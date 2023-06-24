import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, } from 'react-native'
import Video from 'react-native-video';
import StyleCss from '../../assets/css/styleOutlet';
import { useNavigation } from '@react-navigation/native';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';

export default VerifyModal = (props) => {
    const mode = useSelector(state => state.mode);
    const themecolor = new MyThemeClass(mode).getThemeColor()
    const navigation = useNavigation()
    const [modalVisible2, setModalVisible2] = useState(true);

    const handleClickOnDone = () => {
        if (props.outletId == undefined) {
            setModalVisible2(!modalVisible2)
            navigation.push(props.navigateTo, {
                navigateFrom: props.navigateFrom,
            });
        } else {
            setModalVisible2(!modalVisible2)
            navigation.push(props.navigateTo, {
                navigateFrom: props.navigateFrom,
                outletId: props.outletId,
                outletType: props.outletType,
                screen: 'SalesOrderDetails'
            });
        }
        //   props.setShowmodal(false)
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible2}
        // onRequestClose={() => {
        //     setModalVisible2(!modalVisible2);
        // }}
        >
            <View style={StyleCss.centeredView}>
                <View style={{...StyleCss.modalView,backgroundColor:themecolor.RB2}}>
                    <View style={StyleCss.ModalViewWidth}>
                        <View
                            style={StyleCss.ModelVideoCenter}>
                            <Video
                                source={require('../../assets/images/expesne/confirmation.mp4')}
                                style={StyleCss.backgroundVideo}
                                muted={true}
                                resizeMode={'contain'}
                                repeat={true}
                                rate={2.0}
                                ignoreSilentSwitch={'obey'}
                            />
                            <Text style={{...StyleCss.submittext,color:themecolor.TXTWHITE}}>
                                {props.title}
                            </Text>
                        </View>
                        <View style={StyleCss.MV2} />

                        <View style={StyleCss.FLexCenter}>
                            <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={() => handleClickOnDone()}
                            // onPress={() => setModalVisible2(!modalVisible2)}
                            >
                                <View style={{...StyleCss.ModelDoneButton,backgroundColor:themecolor.HEADERTHEMECOLOR}}>
                                    <Text
                                        style={{...StyleCss.textStyleDone,}}>
                                        Done
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )
}
