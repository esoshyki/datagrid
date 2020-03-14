const columns = [
  {id: 1, title:'Name', dataKey:'name', isVisible: true},
  {id: 2, title:'Email', dataKey:'email', isVisible: true},
  {id: 3, title:'Nickname', dataKey:'nickName', isVisible: true},
  {id: 4, title:'Age', dataKey:'age', isVisible: true},
  {id: 5, title:'Status', dataKey:'status', isVisible: true},
  {id: 6, title:'Married', dataKey:'married', isVisible: true},
  {id: 7, title:'Exam date', dataKey:'exam', isVisible: true},
]

export default (state = columns, action) => {
  switch (action.type) {
    case "CHANGE_VISIBILITY":
      const {index, isVisibleValue} = action.payload
      const newColumns = [...state];
      newColumns[index].isVisible = isVisibleValue;
      return newColumns
  }
  return state
}