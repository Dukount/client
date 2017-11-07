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
import { fetch_uber_fare } from '../../actions/MapAction'


class Uber extends Component {
  constructor(props) {
    super(props)
    this.state = {
      coords: []
    }
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

  render() {
    return (
      <View>
        <View>
          <View>
            <MapView
              style={styles.map}
              initialRegion={{
              latitude:this.props.latitudeFrom,
              longitude:this.props.longitudeFrom,
              latitudeDelta: 0.41,
              longitudeDelta: 0.0421}}
              showsUserLocation={ true }
              showsCompass={true}
            >

            <MapView.Polyline
              coordinates={this.state.coords}
              strokeWidth={3}
              strokeColor="blue"
              style={{zIndex: 99}}
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
          <View style={styles.uberService}>
            <Text style={styles.vehicleOption}>Vehicle Option: {this.props.uberType}</Text>
            <Text style={styles.tripDuration}>Trip Duration: {this.props.uberDuration} Minutes</Text>
            <Text style={styles.fareEstimation}>Fare Estimation: IDR {(this.props.uberFare / 2 / this.props.calendarWorkDay.length).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
          </View>
        </View>
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
    marginTop: 60,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    zIndex: 10
  },
});

const mapStateToProps = (state) => {
  return {
    calendarWorkDay: state.price.workCalendar,
    latitudeFrom: state.MapReducer.latitudeFrom,
    longitudeFrom: state.MapReducer.longitudeFrom,
    addressFrom: state.MapReducer.addressFrom,
    latitudeTo: state.MapReducer.latitudeTo,
    longitudeTo: state.MapReducer.longitudeTo,
    addressTo: state.MapReducer.addressTo,
    uberFare: state.MapReducer.uberFare,
    uberType: state.MapReducer.uberType,
    uberDuration: state.MapReducer.uberDuration
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
