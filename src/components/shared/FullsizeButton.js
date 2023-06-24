import { Text, View, TouchableOpacity, Dimensions, StyleSheet } from 'react-native'
import React from 'react';
import { Colors } from '../../assets/config/Colors';
import { FontFamily } from '../../assets/fonts/FontFamily';
import MCIcon from 'react-native-vector-icons/MaterialIcons';
import MCI from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../Theme/ThemeDarkLightColor';

const { width } = Dimensions.get('window');

export default FullsizeButton = (props) => {

    const mode = useSelector(state => state.mode);
    const themecolor = new MyThemeClass(mode).getThemeColor()
   
    const styles = StyleSheet.create({
        bigButton: {
            backgroundColor: props.backgroundColor,
            width: props.width,
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            height: props.height,
            borderRadius: props.BRadius,
        }
    })

    
    return (
        <View>
            <TouchableOpacity
                onPress={props.onPress}>
                <View style={{...styles.bigButton,}}>
                    <Text style={{
                        color: props.titlecolor,
                        fontFamily: FontFamily.PopinsMedium,
                        fontSize: props.fontsize
                    }}><MCI name={props.RightIcon} /> {props.title} <MCIcon name={props.Icon} /></Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

FullsizeButton.defaultProps = {
    height: 45,
    title: 'Submit',
    width: width * 0.9,
    titlecolor: '#FFF',
    BRadius: 10,
    backgroundColor: Colors.bluetheme,
}

