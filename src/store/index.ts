import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk'
import { dispenserReducer } from './dispenser/reducers';

const rootReducer = combineReducers({
  dispenser: dispenserReducer
})

export default function configureStore(preloadedState: object) {
  const store = createStore(rootReducer, preloadedState, applyMiddleware(thunkMiddleware));
  return store;
}