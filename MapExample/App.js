/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Navigator from './src/config/Navigator'
import { Provider } from 'react-redux';
import store from './src/store';
import SplashScreen from 'react-native-splash-screen'


export default class App extends Component<{}> {
  componentDidMount() {
    	// do stuff while splash screen is shown
        // After having done stuff (such as async tasks) hide the splash screen
        SplashScreen.hide();
    }

  render() {
    // console.log(this.state.region)
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    );
  }
}
