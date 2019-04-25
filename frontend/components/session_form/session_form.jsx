import React from 'react';
import { withRouter } from 'react-router-dom';

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
    const { formType, errors, navLink } = this.props;
    const { username, password } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <header>
          <h1>{formType}</h1>
          <br />
          {navLink}
        </header>
        <section>
          {errors.length > 0 && this.renderErrors()}
          <div>
            <label htmlFor="username">Username:</label>
            <input type="text"
              id="username"
              value={username}
              onChange={this.update('username')}
              autoComplete="username"
            />
            <label htmlFor="password">Password:</label>
            <input type="password"
              id="password"
              value={password}
              onChange={this.update('password')}
              autoComplete="current-password"
            />
            <button type="submit" value={formType}>
              {formType}
            </button>
          </div>
        </section>
      </form>
    );
  }
}

export default withRouter(SessionForm);
