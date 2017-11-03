const defaultState = {
  breakfastResult: [],
  lunchResult : [],
  dinnerResult: [],
  breakfastResultHome: [],
  lunchResultHome : [],
  dinnerResultHome: []
}

const foodReducer = (state=defaultState, action) => {
  let data = action.payload
  let priceSum = 0
  let result = []
  if(data) {
    console.log('ini----0----', data)
    data.map(price => {
      priceSum += price.restaurant.average_cost_for_two / 2
    })
    result.push(priceSum / data.length-10)
  }
  if (action.type === 'BREAKFAST_PRICE') {
    return {...state, breakfastResult: result}
  } else if (action.type === 'LUNCH_PRICE') {
    return {...state, lunchResult: result}
  } else if (action.type === 'DINNER_PRICE') {
    return {...state, dinnerResult: result}
  } else if (action.type === 'BREAKFAST_PRICE_HOME') {
    return {...state, breakfastResultHome: result}
  } else if (action.type === 'LUNCH_PRICE_HOME') {
    return {...state, lunchResultHome: result}
  } else if (action.type === 'DINNER_PRICE_HOME') {
    return {...state, dinnerResultHome: result}
  }
  return state
}

export default foodReducer
