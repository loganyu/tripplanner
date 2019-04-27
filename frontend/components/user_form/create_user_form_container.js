import { connect } from 'react-redux';

import { createUser } from '../../actions/user_actions';
import UserForm from './user_form';

const mapStateToProps = (state, { match }) => ({
  currentUser: state.entities.users[state.session.id]
});

const mapDispatchToProps = (dispatch, { match }) => ({
  submit: user => dispatch(createUser(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserForm);
