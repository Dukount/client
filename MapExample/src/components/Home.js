import React, { Component } from 'react';
import { View, Image, TouchableHighlight, Text, Button } from 'react-native';

class Home extends Component {

  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={() => navigate('Combine')}>
        <Text style={styles.sentence}>
          Combine
        </Text>
        </TouchableHighlight>


        <TouchableHighlight onPress={() => navigate('Search')}>
        <Text style={styles.sentence}>
          Search
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
    fontSize: 20
  }
}

export default Home
