import { connect } from 'react-redux';

import UserIndex from './user_index.jsx';
import { fetchUsers, destroyUser } from '../../actions/user_actions';
import { asArray } from '../../reducers/selectors';

const mapStateToProps = state => ({
  users: asArray(state.entities.users),
  currentUser: state.entities.users[state.session.id],
});

const mapDispatchToProps = dispatch => ({
  fetchUsers: () => dispatch(fetchUsers()),
  destroyUser: (userId) => dispatch(destroyUser(userId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserIndex);