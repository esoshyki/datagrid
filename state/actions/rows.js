export const DISABLE_ROWS = () => dispatch => {
  dispatch({
    type: "DISABLE_ROWS",
  })
}

export const SELECT_ROW = index => dispatch => {
  dispatch({
    type: "SELECT_ROW",
    payload: index
  })
}