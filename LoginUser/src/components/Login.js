import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button
} from 'react-native';

class Login extends Component<{}> {
  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      loginStatus: ''
    }
  }

  validateEmpty () {
    console.log('Berhasil');
  }

  setStateUsername (text) {
    this.setState({
      username: text,
      status: true
    })
  }
  setStatePassword (text) {
    this.setState({
      username: text,
      status: true
    })
  }

  submit () {
    if (this.state.username === '' && this.state.password === '') {
      this.setState({
        loginStatus: 'Username dan password tidak boleh kosong'
      })
    } else if (this.state.username === ''){
      this.setState({
        loginStatus: 'Username tidak boleh kosong'
      })
    } else if(this.state.password === ''){
      this.setState({
        loginStatus: 'Password tidak boleh kosong'
      })
    } else if (this.state.username !== '' && this.state.username !== '') {
      this.setState({
        loginStatus: 'Berhasil login'
      })
      this.validateEmpty()
    }
  }

  statusLogin () {
    if (this.state.loginStatus !== '') {
      return this.state.loginStatus
    }
  }
  render () {
    return(
      <View>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setStateUsername(text)}
        />
        <Text>ini username : {this.state.username}</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({password: text})}
        />
        <Text>ini password : {this.state.password}</Text>
        <Button
          onPress={ ()=> this.submit() }
          title = "Submit"
        />
        <Text>ini Status : {this.statusLogin()}</Text>
      </View>
    )
  }

}

export default Login
