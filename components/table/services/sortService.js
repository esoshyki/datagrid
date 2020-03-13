import { addSorter, replaceSorter } from '../../../state/actions/sorters'

const numSort = (a, b, key, fase) => fase === 1 ? a[key] - b[key] : b[key] - a[key];
const stringSort = (a, b, key, fase) => fase === 1 ? a[key].localeCompare(b[key]) : b[key].localeCompare(a[key]);
const boolSort = (a, b, key, fase) => fase === 1 ? Number(a[key]) - Number(b[key]) : Number(b[key]) - Number(a[key]);
const dateSort = (a, b, key, fase) => fase === 1 ? parseInt(a) < parseInt(b) : parseInt(b) < parseInt(a);

export default ({sortKey, shiftKey, dispatch}) => {
  if (shiftKey) {
    dispatch(addSorter(sortKey))
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
  exam: dateSort
}

export const sortContent = ({contentArray, activeSorters, sortSettings}) => {
  if (activeSorters.length === 0) { 
    return contentArray
  }
  const sortedArray = [...contentArray].sort((a, b) => {
    let n = 0;
    let ans = undefined;
    while (n < sortFunctions.length) {
      const key = activeSorters[n]
      const fase = sortSettings[key].fase
      let currentSortFunction = sortFunctions[key];
      ans = ans || currentSortFunction(a, b, key, fase)
    }
    return ans
  });
  console.log(sortedArray.slice(0, 10))
  return sortedArray
}

