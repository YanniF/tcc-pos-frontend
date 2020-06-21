import { combineReducers } from 'redux';

import auth from './auth';
import coursesAdmin from './coursesAdmin';
import coursesUser from './coursesUser';

const rootReducer = combineReducers({ auth, coursesAdmin, coursesUser });

export default rootReducer;
