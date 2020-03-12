import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';

export const Cell = ( {innerInfo, rowId, colId}) => {
  return (
    <div className={colId === 1? 'cell first-cell' : 'cell' } key={'cell' + rowId + colId}>
      {innerInfo}
    </div>
  )
}

export const BoolCell = ( {innerInfo, rowId, colId}) => {
  return (
    <div className={colId === 1 ? 'cell first-cell' : 'cell' }key={'cell' + rowId + colId}>
      {innerInfo ? <CheckIcon /> : <ClearIcon />}
    </div>
  )
}

export const DateCell = ( {innerInfo, rowId, colId}) => {
  return (
    <div className={colId === 1 ? 'cell first-cell' : 'cell' } key={'cell' + rowId + colId}>
      {new Date(innerInfo).toDateString()}
    </div>
  )
}