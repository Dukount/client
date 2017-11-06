import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text
} from 'react-native';

import { connect } from 'react-redux'

export default class FinalResult extends Component {
  static navigationOptions = {
    title: 'FinalResult'
  }
  constructor() {
    super()
  }

  render () {
    return (
      <View>
        <Text>Your salary :</Text>
      </View>
    )
  }
}
