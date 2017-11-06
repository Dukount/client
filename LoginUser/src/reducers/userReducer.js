const defaultState = {
  username: [],
  password : []
}

const user = (state=defaultState, action) => {
  switch (action.type) {
    case 'USER':
      return {...state, username: action.payload.username, password: action.payload.password}
    default:
      return state

  }
}

export default user
