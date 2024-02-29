import { combineReducers } from 'redux';
import todoReducer from './todoReducer'; // Create this file in the next step

const rootReducer = combineReducers({
  todos: todoReducer,
});

export default rootReducer;