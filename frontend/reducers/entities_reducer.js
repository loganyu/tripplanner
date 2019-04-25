import { combineReducers } from 'redux';

import users from './users_reducer';
import trips from './trips_reducer';

export default combineReducers({
  users,
  trips,
});
