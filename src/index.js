import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider, AdaptivityProvider, AppRoot } from '@vkontakte/vkui';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { Provider } from 'react-redux';
import { store } from './store';
import './styles/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ConfigProvider>
      <AdaptivityProvider>
        <AppRoot>
          <Provider store={store}>
            <App />
          </Provider>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

