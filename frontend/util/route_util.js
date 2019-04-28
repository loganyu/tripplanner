import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

const Auth = ({ component: Component, path, loggedIn, exact }) => (
  <Route path={path} exact={exact} render={(props) => (
    !loggedIn ? (
      <Component {...props} />
    ) : (
        <Redirect to="/" />
      )
  )} />
);

const Protected = ({ component: Component, path, loggedIn, exact }) => (
  <Route path={path} exact={exact} render={(props) => (
    loggedIn ? (
      <Component {...props} />
    ) : (
        <Redirect to="/login" />
      )
  )} />
);

const Manager = ({ component: Component, path, loggedIn, currentUser, exact, user }) => (
  <Route path={path} exact={exact} render={(props) => (
    loggedIn && (currentUser.role == 'admin' || currentUser.role == 'manager') ? (
      <Component {...props} />
    ) : (
        <Redirect to="/" />
      )
  )} />
);

const ManagerOrOwner = ({ component: Component, path, loggedIn, currentUser, exact, user }) => (
  <Route path={path} exact={exact} render={(props) => (
    loggedIn && (currentUser.role == 'admin' || currentUser.role == 'manager' || currentUser.id == user.id) ? (
      <Component {...props} />
    ) : (
        <Redirect to="/" />
      )
  )} />
);

const mapStateToProps = (state, { match }) => ({
  loggedIn: Boolean(state.session.id),
  currentUser: state.entities.users[state.session.id],
  user: match.params.userId ? state.entities.users[parseInt(match.params.userId)] : state.entities.users[parseInt(state.session.id)],
});

export const AuthRoute = withRouter(connect(mapStateToProps)(Auth));

export const ProtectedRoute = withRouter(connect(mapStateToProps)(Protected));

export const ManagerOrOwnerRoute = withRouter(connect(mapStateToProps)(ManagerOrOwner));

export const ManagerRoute = withRouter(connect(mapStateToProps)(Manager));

