import React from 'react';
import {
  TouchableOpacity,
  Image,
  View,
  Text,
} from 'react-native';
import styles from '../../assets/css/styleCreateEvent';

export default function UpdateHeader(props) {
    return(
        <View style={styles.header}>
        <View style={styles.tops}> 
          <View
            style={styles.view1}> 
            <TouchableOpacity
              activeOpacity={1}
              onPress={props.onPress}>
              <Image
                source={require('../../assets/images/back.png')}
                style={{...styles.img,top:2}}
                resizeMode={'contain'}
              />
            </TouchableOpacity> 
            <View style={styles.img1}>
              <Text style={{ ...styles.Text }}>Create event</Text>
            </View> 
          </View>
        </View>
      </View>
    )
}
