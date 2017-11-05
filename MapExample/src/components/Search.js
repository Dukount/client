/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import { post_coordinate } from '../actions/MapAction'

let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const homePlace = { description: 'Home', geometry: { location: { lat: LATITUDE, lng: LONGITUDE } }};
const workPlace = { description: 'Work', geometry: { location: { lat: LATITUDE, lng: LONGITUDE } }};


class Search extends Component<{}> {
  constructor() {
    super();
    this.state = {
      region: {
        mapRegion: null,
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }
        });
      },
    (error) => console.log(error.message),
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
    this.watchID = navigator.geolocation.watchPosition(
      position => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }
        });
      }
    );
  }

  onRegionChange(region, latitude, longitude) {
    this.setState({
      mapRegion: region,
      // If there are no new values set the current ones
      latitude: latitude || this.state.latitude,
      longitude: longitude || this.state.longitude
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  render() {
    // console.log('ini search ', this.state.region)
    // console.log(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.region.latitude},${this.state.region.longitude}&key=AIzaSyDTZ5oouZfOtVZ9yjOmoHYrhceyCcpmQsc`)
    return (
      <View style={{position: 'absolute', top: 0, zIndex: 99, backgroundColor: 'rgba(255, 255, 255, 0.8)'}}>
      <GooglePlacesAutocomplete
        placeholder={`${this.props.address}`}
        minLength={2}
        autoFocus={false}
        returnKeyType={'search'}
        listViewDisplayed='auto'
        fetchDetails={true}
        renderDescription={row => row.description}
        onPress={(data, details = null) => {
          // console.log(data, details)
          const region = {
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
            latitudeDelta: 0.00922 * 1.5,
            longitudeDelta: 0.00421 * 1.5
          };
          this.props.changeMarkerPosition(region)
          // this.onRegionChange(region, region.latitude, region.longitude);
          // console.log(this.state)
        }}

        getDefaultValue={() => ''}
        query={{
             key: 'AIzaSyDTZ5oouZfOtVZ9yjOmoHYrhceyCcpmQsc',
             language: 'en',
             types: 'geocode',
        }}
        styles={{
          textInputContainer: {
            width: '100%'
          },
          description: {
            fontWeight: 'bold'
          },
          predefinedPlacesDescription: {
            color: '#1faadb'
          }
        }}
        currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
        currentLocationLabel="Current location"
        nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
        GoogleReverseGeocodingQuery={{
          // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
        }}
        GooglePlacesSearchQuery={{
          // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
          rankby: 'distance',
          types: 'food'
        }}

        filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
        predefinedPlaces={[homePlace, workPlace]}

        debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

const mapStateToProps = (state) => {
  return {
    latitude: state.MapReducer.latitude,
    longitude: state.MapReducer.longitude,
    address: state.MapReducer.address
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeMarkerPosition: (payload) => dispatch(post_coordinate(payload))
  }
}

const ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps)(Search)

export default ConnectedComponent
