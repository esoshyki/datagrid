import React from 'react';
import { connect } from "react-redux"
import DataTable from '../components/tablevirtual'
import personsData from '../data/data.json';
import Head from 'next/head';
import '../style/style.sass'

const Index = ({count, users, dispatch}) => {

  return users ? (
    <div>
      <Head>
      <meta 
        name="viewport"
        content="initial-scale=1.0, width=device-width"
        key="viewport"/>
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      </Head>
      <div>
      <DataTable users={users}/>
      </div>
    </div>
  ) : <div>Loading...</div>
}

Index.getInitialProps = async ({store}) => {
  const { count } = store;
  return {count: count, users: personsData}
}

export default connect(state => state)(Index);
