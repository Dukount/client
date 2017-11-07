const defaultState = {
  username: '',
  password : '',
  register: {}
}

const user = (state=defaultState, action) => {
  switch (action.type) {
    case 'USER_LOGIN':
      return {...state, username: action.payload.username, password: action.payload.password}
    case 'USER_REGISTER':
      return {...state, register: action.payload}
    default:
      return state

  }
}
export default user
