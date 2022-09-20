import "../styles/globals.css";
import {SessionProvider} from "next-auth/react";
import {store} from "../src/core/store";
import {Provider} from "react-redux";
import './onlytrleehietrungg/style.css'

function MyApp({Component, pageProps, session}) {
  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </Provider>
  );
}

export default MyApp;
