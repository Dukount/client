import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image
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
    const {navigate} = this.props.navigation
    return(
      <View style={styles.container}>
      <View>
        <Image source={require('../assets/img/logo_small_white.png')} style={{height: 50, width: 210, marginBottom: 30}} />
      </View>
        <TextInput
          style={{height: 40, width: 260, borderWidth: 1, borderColor: 'white', textAlign: 'center', color: 'white'}}
          onChangeText={(text) => this.setStateName(text)}
          placeholder={'Name'}
          placeholderTextColor="white"
        />
        <TextInput
          style={{height: 40, width: 260, borderWidth: 1, borderColor: 'white', textAlign: 'center', color: 'white', marginTop: 15}}
          onChangeText={(text) => this.setStateUsername(text)}
          placeholder={'Username'}
          placeholderTextColor="white"
        />
        <TextInput
          style={{height: 40, width: 260, borderWidth: 1, borderColor: 'white', textAlign: 'center', color: 'white', marginTop: 15}}
          onChangeText={(text) => this.setStatePassword(text)}
          placeholder={'Password'}
          secureTextEntry={true}
          placeholderTextColor="white"
        />
        <TextInput
          style={{height: 40, width: 260, borderWidth: 1, borderColor: 'white', textAlign: 'center', color: 'white', marginTop: 15}}
          onChangeText={(text) => this.setStateEmail(text)}
          placeholder={'Email'}
          placeholderTextColor="white"
        />
        <TextInput
          style={{height: 40, width: 260, borderWidth: 1, borderColor: 'white', textAlign: 'center', color: 'white', marginTop: 15}}
          onChangeText={(text) => this.setStateTelp(text)}
          placeholder={'Phone Number'}
          placeholderTextColor="white"
          keyboardType = {'numeric'}
        />
        <TouchableHighlight onPress={ ()=> navigate('Login') } title = "Submit">
          <View style={{
          backgroundColor:'#57A8F8',
          padding: 5,
          alignItems: 'center',
          borderRadius: 3,
          width: 260,
          height: 40,
          alignSelf: 'center',
          marginTop: 30}}>
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>Register</Text>
          </View>
        </TouchableHighlight>
      </View>
    )
  }

}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#1d81e5',
    alignItems: 'center',
    justifyContent: 'center'
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
