import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { FixedSizeList as List } from 'react-window';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { Cell, DateCell, BoolCell } from './cells';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Filter, { boolFilter, enumFilter } from './filter';
import Sorter from './sort';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const enumValues = ['design', 'support', 'production']

const DataTable = ({users}) => {

  const classes = useStyles();

  const [ usersData, setUsersData ] = useState([...users]);
  const [ virtualization, setVirtualization ] = useState(true);
  const [ findValue, setFindValue ] = useState('');
  const [ sortedData, setSortedData] = useState([...users]);
  const [ filtredData, setFiltredData ] = useState([...users]);
  const [ boolFilterData, setBoolFilterData ] = useState(null);
  const [ enumFilterData, setEnumFilterData ] = useState([]);

  const [ columns, setColumns ] = useState([
    {id: 1, title:'Name', dataKey:'name', isVisible: true},
    {id: 2, title:'Email', dataKey:'email', isVisible: true},
    {id: 3, title:'Nickname', dataKey:'nickName', isVisible: true},
    {id: 4, title:'Age', dataKey:'age', isVisible: true},
    {id: 5, title:'Status', dataKey:'status', isVisible: true},
    {id: 6, title:'Married', dataKey:'married', isVisible: true},
    {id: 7, title:'Exam date', dataKey:'exam', isVisible: true},
  ])

  const icons = [null, <ArrowDownwardIcon />, <ArrowUpwardIcon />];

  const [sortSettings, setSortSettings] = useState({
    column: null,
    fase: 0,
    icon: null
  })

  const handleInput = async ({target}) => {
    const {value} = target;
    const filltredArray = await Filter({sortedData:  sortedData, findValue: value})
    setFindValue(value)
    setFiltredData(filltredArray)
  }

  const sortHandler = async (sortKey) => {
    let sortStatus;
    if (sortSettings.column !== sortKey) {
      sortStatus = 1
    } else {
      sortStatus = (sortSettings.fase + 1) % 3
    }
    const newSortSettings = {
      column: sortKey,
      fase: sortStatus,
      icon: icons[sortStatus]
    }
    const sortedData = await newSortSettings.fase === 0 ? [...users] : Sorter({array:  filtredData, sortSettings: newSortSettings});
    setSortSettings(newSortSettings)
    setFiltredData(sortedData)

  }

  const disableVizualization = () => {
    setVirtualization(!virtualization)
  }

  const Menu = () => {
    return (
      <div className='menu'>
        <Tooltip title='Disable virtualization'>
          <Button 
            variant="contained" 
            color={virtualization ? "primary" : "secondary"} 
            onClick={disableVizualization}>V</Button>
        </Tooltip>
      </div>
    )
  }


  const TableInfo = () => {
    return (
      <div className='table-info'>
        <Typography align="left" variant="subtitle1" >
          Virtualization is {virtualization ? "on" : "off"}
        </Typography>
      </div>
    )
  }

  const EmptyData = () => {
    return (
      <div className='no-data'>
        <Typography variant="h6">
        No data
        </Typography>
      </div>
    )
  }

  const Row = ( { index, style }) => {
    const cols = columns.filter(el => el.isVisible)
    return (
      <div key={'row' + index} style={style} className='row'>
        {cols.map((colData) => {
          const rowData =  filtredData[index];
          const innerInfo=rowData[colData.dataKey]
          const idx = colData.id
          switch(idx) {
            case 6:
              return <BoolCell innerInfo={innerInfo} rowId={index} colId={idx} />
            case 7:
              return <DateCell innerInfo={innerInfo} rowId={index} colId={idx} />
            default:
              return <Cell innerInfo={innerInfo} rowId={index} colId={idx} />
          }
        })}
      </div>
      )}

  const handleBoolFilterChange = ({target}) => {
    const newFiltredData = boolFilter({sortedData: sortedData, boolFilterData: target.value})
    setFiltredData(newFiltredData);
    setBoolFilterData(target.value);
  }    
  
  const handleEnumFilterChange = ({target}) => {
    const filterValue = target.value;
    if (filterValue === 'All') {
      setEnumFilterData([])
    } else {
      const array = [...enumFilterData]
      const index = array.indexOf(filterValue);
      if (index < 0) {
        array.push(filterValue);
      } else {
        array.splice(index, 1);
      }
      const newFiltredData = enumFilter({sortedData: sortedData, enumFilterData: array})
      setEnumFilterData(array);
      setFiltredData(newFiltredData);
    }
  }    

  const BoolFilter = () => {
    return (
      <FormControl className={classes.formControl}>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={boolFilterData}
        onChange={handleBoolFilterChange}
      >
        <MenuItem value={true}>Married</MenuItem>
        <MenuItem value={false}>Not Married</MenuItem>
        <MenuItem value={'not'}>All</MenuItem>
      </Select>
    </FormControl>
    )
  }

  const EnumFilter = () => {
    const values = ['design', 'support', 'production', 'All']
    return (
      <FormControl className={classes.formControl}>
      <Select
        labelId="enum-simple-select-label"
        id="enum-filter-select"
        value={''}
        onChange={handleEnumFilterChange}
      >
        {values.map(value => (
          <MenuItem key={value} value={value}>
            <Checkbox checked={enumFilterData.includes(value)}/>
            <ListItemText primary={value} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    )
  }

  return (
    <div>
      <Menu />
      <TableInfo />
      <div className='main-table'>
      <TextField id="filled-search" label="Filter" type="search" variant="filled" onChange={handleInput} defaultValue={findValue}/>
        <div className='table-header'>
          {columns.filter(el => el.isVisible).map((column, idx) => {
              return (
              <div className='column-header-container'>
                <Tooltip title='Sort'>
                  <div className={'header-cell column'+idx} 
                    onClick={() => sortHandler(column.dataKey)}>
                    {column.title}
                  </div>
                  </Tooltip>
                  {column.id === 6 ? <BoolFilter /> : null}
                  {column.id === 5 ? <EnumFilter /> : null}
                {sortSettings.column === column.dataKey ? sortSettings.icon : null}
              </div>
            )
          })}
        </div>
        { filtredData.length ? (
        <div className='table-body'>
          <List
            height={virtualization ? 1000 : usersData.length * 40}
            width={2100}
            itemSize={40}
            itemCount={ filtredData.length}
            className="list-container"
            style={{
              top: '20px'
            }}
            >
            {Row}
          </List>
        </div>) : <EmptyData />}
      </div>
    </div>
  )
}
export default DataTable;