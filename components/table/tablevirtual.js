import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { FixedSizeList as List } from 'react-window';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { Cell, DateCell, BoolCell } from './cells';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';
import ColumnVisibility from './columnsVisibility';
import { connect } from "react-redux"
import sortService, { sortContent } from './services/sortService';
import filterService, { filterContent } from './services/filterService';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const DataTable = ({users, sorters, filters, columns, dispatch}) => {

  const classes = useStyles();
  
  const sortedData = sortContent({
    contentArray: users, 
    activeSorters: sorters.activeSorters, 
    sortSettings: sorters.sortSettings})

  const renderedData = filterContent({
    contentArray: sortedData,
    filters: filters
  })

  const [ virtualization, setVirtualization ] = useState(true);
  const [ filtredData, setFiltredData ] = useState([...users]);
  const [ selectedRows, setSelectedRow ] = useState([])

  const icons = [null, <ArrowDownwardIcon />, <ArrowUpwardIcon />];

  const handleInput = ({target}) => {
    const {value} = target;
    const inputFilter = {
      type: 'global',
      value: value
    }
    filterService({inputFilter, dispatch})
  }

  const sortHandler = async ({sortKey, shiftKey}) => {
    sortService({sortKey, shiftKey, activeSorters: sorters.activeSorters, dispatch})
  }

  const disableVizualization = () => {
    setVirtualization(!virtualization)
  }

  const deleteRowHandler = () => {
    const array = [...filtredData].sort((a, b) => a - b);
    let count = 0
    selectedRows.forEach(el => {
      array.splice(el - count, 1)
      count ++ 
    })
    setFiltredData(array)
    setSelectedRow([])
  }

  const RowAction = () => {
    if (selectedRows.length === 0) {
      return null 
    } else {
      return (
        <div className="actions">
          <Tooltip title="Delete selected rows">
            <Button variant="contained" onClick={deleteRowHandler}>
              <DeleteIcon />
            </Button>
          </Tooltip>
        </div>
      )
    }
  }

  const Menu = () => {
    return (
      <div className='menu'>
        <ColumnVisibility columns={columns} dispatch={dispatch}/>
        <Tooltip title='Disable virtualization'>
          <Button 
            variant="contained" 
            color={virtualization ? "primary" : "secondary"} 
            onClick={disableVizualization}>V</Button>
        </Tooltip>
        <RowAction />
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

  const handleRowClick = ({target}) => {
    const currentRow = target.classList[0] === 'row' ? target : target.parentNode
    const currentRowIndex = currentRow.id.replace("row", "");
    const arrayOfSelectedRows = [...selectedRows];
    const index = arrayOfSelectedRows.indexOf(currentRowIndex);
    if (index < 0) {
      arrayOfSelectedRows.push(currentRowIndex)
    } else {
      arrayOfSelectedRows.splice(index, 1)
    }
    setSelectedRow(arrayOfSelectedRows)
  }

  const Row = ( { index, style }) => {
    const cols = columns.filter(el => el.isVisible)
    return (
      <div key={'row' + index}
        style={style} 
        className= {selectedRows.includes(index.toString()) ? 'row selected' : 'row'}
        onClick={handleRowClick} 
        id={`row${index}`}>
        {cols.map((colData) => {
          const rowData =  renderedData[index];
          const innerInfo= rowData[colData.dataKey]
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
    const inputFilter = {
      type: 'bool',
      value: target.value
    }
    filterService({inputFilter, dispatch})
  }    
  
  const handleEnumFilterChange = ({target}) => {
    const filtersArray = [...filters.enum];
    if (filters.enum.includes(target.value)) {
      filtersArray.splice(filtersArray.indexOf(target.value), 1);
    } else {
      filtersArray.push(target.value);
    }
    const inputFilter = {
      type: 'enum',
      value: filtersArray
    }
    filterService({inputFilter, dispatch})
  }    

  const BoolFilter = () => {
    const values = {
      1: 'yes',
      2: 'no',
    }
    return (
      <FormControl className={classes.formControl}>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={filters.bool ? values[filters.bool] : ''}
        onChange={handleBoolFilterChange}
      >
        <MenuItem value={1}>Married</MenuItem>
        <MenuItem value={2}>Not Married</MenuItem>
        <MenuItem value={''}>All</MenuItem>
      </Select>
    </FormControl>
    )
  }

  const EnumFilter = () => {
    const values = ['design', 'support', 'production']
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
            <Checkbox checked={filters.enum.includes(value)}/>
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
      <TextField id="filled-search" label="Filter" type="search" variant="filled" onChange={handleInput} defaultValue={filters.global}/>
        <div className='table-header'>
          {columns.filter(el => el.isVisible).map((column, idx) => {
              return (
              <div className='column-header-container'>
                <Tooltip title='Sort'>
                  <div className={'header-cell column'+idx} 
                    onClick={(event) => {
                      event.preventDefault(); sortHandler({sortKey: column.dataKey, shiftKey: event.shiftKey})}}>
                    {column.title}
                  </div>
                  </Tooltip>
                  {column.id === 6 ? <BoolFilter /> : null}
                  {column.id === 5 ? <EnumFilter /> : null}
                {icons[sorters.sortSettings[column.dataKey].fase]}
              </div>
            )
          })}
        </div>
        { renderedData.length ? (
        <div className='table-body'>
          <List
            height={virtualization ? 1000 : renderedData.length * 40}
            width={2100}
            itemSize={40}
            itemCount={ renderedData.length}
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

function mapStateToProps(state) {
  return {
      sorters: state.sorters,
      filters: state.filters,
      columns: state.columns
  };
}

export default connect(mapStateToProps)(DataTable);