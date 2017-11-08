import axios from 'axios'


export const getList = (payload) => {
  return {
    type: 'FETCH_SAVED_LIST',
    payload
  }
}


export const listThunk = (payload) => {
  return (dispatch, getState) => {
    var url = `http://35.199.117.172:3000/`
    axios.get(url, {
      headers: {
        token: payload
      }
    })
    .then(({data}) => {
      console.log('ini di listThunk ', data)
      dispatch(getList(data))
    })
    .catch(err => {
      console.log(error);
    })
  }
}
