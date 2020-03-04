import React from 'react';
import { connect } from "react-redux"
import DataTable from '../components/table'
import dataCreator from '../data/fakerData';

const Index = ({count, users, dispatch}) => {
  console.log(users)
  return (
    <div>
      {count}
      <button onClick={() => dispatch({type: "ADD"})}>add</button>
      <DataTable users={users}/>
    </div>
  )
}

Index.getInitialProps = async ({store}) => {
  const { count } = store;
  const data = await dataCreator();
  return {count: count, users: data}
}

export default connect(state => state)(Index);
