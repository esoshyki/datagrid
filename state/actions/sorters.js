export const addSorter = columnKey => dispatch => { 
  dispatch ({
    type: "ADD_SORTER",
    payload: columnKey
  })
}

export const replaceSorter = (columnKey) => dispatch => {
  dispatch({
    type: "REPLACE_SORTER",
    payload: columnKey
  })
}