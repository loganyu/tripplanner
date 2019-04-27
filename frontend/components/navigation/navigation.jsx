import React from 'react';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';  
import Typography from '@material-ui/core/Typography';

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
};

class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.handleLogOut = this.handleLogOut.bind(this);
    this.handleNavigate = this.handleNavigate.bind(this);
  }

  handleNavigate(path) {
    this.props.history.push(path);
  }

  handleLogOut() {
    this.props.logout().then(() => {
      this.handleNavigate(`/`);
    });
  }

  render() {
    const { currentUser, classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Travel Planner
            </Typography>
            <div>
              {currentUser &&
                <div>
                  <Button color="inherit" onClick={() => this.handleNavigate(`/`)}>Home</Button>
                  <Button color="inherit" onClick={this.handleLogOut}>Log Out</Button>
                </div>
              }
              {!currentUser &&
                <div>
                  <Button color="inherit" onClick={() => this.handleNavigate(`/login`)}>Log In</Button>
                  <Button color="inherit" onClick={() => this.handleNavigate(`/signup`)}>Sign Up</Button>
                </div>
              }
            </div>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
};

Navigation.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(connect()(withStyles(styles)(Navigation)));