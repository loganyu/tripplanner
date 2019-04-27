import React from 'react';
import { withRouter } from 'react-router';

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
  }

  update(property) {
    return e => this.setState({
      [property]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('user[username]', this.state.username);
    if (this.state.password != '') {
      formData.append('user[password]', this.state.password);
    }
    formData.append('user[role]', this.state.role);

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
    const { currentUser } = this.props;

    return (
      <div className="new-user-container">
        <form className="new-user-form" onSubmit={this.handleSubmit}>
          <h2 className="new-user-title">User</h2>
          <label htmlFor="destination">Username</label>
          <input
            required
            id="username"
            type="text"
            value={username}
            onChange={this.update('username')}
            className="user-field"
          />
          <br />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="text"
            value={password}
            placeholder="enter new pw or leave blank to keep old pw"
            onChange={this.update('password')}
            className="user-field"
          />
          <br />
          {
            (currentUser.role != '' || currentUser.id == match.params.userId) &&
            <div>
              <label htmlFor="role">Role</label>
              <select
                id="role"
                onChange={this.update('role')}
                defaultValue={role}
              >
                <option value="">None</option>
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
              </select>
              <br />
            </div>
          }

          <div className='create-user-buttons'>
            <button
              type="submit"
              className="create-user-button"
            >
              Submit
            </button>
            <button
              onClick={this.props.history.goBack}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(UserForm);
