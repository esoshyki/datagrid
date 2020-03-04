import React from "react";
import {createStore} from "redux";
import {Provider} from "react-redux";
import App from "next/app";
import withRedux from "next-redux-wrapper";

const initialState = {
  count: 0
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case('ADD'):
      return {...state, count: state.count + 1}
  }
  return state
}

const makeStore = (initialState, options) => {
  return createStore(reducer, initialState);
};

class MyApp extends App {
  static async getInitialProps({Component, ctx}) {

      const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

      return {pageProps};
  }

  render() {
      const {Component, pageProps, store} = this.props;
      return (
          <Provider store={store}>
              <Component {...pageProps} />
          </Provider>
      );
  }
}

export default withRedux(makeStore)(MyApp);