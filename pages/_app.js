import React from "react";
import {Provider} from "react-redux";
import App from "next/app";
import withRedux from "next-redux-wrapper";
import { initialStore } from '../state/store'

class MyApp extends App {

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

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

export default withRedux(initialStore)(MyApp);