import React from 'react';
import {
  Route,
} from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';

import NavigationContainer from './navigation/navigation_container';
import SignUpFormContainer from './session_form/signup_form_container';
import LogInFormContainer from './session_form/login_form_container';
import TripIndexContainer from './trip_index/trip_index_container';
import CreateTripFormContainer from './trip_form/create_trip_form_container';
import EditTripFormContainer from './trip_form/edit_trip_form_container';
import UserIndexContainer from './user_index/user_index_container';
import CreateUserFormContainer from './user_form/create_user_form_container';
import EditUserFormContainer from './user_form/edit_user_form_container';

const App = () => (
  <div>
    <header>
      <h1>Travel Planner</h1>
      <NavigationContainer />
    </header>

    <AuthRoute path="/login" component={LogInFormContainer} />
    <AuthRoute path="/signup" component={SignUpFormContainer} />
    <ProtectedRoute exact path="/" component={TripIndexContainer} />
    <ProtectedRoute exact path="/users/:userId/trips" component={TripIndexContainer} />
    <ProtectedRoute exact path="/users/:userId/trips/new" component={CreateTripFormContainer} />
    <ProtectedRoute exact path="/users/:userId/trips/edit/:tripId" component={EditTripFormContainer} />
    <ProtectedRoute exact path="/users" component={UserIndexContainer} />
    <ProtectedRoute exact path="/users/new" component={CreateUserFormContainer} />
    <ProtectedRoute exact path="/users/edit/:userId" component={EditUserFormContainer} />
  </div>
);

export default App;
