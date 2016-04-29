import React from 'react';
import ReactDOM from 'react-dom';
import { AuthExample } from './index';

//Redux
import {DevTools, store} from './redux-setup.js';
import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider store={store}>
    <div>
      <AuthExample />
      <DevTools />
    </div>
  </Provider>
  , document.getElementById('root')
);
