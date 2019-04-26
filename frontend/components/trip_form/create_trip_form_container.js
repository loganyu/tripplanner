import { connect } from 'react-redux';

import { createTrip } from '../../actions/trip_actions';
import TripForm from './trip_form';

const mapStateToProps = (state, { match }) => ({
  userId: parseInt(match.params.userId),
});

const mapDispatchToProps = (dispatch, { match }) => ({
  submit: trip => dispatch(createTrip(match.params.userId, trip))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripForm);
