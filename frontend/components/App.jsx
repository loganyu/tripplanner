import React from 'react';
import {
  Route,
} from 'react-router-dom';

import NavigationContainer from './navigation/navigation_container';
import SignUpFormContainer from './session_form/signup_form_container';
import LogInFormContainer from './session_form/login_form_container';

const App = () => (
  <div>
    <header>
      <h1>Travel Planner</h1>
      <NavigationContainer />
    </header>

    <Route path="/login" component={LogInFormContainer} />
    <Route path="/signup" component={SignUpFormContainer} />
  </div>
);

export default App;
