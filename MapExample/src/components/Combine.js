import React, { Component } from 'react';
import { View } from 'react-native';

import Drag from './Drag'
import Search from './Search'

export default class Combine extends Component {

  render() {
    return (
      <View>
        <Drag />
      </View>
    );
  }
}
