import { combineReducers } from 'redux';

import auth from './auth';
import courses from './courses';

const rootReducer = combineReducers({ auth, courses });

export default rootReducer;
