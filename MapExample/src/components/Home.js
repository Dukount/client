import React, { Component } from 'react';
import { View, TouchableHighlight, Text } from 'react-native';
import { connect } from 'react-redux'
import SplashScreen from 'react-native-splash-screen'

class Home extends Component {
  componentDidMount() {
      // do stuff while splash screen is shown
        // After having done stuff (such as async tasks) hide the splash screen
        SplashScreen.hide();
    }

  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={() => navigate('DragFrom')}>
        <Text style={styles.sentence}>
          From
        </Text>
        </TouchableHighlight>

        <View>
          <Text>{this.props.addressFrom}</Text>
        </View>


        <TouchableHighlight onPress={() => navigate('DragTo')}>
        <Text style={styles.sentence}>
          To
        </Text>
        </TouchableHighlight>

        <View>
          <Text>{this.props.addressTo}</Text>
        </View>

        <TouchableHighlight onPress={() => navigate('Trafi')}>
        <Text style={styles.sentence}>
          Trafi
        </Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={() => navigate('Uber')}>
        <Text style={styles.sentence}>
          Uber
        </Text>
        </TouchableHighlight>
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
  imgWrapper: {
    width: 128,
    height: 128,
    marginTop: 10
  },
  sentence: {
    marginTop: 10,
    fontSize: 50
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
