const defaultState = {
  latitudeFrom: null,
  longitudeFrom: null,
  latitudeTo: null,
  longitudeTo: null,
  addressFrom: null,
  addressTo: null,
  suggestions: []
}

const MapReducer = (state=defaultState, action) => {
  switch (action.type) {
    case 'POST_COORDINATE_FROM':
      return {...state, latitudeFrom: action.payload.latitudeFrom, longitudeFrom: action.payload.longitudeFrom}
    case 'POST_ADDRESS_FROM':
      return {...state, addressFrom: action.addressFrom}
    case 'POST_COORDINATE_TO':
      return {...state, latitudeTo: action.payload.latitudeTo, longitudeTo: action.payload.longitudeTo}
    case 'POST_ADDRESS_TO':
      return {...state, addressTo: action.addressTo}
    case 'POST_SUGGESTIONS':
      return {...state, suggestions: action.suggestions}
    default:
      return state
  }
}

export default MapReducer
