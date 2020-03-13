
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
  let currentFase;
  let newSortSettings;
  let newActiveSorters;

  switch(action.type) {
    case('ADD_SORTER'):
      currentFase = state.sortSettings[key].fase;
      newSortSettings = {
        ...state.sortSettings,
        [key]: {fase: (currentFase + 1) % 3}
      }
      newActiveSorters = [...state.activeSorters];
      if (!newActiveSorters.includes(key)) {
        newActiveSorters.push(key);
      } else {
        if (currentFase === 2) {
          const index = newActiveSorters.indexOf(key)
          newActiveSorters.splice(index, 1);
        }
      }
      return {
        sortSettings: newSortSettings,
        activeSorters: newActiveSorters
      }
    case('REPLACE_SORTER'):
      currentFase = state.sortSettings[key].fase;
      newSortSettings = {
        ...initialState.sortSettings,
        [key]: {fase: (state.sortSettings[key].fase + 1) % 3}
      }
      if (currentFase === 2) {
        newActiveSorters = []
      } else {
        newActiveSorters = [key]
      }
      return {
        sortSettings: newSortSettings,
        activeSorters: newActiveSorters
      }
  }
  return state
}