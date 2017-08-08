import React, { Component } from 'react';
import './State.css';

class State extends Component {

  constructor() {
    super();
    this.state = {
      dhcpEntries: []
    };
  }

  componentDidMount() {
    fetch('/v1/api/state')
      .then(data => data.json())
      .then((data) => {
        this.setState({
          dhcpEntries: data
        });
      });
  }

  render() {
    return (
      <div className="State">
        <h1>State</h1>

      </div>
    );
  }
}

export default State;
