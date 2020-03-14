import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import SortersReducer from './reducers/Sorters'
import FilterReducer from './reducers/Filters'
import thunkMiddleware from 'redux-thunk'
import ColumnReducer from './reducers/Columns';
import RowsReducer from './reducers/Rows';

const reducers = combineReducers({
  sorters: SortersReducer,
  filters: FilterReducer,
  columns: ColumnReducer,
  hiddenRows: RowsReducer
})

export const initialStore = (initialState = {}) => {
  return createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  )
}
