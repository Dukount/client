import React, { Component } from 'react';
import {
  Platform,
  View
} from 'react-native';
import { Provider } from "react-redux";

import store from './src/store'
import FoodResult from './src/components/FoodResult'
import Calendar from './src/components/Calendar'

export default class App extends Component<{}> {
  render() {
    return (
      <Provider store={store}>
       <Calendar />
      </Provider>
    );
  }
}
