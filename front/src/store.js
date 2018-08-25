import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import freeze from 'redux-freeze';

import reducers from './reducers';
import apiMiddleware from './services/api/middleware';

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const middlewareRouter = routerMiddleware(history);

const middlewares = [apiMiddleware, middlewareRouter, thunk];

if (process.env.NODE_ENV !== 'production') {
  middlewares.push(freeze);
}
const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(...middlewares),
);

if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('./reducers', () => {
    const nextRootReducer = require('./reducers/index');
    store.replaceReducer(nextRootReducer);
  });
}

export { history };
export default store;
