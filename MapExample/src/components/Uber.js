import React, { Component } from 'react'
import {
  Text,
  View,
  Button,
  FlatList,
  StyleSheet,
  Dimensions
} from 'react-native'
import MapView from 'react-native-maps';
import Polyline from '@mapbox/polyline'
import { connect } from 'react-redux'
import { fetch_uber_fare } from '../actions/MapAction'


class Uber extends Component {
  constructor(props) {
    super(props)
    this.state = {
      uberType: [],
      num: 0,
      coords: []
    }
  }

  fetchUberFareMethod() {
    let payload = {
      latitudeFrom: this.props.latitudeFrom,
      longitudeFrom: this.props.longitudeFrom,
      latitudeTo: this.props.latitudeTo,
      longitudeTo: this.props.longitudeTo
    }
    this.props.fetchUberFare(payload)
  }


  componentDidMount() {
    this.getDirections(`${this.props.latitudeFrom.toString()}, ${this.props.longitudeFrom.toString()}`, `${this.props.latitudeTo.toString()}, ${this.props.longitudeTo.toString()}`)
  }

  async getDirections(startLoc, destinationLoc) {
    try {
        let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${ startLoc }&destination=${ destinationLoc }`)
        let respJson = await resp.json();
        console.log(respJson)
        let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
        let coords = points.map((point, index) => {
            return  {
                latitude : point[0],
                longitude : point[1]
            }
        })
        this.setState({coords: coords})
        return coords
    } catch(error) {
        alert(error)
        return error
    }
  }

  fetchUberOptions(uber) {
    let fare = Math.round((uber.high_estimate + uber.low_estimate)/2)
    this.state.uberType.push({vehicle: uber.display_name, fare: fare})
    console.log(this.state.uberType)
  }


  render() {
    return (
      <View>
        {!this.props.uberSuggestions ? <Text>Check your uber</Text> : (
          <View>
          <View>
            <MapView
              style={styles.map}
              initialRegion={{
              latitude:this.props.latitudeFrom,
              longitude:this.props.longitudeFrom,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421}}
              showsTraffic={true}
              showsUserLocation={ true }
              showsCompass={true}
              followsUserLocation={true}
            >

            <MapView.Polyline
              coordinates={this.state.coords}
              strokeWidth={3}
              strokeColor="blue"
            />

            <MapView.Marker
              coordinate={{
                latitude: this.props.latitudeFrom,
                longitude: this.props.longitudeFrom
              }}
              pinColor="#0071ce"
              title={this.props.addressFrom.toString()}
            />

            <MapView.Marker
              coordinate={{
                latitude: this.props.latitudeTo,
                longitude: this.props.longitudeTo
              }}
              pinColor="#ff9400"
              title={this.props.addressTo.toString()}
            />

            </MapView>
          </View>
          <View>
            <Button
              title="Check Uber"
              onPress={() => this.fetchUberFareMethod()}
            />
            <View style={styles.flatListBox}>
            <FlatList
              data={this.props.uberSuggestions}
              keyExtractor={(item, idx) => idx}
              style={styles.flatList}
              renderItem={({item}) => {
                return (
                  <View style={styles.uberService}>
                    <Text>{this.fetchUberOptions(item)}</Text>
                    <Text style={styles.vehicleOption}>Vehicle Option: {item.display_name}</Text>
                    <Text style={styles.tripDuration}>Trip Duration: {Math.round(item.duration/60)} Minutes</Text>
                    <Text style={styles.fareEstimation}>Fare Estimation: IDR {Math.round((item.high_estimate + item.low_estimate)/2)}</Text>
                  </View>
                )
              }}
            />
            </View>
          </View>
          </View>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  flatListBox: {
    height: 410
  },
  flatList: {
    top: 0,
    marginBottom: 110
  },
  uberService: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'red',
  },
  tripDuration: {
    color: 'red'
  },
  fareEstimation: {
    color: 'green'
  },
  vehicleOption: {
    color: 'black'
  },
  map: {
    position: 'absolute',
    marginTop: 330,
    width: 360,
    height: 300
  },
});

const mapStateToProps = (state) => {
  return {
    latitudeFrom: state.MapReducer.latitudeFrom,
    longitudeFrom: state.MapReducer.longitudeFrom,
    addressFrom: state.MapReducer.addressFrom,
    latitudeTo: state.MapReducer.latitudeTo,
    longitudeTo: state.MapReducer.longitudeTo,
    addressTo: state.MapReducer.addressTo,
    suggestions: state.MapReducer.suggestions,
    uberSuggestions: state.MapReducer.uberSuggestions
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUberFare: (payload) => dispatch(fetch_uber_fare(payload)),
  }
}

const ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps)(Uber)

export default ConnectedComponent
