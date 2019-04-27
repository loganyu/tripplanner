import { connect } from 'react-redux';

import TripIndex from './trip_index.jsx';
import { fetchTrips, destroyTrip } from '../../actions/trip_actions';
import { destroyUser } from '../../actions/user_actions';
import { asArray } from '../../reducers/selectors';

const mapStateToProps = state => ({
  trips: asArray(state.entities.trips),
  userId: state.session.id,
  currentUser: state.entities.users[state.session.id],
});

const mapDispatchToProps = dispatch => ({
  fetchTrips: (userId) => dispatch(fetchTrips(userId)),
  destroyTrip: (userId, tripId) => dispatch(destroyTrip(userId, tripId)),
  destroyUser: (userId) => dispatch(destroyUser(userId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripIndex);