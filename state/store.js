import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import SortersReducer from './reducers/Sorters'
import thunkMiddleware from 'redux-thunk'

const reducers = combineReducers({
  sorters: SortersReducer
})

export const initialStore = (initialState = {}) => {
  return createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  )
}
