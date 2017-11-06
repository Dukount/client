export const userAction = (payload) => {
  return {
    type: 'USER',
    payload
  }
}


export const postGetUser = (payload) => {
  return (dispatch, getState) => {
    var user = {
      username: ganang,
      password: qwerty1234
    }
    dispatch(getBreakfastPrice(user))
  }
}
