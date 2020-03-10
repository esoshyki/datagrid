import React, { useState, useEffect } from 'react';
import { FixedSizeList as List } from 'react-window';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';

const DataTable = ({users}) => {
  const [ columns, setColumns ] = useState([
    'Name', 'Email', 'Nickname', 'Age', 'Status', 'Married', 'Exam date'
  ])
  const [selectedColumn, setSelectedColumn] = useState([]);

  const selectColumn = ({target}) => {
    const newSelectedColums = selectedColumn.concat([target.innerHTML])
    console.log(newSelectedColums)
    setSelectedColumn(newSelectedColums)
  }

  const Row = ( { index, style }) => (
    <div style={style} className={index % 2 === 0 ? 'row odd' : 'row even'}>
      {columns.includes('Name') ?
        <div className={'cell column' + columns.indexOf('Name')}>
          {users[index].name} 
        </div> 
      : null}

      {columns.includes('Email') ?
        <div className={'cell column' + columns.indexOf('Email')}>
          {users[index].email} 
        </div> 
      : null}

      {columns.includes('Nickname') ?
        <div className={'cell column' + columns.indexOf('Nickname')}>
          {users[index].nickName} 
        </div> 
      : null}

      {columns.includes('Age') ?
        <div className={'cell column' + columns.indexOf('Age')}>
          {users[index].age} 
        </div> 
      : null}

      {columns.includes('Status') ?
        <div className={'cell column' + columns.indexOf('Status')}>
          {users[index].status} 
        </div> 
      : null}

      {columns.includes('Married') ?
        <div className={'cell column' + columns.indexOf('Married')}>
          { Boolean(users[index].married)? <CheckIcon /> : <ClearIcon /> } 
        </div> 
      : null}

      {columns.includes('Exam date') ?
        <div className={'cell column' + columns.indexOf('Exam date')}>
          { new Date(users[index].exam).toLocaleDateString()} 
        </div> 
      : null}
    </div>
  )

  const Shadow = ({left}) => {
    return (
      <div style={{
        position: 'fixed',
        width: '300px',
        zIndex: '10',
        opacity: '0.4',
        background: 'grey',
        height: '100vh',
        left: `${left}px`
      }}></div>
    )
  }

  return (
    <div className='main-table'>
      {selectedColumn.map((el) => {
        const left = columns.indexOf(el) * 300
        return (
          <Shadow left={left}/>
        )
      })}

      <div className='table-header'>
        {columns.map((column, idx) => {
          return (
            <div className={'cell column'+idx} onClick={selectColumn}>{column}</div>
          )
        })}
      </div>

      <div className='table-body'>
        <List
          height={1000}
          width={2100}
          itemSize={40}
          itemCount={users.length}
          className="list-container"
          style={{
            top: '20px'
          }}
          >
          {Row}
        </List>
      </div>
    </div>
  )
}
export default DataTable;