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

import { post_coordinate_to, fetch_address_to } from '../../actions/MapAction'


let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.41;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class ToLocation extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      region: {
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
            longitudeDelta: LONGITUDE_DELTA
          }
        });
        let payload = {latitudeTo: position.coords.latitude, longitudeTo: position.coords.longitude}
        this.props.postCoordinateTo(payload)
        this.props.fetchAddressTo(payload)
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
            longitudeDelta: LONGITUDE_DELTA
          }
        });
        let payload = {latitudeTo: position.coords.latitude, longitudeTo: position.coords.longitude}
        this.props.postCoordinateTo(payload)
        this.props.fetchAddressTo(payload)
      }
    );
  }

  moveDrag() {
    let payload = {latitudeTo: this.state.region.latitude, longitudeTo: this.state.region.longitude}
    this.props.postCoordinateTo(payload)
    this.props.fetchAddressTo(payload)
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  render() {
    // console.log('ini region di drag to ', this.state.region)
    // console.log('ini fungsi ', this.latitudelongitudeNullChecker())
    // console.log(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.region.latitude},${this.state.region.longitude}&key=AIzaSyDTZ5oouZfOtVZ9yjOmoHYrhceyCcpmQsc`)
    return (
      <View>
        <View style={styles.container}>
        <GooglePlacesAutocomplete
          placeholder={`${this.props.addressTo}`}
          minLength={2}
          autoFocus={false}
          returnKeyType={'search'}
          listViewDisplayed='auto'
          fetchDetails={true}
          renderDescription={row => row.description}
          onPress={(data, details = null) => {
            // console.log(data, details)
            const payload = {
              latitudeTo: details.geometry.location.lat,
              longitudeTo: details.geometry.location.lng,
              latitudeDeltaTo: LATITUDE_DELTA,
              longitudeDeltaTo: LONGITUDE_DELTA
            };
            this.setState({
              region: {
                latitude:  details.geometry.location.lat,
                longitude: details.geometry.location.lng,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
              }
            });
            this.props.changeMarkerPosition(payload)
            // this.onRegionChange(region, region.latitude, region.longitude);
            // console.log(this.state)
          }}

          getDefaultValue={() => ''}
          query={{
            key: 'AIzaSyDTZ5oouZfOtVZ9yjOmoHYrhceyCcpmQsc',
            language: 'en',
            types: 'geocode'
          }}
          styles={{
            textInputContainer: {
              width: 360,
              height: 70
            },
            textInput: {
              marginLeft: 0,
              marginRight: 0,
              height: 50,
              color: '#5d5d5d',
              fontSize: 15
            },
            description: {
              fontWeight: 'bold'
            },
            predefinedPlacesDescription: {
              color: '#1faadb'
            }
          }}
          currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
          nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
          GoogleReverseGeocodingQuery={{
            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
          }}
          GooglePlacesSearchQuery={{
            // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
            rankby: 'distance',
            types: 'food'
          }}

          debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
        />
        </View>
        <View>
          <MapView
            provider={ PROVIDER_GOOGLE }
            style={styles.mapView}
            showsUserLocation={ true }
            showsCompass={true}
            region={ this.state.region }
            onRegionChange={ region => this.setState({region})}
            onRegionChangeComplete={ region => this.setState({region})}
            showsTraffic={true}
          >
          <MapView.Marker
            coordinate={ this.state.region }
            onPress={() => this.moveDrag()}
          />
          </MapView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    zIndex: 99,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    marginTop: 0
  },
  mapView: {
    width: Dimensions.get('window').width,
    height: 520,
    marginTop: 70
  }
});

const mapStateToProps = (state) => {
  // console.log('ini state di drag to', state.MapReducer.addressTo)
  return {
    latitudeTo: state.MapReducer.latitudeTo,
    longitudeTo: state.MapReducer.longitudeTo,
    addressTo: state.MapReducer.addressTo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    postCoordinateTo: (payload) => dispatch(post_coordinate_to(payload)),
    fetchAddressTo: (payload) => dispatch(fetch_address_to(payload)),
    changeMarkerPosition: (payload) => dispatch(post_coordinate_to(payload))
  }
}

const ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps)(ToLocation)

export default ConnectedComponent
