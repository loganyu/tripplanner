import merge from 'lodash/merge';

import {
  RECEIVE_USERS,
  RECEIVE_USER,
  REMOVE_USER,
} from '../actions/user_actions';

const usersReducer = (state = {}, action) => {
  let nextState = merge({}, state);

  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_USERS:
      return action.users;
    case RECEIVE_USER:
      const newTrip = { [action.user.id]: action.user };
      return merge({}, state, newTrip);
    case REMOVE_USER:
      delete nextState[action.userId];
      return nextState;
    default:
      return state;
  }
};

export default usersReducer;
