import React from 'react';
import { AuthRoute, ProtectedRoute, ManagerRoute } from '../util/route_util';
import CssBaseline from '@material-ui/core/CssBaseline';

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
  <React.Fragment>
    <CssBaseline />

    <NavigationContainer />
    <div style={{"padding": "10px 50px"}}>
      <AuthRoute path="/login" component={LogInFormContainer} />
      <AuthRoute path="/signup" component={SignUpFormContainer} />
      <ProtectedRoute exact path="/" component={TripIndexContainer} />
      <ProtectedRoute exact path="/users/:userId/trips" component={TripIndexContainer} />
      <ProtectedRoute exact path="/users/:userId/trips/new" component={CreateTripFormContainer} />
      <ProtectedRoute exact path="/users/:userId/trips/edit/:tripId" component={EditTripFormContainer} />
      <ManagerRoute exact path="/users" component={UserIndexContainer} />
      <ManagerRoute exact path="/users/new" component={CreateUserFormContainer} />
      <ManagerRoute exact path="/users/edit/:userId" component={EditUserFormContainer} />
    </div>
  </React.Fragment>
);

export default App;
