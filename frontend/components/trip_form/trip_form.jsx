import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 400,
    fontSize: 20,
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
});

class TripForm extends React.Component {
  constructor(props) {
    super(props);

    const { location } = this.props;
    const destination = new URLSearchParams(location.search).get('destination') || '';
    const comment = new URLSearchParams(location.search).get('comment') || '';
    const start_date = new URLSearchParams(location.search).get('start_date') || '';
    const end_date = new URLSearchParams(location.search).get('end_date') || '';


    this.state = {
      destination,
      comment,
      start_date,
      end_date,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(property) {
    return e => this.setState({
      [property]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const { currentUser } = this.props;
    const formData = new FormData();
    formData.append('trip[destination]', this.state.destination);
    formData.append('trip[comment]', this.state.comment);
    formData.append('trip[start_date]', this.state.start_date);
    formData.append('trip[end_date]', this.state.end_date);

    this.props.submit(formData).then((resp) => {
      if (currentUser.role != null && this.state.role == "") {
        this.props.history.push('/')
      } else {
        this.props.history.goBack();
      }
    });
  }

  render() {
    const {
      destination,
      comment,
      start_date,
      end_date,
    } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={0}>
          <Grid item xs={12} container
            display="flex"
            justify="center"
          >
            <div>
              <h2>Trip</h2>
              <form onSubmit={this.handleSubmit} className={classes.container}>
                <TextField
                  required
                  id="destination"
                  label="Destination"
                  value={destination}
                  className={classes.textField}
                  onChange={this.update('destination')}
                  margin="normal"
                />

                <TextField
                  id="comment"
                  label="Comment"
                  value={comment}
                  onChange={this.update('comment')}
                  className={classes.textField}
                  margin="normal"
                />

                <InputLabel htmlFor="start_date">Start Date</InputLabel>
                <input
                  required
                  id="start_date"
                  label="Start Date"
                  type="date"
                  value={start_date}
                  className={classes.textField}
                  onChange={this.update('start_date')}
                />

                <InputLabel htmlFor="end_date">End Date</InputLabel>
                <input
                  required
                  id="end_date"
                  label="End Date"
                  type="date"
                  value={end_date}
                  min={start_date}
                  className={classes.textField}
                  onChange={this.update('end_date')}
                />

                <Button type="submit" variant="contained" color="primary" className={classes.button}>
                  Submit
                </Button>
                <Button type="button" onClick={this.props.history.goBack} variant="contained" className={classes.button}>
                  Cancel
                </Button>
              </form>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

TripForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(connect()(withStyles(styles)(TripForm)));