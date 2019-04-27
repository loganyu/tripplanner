import React from 'react';

import UserIndexItem from './user_index_item';

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
    const { users, destroyUser } = this.props;
    return (
      <div>
        <div className="users-title">
          <h2>Users</h2>
        </div>
        <button
          onClick={this.handleCreateUser}>
          Create User
        </button>
        <section className="users-container">
          {users.map((user) => (
            <div key={user.id}>
              <UserIndexItem
                user={user}
                destroyUser={destroyUser}
              />
              <button
                onClick={() => {this.props.history.push(`/users/${user.id}/trips`)}}>
                View User Profile and Trips
              </button>
            </div>
            
          ))}
        </section>
      </div>
    )
  }
}

export default UserIndex;