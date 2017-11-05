import React, { Component } from 'react';
import { View, TouchableHighlight, Text } from 'react-native';
import { connect } from 'react-redux'

class Home extends Component {

  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={() => navigate('CalendarScreen')}>
        <Text style={styles.sentence}>
          Pick Your Workdays
        </Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={() => navigate('FromLocation')}>
        <Text style={styles.sentence}>
          From Location
        </Text>
        </TouchableHighlight>

        <View>
          <Text>{this.props.addressFrom}</Text>
        </View>

        <TouchableHighlight onPress={() => navigate('ToLocation')}>
        <Text style={styles.sentence}>
          To Location
        </Text>
        </TouchableHighlight>

        <View>
          <Text>{this.props.addressTo}</Text>
        </View>
      </View>
    );
  }
}
// navigate('Main')
const styles = {
  container: {
    flex: 1,
    backgroundColor: '#d1ddf0',
    alignItems: 'center',
    justifyContent: 'center'
  },
  sentence: {
    marginTop: 10,
    fontSize: 30
  }
}

const mapStateToProps = (state) => {
  return {
    latitudeFrom: state.MapReducer.latitudeFrom,
    longitudeFrom: state.MapReducer.longitudeFrom,
    addressFrom: state.MapReducer.addressFrom,
    latitudeTo: state.MapReducer.latitudeTo,
    longitudeTo: state.MapReducer.longitudeTo,
    addressTo: state.MapReducer.addressTo
  }
}

const ConnectedComponent = connect(
  mapStateToProps,
  null)(Home)

export default ConnectedComponent
