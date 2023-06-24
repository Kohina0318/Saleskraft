import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const ShimmerComponent = (props)=> {
const[onLoad, setOnLoad] = React.useState(true);


React.useEffect(() => {
  setInterval(() => {
    setOnLoad(false);
  }, 15000);
},[]);


  return (
    <SkeletonPlaceholder>
        {/* <View style={{ marginLeft: 20, marginTop: 20 }}>
          <View style={{ width: 350, height: 200 }} />
          <View style={{ marginTop: 6, width: 260, height: 20, borderRadius: 5 }} />
          <View style={{ marginTop: 6, width: 350, height: 70, borderRadius: 10 }} />
        </View>
        <View style={{ marginLeft: 20, marginTop: 20 }}>
          <View style={{ width: 350, height: 200 }} />
          <View style={{ marginTop: 6, width: 260, height: 20, borderRadius: 5 }} />
          <View style={{ marginTop: 6, width: 350, height: 70, borderRadius: 10 }} />
        </View> */}
   </SkeletonPlaceholder>
  )
}

export default ShimmerComponent;