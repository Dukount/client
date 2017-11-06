const defaultState = {
  breakfastResult: [],
  lunchResult : [],
  dinnerResult: [],
  breakfastResultHome: [],
  lunchResultHome : [],
  dinnerResultHome: [],
  resultFinal: [],
  workCalendar: [],
  foodCost: null
}

const namaFunction = (ganang) => {
  let data = ganang
  let priceSum = 0
  let result = []
  // console.log('ini data', data)
  if(data) {
    data.map(harga => {
      priceSum += harga.restaurant.average_cost_for_two / 2
    })
    result.push(priceSum / data.length-10)
  }
  return result
}

const foodReducer = (state=defaultState, action) => {
  if (action.type === 'BREAKFAST_PRICE') {
    var result = namaFunction(action.payload)
    return {...state, breakfastResult: result}
  } else if (action.type === 'LUNCH_PRICE') {
    var result = namaFunction(action.payload)
    return {...state, lunchResult: result}
  } else if (action.type === 'DINNER_PRICE') {
    var result = namaFunction(action.payload)
    return {...state, dinnerResult: result}
  } else if (action.type === 'BREAKFAST_PRICE_HOME') {
    var result = namaFunction(action.payload)
    return {...state, breakfastResultHome: result}
  } else if (action.type === 'LUNCH_PRICE_HOME') {
    var result = namaFunction(action.payload)
    return {...state, lunchResultHome: result}
  } else if (action.type === 'DINNER_PRICE_HOME') {
    var result = namaFunction(action.payload)
    return {...state, dinnerResultHome: result}
  } else if (action.type === 'RESULT_FOOD_PRICE_FINAL') {
    var result = namaFunction(action.payload)
    return {...state, resultFinal: action.payload}
  } else if (action.type === 'DATE_CLICK') {
    return {...state, workCalendar: action.payload}
  } else if (action.type === 'POST_FOOD_COST') {
    return {...state, foodCost: action.payload}
  }
  return state
}

export default foodReducer
