const defaultState = {
  latitude: null,
  longitude: null,
  address: null
}

const MapReducer = (state=defaultState, action) => {
  console.log('ini action.payload ', action.payload)
  switch (action.type) {
    case 'POST_COORDINATE':
      return {...state, latitude: action.payload.latitude, longitude: action.payload.longitude}
    case 'POST_ADDRESS':
      console.log('ini action post_address ', action)
      return {...state, address: action.address}
    default:
      return state
  }
}

export default MapReducer
