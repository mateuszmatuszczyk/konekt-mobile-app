import React, { Component } from 'react';
import { 
  Platform, 
  Text, 
  View, 
  StyleSheet,
  AsyncStorage 
} from 'react-native';

import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapView from 'react-native-maps';


const CUSTOM_MAP_STYLE = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#212121"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#212121"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "stylers": [
      {
        "saturation": -95
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.attraction",
    "stylers": [
      {
        "color": "#cc60db"
      },
      {
        "saturation": -5
      },
      {
        "lightness": -5
      },
      {
        "weight": 0.5
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#181818"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1b1b1b"
      }
    ]
  },
  {
    "featureType": "poi.sports_complex",
    "stylers": [
      {
        "color": "#cc60db"
      },
      {
        "weight": 0.5
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#2c2c2c"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8a8a8a"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#373737"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#3c3c3c"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#4e4e4e"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#000000"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#3d3d3d"
      }
    ]
  }
]
const USER_TOKEN = 'user_token'

export default class Map extends Component {
  state = {
    userid:null,
    location: null,
    errorMessage: null,
    loaded: false,
    locationUpdateError: ""
  };


  componentDidMount() {
    this.getUserToken();
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
        loaded: true
      });
    } else {
      this._getLocationAsync();
    }
  }

  async getUserToken() {
    try {
      console.log("Looking for user token...")
      let userToken = await AsyncStorage.getItem(USER_TOKEN)
      if (!userToken) {
        console.log("No user token found!")
      } else {
        console.log("Found a user token: " + userToken)
        this.setState({ userid: userToken })
      }
    }
    catch (error) {
      console.log("Error retrieving data from AsyncStorage" + error)
    }
  }

  async updateUserLocation(latitude, longitude) {
    // alert("Updating Location!")
    try {
      this.setState({ locationUpdateError: "" })
      this.state.userid
      let response = await fetch('https://konekt-app.herokuapp.com/api/users/'+this.state.userid+'/location', {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          latitude: latitude,
          longitude: longitude,
        })
      });
      let res = await response.text();
      console.log("Server response: " + res)

      if (response.status >= 200 && response.status < 300) {
        console.log("SUCCESS: " + res)
        alert("Your location has been successfuly updated to \nLat:"+latitude+"\nLong: "+longitude)
      } else {
        let error = res;
        throw error;
      }
    }
    catch (error) {
      console.log("****SERVER ERROR****: \n" + error + "\n ************")
      this.setState({ locationUpdateError: "Something went wrong during updating location. Please try again later." })
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }
    else {
      // only check the location if it has been granted
      // you also may want to wrap this in a try/catch as async functions can throw
      let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });

      let latitude = location.coords.latitude
      let longitude = location.coords.longitude
      console.log("UPDATING LOCATION!! Lat:"+latitude+" Long: "+longitude)
      this.updateUserLocation(latitude,longitude)
      this.setState({ location, loaded: true, errorMessage: null });
      console.log(this.state.location)
    }
  };

  render() {
    // check to see if we have loaded
    if (this.state.loaded) {
      // if we have an error message show it
      if (this.state.errorMessage) {
        return (
          <View style={styles.container}>
            <Text>{JSON.stringify(this.state.errorMessage)}</Text>
          </View>
        );
      } else if (this.state.location) {
        // if we have a location show it
        return (
          <MapView
            customMapStyle={CUSTOM_MAP_STYLE}
            provider={"google"}
            showsUserLocation={true}
            showsMyLocationButton={true}
            style={{ flex: 1 }}
            region={{
              latitude: this.state.location.coords.latitude,
              longitude: this.state.location.coords.longitude,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1
            }}
          />
        );
      }
    } else {
      // if we haven't loaded show a waiting placeholder
      return (
        <View style={styles.container}>
          <Text>Waiting...</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
  },
});