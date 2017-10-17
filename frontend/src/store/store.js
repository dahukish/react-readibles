import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory'
import thunk from 'redux-thunk';
import reducer from './reducers';

export const logger = store => next => action => {
  console.group(action.type)
  console.info('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.groupEnd(action.type)
  return result;
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const history = createHistory();

const router = routerMiddleware(history)

export const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(thunk, logger, router)
  ));
