import React from 'react';
import { connect } from "react-redux"
import DataTable from '../components/table/tablevirtual'
import personsData from '../data/data.json';
import Head from 'next/head';
import '../style/style.sass'

const Index = () => {
  const users = personsData;
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

export default connect()(Index);
