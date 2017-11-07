import React, { Component } from 'react'
import {
  Text,
  View,
  Button,
  FlatList,
  StyleSheet,
  Dimensions,
  Image,
  TouchableHighlight
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
    const { goBack, navigate } = this.props.navigation
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
          <View style={{borderColor: '#1d81e5', borderTopWidth: 1, justifyContent: 'center', flexDirection: 'row', padding: 5}}>
            <Image source={require('../../assets/img/scooter-front-view.png')} style={{height: 22, width: 15, marginRight: 5}} />
            <Text style={{textAlign: 'center', color: '#57A42D', fontWeight: 'bold', fontSize: 18}}>{this.props.uberType}</Text>
          </View>
          <View style={styles.uberService}>
          <View style={{backgroundColor: '#1d81e5', width: 180, padding: 5, alignItems: 'center', flexDirection: 'row'}}>
          <View>
            <Image source={require('../../assets/img/stopwatch.png')} style={{height: 28, width: 28, marginRight: 5, marginLeft: 15}} />
          </View>
          <View>
            <Text style={styles.tripDuration}>Trip Duration</Text>
            <Text style={{color: 'white', fontWeight: 'bold', fontStyle: 'italic'}}>{this.props.uberDuration} Minutes</Text>
          </View>
          </View>
          <View style={{backgroundColor: '#57A42D', width: 180, padding: 5, alignItems: 'center', flexDirection: 'row'}}>
          <View>
            <Image source={require('../../assets/img/notepad.png')} style={{height: 28, width: 23, marginRight: 5, marginLeft: 15}} />
          </View>
          <View>
            <Text style={styles.fareEstimation}>Fare Estimation</Text>
            <Text style={{color: 'white', fontWeight: 'bold', fontStyle: 'italic'}}>IDR {(this.props.uberFare / 2 / this.props.calendarWorkDay.length).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} / trip</Text>
          </View>
          </View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  flatListBox: {
    height: 500
  },
  flatList: {
    top: 0,
    marginBottom: 110
  },
  uberService: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  tripDuration: {
    color: 'white',
    fontSize: 14
  },
  fareEstimation: {
    color: 'white'
  },
  map: {
    position: 'absolute',
    marginTop: 65,
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
