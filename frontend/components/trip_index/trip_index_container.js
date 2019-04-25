import { connect } from 'react-redux';

import TripIndex from './trip_index.jsx';
import { fetchTrips } from '../../actions/trip_actions';
import { asArray } from '../../reducers/selectors';

const mapStateToProps = state => ({
  trips: asArray(state.entities),
  userId: state.session.id,
});

const mapDispatchToProps = dispatch => ({
  fetchTrips: (userId) => dispatch(fetchTrips(userId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripIndex);