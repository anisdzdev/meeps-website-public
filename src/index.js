import React from 'react';
import ReactDOM from 'react-dom';
import "./assets/scss/main.scss";
import Index from "./views/Index";
import { Config } from "./utils/config"
import { DAppProvider } from "@usedapp/core";

ReactDOM.render(
    <React.StrictMode>
      {/*<DAppProvider config={Config.DAppConfig}>*/}
          <Index/>
      {/*</DAppProvider>*/}
    </React.StrictMode>,
  document.getElementById('root')
);

