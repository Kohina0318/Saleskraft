import { Text, TouchableOpacity, View, Image, Dimensions,Linking } from 'react-native'
import React, { useState } from 'react'
import Phone from 'react-native-vector-icons/FontAwesome'
import { FontFamily } from '../../assets/fonts/FontFamily'
import { FontSize } from '../../assets/fonts/Fonts'
import { Colors } from '../../assets/config/Colors'
import { getLastCheckInOutLocation, SERVER_URL } from '../../repository/commonRepository'

const { height, width } = Dimensions.get('window')

const BAsHeader = (props) => {
  const [getBaseUrl, setBaseUrl] = React.useState('')
  const [lastLocation, setLastLocation] = React.useState('')

  React.useEffect(async () => {
    // alert(JSON.stringify(props.data))
    async function temp() {
      setBaseUrl(await SERVER_URL())
    }
    temp()
    const lastLocation = await getLastCheckInOutLocation(props.data.EmployeeId)
    console.log('poijhgvcx', lastLocation)
    setLastLocation(lastLocation)
  }, [])


    const onPressMobileNumClick = (Phone) => {

      let phoneNumber = '';
      if (Platform.OS === 'android') {
        phoneNumber = `tel:${Phone}`;
      } else {
        phoneNumber = `telprompt:${Phone}`;
      }
  
      Linking.openURL(phoneNumber);
   }

  

  return (

    <View style={{ backgroundColor: Colors.bluetheme, borderBottomRightRadius: 30, borderBottomLeftRadius: 30, flex: 1, overflow: 'hidden' }}>
      <TouchableOpacity activeOpacity={0.5} onPress={props.onPress} style={{ padding: 17, top: 22 }}>
        <Image
          source={require('../../assets/images/back.png')}
          style={{ width: 20, height: 20, }}
          resizeMode={'contain'}
        />
      </TouchableOpacity>

      <View style={{ alignItems: 'center', justifyContent: 'flex-start', }}>

        <View style={{ justifyContent: 'center', alignItems: 'center', height: 100, width: 100, borderRadius: 100, overflow: 'hidden' }}>
          {props.data.ProfilePicture === null || props.data.ProfilePicture === "" ? (
            <Image source={require('../../assets/images/dummyuser.png')} resizeMode={'cover'} style={{ borderColor: '#FFF', borderRadius: 85, borderWidth: 3, height: 130, width: 130, }} />
          ) : (
            <Image source={{ uri: `${getBaseUrl}uploads/2/${props.data.ProfilePicture}` }} resizeMode={'contain'} style={{ height: "100%", width: "100%" }} />
          )
          }
          {/* <Image source={require("../../assets/images/profile_user.png")} resizeMode={'contain'} style={{ height: "100%", width: "100%" }} /> */}
        </View>

        <View style={{ justifyContent: 'center', alignSelf: 'center', marginTop: 5, }}>
          <Text style={{ color: 'white', fontFamily: FontFamily.Popinssemibold, fontSize: FontSize.h3 }}>{props.data.FirstName} {props.data.LastName}</Text>
        </View>

        <View style={{ height: 'auto', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: width * 0.7, }}>
          <Phone name='mobile' size={16} color='white' />
          <View style={{ justifyContent: 'center', alignContent: 'center', left: 4 }}>
          <TouchableOpacity onPress={()=>{onPressMobileNumClick(props.data.Phone)}}>
            <Text style={{ color: 'white', fontFamily: FontFamily.PopinsRegular, fontSize: FontSize.small }}>
              {(props.data.Phone) ? props.data.Phone : 'not available'}
            </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'center', width: width * 0.74, }}>
          <Phone name='map-marker' size={16} color='white' />
          <View style={{ justifyContent: 'center', alignContent: 'center', left: 6, alignSelf: 'center', alignItems: 'center' }}>
            <Text style={{ color: 'white', fontFamily: FontFamily.PopinsRegular, fontSize: FontSize.small,textAlign:'center' }}>
              {lastLocation}
            </Text>
          </View>
        </View>

      </View>

    </View>


  )
}

export default BAsHeader;

