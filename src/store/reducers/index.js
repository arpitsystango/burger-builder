import { combineReducers } from 'redux';

import orderReducer from './order';
import burgerBuilderReducer from './burgerBuilder';

const rootReducer = combineReducers({
  burgerBuilder: burgerBuilderReducer,
  order: orderReducer
});

export default rootReducer;