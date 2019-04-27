import React from 'react';
import { Link } from 'react-router-dom';

import TripIndexItem from './trip_index_item';
import UserIndexItem from '../user_index/user_index_item';

class TripIndex extends React.Component {
  constructor(props) {
    super(props);

    this.handleCreateTrip = this.handleCreateTrip.bind(this);
  }

  componentDidMount() {
    this.props.fetchTrips(this.props.userId);
    if (this.props.userId != this.props.currentUser.id) {
      this.props.fetchUser(this.props.userId);
    }
  }

  handleCreateTrip() {
    this.props.history.push(`/users/${this.props.userId}/trips/new`);
  }

  render() {
    const { user, userId, trips, destroyTrip, currentUser, destroyUser } = this.props;
    return (
      <div>
        { ["admin", "manager"].includes(currentUser.role) &&
          <div>
            <Link to={`/users`}>View All Users</Link>
          </div>
        }
        <div>
          { user &&
            <div>
              <h2>My Profile</h2>
              <UserIndexItem
                user={user}
                destroyUser={destroyUser}
              />
            </div>
          }
        </div>
        
        <div className="trips-title">
          <h2>Trips</h2>
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