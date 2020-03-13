import { addSorter, replaceSorter } from '../../../state/actions/sorters'

const numSort = (a, b, key, fase) => fase === 1 ? a[key] - b[key] : b[key] - a[key];
const stringSort = (a, b, key, fase) => fase === 1 ? a[key].localeCompare(b[key]) : b[key].localeCompare(a[key]);
const boolSort = (a, b, key, fase) => fase === 1 ? Number(a[key]) - Number(b[key]) : Number(b[key]) - Number(a[key]);

const severalSorts = [
  'name', 'email', 'nickName', 'status'
]

export default ({sortKey, shiftKey, activeSorters, dispatch}) => {
  if (shiftKey) {
    console.log(activeSorters)
    if (activeSorters.length === 0) {
      dispatch(replaceSorter(sortKey))
    } else if (activeSorters.every(el => severalSorts.includes(el)) && severalSorts.includes(sortKey)) {
        dispatch(addSorter(sortKey))
    } else {
      dispatch(replaceSorter(sortKey))
    }
  } else {
    dispatch(replaceSorter(sortKey))
  }
}

const sortFunctions = {
  name: stringSort,
  email: stringSort,
  nickName: stringSort,
  age: numSort,
  status: stringSort,
  married: boolSort,
  exam: stringSort
}

export const sortContent = ({contentArray, activeSorters, sortSettings}) => {
  if (activeSorters.length === 0) { 
    return contentArray
  } else if (activeSorters.length === 1) {
    const sortKey = activeSorters[0];
    const sortFunction = sortFunctions[sortKey];
    return [...contentArray].sort((a, b) => sortFunction(a, b, sortKey, sortSettings[sortKey].fase))
  } else {
    return [...contentArray].sort((a, b) => {
      let n = 0;
      let ans, key, fase
      while (n < activeSorters.length) {
        key = activeSorters[n];
        fase = sortSettings[key].fase
        ans = ans || stringSort(a, b, key, fase);
        n ++
      }
    })
  }
}

