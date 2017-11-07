import axios from 'axios'
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
    var url = `http://`
    axios.post(url, {
      username: payload.username,
      password: payload.password
    })
    .then({data} => {
      dispatch(loginAction(data.status))
      asyncStorage.setItem(data.token)
    })
    .catch(err => {
      console.log(error);
    })
  }
}

export const registerThunk = (payload) => {
  return (dispatch, getState) => {
    var url = `http://`
    axios.post(url, {
      username: payload.username,
      password: payload.password,
      email: payload.email,
      telp: payload.telp
    })
    .then({data} => {
      asyncStorage.setItem(data.token, 'token')
    })
    .catch(err => {
      console.log(error);
    })
  }
}
