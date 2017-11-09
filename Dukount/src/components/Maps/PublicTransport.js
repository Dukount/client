import React, { Component } from 'react'
import {
  Text,
  View,
  Button,
  FlatList,
  StyleSheet,
  Image,
  TouchableHighlight
} from 'react-native'
import { connect } from 'react-redux'
import { fetch_trafi_route } from '../../actions/MapAction'

class PublicTransport extends Component {
  constructor(props) {
    super(props)
    this.state = {
      routes: []
    }
  }

  fetchTrafiRouteMethod() {
    let payload = {
      latitudeFrom: this.props.latitudeFrom,
      longitudeFrom: this.props.longitudeFrom,
      latitudeTo: this.props.latitudeTo,
      longitudeTo: this.props.longitudeTo
    }
    this.props.fetchTrafiRoute(payload)
  }

  checkSegmentTransport(transportName) {
    if (transportName === null) {
      return ''
    } else if(transportName !== null && transportName.Name.split(' ').indexOf('TransJakarta') !== -1 ) {
      return `${transportName.Name} IDR 3.500 one time pay from first bus shelter`
    } else if(transportName !== null && transportName.Name.split(' ').indexOf('KRL') !== -1 ) {
      return `${transportName.Name} IDR 4.000 one time pay from first train station`
    } else {
      return `${transportName.Name} IDR 4.000`
    }
  }

  checkPreferenceLabel(label) {
    let rute = this.state.routes
    let transport = []
    let harga = 0
    if (label.PreferenceLabel !== '') {
      label.RouteSegments.map(route => {
        if (route.Transport === null) {
          harga += 0
        } else if (route.Transport.Name.split(' ').indexOf('TransJakarta') !== -1 && transport.indexOf('TransJakarta') === -1) {
          transport.push('TransJakarta')
          harga += 3500
        } else if (route.Transport.Name.split(' ').indexOf('KRL') !== -1 && transport.indexOf('KRL') === -1) {
          transport.push('KRL')
          harga += 4000
        } else if (route.Transport.Name.split(' ').indexOf('KRL') === -1 && route.Transport.Name.split(' ').indexOf('TransJakarta') === -1) {
          transport.push(route.Transport.Name)
          harga += 4000
        }
      })
      // console.log(`Labelnya ${label.PreferenceLabel} dan ${transport} dan harganya ${harga}`)
      rute.push({label: label.PreferenceLabel, price: harga})
    } else {
      return 'No Label'
    }
    // console.log('ini routes di checkPreferenceLabel ', this.state.routes)
    // console.log('ini rute di checkPreferenceLabel ', rute)
  }

  checkSegmentFrom(segment) {
    if (segment.Transport == null) {
      if (segment.StartPoint.Name === "") {
        return `From: ${this.props.addressFrom.filter(Boolean).join(',')}`
      } else {
        return `From: ${segment.StartPoint.Name}`
      }
    } else if (segment.Transport !== null && segment.Transport.Name.split(' ').indexOf('TransJakarta') !== -1) {
      return `From Bus Shelter: ${segment.StartPoint.Name}`
    } else if (segment.Transport !== null && segment.Transport.Name.split(' ').indexOf('KRL') !== -1) {
      return `From Station: ${segment.StartPoint.Name}`
    } else if (segment.Transport !== null && (segment.Transport.Name.split(' ').indexOf('TransJakarta') === -1 && segment.Transport.Name.split(' ').indexOf('KRL') === -1)) {
      return `From MiniBus Stop: ${segment.StartPoint.Name}`
    }
  }

  checkSegmentTo(segment) {
    if (segment.Transport == null) {
      if (segment.EndPoint.Name === "") {
        return `To: ${this.props.addressTo.filter(Boolean).join(',')}`
      } else {
        return `To: ${segment.EndPoint.Name}`
      }
    } else if (segment.Transport !== null && segment.Transport.Name.split(' ').indexOf('TransJakarta') !== -1) {
      return `To Bus Shelter: ${segment.EndPoint.Name}`
    } else if (segment.Transport !== null && segment.Transport.Name.split(' ').indexOf('KRL') !== -1) {
      return `To Station: ${segment.EndPoint.Name}`
    } else if (segment.Transport !== null && (segment.Transport.Name.split(' ').indexOf('TransJakarta') === -1 && segment.Transport.Name.split(' ').indexOf('KRL') === -1)) {
      return `To MiniBus Stop: ${segment.EndPoint.Name}`
    }
  }

