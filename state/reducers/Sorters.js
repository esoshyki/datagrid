const numSort = (a, b, key, fase) => fase === 1 ? a[key] - b[key] : b[key] - a[key];
const stringSort = (a, b, key, fase) => fase === 1 ? a[key].localeCompare(b[key]) : b[key].localeCompare(a[key]);
const boolSort = (a, b, key, fase) => fase === 1 ? Number(a[key]) - Number(b[key]) : Number(b[key]) - Number(a[key]);
const dateSort = (a, b, key, fase) => fase === 1 ? parseInt(a) < parseInt(b) : parseInt(b) < parseInt(a);

const sortSettings = {
  name : {
    fase: 0,
  },
  email : {
    fase: 0,
  },
  nickName : {
    fase: 0,
  },
  age : {
    fase: 0,
  },
  age : {
    fase: 0,
  },
  married: {
    fase: 0,
  },
  exam: {
    fase: 0,
  }
}

const activeSorters = [];

const initialState = {
  sortSettings, activeSorters
}

export default (state = initialState, action) => {
  const key = action.payload;
  let newSortSettings;
  let newActiveSorters;
  switch(action.type) {
    case('ADD_SORTER'):
      newSortSettings = {
        ...state.sortSettings,
        [key]: (state.sortSettings[key] + 1) % 3
      }
      newActiveSorters = [...state.activeSorters];
      if (!newActiveSorters.includes(action.payload)) {
        newActiveSorters.push(action.payload);
      }
      return {
        sortSettings: newSortSettings,
        activeSorters: newActiveSorters
      }
    case('REPLACE_SORTER'):
      newSortSettings = {
        ...initialState.sortSettings,
        [key]: (state.sortSettings[key] + 1) % 3
      }
      newActiveSorters = [key]
      return {
        sortSettings: newSortSettings,
        activeSorters: newActiveSorters
      }
  }
  return state
}