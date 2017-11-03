/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Navigator from './src/config/Navigator'
import { Provider } from 'react-redux';
import store from './src/store';

export default class App extends Component<{}> {
  render() {
    // console.log(this.state.region)
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    );
  }
}
