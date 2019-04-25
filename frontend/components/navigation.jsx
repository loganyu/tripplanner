import React from 'react';
import { withRouter } from 'react-router-dom';

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
    const { currentUser } = this.props;

    return (
      <div>
        {currentUser &&
          <button color="inherit" onClick={this.handleLogOut}>
            Log Out
          </button>
        }
        {!currentUser &&
          <div>
            <button onClick={() => this.handleNavigate(`/login`)}>
              Log In
            </button>
            <button onClick={() => this.handleNavigate(`/signup`)}>
              Sign Up
            </button>
          </div>
        }
      </div>
    )
  }
};

export default withRouter(Navigation);
