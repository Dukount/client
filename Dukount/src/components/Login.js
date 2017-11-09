import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Image,
  View,
  TextInput,
  Button,
  AsyncStorage,
  TouchableHighlight
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
    // setTimeout(()=> {
    //   this.navigateLogined()
    // }, 0.1)

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
      <View style={styles.container}>
      <View>
        <Image source={require('../assets/img/logo_small_white.png')} style={{height: 50, width: 210, marginBottom: 30}} />
      </View>
        <TextInput
          style={{height: 40, width: 260, borderWidth: 1, borderColor: 'white', textAlign: 'center', color: 'white'}}
          onChangeText={(text) => this.setStateUsername(text)}
          placeholder={'Username'}
          placeholderTextColor="white"
        />
        <TextInput
          style={{height: 40, width: 260, borderWidth: 1, borderColor: 'white', marginTop: 15, color: 'white', textAlign:'center'}}
          onChangeText={(text) => this.setState({password: text})}
          placeholder={'Password'}
          secureTextEntry={true}
          placeholderTextColor="white"
        />
        <TouchableHighlight onPress={ ()=> this.submit() } title = "Submit">
          <View style={{
          backgroundColor:'#57A8F8',
          padding: 5,
          alignItems: 'center',
          borderRadius: 3,
          width: 260,
          height: 30,
          alignSelf: 'center',
          marginTop: 20}}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>Login</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={ ()=> navigate('Register') } title = "Submit">
          <View style={{
          backgroundColor:'white',
          padding: 5,
          alignItems: 'center',
          borderRadius: 3,
          width: 260,
          height: 30,
          alignSelf: 'center',
          marginTop: 40}}>
            <Text style={{color: '#57A8F8', fontWeight: 'bold'}}>Register</Text>
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
