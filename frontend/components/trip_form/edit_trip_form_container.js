import { connect } from 'react-redux';

import { updateTrip } from '../../actions/trip_actions';
import TripForm from './trip_form';

const mapStateToProps = (state, { match }) => ({
  userId: parseInt(match.params.userId),
  tripId: parseInt(match.params.tripId),
});

const mapDispatchToProps = (dispatch, { match }) => ({
  submit: trip => dispatch(updateTrip(match.params.userId, match.params.tripId, trip))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripForm);
