import React from 'react';

const DataTable = ({users}) => {
  return users ? (
    <div>
      <table>
      <tr>
        <th>Имя</th>
        <th>Почта</th>
        <th>Ник</th>
        <th>Возвраст</th>
      </tr>
      {users.map((element, index) => {
          const { name, email, nickName, age } = element
          return (
            <tr key={index}>
              <td>{name}</td>
              <td>{email}</td>
              <td>{nickName}</td>
              <td>{age}</td>
            </tr>
          )
      })}
      </table>
    </div>
  ) : <div>Loading</div>
}

export default DataTable;