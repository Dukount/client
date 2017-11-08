import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  AsyncStorage
} from 'react-native';
import axios from 'axios'
import { loginThunk } from '../actions/actionUser'
import { connect } from 'react-redux'

class Login extends Component<{}> {
  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      loginStatus: '',
      token: ''
    }
  }

  validateEmpty () {
    const { navigate } = this.props.navigation
    console.log('Berhasil');
    var user = {
      username : this.state.username,
      password : this.state.password
    }
    this.loginPostRequest()
    navigate('SavedList')
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

  async loginPostRequest() {
    // var url = `http://35.199.117.172:3000/users/login`
    // axios.post(url, {
    //   username: this.state.username,
    //   password: this.state.password
    // })
    // .then(({data}) => {
    //   var token = JSON.stringify(data.token)
    //   var info = JSON.stringify(data.resp)
    //   console.log(data)
    //   AsyncStorage.setItem('token', token)
    //   AsyncStorage.setItem('user', info)
    //   this.checkAsyncStorage()
    // })
    // .catch(err => {
    //   console.log(error);
    // })
    await AsyncStorage.setItem('token', 'apa aja')
    this.checkAsyncStorage()
  }

  checkAsyncStorage() {
    AsyncStorage.getItem('token',
    (value) => {
      console.log('ini value token ', value)
      this.setState({ token: value })
    })
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
