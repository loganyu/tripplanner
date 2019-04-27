import { connect } from 'react-redux';

import { createTrip } from '../../actions/trip_actions';
import TripForm from './trip_form';

const mapStateToProps = (state, { match }) => ({
  currentUser: state.entities.users[state.session.id],
  userId: match.params.userId ? parseInt(match.params.userId) : state.session.id,
  user: match.params.userId ? state.entities.users[parseInt(match.params.userId)] : state.entities.users[parseInt(state.session.id)]
});

const mapDispatchToProps = (dispatch, { match }) => ({
  submit: trip => dispatch(createTrip(match.params.userId, trip))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripForm);
