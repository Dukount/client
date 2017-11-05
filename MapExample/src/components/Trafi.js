import React, { Component } from 'react'
import {
  Text,
  View,
  Button,
  FlatList,
  StyleSheet
} from 'react-native'
import { connect } from 'react-redux'
import { fetch_trafi_route } from '../actions/MapAction'

class Trafi extends Component {
  constructor(props) {
    super(props)
    this.state = {
      routes: [],
      num: 0
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
      return `Just Walk`
    } else if(transportName !== null && transportName.Name.split(' ').indexOf('TransJakarta') !== -1 ) {
      return `${transportName.Name} IDR 3500 1 kali bayar dari halte pertama`
    } else if(transportName !== null && transportName.Name.split(' ').indexOf('KRL') !== -1 ) {
      return `${transportName.Name} IDR 4000 1 kali bayar dari stasiun pertama`
    } else {
      return `${transportName.Name} IDR 4000`
    }
  }

  checkPreferenceLabel(label) {
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
      console.log(`Labelnya ${label.PreferenceLabel} dan ${transport} dan harganya ${harga}`)
      this.state.routes.push({label: label.PreferenceLabel, price: harga})
    } else {
      return 'No Label'
    }
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

  numCounter() {
    this.state.num += 1
  }

  render() {
    console.log(this.state.routes)
    return (
      <View>
        {!this.props.suggestions ? <Text>Check your routes</Text> : (
          <View style={styles.container}>
            <Button
              title="Trafi Route"
              onPress={() => this.fetchTrafiRouteMethod()}
            />
            <FlatList
              data={this.props.suggestions}
              keyExtractor={(item, idx) => idx}
              initialNumToRender={50}
              removeClippedSubviews={false}
              style={styles.flatList}
              renderItem={({item}) => {
                console.log('ini suggestion ', item)
                return (
                  <View style={styles.preferenceLabel}>
                    <Text>{this.checkPreferenceLabel(item)}</Text>
                    <Text>{this.state.routes[this.state.num].label}</Text>
                    <Text>{this.state.routes[this.state.num].price}</Text>
                    <Text>{this.numCounter()}</Text>
                    <View>{item.RouteSegments.map(segment => {
                      return (
                        <View style={styles.routeSegments}>
                          <Text style={styles.durationText}>{segment.DurationMinutes} Menit</Text>
                          <Text style={styles.startText}>{this.checkSegmentFrom(segment)}</Text>
                          <Text style={styles.endText}>{this.checkSegmentTo(segment)}</Text>
                          <Text style={styles.transportName}>{this.checkSegmentTransport(segment.Transport)}</Text>
                        </View>
                      )
                    })}
                    </View>
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
    top: 0
  },
  flatList: {
    marginBottom: 70
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
    suggestions: state.MapReducer.suggestions
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTrafiRoute: (payload) => dispatch(fetch_trafi_route(payload)),
  }
}

const ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps)(Trafi)

export default ConnectedComponent
