import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import SortersReducer from './reducers/Sorters'

const reducers = combineReducers({
  sorters: SortersReducer
})

export const initialStore = (initialState = {}) => {
  return createStore(
    reducers,
    initialState,
    composeWithDevTools()
  )
}
