import React from 'react';
import {
    View,
    Text,
    Modal,
    Image,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import { Colors } from '../../assets/config/Colors';
import { FontSize } from '../../assets/fonts/Fonts';
import { FontFamily } from '../../assets/fonts/FontFamily';
import StyleCss from '../../assets/css/styleOutlet';
import { useNavigation } from '@react-navigation/native';
import MCIcon from 'react-native-vector-icons/MaterialIcons';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';

export default function StockInModal(props) {
    const mode = useSelector(state => state.mode);
    const themecolor = new MyThemeClass(mode).getThemeColor()
    const navigation = useNavigation()
    const { width } = Dimensions.get('screen');

    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={props.modalVisible}
                onRequestClose={() => props.setmodalVisible3(false)}
            >
                <View style={StyleCss.centeredView}>
                    <View style={{...StyleCss.modalView,backgroundColor:themecolor.RB2}}>
                        <View style={StyleCss.ModalViewWidth}>

                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ padding: 2, }}>
                                    <Text style={{
                                        fontSize: FontSize.labelText2,
                                        color: themecolor.TXTWHITE,
                                        width: width * 0.75,
                                        alignSelf: 'center',
                                        fontFamily: FontFamily.Popinssemibold,
                                        top: 5,
                                    }}>
                                        Select Inventory Type
                                    </Text>
                                </View>
                                <TouchableOpacity onPress={() => props.setmodalVisible3(false)}>
                                    <View style={{ width: 22, height: 22, borderRadius: 25, borderWidth: 0.5,  justifyContent: 'center', alignItems: 'center', marginTop: -19,borderColor:themecolor.TXTWHITE }}>
                                        <MCIcon name="close" color={themecolor.TXTWHITE} size={18} />
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10, }} >

                                <TouchableOpacity
                                    onPress={() => {
                                        props.setmodalVisible3(false);
                                        navigation.push('StockInProductCategory',
                                            {
                                                title: "Opening Stock-Regular Inventory",
                                                message: 'No Opening Stock-Regular Inventory',
                                                setmodalVisible3: props.setmodalVisible3
                                            }
                                        )
                                    }}
                                >
                                    <View style={{ width: 80, height: 80, alignItems: 'center', justifyContent: 'center', borderRadius: 10, borderWidth: 1.5, borderColor: Colors.borderColor }}>
                                        <Image source={require('../../assets/images/BAMT/opening_inventory.png')}
                                            style={{ width: 30, height: 30 }}
                                            resizeMode={'center'}
                                        />
                                        <View>
                                            <Text style={{
                                                fontSize: FontSize.small,
                                                color: themecolor.TXTWHITE,
                                                textAlign: 'center',
                                                top: 5,
                                                alignSelf: 'center',
                                                fontFamily: FontFamily.Popinssemibold,
                                            }}>
                                                Opening
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        props.setmodalVisible3(false);
                                        props.setStockInModal(true);
                                    }}
                                >
                                    <View style={{ width: 80, height: 80, alignItems: 'center', justifyContent: 'center', borderRadius: 10, borderWidth: 1.5, borderColor: Colors.borderColor }}>
                                        <Image source={require('../../assets/images/BAMT/stock_in_invnenotry.png')}
                                            style={{ width: 30, height: 30 }}
                                            resizeMode={'center'}
                                        />
                                        <Text style={{
                                            fontSize: FontSize.small,
                                            color: themecolor.TXTWHITE,
                                            textAlign: 'center',
                                            top: 5,
                                            alignSelf: 'center',
                                            fontFamily: FontFamily.Popinssemibold,
                                        }}>
                                            Stock In
                                        </Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => {
                                        props.setmodalVisible3(false);
                                        navigation.push('StockInProductCategory',
                                            {
                                                title: "Close In Stock-Regular Inventory",
                                                message: 'No Close In Stock-Regular Inventory',
                                                setmodalVisible3: props.setmodalVisible3
                                            }
                                        )
                                    }}
                                >
                                    <View style={{ width: 80, height: 80, alignItems: 'center', justifyContent: 'center', borderRadius: 10, borderWidth: 1.5, borderColor: Colors.borderColor }} >
                                        <Image source={require('../../assets/images/BAMT/closing_inventory.png')}
                                            style={{ width: 30, height: 30, }}
                                            resizeMode={'center'}
                                        />
                                        <Text style={{
                                            fontSize: FontSize.small,
                                            color: themecolor.TXTWHITE,
                                            textAlign: 'center',
                                            top: 5,
                                            alignSelf: 'center',
                                            fontFamily: FontFamily.Popinssemibold,
                                        }}>
                                            Closing
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>

        </View>
    )
}