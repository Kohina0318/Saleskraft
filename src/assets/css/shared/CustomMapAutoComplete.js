import { View } from 'react-native'
import React from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import config from '../../../../config'
import { MyThemeClass } from '../../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';
import { background, backgroundColor } from 'styled-system';

// import Geocoder from 'react-native-geocoding';
const {GOOGLE_KEY} = config;

export default function CustomMapAutoComplete(props) {
    const[address,setAddress]=React.useState('');
    console.log(" Addresss....",address);
    const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  

  return (
    <View>
       <GooglePlacesAutocomplete
                //  currentLocation={true}
                // ref={addressAutoCompleteRef}
                placeholder='Search'
                minLength={2}
                autoFillOnNotFound={true}
                fetchDetails={true}
                // renderDescription={row =>{
                //   row.description
                // }} 
                onPress={(data, details = null) => {
                  // 'details' is provided when fetchDetails = true
                  console.log("Retailer Addresss....2888",details);
                   console.log("Retailer Addresss....",data.types);
                  //  console.log(JSON.stringify("================28>",details?.geometry?.location));
                   if(data.types.includes("establishment")){
                     props.setLatitude(details.geometry.location.lat)
                     props.setLongitude(details.geometry.location.lng)
                    // props.setAddress(data.description)
                    // props.setOutletCountry()
                     // Search by address
// Geocoder.from("Colosseum")
// .then(json => {
//   var location = json.results[0].geometry.location;
//   console.log("Lat Lang From Address------>",location);
// })
// .catch(error => console.warn(error));

                    var term =  data.terms;
                     var Country;
                     var State; 
                     var City;
                     var Area;
                     var Address_line_3;
                     var Address_line_2;
                     var Address_line_1;
                     var Address_line_0;
                   
                    try{
                      Country = term[term.length-1].value;
                    }catch(e){
                      Country = ''
                    }
                    try{
                      State = term[term.length-2].value
                    }catch(e){
                      State = ''
                    }
                    try{
                      City = term[term.length-3].value
                    }catch(e){
                      City = ''
                    }
                    try{
                     Area = term[term.length-4].value
                    }catch(e){
                      Area = ''
                    }
                    try{
                      Address_line_3= term[term.length-5].value
                    }catch(e){
                      Address_line_3 = ''
                    }
                    try{
                      Address_line_2= term[term.length-6].value
                    }catch(e){
                      Address_line_2 = ''
                    }
                    try{
                      Address_line_1= term[term.length-7].value
                    }catch(e){
                      Address_line_1 = ''
                    }
                    try{
                      Address_line_0= term[term.length-8].value
                    }catch(e){
                      Address_line_0 = ''
                    }
                   
                   props.setAddress(data.description) 
                   props.setOutletCountry(Country);
                   props.setOutletState(State);
                   props.setOutletCity(City);
                  //  console.log('Country--->',Country)
                  //  console.log('State--->',State)
                  //  console.log('City--->',City)
                  //  console.log('Area--->',Area)
                  //  console.log('Address_line_3--->',Address_line_3)
                  //  console.log('Address_line_2--->',Address_line_2)
                  //  console.log('Address_line_1--->',Address_line_1)
                  //  console.log('Outlet_Name--->',Outlet_Name)
                  //  console.log('Pincode--->',Pincode)
                   }else{
                     alert("Please choose bussiness address.")
                     props.setAddress('')
                   }
                  //  console.log("latitude*---->",details.geometry.location.lat)
                  //  console.log("longitude*---->",details.geometry.location.lng)
                //   setAddress(data.description)
              
                }}
                keepResultsAfterBlur={true}
                onSubmitEditing={()=>{
                  console.log("onSubmitEditing====>",onSubmitEditing)
                }}
                GooglePlacesDetailsQuery={{ fields: "geometry" }}
                
                onFail={error => console.error("error in GooglePlacesAutoComplete",error)}
                query={{
                  key: `${GOOGLE_KEY}`,
                  language: 'en',
                  // types: '(regions)' || '(cities)' || 'geocode' || 'address'
                  types: 'establishment'
                   
                  // <=== use this to only show country cities
                  // types: '(cities)', 
                   //types: '(address)', 
                  // <=== use this to restrict to country
                 // components: 'country:in',
                 // strictbounds: true,
                }}

                styles={{
                  textInput: {
                    backgroundColor: themecolor.BOXTHEMECOLOR,
                    color: themecolor.TXTWHITE,
                    },
                  textInputContainer: {
                    width: '100%',
                    },
                  description: {
                    fontWeight: 'bold',
                    color: themecolor.TXTGREYS,
                  },
                  row: {
                    flexDirection: 'row',
                    width: '100%',
                    backgroundColor: themecolor.BOXTHEMECOLOR,
                    color: themecolor.TXTWHITE,
                    borderColor: themecolor.BOXTHEMECOLOR
                  },
                  separator: {
                    backgroundColor: themecolor.BOXTHEMECOLOR,
                  },
                }}
                
                // returnKeyType={'establishment'}
                currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
                currentLocationLabel="Current location"
                
                nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                GoogleReverseGeocodingQuery={{
                  // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                }}
                GooglePlacesSearchQuery={{
                  rankby: 'distance',
                }}
                // GooglePlacesDetailsQuery={{
                //   // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
                //   fields: 'formatted_address',
                // }}
                // GooglePlacesSearchQuery={{
                //   // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                //   rankby: 'distance',
                //   types: 'food'
                // }}
                // filterReverseGeocodingByTypes={[
                //   'locality',
                //   'administrative_area_level_1',
                // ]}
                // filterReverseGeocodingByTypes={['establishment']} 
              />
    </View>
  )
}``