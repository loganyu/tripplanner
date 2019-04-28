import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

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
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
});

class UserForm extends React.Component {
  constructor(props) {
    super(props);

    const { location } = this.props;
    const username = new URLSearchParams(location.search).get('username') || '';
    const password = '';
    const role = new URLSearchParams(location.search).get('role') || '';

    this.state = {
      username,
      password,
      role,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  update(property) {
    return e => this.setState({
      [property]: e.target.value
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
  
  handleCancel() {
    this.props.removeErrors();
    this.props.history.goBack();
  }

  handleSubmit(e) {
    e.preventDefault();
    const { currentUser } = this.props;
    const formData = new FormData();
    formData.append('user[username]', this.state.username);
    if (this.state.password != '') {
      formData.append('user[password]', this.state.password);
    }
    if (this.state.role != '') {
      formData.append('user[role]', this.state.role);
    } else {
      formData.append('user[role]', null);
    }
    

    this.props.submit(formData).then((resp) => {
      this.props.history.goBack();
    });
  }

  render() {
    const {
      username,
      password,
      role,
    } = this.state;
    const { currentUser, errors, classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={0}>
          <Grid item xs={12} container
            display="flex"
            justify="center"
          >
            <div>
              <h2>Edit User</h2>
              <form onSubmit={this.handleSubmit} className={classes.container}>
                <TextField
                  id="username"
                  label="Username"
                  className={classes.textField}
                  onChange={this.update('username')}
                  margin="normal"
                  autoComplete="username"
                  value={username}
                />

                <TextField
                  id="password"
                  label="Password: Leave blank to keep password the same"
                  value={password}
                  className={classes.textField}
                  type="password"
                  autoComplete="current-password"
                  margin="normal"
                  onChange={this.update('password')}
                />

                {
                  currentUser.role != null &&
                  <div>
                    <FormControl className={classes.formControl}>
                      <InputLabel htmlFor="role">Role</InputLabel>
                      <Select
                        value={role}
                        onChange={this.update('role')}

                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value="manager">Manager</MenuItem>
                        {currentUser.role == "admin" &&
                          <MenuItem value="admin">Admin</MenuItem>
                        }
                      </Select>
                    </FormControl>
                  </div>
                }

                <Button type="submit" variant="contained" color="primary" className={classes.button}>
                  Submit
                </Button>
                <Button type="button" onClick={this.handleCancel} variant="contained" className={classes.button}>
                  Cancel
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

UserForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(connect()(withStyles(styles)(UserForm)));