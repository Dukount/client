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
import { listThunk } from '../actions/listAction'
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
  componentDidMount() {
    AsyncStorage.getItem('token').then(value => {
      this.setState({
        token: value
      })
    })
    .catch(err=>{
      console.log(err);
    })
    setTimeout(()=> {
      this.navigateLogined()
    }, 0.1)

  }

  navigateLogined() {
    const {navigate} = this.props.navigation
    var token = this.state.token
    if (token !== '') {
      navigate('Home')
    }
  }

  validateEmpty () {
    const { navigate } = this.props.navigation
    var user = {
      username : this.state.username,
      password : this.state.password
    }
    var url = `http://35.199.117.172:3000/users/login`
    axios.post(url, {
      username: user.username,
      password: user.password
    })
    .then(({data}) => {
      if (data.token) {
        AsyncStorage.setItem('token', JSON.stringify(data.token))
        this.getToken()
        navigate('Home')
      } else if (data.msg) {
        this.setState({
           loginStatus: data.msg
        })
      }
      this.props.daftarThunk(data.token)
    })
    .catch(err => {
      console.log(error);
    })
  }
  getToken() {
    AsyncStorage.getItem('token').then(value => {
      this.setState({
        token: value
      })
      .catch(err=> {
        console.log(err)
      })
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
        <Button
          onPress={ ()=> navigate('Register') }
          title = "Register"
        />
        <Button
          onPress={ ()=> navigate('Home') }
          title = "Stranger"
        />
        <Text>ini Status : {this.statusLogin()}</Text>
        <Text>ini Token : {this.state.token}</Text>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    stateLoginUser: state.userReducer
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (payload) => dispatch(loginThunk(payload)),
    daftarThunk: (payload) => dispatch(listThunk(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
