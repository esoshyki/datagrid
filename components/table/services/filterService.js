import { changeGlobalFilter, changeEnumFilter, changeBoolFilter } from '../../../state/actions/filters'

export const filterContent = ({contentArray, filters}) => {
  let firstStep, secondStep, thirdStep

  if (filters.global) {
    firstStep = [...contentArray].filter(row => {
      row.exam = new Date(row.exam).toDateString();
      return Object.values(row)
      .some(value => value.toString().toLowerCase().includes(filters.global.toString().toLowerCase()))
    })
  } else {
    firstStep = [...contentArray]
  };

  if (filters.enum.length > 0) {
    secondStep = firstStep.filter(row => filters.enum.includes(row.status))
  } else {
    secondStep = firstStep
  }

  const boolStates = {
    1: true,
    2: false
  }

  if (filters.bool) {
    thirdStep = secondStep.filter(row => row.married === boolStates[filters.bool])
  } else {
    thirdStep = secondStep
  }

  return thirdStep
}

export default ({inputFilter, dispatch}) => {
  const { type, value } = inputFilter;
  if (type === 'global') {
    dispatch(changeGlobalFilter(value))
  } 
  if (type === 'enum') {
    dispatch(changeEnumFilter(value))
  }
  if (type === 'bool') {
    dispatch(changeBoolFilter(value))
  }
}