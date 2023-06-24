import React, { useState } from 'react';
import { Modal, View, Text, Image, Dimensions } from 'react-native';
import StyleCss from '../../assets/css/styleOutlet';
import { Colors } from '../../assets/config/Colors';
const { width } = Dimensions.get('window');

export default SnoozeModal = (props) => {
    const [modalVisible2, setModalVisible2] = useState();
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible2}
            onRequestClose={() => {
                setModalVisible2(!modalVisible2);
            }}>
            <View style={StyleCss.centeredView}>
                <View style={StyleCss.modalView}>
                    <View style={StyleCss.ModalViewWidth}>
                        <View
                            style={StyleCss.ModelVideoCenter}>
                            <Image
                                source={require('../../assets/images/bell.gif')}
                                style={StyleCss.backgroundImageGifBell}
                                resizeMode={'contain'}

                            />
                            <Text style={StyleCss.submittext}>
                                You have been Checked-IN since 2 hours.
                                Its time to checkout and see other calls.
                            </Text>

                        </View>
                        <View style={StyleCss.MV2} />
                        <View style={StyleCss.MV5} />
                        <View style={StyleCss.MV5} />
                        <View style={{ ...StyleCss.FLexCenter, ...StyleCss.FLexCenterCustom }}>
                            <FullsizeButton width={width * 0.32} BRadius={30} height={35} backgroundColor={Colors.bluetheme} onPress={() => handleClickOnDone()} title='Snooze for 30min' />
                            <FullsizeButton width={width * 0.25} BRadius={30} height={35} backgroundColor={'transparent'} titlecolor={Colors.grey} onPress={() => handleClickOnDone()} title='Cancel' />
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )
}
