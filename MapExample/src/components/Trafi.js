import React, { Component } from 'react'
import {
  Text,
  View,
  Button,
  FlatList
} from 'react-native'
import { connect } from 'react-redux'
import { fetch_trafi_route } from '../actions/MapAction'

class Trafi extends Component {
  fetchTrafiRouteMethod() {
    let payload = {
      latitudeFrom: this.props.latitudeFrom,
      longitudeFrom: this.props.longitudeFrom,
      latitudeTo: this.props.latitudeTo,
      longitudeTo: this.props.longitudeTo
    }
    this.props.fetchTrafiRoute(payload)
  }

  render() {
    return (
      <View>
        <View>
          <Text>This is LatLong From</Text>
          <Text>{this.props.latitudeFrom}</Text>
          <Text>{this.props.longitudeFrom}</Text>
          <Text>{this.props.addressFrom}</Text>
        </View>
        <View>
          <Text>This is LatLong To</Text>
          <Text>{this.props.latitudeTo}</Text>
          <Text>{this.props.longitudeTo}</Text>
          <Text>{this.props.addressTo}</Text>
        </View>
        <View>
        {!this.props.suggestions ? <Text>Check your routes</Text> : (
          <FlatList
            data={this.props.suggestions}
            renderItem={({suggestion}) => {
              return (
                <View>{this.props.suggestions.map(suggestion => {
                  return (
                    <Text>{suggestion.PreferenceLabel}</Text>
                  )
                })}
                </View>
              )
            }}
          />
        )}
        </View>
        <Button
          title="Trafi Route"
          onPress={() => this.fetchTrafiRouteMethod()}
        />
      </View>
    )
  }
}

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
