import React from 'react';
import { withRouter } from 'react-router-dom';

class IndexItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { destination, comment, start_date, end_date } = this.props.trip;

    return (
      <div
        onClick={this.handleClick}
      >
        <p>
          <span>{destination}</span><br />
          <span>{comment}</span><br />
          <span>{start_date}</span><br />
          <span>{end_date}</span><br />
        </p>
      </div>
    );
  }
}

export default withRouter(IndexItem);
