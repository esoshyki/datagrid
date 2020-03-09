import React, { useState, useEffect } from 'react';
import MaterialTable, { MTableBody } from 'material-table';
import { FixedSizeList as List} from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

const DataTable = ({users}) => {

  const [selectedRow, setSelectedRow ] = useState([])
  const [state, setState ] = React.useState({
    columns: [
      { title: 'Name', field: 'name', hidden: false},
      { title: 'Email', field: 'email',  hidden: false},
      { title: 'nickName', field: 'nickName',  hidden: false, type: 'string'},
      { title: 'age', field: 'age', hidden: false, type: 'numeric'},
      { title: 'status', field: 'status',
        lookup: 
        { production: 'production',
        support: 'support', design: 'design' }, hidden: false},
      { title: 'is married', field: 'married', hidden: false, type: 'boolean'},
      { title: 'exam date', field: 'exam', hidden: false, type: 'date'}
    ],
    data: users,
    selectedRow: null
  })

  useEffect(() => {
    console.log(selectedRow)
  })

  const handleScroll = (event) => {
    console.log(event)
  }

  return users ? (
    <div onScroll={handleScroll}>
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
          columnsButton: true,
          maxBodyHeight: 400,
          paginationType: 'stepped',
          initialPage: 0,
          pageSize: 10,
          headerStyle: { position: 'sticky', top: 0 },
        }}
        localization={{
          header: {
            actions: 'Actions'
        },
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
   </div>
  ) : <div>Loading</div>
}

export default DataTable;