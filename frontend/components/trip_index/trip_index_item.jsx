import React from 'react';
import { withRouter } from 'react-router-dom';

class IndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const tripId = this.props.trip.id;
    this.props.history.push(`/trips/${tripId}`);
  }

  render() {
    const { destination, comment, start_date, end_date } = this.props.trip;

    return (
      <div
        onClick={this.handleClick}
      >
        <div>
          <span>
            {destination}
          </span>
          <span>
            {comment}
          </span>
          <span>{start_date}</span>
          <span>{end_date}</span>
        </div>
      </div>
    );
  }
}

export default withRouter(IndexItem);
