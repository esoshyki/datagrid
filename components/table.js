import React, { useState, useEffect } from 'react';
import MaterialTable, { Column } from 'material-table';

const DataTable = ({users}) => {

  const filtering = () => {
    console.log('filtering')
  }
  const [selectedRow, setSelectedRow ] = useState([])
  const [state, setState ] = React.useState({
    columns: [
      { title: 'Name', field: 'name', customFilterAndSearch: filtering},
      { title: 'Email', field: 'email'},
      { title: 'nickName', field: 'nickName'},
      { title: 'age', field: 'age'},
      { title: 'status', field: 'status',
        lookup: 
        { production: 'production',
        support: 'support', design: 'design' }},
      { title: 'is married', field: 'married'},
      { title: 'exam date', field: 'exam'}
    ],
    data: users,
    selectedRow: null
  })

  useEffect(() => {
    console.log(selectedRow)
  })

  return users ? (
    <MaterialTable
      title="Users"
      columns={state.columns}
      data={state.data}
      options={{
        rowStyle: rowData => ({
            backgroundColor:  (selectedRow.length > 0 && selectedRow.includes(rowData.tableData.id)) ? '#EEE' : '#FFF'
          }),
        exportButton: true,
        exportFileName: 'users',
        filtering: true,
        selection: true,
      }}
      onSelectionChange= {(rows) => setSelectedRow(rows.map(el => el.tableData.id))}
      actions={[
        {
          tooltip: 'Remove All Selected Users',
          icon: 'delete',
          onClick: (evt, data) => {
            setState(prevData => {
            const newData = [...prevData.data].filter((row, idx) => {
              const indexes = data.map(el => el.tableData.id);
              return !indexes.includes(idx)
            })
            return {...prevData, data: newData}
          });
          setSelectedRow([])
          }
        }
      ]}
      editable={{
        onRowAdd: newData => 
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setState(prevState => {
                const data = [...prevState.data];
                data.push(newData);
                return {...prevState, data}
              })
            }, 600)
          }),
          onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState(prevState => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
          onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setState(prevState => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
       />
    
  ) : <div>Loading</div>
}

export default DataTable;