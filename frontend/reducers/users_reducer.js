import merge from 'lodash/merge';

import {
  RECEIVE_USERS,
  RECEIVE_USER,
  REMOVE_USER,
} from '../actions/user_actions';
import { RECEIVE_CURRENT_USER } from '../actions/session_actions';

const usersReducer = (state = {}, action) => {
  let nextState = merge({}, state);

  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_USERS:
      return action.users;
    case RECEIVE_USER:
      delete nextState[action.user.id];
      const newUser = { [action.user.id]: action.user };
      return merge({}, nextState, newUser);
    case RECEIVE_CURRENT_USER:
      return merge({}, state, { [action.currentUser.id]: action.currentUser });
    case REMOVE_USER:
      delete nextState[action.userId];
      return nextState;
    default:
      return state;
  }
};

export default usersReducer;
