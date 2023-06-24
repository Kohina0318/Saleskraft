import { View, Image} from 'react-native'
import React from 'react'

export default function DummyImage(props) {
  return (
    <View >
       <Image
        style={{alignSelf: 'center', width:props.width, height: props.height}}            
        source={require('../../assets/images/dummy_image.jpg')}
        resizeMode={'contain'}
     />
    </View>
  )
}