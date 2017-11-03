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

import { post_coordinate, fetch_address } from '../actions/MapAction'


let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const homePlace = { description: 'Home', geometry: { location: { lat: LATITUDE, lng: LONGITUDE } }};
const workPlace = { description: 'Work', geometry: { location: { lat: LATITUDE, lng: LONGITUDE } }};

class Drag extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
        address: null
      }
    };
  }

  latitudelongitudeNullChecker() {
    if (this.props.latitude !== null && this.props.longitude !== null) {
      this.setState({
        region: {
          latitude: this.props.latitude,
          longitude: this.props.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }
      });
    } else {
      this.setState({
        region: {
          latitude: LATITUDE,
          longitude: LONGITUDE,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }
      });
    }
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
            address: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=AIzaSyDTZ5oouZfOtVZ9yjOmoHYrhceyCcpmQsc`
          }
        });
        let payload = {latitude: position.coords.latitude, longitude: position.coords.longitude}
        this.props.postCoordinate(payload)
        this.props.fetchAddress(payload)
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
            address: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=AIzaSyDTZ5oouZfOtVZ9yjOmoHYrhceyCcpmQsc`
          }
        });
        let payload = {latitude: position.coords.latitude, longitude: position.coords.longitude}
        this.props.postCoordinate(payload)
        this.props.fetchAddress(payload)
      }
    );
  }

  moveDrag(region) {
    this.setState({region})
    let payload = {latitude: region.latitude, longitude: region.longitude}
    this.props.postCoordinate(payload)
    this.props.fetchAddress(payload)
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  render() {
    console.log('ini region di drag ', this.state.region)
    console.log('ini fungsi ', this.latitudelongitudeNullChecker())
    // console.log(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.region.latitude},${this.state.region.longitude}&key=AIzaSyDTZ5oouZfOtVZ9yjOmoHYrhceyCcpmQsc`)
    return (
      <View>
        <View>
          <MapView
            provider={ PROVIDER_GOOGLE }
            style={{width: Dimensions.get('window').width, height: 500}}
            showsUserLocation={ true }
            region={ this.state.region }
            onRegionChange={ region => this.moveDrag(region) }
            onRegionChangeComplete={ region => this.setState({region}) }
          >
          <MapView.Marker
            coordinate={ this.state.region }
          />
          </MapView>
        </View>
        <View>
          <Text>{this.props.address}</Text>
        </View>
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
  // console.log('ini state ', state)
  return {
    latitude: state.MapReducer.latitude,
    longitude: state.MapReducer.longitude,
    address: state.MapReducer.address
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    postCoordinate: (payload) => dispatch(post_coordinate(payload)),
    fetchAddress: (payload) => dispatch(fetch_address(payload))
  }
}

const ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps)(Drag)

export default ConnectedComponent
