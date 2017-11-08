import axios from 'axios'
import {
  AsyncStorage
} from 'react-native';
export const loginAction = (payload) => {
  return {
    type: 'USER_LOGIN',
    payload
  }
}

export const registerAction = (payload) => {
  return {
    type: 'USER_REGISTER',
    payload
  }
}

export const loginThunk = (payload) => {
  return (dispatch, getState) => {
    var url = `http://35.199.117.172:3000/users/login`
    axios.post(url, {
      username: payload.username,
      password: payload.password
    })
    .then(({data}) => {
      var token = JSON.stringify(data.token)
      var info = JSON.stringify(data.resp)
      console.log(data)
      AsyncStorage.setItem('token', token)
      AsyncStorage.setItem('user', info)
      dispatch(loginAction(data))
    })
    .catch(err => {
      console.log(error);
    })
  }
}

export const registerThunk = (payload) => {
  return (dispatch, getState) => {
    var url = `http://35.199.117.172:3000/users/register`
    axios.post(url, {
      name: payload.name,
      username: payload.username,
      password: payload.password,
      email: payload.email,
      telp: payload.telp
    })
    .then(({data}) => {
      console.log(data);
      var say = `selamat datang ${data.nama}`
      dispatch(registerAction(say))
    })
    .catch(err => {
      console.log(error);
    })
  }
}
