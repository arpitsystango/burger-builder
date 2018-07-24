import { combineReducers } from 'redux';

import orderReducer from './order';
import burgerBuilderReducer from './burgerBuilder';
import authReducer from './auth';

const rootReducer = combineReducers({
  burgerBuilder: burgerBuilderReducer,
  order: orderReducer,
  auth: authReducer
});

export default rootReducer;