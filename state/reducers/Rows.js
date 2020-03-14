const initialState = {
  deletedRows: [],
  selectedRows: [],
}

export default (state = initialState, action) => {
  let newDeletedRows, newSelectedRows;
  switch (action.type) {
    case "DISABLE_ROWS":
      newDeletedRows = [...state.selectedRows];
      newSelectedRows = [];
      return {
        deletedRows: newDeletedRows,
        selectedRows: newSelectedRows
      }

    case "SELECT_ROW":
      newSelectedRows = [...state.selectedRows];
      const indexOfindex = newSelectedRows.indexOf(action.payload)
      if (indexOfindex < 0) {
        newSelectedRows.push(action.payload)
      } else {
        newSelectedRows.splice(indexOfindex, 1)
      }
      return {
        ...state,
        selectedRows: newSelectedRows
      }
  }
  return state
}