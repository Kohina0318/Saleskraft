
// Import React
import React from 'react';
// Import required components
import {Dimensions, SafeAreaView, StyleSheet, View,Text, Image} from 'react-native';
import MapViewDirections from 'react-native-maps-directions';
import EIcon from 'react-native-vector-icons/Entypo';
import MapView, {Marker,Polyline,Polygon,Callout} from 'react-native-maps';
const {width,height}=Dimensions.get('screen')


var Outletsarr = [
  {
    "Id": 1, 
    "OutletName": "Test",
    "latitude": 26.2161725,
    "longitude": 78.2022081,
  },
  {
    "Id": 2, 
    "OutletName": "Archisy",
    "latitude":  26.2161700,
    "longitude":  78.2022086,
  },
  {
    "Id": 3, 
    "OutletName": "Chacha store",
    "latitude": 26.2362532,
    "longitude": 78.1854706,
  },
  {
    "Id": 4, 
    "OutletName": "Khan Store",
    "latitude":26.2262532,
    "longitude":78.1954706,
  }
]
const MapComponent = () => {
    const[isMapReady,setIsMapReady]=React.useState(false)
    const[coordinates,setCoordinates]=React.useState([
        {
            latitude: 26.2163242,
            longitude:  78.2022028
        },
        {
            latitude: 26.2674,
            longitude:  78.2077,
        },
        {
            latitude: 26.2186,
            longitude:  78.2219,
        },
        {
            latitude: 26.2067,
            longitude:  78.2042,
        },
        
    ])
    

    const onMapLayout = ()=>{
        setIsMapReady(true);
    }
    

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <MapView
          style={styles.mapStyle}
          initialRegion={{
            latitude: 26.2163242,
            longitude:  78.2022028,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onLayout={onMapLayout}
          provider='google'
          mapType='standard'
          showsScale
          showsCompass
          showsPointsOfInterest
          showsBuildings

          customMapStyle={mapStyle}>
         { isMapReady &&
          <>
          <Polygon
          coordinates={coordinates}
           strokeColor= '#810FCB'
           strokeWidth={1}
         fillColor={'rgba(100,100,200,0.3)'}
      
          />


          {
            Outletsarr.map(marker=>{
              return(
                <Marker
                key={marker.Id}
                draggable
                coordinate={{latitude:marker.latitude,longitude:marker.longitude}}
                onDragEnd={
                  (e) => alert(JSON.stringify(e.nativeEvent.coordinate))
                }
                // title={marker.OutletName}
                description={'This is a description of the marker'}
              >
    <Callout>
      <Text>{marker.OutletName}</Text>
    </Callout>
    
    
              </Marker>
              )
            })
          }



          {/* <Marker
            draggable
            coordinate={coordinates[0]}
            onDragEnd={
              (e) => alert(JSON.stringify(e.nativeEvent.coordinate))
            }
            title={'Khan store'}
            description={'This is a description of the marker'}
          >
<Callout>
  <Text>Khan store</Text>
</Callout>


          </Marker>

  
          <Marker
            draggable
            coordinate={coordinates[1]}
            onDragEnd={
              (e) => alert(JSON.stringify(e.nativeEvent.coordinate))
            }
            title={'Test Marker'}
            description={'This is a description of the marker'}
          /> */}


          {/* Map Direction Code */}

         {/* <MapViewDirections
          origin={coordinates[0]}
          destination={coordinates[1]}
          apikey={'AIzaSyASP_XuxfpVohzToq9_6l0nQgxeIKPuL-Y'} // insert your API Key here
          strokeWidth={4}
          strokeColor="green"
        /> */}
          </>
        }
        </MapView>
      </View>
    </SafeAreaView>
  );
};
 
export default MapComponent;
 
const mapStyle = [
  {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
  {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
  {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{color: '#263c3f'}],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{color: '#6b9a76'}],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{color: '#38414e'}],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{color: '#212a37'}],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{color: '#9ca5b3'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{color: '#746855'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{color: '#1f2835'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{color: '#f3d19c'}],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{color: '#2f3948'}],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{color: '#17263c'}],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{color: '#515c6d'}],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{color: '#17263c'}],
  },
];
 
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
    height:height,
    width:width
  },
  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    
  },
});



/**
 * 
 * Changes made for integrete map in files
 * 1.app/src/main/AndroidManifest.xml
 * 2.android => build.gradle Line 11,12
 */