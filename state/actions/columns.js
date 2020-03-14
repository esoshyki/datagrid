export const changeVisibility = value => dispatch => {
  dispatch({
    type: "CHANGE_VISIBILITY",
    payload: value
  })
}