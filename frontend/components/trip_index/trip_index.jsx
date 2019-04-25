import React from 'react';

import TripIndexItem from './trip_index_item';

class TripIndex extends React.Component {
  componentDidMount() {
    this.props.fetchTrips();
  }

  render() {
    const { trips } = this.props;
    return (
      <div>
        <div className="trips-title">
          <h2>Trips </h2>
        </div>
        <section className="trips-container">
          {trips.map((trip) => (
            <TripIndexItem
              trip={trip}
              key={trip.id}
            />
          ))}
        </section>
      </div>
    )
  }
}

export default TripIndex;