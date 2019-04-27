import React from 'react';
import { withRouter } from 'react-router-dom';

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
    const { user } = this.props;

    this.props.destroyUser(user.id);
  }

  render() {
    const { username, role } = this.props.user;

    return (
      <div>
        <p>
          <span>{username}</span><br />
          <span>{role}</span><br />
        </p>
        <button
          onClick={this.handleEditUser}>
          Edit User
        </button>
        <button
          onClick={this.handleDestroyUser}>
          Delete
        </button>
      </div>
    );
  }
}

export default withRouter(UserIndexItem);
