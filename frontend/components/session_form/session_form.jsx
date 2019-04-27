import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    backgroundColor: theme.palette.error.dark,
    color: 'white',
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
  }
});

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user).then(() => {
      this.props.history.push(`/`);
    });
  }

  renderErrors() {
    return (
      <ul className="errors-container">
        {this.props.errors.map((error, i) => (
          <li className="error" key={`error-${i}`}>
            {error}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    const { formType, errors, classes } = this.props;
    const { username, password } = this.state;

    return (
      <div className={classes.root}>
        <Grid container spacing={0}>
          <Grid item xs={12} container
            display="flex"
            justify="center"
          >
              <div>
                <h2>{formType}</h2>
                <form onSubmit={this.handleSubmit} className={classes.container}>
                  <TextField
                    required
                    id="username"
                    label="Username"
                    className={classes.textField}
                    onChange={this.update('username')}
                    margin="normal"
                    autoComplete="username"
                    value={username}
                  />

                  <TextField
                    required
                    id="password"
                    label="Password"
                    value={password}
                    className={classes.textField}
                    type="password"
                    autoComplete="current-password"
                    margin="normal"
                    onChange={this.update('password')}
                  />

                  <Button type="submit" value={formType} variant="contained" color="primary" className={classes.button}>
                    {formType}
                  </Button>
                </form>
                {errors.length > 0 &&
                  <Paper className={classes.paper} elevation={1}>
                    {this.renderErrors()}
                  </Paper>
                }
              </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

SessionForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(connect()(withStyles(styles)(SessionForm)));