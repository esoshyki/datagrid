import { DISABLE_ROWS, SELECT_ROW } from '../../../state/actions/rows';

export default ({contentArray, deletedRows}) => {
  if (deletedRows.length > 0 ) {
    return [...contentArray].filter(( element ) => {
      const index = element.id;
      return deletedRows.indexOf(index.toString()) < 0;
    }) 
  } else {
    return contentArray
  }
}

export const changeRowsVisibility = ({dispatch}) => {
  dispatch(DISABLE_ROWS())
}

export const changeRowsSelection = ({rowIndex, dispatch}) => {
  dispatch(SELECT_ROW(rowIndex))
}