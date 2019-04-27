import { connect } from 'react-redux';

import { updateUser, removeErrors } from '../../actions/user_actions';
import UserForm from './user_form';

const mapStateToProps = ({ entities, session, errors }, { match }) => ({
  currentUser: entities.users[session.id],
  errors: errors.user,
});

const mapDispatchToProps = (dispatch, { match }) => ({
  submit: user => dispatch(updateUser(match.params.userId, user)),
  removeErrors: () => dispatch(removeErrors()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserForm);
