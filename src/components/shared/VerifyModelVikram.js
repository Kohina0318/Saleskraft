import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, } from 'react-native'
import Video from 'react-native-video';
import StyleCss from '../../assets/css/styleOutlet';
import { useNavigation } from '@react-navigation/native';

export default VerifyModal = (props) => {
    const navigation = useNavigation()
    const [modalVisible2, setModalVisible2] = useState(true);
    const handleClickOnDone = () => {
        setModalVisible2(!modalVisible2)
        navigation.push(props.navigateTo, {
            navigateFrom: props.navigateFrom
        });
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
                <View style={StyleCss.modalView}>
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
                            <Text style={StyleCss.submittext}>
                                Your request has been successfully
                            </Text>
                            <Text style={StyleCss.submittext}>
                                submited for approval
                            </Text>
                        </View>
                        <View style={StyleCss.MV2} />
                        {/* </View> */}
                        <View style={StyleCss.FLexCenter}>
                            <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={() => handleClickOnDone()}
                            // onPress={() => setModalVisible2(!modalVisible2)}
                            >
                                <View
                                    style={StyleCss.ModelDoneButton}>
                                    <Text
                                        style={StyleCss.textStyleDone}>
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
