import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  ScrollView,
  AsyncStorage
} from 'react-native';

export default class SavedList extends Component {
  constructor() {
    super()
    this.state = {
      token: ''
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('token',
    (value) => {
      console.log('ini value token ', value)
      this.setState({ token: value })
    })
  }


  render() {
    console.log('ini state token ', this.state.token)
    return (
      <View>
      <Text>Yeaay masuk List</Text>
      <Text>{this.state.token}</Text>
      </View>
    )
  }
}
