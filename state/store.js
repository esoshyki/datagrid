import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import SortersReducer from './reducers/Sorters'
import FilterReducer from './reducers/Filters'
import thunkMiddleware from 'redux-thunk'
import ColumnReducer from './reducers/Columns';
import RowsReducer from './reducers/Rows';
import { loadState, saveState } from './localStorage';

const reducers = combineReducers({
  sorters: SortersReducer,
  filters: FilterReducer,
  columns: ColumnReducer,
  hiddenRows: RowsReducer
})

export const initialStore = () => {
  
  const persistedState = loadState()

  const store = createStore(
    reducers,
    persistedState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  )

  store.subscribe(() => {
    saveState({
      sorters: store.getState().sorters,
      filtres: store.getState.filters,
      columns: store.getState().columns,
      hiddenRows: store.getState().hiddenRows
    });
  });

  return store
}
