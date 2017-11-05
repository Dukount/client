import axios from 'axios'

export const post_coordinate_from = (payload) => {
  return {
    type: 'POST_COORDINATE_FROM',
    payload
  }
}

export const post_address_from = (addressFrom) => {
  return {
    type: 'POST_ADDRESS_FROM',
    addressFrom
  }
}

export const post_coordinate_to = (payload) => {
  return {
    type: 'POST_COORDINATE_TO',
    payload
  }
}

export const post_address_to = (addressTo) => {
  return {
    type: 'POST_ADDRESS_TO',
    addressTo
  }
}

export const post_suggestions = (suggestions) => {
  return {
    type: 'POST_SUGGESTIONS',
    suggestions
  }
}

export const post_uber_suggestion = (uberSuggestions) => {
  return {
    type: 'POST_UBER_SUGGESTIONS',
    uberSuggestions
  }
}

export const fetch_address_from = (payload) => {
  return(dispatch, getState) => {
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${payload.latitudeFrom},${payload.longitudeFrom}&key=AIzaSyDTZ5oouZfOtVZ9yjOmoHYrhceyCcpmQsc`)
      .then(response => {
        // console.log('ini response fetch_address_from', response.data.results[0].address_components)
        // console.log('ini response jalan ', response.data.results[0].address_components[1].long_name)
        // console.log('ini response kecamatan', response.data.results[0].address_components[4].long_name)
        let markerAddress = [response.data.results[0].address_components[1].long_name,
        response.data.results[0].address_components[2].long_name,
        response.data.results[0].address_components[3].long_name,
        response.data.results[0].address_components[4].long_name,
        response.data.results[0].address_components[5].long_name]
        dispatch(post_address_from(markerAddress))
      })
      .catch(err => console.log(err))
  }
}

export const fetch_address_to = (payload) => {
  return(dispatch, getState) => {
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${payload.latitudeTo},${payload.longitudeTo}&key=AIzaSyDTZ5oouZfOtVZ9yjOmoHYrhceyCcpmQsc`)
      .then(response => {
        // console.log('ini response fetch_address_to', response.data.results[0].address_components)
        // console.log('ini response jalan ', response.data.results[0].address_components[1].long_name)
        // console.log('ini response kecamatan', response.data.results[0].address_components[4].long_name)
        let markerAddress = [response.data.results[0].address_components[1].long_name,
        response.data.results[0].address_components[2].long_name,
        response.data.results[0].address_components[3].long_name,
        response.data.results[0].address_components[4].long_name,
        response.data.results[0].address_components[5].long_name]
        dispatch(post_address_to(markerAddress))
      })
      .catch(err => console.log(err))
  }
}

export const fetch_trafi_route = (payload) => {
  return(dispatch, getState) => {
    axios.get(`http://api-ext.trafi.com/routes?start_lat=${payload.latitudeFrom}&start_lng=${payload.longitudeFrom}&end_lat=${payload.latitudeTo}&end_lng=${payload.longitudeTo}&is_arrival=false&api_key=42353ead9692f1d0c362a2eb2bd477a2`)
      .then(response => {
        console.log(response.data.Routes)
        let suggestionsArr = response.data.Routes
        dispatch(post_suggestions(suggestionsArr))
      })
      .catch(err => console.log(err))
  }
}

export const fetch_uber_fare = (payload) => {
  return (dispatch, getState) => {
    axios.get(`https://api.uber.com/v1.2/estimates/price?start_latitude=${payload.latitudeFrom}&start_longitude=${payload.longitudeFrom}&end_latitude=${payload.latitudeTo}&end_longitude=${payload.longitudeTo}`, {
      headers: {
        "Authorization": "Token E0Ct83jf8F_qaK9UdgMVwEqReMLs4HDoSfHStfrN"
      }
    })
      .then(response => {
        console.log(response.data.prices)
        let uberSuggestionsArr = response.data.prices
        dispatch(post_uber_suggestion(uberSuggestionsArr))
      })
      .catch(err => console.log(err))
  }
}
