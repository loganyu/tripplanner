import { connect } from 'react-redux';

import TripIndex from './trip_index.jsx';
import { fetchUser } from '../../actions/user_actions';
import { fetchTrips, destroyTrip } from '../../actions/trip_actions';
import { destroyUser } from '../../actions/user_actions';
import { asArray } from '../../reducers/selectors';

const mapStateToProps = (state, { match }) => ({
  trips: asArray(state.entities.trips),
  userId: match.params.userId ? parseInt(match.params.userId) : state.session.id,
  currentUser: state.entities.users[state.session.id],
  user: match.params.userId ? state.entities.users[parseInt(match.params.userId)] : state.entities.users[parseInt(state.session.id)]
});

const mapDispatchToProps = dispatch => ({
  fetchUser: (userId) => dispatch(fetchUser(userId)),
  fetchTrips: (userId) => dispatch(fetchTrips(userId)),
  destroyTrip: (userId, tripId) => dispatch(destroyTrip(userId, tripId)),
  destroyUser: (userId) => dispatch(destroyUser(userId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripIndex);