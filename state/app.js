const initialState = {
  count: 0
}

export default (state = initialState, action) => {
  switch(action.type) {
    case('ADD'):
      return {...state, count: state.count + 1}
  }
  return state
}
