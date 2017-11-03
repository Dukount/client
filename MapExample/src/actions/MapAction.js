import axios from 'axios'

export const post_coordinate = (payload) => {
  console.log('ini pondok indah ', payload)
  return {
    type: 'POST_COORDINATE',
    payload
  }
}

export const post_address = (address) => {
  return {
    type: 'POST_ADDRESS',
    address
  }
}

export const fetch_address = (payload) => {
  return(dispatch, getState) => {
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${payload.latitude},${payload.longitude}&key=AIzaSyDTZ5oouZfOtVZ9yjOmoHYrhceyCcpmQsc`)
      .then(response => {
        console.log('ini response ', response.data.results[0].address_components)
        // console.log('ini response jalan ', response.data.results[0].address_components[1].long_name)
        // console.log('ini response kecamatan', response.data.results[0].address_components[4].long_name)
        let markerAddress = `${response.data.results[0].address_components[1].long_name}, ${response.data.results[0].address_components[4].long_name}`
        dispatch(post_address(markerAddress))
      })
      .catch(err => console.log(err))
  }
}
