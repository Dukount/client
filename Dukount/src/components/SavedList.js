import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  ScrollView,
  AsyncStorage,
  FlatList
} from 'react-native';

export default class SavedList extends Component {
  constructor() {
    super()
    this.state = {
      token: ''
    }
  }

  componentDidMount() {
    this.getToken()
  }

  getToken() {
    AsyncStorage.getItem('token').then(value => {
      console.log('ini harusnya token :===>', value);
      this.setState({
        token: value
      })
    })
  }


  render() {
    console.log('ini state token ', this.state.token)
    return (
      <View>
      <Text style={{color: 'black'}}>Yeaay masuk List</Text>
      <Text>{this.state.token}</Text>
      </View>
    )
  }
}
