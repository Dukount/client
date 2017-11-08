const defaultState = {
  list: null,
}

const listReducer = (state=defaultState, action) => {
  switch (action.type) {
    case 'FETCH_SAVED_LIST':
      return {...state, list: action.payload}
    default:
      return state
  }
}

export default listReducer
