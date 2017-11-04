const defaultState = {
  workDay: [],
  homeDay : []
}

const calendar = (state=defaultState, action) => {
  switch (action.type) {
    case 'DATE_CLICK':
      return {...state, workDay: action.payload}
    default:
      return state

  }
}

export default calendar
