import axios from 'axios'

export const getBreakfastPrice = (payload) => {
  return {
    type: 'BREAKFAST_PRICE',
    payload
  }
}

export const getLunchPrice = (payload) => {
  return {
    type: 'LUNCH_PRICE',
    payload
  }
}

export const getDinnerPrice = (payload) => {
  return {
    type: 'DINNER_PRICE',
    payload
  }
}

export const getBreakfastPriceHome = (payload) => {
  return {
    type: 'BREAKFAST_PRICE_HOME',
    payload
  }
}

export const getLunchPriceHome = (payload) => {
  return {
    type: 'LUNCH_PRICE_HOME',
    payload
  }
}

export const getDinnerPriceHome = (payload) => {
  return {
    type: 'DINNER_PRICE_HOME',
    payload
  }
}

export const sendResultData = (payload) => {
  console.log('payload', payload)
  return {
    type: 'RESULT_FOOD_PRICE_FINAL',
    payload
  }
}

export const getBreakfast = (payload) => {
  return (dispatch, getState) => {
    axios.get(`https://developers.zomato.com/api/v2.1/search?${payload}`, {
      headers: {
        "user-key": "07830e6137694ae1fc34521455c333cd"
      }
    })
    .then(response => {
      dispatch(getBreakfastPrice(response.data.restaurants))
    })
    .catch(err => {
      throw err
    })
  }
}

export const getLunch = (payload) => {
  return (dispatch, getState) => {
    axios.get(`https://developers.zomato.com/api/v2.1/search?${payload}`, {
      headers: {
        "user-key": "07830e6137694ae1fc34521455c333cd"
      }
    })
    .then(response => {
      dispatch(getLunchPrice(response.data.restaurants))
    })
    .catch(err => {
      throw err
    })
  }
}

export const getDinner = (payload) => {
  return (dispatch, getState) => {
    axios.get(`https://developers.zomato.com/api/v2.1/search?${payload}`, {
      headers: {
        "user-key": "07830e6137694ae1fc34521455c333cd"
      }
    })
    .then(response => {
      dispatch(getDinnerPrice(response.data.restaurants))
    })
    .catch(err => {
      throw err
    })
  }
}

export const getBreakfastHome = (payload) => {
  return (dispatch, getState) => {
    axios.get(`https://developers.zomato.com/api/v2.1/search?${payload}`, {
      headers: {
        "user-key": "07830e6137694ae1fc34521455c333cd"
      }
    })
    .then(response => {
      dispatch(getBreakfastPriceHome(response.data.restaurants))
    })
    .catch(err => {
      throw err
    })
  }
}

export const getLunchHome = (payload) => {
  return (dispatch, getState) => {
    axios.get(`https://developers.zomato.com/api/v2.1/search?${payload}`, {
      headers: {
        "user-key": "07830e6137694ae1fc34521455c333cd"
      }
    })
    .then(response => {
      dispatch(getLunchPriceHome(response.data.restaurants))
    })
    .catch(err => {
      throw err
    })
  }
}

export const getDinnerHome = (payload) => {
  return (dispatch, getState) => {
    axios.get(`https://developers.zomato.com/api/v2.1/search?${payload}`, {
      headers: {
        "user-key": "07830e6137694ae1fc34521455c333cd"
      }
    })
    .then(response => {
      dispatch(getDinnerPriceHome(response.data.restaurants))
    })
    .catch(err => {
      throw err
    })
  }
}
