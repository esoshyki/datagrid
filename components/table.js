import React from 'react';
import MaterialTable, { Column } from 'material-table';

const DataTable = ({users}) => {

  const [state, setState ] = React.useState({
    columns: [
      { title:  'Name', field: 'name'},
      { title:  'Email', field: 'email'},
      { title:  'nickName', field: 'nickName'},
      { title:  'age', field: 'age'},
    ],
    data: users,
    selectedRow: null
  })
  return users ? (
    <MaterialTable
      title="Users"
      columns={state.columns}
      data={state.data}
      options={{
        rowStyle: {
          "&:hover" : {backgroundColor: 'black'}
        },
        // pageSize: users.length,
        exportButton: true,
        exportFileName: 'users'
      }}
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
          onRowClick: (e) => {
            console.log(e)
          }
      }}
      onRowClick={(event, row) => {
        console.log(event)
        console.log(row)
      }}

       />
    
  ) : <div>Loading</div>
}

export default DataTable;