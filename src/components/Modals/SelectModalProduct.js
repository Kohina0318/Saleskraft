import React from 'react';
import {
    View,
    Text,
    Modal,
    Image,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import { Colors } from '../../assets/config/Colors';
import { FontSize } from '../../assets/fonts/Fonts';
import { FontFamily } from '../../assets/fonts/FontFamily';
import StyleCss from '../../assets/css/styleOutlet';
import { useNavigation } from '@react-navigation/native';
const { width } = Dimensions.get('screen');

export default function SelectProductModal(props) {
    const navigation = useNavigation()
    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                onDismiss={() => {
                    props.setmodalVisible4(false);
                    props.setmodalVisible3(true)
                }}
                onRequestClose={() => {
                    props.setmodalVisible4(false);
                    props.setmodalVisible3(true)
                }}
                visible={props.modalVisible}>
                <View style={StyleCss.centeredView}>
                    <View style={StyleCss.modalView}>
                        <View style={StyleCss.ModalViewWidth}>
                            <View style={{ padding: 2 }}>
                                <Text style={{
                                    fontSize: FontSize.labelText2,
                                    color: Colors.black,
                                    width: width * 0.75,
                                    alignSelf: 'center',
                                    fontFamily: FontFamily.Popinssemibold,
                                    top: 5
                                }}>
                                    Select Product Category
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10, }} >
                                <TouchableOpacity onPress={() => {
                                    props.setmodalVisible4(false)
                                    if (props.reason === 'Opening') {
                                        navigation.push('OpeningStock')
                                    } else if (props.reason === "Stock In") {
                                        props.setStockInModal(true)
                                    } else {
                                        navigation.push('CloseStock')
                                    }
                                }
                                }>
                                    <View style={{ width: 70, height: 70, alignItems: 'center', justifyContent: 'center', borderRadius: 10, borderWidth: 1.5, borderColor: Colors.borderColor }}>
                                        <Image source={require('../../assets/images/BAMT/regular_product.png')}
                                            style={{ width: 30, height: 30 }}
                                            resizeMode={'center'}
                                        />
                                        <View>
                                            <Text style={{
                                                fontSize: FontSize.small,
                                                color: Colors.black,
                                                textAlign: 'center',
                                                top: 5,
                                                alignSelf: 'center',
                                                fontFamily: FontFamily.Popinssemibold,
                                            }}>
                                                Regular
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={props.handleOpen}>
                                    <View style={{ width: 70, height: 70, alignItems: 'center', justifyContent: 'center', borderRadius: 10, borderWidth: 1.5, borderColor: Colors.borderColor }}>
                                        <Image source={require('../../assets/images/BAMT/gwp_product.png')}
                                            style={{ width: 30, height: 30 }}
                                            resizeMode={'center'}
                                        />
                                        <View>
                                            <Text style={{
                                                fontSize: FontSize.small,
                                                color: Colors.black,
                                                textAlign: 'center',
                                                top: 5,
                                                alignSelf: 'center',
                                                fontFamily: FontFamily.Popinssemibold,
                                            }}>
                                                GWP
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={props.handleOpen}>
                                    <View style={{ width: 70, height: 70, alignItems: 'center', justifyContent: 'center', borderRadius: 10, borderWidth: 1.5, borderColor: Colors.borderColor }}>
                                        <Image source={require('../../assets/images/BAMT/pwp.png')}
                                            style={{ width: 30, height: 30 }}
                                            resizeMode={'center'}
                                        />
                                        <View>
                                            <Text style={{
                                                fontSize: FontSize.small,
                                                color: Colors.black,
                                                textAlign: 'center',
                                                top: 5,
                                                alignSelf: 'center',
                                                fontFamily: FontFamily.Popinssemibold,
                                            }}>
                                                PWP
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={props.handleOpen}>
                                    <View style={{ width: 70, height: 70, alignItems: 'center', justifyContent: 'center', borderRadius: 10, borderWidth: 1.5, borderColor: Colors.borderColor }}>
                                        <Image source={require('../../assets/images/BAMT/tester.png')}
                                            style={{ width: 30, height: 30 }}
                                            resizeMode={'center'}
                                        />
                                        <View>
                                            <Text style={{
                                                fontSize: FontSize.small,
                                                color: Colors.black,
                                                textAlign: 'center',
                                                top: 5,
                                                alignSelf: 'center',
                                                fontFamily: FontFamily.Popinssemibold,
                                            }}>
                                                Tester
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    )
}