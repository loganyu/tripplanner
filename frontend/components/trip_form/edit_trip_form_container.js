import { connect } from 'react-redux';

import { updateTrip } from '../../actions/trip_actions';
import TripForm from './trip_form';

const mapStateToProps = (state, { match }) => ({
  currentUser: state.entities.users[state.session.id],
  userId: match.params.userId ? parseInt(match.params.userId) : state.session.id,
  tripId: parseInt(match.params.tripId),
  user: match.params.userId ? state.entities.users[parseInt(match.params.userId)] : state.entities.users[parseInt(state.session.id)],
});

const mapDispatchToProps = (dispatch, { match }) => ({
  submit: trip => dispatch(updateTrip(match.params.userId, match.params.tripId, trip))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripForm);
