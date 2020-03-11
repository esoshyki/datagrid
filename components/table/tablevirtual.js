import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { FixedSizeList as List } from 'react-window';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { Cell, DateCell, BoolCell } from './cells';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Filter from './filter';
import Sorter from './sort';

const DataTable = ({users}) => {

  const [ usersData, setUsersData ] = useState([...users])
  const [ virtualization, setVirtualization ] = useState(true)
  const [ findValue, setFindValue ] = useState('');

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

  const [renderedData, setRenderedData] = useState(users)

  const sortHandler = (sortKey) => {
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
    const sortedData = newSortSettings.fase === 0 ? [...users] : Sorter({array: renderedData, sortSettings: newSortSettings})
    setSortSettings(newSortSettings)
    setRenderedData(sortedData)

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

  const handleInput = ({target}) => {
    const {value} = target;
    const filltredArray = Filter({sortedData: renderedData, findValue: value})
    setFindValue(value)
    setRenderedData(filltredArray)
  }

  const TableInfo = () => {
    return (
      <div className='table-info'>
        <Typography align="left" variant="subtitle1" >
          Virtualization is {virtualization ? "on" : "off"}
        </Typography>
          <TextField id="standard-basic" label="filter" onChange={handleInput} defaultValue={findValue}/>
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
    const sortedData = sortSettings.column ? [...users].sort(
      (a,b) => {
        switch(sortSettings.column) {
          case 'age':
            switch (sortSettings.fase) {
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
      }) : [...users];
    return (
      <div key={'row' + index} style={style} className='row'>
        {cols.map((colData) => {
          const rowData = renderedData[index];
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

  return (
    <div>
      <Menu />
      <TableInfo />
      <div className='main-table'>
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
                {sortSettings.column === column.dataKey ? sortSettings.icon : null}
              </div>
            )
          })}
        </div>

        <div className='table-body'>
          <List
            height={virtualization ? 1000 : users.length * 40}
            width={2100}
            itemSize={40}
            itemCount={usersData.length}
            className="list-container"
            style={{
              top: '20px'
            }}
            >
            {Row}
          </List>
        </div>
      </div>
    </div>
  )
}
export default DataTable;