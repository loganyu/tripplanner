import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
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

class UserIndexItem extends React.Component {
  constructor(props) {
    super(props);

    this.handleEditUser = this.handleEditUser.bind(this);
    this.handleDestroyUser = this.handleDestroyUser.bind(this);
  }

  handleEditUser() {
    const { user } = this.props;

    this.props.history.push({
      pathname: `/users/edit/${user.id}`,
      search: Object.entries(user).filter(([k,v]) => v != null && k != 'id').map(([k, v]) => `${k}=${v}`).join('&'),
    });
  }

  handleDestroyUser() {
    const { user, currentUser } = this.props;

    this.props.destroyUser(user.id).then(() => {
      if (currentUser.role != null && user.id != currentUser.id) {
        this.props.history.goBack();
      } else {
        this.props.history.push('/signup')
      }
    });
  }

  render() {
    const { username, role, id } = this.props.user;
    const { classes, currentUser } = this.props;

    return (
      <Card className={classes.card}>
        <CardActionArea onClick={() => { this.props.history.push(`/users/${id}/trips`) }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
              {username}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {role}
            </Typography>
          </CardContent>
        </CardActionArea>
        {(currentUser.id == id || currentUser.role == 'admin' || (currentUser.role == 'manager' && role != 'admin')) &&
          <CardActions >
            <Button size="small" color="primary" onClick={this.handleEditUser}>
              Edit Profile
            </Button>
            <Button size="small" color="primary" onClick={this.handleDestroyUser}>
              Delete Account
            </Button>
          </CardActions>
        }
      </Card>
    );
  }
}

UserIndexItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(connect()(withStyles(styles)(UserIndexItem)));