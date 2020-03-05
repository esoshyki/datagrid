import React from 'react';
import { connect } from "react-redux"
import DataTable from '../components/table'
import personsData from '../data/data.json';

const Index = ({count, users, dispatch}) => {

  return users ? (
    <div>
      {count}
      <button onClick={() => dispatch({type: "ADD"})}>add</button>
      <DataTable users={users}/>
    </div>
  ) : <div>Loading...</div>
}

Index.getInitialProps = async ({store}) => {
  const { count } = store;
  return {count: count, users: personsData}
}

export default connect(state => state)(Index);
