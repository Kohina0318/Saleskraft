import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, Image } from 'react-native'
import StyleCss from '../../assets/css/styleOutlet';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';
import { Colors } from '../../assets/config/Colors';

export default ConfirmationModal = (props) => {
    const mode = useSelector(state => state.mode);
    const themecolor = new MyThemeClass(mode).getThemeColor()
    // const navigation = useNavigation()
    const [modalVisible2, setModalVisible2] = useState(true);

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible2}>
            <View style={StyleCss.centeredView}>
                <View style={{...StyleCss.modalView,backgroundColor:themecolor.RB2}}>
                    <View style={StyleCss.ModalViewWidth}>
                        <View
                            style={StyleCss.ModelVideoCenter}>
                            {/* <Video
                                source={require('../../assets/images/expesne/confirmation.mp4')}
                                style={StyleCss.backgroundVideo}
                                muted={true}
                                resizeMode={'contain'}
                                repeat={true}
                                rate={2.0}
                                ignoreSilentSwitch={'obey'}
                            /> */}
                            <Image resizeMode='center' style={{ width: 'auto', height: 200 }} source={require('../../assets/images/expesne/areusure.png')} />

                            <Text style={{...StyleCss.submittext,color:themecolor.TXTWHITE}}>
                                {props.title}
                            </Text>
                        </View>
                        <View style={StyleCss.MV2} />

                        <View style={StyleCss.FLexCenter}>
                            <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={props.onConfirm}>
                                <View style={{...StyleCss.ModelDoneButton,backgroundColor:themecolor.HEADERTHEMECOLOR}}>
                                    <Text
                                        style={StyleCss.textStyleDone}>
                                        {props.btnlabel}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            {(!props.singleb) ?
                                <TouchableOpacity
                                    activeOpacity={0.5}
                                    // onPress={() => handleClickOnDone()}
                                    onPress={() => { props.setmodalVisible1(false) }}>
                                    <View style={{ ...StyleCss.ModelDoneButton, backgroundColor: themecolor.RB2}}>
                                        <Text
                                            style={{ ...StyleCss.textStyleDone, color: Colors.grey }}>
                                            No
                                        </Text>
                                    </View>
                                </TouchableOpacity> : <></>}
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

