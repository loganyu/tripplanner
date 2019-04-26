import React from 'react';

import TripIndexItem from './trip_index_item';

class TripIndex extends React.Component {
  constructor(props) {
    super(props);

    this.handleCreateTrip = this.handleCreateTrip.bind(this);
  }

  componentDidMount() {
    this.props.fetchTrips(this.props.userId);
  }

  handleCreateTrip() {
    this.props.history.push(`/users/${this.props.userId}/trips/new`);
  }

  render() {
    const { userId, trips, destroyTrip } = this.props;
    return (
      <div>
        <div className="trips-title">
          <h2>Trips </h2>
        </div>
        <button
          onClick={this.handleCreateTrip}>
          Create Trip
        </button>
        <section className="trips-container">
          {trips.map((trip) => (
            <TripIndexItem
              userId={userId}
              trip={trip}
              key={trip.id}
              destroyTrip={destroyTrip}
            />
          ))}
        </section>
      </div>
    )
  }
}

export default TripIndex;