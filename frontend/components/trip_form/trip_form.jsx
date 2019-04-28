import React from 'react';
import { withRouter } from 'react-router';

class TripForm extends React.Component {
  constructor(props) {
    super(props);

    const { location } = this.props;
    const destination = new URLSearchParams(location.search).get('destination') || '';
    const comment = new URLSearchParams(location.search).get('comment') || '';
    const start_date = new URLSearchParams(location.search).get('start_date') || '';
    const end_date = new URLSearchParams(location.search).get('end_date') || '';


    this.state = {
      destination,
      comment,
      start_date,
      end_date,
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

    const { currentUser } = this.props;
    const formData = new FormData();
    formData.append('trip[destination]', this.state.destination);
    formData.append('trip[comment]', this.state.comment);
    formData.append('trip[start_date]', this.state.start_date);
    formData.append('trip[end_date]', this.state.end_date);

    this.props.submit(formData).then((resp) => {
      if (currentUser.role != null && this.state.role == "") {
        this.props.history.push('/')
      } else {
        this.props.history.goBack();
      }
    });
  }

  render() {
    const {
      destination,
      comment,
      start_date,
      end_date,
    } = this.state;

    return (
      <div className="new-trip-container">
        <form className="new-trip-form" onSubmit={this.handleSubmit}>
          <h2 className="new-trip-title">Trip</h2>
          <label htmlFor="destination">Destination</label>
          <input
            required
            id="destination"
            type="text"
            value={destination}
            onChange={this.update('destination')}
            className="trip-field"
          />
          <br />

          <label htmlFor="comment">Comment</label>
          <input
            id="comment"
            type="text"
            value={comment}
            onChange={this.update('comment')}
            className="trip-field"
          />
          <br />

          <label htmlFor="start_date">Start Date</label>
          <input
            required
            id="start_date"
            type="date"
            value={start_date}
            onChange={this.update('start_date')}
            className="trip-field"
          />
          <br />

          <label htmlFor="end_date">End Date</label>
          <input
            required
            id="end_date"
            type="date"
            value={end_date}
            onChange={this.update('end_date')}
            className="trip-field"
          />
          <br />

          <div className='create-trip-buttons'>
            <button
              type="submit"
              className="create-trip-button"
            >
              Submit
            </button>
            <button
              type="button"
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

export default withRouter(TripForm);
