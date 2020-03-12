export const boolFilter = ({sortedData, boolFilterData}) => {
  return boolFilterData !== 'not' ? 
  sortedData.filter(element => element.married === boolFilterData)
  : sortedData
}

export const enumFilter = ({sortedData, enumFilterData}) => {
  console.log(enumFilterData)
  return enumFilterData.length > 0 ? 
  sortedData.filter(element => enumFilterData.includes(element.status))
   : sortedData
}

const Filter = ({sortedData, findValue}) => {
  const newArray = sortedData.filter((element, idx) => {
    element.exam = new Date(element.exam).toDateString()
    return Object.values(element)
          .some(value => value.toString().toLowerCase().includes(findValue.toString().toLowerCase()))
  })
  return newArray
}

export default Filter