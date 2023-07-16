import React from "react";
import ReactDOM from "react-dom/client";
import {
  ConfigProvider,
  AdaptivityProvider,
  AppRoot,
  WebviewType,
} from "@vkontakte/vkui";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkers/serviceWorkerRegistration";
import { Provider } from "react-redux";
import { store } from "./store";
import "@vkontakte/vkui/dist/vkui.css";
import "./styles/index.scss";

import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ConfigProvider webviewType={WebviewType.INTERNAL}>
    <AdaptivityProvider>
      <AppRoot>
        <Provider store={store}>
          <Router>
            <App />
          </Router>
        </Provider>
      </AppRoot>
    </AdaptivityProvider>
  </ConfigProvider>
);


// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
