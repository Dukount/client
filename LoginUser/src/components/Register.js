import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button
} from 'react-native';
import { registerThunk } from '../actions/actionUser'
import { connect } from 'react-redux'

class Register extends Component<{}> {
  constructor() {
    super()
    this.state = {
      name: '',
      username: '',
      password: '',
      email:'',
      telp: '',
      loginStatus: ''
    }
  }

  validateEmpty () {
    console.log('Berhasil');
    var user = {
      name: this.state.name,
      username : this.state.username,
      password : this.state.password,
      email: this.state.email,
      telp: this.state.telp
    }
    this.props.registerUser(user)
  }

  setStateName (text) {
    this.setState({
      name: text,
      status: true
    })
  }
  setStateUsername (text) {
    this.setState({
      username: text,
      status: true
    })
  }
  setStatePassword (text) {
    this.setState({
      password: text,
      status: true
    })
  }
  setStateEmail (text) {
    this.setState({
      email: text,
      status: true
    })
  }
  setStateTelp (text) {
    this.setState({
      telp: text,
      status: true
    })
  }

  submit () {
    if (this.state.username === '' && this.state.password === '' && this.state.name === '') {
      this.setState({
        loginStatus: 'Form tidak boleh kosong'
      })
    } else if (this.state.name === '') {
      this.setState({
        loginStatus: 'Nama tidak boleh kosong'
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
          onChangeText={(text) => this.setStateName(text)}
        />
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setStateUsername(text)}
        />
        <Text>ini username : {this.state.username}</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setStatePassword(text)}
        />
        <Text>ini password : {this.state.password}</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setStateEmail(text)}
        />
        <Text>ini password : {this.state.email}</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setStateTelp(text)}
        />
        <Text>ini password : {this.state.telp}</Text>
        <Button
          onPress={ ()=> this.submit() }
          title = "Submit"
        />
        <Text>ini Status : {this.statusLogin()}</Text>
      </View>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    stateRegisterUser: state.userReducer
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    registerUser: (payload) => dispatch(registerThunk(payload)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
