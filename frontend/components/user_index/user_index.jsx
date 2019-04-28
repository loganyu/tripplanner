import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import UserIndexItem from './user_index_item';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing.unit,
  },
});

class UserIndex extends React.Component {
  constructor(props) {
    super(props);

    this.handleCreateUser = this.handleCreateUser.bind(this);
  }

  componentDidMount() {
    this.props.fetchUsers();
  }

  handleCreateUser() {
    this.props.history.push(`/users/new`);
  }


  render() {
    const { users, destroyUser, currentUser, classes } = this.props;
    return (
      <div>
        <div className="users-title">
          <h2>Users</h2>
        </div>
        <Button onClick={this.handleCreateUser} variant="contained" color="primary" className={classes.button}>
          Create User
          </Button>
        <Grid container spacing={24}>
          {users.map((user) => (
            <Grid item key={user.id} xs={4}>
              <UserIndexItem
                user={user}
                destroyUser={destroyUser}
                currentUser={currentUser}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    )
  }
}

UserIndex.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserIndex);