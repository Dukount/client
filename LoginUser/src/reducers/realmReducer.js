const defaultState = {
  floatedDataState: []
}

const realm = (state=defaultState, action) => {
  switch (action.type) {
    case 'REALM':
      return {...state, floatedDataState: action.payload}
    default:
      return state

  }
}
export default realm