  captionForIcon(item) {
    if (item.Transport == null) {
      return (
        <View style={{flexDirection: 'row'}}>
        <Image
          style={{height: 30, width: 25, marginRight: 1}}
          source={{uri: `${item.IconUrl}`}}
        />
        <Text style={{padding: 5, color: '#1d81e5', fontWeight: 'bold', fontSize: 18}}>Take a Walk</Text>
        <Text style={{padding: 5, color: '#1d81e5', fontSize: 11, marginLeft: 90, fontWeight: 'bold', fontStyle: 'italic'}}>Duration: {item.DurationMinutes} Minutes</Text>
        </View>
      )
    } else if (item.Transport !== null && item.Transport.Name.split(' ').indexOf('TransJakarta') !== -1) {
      return (
        <View style={{flexDirection: 'row'}}>
        <Text style={{padding: 5, color: '#1d81e5', fontWeight: 'bold', fontSize: 16}}>TransJakarta Corridor</Text>
        <Image
          style={{height: 25, width: 25, marginLeft: 15}}
          source={{uri: `${item.IconUrl}`}}
        />
        <Text style={{padding: 5, color: '#1d81e5', fontSize: 11, marginLeft: 10, fontWeight: 'bold', fontStyle: 'italic'}}>Duration: {item.DurationMinutes} Minutes</Text>
        </View>
      )
    } else if (item.Transport !== null && item.Transport.Name.split(' ').indexOf('KRL') !== -1) {
      return (
        <View style={{flexDirection: 'row'}}>
        <Text style={{padding: 5, color: '#1d81e5', fontWeight: 'bold', fontSize: 18}}>Commuterline</Text>
        <Image
          style={{height: 25, width: 25, marginLeft: 15}}
          source={{uri: `${item.IconUrl}`}}
        />
        <Text style={{padding: 5, color: '#1d81e5', fontSize: 11, marginLeft: 60, fontWeight: 'bold', fontStyle: 'italic'}}>Duration: {item.DurationMinutes} Minutes</Text>
        </View>
      )
    } else {
      return (
        <View style={{flexDirection: 'row'}}>
        <Text style={{padding: 5, color: '#1d81e5', fontWeight: 'bold', fontSize: 18}}>MiniBus No.</Text>
        <Image
          style={{height: 25, width: 25, marginLeft: 15}}
          source={{uri: `${item.IconUrl}`}}
        />
        <Text style={{padding: 5, color: '#1d81e5', fontSize: 11, marginLeft: 75, fontWeight: 'bold', fontStyle: 'italic'}}>Duration: {item.DurationMinutes} Minutes</Text>
        </View>
      )
    }
  }

  componentDidMount() {
    // console.log('ini routes ', this.state.routes)
  }

  render() {
    const { goBack, navigate } = this.props.navigation
    return (
      <View>
      <View>
      <View style={{height: 50, backgroundColor: '#1d81e5', flexDirection: 'row'}}>
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
        {!this.props.suggestions ? <Text>Check your routes</Text> : (
          <View style={styles.container}>
          <Text>{this.checkPreferenceLabel(this.props.suggestions[this.props.labelIndex])}</Text>
          <View style={{width: 300, backgroundColor: '#1d81e5', height: 50, padding: 5, alignSelf: 'center', borderRadius: 5, marginTop: 20}}>
            <Text style={{textAlign: 'center', fontWeight: 'bold', color: 'white', fontSize: 16}}>Transportation Detail</Text>
            <Text style={{textAlign: 'center', fontWeight: 'bold', color: 'white', fontSize: 12, fontStyle: 'italic'}}>{this.state.routes[0].label}</Text>
          </View>
            <View style={{flexDirection: 'row', marginTop: 10, alignSelf: 'center'}}>
              <View style={{borderColor: '#1d81e5', borderWidth: 1, padding: 5, borderRadius: 1, flexDirection: 'row'}}>
                <Image source={require('../../assets/img/clock.png')} style={{height: 20, width: 20, alignItems: 'center', marginRight: 5}}/>
                <Text style={{color: '#1d81e5', fontWeight: 'bold'}}>Duration Total: </Text>
              </View>
              <View style={{backgroundColor: '#1d81e5', borderRadius: 1, padding: 5}}>
                <Text style={{color: 'white', fontStyle: 'italic', fontWeight: 'bold'}}>± {this.props.suggestions[this.props.labelIndex].DurationMinutes} Minutes</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', marginTop: 5, alignSelf: 'center', marginBottom: 20}}>
              <View style={{borderColor: '#1d81e5', borderWidth: 1, borderRadius: 1, padding: 5}}>
                <Text style={{color: '#1d81e5', fontStyle: 'italic', fontWeight: 'bold'}}>IDR {(this.state.routes[0].price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} / TRIP </Text>
              </View>
              <View style={{backgroundColor: '#1d81e5', borderRadius: 1, padding: 5}}>
                <Text style={{color: 'white', fontStyle: 'italic', fontWeight: 'bold'}}>IDR {(this.state.routes[0].price * 2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} / DAY </Text>
              </View>
            </View>
            <FlatList
              data={this.props.suggestions[this.props.labelIndex].RouteSegments}
              keyExtractor={(item, idx) => idx}
              renderItem={({item}) => {
                return (
                  <View style={styles.preferenceLabel}>
                    {this.captionForIcon(item)}
                    <Text>{this.checkSegmentFrom(item)}</Text>
                    <Text>{this.checkSegmentTo(item)}</Text>
                    <Text>{this.checkSegmentTransport(item.Transport)}</Text>
                  </View>
                )
              }}
            />
          </View>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    top: 0,
    marginBottom: 450
  },
  flatList: {
    marginBottom: 100
  },
  preferenceLabel: {
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#1d81e5',
    marginRight: 5,
    marginLeft: 5,
    marginTop: 1,
    marginBottom: 1,
    padding: 10
  },
  routeSegments: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: 'blue',
  },
  durationText: {
    color: 'red'
  },
  startText: {
    color: 'blue'
  },
  endText: {
    color: 'green'
  },
  transportText: {
    color: 'purple'
  }
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
    labelIndex: state.MapReducer.labelIndex
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTrafiRoute: (payload) => dispatch(fetch_trafi_route(payload)),
  }
}

const ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps)(PublicTransport)

export default ConnectedComponent
