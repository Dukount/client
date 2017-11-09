const defaultState = {
  list: null,
  postedData: null
}

const listReducer = (state=defaultState, action) => {
  switch (action.type) {
    case 'FETCH_SAVED_LIST':
      return {...state, list: action.payload}
    case 'FETCH_POSTED_DATA':
      return {...state, postedData: action.payload}
    default:
      return state
  }
}

export default listReducer
