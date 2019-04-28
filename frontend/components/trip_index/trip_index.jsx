import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import TripIndexItem from './trip_index_item';
import UserIndexItem from '../user_index/user_index_item';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing.unit,
  },
});

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
    const { user, userId, trips, destroyTrip, currentUser, destroyUser, classes } = this.props;
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
                  />
                </div>
              }
            </div>
          <h2>Trips</h2>
          <Button onClick={this.handleCreateTrip} variant="contained" color="primary" className={classes.button}>
            Create Trip
          </Button>
          <Grid container spacing={24}>
            {trips.map((trip) => (
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
      </div>
    )
  }
}

TripIndex.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TripIndex);
