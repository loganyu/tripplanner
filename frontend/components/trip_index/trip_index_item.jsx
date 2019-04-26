import React from 'react';
import { withRouter } from 'react-router-dom';

class IndexItem extends React.Component {
  constructor(props) {
    super(props);

    this.handleEditTrip = this.handleEditTrip.bind(this);
    this.handleDestroyTrip = this.handleDestroyTrip.bind(this);
  }

  handleEditTrip() {
    const { userId, trip } = this.props;

    this.props.history.push({
      pathname: `/users/${userId}/trips/edit/${trip.id}`,
      search: Object.entries(trip).map(([k, v]) => `${k}=${v}`).join('&'),
    });
  }

  handleDestroyTrip() {
    const { userId, trip } = this.props;

    this.props.destroyTrip(userId, trip.id)
  }

  render() {
    const { destination, comment, start_date, end_date } = this.props.trip;

    return (
      <div>
        <p>
          <span>{destination}</span><br />
          <span>{comment}</span><br />
          <span>{start_date}</span><br />
          <span>{end_date}</span><br />
        </p>
        <button
          onClick={this.handleEditTrip}>
          Edit Trip
        </button>
        <button
          onClick={this.handleDestroyTrip}>
          Delete
        </button>
      </div>
    );
  }
}

export default withRouter(IndexItem);