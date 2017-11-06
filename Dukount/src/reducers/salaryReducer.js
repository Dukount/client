const defaultState = {
  salary: null,
}

const SalaryReducer = (state=defaultState, action) => {
  switch (action.type) {
    case 'POST_SALARY':
      return {...state, salary: action.payload}
    default:
      return state
  }
}

export default SalaryReducer
