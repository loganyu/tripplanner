import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    maxWidth: 345,
  },
  title: {
    height: 30,
    overflow: "auto",
  },
  content: {
    height: 60,
    overflow: "auto",
  },
  pos: {
    marginBottom: 12,
  },
};

class TripIndexItem extends React.Component {
  constructor(props) {
    super(props);

    this.handleEditTrip = this.handleEditTrip.bind(this);
    this.handleDestroyTrip = this.handleDestroyTrip.bind(this);
  }

  handleEditTrip() {
    const { userId, trip } = this.props;

    this.props.history.push({
      pathname: `/users/${userId}/trips/edit/${trip.id}`,
      search: Object.entries(trip).filter(([k, v]) => k != 'id').map(([k, v]) => `${k}=${v}`).join('&'),
    });
  }

  handleDestroyTrip() {
    const { userId, trip } = this.props;

    this.props.destroyTrip(userId, trip.id)
  }

  render() {
    const { destination, comment, start_date, end_date } = this.props.trip;
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
            {destination}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {`${start_date} to ${end_date}`}
          </Typography>
          <Typography component="p" className={classes.content}>
            {comment}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary" onClick={this.handleEditTrip}>
            Edit Trip
          </Button>
          <Button size="small" color="primary" onClick={this.handleDestroyTrip}>
            Delete
          </Button>
        </CardActions>
      </Card>
    );
  }
}

TripIndexItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(connect()(withStyles(styles)(TripIndexItem)));