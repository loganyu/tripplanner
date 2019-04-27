import { connect } from 'react-redux';

import { createUser } from '../../actions/user_actions';
import UserForm from './user_form';

const mapStateToProps = ({ entities, errors, session}, { match }) => ({
  currentUser: entities.users[session.id],
  errors: errors.user,
});

const mapDispatchToProps = (dispatch, { match }) => ({
  submit: user => dispatch(createUser(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserForm);
