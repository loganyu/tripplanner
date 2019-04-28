import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ReactToPrint from 'react-to-print';

import TripIndexItem from './trip_index_item';
import UserIndexItem from '../user_index/user_index_item';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing.unit,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});

class ComponentToPrint extends React.Component {
  render() {
    return (
      <div style={{ "padding": "30px" }}>
        <h1>Trips Next Month</h1>
        <table>
          <thead>
            <tr>
              <th>destination</th>
              <th>comment</th>
              <th>start date</th>
              <th>end date</th>
            </tr>
          </thead>
          <tbody>
            {this.props.trips.map((trip) =>
              <tr key={trip.id}>
                <td>{trip.destination}</td>
                <td>{trip.comment}</td>
                <td>{trip.start_date}</td>
                <td>{trip.end_date}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>  
    );
  }
}

class TripIndex extends React.Component {
  constructor(props) {
    super(props);

    this.handleCreateTrip = this.handleCreateTrip.bind(this);
    this.filterTrips = this.filterTrips.bind(this);
    this.state = {
      filter: '',
    };
  }

  componentDidMount() {
    this.props.fetchTrips(this.props.userId).then(() => {
      this.setState({filteredTrips: this.props.trips});
    });
    if (this.props.userId != this.props.currentUser.id) {
      this.props.fetchUser(this.props.userId);
    }
  }

  handleCreateTrip() {
    this.props.history.push(`/users/${this.props.userId}/trips/new`);
  }

  filterTrips(e) {
    const filter = e.target.value.toLowerCase();
    this.setState({filter});
  }

  render() {
    const { user, userId, trips, destroyTrip, currentUser, destroyUser, classes } = this.props;
    const { filter } = this.state;
    const filteredTrips = trips.filter((trip) => trip.destination.toLowerCase().includes(filter)).sort((a,b) => a.start_date < b.start_date ? 1 : -1);

    return (
        <div className={classes.root}>
            <div>
              {user &&
                <div>
                  <h2>Profile</h2>
                  <UserIndexItem
                    user={user}
                    destroyUser={destroyUser}
                    currentUser={currentUser}
                    page="tripIndex"
                  />
                </div>
              }
            </div>
          <h2>Trips</h2>
          {user &&(currentUser.id == user.id || currentUser.role == 'admin' || (currentUser.role == 'manager' && user.role != 'admin')) &&
            <Button onClick={this.handleCreateTrip} variant="contained" color="primary" className={classes.button}>
              Create Trip
            </Button>
          }

          <ReactToPrint
            trigger={() =>
              <Button variant="contained" className={classes.button}>
                Print Travel Plan For Next Month
                </Button>
            }
            content={() => this.componentRef}
          />
          <br />
          <TextField
            id="standard-search"
            label="Filter Trips By Destination"
            type="search"
            className={classes.textField}
            margin="normal"
            onChange={this.filterTrips}
          />
          <Grid container spacing={24}>
            {filteredTrips.map((trip) => (
              <Grid item key={trip.id} xs={4}>
                <TripIndexItem
                  userId={userId}
                  trip={trip}
                  key={trip.id}
                  destroyTrip={destroyTrip}
                />
              </Grid>
            ))}
          </Grid>
          <div style={{ display: 'none' }}>
            <ComponentToPrint
                trips={trips.sort((a, b) => a.start_date < b.start_date ? -1 : 1).filter((trip) => {
                const trip_start = new Date(trip.start_date)
                const start_date = new Date()
                let end_date = new Date
                end_date = new Date(end_date.setMonth(end_date.getMonth() + 1))

                return start_date < trip_start && trip_start < end_date
              })}
              ref={el => (this.componentRef = el)}
            />
          </div>
      </div>
    )
  }
}

TripIndex.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TripIndex);
