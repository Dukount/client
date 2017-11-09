import axios from 'axios'


export const getList = (payload) => {
  return {
    type: 'FETCH_SAVED_LIST',
    payload
  }
}

export const getPostedData = (payload) => {
  return {
    type: 'FETCH_POSTED_DATA',
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

export const post_data_to_database = (payload) => {
  return (dispatch, getState) => {
    var url = `http://35.199.117.172:3000/`
    axios.post(url, {
      salary: payload.salary,
      foodCostTotal: payload.foodCostTotal,
      transportationTotal: payload.transportationTotal,
      salaryLeft: payload.salaryLeft,
      salaryToSave: payload.salaryToSave
    },{
      headers: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTAxMTQ5YWI2ZWQ4ZTJkNGE2ZGUwNDEiLCJuYW1lIjoiR2FuYW5nIFdhaHl1IFdpY2Frc29ubyIsInVzZXJuYW1lIjoiZ2FuYW5nIiwicGFzc3dvcmQiOiJnYW5hbmciLCJpYXQiOjE1MTAxNTIxMDJ9.JvbM3FTIpoztmMrNeKLzV3SQLO35E2s5aa9IdOBl408'
      }
    })
    .then(resp => {
      dispatch(getPostedData(resp.data))
    })
    .catch(err => {
      console.log(err);
    })
  }
}
