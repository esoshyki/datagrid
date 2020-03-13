const filters = {
  global: '',
  enum: [],
  bool: ''
}



export default (state = filters, action) => {
  switch(action.type) {
    case ("CHANGE_GLOBAL_FILTER"):
      return {
        ...state, global: action.payload
      }
    case ("CHANGE_ENUM_FILTER"):
      return {
        ...state, enum: action.payload
      }
    case ("CHANGE_BOOL_FILTER"):
      return {
        ...state, bool: action.payload
      }
  }
  return state
}

