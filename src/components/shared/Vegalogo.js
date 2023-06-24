import { StyleSheet, Image, View,Dimensions,Appearance } from 'react-native'
import React from 'react';
const { width } = Dimensions.get('window');

export default Vegalogo = (props) => {
    const styles = StyleSheet.create({
        vegaimg: {
            width: props.width,
            height: props.height,
            resizeMode: 'contain',
            alignSelf: 'center',
        }
    })
    const isDarkMode = (Appearance.getColorScheme() === 'dark')
    return (
        <View>
            <Image
                style={styles.vegaimg}
                source={
                    isDarkMode == 0
                    ? require('../../assets/images/app,intro,splashscreen,login/saleskraftlogo.png')
                    : require('../../assets/images/app,intro,splashscreen,login/saleskraftlogo-white.png')
                }
                // source={require('../../assets/images/app,intro,splashscreen,login/saleskraftlogo.png')}
            />
        </View>
    )
}

Vegalogo.defaultProps = ({
    height: 80,
    width: width * 0.75
})