import React, { Component } from 'react';
import {
  Platform,
  View
} from 'react-native';
import { Provider } from "react-redux";

import store from './src/store'
import Navigation from './src/route/Navigation'

export default class App extends Component<{}> {
  render() {
    return (
      <Provider store={store}>
       <Navigation />
      </Provider>
    );
  }
}
