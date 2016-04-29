import React from 'react';

//Redux DevTools
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

//Redux
import { applyMiddleware, compose, createStore, combineReducers } from 'redux';

//Reducers
import * as reducers from './reducers/index';

//Set up Redux Middleware
const reducer = combineReducers({
  ...reducers
})

//Set up Dev Tools
const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-h"
               changePositionKey="ctrl-q">
    <LogMonitor theme="tomorrow" preserveScrollTop={false} />
  </DockMonitor>
)

//Create the store
import AuthMiddleware from './middleware'
const finalCreateStore = compose(
  applyMiddleware(AuthMiddleware),
  DevTools.instrument()
)(createStore);

const store = finalCreateStore(reducer);

//Exports
export default store;
export {DevTools, store}
