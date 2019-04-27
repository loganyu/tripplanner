import * as APIUtil from '../util/user_api_util';

export const RECEIVE_USERS = 'RECEIVE_USERS';
export const RECEIVE_USER = 'RECEIVE_USER';
export const REMOVE_USER = 'REMOVE_USER';
export const RECEIVE_USER_ERRORS = 'RECEIVE_USER_ERRORS';
export const REMOVE_USER_ERRORS = 'REMOVE_USER_ERRORS';

export const receiveUsers = users => ({
  type: RECEIVE_USERS,
  users,
});

export const receiveUser = (user) => ({
  type: RECEIVE_USER,
  user,
});

export const removeUser = userId => ({
  type: REMOVE_USER,
  userId,
});

export const receiveErrors = errors => ({
  type: RECEIVE_USER_ERRORS,
  errors
});

export const removeErrors = () => ({
  type: REMOVE_USER_ERRORS,
});


export const fetchUsers = () => dispatch => (
  APIUtil.fetchUsers().then(users => (
    dispatch(receiveUsers(users))
  ))
);

export const fetchUser = (userId) => dispatch => (
  APIUtil.fetchUser(userId).then(user => (
    dispatch(receiveUser(user))
  ))
);

export const createUser = (user) => dispatch => (
  APIUtil.createUser(user).then(userData => (
    dispatch(receiveUser(userData))
  ), err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
);

export const updateUser = (userId, user) => dispatch => (
  APIUtil.updateUser(userId, user).then(userData => (
    dispatch(receiveUser(userData))
  ), err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
);

export const destroyUser = (userId) => dispatch => (
  APIUtil.destroyUser(userId)
    .then(() => dispatch(removeUser(userId))
  ), err => (
    dispatch(receiveErrors(err.responseJSON))
  )
);
