const defaultState = {
  salary: null,
  foodCostPackage: null
}

const SalaryReducer = (state=defaultState, action) => {
  switch (action.type) {
    case 'POST_SALARY':
      return {...state, salary: action.payload}
    case 'FETCH_FOOD_COST_PACKAGE':
      return {...state, foodCostPackage: action.payload}
    default:
      return state
  }
}

export default SalaryReducer
