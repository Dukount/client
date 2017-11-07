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
        <View>
        <Image
          style={{height: 25, width: 25}}
          source={{uri: `${item.IconUrl}`}}
        />
        <Text>Take a Walk</Text>
        </View>
      )
    } else if (item.Transport !== null && item.Transport.Name.split(' ').indexOf('TransJakarta') !== -1) {
      return (
        <View>
        <Text>TransJakarta Corridor</Text>
        <Image
          style={{height: 25, width: 25}}
          source={{uri: `${item.IconUrl}`}}
        />
        </View>
      )
    } else if (item.Transport !== null && item.Transport.Name.split(' ').indexOf('KRL') !== -1) {
      return (
        <View>
        <Text>Commuterline</Text>
        <Image
          style={{height: 25, width: 25}}
          source={{uri: `${item.IconUrl}`}}
        />
        </View>
      )
    } else {
      return (
        <View>
        <Text>MiniBus No.</Text>
        <Image
          style={{height: 25, width: 25}}
          source={{uri: `${item.IconUrl}`}}
        />
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
        {!this.props.suggestions ? <Text>Check your routes</Text> : (
          <View style={styles.container}>
          <Text>{this.checkPreferenceLabel(this.props.suggestions[this.props.labelIndex])}</Text>
          <View style={{width: 200, backgroundColor: '#1DE9B6', height: 50, padding: 15, alignSelf: 'center', borderRadius: 5}}>
          <Text style={{textAlign: 'center', fontWeight: 'bold', color: 'white'}}>{this.state.routes[0].label}</Text>
          </View>
            <Text>Duration Total: {this.props.suggestions[this.props.labelIndex].DurationMinutes} Minutes</Text>
            <Text>IDR {(this.state.routes[0].price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} / TRIP </Text>
            <Text>IDR {(this.state.routes[0].price * 2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} / DAY </Text>
            <FlatList
              data={this.props.suggestions[this.props.labelIndex].RouteSegments}
              keyExtractor={(item, idx) => idx}
              renderItem={({item}) => {
                return (
                  <View style={styles.preferenceLabel}>
                    {this.captionForIcon(item)}
                    <Text>Duration: {item.DurationMinutes} Minutes</Text>
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
    marginBottom: 300
  },
  flatList: {
    marginBottom: 200
  },
  preferenceLabel: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'red',
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
