import { View, Text } from 'react-native'
import React from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import config from '../../../../config'
const {GOOGLE_KEY} = config;

export default function CustomMapAutoComplete(props) {
    const[address,setAddress]=React.useState('');
    console.log(" Addresss....",address);

  return (
    <View>
       <GooglePlacesAutocomplete
                    //  currentLocation={true}
                    // ref={addressAutoCompleteRef}
                placeholder='Search'
                minLength={2}
                autoFillOnNotFound={true}
                fetchDetails={true}
                onPress={(data, details = null) => {
                  // 'details' is provided when fetchDetails = true
                  console.log("Retailer Addresss....",data, details);
                //   setAddress(data.description)
                props.setAddress(data.description)
                }}
                keepResultsAfterBlur={true}
                onSubmitEditing={()=>{
                  console.log("onSubmitEditing====>",onSubmitEditing)
                }}
                
                onFail={error => console.error("error in GooglePlacesAutoComplete",error)}
                query={{
                  key: `${GOOGLE_KEY}`,
                  language: 'en',
                }}
              />
    </View>
  )
}