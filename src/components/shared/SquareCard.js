import React from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native'
import styles from '../../assets/css/styleChangeAgenda'
const { width } = Dimensions.get('window');

const SquareCard = (props) => {
    return (
        <>
            <TouchableOpacity
                style={{ ...styles.innerview, width: props.cardwidth }}
                onPress={props.onClick} >
                <View
                    style={{ ...styles.ImageView, backgroundColor: props.bgcolor }}>
                    <Image
                        style={styles.IMGStyle}
                        source={require('../../assets/images/Action/productcatalogue.png')}
                        resizeMode={'contain'}
                    />
                </View>
                <View style={{ height: 3 }} />
                <View style={{}}>
                    <Text style={styles.CardText}>{props.title}</Text>
                </View>
            </TouchableOpacity>
        </>
    )
}

export default SquareCard;

SquareCard.defaultProps = {
    cardwidth: width * 0.37,
}