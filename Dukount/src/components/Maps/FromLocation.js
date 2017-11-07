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
  Image,
  TouchableHighlight
} from 'react-native';
import { connect } from 'react-redux';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import { post_coordinate_from, fetch_address_from } from '../../actions/MapAction'


let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.41;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class FromLocation extends Component<{}> {
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
        let payload = {latitudeFrom: position.coords.latitude, longitudeFrom: position.coords.longitude}
        this.props.postCoordinateFrom(payload)
        this.props.fetchAddressFrom(payload)
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
        let payload = {latitudeFrom: position.coords.latitude, longitudeFrom: position.coords.longitude}
        this.props.postCoordinateFrom(payload)
        this.props.fetchAddressFrom(payload)
      }
    );
  }

  moveDrag() {
    let payload = {latitudeFrom: this.state.region.latitude, longitudeFrom: this.state.region.longitude}
    this.props.postCoordinateFrom(payload)
    this.props.fetchAddressFrom(payload)
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  addressJoiner(address) {
    if (address === null) {
      return address
    } else {
      return address.join(' ')
    }
  }

  render() {
    const {goBack} = this.props.navigation;
    // console.log('ini region di drag from ', this.state.region)
    // console.log('ini fungsi ', this.latitudelongitudeNullChecker())
    // console.log(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.region.latitude},${this.state.region.longitude}&key=AIzaSyDTZ5oouZfOtVZ9yjOmoHYrhceyCcpmQsc`)
    return (
      <View>
      <View>
      <View style={{height: 40, backgroundColor: '#1d81e5', flexDirection: 'row'}}>
      <View style={{position: 'relative', justifyContent: 'center'}}>
      <TouchableHighlight onPress={() => goBack()}>
        <Image source={require('../../assets/img/arrow-point-to-right.png')} style={{height: 30, width: 30, alignItems: 'center'}}/>
      </TouchableHighlight>
      </View>
      <View style={{height: 30, width: 360, alignItems: 'center', alignSelf: 'center', position: 'absolute'}}>
        <Image source={require('../../assets/img/logo_small_white.png')} style={{height: 30, width: 130}} />
      </View>
      </View>
      </View>
        <View style={styles.container}>
        <GooglePlacesAutocomplete
          placeholder={`${this.addressJoiner(this.props.addressFrom)}`}
          minLength={2}
          autoFocus={false}
          returnKeyType={'search'}
          listViewDisplayed='auto'
          fetchDetails={true}
          renderDescription={row => row.description}
          onPress={(data, details = null) => {
            // console.log(data, details)
            const payload = {
              latitudeFrom: details.geometry.location.lat,
              longitudeFrom: details.geometry.location.lng,
              latitudeDeltaFrom: LATITUDE_DELTA,
              longitudeDeltaFrom: LONGITUDE_DELTA
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
          }}
          styles={{
            textInputContainer: {
              width: 360,
              height: 50,
              marginTop: -7
            },
            textInput: {
              marginLeft: 0,
              marginRight: 0,
              height: 40,
              color: 'black',
              fontSize: 10
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
            onRegionChange={ region => this.setState({region}) }
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
    top: 40,
    zIndex: 99,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    marginTop: 0
  },
  mapView: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  }
});

const mapStateToProps = (state) => {
  // console.log('ini state di drag from', state.MapReducer)
  return {
    latitudeFrom: state.MapReducer.latitudeFrom,
    longitudeFrom: state.MapReducer.longitudeFrom,
    addressFrom: state.MapReducer.addressFrom
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    postCoordinateFrom: (payload) => dispatch(post_coordinate_from(payload)),
    fetchAddressFrom: (payload) => dispatch(fetch_address_from(payload)),
    changeMarkerPosition: (payload) => dispatch(post_coordinate_from(payload))
  }
}

const ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps)(FromLocation)

export default ConnectedComponent
