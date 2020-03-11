
export default function Sorter({array, sortSettings}) {
  const { fase, column } = sortSettings;
  if (column) {
    return [...array].sort((a, b) => {
      switch(column) {
        case 'age':
          switch (fase) {
            case 0:
              return 0
            case 1:
              return a.age - b.age
            case 2:
              return b.age - a.age
          }
        case 'date':
          switch (sortSettings.fase) {
            case 0:
              return 0
            case 1:
              return parseInt(a) < parseInt(b)
            case 2:
              return parseInt(a) > parseInt(b)
          }
        case 'married':
          switch (sortSettings.fase) {
            case 0:
              return 0
            case 1:
              return Number(a[sortSettings.column]) - Number(b[sortSettings.column])
            case 2:
              return Number(b[sortSettings.column]) - Number(a[sortSettings.column])
          }
        default:
          switch (sortSettings.fase) {
            case 0:
              return 0
            case 1:
              return a[sortSettings.column].localeCompare(b[sortSettings.column])
            case 2:
              return b[sortSettings.column].localeCompare(a[sortSettings.column])
          }
        }
      })
  } else {
    return [...array]
  }
}
