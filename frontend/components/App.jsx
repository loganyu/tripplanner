import React from 'react';
import {
  Route,
} from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';

import NavigationContainer from './navigation/navigation_container';
import SignUpFormContainer from './session_form/signup_form_container';
import LogInFormContainer from './session_form/login_form_container';
import TripIndexContainer from './trip_index/trip_index_container';

const App = () => (
  <div>
    <header>
      <h1>Travel Planner</h1>
      <NavigationContainer />
    </header>

    <AuthRoute path="/login" component={LogInFormContainer} />
    <AuthRoute path="/signup" component={SignUpFormContainer} />
    <ProtectedRoute exact path="/" component={TripIndexContainer} />
  </div>
);

export default App;
