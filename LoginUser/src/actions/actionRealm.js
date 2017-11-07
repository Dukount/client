import axios from 'axios'

export const realmAction = (payload) => {
  return {
    type: 'REALM',
    payload
  }
}

export const realmThunk = () => {
  return (dispatch, getState) => {
    var url = `https://jsonplaceholder.typicode.com/photos`
    axios.get(url)
    .then(({data}) => {
      dispatch(realmAction(data))
    })
    .catch(err => {
      console.log(error);
    })
  }
}
