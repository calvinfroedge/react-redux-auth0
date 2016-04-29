import React from 'react';
import ReactDOM from 'react-dom';
import { BaseComponent } from './index';

//Redux
import {DevTools, store} from './redux-setup.js';
import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider store={store}>
    <div>
      <BaseComponent />
      <DevTools />
    </div>
  </Provider>
  , document.getElementById('root')
);
