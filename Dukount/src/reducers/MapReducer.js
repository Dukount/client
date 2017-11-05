const defaultState = {
  latitudeFrom: null,
  longitudeFrom: null,
  latitudeTo: null,
  longitudeTo: null,
  addressFrom: null,
  addressTo: null,
  suggestions: [],
  uberSuggestions: [],
  labelIndex: null,
  trafiFare: null,
  uberFare: null,
  uberType: null,
  uberDuration: null
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
      console.log('ini suggestions di reducer ', action.suggestions)
      return {...state, suggestions: action.suggestions}
    case 'POST_UBER_SUGGESTIONS':
      return {...state, uberSuggestions: action.uberSuggestions}
    case 'POST_LABEL_INDEX':
      return {...state, labelIndex: action.payload.index}
    case 'POST_TRAFI_FARE':
      return {...state, trafiFare: action.payload}
    case 'POST_UBER_FARE':
      return {...state, uberFare: action.payload}
    case 'POST_UBER_TYPE':
      return {...state, uberType: action.payload}
    case 'POST_UBER_DURATION':
      return {...state, uberDuration: action.payload}
    default:
      return state
  }
}

export default MapReducer
