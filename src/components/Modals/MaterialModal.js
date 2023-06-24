import React, { useState } from 'react';
import {
    View,
    Text,
    Modal,
} from 'react-native';
import Video from 'react-native-video';
import StyleCss from '../../assets/css/styleOutlet';
import FullsizeButton from '../shared/FullsizeButton';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';


export default function MaterialModal(props) {
    // const navigation = useNavigation()
    const [modalVisible2, setModalVisible2] = useState(true);
    const mode = useSelector(state => state.mode);
    const themecolor = new MyThemeClass(mode).getThemeColor()
    

    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible2}>
                <View style={StyleCss.centeredView}>
                    <View style={{...StyleCss.modalView, backgroundColor:themecolor.RB2}}>
                        <View style={StyleCss.ModalViewWidth}>
                            <View>
                                <View>
                                    <Video
                                        source={require('../../assets/images/gif/download.mp4')}
                                        style={{ width: 200, height: 200, alignSelf: 'center' }}
                                        resizeMode={'contain'}
                                    />
                                    <Text style={{...StyleCss.submittext, color:themecolor.TXTWHITE}}>
                                        {/* Your material is being downloading... */}
                                        Your material has been download successfully.
                                    </Text>
                                    <View style={{ marginTop: 10 }}>
                                        <FullsizeButton backgroundColor={themecolor.HEADERTHEMECOLOR} width={90} height={35} title={'Done'} onPress={() => { props.setModalVisible(false) }} />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}