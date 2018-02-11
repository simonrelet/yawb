import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { create as createJss } from 'jss';
import { JssProvider } from 'react-jss';
import jssPreset from 'jss-preset-default';
import reducers from './core/reducers';
import storage from './core/storage';
import ThemeProvider from './components/ThemeProvider';
import App from './components/App';
import themes from './themes';
import initializeI18n from './initializeI18n';
import registerServiceWorker from './registerServiceWorker';

// Expose the verison of the application in a global variable to ease debugging.
global.APP_VERSION = process.env.REACT_APP_VERSION;

initializeI18n();

const jss = createJss(jssPreset());
const store = createStore(reducers, storage.load());

store.subscribe(() => {
  // Save the applicaiton state on each update.
  storage.save(store.getState());
});

ReactDOM.render(
  <Provider store={store}>
    <JssProvider jss={jss}>
      <ThemeProvider themes={themes}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </JssProvider>
  </Provider>,
  document.getElementById('root'),
);

// To allow the service worker to notify the app on background updates.
registerServiceWorker(store);
