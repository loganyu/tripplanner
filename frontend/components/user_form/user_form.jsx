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
    formData.append('user[role]', this.state.role);

    this.props.submit(formData).then((resp) => {
      if (currentUser.role != null && this.state.role  == "") {
        this.props.history.push('/')
      } else {
        this.props.history.goBack();
      }
    });
  }

  render() {
    const {
      username,
      password,
      role,
    } = this.state;
    const { currentUser, match, errors } = this.props;

    return (
      <div className="new-user-container">
        {errors.length > 0 && this.renderErrors()}
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
            currentUser.role != null &&
            <div>
              <label htmlFor="role">Role</label>
              <select
                id="role"
                onChange={this.update('role')}
                defaultValue={role}
              >
                <option value={null}>None</option>
                <option value="manager">Manager</option>
                { currentUser.role == "admin" &&
                  <option value="admin">Admin</option>
                }
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
              type="button"
              onClick={this.handleCancel}
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
