export const changeGlobalFilter = value => dispatch => {
  dispatch({
    type: "CHANGE_GLOBAL_FILTER",
    payload: value
  })
}

export const changeEnumFilter = value => dispatch => {
  dispatch ({
    type: "CHANGE_ENUM_FILTER",
    payload: value
  })
}

export const changeBoolFilter = value => dispatch => {
  dispatch ({
    type: "CHANGE_BOOL_FILTER",
    payload: value
  })
}