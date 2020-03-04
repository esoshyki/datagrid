import React from 'react';
import dataCreator from '../data/fakerData';
import PropTypes from 'prop-types'

const DataTable = ({users}) => {
  console.log(`users = ${users}`)
  if (users) {
  return(
    <div>
      {users.map((element, index) => {
          const { name, email, nickName, age } = element
          return (
            <div key={index}>
              <p>{name}</p>
              <p>{email}</p>
              <p>{nickName}</p>
              <p>{age}</p>
            </div>
          )
      })}
    </div>
  )
} else return ''
}

export default DataTable;